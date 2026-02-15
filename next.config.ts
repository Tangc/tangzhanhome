import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/2026dash',
        destination: '/2026dash.html',
      },
    ];
  },
};

export default nextConfig;
