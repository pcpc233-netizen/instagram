import type { VercelRequest, VercelResponse } from '@vercel/node';

const STYLE_PROMPTS: Record<string, string> = {
  minimal: 'minimalist clean background, soft pastel gradients, no text, no people, abstract shapes, professional',
  nature: 'beautiful nature photography, soft natural light, bokeh, calming, no text',
  abstract: 'modern abstract art, geometric patterns, vibrant but harmonious colors, no text',
  dark: 'dark moody background, deep colors, dramatic lighting, luxury feel, no text',
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { topic, style = 'minimal' } = req.body ?? {};
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY가 설정되지 않았습니다.' });
  if (!topic) return res.status(400).json({ error: 'topic이 필요합니다.' });

  const styleDesc = STYLE_PROMPTS[style] ?? STYLE_PROMPTS.minimal;
  const prompt = `Instagram card background about "${topic}". ${styleDesc}. Square 1:1 ratio, suitable for text overlay with high contrast. No words or letters in image.`;

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt,
        n: 1,
        size: '1024x1024',
        response_format: 'b64_json',
        quality: 'standard',
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error?.message ?? 'Image generation failed' });
    }

    const data = await response.json();
    const b64: string | undefined = data.data?.[0]?.b64_json;
    if (!b64) return res.status(500).json({ error: '이미지 데이터를 받지 못했습니다.' });

    return res.status(200).json({ image: `data:image/png;base64,${b64}` });
  } catch (e: any) {
    return res.status(500).json({ error: e.message ?? 'Internal error' });
  }
}
