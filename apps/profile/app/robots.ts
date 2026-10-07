import type { MetadataRoute } from "next";
import { sites } from "@arufolio/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${sites.profile.url}/sitemap.xml`,
  };
}
