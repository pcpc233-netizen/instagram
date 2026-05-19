import React from 'react';
import { useEditorStore } from '../store/editorStore';
import { TEMPLATE_MAP } from '../templates';

const PREVIEW = 520;

interface Props {
  exportRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

export function SlidePreview({ exportRefs }: Props) {
  const { slides, activeIndex, template: globalTemplate, brandName, accentColor, fontFamily } = useEditorStore();
  const slide = slides[activeIndex];

  if (!slide) return null;

  const Template = TEMPLATE_MAP[slide.template ?? globalTemplate];

  return (
    <main className="flex-1 flex flex-col items-center justify-center bg-gray-800 p-8 overflow-hidden">
      {/* Visible preview */}
      <div
        style={{
          width: PREVIEW,
          height: PREVIEW,
          overflow: 'hidden',
          borderRadius: 6,
          boxShadow: '0 32px 72px rgba(0,0,0,0.6)',
          flexShrink: 0,
          ['--card-font' as string]: fontFamily,
        }}
      >
        <div
          style={{
            width: 1080,
            height: 1080,
            transform: `scale(${PREVIEW / 1080})`,
            transformOrigin: 'top left',
            pointerEvents: 'none',
          }}
        >
          <Template
            slide={slide}
            index={activeIndex}
            total={slides.length}
            brandName={brandName}
            accentColor={accentColor}
          />
        </div>
      </div>

      <p className="text-gray-500 text-sm mt-4">
        슬라이드 {activeIndex + 1} / {slides.length} &nbsp;·&nbsp; 1080 × 1080 px
        {slide.template && (
          <span className="ml-2 text-indigo-400 text-xs">· 개별 템플릿</span>
        )}
      </p>

      {/* Hidden off-screen elements for export */}
      <div
        aria-hidden="true"
        style={{ position: 'fixed', left: -99999, top: 0, pointerEvents: 'none' }}
      >
        {slides.map((sl, i) => {
          const SlTemplate = TEMPLATE_MAP[sl.template ?? globalTemplate];
          return (
            <div
              key={sl.id}
              ref={(el) => { exportRefs.current[i] = el; }}
              style={{ width: 1080, height: 1080, ['--card-font' as string]: fontFamily }}
            >
              <SlTemplate
                slide={sl}
                index={i}
                total={slides.length}
                brandName={brandName}
                accentColor={accentColor}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
