import Image from "next/image";

export default function Features() {
  return (
    <section>
      <div className="mx-auto w-full max-w-screen-2xl px-5 py-24 sm:py-32">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
          <div>
            <div className="border-b border-slate-800 pb-10">
              <h2 className="font-medium text-gray-300">Privacy for everyone</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Why choose Trpkit?
              </p>
            </div>
            <dl className="mt-10 space-y-10">
              <div>
                <dt className="text-sm font-medium text-white">Most insightful metrics</dt>
                <dd className="mt-3 text-sm text-gray-300">
                  We are tracking the most important metrics to help you understand your audience.
                  No need to worry about quota overage, we&apos;ll continue to track for the
                  occasional spikes.
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-white">
                  Share metrics with others, securely
                </dt>
                <dd className="mt-3 text-sm text-gray-300">
                  You can give people read-only or full access to your metrics. And when sharing,
                  you&apos;re still in control.
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-white">Be in control of your data</dt>
                <dd className="mt-3 text-sm text-gray-300">
                  Whether it&apos;s giving people limited or full access to metrics you share with
                  them or preventing new team members from reading old metric data, your data is in
                  your hands.
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-white">
                  Work seamlessly across all devices
                </dt>
                <dd className="mt-3 text-sm text-gray-300">
                  Access your metrics wherever you are from your Windows, Mac or Linux computer, as
                  well as from iOS or Android smartphones and tablets.
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-white">Making security simple</dt>
                <dd className="mt-3 text-sm text-gray-300">
                  Trpkit protects your metrics in the cloud with zero-knowledge end-to-end
                  encryption.
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
              <Image
                src="/features/analytics-script.png"
                alt="App screenshot"
                width={1280}
                height={804}
                className="size-full object-cover object-center"
              />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:mt-6 sm:gap-6 lg:mt-8 lg:gap-8">
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                <Image
                  src="/features/views-chart.svg"
                  alt="App screenshot"
                  width={540}
                  height={540}
                  className="size-full object-cover object-center"
                />
              </div>
              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
                <Image
                  src="/features/browsers-chart.svg"
                  alt="App screenshot"
                  width={540}
                  height={540}
                  className="size-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
