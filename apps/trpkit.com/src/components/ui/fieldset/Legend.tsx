import { cn } from "@/lib/cn";
import * as Headless from "@headlessui/react";
import type React from "react";

type Props = { className?: string } & Omit<Headless.LegendProps, "as" | "className">;

export function Legend({ className, ...props }: Props) {
  return (
    <Headless.Legend
      data-slot="legend"
      {...props}
      className={cn(
        className,
        "text-base/6 font-semibold text-zinc-950 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-white"
      )}
    />
  );
}
