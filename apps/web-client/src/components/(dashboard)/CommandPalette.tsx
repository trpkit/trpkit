"use client";

import { Combobox, Dialog, Transition } from "@headlessui/react";
import { GlobeAltIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { cn } from "@lib/cn";
import { Fragment, useEffect, useState } from "react";

// TODO: This should be fetched from the API
const sites = [
  { name: "acme.com", url: "#" },
  { name: "app.acme.com", url: "#" },
  { name: "demo.acme.com", url: "#" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredSites =
    query === "" ? sites : sites.filter((site) => site.name.toLowerCase().includes(query));

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    }

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery("")} appear>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              {/* @ts-ignore */}
              <Combobox onChange={(item) => (window.location = item.url)}>
                <div className="relative">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>
                {filteredSites.length > 0 && (
                  <Combobox.Options
                    static
                    className="max-h-80 scroll-py-10 scroll-pb-2 space-y-4 overflow-y-auto py-2 px-4">
                    {filteredSites.length > 0 && (
                      <li>
                        <ul className="-mx-4 text-sm text-gray-700">
                          {filteredSites.map((project, index) => (
                            <Combobox.Option
                              key={index}
                              value={project}
                              className={({ active }) =>
                                cn(
                                  "flex cursor-default select-none items-center px-4 py-2",
                                  active && "bg-blue-600 text-white"
                                )
                              }>
                              {({ active }) => (
                                <>
                                  <GlobeAltIcon
                                    className={cn(
                                      "h-6 w-6 flex-none",
                                      active ? "text-white" : "text-gray-400"
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3 flex-auto truncate">{project.name}</span>
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li>
                    )}
                  </Combobox.Options>
                )}
                <div className="flex flex-wrap items-center bg-gray-50 px-4 py-2.5 text-xs text-gray-700">
                  Type{" "}
                  <kbd
                    className={cn(
                      "mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2",
                      query === "?"
                        ? "border-blue-600 text-blue-600"
                        : "border-gray-400 text-gray-900"
                    )}>
                    ?
                  </kbd>{" "}
                  for support
                </div>
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
