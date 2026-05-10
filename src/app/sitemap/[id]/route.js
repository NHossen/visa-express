import { getCountries } from '@/app/lib/sitemapData';
import { buildRoutesForChunk, getTotalRouteCount, CHUNK_SIZE } from '@/app/lib/sitemapRoutes';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const rawId = (await params).id.replace(/\.xml$/, '');
  const id    = parseInt(rawId, 10);

  if (isNaN(id) || id < 0) {
    return new Response('Invalid sitemap ID', { status: 400 });
  }

  try {
    const countries  = await getCountries();
    const total      = getTotalRouteCount(countries);
    const chunkCount = Math.ceil(total / CHUNK_SIZE);

    if (id >= chunkCount) {
      return new Response(`Chunk ${id} not found. Valid: 0–${chunkCount - 1}`, { status: 404 });
    }

    const routes = buildRoutesForChunk(countries, id);

    console.log(`[sitemap/${id}] ${routes.length} URLs`);

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(({ url, lastmod, changeFreq, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${Number(priority).toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
      },
    });
  } catch (err) {
    console.error(`[sitemap/${id}] Error:`, err);
    return new Response(`Sitemap error: ${err.message}`, { status: 500 });
  }
}