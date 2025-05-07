type WebVitalMetric = {
  delta: number;
  id: string;
  name: string;
  navigationType: string;
  rating: string;
  value: number;
  route: string;
  timestamp: Date;
};

let collectedMetrics: WebVitalMetric[] = [];
let flushTimeout: number | null = null;

function flushMetrics() {
  if (!collectedMetrics.length) return;

  const payload = JSON.stringify({
    op: 1,
    d: collectedMetrics,
  });
  collectedMetrics = [];

  const url = "http://localhost:3000/api/v1/ingest";

  try {
    navigator.sendBeacon.bind(navigator)(url, payload);
  } catch (err) {
    fetch(url, {
      method: "POST",
      body: payload,
      keepalive: true,
      headers: { "Content-Type": "application/json" },
    }).catch((err) => {
      console.error("[Trpkit] Failed to post web vitals:", err);
    });
  }
}

function scheduleFlush() {
  if (flushTimeout !== null) return;

  flushTimeout = self.setTimeout(() => {
    flushMetrics();
    flushTimeout = null;
  }, 1000);
}

self.addEventListener("message", (event) => {
  const { type, payload } = event.data;

  if (type === "web-vital") {
    collectedMetrics.push(payload);

    if (collectedMetrics.length >= 20) {
      flushMetrics();
      if (flushTimeout !== null) {
        self.clearTimeout(flushTimeout);
        flushTimeout = null;
      }
    } else {
      scheduleFlush();
    }
  }

  if (type === "flush") {
    flushMetrics();
    if (flushTimeout !== null) {
      self.clearTimeout(flushTimeout);
      flushTimeout = null;
    }
  }
});
