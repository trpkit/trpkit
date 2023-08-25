import { allLegalDocuments } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";

export const generateStaticParams = async () =>
  allLegalDocuments.map((doc) => ({ content: doc._raw.flattenedPath }));

export default function Page({ params }: { params: { content: string } }) {
  const doc = allLegalDocuments.find((doc) => doc._raw.flattenedPath === `legal/${params.content}`);

  if (!doc) {
    return notFound();
  }

  const MDXContent = useMDXComponent(doc.body.code);

  return (
    <article className="prose prose-invert mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
      <MDXContent />
    </article>
  );
}
