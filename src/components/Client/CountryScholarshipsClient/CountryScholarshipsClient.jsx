"use client";
// app/scholarships/[slug]/CountryScholarshipsClient.jsx  ← CLIENT COMPONENT
// All data comes as props from the server page — zero client-side fetching.

import { useState } from "react";
import Link from "next/link";

// ─── Static Data ──────────────────────────────────────────────────────────────
const dynamicIntros = [
  (country, count) =>
    `Discover ${count} rigorously verified scholarship programs available to international students in ${country} for 2026. Every listing includes official application links, exact funding scope, and current deadlines.`,
  (country, count) =>
    `${country} hosts ${count} of the world's most competitive scholarship programs for graduate and undergraduate students. Browse funding options covering full tuition, living costs, and travel below.`,
  (country, count) =>
    `Planning to study in ${country}? We've verified ${count} active scholarship programs for 2026 — from government-funded awards to university grants — with real deadlines and direct application links.`,
];

const fundingTypeDescriptions = {
  "Fully Funded":
    "This is a fully funded award — covering 100% of tuition, a monthly living stipend, return airfare, and health insurance. No additional funding is needed.",
  Partial:
    "This scholarship provides partial funding. It typically covers tuition fees only; students are responsible for living costs and travel.",
  "Tuition Waiver":
    "A tuition waiver covers your academic fees but does not include a living allowance. Applicants should have separate accommodation funding.",
};

const relatedLinks = [
  { label: "All Fully Funded Scholarships", href: "/scholarships/funding/fully-funded" },
  { label: "PhD Scholarships 2026", href: "/scholarships/degree/phd" },
  { label: "Master's Scholarships 2026", href: "/scholarships/degree/masters" },
  { label: "No IELTS Scholarships", href: "/scholarships/no-ielts" },
  { label: "October Deadline Scholarships", href: "/scholarships/deadline/october" },
];

// ─── Main Client Component ────────────────────────────────────────────────────
export default function CountryScholarshipsClient({
  slug,
  initialScholarships,
  initialCountryInfo,
  allCountries,
  countryName,
}) {
  const scholarships = initialScholarships;
  const countryInfo = initialCountryInfo;
  const [introIdx] = useState(() => Math.floor(Math.random() * dynamicIntros.length));

  const neighborCountries = allCountries
    .filter((c) => c.country.toLowerCase().replace(/ /g, "-") !== slug)
    .slice(0, 10);

  // ── Fallback: no scholarships yet ────────────────────────────────────────
  if (scholarships.length === 0) {
    const fallbackCountries = allCountries.slice(0, 6);

    return (
      <div className="min-h-screen bg-[#F0F4FF] pb-20">
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
                  <img
                    src={countryInfo.flag}
                    className="w-full h-full object-cover"
                    alt={`${countryName} flag`}
                    loading="eager"
                    width={80}
                    height={56}
                  />
                </div>
              )}
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 capitalize tracking-tight">
                  {countryName}{" "}
                  <span className="text-blue-600">Scholarships 2026</span>
                </h1>
                <p className="text-gray-500 mt-2">
                  Listings for this country are being verified for 2026.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6">
          {/* Main fallback card */}
          <div className="bg-white rounded-[2.5rem] p-16 text-center border border-gray-200 shadow-xl shadow-gray-100 mb-16">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-3xl font-black text-gray-800 mb-3">
              Scholarships Being Verified
            </h2>
            <p className="text-gray-500 max-w-lg mx-auto mb-2 leading-relaxed">
              We are currently collecting and verifying the official 2026 application
              links, deadlines, and funding details for{" "}
              <strong>{countryName}</strong> scholarship programs.
            </p>
            <p className="text-gray-400 max-w-md mx-auto mb-8 text-sm leading-relaxed">
              International students interested in studying in {countryName} can
              typically find opportunities through government-sponsored programs,
              university direct awards, and bilateral agreements. Check back soon — we
              update listings weekly.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/scholarships"
                className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-blue-100 hover:scale-105 transition"
              >
                Browse All Countries
              </Link>
              <Link
                href="/scholarships/funding/fully-funded"
                className="bg-gray-50 text-gray-700 px-8 py-3 rounded-full font-bold border border-gray-100 hover:bg-gray-100 transition"
              >
                View Fully Funded Programs
              </Link>
            </div>
          </div>

          {/* SEO text */}
          <div className="bg-blue-50 border border-blue-100 rounded-[2rem] p-10 mb-16">
            <h2 className="text-2xl font-black text-gray-900 mb-4">
              About Studying in {countryName}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {countryName} is a recognized destination for international students
              seeking high-quality education with globally respected degrees.
              Scholarships in this region typically cover programs at the
              Bachelor&apos;s, Master&apos;s, and doctoral level, often including
              language learning support for non-native speakers.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Government-funded scholarships, university merit awards, and bilateral
              agreements are the three main funding categories available to students.
              Eligibility requirements generally include a minimum GPA of 3.0 or
              above, proof of language proficiency, and a completed undergraduate
              degree for graduate-level programs.
            </p>
          </div>

          {/* FAQ */}
          <div className="bg-white border border-gray-100 rounded-[2rem] p-10 mb-16">
            <h2 className="text-2xl font-black text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-5">
              <FaqItem
                q={`Are there scholarships to study in ${countryName} for 2026?`}
                a={`Yes. ${countryName} offers government-sponsored scholarships, university merit awards, and bilateral scholarship agreements for international students. We are currently verifying the full list of 2026 programs.`}
              />
              <FaqItem
                q={`What documents are needed to apply for a ${countryName} scholarship?`}
                a="Most scholarship applications require academic transcripts, a valid passport, proof of English proficiency (IELTS/TOEFL), a statement of purpose, and two or more letters of recommendation."
              />
              <FaqItem
                q={`When do ${countryName} scholarship applications open?`}
                a={`Scholarship application windows for ${countryName} typically open between July and December for the following academic year intake.`}
              />
            </div>
          </div>

          {/* Nearby countries */}
          <h3 className="text-2xl font-black text-gray-900 mb-6">
            Explore Verified Scholarships Nearby
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {fallbackCountries.map((c) => (
              <Link
                key={c.code}
                href={`/scholarships/${c.country.toLowerCase().replace(/ /g, "-")}`}
                className="group flex items-center gap-4 bg-white border border-gray-100 p-5 rounded-2xl hover:border-blue-200 hover:shadow-xl transition-all"
              >
                <img
                  src={c.flag}
                  className="w-10 h-7 object-cover rounded shadow-sm"
                  alt={`${c.country} flag`}
                  loading="lazy"
                  width={40}
                  height={28}
                />
                <div>
                  <p className="font-black text-gray-800 text-sm group-hover:text-blue-600 transition">
                    {c.country}
                  </p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold mt-0.5">
                    View Scholarships →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Main Listing Page ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#F0F4FF] pb-20">

      {/* ── Hero Header ── */}
      <div className="relative bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a] overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[140px] opacity-10 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-400 rounded-full blur-[120px] opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 pt-8 pb-12">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex gap-2 text-[10px] text-blue-300/60 mb-8 uppercase tracking-widest font-bold">
            <Link href="/" className="hover:text-blue-300 transition">Home</Link>
            <span>/</span>
            <Link href="/scholarships" className="hover:text-blue-300 transition">Scholarships</Link>
            <span>/</span>
            <span className="text-blue-300">{countryName}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {countryInfo?.flag && (
              <div className="w-24 h-16 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 flex-shrink-0">
                <img
                  src={countryInfo.flag}
                  className="w-full h-full object-cover"
                  alt={`${countryName} flag`}
                  loading="eager"
                  width={96}
                  height={64}
                />
              </div>
            )}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
                Updated for 2026 Intake
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-none mb-3">
                {countryName}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Scholarships
                </span>{" "}
                <span className="text-white/40">2026</span>
              </h1>
              <p className="text-blue-100/60 mt-3 text-base max-w-2xl leading-relaxed">
                {dynamicIntros[introIdx](countryName, scholarships.length)}
              </p>
            </div>

            {/* Stats */}
            <div className="flex gap-3 flex-shrink-0">
              <div className="text-center bg-white/5 border border-white/10 backdrop-blur-sm px-6 py-5 rounded-2xl">
                <p className="text-4xl font-black text-white">{scholarships.length}</p>
                <p className="text-[9px] text-blue-300/60 uppercase font-black mt-1 tracking-widest">Programs</p>
              </div>
              <div className="text-center bg-blue-500/20 border border-blue-400/30 backdrop-blur-sm px-6 py-5 rounded-2xl">
                <p className="text-4xl font-black text-blue-300">
                  {scholarships.filter((s) => s.funding_type === "Fully Funded").length}
                </p>
                <p className="text-[9px] text-blue-300/60 uppercase font-black mt-1 tracking-widest">Fully Funded</p>
              </div>
            </div>
          </div>

          {/* Filter tags */}
          <div className="flex flex-wrap gap-2 mt-8">
            {relatedLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-full border border-white/10 text-white/50 bg-white/5 hover:bg-blue-500 hover:text-white hover:border-blue-400 transition-all"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-7xl mx-auto px-6 mt-10 flex flex-col lg:flex-row gap-10">

        {/* ── Main Content ── */}
        <main className="flex-1 space-y-8" aria-label="Scholarship listings">
          {scholarships.map((s, idx) => (
            <article
              key={s.slug}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-blue-100/40 border border-gray-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/60 transition-all duration-300"
              aria-label={s.scholarship_name}
            >
              {/* Coloured top accent bar */}
              <div
                className={`h-1 w-full ${
                  s.funding_type === "Fully Funded"
                    ? "bg-gradient-to-r from-blue-500 to-cyan-400"
                    : s.funding_type === "Partial"
                    ? "bg-gradient-to-r from-amber-400 to-orange-400"
                    : "bg-gradient-to-r from-gray-400 to-gray-500"
                }`}
              />

              {/* Status Bar */}
              <div className="px-8 py-4 bg-gray-50 flex justify-between items-center border-b border-gray-100 flex-wrap gap-3">
                <div className="flex gap-2 flex-wrap items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white ${
                      s.funding_type === "Fully Funded"
                        ? "bg-blue-600"
                        : s.funding_type === "Partial"
                        ? "bg-amber-500"
                        : "bg-gray-600"
                    }`}
                  >
                    {s.funding_type || "Standard"}
                  </span>
                  {s.popular && (
                    <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full text-[10px] font-black uppercase tracking-wider">
                      🔥 Featured
                    </span>
                  )}
                  {s.degree_level?.map((d) => (
                    <span
                      key={d}
                      className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-indigo-100"
                    >
                      {d}
                    </span>
                  ))}
                  {/* Deadline urgency badge */}
                  {s.deadline && (
                    <span className="px-3 py-1 bg-red-50 text-red-500 rounded-full text-[10px] font-black uppercase tracking-wider border border-red-100">
                      ⏰ {s.deadline}
                    </span>
                  )}
                </div>
                <div className="text-[10px] font-black text-gray-300 uppercase tracking-widest">
                  REF: {s?._id?.$oid?.slice(-6).toUpperCase() || s.slug?.slice(-6).toUpperCase() || "N/A"}
                </div>
              </div>

              <div className="p-8 md:p-10">
                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                  {s.scholarship_name}
                </h2>

                {/* Funding description pill */}
                {fundingTypeDescriptions[s.funding_type] && (
                  <div className="flex gap-3 items-start text-sm text-gray-600 mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 px-5 py-3 rounded-2xl leading-relaxed">
                    <span className="text-blue-500 flex-shrink-0 mt-0.5">ℹ️</span>
                    <p>{fundingTypeDescriptions[s.funding_type]}</p>
                  </div>
                )}

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                  <StatCard icon="🎓" label="Degree Level" value={s.degree_level?.join(" & ") || "Multiple"} />
                  <StatCard icon="💰" label="Award Value" value={s.details?.award_value || "Full Coverage"} />
                  <StatCard icon="📈" label="Min GPA" value={s.details?.min_gpa || "Varies"} />
                  <StatCard icon="🌍" label="IELTS/TOEFL" value={s.details?.ielts || "Required"} />
                </div>

                {/* Extra tags row */}
                {(s.duration || s.language || s.details?.work_experience || s.details?.open_to) && (
                  <div className="flex flex-wrap gap-2 mb-8">
                    {s.duration && (
                      <span className="text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
                        ⏱ Duration: {s.duration}
                      </span>
                    )}
                    {s.language && (
                      <span className="text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
                        🗣 Language: {s.language}
                      </span>
                    )}
                    {s.details?.work_experience && (
                      <span className="text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
                        💼 Work Exp: {s.details.work_experience}
                      </span>
                    )}
                    {s.details?.open_to && (
                      <span className="text-xs font-bold text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-xl">
                        👥 Open To: {s.details.open_to}
                      </span>
                    )}
                  </div>
                )}

                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-6">
                    {/* Eligibility */}
                    <div>
                      <h3 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-3 flex items-center gap-3">
                        <span className="w-6 h-[2px] bg-blue-600 rounded-full"></span>
                        Eligibility Requirements
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {s.details?.eligibility}
                      </p>
                    </div>

                    {/* Location */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-2xl p-4 border border-gray-100">
                      <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">
                        📍 Program Location
                      </h3>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-700 font-bold">
                        {s.country && <span>🌎 {s.country}</span>}
                        {s.continent && <span className="text-gray-400">·</span>}
                        {s.continent && <span>{s.continent}</span>}
                      </div>
                    </div>

                    {/* Tags */}
                    {s.tags && s.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {s.tags.map((t) => (
                          <Link
                            key={t}
                            href={`/scholarships/tag/${t}`}
                            className="text-[10px] bg-white border border-gray-200 px-3 py-1.5 rounded-xl text-gray-500 font-black uppercase tracking-wider hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition"
                          >
                            #{t}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Coverage Sidebar */}
                  <div className="bg-gradient-to-b from-[#0f172a] to-[#1e2d4a] text-white p-7 rounded-3xl shadow-2xl shadow-blue-900/20 relative overflow-hidden">
                    <div className="absolute -top-6 -right-6 w-28 h-28 bg-blue-500 rounded-full blur-3xl opacity-20" />
                    <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-cyan-400 rounded-full blur-3xl opacity-10" />

                    <h3 className="text-sm font-black mb-5 text-blue-300 uppercase tracking-widest">
                      What&apos;s Covered
                    </h3>
                    <ul className="space-y-3 mb-8" aria-label="Scholarship coverage">
                      {s.details?.coverage?.map((c, i) => (
                        <li key={i} className="flex gap-3 text-sm text-gray-300">
                          <span className="text-cyan-400 font-black flex-shrink-0 mt-0.5">✓</span>
                          {c}
                        </li>
                      ))}
                    </ul>

                    <div className="pt-5 border-t border-white/10">
                      <p className="text-[9px] uppercase font-black text-gray-500 mb-1 tracking-widest">
                        Application Deadline
                      </p>
                      <p className="text-xl font-black text-red-400 mb-1">{s.deadline}</p>
                      {s.duration && (
                        <p className="text-xs text-gray-500 mb-5">
                          Duration: {s.duration}
                        </p>
                      )}
                      <a
                        href={s.official_link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Apply for ${s.scholarship_name} — opens official website`}
                        className="w-full block text-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white py-3.5 rounded-2xl font-black text-sm transition-all active:scale-95 shadow-lg shadow-blue-900/30"
                      >
                        Apply Now →
                      </a>
                      <p className="text-center text-[9px] text-gray-600 mt-2">
                        Opens official scholarship portal
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}

          {/* ── SEO + FAQ Block ── */}
          <div className="bg-white border border-gray-100 rounded-3xl p-10 shadow-sm">
            <h2 className="text-2xl font-black text-gray-900 mb-5">
              About Scholarships in {countryName}
            </h2>
            <div className="text-gray-500 leading-relaxed text-sm space-y-4">
              <p>
                {countryName} offers a wide range of scholarship opportunities for
                international students across all degree levels. Programs range from
                fully funded government awards — which cover tuition, living expenses,
                and travel — to university merit scholarships that offset academic costs
                for high-achieving applicants.
              </p>
              <p>
                Most scholarships in {countryName} for 2026 require applicants to hold
                a minimum GPA between 3.0 and 3.5, along with proof of English language
                proficiency (IELTS or TOEFL). Some programs additionally require letters
                of recommendation, a statement of purpose, and in certain fields, prior
                work or research experience.
              </p>
              <p>
                Application windows for {countryName} scholarships typically open
                between July and December for the following academic year. We recommend
                beginning your application 3–6 months before the posted deadline to
                allow time for document collection, translations, and institution-specific
                requirements.
              </p>
            </div>

            {/* FAQ accordion */}
            <div className="mt-10 pt-10 border-t border-gray-100">
              <h2 className="text-xl font-black text-gray-900 mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                <FaqItem
                  q={`How many scholarships are available in ${countryName} for 2026?`}
                  a={`There are ${scholarships.length} verified scholarship programs for international students in ${countryName} for 2026, including ${scholarships.filter((s) => s.funding_type === "Fully Funded").length} fully funded awards.`}
                />
                <FaqItem
                  q={`Are there fully funded scholarships to study in ${countryName}?`}
                  a={`Yes. There are currently ${scholarships.filter((s) => s.funding_type === "Fully Funded").length} fully funded scholarships in ${countryName} that cover tuition, living expenses, airfare, and health insurance.`}
                />
                <FaqItem
                  q={`What GPA is required for scholarships in ${countryName}?`}
                  a={`Most scholarship programs in ${countryName} require a minimum GPA of 3.0 to 3.5 on a 4.0 scale. Highly competitive awards may require higher academic standing.`}
                />
                <FaqItem
                  q={`When do ${countryName} scholarship applications open?`}
                  a={`Application windows typically open between July and December for the following academic year. Apply 3–6 months before posted deadlines for the best chance of success.`}
                />
              </div>
            </div>

            {/* Related links */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                Related Scholarship Guides
              </p>
              <div className="flex flex-wrap gap-3">
                {relatedLinks.map((l) => (
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
          <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-lg shadow-blue-50 sticky top-10">
            <h3 className="text-base font-black text-gray-900 mb-5 flex items-center justify-between">
              Browse More{" "}
              <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-1 rounded-full font-black">
                2026
              </span>
            </h3>
            <nav aria-label="Other country scholarships">
              <div className="space-y-1">
                {neighborCountries.map((rc) => (
                  <Link
                    key={rc.code}
                    href={`/scholarships/${rc.country.toLowerCase().replace(/ /g, "-")}`}
                    title={`${rc.country} Scholarships 2026`}
                    className="flex items-center gap-3 group p-2.5 hover:bg-blue-50 rounded-xl transition"
                  >
                    <img
                      src={rc.flag}
                      className="w-8 h-5 object-cover rounded-md shadow-sm flex-shrink-0"
                      alt={`${rc.country} flag`}
                      loading="lazy"
                      width={32}
                      height={20}
                    />
                    <span className="text-sm font-bold text-gray-600 group-hover:text-blue-600 transition leading-tight">
                      {rc.country}
                    </span>
                    <span className="ml-auto text-gray-300 group-hover:text-blue-400 text-xs">→</span>
                  </Link>
                ))}
              </div>
            </nav>
            <Link
              href="/scholarships"
              className="mt-6 block text-center text-[10px] font-black text-blue-600 uppercase border-t border-gray-100 pt-5 hover:tracking-widest transition-all"
            >
              View All 264 Countries
            </Link>
          </div>

          {/* Filter by Degree */}
          <div className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-base font-black text-gray-900 mb-4">Filter by Degree</h3>
            <div className="space-y-1">
              {[
                { label: "Bachelor's Scholarships", href: "/scholarships/degree/bachelors", icon: "📚" },
                { label: "Master's Scholarships", href: "/scholarships/degree/masters", icon: "🎓" },
                { label: "PhD Scholarships", href: "/scholarships/degree/phd", icon: "🔬" },
                { label: "Short Courses", href: "/scholarships/degree/short-course", icon: "📋" },
              ].map((d) => (
                <Link
                  key={d.href}
                  href={d.href}
                  className="flex items-center gap-3 group p-2.5 hover:bg-indigo-50 rounded-xl transition"
                >
                  <span className="text-lg w-8 text-center">{d.icon}</span>
                  <span className="text-sm font-bold text-gray-500 group-hover:text-indigo-600 transition">
                    {d.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick stats card */}
          <div className="bg-gradient-to-br from-[#0f172a] to-[#1e3a5f] p-7 rounded-3xl text-white">
            <h3 className="text-sm font-black text-blue-300 uppercase tracking-widest mb-5">
              📊 At a Glance
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 font-bold">Total Programs</span>
                <span className="text-lg font-black text-white">{scholarships.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 font-bold">Fully Funded</span>
                <span className="text-lg font-black text-cyan-400">
                  {scholarships.filter((s) => s.funding_type === "Fully Funded").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 font-bold">Partial Funding</span>
                <span className="text-lg font-black text-amber-400">
                  {scholarships.filter((s) => s.funding_type === "Partial").length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400 font-bold">Tuition Waiver</span>
                <span className="text-lg font-black text-gray-300">
                  {scholarships.filter((s) => s.funding_type === "Tuition Waiver").length}
                </span>
              </div>
            </div>
          </div>

          {/* Deadline Alert */}
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-100 p-6 rounded-3xl">
            <p className="text-xs font-black text-red-500 uppercase tracking-widest mb-2">
              ⚠️ Deadline Alert
            </p>
            <p className="text-sm font-bold text-gray-700 mb-3 leading-snug">
              Many {countryName} scholarships close between October–December 2025 for
              2026 intake.
            </p>
            <Link
              href="/scholarships/deadline/october"
              className="text-xs font-black text-red-600 hover:underline uppercase tracking-widest"
            >
              View October Deadlines →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatCard({ icon, label, value }) {
  return (
    <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl hover:bg-white hover:shadow-lg hover:shadow-blue-50 transition-all group/card">
      <div className="text-xl mb-2 group-hover/card:scale-110 transition-transform inline-block">
        {icon}
      </div>
      <p className="text-[9px] uppercase font-black text-gray-400 tracking-wider mb-1">{label}</p>
      <p className="text-sm font-black text-gray-900 truncate">{value}</p>
    </div>
  );
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border rounded-2xl overflow-hidden transition-all ${open ? "border-blue-200 shadow-sm shadow-blue-50" : "border-gray-100"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition"
        aria-expanded={open}
      >
        <span className="font-bold text-gray-800 text-sm pr-4 leading-snug">{q}</span>
        <span
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
            open
              ? "border-blue-500 bg-blue-500 text-white rotate-45"
              : "border-gray-300 text-gray-400"
          }`}
        >
          <span className="text-sm font-black leading-none">+</span>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed border-t border-gray-50 pt-3">
          {a}
        </div>
      )}
    </div>
  );
}