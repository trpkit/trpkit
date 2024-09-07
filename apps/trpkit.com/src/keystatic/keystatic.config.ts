import { collection, config, fields } from "@keystatic/core";

export const showAdminUI = process.env.NODE_ENV !== "production";

export default config({
  storage: {
    kind: "local",
  },
  collections: {
    legalResources: collection({
      label: "Legal Resources",
      slugField: "title",
      entryLayout: "content",
      format: { contentField: "children" },
      path: "src/keystatic/content/legal-resources/**",
      previewUrl: "/legal/{slug}",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        lastUpdated: fields.date({
          label: "Last updated",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),
        summary: fields.text({
          label: "Summary",
          description:
            "The summary is used in the legal center for a short description and metadata description.",
          multiline: true,
        }),
        children: fields.markdoc({
          label: "Page content",
          components: {},
        }),
      },
    }),
  },
  singletons: {},
});
