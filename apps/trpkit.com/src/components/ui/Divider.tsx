import React from "react";
import { cn } from "@/lib/cn";

export function Divider({
  soft = false,
  className,
  ...props
}: { soft?: boolean } & React.ComponentPropsWithoutRef<"hr">) {
  return (
    <hr
      {...props}
      className={cn(
        className,
        "w-full border-t",
        soft && "border-white/5",
        !soft && "border-white/10"
      )}
    />
  );
}
