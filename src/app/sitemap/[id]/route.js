// app/sitemap/[id]/route.js

import { getCountries } from '@/app/lib/sitemapData';
import { buildAllRoutes } from '@/app/lib/sitemapRoutes';

export const dynamic = 'force-dynamic'; // ← CRITICAL: skip static generation
export const revalidate = 3600;         // re-generate every hour

const PAGE_SIZE = 50_000;

// Module-level cache (reused across warm invocations)
let _cachedRoutes = null;

async function getAllRoutes() {
  if (_cachedRoutes) return _cachedRoutes;
  const countries = await getCountries();
  _cachedRoutes = buildAllRoutes(countries);
  console.log(`[sitemap] Total URLs: ${_cachedRoutes.length.toLocaleString()}`);
  return _cachedRoutes;
}

function buildXml(urls) {
  const entries = urls
    .map(
      ({ url, lastmod, priority, changeFreq }) =>
        `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changeFreq}</changefreq>
    <priority>${Number(priority).toFixed(1)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
}

export async function GET(request, { params }) {
  const rawId = (await params).id.replace(/\.xml$/, '');
  const id = parseInt(rawId, 10);

  if (isNaN(id) || id < 0) {
    return new Response('Invalid sitemap ID', { status: 400 });
  }

  try {
    const all = await getAllRoutes();
    const total = all.length;
    const chunkCount = Math.ceil(total / PAGE_SIZE);

    if (id >= chunkCount) {
      return new Response(
        `Sitemap chunk ${id} not found. Valid range: 0–${chunkCount - 1}`,
        { status: 404 }
      );
    }

    const start = id * PAGE_SIZE;
    const chunk = all.slice(start, start + PAGE_SIZE);

    console.log(
      `[sitemap] Chunk ${id}: ${start.toLocaleString()}–${(start + chunk.length).toLocaleString()} of ${total.toLocaleString()}`
    );

    return new Response(buildXml(chunk), {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (err) {
    console.error('[sitemap] Error:', err);
    return new Response(`Sitemap error: ${err.message}`, { status: 500 });
  }
}

// Remove generateStaticParams entirely — force-dynamic handles it