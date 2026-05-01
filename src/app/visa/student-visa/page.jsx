"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createSlug } from "@/app/lib/utils";
import {
  GraduationCap, Search, ChevronRight, Globe, BookOpen,
  Award, Users, ArrowRight, TrendingUp, Clock,
  CheckCircle, Shield, Phone, X
} from "lucide-react";

function StudyAbroadSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Student Visa Guide for Bangladeshi Students 2026 — 200+ Countries",
    "description": "Complete student visa requirements, scholarship opportunities, document checklists and processing timelines for 200+ countries for Bangladeshi students — updated for 2026.",
    "url": "https://www.eammu.com/study-abroad/student-visa",
    "publisher": {
      "@type": "Organization",
      "name": "Eammu Holidays",
      "url": "https://www.eammu.com",
      "logo": "https://www.eammu.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+880-163-131-2524",
        "contactType": "customer service",
        "areaServed": "BD",
        "availableLanguage": ["English", "Bengali"]
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eammu.com" },
        { "@type": "ListItem", "position": 2, "name": "Study Abroad", "item": "https://www.eammu.com/visa/student-visa" },
        { "@type": "ListItem", "position": 3, "name": "Student Visa", "item": "https://www.eammu.com/visa/student-visa" }
      ]
    }
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

const POPULAR_DESTINATIONS = [
  { country: "Canada", slug: "canada", emoji: "🍁", tag: "Most Popular" },
  { country: "United Kingdom", slug: "united-kingdom", emoji: "🇬🇧", tag: "Top Ranked" },
  { country: "Australia", slug: "australia", emoji: "🦘", tag: "Work Rights" },
  { country: "Germany", slug: "germany", emoji: "🇩🇪", tag: "Free Tuition" },
  { country: "USA", slug: "usa", emoji: "🇺🇸", tag: "Top Universities" },
  { country: "Malaysia", slug: "malaysia", emoji: "🇲🇾", tag: "Affordable" },
  { country: "Japan", slug: "japan", emoji: "🇯🇵", tag: "Scholarships" },
  { country: "New Zealand", slug: "new-zealand", emoji: "🥝", tag: "PR Pathway" },
];

const VISA_CATEGORIES = [
  { label: "Tourist Visa", href: "/visa/tourist-visa", icon: "✈️" },
  { label: "Work Visa", href: "/visa/work-visa", icon: "💼" },
  { label: "Business Visa", href: "/visa/business-visa", icon: "🏢" },
  { label: "Medical Visa", href: "/visa/medical-visa", icon: "🏥" },
  { label: "PR / Immigrant Visa", href: "/visa/pr-visa", icon: "🏡" },
];

export default function StudentVisa() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [countries, setCountries] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);
  const itemsPerPage = 12;

  const slides = [
    { src: "/denmark-bottom-slides.jpg", alt: "International students in Copenhagen — Denmark student visa guide 2026" },
    { src: "/study-uk-banner.jpg", alt: "UK student visa for Bangladeshi students — complete guide 2026" },
    { src: "/russia-header.jpg", alt: "Study in Russia — student visa requirements for Bangladesh passport holders" },
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(interval);
  }, []);

  // Fetch countries from API
  useEffect(() => {
    fetch("/api/countries")
      .then((r) => r.json())
      .then(setCountries)
      .catch(console.error);
  }, []);

  // Compute suggestions whenever searchTerm or countries changes
  useEffect(() => {
    const term = searchTerm.trim().toLowerCase();
    if (term.length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      setHighlightedIndex(-1);
      return;
    }
    const matches = countries
      .filter((c) => c.country?.toLowerCase().includes(term))
      .slice(0, 8);
    setSuggestions(matches);
    setShowSuggestions(matches.length > 0);
    setHighlightedIndex(-1);
  }, [searchTerm, countries]);

  // Close dropdown on outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (
        searchRef.current && !searchRef.current.contains(e.target) &&
        dropdownRef.current && !dropdownRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  // Filter countries for main grid
  const filteredCountries = countries.filter((c) => {
    const matchL = selectedLetter === "All" || c.country?.[0]?.toUpperCase() === selectedLetter;
    const matchS = c.country?.toLowerCase().includes(searchTerm.trim().toLowerCase());
    return matchL && matchS;
  });

  const totalPages = Math.ceil(filteredCountries.length / itemsPerPage);
  const currentItems = filteredCountries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const alphabet = ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

  function handleSearchChange(e) {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
    setSelectedLetter("All");
  }

  function handleSuggestionClick(c) {
    setSearchTerm(c.country);
    setShowSuggestions(false);
    setCurrentPage(1);
    setSelectedLetter("All");
    setTimeout(() => {
      document.getElementById("all-countries")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }

  function handleClearSearch() {
    setSearchTerm("");
    setSuggestions([]);
    setShowSuggestions(false);
    setCurrentPage(1);
    setSelectedLetter("All");
    searchRef.current?.focus();
  }

  function handleLetterClick(letter) {
    setSelectedLetter(letter);
    setCurrentPage(1);
    setSearchTerm("");
    setSuggestions([]);
    setShowSuggestions(false);
  }

  function handleKeyDown(e) {
    if (!showSuggestions) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.min(i + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[highlightedIndex]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  }

  function highlightMatch(text, query) {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-yellow-200 text-black rounded px-0.5 not-italic">{text.slice(idx, idx + query.length)}</mark>
        {text.slice(idx + query.length)}
      </>
    );
  }

  const stats = [
    { icon: <Globe size={18} />, value: "200+", label: "Countries" },
    { icon: <GraduationCap size={18} />, value: "98%", label: "Visa Success" },
    { icon: <Award size={18} />, value: "500+", label: "Scholarships" },
    { icon: <Users size={18} />, value: "10K+", label: "Students Helped" },
  ];

  return (
    <>
      <StudyAbroadSchema />
      <div className="min-h-screen bg-[#F0F2F5]" style={{ fontFamily: "'DM Sans','Plus Jakarta Sans',system-ui,sans-serif" }}>

        {/* ── HERO — 70vh ─────────────────────────────────────────────────── */}
        <section aria-label="Hero" className="relative w-full flex items-center justify-center overflow-hidden" style={{ minHeight: "70vh" }}>
          {slides.map((img, i) => (
            <div key={i} className={`absolute inset-0 transition-opacity duration-1000 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}>
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading={i === 0 ? "eager" : "lazy"} />
              <div className="absolute inset-0 bg-gradient-to-b from-black/76 via-black/62 to-black/88" />
            </div>
          ))}

          {/* Slide dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} aria-label={`Slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${i === currentSlide ? "w-7 h-2.5 bg-yellow-400" : "w-2.5 h-2.5 bg-white/35 hover:bg-white/60"}`}
              />
            ))}
          </div>

          <div className="relative z-10 w-full max-w-5xl mx-auto px-5 py-12 text-center">

            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 bg-yellow-400 text-black text-xs font-black px-5 py-2.5 rounded-full mb-5 uppercase tracking-widest shadow-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-black/25 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-black/50" />
              </span>
              Bangladesh's #1 Student Visa Consultancy
            </div>

            {/* H1 — 3xl mobile / 5xl desktop */}
            <h1 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
              Study Abroad Visa Guide
              <br />
              <span className="text-yellow-400">for Bangladeshi Students</span>
            </h1>

            <p className="speakable-summary text-white/70 text-sm md:text-base max-w-2xl mx-auto mb-6 leading-relaxed font-medium">
              Complete student visa requirements, scholarships, document checklists and processing timelines for{" "}
              <strong className="text-white">200+ countries</strong> — updated for {new Date().getFullYear()}.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-2.5 mb-7">
              {stats.map((s, i) => (
                <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 px-4 py-2.5 rounded-2xl text-xs font-bold text-white">
                  <span className="text-yellow-400">{s.icon}</span>
                  <span className="text-yellow-400 font-black">{s.value}</span>
                  <span className="text-white/65">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Search & Filter */}
            <div className="bg-white rounded-3xl shadow-2xl p-5 md:p-7">

              {/* Search row */}
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" aria-hidden="true" />

                  <input
                    ref={searchRef}
                    type="text"
                    value={searchTerm}
                    placeholder="Search country (e.g. Canada, UK, Germany...)"
                    aria-label="Search destination country"
                    aria-autocomplete="list"
                    aria-controls="country-suggestions"
                    aria-expanded={showSuggestions}
                    autoComplete="off"
                    spellCheck="false"
                    className="w-full pl-12 pr-10 py-4 rounded-2xl border-2 border-gray-100 focus:border-yellow-400 focus:ring-0 outline-none transition text-sm md:text-base bg-gray-50 text-gray-800 font-medium placeholder:text-gray-400"
                    onChange={handleSearchChange}
                    onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                    onKeyDown={handleKeyDown}
                  />

                  {/* Clear button */}
                  {searchTerm && (
                    <button onClick={handleClearSearch} aria-label="Clear search"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-700 transition z-10"
                    >
                      <X size={12} />
                    </button>
                  )}

                  {/* ── SUGGESTIONS DROPDOWN ─────────────────────────── */}
                  {showSuggestions && suggestions.length > 0 && (
                    <ul
                      id="country-suggestions"
                      ref={dropdownRef}
                      role="listbox"
                      aria-label="Country suggestions"
                      className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden z-50"
                      style={{ maxHeight: "288px", overflowY: "auto" }}
                    >
                      {suggestions.map((s, i) => (
                        <li
                          key={s.code || s.country}
                          role="option"
                          aria-selected={i === highlightedIndex}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => handleSuggestionClick(s)}
                          onMouseEnter={() => setHighlightedIndex(i)}
                          className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors select-none ${
                            i === highlightedIndex ? "bg-yellow-50" : "hover:bg-gray-50"
                          } ${i !== 0 ? "border-t border-gray-100" : ""}`}
                        >
                          {s.flag && (
                            <img src={s.flag} alt="" className="w-8 h-5 object-cover rounded shrink-0" loading="lazy" aria-hidden="true" />
                          )}
                          <div className="flex flex-col min-w-0 flex-1">
                            <span className="text-sm font-black text-gray-800 truncate">
                              {highlightMatch(s.country, searchTerm)}
                            </span>
                            <span className="text-[10px] text-gray-400 font-medium">Student Visa Guide · {new Date().getFullYear()}</span>
                          </div>
                          <ArrowRight size={13} className="text-yellow-500 shrink-0" />
                        </li>
                      ))}
                      {/* View all footer */}
                      {filteredCountries.length > suggestions.length && (
                        <li
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => { setShowSuggestions(false); setTimeout(() => document.getElementById("all-countries")?.scrollIntoView({ behavior: "smooth" }), 100); }}
                          className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-50 text-xs font-black text-gray-500 hover:text-yellow-700 hover:bg-yellow-50 cursor-pointer border-t border-gray-100 transition-colors"
                        >
                          <BookOpen size={12} />
                          View all {filteredCountries.length} matching countries ↓
                        </li>
                      )}
                    </ul>
                  )}
                </div>

                {/* Count */}
                <div className="bg-gray-50 border-2 border-gray-100 text-gray-600 px-5 py-4 rounded-2xl font-black text-sm flex items-center gap-2 whitespace-nowrap shrink-0">
                  <BookOpen size={15} className="text-yellow-500" />
                  <span className="text-yellow-600 font-black">{filteredCountries.length}</span> countries
                </div>
              </div>

              {/* Alphabet filter */}
              <div className="border-t-2 border-gray-100 pt-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3 text-left">Filter by first letter</p>
                <div className="flex flex-wrap gap-1" role="group" aria-label="Filter by letter">
                  {alphabet.map((letter) => (
                    <button
                      key={letter}
                      onClick={() => handleLetterClick(letter)}
                      aria-pressed={selectedLetter === letter}
                      aria-label={letter === "All" ? "Show all countries" : `Countries starting with ${letter}`}
                      className={`flex items-center justify-center min-w-[32px] h-[32px] px-1 rounded-xl text-xs font-black transition-all duration-150 ${
                        selectedLetter === letter
                          ? "bg-black text-yellow-400 shadow-lg scale-105"
                          : "bg-gray-100 text-gray-500 hover:bg-yellow-50 hover:text-yellow-700"
                      }`}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BREADCRUMB ───────────────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="max-w-[1400px] mx-auto px-5 pt-6 pb-2">
          <ol className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold flex-wrap">
            <li><Link href="/" className="hover:text-yellow-600 transition">Home</Link></li>
            <li><ChevronRight size={11} className="text-gray-400" /></li>
            <li><Link href="/visa/student-visa" className="hover:text-yellow-600 transition">Study Abroad</Link></li>
            <li><ChevronRight size={11} className="text-gray-400" /></li>
            <li><span className="text-gray-800">Student Visa</span></li>
          </ol>
        </nav>

        {/* ── POPULAR DESTINATIONS ─────────────────────────────────────────── */}
        <section aria-label="Popular student visa destinations" className="max-w-[1400px] mx-auto px-5 py-8">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-600 mb-1">Most Searched</p>
              <h2 className="text-xl font-black text-gray-900">Popular Study Destinations from Bangladesh</h2>
            </div>
            <a href="#all-countries" className="hidden md:flex items-center gap-1 text-xs font-black text-yellow-600 hover:text-yellow-700 transition">
              View All <ArrowRight size={13} />
            </a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {POPULAR_DESTINATIONS.map((dest) => (
              <Link key={dest.slug} href={`/visa/student-visa/${dest.slug}`}
                title={`Study in ${dest.country} — Student Visa Guide for Bangladeshi Students ${new Date().getFullYear()}`}
                className="group bg-white border-2 border-gray-100 hover:border-yellow-400 rounded-2xl p-4 text-center flex flex-col items-center gap-2 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 no-underline"
              >
                <span className="text-3xl">{dest.emoji}</span>
                <span className="text-xs font-black text-gray-800 group-hover:text-black leading-tight">{dest.country}</span>
                <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-700">{dest.tag}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── VISA CROSSLINKS ──────────────────────────────────────────────── */}
        <section aria-label="Other visa categories" className="max-w-[1400px] mx-auto px-5 pb-4">
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-4 flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Other Visa Types:</span>
            {VISA_CATEGORIES.map((v) => (
              <Link key={v.href} href={v.href} title={`${v.label} from Bangladesh`}
                className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-black hover:bg-yellow-50 px-3 py-1.5 rounded-xl border border-gray-100 hover:border-yellow-300 transition-all no-underline"
              >
                <span>{v.icon}</span> {v.label}
              </Link>
            ))}
          </div>
        </section>

        {/* ── SEO INTRO ────────────────────────────────────────────────────── */}
        <section className="max-w-[1400px] mx-auto px-5 py-6">
          <div className="bg-white rounded-3xl border-2 border-gray-100 p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 leading-tight">
                  Student Visa Guide for Bangladeshi Students — {new Date().getFullYear()}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Planning to study abroad from Bangladesh? Our comprehensive <strong>student visa guide</strong> covers all popular destinations including{" "}
                  <Link href="/study-abroad/student-visa/canada" className="text-yellow-600 font-bold hover:underline">Canada student visa</Link>,{" "}
                  <Link href="/study-abroad/student-visa/united-kingdom" className="text-yellow-600 font-bold hover:underline">UK student visa</Link>,{" "}
                  <Link href="/study-abroad/student-visa/australia" className="text-yellow-600 font-bold hover:underline">Australia student visa</Link>,{" "}
                  <Link href="/study-abroad/student-visa/germany" className="text-yellow-600 font-bold hover:underline">Germany student visa</Link>, and{" "}
                  <Link href="/study-abroad/student-visa/usa" className="text-yellow-600 font-bold hover:underline">USA student visa</Link> — all updated for {new Date().getFullYear()}.
                </p>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Each guide includes IELTS/PTE requirements, bank balance needed, document checklist, scholarship info, processing times, and a step-by-step application roadmap for Bangladesh passport holders.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <CheckCircle size={20} className="text-green-600" />, title: "Document Checklists", desc: "Complete verified lists for every country" },
                  { icon: <TrendingUp size={20} className="text-blue-600" />, title: "Scholarship Guides", desc: "500+ scholarships for Bangladeshi students" },
                  { icon: <Clock size={20} className="text-yellow-600" />, title: "Processing Times", desc: "Current 2026 visa processing durations" },
                  { icon: <Shield size={20} className="text-purple-600" />, title: "98% Success Rate", desc: "Expert guidance, minimal rejections" },
                ].map((f, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-5 border-2 border-gray-100 hover:border-yellow-200 transition-all">
                    <div className="mb-2">{f.icon}</div>
                    <p className="font-black text-gray-800 text-sm mb-1">{f.title}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── COUNTRIES GRID ───────────────────────────────────────────────── */}
        <section id="all-countries" aria-label="All student visa destination countries" className="max-w-[1400px] mx-auto px-5 py-8 pb-16">
          <div className="flex items-end justify-between mb-7">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-600 mb-1">
                {selectedLetter !== "All" ? `Countries — "${selectedLetter}"` : "All Destinations"}
                {searchTerm && ` · "${searchTerm}"`}
              </p>
              <h2 className="text-2xl font-black text-gray-900">Student Visa Guide — {filteredCountries.length} Countries</h2>
            </div>
            <span className="hidden md:flex text-xs font-bold text-gray-400">Page {currentPage} / {totalPages || 1}</span>
          </div>

          {currentItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {currentItems.map((c, index) => (
                <Link key={`${c.code}-${index}`}
                  href={`/visa/student-visa/${createSlug(c.country)}`}
                  title={`Study in ${c.country} — Student Visa Requirements for Bangladeshi Students ${new Date().getFullYear()}`}
                  className="group bg-white rounded-3xl overflow-hidden border-2 border-gray-100 hover:border-yellow-400 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col no-underline"
                >
                  <div className="relative h-40 overflow-hidden bg-gray-100">
                    <img src={c.flag} alt={`${c.country} — student visa guide for Bangladeshi students`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy" width="400" height="160"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-3 right-3 bg-yellow-400 text-black text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                      {new Date().getFullYear()} Guide
                    </div>
                  </div>
                  <div className="p-6 flex flex-col grow">
                    <div className="flex-1 mb-4">
                      <h3 className="text-gray-900 text-lg font-black mb-1 tracking-tight group-hover:text-black transition-colors">
                        Study in {c.country}
                      </h3>
                      <p className="text-gray-400 text-xs font-medium">Student Visa · Scholarships · Requirements</p>
                    </div>
                    <div className="flex items-center justify-between bg-gray-50 group-hover:bg-yellow-50 rounded-2xl px-4 py-3 transition-colors border-2 border-gray-100 group-hover:border-yellow-300">
                      <span className="text-xs font-black text-gray-600 group-hover:text-black transition-colors">Full Visa Guide →</span>
                      <ArrowRight size={14} className="text-gray-400 group-hover:text-yellow-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-gray-100">
              <div className="text-6xl mb-5">🔍</div>
              <h3 className="text-xl font-black text-gray-800 mb-2">No countries found</h3>
              <p className="text-gray-400 text-sm mb-5">Try a different search term or letter filter.</p>
              <button onClick={handleClearSearch}
                className="px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black rounded-2xl font-black text-sm transition-all"
              >Clear Search</button>
            </div>
          )}

          {totalPages > 1 && (
            <nav aria-label="Pagination" className="mt-12 pt-8 border-t border-gray-200 flex justify-center items-center gap-4">
              <button disabled={currentPage === 1}
                onClick={() => { setCurrentPage(p => p - 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                aria-label="Previous page"
                className="px-7 py-3.5 bg-white border-2 border-gray-200 rounded-2xl text-gray-700 font-black text-sm disabled:opacity-40 disabled:pointer-events-none hover:border-yellow-400 hover:text-black transition"
              >← Previous</button>
              <span className="text-sm font-black text-gray-600 px-5 py-3 bg-white rounded-2xl border-2 border-gray-100" aria-live="polite">
                {currentPage} / {totalPages}
              </span>
              <button disabled={currentPage === totalPages}
                onClick={() => { setCurrentPage(p => p + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                aria-label="Next page"
                className="px-7 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black rounded-2xl font-black text-sm disabled:opacity-40 disabled:pointer-events-none transition shadow-lg"
              >Next →</button>
            </nav>
          )}
        </section>

        {/* ── WHY EAMMU ────────────────────────────────────────────────────── */}
        <section aria-label="Why choose Eammu Holidays" className="bg-white py-16 px-5">
          <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-600 mb-2">Why Students Trust Us</p>
              <h2 className="text-3xl font-black text-gray-900">Bangladesh's Most Trusted Student Visa Consultant</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "🎯", title: "Expert Visa Guidance", desc: "Our consultants have helped 10,000+ Bangladeshi students secure visas for top universities worldwide." },
                { icon: "📋", title: "Complete Document Support", desc: "From SOP writing to bank statement review — we handle every document with precision to maximize approval rates." },
                { icon: "🏆", title: "98% Visa Success Rate", desc: "Industry-leading approval rate across Canada, UK, Australia, Germany, USA, Malaysia and 200+ countries." },
              ].map((f, i) => (
                <div key={i} className="bg-gray-50 rounded-3xl p-8 border-2 border-gray-100 hover:border-yellow-300 hover:shadow-lg transition-all">
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className="font-black text-gray-900 text-lg mb-3">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 bg-gray-50 rounded-3xl p-8 border-2 border-gray-100">
              <h3 className="font-black text-gray-900 text-lg mb-5">Popular Student Visa Guides</h3>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { href: "/visa/student-visa/canada", label: "Canada Student Visa 2026" },
                  { href: "/visa/student-visa/united-kingdom", label: "UK Student Visa 2026" },
                  { href: "/visa/student-visa/australia", label: "Australia Student Visa 2026" },
                  { href: "/visa/student-visa/germany", label: "Germany Student Visa 2026" },
                  { href: "/visa/student-visa/usa", label: "USA F-1 Student Visa 2026" },
                  { href: "/visa/student-visa/malaysia", label: "Malaysia Student Visa 2026" },
                  { href: "/visa/student-visa/japan", label: "Japan Student Visa 2026" },
                  { href: "/visa/student-visa/new-zealand", label: "New Zealand Student Visa 2026" },
                ].map((l) => (
                  <Link key={l.href} href={l.href} title={l.label}
                    className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-black p-3 bg-white rounded-xl border-2 border-gray-100 hover:border-yellow-300 transition-all no-underline"
                  >
                    <ChevronRight size={13} className="text-yellow-500 shrink-0" />{l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section aria-label="Student visa FAQ" className="max-w-[1400px] mx-auto px-5 py-16">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-600 mb-2">Common Questions</p>
              <h2 className="text-3xl font-black text-gray-900 mb-6">Student Visa FAQ — Bangladesh</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Answers to the most frequently asked questions about studying abroad from Bangladesh.
                For country-specific queries, visit individual country guides or{" "}
                <Link href="https://wa.me/8801631312524" className="text-yellow-600 font-bold hover:underline">WhatsApp our consultants</Link>.
              </p>
              <a href="https://wa.me/8801631312524" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black rounded-2xl font-black text-sm transition-all no-underline shadow-lg"
              >
                <Phone size={15} /> Ask Your Question
              </a>
            </div>
            <div className="space-y-3">
              {[
                { q: "Which country is best for Bangladeshi students?", a: "Canada, UK, Australia, Germany, and Malaysia are the top choices in 2026 due to strong post-study work rights, scholarship opportunities, and affordable tuition. Canada and Australia offer the best PR pathways after study." },
                { q: "How much IELTS score is needed for student visa?", a: "Most countries require IELTS Academic 6.0–6.5 overall. UK universities often require 6.5, Australian universities 6.0–6.5, and Canadian institutions 6.0+. German and Malaysian universities accept 5.5–6.0." },
                { q: "How much bank balance is required for student visa?", a: "You typically need full first-year tuition fees plus living expenses (BDT 3–10 lakh). Crucially, it must be a consistent 6–12 month banking history — not a last-minute deposit." },
                { q: "Can I work while studying abroad?", a: "Yes! Most destinations allow 20 hours/week during semester and full-time during breaks. Canada, UK, Australia, and New Zealand have the most flexible work rights." },
                { q: "How long does student visa processing take?", a: "Processing varies: Canada 4–8 weeks, UK 3–4 weeks, Australia 4–6 weeks, Germany 6–12 weeks, USA 2–4 weeks. Always apply at least 3 months before your course start date." },
              ].map((faq, i) => (
                <details key={i} className="group bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-yellow-300 transition-all">
                  <summary className="list-none flex items-center justify-between p-5 cursor-pointer">
                    <span className="font-black text-gray-800 pr-4 text-sm leading-snug">
                      <span className="text-yellow-500 mr-1.5">Q.</span>{faq.q}
                    </span>
                    <div className="w-7 h-7 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center shrink-0 group-open:bg-yellow-400 group-open:border-yellow-400 transition-all">
                      <ChevronRight size={13} className="text-gray-500 group-open:text-black rotate-90 transition-transform" />
                    </div>
                  </summary>
                  <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
        <section aria-label="Free student visa consultation" className="bg-black py-16 px-5 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 border border-yellow-400/40 text-yellow-400 text-xs font-black px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
              <GraduationCap size={14} /> Expert Student Visa Consultants — Dhaka
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to Study Abroad?</h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-lg mx-auto">
              Our student visa consultants help Bangladeshi students secure admission and visas for universities in Canada, UK, Australia, Germany, USA and 200+ countries. Free first consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`https://wa.me/8801631312524?text=${encodeURIComponent("Hi, I need help with my student visa application.")}`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-yellow-400 hover:bg-yellow-300 text-black rounded-2xl font-black transition-all text-sm shadow-xl no-underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                Free WhatsApp Consultation
              </a>
              <Link href="/visa/student-visa" className="inline-flex items-center justify-center px-8 py-5 border-2 border-white/20 text-white rounded-2xl font-black hover:bg-white/10 transition-all text-sm no-underline">
                Explore Study Abroad →
              </Link>
            </div>
            <p className="text-gray-600 text-xs mt-6">
              Also see:{" "}
              <Link href="/visa/tourist-visa" className="text-gray-500 hover:text-white underline transition">Tourist Visa</Link> ·{" "}
              <Link href="/visa/work-visa" className="text-gray-500 hover:text-white underline transition">Work Visa</Link> ·{" "}
              <Link href="/visa/business-visa" className="text-gray-500 hover:text-white underline transition">Business Visa</Link> ·{" "}
              <Link href="/contact" className="text-gray-500 hover:text-white underline transition">Contact Us</Link>
            </p>
          </div>
        </section>

      </div>
    </>
  );
}