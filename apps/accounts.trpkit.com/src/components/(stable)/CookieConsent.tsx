"use client";

import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useCookieConsent from "@/hooks/useCookieConsent";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const { value, handleConsent } = useCookieConsent();

  useEffect(() => {
    if (value === null) setShow(true);
  }, [value]);

  const handleButtonClick = (value: "true" | "false") => {
    handleConsent(value);
    setShow(false);
  };

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:p-6">
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-start">
                <div className="w-0 flex-1">
                  <p className="text-sm text-gray-500">
                    We only collect analytics essential to ensuring smooth operation of our
                    services.
                  </p>
                  <div className="mt-3 flex space-x-7">
                    <button
                      type="button"
                      className="rounded-md bg-white text-sm font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
                      onClick={() => handleButtonClick("true")}>
                      Accept
                    </button>
                    <button
                      type="button"
                      className="rounded-md bg-white text-sm font-medium text-gray-700 hover:text-gray-500 focus:outline-none"
                      onClick={() => handleButtonClick("false")}>
                      Opt out
                    </button>
                  </div>
                </div>
                <div className="ml-4 flex shrink-0">
                  <button
                    type="button"
                    className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setShow(false)}>
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="size-5" aria-hidden={true} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}
