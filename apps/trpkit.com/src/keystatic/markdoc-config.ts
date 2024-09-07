import { components } from "@/keystatic/markdoc-components";
import { fields } from "@keystatic/core";
import Markdoc, { type Config } from "@markdoc/markdoc";

export const markdocConfig: Config = {
  tags: fields.markdoc.createMarkdocConfig({ components, render: {} }).tags,
  nodes: {
    document: {
      ...Markdoc.nodes.document,
      render: "Fragment",
    },
    link: {
      ...Markdoc.nodes.link,
      render: "Link",
    },
    heading: {
      children: ["inline"],
      render: "Heading",
      attributes: {
        level: { type: Number, required: true },
      },
    },
    paragraph: {
      ...Markdoc.nodes.paragraph,
      render: "Paragraph",
    },
    hr: {
      ...Markdoc.nodes.hr,
      render: "Divider",
    },
    strong: {
      ...Markdoc.nodes.strong,
      render: "Strong",
    },
  },
};
