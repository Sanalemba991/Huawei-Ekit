import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Conditional output based on environment
  output: process.env.DOCKER_BUILD ? 'standalone' : undefined,
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // ✅ FIXED: Moved from experimental to root level
  serverExternalPackages: ['mongoose'],
  
  // Performance optimizations for Vercel
  poweredByHeader: false,
  compress: true,
  
  // AGGRESSIVE CSP REMOVAL - Override any CSP headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: ''
          },
          {
            key: 'Content-Security-Policy-Report-Only',
            value: ''
          },
          {
            key: 'X-Content-Security-Policy',
            value: ''
          },
          {
            key: 'X-WebKit-CSP',
            value: ''
          }
        ],
      },
    ]
  },
};

export default nextConfig;
