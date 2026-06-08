// src/app/api/visa-guide/[slug]/route.js
// Proxy to eammu visa-guides — sends API key server-side, avoids CORS & exposes key.
// Next.js 15: params is a Promise, must be awaited.

export async function GET(request, context) {
  const params = await context.params;
  const slug = params?.slug;

  const ALLOWED = ["e-visa", "visa-required", "visa-on-arrival", "eta", "no-admission"];

  if (!slug || !ALLOWED.includes(slug)) {
    return Response.json({ error: `Unknown slug: "${slug}"` }, { status: 404 });
  }

  const API_KEY = process.env.EAMMU_API_KEY;
  if (!API_KEY) {
    console.error("[visa-guide] EAMMU_API_KEY not set in .env.local");
    return Response.json({ error: "API key not configured on server" }, { status: 500 });
  }

  const url = `https://api.eammu.com/api/v1/visa-guides/${slug}?api_key=${API_KEY}`;

  try {
    const upstream = await fetch(url, {
      headers: { Accept: "application/json", "x-api-key": API_KEY },
      // No Next.js cache during dev so we always see fresh data
      cache: "no-store",
    });

    const text = await upstream.text();

    if (!upstream.ok) {
      console.error(`[visa-guide] ${upstream.status} for "${slug}":`, text.slice(0, 200));
      return Response.json(
        { error: `Upstream ${upstream.status}`, detail: text.slice(0, 200) },
        { status: upstream.status }
      );
    }

    // Parse and re-emit — lets us log the shape during development
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("[visa-guide] Non-JSON response:", text.slice(0, 300));
      return Response.json({ error: "Non-JSON response from upstream" }, { status: 502 });
    }

    console.log(`[visa-guide] "${slug}" keys:`, Object.keys(data));
    return Response.json(data);
  } catch (err) {
    console.error("[visa-guide] fetch error:", err);
    return Response.json({ error: "Network error reaching eammu API" }, { status: 502 });
  }
}