const { config } = require("@swc/core/spack");

module.exports = config({
  mode: "production",
  entry: {
    web: __dirname + "/src/index.ts",
  },
  output: {
    path: __dirname + "/dist",
    name: "analytics.js",
  },
  externalModules: ["tweetnacl"],
  options: {
    minify: true,
    jsc: {
      minify: {
        compress: true,
        mangle: true,
      },
    },
    sourceMaps: false,
    env: {
      targets: {
        chrome: "58",
        firefox: "57",
        safari: "11",
        edge: "16",
      },
    },
  },
  module: {},
});
