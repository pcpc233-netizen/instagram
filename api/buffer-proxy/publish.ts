import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { token, profileId, text, imageUrl } = req.body ?? {};

  if (!token || !profileId || !imageUrl) {
    return res.status(400).json({ error: 'token, profileId, imageUrl are required' });
  }

  try {
    const params = new URLSearchParams({
      'profile_ids[]': String(profileId),
      text: String(text ?? ''),
      'media[photo]': String(imageUrl),
      now: 'true',
    });

    const response = await fetch('https://api.bufferapp.com/1/updates/create.json', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.message ?? 'Buffer API error',
      });
    }

    const updateId = Array.isArray(data.updates) ? data.updates[0]?.id : undefined;
    return res.status(200).json({ success: true, id: updateId });
  } catch (e: any) {
    return res.status(500).json({ error: e.message ?? 'Internal error' });
  }
}
