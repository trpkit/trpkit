import { Heading } from "@/components/ui/Heading";
import { Text, TextLink } from "@/components/ui/Text";

export default function NotFound() {
  return (
    <div className="relative isolate flex justify-center items-center min-h-svh w-full bg-white max-lg:flex-col lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950">
      <div className="max-w-md space-y-8 p-4 text-center">
        <Heading level={1}>Page Not Found</Heading>
        <Text>
          The page you are looking for might have been removed, had its name changed, or is
          temporarily unavailable.
        </Text>
        <TextLink href="/" className="inline-flex">
          Back to Home
        </TextLink>
      </div>
    </div>
  );
}
