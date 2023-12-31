"use client";

import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { cn } from "@lib/cn";
import Link from "next/link";
import { useEffect, useState } from "react";

// TODO: Future navigation pages
const navigation = [
  // { name: "Product", href: "" },
  // { name: "Pricing", href: "" },
  { name: "Blog", href: "/blog" },
  // { name: "Resources", href: "" },
];

// TODO: Future resource pages (dropdown menu)
const resources = [
  // { name: 'About us', href: '' },
  // { name: 'Open source', href: '' },
  // { name: 'Whitepaper', href: '' },
  // { name: 'Transparency', href: '' },
  // { name: 'Changelog', href: '' },
  // { name: 'Roadmap', href: '' },
  // { name: 'Help', href: '' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  function scrollEvent() {
    setSticky(window.scrollY > 10);
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
    return () => window.removeEventListener("scroll", scrollEvent);
  }, []);

  return (
    <>
      <header
        className={cn(
          sticky ? "bg-slate-900 border-b border-slate-800 z-50" : "bg-transparent",
          "w-full fixed"
        )}>
        <nav className="mx-auto flex max-w-screen-2xl items-center justify-between py-6 px-5">
          <div className="flex items-center gap-x-12">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Trpkit</span>
              <img src="/branding/logo.svg" alt="Trpkit Logo" className="h-8 w-auto" />
            </Link>
            <div className="hidden lg:flex lg:gap-x-12">
              {navigation.map((item, index) => (
                <Link
                  href={item.href}
                  key={index}
                  className="text-sm font-semibold leading-6 text-gray-300 hover:text-white">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2 5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
              onClick={() => setMobileMenuOpen(true)}>
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex">
            <a
              href="#waitlist"
              className="text-sm font-semibold leading-6 text-gray-300 hover:text-white">
              Join waitlist <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <Dialog
            as="div"
            className="lg:hidden"
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}>
            <div className="fixed inset-0 z-10" />
            <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5">
                  <span className="sr-only">Trpkit</span>
                  <img src="/branding/logo.svg" alt="Trpkit Logo" className="h-8 w-auto" />
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}>
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-500/10">
                  <div className="space-y-2 py-6">
                    {navigation.map((item, index) => (
                      <Link
                        href={item.href}
                        key={index}
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900">
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Dialog>
        </nav>
      </header>
      <div className="h-20" />
    </>
  );
}
