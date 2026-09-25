import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * Generates /sitemap.xml using NEXT_PUBLIC_SITE_URL.
 * Returns an empty sitemap if the site URL is not configured.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return [];
  return [{ url: siteUrl, lastModified: new Date() }];
}
