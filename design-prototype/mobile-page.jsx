/* global React, Brand, Wrench, Phone, Pin, Clock, Arrow, Check, Star, Diag, Rating */

const MobilePage = () => {
  return (
    <div className="shop" style={{ width: 390, background:"var(--paper)" }}>
      {/* faux status bar */}
      <div style={{
        display:"flex", justifyContent:"space-between", alignItems:"center",
        padding:"12px 22px 6px",
        fontFamily:"var(--mono)", fontSize:13, fontWeight:600
      }}>
        <span>9:41</span>
        <span style={{display:"flex", gap:6, alignItems:"center"}}>
          <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor"><rect x="0" y="6" width="3" height="4"/><rect x="4" y="4" width="3" height="6"/><rect x="8" y="2" width="3" height="8"/><rect x="12" y="0" width="3" height="10"/></svg>
          <span>5G</span>
          <svg width="22" height="10" viewBox="0 0 22 10" fill="none" stroke="currentColor" strokeWidth="1"><rect x="0.5" y="0.5" width="18" height="9" rx="1.5"/><rect x="2" y="2" width="14" height="6" fill="currentColor"/><rect x="20" y="3" width="1.5" height="4" fill="currentColor"/></svg>
        </span>
      </div>

      {/* promo strip */}
      <div style={{
        background:"var(--oxblood)", color:"var(--paper)",
        padding:"10px 22px",
        fontFamily:"var(--mono)", fontSize:10.5, letterSpacing:"0.12em",
        textTransform:"uppercase",
        display:"flex", justifyContent:"space-between", alignItems:"center", gap:10
      }}>
        <span style={{
          background:"var(--paper)", color:"var(--oxblood)",
          padding:"2px 7px", fontWeight:600
        }}>★ Now</span>
        <span style={{flex:1, textAlign:"center"}}>$20 off oil change · UCD ID</span>
        <span style={{borderBottom:"1px solid var(--paper)", paddingBottom:1}}>More →</span>
      </div>

      {/* sticky-feel mobile nav */}
      <header style={{
        padding: "14px 22px",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        borderBottom:"1px solid var(--rule)",
        background:"var(--paper)"
      }}>
        <Brand/>
        <button style={{
          width:42, height:42, border:"1px solid var(--rule-strong)",
          background:"transparent", borderRadius:3, cursor:"pointer",
          display:"flex", flexDirection:"column", justifyContent:"center",
          alignItems:"center", gap:5
        }}>
          <span style={{width:18, height:1.5, background:"var(--ink)"}}/>
          <span style={{width:18, height:1.5, background:"var(--ink)"}}/>
        </button>
      </header>

      {/* utility row */}
      <div style={{
        padding:"10px 22px",
        background:"var(--ink)", color:"var(--paper)",
        display:"flex", justifyContent:"space-between",
        fontFamily:"var(--mono)", fontSize:10, letterSpacing:"0.1em",
        textTransform:"uppercase"
      }}>
        <span>Open until 6p</span>
        <a href="#" style={{color:"var(--paper)", textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6}}>
          <Phone s={10}/> (530) 758-0204
        </a>
      </div>

      {/* hero */}
      <section style={{padding:"32px 22px 28px"}}>
        <div className="kicker" style={{marginBottom:14}}>Davis, California · Est. 1987</div>
        <h1 style={{fontSize: 56, lineHeight:0.95, fontWeight:500, letterSpacing:"-0.03em", marginBottom: 20}}>
          Honest work,<br/>done right,<br/>
          <span style={{color:"var(--cyan-2)"}}>since 1987.</span>
        </h1>
        <p style={{fontSize:15, lineHeight:1.55, color:"var(--ink-2)", marginBottom: 24}}>
          Three generations of the Alvarez family. No upsells, no surprises on the bill.
        </p>
        <div style={{display:"flex", flexDirection:"column", gap:10, marginBottom: 24}}>
          <a href="#" className="btn btn-primary" style={{justifyContent:"center"}}>Schedule a service <Arrow/></a>
          <a href="#" className="btn btn-ghost" style={{justifyContent:"center"}}>
            <Phone s={14}/> Call the shop
          </a>
        </div>
        <Rating small/>
      </section>

      {/* hero image */}
      <div style={{padding:"0 22px 32px"}}>
        <div className="ph ratio-4x3" data-label="The Alvarez family at the shop"/>
      </div>

      {/* trust strip */}
      <section style={{
        background:"var(--paper-2)", padding:"20px 22px",
        borderTop:"1px solid var(--rule)", borderBottom:"1px solid var(--rule)",
        display:"flex", flexDirection:"column", gap:10,
        fontFamily:"var(--mono)", fontSize:11, letterSpacing:"0.12em",
        textTransform:"uppercase"
      }}>
        {[
          ["01", "ASE Master Certified"],
          ["02", "NAPA AutoCare Center"],
          ["03", "AAA Approved Auto Repair"],
          ["04", "Free Davis shuttle"],
        ].map(([n,t]) => (
          <div key={n} style={{display:"flex", gap:14}}>
            <span style={{color:"var(--ink-mute)"}}>{n}</span>
            <span style={{color:"var(--ink-2)"}}>{t}</span>
          </div>
        ))}
      </section>

      {/* services */}
      <section style={{padding:"40px 22px 32px"}}>
        <div className="kicker" style={{marginBottom:12}}>No. 02 · What we work on</div>
        <h2 style={{fontSize: 36, lineHeight:1, fontWeight:500, letterSpacing:"-0.03em", marginBottom:24}}>
          The menu, with <span style={{color:"var(--cyan-2)"}}>straight</span> prices.
        </h2>

        <div style={{borderTop:"1px solid var(--rule-strong)"}}>
          {[
            {n:"01", t:"Oil & Filter", p:"$65–$95", time:"45m"},
            {n:"02", t:"Brake Service", p:"$285–$520", time:"2–3h"},
            {n:"03", t:"Check-Engine Diagnostic", p:"$129 flat", time:"1h"},
            {n:"04", t:"Tires & Alignment", p:"$180/tire", time:"90m"},
            {n:"05", t:"A/C & Heating", p:"$220–$680", time:"1–4h"},
            {n:"06", t:"Timing Belt & Water Pump", p:"$680–$1,240", time:"6–8h"},
          ].map(s => (
            <a key={s.n} href="#" style={{
              display:"grid", gridTemplateColumns:"28px 1fr auto",
              gap:14,
              padding: "18px 0",
              borderBottom: "1px solid var(--rule-strong)",
              alignItems:"center", color:"var(--ink)", textDecoration:"none"
            }}>
              <span className="mono" style={{fontSize:11, color:"var(--ink-mute)", letterSpacing:"0.08em"}}>{s.n}</span>
              <div>
                <div style={{fontFamily:"var(--display)", fontSize:19, fontWeight:500, letterSpacing:"-0.015em"}}>{s.t}</div>
                <div style={{display:"flex", gap:12, marginTop:3}}>
                  <span className="mono" style={{fontSize:12}}>{s.p}</span>
                  <span className="label">{s.time}</span>
                </div>
              </div>
              <Arrow s={14}/>
            </a>
          ))}
        </div>
        <a href="#" className="btn-link" style={{marginTop:18, display:"inline-block"}}>View all 24 services →</a>
      </section>

      {/* family band */}
      <section style={{background:"var(--ink)", color:"var(--paper)", padding:"40px 22px"}}>
        <div className="kicker" style={{color:"#c08a3a", marginBottom:14}}>No. 03 · The shop on Olive Drive</div>
        <h2 style={{
          fontSize:38, lineHeight:1, fontWeight:500, letterSpacing:"-0.03em",
          color:"var(--paper)", marginBottom:18
        }}>
          We grew up under these <span style={{color:"var(--cyan)"}}>hoods.</span>
        </h2>
        <p style={{fontSize:15, lineHeight:1.6, color:"#d6cdb6", marginBottom: 22}}>
          Frank Alvarez Sr. opened the shop with two bays in 1987. Today his son
          Mateo runs the place, his daughter Elena writes the work orders.
        </p>
        <div className="ph ph-dark ratio-4x3" data-label="Frank Sr. & Mateo, 1992" style={{marginBottom: 16}}/>
        <a href="#" className="btn-link" style={{color:"#e6c896", borderColor:"#e6c896"}}>Read our story →</a>
      </section>

      {/* tracking callout */}
      <section style={{padding:"40px 22px 32px"}}>
        <div className="kicker" style={{marginBottom:12}}>No. 04</div>
        <h2 style={{fontSize: 32, lineHeight:1, fontWeight:500, letterSpacing:"-0.03em", marginBottom:18}}>
          Track your repair in real time.
        </h2>

        {/* tiny mock card */}
        <div style={{
          background:"var(--ink)", color:"var(--paper)",
          padding:18, borderRadius:4, marginBottom:20
        }}>
          <div style={{
            fontFamily:"var(--mono)", fontSize:10, letterSpacing:"0.12em",
            color:"#a89e87", marginBottom:6
          }}>WORK ORDER #C-24-3091</div>
          <div style={{fontFamily:"var(--display)", fontSize:20, fontWeight:500, letterSpacing:"-0.015em", marginBottom: 10}}>
            2019 Subaru Outback
          </div>
          <div style={{display:"flex", gap:4, marginBottom:8}}>
            {[1,1,1,0].map((on,i) => (
              <div key={i} style={{flex:1, height:5, background: on?"var(--oxblood)":"#ffffff15", borderRadius:1}}/>
            ))}
          </div>
          <div style={{display:"flex", justifyContent:"space-between", fontFamily:"var(--mono)", fontSize:9, letterSpacing:"0.1em", color:"#a89e87", textTransform:"uppercase"}}>
            <span>In</span><span>Inspect</span><span style={{color:"#e6c896"}}>Repair</span><span>Pickup</span>
          </div>
          <div style={{
            marginTop:14, paddingTop:14, borderTop:"1px solid #ffffff15",
            fontSize:12.5, color:"#d6cdb6", lineHeight:1.45
          }}>
            <span className="mono" style={{color:"#e6c896", marginRight:8, fontSize:11}}>11:55a</span>
            Marcus is on the brakes. Pickup by 1:30p.
          </div>
        </div>
        <a href="#" className="btn btn-primary" style={{justifyContent:"center", width:"100%"}}>Track my repair <Arrow/></a>
      </section>

      {/* review */}
      <section style={{background:"var(--paper-2)", padding:"40px 22px"}}>
        <div style={{display:"flex", gap:2, color:"var(--amber)", marginBottom:14}}>
          {[0,1,2,3,4].map(i => <Star key={i} s={14}/>)}
        </div>
        <p style={{fontSize:20, lineHeight:1.4, fontFamily:"var(--display)", fontWeight:400, letterSpacing:"-0.015em", marginBottom:18}}>
          "22 years. They've never once upsold me, never once been wrong, and they always do what they say they'll do."
        </p>
        <div style={{display:"flex", alignItems:"center", gap:12}}>
          <div className="ph" style={{width:40, height:40, borderRadius:"50%"}} data-label=""/>
          <div>
            <div style={{fontWeight:600, fontSize:14}}>Diana M.</div>
            <div className="label" style={{marginTop:2}}>Old North Davis</div>
          </div>
        </div>
        <div style={{marginTop: 22, paddingTop: 18, borderTop: "1px solid var(--rule-strong)"}}>
          <Rating small/>
        </div>
      </section>

      {/* visit */}
      <section style={{padding:"40px 22px 32px"}}>
        <div className="kicker" style={{marginBottom:12}}>No. 06 · Visit us</div>
        <h2 style={{fontSize:32, lineHeight:1, fontWeight:500, letterSpacing:"-0.03em", marginBottom:20}}>
          1180 Olive Drive, between the train tracks and the Co-op.
        </h2>
        <div className="ph ratio-3x2" data-label="MAP · Davis" style={{marginBottom: 18}}/>
        <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:18, marginBottom: 22}}>
          <div>
            <div className="label" style={{marginBottom:6}}>Hours</div>
            <div style={{fontFamily:"var(--mono)", fontSize:12, lineHeight:1.6}}>
              Mon–Fri 7:30a–6p<br/>Sat 8a–2p<br/>Sun closed
            </div>
          </div>
          <div>
            <div className="label" style={{marginBottom:6}}>Phone</div>
            <div style={{fontFamily:"var(--mono)", fontSize:14}}>(530)<br/>758-0204</div>
          </div>
        </div>
        <a href="#" className="btn btn-primary" style={{justifyContent:"center", width:"100%"}}>Get directions <Arrow/></a>
      </section>

      {/* sticky-feel call CTA */}
      <div style={{
        position: "sticky", bottom: 0,
        padding:"14px 22px",
        background:"var(--ink)", color:"var(--paper)",
        display:"flex", gap:10, alignItems:"center",
        borderTop:"1px solid #ffffff15",
      }}>
        <a href="#" style={{
          flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:10,
          background:"var(--oxblood)", color:"var(--paper)",
          padding:"14px 16px", textDecoration:"none",
          fontFamily:"var(--sans)", fontWeight:600, fontSize:14
        }}>
          <Phone s={14}/> Call · (530) 758-0204
        </a>
        <a href="#" style={{
          width:48, height:48, display:"flex", alignItems:"center", justifyContent:"center",
          background:"transparent", border:"1px solid #ffffff30", color:"var(--paper)",
          textDecoration:"none"
        }}>
          <Pin s={16}/>
        </a>
      </div>

      {/* mini footer */}
      <footer style={{
        background:"var(--ink)", color:"#a89e87",
        padding:"24px 22px",
        fontFamily:"var(--mono)", fontSize:10, letterSpacing:"0.12em",
        textTransform:"uppercase",
        textAlign:"center"
      }}>
        © 2026 Center City Auto Repair<br/>
        BAR #ARD00284619 · Davis, CA
      </footer>
    </div>
  );
};

window.MobilePage = MobilePage;
