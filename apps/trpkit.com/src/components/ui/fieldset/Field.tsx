import { cn } from "@/lib/cn";
import * as Headless from "@headlessui/react";
import type React from "react";

type Props = { className?: string } & Omit<Headless.FieldProps, "as" | "className">;

export function Field({ className, ...props }: Props) {
  return (
    <Headless.Field
      {...props}
      className={cn(
        "[&>[data-slot=label]+[data-slot=control]]:mt-3",
        "[&>[data-slot=label]+[data-slot=description]]:mt-1",
        "[&>[data-slot=description]+[data-slot=control]]:mt-3",
        "[&>[data-slot=control]+[data-slot=description]]:mt-3",
        "[&>[data-slot=control]+[data-slot=error]]:mt-3",
        "[&>[data-slot=label]]:font-medium",
        className
      )}
    />
  );
}
