import { getCountries } from '@/app/lib/sitemapData';
import { getTotalRouteCount, CHUNK_SIZE } from '@/app/lib/sitemapRoutes';

export const dynamic = 'force-dynamic';

const BASE_URL = 'https://visaexpresshub.com';

export async function GET() {
  try {
    const countries  = await getCountries();
    const total      = getTotalRouteCount(countries);
    const chunkCount = Math.ceil(total / CHUNK_SIZE);
    const now        = new Date().toISOString();

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Array.from({ length: chunkCount }, (_, i) => `  <sitemap>
    <loc>${BASE_URL}/sitemap/${i}.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    });
  } catch (err) {
    console.error('[sitemap-index] Error:', err);
    return new Response(`Error: ${err.message}`, { status: 500 });
  }
}