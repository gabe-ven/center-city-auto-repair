'use client';
import { Clock, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';

const footerHeading: React.CSSProperties = { fontFamily: "'Barlow Condensed',sans-serif", color: '#29B9E7', fontSize: 13, fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 18 };
const footerLink: React.CSSProperties = { fontFamily: "'Barlow Condensed',sans-serif", color: 'rgba(255,255,255,0.75)', fontSize: 15, fontWeight: 500, letterSpacing: '0.06em', textDecoration: 'none', transition: 'color 180ms' };
const footerInfo: React.CSSProperties = { display: 'flex', gap: 10, alignItems: 'flex-start', fontFamily: 'Inter,sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.55 };

export default function Footer() {
  return (
    <footer style={{ background: '#111111', color: '#FFFFFF', padding: 'clamp(48px,7vw,80px) clamp(24px,5vw,80px) 24px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1.2fr', gap: 48, paddingBottom: 36, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div>
            <Logo variant="dark" size="md" />
            <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', color: 'rgba(255,255,255,0.6)', fontSize: 17, marginTop: 24, maxWidth: 320, lineHeight: 1.55 }}>"Serving Davis Since 1987. Family-owned, community-trusted."</p>
          </div>
          <div>
            <div style={footerHeading}>Quick Links</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[['home','Home'],['services','Services'],['about','About'],['reviews','Reviews'],['contact','Contact']].map(([id,label]) => (
                <li key={id}><a href={`#${id}`} onClick={e => { e.preventDefault(); const el = document.getElementById(id); if (el) window.scrollTo({ top: el.offsetTop - 64, behavior: 'smooth' }); }} style={footerLink}
                  onMouseEnter={e => e.currentTarget.style.color='#29B9E7'}
                  onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.75)'}>{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <div style={footerHeading}>Visit</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={footerInfo}><MapPin size={14} style={{ color: '#29B9E7', flexShrink: 0, marginTop: 3 }} /><span>1180 Olive Drive, Davis, CA 95616</span></div>
              <div style={footerInfo}><Phone size={14} style={{ color: '#29B9E7', flexShrink: 0, marginTop: 3 }} /><a href="tel:5307580204" style={{ color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>(530) 758-0204</a></div>
              <div style={footerInfo}><Clock size={14} style={{ color: '#29B9E7', flexShrink: 0, marginTop: 3 }} /><span>Mon–Fri 7:30 AM – 6:00 PM<br /><span style={{ opacity: 0.5 }}>Sat 8 AM – 2 PM · Sun Closed</span></span></div>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 22, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, fontFamily: "'Barlow Condensed',sans-serif", fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
          <div>© 2026 Center City Auto Repair · Davis, CA</div>
          <div>1180 Olive Drive · (530) 758-0204</div>
        </div>
      </div>
      <style>{`@media(max-width:767px){.footer-grid{grid-template-columns:1fr!important;gap:32px!important}}`}</style>
    </footer>
  );
}
