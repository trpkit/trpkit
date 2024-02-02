import { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate } from "@lib/format-date";
import { allLegalDocuments } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";

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
    <div className="mx-auto max-w-3xl px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl pb-12 lg:mx-0">
        <h2 className="text-4xl font-bold tracking-tight text-white">{doc.title}</h2>
        <p className="mt-4 text-lg leading-6 text-gray-300">
          Effective date: {formatDate(doc.effectiveDate)}
        </p>
      </div>
      <article className="prose prose-invert max-w-3xl">
        <MDXContent />
      </article>
    </div>
  );
}
