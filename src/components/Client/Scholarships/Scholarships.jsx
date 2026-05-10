"use client";
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';


const dynamicHeadlines = [
  { title: "Your Future", highlight: "Scholarship", subtitle: "Starts Here" },
  { title: "Discover", highlight: "Fully Funded", subtitle: "Opportunities Worldwide" },
  { title: "Study Abroad", highlight: "For Free", subtitle: "in 2026" },
];

const dynamicSubtitles = [
  "Explore 850+ verified fully funded programs across 260+ countries. Filter by degree, country, and funding type.",
  "Find scholarships that cover full tuition, living costs, and travel — updated with 2026 deadlines.",
  "International students worldwide secured funding through our database. Start your search today.",
];

const seoTextBlocks = [
  {
    heading: "Why Use Our Scholarship Database?",
    body: "We manually verify every scholarship listed — checking official links, funding scope, and deadlines before publishing. Our database covers government programs like Fulbright and Chevening, university-direct awards, and private foundation grants across every continent."
  },
  {
    heading: "How to Find the Right Scholarship",
    body: "Start by selecting your target country, then filter by degree level (Bachelor's, Master's, or PhD). Each listing shows the minimum GPA, language requirements, application deadline, and exact coverage — so you know exactly what you're applying for."
  },
  {
    heading: "Fully Funded vs Partial Scholarships",
    body: "Fully funded scholarships cover 100% of your tuition, plus living allowance, airfare, and health insurance. Partial awards typically cover tuition only. We tag each program clearly so you can filter to fully funded opportunities and study abroad at zero cost."
  }
];

const popularScholarships = [
  { name: "Fulbright Program", country: "USA", slug: "united-states", tag: "Fully Funded", emoji: "🇺🇸" },
  { name: "Chevening Scholarship", country: "UK", slug: "united-kingdom", tag: "Fully Funded", emoji: "🇬🇧" },
  { name: "DAAD Scholarship", country: "Germany", slug: "germany", tag: "Fully Funded", emoji: "🇩🇪" },
  { name: "Türkiye Bursları", country: "Turkey", slug: "turkey", tag: "Fully Funded", emoji: "🇹🇷" },
  { name: "Australia Awards", country: "Australia", slug: "australia", tag: "Fully Funded", emoji: "🇦🇺" },
  { name: "Vanier CGS", country: "Canada", slug: "canada", tag: "PhD", emoji: "🇨🇦" },
  { name: "Erasmus+ Program", country: "Europe", slug: "europe", tag: "Exchange", emoji: "🇪🇺" },
  { name: "Gates Cambridge", country: "UK", slug: "united-kingdom", tag: "PhD", emoji: "🇬🇧" },
  { name: "CSC Scholarship", country: "China", slug: "china", tag: "Fully Funded", emoji: "🇨🇳" },
  { name: "MEXT Scholarship", country: "Japan", slug: "japan", tag: "Fully Funded", emoji: "🇯🇵" },
  { name: "KGSP Scholarship", country: "South Korea", slug: "south-korea", tag: "Fully Funded", emoji: "🇰🇷" },
  { name: "NZ Scholarship", country: "New Zealand", slug: "new-zealand", tag: "Fully Funded", emoji: "🇳🇿" },
];

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
    fetch('/api/countries')
      .then(res => res.json())
      .then(data => setCountries(Array.isArray(data) ? data : []));
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!searchRef.current?.contains(e.target)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const slug = (name) => name?.toLowerCase().replace(/\s+/g, '-') || '';

  // Dropdown results (live as user types)
  const searchResults = search.length > 1
    ? countries.filter(c => c.country.toLowerCase().includes(search.toLowerCase())).slice(0, 7)
    : [];

  // Grid filter
  const filteredCountries = countries.filter(c =>
    c.country.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  const featuredCodes = ['us', 'gb', 'ca', 'au', 'de', 'tr'];
  const headline = dynamicHeadlines[headlineIdx];

  const stats = [
    { label: "Total Scholarships", value: "850+", icon: "🏆" },
    { label: "Countries Covered", value: "260+", icon: "🌍" },
    { label: "Success Rate", value: "94%", icon: "📈" },
    { label: "Fully Funded", value: "400+", icon: "💰" }
  ];

  const degreeLinks = [
    { label: "Bachelor's", href: "/scholarships" },
    { label: "Master's", href: "/scholarships" },
    { label: "PhD", href: "/scholarships" },
    { label: "Fully Funded Only", href: "/scholarships" },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Scholarships 2026 – Fully Funded Opportunities in 260+ Countries",
            "description": "Browse 850+ verified scholarships for international students in 2026.",
            "url": "https://yoursite.com/scholarships",
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yoursite.com" },
                { "@type": "ListItem", "position": 2, "name": "Scholarships", "item": "https://yoursite.com/scholarships" }
              ]
            }
          })
        }}
      />

      <div className="min-h-screen bg-[#FBFDFF] pb-20">

        {/* ── Hero ── */}
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
              {headline.title} <span className="text-blue-600">{headline.highlight}</span>{" "}
              <br />{headline.subtitle}
            </h1>
            <p className="text-gray-500 max-w-xl mx-auto mb-6 text-lg font-medium">
              {dynamicSubtitles[subtitleIdx]}
            </p>

            {/* Degree filter pills */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {degreeLinks.map(d => (
                <Link
                  key={d.href}
                  href={d.href}
                  className="text-[11px] font-black uppercase tracking-wider px-4 py-2 rounded-full border border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-all"
                >
                  {d.label}
                </Link>
              ))}
            </div>

            {/* ── Search with Live Dropdown ── */}
            <div className="relative max-w-2xl mx-auto mb-10" ref={searchRef}>
              <div className={`flex items-center bg-white rounded-2xl border-2 transition-all duration-200 ${searchOpen && search.length > 1 ? 'border-blue-500 shadow-2xl shadow-blue-100/50' : 'border-gray-200 shadow-xl shadow-gray-100/40'}`}>
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
                    onClick={() => { setSearch(''); setSearchOpen(false); }}
                    aria-label="Clear search"
                    className="pr-3 text-gray-300 hover:text-gray-500 text-lg transition"
                  >✕</button>
                )}
                <Link
                  href={searchResults[0] ? `/scholarships/${slug(searchResults[0].country)}` : '/scholarships'}
                  className="m-2 flex-shrink-0 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-6 py-3 rounded-xl font-black text-sm transition-all"
                >
                  Search
                </Link>
              </div>

              {/* ── Live dropdown ── */}
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
                          {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                        </p>
                        {searchResults.map(c => (
                          <Link
                            key={c.code}
                            href={`/scholarships/${slug(c.country)}`}
                            onClick={() => { setSearchOpen(false); setSearch(''); }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-blue-50 transition group"
                          >
                            <img
                              src={c.flag}
                              className="w-9 h-6 object-cover rounded-md shadow-sm border border-gray-100 flex-shrink-0"
                              alt={`${c.country} flag`}
                            />
                            <div className="flex-1 text-left">
                              <p className="font-black text-gray-800 text-sm group-hover:text-blue-600 transition">{c.country}</p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase">View Scholarships</p>
                            </div>
                            <span className="text-gray-300 group-hover:text-blue-500 transition flex-shrink-0">→</span>
                          </Link>
                        ))}
                        <div className="border-t border-gray-50 mt-2 p-3">
                          <Link
                            href="/scholarships"
                            onClick={() => setSearchOpen(false)}
                            className="block text-center text-xs font-black text-blue-600 hover:underline py-1"
                          >
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
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] w-full mb-1">
                Most Popular Destinations 2026
              </span>
              {featuredCodes.map(code => {
                const country = countries.find(c => c.code === code);
                if (!country) return null;
                return (
                  <Link
                    key={code}
                    href={`/scholarships/${slug(country.country)}`}
                    title={`View scholarships in ${country.country}`}
                    className="flex items-center gap-2.5 bg-white border border-gray-100 px-4 py-2.5 rounded-full shadow-sm hover:shadow-lg hover:border-blue-300 hover:-translate-y-0.5 transition-all duration-300 group"
                  >
                    <img src={country.flag} className="w-7 h-5 object-cover rounded shadow-sm" alt={`${country.country} flag`} />
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

        {/* ── Top Scholarships ── */}
        <div className="max-w-7xl mx-auto px-6 mt-14">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900">🏅 Top Scholarships for 2026</h2>
              <p className="text-gray-400 text-sm mt-1 font-medium">Jump directly to the world's most competitive fully funded programs.</p>
            </div>
            <Link href="/scholarships" className="hidden md:block text-xs font-black text-blue-600 hover:underline uppercase tracking-wider">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularScholarships.map(s => (
              <Link
                key={`${s.slug}-${s.name}`}
                href={`/scholarships/${s.slug}`}
                title={`${s.name} – ${s.country}`}
                className="flex items-center gap-4 bg-white border border-gray-100 px-5 py-4 rounded-2xl hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all group"
              >
                <span className="text-2xl flex-shrink-0">{s.emoji}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-black text-gray-900 text-sm truncate group-hover:text-blue-600 transition">{s.name}</p>
                  <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">{s.country} · {s.tag}</p>
                </div>
                <span className="text-gray-300 group-hover:text-blue-500 transition flex-shrink-0">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Country Grid ── */}
        <div className="max-w-7xl mx-auto px-6 mt-14">
          <div className="flex items-end justify-between mb-8 border-b border-gray-100 pb-6">
            <div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight">Explore by Country</h2>
              <p className="text-gray-400 text-sm mt-1 font-medium">Browse our full database of global educational funding for 2026.</p>
            </div>
            <span className="hidden md:block px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-wider">
              {filteredCountries.length} Regions Available
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {currentCountries.map(c => (
              <Link
                key={c.code}
                href={`/scholarships/${slug(c.country)}`}
                title={`Scholarships in ${c.country} 2026`}
                className="group flex flex-col items-center bg-white p-6 rounded-[2rem] border border-gray-50 hover:border-blue-100 hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] transition-all duration-500"
              >
                <div className="relative mb-5">
                  <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full scale-0 group-hover:scale-125 transition-transform duration-500" />
                  <img
                    src={c.flag}
                    alt={`${c.country} scholarships`}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-16 flex flex-col items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setCurrentPage(prev => Math.max(prev - 1, 1)); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-sm disabled:opacity-20 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center font-bold text-gray-400"
                >←</button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    if (pageNum === 1 || pageNum === totalPages || Math.abs(pageNum - currentPage) < 2) {
                      return (
                        <button
                          key={i}
                          onClick={() => { setCurrentPage(pageNum); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                          aria-label={`Go to page ${pageNum}`}
                          aria-current={currentPage === pageNum ? 'page' : undefined}
                          className={`w-12 h-12 rounded-xl font-black transition-all duration-300 ${currentPage === pageNum ? "bg-blue-600 text-white shadow-lg scale-110" : "bg-white border border-gray-100 text-gray-400 hover:text-blue-600"}`}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (pageNum === currentPage - 2 || pageNum === currentPage + 2) {
                      return <span key={i} className="flex items-center text-gray-300 px-1">...</span>;
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => { setCurrentPage(prev => Math.min(prev + 1, totalPages)); window.scrollTo({ top: 400, behavior: 'smooth' }); }}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-sm disabled:opacity-20 hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center font-bold text-gray-400"
                >→</button>
              </div>
              <p className="text-xs font-bold text-gray-300 uppercase tracking-widest">Page {currentPage} of {totalPages}</p>
            </div>
          )}
        </div>

        {/* ── SEO Text ── */}
        <div className="max-w-7xl mx-auto px-6 mt-20">
          <div className="grid md:grid-cols-3 gap-6">
            {seoTextBlocks.map((block, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl hover:shadow-blue-50 transition-all">
                <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-sm mb-5">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-lg font-black text-gray-900 mb-3">{block.heading}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{block.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ── */}
        <div className="max-w-4xl mx-auto px-6 mt-20">
          <h2 className="text-3xl font-black text-gray-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {[
              { q: "What is a fully funded scholarship?", a: "A fully funded scholarship covers all costs of study including tuition fees, monthly living allowance, round-trip airfare, and health insurance. Programs like Fulbright, Chevening, and DAAD are fully funded." },
              { q: "How do I apply for international scholarships in 2026?", a: "Start by selecting your target country and degree level. Review each scholarship's eligibility criteria — especially GPA and language score requirements. Apply directly through the official link on each listing before the posted deadline." },
              { q: "Can I apply to multiple scholarships at the same time?", a: "Yes. It is strongly recommended to apply to 5–10 scholarships simultaneously to maximize your chances. Prioritize fully funded programs in countries that match your field of study." },
              { q: "Do I need IELTS or TOEFL for these scholarships?", a: "Most international scholarships require proof of English proficiency. The most common requirement is IELTS 6.5+ for Master's programs and 7.0+ for competitive programs like Fulbright. Some countries like Germany and Turkey have programs taught in English with relaxed requirements." },
            ].map((item, i) => (
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

        {/* ── CTA Banner ── */}
        <div className="max-w-7xl mx-auto px-6 mt-16">
          <div className="bg-gray-900 rounded-[2.5rem] p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600 blur-[120px] opacity-20 rounded-full" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-600 blur-[120px] opacity-20 rounded-full" />
            <div className="relative z-10">
              <p className="text-[10px] uppercase font-black text-blue-400 tracking-[0.3em] mb-3">Start Your Journey</p>
              <h2 className="text-4xl font-black text-white mb-3">Don't Miss 2026 Deadlines</h2>
              <p className="text-gray-400 max-w-md mx-auto mb-8 text-sm">Many programs close in October–December. Choose a country to see open scholarships now.</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {featuredCodes.map(code => {
                  const country = countries.find(c => c.code === code);
                  if (!country) return null;
                  return (
                    <Link
                      key={code}
                      href={`/scholarships/${slug(country.country)}`}
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