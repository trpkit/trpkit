import { cn } from "@/lib/cn";
import type React from "react";

type Props = { tag: "ol" | "ul" } & React.ComponentPropsWithoutRef<"ol" | "ul">;

export function List({ className, tag, ...props }: Props) {
  const Element = tag;

  return (
    <Element
      {...props}
      className={cn(className, tag === "ol" ? "list-decimal" : "list-disc", "ml-5")}
    />
  );
}

export function ListItem({ className, ...props }: React.ComponentPropsWithoutRef<"li">) {
  return <li {...props} className={cn(className, "text-base/6 text-zinc-700 sm:text-sm/6")} />;
}
