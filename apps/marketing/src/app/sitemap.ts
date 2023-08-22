import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // TODO: Look into automatically pulling all pages and inserting into the sitemap.
  return [
    {
      url: "https://trpkit.com",
      lastModified: new Date(),
    },
    {
      url: "https://trpkit.com/legal/terms",
      // TODO: We should probably pull the legal document from contentlayer and grab the date from that. (Requires a new field)
      lastModified: new Date(),
    },
    {
      url: "https://trpkit.com/legal/privacy",
      // TODO: See L12
      lastModified: new Date(),
    },
  ];
}
