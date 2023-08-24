import BlogArticle from "@components/BlogArticle";
import { allBlogDocuments } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";

export const generateStaticParams = async () =>
  allBlogDocuments.map((doc) => ({ post: doc._raw.flattenedPath }));

export default function Page({ params }: { params: { post: string } }) {
  const doc = allBlogDocuments.find((doc) => doc._raw.flattenedPath === `blog/${params.post}`);

  if (!doc) {
    return notFound();
  }

  const MDXContent = useMDXComponent(doc.body.code);

  return (
    <BlogArticle>
      <MDXContent />
    </BlogArticle>
  );
}
