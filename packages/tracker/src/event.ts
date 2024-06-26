import { encrypt } from "@trpkit/crypto";
import type { Config } from "./config";
import { handleRequest } from "./request";

export type BasePayload = {
  sid: string;
  path: string;
};

export type ClientHints = {
  architecture: string;
  brands: string[];
  mobile: boolean;
  model: string;
  platform: string;
  platformVersion: string;
  uaFullVersion: string;
};

export type Session = BasePayload & {
  ua: string;
  ch?: ClientHints;
  ref: string;
  lang: string;
  tzo: number;
  vp: {
    w: number;
    h: number;
  };
  lvd?: string;
};

export type PageVisit = BasePayload & {
  from: string;
};

export type Event = {
  t: "trpkit:start" | "trpkit:end" | "trpkit:page" | "trpkit:dnt";
  d: BasePayload | Session | PageVisit | null;
  time: number;
};

export function createEvent(t: Event["t"], d: Event["d"]): Event {
  return {
    t,
    d,
    time: Date.now(),
  };
}

export function sendEvent(event: Event, config: Config) {
  if (/^(localhost|127\.0\.0\.1|\[::1?])$/.test(window.location.hostname)) return;

  const payload = encrypt(JSON.stringify(event), config.publicKey);
  handleRequest(config.siteId, payload);
}
