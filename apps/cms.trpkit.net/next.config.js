const plugins = [];

/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  output: "standalone",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/keystatic",
        permanent: false,
      },
    ];
  },
};

module.exports = () => plugins.reduce((acc, next) => next(acc), config);
