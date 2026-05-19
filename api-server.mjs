// Local dev API server — mirrors Vercel serverless functions
import express from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env manually
try {
  const envContent = readFileSync(join(__dirname, '.env'), 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
} catch {}

const app = express();
app.use(express.json({ limit: '10mb' }));

// ── /api/cardnews/generate ──────────────────────────────────────
app.post('/api/cardnews/generate', async (req, res) => {
  const { topic, tone = '정보전달', slideCount = 4 } = req.body ?? {};
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY가 설정되지 않았습니다.' });
  if (!topic) return res.status(400).json({ error: 'topic이 필요합니다.' });

  const SLIDE_TYPES = ['cover', 'content', 'content', 'content', 'content', 'content', 'content', 'closing'];

  const systemPrompt = `You are an Instagram card news copywriter. Respond ONLY with valid JSON, no other text.

Output format (strict JSON, no markdown, no explanation):
{"slides":[{"type":"cover","title":"...","body":"..."},...],"hashtags":"#tag1 #tag2"}

Rules:
- slide types: cover (first), content (middle), closing (last)
- title: max 22 Korean characters
- body: max 100 Korean characters, use \\n for line breaks
- Use specific numbers/statistics/research, not vague expressions
- Each slide must have ONE surprising fact
- Write in Korean`;

  const userPrompt = `Topic: ${topic}, Tone: ${tone}, Slides: ${slideCount}
Include real statistics and specific numbers. JSON only:`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2048,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error?.message ?? 'Claude API 오류' });
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? '';
    const jsonMatch = text.match(/```json\s*([\s\S]*?)```/) || text.match(/(\{[\s\S]*\})/);
    if (!jsonMatch) return res.status(500).json({ error: 'JSON 파싱 실패 — 다시 시도해주세요.' });
    try {
      return res.json(JSON.parse(jsonMatch[1] ?? jsonMatch[0]));
    } catch {
      return res.status(500).json({ error: 'JSON 파싱 실패 — 다시 시도해주세요.' });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message ?? 'Internal error' });
  }
});

// URL 정규화 (네이버 모바일, 카카오 등)
function normalizeUrl(url) {
  // 네이버 블로그 → 모바일 버전 (본문이 SSR로 포함됨)
  const naverM = url.match(/(?:m\.)?blog\.naver\.com\/([^/?#]+)\/(\d+)/);
  if (naverM) return `https://m.blog.naver.com/${naverM[1]}/${naverM[2]}`;
  return url;
}

// ── /api/cardnews/from-url ──────────────────────────────────────
app.post('/api/cardnews/from-url', async (req, res) => {
  const { url, slideCount = 4 } = req.body ?? {};
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY가 설정되지 않았습니다.' });
  if (!url) return res.status(400).json({ error: 'url이 필요합니다.' });

  try {
    const fetchUrl = normalizeUrl(url);
    const htmlRes = await fetch(fetchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
        'Accept-Language': 'ko-KR,ko;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Referer': 'https://blog.naver.com/',
      },
    });
    if (!htmlRes.ok) return res.status(400).json({ error: `URL 접근 실패: ${htmlRes.status}` });

    let html = await htmlRes.text();

    // OG 메타데이터 추출 (폴백용)
    const ogTitle = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)?.[1]
      || html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1] || '';
    const ogDesc = html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i)?.[1]
      || html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i)?.[1] || '';

    // 네이버 모바일 본문 영역 우선 추출
    const bodyAreaMatch = html.match(/(?:se-main-container|post_ct|blog-post|article_body|se_doc_viewer)([\s\S]{0,30000})/i);
    if (bodyAreaMatch) html = bodyAreaMatch[0];

    // 이미지 추출 (최대 30장)
    const extractedImages = [];
    const seen = new Set();

    const addImg = (src) => {
      if (!src || seen.has(src)) return;
      if (!src.startsWith('http')) return;
      const lower = src.toLowerCase();
      if (/icon|logo|avatar|emoji|spinner|blank|pixel|tracking|1x1|btn|button/.test(lower)) return;
      if (!/\.(jpg|jpeg|png|webp|gif)/.test(lower) && !/\/image\/|\/img\/|\/photo\/|\/product\/|\/goods\//.test(lower)) return;
      seen.add(src);
      extractedImages.push(src);
    };

    // og:image (최우선)
    const ogImg = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1]
      || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i)?.[1];
    if (ogImg) addImg(ogImg);

    // 쇼핑몰 lazy-load 패턴 (data-src, data-original, data-lazy-src, data-zoom-image)
    const lazyAttrs = ['data-src', 'data-original', 'data-lazy-src', 'data-zoom-image', 'data-image', 'data-full'];
    for (const attr of lazyAttrs) {
      const re = new RegExp(`${attr}=["']([^"']+)["']`, 'gi');
      let m;
      while ((m = re.exec(html)) !== null && extractedImages.length < 30) addImg(m[1]);
    }

    // srcset (고해상도 이미지)
    const srcsetRe = /srcset=["']([^"']+)["']/gi;
    let ssm;
    while ((ssm = srcsetRe.exec(html)) !== null && extractedImages.length < 30) {
      const best = ssm[1].split(',').pop()?.trim().split(/\s+/)[0];
      if (best) addImg(best);
    }

    // 일반 img src (너비 조건 없이 전부, broken image 는 프론트에서 숨김)
    const imgRe = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let im;
    while ((im = imgRe.exec(html)) !== null && extractedImages.length < 30) addImg(im[1]);

    // background-image: url(...) 패턴 (쇼핑몰 섬네일 자주 사용)
    const bgRe = /background(?:-image)?:\s*url\(["']?([^"')]+)["']?\)/gi;
    let bm;
    while ((bm = bgRe.exec(html)) !== null && extractedImages.length < 30) addImg(bm[1]);

    let textContent = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 3000);

    // 본문이 너무 짧으면 OG 메타데이터로 보완
    if (textContent.length < 200 && (ogTitle || ogDesc)) {
      textContent = `제목: ${ogTitle}\n설명: ${ogDesc}\n\n${textContent}`;
    }
    if (textContent.length < 50) {
      return res.status(400).json({ error: '페이지에서 텍스트를 추출할 수 없습니다. 이 URL은 로그인이 필요하거나 JavaScript 렌더링만 지원합니다.' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2048,
        system: `You convert blog articles to Instagram card news. Respond ONLY with valid JSON, no other text.

Output format: {"slides":[{"type":"cover","title":"...","body":"..."}...],"hashtags":"#tag1 #tag2"}
- slide types: cover (first), content (middle), closing (last)
- title: max 22 Korean chars, body: max 100 Korean chars, \\n for line breaks
- Preserve key facts, numbers, tips from original text
- Write in Korean. JSON only:`,
        messages: [{
          role: 'user',
          content: `Convert to ${slideCount} slides. JSON only:\n\n${textContent}`,
        }],
      }),
    });

    const data = await response.json();
    const text = data.content?.[0]?.text ?? '';

    // JSON 파싱 — ```json 코드블록도 허용
    const jsonMatch = text.match(/```json\s*([\s\S]*?)```/) || text.match(/(\{[\s\S]*\})/);
    if (!jsonMatch) {
      console.error('[from-url] Claude raw response:', text.slice(0, 300));
      // 텍스트가 아예 있으면 직접 Claude에게 재요청
      if (text.length > 10) {
        return res.status(500).json({
          error: `콘텐츠를 파싱하지 못했습니다. 다시 시도해주세요.\n(원인: ${text.slice(0, 80)})`,
        });
      }
      return res.status(500).json({ error: '페이지에서 콘텐츠를 추출하지 못했습니다. 다른 URL을 시도해주세요.' });
    }
    try {
      const parsed = JSON.parse(jsonMatch[1] ?? jsonMatch[0]);
      return res.json({ ...parsed, images: extractedImages });
    } catch {
      return res.status(500).json({ error: 'JSON 파싱 실패 — 다시 시도해주세요.' });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message ?? 'Internal error' });
  }
});

// ── /api/cardnews/generate-image ───────────────────────────────
app.post('/api/cardnews/generate-image', async (req, res) => {
  const { topic, style = 'minimal' } = req.body ?? {};
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY가 설정되지 않았습니다.' });
  if (!topic) return res.status(400).json({ error: 'topic이 필요합니다.' });

  const STYLE_PROMPTS = {
    minimal: 'minimalist clean background, soft pastel gradients, no text, no people, abstract shapes, professional',
    nature: 'beautiful nature photography, soft natural light, bokeh, calming, no text',
    abstract: 'modern abstract art, geometric patterns, vibrant but harmonious colors, no text',
    dark: 'dark moody background, deep colors, dramatic lighting, luxury feel, no text',
  };

  const styleDesc = STYLE_PROMPTS[style] ?? STYLE_PROMPTS.minimal;
  const prompt = `Instagram card background about "${topic}". ${styleDesc}. Square 1:1 ratio, suitable for text overlay. No words or letters in image.`;

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt,
        n: 1,
        size: '1024x1024',
        quality: 'medium',
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error?.message ?? 'Image generation failed' });
    }

    const data = await response.json();
    const b64 = data.data?.[0]?.b64_json;
    if (!b64) return res.status(500).json({ error: '이미지 데이터를 받지 못했습니다.' });
    return res.json({ image: `data:image/png;base64,${b64}` });
  } catch (e) {
    return res.status(500).json({ error: e.message ?? 'Internal error' });
  }
});

// ── /api/buffer-proxy ──────────────────────────────────────────
app.get('/api/buffer-proxy/profiles', async (req, res) => {
  const token = req.headers['x-buffer-token'];
  if (!token) return res.status(400).json({ error: 'Buffer token required' });
  try {
    const r = await fetch('https://api.bufferapp.com/1/profiles.json', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

app.post('/api/buffer-proxy/publish', async (req, res) => {
  const token = req.headers['x-buffer-token'];
  const { profileId, text, imageUrl } = req.body ?? {};
  if (!token) return res.status(400).json({ error: 'Buffer token required' });
  try {
    const params = new URLSearchParams({ profile_ids: profileId, text });
    if (imageUrl) params.append('media[photo]', imageUrl);
    const r = await fetch('https://api.bufferapp.com/1/updates/create.json', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });
    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

const PORT = 5175;
app.listen(PORT, () => {
  console.log(`✅ API 서버 실행 중: http://localhost:${PORT}`);
});
