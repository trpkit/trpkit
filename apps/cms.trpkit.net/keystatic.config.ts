import { collection, config, fields } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
    // repo: "trpkit/materials",
    // branchPrefix: "",
  },
  ui: {
    brand: { name: "Trpkit" },
  },
  collections: {
    authors: collection({
      label: "Authors",
      path: "author/*",
      slugField: "name",
      schema: {
        name: fields.slug({
          name: {
            label: "Name",
            validation: {
              length: {
                min: 1,
              },
            },
          },
        }),
        title: fields.text({ label: "Title" }),
      },
    }),
  },
});
