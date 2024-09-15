import { parse, publicKeyRegex } from "@trpkit/crypto";

export const baseUrl = "https://ingress.trpkit.com/v1/event/";

export type Config = {
  publicKey: Uint8Array;
  siteId: string;
};

export function readConfig(): Config | null {
  try {
    const config = document.getElementById("trpkit:analytics");
    if (!config) return null;

    const publicKey = config.dataset.publicKey;
    const siteId = config.dataset.siteId;

    if (!publicKey || !siteId) return null;

    return {
      publicKey: parse(publicKey, publicKeyRegex),
      siteId: siteId,
    };
  } catch (err) {
    console.error("unable to read config");
    return null;
  }
}
