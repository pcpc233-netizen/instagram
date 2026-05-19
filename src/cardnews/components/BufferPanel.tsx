import React, { useState } from 'react';
import { X, ExternalLink, Share2, CheckCircle, AlertCircle } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { fetchBufferProfiles, publishToBuffer } from '../lib/bufferClient';
import { captureElement } from '../lib/exportImages';
import { supabase } from '../../lib/supabase';

interface Props {
  exportRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  onClose: () => void;
}

type Status = 'idle' | 'connecting' | 'uploading' | 'publishing' | 'success' | 'error';

export function BufferPanel({ exportRefs, onClose }: Props) {
  const {
    activeIndex,
    bufferToken, bufferProfiles, selectedProfileId,
    setBufferToken, setBufferProfiles, setSelectedProfile,
  } = useEditorStore();

  const [caption, setCaption] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleConnect = async () => {
    if (!bufferToken.trim()) return;
    setStatus('connecting');
    setErrorMsg('');
    try {
      const profiles = await fetchBufferProfiles(bufferToken);
      setBufferProfiles(profiles);
      setStatus('idle');
    } catch (e: any) {
      setStatus('error');
      setErrorMsg(e.message ?? '연결 실패');
    }
  };

  const handlePublish = async () => {
    const el = exportRefs.current[activeIndex];
    if (!el || !selectedProfileId) return;

    setStatus('uploading');
    setErrorMsg('');

    try {
      // 1. Capture PNG
      const dataUrl = await captureElement(el);
      const blob = await (await fetch(dataUrl)).blob();

      // 2. Upload to Supabase Storage for a public URL
      const path = `cardnews/${Date.now()}_slide${activeIndex + 1}.png`;
      const { error: uploadErr } = await supabase.storage
        .from('cardnews')
        .upload(path, blob, { contentType: 'image/png', upsert: true });

      if (uploadErr) throw new Error(`이미지 업로드 실패: ${uploadErr.message}`);

      const { data: urlData } = supabase.storage.from('cardnews').getPublicUrl(path);
      const imageUrl = urlData.publicUrl;

      // 3. Publish to Buffer
      setStatus('publishing');
      const result = await publishToBuffer({
        token: bufferToken,
        profileId: selectedProfileId,
        text: caption,
        imageUrl,
      });

      if (result.error) throw new Error(result.error);
      setStatus('success');
    } catch (e: any) {
      setStatus('error');
      setErrorMsg(e.message ?? '발행 중 오류가 발생했습니다');
    }
  };

  const statusLabel: Record<Status, string> = {
    idle: '지금 발행하기',
    connecting: '연결 중...',
    uploading: '이미지 업로드 중...',
    publishing: 'Buffer에 발행 중...',
    success: '발행 완료!',
    error: '다시 시도',
  };

  const isLoading = ['connecting', 'uploading', 'publishing'].includes(status);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Share2 size={18} className="text-indigo-400" />
            <h2 className="text-white font-semibold">Buffer 발행</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Access Token */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs text-gray-400 font-medium">Buffer Access Token</label>
              <a
                href="https://buffer.com/developers/api"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                발급받기 <ExternalLink size={11} />
              </a>
            </div>
            <div className="flex gap-2">
              <input
                type="password"
                value={bufferToken}
                onChange={(e) => setBufferToken(e.target.value)}
                placeholder="access token 입력"
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
              <button
                onClick={handleConnect}
                disabled={!bufferToken.trim() || isLoading}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg text-white text-sm font-medium transition-colors whitespace-nowrap"
              >
                {status === 'connecting' ? '연결 중...' : '계정 연결'}
              </button>
            </div>
          </div>

          {/* Profile selector */}
          {bufferProfiles.length > 0 && (
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block font-medium">발행 계정</label>
              <select
                value={selectedProfileId}
                onChange={(e) => setSelectedProfile(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
              >
                <option value="">계정 선택...</option>
                {bufferProfiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.service} · {p.formatted_username}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Caption */}
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block font-medium">캡션 / 해시태그</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder={'인스타그램 캡션을 입력하세요\n\n#해시태그1 #해시태그2'}
              rows={5}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm resize-none focus:outline-none focus:border-indigo-500 leading-relaxed"
            />
          </div>

          {/* Slide info */}
          <div className="bg-gray-800/60 rounded-lg px-4 py-3 text-sm text-gray-400">
            슬라이드 <span className="text-white font-medium">{activeIndex + 1}번</span>을 발행합니다
          </div>

          {/* Status messages */}
          {status === 'error' && (
            <div className="flex items-start gap-2 bg-red-950/40 border border-red-800 rounded-lg px-4 py-3">
              <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-400 text-sm">{errorMsg}</p>
            </div>
          )}
          {status === 'success' && (
            <div className="flex items-center gap-2 bg-green-950/40 border border-green-800 rounded-lg px-4 py-3">
              <CheckCircle size={16} className="text-green-400" />
              <p className="text-green-400 text-sm">Buffer에 성공적으로 발행되었습니다!</p>
            </div>
          )}

          {/* Publish button */}
          <button
            onClick={handlePublish}
            disabled={!bufferToken || !selectedProfileId || isLoading || status === 'success'}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-colors text-sm"
          >
            {statusLabel[status]}
          </button>
        </div>
      </div>
    </div>
  );
}
