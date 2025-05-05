import type { NextConfig } from "next";

const plugins = [];

const isProdEnv = process.env.NODE_ENV === "production";

const contentSecurityPolicy = {
  "default-src": [
    "'self'",
    "'unsafe-inline'", // NextJS requires 'unsafe-inline'
    !isProdEnv ? "'unsafe-eval'" : "",
  ],
  "worker-src": ["'self'", "blob:"],
  "connect-src": [
    "'self'",
    !isProdEnv ? "ws://localhost:3000/" : "",
    !isProdEnv ? "http://localhost:3000/" : "",
  ],
  "frame-ancestors": ["'self'"],
  "form-action": ["'self'"],
  "img-src": ["'self'", "blob:", "data:", "https://cdn.trpkit.com"],
};

const cspObjectToString = Object.entries(contentSecurityPolicy).reduce((acc, [key, value]) => {
  return `${acc}${key} ${value.join(" ")};`;
}, "");

const config: NextConfig = {
  compiler: {
    reactRemoveProperties: true,
    removeConsole: isProdEnv,
  },
  compress: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.trpkit.com",
      },
    ],
  },
  output: "standalone",
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  reactStrictMode: !isProdEnv,
  async headers() {
    return [
      {
        source: "/:path*",
        basePath: false,
        headers: [
          {
            key: "cache-control",
            value: "no-cache",
          },
          {
            key: "content-security-policy",
            value: cspObjectToString,
          },
          {
            key: "cross-origin-opener-policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "referrer-policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "strict-transport-security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "x-content-type-options",
            value: "nosniff",
          },
          {
            key: "x-frame-options",
            value: "SAMEORIGIN",
          },
          {
            key: "x-xss-protection",
            value: "1; mode=block",
          },
        ],
      },
    ];
  },
};

module.exports = () => plugins.reduce((acc, next) => next(acc), config);
