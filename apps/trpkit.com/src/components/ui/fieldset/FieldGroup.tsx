import { cn } from "@/lib/cn";
import type React from "react";

type Props = React.ComponentPropsWithoutRef<"div">;

export function FieldGroup({ className, ...props }: Props) {
  return <div data-slot="control" {...props} className={cn("space-y-8", className)} />;
}
