import { cn } from "@/lib/cn";
import * as Headless from "@headlessui/react";
import type React from "react";

type Props = { className?: string } & Omit<Headless.DescriptionProps, "as" | "className">;

export function Description({ className, ...props }: Props) {
  return (
    <Headless.Description
      data-slot="description"
      {...props}
      className={cn(
        className,
        "text-base/6 text-zinc-500 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-zinc-400"
      )}
    />
  );
}
