"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import GitHubStars from "@/components/(marketing)/GitHubStars";
import { cn } from "@/lib/cn";

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
          sticky ? "bg-zinc-900 border-b border-zinc-800 z-50" : "bg-transparent",
          "w-full fixed"
        )}>
        <nav className="flex items-center justify-between container py-6">
          <div className="flex items-center gap-x-12">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Trpkit</span>
              <img src="/branding/logo.svg" alt="Trpkit Logo" className="h-8 w-auto" />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-300"
              onClick={() => setMobileMenuOpen(true)}>
              <span className="sr-only">Open menu</span>
              <Bars3Icon className="size-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-6">
            <GitHubStars />
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
            <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white p-6 sm:max-w-sm">
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
                  <XMarkIcon className="size-6" aria-hidden="true" />
                </button>
              </div>
            </Dialog.Panel>
          </Dialog>
        </nav>
      </header>
      <div className="h-20" />
    </>
  );
}
