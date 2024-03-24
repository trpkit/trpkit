import { useEffect, useRef } from "react";

export default function useSmoothScrollTo(id: string) {
  const ref = useRef(null);

  useEffect(() => {
    function handler() {
      if (ref.current && location.hash === id) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }

    window.addEventListener("hashchange", handler, true);
    // Cleanup to avoid memory leaks
    return () => window.removeEventListener("hashchange", handler);
  });

  // Props to be passed to the element
  return {
    "data-anchor-id": id,
    ref,
  };
}
