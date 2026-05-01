"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { createSlug } from "@/app/lib/utils";

// ── SEO METADATA (export from separate metadata.js if using App Router) ──────
// export const metadata = {
//   title: "Tourist Visa from Bangladesh 2026 — 200+ Countries | Eammu Holidays",
//   description: "Apply for tourist visa from Bangladesh. Expert consultancy for USA, UK, Canada, Schengen, Japan & 200+ countries. 98% approval rate. Embassy-verified documents.",
//   keywords: "tourist visa Bangladesh 2026, visa consultancy Dhaka, USA visa Bangladesh, UK visa Bangladesh, Schengen visa Bangladesh, Canada visa Bangladesh",
// };

const POPULAR = [
  { name: "Japan", emoji: "🇯🇵" },
  { name: "Canada", emoji: "🇨🇦" },
  { name: "United States", emoji: "🇺🇸" },
  { name: "United Kingdom", emoji: "🇬🇧" },
  { name: "Australia", emoji: "🇦🇺" },
  { name: "Germany", emoji: "🇩🇪" },
  { name: "France", emoji: "🇫🇷" },
  { name: "Italy", emoji: "🇮🇹" },
  { name: "Malaysia", emoji: "🇲🇾" },
  { name: "Thailand", emoji: "🇹🇭" },
  { name: "Singapore", emoji: "🇸🇬" },
  { name: "Turkey", emoji: "🇹🇷" },
];

const WHY_US = [
  { icon: "🛡️", title: "98% Approval Rate", desc: "Our consultants have helped 50,000+ travelers get approved. We know exactly what embassies look for." },
  { icon: "📋", title: "Embassy-Accurate Docs", desc: "Every checklist verified against official embassy circulars, updated monthly for 2026 protocols." },
  { icon: "⚡", title: "24hr Document Review", desc: "Fast document review and feedback. We eliminate back-and-forth delays before submission." },
  { icon: "🌍", title: "200+ Countries Covered", desc: "Schengen to Southeast Asia — tourist, business, student, and medical visas all covered." },
];

const TESTIMONIALS = [
  { name: "Farhan Ahmed", country: "UK Visa Approved", text: "Got my UK Standard Visitor visa in 12 days. Eammu team reviewed all my bank statements and cover letter — zero issues.", stars: 5 },
  { name: "Nusrat Jahan", country: "Schengen Approved", text: "Applied for Germany Schengen through them. Perfect checklist, no rejection. Highly recommend for first-timers.", stars: 5 },
  { name: "Rafiqul Islam", country: "Canada Visa Approved", text: "Canada V-1 visa — they helped me format everything the embassy way. Approved in 3 weeks!", stars: 5 },
];

const alphabet = ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

export default function TouristVisa() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countries, setCountries] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const searchRef = useRef(null);
  const itemsPerPage = 12;

  const slides = [
    { img: "/the-love-island.webp", tag: "Island Getaways", title: "Explore Paradise" },
    { img: "/top-travel-agency-bangladesh.webp", tag: "Trusted Agency", title: "Expert Guidance" },
    { img: "/travel_banner_second_part_one.webp", tag: "200+ Countries", title: "Your World Awaits" },
  ];

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [slides.length]);

  useEffect(() => {
    fetch('/api/countries')
      .then(res => res.json())
      .then(data => { setCountries(data); setIsLoaded(true); })
      .catch(err => console.error(err));
  }, []);

  // Auto-suggestions
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

  // Close suggestions on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const filteredCountries = countries.filter(c => {
    const matchLetter = selectedLetter === "All" || c.country?.[0]?.toUpperCase() === selectedLetter;
    const matchSearch = c.country?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchLetter && matchSearch;
  });

  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const currentItems = filteredCountries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSuggestionClick = (country) => {
    setSearchTerm(country.country);
    setShowSuggestions(false);
    setCurrentPage(1);
    setSelectedLetter("All");
  };

  return (
    <div className="min-h-[60vh] bg-white text-black font-sans" style={{ fontFamily: "'Plus Jakarta Sans', 'DM Sans', system-ui, sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative w-full flex items-center justify-center overflow-hidden">
        {/* Slide backgrounds */}
        {slides.map((slide, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-1500 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
            style={{ transition: "opacity 1.5s ease" }}>
            <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.95) 100%)" }} />
          </div>
        ))}

        {/* Decorative grid */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)}
              className={`rounded-full transition-all duration-500 ${i === currentSlide ? "w-8 h-2.5 bg-[#f5c800]" : "w-2.5 h-2.5 bg-black/20 hover:bg-black/40"}`} />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 text-center pt-12">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 mb-8 rounded-full bg-white border border-black/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#f5c800] pulse-dot" />
            <span className="text-xs font-bold text-black/80 tracking-widest uppercase">200+ Countries · Expert Visa Consultancy · Dhaka</span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl lg:text-5xl font-black leading-[0.92] tracking-tight mb-6 text-black">
            Get Your <span className="text-[#f5c800]">Tourist Visa</span> Done Right, 
            <span className="text-black/30"> First Time.</span>
          </h1>

          <p className="text-black/60 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Embassy-accurate documentation for <strong className="text-black">USA B1/B2</strong>, <strong className="text-black">UK Standard Visitor</strong>,{" "}
            <strong className="text-black">Canada V-1</strong>, and the <strong className="text-black">29-country Schengen Area</strong> — handled by expert consultants.
          </p>

          {/* SEARCH CARD */}
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-3xl mx-auto border mb-16 border-black/5 shadow-2xl">
            {/* Search with autocomplete */}
            <div ref={searchRef} className="relative mb-5">
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#f5c800] z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search destination country... (e.g. Japan, Canada, Germany)"
                className="w-full pl-14 pr-5 py-5 rounded-2xl text-base font-semibold outline-none transition-all shadow-inner"
                style={{ background: "#f8f8f8", border: "1.5px solid rgba(0,0,0,0.05)", color: "black" }}
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); setSelectedLetter("All"); }}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                onKeyDown={e => {
                  if (e.key === "Escape") setShowSuggestions(false);
                  if (e.key === "Enter" && suggestions.length > 0) handleSuggestionClick(suggestions[0]);
                }}
                autoComplete="off"
              />
              {searchTerm && (
                <button onClick={() => { setSearchTerm(""); setSelectedLetter("All"); setCurrentPage(1); setSuggestions([]); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-black/30 hover:text-black hover:bg-black/5 transition text-lg font-bold">
                  ✕
                </button>
              )}

              {/* AUTO-SUGGESTION DROPDOWN */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-50 shadow-2xl bg-white border border-[#f5c800]/30">
                  <div className="p-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/30 px-3 py-2">
                      🔍 {suggestions.length} countries found
                    </p>
                    {suggestions.map((c, i) => (
                      <Link
                        key={i}
                        href={`/visa/tourist-visa/${createSlug(c.country)}-visa`}
                        onClick={() => handleSuggestionClick(c)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all cursor-pointer"
                      >
                        {c.flag && <img src={c.flag} alt={c.country} className="w-8 h-5.5 object-cover rounded shadow-sm" style={{ height: "22px" }} />}
                        <div className="text-left flex-1">
                          <p className="font-bold text-black text-sm">{c.country}</p>
                          <p className="text-[11px] text-black/40">Tourist Visa Guide → Apply Now</p>
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
                <button key={l} onClick={() => { setSelectedLetter(l); setCurrentPage(1); setShowSuggestions(false); }}
                  className={`w-8 h-8 md:w-9 md:h-9 rounded-xl text-xs font-black transition-all ${
                    selectedLetter === l
                      ? "bg-[#f5c800] text-black shadow-md scale-110"
                      : "text-black/40 hover:text-black bg-gray-100 hover:bg-gray-200"
                  }`}>
                  {l}
                </button>
              ))}
            </div>

            {/* Counter row */}
            <div className="flex items-center justify-between text-xs text-black/40 font-bold px-1">
              <span>{filteredCountries.length} destinations available</span>
              <span>2026 Embassy-Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section style={{ background: "#f5c800" }} className="py-5 shadow-sm">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {[
              { val: "50,000+", label: "Visas Processed" },
              { val: "98%", label: "Approval Rate" },
              { val: "200+", label: "Countries Covered" },
              { val: "24hr", label: "Document Review" },
              { val: "2026", label: "Updated Protocols" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-black text-black">{s.val}</p>
                <p className="text-xs font-bold text-black/60 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISA CATEGORIES (internal links) ── */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#f5c800] text-xs font-black uppercase tracking-widest mb-2">Browse by Region</p>
            <h2 className="font-display text-3xl md:text-4xl font-black text-black">Popular Visa Categories</h2>
          </div>
          <Link href="/visa" className="text-xs font-bold text-black/40 hover:text-[#f5c800] transition border border-black/10 px-4 py-2 rounded-xl hover:border-[#f5c800]/40">
            All categories →
          </Link>
        </div>
     
      </section>

      {/* ── POPULAR COUNTRIES ── */}
      <section className="max-w-6xl mx-auto px-5 pb-6">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-black uppercase tracking-widest text-black/30">🔥 Most Popular:</span>
          {POPULAR.map(({ name, emoji }) => {
            const c = countries.find(x => x.country === name);
            return (
              <Link key={name} href={`/visa/tourist-visa/${createSlug(name)}-visa`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-black/60 hover:text-black border border-black/5 hover:border-[#f5c800]/40 transition-all bg-gray-50 hover:bg-white shadow-sm">
                {c?.flag
                  ? <img src={c.flag} className="w-5 h-3.5 object-cover rounded-sm" alt="" />
                  : <span>{emoji}</span>}
                {name}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── COUNTRIES GRID ── */}
      <main className="max-w-6xl mx-auto px-5 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-black text-black">
              {selectedLetter === "All" && !searchTerm
                ? "All Visa Destinations"
                : searchTerm
                ? `Results for "${searchTerm}"`
                : `Countries — "${selectedLetter}"`}
            </h2>
            <p className="text-black/30 text-sm mt-1">{filteredCountries.length} countries · Click any to view requirements & apply</p>
          </div>
          {(selectedLetter !== "All" || searchTerm) && (
            <button onClick={() => { setSelectedLetter("All"); setSearchTerm(""); setCurrentPage(1); }}
              className="text-xs font-bold text-[#f5c800] border border-[#f5c800]/30 px-4 py-2 rounded-xl hover:bg-[#f5c800]/5 transition">
              Show All
            </button>
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
                href={`/visa/tourist-visa/${createSlug(c.country)}-visa`}
                className="group rounded-2xl overflow-hidden border border-black/5 flex flex-col bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                <div className="relative h-28 overflow-hidden bg-gray-200">
                  <img src={c.flag} alt={`${c.country} visa guide`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.2) 0%, transparent 60%)" }} />
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
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-3">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}
              className="px-6 py-3 rounded-xl font-bold text-black/60 disabled:opacity-30 disabled:pointer-events-none hover:text-black transition border border-black/10 hover:border-[#f5c800]/40">
              ← Prev
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setCurrentPage(n)}
                  className={`w-10 h-10 rounded-xl font-black text-sm transition-all ${currentPage === n ? "bg-[#f5c800] text-black shadow-md" : "text-black/40 hover:text-black bg-gray-50 border border-black/5"}`}>
                  {n}
                </button>
              ))}
              {totalPages > 7 && <span className="w-10 h-10 flex items-center justify-center text-black/30">...</span>}
            </div>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}
              className="px-6 py-3 rounded-xl font-bold text-black/60 disabled:opacity-30 disabled:pointer-events-none hover:text-black transition border border-black/10 hover:border-[#f5c800]/40">
              Next →
            </button>
          </div>
        )}
      </main>

      {/* ── WHY CHOOSE US ── */}
      <section className="border-t border-black/5 py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16">
            <p className="text-[#f5c800] text-xs font-black uppercase tracking-widest mb-3">Why 50,000+ Travelers Trust Us</p>
            <h2 className="font-display text-4xl md:text-5xl font-black text-black mb-4">Eammu Holidays — Bangladesh's<br />Most Trusted Visa Consultancy</h2>
            <p className="text-black/40 max-w-xl mx-auto text-sm leading-relaxed">We don't just tell you what documents you need — we verify them, format them, and ensure your application is embassy-ready.</p>
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

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 max-w-6xl mx-auto px-5">
        <div className="text-center mb-12">
          <p className="text-[#f5c800] text-xs font-black uppercase tracking-widest mb-3">Real Stories</p>
          <h2 className="font-display text-3xl md:text-4xl font-black text-black">Approved by Bangladeshi Travelers</h2>
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

      {/* ── SEO INTERNAL LINK SECTION ── */}
      <section className="border-t border-black/5 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="font-display text-2xl md:text-3xl font-black text-black mb-3">Popular Tourist Visa Guides — Bangladesh 2026</h2>
          <p className="text-black/40 text-sm mb-10">Complete visa guides with documents, fees, bank balance & application tips for Bangladesh passport holders</p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { name: "USA B1/B2 Tourist Visa", slug: "united-states", desc: "Bank statement, DS-160 form, interview tips" },
              { name: "UK Standard Visitor Visa", slug: "united-kingdom", desc: "UKVI checklist, photo specs, financial proof" },
              { name: "Canada V-1 Visitor Visa", slug: "canada", desc: "IRCC requirements, biometrics, documents" },
              { name: "Schengen Visa Guide", slug: "germany", desc: "Germany, France, Italy — single visa" },
              { name: "Japan Tourist Visa", slug: "japan", desc: "Embassy Tokyo checklist, bank balance" },
              { name: "Australia Visitor Visa", slug: "australia", desc: "Subclass 600, documents, processing time" },
              { name: "Malaysia e-Visa", slug: "malaysia", desc: "eNTRI, EVISA — quick & easy for Bangladeshis" },
              { name: "Thailand Tourist Visa", slug: "thailand", desc: "TR visa from Bangkok Embassy, Dhaka" },
              { name: "Singapore Tourist Visa", slug: "singapore", desc: "ICA requirements, tourist pass guide" },
            ].map((link, i) => (
              <Link key={i} href={`/visa/tourist-visa/${link.slug}-visa`}
                className="flex items-start gap-3 p-4 rounded-xl border border-black/5 bg-white hover:border-[#f5c800]/30 hover:shadow-md transition-all group">
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

      {/* ── SEO FOOTER ARTICLE ── */}
      <section className="border-t border-black/5 py-20">
        <div className="max-w-4xl mx-auto px-5">
          <h2 className="font-display text-2xl font-black text-black mb-8">Tourist Visa Consultancy in Bangladesh — Complete Guide 2026</h2>
          <div className="grid md:grid-cols-2 gap-8 text-sm text-black/50 leading-relaxed">
            <div className="space-y-4">
              <p>Eammu Holidays is Bangladesh's leading tourist visa consultancy, helping thousands of Bangladeshi travelers secure visas for <strong className="text-black/80">USA, UK, Canada, Schengen, Japan, Australia</strong> and 200+ destinations worldwide. Our embassy-certified consultants prepare every document to the exact specification required by each embassy.</p>
              <p>From <strong className="text-black/80">bank statement formatting</strong> and NOC drafting to photo compliance checks and cover letter writing — we handle everything so your application is complete, accurate, and approved.</p>
            </div>
            <div className="space-y-4">
              <p>Our 2026 visa guides are updated monthly based on official embassy circulars and VFS Global announcements. We track policy changes so you don't have to. Every checklist, fee, and processing timeline is verified by our team before publication.</p>
              <p>Whether you're a first-time traveler or a frequent flyer, our expert consultants provide personalized guidance — from document preparation to application submission and passport collection.</p>
            </div>
          </div>
          {/* SEO breadcrumb structured data links */}
          <div className="mt-10 pt-8 border-t border-black/5">
            <p className="text-xs text-black/25 font-bold uppercase tracking-widest mb-4">Quick Links</p>
            <div className="flex flex-wrap gap-3">
              {["Tourist Visa", "Business Visa", "Student Visa", "Medical Visa"].map(link => (
                <Link key={link} href={`/visa/${link.toLowerCase().replace(/ /g,"-")}`}
                  className="text-xs font-bold text-black/40 hover:text-[#f5c800] transition border border-black/10 px-3 py-1.5 rounded-lg hover:border-[#f5c800]/30 bg-white">
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}