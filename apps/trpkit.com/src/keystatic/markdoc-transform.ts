import Markdoc, { Node } from "@markdoc/markdoc";
import { markdocConfig } from "@/keystatic/markdoc-config";

/**
 * Transforms a Markdoc node using a specified configuration
 *
 * @param {Node} node - The Markdoc node to be transformed
 * @returns {any} The transformed node
 * @throws Will throw an error if the content is invalid according to the Markdoc configuration
 */
export function markdocTransform(node: Node) {
  const errors = Markdoc.validate(node, markdocConfig);

  if (errors.length) {
    console.error(errors);
    throw new Error("Invalid content");
  }

  return Markdoc.transform(node, markdocConfig);
}
