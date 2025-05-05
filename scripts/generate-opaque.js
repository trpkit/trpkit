const { execSync } = require("node:child_process");

const createOpaqueServerKey = execSync("pnpm dlx @serenity-kit/opaque create-server-setup", {
  encoding: "utf-8",
}).trim();
const opaqueServerKey = createOpaqueServerKey
  .split("\n")
  .filter((l) => l.trim())
  .pop();

if (!opaqueServerKey) {
  console.error("Failed to generate opaque server key");
  process.exit(1);
}

const createOpaquePublicKey = execSync(
  `pnpm dlx @serenity-kit/opaque get-server-public-key ${opaqueServerKey}`,
  { encoding: "utf-8" }
).trim();
const opaquePublicKey = createOpaquePublicKey
  .split("\n")
  .filter((l) => l.trim())
  .pop();

if (!opaquePublicKey) {
  console.error("Failed to generate opaque public key");
  process.exit(1);
}

console.log(
  `OPAQUE_SERVER_KEY=${opaqueServerKey}\nNEXT_PUBLIC_OPAQUE_PUBLIC_KEY=${opaquePublicKey}`
);
