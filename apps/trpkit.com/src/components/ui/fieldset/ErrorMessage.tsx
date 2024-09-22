import { cn } from "@/lib/cn";
import * as Headless from "@headlessui/react";
import type React from "react";

type Props = { className?: string } & Omit<Headless.DescriptionProps, "as" | "className">;

export function ErrorMessage({ className, ...props }: Props) {
  return (
    <Headless.Description
      data-slot="error"
      {...props}
      className={cn(
        "text-base/6 text-red-600 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-red-500",
        className
      )}
    />
  );
}
