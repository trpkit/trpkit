"use client";

import { Combobox } from "@headlessui/react";
import {
  ChartBarIcon,
  CheckIcon,
  ChevronUpDownIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@lib/cn";
import { useState } from "react";

const sites = [{ name: "acme.com" }, { name: "app.acme.com" }, { name: "demo.acme.com" }];

export default function LayoutSidebar() {
  const [query, setQuery] = useState("");
  const [selectedSite, setSelectedSite] = useState(sites[0]);

  const filteredSites =
    query === ""
      ? sites
      : sites.filter((site) => {
          return site.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col bg-neutral-950">
      <div className="flex flex-col gap-y-5 overflow-y-auto p-6 h-full text-neutral-300">
        <div className="flex items-center justify-center mb-6">
          <img src="https://trpkit.com/branding/logo.svg" alt="Logo" className="w-32" />
        </div>
        <div>
          <Combobox as="div" value={selectedSite} onChange={setSelectedSite}>
            <div className="relative">
              <Combobox.Input
                className="w-full rounded-md border-0 bg-neutral-800 py-1.5 pl-3 pr-10 text-neutral-100 shadow-sm ring-1 ring-inset ring-neutral-600 focus:ring-2 focus:ring-inset focus:ring-neutral-500 sm:text-sm sm:leading-6"
                onChange={(event) => setQuery(event.target.value)}
                // @ts-ignore
                displayValue={(site) => site?.name}
              />
              <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                <ChevronUpDownIcon className="h-5 w-5 text-neutral-400" aria-hidden="true" />
              </Combobox.Button>
              {filteredSites.length > 0 && (
                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-800 py-1 text-neutral-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredSites.map((site, index) => (
                    <Combobox.Option
                      key={index}
                      value={site}
                      className={({ active }) =>
                        cn(
                          "relative cursor-default select-none py-2 pl-3 pr-9",
                          active ? "bg-neutral-700 text-neutral-100" : "text-neutral-300"
                        )
                      }>
                      {({ active, selected }) => (
                        <>
                          <span className={cn("block truncate", selected && "font-semibold")}>
                            {site.name}
                          </span>
                          {selected && (
                            <span
                              className={cn(
                                "absolute inset-y-0 right-0 flex items-center pr-4",
                                active ? "text-neutral-100" : "text-neutral-500"
                              )}>
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          )}
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </div>
          </Combobox>
        </div>
        <nav className="flex-grow">
          <ul>
            <li className="mb-2 text-sm">
              <a
                href="#"
                className="flex items-center gap-2 text-neutral-300 py-2 px-4 rounded transition duration-200 hover:bg-neutral-800">
                <ChartBarIcon aria-hidden="true" className="w-5 h-5 text-neutral-500" />
                Overview
              </a>
            </li>
            <li className="mb-2 text-sm">
              <a
                href="#"
                className="flex items-center gap-2 text-neutral-300 py-2 px-4 rounded transition duration-200 hover:bg-neutral-800">
                <Cog6ToothIcon aria-hidden="true" className="w-5 h-5 text-neutral-500" />
                Settings
              </a>
            </li>
            <li className="mb-2 text-sm">
              <a
                href="#"
                className="flex items-center gap-2 text-neutral-300 py-2 px-4 rounded transition duration-200 hover:bg-neutral-800">
                <ShieldCheckIcon aria-hidden="true" className="w-5 h-5 text-neutral-500" />
                Security
              </a>
            </li>
            <li className="my-2 border-b border-neutral-800"></li>
            <li className="mt-2 text-sm">
              <a
                href="#"
                className="flex items-center gap-2 text-neutral-300 py-2 px-4 rounded transition duration-200 hover:bg-neutral-800">
                <LifebuoyIcon aria-hidden="true" className="w-5 h-5 text-neutral-500" />
                Support
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
