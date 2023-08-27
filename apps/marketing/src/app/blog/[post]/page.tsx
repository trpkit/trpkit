import BlogArticle from "@components/blog/BlogArticle";
import BlogArticleHeader from "@components/blog/BlogArticleHeader";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { formatDate } from "@lib/format-date";
import { allBlogDocuments } from "contentlayer/generated";
import { Metadata } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams({ params }: { params: { post: string } }) {
  return allBlogDocuments.map((doc) => ({ post: doc.href }));
}

export async function generateMetadata({
  params,
}: {
  params: { post: string };
}): Promise<Metadata | undefined> {
  const doc = allBlogDocuments.find((doc) => doc.href === `blog/${params.post}`);

  if (!doc) {
    return;
  }

  return {
    title: doc.title,
    description: doc.summary,
    openGraph: {
      title: doc.title,
      description: doc.summary,
      type: "article",
      publishedTime: doc.date,
      url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://trpkit.com"}/${doc.href}`,
      images: [
        {
          url: `${
            process.env.NEXT_PUBLIC_BASE_URL || "https://trpkit.com"
          }/og?title=${encodeURIComponent(doc.title)}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.summary,
      images: [
        `${process.env.NEXT_PUBLIC_BASE_URL || "https://trpkit.com"}/og?title=${encodeURIComponent(
          doc.title
        )}`,
      ],
    },
  };
}

export default function Page({ params }: { params: { post: string } }) {
  const doc = allBlogDocuments.find((doc) => doc.href === `blog/${params.post}`);

  if (!doc) {
    return notFound();
  }

  const MDXContent = useMDXComponent(doc.body.code);

  return (
    <>
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-6 flex">
          <Link
            href="/blog"
            className="group flex font-semibold text-sm leading-6 text-gray-300 hover:text-white">
            <ChevronLeftIcon className="overflow-visible w-6 h-6" aria-hidden={true} />
            Go back
          </Link>
        </div>
        <article className="relative pt-10">
          <h1 className="text-2xl font-extrabold tracking-tight text-white md:text-3xl">
            {doc.title}
          </h1>
          <div className="text-sm leading-6">
            <dl>
              <dt className="sr-only">Published date</dt>
              <dd className="absolute top-0 inset-x-0 text-gray-400">
                <time dateTime={doc.date}>{formatDate(doc.date)}</time>
              </dd>
            </dl>
          </div>
          <div className="mt-6">
            <ul className="flex flex-wrap text-sm leading-6 -mt-6 -mx-5">
              <li className="flex items-center font-medium whitespace-nowrap px-5 mt-6">
                <Image
                  src={doc.authorImage}
                  alt={doc.author}
                  width={36}
                  height={36}
                  className="mr-3 rounded-full"
                />
                <div className="text-sm leading-4">
                  <div className="text-gray-300">
                    {doc.author} &mdash; {doc.authorRole}
                  </div>
                  <div className="mt-1">
                    <a
                      href={`https://twitter.com/${doc.twitter}`}
                      className="text-blue-500 hover:text-blue-400">
                      @{doc.twitter}
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="p-2 bg-slate-800 rounded-xl mt-12">
            <Image
              src={doc.illustration}
              alt={doc.title}
              width={1920}
              height={1080}
              className="rounded-lg"
            />
          </div>
          <div className="mt-6 prose prose-invert max-w-3xl">
            <MDXContent />
          </div>
        </article>
      </div>
    </>
  );
}
