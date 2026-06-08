"use client";

import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  GraduationCap,
  Clock,
  FileText,
  BookOpen,
  ChevronRight as ChevronRightIcon,
  Search,
} from 'lucide-react';

import { createSlug } from '@/app/lib/utils';

// ─── eammu API ────────────────────────────────────────────────────────────────
const EAMMU_KEY  = process.env.NEXT_PUBLIC_EAMMU_API_KEY;
const EAMMU_BASE = "https://api.eammu.com/api/v1";

const VISA_STATUS_META = {
  "visa required":   { color: "#DC2626", light: "#FFF5F5", label: "Visa Required"  },
  "e-visa":          { color: "#2563EB", light: "#EFF6FF", label: "E-Visa"          },
  "visa on arrival": { color: "#059669", light: "#ECFDF5", label: "Visa on Arrival" },
  "eta":             { color: "#7C3AED", light: "#F5F3FF", label: "ETA"             },
  "no admission":    { color: "#B45309", light: "#FFFBEB", label: "No Admission"    },
};

function extractGuideSlug(url) {
  if (!url) return null;
  const part = url.split("/visa-guides/")[1];
  if (!part) return null;
  return part.split("?")[0].split("#")[0].trim() || null;
}

// Live-search input powered by eammu /suggest
function VisaCountryInput({ label, placeholder, value, onChange, excludeCode }) {
  const [query,       setQuery]       = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open,        setOpen]        = useState(false);
  const [focused,     setFocused]     = useState(false);
  const [busy,        setBusy]        = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false); setFocused(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    if (query.length < 1) { setSuggestions([]); setOpen(false); return; }
    const t = setTimeout(async () => {
      setBusy(true);
      try {
        const r = await fetch(`${EAMMU_BASE}/suggest?q=${encodeURIComponent(query)}&api_key=${EAMMU_KEY}`);
        const d = await r.json();
        const list = (d.suggestions || []).filter(s => s.code !== excludeCode);
        setSuggestions(list); setOpen(list.length > 0);
      } catch { setSuggestions([]); }
      finally { setBusy(false); }
    }, 220);
    return () => clearTimeout(t);
  }, [query, excludeCode]);

  const handleFocus = async () => {
    setFocused(true);
    if (value || query.length > 0) return;
    setBusy(true);
    try {
      const r = await fetch(`${EAMMU_BASE}/suggest?q=a&api_key=${EAMMU_KEY}`);
      const d = await r.json();
      const list = (d.suggestions || []).filter(s => s.code !== excludeCode);
      if (list.length > 0) { setSuggestions(list); setOpen(true); }
    } catch {}
    finally { setBusy(false); }
  };

  const pick  = (s) => { onChange(s); setQuery(""); setSuggestions([]); setOpen(false); setFocused(false); };
  const clear = ()  => { onChange(null); setQuery(""); setSuggestions([]); };

  return (
    <div ref={ref} className="relative flex-1 min-w-0">
      <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border transition-all
        ${focused
          ? "border-yellow-400 bg-white shadow-sm"
          : value ? "border-slate-200 bg-slate-50/70" : "border-slate-100 bg-slate-50/70"
        }`}
      >
        {value?.flag
          ? <img src={value.flag} alt="" className="w-5 h-3.5 object-cover rounded-sm shrink-0" />
          : <span className="text-slate-300 text-sm shrink-0">🌍</span>
        }
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-[8px] font-black uppercase text-yellow-600 leading-none mb-0.5">{label}</span>
          <input
            type="text"
            className="bg-transparent text-[13px] font-bold outline-none w-full text-slate-700 placeholder:text-slate-300"
            placeholder={placeholder}
            value={value ? value.name : query}
            onChange={(e) => {
              if (value) clear();
              setQuery(e.target.value);
              if (e.target.value.length === 0) setOpen(false);
            }}
            onFocus={handleFocus}
            autoComplete="off"
            spellCheck={false}
          />
        </div>
        {busy && (
          <span className="w-3 h-3 border border-slate-200 border-t-yellow-500 rounded-full animate-spin shrink-0" />
        )}
        {value && (
          <button
            onClick={clear}
            className="text-slate-300 hover:text-slate-500 text-lg leading-none shrink-0"
          >×</button>
        )}
      </div>

      {open && suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto py-1">
          {suggestions.map(s => (
            <li
              key={s.code}
              onMouseDown={(e) => { e.preventDefault(); pick(s); }}
              className="flex items-center gap-2 px-3 py-2 cursor-pointer text-xs text-slate-600 hover:bg-yellow-50 font-medium"
            >
              {s.flag && <img src={s.flag} alt="" className="w-4 h-3 object-cover rounded-sm shrink-0" />}
              <span>{s.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
// ─── end eammu helpers ────────────────────────────────────────────────────────

const TABS = [
  { id: 'visa',        label: 'Check Visa',    icon: Globe,        activeColor: 'text-yellow-600',  underline: 'bg-[#FED700]'  },
  { id: 'processing',  label: 'Processing',    icon: Clock,        activeColor: 'text-blue-700',    underline: 'bg-blue-500'   },
  { id: 'study',       label: 'Study Abroad',  icon: GraduationCap,activeColor: 'text-purple-700',  underline: 'bg-purple-500' },
  { id: 'templates',   label: 'Templates',     icon: FileText,     activeColor: 'text-green-700',   underline: 'bg-green-500'  },
  { id: 'scholarship', label: 'Scholarship',   icon: BookOpen,     activeColor: 'text-rose-600',    underline: 'bg-rose-500'   },
];

const iconAnimations = {
  visa:        { animate: { rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.2, 1.2, 1.1, 1.1, 1] }, transition: { duration: 0.6, ease: 'easeInOut' } },
  processing:  { animate: { x: [0, 6, -2, 0], y: [0, -5, -3, 0], rotate: [0, 8, 4, 0] },           transition: { duration: 0.55, ease: 'easeInOut' } },
  study:       { animate: { y: [0, -5, 0, -3, 0], scale: [1, 1.2, 1, 1.1, 1] },                    transition: { duration: 0.55, ease: 'easeOut'  } },
  templates:   { animate: { rotate: [0, -10, 12, -6, 0], scale: [1, 1.15, 1.1, 1.05, 1] },          transition: { duration: 0.6, ease: 'easeInOut' } },
  scholarship: { animate: { scale: [1, 1.3, 0.9, 1.2, 1], rotate: [0, 8, -5, 3, 0] },              transition: { duration: 0.55, ease: 'easeOut'  } },
};

const VISA_TYPES_CAT = [
  { value: "e-visa",           label: "E-Visa (Online)",        icon: "⚡" },
  { value: "sticker",          label: "Sticker Visa",           icon: "🏷️" },
  { value: "sticker-extended", label: "Sticker (Complex Case)", icon: "📋" },
  { value: "transit",          label: "Transit Visa",           icon: "🔁" },
];

const PROCESSING_COUNTRIES = [
  { name: 'Canada',      flag: 'https://flagcdn.com/w80/ca.png', time: '15–30 days' },
  { name: 'USA',         flag: 'https://flagcdn.com/w80/us.png', time: '3–5 weeks'  },
  { name: 'UK',          flag: 'https://flagcdn.com/w80/gb.png', time: '3 weeks'    },
  { name: 'Australia',   flag: 'https://flagcdn.com/w80/au.png', time: '4–6 weeks'  },
  { name: 'Schengen',    flag: 'https://flagcdn.com/w80/eu.png', time: '15 days'    },
  { name: 'Japan',       flag: 'https://flagcdn.com/w80/jp.png', time: '5–7 days'   },
  { name: 'UAE',         flag: 'https://flagcdn.com/w80/ae.png', time: '3–5 days'   },
  { name: 'New Zealand', flag: 'https://flagcdn.com/w80/nz.png', time: '20–25 days' },
];

const TEMPLATES = [
  { icon: '📝', label: 'SOP Template',           href: '/visa-resources/visa-document-generator',  badge: 'Free', color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
  { icon: '📄', label: 'NOC Letter Template',     href: '/visa-resources/visa-document-generator',  badge: 'Free', color: 'bg-green-50 border-green-200 text-green-700'  },
  { icon: '⚖️', label: 'Power of Attorney',       href: '/visa-resources/visa-document-generator',  badge: 'Free', color: 'bg-blue-50 border-blue-200 text-blue-700'    },
  { icon: '📋', label: 'Visa Document Checklist', href: '/visa-resources/visa-checklist-generator', badge: 'Free', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { icon: '💼', label: 'Cover Letter Template',   href: '/visa-resources/visa-document-generator',  badge: 'New',  color: 'bg-rose-50 border-rose-200 text-rose-700'     },
  { icon: '🏦', label: 'Bank Statement Template', href: '/visa-resources/visa-document-generator',  badge: 'New',  color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
];

export default function TravelMenu() {
  const [activeTab,        setActiveTab]        = useState('visa');
  const [searchTerm,       setSearchTerm]       = useState('');
  const [animatingTab,     setAnimatingTab]     = useState('visa');
  const [countries,        setCountries]        = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [dropdownOpen,     setDropdownOpen]     = useState(false);
  const [showSuggestions,  setShowSuggestions]  = useState(false);

  // Processing tab
  const [origin,      setOrigin]      = useState('bangladesh');
  const [destination, setDestination] = useState('canada');
  const [visaType,    setVisaType]    = useState("sticker");

  // ── Visa tab — eammu state ─────────────────────────────────────────────────
  const [visaPassport,    setVisaPassport]    = useState(null);
  const [visaDestination, setVisaDestination] = useState(null);
  const [visaResult,      setVisaResult]      = useState(null);
  const [visaLoading,     setVisaLoading]     = useState(false);
  const [visaError,       setVisaError]       = useState("");
  // ──────────────────────────────────────────────────────────────────────────

  const scrollRef = useRef(null);
  const searchRef = useRef(null);

  const [recentCountries, setRecentCountries] = useState(() => {
    try { return JSON.parse(localStorage.getItem('recentStudyCountries') || '[]'); }
    catch { return []; }
  });

  // Pre-fill eammu visa selectors with Bangladesh → Canada
  useEffect(() => {
    const fetchDefault = async (name) => {
      try {
        const r = await fetch(`${EAMMU_BASE}/suggest?q=${encodeURIComponent(name)}&api_key=${EAMMU_KEY}`);
        const d = await r.json();
        return (d.suggestions || []).find(s => s.name.toLowerCase() === name.toLowerCase())
          || (d.suggestions || [])[0]
          || null;
      } catch { return null; }
    };
    Promise.all([fetchDefault("Bangladesh"), fetchDefault("Canada")]).then(([pp, dd]) => {
      if (pp) setVisaPassport(pp);
      if (dd) setVisaDestination(dd);
    });
  }, []);

  // Load local countries (for processing / study / scholarship tabs)
  useEffect(() => {
    fetch('/api/countries')
      .then(res => res.json())
      .then(data => { setCountries(data); setLoadingCountries(false); })
      .catch(() => setLoadingCountries(false));
  }, []);

  // Close scholarship search on outside click
  useEffect(() => {
    const handler = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // ── eammu check ───────────────────────────────────────────────────────────
  const checkVisa = useCallback(async () => {
    if (!visaPassport || !visaDestination) return;
    setVisaLoading(true); setVisaError(""); setVisaResult(null);
    try {
      const r = await fetch(
        `${EAMMU_BASE}/passport?from=${encodeURIComponent(visaPassport.name)}&to=${encodeURIComponent(visaDestination.name)}&api_key=${EAMMU_KEY}`
      );
      if (!r.ok) throw new Error();
      const data = await r.json();
      setVisaResult(data);
    } catch {
      setVisaError("Visa Details Not Available. Please Contact - info@visaexpresshub.com");
    } finally {
      setVisaLoading(false);
    }
  }, [visaPassport, visaDestination]);
  // ──────────────────────────────────────────────────────────────────────────

  const addToRecent = (country) => {
    setRecentCountries(prev => {
      const updated = [country, ...prev.filter(c => c.code !== country.code)].slice(0, 5);
      localStorage.setItem('recentStudyCountries', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromRecent = (code) => {
    setRecentCountries(prev => {
      const updated = prev.filter(c => c.code !== code);
      localStorage.setItem('recentStudyCountries', JSON.stringify(updated));
      return updated;
    });
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - clientWidth * 0.6 : scrollLeft + clientWidth * 0.6,
        behavior: 'smooth',
      });
    }
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setSearchTerm('');
    setDropdownOpen(false);
    setAnimatingTab(tabId);
    setTimeout(() => setAnimatingTab(null), 700);
  };

  const filteredStudyCountries = useMemo(() =>
    countries.filter(c => c.country.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 5),
    [countries, searchTerm]
  );

  // ── Derived visa-guide slug & href ────────────────────────────────────────
  const visaGuideSlug = visaResult
    ? extractGuideSlug(visaResult.visa_guide_url)
      || VISA_STATUS_META[visaResult.visa_status]?.slug
      || "visa-required"
    : null;

  const visaRouteSlug = visaResult
    ? `${createSlug(visaPassport?.name || "")}-visa-for-${createSlug(visaDestination?.name || "")}`
    : null;
  // ──────────────────────────────────────────────────────────────────────────

  const btnHref = {
    visa: visaResult && visaGuideSlug
      ? `/visa-checker/${visaRouteSlug}/${visaGuideSlug}`
      : `/visa/${createSlug(visaDestination?.name || 'canada')}-to-${createSlug(visaPassport?.name || 'bangladesh')}`,
    processing:  `/visa-processing-time-tracker/${origin.replace(/\s+/g, "-")}-national-visa-processing-time-for-${destination.replace(/\s+/g, "-")}?type=${visaType}`,
    study:       `/visa/student-visa/${createSlug(destination)}`,
    templates:   '/visa-resources',
    scholarship: '/scholarships',
  }[activeTab] ?? '/';

  const btnLabel = {
    visa:        visaLoading ? 'Checking…' : visaResult ? 'View Full Visa Guide →' : 'Check Visa Now',
    processing:  'Track Processing',
    study:       'Explore Courses',
    templates:   'Download Templates',
    scholarship: 'Find Scholarships',
  }[activeTab] ?? 'Search';

  if (loadingCountries) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4 flex justify-center items-center h-40">
        <span className="text-sm text-gray-400 font-bold animate-pulse">Loading countries…</span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 font-sans relative pt-20 pb-26">

      {/* ── 1. FLOATING MENU BAR ── */}
      <div className="relative z-20 flex justify-center px-2">
        <div className="flex items-center bg-white border border-gray-100 shadow-xl rounded-2xl p-1 w-full sm:w-auto">

          <button onClick={() => scroll('left')} className="p-1.5 hover:bg-gray-50 rounded-xl shrink-0 sm:hidden">
            <ChevronLeft size={16} className="text-gray-400" />
          </button>

          <div
            ref={scrollRef}
            className="flex items-center overflow-x-auto no-scrollbar scroll-smooth flex-nowrap px-1"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {TABS.map((tab) => {
              const Icon     = tab.icon;
              const isActive = activeTab === tab.id;
              const anim     = iconAnimations[tab.id];
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className="flex-shrink-0 relative flex flex-col items-center px-4 sm:px-6 py-1.5 transition-all outline-none"
                >
                  <motion.div
                    animate={animatingTab === tab.id ? anim.animate : {}}
                    transition={animatingTab === tab.id ? anim.transition : {}}
                    className="mb-0.5"
                  >
                    <Icon size={18} className={isActive ? tab.activeColor : 'text-gray-400'} />
                  </motion.div>
                  <span className={`text-[10px] sm:text-[11px] font-extrabold whitespace-nowrap tracking-tight ${isActive ? tab.activeColor : 'text-gray-400'}`}>
                    {tab.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="tabMarker"
                      className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full ${tab.underline}`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <button onClick={() => scroll('right')} className="p-1.5 hover:bg-gray-50 rounded-xl shrink-0 sm:hidden">
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* ── 2. MAIN CONTENT AREA ── */}
      <div className="bg-white rounded-[24px] shadow-2xl border border-gray-100 -mt-3 pt-6 pb-10 px-4 sm:px-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col items-center"
          >

            {/* ════════════════ VISA TAB ════════════════ */}
            {activeTab === 'visa' && (
              <div className="space-y-3 w-full">
                <h2 className="text-xs sm:text-lg font-black text-gray-800 text-center tracking-tight leading-none">
                  Check Your Visa Requirements Before You Fly
                </h2>

                {/* ── Country selectors row ── */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2 max-w-4xl mx-auto w-full">
                  <VisaCountryInput
                    label="Your Passport"
                    placeholder="Select nationality…"
                    value={visaPassport}
                    onChange={(c) => { setVisaPassport(c); setVisaResult(null); }}
                    excludeCode={visaDestination?.code}
                  />

                  {/* Swap button */}
                  <button
                    onClick={() => {
                      setVisaPassport(visaDestination);
                      setVisaDestination(visaPassport);
                      setVisaResult(null);
                    }}
                    title="Swap"
                    className="hidden sm:flex w-8 h-8 self-end mb-1 shrink-0 rounded-full border border-slate-200 bg-slate-50 items-center justify-center text-slate-400 hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all text-sm"
                  >⇄</button>

                  <VisaCountryInput
                    label="Destination"
                    placeholder="Where are you going?"
                    value={visaDestination}
                    onChange={(c) => { setVisaDestination(c); setVisaResult(null); }}
                    excludeCode={visaPassport?.code}
                  />
                </div>

                {/* ── Error ── */}
                {visaError && (
                  <p className="text-center text-xs text-red-500 font-medium">{visaError}</p>
                )}

                {/* ── Result card ── */}
                {visaResult && (() => {
                  const meta       = VISA_STATUS_META[visaResult.visa_status];
                  const isNumFree  = !meta && visaResult.visa_status && /^\d+$/.test(String(visaResult.visa_status));
                  const color      = meta?.color || "#10b981";
                  const light      = meta?.light || "#ecfdf5";
                  const statusLabel = meta?.label || (isNumFree ? `Visa-Free · ${visaResult.visa_status} days` : visaResult.visa_status);

                  return (
                    <div
                      className="rounded-2xl border-2 p-3 flex items-center gap-3 max-w-4xl mx-auto w-full"
                      style={{ borderColor: color, background: light }}
                    >
                      {/* From */}
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        {visaResult.from?.passport_cover
                          ? <img src={visaResult.from.passport_cover} alt="" className="w-9 h-12 object-cover rounded-lg shadow" />
                          : visaResult.from?.flag
                            ? <img src={visaResult.from.flag} alt="" className="w-9 h-6 object-cover rounded shadow" />
                            : null
                        }
                        {visaResult.from?.flag && visaResult.from?.passport_cover && (
                          <img src={visaResult.from.flag} alt="" className="w-6 h-4 object-cover rounded-sm" />
                        )}
                        <span className="text-[9px] font-bold text-slate-500 text-center leading-tight max-w-[60px] truncate">
                          {visaResult.from?.name}
                        </span>
                      </div>

                      {/* Centre — status pill + arrow */}
                      <div className="flex-1 flex flex-col items-center gap-1.5 min-w-0">
                        <span
                          className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full text-white whitespace-nowrap"
                          style={{ background: color }}
                        >{statusLabel}</span>
                        <div className="flex items-center gap-1.5 w-full">
                          <div className="flex-1 h-px opacity-25" style={{ background: color }} />
                          <span className="text-base" style={{ color }}>✈</span>
                          <div className="flex-1 h-px opacity-25" style={{ background: color }} />
                        </div>
                      </div>

                      {/* To */}
                      <div className="flex flex-col items-center gap-1 shrink-0">
                        {visaResult.to?.passport_cover
                          ? <img src={visaResult.to.passport_cover} alt="" className="w-9 h-12 object-cover rounded-lg shadow" />
                          : visaResult.to?.flag
                            ? <img src={visaResult.to.flag} alt="" className="w-9 h-6 object-cover rounded shadow" />
                            : null
                        }
                        {visaResult.to?.flag && visaResult.to?.passport_cover && (
                          <img src={visaResult.to.flag} alt="" className="w-6 h-4 object-cover rounded-sm" />
                        )}
                        <span className="text-[9px] font-bold text-slate-500 text-center leading-tight max-w-[60px] truncate">
                          {visaResult.to?.name}
                        </span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* ════════════════ PROCESSING TAB ════════════════ */}
            {activeTab === 'processing' && (
              <div className="space-y-3 w-full">
                <h2 className="text-sm sm:text-lg font-black text-gray-800 text-center tracking-tight leading-none">
                  Visa Processing Time Tracker
                </h2>

                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 max-w-4xl mx-auto w-full">
                  <div className="flex-1 min-w-0 bg-slate-50/70 px-3 py-1.5 rounded-xl border border-slate-100 flex items-center gap-3">
                    <div className="w-7 h-[18px] rounded-sm overflow-hidden border border-slate-200 shrink-0">
                      <img src={countries.find(c => c.country.toLowerCase() === origin)?.flag} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 text-left">
                      <label className="block text-[8px] font-black uppercase text-slate-400 leading-none mb-0.5">Your Passport</label>
                      <select value={origin} onChange={e => setOrigin(e.target.value)} className="bg-transparent text-[13px] font-bold outline-none w-full appearance-none">
                        {countries.filter(c => c.country.toLowerCase() !== destination).map(c => (
                          <option key={c.code} value={c.country.toLowerCase()}>{c.country}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="hidden md:flex shrink-0 px-1">
                    <ChevronRightIcon size={14} className="text-slate-300" />
                  </div>

                  <div className="flex-1 min-w-0 bg-slate-50/70 px-3 py-1.5 rounded-xl border border-slate-100 flex items-center gap-3">
                    <div className="w-7 h-[18px] rounded-sm overflow-hidden border border-slate-200 shrink-0">
                      <img src={countries.find(c => c.country.toLowerCase() === destination)?.flag} className="w-full h-full object-cover" alt="" />
                    </div>
                    <div className="flex-1 text-left">
                      <label className="block text-[8px] font-black uppercase text-slate-400 leading-none mb-0.5">Destination</label>
                      <select value={destination} onChange={e => setDestination(e.target.value)} className="bg-transparent text-[13px] font-bold outline-none w-full appearance-none">
                        {countries.filter(c => c.country.toLowerCase() !== origin).map(c => (
                          <option key={c.code} value={c.country.toLowerCase()}>{c.country}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="md:w-40 bg-slate-50/70 px-3 py-1.5 rounded-xl border border-slate-100 text-left">
                    <p className="text-[8px] font-black uppercase text-blue-700 leading-none mb-0.5">Visa Type</p>
                    <select value={visaType} onChange={e => setVisaType(e.target.value)} className="bg-transparent text-[13px] font-bold outline-none w-full appearance-none text-blue-800">
                      {VISA_TYPES_CAT.map(v => <option key={v.value} value={v.value}>{v.label}</option>)}
                    </select>
                  </div>
                </div>

                <div className="w-full max-w-4xl mx-auto">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Popular Destinations</p>
                    <div className="h-[1px] flex-1 bg-slate-100 ml-4" />
                  </div>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                    {PROCESSING_COUNTRIES.map(c => (
                      <Link key={c.name} href={`/visa-processing-time-tracker/${origin.replace(/\s+/g, "-")}-national-visa-processing-time-for-${c.name.toLowerCase().replace(/\s+/g, "-")}?type=${visaType}`}
                        className="group flex flex-col items-center gap-1 bg-white border border-gray-100 rounded-xl p-2 hover:border-blue-400 hover:shadow-sm transition-all">
                        <img src={c.flag} alt={c.name} className="w-8 h-5 object-cover rounded-sm" />
                        <span className="text-[9px] font-black text-gray-700 text-center leading-tight">{c.name}</span>
                        <span className="text-[8px] font-bold text-blue-600 text-center leading-tight">{c.time}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ════════════════ STUDY ABROAD TAB ════════════════ */}
            {activeTab === 'study' && (
              <div className="space-y-4 w-full">
                <div className="flex flex-col items-center gap-2 max-w-4xl mx-auto w-full relative">
                  <h2 className="text-sm sm:text-lg font-black text-gray-800 text-center tracking-tight leading-none">
                    Find Your Higher Study Destinations
                  </h2>

                  <div className="relative w-full max-w-2xl">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="text"
                      placeholder="Search your study destination…"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      onFocus={() => searchTerm.length > 0 && setDropdownOpen(true)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[13px] font-bold outline-none focus:border-purple-400 transition-colors"
                    />
                    <AnimatePresence>
                      {searchTerm.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                          className="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden"
                        >
                          {filteredStudyCountries.length > 0 ? filteredStudyCountries.map(c => (
                            <Link key={c.code} href={`/visa/student-visa/${createSlug(c.country)}`} onClick={() => addToRecent(c)}
                              className="flex items-center gap-2.5 px-4 py-2 hover:bg-purple-50 transition-colors border-b border-gray-50 last:border-none">
                              <img src={c.flag} className="w-5 h-3.5 object-cover rounded-sm border border-gray-100 flex-shrink-0" alt="" />
                              <span className="text-[12.5px] font-bold text-gray-700">{c.country}</span>
                            </Link>
                          )) : (
                            <div className="px-4 py-3 text-[12px] text-gray-400 font-medium">No countries found</div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {recentCountries.length > 0 && (
                  <div className="w-full max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Recently Visited</p>
                      <div className="h-[1px] flex-1 bg-slate-100 ml-4" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentCountries.map(c => (
                        <Link key={c.code} href={`/visa/student-visa/${createSlug(c.country)}`} onClick={() => addToRecent(c)}
                          className="flex items-center gap-1.5 pl-1.5 pr-3 py-1 bg-white border border-gray-200 rounded-full hover:border-purple-400 hover:bg-purple-50 transition-all group">
                          <img src={c.flag} className="w-4.5 h-3 object-cover rounded-sm border border-gray-100 flex-shrink-0" alt="" />
                          <span className="text-[11.5px] font-bold text-gray-600 group-hover:text-purple-700">{c.country}</span>
                          <button onClick={e => { e.preventDefault(); e.stopPropagation(); removeFromRecent(c.code); }} className="ml-1 text-gray-300 hover:text-purple-400 text-[10px] leading-none">✕</button>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="w-full max-w-4xl mx-auto">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Top Destinations</p>
                    <div className="h-[1px] flex-1 bg-slate-100 ml-4" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {countries
                      .filter(c => ["Canada", "European Union", "United States", "Australia"].includes(c.country))
                      .map(c => (
                        <Link key={c.code} href={`/visa/student-visa/${createSlug(c.country)}`} onClick={() => addToRecent(c)}
                          className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-purple-400 hover:shadow-md transition-all">
                          <div className="h-14 bg-gray-100 overflow-hidden">
                            <img src={c.flag} alt={c.country} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          </div>
                          <div className="p-1.5 text-center bg-white">
                            <p className="text-[10.5px] font-black text-gray-800 truncate">{c.country}</p>
                          </div>
                          <div className="absolute top-1 right-1 bg-purple-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase">Hot</div>
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* ════════════════ TEMPLATES TAB ════════════════ */}
            {activeTab === 'templates' && (
              <div className="space-y-3 w-full">
                <h2 className="text-sm sm:text-lg font-black text-gray-800 text-center tracking-tight leading-none">
                  Free Visa Document Templates
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-4xl mx-auto w-full">
                  {TEMPLATES.map(t => (
                    <Link key={t.label} href={t.href}
                      className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl border bg-white hover:shadow-md transition-all duration-150 no-underline ${t.color}`}>
                      <span className="text-xl flex-shrink-0">{t.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-black leading-tight truncate">{t.label}</p>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-white/60 flex-shrink-0">{t.badge}</span>
                    </Link>
                  ))}
                </div>
                <p className="text-[11px] text-center text-gray-400 font-medium">
                  ✅ All templates are free to download and customise
                </p>
              </div>
            )}

            {/* ════════════════ SCHOLARSHIP TAB ════════════════ */}
            {activeTab === 'scholarship' && (
              <div className="space-y-3 w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                <h2 className="text-sm sm:text-lg font-black text-gray-800 text-center tracking-tight leading-none">
                  Find Fully Funded Scholarships
                </h2>

                <div className="relative w-full max-w-2xl mx-auto" ref={searchRef}>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input
                    type="text"
                    placeholder="Search scholarships by country…"
                    value={searchTerm}
                    onChange={e => { setSearchTerm(e.target.value); setShowSuggestions(true); }}
                    onFocus={() => searchTerm && setShowSuggestions(true)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[13px] font-bold outline-none focus:border-rose-400 transition-colors"
                  />
                  {showSuggestions && searchTerm && (() => {
                    const results = countries.filter(c => c.country.toLowerCase().includes(searchTerm.toLowerCase()));
                    return results.length > 0 ? (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-100 rounded-xl shadow-lg z-50 overflow-hidden max-h-[220px] overflow-y-auto">
                        {results.slice(0, 6).map(c => (
                          <Link key={c.code} href={`/scholarships/${createSlug(c.country)}`}
                            onClick={() => { setSearchTerm(''); setShowSuggestions(false); }}
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-rose-50 transition-colors group">
                            <img src={c.flag} alt={c.country} className="w-7 h-5 object-cover rounded-sm border border-slate-100 shrink-0" onError={e => e.target.src = "https://flagcdn.com/w80/un.png"} />
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] font-black text-gray-800 truncate">{c.country}</p>
                              <p className="text-[10px] text-slate-400 font-semibold">Fully funded programs available</p>
                            </div>
                            <span className="text-[10px] text-rose-400 font-black uppercase tracking-tight opacity-0 group-hover:opacity-100 transition-opacity shrink-0">View →</span>
                          </Link>
                        ))}
                        {results.length > 6 && (
                          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100">
                            <Link href={`/scholarships?q=${encodeURIComponent(searchTerm)}`} className="text-[10px] font-black text-rose-400 hover:text-rose-600 uppercase tracking-widest">
                              See all {results.length} results →
                            </Link>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-100 rounded-xl shadow-lg z-50 px-4 py-6 text-center">
                        <p className="text-xs font-bold text-slate-400 italic">No results for "{searchTerm}"</p>
                      </div>
                    );
                  })()}
                </div>

                <div className="w-full max-w-4xl mx-auto">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Top Destinations</p>
                    <div className="h-[1px] flex-1 bg-slate-100 ml-4" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1">
                    {countries
                      .filter(c => ['canada', 'germany', 'united kingdom', 'australia'].includes(c.country.toLowerCase()))
                      .slice(0, 4)
                      .map(c => (
                        <Link key={c.code} href={`/scholarships/${createSlug(c.country)}`}
                          className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-rose-400 hover:shadow-md transition-all active:scale-95">
                          <div className="h-14 bg-slate-50 overflow-hidden">
                            <img src={c.flag} alt={c.country} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={e => e.target.src = "https://flagcdn.com/w80/un.png"} />
                          </div>
                          <div className="p-2 text-center bg-white">
                            <p className="text-[11px] font-black text-gray-800 truncate leading-tight">{c.country}</p>
                            <p className="text-[9px] text-rose-500 font-bold uppercase tracking-tighter mt-0.5">View Programs</p>
                          </div>
                          {['canada', 'usa', 'united kingdom', 'australia'].includes(c.country.toLowerCase()) && (
                            <div className="absolute top-1 right-1 bg-[#FED700] text-black text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase shadow-sm">Hot</div>
                          )}
                        </Link>
                      ))}
                  </div>
                  <div className="mt-3 text-center border-t border-slate-50 pt-2">
                    <Link href="/scholarships" className="text-[10px] font-black text-rose-400 hover:text-rose-600 transition-colors uppercase tracking-widest flex items-center justify-center gap-1">
                      Explore All Countries <span className="text-xs">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* ── OVERLAPPING CTA BUTTON ── */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex justify-center w-full px-8">
          <Link
            href={btnHref}
            onClick={(e) => {
              // On visa tab: first click fires the API check; second click navigates
              if (activeTab === 'visa' && !visaResult && !visaLoading) {
                e.preventDefault();
                checkVisa();
              }
            }}
            className="w-full sm:w-64 bg-[#FED700] hover:bg-[#e0c000] text-black py-3.5 rounded-xl font-black text-sm uppercase shadow-xl text-center active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {visaLoading && activeTab === 'visa' && (
              <span className="w-4 h-4 border-2 border-black/20 border-t-black rounded-full animate-spin" />
            )}
            {btnLabel}
          </Link>
        </div>
      </div>

    </div>
  );
}