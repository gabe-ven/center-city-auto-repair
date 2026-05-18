/* global React */
/* Shared bits: brand mark, icons, small components */

const Wrench = ({ s = 18 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.3 2.3-2.4-2.4 2.7-2.9z"/>
  </svg>
);

const Phone = ({ s = 16 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L7.9 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2.3z"/>
  </svg>
);

const Pin = ({ s = 16 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const Clock = ({ s = 16 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 6v6l4 2"/>
  </svg>
);

const Arrow = ({ s = 14 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>
);

const Diag = ({ s = 14 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M11 7h6v6"/>
  </svg>
);

const Star = ({ s = 14 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.1 6.1 20.2l1.2-6.6L2.5 9l6.6-.9z"/>
  </svg>
);

const Check = ({ s = 14 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12l5 5L20 6"/>
  </svg>
);

const Brand = ({ size = "md", invert = false }) => (
  <a className="brand" href="#" style={{ color: invert ? "#fff" : "var(--ink)" }}>
    <img src="logo.jpg" alt="Center City Automotive"/>
    <span className="brand-name">
      <strong>Center City</strong>
      <small style={invert ? {color:"#a5a5a5"} : {}}>Automotive · Davis CA · Est. 1987</small>
    </span>
  </a>
);

const Rating = ({ value = "4.9", count = "312", small = false, light = false }) => (
  <div style={{display:"inline-flex", alignItems:"center", gap: small ? 8 : 12}}>
    <div style={{display:"flex", gap:2, color:"var(--red)"}}>
      {[0,1,2,3,4].map(i => <Star key={i} s={small?12:14}/>)}
    </div>
    <span style={{fontSize: small?13:14, color: light ? "#cfcfcf" : "var(--ink-3)", fontWeight:500}}>
      {value} ({count} Google Reviews)
    </span>
  </div>
);

Object.assign(window, { Wrench, Phone, Pin, Clock, Arrow, Diag, Star, Check, Brand, Rating });
