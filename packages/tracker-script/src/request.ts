import { baseUrl } from "./config";

export function handleRequest(siteId: string, payload: string) {
  if (!("fetch" in window)) {
    if (typeof navigator.sendBeacon === "function") {
      navigator.sendBeacon(`${baseUrl}${siteId}`, payload);
    } else {
      const img = new Image();
      img.src = `${baseUrl}${siteId}?p=${payload}`;
    }
  } else {
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
  }
}
