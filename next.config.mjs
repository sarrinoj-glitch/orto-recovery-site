/** @type {import('next').NextConfig} */
// GITHUB_PAGES=1 — статическая сборка в out/ для GitHub Pages (сайт в подпапке NEXT_PUBLIC_BASE_PATH)
const pages = process.env.GITHUB_PAGES === '1'
const nextConfig = {
  reactStrictMode: true,
  images: { unoptimized: true, remotePatterns: [{ protocol: "https", hostname: "**" }] },
  experimental: { optimizePackageImports: ["framer-motion", "lucide-react"] },
  ...(pages ? { output: "export", basePath: process.env.NEXT_PUBLIC_BASE_PATH || "", trailingSlash: true } : {}),
};
export default nextConfig;
