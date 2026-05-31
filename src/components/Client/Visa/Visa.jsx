"use client";
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createSlug } from '@/app/lib/utils';

/* ─────────────────────────────────────────────
   DATA CONSTANTS
────────────────────────────────────────────── */

const POPULAR_ROUTES = [
  { origin: 'Bangladesh', dest: 'Canada',               time: '15–21 days', type: 'Sticker Visa' },
  { origin: 'Bangladesh', dest: 'United States',        time: '4–8 weeks',  type: 'Sticker Visa' },
  { origin: 'Bangladesh', dest: 'United Kingdom',       time: '3 weeks',    type: 'Sticker Visa' },
  { origin: 'Bangladesh', dest: 'Australia',            time: '4–8 weeks',  type: 'Sticker Visa' },
  { origin: 'Bangladesh', dest: 'Germany',              time: '8–12 weeks', type: 'Schengen Visa' },
  { origin: 'Bangladesh', dest: 'Italy',                time: '10–14 days', type: 'Schengen Visa' },
  { origin: 'Bangladesh', dest: 'Malaysia',             time: '3–5 days',   type: 'E-Visa' },
  { origin: 'Bangladesh', dest: 'Thailand',             time: '2–3 days',   type: 'Sticker Visa' },
];

const STATS = [
  { value: '195+', label: 'Countries',        icon: '🌏' },
  { value: '98%',  label: 'Success Rate',     icon: '✅' },
  { value: '42K+', label: 'Travelers Helped', icon: '✈️' },
  { value: '24/7', label: 'Expert Support',   icon: '🛡️' },
];

const VISA_TYPES = [
  { icon: '🏖️', label: 'Tourist Visa',   href: '/visa/tourist-visa',  desc: 'Leisure & sightseeing', color: 'from-sky-50 to-blue-50 border-sky-100 hover:border-sky-300' },
  { icon: '💼', label: 'Business Visa',  href: '/visa/business-visa', desc: 'Meetings & trade',       color: 'from-violet-50 to-purple-50 border-violet-100 hover:border-violet-300' },
  { icon: '🎓', label: 'Student Visa',   href: '/visa/student-visa',  desc: 'Academic enrollment',    color: 'from-green-50 to-emerald-50 border-green-100 hover:border-green-300' },
  { icon: '🔁', label: 'Transit Visa',   href: '/visa/transit-visa',  desc: 'Layover & connections',  color: 'from-orange-50 to-amber-50 border-orange-100 hover:border-orange-300' },
  { icon: '💻', label: 'E-Visa',          href: '/visa/e-visa',        desc: 'Apply online instantly', color: 'from-pink-50 to-rose-50 border-pink-100 hover:border-pink-300' },
  { icon: '🏗️', label: 'Work Visa',      href: '/visa/work-visa',     desc: 'Employment abroad',      color: 'from-indigo-50 to-blue-50 border-indigo-100 hover:border-indigo-300' },
];

/* SEO-rich internal destination links */
const SEO_DESTINATION_LINKS = [
  { dest: 'Canada',               origin: 'Bangladesh', label: 'Canada Visa for Bangladeshi' },
  { dest: 'United States',        origin: 'Bangladesh', label: 'USA Visa for Bangladeshi' },
  { dest: 'United Kingdom',       origin: 'Bangladesh', label: 'UK Visa for Bangladeshi' },
  { dest: 'Australia',            origin: 'Bangladesh', label: 'Australia Visa for Bangladeshi' },
  { dest: 'Germany',              origin: 'Bangladesh', label: 'Germany Visa for Bangladeshi' },
  { dest: 'Italy',                origin: 'Bangladesh', label: 'Italy Visa for Bangladeshi' },
  { dest: 'France',               origin: 'Bangladesh', label: 'France Visa for Bangladeshi' },
  { dest: 'Malaysia',             origin: 'Bangladesh', label: 'Malaysia Visa for Bangladeshi' },
  { dest: 'Thailand',             origin: 'Bangladesh', label: 'Thailand Visa for Bangladeshi' },
  { dest: 'Japan',                origin: 'Bangladesh', label: 'Japan Visa for Bangladeshi' },
  { dest: 'Singapore',            origin: 'Bangladesh', label: 'Singapore Visa for Bangladeshi' },
  { dest: 'United Arab Emirates', origin: 'Bangladesh', label: 'Dubai Visa for Bangladeshi' },
  { dest: 'Portugal',             origin: 'Bangladesh', label: 'Portugal Visa for Bangladeshi' },
  { dest: 'Spain',                origin: 'Bangladesh', label: 'Spain Visa for Bangladeshi' },
  { dest: 'Netherlands',          origin: 'Bangladesh', label: 'Netherlands Visa for Bangladeshi' },
  { dest: 'New Zealand',          origin: 'Bangladesh', label: 'New Zealand Visa for Bangladeshi' },
];

/* Rich keyword clusters for long-tail ranking */
const RICH_QUERY_CLUSTERS = [
  {
    heading: 'Visa Requirements by Country',
    icon: '🗺️',
    links: [
      { label: 'Canada visa requirements 2026',               href: '/visa/bangladesh-to-canada' },
      { label: 'USA visa requirements for Bangladeshi',       href: '/visa/bangladesh-to-united-states' },
      { label: 'UK Standard Visitor visa documents',          href: '/visa/bangladesh-to-united-kingdom' },
      { label: 'Australia tourist visa checklist 2026',       href: '/visa/bangladesh-to-australia' },
      { label: 'Schengen visa requirements Bangladesh',       href: '/schengen-visa' },
      { label: 'Germany Schengen visa documents 2026',        href: '/visa/bangladesh-to-germany' },
      { label: 'Japan tourist visa for Bangladesh',           href: '/visa/bangladesh-to-japan' },
      { label: 'Dubai visa on arrival for Bangladesh',        href: '/visa/bangladesh-to-united-arab-emirates' },
    ],
  },
  {
    heading: 'Visa Processing Time Tracker',
    icon: '⏱️',
    links: [
      { label: 'Canada visa processing time 2026',            href: '/visa-processing-time-tracker/canada-national-visa-processing-time-for-bangladesh' },
      { label: 'Australia visa processing time Bangladesh',   href: '/visa-processing-time-tracker/australia-national-visa-processing-time-for-bangladesh' },
      { label: 'UK visa processing time 2026',                href: '/visa-processing-time-tracker/united-kingdom-national-visa-processing-time-for-bangladesh' },
      { label: 'Schengen visa processing time Germany',       href: '/visa-processing-time-tracker/germany-national-visa-processing-time-for-bangladesh' },
      { label: 'USA visa appointment waiting time',           href: '/visa-processing-time-tracker/united-states-national-visa-processing-time-for-bangladesh' },
      { label: 'Malaysia e-visa processing time',             href: '/visa-processing-time-tracker/malaysia-national-visa-processing-time-for-bangladesh' },
    ],
  },
  {
    heading: 'Visa Rejection & Refusal Guides',
    icon: '❌',
    links: [
      { label: 'Why Canada visa gets rejected — 2026',        href: '/visa-rejection/bangladesh-visa-rejection-rate-for-canada?type=tourist' },
      { label: 'UK visa rejection reasons Bangladesh',        href: '/visa-rejection/bangladesh-visa-rejection-rate-for-united-kingdom?type=tourist' },
      { label: 'Schengen visa refusal reasons 2026',          href: '/visa-rejection/bangladesh-visa-rejection-rate-for-germany?type=tourist' },
      { label: 'USA visa denial common reasons',              href: '/visa-rejection/bangladesh-visa-rejection-rate-for-united-states?type=tourist' },
      { label: 'How to appeal a visa rejection',              href: '/visa-rejection' },
      { label: 'Reapply after visa refusal — guide',          href: '/visa-rejection' },
    ],
  },
  {
    heading: 'Scholarship & Student Visa',
    icon: '🎓',
    links: [
      { label: 'USA scholarships for Bangladeshi students',   href: '/scholarships/united-states' },
      { label: 'Canada scholarships 2026 — full list',        href: '/scholarships/canada' },
      { label: 'UK Chevening scholarship Bangladesh',         href: '/scholarships/united-kingdom' },
      { label: 'Germany DAAD scholarship guide',              href: '/scholarships/germany' },
      { label: 'Australia student visa documents',            href: '/visa/student-visa/australia' },
      { label: 'All scholarship guides — 2026',               href: '/scholarships' },
    ],
  },
  {
    heading: 'Dubai Residents Visa Hub',
    icon: '🏙️',
    links: [
      { label: 'Armenia visa for Dubai residents',            href: '/visa/dubai-residents/armenia' },
      { label: 'Georgia visa for Dubai residents',            href: '/visa/dubai-residents/georgia' },
      { label: 'Thailand visa for Dubai residents',           href: '/visa/dubai-residents/thailand' },
      { label: 'Indonesia visa for Dubai residents',          href: '/visa/dubai-residents/indonesia' },
      { label: 'Azerbaijan visa for Dubai residents',         href: '/visa/dubai-residents/azerbaijan' },
      { label: 'All Dubai resident visa guides',              href: '/visa/dubai-residents' },
    ],
  },
  {
    heading: 'E-Visa & On Arrival',
    icon: '💻',
    links: [
      { label: 'Albania e-visa application guide',            href: '/visa/e-visa/albania' },
      { label: 'Georgia e-visa — Bangladesh 2026',            href: '/visa/e-visa/georgia' },
      { label: 'Turkey e-visa for Bangladeshi',               href: '/visa/e-visa/turkey' },
      { label: 'Cambodia e-visa — apply online',              href: '/visa/e-visa/cambodia' },
      { label: 'Sri Lanka ETA Bangladesh citizens',           href: '/visa/e-visa/sri-lanka' },
      { label: 'All e-visa destinations 2026',                href: '/visa/e-visa' },
    ],
  },
  {
    heading: 'Transit Visa Guides',
    icon: '🔁',
    links: [
      { label: 'UAE transit visa for Bangladesh',             href: '/visa/transit-visa/india-transit-at-united-arab-emirates' },
      { label: 'UK transit visa — DATV guide',                href: '/visa/transit-visa/united-kingdom' },
      { label: 'Germany transit airport visa',                href: '/visa/transit-visa/germany' },
      { label: 'Singapore transit without visa rule',         href: '/visa/transit-visa/singapore' },
      { label: 'All transit visa guides',                     href: '/visa/transit-visa' },
    ],
  },
  {
    heading: 'Work & Business Visa',
    icon: '💼',
    links: [
      { label: 'Canada work visa from Bangladesh 2026',       href: '/visa/work-visa/india-to-canada' },
      { label: 'Singapore business visa — Bangladesh',        href: '/visa/business-visa/bangladesh-to-singapore' },
      { label: 'UK skilled worker visa 2026',                 href: '/visa-news/uk-skilled-worker-salary-increase-2026' },
      { label: 'Germany job seeker visa guide',               href: '/visa/work-visa/germany' },
      { label: 'Canada Express Entry 2026 guide',             href: '/visa-news/canada-express-entry-healthcare-draw-2026' },
      { label: 'All work visa guides',                        href: '/visa/work-visa' },
    ],
  },
];

/* Schengen countries hub */
const SCHENGEN_COUNTRIES = [
  'Germany', 'France', 'Italy', 'Spain', 'Netherlands', 'Portugal',
  'Austria', 'Belgium', 'Greece', 'Poland', 'Sweden', 'Denmark',
];

/* Visa news / blog SEO anchors */
const VISA_NEWS_LINKS = [
  { label: 'UK Skilled Worker Salary Increase 2026',       href: '/visa-news/uk-skilled-worker-salary-increase-2026' },
  { label: 'Schengen Digital Nomad Visa EU 2026',          href: '/visa-news/schengen-digital-nomad-visa-eu-2026' },
  { label: 'Canada Express Entry Healthcare Draw 2026',    href: '/visa-news/canada-express-entry-healthcare-draw-2026' },
  { label: 'Latest visa news & policy updates',           href: '/visa-news' },
];

/* Utility links for resources */
const RESOURCE_LINKS = [
  { label: '📋 Visa Checklist Generator',  href: '/visa-resources/visa-checklist-generator' },
  { label: '📄 Document Generator',        href: '/visa-resources/visa-document-generator' },
  { label: '⏱️ Processing Time Tracker',  href: '/visa-processing-time-tracker' },
  { label: '❌ Visa Rejection Analyser',   href: '/visa-rejection' },
  { label: '🎓 Scholarship Finder',         href: '/scholarships' },
  { label: '🌐 Schengen Visa Hub',          href: '/schengen-visa' },
];

const buildVisaUrl = (destName, originName) =>
  `/visa/${createSlug(originName)}-to-${createSlug(destName)}`;

/* ─────────────────────────────────────────────
   ANIMATION VARIANTS
────────────────────────────────────────────── */
const containerVars = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.07 } },
};
const itemVars = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

/* ─────────────────────────────────────────────
   SECTION DIVIDER
────────────────────────────────────────────── */
function SectionHeader({ title, subtitle }) {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="flex-1">
        <h2 className="text-xl font-extrabold tracking-tight text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="h-px flex-1 bg-gray-100 mt-3 hidden md:block" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
────────────────────────────────────────────── */
export default function VisaGuide() {
  const [origin,      setOrigin]      = useState('bangladesh');
  const [destination, setDestination] = useState('canada');
  const [visaData,    setVisaData]    = useState([]);
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    fetch('/api/countries')
      .then(r => r.json())
      .then(data => { setVisaData(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const originData = useMemo(
    () => visaData.find(c => c.country.toLowerCase() === origin),
    [origin, visaData]
  );
  const destData = useMemo(
    () => visaData.find(c => c.country.toLowerCase() === destination),
    [destination, visaData]
  );

  return (
    <div className="min-h-screen bg-white font-sans antialiased text-gray-900 overflow-x-hidden">

      {/* ── SUBTLE BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />

      <motion.div
        variants={containerVars}
        initial="initial"
        animate="animate"
        className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-20"
      >

        {/* ════════════════════════════════
            HERO
        ════════════════════════════════ */}
        <motion.div variants={itemVars} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 bg-blue-50 border border-blue-100 rounded-full">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.18em] text-blue-700 uppercase">
              Official Visa Intelligence Portal · Updated May 2026
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight text-gray-900 leading-[1.07]">
            Visa Requirements &amp; Documents<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              For Every Country — 2026
            </span>
          </h1>

          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-3">
            Embassy-verified visa requirements, document checklists, processing times and fees for{' '}
            <strong className="text-gray-700">195+ countries</strong>. Trusted by Bangladeshi travelers since 2019.
            Updated monthly for 2026 embassy protocols.
          </p>

          <p className="text-gray-400 text-sm">
            Trusted by <strong className="text-gray-600">42,000+ travelers</strong> · 98% visa approval rate ·{' '}
            <Link href="/visa-rejection" className="text-blue-600 hover:underline font-semibold">
              Free rejection analysis
            </Link>
          </p>
        </motion.div>

        {/* ════════════════════════════════
            STATS
        ════════════════════════════════ */}
        <motion.div variants={itemVars}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 max-w-xl mx-auto">
          {STATS.map(s => (
            <div key={s.label}
              className="text-center bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="text-lg font-black text-gray-900">{s.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ════════════════════════════════
            SEARCH PANEL
        ════════════════════════════════ */}
        <motion.div variants={itemVars} className="relative z-20 mb-14">
          <div className="bg-white border border-gray-200 p-5 md:p-7 rounded-3xl shadow-sm">
            <p className="text-center text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">
              Select nationality &amp; destination · get your personalised visa guide instantly
            </p>

            {loading ? (
              <div className="text-center py-8 text-gray-400 font-bold animate-pulse">Loading countries…</div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">

                  {/* Origin */}
                  <div className="flex-1 bg-gray-50 p-4 rounded-2xl border border-gray-200
                    hover:border-blue-300 focus-within:border-blue-400 transition-all">
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1.5">
                      🌍 Your Nationality / Passport
                    </label>
                    <div className="flex items-center gap-3">
                      {originData?.flag && (
                        <img src={originData.flag}
                          className="w-7 h-5 object-cover rounded shadow-sm shrink-0"
                          alt={`${origin} flag`} />
                      )}
                      <select
                        value={origin}
                        onChange={e => setOrigin(e.target.value)}
                        className="bg-transparent text-base font-bold outline-none cursor-pointer
                          capitalize w-full appearance-none text-gray-800"
                      >
                        {visaData.filter(c => c.country.toLowerCase() !== destination).map(c => (
                          <option key={c.code} value={c.country.toLowerCase()}>{c.country}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex items-center justify-center w-10 h-10
                    bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-md text-white shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="3"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </div>

                  {/* Destination */}
                  <div className="flex-1 bg-gray-50 p-4 rounded-2xl border border-gray-200
                    hover:border-blue-300 focus-within:border-blue-400 transition-all">
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1.5">
                      📍 Destination Country
                    </label>
                    <div className="flex items-center gap-3">
                      {destData?.flag && (
                        <img src={destData.flag}
                          className="w-7 h-5 object-cover rounded shadow-sm shrink-0"
                          alt={`${destination} flag`} />
                      )}
                      <select
                        value={destination}
                        onChange={e => setDestination(e.target.value)}
                        className="bg-transparent text-base font-bold outline-none cursor-pointer
                          capitalize w-full appearance-none text-gray-800"
                      >
                        {visaData.filter(c => c.country.toLowerCase() !== origin).map(c => (
                          <option key={c.code} value={c.country.toLowerCase()}>{c.country}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={buildVisaUrl(destination, origin)}
                    className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600
                      hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-5 rounded-2xl
                      font-black transition-all shadow-lg shadow-blue-100 active:scale-95
                      text-center flex items-center justify-center gap-2 group whitespace-nowrap"
                  >
                    <span>Check Requirements</span>
                    <svg className="group-hover:translate-x-1 transition-transform"
                      xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                      fill="none" stroke="currentColor" strokeWidth="3"
                      strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {originData && destData && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 font-semibold">
                    <span>Showing guide for:</span>
                    <img src={originData.flag} className="w-5 h-3 object-cover rounded-sm" alt="" />
                    <span className="capitalize font-black text-gray-700">{origin}</span>
                    <span className="text-gray-300">→</span>
                    <img src={destData.flag} className="w-5 h-3 object-cover rounded-sm" alt="" />
                    <span className="capitalize font-black text-gray-700">{destination}</span>
                    <span className="ml-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-black text-[9px] uppercase tracking-wider">
                      Ready
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>

        {/* ════════════════════════════════
            QUICK RESOURCE LINKS (toolbar)
        ════════════════════════════════ */}
        <motion.div variants={itemVars} className="mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {RESOURCE_LINKS.map(r => (
              <Link key={r.href} href={r.href}
                className="text-xs font-semibold text-gray-600 bg-white border border-gray-200
                  px-4 py-2 rounded-full hover:border-blue-300 hover:text-blue-700
                  hover:bg-blue-50 transition-all shadow-sm">
                {r.label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ════════════════════════════════
            VISA TYPE CARDS
        ════════════════════════════════ */}
        <motion.div variants={itemVars} className="mb-14">
          <SectionHeader
            title="Browse by Visa Type"
            subtitle="Find the exact visa guide for your travel purpose"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {VISA_TYPES.map(v => (
              <Link key={v.label} href={v.href}
                title={`${v.label} — ${v.desc}`}
                className={`group flex flex-col items-center gap-2 p-4 bg-gradient-to-br
                  ${v.color} border-2 rounded-2xl transition-all`}
              >
                <span className="text-2xl">{v.icon}</span>
                <span className="text-xs font-black text-gray-700 group-hover:text-blue-700
                  transition-colors text-center leading-tight">{v.label}</span>
                <span className="text-[9px] text-gray-400 text-center leading-tight hidden md:block">
                  {v.desc}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ════════════════════════════════
            POPULAR ROUTES
        ════════════════════════════════ */}
        <motion.div variants={itemVars} className="mb-14">
          <SectionHeader
            title="🔥 Most Searched Visa Routes 2026"
            subtitle="Based on real monthly search volume — updated weekly"
          />
          <div className="grid sm:grid-cols-2 gap-3">
            {POPULAR_ROUTES.map((r, i) => {
              const destEntry = visaData.find(c => c.country === r.dest);
              const origEntry = visaData.find(c => c.country === r.origin);
              return (
                <Link key={i}
                  href={buildVisaUrl(r.dest, r.origin)}
                  title={`${r.dest} visa requirements for ${r.origin} citizens 2026`}
                  className="group flex items-center gap-4 p-4 bg-white border border-gray-200
                    rounded-2xl hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center
                    text-sm font-black text-gray-400 group-hover:bg-blue-600
                    group-hover:text-white transition-all shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    {origEntry?.flag && (
                      <img src={origEntry.flag} className="w-7 h-5 object-cover rounded shadow-sm" alt={r.origin} />
                    )}
                    <span className="text-xs text-gray-300 font-bold">→</span>
                    {destEntry?.flag && (
                      <img src={destEntry.flag} className="w-7 h-5 object-cover rounded shadow-sm" alt={r.dest} />
                    )}
                    <div className="ml-1">
                      <div className="text-sm font-black text-gray-800">{r.origin} → {r.dest}</div>
                      <div className="text-[10px] text-gray-400 font-semibold">
                        {r.type} · ⏱ {r.time}
                      </div>
                    </div>
                  </div>
                  <svg className="text-gray-300 group-hover:text-blue-500 shrink-0 transition-colors"
                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="3"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* ════════════════════════════════
            RICH QUERY CLUSTERS (8 columns)
        ════════════════════════════════ */}
        <motion.div variants={itemVars} className="mb-14">
          <SectionHeader
            title="Complete Visa Resource Hub"
            subtitle="Every visa topic, country, and document guide — all in one place"
          />
          <div className="grid md:grid-cols-2 gap-6">
            {RICH_QUERY_CLUSTERS.map(cluster => (
              <div key={cluster.heading}
                className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                <h3 className="text-sm font-black text-gray-800 mb-3 flex items-center gap-2">
                  <span>{cluster.icon}</span>
                  <span>{cluster.heading}</span>
                </h3>
                <ul className="space-y-1.5">
                  {cluster.links.map(link => (
                    <li key={link.href}>
                      <Link href={link.href}
                        className="flex items-center gap-1.5 text-sm text-gray-600
                          hover:text-blue-700 hover:underline font-medium transition-colors">
                        <span className="text-gray-300 text-xs">›</span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ════════════════════════════════
            ALL DESTINATIONS GRID
        ════════════════════════════════ */}
        <motion.div variants={itemVars} className="mb-14">
          <SectionHeader
            title={`All Visa Destinations for ${origin.charAt(0).toUpperCase() + origin.slice(1)} Citizens 2026`}
            subtitle="Click any country to see the full visa requirements, documents checklist, and embassy fees"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {visaData
              .filter(item => item.country.toLowerCase() !== origin)
              .slice(0, 25)
              .map((item, idx) => (
                <motion.div
                  key={item.code}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.025 }}
                  whileHover={{ y: -4 }}
                >
                  <Link
                    href={buildVisaUrl(item.country, origin)}
                    title={`${item.country} visa requirements for ${origin} citizens — documents, fees, processing time`}
                    className="group relative flex flex-col items-center p-5 bg-white rounded-2xl
                      border border-gray-100 hover:border-blue-200 shadow-sm
                      hover:shadow-md transition-all overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/60
                      opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 w-12 h-8 mb-3 overflow-hidden rounded-md shadow-sm">
                      <img
                        src={item.flag}
                        alt={`${item.country} visa for ${origin} citizens`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="relative z-10 text-xs font-black text-gray-800 tracking-tight
                      text-center capitalize group-hover:text-blue-700 transition-colors leading-snug">
                      {item.country}
                    </span>
                    <span className="relative z-10 text-[9px] font-semibold text-gray-400 mt-0.5
                      uppercase tracking-wider group-hover:text-blue-400 transition-colors">
                      Guide →
                    </span>
                  </Link>
                </motion.div>
              ))}
          </div>
        </motion.div>

        {/* ════════════════════════════════
            SCHENGEN HUB
        ════════════════════════════════ */}
        <motion.div variants={itemVars} className="mb-14">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <span className="text-3xl">🇪🇺</span>
              <div>
                <h2 className="text-lg font-black text-gray-900">Schengen Visa Hub — 2026</h2>
                <p className="text-sm text-gray-500">One visa, 27 countries. Complete guide for Bangladeshi travelers.</p>
              </div>
              <Link href="/schengen-visa"
                className="ml-auto text-xs font-black text-blue-600 bg-blue-50 border border-blue-100
                  px-4 py-2 rounded-full hover:bg-blue-100 transition hidden md:flex items-center gap-1">
                Full Schengen Guide →
              </Link>
            </div>
            <div className="flex flex-wrap gap-2">
              {SCHENGEN_COUNTRIES.map(country => (
                <Link key={country}
                  href={buildVisaUrl(country, 'Bangladesh')}
                  title={`${country} Schengen visa for Bangladeshi citizens 2026`}
                  className="text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200
                    px-3 py-1.5 rounded-lg hover:border-blue-300 hover:text-blue-700
                    hover:bg-blue-50 transition-all">
                  {country} Visa →
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════
            SEO DESTINATION LINKS
        ════════════════════════════════ */}
        <motion.div variants={itemVars} className="mb-14">
          <SectionHeader
            title="Popular Visa Guides for Bangladeshi Citizens"
            subtitle="Most requested visa guides — verified by embassy for 2026"
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {SEO_DESTINATION_LINKS.map(link => (
              <Link
                key={link.dest}
                href={buildVisaUrl(link.dest, link.origin)}
                title={`${link.dest} visa requirements for Bangladeshi citizens 2026`}
                className="text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-100
                  px-4 py-3 rounded-xl hover:bg-blue-100 hover:border-blue-300
                  transition-all text-center leading-snug"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ════════════════════════════════
            VISA NEWS
        ════════════════════════════════ */}
        <motion.div variants={itemVars} className="mb-14">
          <SectionHeader
            title="📰 Latest Visa News & Policy Updates"
            subtitle="Stay ahead of embassy rule changes before you apply"
          />
          <div className="flex flex-wrap gap-2">
            {VISA_NEWS_LINKS.map(n => (
              <Link key={n.href} href={n.href}
                className="text-sm font-semibold text-gray-700 bg-white border border-gray-200
                  px-4 py-2 rounded-xl hover:border-blue-300 hover:text-blue-700 transition-all shadow-sm">
                {n.label}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ════════════════════════════════
            WHY CHOOSE US
        ════════════════════════════════ */}
        <motion.div variants={itemVars}
          className="grid md:grid-cols-3 gap-6 border-t border-gray-100 pt-12 mb-14">
          {[
            {
              icon: '📡',
              title: 'Live 2026 Embassy Data',
              desc: 'Embassy requirements refreshed monthly. We track policy changes across 195+ countries in real time so your checklist is never outdated.',
            },
            {
              icon: '🛡️',
              title: 'Consultant-Verified Checklists',
              desc: 'Every document checklist is reviewed by our certified visa consultants before publishing — no guesswork, no rejected applications.',
            },
            {
              icon: '📈',
              title: '98% Approval Rate Since 2019',
              desc: 'Our proven process has helped 42,000+ Bangladeshi travelers get approved. Use our free rejection analysis to fix any weak spots.',
            },
          ].map((f, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-3xl shrink-0">{f.icon}</span>
              <div>
                <h3 className="font-black text-gray-900 mb-1.5 text-base">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ════════════════════════════════
            SEO LONG-FORM TEXT BLOCK
        ════════════════════════════════ */}
        <motion.div variants={itemVars}
          className="bg-white rounded-3xl border border-gray-100 p-7 md:p-10 shadow-sm">

          <h2 className="text-2xl font-black text-gray-900 mb-6">
            Complete Visa Guide for Bangladeshi Travelers — 2026
          </h2>

          <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-500 leading-relaxed">
            <div className="space-y-4">
              <p>
                Planning to travel abroad in 2026? Eammu Holidays' Visa Intelligence Portal gives Bangladeshi
                travelers instant access to embassy-verified requirements for every destination worldwide —
                including documents checklist, photo specifications, bank statement requirements, processing
                times, and exact embassy fees.
              </p>
              <p>
                Whether you are applying for a{' '}
                <Link href="/visa/bangladesh-to-canada" className="text-blue-600 font-semibold hover:underline">
                  Canada tourist visa
                </Link>,
                a{' '}
                <Link href="/visa/bangladesh-to-united-kingdom" className="text-blue-600 font-semibold hover:underline">
                  UK Standard Visitor Visa
                </Link>, or a{' '}
                <Link href="/schengen-visa" className="text-blue-600 font-semibold hover:underline">
                  Schengen multi-entry visa
                </Link>,
                our guides cover everything you need to submit a complete, compelling application.
              </p>
              <p>
                Explore our{' '}
                <Link href="/visa/tourist-visa"  className="text-blue-600 font-semibold hover:underline">tourist visa guides</Link>,{' '}
                <Link href="/visa/student-visa"  className="text-blue-600 font-semibold hover:underline">student visa guides</Link>,{' '}
                <Link href="/visa/work-visa"     className="text-blue-600 font-semibold hover:underline">work visa guides</Link>, and{' '}
                <Link href="/scholarships"       className="text-blue-600 font-semibold hover:underline">scholarship opportunities</Link>{' '}
                for Bangladeshi students planning to study abroad in 2026.
              </p>
              <p>
                Our free{' '}
                <Link href="/visa-resources/visa-checklist-generator" className="text-blue-600 font-semibold hover:underline">
                  visa checklist generator
                </Link>{' '}
                and{' '}
                <Link href="/visa-resources/visa-document-generator" className="text-blue-600 font-semibold hover:underline">
                  document generator
                </Link>{' '}
                help you prepare a complete file before your embassy appointment — reducing rejection risk significantly.
              </p>
            </div>

            <div className="space-y-4">
              <p>
                Our team monitors embassy circulars, VFS Global announcements, and consulate policy updates to
                ensure every guide reflects current 2026 protocols. From{' '}
                <strong className="text-gray-700">financial documentation</strong> to{' '}
                <strong className="text-gray-700">travel insurance</strong> and{' '}
                <strong className="text-gray-700">cover letter guidance</strong>, we tell you exactly what to
                prepare so your application is complete, accurate, and compelling.
              </p>
              <p>
                Most searched routes for Bangladeshi passport holders in 2026:{' '}
                <Link href="/visa/bangladesh-to-canada"               className="text-blue-600 font-semibold hover:underline">Canada visa</Link>,{' '}
                <Link href="/visa/bangladesh-to-united-states"        className="text-blue-600 font-semibold hover:underline">USA visa</Link>,{' '}
                <Link href="/visa/bangladesh-to-australia"            className="text-blue-600 font-semibold hover:underline">Australia visa</Link>,{' '}
                <Link href="/visa/bangladesh-to-germany"              className="text-blue-600 font-semibold hover:underline">Germany Schengen visa</Link>,{' '}
                <Link href="/visa/bangladesh-to-italy"                className="text-blue-600 font-semibold hover:underline">Italy visa</Link>,{' '}
                <Link href="/visa/bangladesh-to-malaysia"             className="text-blue-600 font-semibold hover:underline">Malaysia e-visa</Link>,{' '}
                <Link href="/visa/bangladesh-to-united-arab-emirates" className="text-blue-600 font-semibold hover:underline">Dubai visa</Link>.
              </p>
              <p>
                Worried about a{' '}
                <Link href="/visa-rejection" className="text-blue-600 font-semibold hover:underline">
                  visa rejection
                </Link>?
                Our rejection rate analyser explains exactly why visas are refused for each country, so you can
                fix weaknesses before applying. Also check our{' '}
                <Link href="/visa-processing-time-tracker" className="text-blue-600 font-semibold hover:underline">
                  processing time tracker
                </Link>{' '}
                to plan your travel dates based on current embassy backlogs.
              </p>
              <p>
                Residents of the UAE can use our dedicated{' '}
                <Link href="/visa/dubai-residents" className="text-blue-600 font-semibold hover:underline">
                  Dubai residents visa hub
                </Link>{' '}
                for country-specific guides tailored to UAE residency holders — including Armenia, Georgia,
                Thailand, Indonesia, and more.
              </p>
            </div>
          </div>

          {/* FAQ-style rich keyword anchors */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="text-base font-black text-gray-800 mb-4">
              Frequently Searched Visa Questions — 2026
            </h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
              {[
                { q: 'Canada visa requirements Bangladesh 2026',    href: '/visa/bangladesh-to-canada' },
                { q: 'UK visa documents checklist 2026',            href: '/visa/bangladesh-to-united-kingdom' },
                { q: 'USA B1/B2 tourist visa for Bangladeshi',      href: '/visa/bangladesh-to-united-states' },
                { q: 'Schengen visa bank statement requirement',     href: '/schengen-visa' },
                { q: 'Australia tourist visa processing time',       href: '/visa-processing-time-tracker/australia-national-visa-processing-time-for-bangladesh' },
                { q: 'Why was my visa rejected?',                   href: '/visa-rejection' },
                { q: 'Malaysia e-visa Bangladeshi citizens',        href: '/visa/bangladesh-to-malaysia' },
                { q: 'Dubai visa for Bangladeshi passport',         href: '/visa/bangladesh-to-united-arab-emirates' },
                { q: 'Japan tourist visa requirements 2026',        href: '/visa/bangladesh-to-japan' },
              ].map(faq => (
                <Link key={faq.href} href={faq.href}
                  className="text-xs text-blue-700 font-semibold bg-blue-50 border border-blue-100
                    px-3 py-2.5 rounded-lg hover:bg-blue-100 hover:border-blue-300 transition-all">
                  {faq.q} →
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}