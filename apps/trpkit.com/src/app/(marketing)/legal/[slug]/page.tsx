import { MarkdocRenderer } from "@/components/keystatic/MarkdocRenderer";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { reader } from "@/keystatic/reader";
import { formatDate } from "@/lib/formatDate";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const legalResource = await reader.collections.legalResources.read(params.slug);
  if (!legalResource) notFound();

  return (
    <>
      <section className="overflow-hidden bg-zinc-200 pb-20">
        <div className="container">
          <div className="pt-24 lg:pt-36">
            <Heading level={1} className="text-3xl lg:text-5xl font-semibold">
              {legalResource.title}
            </Heading>
            <Text className="text-lg lg:text-xl text-zinc-700 font-medium mt-5">
              Last updated: {formatDate(legalResource.lastUpdated)}
            </Text>
          </div>
        </div>
      </section>
      <section className="overflow-hidden pt-32">
        <div className="container">
          <MarkdocRenderer node={(await legalResource.children()).node} />
        </div>
      </section>
    </>
  );
}
