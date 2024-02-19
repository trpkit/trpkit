"use client";

import { useState } from "react";

const KEY = "__tt.storage_cookieConsent";

export default function useCookieConsent() {
  /**
   * Something funky going on with client components and Next.js that
   * localstorage is undefined unless we use this check. We should look
   * into this issue at another time.
   */
  if (typeof window === "undefined") return {};

  /* eslint-disable-next-line react-hooks/rules-of-hooks */
  const [value, setValue] = useState<string | null>(localStorage?.getItem(KEY));

  function handleConsent(value: "true" | "false") {
    if (typeof window === "undefined") return;
    setValue(value);
    localStorage.setItem(KEY, value);
    window.dispatchEvent(new Event("storage"));
  }

  return {
    value,
    setValue,
    handleConsent,
  };
}
