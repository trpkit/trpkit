import { collection, config, fields } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: {
      owner: "trpkit",
      name: "materials",
    },
  },
  collections: {
    author: collection({
      label: "Blog authors",
      slugField: "name",
      path: "author/*",
      schema: {
        name: fields.slug({ name: { label: "Name" } }),
        title: fields.text({ label: "Title" }),
      },
    }),
    blog: collection({
      label: "Blog posts",
      slugField: "title",
      path: "blog/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        publishedDate: fields.date({ label: "Published date" }),
        authors: fields.array(
          fields.relationship({
            label: "Author",
            collection: "author",
          }),
          {
            label: "Authors",
            validation: { length: { min: 1 } },
            itemLabel: (props) => props.value || "Please select an author",
          }
        ),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
        }),
      },
    }),
    legal: collection({
      label: "Legal documents",
      slugField: "title",
      path: "legal/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        effectiveDate: fields.date({ label: "Effective date" }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
        }),
      },
    }),
  },
});
