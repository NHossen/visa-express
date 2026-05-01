// app/visa/visa-guide/page.jsx  (VisaGuide landing / index page)
// ─────────────────────────────────────────────────────────────────────────────
// URL builder convention (used everywhere in this file):
//   buildVisaUrl(destName, originName) → `/visa/${destSlug}-to-${originSlug}`
//   e.g. dest=Canada, origin=Bangladesh → /visa/canada-to-bangladesh
// ─────────────────────────────────────────────────────────────────────────────

"use client";
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { createSlug } from '@/app/lib/utils';

// ── SEO METADATA (exported from a separate metadata file or layout) ──────────
// For the landing page, add this to a co-located metadata.js or layout:
//
// export const metadata = {
//   title: 'Visa Requirements for Bangladeshi Citizens 2026 — All Countries | Eammu Holidays',
//   description: 'Instant embassy-verified visa requirements for 195+ countries. Documents checklist, processing time, fees and expert tips for Bangladeshi passport holders — updated 2026.',
//   keywords: 'visa requirements Bangladesh 2026, Bangladesh visa guide, tourist visa Bangladesh citizens, visa checklist Bangladesh, Eammu Holidays visa',
//   alternates: { canonical: '/visa/visa-guide' },
//   openGraph: { title: 'Visa Guide for Bangladeshi Travelers 2026 | Eammu Holidays', type: 'website' },
// };

const POPULAR_ROUTES = [
  { origin: 'Bangladesh', dest: 'Canada' },
  { origin: 'Bangladesh', dest: 'United States' },
  { origin: 'Bangladesh', dest: 'United Kingdom' },
  { origin: 'Bangladesh', dest: 'Australia' },
  { origin: 'Bangladesh', dest: 'Germany' },
  { origin: 'Bangladesh', dest: 'Italy' },
  { origin: 'Bangladesh', dest: 'Malaysia' },
  { origin: 'Bangladesh', dest: 'Thailand' },
];

const STATS = [
  { value: '195+', label: 'Countries',       icon: '🌏' },
  { value: '98%',  label: 'Success Rate',    icon: '✅' },
  { value: '42K+', label: 'Travelers Helped', icon: '✈️' },
  { value: '24/7', label: 'Expert Support',  icon: '🛡️' },
];

const VISA_TYPES = [
  { icon: '🏖️', label: 'Tourist',  href: '/visa/tourist-visa',                desc: 'Leisure & sightseeing visits' },
  { icon: '💼', label: 'Business', href: '/visa/business-visa',               desc: 'Meetings, conferences, trade' },
  { icon: '🎓', label: 'Student',  href: '/visa/student-visa',   desc: 'Academic enrollment abroad' },
  { icon: '👨‍👩‍👧', label: 'Family',   href: '/visa/family-visa',                 desc: 'Reunification & sponsorship' },
  { icon: '💊', label: 'Medical',  href: '/visa/medical-visa',                desc: 'Treatment & health tourism' },
  { icon: '🧳', label: 'Transit',  href: '/visa/transit-visa',                desc: 'Layover & onward travel' },
];

// Top destination country pages — for SEO internal link hub
const SEO_DESTINATION_LINKS = [
  { dest: 'Canada',         origin: 'Bangladesh', label: 'Canada Visa for Bangladeshi' },
  { dest: 'United States',  origin: 'Bangladesh', label: 'USA Visa for Bangladeshi' },
  { dest: 'United Kingdom', origin: 'Bangladesh', label: 'UK Visa for Bangladeshi' },
  { dest: 'Australia',      origin: 'Bangladesh', label: 'Australia Visa for Bangladeshi' },
  { dest: 'Germany',        origin: 'Bangladesh', label: 'Germany Visa for Bangladeshi' },
  { dest: 'Italy',          origin: 'Bangladesh', label: 'Italy Visa for Bangladeshi' },
  { dest: 'France',         origin: 'Bangladesh', label: 'France Visa for Bangladeshi' },
  { dest: 'Malaysia',       origin: 'Bangladesh', label: 'Malaysia Visa for Bangladeshi' },
  { dest: 'Thailand',       origin: 'Bangladesh', label: 'Thailand Visa for Bangladeshi' },
  { dest: 'Japan',          origin: 'Bangladesh', label: 'Japan Visa for Bangladeshi' },
  { dest: 'Singapore',      origin: 'Bangladesh', label: 'Singapore Visa for Bangladeshi' },
  { dest: 'United Arab Emirates',          origin: 'Bangladesh', label: 'Dubai Visa for Bangladeshi' },
];

// ─────────────────────────────────────────────────────────────────────────────
// URL builder — destination-to-origin
// ─────────────────────────────────────────────────────────────────────────────
const buildVisaUrl = (destName, originName) =>
  `/visa/${createSlug(originName)}-to-${createSlug(destName)}`;

export default function VisaGuide() {
  const [origin,      setOrigin]      = useState('bangladesh');
  const [destination, setDestination] = useState('canada');
  const [visaData,    setVisaData]    = useState([]);
  const [loading,     setLoading]     = useState(true);

  useEffect(() => {
    fetch('/api/countries')
      .then(r => r.json())
      .then(data => { setVisaData(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const originData = useMemo(
    () => visaData.find(c => c.country.toLowerCase() === origin),
    [origin, visaData]
  );
  const destData = useMemo(
    () => visaData.find(c => c.country.toLowerCase() === destination),
    [destination, visaData]
  );

  const containerVars = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.08 } },
  };
  const itemVars = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans antialiased text-slate-900 overflow-x-hidden">

      {/* ── BACKGROUND ── */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/60 to-transparent" />
        <div className="absolute top-[-5%] right-[-8%] w-[500px] h-[500px] bg-blue-200/15 rounded-full blur-[140px]" />
        <div className="absolute top-[20%] left-[-5%] w-[300px] h-[300px] bg-indigo-100/20 rounded-full blur-[100px]" />
      </div>

      <motion.div variants={containerVars} initial="initial" animate="animate"
        className="max-w-6xl mx-auto px-5 py-14 md:py-20">

        {/* ── HERO ── */}
        <motion.div variants={itemVars} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-blue-50 border border-blue-100 rounded-full">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black tracking-[0.2em] text-blue-700 uppercase">
              Eammu Holidays · Official Visa Intelligence Portal 2026
            </span>
          </div>
          {/* H1 — primary keyword */}
          <h1 className="text-5xl md:text-7xl font-black mb-5 tracking-tight text-slate-900 leading-[1.05]">
            Visa Requirements,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              Instantly Verified.
            </span>
          </h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto leading-relaxed mb-3">
            Embassy-accurate visa requirements, documents checklist, processing times and fees — 195+ countries,
            every nationality. Updated monthly for 2026 protocols.
          </p>
          <p className="text-slate-400 text-sm font-medium">
            Trusted by <strong className="text-slate-600">42,000+ travelers</strong> · 98% visa approval rate
          </p>
        </motion.div>

        {/* ── STATS ── */}
        <motion.div variants={itemVars} className="grid grid-cols-4 gap-3 mb-10 max-w-2xl mx-auto">
          {STATS.map(s => (
            <div key={s.label} className="text-center bg-white/80 backdrop-blur border border-slate-100 rounded-2xl p-4 shadow-sm">
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="text-lg font-black text-slate-900">{s.value}</div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── SEARCH PANEL ── */}
        <motion.div variants={itemVars} className="relative z-20 mb-16">
          <div className="bg-white/80 backdrop-blur-2xl p-4 md:p-6 rounded-[2.5rem] shadow-[0_32px_100px_-20px_rgba(59,130,246,0.12)] border border-white/80">
            <p className="text-center text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
              Select your nationality & destination to get your personalised visa guide
            </p>

            {loading ? (
              <div className="text-center py-8 text-slate-400 font-bold animate-pulse">Loading countries…</div>
            ) : (
              <>
                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">

                  {/* Origin / Nationality */}
                  <div className="flex-1 bg-slate-50 p-5 rounded-[1.8rem] border-2 border-slate-100 hover:border-blue-300 focus-within:border-blue-400 transition-all">
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                      🌍 Your Nationality / Passport
                    </label>
                    <div className="flex items-center gap-3">
                      {originData?.flag && (
                        <img src={originData.flag} className="w-8 h-5 object-cover rounded shadow-sm shrink-0" alt={`${origin} flag`} />
                      )}
                      <select
                        value={origin}
                        onChange={e => setOrigin(e.target.value)}
                        className="bg-transparent text-lg font-bold outline-none cursor-pointer capitalize w-full appearance-none text-slate-800"
                      >
                        {visaData
                          .filter(c => c.country.toLowerCase() !== destination)
                          .map(c => (
                            <option key={c.code} value={c.country.toLowerCase()}>{c.country}</option>
                          ))}
                      </select>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-lg shadow-blue-200 text-white shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </div>

                  {/* Destination */}
                  <div className="flex-1 bg-slate-50 p-5 rounded-[1.8rem] border-2 border-slate-100 hover:border-blue-300 focus-within:border-blue-400 transition-all">
                    <label className="block text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">
                      📍 Destination Country
                    </label>
                    <div className="flex items-center gap-3">
                      {destData?.flag && (
                        <img src={destData.flag} className="w-8 h-5 object-cover rounded shadow-sm shrink-0" alt={`${destination} flag`} />
                      )}
                      <select
                        value={destination}
                        onChange={e => setDestination(e.target.value)}
                        className="bg-transparent text-lg font-bold outline-none cursor-pointer capitalize w-full appearance-none text-slate-800"
                      >
                        {visaData
                          .filter(c => c.country.toLowerCase() !== origin)
                          .map(c => (
                            <option key={c.code} value={c.country.toLowerCase()}>{c.country}</option>
                          ))}
                      </select>
                    </div>
                  </div>

                  {/* CTA — builds /visa/destination-to-origin */}
                  <Link
                    href={buildVisaUrl(destination, origin)}
                    className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-10 py-6 rounded-[1.8rem] font-black transition-all shadow-xl shadow-blue-200 active:scale-95 text-center flex items-center justify-center gap-2 group whitespace-nowrap"
                  >
                    <span>Check Requirements</span>
                    <svg className="group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14m-7-7 7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {originData && destData && (
                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500 font-semibold">
                    <span>Showing guide for:</span>
                    <img src={originData.flag} className="w-5 h-3 object-cover rounded-sm" alt="" />
                    <span className="capitalize font-black text-slate-700">{origin}</span>
                    <span className="text-slate-300">→</span>
                    <img src={destData.flag} className="w-5 h-3 object-cover rounded-sm" alt="" />
                    <span className="capitalize font-black text-slate-700">{destination}</span>
                    <span className="ml-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-black text-[9px] uppercase tracking-wider">Ready</span>
                  </div>
                )}
              </>
            )}
          </div>
        </motion.div>

        {/* ── VISA TYPES ── */}
        <motion.div variants={itemVars} className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-lg font-black tracking-tight text-slate-800 shrink-0">Browse by Visa Type</h2>
            <div className="h-px flex-1 bg-slate-200/80" />
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {VISA_TYPES.map(v => (
              <Link key={v.label} href={v.href}
                className="group flex flex-col items-center gap-2 p-4 bg-white border-2 border-slate-100 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all"
                title={`${v.label} visa — ${v.desc}`}
              >
                <span className="text-2xl">{v.icon}</span>
                <span className="text-xs font-black text-slate-700 group-hover:text-blue-600 transition-colors">{v.label}</span>
                <span className="text-[9px] text-slate-400 text-center leading-tight hidden md:block">{v.desc}</span>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ── POPULAR ROUTES ── */}
        <motion.div variants={itemVars} className="mb-16">
          <div className="flex items-center gap-4 mb-2">
            <h2 className="text-2xl font-black tracking-tight text-slate-900">🔥 Most Searched Visa Routes 2026</h2>
            <div className="h-px flex-1 bg-slate-200/60 hidden md:block" />
          </div>
          <p className="text-sm text-slate-500 mb-6">Based on real monthly search volume — updated weekly for 2026</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {POPULAR_ROUTES.map((r, i) => {
              const destEntry   = visaData.find(c => c.country === r.dest);
              const origEntry   = visaData.find(c => c.country === r.origin);
              return (
                <Link
                  key={i}
                  href={buildVisaUrl(r.dest, r.origin)}
                  title={`${r.dest} visa requirements for ${r.origin} citizens 2026`}
                  className="group flex items-center gap-4 p-4 bg-white border-2 border-slate-100 rounded-2xl hover:border-blue-300 hover:shadow-lg transition-all"
                >
                  <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-sm font-black text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    {origEntry?.flag && <img src={origEntry.flag} className="w-7 h-5 object-cover rounded shadow-sm" alt={r.origin} />}
                    <span className="text-xs text-slate-400 font-bold">→</span>
                    {destEntry?.flag && <img src={destEntry.flag} className="w-7 h-5 object-cover rounded shadow-sm" alt={r.dest} />}
                    <div className="ml-1">
                      <div className="text-sm font-black text-slate-800">{r.origin} → {r.dest}</div>
                      <div className="text-[10px] text-slate-400 font-semibold">Tourist · Sticker Visa · 15–21 days processing</div>
                    </div>
                  </div>
                  <svg className="text-slate-300 group-hover:text-blue-500 shrink-0 transition-colors" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* ── ALL DESTINATIONS ── */}
        <motion.div variants={itemVars} className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-black tracking-tight shrink-0">
              All Visa Destinations for {origin.charAt(0).toUpperCase() + origin.slice(1)} Citizens 2026
            </h2>
            <div className="h-px w-full bg-slate-200/60" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {visaData
              .filter(item => item.country.toLowerCase() !== origin)
              .slice(0, 20)
              .map((item, idx) => (
                <motion.div
                  key={item.code}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.03 }}
                  whileHover={{ y: -6 }}
                >
                  <Link
                    href={buildVisaUrl(item.country, origin)}
                    title={`${item.country} visa requirements for ${origin} citizens`}
                    className="group relative flex flex-col items-center p-6 bg-white rounded-[2rem] border-2 border-slate-100 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-50/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 w-14 h-9 mb-4 overflow-hidden rounded-lg shadow-md">
                      <img
                        src={item.flag}
                        alt={`${item.country} visa for ${origin} citizens`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <span className="relative z-10 text-sm font-black text-slate-800 tracking-tight text-center capitalize group-hover:text-blue-700 transition-colors leading-tight">
                      {item.country}
                    </span>
                    <span className="relative z-10 text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest group-hover:text-blue-400 transition-colors">
                      Visa Guide →
                    </span>
                  </Link>
                </motion.div>
              ))}
          </div>

          {/* Internal links hub */}
          <div className="mt-8 flex flex-wrap gap-2">
            {['visa/tourist-visa', 'visa/student-visa', 'visa/work-visa'].map(path => (
              <Link key={path} href={`/${path}`}
                className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full hover:bg-blue-100 transition capitalize">
                {path.split('/').pop().replace(/-/g, ' ')} →
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ── SEO INTERNAL LINKS HUB — Top destination pages ── */}
        <motion.div variants={itemVars} className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xl font-black tracking-tight text-slate-800 shrink-0">
              Popular Visa Guides for Bangladeshi Citizens
            </h2>
            <div className="h-px flex-1 bg-slate-200/80" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {SEO_DESTINATION_LINKS.map(link => (
              <Link
                key={link.dest}
                href={buildVisaUrl(link.dest, link.origin)}
                title={`${link.dest} visa requirements for Bangladeshi citizens 2026`}
                className="text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-4 py-3 rounded-xl hover:bg-blue-100 hover:border-blue-300 transition text-center leading-snug"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </motion.div>

        {/* ── WHY US ── */}
        <motion.div variants={itemVars} className="grid md:grid-cols-3 gap-8 border-t border-slate-100 pt-16 mb-16">
          {[
            {
              icon: '📡',
              title: 'Live 2026 Data',
              desc: 'Embassy requirements refreshed monthly. We track policy changes across 195+ countries in real time.',
            },
            {
              icon: '🛡️',
              title: 'Expert Verification',
              desc: 'Every document checklist is reviewed by our certified visa consultants before publishing.',
            },
            {
              icon: '📈',
              title: '98% Approval Rate',
              desc: 'Our proven process has helped 42,000+ Bangladeshi travelers get approved successfully.',
            },
          ].map((f, i) => (
            <div key={i} className="flex gap-4">
              <span className="text-4xl shrink-0">{f.icon}</span>
              <div>
                <h3 className="font-black text-slate-900 mb-2 text-lg">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── SEO ARTICLE TEXT ── */}
        <motion.div variants={itemVars} className="bg-white rounded-[2rem] border border-slate-100 p-8 md:p-12">
          <h2 className="text-2xl font-black text-slate-900 mb-4">
            Complete Visa Guide for Bangladeshi Travelers — 2026
          </h2>
          <div className="grid md:grid-cols-2 gap-8 text-sm text-slate-500 leading-relaxed">
            <div className="space-y-4">
              <p>
                Navigating international visa requirements can be overwhelming. Eammu Holidays&apos; Visa Intelligence
                Portal gives Bangladeshi travelers instant access to accurate, embassy-verified requirements for
                every destination worldwide — documents checklist, photo specifications, bank statement requirements,
                processing times, and embassy fees.
              </p>
              <p>
                Whether you are applying for a{' '}
                <Link href="/visa/canada-to-bangladesh" className="text-blue-600 font-bold hover:underline">Canada tourist visa</Link>,
                a{' '}
                <Link href="/visa/united-kingdom-to-bangladesh" className="text-blue-600 font-bold hover:underline">UK Standard Visitor Visa</Link>,
                or a{' '}
                <Link href="/visa/germany-to-bangladesh" className="text-blue-600 font-bold hover:underline">Schengen multi-entry visa</Link>,
                our guides cover everything you need to prepare a complete, compelling application.
              </p>
              <p>
                Explore our{' '}
                <Link href="/visa/tourist-visa"                 className="text-blue-600 font-bold hover:underline">tourist visa guides</Link>,{' '}
                <Link href="/visa/student-visa"   className="text-blue-600 font-bold hover:underline">student visa guides</Link>, and{' '}
                <Link href="/scholarship"                 className="text-blue-600 font-bold hover:underline">scholarship opportunities</Link>{' '}
                for Bangladeshi students.
              </p>
            </div>
            <div className="space-y-4">
              <p>
                Our team monitors embassy circulars, VFS Global announcements, and consulate policy updates to
                ensure every guide reflects current 2026 protocols. From{' '}
                <strong className="text-slate-700">financial documentation</strong> to{' '}
                <strong className="text-slate-700">travel insurance</strong> and{' '}
                <strong className="text-slate-700">cover letter guidance</strong>, we tell you exactly what to
                prepare so your application is complete, accurate, and compelling.
              </p>
              <p>
                Most searched routes for Bangladeshi passport holders in 2026:{' '}
                <Link href="/visa/canada-to-bangladesh"        className="text-blue-600 font-bold hover:underline">Canada visa</Link>,{' '}
                <Link href="/visa/united-states-to-bangladesh" className="text-blue-600 font-bold hover:underline">USA visa</Link>,{' '}
                <Link href="/visa/australia-to-bangladesh"     className="text-blue-600 font-bold hover:underline">Australia visa</Link>,{' '}
                <Link href="/visa/germany-to-bangladesh"       className="text-blue-600 font-bold hover:underline">Germany visa</Link>,{' '}
                <Link href="/visa/italy-to-bangladesh"         className="text-blue-600 font-bold hover:underline">Italy visa</Link>,{' '}
                <Link href="/visa/malaysia-to-bangladesh"      className="text-blue-600 font-bold hover:underline">Malaysia visa</Link>.
              </p>
            </div>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}