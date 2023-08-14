"use client";

import { Disclosure } from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

const faqs = [
  {
    question: "What is Trpkit?",
    answer:
      "Trpkit is a secure web analytics solution with zero-knowledge end-to-end encryption. End-to-end encryption means that no intermediary, not even Trpkit, has access to the user's encryption keys and therefore the stored data.",
  },
  {
    question: "Will Trpkit be open source?",
    answer:
      "Yes, to an extent! We will be releasing our analytics tracker, web client and related components to our GitHub soon. Additionally, we will be publishing Trpkit's design and security processes in a whitepaper.",
  },
  {
    question: "How much will Trpkit cost at open beta/market release?",
    answer:
      "Trpkit will cost $11 USD monthly per 100,000 events. You can switch to our yearly pricing and receive two months free.",
  },
  {
    question: "What is an event?",
    answer:
      "Trpkit tracks sessions and page views to provide accurate and insightful metrics, and each session or page view is considered an event.",
  },
  {
    question: "How long is analytics data retained for?",
    answer:
      "As long as you are an active customer, we'll keep your data forever by default. You can go into your site settings and modify this to be as short as 30 days.",
  },
  {
    question: "What happens if I go over my quota?",
    answer:
      "We'll continue to track events for the occasional spikes that may happen. If you go over your quota two months in a row, we will automatically upgrade your plan.",
  },
];

export default function Faq() {
  return (
    <section>
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <div className="mx-auto divide-y divide-slate-800">
          <h2 className="text-3xl font-bold leading-10 tracking-tight text-white sm:text-4xl">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-slate-800">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-white">
                        <span className="text-base font-semibold leading-7">{faq.question}</span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <MinusSmallIcon className="h-6 w-6" aria-hidden={true} />
                          ) : (
                            <PlusSmallIcon className="h-6 w-6" aria-hidden={true} />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-300">{faq.answer}</p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
