import React from 'react';
import { TemplateProps } from './types';

const FONT = 'var(--card-font, "Noto Sans KR", "Apple SD Gothic Neo", sans-serif)';

// Vogue / 명품 브랜드 에디토리얼 스타일
export const LuxuryEditorial: React.FC<TemplateProps> = ({
  slide, index, total, brandName, accentColor,
}) => {
  const hasBg = !!slide.bgImage;
  const bg = hasBg ? `url(${slide.bgImage}) center/cover no-repeat` : '#FAF8F4';
  const overlayColor = hasBg ? 'rgba(0,0,0,0.55)' : 'transparent';
  const textMain = hasBg ? '#FFFFFF' : '#0A0A0A';
  const textSub = hasBg ? 'rgba(255,255,255,0.75)' : '#5A5A5A';
  const gold = hasBg ? 'rgba(255,255,255,0.6)' : accentColor;

  return (
    <div style={{ width: 1080, height: 1080, background: bg, fontFamily: FONT, position: 'relative', boxSizing: 'border-box', overflow: 'hidden' }}>
      {hasBg && <div style={{ position: 'absolute', inset: 0, background: overlayColor }} />}

      {/* 얇은 프레임 테두리 */}
      <div style={{ position: 'absolute', inset: 40, border: `1px solid ${hasBg ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.12)'}`, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '80px' }}>
        {/* 상단 브랜드 + 페이지 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: textMain, fontSize: 22, fontWeight: 300, letterSpacing: '6px', textTransform: 'uppercase', opacity: 0.7 }}>
            {brandName.replace('@', '')}
          </span>
          <span style={{ color: textSub, fontSize: 20, fontWeight: 300, letterSpacing: '3px' }}>
            {String(index + 1).padStart(2, '0')}&nbsp;&nbsp;/&nbsp;&nbsp;{String(total).padStart(2, '0')}
          </span>
        </div>

        {/* 중앙 콘텐츠 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          {/* 골드 장식선 위 */}
          <div style={{ width: 48, height: 1, background: gold, marginBottom: 48 }} />

          {slide.type === 'cover' && (
            <p style={{ color: hasBg ? 'rgba(255,255,255,0.5)' : '#9CA3AF', fontSize: 20, fontWeight: 300, letterSpacing: '8px', textTransform: 'uppercase', margin: '0 0 28px' }}>
              COLLECTION
            </p>
          )}

          <h1 style={{ color: textMain, fontSize: slide.type === 'cover' ? 96 : 80, fontWeight: 800, lineHeight: 1.15, letterSpacing: '-2px', margin: '0 0 48px', whiteSpace: 'pre-wrap' }}>
            {slide.title}
          </h1>

          {/* 골드 장식선 아래 */}
          <div style={{ width: 48, height: 1, background: gold, marginBottom: 44 }} />

          <p style={{ color: textSub, fontSize: 32, fontWeight: 300, lineHeight: 1.9, margin: 0, whiteSpace: 'pre-wrap', maxWidth: '80%' }}>
            {slide.body}
          </p>
        </div>

        {/* 하단 */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span style={{ color: hasBg ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.25)', fontSize: 18, fontWeight: 300, letterSpacing: '4px', textTransform: 'uppercase' }}>
            {slide.type === 'cover' ? 'NEW SEASON' : slide.type === 'cta' ? 'FOLLOW US' : 'STYLE GUIDE'}
          </span>
        </div>
      </div>
    </div>
  );
};
