import BlogArticle from "@components/blog/BlogArticle";
import BlogArticleHeader from "@components/blog/BlogArticleHeader";
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
      <BlogArticleHeader
        title={doc.title}
        author={doc.author}
        authorRole={doc.authorRole}
        date={doc.date}
      />
      <MDXContent />
    </BlogArticle>
  );
}
