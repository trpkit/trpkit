import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL || "https://trpkit.com"}/sitemap.xml`,
  };
}
