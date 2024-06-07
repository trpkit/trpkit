import React, { Fragment, ReactNode } from "react";
import { Node, renderers } from "@markdoc/markdoc";
import { Heading } from "@/components/ui/Heading";
import { Link } from "@/components/ui/Link";
import { markdocTransform } from "@/keystatic/markdoc-transform";

export async function MarkdocRenderer({ node }: { node: Node }): Promise<ReactNode> {
  const root = markdocTransform(node);

  return renderers.react(root, React) as any;
}

/**
 * Provides custom renderers for specific components used in Markdoc
 *
 * @returns {object} An object containing custom renderers for specific components
 */
function getRenderers() {
  return {
    Fragment,
    Link: ({ href, children }: { href: string; children: string }) => (
      <Link href={href}>{children}</Link>
    ),
    Heading: ({ level, children }: { level: 1 | 2 | 3 | 4 | 5 | 6; children: ReactNode }) => (
      <Heading level={level}>{children}</Heading>
    ),
  };
}
