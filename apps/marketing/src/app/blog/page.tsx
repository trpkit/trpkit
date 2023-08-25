import { formatDate } from "@lib/format-date";
import { allBlogDocuments } from "contentlayer/generated";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
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
