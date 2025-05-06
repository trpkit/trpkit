import { randomBytes } from "node:crypto";

export function generateSessionId() {
  return randomBytes(24).toString("hex");
}
