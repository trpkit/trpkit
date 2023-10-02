import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function Page() {
  return (
    <>
      <header className="mb-8 flex h-10 items-center">
        <h2 className="text-2xl font-medium tracking-tighter text-white">Dashboard</h2>
      </header>
      <div className="pb-12">
        <div className="-ml-4 mb-4 space-y-1 sm:flex sm:items-center sm:space-y-0">
          <button
            className="flex cursor-pointer items-center rounded py-2 px-4 text-sm text-white hover:bg-neutral-900 focus:outline-none"
            type="button">
            <span className="inline-block whitespace-nowrap text-sm font-normal">acme.com</span>
            <ChevronDownIcon className="h-4 w-4 ml-1" aria-hidden="true" />
          </button>
          <button
            className="flex cursor-pointer items-center rounded py-2 px-4 text-sm text-white hover:bg-neutral-900 focus:outline-none"
            type="button">
            <span className="inline-block whitespace-nowrap text-sm font-normal">
              Sep 20 <span className="text-neutral-500">&mdash;</span> Sep 27
            </span>
            <ChevronDownIcon className="h-4 w-4 ml-1" aria-hidden="true" />
          </button>
          <div className="ml-auto hidden items-center md:flex">
            <div className="ml-auto flex items-center">
              <span className="mr-3 h-2.5 w-2.5 flex-shrink-0 rounded-full border-2 border-blue-600" />
              <span className="whitespace-nowrap text-sm text-gray-300">Current week</span>
            </div>
            <div className="ml-4 flex items-center">
              <span className="mr-3 h-2.5 w-2.5 flex-shrink-0 rounded-full border-2 border-neutral-500" />
              <span className="whitespace-nowrap text-sm text-gray-300">Last week</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
