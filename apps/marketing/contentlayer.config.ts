import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

export const LegalDocument = defineDocumentType(() => ({
  name: "LegalDocument",
  filePathPattern: `legal/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    effectiveDate: { type: "date", required: true },
  },
  // @ts-ignore
  computedFields: computedFields(),
}));

export const BlogDocument = defineDocumentType(() => ({
  name: "BlogDocument",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    author: { type: "string", required: true },
    authorRole: { type: "string", required: true },
    authorImage: { type: "string", required: true },
    twitter: { type: "string", required: true },
    illustration: { type: "string", required: true },
    summary: { type: "string", required: true },
  },
  // @ts-ignore
  computedFields: computedFields(),
}));

const computedFields = () => ({
  href: { type: "string", resolve: (doc) => doc._raw.flattenedPath },
});

export default makeSource({
  contentDirPath: "src/content",
  documentTypes: [LegalDocument, BlogDocument],
  mdx: {
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { properties: { className: ["anchor"] } }],
    ],
  },
});
