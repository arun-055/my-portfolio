import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow loading GLB from external sources
  async headers() {
    return [
      {
        source: '/public/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
  // Increase body size limit for large files
  experimental: {
    largePageDataBytes: 512 * 1024,
  },
};

export default nextConfig;
