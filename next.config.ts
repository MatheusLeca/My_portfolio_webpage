import type { NextConfig } from "next";

// Dual-deploy strategy:
// - Default build targets the primary server-capable host (Vercel).
// - `npm run build:static` (NEXT_STATIC_EXPORT=1) produces a fully static
//   `out/` directory for the static-only fallback host (GitHub Pages).
// - NEXT_BASE_PATH prefixes asset/route URLs when serving from a
//   sub-path such as a project page (e.g. "/Landing-Page").
const isStaticExport = process.env.NEXT_STATIC_EXPORT === "1";
const basePath = process.env.NEXT_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? { output: "export" as const, images: { unoptimized: true } }
    : {}),
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
};

export default nextConfig;
