"use client";

import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
import { useCallback, useEffect, useState } from "react";

// TODO add props for the site id and public key
// TODO will be moving this component to a separate repository once its ready to go live
// TODO will be moving the web worker to our cdn and updated via GitHub actions (similar to how we'll do web analytics)
// TODO provide docs on how to do this via web-vitals package (for those not using Next.js)
export default function TrpkitWebVitals() {
  const pathname = usePathname();
  const [worker, setWorker] = useState<Worker>(null);

  useEffect(() => {
    const w = new Worker(
      new URL("@/components/external/trpkit-web-vitals-worker.ts", import.meta.url),
      { type: "module" }
    );
    setWorker(w);

    return () => {
      w.terminate();
    };
  }, []);

  const reportVitals = useCallback(
    // biome-ignore lint/suspicious/noExplicitAny: Next.js doesn't export the type anymore
    (metric: any) => {
      if (worker) {
        const { delta, id, name, navigationType, rating, value } = metric;
        worker.postMessage({
          type: "web-vital",
          payload: {
            delta,
            id,
            name,
            navigationType,
            rating,
            value,
            route: pathname,
            timestamp: Date.now(),
          },
        });
      }
    },
    [worker, pathname]
  );

  useReportWebVitals(reportVitals);

  useEffect(() => {
    function handleUnload() {
      if (worker) worker.postMessage({ type: "flush" });
    }

    window.addEventListener("unload", handleUnload);
    return () => window.removeEventListener("unload", handleUnload);
  }, [worker]);

  return null;
}
