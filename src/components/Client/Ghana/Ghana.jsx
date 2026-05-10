"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createSlug } from "@/app/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// SEO METADATA — export from app/visa/tourist-visa/metadata.js (App Router)
// ─────────────────────────────────────────────────────────────────────────────
// export const metadata = {
//   title: "Tourist Visa for Ghanaian Nationals 2026 — 200+ Countries | Visa Expert Hub",
//   description: "Apply for a tourist visa as a Ghanaian national. Expert consultancy for USA, UK, Canada, Schengen, Japan, Australia & 200+ countries. 98% approval rate. Embassy-verified documents for Ghanaian passport holders.",
//   keywords: "tourist visa Ghanaian nationals 2026, visa consultancy Ghana, USA visa Ghana, UK visa Ghana, Schengen visa Ghana, Canada visa Ghanaian passport, tourist visa Ghana, visa on arrival Ghanaian passport, Ghanaian passport visa free countries 2026, visa from Accra",
//   alternates: { canonical: "https://yourdomain.com/visa/ghanaian-nationals" },
// };

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────────────────────
const POPULAR = [
  { name: "United States",   emoji: "🇺🇸" },
  { name: "United Kingdom",  emoji: "🇬🇧" },
  { name: "Canada",          emoji: "🇨🇦" },
  { name: "Australia",       emoji: "🇦🇺" },
  { name: "Germany",         emoji: "🇩🇪" },
  { name: "France",          emoji: "🇫🇷" },
  { name: "Japan",           emoji: "🇯🇵" },
  { name: "Singapore",       emoji: "🇸🇬" },
  { name: "Thailand",        emoji: "🇹🇭" },
  { name: "Malaysia",        emoji: "🇲🇾" },
  { name: "Italy",           emoji: "🇮🇹" },
  { name: "Turkey",          emoji: "🇹🇷" },
];

const WHY_US = [
  { icon: "🛡️", title: "98% Approval Rate",         desc: "Our consultants have helped thousands of Ghanaian passport holders get approved worldwide. We know exactly what embassies look for from Ghanaian applicants." },
  { icon: "📋", title: "Embassy-Accurate Documents", desc: "Every checklist verified against official embassy circulars & VFS Global announcements, updated monthly for 2026 protocols for Ghanaian nationals." },
  { icon: "⚡", title: "24-Hour Document Review",    desc: "Rapid review and expert feedback eliminates rejection risks before submission — especially important for Ghanaian passport applications." },
  { icon: "🌍", title: "200+ Countries Covered",     desc: "Schengen to Southeast Asia — tourist, business, student & medical visas expertly handled for Ghanaian passport holders." },
];

const TESTIMONIALS = [
  { name: "Abena Mensah",    country: "UK Visa Approved ✅",     text: "Got my UK Standard Visitor visa approved in 14 days from Accra. The team reviewed every document and my cover letter — zero issues at the British High Commission in Accra.", stars: 5 },
  { name: "Kwame Asante",    country: "Schengen Approved ✅",    text: "Applied for Germany Schengen as a Ghanaian national through them. Perfect checklist, excellent financial file guidance, no rejection. Highly recommend for Ghanaians applying abroad.", stars: 5 },
  { name: "Akosua Boateng",  country: "Canada Visa Approved ✅", text: "Canada Visitor Visa (TRV) — they helped me structure everything exactly the way IRCC expects from a Ghanaian applicant. Approved in 5 weeks from Accra!", stars: 5 },
];

const SEO_LINKS = [
  { name: "USA B1/B2 Tourist Visa",         slug: "united-states", desc: "DS-160, bank statement, interview tips for Ghanaians — US Embassy Accra" },
  { name: "UK Standard Visitor Visa",       slug: "united-kingdom", desc: "UKVI checklist, photo specs, financial proof for Ghanaian passport holders" },
  { name: "Canada Visitor Visa (TRV)",      slug: "canada",         desc: "IRCC requirements, biometrics, checklist for Ghanaian nationals" },
  { name: "Schengen Visa from Ghana",       slug: "germany",        desc: "Germany, France, Italy — Schengen visa guide for Ghanaian passport holders" },
  { name: "Japan Tourist Visa",             slug: "japan",          desc: "Embassy checklist, bank balance for Ghanaian passport holders" },
  { name: "Australia Tourist Visa",         slug: "australia",      desc: "Subclass 600, documents, processing time for Ghanaians" },
  { name: "Malaysia e-Visa",                slug: "malaysia",       desc: "eNTRI, eVISA — online visa options for Ghanaian nationals" },
  { name: "Thailand Tourist Visa",          slug: "thailand",       desc: "TR visa from Royal Thai Embassy for Ghanaian passport holders" },
  { name: "Singapore Tourist Visa",         slug: "singapore",      desc: "ICA requirements, tourist pass guide for Ghanaians" },
];

const VISA_CATEGORIES = [
  { label: "Europe & Schengen",  icon: "🏰", desc: "Germany, France, Italy, Spain & 22 more Schengen nations",     href: "/schengen-visa" },
  { label: "North America",      icon: "🗽", desc: "USA B1/B2, Canada TRV, Mexico & beyond",                        href: "/visa/tourist-visa/united-states" },
  { label: "Asia Pacific",       icon: "🏯", desc: "Japan, Singapore, Thailand, Malaysia, South Korea",             href: "/visa/tourist-visa/south-korea" },
  { label: "Australia & NZ",     icon: "🦘", desc: "Australian Subclass 600, NZ Visitor Visa",                      href: "/visa/tourist-visa/australia-visa" },
  { label: "Middle East",        icon: "🕌", desc: "UAE, Saudi Arabia, Qatar, Oman — Ghanaian passport guide",      href: "/visa/tourist-visa/qatar" },
  { label: "Business Visa",      icon: "💼", desc: "Short-stay business visas — USA, UK, Schengen & Asia",          href: "/visa/business-visa/united-kingdom" },
];

const STATS = [
  { val: "50,000+", label: "Visas Processed" },
  { val: "98%",     label: "Approval Rate" },
  { val: "200+",    label: "Countries Covered" },
  { val: "24hr",    label: "Document Review" },
  { val: "2026",    label: "Updated Protocols" },
];

const alphabet = ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function TouristVisaGhanaianNationals() {
  const [searchTerm,      setSearchTerm]      = useState("");
  const [suggestions,     setSuggestions]     = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLetter,  setSelectedLetter]  = useState("All");
  const [currentPage,     setCurrentPage]     = useState(1);
  const [currentSlide,    setCurrentSlide]    = useState(0);
  const [countries,       setCountries]       = useState([]);
  const [isLoaded,        setIsLoaded]        = useState(false);
  const searchRef    = useRef(null);
  const itemsPerPage = 12;

  const slides = [
    { img: "/the-love-island.webp",               tag: "Island Getaways", title: "Explore Paradise" },
    { img: "/top-travel-agency.webp",             tag: "Trusted Agency",  title: "Expert Guidance" },
    { img: "/travel_banner_second_part_one.webp", tag: "200+ Countries",  title: "Your World Awaits" },
  ];

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [slides.length]);

  useEffect(() => {
    fetch("/api/countries")
      .then(r => r.json())
      .then(data => { setCountries(data); setIsLoaded(true); })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 1) {
      const filtered = countries
        .filter(c => c.country?.toLowerCase().startsWith(searchTerm.toLowerCase()))
        .slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, countries]);

  useEffect(() => {
    const handler = e => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredCountries = countries.filter(c => {
    const matchLetter = selectedLetter === "All" || c.country?.[0]?.toUpperCase() === selectedLetter;
    const matchSearch = c.country?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchLetter && matchSearch;
  });

  const totalPages   = Math.ceil(filteredCountries.length / itemsPerPage);
  const currentItems = filteredCountries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSuggestionClick = country => {
    setSearchTerm(country.country);
    setShowSuggestions(false);
    setCurrentPage(1);
    setSelectedLetter("All");
  };

  const resetFilters = () => { setSelectedLetter("All"); setSearchTerm(""); setCurrentPage(1); };

  return (
    <div
      className="min-h-[60vh] bg-white text-black font-sans"
      style={{ fontFamily: "'Plus Jakarta Sans','DM Sans',system-ui,sans-serif" }}
    >

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ minHeight: "560px" }}>
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
            style={{ transition: "opacity 1.5s ease" }}
          >
            <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(255,255,255,0.75) 0%,rgba(255,255,255,0.45) 50%,rgba(255,255,255,0.97) 100%)" }} />
          </div>
        ))}

        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.15) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlide(i)}
              aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-500 ${i === currentSlide ? "w-8 h-2.5 bg-[#f5c800]" : "w-2.5 h-2.5 bg-black/20 hover:bg-black/40"}`}
            />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 text-center pt-10 pb-20">

          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 mb-7 rounded-full bg-white border border-black/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#f5c800] animate-pulse" />
            <span className="text-xs font-bold text-black/80 tracking-widest uppercase">200+ Countries · Expert Visa Consultancy · Ghanaian Passport</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-[52px] font-black leading-[0.95] tracking-tight mb-5 text-black">
            Tourist Visa for <span className="text-[#f5c800]">Ghanaian Nationals</span> —<br />
            <span className="text-black/30">Done Right, First Time.</span>
          </h1>

          <p className="text-black/60 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Embassy-accurate documentation for <strong className="text-black">USA B1/B2</strong>,{" "}
            <strong className="text-black">UK Standard Visitor</strong>,{" "}
            <strong className="text-black">Canada TRV</strong>, and the{" "}
            <strong className="text-black">29-country Schengen Area</strong> — handled by expert visa consultants for Ghanaian passport holders worldwide.
          </p>

          {/* ── SEARCH CARD ── */}
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-3xl mx-auto border border-black/5 shadow-2xl mb-4">

            <div ref={searchRef} className="relative mb-5">
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#f5c800] z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder="Search destination country… (e.g. Japan, Canada, Germany)"
                className="w-full pl-14 pr-12 py-5 rounded-2xl text-base font-semibold outline-none transition-all shadow-inner"
                style={{ background: "#f8f8f8", border: "1.5px solid rgba(0,0,0,0.05)", color: "black" }}
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); setSelectedLetter("All"); }}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                onKeyDown={e => {
                  if (e.key === "Escape") setShowSuggestions(false);
                  if (e.key === "Enter" && suggestions.length > 0) handleSuggestionClick(suggestions[0]);
                }}
                autoComplete="off"
                aria-label="Search destination country for Ghanaian passport visa"
              />
              {searchTerm && (
                <button
                  onClick={() => { setSearchTerm(""); setSelectedLetter("All"); setCurrentPage(1); setSuggestions([]); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-black/30 hover:text-black hover:bg-black/5 transition text-lg font-bold"
                  aria-label="Clear search"
                >✕</button>
              )}

              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-50 shadow-2xl bg-white border border-[#f5c800]/30">
                  <div className="p-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/30 px-3 py-2">
                      🔍 {suggestions.length} countries found
                    </p>
                    {suggestions.map((c, i) => (
                      <Link
                        key={i}
                        href={`/visa/ghana/${createSlug(c.country)}`}
                        onClick={() => handleSuggestionClick(c)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
                      >
                        {c.flag && <img src={c.flag} alt={`${c.country} flag`} className="w-8 object-cover rounded shadow-sm" style={{ height: "22px" }} />}
                        <div className="text-left flex-1">
                          <p className="font-bold text-black text-sm">{c.country}</p>
                          <p className="text-[11px] text-black/40">Tourist Visa Guide for Ghanaian Nationals → Apply Now</p>
                        </div>
                        <span className="text-[#f5c800] text-xs font-black">View →</span>
                      </Link>
                    ))}
                    <div className="border-t border-black/5 mt-2 pt-2 px-3 pb-1">
                      <p className="text-[10px] text-black/25 font-medium">Press Enter to go to top result · Esc to close</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* A-Z Filter */}
            <div className="flex flex-wrap justify-center gap-1.5 mb-5">
              {alphabet.map(l => (
                <button
                  key={l}
                  onClick={() => { setSelectedLetter(l); setCurrentPage(1); setShowSuggestions(false); }}
                  aria-label={`Filter by ${l}`}
                  className={`w-8 h-8 md:w-9 md:h-9 rounded-xl text-xs font-black transition-all ${
                    selectedLetter === l
                      ? "bg-[#f5c800] text-black shadow-md scale-110"
                      : "text-black/40 hover:text-black bg-gray-100 hover:bg-gray-200"
                  }`}
                >{l}</button>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-black/40 font-bold px-1">
              <span>{filteredCountries.length} destinations available for Ghanaian passport holders</span>
              <span>2026 Embassy-Verified</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-xs font-bold text-black/50">
            {["✅ 98% Approval Rate", "📋 Embassy-Verified Docs", "⚡ 24hr Document Review", "🔒 100% Confidential"].map(b => (
              <span key={b} className="bg-white/80 border border-black/5 px-3 py-1.5 rounded-full">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ─────────────────────────────────────────────────────── */}
      <section style={{ background: "#f5c800" }} className="py-5 shadow-sm" aria-label="Key statistics">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-black text-black">{s.val}</p>
                <p className="text-xs font-bold text-black/60 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISA CATEGORIES ──────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 py-16" aria-labelledby="categories-heading">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#f5c800] text-xs font-black uppercase tracking-widest mb-2">Browse by Region</p>
            <h2 id="categories-heading" className="text-3xl md:text-4xl font-black text-black">Popular Visa Categories — Ghanaian Passport</h2>
          </div>
          <Link href="/visa/ghana" className="text-xs font-bold text-black/40 hover:text-[#f5c800] transition border border-black/10 px-4 py-2 rounded-xl hover:border-[#f5c800]/40">
            All visa types →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VISA_CATEGORIES.map((cat, i) => (
            <Link
              key={i}
              href={cat.href}
              className="group flex items-start gap-4 p-5 rounded-2xl border border-black/5 bg-gray-50 hover:bg-white hover:shadow-lg hover:border-[#f5c800]/30 transition-all duration-300"
            >
              <span className="text-3xl">{cat.icon}</span>
              <div>
                <h3 className="font-black text-black text-sm mb-1 group-hover:text-[#d4a800] transition">{cat.label}</h3>
                <p className="text-xs text-black/40 leading-relaxed">{cat.desc}</p>
              </div>
              <span className="ml-auto text-[#f5c800] font-black text-sm opacity-0 group-hover:opacity-100 transition">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── POPULAR COUNTRIES ───────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-5 pb-6" aria-label="Popular visa destinations for Ghanaian nationals">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-black uppercase tracking-widest text-black/30">🔥 Most Applied by Ghanaians:</span>
          {POPULAR.map(({ name, emoji }) => {
            const c = countries.find(x => x.country === name);
            return (
              <Link
                key={name}
                href={`/visa/ghana/${createSlug(name)}`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-black/60 hover:text-black border border-black/5 hover:border-[#f5c800]/40 transition-all bg-gray-50 hover:bg-white shadow-sm"
              >
                {c?.flag
                  ? <img src={c.flag} className="w-5 object-cover rounded-sm" style={{ height: "14px" }} alt="" />
                  : <span>{emoji}</span>}
                {name}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── COUNTRIES GRID ──────────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-5 pb-20" id="all-countries" aria-labelledby="grid-heading">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 id="grid-heading" className="text-2xl md:text-3xl font-black text-black">
              {selectedLetter === "All" && !searchTerm
                ? "All Visa Destinations — Ghanaian Nationals 2026"
                : searchTerm
                ? `Results for "${searchTerm}"`
                : `Countries Starting with "${selectedLetter}"`}
            </h2>
            <p className="text-black/30 text-sm mt-1">
              {filteredCountries.length} countries · Click any to view full visa requirements for Ghanaian passport holders
            </p>
          </div>
          {(selectedLetter !== "All" || searchTerm) && (
            <button
              onClick={resetFilters}
              className="text-xs font-bold text-[#f5c800] border border-[#f5c800]/30 px-4 py-2 rounded-xl hover:bg-[#f5c800]/5 transition"
            >Show All</button>
          )}
        </div>

        {!isLoaded ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-black/5 animate-pulse bg-gray-100">
                <div className="h-28 bg-gray-200" />
                <div className="p-3"><div className="h-3 bg-gray-200 rounded mb-2" /><div className="h-6 bg-gray-200 rounded" /></div>
              </div>
            ))}
          </div>
        ) : currentItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {currentItems.map((c, i) => (
              <Link
                key={`${c.code}-${i}`}
                href={`/visa/ghana/${createSlug(c.country)}`}
                className="group rounded-2xl overflow-hidden border border-black/5 flex flex-col bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300"
                title={`${c.country} Tourist Visa — Ghanaian Passport Guide 2026`}
              >
                <div className="relative h-28 overflow-hidden bg-gray-200">
                  <img
                    src={c.flag}
                    alt={`${c.country} tourist visa guide for Ghanaian nationals 2026`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.2) 0%,transparent 60%)" }} />
                </div>
                <div className="p-3 flex flex-col flex-1 justify-between">
                  <h3 className="text-sm font-black text-black/80 leading-tight group-hover:text-black transition-colors mb-2">{c.country}</h3>
                  <div className="text-[10px] font-bold text-[#f5c800] bg-[#f5c800]/5 rounded-lg px-2 py-1 text-center group-hover:bg-[#f5c800] group-hover:text-black transition-all">
                    View Guide →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 rounded-3xl border border-black/5 bg-gray-50">
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="text-xl font-black text-black">No destinations found</h3>
            <p className="text-black/40 mt-2 text-sm">Try a different search term or browse by letter above.</p>
            <button onClick={resetFilters} className="mt-5 px-6 py-3 bg-[#f5c800] rounded-xl font-black text-sm">Show All Countries</button>
          </div>
        )}

        {totalPages > 1 && (
          <nav className="mt-12 flex justify-center items-center gap-3" aria-label="Country pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-6 py-3 rounded-xl font-bold text-black/60 disabled:opacity-30 disabled:pointer-events-none hover:text-black transition border border-black/10 hover:border-[#f5c800]/40"
            >← Prev</button>
            <div className="flex gap-1.5">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  onClick={() => setCurrentPage(n)}
                  aria-label={`Page ${n}`}
                  aria-current={currentPage === n ? "page" : undefined}
                  className={`w-10 h-10 rounded-xl font-black text-sm transition-all ${currentPage === n ? "bg-[#f5c800] text-black shadow-md" : "text-black/40 hover:text-black bg-gray-50 border border-black/5"}`}
                >{n}</button>
              ))}
              {totalPages > 7 && <span className="w-10 h-10 flex items-center justify-center text-black/30">…</span>}
            </div>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-6 py-3 rounded-xl font-bold text-black/60 disabled:opacity-30 disabled:pointer-events-none hover:text-black transition border border-black/10 hover:border-[#f5c800]/40"
            >Next →</button>
          </nav>
        )}
      </main>

      {/* ── WHY CHOOSE US ────────────────────────────────────────────────────── */}
      <section className="border-t border-black/5 py-24 bg-gray-50" aria-labelledby="why-heading">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16">
            <p className="text-[#f5c800] text-xs font-black uppercase tracking-widest mb-3">Why Thousands of Ghanaians Trust Us</p>
            <h2 id="why-heading" className="text-4xl md:text-5xl font-black text-black mb-4">
              Ghana's Most Trusted<br />Tourist Visa Consultancy
            </h2>
            <p className="text-black/40 max-w-xl mx-auto text-sm leading-relaxed">
              We don't just tell you what documents you need — we verify them, format them, and ensure your Ghanaian passport application is embassy-ready.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_US.map((w, i) => (
              <div key={i} className="p-7 rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-5">{w.icon}</div>
                <h3 className="font-black text-black text-lg mb-2">{w.title}</h3>
                <p className="text-sm text-black/40 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────────── */}
      <section className="py-20 max-w-6xl mx-auto px-5" aria-labelledby="testimonials-heading">
        <div className="text-center mb-12">
          <p className="text-[#f5c800] text-xs font-black uppercase tracking-widest mb-3">Real Stories</p>
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-black text-black">Approved — Ghanaian Passport Holders</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="p-7 rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex gap-1 mb-4">{"★".repeat(t.stars).split("").map((s, j) => <span key={j} className="text-[#f5c800] text-sm">{s}</span>)}</div>
              <p className="text-black/70 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
              <div>
                <p className="font-black text-black text-sm">{t.name}</p>
                <p className="text-xs text-[#f5c800] font-bold">{t.country}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SEO INTERNAL LINK SECTION ─────────────────────────────────────────── */}
      <section className="border-t border-black/5 py-20 bg-gray-50" aria-labelledby="guides-heading">
        <div className="max-w-6xl mx-auto px-5">
          <h2 id="guides-heading" className="text-2xl md:text-3xl font-black text-black mb-3">
            Popular Tourist Visa Guides — Ghanaian Nationals 2026
          </h2>
          <p className="text-black/40 text-sm mb-10">
            Complete visa guides with required documents, embassy fees, bank balance requirements &amp; expert tips for Ghanaian passport holders
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SEO_LINKS.map((link, i) => (
              <Link
                key={i}
                href={`/visa/ghana/${link.slug}`}
                className="flex items-start gap-3 p-4 rounded-xl border border-black/5 bg-white hover:border-[#f5c800]/30 hover:shadow-md transition-all group"
                title={`${link.name} — Complete guide for Ghanaian passport holders`}
              >
                <span className="text-[#f5c800] font-black text-lg mt-0.5">→</span>
                <div>
                  <p className="font-bold text-black/80 text-sm group-hover:text-black transition">{link.name}</p>
                  <p className="text-xs text-black/35 mt-0.5">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO ARTICLE FOOTER ────────────────────────────────────────────────── */}
      <section className="border-t border-black/5 py-20" aria-label="About tourist visa for Ghanaian nationals">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="text-2xl font-black text-black mb-8">Tourist Visa for Ghanaian Nationals — Complete Guide 2026</h2>
          <div className="grid md:grid-cols-2 gap-8 text-sm text-black/50 leading-relaxed">
            <div className="space-y-4">
              <p>
                We are a leading visa consultancy for Ghanaian nationals, helping thousands of Ghanaian passport holders secure visas for{" "}
                <strong className="text-black/80">USA, UK, Canada, Schengen, Japan, Australia</strong> and 200+ destinations worldwide.
                Our embassy-certified consultants prepare every document to the exact specification required by each embassy — built for Ghanaian applicants.
              </p>
              <p>
                From <strong className="text-black/80">bank statement formatting</strong> and sponsor letter drafting to photo compliance checks and cover letter writing — we handle everything so your Ghanaian passport application is complete, accurate, and embassy-ready from Accra, Kumasi, Takoradi, or wherever you are in Ghana.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                Our 2026 visa guides are updated monthly based on official embassy circulars from the US Embassy Accra, British High Commission Ghana, and VFS Global Ghana.
                We track policy changes specifically affecting Ghanaian nationals — so you don't have to.
              </p>
              <p>
                Whether you are applying from Accra or Kumasi, our expert consultants provide personalised guidance — from document preparation to application submission and passport collection at VFS Global centres and embassy collection points across Ghana.
              </p>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-black/5">
            <p className="text-xs text-black/25 font-bold uppercase tracking-widest mb-4">More Visa Guides</p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Tourist Visa",  href: "/visa/tourist-visa" },
                { label: "Business Visa", href: "/visa/business-visa" },
                { label: "Student Visa",  href: "/visa/student-visa" },
                { label: "Schengen Visa", href: "/visa/schengen-visa" },
                { label: "USA Visa",      href: "/visa/ghana/united-states" },
                { label: "UK Visa",       href: "/visa/ghana/united-kingdom" },
                { label: "Canada Visa",   href: "/visa/ghana/canada" },
              ].map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-xs font-bold text-black/40 hover:text-[#f5c800] transition border border-black/10 px-3 py-1.5 rounded-lg hover:border-[#f5c800]/30 bg-white"
                >{link.label}</Link>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-black/5">
            <p className="text-xs text-black/25 font-bold uppercase tracking-widest mb-4">Frequently Asked Questions</p>
            <div className="space-y-4 text-sm">
              {[
                {
                  q: "Which countries can Ghanaian nationals visit without a visa in 2026?",
                  a: "Ghanaian passport holders enjoy visa-free or visa-on-arrival access to around 60–65 countries — one of the stronger West African passports. These include Kenya, Senegal, Seychelles, Cape Verde, Maldives, Malaysia (30 days), Singapore (30 days), Barbados, Haiti, and several Caribbean and African nations. Use our country search above to check exact requirements for any destination.",
                },
                {
                  q: "How much bank balance is required for a tourist visa for Ghanaian nationals?",
                  a: "Most embassies expect a minimum equivalent of USD 2,500–6,000 (approximately GHS 30,000–75,000 at current rates) for solo travel with 3–6 months of stable Ghanaian bank transaction history. Schengen visas typically require €3,000–5,000 equivalent. USA and UK require strong financial documentation showing consistent income, savings, and assets in Ghana.",
                },
                {
                  q: "What documents do Ghanaian nationals need for a tourist visa application?",
                  a: "Core documents include: valid Ghanaian passport (minimum 6 months validity), Ghanaian bank statements (6 months), proof of employment or business registration in Ghana, confirmed flight and hotel bookings, travel insurance, and a clear cover letter explaining purpose of travel and ties to Ghana. Specific requirements vary by destination country.",
                },
                {
                  q: "Where do Ghanaian nationals submit visa applications?",
                  a: "Depending on the destination country, you submit at the respective embassy or high commission in Accra, at a VFS Global Ghana centre, or through an authorised visa application centre. US visa applicants attend interviews at the US Embassy in Accra. Our team confirms the correct submission point for your target country.",
                },
                {
                  q: "How long does visa processing take for Ghanaian passport holders?",
                  a: "Processing times vary: Schengen typically 15–20 working days from Ghana, UK 3–4 weeks, USA 2–8 months (interview wait times at the US Embassy in Accra — check the current wait time on the US Embassy Ghana website), Canada 6–12 weeks, Japan 5–7 working days. Always apply as early as possible and keep your travel dates flexible where possible.",
                },
              ].map((faq, i) => (
                <details key={i} className="border border-black/5 rounded-xl overflow-hidden group">
                  <summary className="px-5 py-4 cursor-pointer font-bold text-black/80 text-sm flex items-center justify-between list-none hover:bg-gray-50">
                    {faq.q}
                    <span className="text-[#f5c800] font-black group-open:rotate-45 transition-transform inline-block">+</span>
                  </summary>
                  <div className="px-5 pb-4 pt-2 text-sm text-black/50 leading-relaxed">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}