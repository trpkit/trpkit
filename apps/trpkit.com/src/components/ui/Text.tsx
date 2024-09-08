import { Link } from "@/components/ui/Link";
import { cn } from "@/lib/cn";
import type React from "react";

export function Text({ className, ...props }: React.ComponentPropsWithoutRef<"p">) {
  return <p {...props} className={cn(className, "text-base/6 text-zinc-700 sm:text-sm/6 mb-3")} />;
}

export function TextLink({ className, ...props }: React.ComponentPropsWithoutRef<typeof Link>) {
  return (
    <Link
      {...props}
      className={cn(
        className,
        "text-zinc-950 underline decoration-zinc-950/50 data-[hover]:decoration-zinc-950"
      )}
    />
  );
}

export function Strong({ className, ...props }: React.ComponentPropsWithoutRef<"strong">) {
  return <strong {...props} className={cn(className, "font-medium")} />;
}
