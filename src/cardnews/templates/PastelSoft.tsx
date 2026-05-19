import React from 'react';
import { TemplateProps } from './types';

const FONT = 'var(--card-font, "Noto Sans KR", "Apple SD Gothic Neo", sans-serif)';

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

export const PastelSoft: React.FC<TemplateProps> = ({
  slide, index, total, brandName, accentColor,
}) => {
  const { r, g, b } = hexToRgb(accentColor);

  const hasBg = !!slide.bgImage;

  return (
    <div
      style={{
        width: 1080,
        height: 1080,
        background: hasBg
          ? `url(${slide.bgImage}) center/cover no-repeat`
          : `linear-gradient(145deg, rgba(${r},${g},${b},0.08) 0%, rgba(${r},${g},${b},0.02) 60%, #FFFFFF 100%)`,
        backgroundColor: '#FAFAFA',
        fontFamily: FONT,
        display: 'flex',
        flexDirection: 'column',
        padding: '80px',
        boxSizing: 'border-box',
      }}
    >
      {hasBg && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />
      )}
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 60, position: 'relative' }}>
        <div
          style={{
            background: `rgba(${r},${g},${b},0.12)`,
            borderRadius: 100,
            padding: '10px 28px',
          }}
        >
          <span style={{ color: accentColor, fontSize: 26, fontWeight: 700 }}>{brandName}</span>
        </div>
        <span style={{ color: '#9CA3AF', fontSize: 24 }}>{index + 1} / {total}</span>
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
        {slide.type === 'cover' && (
          <div
            style={{
              display: 'inline-block',
              background: `rgba(${r},${g},${b},0.12)`,
              color: accentColor,
              fontSize: 24,
              fontWeight: 700,
              padding: '10px 28px',
              borderRadius: 100,
              marginBottom: 44,
              alignSelf: 'flex-start',
              letterSpacing: '2px',
            }}
          >
            CARD NEWS
          </div>
        )}
        <h1
          style={{
            fontSize: slide.type === 'cover' ? 84 : 72,
            fontWeight: 900,
            color: hasBg ? '#FFFFFF' : '#1F2937',
            lineHeight: 1.25,
            letterSpacing: '-1.5px',
            margin: 0,
            marginBottom: 44,
            whiteSpace: 'pre-wrap',
          }}
        >
          {slide.title}
        </h1>
        <p
          style={{
            fontSize: 34,
            color: hasBg ? 'rgba(255,255,255,0.85)' : '#4B5563',
            lineHeight: 1.8,
            margin: 0,
            whiteSpace: 'pre-wrap',
          }}
        >
          {slide.body}
        </p>
      </div>

      {/* Slide indicator dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 60, position: 'relative' }}>
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              width: i === index ? 36 : 12,
              height: 12,
              borderRadius: 6,
              background: i === index ? accentColor : `rgba(${r},${g},${b},0.2)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
