import { useState, useRef } from 'react';
import {
  X, Sparkles, Link2, Loader2, CheckCircle, AlertCircle, ChevronDown,
  ImageIcon, Layers, MousePointerClick, Upload, Trash2,
} from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

interface Props {
  onClose: () => void;
}

type Tab = 'topic' | 'url';
type Status = 'idle' | 'loading' | 'success' | 'error';

const TONES = ['정보전달', '감성적', '전문적', '유머/가벼운'];
const SLIDE_COUNTS = [3, 4, 5, 6, 7, 8];

export function AiPanel({ onClose }: Props) {
  const { loadGenerated, setSlideImage } = useEditorStore();

  const [tab, setTab] = useState<Tab>('topic');
  const [topic, setTopic] = useState('');
  const [url, setUrl] = useState('');
  const [tone, setTone] = useState('정보전달');
  const [slideCount, setSlideCount] = useState(4);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [preview, setPreview] = useState<{ slides: any[]; hashtags: string; images?: string[] } | null>(null);

  // 슬라이드별 이미지 할당: slideIdx → imageUrl
  const [slideImages, setSlideImages] = useState<Record<number, string>>({});
  // 현재 이미지 선택 중인 슬라이드 인덱스
  const [focusedSlide, setFocusedSlide] = useState<number | null>(null);
  // 로드 실패한 이미지 숨기기
  const [brokenImgs, setBrokenImgs] = useState<Set<string>>(new Set());
  // 사용자 업로드 이미지 (base64)
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isLoading = status === 'loading';
  const scrapedImages = preview?.images?.filter((img) => !brokenImgs.has(img)) ?? [];
  const validImages = [...uploadedImages, ...scrapedImages];
  const hasImages = validImages.length > 0 || uploadedImages.length > 0;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        if (dataUrl) setUploadedImages((prev) => [dataUrl, ...prev]);
      };
      reader.readAsDataURL(file);
    });
    // reset input so same file can be re-uploaded
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeUploaded = (img: string) => {
    setUploadedImages((prev) => prev.filter((i) => i !== img));
    setSlideImages((prev) => {
      const next = { ...prev };
      Object.entries(next).forEach(([k, v]) => { if (v === img) delete next[+k]; });
      return next;
    });
  };

  const handleGenerate = async () => {
    setStatus('loading');
    setErrorMsg('');
    setPreview(null);
    setSlideImages({});
    setFocusedSlide(null);

    try {
      const endpoint = tab === 'topic' ? '/api/cardnews/generate' : '/api/cardnews/from-url';
      const body = tab === 'topic' ? { topic, tone, slideCount } : { url, slideCount };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error ?? '생성 실패');

      setPreview(data);
      setStatus('success');
    } catch (e: any) {
      setStatus('error');
      setErrorMsg(e.message ?? '오류가 발생했습니다');
    }
  };

  const handleImageClick = (img: string) => {
    if (focusedSlide === null) return;
    setSlideImages((prev) => {
      // 같은 이미지 클릭 시 해제
      if (prev[focusedSlide] === img) {
        const next = { ...prev };
        delete next[focusedSlide];
        return next;
      }
      return { ...prev, [focusedSlide]: img };
    });
  };

  const handleApplyAll = (img: string) => {
    if (!preview) return;
    const all: Record<number, string> = {};
    preview.slides.forEach((_, i) => { all[i] = img; });
    setSlideImages(all);
    setFocusedSlide(null);
  };

  const handleApply = () => {
    if (!preview) return;
    // 먼저 슬라이드 텍스트 적용 → 이후 이미지 적용
    loadGenerated(preview.slides, preview.hashtags);
    // loadGenerated는 새 ID를 만드므로 store에서 현재 slides 읽어야 함
    // 대신 setSlideImage를 setTimeout으로 적용 (store 업데이트 후)
    const entries = Object.entries(slideImages);
    if (entries.length > 0) {
      setTimeout(() => {
        const { slides: newSlides } = useEditorStore.getState();
        entries.forEach(([idxStr, imgUrl]) => {
          const idx = parseInt(idxStr);
          if (newSlides[idx]) setSlideImage(newSlides[idx].id, imgUrl);
        });
      }, 0);
    }
    onClose();
  };

  const canGenerate = tab === 'topic' ? topic.trim().length > 0 : url.trim().length > 0;
  const assignedCount = Object.keys(slideImages).length;

  // 미리보기가 있거나 업로드 이미지가 있으면 와이드 모달
  const modalWidth = preview || uploadedImages.length > 0 ? 'max-w-3xl' : 'max-w-lg';

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`bg-gray-900 border border-gray-700 rounded-2xl w-full ${modalWidth} shadow-2xl flex flex-col max-h-[92vh] transition-all duration-300`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-indigo-400" />
            <h2 className="text-white font-semibold">AI 자동 생성</h2>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body — split layout when preview or uploaded images exist */}
        <div className={`flex flex-1 overflow-hidden ${preview || uploadedImages.length > 0 ? 'flex-row' : 'flex-col'}`}>

          {/* Left / Main panel */}
          <div className={`flex flex-col overflow-y-auto ${preview || uploadedImages.length > 0 ? 'w-[340px] flex-shrink-0 border-r border-gray-800' : 'flex-1'} p-6`}>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-800 p-1 rounded-xl mb-5 flex-shrink-0">
              <button
                onClick={() => { setTab('topic'); setStatus('idle'); setPreview(null); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  tab === 'topic' ? 'bg-indigo-600 text-white shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Sparkles size={14} />주제로 생성
              </button>
              <button
                onClick={() => { setTab('url'); setStatus('idle'); setPreview(null); }}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  tab === 'url' ? 'bg-indigo-600 text-white shadow' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Link2 size={14} />URL 생성
              </button>
            </div>

            {/* Topic form */}
            {tab === 'topic' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block font-medium">주제 / 키워드</label>
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && canGenerate && !isLoading && handleGenerate()}
                    placeholder="예: 직장인 점심 다이어트, 주식 투자 초보 가이드..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block font-medium">톤앤매너</label>
                    <div className="relative">
                      <select value={tone} onChange={(e) => setTone(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 appearance-none">
                        {TONES.map((t) => <option key={t}>{t}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block font-medium">슬라이드 수</label>
                    <div className="relative">
                      <select value={slideCount} onChange={(e) => setSlideCount(Number(e.target.value))}
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 appearance-none">
                        {SLIDE_COUNTS.map((n) => <option key={n} value={n}>{n}장</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* URL form */}
            {tab === 'url' && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block font-medium">URL 입력</label>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://... 뉴스, 쇼핑몰, 블로그 모두 지원"
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500"
                  />
                  <p className="text-xs text-gray-500 mt-1.5">뉴스 · 쇼핑몰 상세 · 티스토리 · 네이버 블로그 · 브런치</p>
                </div>
                <div>
                  <label className="text-xs text-gray-400 mb-1.5 block font-medium">슬라이드 수</label>
                  <div className="relative w-32">
                    <select value={slideCount} onChange={(e) => setSlideCount(Number(e.target.value))}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 appearance-none">
                      {SLIDE_COUNTS.map((n) => <option key={n} value={n}>{n}장</option>)}
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {status === 'error' && (
              <div className="mt-4 flex items-start gap-2 bg-red-950/40 border border-red-800 rounded-xl px-4 py-3">
                <AlertCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-red-400 text-sm">{errorMsg}</p>
              </div>
            )}

            {/* Slide preview list */}
            {preview && (
              <div className="mt-5 space-y-2 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle size={14} className="text-green-400" />
                  <span className="text-green-400 text-sm font-medium">생성 완료 — {preview.slides.length}장</span>
                  {assignedCount > 0 && (
                    <span className="ml-auto text-xs text-indigo-400 bg-indigo-900/40 px-2 py-0.5 rounded-full">
                      이미지 {assignedCount}장 할당됨
                    </span>
                  )}
                </div>

                {/* 이미지가 있을 때 슬라이드 선택 안내 */}
                {hasImages && (
                  <div className="flex items-center gap-1.5 text-xs text-amber-400/80 bg-amber-900/20 border border-amber-700/30 rounded-lg px-3 py-2 mb-3">
                    <MousePointerClick size={12} />
                    슬라이드 클릭 → 오른쪽에서 이미지 선택
                  </div>
                )}

                <div className="space-y-1.5 overflow-y-auto max-h-64">
                  {preview.slides.map((s: any, i: number) => {
                    const assigned = slideImages[i];
                    const isFocused = focusedSlide === i;
                    return (
                      <button
                        key={i}
                        onClick={() => hasImages && setFocusedSlide(isFocused ? null : i)}
                        className={`w-full text-left rounded-xl p-3 transition-all border ${
                          isFocused
                            ? 'border-indigo-500 bg-indigo-900/30'
                            : assigned
                            ? 'border-green-700/50 bg-green-900/10 hover:border-green-600/60'
                            : hasImages
                            ? 'border-gray-700 hover:border-gray-600 bg-gray-800/50 cursor-pointer'
                            : 'border-gray-700 bg-gray-800/50 cursor-default'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {/* Assigned image thumbnail or slot */}
                          <div className="w-10 h-10 rounded-lg flex-shrink-0 overflow-hidden border border-gray-600 bg-gray-700">
                            {assigned ? (
                              <img src={assigned} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-500">
                                <ImageIcon size={14} />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 mb-0.5">
                              <span className="text-xs text-indigo-400 font-semibold uppercase">{s.type}</span>
                              <span className="text-xs text-gray-600">{i + 1}번</span>
                              {isFocused && <span className="text-xs text-indigo-300 bg-indigo-800/50 px-1.5 py-0.5 rounded ml-auto">선택 중</span>}
                              {assigned && !isFocused && <CheckCircle size={11} className="text-green-400 ml-auto" />}
                            </div>
                            <p className="text-white text-xs font-semibold truncate">{s.title}</p>
                            <p className="text-gray-500 text-xs mt-0.5 truncate">{s.body}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {preview.hashtags && (
                  <div className="bg-gray-800/60 rounded-xl p-3 mt-2">
                    <p className="text-xs text-gray-500 mb-1">해시태그</p>
                    <p className="text-indigo-400 text-xs leading-relaxed">{preview.hashtags}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right panel — always show when preview or uploads exist */}
          {(preview || uploadedImages.length > 0) && (
            <div className="flex-1 flex flex-col overflow-hidden p-5">
              <div className="flex items-center gap-2 mb-2 flex-shrink-0">
                <ImageIcon size={14} className="text-indigo-400" />
                <span className="text-sm font-medium text-white">
                  이미지 <span className="text-gray-400 font-normal">({validImages.length}장)</span>
                </span>
                {focusedSlide !== null && (
                  <span className="ml-auto text-xs text-amber-300 bg-amber-900/30 px-2 py-0.5 rounded-full">
                    {focusedSlide + 1}번 슬라이드에 적용 중
                  </span>
                )}
              </div>

              {/* 업로드 버튼 */}
              <div className="flex-shrink-0 mb-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleUpload}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 py-2 border border-dashed border-gray-600 hover:border-indigo-500 rounded-xl text-gray-400 hover:text-indigo-300 text-xs font-medium transition-colors"
                >
                  <Upload size={13} />
                  내 이미지 업로드 (여러 장 가능)
                </button>
              </div>

              {focusedSlide === null && validImages.length > 0 && (
                <p className="text-xs text-gray-500 mb-2 flex-shrink-0">왼쪽 슬라이드 클릭 → 이미지 선택</p>
              )}

              <div className="overflow-y-auto flex-1">
                {validImages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-gray-600 gap-2">
                    <ImageIcon size={28} />
                    <p className="text-xs">이미지가 없습니다<br/>위 버튼으로 업로드하세요</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {validImages.map((img, i) => {
                      const isUploaded = uploadedImages.includes(img);
                      const assignedSlides = Object.entries(slideImages)
                        .filter(([, v]) => v === img)
                        .map(([k]) => parseInt(k) + 1);
                      const isSelectedForFocused = focusedSlide !== null && slideImages[focusedSlide] === img;

                      return (
                        <div key={i} className="space-y-1">
                          <div className="relative group">
                            <button
                              onClick={() => focusedSlide !== null && handleImageClick(img)}
                              disabled={focusedSlide === null}
                              className={`relative w-full aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                                isSelectedForFocused
                                  ? 'border-indigo-400 ring-2 ring-indigo-500/40'
                                  : assignedSlides.length > 0
                                  ? 'border-green-600/60'
                                  : focusedSlide !== null
                                  ? 'border-gray-600 hover:border-indigo-400 cursor-pointer'
                                  : 'border-gray-700 opacity-60 cursor-not-allowed'
                              }`}
                            >
                              <img
                                src={img}
                                alt=""
                                className="w-full h-full object-cover"
                                onError={() => !isUploaded && setBrokenImgs((prev) => new Set([...prev, img]))}
                              />
                              {focusedSlide !== null && !isSelectedForFocused && (
                                <div className="absolute inset-0 bg-indigo-600/0 hover:bg-indigo-600/20 transition-colors flex items-center justify-center">
                                  <span className="opacity-0 hover:opacity-100 text-white text-xs font-medium bg-indigo-600/80 px-2 py-1 rounded-lg transition-opacity">선택</span>
                                </div>
                              )}
                              {assignedSlides.length > 0 && (
                                <div className="absolute top-1 right-1 flex gap-0.5">
                                  {assignedSlides.map((n) => (
                                    <span key={n} className="bg-green-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                                      {n}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {/* 업로드 이미지 표시 */}
                              {isUploaded && (
                                <div className="absolute bottom-1 left-1 bg-indigo-600/80 text-white text-xs px-1.5 py-0.5 rounded-md leading-none">
                                  내 파일
                                </div>
                              )}
                            </button>
                            {/* 업로드 이미지 삭제 버튼 */}
                            {isUploaded && (
                              <button
                                onClick={() => removeUploaded(img)}
                                className="absolute -top-1.5 -right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 size={10} />
                              </button>
                            )}
                          </div>
                          <button
                            onClick={() => handleApplyAll(img)}
                            className="w-full text-xs text-gray-500 hover:text-indigo-300 hover:bg-indigo-900/20 py-1 rounded-lg transition-colors flex items-center justify-center gap-1"
                          >
                            <Layers size={10} />전체 적용
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-800 flex gap-3 flex-shrink-0">
          {!preview ? (
            <button
              onClick={handleGenerate}
              disabled={!canGenerate || isLoading}
              className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-xl text-white font-semibold text-sm transition-colors"
            >
              {isLoading ? (
                <><Loader2 size={15} className="animate-spin" />생성 중...</>
              ) : (
                <><Sparkles size={15} />AI 생성 시작</>
              )}
            </button>
          ) : (
            <>
              <button
                onClick={() => { setPreview(null); setStatus('idle'); setSlideImages({}); setFocusedSlide(null); }}
                className="px-5 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl text-gray-300 text-sm font-medium transition-colors"
              >
                다시 생성
              </button>
              <button
                onClick={handleApply}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-green-600 hover:bg-green-700 rounded-xl text-white font-semibold text-sm transition-colors"
              >
                <CheckCircle size={15} />
                에디터에 적용
                {assignedCount > 0 && <span className="bg-green-500/50 text-xs px-1.5 py-0.5 rounded-full">{assignedCount}장 이미지 포함</span>}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
