import { baseUrl } from "./config";

export function handleRequest(siteId: string, payload: string) {
  for (const handle of [postFetch, postBeacon]) {
    if (handle(siteId, payload)) {
      break;
    }
  }
}

function postFetch(siteId: string, payload: string): boolean {
  if (!("fetch" in window)) return false;

  fetch(`${baseUrl}${siteId}`, {
    method: "post",
    body: payload,
    credentials: "omit",
    cache: "no-store",
    mode: "no-cors",
    headers: {
      "content-type": "text/plain",
    },
  });
  return true;
}

function postBeacon(siteId: string, payload: string): boolean {
  if (typeof navigator.sendBeacon !== "function") return false;

  navigator.sendBeacon(`${baseUrl}${siteId}`, payload);
  return true;
}
