// Central place for site-wide metadata and integration slots.
// Update these values (or the matching env vars) once, and they flow
// through the whole site: metadata, sitemap, structured data, etc.

export const siteConfig = {
  // The person / brand behind the site.
  name: "Freddy Hernandez",
  // Short tagline used in headers and social cards.
  tagline: "My journey starting a business, in public.",
  description:
    "A personal journal following my journey starting a business — the tasks I take on, the failures, the wins, and everything else that shapes the way.",

  // IMPORTANT: set this to your real deployed URL before going live.
  // Used for canonical URLs, the sitemap, robots.txt, and social cards.
  // You can also set NEXT_PUBLIC_SITE_URL in your host's environment.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://your-domain.com",

  // --- Analytics & Search Console slots -----------------------------
  // GA4 Measurement ID, e.g. "G-XXXXXXXXXX".
  // Set NEXT_PUBLIC_GA_ID in your environment once you create a GA4 property.
  gaMeasurementId: process.env.NEXT_PUBLIC_GA_ID ?? "",

  // Google Search Console "HTML tag" verification token (the content="..."
  // value from the <meta name="google-site-verification"> snippet).
  // Set NEXT_PUBLIC_GSC_VERIFICATION in your environment.
  gscVerification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? "",
  // ------------------------------------------------------------------

  nav: [
    { title: "Home", href: "/" },
    { title: "Journal", href: "/blog" },
    { title: "About & Services", href: "/about" },
  ],

  social: {
    email: "freddyh1125@gmail.com",
    facebook: "https://www.facebook.com/profile.php?id=100054168878649",
    youtube: "https://www.youtube.com/@FreddyHernandez-x6q",
  },
} as const

export type SiteConfig = typeof siteConfig
