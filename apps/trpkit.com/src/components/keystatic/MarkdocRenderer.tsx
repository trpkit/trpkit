import { Divider } from "@/components/ui/Divider";
import { Heading } from "@/components/ui/Heading";
import { List, ListItem } from "@/components/ui/List";
import { Strong, Text, TextLink } from "@/components/ui/Text";
import { markdocTransform } from "@/keystatic/markdoc-transform";
import { type Node, renderers } from "@markdoc/markdoc";
import React, { Fragment, type ReactNode } from "react";

export function MarkdocRenderer({ node }: { node: Node }): ReactNode {
  const root = markdocTransform(node);

  return renderers.react(root, React, {
    components: getRenderers(),
  });
}

function getRenderers() {
  return {
    Fragment,
    Link: ({ href, children }: { href: string; children: string }) => (
      <TextLink href={href}>{children}</TextLink>
    ),
    Heading: ({ level, children }: { level: 1 | 2 | 3 | 4 | 5 | 6; children: ReactNode }) => (
      <Heading level={level}>{children}</Heading>
    ),
    Paragraph: ({ children }: { children: ReactNode }) => <Text>{children}</Text>,
    Divider: () => <Divider />,
    Strong: ({ children }: { children: ReactNode }) => <Strong>{children}</Strong>,
    List: ({ ordered, children }: { ordered: boolean; children: ReactNode }) => (
      <List tag={ordered ? "ol" : "ul"}>{children}</List>
    ),
    ListItem: ({ children }: { children: ReactNode }) => <ListItem>{children}</ListItem>,
  };
}
