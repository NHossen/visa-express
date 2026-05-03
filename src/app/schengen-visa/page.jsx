// app/schengen-visa/page.jsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

/* ─── SEO METADATA ─────────────────────────────────────────────── */
// NOTE: Move this to a separate metadata.js file since this is a Client Component
// export const metadata = { ... }

/* ─── JSON-LD ───────────────────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Schengen Visa Application Service — UAE',
      description: 'Professional Schengen visa application assistance for UAE residents.',
      provider: {
        '@type': 'Organization',
        name: 'Visa Express Hub',
        url: 'https://www.visaexpresshub.ae',
        telephone: '+971-4-000-0000',
        address: { '@type': 'PostalAddress', addressLocality: 'Dubai', addressCountry: 'AE' },
      },
      areaServed: 'AE',
      serviceType: 'Visa Consulting',
      offers: { '@type': 'Offer', price: '90', priceCurrency: 'EUR', description: 'Schengen visa government fee — adults' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'How much does a Schengen visa cost from UAE in 2026?', acceptedAnswer: { '@type': 'Answer', text: 'The official Schengen visa fee is €90 for adults and €45 for children aged 6–12. Children under 6 are exempt.' } },
        { '@type': 'Question', name: 'How long does Schengen visa processing take from UAE?', acceptedAnswer: { '@type': 'Answer', text: 'Standard processing is 15 calendar days. It can extend to 45 days in complex cases.' } },
        { '@type': 'Question', name: 'How many countries does a Schengen visa cover?', acceptedAnswer: { '@type': 'Answer', text: 'A Schengen visa covers 29 countries — all EU Schengen states plus Norway, Iceland, Liechtenstein, and Switzerland.' } },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.visaexpresshub.ae' },
        { '@type': 'ListItem', position: 2, name: 'Visa Services', item: 'https://www.visaexpresshub.ae/visa-services' },
        { '@type': 'ListItem', position: 3, name: 'Schengen Visa', item: 'https://www.visaexpresshub.ae/schengen-visa' },
      ],
    },
  ],
};

/* ─── STATIC DATA ──────────────────────────────────────────────── */
const VISA_TYPES = [
  { label: 'Business Visa', href: '/visa/business-visa' },
  { label: 'Work Visa', href: '/visa/work-visa' },
  { label: 'Student Visa', href: '/visa/student-visa' },
  { label: 'Tourist Visa', href: '/visa/tourist-visa' },
  { label: 'Transit Visa', href: '/visa/transit-visa' },
  { label: 'Schengen Visa', href: '/schengen-visa', active: true },
];

// All 29 Schengen member countries — slug used for internal links
const SCHENGEN_COUNTRY_NAMES = [
  { name: 'Austria', slug: 'austria' },
  { name: 'Belgium', slug: 'belgium' },
  { name: 'Bulgaria', slug: 'bulgaria' },
  { name: 'Croatia', slug: 'croatia' },
  { name: 'Czech Republic', slug: 'czech-republic' },
  { name: 'Denmark', slug: 'denmark' },
  { name: 'Estonia', slug: 'estonia' },
  { name: 'Finland', slug: 'finland' },
  { name: 'France', slug: 'france' },
  { name: 'Germany', slug: 'germany' },
  { name: 'Greece', slug: 'greece' },
  { name: 'Hungary', slug: 'hungary' },
  { name: 'Iceland', slug: 'iceland' },
  { name: 'Italy', slug: 'italy' },
  { name: 'Latvia', slug: 'latvia' },
  { name: 'Liechtenstein', slug: 'liechtenstein' },
  { name: 'Lithuania', slug: 'lithuania' },
  { name: 'Luxembourg', slug: 'luxembourg' },
  { name: 'Malta', slug: 'malta' },
  { name: 'Netherlands', slug: 'netherlands' },
  { name: 'Norway', slug: 'norway' },
  { name: 'Poland', slug: 'poland' },
  { name: 'Portugal', slug: 'portugal' },
  { name: 'Romania', slug: 'romania' },
  { name: 'Slovakia', slug: 'slovakia' },
  { name: 'Slovenia', slug: 'slovenia' },
  { name: 'Spain', slug: 'spain' },
  { name: 'Sweden', slug: 'sweden' },
  { name: 'Switzerland', slug: 'switzerland' },
];

const VISA_CATEGORIES = [
  {
    icon: '✈️',
    title: 'Single-Entry Visa (Type C)',
    desc: 'Enter the Schengen Area once. Perfect for a one-time holiday or business trip. Once you leave, the visa becomes void even if unused days remain.',
    badge: 'Tourist / Short Stay',
    color: 'bg-amber-100 text-amber-800',
  },
  {
    icon: '🔄',
    title: 'Multiple-Entry Visa',
    desc: 'Make multiple visits within the visa validity period — typically 1 to 5 years. Ideal for business travellers and frequent Europe visitors from UAE.',
    badge: 'Business / Frequent Travel',
    color: 'bg-slate-100 text-slate-700',
  },
  {
    icon: '🛫',
    title: 'Airport Transit Visa (ATV)',
    desc: 'Required for certain nationalities to transit through the international zone of a Schengen airport without formally entering the country.',
    badge: 'Transit Only',
    color: 'bg-slate-100 text-slate-600',
  },
];

const DOCUMENTS = [
  { icon: '🛂', title: 'Valid Passport', detail: 'Must be valid for at least 3 months beyond your planned departure from the Schengen Area. At least 2 blank pages required.', mandatory: true },
  { icon: '📋', title: 'Completed Visa Application Form', detail: 'Signed and dated. Our team prepares this for you — reducing errors that lead to rejections.', mandatory: true },
  { icon: '📸', title: 'Passport-Size Photograph', detail: 'ICAO standard, white background, taken within the last 6 months. Typically 35×45mm format.', mandatory: true },
  { icon: '🛡️', title: 'Travel Medical Insurance', detail: 'Minimum €30,000 coverage for emergency treatment, hospitalisation, and repatriation. Must be valid across all Schengen states.', mandatory: true },
  { icon: '✈️', title: 'Confirmed Flight Itinerary', detail: 'Return flight booking to show your travel dates. A confirmed reservation — not necessarily a paid ticket — is acceptable at most consulates.', mandatory: true },
  { icon: '🏨', title: 'Hotel / Accommodation Proof', detail: 'Hotel bookings, invitation letter from a host, or Airbnb confirmation for the full duration of your stay.', mandatory: true },
  { icon: '🏦', title: 'Bank Statements (3–6 months)', detail: 'Showing sufficient funds — minimum €100/day of your stay is recommended as a general guideline.', mandatory: true },
  { icon: '💼', title: 'Employment Letter & Salary Slip', detail: 'Confirming your employment status, salary, and approved leave period from your employer in the UAE.', mandatory: true },
  { icon: '💳', title: 'Visa Fee Payment', detail: '€90 for adults · €45 for children aged 6–12 · Free for children under 6. Paid at the visa application centre.', mandatory: true },
  { icon: '🖐️', title: 'Biometrics (Fingerprints)', detail: 'Collected at the consulate or VFS Global application centre at the time of submission. Required for all adults.', mandatory: true },
  { icon: '🏢', title: 'Trade Licence / Business Documents', detail: 'For self-employed applicants and business owners — proof of company registration and recent financial statements.', mandatory: false },
  { icon: '🎓', title: 'Students: Enrollment Letter', detail: 'A letter from your UAE educational institution confirming enrollment and approved leave during the travel period.', mandatory: false },
];

const STEPS = [
  { num: '01', title: 'Free Consultation', desc: 'Speak to our Schengen visa expert. We assess your travel plan, passport nationality, and purpose — and recommend the right visa type and consulate to apply to.' },
  { num: '02', title: 'Document Preparation', desc: 'We prepare your application form, cover letter, and Statement of Purpose. We review your entire document package to catch errors before submission.' },
  { num: '03', title: 'Appointment Booking', desc: 'We book your consulate or VFS Global appointment on your behalf. Slots fill fast — especially in peak summer season. We handle this as early as 6 months before travel.' },
  { num: '04', title: 'Application Submission', desc: 'Submit your documents with biometrics at the visa application centre or consulate. Our team gives you a final checklist walk-through before your appointment.' },
  { num: '05', title: 'Real-Time Tracking', desc: 'We monitor your application status and respond promptly to any additional document requests from the consulate. You receive updates at every stage.' },
  { num: '06', title: 'Visa Collection & Briefing', desc: "Collect your approved visa. We debrief you on your entry conditions, the 90/180-day rule, and which countries you can visit — so you're travel-ready." },
];

const FEE_TABLE = [
  { category: 'Adults (aged 12 and above)', fee: '€90', note: 'Standard rate — all nationalities' },
  { category: 'Children aged 6–12 years', fee: '€45', note: '50% reduction' },
  { category: 'Children under 6 years', fee: 'Free', note: 'Fully exempt' },
  { category: 'Armenia, Azerbaijan, Belarus', fee: '€35', note: 'Bilateral agreement rate' },
  { category: 'Cabo Verde nationals', fee: '€67.50', note: 'Bilateral agreement rate' },
  { category: 'VFS service centre fee', fee: 'Varies', note: 'Added where applicable' },
];

const FAQS = [
  { q: 'How many days can I stay in Europe on a Schengen visa?', a: 'A Schengen visa allows stays of up to 90 days in any 180-day rolling period across all Schengen countries combined. Days are counted across the entire area — not per country. Use the official EU short-stay calculator to track your remaining permitted days before each trip.' },
  { q: 'Can I extend my Schengen visa while inside Europe?', a: 'Extensions are only granted in exceptional, documented circumstances — such as force majeure or serious humanitarian reasons. You cannot extend simply because you want to stay longer. Plan your trip strictly within the 90-day limit to avoid overstay penalties, which can include a ban from the Schengen Area.' },
  { q: 'Which consulate should I apply to if I visit multiple Schengen countries?', a: 'Apply at the consulate of the country where you will spend the most nights. If your stay is equally divided between two or more countries, apply at the consulate of the first country you will enter. Our team will advise you on the correct consulate based on your specific itinerary.' },
  { q: 'How far in advance should I apply for a Schengen visa from UAE?', a: 'You can apply between 6 months and 15 days before your intended travel date. We strongly recommend applying 4–6 weeks in advance. During peak summer and Christmas periods, consulate appointment slots fill up weeks ahead — apply early.' },
  { q: 'What if my Schengen visa application is refused?', a: 'You will receive a written refusal letter stating the reason. You have the legal right to appeal — and our team can help you prepare a strong appeal or reapplication with stronger supporting evidence. Common reasons for refusal include insufficient funds, weak travel history, or incomplete documentation.' },
  { q: 'Do UAE residents who are not UAE nationals need a Schengen visa?', a: 'It depends on your passport nationality. UAE passport holders can visit most Schengen countries visa-free for up to 90 days. Residents of the UAE holding other passports typically need a Schengen visa. Contact us with your passport nationality for specific guidance.' },
];

const TOP_ROUTES = [
  { name: 'France', slug: 'france', consulate: 'French Embassy Dubai', time: '10–15 days' },
  { name: 'Germany', slug: 'germany', consulate: 'German Consulate Dubai', time: '10–15 days' },
  { name: 'Italy', slug: 'italy', consulate: 'Italian Consulate Dubai', time: '10–15 days' },
  { name: 'Spain', slug: 'spain', consulate: 'Spanish Consulate Dubai', time: '10–15 days' },
  { name: 'Greece', slug: 'greece', consulate: 'Greek Consulate Dubai', time: '10–15 days' },
  { name: 'Netherlands', slug: 'netherlands', consulate: 'Dutch Embassy Abu Dhabi', time: '10–15 days' },
];

const INTERNAL_LINKS = [
  { href: '/visa/tourist-visa', label: 'Tourist Visa Guide', icon: '🌍' },
  { href: '/visa/work-visa', label: 'Work Visa Guide', icon: '💼' },
  { href: '/visa/business-visa', label: 'Business Visa Guide', icon: '🤝' },
  { href: '/visa/student-visa', label: 'Student Visa Guide', icon: '🎓' },
  { href: '/visa/transit-visa', label: 'Transit Visa Guide', icon: '🛫' },
  { href: '/visa-resources/visa-checklist-generator', label: 'Visa Checklist Generator', icon: '📋' },
  { href: '/visa-resources/visa-document-generator', label: 'SOP Template', icon: '📝' },
  { href: '/visa-resources/visa-document-generator', label: 'Cover Letter Template', icon: '📄' },
  { href: '/visa-resources/visa-document-generator', label: 'NOC Letter Template', icon: '⚖️' },
  { href: '/visa-resources/visa-document-generator', label: 'Bank Statement Template', icon: '🏦' },
  { href: '/visa-processing-time-tracker', label: 'Processing Time Tracker', icon: '⏱️' },
  { href: '/visa-resources/embassy-directory', label: 'Embassy Directory', icon: '🏛️' },
];

/* ─── COUNTRY CARD COMPONENT ────────────────────────────────────── */
// Merges MongoDB flag data with our static Schengen list
function SchengenCountryCard({ name, slug, flag, flagUrl }) {
  const imgSrc = flag || flagUrl || `https://flagcdn.com/w80/${slug?.slice(0, 2)}.png`;

  return (
    <Link
      href={`/visa/tourist-visa/${slug}`}
      className="group flex flex-col items-center gap-2 p-4 bg-white border border-slate-100 rounded-2xl hover:border-amber-300 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 text-center"
    >
      <div className="relative w-12 h-8 rounded-md overflow-hidden shadow-sm border border-slate-100 bg-slate-50">
        <img
          src={imgSrc}
          alt={`${name} flag`}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
      <span className="text-xs font-bold text-slate-700 group-hover:text-amber-700 transition-colors leading-tight">{name}</span>
      <span className="text-[9px] font-semibold text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-wider">Apply →</span>
    </Link>
  );
}

/* ─── LOADING SKELETON ──────────────────────────────────────────── */
function CountrySkeleton() {
  return (
    <div className="flex flex-col items-center gap-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl animate-pulse">
      <div className="w-12 h-8 bg-slate-200 rounded-md" />
      <div className="w-16 h-3 bg-slate-200 rounded" />
    </div>
  );
}

/* ─── MAIN PAGE COMPONENT ───────────────────────────────────────── */
export default function SchengenVisaPage() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch('/api/countries');
        if (!res.ok) throw new Error('Failed to fetch country data');
        const data = await res.json();

        // Build a lookup map from MongoDB data: { "France": { flag, code, ... } }
        const dbMap = {};
        data.forEach((c) => {
          if (c.country) dbMap[c.country.trim()] = c;
        });

        // Merge with our static Schengen list — MongoDB data wins for flag/code
        const merged = SCHENGEN_COUNTRY_NAMES.map((sc) => {
          const dbEntry = dbMap[sc.name] || {};
          return {
            name: sc.name,
            slug: sc.slug,
            flag: dbEntry.flag || null,
            code: dbEntry.code || sc.slug.slice(0, 2),
            flagUrl: dbEntry.flag || `https://flagcdn.com/w80/${(dbEntry.code || sc.slug.slice(0, 2)).toLowerCase()}.png`,
          };
        });

        setCountries(merged);
      } catch (err) {
        setError(err.message);
        // Fallback: use static list with flagcdn URLs
        const fallback = SCHENGEN_COUNTRY_NAMES.map((sc) => ({
          name: sc.name,
          slug: sc.slug,
          flag: null,
          code: sc.slug.slice(0, 2),
          flagUrl: `https://flagcdn.com/w80/${sc.slug.slice(0, 2)}.png`,
        }));
        setCountries(fallback);
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">

        {/* ── BREADCRUMB ── */}
        <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-100 px-6 py-3">
          <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-slate-400 font-medium flex-wrap">
            <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/visa-services" className="hover:text-amber-600 transition-colors">Visa Services</Link>
            <span>›</span>
            <Link href="/visa" className="hover:text-amber-600 transition-colors">Visa Guides</Link>
            <span>›</span>
            <span className="text-slate-600 font-semibold">Schengen Visa from UAE</span>
          </div>
        </nav>

        {/* ── TOP BANNER ── */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex flex-wrap gap-2 mb-6">
              {VISA_TYPES.map((v) => (
                <Link
                  key={v.label}
                  href={v.href}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                    v.active
                      ? 'bg-amber-400 text-slate-900 border-amber-400'
                      : 'border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-700'
                  }`}
                >
                  {v.label}
                </Link>
              ))}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-amber-500 mb-2">Visa Express Hub — Updated May 2026</p>
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 leading-tight">
                  Schengen Visa from UAE <span className="text-amber-500">2026</span>
                </h1>
                <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
                  One visa. 29 European countries. Complete Schengen visa guide for UAE residents — covering official requirements, the €90 fee structure, 15-day processing, document checklist, and step-by-step application support from Dubai.
                </p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-xs font-bold border border-amber-200 uppercase tracking-wider">
                  🇪🇺 29 Countries · 1 Visa
                </span>
                <p className="text-[10px] text-slate-400">Expert visa assistance · Dubai based</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div className="max-w-6xl mx-auto px-6 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

            {/* ─── MAIN CONTENT ─── */}
            <main className="lg:col-span-2 space-y-8">

              {/* WHAT IS SCHENGEN */}
              <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold mb-4">What is a Schengen Visa?</h2>
                <p className="text-slate-600 leading-relaxed text-sm mb-4">
                  A <strong>Schengen visa</strong> is a short-stay entry permit that allows non-EU nationals to travel freely across all{' '}
                  <strong>29 Schengen member countries</strong> for up to <strong>90 days in any 180-day rolling period</strong> — on a single visa. For UAE residents, it is the primary route to visiting Europe for tourism, business, family visits, or short-term conferences.
                </p>
                <p className="text-slate-600 leading-relaxed text-sm mb-5">
                  With a single visa obtained through a consulate in Dubai or Abu Dhabi, you can travel freely between France, Germany, Italy, Spain, Greece, and 24 other countries without stopping at internal borders.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
                  {[
                    { label: 'Official Visa Fee', value: '€90' },
                    { label: 'Processing Time', value: '15 days' },
                    { label: 'Maximum Stay', value: '90 days' },
                    { label: 'Countries Covered', value: '29' },
                  ].map((item) => (
                    <div key={item.label} className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                      <p className="text-xl font-extrabold text-slate-900 mb-1">{item.value}</p>
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{item.label}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
                  <p className="text-sm font-bold text-amber-800 mb-1">🇪🇺 Schengen 90/180-Day Rule</p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Your 90 days are counted across <em>all</em> Schengen countries combined — not per country. Days in France, Germany, and Spain all count toward the same 90-day total. Use the{' '}
                    <a href="https://ec.europa.eu/assets/home/visa-calculator/calculator.htm" target="_blank" rel="noopener noreferrer" className="text-amber-800 font-bold underline">
                      official EU short-stay calculator
                    </a>{' '}
                    to track your permitted days before each trip.
                  </p>
                </div>
              </section>

              {/* ── 29 SCHENGEN COUNTRIES — DYNAMIC FROM MONGODB ── */}
              <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <div className="flex items-start justify-between mb-2 flex-wrap gap-3">
                  <div>
                    <h2 className="text-xl font-bold">29 Countries Covered by One Schengen Visa</h2>
                    <p className="text-sm text-slate-500 mt-1">
                      Click any country to explore its dedicated tourist visa guide and apply online.
                    </p>
                  </div>
                  <a
                    href="https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/schengen-area_en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-amber-600 hover:underline underline-offset-4 shrink-0 mt-1"
                  >
                    Official Schengen list ↗
                  </a>
                </div>

                {error && (
                  <div className="mb-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700 font-semibold">
                    ⚠️ Using fallback flag data — {error}
                  </div>
                )}

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3" role="list" aria-label="Schengen member countries">
                  {loading
                    ? Array.from({ length: 29 }).map((_, i) => <CountrySkeleton key={i} />)
                    : countries.map((c) => (
                        <SchengenCountryCard key={c.name} {...c} />
                      ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2 items-center">
                  <span className="text-[11px] text-slate-400">
                    * Bulgaria and Romania joined the Schengen Area in 2024. Source:{' '}
                    <a href="https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/schengen-area_en" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline font-semibold">
                      European Commission
                    </a>
                    .
                  </span>
                </div>
              </section>

              {/* ── COUNTRY-SPECIFIC VISA LINKS (Internal SEO hub) ── */}
              <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700">
                <div className="mb-6">
                  <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-2 block">Country-Specific Guides</span>
                  <h2 className="text-xl font-bold text-white mb-1">Tourist Visa by Country</h2>
                  <p className="text-sm text-slate-400">Each Schengen country has its own consulate requirements. Select your destination for a tailored guide.</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {loading
                    ? Array.from({ length: 29 }).map((_, i) => (
                        <div key={i} className="h-10 bg-slate-700 rounded-xl animate-pulse" />
                      ))
                    : countries.map((c) => (
                        <Link
                          key={c.name}
                          href={`/visa/tourist-visa/${c.slug}`}
                          className="group flex items-center gap-2.5 px-3 py-2.5 bg-slate-800 hover:bg-amber-400 border border-slate-700 hover:border-amber-400 rounded-xl transition-all duration-150"
                        >
                          <div className="w-6 h-4 rounded overflow-hidden shrink-0 bg-slate-600">
                            <img
                              src={c.flag || c.flagUrl}
                              alt={c.name}
                              className="w-full h-full object-cover"
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-slate-300 group-hover:text-slate-900 transition-colors truncate leading-tight">
                            {c.name} Visa
                          </span>
                          <span className="ml-auto text-slate-600 group-hover:text-slate-800 text-xs font-bold transition-colors">›</span>
                        </Link>
                      ))}
                </div>

                <div className="mt-5 pt-5 border-t border-slate-700">
                  <p className="text-xs text-slate-500">
                    Need help choosing the right destination?{' '}
                    <Link href="/contact" className="text-amber-400 font-bold hover:underline">Ask our visa experts →</Link>
                  </p>
                </div>
              </section>

              {/* VISA TYPES */}
              <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold mb-2">Types of Schengen Visa</h2>
                <p className="text-sm text-slate-500 mb-6">Our experts help you select the right category based on your travel purpose and frequency.</p>
                <div className="space-y-4">
                  {VISA_CATEGORIES.map((v) => (
                    <div key={v.title} className="flex items-start gap-4 p-5 bg-slate-50 border border-slate-100 rounded-xl hover:border-amber-200 transition-colors">
                      <span className="text-2xl shrink-0 mt-0.5">{v.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-bold text-sm text-slate-900">{v.title}</h3>
                          <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${v.color}`}>{v.badge}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 bg-slate-50 border border-slate-100 rounded-xl p-4">
                  <p className="text-xs text-slate-500">
                    Not sure which visa type applies to your trip?{' '}
                    <Link href="/contact" className="text-amber-600 font-bold hover:underline">Contact our visa team for free guidance →</Link>
                  </p>
                </div>
              </section>

              {/* DOCUMENTS */}
              <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold mb-2">Documents Required for Schengen Visa from UAE</h2>
                <p className="text-sm text-slate-500 mb-6">
                  Standard requirements for UAE residents applying for a Schengen visa. Generate a personalised list using our{' '}
                  <Link href="/visa-resources/visa-checklist-generator" className="text-amber-600 font-bold hover:underline">
                    free Visa Checklist Generator →
                  </Link>
                </p>
                <div className="space-y-3">
                  {DOCUMENTS.map((doc) => (
                    <div key={doc.title} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 transition-colors">
                      <span className="text-xl shrink-0 mt-0.5">{doc.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="font-bold text-sm text-slate-900">{doc.title}</h4>
                          <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${doc.mandatory ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-500'}`}>
                            {doc.mandatory ? 'Required' : 'If Applicable'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{doc.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link href="/visa-resources/visa-checklist-generator" className="flex items-center justify-center gap-2 bg-amber-400 text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-amber-500 transition-all">
                    📋 Download Document Checklist
                  </Link>
                  <Link href="/visa-resources/visa-document-generator" className="flex items-center justify-center gap-2 bg-white text-slate-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all border border-slate-200">
                    📝 Generate SOP & Cover Letter
                  </Link>
                </div>
              </section>

              {/* FEE TABLE */}
              <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold mb-2">Schengen Visa Fee Structure 2026</h2>
                <p className="text-sm text-slate-500 mb-6">
                  Fees were updated in June 2024.{' '}
                  <a href="https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-semibold hover:underline">
                    Official EU visa policy ↗
                  </a>
                </p>
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <table className="w-full text-sm" role="table">
                    <thead>
                      <tr className="bg-slate-900 text-white">
                        <th className="text-left px-5 py-4 font-bold text-xs uppercase tracking-widest">Applicant Category</th>
                        <th className="text-right px-5 py-4 font-bold text-xs uppercase tracking-widest">Fee</th>
                        <th className="text-right px-5 py-4 font-bold text-xs uppercase tracking-widest hidden md:table-cell">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {FEE_TABLE.map((row, i) => (
                        <tr key={i} className={`border-b border-slate-100 last:border-0 hover:bg-amber-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                          <td className="px-5 py-4 font-semibold text-slate-800 text-sm">{row.category}</td>
                          <td className="px-5 py-4 text-right font-extrabold text-amber-600 text-base">{row.fee}</td>
                          <td className="px-5 py-4 text-right text-slate-400 text-xs hidden md:table-cell">{row.note}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 space-y-3">
                  <h3 className="font-bold text-slate-900 text-base">Processing Times</h3>
                  {[
                    { time: '15 days', label: 'Standard processing', desc: 'Most applications are decided within 15 calendar days of a complete submission.', color: 'border-green-300 bg-green-50' },
                    { time: 'Up to 45 days', label: 'Extended review', desc: 'For cases requiring additional documents or detailed examination by the consulate.', color: 'border-amber-300 bg-amber-50' },
                    { time: 'Accelerated', label: 'EU/EEA family members', desc: 'Family members of EU/EEA citizens qualify for a faster, free procedure.', color: 'border-slate-300 bg-slate-50' },
                  ].map((p) => (
                    <div key={p.label} className={`border-l-4 px-5 py-4 rounded-r-xl ${p.color}`}>
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="font-extrabold text-xl text-slate-900">{p.time}</span>
                        <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">{p.label}</span>
                      </div>
                      <p className="text-slate-600 text-xs leading-relaxed">{p.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-sm font-bold text-amber-900">⚡ Apply at least 4–6 weeks before your travel date — even earlier during peak summer months.</p>
                  <Link href="/visa-processing-time-tracker" className="inline-block mt-2 text-xs font-bold text-amber-700 hover:underline underline-offset-4">
                    ⏱ View full processing time tracker →
                  </Link>
                </div>
              </section>

              {/* WHERE TO APPLY */}
              <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold mb-6">Which Consulate Should I Apply To?</h2>
                <div className="space-y-3">
                  {[
                    { icon: '🎯', heading: 'Visiting one country', body: 'Apply at the consulate of that specific Schengen country in Dubai or Abu Dhabi.' },
                    { icon: '⏱️', heading: 'Visiting multiple countries — unequal stays', body: 'Apply at the consulate of the country where you will spend the most nights.' },
                    { icon: '✈️', heading: 'Visiting multiple countries — equal stays', body: 'Apply at the consulate of the first Schengen country you will enter.' },
                    { icon: '🏠', heading: 'General rule', body: 'Apply at the consulate responsible for your country of legal residence — for UAE residents, this is typically the Dubai or Abu Dhabi consulate of your primary destination.' },
                  ].map((item) => (
                    <div key={item.heading} className="flex gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-amber-200 transition-colors">
                      <span className="text-xl shrink-0 mt-0.5">{item.icon}</span>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 mb-1">{item.heading}</h4>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Top routes */}
                <div className="mt-6">
                  <h3 className="font-bold text-sm text-slate-900 mb-3">Most Popular Schengen Applications from UAE</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {TOP_ROUTES.map((r) => {
                      const countryData = countries.find((c) => c.name === r.name);
                      const flagSrc = countryData?.flag || countryData?.flagUrl || `https://flagcdn.com/w80/${r.slug.slice(0, 2)}.png`;
                      return (
                        <Link
                          key={r.name}
                          href={`/visa/tourist-visa/${r.slug}`}
                          className="group flex items-center gap-3 p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-amber-300 hover:bg-amber-50 transition-all"
                        >
                          <div className="w-10 h-7 rounded overflow-hidden shrink-0 shadow-sm border border-slate-100 bg-slate-100">
                            <img src={flagSrc} alt={r.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm text-slate-900 group-hover:text-amber-700 transition-colors">{r.name} Schengen Visa</p>
                            <p className="text-[11px] text-slate-400">{r.consulate} · {r.time}</p>
                          </div>
                          <span className="text-slate-300 group-hover:text-amber-500 font-bold text-lg shrink-0 transition-colors">›</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </section>

              {/* 6-STEP PROCESS */}
              <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold mb-2">How to Apply — 6-Step Process</h2>
                <p className="text-sm text-slate-500 mb-6">From initial consultation to visa in hand — our team guides UAE residents through every stage of the Schengen application.</p>
                <div className="space-y-5">
                  {STEPS.map((step) => (
                    <div key={step.num} className="flex gap-5">
                      <div className="shrink-0 w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">{step.num}</div>
                      <div className="pt-1 border-b border-slate-100 pb-5 flex-1 last:border-0 last:pb-0">
                        <h4 className="font-bold text-sm text-slate-900 mb-1">{step.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link href="/contact" className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-amber-500 transition-all">
                    Start Your Schengen Application →
                  </Link>
                </div>
              </section>

              {/* BEFORE YOU APPLY */}
              <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold mb-6">What UAE Applicants Must Know Before Applying</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { heading: 'Strong Financial Proof Is Essential', body: 'Consulates scrutinise bank statements carefully. Aim to show at least €100 per day of your planned stay. Recent large deposits look suspicious — maintain consistent, genuine bank activity across the 3–6 months before applying.' },
                    { heading: 'Travel Insurance Must Cover All Schengen States', body: 'Your policy must be valid across every Schengen country you plan to visit — not just your primary destination. It must cover emergency medical expenses and repatriation to a minimum of €30,000.' },
                    { heading: 'Your Itinerary Must Be Realistic', body: "Consulates assess whether your planned itinerary is achievable and consistent with your visa type. A tourist visa with a packed business schedule raises red flags. Your cover letter and itinerary should tell a consistent story." },
                    { heading: 'Refusals Create a Visa History — Handle Them Carefully', body: 'A refused Schengen visa becomes part of your visa history and can affect future applications. If you have a previous refusal, disclose it honestly and provide a strong explanation with your reapplication.' },
                    { heading: 'Some Consulates Accept Only Specific VFS Centres', body: 'In the UAE, certain Schengen consulates operate only through designated VFS Global centres in Dubai or Abu Dhabi. Do not book an appointment at an unauthorised centre — your application will not be processed.' },
                    { heading: 'Children Need Separate Applications and Consent Letters', body: 'Each child travelling requires their own visa application form and photographs. If a child is travelling with only one parent, or with neither parent, a notarised parental consent letter is required by most Schengen consulates.' },
                  ].map((item) => (
                    <div key={item.heading} className="border-l-4 border-amber-300 pl-5">
                      <h3 className="font-bold text-sm text-slate-900 mb-1">{item.heading}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* FAQ */}
              <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold mb-6">Schengen Visa — Frequently Asked Questions</h2>
                <div className="space-y-5">
                  {FAQS.map((faq, i) => (
                    <div key={i} className="border-b border-slate-100 last:border-0 pb-5 last:pb-0">
                      <h4 className="font-bold text-sm text-slate-900 mb-2">Q: {faq.q}</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">{faq.a}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-slate-50 border border-slate-100 rounded-xl p-4">
                  <p className="text-xs text-slate-500">
                    Have a specific question?{' '}
                    <Link href="/contact" className="text-amber-600 font-bold hover:underline">Ask our visa team directly →</Link>
                  </p>
                </div>
              </section>

              {/* OFFICIAL RESOURCES */}
              <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold mb-2">Official EU Resources</h2>
                <p className="text-sm text-slate-500 mb-6">Always verify current requirements using official government sources before submitting your application.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { name: 'EU Schengen Visa Policy', url: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en', desc: 'Official European Commission visa policy and fee regulations' },
                    { name: 'EU Short-Stay Calculator', url: 'https://ec.europa.eu/assets/home/visa-calculator/calculator.htm', desc: 'Calculate your remaining 90/180-day permitted days' },
                    { name: 'Schengen Visa Lists', url: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy/visa-lists_en', desc: 'Check whether your nationality requires a visa' },
                    { name: 'VFS Global UAE', url: 'https://www.vfsglobal.com/en/individuals/index.html', desc: 'Book your Schengen visa appointment at a UAE VFS centre' },
                  ].map((r) => (
                    <a
                      key={r.name}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start justify-between gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-amber-300 hover:shadow-sm group transition-all"
                    >
                      <div>
                        <h5 className="font-bold text-sm text-slate-900 mb-1">{r.name}</h5>
                        <p className="text-xs text-slate-500">{r.desc}</p>
                      </div>
                      <span className="text-slate-300 group-hover:text-amber-500 font-bold transition-colors text-lg shrink-0">↗</span>
                    </a>
                  ))}
                </div>
              </section>

              {/* FREE TOOLS */}
              <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <h2 className="text-xl font-bold mb-2">Free Visa Document Tools</h2>
                <p className="text-sm text-slate-500 mb-6">Generate professional Schengen visa documents in minutes — available free for all UAE applicants.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { href: '/visa-resources/visa-checklist-generator', label: '📋 Schengen Visa Checklist', badge: 'Free' },
                    { href: '/visa-resources/visa-document-generator', label: '📝 Statement of Purpose (SOP)', badge: 'Free' },
                    { href: '/visa-resources/visa-document-generator', label: '📄 NOC Letter Template', badge: 'Free' },
                    { href: '/visa-resources/visa-document-generator', label: '💼 Cover Letter Template', badge: 'Free' },
                    { href: '/visa-resources/visa-document-generator', label: '🏦 Bank Statement Template', badge: 'Free' },
                    { href: '/visa-resources/visa-document-generator', label: '⚖️ Power of Attorney', badge: 'Free' },
                  ].map((tool) => (
                    <Link
                      key={tool.href + tool.label}
                      href={tool.href}
                      className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-amber-300 hover:bg-amber-50 group transition-all"
                    >
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-amber-700 transition-colors">{tool.label}</span>
                      <span className="text-[10px] font-black tracking-widest bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">{tool.badge}</span>
                    </Link>
                  ))}
                </div>
              </section>

              {/* OTHER VISA TYPES */}
              <section className="bg-amber-400 rounded-2xl p-8">
                <h2 className="text-xl font-bold text-slate-900 mb-2">Explore Other Visa Types</h2>
                <p className="text-sm text-amber-900 mb-6">Planning work, study, or longer stays in Europe? Find the right visa category below.</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Business Visa', desc: 'Meetings & conferences', href: '/visa/business-visa', icon: '🤝' },
                    { label: 'Work Visa', desc: 'Employment & sponsorship', href: '/visa/work-visa', icon: '💼' },
                    { label: 'Student Visa', desc: 'Study & university', href: '/visa/student-visa', icon: '🎓' },
                    { label: 'Transit Visa', desc: 'Layovers & connections', href: '/visa/transit-visa', icon: '🛫' },
                  ].map((v) => (
                    <Link key={v.label} href={v.href} className="bg-white rounded-xl p-4 hover:shadow-md transition-all group">
                      <span className="text-2xl block mb-2">{v.icon}</span>
                      <p className="font-bold text-sm text-slate-900 group-hover:text-amber-700 transition-colors">{v.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{v.desc}</p>
                    </Link>
                  ))}
                </div>
              </section>

            </main>

            {/* ─── SIDEBAR ─── */}
            <aside className="space-y-5">
              {/* Apply CTA */}
              <div className="bg-slate-900 rounded-2xl p-7 text-white sticky top-10">
                <h3 className="text-lg font-bold mb-1">Apply for Schengen Visa</h3>
                <p className="text-amber-400 text-xs font-bold mb-4 uppercase tracking-widest">Expert assistance · Dubai based</p>
                <p className="text-slate-400 text-xs mb-6 leading-relaxed">Our visa specialists handle your entire Schengen application — from document preparation to approval. Free initial consultation.</p>
                <Link href="/contact" className="block w-full bg-amber-400 hover:bg-amber-300 text-slate-900 text-center py-3.5 rounded-xl font-bold transition-all text-sm mb-3">
                  Book Free Consultation →
                </Link>
                <Link href="/visa-resources/visa-checklist-generator" className="block w-full bg-slate-800 hover:bg-slate-700 text-white text-center py-3 rounded-xl font-bold transition-all text-sm">
                  📋 Get Document Checklist
                </Link>
                <div className="mt-6 border-t border-slate-800 pt-5 space-y-3">
                  {[
                    { label: 'Visa Fee', value: '€90 (adults)' },
                    { label: 'Processing', value: '15 days' },
                    { label: 'Max Stay', value: '90 / 180 days' },
                    { label: 'Countries', value: '29 Schengen states' },
                    { label: 'Insurance Min.', value: '€30,000 cover' },
                    { label: 'Apply From', value: '6 months ahead' },
                    { label: 'Latest Apply', value: '15 days before' },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between text-xs">
                      <span className="text-slate-500">{row.label}</span>
                      <span className="text-slate-200 font-bold text-right max-w-[55%]">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick country links in sidebar */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-1">🌍 Visa by Destination</h3>
                <p className="text-[10px] text-slate-400 mb-4">Country-specific tourist visa guides</p>
                <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
                  {loading
                    ? Array.from({ length: 10 }).map((_, i) => <div key={i} className="h-8 bg-slate-100 rounded-lg animate-pulse" />)
                    : countries.map((c) => (
                        <Link
                          key={c.name}
                          href={`/visa/tourist-visa/${c.slug}`}
                          className="group flex items-center gap-2.5 p-2 rounded-lg hover:bg-amber-50 hover:border-amber-200 border border-transparent transition-all"
                        >
                          <div className="w-6 h-4 rounded overflow-hidden shrink-0 bg-slate-100">
                            <img src={c.flag || c.flagUrl} alt={c.name} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
                          </div>
                          <span className="text-xs font-semibold text-slate-600 group-hover:text-amber-700 transition-colors flex-1">{c.name}</span>
                          <span className="text-slate-300 group-hover:text-amber-500 text-xs transition-colors">›</span>
                        </Link>
                      ))}
                </div>
              </div>

              {/* Other visa types */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-4">Other Visa Types</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Business Visa Guides', href: '/visa/business-visa', icon: '🤝' },
                    { label: 'Work Visa Guides', href: '/visa/work-visa', icon: '💼' },
                    { label: 'Student Visa Guides', href: '/visa/student-visa', icon: '🎓' },
                    { label: 'Tourist Visa Guides', href: '/visa/tourist-visa', icon: '🌍' },
                    { label: 'Transit Visa Guides', href: '/visa/transit-visa', icon: '🛫' },
                  ].map((v) => (
                    <Link key={v.label} href={v.href} className="flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 hover:border-amber-200 border border-transparent transition-all">
                      <span className="text-lg">{v.icon}</span>
                      <span className="text-sm font-semibold text-slate-700 hover:text-amber-700">{v.label}</span>
                      <span className="ml-auto text-slate-300 text-sm">›</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Document tools */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200">
                <h3 className="text-sm font-bold text-slate-900 mb-4">📋 Free Document Tools</h3>
                <div className="space-y-2">
                  {[
                    { label: 'Visa Checklist Generator', href: '/visa-resources/visa-checklist-generator' },
                    { label: 'SOP Template', href: '/visa-resources/visa-document-generator' },
                    { label: 'NOC Letter Template', href: '/visa-resources/visa-document-generator' },
                    { label: 'Cover Letter Template', href: '/visa-resources/visa-document-generator' },
                    { label: 'Bank Statement Template', href: '/visa-resources/visa-document-generator' },
                    { label: 'Embassy Directory', href: '/visa-resources/embassy-directory' },
                    { label: 'Processing Time Tracker', href: '/visa-processing-time-tracker' },
                  ].map((r) => (
                    <Link key={r.label + r.href} href={r.href} className="block text-xs font-semibold text-slate-500 hover:text-amber-600 hover:underline underline-offset-4 py-1 transition-colors">
                      {r.label} →
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tip box */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-amber-900 mb-2">💡 Key Tip</h3>
                <p className="text-xs text-amber-800 leading-relaxed mb-3">
                  Apply at the consulate of your <em>primary destination</em> — the country where you will spend the most nights. If stays are equal, apply at the first country you enter.
                </p>
                <a href="https://ec.europa.eu/assets/home/visa-calculator/calculator.htm" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-amber-700 hover:underline underline-offset-4">
                  Use EU 90/180-day calculator →
                </a>
              </div>
            </aside>

          </div>
        </div>

        {/* ── INTERNAL LINKS HUB ── */}
        <div className="max-w-6xl mx-auto px-6 mt-12">
          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            <div className="mb-6">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">More Resources</p>
              <h2 className="text-xl font-extrabold text-slate-900">Explore All Visa Services</h2>
              <p className="text-sm text-slate-500 mt-1">Everything you need for a successful visa application — guides, tools, and templates in one place.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {INTERNAL_LINKS.map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  className="flex items-center gap-3 p-4 border border-slate-100 rounded-xl hover:border-amber-300 hover:bg-amber-50 group transition-all"
                >
                  <span className="text-xl shrink-0 group-hover:scale-110 transition-transform">{link.icon}</span>
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-amber-700 leading-tight transition-colors">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA BANNER ── */}
        <div className="max-w-6xl mx-auto px-6 mt-8 mb-12">
          <div className="bg-amber-400 rounded-2xl p-10 text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-800 mb-2">Ready to Visit Europe?</p>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3 leading-tight">Let's Get Your Schengen Visa.</h2>
            <p className="text-sm text-amber-900 max-w-lg mx-auto mb-7 leading-relaxed">
              Talk to a visa expert today. No queues, no confusion — straightforward guidance from Dubai's trusted Schengen visa specialists. Free initial consultation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-slate-700 transition-all text-sm">
                Book Free Consultation →
              </Link>
              <Link href="/visa-resources/visa-checklist-generator" className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all border border-slate-200 text-sm">
                📋 Get Document Checklist
              </Link>
            </div>
            <p className="text-amber-800 text-xs mt-5">🔒 Your information is secure. We are registered visa consultants based in Dubai, UAE.</p>
          </div>
        </div>

        {/* ── FOOTER NAV ── */}
        <div className="bg-white border-t border-slate-100 px-6 py-5">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-slate-400">
              Page last updated:{' '}
              <time dateTime="2026-05-01" className="font-semibold text-slate-600">May 2026</time> · Source:{' '}
              <a href="https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline font-semibold">
                European Commission
              </a>
            </p>
            <nav aria-label="Related visa pages" className="flex flex-wrap gap-4">
              {[
                { href: '/visa/tourist-visa', label: 'Tourist Visa' },
                { href: '/visa/work-visa', label: 'Work Visa' },
                { href: '/visa/business-visa', label: 'Business Visa' },
                { href: '/visa/student-visa', label: 'Student Visa' },
                { href: '/visa/transit-visa', label: 'Transit Visa' },
                { href: '/visa-processing-time-tracker', label: 'Processing Times' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-xs font-semibold text-slate-500 hover:text-amber-600 transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

      </div>
    </>
  );
}