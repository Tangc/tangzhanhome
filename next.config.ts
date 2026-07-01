import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async headers() {
    return [
      {
        source: '/published/posts/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },
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
