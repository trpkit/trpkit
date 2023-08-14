import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/*",
      disallow: ["/_next/*"],
    },
    sitemap: "https://trpkit.com/sitemap.xml",
  };
}
