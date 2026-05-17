import type { CSSProperties, ReactNode } from 'react';

export const btnFilledGold: CSSProperties = {
  background: '#29B9E7', color: '#ffffff', border: '1px solid #29B9E7', borderRadius: 4,
  padding: '11px 18px', fontFamily: "var(--font-barlow),'Barlow Condensed',sans-serif",
  fontWeight: 700, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase',
  cursor: 'pointer', transition: 'transform 180ms, background 180ms',
};
export const btnOutlineNavy: CSSProperties = {
  background: 'transparent', color: '#111111', border: '1.5px solid #111111', borderRadius: 4,
  padding: '10px 16px', fontFamily: "var(--font-barlow),'Barlow Condensed',sans-serif",
  fontWeight: 700, fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase',
  cursor: 'pointer', transition: 'transform 180ms, background 180ms',
};
export const inputStyle: CSSProperties = {
  width: '100%', padding: '11px 14px', border: '1px solid #E5E5E5', borderRadius: 4,
  background: '#FFFFFF', fontFamily: "var(--font-inter),Inter,sans-serif",
  fontSize: 14.5, color: '#1A1A1A', outline: 'none', transition: 'border-color 180ms', boxSizing: 'border-box',
};
export const wizardLead: CSSProperties = {
  fontFamily: "var(--font-inter),Inter,sans-serif", fontSize: 15, color: '#555555', margin: 0, lineHeight: 1.55,
};
export const modalBodyStyle: CSSProperties = { padding: '24px 26px', overflowY: 'auto', flex: 1 };
export const modalFooterStyle: CSSProperties = {
  padding: '16px 22px', borderTop: '1px solid #E5E5E5', background: '#F5F5F5',
  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexShrink: 0,
};
export function Field({ label, full, children }: { label: string; full?: boolean; children: ReactNode }) {
  return (
    <label style={{ gridColumn: full ? '1 / -1' : 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontFamily: "var(--font-barlow),'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 12, color: '#111111', letterSpacing: '0.22em', textTransform: 'uppercase' }}>{label}</span>
      {children}
    </label>
  );
}
