import { allBlogDocuments, allLegalDocuments } from "contentlayer/generated";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const legalPages = allLegalDocuments.map((doc) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://trpkit.com"}/${doc.href}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  const blogPages = allBlogDocuments.map((doc) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://trpkit.com"}/${doc.href}`,
    lastModified: doc.date,
  }));

  const routes = [""].map((route) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://trpkit.com"}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogPages, ...legalPages];
}
