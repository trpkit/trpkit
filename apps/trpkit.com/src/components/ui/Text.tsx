import { cn } from "@/lib/cn";
import type React from "react";

export function Text({ className, ...props }: React.ComponentPropsWithoutRef<"p">) {
  return <p {...props} className={cn(className, "text-base/6 text-zinc-700 sm:text-sm/6")} />;
}

export function Strong({ className, ...props }: React.ComponentPropsWithoutRef<"strong">) {
  return <strong {...props} className={cn(className, "font-medium")} />;
}
