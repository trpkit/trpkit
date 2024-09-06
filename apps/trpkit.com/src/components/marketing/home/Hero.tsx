export default function Hero() {
  return (
    <section className="overflow-hidden bg-zinc-200 pb-20">
      <div className="space-y-8 md:!space-y-16 container">
        <div className="space-y-10 lg:space-y-20 pt-24 lg:pt-36">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <h1 className="w-full text-center lg:max-w-2xl lg:text-left">
              <span className="relative inline-flex flex-wrap items-center justify-center gap-3 gap-y-2 overflow-hidden text-zinc-900 lg:inline">
                <span className="text-3xl lg:text-5xl font-semibold">
                  Privacy first and open source{" "}
                  <span className="relative text-blue-600 whitespace-nowrap">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 418 42"
                      className="absolute left-0 top-2/3 h-[0.58em] w-full fill-blue-300/70"
                      preserveAspectRatio="none"
                    >
                      <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
                    </svg>
                    <span className="relative">web insights</span>
                  </span>
                </span>
              </span>
            </h1>
            <div className="text-left mx-auto md:max-w-md lg:mx-0">
              <div className="text-lg lg:text-xl text-zinc-700 font-medium mb-5 lg:mb-9">
                Get web insights while complying with privacy regulations effortlessly. Simple,
                secure and end-to-end encrypted.
              </div>
              <div className="w-full sm:w-auto flex justify-start">
                <div className="flex w-full flex-col gap-y-4 sm:w-auto sm:flex-row sm:items-center sm:space-x-5 md:space-x-8">
                  <a href="/register">
                    <div className="inline-flex w-full sm:w-auto shrink-0 duration-300 items-center justify-center text-center focus:outline-none transition-all font-medium rounded-lg py-2 px-4 bg-zinc-800 text-white hover:bg-zinc-950">
                      Get started
                    </div>
                  </a>
                  <span className="text-sm text-zinc-500">Enjoy our generous free plan</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative w-full h-[540px] rounded-2xl bg-zinc-800" />
        </div>
      </div>
    </section>
  );
}
