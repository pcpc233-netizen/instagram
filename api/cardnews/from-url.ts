import type { VercelRequest, VercelResponse } from '@vercel/node';

function extractText(html: string): string {
  // Remove noise tags
  let clean = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, '')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, '')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, '');

  // Try to isolate main content block
  const mainPatterns = [
    /<article[^>]*>([\s\S]*?)<\/article>/i,
    /<div[^>]*class="[^"]*(?:article|post|content|entry)[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*id="[^"]*(?:article|post|content|entry)[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<main[^>]*>([\s\S]*?)<\/main>/i,
  ];
  for (const p of mainPatterns) {
    const m = clean.match(p);
    if (m && m[1].length > 300) { clean = m[1]; break; }
  }

  // Extract paragraph-level text
  const paras: string[] = [];
  const re = /<(?:p|h[1-6]|li|blockquote)[^>]*>([\s\S]*?)<\/(?:p|h[1-6]|li|blockquote)>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(clean)) !== null) {
    const t = m[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
    if (t.length > 15) paras.push(t);
  }

  return paras.join('\n').slice(0, 4000);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { url, slideCount = 5 } = req.body ?? {};
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY가 설정되지 않았습니다.' });
  if (!url) return res.status(400).json({ error: 'url이 필요합니다.' });

  try {
    // Fetch blog HTML
    const fetchRes = await fetch(String(url), {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'ko-KR,ko;q=0.9,en;q=0.8',
      },
      signal: AbortSignal.timeout(10000),
    });

    if (!fetchRes.ok) throw new Error(`URL 접근 실패 (${fetchRes.status})`);

    const html = await fetchRes.text();
    const blogText = extractText(html);

    if (blogText.length < 80) {
      throw new Error('블로그 본문을 추출할 수 없습니다. 공개된 URL인지 확인해주세요.');
    }

    // Generate card news
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2048,
        system: '당신은 블로그 글을 인스타그램 카드뉴스로 변환하는 전문가입니다. JSON만 반환하세요.',
        messages: [{
          role: 'user',
          content: `다음 블로그 글을 인스타그램 카드뉴스 ${slideCount}장으로 변환해주세요.

[블로그 내용]
${blogText}

아래 JSON 형식으로만 응답하세요:
{
  "slides": [
    {"type": "cover", "title": "핵심 제목(15자 이내)", "body": "핵심 한 줄 요약"},
    {"type": "content", "title": "포인트 제목", "body": "핵심 내용 2~3줄"},
    {"type": "cta", "title": "저장하고 나중에 봐요!", "body": "팔로우하면 더 많은 정보를\\n받을 수 있어요 :)"}
  ],
  "hashtags": "#관련태그1 #관련태그2 ... (20개 이상)"
}

요건: 제목 15자 이내, 본문 줄바꿈(\\n) 사용, 해시태그 20개 이상, 한국어 작성`,
        }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({ error: err });
    }

    const data = await response.json();
    const text: string = data.content?.[0]?.text ?? '';
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return res.status(500).json({ error: 'AI 응답을 파싱할 수 없습니다.' });

    return res.status(200).json(JSON.parse(match[0]));
  } catch (e: any) {
    return res.status(500).json({ error: e.message ?? 'Internal error' });
  }
}
