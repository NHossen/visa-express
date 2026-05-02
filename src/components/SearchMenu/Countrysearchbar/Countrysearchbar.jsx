"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { createSlug } from "@/app/lib/utils";
import {
  Search, X, ChevronRight, GraduationCap, Globe,
  TrendingUp, Sparkles, ArrowUpRight, Loader2, Wifi, WifiOff,
  Clock, MapPin, Trash2
} from "lucide-react";

// ── TOP STUDY DESTINATIONS ────────────────────────────────────────────────────
const TOP_STUDY = [
  { country: "Canada",           emoji: "🍁", tag: "Most Popular",      color: "#ef4444" },
  { country: "United Kingdom",   emoji: "🎡", tag: "Top Ranked",        color: "#3b82f6" },
  { country: "Australia",        emoji: "🦘", tag: "Work & Study",      color: "#f59e0b" },
  { country: "Germany",          emoji: "🏰", tag: "Free Tuition",      color: "#1d4ed8" },
  { country: "United States",    emoji: "🦅", tag: "Dream Destination", color: "#7c3aed" },
  { country: "Malaysia",         emoji: "🌴", tag: "Affordable",        color: "#059669" },
  { country: "Japan",            emoji: "⛩️",  tag: "Scholarship Rich", color: "#db2777" },
  { country: "Turkey",           emoji: "🕌", tag: "Budget Friendly",   color: "#dc2626" },
];

// ── TOP TOURIST VISA DESTINATIONS ─────────────────────────────────────────────
const TOP_VISA = [
  { country: "Thailand",              emoji: "🏝️", tag: "Visa on Arrival", color: "#f59e0b" },
  { country: "Turkey",                emoji: "🕌", tag: "E-Visa",          color: "#dc2626" },
  { country: "Malaysia",              emoji: "🌴", tag: "Easy Approval",   color: "#059669" },
  { country: "Japan",                 emoji: "⛩️",  tag: "Popular",        color: "#db2777" },
  { country: "Singapore",             emoji: "🦁", tag: "Quick Process",   color: "#2563eb" },
  { country: "United Arab Emirates",  emoji: "🏙️", tag: "Business Hub",   color: "#7c3aed" },
  { country: "United Kingdom",        emoji: "🎡", tag: "Trending",        color: "#3b82f6" },
  { country: "France",                emoji: "🗼", tag: "Schengen Zone",   color: "#0891b2" },
];

// ── STORAGE KEYS ──────────────────────────────────────────────────────────────
const RECENT_SEARCHES_KEY = "eammu_recent_searches";
const RECENT_VISITED_KEY  = "eammu_recent_visited";
const MAX_RECENT_SEARCHES = 6;
const MAX_RECENT_VISITED  = 6;

// ── HELPERS ───────────────────────────────────────────────────────────────────
function timeAgo(ts) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60)          return "just now";
  if (diff < 3600)        return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400)       return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 86400 * 7)   return `${Math.floor(diff / 86400)}d ago`;
  return new Date(ts).toLocaleDateString();
}

function getStoredVisited() {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(RECENT_VISITED_KEY) || "[]"); }
  catch { return []; }
}

function saveVisited(item) {
  const prev = getStoredVisited().filter(v => v.href !== item.href);
  const next = [item, ...prev].slice(0, MAX_RECENT_VISITED);
  localStorage.setItem(RECENT_VISITED_KEY, JSON.stringify(next));
}

function clearVisited() {
  localStorage.removeItem(RECENT_VISITED_KEY);
}

export default function CountrySearchBar({ mode = "student", className = "" }) {
  const [query,          setQuery]          = useState("");
  const [open,           setOpen]           = useState(false);
  const [activeIndex,    setActiveIndex]    = useState(-1);
  const [activeMode,     setActiveMode]     = useState(mode);
  const [countries,      setCountries]      = useState([]);
  const [loadingData,    setLoadingData]    = useState(true);
  const [fetchError,     setFetchError]     = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [recentVisited,  setRecentVisited]  = useState([]);
  const [dropPos,        setDropPos]        = useState({ top: 0, left: 0, width: 0 });
  const [mounted,        setMounted]        = useState(false);

  const inputRef = useRef(null);
  const pillRef  = useRef(null);
  const listRef  = useRef(null);
  const router   = useRouter();

  const isStudent     = activeMode === "student";
  const topList       = isStudent ? TOP_STUDY : TOP_VISA;
  const accentRing    = isStudent ? "ring-green-400/50"  : "ring-blue-400/50";
  const accentText    = isStudent ? "text-green-600"     : "text-blue-600";
  const accentBgLight = isStudent ? "bg-green-50"        : "bg-blue-50";
  const accentBorder  = isStudent ? "border-green-200"   : "border-blue-200";
  const accentHover   = isStudent
    ? "hover:border-green-300 hover:bg-green-50/60"
    : "hover:border-blue-300 hover:bg-blue-50/60";
  const accentFocus   = isStudent
    ? "border-green-300 bg-green-50/80 shadow-md scale-[1.02]"
    : "border-blue-300 bg-blue-50/80 shadow-md scale-[1.02]";

  // ── Portal mount ─────────────────────────────────────────────────────────────
  useEffect(() => { setMounted(true); }, []);

  // ── Measure pill and set dropdown position ────────────────────────────────────
  // Uses fixed positioning so dropdown escapes ANY overflow:hidden/clip ancestor
  const measurePill = useCallback(() => {
    if (!pillRef.current) return;
    const r = pillRef.current.getBoundingClientRect();
    setDropPos({ top: r.bottom + 10, left: r.left, width: r.width });
  }, []);

  useEffect(() => {
    if (!open) return;
    measurePill();
    window.addEventListener("scroll",  measurePill, true);
    window.addEventListener("resize",  measurePill);
    return () => {
      window.removeEventListener("scroll", measurePill, true);
      window.removeEventListener("resize", measurePill);
    };
  }, [open, measurePill]);

  // ── Fetch countries ───────────────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/countries")
      .then(r => { if (!r.ok) throw new Error("fetch failed"); return r.json(); })
      .then(data => { setCountries(data); setLoadingData(false); })
      .catch(() => { setFetchError(true); setLoadingData(false); });
  }, []);

  // ── Load recents from localStorage ───────────────────────────────────────────
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || "[]");
      setRecentSearches(saved.slice(0, 4));
    } catch {}
    setRecentVisited(getStoredVisited());
  }, []);

  const saveRecentSearch = (countryName) => {
    try {
      const prev = JSON.parse(localStorage.getItem(RECENT_SEARCHES_KEY) || "[]");
      const next = [countryName, ...prev.filter(c => c !== countryName)].slice(0, MAX_RECENT_SEARCHES);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
      setRecentSearches(next.slice(0, 4));
    } catch {}
  };

  // ── URL builder ───────────────────────────────────────────────────────────────
  const buildHref = useCallback((countryName) => {
    const match = countries.find(c => c.country.toLowerCase() === countryName.toLowerCase());
    const s = createSlug(match?.country || countryName);
    return activeMode === "student"
      ? `/visa/student-visa/${s}`
      : `/visa/tourist-visa/${s}-visa`;
  }, [activeMode, countries]);

  // ── Select handler ────────────────────────────────────────────────────────────
  const handleSelect = (countryName) => {
    saveRecentSearch(countryName);
    const match = countries.find(c => c.country.toLowerCase() === countryName.toLowerCase());
    const href  = buildHref(countryName);
    saveVisited({
      country:   countryName,
      code:      match?.code   ?? "",
      flag:      match?.flag   ?? "",
      mode:      activeMode,
      modeLabel: isStudent ? "Student Visa" : "Tourist Visa",
      href,
      visitedAt: Date.now(),
    });
    setRecentVisited(getStoredVisited());
    router.push(href);
    setQuery("");
    setOpen(false);
  };

  const handleClearVisited = (e) => {
    e.stopPropagation();
    clearVisited();
    setRecentVisited([]);
  };

  const handleRemoveVisited = (e, href) => {
    e.stopPropagation();
    const next = getStoredVisited().filter(v => v.href !== href);
    localStorage.setItem(RECENT_VISITED_KEY, JSON.stringify(next));
    setRecentVisited(next);
  };

  // ── Filtered results ──────────────────────────────────────────────────────────
  const filtered = query.trim().length > 0
    ? countries.filter(c => c.country.toLowerCase().includes(query.toLowerCase())).slice(0, 8)
    : [];

  const showResults  = filtered.length > 0;
  const showEmpty    = query.trim().length > 1 && filtered.length === 0;
  const showDefaults = !showResults && !showEmpty;

  // ── Keyboard navigation ───────────────────────────────────────────────────────
  const handleKeyDown = (e) => {
    const list = showResults ? filtered.map(c => ({ country: c.country })) : topList;
    if      (e.key === "ArrowDown")  { e.preventDefault(); setActiveIndex(i => Math.min(i + 1, list.length - 1)); }
    else if (e.key === "ArrowUp")    { e.preventDefault(); setActiveIndex(i => Math.max(i - 1, 0)); }
    else if (e.key === "Enter") {
      e.preventDefault();
      if (activeIndex >= 0) handleSelect(list[activeIndex].country);
      else if (filtered.length > 0) handleSelect(filtered[0].country);
    }
    else if (e.key === "Escape") { setOpen(false); setQuery(""); }
  };

  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      listRef.current.querySelectorAll("[data-item]")[activeIndex]?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  useEffect(() => { setActiveIndex(-1); }, [query, activeMode]);

  // ── Close on outside click ────────────────────────────────────────────────────
  useEffect(() => {
    const fn = (e) => {
      const inPill = pillRef.current?.contains(e.target);
      const inDrop = document.getElementById("csb-dropdown")?.contains(e.target);
      if (!inPill && !inDrop) setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  // ── Highlight match ───────────────────────────────────────────────────────────
  const hl = (text, q) => {
    if (!q.trim()) return text;
    const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    return text.split(re).map((p, i) =>
      p.toLowerCase() === q.toLowerCase()
        ? <mark key={i} className="bg-green-100 text-green-800 not-italic font-black rounded-sm px-0.5">{p}</mark>
        : p
    );
  };

  const getFlag = name => countries.find(c => c.country.toLowerCase() === name.toLowerCase())?.flag;

  // ── Dropdown JSX ─────────────────────────────────────────────────────────────
  const dropdown = (
    <div
      id="csb-dropdown"
      style={{
        position:     "fixed",
        top:          dropPos.top,
        left:         dropPos.left,
        width:        dropPos.width,
        zIndex:       999999,
        background:   "#ffffff",
        borderRadius: "1rem",
        border:       fetchError ? "1px solid #fee2e2" : "1px solid #f3f4f6",
        boxShadow:    "0 24px 80px rgba(0,0,0,0.18), 0 4px 20px rgba(0,0,0,0.08)",
        maxHeight:    `calc(100vh - ${dropPos.top + 24}px)`,
        overflowY:    "auto",
      }}
    >
      {/* ── ERROR ───────────────────────────────────────────────────── */}
      {fetchError && (
        <div className="p-6 text-center">
          <div className="text-4xl mb-3">📡</div>
          <p className="font-black text-gray-700 mb-1">Connection issue</p>
          <p className="text-sm text-gray-400 mb-4">Could not load countries. Please check your connection.</p>
          <button
            type="button"
            onMouseDown={e => {
              e.preventDefault();
              setFetchError(false); setLoadingData(true);
              fetch("/api/countries")
                .then(r => r.json())
                .then(data => { setCountries(data); setLoadingData(false); setFetchError(false); })
                .catch(() => { setFetchError(true); setLoadingData(false); });
            }}
            className="text-xs font-black text-white bg-green-600 hover:bg-green-700 px-5 py-2.5 rounded-xl transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* ── SEARCH RESULTS ──────────────────────────────────────────── */}
      {!fetchError && !loadingData && showResults && (
        <>
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-gray-50">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 flex items-center gap-1.5">
              <Search size={9} /> {filtered.length} match{filtered.length !== 1 ? "es" : ""} for &ldquo;{query}&rdquo;
            </p>
            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full ${accentBgLight} ${accentText}`}>
              {isStudent ? "Student Visa" : "Tourist Visa"}
            </span>
          </div>
          <div ref={listRef} className="px-2 py-2 space-y-0.5">
            {filtered.map((c, i) => (
              <button
                key={c.code}
                data-item
                type="button"
                onMouseDown={e => { e.preventDefault(); handleSelect(c.country); }}
                onMouseEnter={() => setActiveIndex(i)}
                className={`
                  w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-left transition-all duration-100 group
                  ${i === activeIndex ? `${accentBgLight} ring-1 ${accentBorder}` : "hover:bg-gray-50/80"}
                `}
              >
                <div className="w-10 h-[26px] rounded-lg overflow-hidden shrink-0 shadow-sm border border-gray-100">
                  <img src={c.flag} alt={c.country} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-black text-[14px] leading-tight transition-colors ${i === activeIndex ? accentText : "text-gray-800"}`}>
                    {hl(c.country, query)}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5 font-medium">
                    {isStudent ? "Student Visa Guide" : "Tourist Visa Guide"} · {c.code?.toUpperCase()}
                  </p>
                </div>
                <span className={`hidden sm:inline-flex items-center gap-1 text-[9px] font-black px-2.5 py-1.5 rounded-full uppercase tracking-wider shrink-0 ${accentBgLight} ${accentText} border ${accentBorder}`}>
                  {isStudent ? <GraduationCap size={9} /> : <Globe size={9} />}
                  {isStudent ? "Study" : "Visa"} Guide
                </span>
                <ChevronRight size={15} className={`shrink-0 transition-all ${i === activeIndex ? `${accentText} translate-x-0.5` : "text-gray-200"}`} />
              </button>
            ))}
          </div>
          <div className="px-5 py-3 bg-gray-50/80 border-t border-gray-100 flex items-center justify-between">
            <p className="text-[10px] font-bold text-gray-400">↑↓ navigate &nbsp;·&nbsp; Enter to open &nbsp;·&nbsp; Esc to close</p>
            <span className="text-[10px] font-black text-gray-400">{countries.length} total countries</span>
          </div>
        </>
      )}

      {/* ── EMPTY STATE ─────────────────────────────────────────────── */}
      {!fetchError && !loadingData && showEmpty && (
        <div className="px-6 py-10 text-center">
          <div className="text-5xl mb-3">🌍</div>
          <p className="font-black text-gray-700 mb-1 text-base">No results for &ldquo;{query}&rdquo;</p>
          <p className="text-gray-400 text-sm mb-5">Try a different spelling, or browse top destinations below.</p>
          <button
            type="button"
            onMouseDown={e => { e.preventDefault(); setQuery(""); }}
            className={`text-xs font-black ${accentText} ${accentBgLight} px-4 py-2 rounded-full border ${accentBorder} transition hover:opacity-80`}
          >
            Clear search
          </button>
        </div>
      )}

      {/* ── DEFAULTS ────────────────────────────────────────────────── */}
      {!fetchError && !loadingData && showDefaults && (
        <div className="p-4 md:p-5">

          {/* Recently Visited */}
          {recentVisited.length > 0 && (
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-gray-400 flex items-center gap-1.5">
                  <MapPin size={10} /> Recently Visited
                </p>
                <button
                  type="button"
                  onMouseDown={handleClearVisited}
                  className="flex items-center gap-1 text-[10px] font-black text-gray-300 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={10} /> Clear
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {recentVisited.map((item) => (
                  <button
                    key={item.href}
                    type="button"
                    onMouseDown={e => { e.preventDefault(); router.push(item.href); setOpen(false); }}
                    className="group flex items-center gap-3 px-3 py-2.5 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all text-left relative"
                  >
                    <div className="w-9 h-6 rounded-md overflow-hidden shrink-0 border border-gray-100 bg-gray-50">
                      {item.flag
                        ? <img src={item.flag} alt={item.country} className="w-full h-full object-cover" loading="lazy" />
                        : <span className="w-full h-full flex items-center justify-center text-xs">🌍</span>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-black text-gray-800 truncate leading-tight">{item.country}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide leading-none
                          ${item.mode === "student" ? "bg-green-50 text-green-600" : "bg-blue-50 text-blue-600"}`}>
                          {item.modeLabel}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium flex items-center gap-0.5">
                          <Clock size={8} /> {timeAgo(item.visitedAt)}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={13} className="shrink-0 text-gray-200 group-hover:text-gray-400 transition-colors" />
                    <span
                      role="button"
                      onMouseDown={e => handleRemoveVisited(e, item.href)}
                      className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 p-0.5 rounded-full hover:bg-red-50 hover:text-red-400 text-gray-300 transition-all"
                    >
                      <X size={10} />
                    </span>
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-4 mb-1" />
            </div>
          )}

          {/* Recently Searched */}
          {recentSearches.length > 0 && (
            <div className="mb-5">
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-gray-400 mb-3 flex items-center gap-1.5">
                <Clock size={10} /> Recently Searched
              </p>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map(name => {
                  const flag = getFlag(name);
                  return (
                    <button
                      key={name}
                      type="button"
                      onMouseDown={e => { e.preventDefault(); handleSelect(name); }}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 transition-all hover:shadow-sm"
                    >
                      {flag && <img src={flag} alt={name} className="w-5 h-3 object-cover rounded-sm" />}
                      {name}
                    </button>
                  );
                })}
              </div>
              <div className="border-t border-gray-100 mt-4 mb-1" />
            </div>
          )}

          {/* Top Destinations */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className={`p-1.5 rounded-lg ${accentBgLight}`}>
                {isStudent
                  ? <TrendingUp size={13} className="text-green-600" />
                  : <Sparkles   size={13} className="text-blue-600"  />
                }
              </div>
              <p className="text-[11px] font-black uppercase tracking-[0.14em] text-gray-600">
                {isStudent ? "Top Study Destinations" : "Most Popular Visa Destinations"}
              </p>
            </div>
            <span className={`text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${accentBgLight} ${accentText}`}>
              {new Date().getFullYear()} Guide
            </span>
          </div>

          <div ref={listRef} className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {topList.map((dest, i) => {
              const flag = getFlag(dest.country);
              return (
                <button
                  key={dest.country}
                  data-item
                  type="button"
                  onMouseDown={e => { e.preventDefault(); handleSelect(dest.country); }}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`
                    group relative flex items-center gap-3 p-3 rounded-xl border-2 text-left transition-all duration-150
                    ${activeIndex === i ? accentFocus : `border-gray-100 bg-gray-50/50 ${accentHover}`}
                  `}
                >
                  <div className="w-9 h-6 rounded-md overflow-hidden shrink-0 shadow-sm border border-gray-200 bg-white flex items-center justify-center">
                    {flag
                      ? <img src={flag} alt={dest.country} className="w-full h-full object-cover" loading="lazy" />
                      : <span className="text-sm">{dest.emoji}</span>
                    }
                  </div>
                  <div className="flex-1 min-w-0 pr-1">
                    <p className="font-black text-[12px] text-gray-800 truncate leading-tight mb-0.5">{dest.country}</p>
                    <span
                      className="inline-block text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide leading-none"
                      style={{ backgroundColor: dest.color + "1a", color: dest.color }}
                    >
                      {dest.tag}
                    </span>
                  </div>
                  <ArrowUpRight
                    size={11}
                    className={`absolute top-2 right-2 transition-all opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${accentText}`}
                  />
                </button>
              );
            })}
          </div>

          {/* Stats bar */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[11px] font-black text-gray-500">{countries.length} countries live</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-gray-400">·</span>
                  <span className="text-[11px] font-bold text-gray-400">Updated {new Date().getFullYear()}</span>
                </div>
              </div>
              <button
                type="button"
                onMouseDown={e => {
                  e.preventDefault();
                  router.push(isStudent ? "/visa/student-visa" : "/visa/tourist-visa");
                  setOpen(false);
                }}
                className={`flex items-center gap-1 text-xs font-black transition-colors ${accentText} hover:opacity-80`}
              >
                Browse all {countries.length}+ countries <ChevronRight size={12} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* ── SEARCH PILL ─────────────────────────────────────────────────── */}
      <div ref={pillRef} className={`relative w-full max-w-7xl mt-8 p-2 mx-auto ${className}`}>
        <div className={`
          relative flex items-stretch bg-white rounded-2xl transition-all duration-300
          ${open
            ? `shadow-[0_8px_60px_rgba(0,0,0,0.20)] ring-2 ${accentRing}`
            : "shadow-[0_4px_30px_rgba(0,0,0,0.12)] ring-1 ring-black/[0.06] hover:shadow-[0_6px_40px_rgba(0,0,0,0.16)]"
          }
        `}>

          {/* TYPE TABS */}
          <div className="flex items-center gap-1 px-2 py-2 border-r border-gray-100 shrink-0">
            {[
              { key: "student", icon: <GraduationCap size={13} />, long: "Student Visa" },
              { key: "visa",    icon: <Globe size={13} />,          long: "Tourist Visa" },
            ].map(({ key, icon, long }) => (
              <button
                key={key}
                type="button"
                onMouseDown={e => { e.preventDefault(); setActiveMode(key); setOpen(true); inputRef.current?.focus(); }}
                className={`
                  flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-black whitespace-nowrap transition-all duration-200
                  ${activeMode === key
                    ? `${key === "student" ? "bg-green-600 shadow-green-200/70" : "bg-blue-600 shadow-blue-200/70"} text-white shadow-md`
                    : "text-gray-400 hover:text-gray-700 hover:bg-gray-100/70"
                  }
                `}
              >
                {icon}
                <span className="hidden sm:inline">{long}</span>
              </button>
            ))}
          </div>

          {/* INPUT */}
          <div className="flex-1 flex items-center px-4 min-w-0 gap-3">
            {loadingData
              ? <Loader2 size={17} className="shrink-0 text-gray-300 animate-spin" />
              : fetchError
                ? <WifiOff size={17} className="shrink-0 text-red-400" />
                : <Search size={17} className={`shrink-0 transition-colors duration-200 ${open ? accentText : "text-gray-400"}`} />
            }
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setOpen(true); }}
              onFocus={() => { setOpen(true); measurePill(); }}
              onKeyDown={handleKeyDown}
              placeholder={
                loadingData  ? "Loading countries…"
                : fetchError ? "Search unavailable — try refreshing"
                : isStudent  ? `Search from ${countries.length}+ study destinations…`
                :              `Search from ${countries.length}+ visa destinations…`
              }
              disabled={loadingData || fetchError}
              className="flex-1 py-4 bg-transparent outline-none text-[15px] font-semibold text-gray-800 placeholder:text-gray-400 placeholder:font-normal min-w-0 disabled:opacity-50"
              autoComplete="off"
              spellCheck={false}
            />
            {!loadingData && !fetchError && !query && (
              <span className="hidden md:flex shrink-0 items-center gap-1 text-[10px] font-black text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
                <Wifi size={9} /> {countries.length} live
              </span>
            )}
            {query && (
              <button
                type="button"
                onMouseDown={e => { e.preventDefault(); setQuery(""); setOpen(true); inputRef.current?.focus(); }}
                className="shrink-0 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* SEARCH BUTTON */}
          <div className="flex items-center p-2 shrink-0">
            <button
              type="button"
              onMouseDown={e => {
                e.preventDefault();
                if (filtered.length > 0) handleSelect(filtered[0].country);
                else setOpen(true);
              }}
              disabled={loadingData}
              className={`
                flex items-center gap-2 px-4 md:px-7 py-3.5 rounded-xl font-black text-sm text-white
                transition-all duration-200 active:scale-[0.97] shadow-lg disabled:opacity-50
                ${isStudent ? "bg-green-600 hover:bg-green-700 shadow-green-200" : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"}
              `}
            >
              {loadingData ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </div>
      </div>

      {/* ── DROPDOWN via portal — renders at document.body, bypasses all overflow ── */}
      {open && mounted && createPortal(dropdown, document.body)}
    </>
  );
}