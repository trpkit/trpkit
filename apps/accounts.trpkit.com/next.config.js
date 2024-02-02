const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.BUNDLE_ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ["trpkit.com"],
  },
};

module.exports = () => {
  const plugins = [withBundleAnalyzer];
  return plugins.reduce((acc, next) => next(acc), nextConfig);
};
