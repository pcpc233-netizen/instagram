import React from 'react';
import { TemplateProps } from './types';

const FONT = 'var(--card-font, "Noto Sans KR", "Apple SD Gothic Neo", sans-serif)';

export const DarkPremium: React.FC<TemplateProps> = ({
  slide, index, total, brandName, accentColor,
}) => (
  <div
    style={{
      width: 1080,
      height: 1080,
      background: slide.bgImage
        ? `url(${slide.bgImage}) center/cover no-repeat`
        : '#0D1117',
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
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.65)' }} />
    )}
    {/* Top gradient line */}
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: `linear-gradient(90deg, ${accentColor}, transparent)`,
      }}
    />

    {/* Background glow */}
    <div
      style={{
        position: 'absolute',
        top: -200,
        right: -200,
        width: 600,
        height: 600,
        borderRadius: '50%',
        background: `${accentColor}0d`,
        pointerEvents: 'none',
      }}
    />

    {/* Header */}
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 80, position: 'relative' }}>
      <span style={{ color: accentColor, fontSize: 28, fontWeight: 700 }}>
        {brandName}
      </span>
      <div
        style={{
          background: `${accentColor}1a`,
          border: `1px solid ${accentColor}33`,
          borderRadius: 100,
          padding: '8px 24px',
        }}
      >
        <span style={{ color: accentColor, fontSize: 22, fontWeight: 600 }}>
          {index + 1} / {total}
        </span>
      </div>
    </div>

    {/* Content */}
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
      <h1
        style={{
          fontSize: slide.type === 'cover' ? 88 : 76,
          fontWeight: 900,
          color: '#F9FAFB',
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
          fontSize: 34,
          color: '#9CA3AF',
          lineHeight: 1.8,
          margin: 0,
          whiteSpace: 'pre-wrap',
        }}
      >
        {slide.body}
      </p>
    </div>

    {/* Bottom */}
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        marginTop: 60,
        position: 'relative',
      }}
    >
      <div style={{ height: 1, flex: 1, background: '#1F2937' }} />
      <span style={{ color: '#374151', fontSize: 22 }}>{brandName}</span>
    </div>
  </div>
);
