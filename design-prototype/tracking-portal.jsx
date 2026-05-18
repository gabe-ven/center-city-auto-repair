/* global React, Brand, Wrench, Phone, Pin, Clock, Arrow, Check, Star */

const TrackingPortal = () => {
  return (
    <div className="shop" style={{ width: 1440 }}>
      {/* nav */}
      <header style={{padding:"20px 56px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid var(--rule)"}}>
        <Brand/>
        <nav style={{display:"flex", gap:36, fontSize:14, fontWeight:500}}>
          {["Services","Our Shop","Tracking","Reviews","Hours & Visit"].map(l => (
            <a key={l} href="#" style={{color:"var(--ink)", textDecoration:"none", padding:"4px 0",
              borderBottom: l==="Tracking" ? "1.5px solid var(--ink)" : "1.5px solid transparent"}}>{l}</a>
          ))}
        </nav>
        <div style={{display:"flex", gap:12, alignItems:"center"}}>
          <span className="mono" style={{fontSize:11, letterSpacing:"0.12em", color:"var(--ink-mute)", textTransform:"uppercase"}}>
            Signed in as Jamie K.
          </span>
          <a href="#" className="btn btn-ghost">Sign out</a>
        </div>
      </header>

      {/* page header */}
      <section style={{padding:"40px 56px 32px"}}>
        <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end"}}>
          <div>
            <div className="kicker" style={{marginBottom:12}}>Repair tracking portal</div>
            <h1 style={{fontSize: 64, lineHeight:0.98, fontWeight:500, letterSpacing:"-0.03em"}}>
              Hi Jamie — here's your <span style={{color:"var(--cyan-2)"}}>Outback.</span>
            </h1>
            <div className="mono" style={{fontSize:12, color:"var(--ink-mute)", letterSpacing:"0.08em", marginTop: 16, textTransform:"uppercase"}}>
              Work order #C-24-3091 · Dropped off Tuesday, April 14 at 8:15a · Service advisor: Elena
            </div>
          </div>
          <div style={{display:"flex", gap:10}}>
            <a href="#" className="btn btn-ghost"><Phone s={14}/> Text the shop</a>
            <a href="#" className="btn btn-primary">Download itemized invoice <Arrow s={14}/></a>
          </div>
        </div>
      </section>

      {/* ============= STATUS BAR ============= */}
      <section style={{padding:"0 56px 32px"}}>
        <div style={{
          background:"var(--ink)", color:"var(--paper)",
          padding: 32, borderRadius: 4,
        }}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 24}}>
            <div>
              <div className="kicker" style={{color:"#e6c896", marginBottom: 8}}>Current status · live</div>
              <div style={{fontFamily:"var(--display)", fontSize:36, fontWeight:500, letterSpacing:"-0.02em"}}>
                In repair — Marcus is on it.
              </div>
              <div style={{fontSize:14, color:"#a89e87", marginTop:6}}>
                Estimated pickup: <span style={{color:"var(--paper)"}}>Today, 1:30 — 2:00p</span>
              </div>
            </div>
            <div style={{display:"flex", alignItems:"center", gap:14}}>
              <div style={{
                width: 84, height: 84, borderRadius:"50%",
                background:"conic-gradient(var(--oxblood) 0 67%, #ffffff15 67% 100%)",
                display:"flex", alignItems:"center", justifyContent:"center",
                position:"relative"
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius:"50%", background:"var(--ink)",
                  display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center"
                }}>
                  <div style={{fontFamily:"var(--display)", fontSize:22, fontWeight:500}}>67%</div>
                  <div style={{fontFamily:"var(--mono)", fontSize:9, letterSpacing:"0.12em", color:"#a89e87"}}>COMPLETE</div>
                </div>
              </div>
            </div>
          </div>

          {/* 4-step bar */}
          <div style={{display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap: 14, marginBottom: 18}}>
            {[
              {n:"01", t:"Checked in", time:"Tue 8:15a", state:"done"},
              {n:"02", t:"Inspected", time:"Tue 9:42a", state:"done"},
              {n:"03", t:"In repair", time:"Started 11:55a", state:"active"},
              {n:"04", t:"Ready for pickup", time:"Est. 1:30p", state:"pending"},
            ].map(s => (
              <div key={s.n} style={{
                padding: "14px 16px",
                background: s.state==="active" ? "var(--oxblood)" : (s.state==="done" ? "#ffffff10" : "transparent"),
                border: s.state==="pending" ? "1px dashed #ffffff30" : "1px solid transparent",
                borderRadius: 3,
              }}>
                <div style={{
                  fontFamily:"var(--mono)", fontSize:10, letterSpacing:"0.14em",
                  color: s.state==="active" ? "#ffd9b8" : (s.state==="pending" ? "#a89e87" : "#a89e87"),
                  marginBottom: 6, display:"flex", justifyContent:"space-between"
                }}>
                  <span>{s.n}</span>
                  {s.state==="done" && <Check s={11}/>}
                </div>
                <div style={{fontSize:15, fontWeight:600, color:"var(--paper)"}}>{s.t}</div>
                <div style={{fontFamily:"var(--mono)", fontSize:11, letterSpacing:"0.05em", color: s.state==="active"?"#ffd9b8":"#a89e87", marginTop:4}}>{s.time}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= MAIN GRID ============= */}
      <section style={{padding:"0 56px 56px", display:"grid", gridTemplateColumns:"1.6fr 1fr", gap: 32}}>
        {/* LEFT — timeline + work order */}
        <div>
          {/* work order */}
          <div style={{
            border:"1px solid var(--rule-strong)",
            padding: 28,
            marginBottom: 28,
            background:"var(--paper)"
          }}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom: 24}}>
              <div>
                <div className="label" style={{marginBottom:8}}>Work order</div>
                <div style={{fontFamily:"var(--display)", fontSize:30, fontWeight:500, letterSpacing:"-0.02em"}}>
                  2019 Subaru Outback Limited
                </div>
                <div style={{fontFamily:"var(--mono)", fontSize:12, letterSpacing:"0.08em", color:"var(--ink-mute)", marginTop:4, textTransform:"uppercase"}}>
                  VIN ····7A4291 · 84,210 mi · Silver
                </div>
              </div>
              <div style={{textAlign:"right"}}>
                <div className="label" style={{marginBottom:6}}>Approved total</div>
                <div style={{fontFamily:"var(--display)", fontSize:32, fontWeight:500, letterSpacing:"-0.02em"}}>$385.42</div>
              </div>
            </div>

            <table style={{width:"100%", borderCollapse:"collapse", fontSize:14}}>
              <thead>
                <tr style={{fontFamily:"var(--mono)", fontSize:10, letterSpacing:"0.12em", textTransform:"uppercase", color:"var(--ink-mute)"}}>
                  <th style={{textAlign:"left", padding:"10px 0", borderBottom:"1px solid var(--rule-strong)", width:"45%"}}>Service</th>
                  <th style={{textAlign:"left", padding:"10px 0", borderBottom:"1px solid var(--rule-strong)"}}>Parts</th>
                  <th style={{textAlign:"left", padding:"10px 0", borderBottom:"1px solid var(--rule-strong)"}}>Labor</th>
                  <th style={{textAlign:"right", padding:"10px 0", borderBottom:"1px solid var(--rule-strong)"}}>Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {s:"Front brake pads — Akebono ceramic", p:"$118.00", l:"$140.00", t:"$258.00"},
                  {s:"Front rotors — resurface (in spec)", p:"$0.00", l:"$70.00", t:"$70.00"},
                  {s:"Brake fluid top-off · DOT 4", p:"$8.00", l:"$0.00", t:"$8.00"},
                  {s:"Shop supplies & disposal", p:"$14.00", l:"—", t:"$14.00"},
                  {s:"Tax (Davis 8.25%)", p:"—", l:"—", t:"$35.42"},
                ].map((r,i) => (
                  <tr key={i}>
                    <td style={{padding:"14px 0", borderBottom: i===4 ? "none" : "1px solid var(--rule)"}}>{r.s}</td>
                    <td className="mono" style={{padding:"14px 0", borderBottom: i===4 ? "none" : "1px solid var(--rule)", fontSize:13}}>{r.p}</td>
                    <td className="mono" style={{padding:"14px 0", borderBottom: i===4 ? "none" : "1px solid var(--rule)", fontSize:13}}>{r.l}</td>
                    <td className="mono" style={{padding:"14px 0", borderBottom: i===4 ? "none" : "1px solid var(--rule)", fontSize:13, textAlign:"right"}}>{r.t}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{
              marginTop: 18, padding:"14px 16px",
              background:"var(--paper-2)",
              fontSize: 13, lineHeight: 1.5, color:"var(--ink-2)",
              display:"flex", alignItems:"flex-start", gap:12,
            }}>
              <span style={{
                fontFamily:"var(--mono)", fontSize:10, padding:"3px 6px",
                background:"var(--ink)", color:"var(--paper)", letterSpacing:"0.1em"
              }}>NOTE</span>
              <span>Rear pads measured at 8mm — still plenty of life. We recommend checking again at your next service in ~15,000 miles. Did not replace.</span>
            </div>
          </div>

          {/* timeline */}
          <div style={{
            border:"1px solid var(--rule-strong)",
            padding: 28,
            background:"var(--paper)"
          }}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom: 22}}>
              <div className="label">Bay-floor timeline</div>
              <span className="mono" style={{fontSize:11, letterSpacing:"0.08em", color:"var(--ink-mute)", display:"flex", alignItems:"center", gap:8}}>
                <span style={{width:6, height:6, borderRadius:"50%", background:"#7fb069"}}/> Auto-refreshing
              </span>
            </div>

            <div>
              {[
                {t:"11:55a", h:"Repair in progress", b:"Marcus pulled the front wheels. Removing old pads now.", live:true, who:"Marcus R."},
                {t:"10:18a", h:"You approved the estimate", b:"$385.42 authorized via SMS. Repair scheduled to start by noon.", who:"You"},
                {t:"09:42a", h:"Inspection complete · 1 issue found", b:"Front pads at 2mm. Rotors measured in spec. Sent you photos and an estimate.", who:"Marcus R."},
                {t:"09:05a", h:"Multi-point inspection started", b:"22-point check underway. Standard with every service visit.", who:"Marcus R."},
                {t:"08:42a", h:"Vehicle moved to Bay 03", b:"Subaru-trained tech available. Marcus took the work order.", who:"Elena"},
                {t:"08:15a", h:"Vehicle checked in", b:"Keys received. Mileage logged at 84,210. Issue: 'grinding sound when braking.'", who:"Elena"},
              ].map((e,i) => (
                <div key={i} style={{
                  display:"grid", gridTemplateColumns:"70px 24px 1fr auto",
                  gap: 18,
                  padding:"16px 0",
                  borderTop: i===0 ? "1px solid var(--rule-strong)" : "1px solid var(--rule)",
                  alignItems:"flex-start"
                }}>
                  <span className="mono" style={{fontSize:12, letterSpacing:"0.06em", color: e.live?"var(--oxblood)":"var(--ink-mute)"}}>
                    {e.t}
                  </span>
                  <div style={{paddingTop:6}}>
                    <div style={{
                      width: e.live?12:10, height: e.live?12:10, borderRadius:"50%",
                      background: e.live ? "var(--oxblood)" : (i<=2 ? "var(--ink)" : "transparent"),
                      border: i<=2 ? "none" : "1.5px solid var(--rule-strong)",
                      boxShadow: e.live ? "0 0 0 5px #8a2a1c25" : "none"
                    }}/>
                  </div>
                  <div>
                    <div style={{fontWeight:600, fontSize:15}}>{e.h}</div>
                    <div style={{fontSize:13.5, color:"var(--ink-3)", marginTop:3, lineHeight:1.5}}>{e.b}</div>
                  </div>
                  <span className="label" style={{paddingTop:4}}>{e.who}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — sidebar */}
        <aside style={{display:"flex", flexDirection:"column", gap: 24}}>
          {/* vehicle */}
          <div style={{border:"1px solid var(--rule-strong)", padding:24, background:"var(--paper)"}}>
            <div className="label" style={{marginBottom:14}}>Your vehicle</div>
            <div className="ph ratio-3x2" data-label="2019 Subaru Outback" style={{width:"100%", marginBottom:16}}/>
            <div style={{fontFamily:"var(--display)", fontSize:22, fontWeight:500, letterSpacing:"-0.02em"}}>2019 Subaru Outback Limited</div>
            <div className="mono" style={{fontSize:12, letterSpacing:"0.06em", color:"var(--ink-mute)", textTransform:"uppercase", marginTop:6}}>
              VIN ····7A4291
            </div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginTop:18, paddingTop:18, borderTop:"1px solid var(--rule)"}}>
              <div>
                <div className="label">Mileage in</div>
                <div className="mono" style={{fontSize:14, marginTop:4}}>84,210</div>
              </div>
              <div>
                <div className="label">Last service</div>
                <div className="mono" style={{fontSize:14, marginTop:4}}>Aug 2025</div>
              </div>
              <div>
                <div className="label">Next due</div>
                <div className="mono" style={{fontSize:14, marginTop:4}}>~89,000 mi</div>
              </div>
              <div>
                <div className="label">Warranty</div>
                <div className="mono" style={{fontSize:14, marginTop:4}}>24mo / 24k</div>
              </div>
            </div>
          </div>

          {/* photos from bay */}
          <div style={{border:"1px solid var(--rule-strong)", padding:24, background:"var(--paper)"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14}}>
              <div className="label">From the bay</div>
              <span className="mono" style={{fontSize:11, color:"var(--ink-mute)", letterSpacing:"0.08em"}}>3 photos</span>
            </div>
            <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:8}}>
              <div className="ph ratio-1x1" data-label="Old pads"/>
              <div className="ph ratio-1x1" data-label="Rotor measured"/>
              <div className="ph ratio-1x1" data-label="New pads in" style={{gridColumn:"1 / 3", aspectRatio:"2/1"}}/>
            </div>
            <a href="#" className="btn-link" style={{marginTop:16, display:"inline-block"}}>View full inspection report →</a>
          </div>

          {/* message thread */}
          <div style={{border:"1px solid var(--rule-strong)", padding:24, background:"var(--paper)"}}>
            <div className="label" style={{marginBottom: 14}}>Messages with the shop</div>

            <div style={{display:"flex", flexDirection:"column", gap:10, marginBottom: 16}}>
              <div style={{
                background:"var(--paper-2)", padding:"10px 14px", borderRadius:8,
                fontSize:14, lineHeight:1.45, alignSelf:"flex-start", maxWidth:"82%"
              }}>
                <div className="mono" style={{fontSize:10, letterSpacing:"0.1em", color:"var(--ink-mute)", marginBottom:4}}>ELENA · 9:44a</div>
                Sent photos of the front pads. Estimate is $385.42 all-in. Reply YES to approve.
              </div>
              <div style={{
                background:"var(--ink)", color:"var(--paper)", padding:"10px 14px", borderRadius:8,
                fontSize:14, lineHeight:1.45, alignSelf:"flex-end", maxWidth:"82%"
              }}>
                <div className="mono" style={{fontSize:10, letterSpacing:"0.1em", color:"#a89e87", marginBottom:4}}>YOU · 10:18a</div>
                Go ahead. Thanks for the photos!
              </div>
              <div style={{
                background:"var(--paper-2)", padding:"10px 14px", borderRadius:8,
                fontSize:14, lineHeight:1.45, alignSelf:"flex-start", maxWidth:"82%"
              }}>
                <div className="mono" style={{fontSize:10, letterSpacing:"0.1em", color:"var(--ink-mute)", marginBottom:4}}>ELENA · 10:20a</div>
                Got it. We'll have it ready around 1:30p. Coffee's on if you want to wait!
              </div>
            </div>

            <div style={{display:"flex", gap:8, padding: 10, border:"1px solid var(--rule-strong)", borderRadius:6}}>
              <input placeholder="Reply to the shop…" style={{
                flex:1, border:"none", background:"transparent", outline:"none",
                fontFamily:"var(--sans)", fontSize:14, color:"var(--ink)"
              }}/>
              <button style={{
                background:"var(--ink)", color:"var(--paper)", border:"none",
                padding:"6px 14px", fontFamily:"var(--sans)", fontWeight:600,
                fontSize:12, cursor:"pointer", borderRadius:3,
              }}>Send</button>
            </div>
          </div>

          {/* pickup */}
          <div style={{
            background:"var(--ink)", color:"var(--paper)",
            padding:24, borderRadius:4
          }}>
            <div className="label" style={{color:"#a89e87", marginBottom:12}}>When ready</div>
            <div style={{fontFamily:"var(--display)", fontSize:24, fontWeight:500, letterSpacing:"-0.02em", marginBottom:10}}>
              We'll text you the moment it's done.
            </div>
            <div style={{fontSize:13.5, color:"#a89e87", lineHeight:1.55, marginBottom:18}}>
              Or stop by anytime — we're at 1180 Olive Drive until 6:00p. Free shuttle if you'd rather we come get you.
            </div>
            <a href="#" className="btn" style={{
              background:"var(--paper)", color:"var(--ink)", justifyContent:"center", width:"100%"
            }}>Request a shuttle ride <Arrow s={14}/></a>
          </div>
        </aside>
      </section>

      {/* footer (mini) */}
      <footer style={{
        background:"var(--ink)", color:"var(--paper)",
        padding:"28px 56px",
        display:"flex", justifyContent:"space-between", alignItems:"center",
        fontFamily:"var(--mono)", fontSize:11, letterSpacing:"0.12em",
        textTransform:"uppercase",
        borderTop:"1px solid #ffffff10",
      }}>
        <span>Center City Auto Repair · Davis, CA · Open until 6:00p</span>
        <span style={{color:"#a89e87"}}>Order #C-24-3091 · Auto-refreshed at 12:04p</span>
      </footer>
    </div>
  );
};

window.TrackingPortal = TrackingPortal;
