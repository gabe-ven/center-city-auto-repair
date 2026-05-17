'use client';

import React, { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Placeholder from './Placeholder';

const SERVICES = [
  { file: 'service-oil-change.png',  name: 'Oil & Fluid Change',             popular: true  },
  { file: 'service-smog-check.png',  name: 'Smog Check & Repair',            popular: true  },
  { file: 'service-tune-up.png',     name: 'Electronic Tune-Up',             popular: true  },
  { file: 'service-brakes.png',      name: 'Brake Service',                  popular: true  },
  { file: 'service-tires.png',       name: 'Tire Service & Wheel Balancing', popular: true  },
  { file: 'service-battery.png',     name: 'Battery & Electrical',           popular: false },
  { file: 'service-engine.png',      name: 'Engine Work',                    popular: false },
  { file: 'service-ac.png',          name: 'AC & Heating',                   popular: false },
  { file: 'service-lube.png',        name: 'Lube Service',                   popular: true  },
  { file: 'service-fluids.png',      name: 'Fluid Service',                  popular: false },
  { file: 'service-diagnostics.png', name: 'Diagnostics',                    popular: false },
];

const N = SERVICES.length;

const SPREAD_X  = [0, 280, 490, 650, 775, 870];
const ROTATE_Y  = [0,  25,  45,  58,  68,  75];
const SCALE_VAL = [1.0, 0.84, 0.72, 0.62, 0.52, 0.43];
const OPACITY   = [1.0, 0.85, 0.65, 0.45, 0.28, 0.14];

function getOffset(index: number, active: number): number {
  let diff = index - active;
  if (diff >  Math.floor(N / 2)) diff -= N;
  if (diff < -Math.floor(N / 2)) diff += N;
  return diff;
}

export default function ServicesSection() {
  const [active, setActive] = useState(0);

  const prev = useCallback(() => setActive(a => (a - 1 + N) % N), []);
  const next = useCallback(() => setActive(a => (a + 1) % N), []);

  const activeService = SERVICES[active];

  return (
    <section id="services" data-screen-label="03 Services" style={{
      background: '#F5F5F5',
      padding: 'clamp(20px, 3vw, 36px) 0 clamp(24px, 4vw, 48px)',
      position: 'relative',
      overflow: 'hidden',
    }}>


<div className="reveal-up" style={{
        textAlign: 'center',
        padding: '0 clamp(24px, 5vw, 80px)',
        marginBottom: 0,
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          color: '#29B9E7', fontSize: 13, fontWeight: 600,
          letterSpacing: '0.28em', textTransform: 'uppercase',
          marginBottom: 12,
          display: 'inline-flex', alignItems: 'center', gap: 16,
        }}>
          <span style={{ width: 40, height: 1, background: '#29B9E7', display: 'inline-block' }} />
          What We Do
          <span style={{ width: 40, height: 1, background: '#29B9E7', display: 'inline-block' }} />
        </div>
        <h2 style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(60px, 9vw, 120px)',
          color: '#111111', margin: 0, lineHeight: 0.95, letterSpacing: '0.02em',
        }}>Our Services</h2>
        <p style={{
          fontFamily: 'Inter, sans-serif', color: '#777777',
          fontSize: 16, marginTop: 12, lineHeight: 1.55,
        }}>Complete auto care — all under one trusted roof.</p>
      </div>

      <div style={{
        position: 'relative',
        height: 'clamp(400px, 46vw, 600px)',
        overflow: 'hidden',
        perspective: '1400px',
      }}>

        <button
          onClick={prev}
          aria-label="Previous service"
          style={{
            position: 'absolute',
            left: 'clamp(16px, 4vw, 56px)',
            top: '50%', transform: 'translateY(-50%)',
            zIndex: 200,
            width: 'clamp(52px, 5.5vw, 72px)',
            height: 'clamp(52px, 5.5vw, 72px)',
            borderRadius: '50%',
            background: '#111111',
            border: '2px solid rgba(41,185,231,0.5)',
            color: '#29B9E7',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 28px rgba(0,0,0,0.35)',
            transition: 'background 200ms, color 200ms, border-color 200ms, transform 200ms',
          }}
          onMouseEnter={e => {
            const b = e.currentTarget;
            b.style.background = '#29B9E7'; b.style.color = '#fff';
            b.style.borderColor = '#29B9E7'; b.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={e => {
            const b = e.currentTarget;
            b.style.background = '#111111'; b.style.color = '#29B9E7';
            b.style.borderColor = 'rgba(41,185,231,0.5)'; b.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <ChevronLeft size={30} strokeWidth={2.5} />
        </button>

        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {SERVICES.map((s, i) => {
            const offset  = getOffset(i, active);
            const abs     = Math.abs(offset);
            if (abs > 5) return null;

            const x        = Math.sign(offset) * SPREAD_X[abs];
            const ry       = -Math.sign(offset) * ROTATE_Y[abs];
            const sc       = SCALE_VAL[abs];
            const op       = OPACITY[abs];
            const isCenter = abs === 0;

            return (
              <div
                key={i}
                onClick={() => !isCenter && setActive(i)}
                style={{
                  position: 'absolute',
                  width: 'clamp(240px, 22vw, 320px)',
                  aspectRatio: '3 / 4',
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: '#1A1A1A',
                  cursor: isCenter ? 'default' : 'pointer',
                  transform: `translateX(${x}px) rotateY(${ry}deg) scale(${sc})`,
                  opacity: op,
                  zIndex: 100 - abs * 10,
                  transition: 'transform 520ms cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 520ms',
                  boxShadow: isCenter
                    ? '0 28px 60px rgba(0,0,0,0.5), 0 0 0 2px rgba(41,185,231,0.5)'
                    : '0 8px 20px rgba(0,0,0,0.3)',
                  willChange: 'transform, opacity',
                }}
              >
                <div style={{
                  position: 'absolute', inset: 0,
                  filter: isCenter ? 'grayscale(0%) brightness(1)' : 'grayscale(88%) brightness(0.65)',
                  transition: 'filter 520ms ease',
                }}>
                  <Placeholder label={s.file} w={600} h={800} tone="dark"
                               src={`/assets/images/ServiceSection/${s.file}`} />
                </div>

                <div style={{
                  position: 'absolute', inset: 0,
                  background: isCenter
                    ? 'linear-gradient(180deg, rgba(0,0,0,0) 38%, rgba(0,0,0,0.88) 100%)'
                    : 'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.65) 100%)',
                  pointerEvents: 'none',
                  transition: 'background 520ms',
                }} />

                {isCenter && (
                  <div style={{
                    position: 'absolute', top: 10, left: 10, right: 10, bottom: 10,
                    border: '1px solid rgba(41,185,231,0.5)',
                    borderRadius: 4,
                    clipPath: 'polygon(0 0,28px 0,28px 1px,1px 1px,1px 28px,0 28px,0 100%,28px 100%,28px calc(100% - 1px),1px calc(100% - 1px),1px calc(100% - 28px),0 calc(100% - 28px),0 0,100% 0,100% 28px,calc(100% - 1px) 28px,calc(100% - 1px) 1px,calc(100% - 28px) 1px,calc(100% - 28px) 0,100% 0,100% 100%,calc(100% - 28px) 100%,calc(100% - 28px) calc(100% - 1px),calc(100% - 1px) calc(100% - 1px),calc(100% - 1px) calc(100% - 28px),100% calc(100% - 28px))',
                    pointerEvents: 'none',
                  }} />
                )}

                {s.popular && (
                  <div style={{
                    position: 'absolute', top: 12, right: 12,
                    background: '#29B9E7',
                    color: '#fff',
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    padding: '4px 8px',
                    borderRadius: 3,
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    opacity: isCenter ? 1 : 0.75,
                  }}>★ POPULAR</div>
                )}

                <div style={{
                  position: 'absolute', top: 14, left: 16,
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: isCenter ? '#29B9E7' : 'rgba(41,185,231,0.5)',
                  fontSize: isCenter ? 22 : 16,
                  letterSpacing: '0.05em',
                  transition: 'color 520ms, font-size 520ms',
                }}>{String(i + 1).padStart(2, '0')}.</div>

                {isCenter && (
                  <div style={{
                    position: 'absolute', left: 16, right: 16, bottom: 16,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontSize: 20, fontWeight: 700,
                    letterSpacing: '0.04em', textTransform: 'uppercase',
                    color: '#FFFFFF', lineHeight: 1.05,
                  }}>{s.name}</div>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={next}
          aria-label="Next service"
          style={{
            position: 'absolute',
            right: 'clamp(16px, 4vw, 56px)',
            top: '50%', transform: 'translateY(-50%)',
            zIndex: 200,
            width: 'clamp(52px, 5.5vw, 72px)',
            height: 'clamp(52px, 5.5vw, 72px)',
            borderRadius: '50%',
            background: '#111111',
            border: '2px solid rgba(41,185,231,0.5)',
            color: '#29B9E7',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 28px rgba(0,0,0,0.35)',
            transition: 'background 200ms, color 200ms, border-color 200ms, transform 200ms',
          }}
          onMouseEnter={e => {
            const b = e.currentTarget;
            b.style.background = '#29B9E7'; b.style.color = '#fff';
            b.style.borderColor = '#29B9E7'; b.style.transform = 'translateY(-50%) scale(1.1)';
          }}
          onMouseLeave={e => {
            const b = e.currentTarget;
            b.style.background = '#111111'; b.style.color = '#29B9E7';
            b.style.borderColor = 'rgba(41,185,231,0.5)'; b.style.transform = 'translateY(-50%) scale(1)';
          }}
        >
          <ChevronRight size={30} strokeWidth={2.5} />
        </button>
      </div>

      <div style={{
        textAlign: 'center',
        marginTop: -24,
        padding: '0 clamp(24px, 5vw, 80px)',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(28px, 4vw, 48px)',
          color: '#111111', letterSpacing: '0.02em', lineHeight: 1,
        }}>
          <span style={{ color: '#29B9E7', marginRight: 10 }}>
            {String(active + 1).padStart(2, '0')}.
          </span>
          {activeService.name}
        </div>

        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: 7, marginTop: 16,
        }}>
          {SERVICES.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to ${SERVICES[i].name}`}
              style={{
                width: i === active ? 28 : 7, height: 7,
                borderRadius: 4, border: 'none', padding: 0,
                background: i === active ? '#29B9E7' : '#CCCCCC',
                cursor: 'pointer',
                transition: 'width 300ms ease, background 300ms ease',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
