"use client";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Globe, ChevronDown, ArrowRight, Timer, Clock, X, TrendingUp, Search } from "lucide-react";

const VISA_TYPES = [
  { value: "e-visa",           label: "E-Visa (Online)",        icon: "⚡", desc: "2–4 days" },
  { value: "sticker",          label: "Sticker Visa",           icon: "🏷️", desc: "15–21 days" },
  { value: "sticker-extended", label: "Sticker (Complex Case)", icon: "📋", desc: "45–60 days" },
  { value: "transit",          label: "Transit Visa",           icon: "🔁", desc: "6–24 hours" },
];

const POPULAR_PAIRS = [
  { from: "Bangladesh", to: "Canada",        type: "sticker"  },
  { from: "Bangladesh", to: "United Kingdom",type: "sticker"  },
  { from: "India",      to: "United States", type: "sticker"  },
  { from: "Pakistan",   to: "UAE",           type: "e-visa"   },
  { from: "Nigeria",    to: "United Kingdom",type: "sticker"  },
];

const RECENT_KEY = "vpt_recent_searches";
const MAX_RECENT = 5;

function makeSlug(nationality, destination) {
  return `${nationality.toLowerCase().replace(/\s+/g, "-")}-national-visa-processing-time-for-${destination.toLowerCase().replace(/\s+/g, "-")}`;
}

function saveRecent(from, to, type) {
  try {
    const existing = JSON.parse(localStorage.getItem(RECENT_KEY) || "[]");
    const entry = { from, to, type, ts: Date.now() };
    const deduped = existing.filter(e => !(e.from === from && e.to === to && e.type === type));
    localStorage.setItem(RECENT_KEY, JSON.stringify([entry, ...deduped].slice(0, MAX_RECENT)));
  } catch {}
}

function loadRecent() {
  try { return JSON.parse(localStorage.getItem(RECENT_KEY) || "[]"); }
  catch { return []; }
}

// ── COUNTRY PICKER ────────────────────────────────────────────────────────
function CountryPicker({ label, value, onChange, placeholder, countries, isLoading }) {
  const [open,  setOpen]  = useState(false);
  const [query, setQuery] = useState(value?.country || "");
  const ref = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => { if (!value) setQuery(""); }, [value]);
  useEffect(() => { if (value?.country && value.country !== query) setQuery(value.country); }, [value]);

  const filtered = useMemo(() => {
    if (!query) return countries.slice(0, 8);
    return countries.filter(c => c.country.toLowerCase().includes(query.toLowerCase())).slice(0, 10);
  }, [query, countries]);

  const select = (c) => { onChange(c); setQuery(c.country); setOpen(false); };
  const clear  = (e) => { e.stopPropagation(); onChange(null); setQuery(""); inputRef.current?.focus(); };

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 px-0.5">{label}</label>
      <div className="relative group">
        {/* Flag or globe */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          {value?.flag
            ? <img src={value.flag} width={22} height={15} className="object-contain rounded-[3px] shadow-sm" alt="" />
            : <Globe size={15} className="text-gray-300 group-focus-within:text-green-500 transition-colors" />
          }
        </div>

        <input
          ref={inputRef}
          className="w-full pl-9 pr-8 py-3 bg-gray-50 border-2 border-gray-100 hover:border-gray-200 focus:border-green-500 focus:bg-white rounded-xl text-[13px] font-semibold text-gray-800 placeholder:text-gray-300 outline-none transition-all duration-200"
          placeholder={isLoading ? "Loading…" : placeholder}
          value={query}
          disabled={isLoading}
          onChange={e => { setQuery(e.target.value); onChange(null); setOpen(true); }}
          onFocus={() => { if (!isLoading) setOpen(true); }}
          autoComplete="off"
        />

        {/* Clear button */}
        {value && (
          <button onMouseDown={clear} className="absolute right-2.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors z-10">
            <X size={10} className="text-gray-500" />
          </button>
        )}

        {/* Spinner */}
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-green-200 border-t-green-600 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Dropdown */}
      {open && !isLoading && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1.5 bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="max-h-52 overflow-y-auto overscroll-contain">
            {filtered.length === 0 ? (
              <div className="px-4 py-4 text-center">
                <Search size={16} className="text-gray-300 mx-auto mb-1" />
                <p className="text-xs text-gray-400">No results for <span className="font-semibold text-gray-600">"{query}"</span></p>
              </div>
            ) : filtered.map((c, i) => (
              <button
                key={c.code}
                onMouseDown={() => select(c)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 text-left transition-colors
                  ${value?.code === c.code ? "bg-green-50" : "hover:bg-gray-50"}`}
              >
                <img src={c.flag} width={22} height={15} className="object-contain rounded-[3px] shadow-sm flex-shrink-0" alt="" />
                <span className="text-[13px] font-semibold text-gray-800 flex-1">{c.country}</span>
                {value?.code === c.code && <span className="text-green-500 text-xs font-bold">✓</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── VISA TYPE PICKER ──────────────────────────────────────────────────────
function VisaTypePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const selected = VISA_TYPES.find(v => v.value === value);

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1.5 px-0.5">Visa Type</label>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2 px-3 py-3 bg-gray-50 border-2 border-gray-100 hover:border-gray-200 rounded-xl text-[13px] font-semibold text-left transition-all outline-none focus:border-green-500 focus:bg-white"
      >
        {selected ? (
          <>
            <span className="text-base leading-none">{selected.icon}</span>
            <span className="text-gray-800 flex-1 truncate">{selected.label}</span>
            <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md hidden sm:block flex-shrink-0">{selected.desc}</span>
          </>
        ) : (
          <span className="text-gray-300 flex-1">Select type…</span>
        )}
        <ChevronDown size={13} className={`text-gray-400 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1.5 bg-white border border-gray-100 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden">
          {VISA_TYPES.map(v => (
            <button
              key={v.value}
              onMouseDown={() => { onChange(v.value); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-3.5 py-3 text-left transition-colors
                ${value === v.value ? "bg-green-50" : "hover:bg-gray-50"}`}
            >
              <span className="text-base leading-none">{v.icon}</span>
              <span className={`text-[13px] font-semibold flex-1 ${value === v.value ? "text-green-800" : "text-gray-700"}`}>{v.label}</span>
              <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded-md">{v.desc}</span>
              {value === v.value && <span className="text-green-500 text-xs font-bold">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── MAIN ──────────────────────────────────────────────────────────────────
export default function VisaProcessingTime() {
  const router = useRouter();
  const [fromCountry, setFromCountry] = useState(null);
  const [toCountry,   setToCountry]   = useState(null);
  const [visaType,    setVisaType]    = useState("");
  const [error,       setError]       = useState("");
  const [countries,   setCountries]   = useState([]);
  const [isLoading,   setIsLoading]   = useState(true);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetch("/api/countries")
      .then(res => res.json())
      .then(data => { setCountries(data); setIsLoading(false); })
      .catch(err => { console.error(err); setIsLoading(false); });
    setRecentSearches(loadRecent());
  }, []);

  const handleSearch = () => {
    if (!fromCountry || !toCountry || !visaType) {
      setError(!fromCountry ? "Select your nationality." : !toCountry ? "Select destination country." : "Select a visa type.");
      return;
    }
    if (fromCountry.country === toCountry.country) {
      setError("Nationality and destination cannot be the same.");
      return;
    }
    setError("");
    saveRecent(fromCountry.country, toCountry.country, visaType);
    setRecentSearches(loadRecent());
    const slug = makeSlug(fromCountry.country, toCountry.country);
    router.push(`/visa-processing-time-tracker/${slug}?type=${visaType}`);
  };

  const applyRecent = useCallback((entry) => {
    const fc = countries.find(c => c.country === entry.from);
    const tc = countries.find(c => c.country === entry.to);
    if (fc) setFromCountry(fc);
    if (tc) setToCountry(tc);
    setVisaType(entry.type);
    setShowSuggestions(false);
  }, [countries]);

  const removeRecent = (e, idx) => {
    e.stopPropagation();
    try {
      const updated = recentSearches.filter((_, i) => i !== idx);
      localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
      setRecentSearches(updated);
    } catch {}
  };

  const visaLabel = VISA_TYPES.find(v => v.value === visaType)?.label;

  return (
    <div className="w-full max-w-7xl mx-auto px-2">
      <div className="bg-white border border-gray-100 rounded-2xl shadow-lg shadow-gray-100/60 overflow-hidden">

        {/* ── Header ── */}
        <div className="px-5 pt-5 pb-4 border-b border-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-green-700 rounded-xl flex items-center justify-center flex-shrink-0">
                <Timer size={15} className="text-white" />
              </div>
              <div>
                <p className="text-[13px] font-black text-gray-900 leading-none">Visa Processing Time Tracker</p>
                <p className="text-[10px] text-gray-400 font-medium mt-0.5">Real processing times from real applicants</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Updated monthly</span>
            </div>
          </div>
        </div>

        {/* ── Fields ── */}
        <div className="px-5 py-4">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <CountryPicker
              label="Your Nationality"
              value={fromCountry}
              onChange={v => { setFromCountry(v); setError(""); }}
              placeholder="e.g. Bangladesh"
              countries={countries}
              isLoading={isLoading}
            />

            <div className="hidden sm:flex items-end pb-3 flex-shrink-0">
              <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                <ArrowRight size={12} className="text-gray-400" />
              </div>
            </div>

            <CountryPicker
              label="Destination Country"
              value={toCountry}
              onChange={v => { setToCountry(v); setError(""); }}
              placeholder="e.g. Canada"
              countries={countries}
              isLoading={isLoading}
            />

            <VisaTypePicker value={visaType} onChange={v => { setVisaType(v); setError(""); }} />

            <div className="flex-shrink-0 flex flex-col justify-end">
              <div className="hidden sm:block h-[22px]" /> {/* spacer aligns with label height */}
              <button
                onClick={handleSearch}
                className="w-full sm:w-auto px-5 py-3 bg-green-700 hover:bg-green-800 active:scale-[0.97] text-white font-black text-[13px] rounded-xl transition-all duration-150 flex items-center justify-center gap-2 whitespace-nowrap shadow-md shadow-green-100"
              >
                <Timer size={14} />
                Check Time
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 mt-2.5 px-3 py-2 bg-red-50 border border-red-100 rounded-xl">
              <span className="text-red-400 text-sm">⚠️</span>
              <p className="text-[12px] font-semibold text-red-600">{error}</p>
            </div>
          )}
        </div>

        {/* ── Recent Searches ── */}
        {recentSearches.length > 0 && (
          <div className="px-5 pb-4 border-t border-gray-50 pt-3">
            <div className="flex items-center gap-2 mb-2">
              <Clock size={11} className="text-gray-300" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Recent Searches</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {recentSearches.map((entry, i) => {
                const typeInfo = VISA_TYPES.find(v => v.value === entry.type);
                return (
                  <button
                    key={i}
                    onClick={() => applyRecent(entry)}
                    className="group flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 hover:bg-green-50 border border-gray-100 hover:border-green-200 rounded-lg transition-all duration-150"
                  >
                    <span className="text-[11px] font-bold text-gray-600 group-hover:text-green-800">
                      {entry.from} → {entry.to}
                    </span>
                    <span className="text-[10px] text-gray-400 group-hover:text-green-600">
                      {typeInfo?.icon} {typeInfo?.label.split(" ")[0]}
                    </span>
                    <span
                      onClick={(e) => removeRecent(e, i)}
                      className="w-3.5 h-3.5 rounded-full bg-gray-200 hover:bg-red-200 flex items-center justify-center transition-colors ml-0.5"
                    >
                      <X size={8} className="text-gray-400 hover:text-red-500" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Popular / Trending ── */}
        <div className="px-5 pb-4 border-t border-gray-50 pt-3">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={11} className="text-gray-300" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Trending Searches</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_PAIRS.map((p, i) => {
              const typeInfo = VISA_TYPES.find(v => v.value === p.type);
              return (
                <button
                  key={i}
                  onClick={() => {
                    const fc = countries.find(c => c.country === p.from);
                    const tc = countries.find(c => c.country === p.to);
                    if (fc) setFromCountry(fc);
                    if (tc) setToCountry(tc);
                    setVisaType(p.type);
                    setError("");
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 rounded-lg transition-all duration-150 group"
                >
                  <span className="text-[10px] text-orange-500 font-black">{i + 1}</span>
                  <span className="text-[11px] font-bold text-gray-600 group-hover:text-blue-800">{p.from} → {p.to}</span>
                  <span className="text-[10px] text-gray-400">{typeInfo?.icon}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="px-5 py-2.5 bg-gray-50/50 border-t border-gray-50 flex items-center justify-between">
          <p className="text-[10px] text-gray-300 font-medium">195+ countries · E-Visa, Sticker, Transit & more</p>
          <p className="text-[10px] text-gray-300 font-medium hidden sm:block">Free · No signup required</p>
        </div>
         
      </div>
       <div className="mx-auto max-w-7xl px-4 mt-6">
          <p className="text-sm leading-relaxed text-slate-500 font-medium">
            <strong className="text-slate-900 font-bold">Visa Express Hub</strong> simplifies the world of international travel. We specialize in comprehensive 
            <span className="text-slate-900"> Schengen visa services</span>, 
            <span className="text-slate-900"> UK visa processing</span>, and expert guidance for 
            <span className="text-slate-900"> USA, Canada, and Australia visas</span>. 
            Whether you are a <strong className="text-slate-700">tourist</strong>, a <strong className="text-slate-700">business traveler</strong>, or a <strong className="text-slate-700">student</strong> seeking global education, our team provides complete documentation support and embassy appointment assistance. 
            From <span className="text-slate-900">Dubai visit visas</span> to specialized <span className="text-slate-900">Europe work permit guidance</span>, we ensure fast processing and strategic travel consultation to make your journey simple, secure, and successful.
          </p>
        </div>
    </div>
  );
}