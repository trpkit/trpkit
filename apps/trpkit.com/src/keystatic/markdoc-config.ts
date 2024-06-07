import { fields } from "@keystatic/core";
import Markdoc, { Config } from "@markdoc/markdoc";

/**
 * Configuration object for Markdoc, integrating with Keystatic
 */
export const markdocConfig: Config = {
  tags: fields.markdoc.createMarkdocConfig({}).tags,
  nodes: {
    document: {
      ...Markdoc.nodes.document,
      render: "Fragment",
    },
    link: {
      ...Markdoc.nodes.link,
      render: "Link",
    },
  },
};
