import type { MetadataRoute } from "next";
import { sites } from "@arufolio/config";
import { projects } from "@arufolio/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = sites.showcase.url;
  const now = new Date();
  return [
    { url: base, lastModified: now, priority: 1 },
    { url: `${base}/work`, lastModified: now, priority: 0.9 },
    { url: `${base}/lab`, lastModified: now, priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, priority: 0.6 },
    ...projects.map((p) => ({ url: `${base}/work/${p.slug}`, lastModified: now, priority: 0.8 })),
  ];
}
