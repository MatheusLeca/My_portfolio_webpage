import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * Served at /sitemap.xml on both hosts. Empty until the public site
 * address is configured — a sitemap must contain absolute URLs, and there
 * is no custom domain yet (see NEXT_PUBLIC_SITE_URL).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return [];
  return [{ url: siteUrl, lastModified: new Date() }];
}
