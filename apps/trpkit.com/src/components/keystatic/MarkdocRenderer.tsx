import { Divider } from "@/components/ui/Divider";
import { Heading } from "@/components/ui/Heading";
import { Link } from "@/components/ui/Link";
import { Text } from "@/components/ui/Text";
import { markdocTransform } from "@/keystatic/markdoc-transform";
import { type Node, renderers } from "@markdoc/markdoc";
import React, { Fragment, type ReactNode } from "react";

export function MarkdocRenderer({ node }: { node: Node }): ReactNode {
  const root = markdocTransform(node);

  return renderers.react(root, React);
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
    Paragraph: ({ children }: { children: ReactNode }) => <Text>{children}</Text>,
    Divider: () => <Divider />,
  };
}
