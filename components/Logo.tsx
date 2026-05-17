'use client';
import Image from 'next/image';

const sizes = {
  sm: { w: 52, h: 52 },
  md: { w: 64, h: 64 },
  lg: { w: 88, h: 88 },
};

export default function Logo({ variant = 'light', size = 'md' }: { variant?: 'light' | 'dark'; size?: 'sm' | 'md' | 'lg' }) {
  const { w, h } = sizes[size] ?? sizes.md;
  return (
    <Image
      src="/logo.jpg"
      alt="Center City Automotive logo"
      width={w}
      height={h}
      style={{ display: 'block', borderRadius: '50%', objectFit: 'cover' }}
      priority
    />
  );
}
