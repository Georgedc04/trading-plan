import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://calculator.dctrades.in",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://calculator.dctrades.in/terms",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
