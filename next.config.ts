import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
      output: 'export',
      images: {
        unoptimized: true,
      },
      headers: async () => {
        return [
          {
            source: '/leah-martin-contact.vcf',
            headers: [
              {
                key: 'Content-Type',
                value: 'text/vcard; charset=utf-8',
              },
              {
                key: 'Content-Disposition',
                value: 'attachment; filename="leah-martin-contact.vcf"',
              },
            ],
          },
        ];
      },
};

export default nextConfig;