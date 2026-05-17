'use client';

const VEHICLES = [
  { file: 'car-camry-2019.png',   name: '2019 Toyota Camry',    mileage: '58,340', date: 'May 14, 2026', services: ['Oil & Filter Change', 'Tire Rotation', 'Fluid Top-Off'] },
  { file: 'car-accord-2021.png',  name: '2021 Honda Accord',    mileage: '41,870', date: 'May 15, 2026', services: ['Brake Inspection', 'Electronic Tune-Up'] },
  { file: 'car-silverado-2018.png', name: '2018 Chevy Silverado', mileage: '98,220', date: 'May 16, 2026', services: ['Oil Change', 'Battery Replacement', 'Lube Service'] },
];

export default function RecentlyServicedSection() {
  return (
    <section style={{ background: '#111111', padding: 'clamp(48px,7vw,96px) clamp(24px,5vw,80px) clamp(64px,9vw,120px)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>

        <div className="reveal-up" style={{ textAlign: 'center', marginBottom: 'clamp(28px,5vw,52px)' }}>
          <div style={{ fontFamily: "'Barlow Condensed',sans-serif", color: '#29B9E7', fontSize: 13, fontWeight: 600, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: 10 }}>· From the Shop ·</div>
          <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(40px,5.5vw,72px)', color: '#FFFFFF', margin: 0, lineHeight: 0.95 }}>Recently Serviced</h2>
          <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', fontSize: 17, marginTop: 10 }}>Fresh off the lift at Center City.</p>
        </div>

        <div className="recent-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 10, overflow: 'hidden' }}>
          {VEHICLES.map((v, i) => (
            <div key={i} className={`recent-card reveal-up delay-${i + 1}`} style={{ background: '#1A1A1A', display: 'flex', flexDirection: 'column', transition: 'background 220ms' }}>

              {/* Car image — multiply on white erases the baked-in white PNG background */}
              <div style={{ flex: 'none', height: 200, background: '#FFFFFF', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '24px 20px 0', overflow: 'hidden' }}>
                <img
                  src={`/assets/images/cars/${v.file}`}
                  alt={v.name}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom', display: 'block', mixBlendMode: 'multiply' }}
                />
              </div>

              {/* Card body */}
              <div style={{ padding: '18px 24px 28px', borderTop: '2px solid #29B9E7', flex: 1 }}>
                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 22, color: '#FFFFFF', letterSpacing: '0.01em', marginBottom: 16 }}>{v.name}</div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 10, color: '#29B9E7', letterSpacing: '0.26em', textTransform: 'uppercase', marginBottom: 4 }}>Mileage</div>
                    <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: 15, color: '#FFFFFF' }}>{v.mileage}</div>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 10, color: '#29B9E7', letterSpacing: '0.26em', textTransform: 'uppercase', marginBottom: 4 }}>Service Date</div>
                    <div style={{ fontFamily: 'Inter,sans-serif', fontWeight: 600, fontSize: 15, color: '#FFFFFF' }}>{v.date}</div>
                  </div>
                </div>

                <div style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 10, color: '#29B9E7', letterSpacing: '0.26em', textTransform: 'uppercase', marginBottom: 10 }}>Services Performed</div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {v.services.map((srv, j) => (
                    <li key={j} style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 4, height: 4, flexShrink: 0, background: '#29B9E7', borderRadius: '50%' }} />{srv}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </div>
      <style>{`.recent-card:hover{background:#1E1E1E!important}@media(max-width:1023px){.recent-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}
