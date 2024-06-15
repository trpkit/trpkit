import slugify from "@sindresorhus/slugify";
import type React from "react";

/**
 * Convert a given string into a URL-friendly slug
 *
 * @param {string} input - The input string to be converted
 * @returns {string} The slugified version of the input string
 */
export function getSlug(input: string) {
  return slugify(input);
}

/**
 * Generate a slug from a React node
 *
 * @param {React.ReactNode} node - The React node from which to generate a slug
 * @returns {string} The slugified text content of the node
 */
export function getSlugForNode(node: React.ReactNode) {
  return slugify(getTextNode(node));
}

/**
 * Recursively extracts text content from a React node
 *
 * @param {React.ReactNode} node - The React node from which to extract text
 * @returns {string} The extracted text content
 */
function getTextNode(node: React.ReactNode): string {
  if (!node) return "";
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (typeof node === "object" && "text" in node && typeof node.text === "string") return node.text;
  if (Array.isArray(node)) return node.map(getTextNode).join("");
  if (typeof node === "object" && "props" in node && "node" in node.props)
    return getTextNode(node.props.node);
  return "";
}
