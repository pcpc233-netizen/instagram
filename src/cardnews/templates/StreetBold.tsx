import React from 'react';
import { TemplateProps } from './types';

const FONT = 'var(--card-font, "Noto Sans KR", "Apple SD Gothic Neo", sans-serif)';

// 스트리트웨어 / 하입 브랜드 (무신사, 스투시, 슈프림 스타일)
export const StreetBold: React.FC<TemplateProps> = ({
  slide, index, total, brandName, accentColor,
}) => {
  const hasBg = !!slide.bgImage;
  const bgStyle = hasBg
    ? `url(${slide.bgImage}) center/cover no-repeat`
    : `linear-gradient(160deg, #0A0A0A 0%, #1A1A1A 100%)`;

  return (
    <div style={{ width: 1080, height: 1080, background: bgStyle, fontFamily: FONT, position: 'relative', overflow: 'hidden' }}>
      {hasBg && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.72)' }} />}

      {/* 배경 대형 장식 텍스트 */}
      <div style={{
        position: 'absolute',
        bottom: -40,
        right: -20,
        fontSize: 320,
        fontWeight: 900,
        color: 'rgba(255,255,255,0.03)',
        lineHeight: 1,
        letterSpacing: '-10px',
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* 상단 태그 */}
      <div style={{ position: 'absolute', top: 60, left: 60, right: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ background: accentColor, padding: '10px 24px', display: 'inline-block' }}>
          <span style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase' }}>
            {brandName.replace('@', '')}
          </span>
        </div>
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: 20, letterSpacing: '2px' }}>
          {index + 1}/{total}
        </span>
      </div>

      {/* 중앙 콘텐츠 */}
      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '160px 60px 120px' }}>

        {slide.type !== 'cover' && (
          <span style={{ color: accentColor, fontSize: 22, fontWeight: 700, letterSpacing: '6px', textTransform: 'uppercase', marginBottom: 28, display: 'block' }}>
            {`POINT ${String(index).padStart(2, '0')}`}
          </span>
        )}

        <h1 style={{
          color: '#FFFFFF',
          fontSize: slide.type === 'cover' ? 108 : 88,
          fontWeight: 900,
          lineHeight: 1.05,
          letterSpacing: '-3px',
          margin: '0 0 0',
          whiteSpace: 'pre-wrap',
          textTransform: slide.type === 'cover' ? 'uppercase' : 'none',
        }}>
          {slide.title}
        </h1>

        {/* 액센트 바 */}
        <div style={{ width: 80, height: 6, background: accentColor, margin: '44px 0', borderRadius: 0 }} />

        <p style={{
          color: 'rgba(255,255,255,0.65)',
          fontSize: 32,
          fontWeight: 400,
          lineHeight: 1.8,
          margin: 0,
          whiteSpace: 'pre-wrap',
        }}>
          {slide.body}
        </p>
      </div>

      {/* 하단 스캔라인 느낌 */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 6, background: accentColor }} />
    </div>
  );
};
