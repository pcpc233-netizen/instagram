import { Plus, Trash2 } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { TEMPLATE_MAP } from '../templates';

const THUMB = 128;

export function SlideList() {
  const {
    slides, activeIndex, template: globalTemplate, brandName, accentColor, fontFamily,
    addSlide, removeSlide, setActive,
  } = useEditorStore();

  return (
    <aside className="w-44 bg-gray-950 border-r border-gray-800 flex flex-col overflow-y-auto flex-shrink-0">
      <div className="px-3 pt-3 pb-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
        슬라이드
      </div>

      <div className="flex flex-col gap-1 p-2">
        {slides.map((slide, i) => {
          const Template = TEMPLATE_MAP[slide.template ?? globalTemplate];
          return (
            <button
              key={slide.id}
              onClick={() => setActive(i)}
              className={`relative group rounded-lg overflow-hidden border-2 transition-all ${
                i === activeIndex
                  ? 'border-indigo-500 shadow-lg shadow-indigo-500/20'
                  : 'border-transparent hover:border-gray-600'
              }`}
            >
              {/* Thumbnail */}
              <div style={{ width: THUMB, height: THUMB, overflow: 'hidden', position: 'relative', ['--card-font' as string]: fontFamily }}>
                <div style={{ width: 1080, height: 1080, transform: `scale(${THUMB / 1080})`, transformOrigin: 'top left', pointerEvents: 'none', position: 'absolute', top: 0, left: 0 }}>
                  <Template slide={slide} index={i} total={slides.length} brandName={brandName} accentColor={accentColor} />
                </div>
              </div>

              {/* Slide number + per-slide template indicator */}
              <div className={`text-xs text-center py-1 font-medium flex items-center justify-center gap-1 ${i === activeIndex ? 'text-indigo-400 bg-indigo-950/60' : 'text-gray-500 bg-gray-900'}`}>
                <span>{i + 1}</span>
                {slide.template && <span className="w-1 h-1 rounded-full bg-indigo-400 inline-block" title="개별 템플릿" />}
              </div>

              {/* Delete button */}
              {slides.length > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); removeSlide(slide.id); }}
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-500 rounded p-0.5 transition-opacity"
                >
                  <Trash2 size={10} className="text-white" />
                </button>
              )}
            </button>
          );
        })}
      </div>

      {slides.length < 10 && (
        <button
          onClick={addSlide}
          className="mx-3 mb-3 mt-1 p-2 border border-dashed border-gray-700 hover:border-indigo-500 hover:text-indigo-400 rounded-lg text-gray-500 text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus size={14} />
          슬라이드 추가
        </button>
      )}
    </aside>
  );
}
