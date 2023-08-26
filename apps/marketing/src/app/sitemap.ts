import { allBlogDocuments, allLegalDocuments } from "contentlayer/generated";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified,
    },
    ...allBlogDocuments.map((doc) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${doc._raw.flattenedPath}`,
      lastModified,
    })),
    ...allLegalDocuments.map((doc) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/${doc._raw.flattenedPath}`,
      lastModified,
    })),
  ];
}
