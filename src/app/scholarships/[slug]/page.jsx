"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

// ─── SEO Metadata (App Router — put in app/scholarships/[slug]/page.js) ───────
// export async function generateMetadata({ params }) {
//   const slug = params.slug;
//   const res = await fetch(`https://yoursite.com/api/scholarships?country_slug=${slug}`);
//   const data = await res.json();
//   const countryName = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
//   const count = Array.isArray(data) ? data.length : 0;
//   return {
//     title: `${countryName} Scholarships 2026 – ${count} Fully Funded Programs`,
//     description: `Explore ${count} verified scholarships in ${countryName} for 2026. Find fully funded programs with complete coverage of tuition, living costs, and travel. Updated application deadlines and official links.`,
//     keywords: `${countryName} scholarships 2026, fully funded scholarships ${countryName}, study in ${countryName}, international students ${countryName}`,
//     openGraph: {
//       title: `${countryName} Scholarships 2026 – ${count} Fully Funded Programs`,
//       description: `Find fully funded scholarships in ${countryName} for international students.`,
//       url: `https://yoursite.com/scholarships/${slug}`,
//       type: "website",
//     },
//     alternates: { canonical: `https://yoursite.com/scholarships/${slug}` },
//   };
// }

// ─── Dynamic Copy (varies per render for freshness) ──────────────────────────
const dynamicIntros = [
  (country, count) => `Discover ${count} rigorously verified scholarship programs available to international students in ${country} for 2026. Every listing includes official application links, exact funding scope, and current deadlines.`,
  (country, count) => `${country} hosts ${count} of the world's most competitive scholarship programs for graduate and undergraduate students. Browse funding options covering full tuition, living costs, and travel below.`,
  (country, count) => `Planning to study in ${country}? We've verified ${count} active scholarship programs for 2026 — from government-funded awards to university grants — with real deadlines and direct application links.`,
];

const fundingTypeDescriptions = {
  "Fully Funded": "This is a fully funded award — covering 100% of tuition, a monthly living stipend, return airfare, and health insurance. No additional funding is needed.",
  "Partial": "This scholarship provides partial funding. It typically covers tuition fees only; students are responsible for living costs and travel.",
  "Tuition Waiver": "A tuition waiver covers your academic fees but does not include a living allowance. Applicants should have separate accommodation funding.",
};

const relatedLinks = [
  { label: "All Fully Funded Scholarships", href: "/scholarships/funding/fully-funded" },
  { label: "PhD Scholarships 2026", href: "/scholarships/degree/phd" },
  { label: "Master's Scholarships 2026", href: "/scholarships/degree/masters" },
  { label: "No IELTS Scholarships", href: "/scholarships/no-ielts" },
  { label: "October Deadline Scholarships", href: "/scholarships/deadline/october" },
];

export default function CountryScholarships() {
  const { slug } = useParams();
  const [scholarships, setScholarships] = useState([]);
  const [countryInfo, setCountryInfo] = useState(null);
  const [allCountries, setAllCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [introIdx] = useState(() => Math.floor(Math.random() * dynamicIntros.length));

  const countryName = countryInfo?.country || slug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [schRes, countRes] = await Promise.all([
          fetch(`/api/scholarships?country_slug=${slug}`),
          fetch('/api/countries'),
        ]);
        const schData = await schRes.json();
        const countData = await countRes.json();

        setScholarships(Array.isArray(schData) ? schData : []);

        if (Array.isArray(countData)) {
          setAllCountries(countData);
          const current = countData.find(c =>
            c.country.toLowerCase().replace(/ /g, '-') === slug
          );
          setCountryInfo(current);
        }
      } catch (err) {
        console.error("Data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchData();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-600 mb-4"></div>
      <p className="text-gray-400 font-medium animate-pulse">Loading Opportunities for {slug?.replace(/-/g, ' ')}...</p>
    </div>
  );

  // ── JSON-LD structured data ──
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${countryName} Scholarships 2026`,
    "description": `Fully funded and partial scholarships for international students in ${countryName}.`,
    "url": `https://yoursite.com/scholarships/${slug}`,
    "numberOfItems": scholarships.length,
    "itemListElement": scholarships.slice(0, 10).map((s, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": s.scholarship_name,
      "url": s.official_link || `https://yoursite.com/scholarships/${slug}/${s.slug}`,
    })),
  };

  // ── Neighboring countries for internal linking ──
  const neighborCountries = allCountries
    .filter(c => c.country.toLowerCase().replace(/ /g, '-') !== slug)
    .slice(0, 10);

  // ── Fallback page when no scholarships ──
  if (!loading && scholarships.length === 0) {
    const fallbackCountries = allCountries.slice(0, 6);
    return (
      <div className="min-h-screen bg-[#F8FAFC] pb-20">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": `${countryName} Scholarships 2026`,
            "description": `We are currently compiling and verifying the 2026 scholarship listings for ${countryName}. Browse verified programs in other countries while we update.`,
          })}}
        />

        {/* Header */}
        <div className="bg-white border-b border-gray-100 mb-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <nav aria-label="Breadcrumb" className="flex gap-2 text-[10px] text-gray-400 mb-6 uppercase tracking-widest font-bold">
              <Link href="/" className="hover:text-blue-600 transition">Home</Link>
              <span>/</span>
              <Link href="/scholarships" className="hover:text-blue-600 transition">Scholarships</Link>
              <span>/</span>
              <span className="text-blue-600">{countryName}</span>
            </nav>
            <div className="flex items-center gap-6">
              {countryInfo?.flag && (
                <div className="w-20 h-14 rounded-xl overflow-hidden shadow-lg border border-gray-100 flex-shrink-0">
                  <img src={countryInfo.flag} className="w-full h-full object-cover" alt={`${countryName} flag`} />
                </div>
              )}
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 capitalize tracking-tight">
                  {countryName} <span className="text-blue-600">Scholarships 2026</span>
                </h1>
                <p className="text-gray-500 mt-2">Listings for this country are being verified for 2026.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6">
          {/* Main fallback card */}
          <div className="bg-white rounded-[2.5rem] p-16 text-center border border-gray-200 shadow-xl shadow-gray-100 mb-16">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-3xl font-black text-gray-800 mb-3">Scholarships Being Verified</h2>
            <p className="text-gray-500 max-w-lg mx-auto mb-2 leading-relaxed">
              We are currently collecting and verifying the official 2026 application links, deadlines, and funding details for <strong>{countryName}</strong> scholarship programs.
            </p>
            <p className="text-gray-400 max-w-md mx-auto mb-8 text-sm leading-relaxed">
              International students interested in studying in {countryName} can typically find opportunities through government-sponsored programs, university direct awards, and bilateral agreements. Check back soon — we update listings weekly.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/scholarships" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-100 hover:scale-105 transition">
                Browse All Countries
              </Link>
              <Link href="/scholarships/funding/fully-funded" className="bg-gray-50 text-gray-700 px-8 py-3 rounded-full font-bold border border-gray-100 hover:bg-gray-100 transition">
                View Fully Funded Programs
              </Link>
            </div>
          </div>

          {/* SEO text for fallback */}
          <div className="bg-blue-50 border border-blue-100 rounded-[2rem] p-10 mb-16">
            <h2 className="text-2xl font-black text-gray-900 mb-4">
              About Studying in {countryName}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {countryName} is a recognized destination for international students seeking high-quality education with globally respected degrees. Scholarships in this region typically cover programs at the Bachelor's, Master's, and doctoral level, often including language learning support for non-native speakers.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Government-funded scholarships, university merit awards, and bilateral agreements are the three main funding categories available to students. Eligibility requirements generally include a minimum GPA of 3.0 or above, proof of language proficiency, and a completed undergraduate degree for graduate-level programs.
            </p>
          </div>

          {/* Alternative country suggestions */}
          <h3 className="text-2xl font-black text-gray-900 mb-6">Explore Verified Scholarships Nearby</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {fallbackCountries.map(c => (
              <Link
                key={c.code}
                href={`/scholarships/${c.country.toLowerCase().replace(/ /g, '-')}`}
                className="group flex items-center gap-4 bg-white border border-gray-100 p-5 rounded-2xl hover:border-blue-200 hover:shadow-xl transition-all"
              >
                <img src={c.flag} className="w-10 h-7 object-cover rounded shadow-sm" alt={`${c.country} flag`} />
                <div>
                  <p className="font-black text-gray-800 text-sm group-hover:text-blue-600 transition">{c.country}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold mt-0.5">View Scholarships →</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[#F8FAFC] pb-20">
        {/* ── Premium Header ── */}
        <div className="bg-white border-b border-gray-100 mb-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-10">
            <nav aria-label="Breadcrumb" className="flex gap-2 text-[10px] text-gray-400 mb-6 uppercase tracking-widest font-bold">
              <Link href="/" className="hover:text-blue-600 transition">Home</Link>
              <span>/</span>
              <Link href="/scholarships" className="hover:text-blue-600 transition">Scholarships</Link>
              <span>/</span>
              <span className="text-blue-600">{countryName}</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {countryInfo?.flag && (
                <div className="w-20 h-14 rounded-xl overflow-hidden shadow-lg border border-gray-100 flex-shrink-0">
                  <img src={countryInfo.flag} className="w-full h-full object-cover" alt={`${countryName} flag`} />
                </div>
              )}
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 capitalize tracking-tight">
                  {countryName} <span className="text-blue-600">Scholarships 2026</span>
                </h1>
                <p className="text-gray-500 mt-2 text-base max-w-2xl">
                  {dynamicIntros[introIdx](countryName, scholarships.length)}
                </p>
              </div>
              {/* Quick stats */}
              <div className="flex gap-4 flex-shrink-0">
                <div className="text-center bg-blue-50 px-6 py-4 rounded-2xl">
                  <p className="text-3xl font-black text-blue-600">{scholarships.length}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-black mt-1">Programs</p>
                </div>
                <div className="text-center bg-gray-50 px-6 py-4 rounded-2xl">
                  <p className="text-3xl font-black text-gray-900">
                    {scholarships.filter(s => s.funding_type === 'Fully Funded').length}
                  </p>
                  <p className="text-[10px] text-gray-400 uppercase font-black mt-1">Fully Funded</p>
                </div>
              </div>
            </div>

            {/* Quick filter tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {relatedLinks.map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[11px] font-black uppercase tracking-wider px-4 py-2 rounded-full border border-gray-200 text-gray-500 bg-gray-50 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-10">

          {/* ── Main Content ── */}
          <main className="flex-1 space-y-10" aria-label="Scholarship listings">
            {scholarships.map((s) => (
              <article
                key={s.slug}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200/50 border border-white hover:border-blue-100 transition-all duration-500"
                aria-label={s.scholarship_name}
              >
                {/* Status Bar */}
                <div className="px-8 py-5 bg-gray-50/50 flex justify-between items-center border-b border-gray-50 flex-wrap gap-3">
                  <div className="flex gap-2 flex-wrap">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter text-white ${s.funding_type === 'Fully Funded' ? 'bg-blue-600' : s.funding_type === 'Partial' ? 'bg-amber-500' : 'bg-gray-600'}`}>
                      {s.funding_type || "Standard"}
                    </span>
                    {s.popular && (
                      <span className="px-4 py-1.5 bg-orange-500 text-white rounded-full text-[10px] font-black uppercase tracking-tighter">
                        🔥 Featured
                      </span>
                    )}
                    {s.degree_level?.map(d => (
                      <span key={d} className="px-4 py-1.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-tighter">
                        {d}
                      </span>
                    ))}
                  </div>
                  <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                    REF: {s?._id?.$oid?.slice(-6).toUpperCase() || s.slug?.slice(-6).toUpperCase() || 'N/A'}
                  </div>
                </div>

                <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-black text-gray-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                    {s.scholarship_name}
                  </h2>

                  {/* Funding type description for SEO */}
                  {fundingTypeDescriptions[s.funding_type] && (
                    <p className="text-sm text-gray-500 mb-8 bg-blue-50 border border-blue-100 px-5 py-3 rounded-xl leading-relaxed">
                      ℹ️ {fundingTypeDescriptions[s.funding_type]}
                    </p>
                  )}

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                    <StatCard icon="🎓" label="Degree Level" value={s.degree_level?.join(" & ") || "Multiple"} />
                    <StatCard icon="💰" label="Award Value" value={s.details?.award_value || "Full Coverage"} />
                    <StatCard icon="📈" label="Min GPA" value={s.details?.min_gpa || "Varies"} />
                    <StatCard icon="🌍" label="IELTS/TOEFL" value={s.details?.ielts || "Required"} />
                  </div>

                  {/* Additional details row */}
                  {(s.duration || s.language || s.details?.work_experience || s.details?.open_to) && (
                    <div className="flex flex-wrap gap-3 mb-10">
                      {s.duration && (
                        <span className="text-xs font-bold text-gray-600 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl">
                          ⏱ Duration: {s.duration}
                        </span>
                      )}
                      {s.language && (
                        <span className="text-xs font-bold text-gray-600 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl">
                          🗣 Language: {s.language}
                        </span>
                      )}
                      {s.details?.work_experience && (
                        <span className="text-xs font-bold text-gray-600 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl">
                          💼 Work Exp: {s.details.work_experience}
                        </span>
                      )}
                      {s.details?.open_to && (
                        <span className="text-xs font-bold text-gray-600 bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl">
                          👥 Open To: {s.details.open_to}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="grid md:grid-cols-3 gap-12">
                    <div className="md:col-span-2 space-y-8">
                      <div>
                        <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                          <span className="w-8 h-[2px] bg-blue-600 rounded-full"></span>
                          Eligibility Requirements
                        </h3>
                        <p className="text-gray-600 text-base leading-relaxed font-medium">{s.details?.eligibility}</p>
                      </div>

                      {/* Country + continent context for SEO */}
                      <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                        <h3 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-3">📍 Program Location</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-700 font-bold">
                          {s.country && <span>🌎 {s.country}</span>}
                          {s.continent && <span>· {s.continent}</span>}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {s.tags?.map(t => (
                          <Link
                            key={t}
                            href={`/scholarships/tag/${t}`}
                            className="text-[10px] bg-gray-50 border border-gray-100 px-4 py-2 rounded-xl text-gray-500 font-black uppercase tracking-widest hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition"
                          >
                            #{t}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Benefit Sidebar */}
                    <div className="bg-gray-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 blur-[80px] opacity-20"></div>
                      <h3 className="text-xl font-bold mb-6 text-blue-400">What's Covered</h3>
                      <ul className="space-y-4 mb-10" aria-label="Scholarship coverage">
                        {s.details?.coverage?.map((c, i) => (
                          <li key={i} className="flex gap-3 text-sm text-gray-300">
                            <span className="text-blue-500 font-bold flex-shrink-0">✓</span> {c}
                          </li>
                        ))}
                      </ul>
                      <div className="pt-6 border-t border-white/10">
                        <p className="text-[10px] uppercase font-black text-gray-500 mb-1">Application Deadline</p>
                        <p className="text-2xl font-black text-red-400 mb-2">{s.deadline}</p>
                        {s.duration && (
                          <p className="text-xs text-gray-500 mb-6">Duration: {s.duration}</p>
                        )}
                        <a
                          href={s.official_link || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Apply for ${s.scholarship_name} — opens official website`}
                          className="w-full block text-center bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-900/20"
                        >
                          Apply Now →
                        </a>
                        <p className="text-center text-[10px] text-gray-600 mt-3">Opens official scholarship portal</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {/* ── SEO Text Block (Dynamic per Country) ── */}
            <div className="bg-white border border-gray-100 rounded-[2.5rem] p-10 shadow-sm">
              <h2 className="text-2xl font-black text-gray-900 mb-5">
                About Scholarships in {countryName}
              </h2>
              <div className="prose prose-gray max-w-none text-gray-500 leading-relaxed text-sm space-y-4">
                <p>
                  {countryName} offers a wide range of scholarship opportunities for international students across all degree levels. Programs range from fully funded government awards — which cover tuition, living expenses, and travel — to university merit scholarships that offset academic costs for high-achieving applicants.
                </p>
                <p>
                  Most scholarships in {countryName} for 2026 require applicants to hold a minimum GPA between 3.0 and 3.5, along with proof of English language proficiency (IELTS or TOEFL). Some programs additionally require letters of recommendation, a statement of purpose, and in certain fields, prior work or research experience.
                </p>
                <p>
                  Application windows for {countryName} scholarships typically open between July and December for the following academic year. We recommend beginning your application 3–6 months before the posted deadline to allow time for document collection, translations, and institution-specific requirements.
                </p>
              </div>

              {/* Internal links inside SEO text */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Related Scholarship Guides</p>
                <div className="flex flex-wrap gap-3">
                  {relatedLinks.map(l => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="text-sm font-bold text-blue-600 hover:underline"
                    >
                      → {l.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </main>

          {/* ── Sidebar ── */}
          <aside className="lg:w-80 space-y-6" aria-label="Related scholarships">
            {/* Browse More Countries */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/20 sticky top-10">
              <h3 className="text-lg font-black text-gray-900 mb-6 flex items-center justify-between">
                Browse More <span className="text-xs bg-gray-100 px-2 py-1 rounded">2026</span>
              </h3>
              <nav aria-label="Other country scholarships">
                <div className="space-y-3">
                  {neighborCountries.map((rc) => (
                    <Link
                      key={rc.code}
                      href={`/scholarships/${rc.country.toLowerCase().replace(/ /g, '-')}`}
                      title={`${rc.country} Scholarships 2026`}
                      className="flex items-center gap-3 group p-2 hover:bg-blue-50 rounded-xl transition"
                    >
                      <img src={rc.flag} className="w-8 h-5 object-cover rounded shadow-sm flex-shrink-0" alt={`${rc.country} flag`} />
                      <span className="text-sm font-bold text-gray-500 group-hover:text-blue-600 transition leading-tight">{rc.country}</span>
                      <span className="ml-auto text-gray-300 group-hover:text-blue-400 text-xs">→</span>
                    </Link>
                  ))}
                </div>
              </nav>
              <Link href="/scholarships" className="mt-8 block text-center text-[10px] font-black text-blue-600 uppercase border-t pt-6 hover:tracking-widest transition-all">
                View All 264 Countries
              </Link>
            </div>

            {/* Filter by Degree */}
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <h3 className="text-base font-black text-gray-900 mb-5">Filter by Degree</h3>
              <div className="space-y-3">
                {[
                  { label: "Bachelor's Scholarships", href: "/scholarships/degree/bachelors", icon: "📚" },
                  { label: "Master's Scholarships", href: "/scholarships/degree/masters", icon: "🎓" },
                  { label: "PhD Scholarships", href: "/scholarships/degree/phd", icon: "🔬" },
                  { label: "Short Courses", href: "/scholarships/degree/short-course", icon: "📋" },
                ].map(d => (
                  <Link
                    key={d.href}
                    href={d.href}
                    className="flex items-center gap-3 group p-3 hover:bg-indigo-50 rounded-xl transition"
                  >
                    <span className="text-lg">{d.icon}</span>
                    <span className="text-sm font-bold text-gray-500 group-hover:text-indigo-600 transition">{d.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Deadline Alert */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 p-6 rounded-[2rem]">
              <p className="text-xs font-black text-red-500 uppercase tracking-widest mb-2">⚠️ Deadline Alert</p>
              <p className="text-sm font-bold text-gray-700 mb-3 leading-snug">
                Many {countryName} scholarships close between October–December 2025 for 2026 intake.
              </p>
              <Link href="/scholarships/deadline/october" className="text-xs font-black text-red-600 hover:underline uppercase tracking-widest">
                View October Deadlines →
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="bg-gray-50/50 border border-gray-100 p-5 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-blue-100/50 transition-all group/card">
      <div className="text-2xl mb-2 group-hover/card:scale-110 transition-transform">{icon}</div>
      <p className="text-[10px] uppercase font-black text-gray-400 tracking-wider mb-1">{label}</p>
      <p className="text-sm font-bold text-gray-900 truncate">{value}</p>
    </div>
  );
}