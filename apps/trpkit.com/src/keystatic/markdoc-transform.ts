import { markdocConfig } from "@/keystatic/markdoc-config";
import Markdoc, { type Node, type ValidateError } from "@markdoc/markdoc";

// Source https://github.com/Thinkmill/keystatic/blob/main/docs/keystatic.config.tsx
class MarkdocError extends Error {
  constructor(errors: ValidateError[]) {
    super();
    this.name = "MarkdocError";
    this.message = `Errors in ${errors[0].location?.file}:\n${errors
      .map((error) => {
        const location = error.error.location || error.location;
        return `${errors[0].location?.file}:${location?.start.line ? location.start.line + 1 : "(unknown line)"}${location?.start.character ? `:${location.start.character}` : ""}: ${error.error.message}`;
      })
      .join("\n")}`;
  }
}

function assert(condition: boolean, message = "Assert failed"): asserts condition {
  if (!condition) {
    throw new TypeError(message);
  }
}

export function markdocTransform(node: Node) {
  const errors = Markdoc.validate(node, markdocConfig);

  if (errors.length > 0) {
    throw new MarkdocError(errors);
  }

  const renderableNode = Markdoc.transform(node, markdocConfig);
  assert(renderableNode !== null && typeof renderableNode !== "string");

  return renderableNode;
}
