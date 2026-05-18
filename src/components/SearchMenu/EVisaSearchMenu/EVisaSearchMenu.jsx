"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Flag helper ─────────────────────────────────────────────────────────────
const flagUrl = (code) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

// ─── Slug helpers ─────────────────────────────────────────────────────────────
const toSlug = (c) =>
  c.country.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
const buildUrl = (nat, dest) =>
  `/visa/e-visa/${toSlug(nat)}-e-visa-requirements-for-${toSlug(dest)}`;

// ─── Fallback country list ────────────────────────────────────────────────────
const FALLBACK = [
  { country: "Afghanistan", code: "AF" },
  { country: "Albania", code: "AL" },
  { country: "Algeria", code: "DZ" },
  { country: "Argentina", code: "AR" },
  { country: "Australia", code: "AU" },
  { country: "Austria", code: "AT" },
  { country: "Azerbaijan", code: "AZ" },
  { country: "Bahrain", code: "BH" },
  { country: "Bangladesh", code: "BD" },
  { country: "Belgium", code: "BE" },
  { country: "Brazil", code: "BR" },
  { country: "Canada", code: "CA" },
  { country: "China", code: "CN" },
  { country: "Colombia", code: "CO" },
  { country: "Croatia", code: "HR" },
  { country: "Czech Republic", code: "CZ" },
  { country: "Denmark", code: "DK" },
  { country: "Egypt", code: "EG" },
  { country: "Ethiopia", code: "ET" },
  { country: "Finland", code: "FI" },
  { country: "France", code: "FR" },
  { country: "Germany", code: "DE" },
  { country: "Ghana", code: "GH" },
  { country: "Greece", code: "GR" },
  { country: "Hungary", code: "HU" },
  { country: "India", code: "IN" },
  { country: "Indonesia", code: "ID" },
  { country: "Iran", code: "IR" },
  { country: "Iraq", code: "IQ" },
  { country: "Ireland", code: "IE" },
  { country: "Israel", code: "IL" },
  { country: "Italy", code: "IT" },
  { country: "Japan", code: "JP" },
  { country: "Jordan", code: "JO" },
  { country: "Kazakhstan", code: "KZ" },
  { country: "Kenya", code: "KE" },
  { country: "Kuwait", code: "KW" },
  { country: "Lebanon", code: "LB" },
  { country: "Libya", code: "LY" },
  { country: "Malaysia", code: "MY" },
  { country: "Mexico", code: "MX" },
  { country: "Morocco", code: "MA" },
  { country: "Myanmar", code: "MM" },
  { country: "Nepal", code: "NP" },
  { country: "Netherlands", code: "NL" },
  { country: "New Zealand", code: "NZ" },
  { country: "Nigeria", code: "NG" },
  { country: "Norway", code: "NO" },
  { country: "Oman", code: "OM" },
  { country: "Pakistan", code: "PK" },
  { country: "Palestine", code: "PS" },
  { country: "Philippines", code: "PH" },
  { country: "Poland", code: "PL" },
  { country: "Portugal", code: "PT" },
  { country: "Qatar", code: "QA" },
  { country: "Romania", code: "RO" },
  { country: "Russia", code: "RU" },
  { country: "Saudi Arabia", code: "SA" },
  { country: "Singapore", code: "SG" },
  { country: "Somalia", code: "SO" },
  { country: "South Africa", code: "ZA" },
  { country: "South Korea", code: "KR" },
  { country: "Spain", code: "ES" },
  { country: "Sri Lanka", code: "LK" },
  { country: "Sudan", code: "SD" },
  { country: "Sweden", code: "SE" },
  { country: "Switzerland", code: "CH" },
  { country: "Syria", code: "SY" },
  { country: "Taiwan", code: "TW" },
  { country: "Tanzania", code: "TZ" },
  { country: "Thailand", code: "TH" },
  { country: "Tunisia", code: "TN" },
  { country: "Turkey", code: "TR" },
  { country: "Uganda", code: "UG" },
  { country: "Ukraine", code: "UA" },
  { country: "United Arab Emirates", code: "AE" },
  { country: "United Kingdom", code: "GB" },
  { country: "United States", code: "US" },
  { country: "Uzbekistan", code: "UZ" },
  { country: "Vietnam", code: "VN" },
  { country: "Yemen", code: "YE" },
  { country: "Zimbabwe", code: "ZW" },
];

// Popular countries shown immediately on focus (before typing)
const POPULAR = ["IN", "PK", "BD", "AE", "GB", "US", "SA", "PH", "EG", "NG"];

const RECENT_KEY = "evisa_recent";
const MAX_RECENT = 5;

// ─── Highlight matching text ──────────────────────────────────────────────────
function HighlightMatch({ text, query }) {
  if (!query) return <span>{text}</span>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <span>{text}</span>;
  return (
    <span>
      {text.slice(0, idx)}
      <mark className="bg-amber-100 text-amber-800 font-bold rounded-[2px]">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </span>
  );
}

// ─── Dropdown ────────────────────────────────────────────────────────────────
function CountryDropdown({ suggestions, onSelect, query, loading, label }) {
  if (!suggestions.length && !loading) return null;

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-1.5 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
      {/* Header */}
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
          {loading ? "Searching..." : query ? `Results for "${query}"` : `Popular ${label}`}
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-6 gap-2">
          <span className="h-4 w-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
          <span className="text-xs text-slate-400">Loading countries…</span>
        </div>
      ) : (
        <div className="max-h-64 overflow-y-auto overscroll-contain">
          {suggestions.map((c) => (
            <button
              key={c.code}
              onMouseDown={(e) => {
                e.preventDefault();
                onSelect(c);
              }}
              onTouchEnd={(e) => {
                e.preventDefault();
                onSelect(c);
              }}
              className="flex w-full items-center gap-3 border-b border-gray-50/80 px-4 py-3 text-left last:border-b-0 hover:bg-amber-50 active:bg-amber-100 transition-colors"
            >
              <div className="relative shrink-0">
                <img
                  src={flagUrl(c.code)}
                  alt={c.country}
                  className="h-5 w-7 rounded object-cover shadow-sm"
                  loading="lazy"
                />
              </div>
              <span className="flex-1 text-sm font-medium text-slate-700">
                <HighlightMatch text={c.country} query={query} />
              </span>
              <span className="shrink-0 text-[10px] font-bold text-slate-300 bg-gray-50 rounded px-1.5 py-0.5">
                {c.code}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Country Field ────────────────────────────────────────────────────────────
function CountryField({
  label, icon, placeholder, value, selected,
  suggestions, onChange, onFocus, onSelect,
  query, loading, inputRef,
}) {
  return (
    <div className="relative flex-1 min-w-0">
      <p className="mb-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1">
        <span>{icon}</span> {label}
      </p>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          className={`w-full rounded-xl border py-3 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none transition-all
            ${selected
              ? "border-emerald-300 bg-emerald-50/40 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/10"
              : "border-gray-200 bg-gray-50/60 focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-400/15"
            }`}
        />
        {/* Clear button */}
        {value && (
          <button
            onMouseDown={(e) => { e.preventDefault(); onChange(""); }}
            className="absolute right-9 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors p-0.5"
            tabIndex={-1}
            aria-label="Clear"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
              <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        )}
        {/* Flag / tick */}
        {selected ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <img src={flagUrl(selected.code)} alt="" className="h-4 w-5 rounded-[2px] object-cover" />
            <svg className="w-3 h-3 text-emerald-500" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        ) : loading ? (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <span className="h-3.5 w-3.5 rounded-full border-2 border-amber-400 border-t-transparent animate-spin block" />
          </div>
        ) : null}
      </div>
      <CountryDropdown
        suggestions={suggestions}
        onSelect={onSelect}
        query={query}
        loading={loading}
        label={label}
      />
    </div>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { num: 1, icon: "🌍", title: "Your nationality", desc: "Type your home country" },
    { num: 2, icon: "✈️", title: "Pick destination", desc: "Where you're traveling" },
    { num: 3, icon: "📋", title: "Get requirements", desc: "Docs, fees & timing" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5">
      {steps.map((s) => (
        <div
          key={s.num}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 rounded-xl border border-gray-100 bg-gray-50/60 p-3 sm:p-4"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg">
            {s.icon}
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-700 leading-tight">{s.title}</p>
            <p className="text-[10px] leading-relaxed text-slate-400 hidden sm:block">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Result Bar ───────────────────────────────────────────────────────────────
function ResultBar({ nat, dest }) {
  if (!nat || !dest) return null;
  const url = buildUrl(nat, dest);
  return (
    <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 px-4 py-3.5">
      <div className="flex items-center gap-2 shrink-0">
        <img src={flagUrl(nat.code)} alt={nat.country} className="h-5 w-7 rounded object-cover shadow-sm" />
        <span className="text-base">→</span>
        <img src={flagUrl(dest.code)} alt={dest.country} className="h-5 w-7 rounded object-cover shadow-sm" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-amber-900 truncate">
          {nat.country} → {dest.country} e-Visa Guide
        </p>
        <p className="text-[11px] text-amber-600 mt-0.5">Click to view documents, fees & processing time</p>
      </div>
      <a
        href={url}
        className="shrink-0 flex items-center gap-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 active:bg-amber-700 px-4 py-2 text-xs font-bold text-white transition-all shadow-sm w-full sm:w-auto justify-center"
      >
        View Guide
        <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
          <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </a>
    </div>
  );
}

// ─── Recent Searches ──────────────────────────────────────────────────────────
function RecentSearches({ items, onPick, onClear }) {
  if (!items.length) return null;
  return (
    <div className="mt-5">
      <p className="mb-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
        🕐 Recent searches
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((r, i) => (
          <button
            key={i}
            onClick={() => onPick(r)}
            className="group flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-all hover:border-amber-300 hover:bg-amber-50 active:scale-95 shadow-sm"
          >
            <img src={flagUrl(r.nat.code)} alt="" className="h-3.5 w-5 rounded-[2px] object-cover" />
            <span className="font-semibold">{r.nat.code}</span>
            <span className="text-slate-300">→</span>
            <img src={flagUrl(r.dest.code)} alt="" className="h-3.5 w-5 rounded-[2px] object-cover" />
            <span className="font-semibold">{r.dest.code}</span>
          </button>
        ))}
        <button
          onClick={onClear}
          className="text-[11px] text-slate-400 underline hover:text-slate-600 transition-colors self-center"
        >
          Clear all
        </button>
      </div>
    </div>
  );
}

// ─── Trust Badges ─────────────────────────────────────────────────────────────
function TrustBadges() {
  const badges = [
    { icon: "🌐", text: "150+ countries" },
    { icon: "🔄", text: "Updated 2026" },
    { icon: "🆓", text: "Free to check" },
    { icon: "⚡", text: "Instant results" },
  ];
  return (
    <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
      {badges.map((b) => (
        <span key={b.text} className="flex items-center gap-1.5 text-xs text-slate-400">
          <span>{b.icon}</span>
          <span>{b.text}</span>
        </span>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function EVisaSearchMenu() {
  const [countries, setCountries] = useState(FALLBACK);
  const [loadingCountries, setLoadingCountries] = useState(true);

  const [natQuery, setNatQuery] = useState("");
  const [destQuery, setDestQuery] = useState("");
  const [selNat, setSelNat] = useState(null);
  const [selDest, setSelDest] = useState(null);

  const [showNat, setShowNat] = useState(false);
  const [showDest, setShowDest] = useState(false);

  const [recentSearches, setRecentSearches] = useState([]);
  const [result, setResult] = useState(null);

  const wrapRef = useRef(null);
  const natInputRef = useRef(null);
  const destInputRef = useRef(null);

  // ── Load countries — tries API first, falls back to FALLBACK ─────────────
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/countries");
        if (!res.ok) throw new Error("API failed");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          // Normalise: support {country, code}, {name, iso2}, {country, iso_code} etc.
          const normalised = data.map((c) => ({
            country: c.country || c.name || c.countryName || "",
            code:    (c.code || c.iso2 || c.iso_code || c.alpha2 || "").toUpperCase(),
          })).filter((c) => c.country && c.code);
          if (normalised.length > 0) setCountries(normalised);
        }
      } catch {
        // silently keep FALLBACK
      } finally {
        setLoadingCountries(false);
      }
    }
    load();
  }, []);

  // ── Load recent from localStorage ────────────────────────────────────────
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
      setRecentSearches(stored);
    } catch {}
  }, []);

  // ── Close dropdowns on outside click / touch ──────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setShowNat(false);
        setShowDest(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  // ── Popular countries shown on focus before typing ────────────────────────
  const popularCountries = POPULAR
    .map((code) => countries.find((c) => c.code === code))
    .filter(Boolean);

  // ── Filter logic ──────────────────────────────────────────────────────────
  const getFilteredCountries = (query) => {
    if (!query || query.trim() === "") return popularCountries;
    const q = query.toLowerCase().trim();
    return countries
      .filter(
        (c) =>
          c.country.toLowerCase().includes(q) ||
          c.code.toLowerCase().includes(q)
      )
      .slice(0, 8);
  };

  const natSuggestions  = showNat  ? getFilteredCountries(natQuery)  : [];
  const destSuggestions = showDest ? getFilteredCountries(destQuery) : [];

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleNatChange = (val) => {
    setNatQuery(val);
    setSelNat(null);
    setShowNat(true);
    setResult(null);
  };

  const handleDestChange = (val) => {
    setDestQuery(val);
    setSelDest(null);
    setShowDest(true);
    setResult(null);
  };

  const handleNatSelect = (c) => {
    setSelNat(c);
    setNatQuery(c.country);
    setShowNat(false);
    // Auto-focus destination after selecting nationality
    setTimeout(() => destInputRef.current?.focus(), 80);
  };

  const handleDestSelect = (c) => {
    setSelDest(c);
    setDestQuery(c.country);
    setShowDest(false);
  };

  const saveRecent = useCallback((nat, dest) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (r) => !(r.nat.code === nat.code && r.dest.code === dest.code)
      );
      const updated = [{ nat, dest, ts: Date.now() }, ...filtered].slice(0, MAX_RECENT);
      try { localStorage.setItem(RECENT_KEY, JSON.stringify(updated)); } catch {}
      return updated;
    });
  }, []);

  const handleSearch = () => {
    if (!selNat || !selDest) return;
    saveRecent(selNat, selDest);
    setResult({ nat: selNat, dest: selDest });
  };

  const handleRecentPick = (r) => {
    setSelNat(r.nat);
    setNatQuery(r.nat.country);
    setSelDest(r.dest);
    setDestQuery(r.dest.country);
    setResult({ nat: r.nat, dest: r.dest });
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
    try { localStorage.removeItem(RECENT_KEY); } catch {}
  };

  const btnReady = Boolean(selNat && selDest);

  return (
    <section className="w-full bg-white py-10 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ── Badge ── */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 mb-4 sm:mb-5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">
            2026 Visa Database Live
          </span>
        </div>

        {/* ── Heading ── */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-2 leading-tight">
          Check your{" "}
          <span className="text-amber-500">e-visa</span> eligibility
        </h2>
        <p className="text-slate-500 text-sm sm:text-base mb-6 max-w-xl">
          Enter your nationality and destination — get visa requirements, fees, and processing time instantly.
        </p>

        {/* ── How it works ── */}
        <HowItWorks />

        {/* ── Search Card ── */}
        <div
          ref={wrapRef}
          className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-6 shadow-[0_20px_60px_-12px_rgba(0,0,0,0.08)]"
        >
          {/* Fields: stacked on mobile, row on sm+ */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3 sm:gap-2 mb-3">

            <CountryField
              label="Your nationality"
              icon="🌍"
              placeholder="e.g. India, Pakistan…"
              value={natQuery}
              selected={selNat}
              suggestions={natSuggestions}
              onChange={handleNatChange}
              onFocus={() => setShowNat(true)}
              onSelect={handleNatSelect}
              query={natQuery}
              loading={loadingCountries && showNat}
              inputRef={natInputRef}
            />

            {/* Arrow divider — desktop only */}
            <div className="hidden sm:flex items-center pb-3 text-slate-300 text-lg">→</div>

            <CountryField
              label="Destination country"
              icon="✈️"
              placeholder="e.g. UAE, Thailand…"
              value={destQuery}
              selected={selDest}
              suggestions={destSuggestions}
              onChange={handleDestChange}
              onFocus={() => setShowDest(true)}
              onSelect={handleDestSelect}
              query={destQuery}
              loading={loadingCountries && showDest}
              inputRef={destInputRef}
            />

            {/* Search Button */}
            <button
              onClick={handleSearch}
              disabled={!btnReady}
              className={`flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold tracking-wide transition-all active:scale-[.97] w-full sm:w-auto sm:shrink-0 sm:self-end mt-1 sm:mt-0
                ${btnReady
                  ? "bg-slate-900 text-white hover:bg-black shadow-lg shadow-slate-900/20"
                  : "cursor-not-allowed bg-gray-100 text-slate-400"
                }`}
            >
              <span>🔍</span>
              <span>{btnReady ? "Check Eligibility" : "Select Route"}</span>
            </button>
          </div>

          {/* Helper hint */}
          {!btnReady && (
            <p className="text-[11px] text-slate-400 flex items-center gap-1">
              <span>💡</span>
              {!selNat
                ? "Start by typing your nationality above"
                : "Now type your destination country"}
            </p>
          )}

          {/* Result bar */}
          {result && <ResultBar nat={result.nat} dest={result.dest} />}
        </div>

        {/* ── Recent Searches ── */}
        <RecentSearches
          items={recentSearches}
          onPick={handleRecentPick}
          onClear={handleClearRecent}
        />

        {/* ── Trust Badges ── */}
        <TrustBadges />
      </div>
    </section>
  );
}