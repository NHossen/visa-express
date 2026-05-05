// app/sitemap-index.xml/route.js

import { getCountries } from '@/app/lib/sitemapData';
import { buildAllRoutes } from '@/app/lib/sitemapRoutes';

export const dynamic = 'force-dynamic';

const BASE_URL = 'https://www.visaexpresshub.com';
const PAGE_SIZE = 50_000;

export async function GET() {
  try {
    const countries = await getCountries();
    const routes = buildAllRoutes(countries);
    const chunkCount = Math.ceil(routes.length / PAGE_SIZE);
    const now = new Date().toISOString();

 // src/app/sitemap-index.xml/route.js
const sitemaps = Array.from({ length: chunkCount }, (_, i) =>
  `  <sitemap>
    <loc>${BASE_URL}/sitemap/${i}.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`
).join('\n');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps}
</sitemapindex>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (err) {
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}