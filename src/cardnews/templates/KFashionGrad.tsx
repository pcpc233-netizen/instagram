import React from 'react';
import { TemplateProps } from './types';

const FONT = 'var(--card-font, "Noto Sans KR", "Apple SD Gothic Neo", sans-serif)';

// K-패션 그라디언트 (무신사, 29CM, W컨셉 스타일)
export const KFashionGrad: React.FC<TemplateProps> = ({
  slide, index, total, brandName, accentColor,
}) => {
  const hasBg = !!slide.bgImage;

  // accentColor 기반 그라디언트 생성
  const bgStyle = hasBg
    ? `url(${slide.bgImage}) center/cover no-repeat`
    : `linear-gradient(135deg, ${accentColor}22 0%, ${accentColor}08 50%, #F8F8FA 100%)`;

  const textMain = '#0A0A0A';
  const textSub = '#5A5A6A';
  const overlayBg = hasBg ? 'rgba(255,255,255,0.88)' : 'transparent';

  return (
    <div style={{ width: 1080, height: 1080, background: bgStyle, fontFamily: FONT, position: 'relative', overflow: 'hidden' }}>
      {hasBg && <div style={{ position: 'absolute', inset: 0, background: overlayBg }} />}

      {/* 좌측 세로 액센트 바 */}
      <div style={{ position: 'absolute', left: 0, top: 0, width: 8, height: '100%', background: accentColor }} />

      {/* 우측 상단 원형 장식 */}
      <div style={{
        position: 'absolute', top: -80, right: -80,
        width: 320, height: 320,
        borderRadius: '50%',
        border: `2px solid ${accentColor}30`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 200, height: 200,
        borderRadius: '50%',
        background: `${accentColor}10`,
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', padding: '72px 72px 72px 100px' }}>

        {/* 상단 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <span style={{ color: accentColor, fontSize: 22, fontWeight: 700, letterSpacing: '4px', textTransform: 'uppercase', display: 'block' }}>
              {brandName.replace('@', '')}
            </span>
            {slide.type === 'cover' && (
              <span style={{ color: textSub, fontSize: 18, fontWeight: 300, letterSpacing: '2px', marginTop: 8, display: 'block' }}>
                2024 S/S COLLECTION
              </span>
            )}
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ color: '#C4C4CC', fontSize: 18, letterSpacing: '2px' }}>
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h1 style={{
            color: textMain,
            fontSize: slide.type === 'cover' ? 92 : 78,
            fontWeight: 800,
            lineHeight: 1.2,
            letterSpacing: '-2.5px',
            margin: '0 0 36px',
            whiteSpace: 'pre-wrap',
          }}>
            {slide.title}
          </h1>

          {/* 키 포인트 태그 */}
          {slide.type !== 'cover' && (
            <div style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap' }}>
              <span style={{ background: accentColor, color: '#fff', fontSize: 18, fontWeight: 600, padding: '8px 20px', borderRadius: 40, letterSpacing: '1px' }}>
                POINT {index}
              </span>
            </div>
          )}

          <p style={{
            color: textSub,
            fontSize: 34,
            fontWeight: 400,
            lineHeight: 1.85,
            margin: 0,
            whiteSpace: 'pre-wrap',
          }}>
            {slide.body}
          </p>
        </div>

        {/* 하단 태그라인 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
            <div style={{ width: 32, height: 2, background: accentColor }} />
            <span style={{ color: '#9CA3AF', fontSize: 18, letterSpacing: '3px', textTransform: 'uppercase' }}>
              {slide.type === 'cta' ? 'Follow & Shop' : 'Korean Fashion'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
