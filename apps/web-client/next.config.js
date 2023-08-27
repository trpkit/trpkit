/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  output: "standalone",
  transpilePackages: ["@trpkit/config", "@trpkit/kms"],
};
