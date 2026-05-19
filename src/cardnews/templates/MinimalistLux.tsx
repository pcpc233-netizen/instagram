import React from 'react';
import { TemplateProps } from './types';

const FONT = 'var(--card-font, "Noto Sans KR", "Apple SD Gothic Neo", sans-serif)';

// 울트라 미니멀 럭스 — 여백 극대화, Toteme / A.P.C 스타일
export const MinimalistLux: React.FC<TemplateProps> = ({
  slide, index, total, brandName, accentColor,
}) => {
  const hasBg = !!slide.bgImage;
  const bg = hasBg ? `url(${slide.bgImage}) center/cover no-repeat` : '#F9F9F7';

  return (
    <div style={{ width: 1080, height: 1080, background: bg, fontFamily: FONT, position: 'relative', overflow: 'hidden' }}>
      {hasBg && <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.82)' }} />}

      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* 상단 여백 + 브랜드 */}
        <div style={{ padding: '72px 88px 0', display: 'flex', justifyContent: 'center' }}>
          <span style={{ color: '#0A0A0A', fontSize: 20, fontWeight: 300, letterSpacing: '8px', textTransform: 'uppercase' }}>
            {brandName.replace('@', '')}
          </span>
        </div>

        {/* 헤더 구분선 */}
        <div style={{ margin: '40px 88px 0', height: 1, background: '#0A0A0A', opacity: 0.12 }} />

        {/* 메인 콘텐츠 — 대여백 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 100px', textAlign: 'center' }}>
          {slide.type === 'cover' && (
            <p style={{ color: accentColor, fontSize: 18, fontWeight: 500, letterSpacing: '6px', textTransform: 'uppercase', margin: '0 0 40px', opacity: 0.8 }}>
              S/S COLLECTION
            </p>
          )}

          <h1 style={{
            color: '#0A0A0A',
            fontSize: slide.type === 'cover' ? 88 : 76,
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: '-2px',
            margin: '0 0 52px',
            whiteSpace: 'pre-wrap',
          }}>
            {slide.title}
          </h1>

          {/* 중앙 장식 */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 48 }}>
            <div style={{ width: 28, height: 1, background: accentColor }} />
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor }} />
            <div style={{ width: 28, height: 1, background: accentColor }} />
          </div>

          <p style={{
            color: '#6B6B6B',
            fontSize: 32,
            fontWeight: 300,
            lineHeight: 1.95,
            margin: 0,
            whiteSpace: 'pre-wrap',
            letterSpacing: '0.3px',
          }}>
            {slide.body}
          </p>
        </div>

        {/* 하단 */}
        <div style={{ padding: '0 88px 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ height: 1, flex: 1, background: '#0A0A0A', opacity: 0.12 }} />
          <span style={{ color: '#AAAAAA', fontSize: 18, letterSpacing: '3px', padding: '0 24px' }}>
            {index + 1}&nbsp;·&nbsp;{total}
          </span>
          <div style={{ height: 1, flex: 1, background: '#0A0A0A', opacity: 0.12 }} />
        </div>
      </div>
    </div>
  );
};
