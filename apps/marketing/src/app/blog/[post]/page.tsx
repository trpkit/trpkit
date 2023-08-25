import BlogArticle from "@components/BlogArticle";
import { formatDate } from "@lib/format-date";
import { allBlogDocuments } from "contentlayer/generated";
import { Metadata } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { post: string };
}): Promise<Metadata | undefined> {
  const doc = allBlogDocuments.find((doc) => doc.href === params.post);

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
      url: `https://trpkit.com/${doc.href}`,
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.summary,
    },
  };
}

export default function Page({ params }: { params: { post: string } }) {
  const doc = allBlogDocuments.find((doc) => doc.href === params.post);

  if (!doc) {
    return notFound();
  }

  const MDXContent = useMDXComponent(doc.body.code);

  return (
    <BlogArticle>
      <header className="mx-auto flex max-w-5xl flex-col text-center">
        <h1 className="font-display text-5xl font-medium tracking-tight text-white sm:text-6xl mb-2">
          {doc.title}
        </h1>
        <p className="text-sm text-neutral-400">
          Published by{" "}
          <span className="font-semibold">
            {doc.author} ({doc.authorRole})
          </span>{" "}
          on{" "}
          <time dateTime={doc.date} className="font-semibold">
            {formatDate(doc.date)}
          </time>
        </p>
      </header>
      <MDXContent />
    </BlogArticle>
  );
}
