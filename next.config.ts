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
};

export default nextConfig;