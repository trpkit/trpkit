import { allBlogDocuments, allLegalDocuments } from "contentlayer/generated";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://trpkit.com",
      lastModified,
    },
    {
      url: "https://trpkit.com/blog",
      lastModified,
    },
    ...allBlogDocuments.map((doc) => ({
      url: `https://trpkit.com/${doc.href}`,
      lastModified,
    })),
    ...allLegalDocuments.map((doc) => ({
      url: `https://trpkit.com/${doc._raw.flattenedPath}`,
      lastModified,
    })),
  ];
}
