/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `next build` emits a fully static site into `out/`,
  // which you can host for free on GitHub Pages, Netlify, or Vercel.
  output: 'export',
  // Emit /blog/post/index.html style paths — friendlier for static hosts.
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Required for static export (no image optimization server).
    unoptimized: true,
  },
}

export default nextConfig
