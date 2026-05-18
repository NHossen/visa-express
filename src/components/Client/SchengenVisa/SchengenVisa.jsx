'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

/* ─── STATIC DATA ──────────────────────────────────────────────── */
const SCHENGEN_COUNTRY_NAMES = [
  { name: 'Austria', slug: 'austria' },
  { name: 'Belgium', slug: 'belgium' },
  { name: 'Bulgaria', slug: 'bulgaria' },
  { name: 'Croatia', slug: 'croatia' },
  { name: 'Czech Republic', slug: 'czechia' },
  { name: 'Denmark', slug: 'denmark' },
  { name: 'Estonia', slug: 'estonia' },
  { name: 'Finland', slug: 'finland' },
  { name: 'France', slug: 'france' },
  { name: 'Germany', slug: 'germany' },
  { name: 'Greece', slug: 'greece' },
  { name: 'Hungary', slug: 'hungary' },
  { name: 'Iceland', slug: 'iceland' },
  { name: 'Italy', slug: 'italy' },
  { name: 'Latvia', slug: 'latvia' },
  { name: 'Liechtenstein', slug: 'liechtenstein' },
  { name: 'Lithuania', slug: 'lithuania' },
  { name: 'Luxembourg', slug: 'luxembourg' },
  { name: 'Malta', slug: 'malta' },
  { name: 'Netherlands', slug: 'netherlands' },
  { name: 'Norway', slug: 'norway' },
  { name: 'Poland', slug: 'poland' },
  { name: 'Portugal', slug: 'portugal' },
  { name: 'Romania', slug: 'romania' },
  { name: 'Slovakia', slug: 'slovakia' },
  { name: 'Slovenia', slug: 'slovenia' },
  { name: 'Spain', slug: 'spain' },
  { name: 'Sweden', slug: 'sweden' },
  { name: 'Switzerland', slug: 'switzerland' },
];

const TOP_ROUTES = [
  { name: 'France', slug: 'france', consulate: 'French Embassy Dubai', time: '10–15 days' },
  { name: 'Germany', slug: 'germany', consulate: 'German Consulate Dubai', time: '10–15 days' },
  { name: 'Italy', slug: 'italy', consulate: 'Italian Consulate Dubai', time: '10–15 days' },
  { name: 'Spain', slug: 'spain', consulate: 'Spanish Consulate Dubai', time: '10–15 days' },
  { name: 'Greece', slug: 'greece', consulate: 'Greek Consulate Dubai', time: '10–15 days' },
  { name: 'Netherlands', slug: 'netherlands', consulate: 'Dutch Embassy Abu Dhabi', time: '10–15 days' },
];

/* ─── COUNTRY CARD COMPONENT ────────────────────────────────────── */
function SchengenCountryCard({ name, slug, flag, flagUrl }) {
  const imgSrc = flag || flagUrl || `https://flagcdn.com/w80/${slug?.slice(0, 2)}.png`;

  return (
    <Link
      href={`/visa/tourist-visa/${slug}`}
      className="group flex flex-col items-center gap-2 p-4 bg-white border border-slate-100 rounded-2xl hover:border-amber-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center"
    >
      <div className="relative w-12 h-8 rounded-md overflow-hidden shadow-sm border border-slate-100 bg-slate-50">
        <img
          src={imgSrc}
          alt={`${name} flag`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
      <span className="text-xs font-bold text-slate-700 group-hover:text-amber-700 transition-colors leading-tight">{name}</span>
      <span className="text-[9px] font-semibold text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">Apply →</span>
    </Link>
  );
}

/* ─── LOADING SKELETON ──────────────────────────────────────────── */
function CountrySkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl animate-pulse">
      <div className="w-12 h-8 bg-slate-200 rounded-md" />
      <div className="w-16 h-3 bg-slate-200 rounded" />
    </div>
  );
}

/* ─── MAIN CLIENT COMPONENT ─────────────────────────────────────── */
/**
 * SchengenCountriesSection
 *
 * Client Component — fetches country flag data from /api/countries,
 * merges it with the static Schengen list, and renders:
 *   1. The 29-country flag grid
 *   2. The dark "Tourist Visa by Country" hub
 *   3. The "Most Popular Routes" cards inside the consulate section
 *   4. The sidebar country list
 *
 * All four are exported individually so the server page can place them
 * exactly where it needs them. They all share the same data fetch via
 * the parent <SchengenCountriesSection> context — but since React
 * doesn't support context across RSC boundaries cleanly, we expose
 * a single top-level component that accepts a `render` prop (render-prop
 * pattern) so the server page can import just what it needs.
 *
 * Simpler approach used here: export the full component and four
 * named sub-exports that each do their own lightweight fetch (cached
 * by the browser on the same request anyway).
 */
export default function SchengenCountriesSection({ variant = 'grid' }) {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch('/api/countries');
        if (!res.ok) throw new Error('Failed to fetch country data');
        const data = await res.json();

        const dbMap = {};
        data.forEach((c) => {
          if (c.country) dbMap[c.country.trim()] = c;
        });

        const merged = SCHENGEN_COUNTRY_NAMES.map((sc) => {
          const dbEntry = dbMap[sc.name] || {};
          return {
            name: sc.name,
            slug: sc.slug,
            flag: dbEntry.flag || null,
            code: dbEntry.code || sc.slug.slice(0, 2),
            flagUrl: dbEntry.flag || `https://flagcdn.com/w80/${(dbEntry.code || sc.slug.slice(0, 2)).toLowerCase()}.png`,
          };
        });

        setCountries(merged);
      } catch (err) {
        setError(err.message);
        const fallback = SCHENGEN_COUNTRY_NAMES.map((sc) => ({
          name: sc.name,
          slug: sc.slug,
          flag: null,
          code: sc.slug.slice(0, 2),
          flagUrl: `https://flagcdn.com/w80/${sc.slug.slice(0, 2)}.png`,
        }));
        setCountries(fallback);
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, []);

  /* ── FLAG GRID ── */
  if (variant === 'grid') {
    return (
      <>
        {error && (
          <div className="mb-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-semibold">
            ⚠️ Using fallback flag data — {error}
          </div>
        )}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3" role="list" aria-label="Schengen member countries">
          {loading
            ? Array.from({ length: 29 }).map((_, i) => <CountrySkeleton key={i} />)
            : countries.map((c) => <SchengenCountryCard key={c.name} {...c} />)}
        </div>
      </>
    );
  }

  /* ── DARK HUB (country-specific visa links) ── */
  if (variant === 'dark-hub') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {loading
          ? Array.from({ length: 29 }).map((_, i) => (
              <div key={i} className="h-10 bg-slate-700 rounded-xl animate-pulse" />
            ))
          : countries.map((c) => (
              <Link
                key={c.name}
                href={`/visa/tourist-visa/${c.slug}`}
                className="group flex items-center gap-2.5 px-3 py-2.5 bg-slate-800 hover:bg-amber-400 border border-slate-700 hover:border-amber-400 rounded-xl transition-all duration-150"
              >
                <div className="w-6 h-4 rounded overflow-hidden shrink-0 bg-slate-600">
                  <img
                    src={c.flag || c.flagUrl}
                    alt={c.name}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <span className="text-xs font-semibold text-slate-300 group-hover:text-slate-900 transition-colors truncate leading-tight">
                  {c.name} Visa
                </span>
                <span className="ml-auto text-slate-600 group-hover:text-slate-800 text-xs font-bold transition-colors">›</span>
              </Link>
            ))}
      </div>
    );
  }

  /* ── TOP ROUTES (popular consulate cards) ── */
  if (variant === 'top-routes') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TOP_ROUTES.map((r) => {
          const countryData = countries.find((c) => c.name === r.name);
          const flagSrc = countryData?.flag || countryData?.flagUrl || `https://flagcdn.com/w80/${r.slug.slice(0, 2)}.png`;
          return (
            <Link
              key={r.name}
              href={`/visa/tourist-visa/${r.slug}`}
              className="group flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all"
            >
              <div className="w-10 h-7 rounded overflow-hidden shrink-0 shadow-sm border border-slate-100 bg-slate-100">
                <img src={flagSrc} alt={r.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-slate-900 group-hover:text-amber-700 transition-colors">{r.name} Schengen Visa</p>
                <p className="text-[11px] text-slate-400">{r.consulate} · {r.time}</p>
              </div>
              <span className="text-slate-300 group-hover:text-amber-500 font-bold text-lg shrink-0 transition-colors">›</span>
            </Link>
          );
        })}
      </div>
    );
  }

  /* ── SIDEBAR LIST ── */
  if (variant === 'sidebar') {
    return (
      <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
        {loading
          ? Array.from({ length: 10 }).map((_, i) => <div key={i} className="h-8 bg-slate-100 rounded-lg animate-pulse" />)
          : countries.map((c) => (
              <Link
                key={c.name}
                href={`/visa/tourist-visa/${c.slug}`}
                className="group flex items-center gap-2.5 p-2 rounded-lg hover:bg-amber-50 hover:border-amber-200 border border-transparent transition-all"
              >
                <div className="w-6 h-4 rounded overflow-hidden shrink-0 bg-slate-100">
                  <img src={c.flag || c.flagUrl} alt={c.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                </div>
                <span className="text-xs font-semibold text-slate-600 group-hover:text-amber-700 transition-colors flex-1">{c.name}</span>
                <span className="text-slate-300 group-hover:text-amber-500 text-xs transition-colors">›</span>
              </Link>
            ))}
      </div>
    );
  }

  return null;
}