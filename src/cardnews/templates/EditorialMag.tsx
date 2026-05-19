import React from 'react';
import { TemplateProps } from './types';

const FONT = 'var(--card-font, "Noto Sans KR", "Apple SD Gothic Neo", sans-serif)';

// 매거진 에디토리얼 — 검은 배경, 비대칭 레이아웃 (Hypebeast, 보그 스타일)
export const EditorialMag: React.FC<TemplateProps> = ({
  slide, index, total, brandName, accentColor,
}) => {
  const hasBg = !!slide.bgImage;

  return (
    <div style={{ width: 1080, height: 1080, background: hasBg ? `url(${slide.bgImage}) center/cover no-repeat` : '#000000', fontFamily: FONT, position: 'relative', overflow: 'hidden' }}>
      {hasBg && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.75)' }} />}

      {/* 격자 장식선 */}
      <div style={{ position: 'absolute', top: 0, left: '30%', width: 1, height: '100%', background: 'rgba(255,255,255,0.06)' }} />
      <div style={{ position: 'absolute', top: '65%', left: 0, width: '100%', height: 1, background: 'rgba(255,255,255,0.06)' }} />

      {/* 좌상단 — 이슈 번호 */}
      <div style={{ position: 'absolute', top: 60, left: 64 }}>
        <div style={{ color: accentColor, fontSize: 96, fontWeight: 900, lineHeight: 1, letterSpacing: '-4px', opacity: 0.9 }}>
          {String(index + 1).padStart(2, '0')}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: 20, fontWeight: 300, letterSpacing: '3px', textTransform: 'uppercase', marginTop: 8 }}>
          of&nbsp;{String(total).padStart(2, '0')}
        </div>
      </div>

      {/* 우상단 브랜드 */}
      <div style={{ position: 'absolute', top: 64, right: 64, textAlign: 'right' }}>
        <span style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, letterSpacing: '5px', textTransform: 'uppercase', opacity: 0.7 }}>
          {brandName.replace('@', '')}
        </span>
      </div>

      {/* 메인 타이틀 — 비대칭 하단 배치 */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 64px 72px' }}>
        {slide.type !== 'cover' && (
          <span style={{ color: accentColor, fontSize: 20, fontWeight: 700, letterSpacing: '5px', textTransform: 'uppercase', display: 'block', marginBottom: 20 }}>
            CHAPTER {String(index).padStart(2, '0')}
          </span>
        )}

        <h1 style={{
          color: '#FFFFFF',
          fontSize: slide.type === 'cover' ? 112 : 90,
          fontWeight: 900,
          lineHeight: 1.0,
          letterSpacing: '-4px',
          margin: '0 0 36px',
          whiteSpace: 'pre-wrap',
        }}>
          {slide.title}
        </h1>

        {/* 구분선 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
          <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
        </div>

        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: 28,
          fontWeight: 300,
          lineHeight: 1.8,
          margin: 0,
          whiteSpace: 'pre-wrap',
          maxWidth: '85%',
        }}>
          {slide.body}
        </p>
      </div>

      {/* 우측 세로 텍스트 */}
      <div style={{
        position: 'absolute', right: 28, top: '50%', transform: 'translateY(-50%)',
        color: 'rgba(255,255,255,0.12)', fontSize: 16, fontWeight: 700,
        letterSpacing: '4px', writingMode: 'vertical-rl', textTransform: 'uppercase',
      }}>
        FASHION&nbsp;EDITORIAL
      </div>
    </div>
  );
};
