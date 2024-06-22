import { config } from "@keystatic/core";

export const showAdminUI = process.env.NODE_ENV !== "production";

export default config({
  storage: {
    kind: "local",
  },
  collections: {},
  singletons: {},
});
