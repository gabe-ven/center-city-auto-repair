/* global React, Brand, Rating, Wrench, Phone, Pin, Clock, Arrow, Diag, Star, Check */

const HomePage = () => {
  return (
    <div className="shop" style={{ width: 1440 }}>

      {/* ============= TOP BAR ============= */}
      <div style={{
        background: "var(--ink)", color: "#cfcfcf",
        padding: "9px 56px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        fontFamily: "var(--sans)", fontSize: 13,
      }}>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <span style={{ display: "inline-flex", gap: 7, alignItems: "center" }}>
            <Pin s={13}/> 1180 Olive Drive, Davis CA 95616
          </span>
          <span style={{ color: "#555" }}>|</span>
          <span style={{ display: "inline-flex", gap: 7, alignItems: "center" }}>
            <Clock s={13}/> Mon–Fri 7:30 am–6:00 pm · Sat 8:00 am–2:00 pm
          </span>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <span style={{ display: "inline-flex", gap: 7, alignItems: "center", color: "var(--cyan)", fontSize: 13 }}>
            <span style={{ width: 6, height: 6, background: "var(--cyan)", borderRadius: "50%" }}/>
            Open now
          </span>
          <a href="#" style={{
            color: "#fff", textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 7, fontWeight: 600,
          }}>
            <Phone s={13}/> (530) 758-0204
          </a>
        </div>
      </div>

      {/* ============= NAV ============= */}
      <header style={{
        padding: "18px 56px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid var(--line)",
        background: "#fff",
      }}>
        <Brand/>
        <nav style={{
          display: "flex", gap: 32,
          fontFamily: "var(--sans)", fontWeight: 500, fontSize: 15,
        }}>
          {["Services", "Our Shop", "Specials", "Tracking", "Reviews", "Contact"].map((l, i) => (
            <a key={l} href="#" style={{
              color: "var(--ink)", textDecoration: "none",
              padding: "4px 0",
              borderBottom: i === 0 ? "2px solid var(--cyan)" : "2px solid transparent",
            }}>{l}</a>
          ))}
        </nav>
        <a href="#" className="btn btn-primary">Schedule Service <Arrow s={14}/></a>
      </header>

      {/* ============= HERO ============= */}
      <section style={{ padding: "56px 56px 64px", background: "#fff", borderBottom: "1px solid var(--line)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <p style={{ fontSize: 14, color: "var(--ink-mute)", margin: "0 0 14px" }}>
              Family-owned · Davis, CA · Est. 1987
            </p>
            <h1 style={{ fontSize: 46, marginBottom: 18, color: "var(--ink)" }}>
              Honest Auto Repair<br/>in Davis, California
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--ink-3)", marginBottom: 28, maxWidth: 500 }}>
              ASE-certified shop serving Davis and Yolo County since 1987.
              Three generations of the Alvarez family — no upsells, no surprises on the bill.
            </p>
            <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
              <a href="#" className="btn btn-primary">Schedule Service <Arrow s={14}/></a>
              <a href="#" className="btn btn-ghost"><Phone s={14}/> (530) 758-0204</a>
            </div>
            <Rating/>
          </div>
          <div>
            <div className="ph ratio-4x3" data-label="Center City Auto Repair · Olive Drive shop" style={{ width: "100%" }}/>
          </div>
        </div>
      </section>

      {/* ============= TRUST STRIP ============= */}
      <section style={{
        background: "var(--bg-2)", padding: "18px 56px",
        borderBottom: "1px solid var(--line)",
        display: "flex", justifyContent: "center", gap: 40, alignItems: "center",
      }}>
        {["ASE Master Certified", "NAPA AutoCare Center", "AAA Approved Auto Repair", "BAR #ARD00284619", "24-Month Warranty", "Free Davis Shuttle"].map((t, i) => (
          <React.Fragment key={t}>
            <span style={{ fontFamily: "var(--sans)", fontWeight: 600, fontSize: 13, color: "var(--ink-3)" }}>{t}</span>
            {i < 5 && <span style={{ color: "var(--line)", fontSize: 18 }}>|</span>}
          </React.Fragment>
        ))}
      </section>

      {/* ============= SERVICES ============= */}
      <section style={{ padding: "72px 56px", background: "#fff" }}>
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 30, color: "var(--ink)", marginBottom: 10 }}>Our Services</h2>
          <p style={{ fontSize: 16, color: "var(--ink-3)", maxWidth: 560 }}>
            From routine maintenance to major repairs — all work backed by a 24-month/24,000-mile warranty.
          </p>
        </div>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1, background: "var(--line)",
          border: "1px solid var(--line)",
        }}>
          {[
            { t: "Oil & Filter Service", d: "Full synthetic, conventional, or high-mileage. 22-point inspection included with every oil change.", p: "$65–$95", time: "~45 min" },
            { t: "Brake Service & Repair", d: "Pads, rotors, calipers, fluid flush. We show you what we find before we touch anything.", p: "$285–$520", time: "2–3 hrs" },
            { t: "Check-Engine Diagnostic", d: "Computer scan, road test, and a plain-English explanation. Diagnostic fee applies to your repair.", p: "$129 flat", time: "~1 hr" },
            { t: "Tires & Wheel Alignment", d: "All major brands. Free rotation for the life of the tire when purchased here.", p: "From $180/tire", time: "~90 min" },
            { t: "A/C & Heating Repair", d: "R-1234yf and R-134a refrigerant. Davis summers are no joke — we can usually fix it same day.", p: "$220–$680", time: "1–4 hrs" },
            { t: "Timing Belt & Water Pump", d: "Honda, Toyota, Subaru, VW. OEM-spec parts, 36-month warranty on the job.", p: "$680–$1,240", time: "6–8 hrs" },
          ].map(s => (
            <div key={s.t} style={{
              background: "#fff", padding: "28px 24px",
              display: "flex", flexDirection: "column", gap: 10,
            }}>
              <h3 style={{ fontSize: 17, color: "var(--ink)", margin: 0 }}>{s.t}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-3)", flex: 1, margin: 0 }}>{s.d}</p>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                paddingTop: 14, borderTop: "1px solid var(--line)",
                fontFamily: "var(--sans)", fontSize: 13,
              }}>
                <span style={{ fontWeight: 700, color: "var(--ink)" }}>{s.p}</span>
                <span style={{ color: "var(--ink-mute)" }}>{s.time}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 22, textAlign: "center" }}>
          <a href="#" className="btn-link">View all 24 services →</a>
        </div>
      </section>

      {/* ============= SPECIALS ============= */}
      <section id="specials" style={{ padding: "72px 56px", background: "var(--bg-2)" }}>
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 30, color: "var(--ink)", marginBottom: 8 }}>Current Specials</h2>
          <p style={{ fontSize: 14, color: "var(--ink-mute)" }}>
            Good through May 31, 2026 · Cannot be combined · One per visit · Mention this page at check-in
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            {
              label: "$20 off",
              title: "Oil Change — UCD Students & Staff",
              desc: "Full synthetic or conventional. 22-point inspection included. Show your Aggie ID at check-in.",
              note: "Ends May 31",
            },
            {
              label: "Free",
              title: "A/C System Performance Check",
              desc: "We hook it up, take readings, and tell you straight whether it needs service. No charge, no pressure.",
              note: "Walk-ins welcome",
            },
            {
              label: "$25 each",
              title: "Refer a Davis Neighbor",
              desc: "When a friend you send in comes through, you both get $25 off your next service.",
              note: "No expiration",
            },
          ].map(offer => (
            <div key={offer.title} style={{
              background: "#fff", border: "1px solid var(--line)",
              padding: "24px", borderTop: "3px solid var(--cyan)",
            }}>
              <div style={{
                fontFamily: "var(--display-tight)", fontWeight: 700,
                fontSize: 28, color: "var(--cyan-2)", marginBottom: 8,
              }}>{offer.label}</div>
              <div style={{ fontWeight: 700, fontSize: 16, color: "var(--ink)", marginBottom: 8 }}>{offer.title}</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-3)", marginBottom: 16 }}>{offer.desc}</p>
              <div style={{
                fontSize: 12, color: "var(--ink-mute)",
                borderTop: "1px solid var(--line)", paddingTop: 12,
              }}>{offer.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============= ABOUT ============= */}
      <section style={{ padding: "72px 56px", background: "#fff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div className="ph ratio-4x3" data-label="Frank Sr. & Mateo Alvarez · Center City Auto" style={{ width: "100%" }}/>
          <div>
            <h2 style={{ fontSize: 30, color: "var(--ink)", marginBottom: 18 }}>About Center City Auto</h2>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--ink-3)", marginBottom: 16 }}>
              Frank Alvarez Sr. opened Center City Auto Repair in 1987 with two bays and a hand-me-down air compressor.
              Today his son Mateo runs the place, along with a crew of eight technicians — six ASE-certified.
            </p>
            <p style={{ fontSize: 16, lineHeight: 1.65, color: "var(--ink-3)", marginBottom: 28 }}>
              We've fixed the same Civic for the same Davis family three times — first for the dad in college,
              then his daughter, now her son. That's the kind of shop we are.
            </p>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20,
              borderTop: "1px solid var(--line)", paddingTop: 24,
            }}>
              {[
                { t: "Three Generations", d: "Same family, same address on Olive Drive since 1987." },
                { t: "ASE Certified", d: "Six of eight technicians hold ASE master certifications." },
                { t: "Local Only", d: "One shop, no chain. We answer to our neighbors." },
                { t: "Free Davis Shuttle", d: "Drop your car, we'll take you home or to UCD." },
              ].map(it => (
                <div key={it.t}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)", marginBottom: 4 }}>{it.t}</div>
                  <div style={{ fontSize: 13.5, color: "var(--ink-mute)", lineHeight: 1.5 }}>{it.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============= REVIEWS ============= */}
      <section style={{ padding: "72px 56px", background: "var(--bg-2)" }}>
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontSize: 30, color: "var(--ink)", marginBottom: 12 }}>What Our Customers Say</h2>
          <Rating/>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { n: "Diana M.", loc: "Old North Davis", q: "I've been bringing cars here for 22 years. They've never once upsold me, never once been wrong about a diagnosis. They're not just my mechanics, they're my friends.", d: "Apr 2026" },
            { n: "Carlos R.", loc: "UC Davis Faculty", q: "They diagnosed a problem two other shops couldn't find — and charged me less. Refreshing.", d: "Mar 2026" },
            { n: "Sara K.", loc: "Davis HS parent", q: "Mateo personally walked me through the brake job with the old parts in his hand. I get it now. I trust them.", d: "Feb 2026" },
          ].map(r => (
            <div key={r.n} style={{ background: "#fff", border: "1px solid var(--line)", padding: "24px" }}>
              <div style={{ display: "flex", gap: 3, color: "var(--red)", marginBottom: 14 }}>
                {[0, 1, 2, 3, 4].map(i => <Star key={i} s={14}/>)}
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.6, color: "var(--ink-2)", marginBottom: 18 }}>"{r.q}"</p>
              <div style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)" }}>{r.n}</div>
              <div style={{ fontSize: 12, color: "var(--ink-mute)", marginTop: 2 }}>{r.loc} · {r.d}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <a href="#" className="btn-link">Read all 312 Google reviews →</a>
        </div>
      </section>

      {/* ============= HOURS & CONTACT ============= */}
      <section style={{ padding: "72px 56px", background: "#fff" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}>
          <div>
            <h2 style={{ fontSize: 30, color: "var(--ink)", marginBottom: 28 }}>Hours & Location</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 36 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--ink-mute)", marginBottom: 8 }}>Address</div>
                <div style={{ fontSize: 16, lineHeight: 1.5 }}>1180 Olive Drive<br/>Davis, CA 95616</div>
                <a href="#" className="btn-link" style={{ marginTop: 12, display: "inline-block", fontSize: 13 }}>Get directions →</a>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--ink-mute)", marginBottom: 8 }}>Hours</div>
                <table style={{ fontFamily: "var(--sans)", fontSize: 14, borderCollapse: "collapse" }}>
                  <tbody>
                    <tr><td style={{ paddingRight: 16, color: "var(--ink-mute)", paddingBottom: 5 }}>Mon–Fri</td><td style={{ paddingBottom: 5 }}>7:30 am – 6:00 pm</td></tr>
                    <tr><td style={{ paddingRight: 16, color: "var(--ink-mute)", paddingBottom: 5 }}>Saturday</td><td style={{ paddingBottom: 5 }}>8:00 am – 2:00 pm</td></tr>
                    <tr><td style={{ paddingRight: 16, color: "var(--ink-mute)" }}>Sunday</td><td>Closed</td></tr>
                  </tbody>
                </table>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--ink-mute)", marginBottom: 8 }}>Phone</div>
                <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "var(--display-tight)" }}>(530) 758-0204</div>
                <a href="#" className="btn-link" style={{ marginTop: 12, display: "inline-block", fontSize: 13 }}>Call us →</a>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--ink-mute)", marginBottom: 8 }}>Email</div>
                <div style={{ fontSize: 15 }}>hello@centercityauto.com</div>
              </div>
            </div>
            <a href="#" className="btn btn-primary">Schedule a Service <Arrow/></a>
          </div>
          <div>
            <div className="ph ratio-3x2" data-label="Map · 1180 Olive Drive · Davis CA" style={{ width: "100%", border: "1px solid var(--line)" }}/>
            <div style={{ marginTop: 10, fontSize: 13, color: "var(--ink-mute)" }}>
              1.1 miles from UC Davis campus · Free parking on Olive Drive
            </div>
          </div>
        </div>
      </section>

      {/* ============= FOOTER ============= */}
      <footer style={{ background: "var(--ink)", color: "#fff", padding: "52px 56px 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
          <div>
            <Brand invert/>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: "#a5a5a5", marginTop: 20, maxWidth: 280 }}>
              Family-owned, ASE-certified auto repair on Olive Drive in Davis, California. Serving Yolo County since 1987.
            </p>
          </div>
          {[
            { h: "Services", items: ["Oil & Filter", "Brake Repair", "Diagnostics", "Tires", "A/C & Heating", "All Services →"] },
            { h: "The Shop", items: ["About Us", "Meet the Team", "Reviews", "Specials", "Contact"] },
            { h: "Customers", items: ["Track My Repair", "Schedule Online", "Free Estimate", "Loaner Cars", "Pay Invoice"] },
          ].map(col => (
            <div key={col.h}>
              <div style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--cyan)", marginBottom: 16 }}>{col.h}</div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {col.items.map(i => <li key={i}><a href="#" style={{ color: "#cfcfcf", textDecoration: "none", fontSize: 14 }}>{i}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div style={{
          borderTop: "1px solid #ffffff15", paddingTop: 22,
          display: "flex", justifyContent: "space-between",
          fontSize: 13, color: "#9c9c9c",
        }}>
          <span>© 2026 Center City Automotive Inc. · BAR #ARD00284619</span>
          <span>1180 Olive Drive, Davis CA 95616 · (530) 758-0204</span>
        </div>
      </footer>

    </div>
  );
};

window.HomePage = HomePage;
