/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  output: "standalone",
  transpilePackages: ["@trpkit/common", "@trpkit/storage", "@trpkit/tracker-crypto"],
};
