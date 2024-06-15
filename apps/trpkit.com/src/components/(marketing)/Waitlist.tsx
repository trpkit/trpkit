"use client";

import useSmoothScrollTo from "@/hooks/useSmoothScrollTo";
import { base64url, utf8 } from "@scure/base";
import type React from "react";
import { useState } from "react";

export default function Waitlist() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const bind = useSmoothScrollTo("#waitlist");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_WEBCLIENT_URL}/api/v1/launch?email=${base64url.encode(
        utf8.decode(email)
      )}`,
      {
        method: "post",
        body: JSON.stringify({}),
      }
    );

    if (res.ok) {
      setSubmitted(true);
    }
  };

  return (
    <section {...bind}>
      <div className="relative isolate px-6 py-32 sm:py-40 lg:px-8">
        <svg
          className="absolute inset-0 -z-10 size-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="1d4240dd-898f-445f-932d-e2872fd12de3"
              width={200}
              height={200}
              x="50%"
              y={0}
              patternUnits="userSpaceOnUse"
            >
              <path d="M.5 200V.5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={0} className="overflow-visible fill-gray-800/20" aria-hidden={true}>
            <path
              d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect
            width="100%"
            height="100%"
            strokeWidth={0}
            fill="url(#1d4240dd-898f-445f-932d-e2872fd12de3)"
          />
        </svg>
        <div
          className="absolute inset-x-0 top-10 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="aspect-[1108/632] w-[69.25rem] flex-none bg-gradient-to-r from-[#3474ba] to-[#2c66b1] opacity-20"
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
          />
        </div>
        <div className="grid container grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="max-w-xl lg:col-span-7">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Do you want to be kept in the loop with Trpkit?
            </h2>
            <p className="mt-6 text-base leading-6 text-gray-300">
              Register your interest by leaving your email address below and we will update you as
              we approach the market release of Trpkit.
            </p>
          </div>
          {submitted ? (
            <div className="w-full max-w-md lg:col-span-5 lg:ml-auto lg:pt-2">
              <p className="text-sm leading-6 text-gray-200">
                Thank you for the interest in our launch of Trpkit! We&apos;re excited to have you
                onboard for the journey!
              </p>
              <p className="mt-4 text-sm leading-6 text-gray-200">
                Don&apos;t forget to follow us on{" "}
                <a
                  href="https://twitter.com/Trpkit"
                  target="_blank"
                  className="font-semibold text-blue-300 underline decoration-dotted underline-offset-2"
                  rel="noreferrer"
                >
                  Twitter
                </a>{" "}
                for updates!
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md lg:col-span-5 lg:ml-auto lg:pt-2"
            >
              <div className="flex gap-x-4">
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="min-w-0 flex-auto rounded-md border-0 bg-zinc-800 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-zinc-700 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
                <button
                  type="submit"
                  className="flex-none rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Notify me
                </button>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-400">
                We care about your data and privacy. By submitting your email, you consent to our
                sharing, storage, and use of your email for the purpose of sending you no more than
                two marketing emails regarding the launch of Trpkit.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
