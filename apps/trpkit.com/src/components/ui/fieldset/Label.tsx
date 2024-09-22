import { cn } from "@/lib/cn";
import * as Headless from "@headlessui/react";
import type React from "react";

type Props = { className?: string } & Omit<Headless.LabelProps, "as" | "className">;

export function Label({ className, ...props }: Props) {
  return (
    <Headless.Label
      data-slot="label"
      {...props}
      className={cn(
        "select-none text-base/6 text-zinc-950 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-white",
        className
      )}
    />
  );
}
