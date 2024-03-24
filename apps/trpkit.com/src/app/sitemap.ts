import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/blog", "/transparency"].map((route) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://trpkit.com"}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes];
}
