import { useRef, useState } from 'react';
import {
  ArrowLeft, Download, Layers, Share2, RotateCcw, Loader2, Sparkles,
} from 'lucide-react';
import { useEditorStore } from './store/editorStore';
import { SlideList } from './components/SlideList';
import { SlidePreview } from './components/SlidePreview';
import { PropertiesPanel } from './components/PropertiesPanel';
import { BufferPanel } from './components/BufferPanel';
import { AiPanel } from './components/AiPanel';
import { downloadSlide, downloadAllAsZip } from './lib/exportImages';

interface Props {
  onBack: () => void;
}

export function CardNewsApp({ onBack }: Props) {
  const { slides, activeIndex, brandName, reset } = useEditorStore();
  const exportRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showBuffer, setShowBuffer] = useState(false);
  const [showAi, setShowAi] = useState(false);
  const [exporting, setExporting] = useState<'single' | 'all' | null>(null);

  const handleDownloadCurrent = async () => {
    const el = exportRefs.current[activeIndex];
    if (!el) return;
    setExporting('single');
    try {
      await downloadSlide(el, `${brandName}_slide_${String(activeIndex + 1).padStart(2, '0')}.png`);
    } finally {
      setExporting(null);
    }
  };

  const handleDownloadAll = async () => {
    setExporting('all');
    try {
      await downloadAllAsZip(exportRefs.current, brandName);
    } finally {
      setExporting(null);
    }
  };

  const handleReset = () => {
    if (confirm('모든 내용을 초기화하시겠습니까?')) reset();
  };

  return (
    <div className="h-screen flex flex-col bg-gray-950 text-white overflow-hidden">
      {/* ── Header ── */}
      <header className="h-14 flex items-center justify-between px-4 border-b border-gray-800 bg-gray-900 flex-shrink-0 gap-4">
        {/* Left */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm whitespace-nowrap"
          >
            <ArrowLeft size={15} />
            뒤로
          </button>
          <div className="h-4 w-px bg-gray-700 flex-shrink-0" />
          <div className="flex items-center gap-2 min-w-0">
            <Layers size={15} className="text-indigo-400 flex-shrink-0" />
            <span className="font-semibold text-sm truncate">카드뉴스 에디터</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setShowAi(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 border border-indigo-500/40 text-indigo-300 hover:text-indigo-200 text-sm rounded-lg transition-colors font-medium"
          >
            <Sparkles size={13} />
            AI 자동 생성
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-gray-400 hover:text-white text-sm rounded-lg hover:bg-gray-800 transition-colors"
          >
            <RotateCcw size={13} />
            초기화
          </button>

          <button
            onClick={handleDownloadCurrent}
            disabled={!!exporting}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm rounded-lg transition-colors disabled:opacity-50"
          >
            {exporting === 'single' ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Download size={13} />
            )}
            현재 저장
          </button>

          <button
            onClick={handleDownloadAll}
            disabled={!!exporting}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors font-medium disabled:opacity-50"
          >
            {exporting === 'all' ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Download size={13} />
            )}
            전체 저장 ({slides.length}장)
          </button>

          <div className="h-4 w-px bg-gray-700" />

          <button
            onClick={() => setShowBuffer(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-sm rounded-lg transition-colors"
          >
            <Share2 size={13} />
            Buffer 발행
          </button>
        </div>
      </header>

      {/* ── Body ── */}
      <div className="flex flex-1 overflow-hidden">
        <SlideList />
        <SlidePreview exportRefs={exportRefs} />
        <PropertiesPanel />
      </div>

      {showAi && <AiPanel onClose={() => setShowAi(false)} />}

      {/* ── Buffer modal ── */}
      {showBuffer && (
        <BufferPanel
          exportRefs={exportRefs}
          onClose={() => setShowBuffer(false)}
        />
      )}
    </div>
  );
}
