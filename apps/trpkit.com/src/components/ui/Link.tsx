import React from "react";
import NextLink, { type LinkProps } from "next/link";
import { DataInteractive } from "@headlessui/react";

export const Link = React.forwardRef(function Link(
  props: LinkProps & React.ComponentPropsWithoutRef<"a">,
  ref: React.ForwardedRef<HTMLAnchorElement>
) {
  return (
    <DataInteractive>
      <NextLink {...props} ref={ref} />
    </DataInteractive>
  );
});
