const plugins = [];

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  output: "standalone",
  transpilePackages: [
    "@trpkit/common",
    "@trpkit/config",
    "@trpkit/kms",
    "@trpkit/storage",
    "@trpkit/tracker-crypto",
  ],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "x-dns-prefetch-control",
            value: "on",
          },
          {
            key: "strict-transport-security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "x-frame-options",
            value: "SAMEORIGIN",
          },
          {
            key: "x-content-type-options",
            value: "nosniff",
          },
          {
            key: "referrer-policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "permissions-policy",
            value:
              "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()",
          },
        ],
      },
    ];
  },
};

module.exports = () => plugins.reduce((acc, next) => next(acc), config);
