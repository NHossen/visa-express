// app/robots.js
export default function robots() {
  return {
    rules: [
      // ── Main rule for all bots ─────────────────────────────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/log-in/", "/sign-up/", "/_next/", "/admin/"],
      },

      // ── AI scrapers — no indexing value, pure bandwidth waste ──────────────
      { userAgent: "GPTBot",         disallow: "/" },
      { userAgent: "ChatGPT-User",   disallow: "/" },
      { userAgent: "Google-Extended", disallow: "/" },
      { userAgent: "CCBot",          disallow: "/" },
      { userAgent: "anthropic-ai",   disallow: "/" },
      { userAgent: "Claude-Web",     disallow: "/" },
      { userAgent: "cohere-ai",      disallow: "/" },
      { userAgent: "PerplexityBot",  disallow: "/" },
      { userAgent: "Diffbot",        disallow: "/" },
      { userAgent: "Omgilibot",      disallow: "/" },
      { userAgent: "FacebookBot",    disallow: "/" },
      { userAgent: "Applebot-Extended", disallow: "/" },

      // ── Aggressive SEO crawlers — block entirely ───────────────────────────
      { userAgent: "AhrefsBot",      disallow: "/" },
      { userAgent: "SemrushBot",     disallow: "/" },
      { userAgent: "MJ12bot",        disallow: "/" },
      { userAgent: "DotBot",         disallow: "/" },
      { userAgent: "BLEXBot",        disallow: "/" },
      { userAgent: "PetalBot",       disallow: "/" },
      { userAgent: "DataForSeoBot",  disallow: "/" },
      { userAgent: "SeekportBot",    disallow: "/" },

      // ── Googlebot — explicit fast allow (no crawl-delay) ──────────────────
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/api/", "/log-in/", "/sign-up/", "/_next/", "/admin/"],
      },

      // ── Bingbot — small delay is fine ─────────────────────────────────────
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/api/", "/log-in/", "/sign-up/"],
      },
    ],

    sitemap: "https://visaexpresshub.com/sitemap.xml",
  };
}