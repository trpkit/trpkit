import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://trpkit.com",
      lastModified: new Date(),
    },
  ];
}
