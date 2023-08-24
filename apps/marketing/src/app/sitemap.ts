import { allBlogDocuments, allLegalDocuments } from "contentlayer/generated";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const legalPages = allLegalDocuments.map((doc) => ({
    url: `https://trpkit.com/${doc.href}`,
    lastModified: doc.effectiveDate,
  }));

  const blogPages = allBlogDocuments.map((doc) => ({
    url: `https://trpkit.com/${doc.href}`,
    lastModified: doc.date,
  }));

  const routes = [""].map((route) => ({
    url: `https://trpkit.com${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogPages, ...legalPages];
}
