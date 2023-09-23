/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  output: "standalone",
  transpilePackages: ["@trpkit/storage", "@trpkit/tracker-crypto"],
};
