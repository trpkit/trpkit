import { useEffect, useRef } from "react";

/**
 * A hook to enable smooth scrolling to an element when the URL hash matches the element ID
 *
 * @param {string} id - The ID to match against the URL hash
 * @returns {object} Props to be spread onto the target element, including the ref and a data attribute
 */
export default function useSmoothScrollTo(id: string) {
  const ref = useRef(null);

  useEffect(() => {
    function handler() {
      if (ref.current && location.hash === id) {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    }

    window.addEventListener("hashchange", handler, true);
    return () => window.removeEventListener("hashchange", handler);
  }, [id]);

  return {
    "data-anchor-id": id,
    ref,
  };
}
