import type { NextConfig } from "next";

// Strict static export: Firebase Hosting serves files only, no Node server.
// `output: "export"` minifies JS/CSS by default (SWC), splits _next/static
// chunks, emits long-cache-hashed assets. `images.unoptimized` keeps
// next/image on plain <img> (no optimizer server). NEXT_BASE_PATH prefixes
// URLs when serving from a sub-path.
const basePath = process.env.NEXT_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
};

export default nextConfig;
