"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// SEO DATA
// ─────────────────────────────────────────────────────────────────────────────

const dynamicHeadlines = [
  { title: "Your Future", highlight: "Scholarship", subtitle: "Starts Here" },
  { title: "Discover", highlight: "Fully Funded", subtitle: "Opportunities Worldwide" },
  { title: "Study Abroad", highlight: "For Free", subtitle: "in 2026" },
];

const dynamicSubtitles = [
  "Explore 850+ verified fully funded scholarships across 260+ countries. Filter by degree, country, and funding type — updated with 2026 deadlines.",
  "Find scholarships that cover full tuition, living costs, and travel. 2026 deadlines updated weekly.",
  "International students worldwide secured full funding through our database. Start your free scholarship search today.",
];

// Rich SEO content blocks targeting high-volume queries
const seoTextBlocks = [
  {
    icon: "🎯",
    heading: "Why Use Our Scholarship Database?",
    body: "We manually verify every scholarship listed — checking official links, funding scope, eligibility, and deadlines before publishing. Our database covers government programs like Fulbright, Chevening, DAAD, and Erasmus+, plus university-direct awards and private foundation grants across every continent. Updated weekly for 2026 cycles.",
  },
  {
    icon: "🔍",
    heading: "How to Find the Right Scholarship",
    body: "Start by selecting your target country, then filter by degree level — Bachelor's, Master's, or PhD. Each listing shows the minimum GPA, language requirements (IELTS/TOEFL), application deadline, and exact funding coverage so you know exactly what you're applying for before you start.",
  },
  {
    icon: "💰",
    heading: "Fully Funded vs Partial Scholarships",
    body: "Fully funded scholarships cover 100% of tuition fees plus monthly living allowance, round-trip airfare, and health insurance. Partial awards typically cover tuition only. We tag every program clearly — filter to fully funded scholarships and study abroad at zero personal cost.",
  },
  {
    icon: "📅",
    heading: "When Do 2026 Scholarships Open?",
    body: "Most fully funded scholarship programs for the 2026–2027 academic year open applications between September and January. Chevening opens in August, Fulbright in April, and DAAD year-round. Bookmark our database and check back regularly — we flag newly opened applications within 24 hours.",
  },
  {
    icon: "🌍",
    heading: "Scholarships Without IELTS",
    body: "Many countries offer scholarships without an IELTS requirement — including Turkey (Türkiye Bursları), China (CSC), Germany (DAAD for German-taught programs), and Hungary (Stipendium Hungaricum). We tag each program with its language requirements so you can filter for no-IELTS options instantly.",
  },
  {
    icon: "🎓",
    heading: "Scholarships for Developing Countries",
    body: "Programs specifically targeting students from developing nations include the Commonwealth Scholarship, AAUW International Fellowship, and UNESCO-UNEVOC awards. Many prefer applicants from Africa, South Asia, and Latin America. Our database lets you filter by your country of origin to find the best-fit programs.",
  },
];

const popularScholarships = [
  { name: "Fulbright Program", country: "USA", slug: "united-states", tag: "Fully Funded", emoji: "🇺🇸", degree: "Master's / PhD", deadline: "Oct 2025" },
  { name: "Chevening Scholarship", country: "UK", slug: "united-kingdom", tag: "Fully Funded", emoji: "🇬🇧", degree: "Master's", deadline: "Nov 2025" },
  { name: "DAAD Scholarship", country: "Germany", slug: "germany", tag: "Fully Funded", emoji: "🇩🇪", degree: "All Levels", deadline: "Oct 2025" },
  { name: "Türkiye Bursları", country: "Turkey", slug: "turkey", tag: "Fully Funded", emoji: "🇹🇷", degree: "Bachelor's–PhD", deadline: "Feb 2026" },
  { name: "Australia Awards", country: "Australia", slug: "australia", tag: "Fully Funded", emoji: "🇦🇺", degree: "Master's", deadline: "Apr 2026" },
  { name: "Vanier CGS", country: "Canada", slug: "canada", tag: "PhD", emoji: "🇨🇦", degree: "PhD", deadline: "Nov 2025" },
  { name: "Erasmus+ Program", country: "Europe", slug: "europe", tag: "Exchange", emoji: "🇪🇺", degree: "All Levels", deadline: "Jan 2026" },
  { name: "Gates Cambridge", country: "UK", slug: "united-kingdom", tag: "PhD", emoji: "🇬🇧", degree: "PhD", deadline: "Dec 2025" },
  { name: "CSC Scholarship", country: "China", slug: "china", tag: "Fully Funded", emoji: "🇨🇳", degree: "All Levels", deadline: "Mar 2026" },
  { name: "MEXT Scholarship", country: "Japan", slug: "japan", tag: "Fully Funded", emoji: "🇯🇵", degree: "All Levels", deadline: "May 2026" },
  { name: "KGSP Scholarship", country: "South Korea", slug: "south-korea", tag: "Fully Funded", emoji: "🇰🇷", degree: "Bachelor's–PhD", deadline: "Feb 2026" },
  { name: "Stipendium Hungaricum", country: "Hungary", slug: "hungary", tag: "Fully Funded", emoji: "🇭🇺", degree: "Bachelor's–PhD", deadline: "Jan 2026" },
  { name: "NZ Scholarships", country: "New Zealand", slug: "new-zealand", tag: "Fully Funded", emoji: "🇳🇿", degree: "Master's / PhD", deadline: "Mar 2026" },
  { name: "Commonwealth Scholarship", country: "UK", slug: "united-kingdom", tag: "Fully Funded", emoji: "🇬🇧", degree: "Master's / PhD", deadline: "Oct 2025" },
  { name: "Swedish Institute", country: "Sweden", slug: "sweden", tag: "Fully Funded", emoji: "🇸🇪", degree: "Master's", deadline: "Feb 2026" },
  { name: "Orange Knowledge", country: "Netherlands", slug: "netherlands", tag: "Fully Funded", emoji: "🇳🇱", degree: "Master's", deadline: "Nov 2025" },
];

// Scholarship categories for SEO anchor linking
const scholarshipCategories = [
  { label: "Fully Funded Scholarships", href: "/scholarships", desc: "100% tuition + living + flights" },
  { label: "Bachelor's Scholarships", href: "/scholarships", desc: "Undergraduate funding 2026" },
  { label: "Master's Scholarships", href: "/scholarships", desc: "Postgraduate awards worldwide" },
  { label: "PhD Scholarships", href: "/scholarships", desc: "Doctoral research funding" },
  { label: "Scholarships Without IELTS", href: "/scholarships", desc: "No English test required" },
  { label: "Scholarships for Africans", href: "/scholarships", desc: "Africa-focused funding" },
  { label: "Government Scholarships", href: "/scholarships", desc: "State-funded programs" },
  { label: "University Scholarships", href: "/scholarships", desc: "Direct from universities" },
  { label: "STEM Scholarships", href: "/scholarships", desc: "Science, tech, engineering" },
  { label: "MBA Scholarships", href: "/scholarships", desc: "Business school funding" },
  { label: "Medical Scholarships", href: "/scholarships", desc: "Medicine & health sciences" },
  { label: "Sports Scholarships", href: "/scholarships", desc: "Athletic program funding" },
];

// Top destination countries by scholarship volume
const topDestinations = [
  { label: "USA Scholarships", href: "/scholarships/united-states", flag: "🇺🇸", count: "120+" },
  { label: "UK Scholarships", href: "/scholarships/united-kingdom", flag: "🇬🇧", count: "90+" },
  { label: "Canada Scholarships", href: "/scholarships/canada", flag: "🇨🇦", count: "75+" },
  { label: "Germany Scholarships", href: "/scholarships/germany", flag: "🇩🇪", count: "80+" },
  { label: "Australia Scholarships", href: "/scholarships/australia", flag: "🇦🇺", count: "65+" },
  { label: "France Scholarships", href: "/scholarships/france", flag: "🇫🇷", count: "55+" },
  { label: "Japan Scholarships", href: "/scholarships/japan", flag: "🇯🇵", count: "60+" },
  { label: "China Scholarships", href: "/scholarships/china", flag: "🇨🇳", count: "70+" },
  { label: "South Korea Scholarships", href: "/scholarships/south-korea", flag: "🇰🇷", count: "50+" },
  { label: "Netherlands Scholarships", href: "/scholarships/netherlands", flag: "🇳🇱", count: "45+" },
  { label: "Sweden Scholarships", href: "/scholarships/sweden", flag: "🇸🇪", count: "40+" },
  { label: "Turkey Scholarships", href: "/scholarships/turkey", flag: "🇹🇷", count: "55+" },
  { label: "Hungary Scholarships", href: "/scholarships/hungary", flag: "🇭🇺", count: "35+" },
  { label: "New Zealand Scholarships", href: "/scholarships/new-zealand", flag: "🇳🇿", count: "30+" },
  { label: "Italy Scholarships", href: "/scholarships/italy", flag: "🇮🇹", count: "40+" },
  { label: "Spain Scholarships", href: "/scholarships/spain", flag: "🇪🇸", count: "35+" },
  { label: "Norway Scholarships", href: "/scholarships/norway", flag: "🇳🇴", count: "25+" },
  { label: "Switzerland Scholarships", href: "/scholarships/switzerland", flag: "🇨🇭", count: "30+" },
];

// Scholarships by origin country — highly searched queries
const byOriginCountry = [
  { label: "Scholarships for Indians", href: "/scholarships/india", flag: "🇮🇳" },
  { label: "Scholarships for Nigerians", href: "/scholarships/nigeria", flag: "🇳🇬" },
  { label: "Scholarships for Bangladeshis", href: "/scholarships/bangladesh", flag: "🇧🇩" },
  { label: "Scholarships for Pakistanis", href: "/scholarships/pakistan", flag: "🇵🇰" },
  { label: "Scholarships for Ghanaians", href: "/scholarships/ghana", flag: "🇬🇭" },
  { label: "Scholarships for Kenyans", href: "/scholarships/kenya", flag: "🇰🇪" },
  { label: "Scholarships for Ethiopians", href: "/scholarships/ethiopia", flag: "🇪🇹" },
  { label: "Scholarships for Egyptians", href: "/scholarships/egypt", flag: "🇪🇬" },
  { label: "Scholarships for Albanians", href: "/scholarships/albania", flag: "🇦🇱" },
  { label: "Scholarships for Armenians", href: "/scholarships/armenia", flag: "🇦🇲" },
  { label: "Scholarships for Filipinos", href: "/scholarships/philippines", flag: "🇵🇭" },
  { label: "Scholarships for Nepalis", href: "/scholarships/nepal", flag: "🇳🇵" },
];

const faqs = [
  {
    q: "What is a fully funded scholarship?",
    a: "A fully funded scholarship covers all costs of study including tuition fees, monthly living allowance (stipend), round-trip airfare, and health insurance. Well-known fully funded programs include Fulbright (USA), Chevening (UK), DAAD (Germany), Türkiye Bursları (Turkey), and MEXT (Japan). You pay nothing out of pocket.",
  },
  {
    q: "How do I apply for international scholarships in 2026?",
    a: "Start by selecting your target country and degree level in our search. Review each scholarship's eligibility criteria — especially minimum GPA (usually 3.0–3.5), language score requirements (IELTS 6.5+ for most), and your nationality eligibility. Apply directly through the official link on each listing well before the posted deadline. Apply to 5–10 programs simultaneously.",
  },
  {
    q: "Can I apply to multiple scholarships at the same time?",
    a: "Yes — and it is strongly recommended. Apply to 5–10 scholarships simultaneously to maximize your chances of success. Prioritize fully funded programs, then supplement with partial awards. Keep a spreadsheet of deadlines, requirements, and document checklists for each application.",
  },
  {
    q: "Do I need IELTS or TOEFL for international scholarships?",
    a: "Most international scholarships require proof of English proficiency. Common requirements are IELTS 6.5+ for Master's and 7.0+ for competitive programs like Fulbright and Chevening. However, some countries like Turkey (Türkiye Bursları), China (CSC), and Hungary (Stipendium Hungaricum) offer English-taught programs without a strict IELTS requirement.",
  },
  {
    q: "Are there scholarships available for Bachelor's students?",
    a: "Yes. Several countries offer fully funded Bachelor's scholarships including Turkey (Türkiye Bursları), China (CSC), South Korea (KGSP), Hungary (Stipendium Hungaricum), and Saudi Arabia (King Abdullah University). Most undergraduate scholarships are government-funded and include full tuition plus a monthly allowance.",
  },
  {
    q: "What GPA do I need for a fully funded scholarship?",
    a: "Most competitive fully funded scholarships require a GPA of 3.0/4.0 or equivalent (75–80% in most grading systems). Highly competitive programs like Gates Cambridge and Rhodes require 3.7+ or a first-class degree. Government scholarships like Türkiye Bursları and CSC accept 2.8+ GPAs. Always check individual program requirements.",
  },
  {
    q: "When is the deadline for 2026 scholarships?",
    a: "Deadlines vary by program. Key 2026 deadlines: Chevening (Nov 2025), Fulbright (Oct 2025), Gates Cambridge (Dec 2025), DAAD (Oct 2025), Commonwealth Scholarship (Oct 2025), Erasmus+ (Jan 2026), Türkiye Bursları (Feb 2026), CSC (Mar 2026), MEXT (May 2026), and KGSP (Feb 2026). Set calendar reminders — late applications are not accepted.",
  },
  {
    q: "Which countries offer the most scholarships for international students?",
    a: "The top scholarship-giving countries in 2026 are the USA (Fulbright, university grants), UK (Chevening, Commonwealth), Germany (DAAD, Humboldt), Australia (Australia Awards), China (CSC), Japan (MEXT), South Korea (KGSP), Turkey (Türkiye Bursları), Hungary (Stipendium Hungaricum), and the Netherlands (Orange Knowledge).",
  },
];

// Schema.org structured data — comprehensive for SEO
function buildSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://visaexpresshub.com/scholarships",
        name: "Scholarships 2026 – Fully Funded Opportunities in 260+ Countries",
        description:
          "Browse 850+ verified fully funded scholarships for international students in 2026. Filter by country, degree, and funding type. Updated weekly with new deadlines.",
        url: "https://visaexpresshub.com/scholarships",
        inLanguage: "en",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://visaexpresshub.com" },
            { "@type": "ListItem", position: 2, name: "Scholarships 2026", item: "https://visaexpresshub.com/scholarships" },
          ],
        },
      },
      {
        "@type": "ItemList",
        name: "Top Fully Funded Scholarships 2026",
        description: "The world's most competitive fully funded scholarship programs for international students.",
        numberOfItems: popularScholarships.length,
        itemListElement: popularScholarships.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${s.name} – ${s.country}`,
          url: `https://visaexpresshub.com/scholarships/${s.slug}`,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "EducationalOrganization",
        name: "Visa Express Hub – Scholarship Database",
        url: "https://visaexpresshub.com/scholarships",
        description: "A comprehensive, manually verified database of 850+ international scholarships for 2026.",
        sameAs: ["https://visaexpresshub.com"],
      },
    ],
  };
}

const stats = [
  { label: "Total Scholarships", value: "850+", icon: "🏆" },
  { label: "Countries Covered", value: "260+", icon: "🌍" },
  { label: "Fully Funded", value: "400+", icon: "💰" },
  { label: "Updated Weekly", value: "2026", icon: "📅" },
];

const degreeLinks = [
  { label: "Bachelor's", href: "/scholarships" },
  { label: "Master's", href: "/scholarships" },
  { label: "PhD", href: "/scholarships" },
  { label: "Fully Funded Only", href: "/scholarships" },
  { label: "No IELTS", href: "/scholarships" },
  { label: "Without GRE", href: "/scholarships" },
];

const featuredCodes = ["us", "gb", "ca", "au", "de", "tr"];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function ScholarshipsMain() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [headlineIdx] = useState(() => Math.floor(Math.random() * dynamicHeadlines.length));
  const [subtitleIdx] = useState(() => Math.floor(Math.random() * dynamicSubtitles.length));
  const searchRef = useRef(null);
  const countriesPerPage = 24;

  useEffect(() => {
    fetch("/api/countries")
      .then((res) => res.json())
      .then((data) => setCountries(Array.isArray(data) ? data : []));
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (!searchRef.current?.contains(e.target)) setSearchOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const slug = (name) => name?.toLowerCase().replace(/\s+/g, "-") || "";

  const searchResults =
    search.length > 1
      ? countries.filter((c) => c.country.toLowerCase().includes(search.toLowerCase())).slice(0, 7)
      : [];

  const filteredCountries = countries.filter((c) =>
    c.country.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLast = currentPage * countriesPerPage;
  const indexOfFirst = indexOfLast - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  const headline = dynamicHeadlines[headlineIdx];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildSchema()) }}
      />

      <div className="min-h-screen bg-[#FBFDFF] pb-24">

        {/* ═══════════════════════════════════════════════════════════
            HERO
        ═══════════════════════════════════════════════════════════ */}
        <div className="bg-white border-b border-gray-100 pt-20 pb-16 px-6 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-blue-50 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[50%] bg-indigo-50 blur-[100px] rounded-full" />
          </div>

          <div className="max-w-6xl mx-auto text-center relative z-10">
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="flex justify-center gap-2 text-[10px] text-gray-400 mb-8 uppercase tracking-widest font-bold">
              <Link href="/" className="hover:text-blue-600 transition">Home</Link>
              <span>/</span>
              <span className="text-blue-600">Scholarships 2026</span>
            </nav>

            <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-5 leading-[1.1]">
              {headline.title}{" "}
              <span className="text-blue-600">{headline.highlight}</span>{" "}
              <br />
              {headline.subtitle}
            </h1>

            <p className="text-gray-500 max-w-xl mx-auto mb-6 text-lg font-medium">
              {dynamicSubtitles[subtitleIdx]}
            </p>

            {/* Degree filter pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {degreeLinks.map((d) => (
                <Link
                  key={d.label}
                  href={d.href}
                  className="text-[11px] font-black uppercase tracking-wider px-4 py-2 rounded-full border border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all"
                >
                  {d.label}
                </Link>
              ))}
            </div>

            {/* Search */}
            <div className="relative max-w-2xl mx-auto mb-10" ref={searchRef}>
              <div
                className={`flex items-center bg-white rounded-2xl border-2 transition-all duration-200 ${
                  searchOpen && search.length > 1
                    ? "border-blue-500 shadow-2xl shadow-blue-100/50"
                    : "border-gray-200 shadow-xl shadow-gray-100/40"
                }`}
              >
                <span className="pl-5 text-xl text-gray-400 flex-shrink-0">🔍</span>
                <input
                  type="search"
                  aria-label="Search scholarships by country"
                  placeholder="Search a country — Germany, Japan, Canada..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  className="flex-1 px-4 py-5 bg-transparent outline-none text-gray-800 font-bold text-base placeholder:text-gray-300 placeholder:font-medium"
                />
                {search && (
                  <button
                    onClick={() => { setSearch(""); setSearchOpen(false); }}
                    aria-label="Clear search"
                    className="pr-3 text-gray-300 hover:text-gray-500 text-lg transition"
                  >✕</button>
                )}
                <Link
                  href={searchResults[0] ? `/scholarships/${slug(searchResults[0].country)}` : "/scholarships"}
                  className="m-2 flex-shrink-0 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-6 py-3 rounded-xl font-black text-sm transition-all"
                >
                  Search
                </Link>
              </div>

              <AnimatePresence>
                {searchOpen && search.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.13 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-100 shadow-2xl shadow-gray-200/60 overflow-hidden z-50"
                    role="listbox"
                  >
                    {searchResults.length > 0 ? (
                      <div className="p-2">
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest px-3 pt-3 pb-2">
                          {searchResults.length} result{searchResults.length !== 1 ? "s" : ""} found
                        </p>
                        {searchResults.map((c) => (
                          <Link
                            key={c.code}
                            href={`/scholarships/${slug(c.country)}`}
                            onClick={() => { setSearchOpen(false); setSearch(""); }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition group"
                          >
                            <img src={c.flag} className="w-9 h-6 object-cover rounded-md shadow-sm border border-gray-100 flex-shrink-0" alt={`${c.country} flag`} />
                            <div className="flex-1 text-left">
                              <p className="font-black text-gray-800 text-sm group-hover:text-blue-600 transition">{c.country}</p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase">View Scholarships 2026</p>
                            </div>
                            <span className="text-gray-300 group-hover:text-blue-500 transition flex-shrink-0">→</span>
                          </Link>
                        ))}
                        <div className="border-t border-gray-50 mt-2 p-3">
                          <Link href="/scholarships" onClick={() => setSearchOpen(false)} className="block text-center text-xs font-black text-blue-600 hover:underline py-1">
                            Browse all 260+ countries →
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="p-10 text-center">
                        <p className="text-3xl mb-3">🌐</p>
                        <p className="font-black text-gray-700 mb-1">No results for "{search}"</p>
                        <p className="text-sm text-gray-400 mb-4">Try a different spelling or browse all countries.</p>
                        <Link href="/scholarships" onClick={() => setSearchOpen(false)} className="text-sm font-black text-blue-600 hover:underline">
                          Browse all countries →
                        </Link>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Featured Destinations */}
            <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] w-full mb-1">Most Popular Destinations 2026</span>
              {featuredCodes.map((code) => {
                const country = countries.find((c) => c.code === code);
                if (!country) return null;
                return (
                  <Link
                    key={code}
                    href={`/scholarships/${slug(country.country)}`}
                    title={`Fully funded scholarships in ${country.country} 2026`}
                    className="flex items-center gap-2.5 bg-white border border-gray-100 px-4 py-2.5 rounded-full shadow-sm hover:shadow-lg hover:border-blue-300 hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    <img src={country.flag} className="w-7 h-5 object-cover rounded shadow-sm" alt={`${country.country} scholarships`} />
                    <span className="text-sm font-black text-gray-600 group-hover:text-blue-600">{country.country}</span>
                  </Link>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {stats.map((s, i) => (
                <div key={i} className="bg-gray-50 rounded-2xl px-6 py-5 group cursor-default hover:bg-blue-50 transition-all">
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <p className="text-3xl font-black text-gray-900 group-hover:text-blue-600 transition-colors">{s.value}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            SCHOLARSHIP CATEGORIES (new SEO section)
        ═══════════════════════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-6 mt-14">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Browse by Scholarship Type</h2>
              <p className="text-gray-400 text-sm mt-1 font-medium">Find funding by degree level, subject, or eligibility — updated for 2026.</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {scholarshipCategories.map((cat) => (
              <Link
                key={cat.label}
                href={cat.href}
                title={cat.label}
                className="flex flex-col bg-white border border-gray-100 rounded-2xl px-4 py-4 hover:border-blue-200 hover:shadow-md transition-all group"
              >
                <span className="text-xs font-black text-gray-800 group-hover:text-blue-600 transition leading-snug mb-1">{cat.label}</span>
                <span className="text-[10px] text-gray-400 font-medium leading-tight">{cat.desc}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            TOP SCHOLARSHIPS
        ═══════════════════════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-6 mt-14">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900">🏅 Top Fully Funded Scholarships 2026</h2>
              <p className="text-gray-400 text-sm mt-1 font-medium">Jump directly to the world's most competitive programs — with deadlines.</p>
            </div>
            <Link href="/scholarships" className="hidden md:block text-xs font-black text-blue-600 hover:underline uppercase tracking-wider">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularScholarships.map((s) => (
              <Link
                key={`${s.slug}-${s.name}`}
                href={`/scholarships/${s.slug}`}
                title={`${s.name} – ${s.country} ${s.degree} Scholarship 2026`}
                className="flex items-start gap-4 bg-white border border-gray-100 px-5 py-4 rounded-2xl hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all group"
              >
                <span className="text-2xl flex-shrink-0 mt-0.5">{s.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-black text-gray-900 text-sm truncate group-hover:text-blue-600 transition">{s.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{s.country} · {s.tag}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[9px] font-black text-gray-400 bg-gray-50 rounded-full px-2 py-0.5">{s.degree}</span>
                    <span className="text-[9px] font-black text-orange-500 bg-orange-50 rounded-full px-2 py-0.5">⏰ {s.deadline}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            TOP DESTINATIONS (new SEO section)
        ═══════════════════════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-6 mt-14">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900">🌍 Scholarships by Destination Country</h2>
              <p className="text-gray-400 text-sm mt-1 font-medium">Find every scholarship available in your dream study destination for 2026.</p>
            </div>
            <Link href="/scholarships" className="hidden md:block text-xs font-black text-blue-600 hover:underline uppercase tracking-wider">
              All Countries →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {topDestinations.map((dest) => (
              <Link
                key={dest.href}
                href={dest.href}
                title={dest.label}
                className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-2xl px-4 py-3 hover:border-blue-200 hover:shadow-md transition-all group"
              >
                <span className="text-xl flex-shrink-0">{dest.flag}</span>
                <div className="min-w-0">
                  <p className="text-xs font-black text-gray-800 group-hover:text-blue-600 transition truncate">{dest.label}</p>
                  <p className="text-[10px] text-gray-400 font-bold">{dest.count} programs</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            BY ORIGIN COUNTRY (new SEO section)
        ═══════════════════════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-6 mt-14">
          <div className="mb-6">
            <h2 className="text-2xl font-black text-gray-900">🎓 Scholarships by Your Home Country</h2>
            <p className="text-gray-400 text-sm mt-1 font-medium">Find funding programs specifically targeting students from your country.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {byOriginCountry.map((origin) => (
              <Link
                key={origin.href}
                href={origin.href}
                title={origin.label}
                className="flex items-center gap-2.5 bg-white border border-gray-100 rounded-2xl px-4 py-3 hover:border-blue-200 hover:shadow-md transition-all group"
              >
                <span className="text-xl flex-shrink-0">{origin.flag}</span>
                <p className="text-xs font-black text-gray-800 group-hover:text-blue-600 transition truncate">{origin.label}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            COUNTRY GRID
        ═══════════════════════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-6 mt-14">
          <div className="flex items-end justify-between mb-8 border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Explore All Countries</h2>
              <p className="text-gray-400 text-sm mt-1 font-medium">Browse our full database of global educational funding for 2026.</p>
            </div>
            <span className="hidden md:block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-wider">
              {filteredCountries.length} Regions
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {currentCountries.map((c) => (
              <Link
                key={c.code}
                href={`/scholarships/${slug(c.country)}`}
                title={`Scholarships in ${c.country} 2026 – Fully Funded Programs`}
                className="group flex flex-col items-center bg-white p-6 rounded-[2rem] border border-gray-50 hover:border-blue-100 hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] transition-all duration-500"
              >
                <div className="relative mb-5">
                  <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full scale-0 group-hover:scale-125 transition-transform duration-500" />
                  <img
                    src={c.flag}
                    alt={`${c.country} scholarships 2026`}
                    className="relative w-14 h-10 object-cover rounded-xl shadow-md border-2 border-white transform group-hover:rotate-6 transition-all duration-500"
                  />
                </div>
                <h3 className="text-xs font-black text-gray-800 group-hover:text-blue-600 transition-colors text-center leading-tight">
                  {c.country}
                </h3>
                <p className="mt-3 text-[10px] font-black text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                  View →
                </p>
              </Link>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-16 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setCurrentPage((p) => Math.max(p - 1, 1)); window.scrollTo({ top: 400, behavior: "smooth" }); }}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-sm disabled:opacity-20 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center font-bold text-gray-400"
                >←</button>
                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => {
                    const p = i + 1;
                    if (p === 1 || p === totalPages || Math.abs(p - currentPage) < 2) {
                      return (
                        <button
                          key={i}
                          onClick={() => { setCurrentPage(p); window.scrollTo({ top: 400, behavior: "smooth" }); }}
                          aria-label={`Page ${p}`}
                          aria-current={currentPage === p ? "page" : undefined}
                          className={`w-12 h-12 rounded-xl font-black transition-all duration-300 ${currentPage === p ? "bg-blue-600 text-white shadow-lg scale-110" : "bg-white border border-gray-100 text-gray-400 hover:text-blue-600"}`}
                        >{p}</button>
                      );
                    } else if (p === currentPage - 2 || p === currentPage + 2) {
                      return <span key={i} className="flex items-center text-gray-300 px-1">...</span>;
                    }
                    return null;
                  })}
                </div>
                <button
                  onClick={() => { setCurrentPage((p) => Math.min(p + 1, totalPages)); window.scrollTo({ top: 400, behavior: "smooth" }); }}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-sm disabled:opacity-20 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center font-bold text-gray-400"
                >→</button>
              </div>
              <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Page {currentPage} of {totalPages}</p>
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════════
            SEO TEXT BLOCKS (6 — expanded)
        ═══════════════════════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-6 mt-20">
          <h2 className="text-2xl font-black text-gray-900 mb-2">About International Scholarships 2026</h2>
          <p className="text-gray-400 text-sm mb-8 font-medium max-w-2xl">
            Everything you need to know before applying — from finding the right program to submitting a winning application.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {seoTextBlocks.map((block, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:shadow-blue-50 transition-all">
                <div className="text-3xl mb-4">{block.icon}</div>
                <h3 className="text-lg font-black text-gray-900 mb-3">{block.heading}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{block.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            FAQ — 8 questions (expanded from 4)
        ═══════════════════════════════════════════════════════════ */}
        <div className="max-w-4xl mx-auto px-6 mt-20">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 text-sm text-center mb-10 font-medium">
            Common questions about applying for international scholarships in 2026.
          </p>
          <div className="space-y-3">
            {faqs.map((item, i) => (
              <details key={i} className="group bg-white border border-gray-100 rounded-2xl p-6 shadow-sm cursor-pointer">
                <summary className="font-black text-gray-900 text-base list-none flex justify-between items-center">
                  {item.q}
                  <span className="text-blue-600 text-xl group-open:rotate-45 transition-transform duration-200 flex-shrink-0 ml-4">+</span>
                </summary>
                <p className="mt-4 text-gray-500 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            SEO FOOTER LINKS (new — internal linking)
        ═══════════════════════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-6 mt-20">
          <div className="bg-gray-50 border border-gray-100 rounded-[2rem] p-8">
            <h2 className="text-base font-black text-gray-700 mb-6">Explore More Scholarships</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-2.5">
              {[
                ...topDestinations.map((d) => ({ label: d.label, href: d.href })),
                ...byOriginCountry.map((o) => ({ label: o.label, href: o.href })),
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="text-xs text-gray-500 hover:text-blue-600 hover:underline underline-offset-2 transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════
            CTA BANNER
        ═══════════════════════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-6 mt-10">
          <div className="bg-gray-900 rounded-[2.5rem] p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600 blur-[120px] opacity-20 rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-600 blur-[120px] opacity-20 rounded-full" />
            <div className="relative z-10">
              <p className="text-[10px] uppercase font-black text-blue-400 tracking-[0.3em] mb-3">Start Your Journey</p>
              <h2 className="text-4xl font-black text-white mb-3">Don't Miss 2026 Deadlines</h2>
              <p className="text-gray-400 max-w-md mx-auto mb-8 text-sm">
                Many programs close between October–December 2025. Choose a country to see open scholarships now.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                {featuredCodes.map((code) => {
                  const country = countries.find((c) => c.code === code);
                  if (!country) return null;
                  return (
                    <Link
                      key={code}
                      href={`/scholarships/${slug(country.country)}`}
                      title={`Scholarships in ${country.country} 2026`}
                      className="flex items-center gap-2 bg-white/10 hover:bg-blue-600 border border-white/10 px-5 py-3 rounded-2xl transition-all text-white text-sm font-bold"
                    >
                      <img src={country.flag} className="w-6 h-4 object-cover rounded" alt="" aria-hidden="true" />
                      {country.country}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}