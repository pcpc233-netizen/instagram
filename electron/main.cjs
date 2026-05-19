'use strict';

const { app, BrowserWindow, shell, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const express = require('express');

// ─── 테스트 유효 기간 ────────────────────────────────────────────
// 날짜 변경 후 build-exe.bat 다시 실행하면 새 EXE 생성됨
const EXPIRES_AT = new Date('2026-06-02T23:59:59'); // ← 만료일 변경

function checkExpiry() {
  if (new Date() <= EXPIRES_AT) return true; // 유효
  dialog.showMessageBoxSync({
    type: 'warning',
    title: 'CardFlow — 테스트 기간 종료',
    message: '테스트 기간이 종료되었습니다.',
    detail: `이 버전의 유효 기간은 ${EXPIRES_AT.toLocaleDateString('ko-KR')}까지였습니다.\n정식 버전 출시 후 이용해주세요.`,
    buttons: ['확인'],
  });
  return false;
}

// ─── .env 로드 ───────────────────────────────────────────────────
const envPath = app.isPackaged
  ? path.join(process.resourcesPath, '.env')
  : path.join(__dirname, '../.env');

try {
  const content = fs.readFileSync(envPath, 'utf8');
  for (const line of content.split('\n')) {
    const t = line.trim();
    if (!t || t.startsWith('#')) continue;
    const idx = t.indexOf('=');
    if (idx === -1) continue;
    const key = t.slice(0, idx).trim();
    const val = t.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
} catch (e) {
  console.error('[CardFlow] .env 로드 실패:', e.message);
}

// ─── Express API 서버 ────────────────────────────────────────────
const server = express();
server.use(express.json({ limit: '10mb' }));

// URL 정규화 (네이버 블로그 모바일)
function normalizeUrl(url) {
  const naverM = url.match(/(?:m\.)?blog\.naver\.com\/([^/?#]+)\/(\d+)/);
  if (naverM) return `https://m.blog.naver.com/${naverM[1]}/${naverM[2]}`;
  return url;
}

// ── /api/cardnews/generate ──────────────────────────────────────
server.post('/api/cardnews/generate', async (req, res) => {
  const { topic, tone = '정보전달', slideCount = 4 } = req.body ?? {};
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY가 없습니다.' });
  if (!topic)  return res.status(400).json({ error: 'topic이 필요합니다.' });

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
        messages: [{ role: 'user', content: `Topic: ${topic}, Tone: ${tone}, Slides: ${slideCount}\nJSON only:` }],
      }),
    });
    const data = await response.json();
    const text = data.content?.[0]?.text ?? '';
    const m = text.match(/```json\s*([\s\S]*?)```/) || text.match(/(\{[\s\S]*\})/);
    if (!m) return res.status(500).json({ error: 'JSON 파싱 실패 — 다시 시도해주세요.' });
    try { return res.json(JSON.parse(m[1] ?? m[0])); }
    catch { return res.status(500).json({ error: 'JSON 파싱 실패.' }); }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// ── /api/cardnews/from-url ──────────────────────────────────────
server.post('/api/cardnews/from-url', async (req, res) => {
  const { url, slideCount = 4 } = req.body ?? {};
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY가 없습니다.' });
  if (!url)    return res.status(400).json({ error: 'url이 필요합니다.' });

  try {
    const fetchUrl = normalizeUrl(url);
    const htmlRes = await fetch(fetchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1',
        'Accept-Language': 'ko-KR,ko;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,*/*;q=0.8',
        'Referer': 'https://blog.naver.com/',
      },
    });
    if (!htmlRes.ok) return res.status(400).json({ error: `URL 접근 실패: ${htmlRes.status}` });

    let html = await htmlRes.text();
    const ogTitle = html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']+)["']/i)?.[1] || '';
    const ogDesc  = html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']+)["']/i)?.[1] || '';

    const bodyAreaMatch = html.match(/(?:se-main-container|post_ct|blog-post|article_body|se_doc_viewer)([\s\S]{0,30000})/i);
    if (bodyAreaMatch) html = bodyAreaMatch[0];

    const extractedImages = [];
    const seen = new Set();
    const addImg = (src) => {
      if (!src || seen.has(src) || !src.startsWith('http')) return;
      const lower = src.toLowerCase();
      if (/icon|logo|avatar|emoji|spinner|blank|pixel|tracking|1x1|btn|button/.test(lower)) return;
      if (!/\.(jpg|jpeg|png|webp|gif)/.test(lower) && !/\/image\/|\/img\/|\/photo\/|\/product\/|\/goods\//.test(lower)) return;
      seen.add(src); extractedImages.push(src);
    };

    const ogImg = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)?.[1];
    if (ogImg) addImg(ogImg);
    for (const attr of ['data-src','data-original','data-lazy-src','data-zoom-image','data-image','data-full']) {
      const re = new RegExp(`${attr}=["']([^"']+)["']`, 'gi');
      let m;
      while ((m = re.exec(html)) !== null && extractedImages.length < 30) addImg(m[1]);
    }
    const srcsetRe = /srcset=["']([^"']+)["']/gi;
    let ssm;
    while ((ssm = srcsetRe.exec(html)) !== null && extractedImages.length < 30) {
      const best = ssm[1].split(',').pop()?.trim().split(/\s+/)[0];
      if (best) addImg(best);
    }
    const imgRe = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let im;
    while ((im = imgRe.exec(html)) !== null && extractedImages.length < 30) addImg(im[1]);
    const bgRe = /background(?:-image)?:\s*url\(["']?([^"')]+)["']?\)/gi;
    let bm;
    while ((bm = bgRe.exec(html)) !== null && extractedImages.length < 30) addImg(bm[1]);

    let textContent = html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ').trim().slice(0, 3000);

    if (textContent.length < 200 && (ogTitle || ogDesc))
      textContent = `제목: ${ogTitle}\n설명: ${ogDesc}\n\n${textContent}`;
    if (textContent.length < 50)
      return res.status(400).json({ error: '텍스트를 추출할 수 없습니다.' });

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2048,
        system: `You convert blog articles to Instagram card news. Respond ONLY with valid JSON.
Output: {"slides":[{"type":"cover","title":"...","body":"..."}...],"hashtags":"#tag1 #tag2"}
- types: cover (first), content (middle), closing (last)
- title: max 22 Korean chars, body: max 100 Korean chars
- Write in Korean. JSON only.`,
        messages: [{ role: 'user', content: `Convert to ${slideCount} slides. JSON only:\n\n${textContent}` }],
      }),
    });
    const data = await response.json();
    const text = data.content?.[0]?.text ?? '';
    const m = text.match(/```json\s*([\s\S]*?)```/) || text.match(/(\{[\s\S]*\})/);
    if (!m) return res.status(500).json({ error: '파싱 실패. 다시 시도해주세요.' });
    try {
      return res.json({ ...JSON.parse(m[1] ?? m[0]), images: extractedImages });
    } catch {
      return res.status(500).json({ error: 'JSON 파싱 실패.' });
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// ── /api/cardnews/generate-image ───────────────────────────────
server.post('/api/cardnews/generate-image', async (req, res) => {
  const { topic, style = 'minimal' } = req.body ?? {};
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY가 없습니다.' });
  if (!topic)  return res.status(400).json({ error: 'topic이 필요합니다.' });

  const STYLES = {
    minimal: 'minimalist clean background, soft pastel gradients, no text, no people, abstract shapes',
    nature:  'beautiful nature photography, soft natural light, bokeh, calming, no text',
    abstract:'modern abstract art, geometric patterns, vibrant but harmonious colors, no text',
    dark:    'dark moody background, deep colors, dramatic lighting, luxury feel, no text',
  };
  const prompt = `Instagram card background about "${topic}". ${STYLES[style] ?? STYLES.minimal}. Square 1:1 ratio, suitable for text overlay. No words in image.`;

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-image-1', prompt, n: 1, size: '1024x1024', quality: 'medium' }),
    });
    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error?.message ?? '이미지 생성 실패' });
    }
    const data = await response.json();
    const b64 = data.data?.[0]?.b64_json;
    if (!b64) return res.status(500).json({ error: '이미지 데이터 없음' });
    return res.json({ image: `data:image/png;base64,${b64}` });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// ── /api/buffer-proxy ──────────────────────────────────────────
server.get('/api/buffer-proxy/profiles', async (req, res) => {
  const token = req.headers['x-buffer-token'];
  if (!token) return res.status(400).json({ error: 'Buffer token required' });
  try {
    const r = await fetch('https://api.bufferapp.com/1/profiles.json', {
      headers: { Authorization: `Bearer ${token}` },
    });
    res.status(r.status).json(await r.json());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

server.post('/api/buffer-proxy/publish', async (req, res) => {
  const token = req.headers['x-buffer-token'];
  const { profileId, text, imageUrl } = req.body ?? {};
  if (!token) return res.status(400).json({ error: 'Buffer token required' });
  try {
    const params = new URLSearchParams({ profile_ids: profileId, text });
    if (imageUrl) params.append('media[photo]', imageUrl);
    const r = await fetch('https://api.bufferapp.com/1/updates/create.json', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    res.status(r.status).json(await r.json());
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// ── 정적 파일 (빌드된 React 앱) ────────────────────────────────
const distPath = app.isPackaged
  ? path.join(process.resourcesPath, 'dist')
  : path.join(__dirname, '../dist');

server.use(express.static(distPath));

// SPA 폴백 — React Router 클라이언트 라우팅 지원
server.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = 5175;
server.listen(PORT, '127.0.0.1', () => {
  console.log(`[CardFlow] 서버 시작: http://127.0.0.1:${PORT}`);
});

// ─── Electron 윈도우 ─────────────────────────────────────────────
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1200,
    minHeight: 700,
    title: 'CardFlow — AI 카드뉴스',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
    show: false, // 로딩 완료 후 표시
  });

  mainWindow.setMenuBarVisibility(false);

  // 외부 링크는 시스템 브라우저로
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // 서버 준비 대기 후 로드
  const tryLoad = (retries = 10) => {
    mainWindow.loadURL(`http://127.0.0.1:${PORT}`).catch(() => {
      if (retries > 0) setTimeout(() => tryLoad(retries - 1), 300);
    });
  };
  setTimeout(() => tryLoad(), 500);

  mainWindow.once('ready-to-show', () => mainWindow.show());
}

app.whenReady().then(() => {
  if (!checkExpiry()) { app.quit(); return; }
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
