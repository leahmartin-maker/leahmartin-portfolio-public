import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'rsohhfwmpzqqvacinfno.supabase.co',
        pathname: '/storage/v1/object/public/murals/**',
      },
    ],
    // unoptimized: false, // remove or set to false
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src 'self' https: data:; media-src 'self' https:; script-src 'self' 'unsafe-eval' 'unsafe-inline' blob:; style-src 'self' 'unsafe-inline' https:; font-src 'self' https: data:; connect-src 'self' https: wss:; worker-src 'self' blob:; frame-src 'self' https:;",
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};

export default nextConfig;