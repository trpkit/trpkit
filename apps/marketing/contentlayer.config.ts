import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const LegalDocument = defineDocumentType(() => ({
  name: "LegalDocument",
  filePathPattern: `legal/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
  },
  computedFields: {
    href: { type: "string", resolve: (doc) => `/${doc._raw.flattenedPath}` },
  },
}));

export default makeSource({ contentDirPath: "src/content", documentTypes: [LegalDocument] });
