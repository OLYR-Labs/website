import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
return [
{
url: "https://olyrlabs.com",
lastModified: new Date(),
changeFrequency: "monthly",
priority: 1,
},
{
url: "https://olyrlabs.com/services",
lastModified: new Date(),
changeFrequency: "monthly",
priority: 0.9,
},
{
url: "https://olyrlabs.com/contact",
lastModified: new Date(),
changeFrequency: "monthly",
priority: 0.8,
},
];
}
