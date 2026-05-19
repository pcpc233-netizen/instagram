import React from 'react';
import { TemplateProps } from './types';

const FONT = 'var(--card-font, "Noto Sans KR", "Apple SD Gothic Neo", sans-serif)';

// 좌우 분할 — 구조적/건축적 느낌 (Cos, Arket 스타일)
export const SplitFrame: React.FC<TemplateProps> = ({
  slide, index, total, brandName, accentColor,
}) => {
  const hasBg = !!slide.bgImage;

  return (
    <div style={{ width: 1080, height: 1080, fontFamily: FONT, display: 'flex', position: 'relative', overflow: 'hidden' }}>
      {/* 왼쪽: 이미지 or 검은 배경 */}
      <div style={{
        width: '52%',
        background: hasBg ? `url(${slide.bgImage}) center/cover no-repeat` : '#0A0A0A',
        position: 'relative',
      }}>
        {hasBg && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }} />}
        {/* 슬라이드 번호 세로 */}
        <div style={{ position: 'absolute', bottom: 72, left: 52, color: 'rgba(255,255,255,0.35)', fontSize: 18, fontWeight: 300, letterSpacing: '3px', writingMode: 'vertical-rl' }}>
          {String(index + 1).padStart(2, '0')}&nbsp;—&nbsp;{String(total).padStart(2, '0')}
        </div>
        {/* 좌측 하단 브랜드 */}
        <div style={{ position: 'absolute', top: 60, left: 52, color: 'rgba(255,255,255,0.5)', fontSize: 20, fontWeight: 300, letterSpacing: '5px', textTransform: 'uppercase' }}>
          {brandName.replace('@', '')}
        </div>
      </div>

      {/* 세로 구분선 */}
      <div style={{ width: 1, background: accentColor, flexShrink: 0, zIndex: 1 }} />

      {/* 오른쪽: 텍스트 */}
      <div style={{ flex: 1, background: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '72px 64px 72px 72px' }}>

        {slide.type === 'cover' && (
          <span style={{ color: accentColor, fontSize: 18, fontWeight: 600, letterSpacing: '5px', textTransform: 'uppercase', marginBottom: 32, display: 'block' }}>
            NEW ARRIVAL
          </span>
        )}

        <h1 style={{
          color: '#0A0A0A',
          fontSize: slide.type === 'cover' ? 82 : 70,
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-2px',
          margin: '0 0 44px',
          whiteSpace: 'pre-wrap',
        }}>
          {slide.title}
        </h1>

        {/* 액센트 선 */}
        <div style={{ width: 52, height: 3, background: accentColor, marginBottom: 40, borderRadius: 2 }} />

        <p style={{
          color: '#4B5563',
          fontSize: 30,
          fontWeight: 400,
          lineHeight: 1.85,
          margin: 0,
          whiteSpace: 'pre-wrap',
        }}>
          {slide.body}
        </p>

        {slide.type === 'cta' && (
          <div style={{ marginTop: 52, display: 'inline-flex', alignItems: 'center', gap: 12, color: accentColor, fontSize: 22, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            <span>SHOP NOW</span>
            <span style={{ fontSize: 26 }}>→</span>
          </div>
        )}
      </div>
    </div>
  );
};
