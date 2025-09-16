import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/(.*)',
        has: [
          {
            type: 'host',
            value: 'scp-azma-chevalier-eloi-seguela.chirurgiens-dentistes.fr',
          },
        ],
        destination: 'https://cabinetdentairerivedroite.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
