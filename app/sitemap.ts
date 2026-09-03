import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    ["", 1],
    ["/services", 0.9],
    ["/projects", 0.8],
    ["/about", 0.8],
    ["/contact", 0.8],
    ["/quote", 0.8],
    ["/privacy", 0.6],
    ["/cookies", 0.5],
    ["/terms", 0.5],
    ["/disclaimer", 0.4],
  ] as const;

  return pages.map(([path, priority]) => ({
    url: `https://olyrlabs.com${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority,
  }));
}
