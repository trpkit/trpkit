import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@lib/format-date";
import { allBlogDocuments } from "contentlayer/generated";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Page() {
  return (
    <div className="max-w-screen-2xl mx-auto w-full px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl lg:mx-0 pb-24">
        <h2 className="text-4xl font-bold tracking-tight text-white">The Trpkit Blog</h2>
        <p className="mt-4 text-lg leading-6 text-gray-300">
          Read about insights, use cases, customer stories, product updates and company
          announcements.
        </p>
      </div>
      <div className="space-y-24 lg:space-y-32">
        {allBlogDocuments.map((doc, index) => (
          <article key={index}>
            <Link href={doc.href}>
              <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                  <h2 className="font-display text-2xl font-semibold text-white">{doc.title}</h2>
                  <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                    <dt className="sr-only">Published on</dt>
                    <dd className="absolute left-0 top-0 text-sm text-neutral-300 lg:static">
                      <time dateTime={doc.date}>{formatDate(doc.date)}</time>
                    </dd>
                    <dt className="sr-only">Published by</dt>
                    <dd className="mt-4 flex gap-x-4">
                      <div className="flex-none overflow-hidden rounded-xl">
                        <Image
                          src={doc.authorImage}
                          alt="nsylke's avatar"
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div className="text-sm text-neutral-300">
                        <div className="font-semibold">{doc.author}</div>
                        <div>{doc.authorRole}</div>
                      </div>
                    </dd>
                  </dl>
                  <p className="mt-6 max-w-2xl text-base text-neutral-300">{doc.summary}</p>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
