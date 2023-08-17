import { boxPublicKeyRegex, parse } from "@trpkit/tracker-crypto";

export const baseUrl = "https://api.trpkit.com/v1/analytics/";

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

    return {
      publicKey: parse(publicKey!, boxPublicKeyRegex),
      siteId: siteId!,
    };
  } catch (err) {
    console.error("unable to read config");
    return null;
  }
}
