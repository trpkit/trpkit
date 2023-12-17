import {
  ChartBarIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  Cog6ToothIcon,
  HomeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="hidden w-64 flex-shrink-0 py-6 lg:flex">
      <div className="flex h-full w-full flex-col">
        <div className="mb-8 flex h-10 items-center justify-between pl-5 pr-3.5">
          <Link href="/">
            <img
              className="h-10 w-auto"
              src={`${process.env.NEXT_PUBLIC_MARKETING_URL}/branding/icon.svg`}
              alt="Trpkit Icon"
            />
          </Link>
        </div>
        <div className="px-6 space-y-1">
          <a
            href="#"
            className="group m-0 flex min-h-[40px] w-full cursor-pointer items-center rounded px-3 text-sm text-gray-300 hover:bg-neutral-900 hover:text-white focus:outline-none">
            <div className="mr-3 h-5 w-5">
              <HomeIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>Home</div>
          </a>
          <a
            href="#"
            className="group m-0 flex min-h-[40px] w-full cursor-pointer items-center rounded px-3 text-sm text-gray-300 hover:bg-neutral-900 hover:text-white focus:outline-none">
            <div className="mr-3 h-5 w-5">
              <ChartBarIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>Analytics</div>
            <div className="ml-auto h-4 w-4 flex-shrink-0">
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </div>
          </a>
          <a
            href="#"
            className="group m-0 flex min-h-[40px] w-full cursor-pointer items-center rounded px-3 text-sm text-gray-300 hover:bg-neutral-900 hover:text-white focus:outline-none">
            <div className="mr-3 h-5 w-5">
              <LockClosedIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>Security</div>
            <div className="ml-auto h-4 w-4 flex-shrink-0">
              <ChevronDownIcon className="h-4 w-4" aria-hidden="true" />
            </div>
          </a>
          <div className="space-y-1">
            <a
              href="#"
              className="relative m-0 flex min-h-[40px] w-full cursor-pointer items-center rounded pl-12 pr-4 hover:bg-neutral-900 focus:outline-none text-gray-400 text-sm">
              General
            </a>
            <a
              href="#"
              className="relative m-0 flex min-h-[40px] w-full cursor-pointer items-center rounded pl-12 pr-4 hover:bg-neutral-900 focus:outline-none text-gray-400 text-sm bg-neutral-900">
              Encryption keys
            </a>
            <a
              href="#"
              className="relative m-0 flex min-h-[40px] w-full cursor-pointer items-center rounded pl-12 pr-4 hover:bg-neutral-900 focus:outline-none text-gray-400 text-sm">
              Data & privacy
            </a>
          </div>
          <a
            href="#"
            className="group m-0 flex min-h-[40px] w-full cursor-pointer items-center rounded px-3 text-sm text-gray-300 hover:bg-neutral-900 hover:text-white focus:outline-none">
            <div className="mr-3 h-5 w-5">
              <Cog6ToothIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>Settings</div>
            <div className="ml-auto h-4 w-4 flex-shrink-0">
              <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
            </div>
          </a>
        </div>
        <div className="mt-auto px-6"></div>
      </div>
    </div>
  );
}
