import { readFileSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { gzipSync } from "node:zlib";

const filePath = resolve(__dirname, "../dist/analytics.js");

// File size
const fileStats = statSync(filePath);
const nonGzippedSize = fileStats.size;

// Gzip file size
const fileContent = readFileSync(filePath);
const gzippedContent = gzipSync(fileContent);
const gzippedSize = gzippedContent.length;

console.log(`Non-gzipped size: ${(nonGzippedSize / 1024).toFixed(2)} KB`);
console.log(`Gzipped size: ${(gzippedSize / 1024).toFixed(2)} KB`);
