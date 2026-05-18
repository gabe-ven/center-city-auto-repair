/* global React, Brand, Wrench, Phone, Pin, Clock, Arrow, Check */

const ServicePage = () => {
  return (
    <div className="shop" style={{ width: 1440 }}>

      {/* utility + nav */}
      <div style={{
        background: "var(--ink)", color: "#cfcfcf",
        padding: "9px 56px",
        fontFamily: "var(--sans)", fontSize: 13,
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <span style={{ display: "inline-flex", gap: 7, alignItems: "center" }}>
            <Clock s={13}/> Open until 6:00 pm
          </span>
          <span style={{ color: "#555" }}>|</span>
          <span style={{ display: "inline-flex", gap: 7, alignItems: "center" }}>
            <Pin s={13}/> 1180 Olive Drive, Davis CA
          </span>
        </div>
        <a href="#" style={{ color: "#fff", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 7, fontWeight: 600 }}>
          <Phone s={13}/> (530) 758-0204
        </a>
      </div>

      <header style={{
        padding: "18px 56px", display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid var(--line)", background: "#fff",
      }}>
        <Brand/>
        <nav style={{ display: "flex", gap: 32, fontFamily: "var(--sans)", fontWeight: 500, fontSize: 15 }}>
          {["Services", "Our Shop", "Tracking", "Reviews", "Hours & Contact"].map((l) => (
            <a key={l} href="#" style={{
              color: "var(--ink)", textDecoration: "none", padding: "4px 0",
              borderBottom: l === "Services" ? "2px solid var(--cyan)" : "2px solid transparent",
            }}>{l}</a>
          ))}
        </nav>
        <div style={{ display: "flex", gap: 12 }}>
          <a href="#" className="btn btn-ghost"><Wrench s={14}/> Track repair</a>
          <a href="#" className="btn btn-primary">Schedule Service <Arrow s={14}/></a>
        </div>
      </header>

      {/* breadcrumb */}
      <div style={{ padding: "16px 56px 0", fontSize: 13, color: "var(--ink-mute)" }}>
        <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Home</a>
        <span style={{ margin: "0 8px" }}>/</span>
        <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Services</a>
        <span style={{ margin: "0 8px" }}>/</span>
        <span style={{ color: "var(--ink)" }}>Brake Service & Repair</span>
      </div>

      {/* ============= SERVICE HEADER ============= */}
      <section style={{ padding: "32px 56px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 56, alignItems: "start" }}>
          <div>
            <h1 style={{ fontSize: 40, color: "var(--ink)", marginBottom: 16 }}>
              Brake Service & Repair
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.6, color: "var(--ink-3)", maxWidth: 540 }}>
              Pads, rotors, calipers, fluid flushes, and the diagnostic eye to tell you what
              actually needs doing — and what can wait another six months.
            </p>
          </div>

          {/* at a glance */}
          <div style={{ border: "1px solid var(--line)", padding: 28, background: "var(--bg-2)" }}>
            <div style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--ink-mute)", marginBottom: 18 }}>
              At a glance
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { l: "Typical price", v: "$285–$520" },
                { l: "Time in shop", v: "2–3 hours" },
                { l: "Warranty", v: "24 mo / 24k mi" },
                { l: "Same-day", v: "Yes, before 11 am" },
              ].map(s => (
                <div key={s.l}>
                  <div style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--ink-mute)", marginBottom: 4 }}>{s.l}</div>
                  <div style={{ fontFamily: "var(--display-tight)", fontSize: 24, fontWeight: 700, color: "var(--ink)" }}>{s.v}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
              <a href="#" className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }}>Schedule brake service</a>
              <a href="#" className="btn btn-ghost"><Phone s={14}/></a>
            </div>
          </div>
        </div>
      </section>

      {/* hero image */}
      <div style={{ padding: "0 56px 48px" }}>
        <div className="ph ratio-16x10" data-label="SHOP FLOOR · brake job in progress, Bay 03" style={{ width: "100%" }}/>
        <div style={{
          display: "flex", justifyContent: "space-between",
          paddingTop: 10, fontSize: 12, color: "var(--ink-mute)",
        }}>
          <span>Bay 03 · Marcus R., ASE Brake Specialist</span>
          <span>Davis, CA 95616</span>
        </div>
      </div>

      {/* ============= WHAT'S INCLUDED + SIDEBAR ============= */}
      <section style={{ padding: "0 56px 72px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 64 }}>
          {/* main body */}
          <div>
            <h2 style={{ fontSize: 26, color: "var(--ink)", marginBottom: 16 }}>
              What's Included
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--ink-3)", marginBottom: 32 }}>
              When you bring your car in for brake service, we don't guess. We pull a wheel,
              measure pad thickness in millimeters, check rotor runout, and show you what we
              find — physically, in the bay, before we touch a tool. If the pads have 3mm left,
              we'll tell you. If you can drive on them another year, we'll tell you that too.
            </p>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px", display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { h: "Pad replacement (front, rear, or all four)", d: "Premium ceramic or semi-metallic, OEM-spec or better." },
                { h: "Rotor service: resurface or replace", d: "We measure runout; we don't just default to replacement." },
                { h: "Caliper inspection & rebuild as needed", d: "Stuck slide pins are a Davis special — heat, dust, age." },
                { h: "Brake fluid flush (every 30k miles)", d: "DOT 3, DOT 4, or DOT 5.1 to your manufacturer spec." },
                { h: "Final road test with the lead tech", d: "We don't release the car until it stops the way it should." },
              ].map((it, i) => (
                <li key={i} style={{
                  display: "grid", gridTemplateColumns: "22px 1fr",
                  gap: 16, padding: "16px 0",
                  borderTop: "1px solid var(--line)",
                  borderBottom: i === 4 ? "1px solid var(--line)" : "none",
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: "50%",
                    background: "var(--cyan)", color: "var(--ink)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, marginTop: 2,
                  }}><Check s={11}/></div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 16, color: "var(--ink)" }}>{it.h}</div>
                    <div style={{ fontSize: 14, color: "var(--ink-3)", marginTop: 3 }}>{it.d}</div>
                  </div>
                </li>
              ))}
            </ul>

            {/* mini gallery */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 40 }}>
              <div className="ph ratio-4x3" data-label="Pad thickness measurement"/>
              <div className="ph ratio-4x3" data-label="Rotor runout check"/>
            </div>

            <h3 style={{ fontSize: 22, color: "var(--ink)", marginBottom: 16 }}>
              Common Questions
            </h3>

            <div style={{ borderTop: "1px solid var(--line)" }}>
              {[
                { q: "How do I know if I need brakes, really?", a: "Squealing when cold is normal moisture. Grinding, pulling to one side, or a soft pedal — bring it in. We'll measure for free." },
                { q: "Can I just do the front pads?", a: "Sometimes, yes. If your fronts are at 3mm and your rears are at 8mm, we'll do the fronts. We won't sell you a job you don't need." },
                { q: "Do you use OEM parts?", a: "By default we use OEM-spec ceramic pads from name brands (Akebono, Brembo, Bosch). Genuine OEM is available on request and runs about 15% more." },
                { q: "What's the warranty?", a: "24 months or 24,000 miles, parts and labor, honored at the shop. We've never not honored a warranty in 38 years." },
              ].map((it, i) => (
                <details key={i} style={{ borderBottom: "1px solid var(--line)", padding: "16px 0" }} open={i === 0}>
                  <summary style={{
                    listStyle: "none", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    fontSize: 16, fontWeight: 600, color: "var(--ink)",
                  }}>
                    {it.q}
                    <span style={{ fontSize: 18, color: "var(--ink-mute)", fontWeight: 400 }}>+</span>
                  </summary>
                  <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-3)", marginTop: 12, marginBottom: 0, maxWidth: 600 }}>{it.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* sidebar */}
          <aside style={{ position: "sticky", top: 20 }}>
            <div style={{ border: "1px solid var(--line)", padding: 28, background: "#fff", marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--ink-mute)", marginBottom: 12 }}>
                Book this service
              </div>
              <div style={{ fontFamily: "var(--display-tight)", fontSize: 24, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>
                Next opening
              </div>
              <div style={{ fontSize: 14, color: "var(--ink-3)", marginBottom: 22 }}>Six slots open this week.</div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 16 }}>
                {[
                  { d: "WED", n: "15", s: "5" },
                  { d: "THU", n: "16", s: "3" },
                  { d: "FRI", n: "17", s: "2" },
                  { d: "SAT", n: "18", s: "0" },
                ].map((d, i) => (
                  <button key={i} style={{
                    border: d.s === "0" ? "1px solid var(--line)" : (i === 1 ? "2px solid var(--ink)" : "1px solid var(--line)"),
                    background: i === 1 ? "var(--ink)" : "transparent",
                    color: d.s === "0" ? "var(--ink-mute)" : (i === 1 ? "#fff" : "var(--ink)"),
                    padding: "12px 8px", cursor: d.s === "0" ? "default" : "pointer",
                    opacity: d.s === "0" ? 0.5 : 1, borderRadius: 2,
                    fontFamily: "var(--sans)",
                  }}>
                    <div style={{ fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase" }}>{d.d}</div>
                    <div style={{ fontFamily: "var(--display-tight)", fontSize: 22, fontWeight: 700 }}>{d.n}</div>
                    <div style={{ fontSize: 9, opacity: 0.8 }}>{d.s} open</div>
                  </button>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, marginBottom: 20 }}>
                {["8:00 am", "9:30 am", "11:00 am", "1:30 pm", "3:00 pm", "4:30 pm"].map((t, i) => (
                  <button key={t} style={{
                    border: i === 2 ? "2px solid var(--cyan)" : "1px solid var(--line)",
                    background: i === 2 ? "var(--cyan)" : "transparent",
                    color: "var(--ink)",
                    padding: "10px 6px", cursor: "pointer",
                    fontFamily: "var(--sans)", fontSize: 12, borderRadius: 2,
                  }}>{t}</button>
                ))}
              </div>

              <a href="#" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                Confirm Thu Apr 16, 11:00 am <Arrow/>
              </a>
              <div style={{ fontSize: 12, color: "var(--ink-mute)", marginTop: 10, textAlign: "center" }}>
                Or call <a href="#" style={{ color: "var(--ink)" }}>(530) 758-0204</a> — Elena answers.
              </div>
            </div>

            <div style={{ border: "1px solid var(--line)", padding: 24, background: "var(--bg-2)" }}>
              <div style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--ink-mute)", marginBottom: 14 }}>
                Also might need
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { t: "Tire rotation", p: "Free with brake service" },
                  { t: "Alignment check", p: "$45 add-on" },
                  { t: "Brake fluid flush", p: "$129" },
                ].map(it => (
                  <li key={it.t} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 12, borderBottom: "1px solid var(--line)", fontSize: 14 }}>
                    <span>{it.t}</span>
                    <span style={{ fontSize: 13, color: "var(--ink-3)" }}>{it.p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {/* ============= MEET THE TECH ============= */}
      <section style={{ background: "var(--bg-2)", padding: "64px 56px", borderTop: "1px solid var(--line)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "0.7fr 1.3fr", gap: 48, alignItems: "center" }}>
          <div className="ph ratio-4x3" data-label="Marcus Robinson, ASE Brake Specialist" style={{ width: "100%" }}/>
          <div>
            <div style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--cyan-2)", marginBottom: 12 }}>
              The tech who'll be on your car
            </div>
            <h2 style={{ fontSize: 28, color: "var(--ink)", marginBottom: 16 }}>
              Marcus is our brake specialist. 18 years, no shortcuts.
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.65, color: "var(--ink-3)", maxWidth: 580, marginBottom: 24 }}>
              Marcus started with us as an apprentice in 2008 and worked his way to lead brake tech.
              He's the one who'll wave you over to the bay to show you what he found. If you'd rather
              not look, that's okay too — but the offer stands.
            </p>
            <div style={{ display: "flex", gap: 32, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--ink-mute)", marginBottom: 4 }}>Certifications</div>
                <div style={{ fontSize: 14 }}>ASE Brake (A5) · ASE Master</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--ink-mute)", marginBottom: 4 }}>Specialties</div>
                <div style={{ fontSize: 14 }}>Brakes · Suspension · Subaru</div>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--ink-mute)", marginBottom: 4 }}>At the shop since</div>
                <div style={{ fontSize: 14 }}>2008</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============= CTA ============= */}
      <section style={{ padding: "64px 56px" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr auto", gap: 32, alignItems: "center",
          paddingBottom: 32, borderBottom: "1px solid var(--line)",
        }}>
          <h2 style={{ fontSize: 30, color: "var(--ink)" }}>
            Bring it in — we'll take a look for free.
          </h2>
          <div style={{ display: "flex", gap: 12 }}>
            <a href="#" className="btn btn-primary">Schedule online <Arrow/></a>
            <a href="#" className="btn btn-ghost"><Phone s={14}/> (530) 758-0204</a>
          </div>
        </div>
      </section>

      {/* footer (mini) */}
      <footer style={{
        background: "var(--ink)", color: "#9c9c9c",
        padding: "28px 56px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontSize: 13,
      }}>
        <span>© 2026 Center City Automotive Inc. · Davis, California</span>
        <span style={{ display: "flex", gap: 24 }}>
          <a href="#" style={{ color: "#cfcfcf", textDecoration: "none" }}>All services</a>
          <a href="#" style={{ color: "#cfcfcf", textDecoration: "none" }}>Our shop</a>
          <a href="#" style={{ color: "#cfcfcf", textDecoration: "none" }}>Reviews</a>
          <a href="#" style={{ color: "#fff", textDecoration: "none", fontWeight: 600 }}>(530) 758-0204</a>
        </span>
      </footer>
    </div>
  );
};

window.ServicePage = ServicePage;
