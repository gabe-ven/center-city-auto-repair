'use client';
import { MapPin, Clock, Phone, Star } from 'lucide-react';

const iconBox: React.CSSProperties = {
  width: 46, height: 46, borderRadius: '50%', background: '#29B9E7',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
};
const colLabel: React.CSSProperties = {
  fontFamily: "'Barlow Condensed',sans-serif", color: '#ffffff',
  fontSize: 11, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', marginBottom: 3,
};
const colVal: React.CSSProperties = {
  fontFamily: "'Barlow Condensed',sans-serif", color: 'rgba(255,255,255,0.75)',
  fontSize: 14, fontWeight: 500, lineHeight: 1.4,
};

export default function InfoBar() {
  return (
    <div style={{ background: '#1C1C1C', padding: '0 clamp(24px,5vw,60px)' }}>
      <div className="info-bar-grid" style={{ maxWidth: 1320, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 'clamp(18px,3vw,28px) clamp(16px,2.5vw,28px)', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={iconBox}><MapPin size={20} color="#fff" /></div>
          <div><div style={colLabel}>Address</div><div style={colVal}>1180 Olive Drive<br />Davis, CA 95616</div></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 'clamp(18px,3vw,28px) clamp(16px,2.5vw,28px)', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={iconBox}><Clock size={20} color="#fff" /></div>
          <div><div style={colLabel}>Shop Hours</div><div style={colVal}>Mon–Fri: 7:30am–6pm<br />Sat: 8am–2pm</div></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 'clamp(18px,3vw,28px) clamp(16px,2.5vw,28px)', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={iconBox}><Phone size={20} color="#fff" /></div>
          <div>
            <div style={colLabel}>Give Us a Call</div>
            <a href="tel:5307580204" style={{ ...colVal, textDecoration: 'none', display: 'block', color: '#ffffff', fontWeight: 700, fontSize: 16 }}>(530) 758-0204</a>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 'clamp(18px,3vw,28px) clamp(16px,2.5vw,28px)' }}>
          <div style={iconBox}><Star size={20} color="#fff" /></div>
          <div>
            <div style={colLabel}>Follow Us</div>
            <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
              <a href="https://www.google.com/search?q=center+city+auto+repair+davis" target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, padding: '4px 10px', color: '#fff', fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textDecoration: 'none', transition: 'background 180ms' }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(41,185,231,0.3)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}>
                Google
              </a>
              <a href="https://www.yelp.com/biz/center-city-auto-repair-davis" target="_blank" rel="noopener" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 4, padding: '4px 10px', color: '#fff', fontFamily: "'Barlow Condensed',sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textDecoration: 'none', transition: 'background 180ms' }}
                onMouseEnter={e => e.currentTarget.style.background='rgba(41,185,231,0.3)'}
                onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}>
                Yelp
              </a>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:767px){.info-bar-grid{grid-template-columns:1fr 1fr!important}}`}</style>
    </div>
  );
}
