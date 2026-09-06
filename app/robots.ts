import type { MetadataRoute } from "next";

export const dynamic = "force-static";

/**
 * Served at /robots.txt on both hosts. The sitemap reference appears once
 * the public site address is configured (see NEXT_PUBLIC_SITE_URL).
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    rules: { userAgent: "*", allow: "/" },
    ...(siteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
