import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source:      '/admin',
        destination: 'https://auto-repair-dashboard.vercel.app/login',
        permanent:   false,
      },
    ];
  },
};

export default nextConfig;
