import { ChartBarIcon, ChevronDownIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
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
            className="group m-0 flex min-h-[40px] w-full cursor-pointer items-center rounded px-3 text-sm text-white hover:bg-neutral-900 focus:outline-none bg-neutral-900">
            <div className="mr-3 h-5 w-5">
              <ChartBarIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>Dashboard</div>
          </a>
          <a
            href="#"
            className="group m-0 flex min-h-[40px] w-full cursor-pointer items-center rounded px-3 text-sm text-gray-300 hover:bg-neutral-900 hover:text-white focus:outline-none">
            <div className="mr-3 h-5 w-5">
              <Cog6ToothIcon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>Settings</div>
            <div className="ml-auto h-5 w-5 flex-shrink-0 text-gray-400">
              <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
            </div>
          </a>
        </div>
        <div className="mt-auto px-6"></div>
      </div>
    </div>
  );
}
