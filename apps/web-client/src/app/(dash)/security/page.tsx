import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

export default function Page() {
  return (
    <>
      <header className="mb-8 flex h-10 items-center">
        <h2 className="text-2xl font-medium tracking-tighter text-white">Security</h2>
      </header>
      <div className="mb-10 hidden justify-between lg:flex">
        <div className="flex items-center space-x-1">
          <a href="#" className="group relative pb-4 -ml-3">
            <span className="rounded px-3 py-2 group-hover:bg-neutral-900 font-medium text-sm text-gray-300">
              General
            </span>
          </a>
          <a href="#" className="group relative pb-4">
            <span className="rounded px-3 py-2 group-hover:bg-neutral-900 font-medium text-sm text-gray-300 bg-neutral-900">
              Encryption keys
            </span>
          </a>
          <a href="#" className="group relative pb-4">
            <span className="rounded px-3 py-2 group-hover:bg-neutral-900 font-medium text-sm text-gray-300">
              Data & privacy
            </span>
          </a>
        </div>
      </div>
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-xl font-medium text-white">Encryption keys</h2>
          <p className="text-gray-400 text-sm">View and rotate encryption keys</p>
        </div>
        <div>
          <div className="flex items-center">
            <button
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              type="button">
              Rotate key
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-x-4 pb-6">
        <div className="mt-1">
          <div className="flex-shrink-0 cursor-pointer rounded-lg p-0.5 focus:outline-none bg-neutral-800 h-[18px] w-[30px]">
            <div className="pointer-events-none transform cursor-pointer rounded-full bg-neutral-600 h-3.5 w-3.5 translate-x-0" />
          </div>
        </div>
        <div className="mb-2 lg:mb-0 lg:mr-5 lg:flex-shrink-0">
          <h3 className="font-medium text-white">Auto-rotate encryption keys</h3>
          <p className="text-gray-400 text-sm">
            Automatically rotate encryption key after 90 days, with no user intervention required.
            Available to enterprise customers only.
          </p>
        </div>
      </div>
      <table className="w-full table-auto">
        <thead className="border-b border-neutral-800">
          <tr>
            <th className="py-3 text-left text-sm font-normal text-gray-400">Public key</th>
            <th className="py-3 text-sm font-normal text-gray-400 whitespace-nowrap text-right">
              Created
            </th>
            <th className="py-3 text-left text-sm font-normal text-gray-400" />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-gray-300 py-3 text-sm w-full inline-flex items-center">
              <span className="bg-neutral-800 px-2 py-1 rounded cursor-pointer font-mono">
                trpkit.naclbox.pk.m1xlmFAEAm+7qoZVPiXgzKneJD89rVfw0lRfmJl8Eu4=
              </span>
              <span className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs text-gray-300 ring-1 ring-inset ring-neutral-800 ml-2">
                <svg className="h-1.5 w-2 fill-green-400" viewBox="0 0 6 6" aria-hidden="true">
                  <circle cx={3} cy={3} r={3} />
                </svg>
                Active
              </span>
            </td>
            <td className="text-gray-300 py-3 text-sm whitespace-nowrap text-right">
              Sep 20, 2023
            </td>
            <td className="text-gray-300 py-3 !px-4">
              <a href="#">
                <EllipsisHorizontalIcon className="h-4 w-4 fill-gray-300" aria-hidden="true" />
              </a>
            </td>
          </tr>
          <tr>
            <td className="text-gray-300 py-3 text-sm w-full">
              <span className="bg-neutral-800 px-2 py-1 rounded cursor-pointer font-mono">
                trpkit.naclbox.pk.c/knVK38HENup85GIUk6T4Q7IRfXA5zNLiHxA2s484E=
              </span>
            </td>
            <td className="text-gray-300 py-3 text-sm whitespace-nowrap text-right">Jul 8, 2023</td>
            <td className="text-gray-300 py-3 !px-4">
              <a href="#">
                <EllipsisHorizontalIcon className="h-4 w-4 fill-gray-300" aria-hidden="true" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
