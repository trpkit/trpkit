import { resolve } from "node:path";
import { type BuildOptions, build } from "esbuild";

const options: BuildOptions = {
  entryPoints: [resolve(__dirname, "../src/index.js")],
  outfile: resolve(__dirname, "../dist/analytics.js"),
  bundle: true,
  minify: true,
  sourcemap: true,
  format: "iife",
  target: ["chrome58", "firefox57", "safari11", "edge18"],
};

build(options).catch(() => process.exit(1));
