import { cn } from "@/lib/cn";
import type React from "react";

type Props = { level?: 1 | 2 | 3 | 4 | 5 | 6 } & React.ComponentPropsWithoutRef<
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>;

export function Heading({ className, level = 1, ...props }: Props) {
  const Element: `h${typeof level}` = `h${level}`;

  return (
    <Element
      {...props}
      className={cn(
        className,
        level === 1 ? "text-2xl sm:text-xl" : "",
        level === 2 ? "text-xl mt-6" : "",
        level === 3 ? "text-base mt-2" : "",
        "font-semibold text-zinc-900"
      )}
    />
  );
}
