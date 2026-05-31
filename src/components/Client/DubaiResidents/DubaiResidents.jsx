"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createSlug } from "@/app/lib/utils";

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
  { name: "Georgia",         emoji: "🇬🇪" },
  { name: "Azerbaijan",      emoji: "🇦🇿" },
  { name: "Armenia",         emoji: "🇦🇲" },
  { name: "Indonesia",       emoji: "🇮🇩" },
];

const WHY_US = [
  { icon: "🛡️", title: "98% Approval Rate",           desc: "Our consultants have helped 1,00,000+ Dubai residents get approved. We know exactly what embassies look for from UAE-based applicants in 2026." },
  { icon: "📋", title: "Embassy-Accurate Documents",   desc: "Every checklist verified against official embassy circulars & VFS Global announcements — updated monthly for 2026 protocols for Dubai and UAE residents." },
  { icon: "⚡", title: "24-Hour Document Review",      desc: "Rapid document review and feedback eliminates back-and-forth delays before your embassy submission from Dubai or Abu Dhabi." },
  { icon: "🌍", title: "200+ Countries Covered",       desc: "Schengen to Southeast Asia — tourist, business, student & medical visas for Dubai and UAE residents covering every major destination." },
];

const TESTIMONIALS = [
  { name: "Priya Sharma",    country: "UK Visa Approved ✅",     text: "Got my UK Standard Visitor visa in 12 days applying from Dubai. The team reviewed all my documents and cover letter — zero issues at the British Embassy in Abu Dhabi.", stars: 5 },
  { name: "Rahul Mehta",     country: "Schengen Approved ✅",    text: "Applied for Germany Schengen as a Dubai resident through them. Perfect document checklist, no rejection. Highly recommend for first-timers applying from the UAE.", stars: 5 },
  { name: "Ananya Iyer",     country: "Canada Visa Approved ✅", text: "Canada Visitor Visa (TRV) — they helped me format everything the IRCC way as a UAE resident. Approved in 3 weeks from Dubai!", stars: 5 },
  { name: "Mohammed Al-Farsi", country: "Japan Visa Approved ✅", text: "Japan tourist visa done in just 5 working days from Dubai. The checklist was perfect and the team even helped me draft the cover letter. Brilliant service!", stars: 5 },
];

/* SEO-rich individual country guide links */
const SEO_LINKS = [
  { name: "USA B1/B2 Tourist Visa",        slug: "united-states",  desc: "DS-160 form, bank statement, interview tips from Dubai" },
  { name: "UK Standard Visitor Visa",      slug: "united-kingdom", desc: "UKVI checklist, photo specs, financial proof for UAE residents" },
  { name: "Canada Visitor Visa (TRV)",     slug: "canada",         desc: "IRCC requirements, biometrics, checklist from Dubai" },
  { name: "Germany Schengen Visa",         slug: "germany",        desc: "Germany, France, Italy — single Schengen visa guide for UAE residents" },
  { name: "Japan Tourist Visa 2026",       slug: "japan",          desc: "Embassy checklist, bank balance for Dubai residents" },
  { name: "Australia Tourist Visa",        slug: "australia",      desc: "Subclass 600, documents, processing time from Dubai" },
  { name: "Malaysia e-Visa",               slug: "malaysia",       desc: "eNTRI, eVISA — quick & easy for Dubai residents" },
  { name: "Thailand Tourist Visa",         slug: "thailand",       desc: "TR visa from Royal Thai Consulate, Dubai" },
  { name: "Singapore Tourist Visa",        slug: "singapore",      desc: "ICA requirements, tourist pass guide from Dubai" },
  { name: "France Schengen Visa",          slug: "france",         desc: "VFS France Dubai — complete document checklist 2026" },
  { name: "Italy Schengen Visa",           slug: "italy",          desc: "Italian Consulate Dubai — tourist visa guide 2026" },
  { name: "Georgia e-Visa",               slug: "georgia",        desc: "E-visa on arrival for UAE residents, easy approval" },
  { name: "Armenia Visa",                  slug: "armenia",        desc: "e-Visa and on-arrival guide for Dubai residents" },
  { name: "Azerbaijan e-Visa (ASAN)",      slug: "azerbaijan",     desc: "ASAN visa, 3-day approval for Dubai residents" },
  { name: "Indonesia Visa on Arrival",     slug: "indonesia",      desc: "Bali & Jakarta — UAE resident visa guide 2026" },
  { name: "New Zealand Visitor Visa",      slug: "new-zealand",    desc: "NZeTA & visitor visa requirements from Dubai" },
  { name: "South Korea Tourist Visa",      slug: "south-korea",    desc: "K-ETA & tourist visa checklist for UAE residents" },
  { name: "Portugal Schengen Visa",        slug: "portugal",       desc: "VFS Portugal Dubai — application guide 2026" },
];

const VISA_CATEGORIES = [
  { label: "Europe & Schengen Visa",   icon: "🏰", desc: "Germany, France, Italy, Spain & 22 more Schengen nations from Dubai",  href: "/visa/dubai-residents/germany" },
  { label: "USA & North America",      icon: "🗽", desc: "USA B1/B2, Canada TRV, Mexico — complete guides for UAE residents",     href: "/visa/dubai-residents/united-states" },
  { label: "Asia Pacific Visa",        icon: "🏯", desc: "Japan, Singapore, Thailand, Malaysia, South Korea from Dubai",          href: "/visa/dubai-residents/japan" },
  { label: "Australia & New Zealand",  icon: "🦘", desc: "Australian Subclass 600, NZ Visitor Visa for UAE residents",            href: "/visa/dubai-residents/australia" },
  { label: "Business Visa Dubai",      icon: "💼", desc: "Short-stay business visas — USA, UK, Schengen & Asia from UAE",         href: "/visa/business-visa" },
  { label: "E-Visa & On Arrival",      icon: "💻", desc: "Georgia, Armenia, Azerbaijan, Indonesia, Sri Lanka — instant approvals", href: "/visa/e-visa" },
];

const STATS = [
  { val: "1,00,000+", label: "Visas Processed" },
  { val: "98%",       label: "Approval Rate" },
  { val: "200+",      label: "Countries Covered" },
  { val: "24hr",      label: "Document Review" },
  { val: "2026",      label: "Updated Protocols" },
];

/* Rich query clusters for internal linking + long-tail SEO */
const RICH_CLUSTERS = [
  {
    heading: "Schengen Visa from Dubai",
    icon: "🇪🇺",
    links: [
      { label: "Germany Schengen visa — Dubai residents",   href: "/visa/dubai-residents/germany" },
      { label: "France tourist visa from Dubai 2026",       href: "/visa/dubai-residents/france" },
      { label: "Italy Schengen visa for UAE residents",     href: "/visa/dubai-residents/italy" },
      { label: "Spain visa from Dubai — checklist",         href: "/visa/dubai-residents/spain" },
      { label: "Netherlands Schengen visa Dubai 2026",      href: "/visa/dubai-residents/netherlands" },
      { label: "Schengen visa bank statement Dubai",        href: "/schengen-visa" },
      { label: "Portugal Schengen visa Dubai residents",    href: "/visa/dubai-residents/portugal" },
      { label: "Full Schengen Hub →",                       href: "/schengen-visa" },
    ],
  },
  {
    heading: "Visa Processing Time — Dubai",
    icon: "⏱️",
    links: [
      { label: "UK visa processing time from Dubai 2026",   href: "/visa-processing-time-tracker/united-kingdom-national-visa-processing-time-for-bangladesh?type=sticker" },
      { label: "USA visa appointment wait Dubai 2026",      href: "/visa-processing-time-tracker/united-states-national-visa-processing-time-for-bangladesh" },
      { label: "Canada visa processing time UAE",           href: "/visa-processing-time-tracker/canada-national-visa-processing-time-for-bangladesh" },
      { label: "Australia visa processing time Dubai",      href: "/visa-processing-time-tracker/australia-national-visa-processing-time-for-bangladesh?type=sticker" },
      { label: "All processing time tracker →",            href: "/visa-processing-time-tracker" },
    ],
  },
  {
    heading: "Visa Rejection — Dubai Residents",
    icon: "❌",
    links: [
      { label: "Why Schengen visas get rejected from Dubai",  href: "/visa-rejection" },
      { label: "UK visa rejection reasons for UAE residents", href: "/visa-rejection" },
      { label: "USA visa denial — common reasons 2026",       href: "/visa-rejection" },
      { label: "Canada TRV refusal — how to reapply",         href: "/visa-rejection" },
      { label: "Visa rejection analyser →",                   href: "/visa-rejection" },
    ],
  },
  {
    heading: "Work & Business Visa — UAE",
    icon: "💼",
    links: [
      { label: "Business visa for Dubai residents — USA",     href: "/visa/business-visa/bangladesh-to-singapore" },
      { label: "UK business visa from Dubai 2026",            href: "/visa/business-visa" },
      { label: "Germany business visa — UAE residents",       href: "/visa/business-visa" },
      { label: "Singapore business visa from Dubai",          href: "/visa/business-visa/bangladesh-to-singapore" },
      { label: "All business visa guides →",                  href: "/visa/business-visa" },
    ],
  },
];

/* FAQ data */
const FAQS = [
  {
    q: "Which countries can Dubai residents visit without a visa in 2026?",
    a: "Dubai residents (holding a UAE residence visa) enjoy several travel benefits depending on their passport nationality. Many countries offer visa-on-arrival or e-Visa options specifically for UAE residents — including Georgia, Armenia, Azerbaijan, Indonesia, and more. Use our country search above to check requirements for any destination.",
  },
  {
    q: "How much bank balance is required for a tourist visa for Dubai residents?",
    a: "Most embassies expect the equivalent of AED 5,000–15,000 (USD 1,500–4,000) for solo travel with 3–6 months of stable UAE bank history. Schengen visas typically require €3,000–5,000 equivalent. USA and UK require strong financial documentation relative to your trip cost. Our consultants advise based on your specific destination and nationality.",
  },
  {
    q: "What documents do Dubai residents need for a tourist visa application?",
    a: "Core documents include: valid passport (6+ months validity), UAE residence visa copy, Emirates ID, UAE bank statements (3–6 months), employment or business proof in Dubai, confirmed flight and hotel bookings, travel insurance, and a personalised cover letter. Specific requirements vary by destination country and your passport nationality.",
  },
  {
    q: "Where do Dubai residents submit visa applications in the UAE?",
    a: "Depending on the destination country, you submit at the respective Embassy or Consulate in Dubai or Abu Dhabi, at a VFS Global centre in the UAE, or through a BLS/TLScontact centre. Our team will guide you to the correct submission point and appointment booking process for your target country.",
  },
  {
    q: "How long does visa processing take for Dubai residents in 2026?",
    a: "Processing times vary significantly: Schengen typically 15 working days, UK 3 weeks, USA 2–6 months (due to interview wait times at the US Embassy in Abu Dhabi), Canada 4–8 weeks, Japan 4–7 working days, Australia 4–8 weeks. Always apply well in advance and book refundable flights until your visa is approved.",
  },
  {
    q: "Can I apply for a tourist visa if I have a Dubai work visa (employment visa)?",
    a: "Yes — your UAE employment visa (work permit) is a strong document that many embassies view favourably as proof of UAE residency and employment stability. It should be combined with NOC from employer, salary slips, and bank statements. Our guides cover exact requirements for each destination.",
  },
  {
    q: "What is the success rate for tourist visa from Dubai?",
    a: "Our overall approval rate across all destinations is 98% for clients who prepare complete, embassy-accurate documents through our consultancy. The most common reason for rejection is incomplete financial documentation or a weak cover letter — both of which we handle for you.",
  },
];

const alphabet = ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function TouristVisaDubaiResidents() {
  const [searchTerm,      setSearchTerm]      = useState("");
  const [suggestions,     setSuggestions]     = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLetter,  setSelectedLetter]  = useState("All");
  const [currentPage,     setCurrentPage]     = useState(1);
  const [currentSlide,    setCurrentSlide]    = useState(0);
  const [countries,       setCountries]       = useState([]);
  const [isLoaded,        setIsLoaded]        = useState(false);
  const searchRef  = useRef(null);
  const itemsPerPage = 12;

  const slides = [
    { img: "/the-love-island.webp",               tag: "Island Getaways",  title: "Explore Paradise" },
    { img: "/top-travel-agency.webp",             tag: "Trusted Agency",   title: "Expert Guidance" },
    { img: "/travel_banner_second_part_one.webp", tag: "200+ Countries",   title: "Your World Awaits" },
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

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-[60vh] bg-white text-black font-sans"
      style={{ fontFamily: "'Plus Jakarta Sans','DM Sans',system-ui,sans-serif" }}>

      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ minHeight: "580px" }}>
        {slides.map((slide, i) => (
          <div key={i} className={`absolute inset-0 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}
            style={{ transition: "opacity 1.5s ease" }}>
            <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom,rgba(255,255,255,0.78) 0%,rgba(255,255,255,0.5) 50%,rgba(255,255,255,0.97) 100%)" }} />
          </div>
        ))}

        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.15) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-500 ${i === currentSlide ? "w-8 h-2.5 bg-[#f5c800]" : "w-2.5 h-2.5 bg-black/20 hover:bg-black/40"}`} />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 text-center pt-10 pb-20">

          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 mb-7 rounded-full bg-white border border-black/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#f5c800] animate-pulse" />
            <span className="text-xs font-bold text-black/80 tracking-widest uppercase">
              200+ Countries · Expert Visa Consultancy · Dubai &amp; UAE Residents 2026
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-3xl md:text-5xl lg:text-[52px] font-black leading-[0.95] tracking-tight mb-5 text-black">
            Tourist Visa for <span className="text-[#f5c800]">Dubai Residents</span> —<br />
            <span className="text-black/30">Done Right, First Time.</span>
          </h1>

          <p className="text-black/60 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Embassy-accurate documentation for{" "}
            <strong className="text-black">USA B1/B2</strong>,{" "}
            <strong className="text-black">UK Standard Visitor</strong>,{" "}
            <strong className="text-black">Canada TRV</strong>, and the{" "}
            <strong className="text-black">29-country Schengen Area</strong> — handled by expert visa consultants for Dubai and UAE residents.
          </p>

          {/* SEARCH CARD */}
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-3xl mx-auto border border-black/5 shadow-2xl mb-4">

            <div ref={searchRef} className="relative mb-5">
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#f5c800] z-10"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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
                aria-label="Search destination country for tourist visa from Dubai"
              />
              {searchTerm && (
                <button
                  onClick={() => { setSearchTerm(""); setSelectedLetter("All"); setCurrentPage(1); setSuggestions([]); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-black/30 hover:text-black hover:bg-black/5 transition text-lg font-bold"
                  aria-label="Clear search">✕</button>
              )}

              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-50 shadow-2xl bg-white border border-[#f5c800]/30">
                  <div className="p-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/30 px-3 py-2">
                      🔍 {suggestions.length} countries found
                    </p>
                    {suggestions.map((c, i) => (
                      <Link key={i}
                        href={`/visa/dubai-residents/${createSlug(c.country)}`}
                        onClick={() => handleSuggestionClick(c)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all cursor-pointer">
                        {c.flag && (
                          <img src={c.flag} alt={`${c.country} flag`}
                            className="w-8 object-cover rounded shadow-sm" style={{ height: "22px" }} />
                        )}
                        <div className="text-left flex-1">
                          <p className="font-bold text-black text-sm">{c.country}</p>
                          <p className="text-[11px] text-black/40">Tourist Visa Guide for Dubai Residents 2026 → Apply Now</p>
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
                  aria-label={`Filter by ${l}`}
                  className={`w-8 h-8 md:w-9 md:h-9 rounded-xl text-xs font-black transition-all ${
                    selectedLetter === l
                      ? "bg-[#f5c800] text-black shadow-md scale-110"
                      : "text-black/40 hover:text-black bg-gray-100 hover:bg-gray-200"
                  }`}>{l}</button>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-black/40 font-bold px-1">
              <span>{filteredCountries.length} destinations available for Dubai &amp; UAE residents</span>
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

      {/* ══════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════ */}
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

      {/* ══════════════════════════════════════
          QUICK RESOURCE LINKS
      ══════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-5 pt-10 pb-2">
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { label: "📋 Visa Checklist Generator", href: "/visa-resources/visa-checklist-generator" },
            { label: "⏱️ Processing Time Tracker",  href: "/visa-processing-time-tracker" },
            { label: "❌ Rejection Analyser",        href: "/visa-rejection" },
            { label: "🌐 Schengen Visa Hub",         href: "/schengen-visa" },
            { label: "🎓 Scholarship Finder",         href: "/scholarships" },
            { label: "📰 Latest Visa News",           href: "/visa-news" },
          ].map(r => (
            <Link key={r.href} href={r.href}
              className="text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200
                px-4 py-2 rounded-full hover:border-[#f5c800]/50 hover:text-black transition-all">
              {r.label}
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          VISA CATEGORIES
      ══════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-5 py-14" aria-labelledby="categories-heading">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-[#f5c800] text-xs font-black uppercase tracking-widest mb-2">Browse by Region</p>
            <h2 id="categories-heading" className="text-2xl md:text-3xl font-black text-black">
              Popular Visa Categories — Dubai &amp; UAE Residents
            </h2>
          </div>
          <Link href="/visa/dubai-residents"
            className="text-xs font-bold text-black/40 hover:text-[#f5c800] transition border border-black/10 px-4 py-2 rounded-xl hover:border-[#f5c800]/40 hidden md:block">
            All visa types →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VISA_CATEGORIES.map((cat, i) => (
            <Link key={i} href={cat.href}
              className="group flex items-start gap-4 p-5 rounded-2xl border border-black/5 bg-gray-50 hover:bg-white hover:shadow-lg hover:border-[#f5c800]/30 transition-all duration-300">
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

      {/* ══════════════════════════════════════
          POPULAR COUNTRIES QUICK LINKS
      ══════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-5 pb-6" aria-label="Popular visa destinations for Dubai residents">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-black uppercase tracking-widest text-black/30">🔥 Most Popular:</span>
          {POPULAR.map(({ name, emoji }) => {
            const c = countries.find(x => x.country === name);
            return (
              <Link key={name} href={`/visa/dubai-residents/${createSlug(name)}`}
                title={`${name} tourist visa guide for Dubai residents 2026`}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-black/60 hover:text-black border border-black/5 hover:border-[#f5c800]/40 transition-all bg-gray-50 hover:bg-white shadow-sm">
                {c?.flag
                  ? <img src={c.flag} className="w-5 object-cover rounded-sm" style={{ height: "14px" }} alt="" />
                  : <span>{emoji}</span>}
                {name}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════
          COUNTRIES GRID
      ══════════════════════════════════════ */}
      <main className="max-w-6xl mx-auto px-5 pb-16" id="all-countries" aria-labelledby="grid-heading">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 id="grid-heading" className="text-2xl md:text-3xl font-black text-black">
              {selectedLetter === "All" && !searchTerm
                ? "All Visa Destinations — Dubai Residents 2026"
                : searchTerm
                  ? `Results for "${searchTerm}"`
                  : `Countries Starting with "${selectedLetter}"`}
            </h2>
            <p className="text-black/30 text-sm mt-1">
              {filteredCountries.length} countries · Full tourist visa requirements for Dubai &amp; UAE residents
            </p>
          </div>
          {(selectedLetter !== "All" || searchTerm) && (
            <button onClick={resetFilters}
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
              <Link key={`${c.code}-${i}`}
                href={`/visa/dubai-residents/${createSlug(c.country)}`}
                title={`${c.country} tourist visa for Dubai residents — documents, fees, processing time 2026`}
                className="group rounded-2xl overflow-hidden border border-black/5 flex flex-col bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="relative h-28 overflow-hidden bg-gray-200">
                  <img src={c.flag}
                    alt={`${c.country} tourist visa guide for Dubai residents 2026`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy" />
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(to top,rgba(0,0,0,0.2) 0%,transparent 60%)" }} />
                </div>
                <div className="p-3 flex flex-col flex-1 justify-between">
                  <h3 className="text-sm font-black text-black/80 leading-tight group-hover:text-black transition-colors mb-2">
                    {c.country}
                  </h3>
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
            <button onClick={resetFilters}
              className="mt-5 px-6 py-3 bg-[#f5c800] rounded-xl font-black text-sm">
              Show All Countries
            </button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-12 flex justify-center items-center gap-3" aria-label="Country pagination">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}
              className="px-6 py-3 rounded-xl font-bold text-black/60 disabled:opacity-30 disabled:pointer-events-none hover:text-black transition border border-black/10 hover:border-[#f5c800]/40">
              ← Prev
            </button>
            <div className="flex gap-1.5">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setCurrentPage(n)}
                  aria-label={`Page ${n}`} aria-current={currentPage === n ? "page" : undefined}
                  className={`w-10 h-10 rounded-xl font-black text-sm transition-all ${currentPage === n ? "bg-[#f5c800] text-black shadow-md" : "text-black/40 hover:text-black bg-gray-50 border border-black/5"}`}>
                  {n}
                </button>
              ))}
              {totalPages > 7 && <span className="w-10 h-10 flex items-center justify-center text-black/30">…</span>}
            </div>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}
              className="px-6 py-3 rounded-xl font-bold text-black/60 disabled:opacity-30 disabled:pointer-events-none hover:text-black transition border border-black/10 hover:border-[#f5c800]/40">
              Next →
            </button>
          </nav>
        )}
      </main>

      {/* ══════════════════════════════════════
          RICH QUERY CLUSTERS (Internal Linking)
      ══════════════════════════════════════ */}
      <section className="border-t border-black/5 py-16 bg-gray-50" aria-labelledby="hub-heading">
        <div className="max-w-6xl mx-auto px-5">
          <h2 id="hub-heading" className="text-2xl font-black text-black mb-2">
            Complete Visa Resource Hub — Dubai &amp; UAE Residents
          </h2>
          <p className="text-sm text-black/40 mb-10">
            Every visa topic for UAE residents — processing times, rejection guides, Schengen hub, business &amp; work visa
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {RICH_CLUSTERS.map(cluster => (
              <div key={cluster.heading} className="bg-white border border-black/5 rounded-2xl p-5 shadow-sm">
                <h3 className="text-sm font-black text-black mb-3 flex items-center gap-2">
                  <span>{cluster.icon}</span>
                  <span>{cluster.heading}</span>
                </h3>
                <ul className="space-y-1.5">
                  {cluster.links.map(link => (
                    <li key={link.href}>
                      <Link href={link.href}
                        className="flex items-center gap-1.5 text-sm text-black/50 hover:text-black font-medium transition-colors hover:underline">
                        <span className="text-[#f5c800] text-xs font-black">›</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════ */}
      <section className="py-20 bg-white" aria-labelledby="why-heading">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <p className="text-[#f5c800] text-xs font-black uppercase tracking-widest mb-3">Why 1,00,000+ UAE Residents Trust Us</p>
            <h2 id="why-heading" className="text-3xl md:text-4xl font-black text-black mb-4">
              Dubai's Most Trusted Tourist Visa Consultancy
            </h2>
            <p className="text-black/40 max-w-xl mx-auto text-sm leading-relaxed">
              We don't just tell you what documents you need — we verify them, format them, and ensure your application is embassy-ready from Dubai.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY_US.map((w, i) => (
              <div key={i} className="p-7 rounded-2xl border border-black/5 bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-5">{w.icon}</div>
                <h3 className="font-black text-black text-lg mb-2">{w.title}</h3>
                <p className="text-sm text-black/40 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════ */}
      <section className="py-16 bg-gray-50 border-t border-black/5" aria-labelledby="testimonials-heading">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-12">
            <p className="text-[#f5c800] text-xs font-black uppercase tracking-widest mb-3">Real Stories</p>
            <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-black text-black">
              Approved by Dubai Residents
            </h2>
          </div>
          <div className="grid md:grid-cols-4 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex gap-0.5 mb-3">
                  {"★".repeat(t.stars).split("").map((s, j) => (
                    <span key={j} className="text-[#f5c800] text-sm">{s}</span>
                  ))}
                </div>
                <p className="text-black/60 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div>
                  <p className="font-black text-black text-sm">{t.name}</p>
                  <p className="text-xs text-[#f5c800] font-bold">{t.country}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          SEO INTERNAL LINK SECTION (18 guides)
      ══════════════════════════════════════ */}
      <section className="border-t border-black/5 py-16 bg-white" aria-labelledby="guides-heading">
        <div className="max-w-6xl mx-auto px-5">
          <h2 id="guides-heading" className="text-2xl md:text-3xl font-black text-black mb-2">
            Popular Tourist Visa Guides — Dubai Residents 2026
          </h2>
          <p className="text-black/40 text-sm mb-10">
            Complete visa guides with required documents, embassy fees, bank balance requirements &amp; expert tips for Dubai and UAE residents
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {SEO_LINKS.map((link, i) => (
              <Link key={i} href={`/visa/dubai-residents/${link.slug}`}
                title={`${link.name} — Complete guide for Dubai & UAE residents 2026`}
                className="flex items-start gap-3 p-4 rounded-xl border border-black/5 bg-gray-50 hover:bg-white hover:border-[#f5c800]/30 hover:shadow-md transition-all group">
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

      {/* ══════════════════════════════════════
          SEO ARTICLE + FAQ
      ══════════════════════════════════════ */}
      <section className="border-t border-black/5 py-20 bg-gray-50" aria-label="About tourist visa from Dubai">
        <div className="max-w-4xl mx-auto px-5">

          <h2 className="text-2xl font-black text-black mb-8">
            Tourist Visa Consultancy for Dubai Residents — Complete Guide 2026
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-sm text-black/50 leading-relaxed mb-10">
            <div className="space-y-4">
              <p>
                We are Dubai's leading tourist visa consultancy, helping thousands of UAE residents secure visas for{" "}
                <strong className="text-black/80">USA, UK, Canada, Schengen, Japan, Australia</strong> and 200+ destinations worldwide.
                Our embassy-certified consultants prepare every document to the exact specification required by each embassy — so your application gets approved from Dubai, first time.
              </p>
              <p>
                From{" "}
                <strong className="text-black/80">bank statement formatting</strong> and NOC letter drafting to photo compliance checks and cover letter writing —
                we handle everything so your visa application is complete, accurate, and embassy-ready whether you hold a UAE residence visa, work permit, or any other residency status in Dubai.
              </p>
              <p>
                Need to check{" "}
                <Link href="/visa-processing-time-tracker" className="text-[#d4a800] font-semibold hover:underline">visa processing times</Link>{" "}
                before booking flights? Use our live tracker covering all major embassies in Dubai and Abu Dhabi.
                Worried about{" "}
                <Link href="/visa-rejection" className="text-[#d4a800] font-semibold hover:underline">visa rejection</Link>?
                Our free rejection analyser explains exactly what to fix before reapplying.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                Our 2026 visa guides are updated monthly based on official embassy circulars and VFS Global announcements in Dubai and Abu Dhabi.
                We track policy changes across{" "}
                <Link href="/schengen-visa" className="text-[#d4a800] font-semibold hover:underline">Schengen nations</Link>,{" "}
                <Link href="/visa/dubai-residents/united-states" className="text-[#d4a800] font-semibold hover:underline">USA</Link>,{" "}
                <Link href="/visa/dubai-residents/united-kingdom" className="text-[#d4a800] font-semibold hover:underline">UK</Link>,{" "}
                and <Link href="/visa/dubai-residents/canada" className="text-[#d4a800] font-semibold hover:underline">Canada</Link> —
                so you don't have to. Every checklist, fee, and processing timeline is verified before publication.
              </p>
              <p>
                Most searched tourist visa destinations for Dubai residents in 2026:{" "}
                <Link href="/visa/dubai-residents/united-states" className="text-[#d4a800] font-semibold hover:underline">USA visa</Link>,{" "}
                <Link href="/visa/dubai-residents/united-kingdom" className="text-[#d4a800] font-semibold hover:underline">UK visa</Link>,{" "}
                <Link href="/visa/dubai-residents/germany" className="text-[#d4a800] font-semibold hover:underline">Germany Schengen</Link>,{" "}
                <Link href="/visa/dubai-residents/japan" className="text-[#d4a800] font-semibold hover:underline">Japan visa</Link>,{" "}
                <Link href="/visa/dubai-residents/canada" className="text-[#d4a800] font-semibold hover:underline">Canada TRV</Link>,{" "}
                <Link href="/visa/dubai-residents/australia" className="text-[#d4a800] font-semibold hover:underline">Australia visa</Link>.
              </p>
            </div>
          </div>

          {/* Breadcrumb-style internal nav */}
          <div className="mb-10 pt-6 border-t border-black/5">
            <p className="text-xs text-black/25 font-bold uppercase tracking-widest mb-4">More Visa Guides</p>
            <div className="flex flex-wrap gap-2.5">
              {[
                { label: "Tourist Visa",     href: "/visa/tourist-visa" },
                { label: "Business Visa",    href: "/visa/business-visa" },
                { label: "Student Visa",     href: "/visa/student-visa" },
                { label: "Transit Visa",     href: "/visa/transit-visa" },
                { label: "Schengen Visa",    href: "/schengen-visa" },
                { label: "E-Visa",           href: "/visa/e-visa" },
                { label: "Work Visa",        href: "/visa/work-visa" },
                { label: "USA Visa Dubai",   href: "/visa/dubai-residents/united-states" },
                { label: "UK Visa Dubai",    href: "/visa/dubai-residents/united-kingdom" },
                { label: "Canada Visa UAE",  href: "/visa/dubai-residents/canada" },
                { label: "Japan Visa Dubai", href: "/visa/dubai-residents/japan" },
                { label: "Visa Resources",   href: "/visa-resources" },
              ].map(link => (
                <Link key={link.label} href={link.href}
                  className="text-xs font-bold text-black/40 hover:text-black transition border border-black/10 px-3 py-1.5 rounded-lg hover:border-[#f5c800]/40 bg-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="pt-6 border-t border-black/5">
            <h3 className="text-lg font-black text-black mb-6">
              Frequently Asked Questions — Tourist Visa for Dubai Residents 2026
            </h3>
            <div className="space-y-3">
              {FAQS.map((faq, i) => (
                <details key={i} className="border border-black/5 rounded-xl overflow-hidden group bg-white">
                  <summary className="px-5 py-4 cursor-pointer font-bold text-black/80 text-sm flex items-center justify-between list-none hover:bg-gray-50 transition">
                    {faq.q}
                    <span className="text-[#f5c800] font-black group-open:rotate-45 transition-transform inline-block ml-3 shrink-0">+</span>
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