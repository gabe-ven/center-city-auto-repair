'use client';
import { useEffect, useRef, useState } from 'react';
import { CheckCircle } from 'lucide-react';

function CountUp({ value, suffix = '', duration = 1400 }: { value: number; suffix?: string; duration?: number }) {
  const [n, setN] = useState(0); const ref = useRef<HTMLSpanElement>(null); const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => { entries.forEach((e) => { if (e.isIntersecting && !started.current) { started.current = true; const start = performance.now(); const step = (now: number) => { const t = Math.min(1,(now-start)/duration); setN(value*(1-Math.pow(1-t,3))); if(t<1) requestAnimationFrame(step); }; requestAnimationFrame(step); } }); }, { threshold: 0.4 });
    io.observe(ref.current); return () => io.disconnect();
  }, [value, duration]);
  const isDecimal = String(value).includes('.');
  return <span ref={ref}>{isDecimal ? n.toFixed(1) : Math.round(n)}{suffix}</span>;
}

export default function StatsSection() {
  const stats = [{ value: 38, suffix: '+', label: 'Years of Service' }, { value: 4.9, suffix: '★', label: 'Average Rating' }, { value: 500, suffix: '+', label: 'Customer Reviews' }];
  return (
    <section style={{ background: '#111111', padding: 'clamp(24px,4vw,44px) clamp(24px,5vw,80px)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 40px)', pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
        <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: 'clamp(16px,3vw,28px) clamp(12px,2.5vw,28px)', borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} className={`stat-cell stat-cell-${i} reveal-scale delay-${i + 1}`}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(44px,6vw,80px)', color: '#29B9E7', lineHeight: 0.9 }}><CountUp value={s.value} suffix={s.suffix} /></div>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: 10, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
          <div style={{ padding: 'clamp(16px,3vw,28px) clamp(12px,2.5vw,28px)', borderLeft: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} className="stat-cell stat-cell-3 reveal-scale delay-4">
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(44px,6vw,80px)', color: '#29B9E7', lineHeight: 0.9 }}>BAR</div>
              <CheckCircle size={32} style={{ color: '#29B9E7', position: 'absolute', top: -10, right: -36 }} />
            </div>
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.22em', textTransform: 'uppercase', marginTop: 10, fontWeight: 500 }}>Licensed &amp; Certified</div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:767px){.stats-grid{grid-template-columns:repeat(2,1fr)!important}.stat-cell-2,.stat-cell-3{border-top:1px solid rgba(255,255,255,0.08)}.stat-cell-2{border-left:none!important}}`}</style>
    </section>
  );
}
