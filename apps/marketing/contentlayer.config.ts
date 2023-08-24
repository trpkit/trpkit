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

export const BlogDocument = defineDocumentType(() => ({
  name: "BlogDocument",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    author: { type: "string", required: true },
    authorImage: { type: "string", required: true },
    authorRole: { type: "string", required: true },
    summary: { type: "string", required: true },
  },
  computedFields: {
    href: { type: "string", resolve: (doc) => doc._raw.flattenedPath },
  },
}));

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [LegalDocument, BlogDocument],
});
