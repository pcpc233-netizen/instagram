import { BufferProfile } from '../store/editorStore';

export async function fetchBufferProfiles(token: string): Promise<BufferProfile[]> {
  const res = await fetch('/api/buffer-proxy/profiles', {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error('프로필을 불러오지 못했습니다. 토큰을 확인해주세요.');
  const data = await res.json();
  return Array.isArray(data) ? data : [];
}

export async function publishToBuffer(params: {
  token: string;
  profileId: string;
  text: string;
  imageUrl: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const res = await fetch('/api/buffer-proxy/publish', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  return res.json();
}
