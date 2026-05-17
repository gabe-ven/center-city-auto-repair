'use client';
import { Clock, MapPin, Navigation, Phone } from 'lucide-react';

const HOURS = [
  { day: 'Monday', open: '7:30 AM – 6:00 PM' }, { day: 'Tuesday', open: '7:30 AM – 6:00 PM' },
  { day: 'Wednesday', open: '7:30 AM – 6:00 PM' }, { day: 'Thursday', open: '7:30 AM – 6:00 PM' },
  { day: 'Friday', open: '7:30 AM – 6:00 PM' },
  { day: 'Saturday', open: '8:00 AM – 2:00 PM' },
  { day: 'Sunday', open: 'Closed', closed: true },
];

const infoCard: React.CSSProperties = { display: 'flex', alignItems: 'flex-start', gap: 14, padding: '14px 16px', background: '#FFFFFF', border: '1px solid #E5E5E5', borderRadius: 6, textDecoration: 'none', transition: 'border-color 180ms, box-shadow 180ms' };
const infoIcon: React.CSSProperties = { width: 38, height: 38, flexShrink: 0, borderRadius: 4, background: '#F5F5F5', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' };
const infoLabel: React.CSSProperties = { fontFamily: "'Barlow Condensed',sans-serif", color: '#29B9E7', fontSize: 11, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 3 };
const infoValue: React.CSSProperties = { fontFamily: 'Inter,sans-serif', fontSize: 15, fontWeight: 500, color: '#1A1A1A', lineHeight: 1.4 };

export default function ContactSection() {
  const today = new Date().getDay();
  const todayIdx = today === 0 ? 6 : today - 1;
  return (
    <section id="contact" style={{ background: '#FFFFFF', padding: 'clamp(64px,9vw,120px) clamp(24px,5vw,80px)', borderTop: '1px solid #E5E5E5' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 'clamp(32px,5vw,64px)', alignItems: 'stretch' }}>
          <div className="reveal-left">
            <div style={{ fontFamily: "'Barlow Condensed',sans-serif", color: '#29B9E7', fontSize: 13, fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 12, display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 24, height: 1, background: '#29B9E7' }} />Find Us
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,5.5vw,72px)', color: '#111111', margin: 0, lineHeight: 0.95 }}>Come on by.</h2>
            <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 18 }}>
              <a href="https://maps.google.com/?q=1180+Olive+Drive+Davis+CA+95616" target="_blank" rel="noopener" style={infoCard}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#29B9E7'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(41,185,231,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={infoIcon}><MapPin size={18} style={{ color: '#29B9E7' }} /></div>
                <div><div style={infoLabel}>Address</div><div style={infoValue}>1180 Olive Drive<br />Davis, CA 95616</div></div>
              </a>
              <a href="tel:5307580204" style={infoCard}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#29B9E7'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(41,185,231,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#E5E5E5'; e.currentTarget.style.boxShadow = 'none'; }}>
                <div style={infoIcon}><Phone size={18} style={{ color: '#29B9E7' }} /></div>
                <div><div style={infoLabel}>Phone</div><div style={infoValue}>(530) 758-0204</div></div>
              </a>
            </div>
            <div style={{ marginTop: 28, background: '#F5F5F5', border: '1px solid #E5E5E5', borderRadius: 6, padding: '22px 24px' }}>
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", color: '#111111', fontSize: 14, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Clock size={15} style={{ color: '#29B9E7' }} />Hours
              </div>
              {HOURS.map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 0', borderBottom: i < HOURS.length - 1 ? '1px solid #E5E5E5' : 'none', fontFamily: 'Inter,sans-serif', fontSize: 14, color: i === todayIdx ? '#111111' : '#777777', fontWeight: i === todayIdx ? 600 : 400 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                    {h.day}
                    {i === todayIdx && <span style={{ background: '#29B9E7', color: '#ffffff', fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 2 }}>Today</span>}
                  </span>
                  <span style={{ color: h.closed ? '#BBBBBB' : (i === todayIdx ? '#111111' : '#555555') }}>{h.open}</span>
                </div>
              ))}
              <p style={{ margin: '14px 0 0 0', fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 13, color: '#777777' }}>Walk-ins welcome during business hours.</p>
            </div>
          </div>
          <div className="reveal-right" style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', border: '1px solid #E5E5E5', background: '#F5F5F5', minHeight: 480 }}>
            <iframe src="https://maps.google.com/maps?q=1180+Olive+Drive,+Davis,+CA+95616&z=16&output=embed" title="Center City Auto Repair" width="100%" height="100%" style={{ border: 0, display: 'block', position: 'absolute', inset: 0, width: '100%', height: '100%' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            <a href="https://maps.google.com/?q=1180+Olive+Drive+Davis+CA+95616" target="_blank" rel="noopener" style={{ position: 'absolute', bottom: 16, right: 16, background: '#FFFFFF', padding: '10px 16px', borderRadius: 3, boxShadow: '0 6px 18px rgba(0,0,0,0.14)', fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#111111', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, zIndex: 1 }}>
              <Navigation size={13} style={{ color: '#29B9E7' }} />Open in Maps
            </a>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:1023px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
