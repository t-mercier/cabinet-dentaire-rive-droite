/**
 * What changed & why
 * - Keep Next config minimal. Ignore lint during build to avoid blocking on
 *   framework rule checks; we already run eslint in CI/scripts.
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
