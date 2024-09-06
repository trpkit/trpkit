import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative pt-20">
      <div className="container">
        <div>
          <Link href="/" className="inline-flex">
            <Image src="/branding/icon.svg" alt="Trpkit" width={64} height={64} />
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-12 gap-y-12 sm:mt-12 md:gap-x-8">
          <div className="col-span-12 md:col-span-4">
            <ul className="flex items-center space-x-3">
              <li>
                <a href="https://x.com/trpkit" target="_blank" rel="noopener noreferrer">
                  <span className="sr-only">X</span>
                  <svg
                    height="16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    viewBox="0 0 16 16"
                    width="16"
                    className="inline-block size-6"
                    aria-hidden={true}
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.5 0.5H5.75L9.48421 5.71053L14 0.5H16L10.3895 6.97368L16.5 15.5H11.25L7.51579 10.2895L3 15.5H1L6.61053 9.02632L0.5 0.5ZM12.0204 14L3.42043 2H4.97957L13.5796 14H12.0204Z"
                      fill="#27272a"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/trpkit/trpkit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline-block size-6"
                    aria-hidden={true}
                  >
                    <path
                      d="M0 12.305c0 5.435 3.438 10.047 8.207 11.674.6.113.82-.267.82-.593 0-.292-.011-1.066-.017-2.093-3.339.744-4.043-1.65-4.043-1.65-.545-1.42-1.332-1.798-1.332-1.798-1.09-.764.083-.749.083-.749 1.203.087 1.837 1.268 1.837 1.268 1.071 1.88 2.809 1.338 3.493 1.022.109-.795.42-1.337.762-1.645-2.665-.31-5.466-1.365-5.466-6.08 0-1.343.467-2.442 1.235-3.302-.123-.311-.535-1.562.117-3.256 0 0 1.008-.33 3.3 1.261.958-.273 1.984-.409 3.005-.414 1.019.005 2.046.141 3.004.414 2.29-1.592 3.297-1.261 3.297-1.261.654 1.694.242 2.945.119 3.256.77.86 1.234 1.959 1.234 3.302 0 4.726-2.806 5.767-5.48 6.071.431.38.815 1.13.815 2.279 0 1.645-.015 2.971-.015 3.375 0 .329.216.712.825.591 4.765-1.63 8.2-6.239 8.2-11.672C24 5.508 18.627 0 12 0S0 5.508 0 12.305z"
                      fill="#27272a"
                      fillRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-6 text-sm md:col-span-3 lg:col-span-2">
            <span className="font-semibold text-zinc-800">Product</span>
          </div>
          <div className="col-span-6 text-sm md:col-span-3 lg:col-span-2">
            <span className="font-semibold text-zinc-800">Resources</span>
          </div>
          <div className="col-span-6 text-sm md:col-span-3 lg:col-span-2">
            <span className="font-semibold text-zinc-800">Help & Support</span>
          </div>
          <div className="col-span-6 text-sm md:col-span-3 lg:col-span-2">
            <span className="font-semibold text-zinc-800">Legal</span>
            <div className="mt-5">
              <ul className="space-y-3">
                <li>
                  <Link href="/legal/terms" className="text-zinc-700 hover:text-zinc-800">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/legal/privacy" className="text-zinc-700 hover:text-zinc-800">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-zinc-200 pb-16 pt-6">
          <div className="text-xs text-zinc-600">&copy; 2024 Trpkit LLC</div>
        </div>
      </div>
    </footer>
  );
}
