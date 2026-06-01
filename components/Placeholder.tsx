'use client';

import React, { useId } from 'react';

// Striped SVG placeholder with monospace label.
// Drop a real image into the indicated path and the <img> fallback path renders it instead.
// Set window.__USE_REAL_IMAGES = true to render the underlying <img>; default is pure SVG placeholder.

export default function Placeholder({ label, w = 800, h = 600, tone = 'warm', src }: { label: string; w?: number; h?: number; tone?: 'warm' | 'navy' | 'light' | 'dark'; src?: string }) {
  // Render the real <img> if one is provided; placeholder is the fallback / loading state.
  const useReal = !!src;
  const tones = {
    warm:  { bg: '#E8E0D0', fg: '#C9A84C', text: '#1B2A4A' },
    navy:  { bg: '#1B2A4A', fg: '#C9A84C', text: '#F5F0E8' },
    light: { bg: '#F5F0E8', fg: '#D8CFBC', text: '#1B2A4A' },
    dark:  { bg: '#1A1A1A', fg: '#C9A84C', text: '#F5F0E8' },
  };
  const t = tones[tone] || tones.warm;
  const uid = useId();
  const id = `stripe-${uid.replace(/:/g, '')}`;
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice"
           style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <pattern id={id} patternUnits="userSpaceOnUse" width="24" height="24" patternTransform="rotate(45)">
            <rect width="24" height="24" fill={t.bg} />
            <line x1="0" y1="0" x2="0" y2="24" stroke={t.fg} strokeOpacity="0.22" strokeWidth="10" />
          </pattern>
        </defs>
        <rect width={w} height={h} fill={`url(#${id})`} />
        <rect x="16" y="16" width={w - 32} height={h - 32} fill="none"
              stroke={t.text} strokeOpacity="0.35" strokeWidth="2" strokeDasharray="6 8" />
        <text x={w / 2} y={h / 2} textAnchor="middle" dominantBaseline="middle"
              fontFamily="ui-monospace, 'SF Mono', Menlo, monospace"
              fontSize={Math.max(14, Math.min(w, h) * 0.045)}
              fill={t.text} fillOpacity="0.85" letterSpacing="0.08em">
          {label}
        </text>
      </svg>
      {src && useReal ? (
        <img src={src} alt={label}
             onError={(e) => { e.currentTarget.style.display = 'none'; }}
             style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : null}
    </div>
  );
}

