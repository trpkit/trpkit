import { Subheading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";

export default function WebsiteMonitoring() {
  return (
    <section className="overflow-hidden pt-32">
      <div className="space-y-8 md:!space-y-16 container">
        <div className="text-left mx-0">
          <Subheading className="sm:text-4xl mb-3 md:mb-6">Zero-config website and SSL monitoring</Subheading>
          <Text className="sm:text-xl">
            View response timings of your site from around the world and ensure the validity of your
            SSL certificate.
          </Text>
        </div>
        <div className="relative w-full h-[540px] rounded-2xl bg-zinc-800" />
      </div>
    </section>
  );
}
