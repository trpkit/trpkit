import { allLegalDocuments } from "contentlayer/generated";
import { Metadata } from "next";
import { useMDXComponent } from "next-contentlayer/hooks";
import { notFound } from "next/navigation";

export const generateStaticParams = async () =>
  allLegalDocuments.map((doc) => ({ content: doc.href }));

export async function generateMetadata({
  params,
}: {
  params: { content: string };
}): Promise<Metadata | undefined> {
  const doc = allLegalDocuments.find((doc) => doc.href === `legal/${params.content}`);

  if (!doc) {
    return;
  }

  return {
    title: doc.title,
  };
}

export default function Page({ params }: { params: { content: string } }) {
  const doc = allLegalDocuments.find((doc) => doc.href === `legal/${params.content}`);

  if (!doc) {
    return notFound();
  }

  const MDXContent = useMDXComponent(doc.body.code);

  return (
    <div className="max-w-3xl mx-auto px-4 py-24 sm:py-32">
      <article className="mt-6 prose prose-invert max-w-3xl">
        <MDXContent />
      </article>
    </div>
  );
}
