'use client';

import React, { useEffect } from 'react';
import { ChevronLeft, X } from 'lucide-react';

// Shared modal shell — full-screen on mobile, centered card on desktop, dark backdrop with blur.

export default function ModalShell({ open, onClose, children, maxWidth = 720 }: { open: boolean; onClose: () => void; children: React.ReactNode; maxWidth?: number }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.62)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px',
      animation: 'modal-fade 220ms ease forwards',
    }}>
      <div onClick={(e) => e.stopPropagation()} className="modal-card" style={{
        background: '#FFFFFF',
        borderRadius: 10,
        width: '100%',
        maxWidth,
        maxHeight: 'calc(100vh - 48px)',
        overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
        border: '1px solid rgba(41,185,231,0.2)',
        animation: 'modal-pop 280ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}>
        {children}
      </div>
      <style>{`
        @keyframes modal-fade { from { opacity: 0; } to { opacity: 1; } }
        @keyframes modal-pop  { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
        @media (max-width: 767px) {
          .modal-card {
            max-width: 100% !important;
            height: 100vh !important;
            max-height: 100vh !important;
            border-radius: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}

export function ModalHeader({ eyebrow, title, onClose, onBack, step, totalSteps }: any) {
  return (
    <div style={{
      padding: '18px 22px 16px',
      borderBottom: '1px solid #E5E5E5',
      background: '#F5F5F5',
      flexShrink: 0,
    }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: step ? 14 : 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {onBack && (
            <button onClick={onBack} style={{
              background: 'none', border: '1px solid #E5E5E5',
              borderRadius: 4, padding: '6px 10px',
              cursor: 'pointer', color: '#111111',
              display: 'inline-flex', alignItems: 'center', gap: 4,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 600, fontSize: 12,
              letterSpacing: '0.14em', textTransform: 'uppercase',
            }}>
              <ChevronLeft size={13} />
              Back
            </button>
          )}
          <div>
            {eyebrow && (
              <div style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                color: '#29B9E7',
                fontSize: 11, fontWeight: 600,
                letterSpacing: '0.28em', textTransform: 'uppercase',
              }}>{eyebrow}</div>
            )}
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 26, color: '#111111',
              lineHeight: 1, letterSpacing: '0.01em',
              marginTop: 2,
            }}>{title}</div>
          </div>
        </div>
        <button onClick={onClose} aria-label="Close" style={{
          background: 'none', border: 'none', cursor: 'pointer',
          padding: 6, color: '#111111',
          display: 'inline-flex',
        }}>
          <X size={22} />
        </button>
      </div>
      {step && totalSteps && (
        <div style={{ marginTop: 4 }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 11, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: '#666666', marginBottom: 8,
          }}>
            <span>Step {step} of {totalSteps}</span>
            <span style={{ color: '#29B9E7' }}>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div style={{ height: 4, background: '#E5E5E5', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{
              width: `${(step / totalSteps) * 100}%`,
              height: '100%', background: '#29B9E7',
              transition: 'width 280ms ease',
            }}></div>
          </div>
        </div>
      )}
    </div>
  );
}

