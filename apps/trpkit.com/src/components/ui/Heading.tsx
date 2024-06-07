import React from "react";
import { cn } from "@/lib/cn";

type Props = { level?: 1 | 2 | 3 | 4 | 5 | 6 } & React.ComponentPropsWithoutRef<
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>;

export function Heading({ className, level = 1, ...props }: Props) {
  let Element: `h${typeof level}` = `h${level}`;

  return <Element {...props} className={cn("text-2xl/8 font-semibold text-white sm:text-xl/8")} />;
}
