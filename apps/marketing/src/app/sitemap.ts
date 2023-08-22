import { allBlogDocuments, allLegalDocuments } from "contentlayer/generated";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://trpkit.com",
      lastModified,
    },
    ...allBlogDocuments.map((doc) => ({
      url: `https://trpkit.com/${doc._raw.flattenedPath}`,
      lastModified,
    })),
    ...allLegalDocuments.map((doc) => ({
      url: `https://trpkit.com/${doc._raw.flattenedPath}`,
      lastModified,
    })),
  ];
}
