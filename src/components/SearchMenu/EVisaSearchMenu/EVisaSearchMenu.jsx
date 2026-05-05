"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Flag helper ────────────────────────────────────────────────────────────
const flagUrl = (code) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

// ─── Slug helpers ────────────────────────────────────────────────────────────
const toSlug = (c) =>
  c.country.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
const buildUrl = (nat, dest) =>
  `/visa/e-visa/${toSlug(nat)}-e-visa-requirements-for-${toSlug(dest)}`;

// ─── Fallback country list ───────────────────────────────────────────────────
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

const RECENT_KEY = "evisa_recent";
const MAX_RECENT = 5;

// ─── Sub-components ──────────────────────────────────────────────────────────

function HowItWorks() {
  const steps = [
    { num: 1, title: "Select nationality", desc: "Type your home country" },
    { num: 2, title: "Pick destination", desc: "Where you're traveling to" },
    { num: 3, title: "Get requirements", desc: "Docs, fees & processing time" },
  ];
  return (
    <div className="flex overflow-hidden rounded-xl border border-gray-100 bg-gray-50/60 mb-5">
      {steps.map((s, i) => (
        <div
          key={s.num}
          className={`flex flex-1 items-start gap-3 p-4 ${
            i < steps.length - 1 ? "border-r border-gray-100" : ""
          }`}
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 text-xs font-bold text-amber-700">
            {s.num}
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-700">{s.title}</p>
            <p className="text-[11px] leading-relaxed text-slate-400">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CountryDropdown({ suggestions, onSelect }) {
  if (!suggestions.length) return null;
  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-1.5 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
      {suggestions.map((c) => (
        <button
          key={c.code}
          onMouseDown={(e) => {
            e.preventDefault();
            onSelect(c);
          }}
          className="flex w-full items-center gap-3 border-b border-gray-50 px-4 py-3 text-left last:border-b-0 hover:bg-amber-50 transition-colors"
        >
          <img
            src={flagUrl(c.code)}
            alt={c.country}
            className="h-4 w-6 rounded-sm object-cover shadow-sm"
            loading="lazy"
          />
          <span className="text-sm font-medium text-slate-700">{c.country}</span>
          <span className="ml-auto text-[11px] text-slate-400">{c.code}</span>
        </button>
      ))}
    </div>
  );
}

function CountryField({ id, label, icon, placeholder, value, selected, suggestions, onChange, onFocus, onSelect }) {
  return (
    <div className="relative flex-1 min-w-0" id={id}>
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
        {icon} {label}
      </p>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          autoComplete="off"
          className="w-full rounded-lg border border-gray-200 bg-gray-50/50 py-2.5 pl-3 pr-10 text-xs font-medium text-slate-700 outline-none transition-all focus:border-amber-400 focus:bg-white focus:ring-2 focus:ring-amber-400/10"
        />
        {selected && (
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <img
              src={flagUrl(selected.code)}
              alt={selected.country}
              className="h-3.5 w-5 rounded-[2px] object-cover"
            />
            <span className="text-[10px] font-semibold text-emerald-600">✓</span>
          </div>
        )}
      </div>
      <CountryDropdown suggestions={suggestions} onSelect={onSelect} />
    </div>
  );
}

function ResultBar({ nat, dest }) {
  if (!nat || !dest) return null;
  const url = buildUrl(nat, dest);
  return (
    <div className="mt-4 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 animate-fade-in">
      <div className="flex items-center gap-1.5 shrink-0">
        <img src={flagUrl(nat.code)} alt={nat.country} className="h-4 w-6 rounded-sm object-cover" />
        <span className="text-xs text-amber-700">→</span>
        <img src={flagUrl(dest.code)} alt={dest.country} className="h-4 w-6 rounded-sm object-cover" />
      </div>
      <p className="flex-1 text-xs font-medium text-amber-800 truncate">
        {nat.country} → {dest.country} e-visa guide
      </p>
      <a
        href={url}
        className="shrink-0 text-xs font-semibold text-amber-700 underline hover:text-amber-900"
      >
        View →
      </a>
    </div>
  );
}

function RecentSearches({ items, onPick, onClear }) {
  if (!items.length) return null;
  return (
    <div className="mt-5">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
        🕐 Recent searches
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((r, i) => (
          <button
            key={i}
            onClick={() => onPick(r)}
            className="group flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-all hover:border-gray-300 hover:bg-gray-50"
          >
            <img src={flagUrl(r.nat.code)} alt="" className="h-3 w-4 rounded-[1px] object-cover" />
            <span>{r.nat.code}</span>
            <span className="text-slate-400">→</span>
            <img src={flagUrl(r.dest.code)} alt="" className="h-3 w-4 rounded-[1px] object-cover" />
            <span>{r.dest.code}</span>
          </button>
        ))}
        <button
          onClick={onClear}
          className="text-[11px] text-slate-400 underline hover:text-slate-600 transition-colors"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function EVisaSearchMenu() {
  const [countries, setCountries] = useState(FALLBACK);
  const [natQuery, setNatQuery] = useState("");
  const [destQuery, setDestQuery] = useState("");
  const [selNat, setSelNat] = useState(null);
  const [selDest, setSelDest] = useState(null);
  const [showNat, setShowNat] = useState(false);
  const [showDest, setShowDest] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [result, setResult] = useState(null);

  const wrapRef = useRef(null);

  // ── Load countries from API ────────────────────────────────────────────────
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/countries");
        if (!res.ok) throw new Error("API failed");
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) setCountries(data);
      } catch {
        // use FALLBACK silently
      }
    }
    load();
  }, []);

  // ── Load recent searches from localStorage ─────────────────────────────────
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
      setRecentSearches(stored);
    } catch {}
  }, []);

  // ── Close dropdowns on outside click ──────────────────────────────────────
  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setShowNat(false);
        setShowDest(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ── Filter suggestions ─────────────────────────────────────────────────────
  const natSuggestions = showNat && natQuery.length > 0
    ? countries.filter((c) => c.country.toLowerCase().includes(natQuery.toLowerCase())).slice(0, 7)
    : [];

  const destSuggestions = showDest && destQuery.length > 0
    ? countries.filter((c) => c.country.toLowerCase().includes(destQuery.toLowerCase())).slice(0, 7)
    : [];

  // ── Handlers ───────────────────────────────────────────────────────────────
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
  const btnLabel = selNat && selDest
    ? `Check ${selNat.country} → ${selDest.country} visa`
    : selNat
    ? "Now pick your destination"
    : "Select both countries to continue";

  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* ── Header ── */}
        <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1.5 mb-5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800">
            2026 Visa Database Live
          </span>
        </div>

        <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
          Check your{" "}
          <span className="text-amber-500">e-visa</span> eligibility
        </h2>
        <p className="text-slate-500 text-sm mb-6">
          Enter your nationality and destination — we'll show you what visa you need in seconds.
        </p>

        {/* ── How it works ── */}
        <HowItWorks />

        {/* ── Search card ── */}
        <div
          ref={wrapRef}
          className="rounded-2xl border border-gray-100 bg-white p-6 shadow-[0_20px_48px_-12px_rgba(0,0,0,0.06)]"
        >
          {/* Fields row — always same row */}
          <div className="flex flex-row items-end gap-2 mb-3">
            <CountryField
              id="nat-field"
              label="Your nationality"
              icon="🌍"
              placeholder="e.g. India, Pakistan..."
              value={natQuery}
              selected={selNat}
              suggestions={natSuggestions}
              onChange={handleNatChange}
              onFocus={() => { if (natQuery) setShowNat(true); }}
              onSelect={handleNatSelect}
            />
            <div className="text-slate-300 text-base select-none pb-2.5">→</div>
            <CountryField
              id="dest-field"
              label="Destination country"
              icon="✈️"
              placeholder="e.g. UAE, Thailand..."
              value={destQuery}
              selected={selDest}
              suggestions={destSuggestions}
              onChange={handleDestChange}
              onFocus={() => { if (destQuery) setShowDest(true); }}
              onSelect={handleDestSelect}
            />
            {/* Search button inline */}
            <button
              onClick={handleSearch}
              disabled={!btnReady}
              className={`shrink-0 flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-xs font-bold tracking-wide transition-all active:scale-[.98] whitespace-nowrap ${
                btnReady
                  ? "bg-slate-900 text-white hover:bg-black shadow-md"
                  : "cursor-not-allowed bg-gray-100 text-slate-400"
              }`}
            >
              <span>🔍</span>
              <span>{btnReady ? "Check Eligibility" : "Select Route"}</span>
            </button>
          </div>

          {/* Result bar */}
          {result && <ResultBar nat={result.nat} dest={result.dest} />}
        </div>

        {/* ── Recent searches ── */}
        <RecentSearches
          items={recentSearches}
          onPick={handleRecentPick}
          onClear={handleClearRecent}
        />

        {/* ── Footer note ── */}
        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
          <span>✦ Official e-visa portals for 150+ countries</span>
          <span className="text-slate-200">|</span>
          <span>Updated for 2026</span>
          <span className="text-slate-200">|</span>
          <span>Free to check</span>
        </div>
      </div>
    </section>
  );
}