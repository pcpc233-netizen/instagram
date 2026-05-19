import React from 'react';
import { TemplateProps } from './types';

const FONT = 'var(--card-font, "Noto Sans KR", "Apple SD Gothic Neo", sans-serif)';

export const MinimalWhite: React.FC<TemplateProps> = ({
  slide, index, total, brandName, accentColor,
}) => {
  const hasBg = !!slide.bgImage;
  const textPrimary = hasBg ? '#FFFFFF' : '#111827';
  const textSecondary = hasBg ? 'rgba(255,255,255,0.8)' : '#6B7280';
  const brandColor = hasBg ? '#FFFFFF' : accentColor;

  return (
  <div
    style={{
      width: 1080,
      height: 1080,
      background: hasBg ? `url(${slide.bgImage}) center/cover no-repeat` : '#FFFFFF',
      fontFamily: FONT,
      display: 'flex',
      flexDirection: 'column',
      padding: '80px',
      boxSizing: 'border-box',
      position: 'relative',
    }}
  >
    {hasBg && (
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.52)' }} />
    )}
    {/* Header */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 60, position: 'relative' }}>
      <span style={{ color: brandColor, fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px' }}>
        {brandName}
      </span>
      <span style={{ color: hasBg ? 'rgba(255,255,255,0.5)' : '#D1D5DB', fontSize: 24, fontWeight: 400 }}>
        {index + 1}&nbsp;/&nbsp;{total}
      </span>
    </div>

    {/* Content */}
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
      {slide.type === 'cover' && (
        <div
          style={{
            width: 72,
            height: 8,
            background: hasBg ? 'rgba(255,255,255,0.7)' : accentColor,
            borderRadius: 4,
            marginBottom: 52,
          }}
        />
      )}
      <h1
        style={{
          fontSize: slide.type === 'cover' ? 88 : 76,
          fontWeight: 900,
          color: textPrimary,
          lineHeight: 1.2,
          letterSpacing: '-2px',
          margin: 0,
          marginBottom: 44,
          whiteSpace: 'pre-wrap',
        }}
      >
        {slide.title}
      </h1>
      <p
        style={{
          fontSize: 36,
          color: textSecondary,
          lineHeight: 1.8,
          margin: 0,
          whiteSpace: 'pre-wrap',
        }}
      >
        {slide.body}
      </p>
    </div>

    {/* Accent bar */}
    <div
      style={{
        height: 6,
        background: hasBg ? 'rgba(255,255,255,0.4)' : accentColor,
        borderRadius: 3,
        marginTop: 60,
        position: 'relative',
      }}
    />
  </div>
  );
};
