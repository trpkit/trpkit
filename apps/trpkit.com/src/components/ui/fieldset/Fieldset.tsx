import { cn } from "@/lib/cn";
import * as Headless from "@headlessui/react";
import type React from "react";

type Props = { className?: string } & Omit<Headless.FieldsetProps, "as" | "className">;

export function Fieldset({ className, ...props }: Props) {
  return (
    <Headless.Fieldset
      {...props}
      className={cn("[&>*+[data-slot=control]]:mt-6 [&>[data-slot=text]]:mt-1", className)}
    />
  );
}
