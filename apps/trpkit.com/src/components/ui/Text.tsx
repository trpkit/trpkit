import React from "react";
import { cn } from "@/lib/cn";

export function Text({ className, ...props }: React.ComponentPropsWithoutRef<"p">) {
  return <p {...props} className={cn(className, "text-base/6 text-zinc-400 sm:text-sm/6")} />;
}
