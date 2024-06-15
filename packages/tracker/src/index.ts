import { readConfig } from "./config";
import { type ClientHints, type Session, createEvent, sendEvent } from "./event";

(() => {
  const config = readConfig();
  if (!config) return;

  if (navigator.doNotTrack === "1") {
    const event = createEvent("trpkit:dnt", null);
    sendEvent(event, config);
    return;
  }

  const sid = [...window.crypto.getRandomValues(new Uint8Array(20))]
    .map((m) => `0${m.toString(16)}`.slice(-2))
    .join("");

  let ref = document.referrer;
  if (!ref) {
    try {
      ref = new URLSearchParams(window.location.search).get("utm_source") ?? "";
    } catch {}
  }

  const startEvent = createEvent("trpkit:start", {
    ua: navigator.userAgent,
    ch: undefined,
    ref,
    lang: navigator.language,
    tzo: new Date().getTimezoneOffset(),
    vp: {
      w: window.innerWidth,
      h: window.innerHeight,
    },
    lvd: window.localStorage?.getItem("trpkit:lvd") || undefined,
    sid,
    path: window.location.pathname,
  });

  window.localStorage.setItem("trpkit:lvd", new Date().toISOString().slice(0, 10));

  const endEvent = createEvent("trpkit:end", {
    sid,
    path: window.location.pathname,
  });

  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") sendEvent(endEvent, config);
  });

  if ("userAgentData" in navigator) {
    // @ts-ignore
    navigator.userAgentData
      .getHighEntropyValues([
        "architecture",
        "model",
        "platform",
        "platformVersion",
        "uaFullVersion",
      ])
      .then((d: ClientHints) => {
        (startEvent.d as Session).ch = d;
        sendEvent(startEvent, config);
      });
  } else {
    sendEvent(startEvent, config);
  }

  let oldPath = window.location.pathname;
  window.addEventListener("popstate", () => {
    const newPath = window.location.pathname;
    const event = createEvent("trpkit:page", {
      sid,
      path: newPath,
      from: oldPath,
    });
    oldPath = newPath;
    sendEvent(event, config);
  });
})();
