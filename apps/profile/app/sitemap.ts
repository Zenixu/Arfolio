import type { MetadataRoute } from "next";
import { sites } from "@arufolio/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = sites.profile.url;
  const now = new Date();
  return [
    { url: base, lastModified: now, priority: 1 },
    { url: `${base}/about`, lastModified: now, priority: 0.8 },
    { url: `${base}/certificates`, lastModified: now, priority: 0.8 },
    { url: `${base}/skills`, lastModified: now, priority: 0.7 },
    { url: `${base}/contact`, lastModified: now, priority: 0.6 },
  ];
}
