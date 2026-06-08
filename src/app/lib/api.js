const BASE = "https://api.eammu.com/api/v1";

function apiUrl(path, params = {}) {
  const key = process.env.EAMMU_API_KEY;
  if (!key) throw new Error("EAMMU_API_KEY is not set in .env.local");
  const qs = new URLSearchParams({ ...params, api_key: key }).toString();
  return `${BASE}${path}?${qs}`;
}

export async function getCountries() {
  const res = await fetch(apiUrl("/countries"), { cache: "no-store" });
  if (!res.ok) throw new Error(`getCountries failed: ${res.status}`);
  return res.json();
}

export async function getVisaStatus(fromCountry, toCountry) {
  const res = await fetch(
    apiUrl("/passport", { from: fromCountry, to: toCountry }),
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`getVisaStatus failed: ${res.status}`);
  return res.json();
}

/**
 * Visa guide — append api_key even though docs say not required,
 * because the route still runs checkLimit() which needs the key.
 */
export async function getVisaGuide(guideUrl) {
  if (!guideUrl) return null;
  try {
    const key = process.env.EAMMU_API_KEY;
    const url = key ? `${guideUrl}?api_key=${key}` : guideUrl;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
