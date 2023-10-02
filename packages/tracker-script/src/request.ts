import { baseUrl } from "./config";

export function handleRequest(siteId: string, payload: string) {
  for (const handle of [postFetch, postBeacon]) {
    if (handle(`${baseUrl}${siteId}`, payload)) {
      break;
    }
  }
}

function postFetch(url: string, payload: string): boolean {
  if (!("fetch" in window)) return false;

  fetch(url, {
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

function postBeacon(url: string, payload: string): boolean {
  if (typeof navigator.sendBeacon !== "function") return false;

  navigator.sendBeacon(url, payload);

  return true;
}
