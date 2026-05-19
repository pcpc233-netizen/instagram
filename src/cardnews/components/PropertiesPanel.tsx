import { useRef, useState } from 'react';
import { ImagePlus, Loader2, X, Layers, Type, Upload, RefreshCw } from 'lucide-react';
import { useEditorStore, TemplateId } from '../store/editorStore';
import { TEMPLATE_MAP, TEMPLATE_INFO } from '../templates';
import { Slide } from '../store/editorStore';

const IMAGE_STYLES = [
  { value: 'minimal', label: '미니멀' },
  { value: 'nature', label: '자연' },
  { value: 'abstract', label: '추상' },
  { value: 'dark', label: '다크' },
];

const PRESET_COLORS = [
  '#6366f1', '#3b82f6', '#8b5cf6', '#ec4899',
  '#ef4444', '#f97316', '#22c55e', '#14b8a6',
  '#0ea5e9', '#f59e0b', '#64748b', '#111827',
];

const SAMPLE_SLIDE: Slide = {
  id: 'preview',
  type: 'cover',
  title: '제목',
  body: '본문',
};

const GOOGLE_FONTS: { family: string; label: string; weights: string }[] = [
  { family: '"Noto Sans KR"', label: 'Noto Sans KR', weights: '300;400;700;900' },
  { family: '"Nanum Gothic"', label: '나눔고딕', weights: '400;700;800' },
  { family: '"Nanum Myeongjo"', label: '나눔명조', weights: '400;700;800' },
  { family: '"Black Han Sans"', label: '블랙한산스', weights: '400' },
  { family: '"Jua"', label: '주아', weights: '400' },
  { family: '"Do Hyeon"', label: '도현', weights: '400' },
  { family: '"Gowun Dodum"', label: '고운돋움', weights: '400' },
  { family: '"Gugi"', label: '구기', weights: '400' },
];

function loadGoogleFont(family: string, weights: string) {
  const id = `gf-${family.replace(/[^a-z]/gi, '')}`;
  if (document.getElementById(id)) return;
  const link = document.createElement('link');
  link.id = id;
  link.rel = 'stylesheet';
  const name = family.replace(/"/g, '').replace(/ /g, '+');
  link.href = `https://fonts.googleapis.com/css2?family=${name}:wght@${weights}&display=swap`;
  document.head.appendChild(link);
}

function TemplateThumb({
  id, effectiveTemplate, isSlideOverride, onApply, brandName, accentColor,
}: {
  id: TemplateId;
  effectiveTemplate: TemplateId;
  isSlideOverride: boolean;
  onApply: (id: TemplateId) => void;
  brandName: string;
  accentColor: string;
}) {
  const TplComp = TEMPLATE_MAP[id];
  const isActive = effectiveTemplate === id;
  return (
    <button
      onClick={() => onApply(id)}
      className={`relative rounded-lg overflow-hidden border-2 transition-all text-left ${
        isActive
          ? isSlideOverride
            ? 'border-indigo-400 ring-2 ring-indigo-500/40'
            : 'border-indigo-500'
          : 'border-gray-700 hover:border-gray-500'
      }`}
    >
      <div style={{ width: '100%', paddingBottom: '100%', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          <div style={{
            width: 1080, height: 1080,
            transform: `scale(${120 / 1080})`,
            transformOrigin: 'top left',
            pointerEvents: 'none',
            position: 'absolute',
          }}>
            <TplComp slide={SAMPLE_SLIDE} index={0} total={3} brandName={brandName} accentColor={accentColor} />
          </div>
        </div>
      </div>
      <div className={`px-2 py-1.5 text-xs font-medium truncate ${
        isActive ? 'bg-indigo-950/80 text-indigo-300' : 'bg-gray-900 text-gray-400'
      }`}>
        {TEMPLATE_INFO[id].label}
      </div>
    </button>
  );
}

export function PropertiesPanel() {
  const {
    slides, activeIndex,
    template, brandName, accentColor,
    fontFamily, customFonts,
    setTemplate, setBrandName, setAccentColor, updateSlide, setSlideImage, setAllSlidesImage,
    setSlideTemplate, setFontFamily, addCustomFont,
  } = useEditorStore();

  const [imgStyle, setImgStyle] = useState('minimal');
  const [imgLoading, setImgLoading] = useState<'single' | 'all' | null>(null);
  const [imgError, setImgError] = useState('');
  const fontUploadRef = useRef<HTMLInputElement>(null);

  const active = slides[activeIndex];
  if (!active) return null;

  const effectiveTemplate: TemplateId = active.template ?? template;
  const hasSlideOverride = !!active.template;

  const fetchImage = async (topic: string) => {
    const res = await fetch('/api/cardnews/generate-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, style: imgStyle }),
    });
    const data = await res.json();
    if (!res.ok || data.error) throw new Error(data.error ?? '생성 실패');
    return data.image as string;
  };

  const handleGenerateImage = async () => {
    setImgLoading('single'); setImgError('');
    try {
      setSlideImage(active.id, await fetchImage(active.title || brandName));
    } catch (e: any) {
      setImgError(e.message ?? '이미지 생성 실패');
    } finally { setImgLoading(null); }
  };

  const handleGenerateAll = async () => {
    setImgLoading('all'); setImgError('');
    try {
      setAllSlidesImage(await fetchImage(brandName || active.title));
    } catch (e: any) {
      setImgError(e.message ?? '이미지 생성 실패');
    } finally { setImgLoading(null); }
  };

  // Template handlers
  const applyToSlide = (id: TemplateId) => setSlideTemplate(active.id, id);
  const applyToAll = () => {
    setTemplate(effectiveTemplate);
    // clear all per-slide overrides
    slides.forEach((sl) => setSlideTemplate(sl.id, undefined));
  };
  const resetSlideTemplate = () => setSlideTemplate(active.id, undefined);

  // Font handlers
  const handleFontChange = (family: string) => {
    const found = GOOGLE_FONTS.find((f) => f.family === family);
    if (found) loadGoogleFont(found.family, found.weights);
    setFontFamily(family);
  };

  const handleFontUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const family = file.name.replace(/\.[^.]+$/, '').replace(/\s+/g, '');
      const style = document.createElement('style');
      style.textContent = `@font-face { font-family: "${family}"; src: url("${dataUrl}"); }`;
      document.head.appendChild(style);
      addCustomFont({ name: file.name.replace(/\.[^.]+$/, ''), family: `"${family}"`, dataUrl });
      setFontFamily(`"${family}"`);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const allFontOptions = [
    ...GOOGLE_FONTS,
    ...customFonts.map((f) => ({ family: f.family, label: `${f.name} (업로드)`, weights: '400' })),
  ];

  return (
    <aside className="w-72 bg-gray-950 border-l border-gray-800 flex flex-col overflow-y-auto flex-shrink-0">
      <div className="p-4 space-y-6">

        {/* ── 슬라이드 내용 ── */}
        <section>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            슬라이드 내용
          </h3>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">제목</label>
              <textarea
                value={active.title}
                onChange={(e) => updateSlide(active.id, { title: e.target.value })}
                rows={3}
                placeholder="제목 입력"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">본문</label>
              <textarea
                value={active.body}
                onChange={(e) => updateSlide(active.id, { body: e.target.value })}
                rows={5}
                placeholder="본문 입력 (줄바꿈 가능)"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm resize-none focus:outline-none focus:border-indigo-500 leading-relaxed"
              />
            </div>
          </div>
        </section>

        <div className="border-t border-gray-800" />

        {/* ── 템플릿 ── */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">템플릿</h3>
            <button
              onClick={applyToAll}
              title="현재 슬라이드의 템플릿을 전체에 적용하고 개별 설정 초기화"
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
            >
              <Layers size={11} />전체 적용
            </button>
          </div>

          {/* 개별 적용 상태 표시 */}
          {hasSlideOverride ? (
            <div className="flex items-center justify-between bg-indigo-950/50 border border-indigo-800/50 rounded-lg px-3 py-2 mb-3">
              <span className="text-xs text-indigo-300 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" />
                개별 설정: {TEMPLATE_INFO[active.template!].label}
              </span>
              <button
                onClick={resetSlideTemplate}
                className="text-gray-500 hover:text-gray-300 transition-colors"
                title="개별 설정 초기화"
              >
                <RefreshCw size={12} />
              </button>
            </div>
          ) : (
            <p className="text-xs text-gray-600 mb-2">클릭 → 이 슬라이드만 적용</p>
          )}

          {/* 기본 */}
          <p className="text-xs text-gray-500 mb-2 font-medium">기본</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {(['minimal-white', 'dark-premium', 'pastel-soft', 'bold-type'] as TemplateId[]).map((id) => (
              <TemplateThumb
                key={id} id={id}
                effectiveTemplate={effectiveTemplate}
                isSlideOverride={hasSlideOverride}
                onApply={applyToSlide}
                brandName={brandName} accentColor={accentColor}
              />
            ))}
          </div>

          {/* 패션 브랜드 */}
          <p className="text-xs text-indigo-400 mb-2 font-medium flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 inline-block" />
            패션 브랜드
          </p>
          <div className="grid grid-cols-2 gap-2">
            {(['luxury-editorial', 'split-frame', 'street-bold', 'kfashion-grad', 'editorial-mag', 'minimalist-lux'] as TemplateId[]).map((id) => (
              <TemplateThumb
                key={id} id={id}
                effectiveTemplate={effectiveTemplate}
                isSlideOverride={hasSlideOverride}
                onApply={applyToSlide}
                brandName={brandName} accentColor={accentColor}
              />
            ))}
          </div>
        </section>

        <div className="border-t border-gray-800" />

        {/* ── 폰트 ── */}
        <section>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Type size={13} />폰트
          </h3>

          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500 mb-1.5 block">무료 폰트 선택</label>
              <select
                value={fontFamily}
                onChange={(e) => handleFontChange(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
              >
                {allFontOptions.map((f) => (
                  <option key={f.family} value={f.family}>{f.label}</option>
                ))}
              </select>
            </div>

            {/* 폰트 미리보기 */}
            <div
              className="bg-gray-800/60 rounded-lg px-3 py-3 text-center border border-gray-700/50"
              style={{ fontFamily: fontFamily }}
            >
              <p className="text-white text-base font-bold mb-0.5">가나다라 ABCDabcd</p>
              <p className="text-gray-400 text-xs">패션 브랜드 카드뉴스</p>
            </div>

            {/* 커스텀 폰트 업로드 */}
            <div>
              <input
                ref={fontUploadRef}
                type="file"
                accept=".ttf,.otf,.woff,.woff2"
                className="hidden"
                onChange={handleFontUpload}
              />
              <button
                onClick={() => fontUploadRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-500 rounded-xl text-gray-300 hover:text-white text-xs font-medium transition-colors"
              >
                <Upload size={13} />내 폰트 업로드 (.ttf/.otf/.woff)
              </button>
              {customFonts.length > 0 && (
                <div className="mt-2 space-y-1">
                  {customFonts.map((f) => (
                    <div key={f.family} className="flex items-center justify-between bg-gray-800/50 rounded px-2.5 py-1.5">
                      <span className="text-xs text-gray-300" style={{ fontFamily: f.family }}>{f.name}</span>
                      <button
                        onClick={() => handleFontChange(f.family)}
                        className={`text-xs px-2 py-0.5 rounded transition-colors ${fontFamily === f.family ? 'bg-indigo-600 text-white' : 'text-indigo-400 hover:text-indigo-300'}`}
                      >
                        {fontFamily === f.family ? '사용중' : '적용'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <div className="border-t border-gray-800" />

        {/* ── AI 배경 이미지 ── */}
        <section>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            AI 배경 이미지
          </h3>

          {active.bgImage ? (
            <div className="relative rounded-lg overflow-hidden mb-3">
              <img src={active.bgImage} alt="bg" className="w-full aspect-square object-cover rounded-lg" />
              <button
                onClick={() => setSlideImage(active.id, '')}
                className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 rounded-full p-1 transition-colors"
              >
                <X size={12} className="text-white" />
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 mb-3">
              {IMAGE_STYLES.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setImgStyle(s.value)}
                  className={`py-2 rounded-lg border text-xs font-medium transition-colors ${
                    imgStyle === s.value
                      ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                      : 'border-gray-700 text-gray-400 hover:border-gray-500'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {imgError && <p className="text-red-400 text-xs mb-2">{imgError}</p>}

          <div className="flex gap-2">
            <button
              onClick={handleGenerateImage}
              disabled={!!imgLoading}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 rounded-xl text-gray-300 hover:text-white text-xs font-medium transition-colors"
            >
              {imgLoading === 'single' ? (
                <><Loader2 size={12} className="animate-spin" />생성 중...</>
              ) : (
                <><ImagePlus size={12} />이 슬라이드</>
              )}
            </button>
            <button
              onClick={handleGenerateAll}
              disabled={!!imgLoading}
              title={`이미지 1장 생성 → 전체 ${slides.length}장 일괄 적용`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-indigo-900/40 hover:bg-indigo-800/50 border border-indigo-700/50 disabled:opacity-50 rounded-xl text-indigo-300 hover:text-indigo-200 text-xs font-medium transition-colors"
            >
              {imgLoading === 'all' ? (
                <><Loader2 size={12} className="animate-spin" />적용 중...</>
              ) : (
                <><Layers size={12} />전체 {slides.length}장</>
              )}
            </button>
          </div>
        </section>

        <div className="border-t border-gray-800" />

        {/* ── 브랜드 설정 ── */}
        <section>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            브랜드 설정
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">브랜드명</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="@브랜드명"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-2 block">포인트 컬러</label>
              <div className="grid grid-cols-6 gap-2 mb-3">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setAccentColor(color)}
                    style={{ background: color }}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                      accentColor === color ? 'border-white scale-110' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={accentColor}
                  onChange={(e) => setAccentColor(e.target.value)}
                  className="w-9 h-9 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                  title="직접 선택"
                />
                <input
                  type="text"
                  value={accentColor}
                  onChange={(e) => {
                    if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) setAccentColor(e.target.value);
                  }}
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white text-sm font-mono focus:outline-none focus:border-indigo-500"
                  maxLength={7}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </aside>
  );
}
