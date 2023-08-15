const { withContentlayer } = require("next-contentlayer");

const plugins = [];
plugins.push(withContentlayer);

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  output: "standalone",
};

module.exports = () => plugins.reduce((acc, next) => next(acc), config);
