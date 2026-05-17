'use client';

const CREDENTIALS = [
  { num: '01', title: 'State Licensed', desc: 'Fully licensed by the State of California Bureau of Automotive Repair.' },
  { num: '02', title: 'BAR Certified', desc: 'Meeting the highest service and safety standards set by the Bureau of Automotive Repair.' },
  { num: '03', title: 'Family Owned', desc: 'Locally owned and operated in Davis since 1987. Community is everything to us.' },
];

export default function AboutSection() {
  return (
    <section id="about">

      {/* Dark intro strip */}
      <div style={{ background: '#0F0F0F', padding: 'clamp(22px,3vw,36px) clamp(24px,5vw,80px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", color: '#29B9E7', fontSize: 11, fontWeight: 700, letterSpacing: '0.36em', textTransform: 'uppercase', flexShrink: 0 }}>Our Story</div>
        <p style={{ fontFamily: "'Playfair Display',serif", fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', fontSize: 'clamp(15px,1.5vw,19px)', margin: 0, flex: 1, textAlign: 'center' }}>
          "Serving Davis families since 1987 — honest work, fair prices, every time."
        </p>
        <div style={{ fontFamily: "'Barlow Condensed',sans-serif", color: 'rgba(255,255,255,0.25)', fontSize: 11, fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', flexShrink: 0 }}>Est. 1987</div>
      </div>

      {/* Main content */}
      <div style={{ background: '#FFFFFF' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: 'clamp(52px,8vw,108px) clamp(24px,5vw,80px)' }}>
          <div className="about-main-grid" style={{ display: 'grid', gridTemplateColumns: '55fr 45fr', gap: 'clamp(40px,7vw,96px)', alignItems: 'center' }}>

            {/* Left — text */}
            <div className="reveal-left">
              <div style={{ fontFamily: "'Barlow Condensed',sans-serif", color: '#29B9E7', fontSize: 11, fontWeight: 700, letterSpacing: '0.36em', textTransform: 'uppercase', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ display: 'block', width: 28, height: 1.5, background: '#29B9E7' }} />
                Welcome to Center City
              </div>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(52px,7vw,96px)', color: '#111111', margin: '0 0 24px', lineHeight: 0.9, letterSpacing: '0.01em' }}>
                AUTO REPAIR<br />
                <span style={{ color: '#29B9E7' }}>DONE RIGHT.</span>
              </h2>

              <div style={{ fontFamily: 'Inter,sans-serif', fontSize: 16, lineHeight: 1.82, color: '#555555', display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 32 }}>
                <p style={{ margin: 0 }}>At Center City Auto Repair, we work hard to be your one-stop shop for all your automotive needs. We take pride in offering genuine car care and superior customer service to every person who walks through our doors.</p>
                <p style={{ margin: 0 }}>Our ASE-certified technicians provide high-quality routine care and repairs tailored to each vehicle — with transparency, clear communication, and the attention to detail that keeps our customers coming back year after year.</p>
              </div>

              <blockquote style={{ margin: 0, padding: '0 0 0 20px', borderLeft: '3px solid #29B9E7', fontFamily: "'Playfair Display',serif", fontStyle: 'italic', fontSize: 17, color: '#1A1A1A', lineHeight: 1.65 }}>
                We've been servicing all makes and models since 1987 — honing our craft to perfection.
              </blockquote>
            </div>

            {/* Right — stacked photos */}
            <div className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ borderRadius: 10, overflow: 'hidden', aspectRatio: '4/3' }}>
                <img src="/2022-02-02.jpg" alt="Mechanic working on engine" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ borderRadius: 10, overflow: 'hidden', aspectRatio: '16/9' }}>
                <img src="/o.jpg" alt="Team servicing vehicle on lift" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Credentials strip */}
      <div style={{ background: '#F8F8F8', borderTop: '1px solid #EBEBEB', borderBottom: '1px solid #EBEBEB' }}>
        <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' }}>
          <div className="credentials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
            {CREDENTIALS.map((c, i) => (
              <div
                key={i}
                className={`cred-cell reveal-up delay-${i + 1}`}
                style={{
                  padding: 'clamp(28px,4vw,52px) clamp(16px,2.5vw,32px)',
                  borderRight: i < 2 ? '1px solid #EBEBEB' : 'none',
                  borderTop: '3px solid transparent',
                  transition: 'border-color 220ms, background 220ms',
                  cursor: 'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderTopColor = '#29B9E7'; e.currentTarget.style.background = '#FFFFFF'; }}
                onMouseLeave={e => { e.currentTarget.style.borderTopColor = 'transparent'; e.currentTarget.style.background = 'transparent'; }}
              >
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 56, color: '#29B9E7', lineHeight: 1, marginBottom: 10, opacity: 0.22 }}>{c.num}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(20px,2.2vw,28px)', color: '#111111', letterSpacing: '0.02em', marginBottom: 10 }}>{c.title}</div>
                <p style={{ fontFamily: 'Inter,sans-serif', fontSize: 14, color: '#777777', margin: 0, lineHeight: 1.68 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:1023px){
          .about-main-grid{grid-template-columns:1fr!important}
          .credentials-grid{grid-template-columns:1fr!important}
          .cred-cell{border-right:none!important;border-bottom:1px solid #EBEBEB}
          .cred-cell:last-child{border-bottom:none}
        }
      `}</style>
    </section>
  );
}
