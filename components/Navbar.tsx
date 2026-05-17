'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Phone } from 'lucide-react';
import DynamicIcon from './DynamicIcon';
import Logo from './Logo';
import { btnFilledGold, btnOutlineNavy } from './_shared';

const SERVICES = [
  { icon: 'droplets', label: 'Oil & Fluid Change' },
  { icon: 'wind', label: 'Smog Check & Repair' },
  { icon: 'zap', label: 'Electronic Tune-Up' },
  { icon: 'circle-slash', label: 'Brake Service' },
  { icon: 'refresh-cw', label: 'Tire & Wheel Balancing' },
  { icon: 'battery', label: 'Battery & Electrical' },
  { icon: 'settings', label: 'Engine Work' },
  { icon: 'thermometer', label: 'AC & Heating' },
  { icon: 'layers', label: 'Lube Service' },
  { icon: 'scan-line', label: 'Diagnostics' },
];
const LINKS = [
  { id: 'home', label: 'HOME' },
  { id: 'services', label: 'SERVICES', dropdown: true },
  { id: 'about', label: 'ABOUT' },
  { id: 'reviews', label: 'REVIEWS' },
  { id: 'contact', label: 'CONTACT' },
];

export default function Navbar({ onSchedule, onTrack }: { onSchedule: () => void; onTrack: () => void }) {
  const [openServices, setOpenServices] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const els = ['home','services','about','reviews','contact'].map(id => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver((entries) => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }), { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  const scrollTo = (id: string) => { setMobileOpen(false); setOpenServices(false); const el = document.getElementById(id); if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' }); };
  const openMenu  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpenServices(true); };
  const closeMenu = () => { closeTimer.current = setTimeout(() => setOpenServices(false), 140); };

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 50, background: '#FFFFFF', borderBottom: '1px solid #E5E5E5', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 24px', gap: 20 }}>
        <a href="#home" onClick={e => { e.preventDefault(); scrollTo('home'); }} style={{ textDecoration: 'none', flexShrink: 0 }}><Logo variant="light" size="sm" /></a>
        <a href="tel:5307580204" className="nav-phone" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: '#F5F5F5', border: '1px solid #E5E5E5', borderRadius: 4, textDecoration: 'none', color: '#111111', fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 17, letterSpacing: '0.04em', flexShrink: 0 }}>
          <Phone size={16} style={{ color: '#29B9E7' }} />(530) 758-0204
        </a>
        <ul className="nav-links" style={{ display: 'flex', gap: 28, listStyle: 'none', margin: 0, padding: 0, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          {LINKS.map(l => (
            <li key={l.id} onMouseEnter={l.dropdown ? openMenu : undefined} onMouseLeave={l.dropdown ? closeMenu : undefined} style={{ position: 'relative' }}>
              <a href={`#${l.id}`} onClick={e => { e.preventDefault(); scrollTo(l.id); }} style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 15, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', color: activeSection === l.id ? '#29B9E7' : '#333333', padding: '20px 2px', display: 'inline-flex', alignItems: 'center', gap: 4, borderBottom: activeSection === l.id ? '2px solid #29B9E7' : '2px solid transparent', transition: 'color 180ms' }}>
                {l.label}{l.dropdown && <ChevronDown size={14} />}
              </a>
              {l.dropdown && openServices && (
                <div onMouseEnter={openMenu} onMouseLeave={closeMenu} style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', background: '#FFFFFF', padding: 16, borderRadius: 6, boxShadow: '0 12px 40px rgba(0,0,0,0.14)', border: '1px solid #E5E5E5', minWidth: 540, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, zIndex: 100 }}>
                  {SERVICES.map((s, i) => (
                    <a key={i} href="#services" onClick={e => { e.preventDefault(); scrollTo('services'); }} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', background: '#F9F9F9', border: '1px solid #F0F0F0', borderRadius: 4, color: '#222222', fontFamily: "'Barlow Condensed',sans-serif", fontSize: 14, fontWeight: 500, letterSpacing: '0.04em', textDecoration: 'none', transition: 'background 180ms, border-color 180ms' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(41,185,231,0.06)'; e.currentTarget.style.borderColor = 'rgba(41,185,231,0.2)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#F9F9F9'; e.currentTarget.style.borderColor = '#F0F0F0'; }}>
                      <span style={{ width: 28, height: 28, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(41,185,231,0.1)', borderRadius: 4 }}>
                        <DynamicIcon name={s.icon} size={15} style={{ color: '#29B9E7' }} />
                      </span>
                      {s.label}<ChevronRight size={13} style={{ marginLeft: 'auto', color: '#29B9E7', opacity: 0.5 }} />
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="nav-ctas" style={{ display: 'flex', gap: 10, flexShrink: 0 }}>
          <button onClick={onTrack} style={btnOutlineNavy}>TRACK MY CAR</button>
          <button onClick={onSchedule} style={btnFilledGold}>SCHEDULE SERVICE</button>
        </div>
        <button className="nav-burger" onClick={() => setMobileOpen(!mobileOpen)} style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#111111' }}>
          <DynamicIcon name={mobileOpen ? 'x' : 'menu'} size={26} />
        </button>
      </div>
      {mobileOpen && (
        <div style={{ borderTop: '1px solid #E5E5E5', background: '#FFFFFF', padding: '12px 24px 20px' }}>
          {LINKS.map(l => <a key={l.id} href={`#${l.id}`} onClick={e => { e.preventDefault(); scrollTo(l.id); }} style={{ display: 'block', padding: '14px 0', borderBottom: '1px solid #F0F0F0', fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 18, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#111111', textDecoration: 'none' }}>{l.label}</a>)}
          <a href="tel:5307580204" style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 14, padding: '12px 14px', background: '#F5F5F5', borderRadius: 4, color: '#111111', textDecoration: 'none', fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 17 }}><Phone size={16} style={{ color: '#29B9E7' }} />(530) 758-0204</a>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 14 }}>
            <button onClick={() => { setMobileOpen(false); onTrack(); }} style={{ ...btnOutlineNavy, padding: '14px 18px', fontSize: 14 }}>TRACK MY CAR</button>
            <button onClick={() => { setMobileOpen(false); onSchedule(); }} style={{ ...btnFilledGold, padding: '14px 18px', fontSize: 14 }}>SCHEDULE SERVICE</button>
          </div>
        </div>
      )}
      <style>{`@media(max-width:1180px){.nav-phone{display:none!important}}@media(max-width:1023px){.nav-links,.nav-ctas{display:none!important}.nav-burger{display:inline-flex!important}}`}</style>
    </nav>
  );
}
