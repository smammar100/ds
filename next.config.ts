import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The landing page is fully prerendered and uses no server features (no API
  // routes, server actions, or next/image), so it ships as a static export.
  // Netlify then serves plain files, with no Next.js runtime to keep in step.
  output: "export",

  // Emit /path/index.html rather than /path.html, which is what static hosts
  // expect when resolving directory-style URLs.
  trailingSlash: true,

  images: { unoptimized: true },
};

export default nextConfig;
