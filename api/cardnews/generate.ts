import type { VercelRequest, VercelResponse } from '@vercel/node';

const SYSTEM = `당신은 인스타그램 카드뉴스 전문 에디터입니다.
주어진 주제로 슬라이드 콘텐츠를 JSON으로만 반환하세요. 다른 텍스트는 절대 포함하지 마세요.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { topic, tone = '정보전달', slideCount = 4 } = req.body ?? {};
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) return res.status(500).json({ error: 'ANTHROPIC_API_KEY가 설정되지 않았습니다.' });
  if (!topic) return res.status(400).json({ error: 'topic이 필요합니다.' });

  const contentCount = Math.max(1, Number(slideCount) - 2);

  const prompt = `주제: "${topic}"
톤앤매너: ${tone}
슬라이드 구성: 커버 1장 + 내용 ${contentCount}장 + CTA 1장 = 총 ${slideCount}장

아래 JSON 형식으로만 응답하세요:
{
  "slides": [
    {"type": "cover", "title": "제목(15자 이내)", "body": "부제목(30자 이내)"},
    {"type": "content", "title": "소제목(15자 이내)", "body": "핵심 내용 2~3줄"},
    {"type": "cta", "title": "행동 유도 문구", "body": "팔로우 또는 저장 유도"}
  ],
  "hashtags": "#태그1 #태그2 ... (20개 이상)"
}

요구사항:
- 제목은 임팩트 있고 간결하게
- 본문은 줄바꿈(\\n)으로 2~3줄
- 해시태그는 한국어+영어 혼용으로 20개 이상
- 전체 한국어로 작성`;

  try {
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
        system: SYSTEM,
        messages: [{ role: 'user', content: prompt }],
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
