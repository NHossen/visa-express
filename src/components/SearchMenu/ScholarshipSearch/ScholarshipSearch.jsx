"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const TOP_COUNTRIES = [
  { name: "United States", code: "us" },
  { name: "United Kingdom", code: "gb" },
  { name: "Canada", code: "ca" },
  { name: "Germany", code: "de" },
  { name: "Japan", code: "jp" },
  { name: "Netherlands", code: "nl" },
];

const PROGRAM_COUNTS = {
  us: 142, gb: 98, ca: 76, au: 64, de: 88, tr: 45,
  jp: 53, fr: 61, cn: 72, nl: 39, se: 31, ch: 28,
};

const RECENT_KEY = "scholarship_recent";
const MAX_RECENT = 5;

const toSlug = (name) => name?.toLowerCase().replace(/\s+/g, "-") ?? "";

const flagUrl = (code) => `https://flagcdn.com/w40/${code.toLowerCase()}.png`;

function getRecent() {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveRecent(item) {
  const prev = getRecent().filter((r) => r.slug !== item.slug);
  const next = [{ ...item, visitedAt: Date.now() }, ...prev].slice(0, MAX_RECENT);
  localStorage.setItem(RECENT_KEY, JSON.stringify(next));
}

function Flag({ code, size = "md" }) {
  const dims = size === "sm" ? "w-[22px] h-[15px]" : "w-[26px] h-[18px]";
  return (
    <img
      src={flagUrl(code)}
      alt=""
      className={`${dims} object-cover rounded-[3px] border border-gray-100 flex-shrink-0`}
      onError={(e) => { e.currentTarget.style.display = "none"; }}
    />
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-[11px] font-medium text-gray-400 uppercase tracking-[0.08em] mb-2.5">
      {children}
    </p>
  );
}

export default function ScholarshipSearch() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [dropOpen, setDropOpen] = useState(false);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const inputRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    fetch("/api/countries")
      .then((r) => r.json())
      .then((d) => {
        setCountries(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    setRecent(getRecent());
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (!wrapRef.current?.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setDropOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const dropResults =
    query.trim().length > 1
      ? countries
          .filter((c) => c.country.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 7)
      : [];

  const topCountriesData = TOP_COUNTRIES.map((dest) => {
    const match = countries.find(
      (c) => c.country.toLowerCase() === dest.name.toLowerCase()
    );
    return {
      name: dest.name,
      code: dest.code,
      flag: match?.flag ?? flagUrl(dest.code),
      count: PROGRAM_COUNTS[dest.code] ?? null,
    };
  });

  const handleSelect = useCallback((countryName, code) => {
    const slug = toSlug(countryName);
    saveRecent({ name: countryName, code, slug });
    setRecent(getRecent());
    setDropOpen(false);
    setQuery("");
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (dropResults[0]) {
      handleSelect(dropResults[0].country, dropResults[0].code ?? "");
    }
  };

  return (
    <section className="w-full bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold bg-amber-400 p-2.5 w-[340px] rounded-lg text-[#002f72] mb-1">
            Find scholarships by country
          </h2>
          <p className="text-sm text-gray-400">
            850+ fully funded programs across 260+ countries
          </p>
        </div>

        {/* Search bar */}
        <form onSubmit={handleSearchSubmit}>
          <div className="relative mb-8" ref={wrapRef}>
            <div
              className={`flex items-center bg-white border rounded-xl transition-all duration-150 ${
                dropOpen && query ? "border-gray-300 shadow-sm" : "border-gray-200"
              }`}
            >
              {/* Search icon */}
              <span className="pl-4 text-gray-300 flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </span>

              <input
                ref={inputRef}
                type="text"
                placeholder="Search a country…"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setDropOpen(true); }}
                onFocus={() => setDropOpen(true)}
                className="flex-1 px-3 py-3 bg-transparent outline-none text-gray-800 text-sm placeholder:text-gray-300"
              />

              {query && (
                <button
                  type="button"
                  onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                  className="pr-3 text-gray-300 hover:text-gray-500 transition text-sm"
                >
                  ✕
                </button>
              )}

              <div className="w-px h-5 bg-gray-100 mx-1" />

              <Link
                href={dropResults[0] ? `/scholarships/${toSlug(dropResults[0].country)}` : "/scholarships"}
                onClick={() => dropResults[0] && handleSelect(dropResults[0].country, dropResults[0].code ?? "")}
                className="m-2.5 bg-amber-400 hover:bg-[#002f72]/90 active:scale-95 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all"
              >
                Search
              </Link>
            </div>

            {/* Dropdown */}
            <AnimatePresence>
              {dropOpen && query.trim().length > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.1 }}
                  className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50"
                >
                  {dropResults.length > 0 ? (
                    dropResults.map((c) => (
                      <Link
                        key={c.country}
                        href={`/scholarships/${toSlug(c.country)}`}
                        onClick={() => handleSelect(c.country, c.code ?? "")}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition group"
                      >
                        <img
                          src={c.flag}
                          className="w-6 h-4 object-cover rounded-[3px] border border-gray-100 flex-shrink-0"
                          alt=""
                          onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                        <span className="text-sm text-gray-700 font-medium flex-1">
                          {c.country}
                        </span>
                        {PROGRAM_COUNTS[c.code] && (
                          <span className="text-xs text-gray-400">
                            {PROGRAM_COUNTS[c.code]} programs
                          </span>
                        )}
                        <span className="text-gray-300 group-hover:text-gray-500 text-sm transition">→</span>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-sm text-gray-400">
                      No results —{" "}
                      <Link href="/scholarships" className="text-gray-700 underline underline-offset-2">
                        browse all countries
                      </Link>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>

        {/* Top countries */}
        <div className="mb-8">
          <SectionLabel>Top scholarship countries</SectionLabel>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="h-[58px] rounded-xl bg-gray-50 border border-gray-100 animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {topCountriesData.map((dest) => (
                <Link
                  key={dest.code}
                  href={`/scholarships/${toSlug(dest.name)}`}
                  onClick={() => handleSelect(dest.name, dest.code)}
                  className="flex items-center gap-2.5 px-3 py-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group"
                >
                  <img
                    src={dest.flag}
                    className="w-[26px] h-[18px] object-cover rounded-[3px] border border-gray-100 flex-shrink-0"
                    alt={dest.name}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition truncate leading-tight">
                      {dest.name}
                    </p>
                    {dest.count && (
                      <p className="text-[11px] text-gray-400 leading-tight mt-0.5">
                        {dest.count} programs
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-8" />

        {/* Recently browsed */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <SectionLabel>Recently browsed</SectionLabel>
            {recent.length > 0 && (
              <button
                onClick={() => { localStorage.removeItem(RECENT_KEY); setRecent([]); }}
                className="text-[11px] text-gray-400 hover:text-gray-600 transition"
              >
                Clear
              </button>
            )}
          </div>

          {recent.length === 0 ? (
            <p className="text-sm text-gray-400">Countries you browse will appear here.</p>
          ) : (
            <div className="flex flex-col gap-0.5">
              {recent.map((item) => (
                <Link
                  key={item.slug}
                  href={`/scholarships/${item.slug}`}
                  onClick={() => handleSelect(item.name, item.code)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-50 transition group"
                >
                  <Flag code={item.code} size="sm" />
                  <span className="text-sm text-gray-700 flex-1">{item.name}</span>
                  {PROGRAM_COUNTS[item.code] && (
                    <span className="text-xs text-gray-400">
                      {PROGRAM_COUNTS[item.code]} programs
                    </span>
                  )}
                  <span className="text-gray-300 group-hover:text-gray-500 text-sm transition">→</span>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}