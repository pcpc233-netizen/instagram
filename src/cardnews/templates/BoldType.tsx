import React from 'react';
import { TemplateProps } from './types';

const FONT = 'var(--card-font, "Noto Sans KR", "Apple SD Gothic Neo", sans-serif)';

export const BoldType: React.FC<TemplateProps> = ({
  slide, index, total, brandName, accentColor,
}) => (
  <div
    style={{
      width: 1080,
      height: 1080,
      background: slide.bgImage
        ? `url(${slide.bgImage}) center/cover no-repeat`
        : accentColor,
      fontFamily: FONT,
      display: 'flex',
      flexDirection: 'column',
      padding: '80px',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {slide.bgImage && (
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
    )}
    {/* Decorative circles */}
    <div
      style={{
        position: 'absolute',
        right: -120,
        bottom: -120,
        width: 640,
        height: 640,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.07)',
        pointerEvents: 'none',
      }}
    />
    <div
      style={{
        position: 'absolute',
        right: 80,
        bottom: 80,
        width: 320,
        height: 320,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.05)',
        pointerEvents: 'none',
      }}
    />

    {/* Header */}
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 80,
        position: 'relative',
      }}
    >
      <span style={{ color: 'rgba(255,255,255,0.9)', fontSize: 28, fontWeight: 700 }}>
        {brandName}
      </span>
      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 24 }}>
        {index + 1} / {total}
      </span>
    </div>

    {/* Content */}
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <h1
        style={{
          fontSize: slide.type === 'cover' ? 100 : 84,
          fontWeight: 900,
          color: '#FFFFFF',
          lineHeight: 1.1,
          letterSpacing: '-3px',
          margin: 0,
          marginBottom: 52,
          whiteSpace: 'pre-wrap',
          textShadow: '0 4px 24px rgba(0,0,0,0.12)',
        }}
      >
        {slide.title}
      </h1>
      <p
        style={{
          fontSize: 36,
          color: 'rgba(255,255,255,0.88)',
          lineHeight: 1.7,
          margin: 0,
          whiteSpace: 'pre-wrap',
        }}
      >
        {slide.body}
      </p>
    </div>

    {/* Bottom rule */}
    <div
      style={{
        height: 2,
        background: 'rgba(255,255,255,0.2)',
        borderRadius: 1,
        marginTop: 60,
        position: 'relative',
      }}
    />
  </div>
);
