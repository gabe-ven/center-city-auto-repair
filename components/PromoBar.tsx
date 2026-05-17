'use client';
import { Phone } from 'lucide-react';

export default function PromoBar() {
  return (
    <div style={{ background: '#29B9E7', padding: '9px 24px', textAlign: 'center' }}>
      <p style={{ margin: 0, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: '0.08em', color: '#ffffff', display: 'inline-flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        Get Your Vehicle Serviced Today — Family-Owned &amp; Trusted Since 1987
        <span style={{ opacity: 0.5 }}>·</span>
        <a href="tel:5307580204" style={{ color: '#ffffff', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 5, fontWeight: 700 }}>
          <Phone size={13} />(530) 758-0204
        </a>
      </p>
    </div>
  );
}
