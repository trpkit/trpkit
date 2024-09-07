import { collection, config, fields, singleton } from "@keystatic/core";

export const showAdminUI = process.env.NODE_ENV !== "production";

export default config({
  storage: {
    kind: "local",
  },
  ui: {
    brand: {
      name: "Trpkit",
      mark: () => <img src="/branding/icon.svg" alt="Trpkit Icon" height={24} />,
    },
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
  singletons: {
    headerNavigation: singleton({
      label: "Header Navigation",
      path: "src/keystatic/content/header-navigation",
      schema: {
        items: fields.array(
          fields.object({
            label: fields.text({
              label: "Label",
            }),
            link: fields.conditional(
              fields.select({
                label: "Link type",
                options: [
                  { label: "URL", value: "url" },
                  { label: "Coming soon (no URL)", value: "coming-soon" },
                ],
                defaultValue: "url",
              }),
              {
                url: fields.text({ label: "URL" }),
                "coming-soon": fields.empty(),
              }
            ),
          }),
          {
            label: "Navigation items",
            itemLabel: (props) => props.fields.label.value,
          }
        ),
      },
    }),
    footerNavigation: singleton({
      label: "Footer Navigation",
      path: "src/keystatic/content/footer-navigation",
      schema: {
        groups: fields.array(
          fields.object({
            groupName: fields.text({ label: "Group name" }),
            items: fields.array(
              fields.object({
                label: fields.text({
                  label: "Label",
                }),
                link: fields.conditional(
                  fields.select({
                    label: "Link type",
                    options: [
                      { label: "URL", value: "url" },
                      { label: "Coming soon (no URL)", value: "coming-soon" },
                    ],
                    defaultValue: "url",
                  }),
                  {
                    url: fields.text({ label: "URL" }),
                    "coming-soon": fields.empty(),
                  }
                ),
              }),
              {
                label: "Navigation items",
                itemLabel: (props) => props.fields.label.value,
              }
            ),
          }),
          {
            label: "Navigation groups",
            itemLabel: (props) => props.fields.groupName.value,
            validation: { length: { max: 4 } },
          }
        ),
      },
    }),
  },
});
