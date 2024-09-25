import { parse } from "./crypto";

export const baseUrl = "https://ingress.trpkit.com/v1/event/";

export type Config = {
  publicKey: Uint8Array;
  pqPublicKey: Uint8Array;
  siteId: string;
};

export function readConfig(): Config | null {
  try {
    const config = document.getElementById("trpkit:analytics");
    if (!config) return null;

    const publicKey = config.dataset.publicKey;
    const pqPublicKey = config.dataset.pqPublicKey;
    const siteId = config.dataset.siteId;

    if (!publicKey || !pqPublicKey || !siteId) return null;

    return {
      publicKey: parse(publicKey),
      pqPublicKey: parse(pqPublicKey),
      siteId: siteId,
    };
  } catch (err) {
    console.error("unable to read config");
    return null;
  }
}
