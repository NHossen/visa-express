"use client";
// /app/scholarships/page-client.jsx
// Scholarship tracker main page — white BG, black text, yellow accents

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search, GraduationCap, Globe, ChevronRight, TrendingUp,
  Users, Star, ArrowRight, BookOpen, Award, MapPin,
  CheckCircle2, AlertCircle, Clock, Zap, Filter, DollarSign,
  Calendar, BarChart2, ChevronDown, X
} from "lucide-react";
import { SCHOLARSHIP_RULES, SCHOLARSHIP_TYPE_META, CONTINENTS, makeScholarshipSlug } from "@/app/lib/scholarshipData";

// ── CONSTANTS ──────────────────────────────────────────────────────────────
const ALL_COUNTRIES = Object.entries(SCHOLARSHIP_RULES).map(([slug, data]) => ({
  slug,
  ...data,
})).sort((a, b) => b.popularity - a.popularity);

const STATS = [
  { label: "Countries Covered",     value: "15+",    icon: Globe,         note: "& growing" },
  { label: "Total Scholarships",    value: "60,000+", icon: Award,         note: "across all programs" },
  { label: "Monthly Researchers",   value: "28K+",   icon: Users,         note: "use Eammu guides" },
  { label: "Fully Funded Programs", value: "500+",   icon: GraduationCap, note: "with 0 tuition cost" },
];

const POPULAR_SEARCHES = [
  { country: "United States", slug: "united-states", type: "fully-funded",  searches: "22K/mo" },
  { country: "United Kingdom", slug: "united-kingdom", type: "government",  searches: "18K/mo" },
  { country: "Germany",        slug: "germany",        type: "fully-funded", searches: "15K/mo" },
  { country: "Canada",         slug: "canada",         type: "government",   searches: "13K/mo" },
  { country: "Japan",          slug: "japan",          type: "government",   searches: "11K/mo" },
  { country: "Australia",      slug: "australia",      type: "fully-funded", searches: "10K/mo" },
  { country: "South Korea",    slug: "south-korea",    type: "government",   searches: "9K/mo"  },
  { country: "China",          slug: "china",          type: "government",   searches: "8K/mo"  },
  { country: "Turkey",         slug: "turkey",         type: "government",   searches: "7K/mo"  },
  { country: "France",         slug: "france",         type: "government",   searches: "5K/mo"  },
];

const TOP_SCHOLARSHIPS = [
  { name:"Fulbright Foreign Student Program", country:"USA", flag:"🇺🇸",  type:"Fully Funded", deadline:"Oct–Dec",  level:"Graduate",  slug:"united-states", schType:"fully-funded" },
  { name:"Chevening Scholarship",             country:"UK",  flag:"🇬🇧",  type:"Fully Funded", deadline:"November", level:"Masters",   slug:"united-kingdom", schType:"government"  },
  { name:"DAAD Development Scholarship",      country:"GER", flag:"🇩🇪",  type:"Fully Funded", deadline:"Oct–Nov",  level:"Masters",   slug:"germany",        schType:"fully-funded" },
  { name:"Australia Awards Scholarship",      country:"AUS", flag:"🇦🇺",  type:"Fully Funded", deadline:"Apr–Jun",  level:"Graduate",  slug:"australia",      schType:"fully-funded" },
  { name:"MEXT (Monbukagakusho)",             country:"JPN", flag:"🇯🇵",  type:"Fully Funded", deadline:"May–Jul",  level:"All Levels",slug:"japan",          schType:"government"  },
  { name:"Vanier Canada Graduate Scholarship",country:"CAN", flag:"🇨🇦",  type:"Fully Funded", deadline:"November", level:"PhD",       slug:"canada",         schType:"fully-funded" },
  { name:"Global Korea Scholarship (GKS)",    country:"KOR", flag:"🇰🇷",  type:"Fully Funded", deadline:"Feb–Mar",  level:"Graduate",  slug:"south-korea",    schType:"government"  },
  { name:"CSC Chinese Government Scholarship",country:"CHN", flag:"🇨🇳",  type:"Fully Funded", deadline:"Mar–Apr",  level:"All Levels",slug:"china",          schType:"government"  },
  { name:"Türkiye Bursları",                  country:"TUR", flag:"🇹🇷",  type:"Fully Funded", deadline:"February", level:"All Levels",slug:"turkey",         schType:"government"  },
  { name:"Eiffel Excellence Scholarship",     country:"FRA", flag:"🇫🇷",  type:"Fully Funded", deadline:"January",  level:"Masters/PhD",slug:"france",        schType:"government"  },
  { name:"RTP PhD Stipend",                   country:"AUS", flag:"🇦🇺",  type:"Fully Funded", deadline:"Rolling",  level:"PhD",       slug:"australia",      schType:"research"    },
  { name:"Gates-Cambridge Scholarship",       country:"UK",  flag:"🇬🇧",  type:"Fully Funded", deadline:"October",  level:"Graduate",  slug:"united-kingdom", schType:"fully-funded" },
];

const CONT_COLORS = {
  "North America": "bg-blue-50 border-blue-100 text-blue-700",
  "Europe":        "bg-amber-50 border-amber-100 text-amber-700",
  "Asia":          "bg-rose-50 border-rose-100 text-rose-700",
  "Oceania":       "bg-emerald-50 border-emerald-100 text-emerald-700",
};

// ── COUNTRY CARD ───────────────────────────────────────────────────────────
function CountryCard({ data }) {
  const typeKeys = Object.keys(data.types);
  const hasFullyFunded = typeKeys.includes("fully-funded") || typeKeys.includes("government");
  return (
    <Link
      href={`/scholarships/${data.slug}`}
      className="group bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-yellow-400 hover:shadow-lg transition-all duration-200 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl">{data.flag}</span>
        <div className="text-right">
          <div className="text-xs font-black uppercase tracking-wider text-gray-400">Scholarships</div>
          <div className="text-sm font-black text-black">{data.totalScholarships}</div>
        </div>
      </div>
      <h3 className="font-black text-lg text-black mb-1 group-hover:text-yellow-600 transition-colors">{data.name}</h3>
      <p className="text-xs text-gray-500 font-semibold mb-3">{data.continent} · {data.language}</p>
      <div className="text-xs font-bold text-gray-600 mb-4 flex items-center gap-1">
        <DollarSign size={12} className="text-yellow-500" />
        {data.avgAward}
      </div>
      <div className="flex flex-wrap gap-1.5 mb-4">
        {typeKeys.slice(0, 3).map(k => (
          <span key={k} className={`text-[10px] font-black uppercase tracking-wide px-2 py-1 rounded-lg border ${SCHOLARSHIP_TYPE_META[k]?.color || "bg-gray-50 border-gray-100 text-gray-500"}`}>
            {SCHOLARSHIP_TYPE_META[k]?.icon} {SCHOLARSHIP_TYPE_META[k]?.label || k}
          </span>
        ))}
      </div>
      <div className="mt-auto flex items-center gap-2 text-xs font-black text-yellow-600 group-hover:gap-3 transition-all">
        View Scholarships <ArrowRight size={14} />
      </div>
    </Link>
  );
}

// ── SCHOLARSHIP TABLE ROW ──────────────────────────────────────────────────
function ScholarshipRow({ s, index }) {
  return (
    <Link
      href={`/scholarships/${s.slug}?type=${s.schType}`}
      className="group flex items-center justify-between p-4 bg-white border-2 border-gray-100 rounded-xl hover:border-yellow-400 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-gray-50 group-hover:bg-yellow-400 rounded-xl flex items-center justify-center font-black text-sm text-gray-400 group-hover:text-black transition-colors shrink-0">
          {index + 1}
        </div>
        <div>
          <div className="font-black text-sm text-black group-hover:text-yellow-700 transition-colors">{s.flag} {s.name}</div>
          <div className="text-xs text-gray-500 font-semibold mt-0.5">{s.country} · {s.level} · Due: {s.deadline}</div>
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="hidden sm:block text-xs font-black bg-yellow-50 text-yellow-700 border border-yellow-200 px-3 py-1.5 rounded-full">{s.type}</span>
        <ChevronRight size={16} className="text-gray-300 group-hover:text-yellow-500 transition-colors" />
      </div>
    </Link>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function ScholarshipsMainPage() {
  const router = useRouter();
  const [searchQuery,   setSearchQuery]   = useState("");
  const [activeFilter,  setActiveFilter]  = useState("all");
  const [activeCont,    setActiveCont]    = useState("all");
  const [showAll,       setShowAll]       = useState(false);

  const filteredCountries = useMemo(() => {
    let list = ALL_COUNTRIES;
    if (activeCont !== "all") {
      const slugsInCont = CONTINENTS[activeCont] || [];
      list = list.filter(c => slugsInCont.includes(c.slug));
    }
    if (activeFilter !== "all") {
      list = list.filter(c => Object.keys(c.types).includes(activeFilter));
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.continent.toLowerCase().includes(q) ||
        Object.values(c.types).some(t => t.label.toLowerCase().includes(q))
      );
    }
    return list;
  }, [searchQuery, activeFilter, activeCont]);

  const displayCountries = showAll ? filteredCountries : filteredCountries.slice(0, 9);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── TRUST BAR ────────────────────────────────────────────────────── */}
      <div className="bg-black py-2.5 px-6 text-center">
        <p className="text-xs text-yellow-400 font-bold">
          ✅ 60,000+ scholarships tracked across 15 countries &nbsp;·&nbsp;
          🔄 Updated monthly from official sources &nbsp;·&nbsp;
          🆓 Free · No signup required
        </p>
      </div>

      {/* ── BREADCRUMB ───────────────────────────────────────────────────── */}
      <div className="bg-gray-50 border-b border-gray-100 px-6 py-3">
        <div className="container mx-auto max-w-6xl flex items-center gap-2 text-xs text-gray-400 font-semibold flex-wrap">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/travel-resources" className="hover:text-black transition-colors">Resources</Link>
          <ChevronRight size={12} />
          <span className="text-black">Scholarship Finder</span>
        </div>
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-20 pb-20 px-6 border-b border-gray-100 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-yellow-400/10 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-yellow-400/6 rounded-full" />
          <div className="absolute inset-0 opacity-[0.018]" style={{
            backgroundImage:`linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize:"50px 50px",
          }} />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-yellow-400/15 border border-yellow-400/30 px-4 py-2 rounded-full mb-6">
              <GraduationCap size={14} className="text-yellow-600" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-yellow-700">International Scholarship Finder · 2025</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-black leading-[0.9] tracking-tighter mb-6">
              Find Your<br />
              <span className="bg-yellow-400 px-3 py-1 inline-block rotate-[-0.5deg]">Dream</span><br />
              Scholarship.
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl font-medium leading-relaxed mb-8">
              Complete scholarship database for Bangladeshi & international students —{" "}
              <strong className="text-black">fully funded to partial awards</strong>, government scholarships,
              university fellowships & research grants. 15 countries, 60,000+ opportunities.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#countries"
                className="inline-flex items-center gap-2 bg-yellow-400 text-black px-8 py-4 rounded-xl font-black hover:bg-black hover:text-yellow-400 transition-all shadow-lg text-sm">
                <Search size={18} /> Browse All Countries
              </a>
              <a href="https://wa.me/8801631312524" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white border-2 border-black text-black px-8 py-4 rounded-xl font-black hover:bg-black hover:text-white transition-all text-sm">
                💬 Get Expert Help
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="bg-black py-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ label, value, icon: Icon, note }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-400/10 border border-yellow-400/20 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-yellow-400" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{value}</div>
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">{label}</div>
                  <div className="text-[10px] text-yellow-400/60 font-medium">{note}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP SCHOLARSHIPS TABLE ────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-yellow-600 block mb-2">🏆 Most Sought After</span>
              <h2 className="text-3xl font-black text-black tracking-tight">Top Fully Funded Scholarships 2025</h2>
              <p className="text-gray-500 text-sm mt-2 font-medium">The most applied-for international scholarships by Bangladeshi students</p>
            </div>
          </div>
          <div className="space-y-3">
            {TOP_SCHOLARSHIPS.map((s, i) => (
              <ScholarshipRow key={i} s={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── COUNTRY GRID ─────────────────────────────────────────────────── */}
      <section id="countries" className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-yellow-600 block mb-2">🌍 All Destinations</span>
            <h2 className="text-3xl font-black text-black tracking-tight mb-3">Scholarships by Country</h2>
            <p className="text-gray-500 font-medium max-w-xl mx-auto text-sm">
              Select your destination country to see all available scholarships, requirements, deadlines, and expert tips.
            </p>
          </div>

          {/* Search + Filters */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-5 mb-8 space-y-4">
            {/* Search bar */}
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search country, scholarship type, or language..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border-2 border-gray-100 rounded-xl text-sm font-semibold text-black placeholder:text-gray-400 focus:outline-none focus:border-yellow-400 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Continent filter */}
            <div className="flex flex-wrap gap-2">
              {["all", ...Object.keys(CONTINENTS)].map(cont => (
                <button
                  key={cont}
                  onClick={() => setActiveCont(cont)}
                  className={`px-4 py-2 rounded-xl border-2 text-xs font-black uppercase tracking-wide transition-all
                    ${activeCont === cont
                      ? "bg-black text-yellow-400 border-black"
                      : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}
                >
                  {cont === "all" ? "🌍 All Continents" : cont}
                </button>
              ))}
            </div>

            {/* Type filter */}
            <div className="flex flex-wrap gap-2">
              {["all", "fully-funded", "government", "university", "research"].map(type => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-black transition-all
                    ${activeFilter === type
                      ? "bg-yellow-400 text-black border-yellow-400"
                      : "bg-white text-gray-500 border-gray-200 hover:border-yellow-400"}`}
                >
                  {type === "all" ? "All Types" : SCHOLARSHIP_TYPE_META[type]?.icon + " " + SCHOLARSHIP_TYPE_META[type]?.label}
                </button>
              ))}
            </div>

            <div className="text-xs text-gray-500 font-semibold">
              Showing {displayCountries.length} of {filteredCountries.length} countries
              {filteredCountries.length !== ALL_COUNTRIES.length && ` (filtered from ${ALL_COUNTRIES.length})`}
            </div>
          </div>

          {/* Country cards grid */}
          {displayCountries.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayCountries.map(data => (
                <CountryCard key={data.slug} data={data} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              <GraduationCap size={40} className="mx-auto mb-4 opacity-30" />
              <p className="font-bold">No countries found for your search.</p>
              <button onClick={() => { setSearchQuery(""); setActiveFilter("all"); setActiveCont("all"); }}
                className="mt-4 text-sm font-black text-yellow-600 underline">Clear filters</button>
            </div>
          )}

          {filteredCountries.length > 9 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-xl font-black hover:bg-yellow-400 hover:text-black transition-all text-sm"
              >
                {showAll ? "Show Less" : `Show All ${filteredCountries.length} Countries`}
                <ChevronDown size={16} className={`transition-transform ${showAll ? "rotate-180" : ""}`} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── POPULAR SEARCHES ─────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-yellow-600 block mb-2">🔥 Trending</span>
              <h2 className="text-3xl font-black text-black tracking-tight">Most Searched Scholarships</h2>
              <p className="text-gray-500 text-sm mt-2 font-medium">Based on monthly search volume from Bangladeshi students</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {POPULAR_SEARCHES.map((p, i) => (
              <Link
                key={i}
                href={`/scholarships/${p.slug}?type=${p.type}`}
                className="group flex items-center justify-between p-5 bg-white border-2 border-gray-100 rounded-2xl hover:border-yellow-400 hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 group-hover:bg-yellow-400 rounded-xl flex items-center justify-center font-black text-base text-gray-400 group-hover:text-black transition-colors shrink-0 text-lg">
                    {SCHOLARSHIP_RULES[p.slug]?.flag}
                  </div>
                  <div>
                    <div className="font-black text-sm text-black">{p.country} Scholarships</div>
                    <div className="text-xs text-gray-400 font-semibold mt-0.5">
                      {SCHOLARSHIP_TYPE_META[p.type]?.icon} {SCHOLARSHIP_TYPE_META[p.type]?.label}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-black text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-100">{p.searches}</span>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-yellow-500 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-yellow-600 block mb-3">📋 Process</span>
            <h2 className="text-3xl font-black text-black tracking-tight mb-3">How Scholarship Applications Work</h2>
            <p className="text-gray-500 font-medium max-w-lg mx-auto text-sm">Understanding the timeline from research to award — for any destination country.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step:"01", icon:"🔍", title:"Research",      time:"12–18 months before",   desc:"Identify target countries, programs, and scholarships that match your profile, academic background, and career goals." },
              { step:"02", icon:"📝", title:"Prepare",       time:"6–12 months before",    desc:"Gather documents, take language tests (IELTS/TOEFL), write your SOP, and secure strong academic references." },
              { step:"03", icon:"📤", title:"Apply",         time:"4–6 months before",     desc:"Submit applications to universities and scholarship portals before deadlines. Apply to multiple scholarships simultaneously." },
              { step:"04", icon:"🏆", title:"Receive Award", time:"3–6 months after apply", desc:"Receive decision, accept the offer, apply for student visa, arrange accommodation, and prepare for departure." },
            ].map(s => (
              <div key={s.step} className="bg-white rounded-2xl p-7 border-2 border-gray-100 hover:border-yellow-400 transition-colors">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl font-black text-yellow-400 opacity-30">{s.step}</span>
                  <span className="text-3xl">{s.icon}</span>
                </div>
                <div className="text-xs font-black uppercase tracking-wider text-yellow-600 mb-2">{s.time}</div>
                <h3 className="font-black text-lg text-black mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white border-t border-gray-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-black text-black mb-4">International Scholarships for Bangladeshi Students: Complete 2025 Guide</h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            Bangladesh students are among the most active international scholarship seekers globally, with strong representation in
            programs like the UK Chevening, US Fulbright, German DAAD, Japanese MEXT, and Australian AAS.
            Eammu's Scholarship Finder provides country-specific, scholarship-type-specific guides covering eligibility,
            deadlines, required documents, application tips, and FAQs — completely free.
          </p>

          <h3 className="text-xl font-black text-black mb-3">Types of International Scholarships Available</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {[
              { type:"Fully Funded", desc:"Cover tuition, living expenses, airfare, and health insurance. Examples: Chevening, MEXT, DAAD, Fulbright, GKS." },
              { type:"Government Scholarships", desc:"Funded by destination country governments. Generally the most prestigious and most competitive." },
              { type:"University Awards", desc:"Offered directly by universities — merit-based, research-based, or need-based. Often automatic upon admission." },
              { type:"Research Funding (TA/RA)", desc:"Graduate students funded by teaching or research assistantships. The most common PhD funding pathway globally." },
            ].map(t => (
              <div key={t.type} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <div className="font-black text-sm text-black mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full inline-block" />
                  {t.type}
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-black text-black mb-3">Key Factors That Determine Scholarship Success</h3>
          <ul className="space-y-3 mb-8">
            {[
              "Academic record — CGPA, class rank, and consistency across all semesters",
              "Language proficiency — IELTS 6.5–7.5 for most English-medium programs and scholarships",
              "Statement of Purpose — quality, specificity, and alignment with scholarship values",
              "References — strength and seniority of academic or professional referees",
              "Research experience — publications, theses, lab work, or field research",
              "Leadership and community involvement — especially critical for Chevening and Fulbright",
              "Financial need — for need-based awards and some government programs",
              "Application timing — the majority of scholarship delays and rejections come from late or incomplete submissions",
            ].map(item => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-yellow-500 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">{item}</span>
              </li>
            ))}
          </ul>

          {/* Internal links */}
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
            <h4 className="font-black text-black mb-4 flex items-center gap-2">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              Explore Scholarship Guides by Country
            </h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {ALL_COUNTRIES.slice(0, 8).map(c => (
                <Link key={c.slug} href={`/scholarships/${c.slug}`}
                  className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-yellow-200 hover:border-yellow-400 text-sm font-semibold text-black hover:text-yellow-700 transition-all group">
                  <span>{c.flag} {c.name} Scholarships</span>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-yellow-500" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERT CTA ───────────────────────────────────────────────────── */}
      <section className="bg-black py-16 px-6 text-center">
        <div className="container mx-auto max-w-3xl">
          <div className="text-5xl mb-5">🎓</div>
          <h2 className="text-3xl font-black text-white mb-4">Need Help Finding the Right Scholarship?</h2>
          <p className="text-gray-400 font-medium mb-8 max-w-xl mx-auto">
            Our scholarship consultants review your profile and match you with the best opportunities across 15+ countries.
            Free initial assessment — no commitment required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a href="https://wa.me/8801631312524" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-yellow-400 text-black px-10 py-5 rounded-2xl font-black hover:bg-white transition-all shadow-xl text-sm">
              💬 WhatsApp a Scholarship Expert
            </a>
            <Link href="/scholarships/united-states"
              className="inline-flex items-center gap-3 bg-white/10 text-white px-8 py-5 rounded-2xl font-black hover:bg-white/20 transition-all text-sm">
              Start with USA →
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs text-gray-500 font-semibold">
            <span>✅ Free consultation</span>
            <span>⚡ Response within 2 hours</span>
            <span>🎓 100+ successful applications</span>
          </div>
        </div>
      </section>

    </div>
  );
}