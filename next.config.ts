import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // Allow GHL scripts and iframes
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.gohighlevel.com https://*.msgsndr.com https://widgets.leadconnectorhq.com https://brand.webl4b.com",
      "frame-src 'self' https://*.gohighlevel.com https://*.msgsndr.com https://widgets.leadconnectorhq.com https://link.msgsndr.com https://brand.webl4b.com",
      "connect-src 'self' https://*.gohighlevel.com https://*.msgsndr.com https://brand.webl4b.com https://services.leadconnectorhq.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "media-src 'none'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self' https://*.gohighlevel.com https://*.msgsndr.com https://brand.webl4b.com",
      "frame-ancestors 'none'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
  },
  // Compress output
  compress: true,
};

export default nextConfig;
