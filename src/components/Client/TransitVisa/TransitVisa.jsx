"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const POPULAR_HUBS = [
  { nat: "India", natCode: "in", hub: "United Arab Emirates", hubCode: "ae", hubLabel: "Dubai DXB" },
  { nat: "Nigeria", natCode: "ng", hub: "United Kingdom", hubCode: "gb", hubLabel: "London LHR" },
  { nat: "Pakistan", natCode: "pk", hub: "Turkey", hubCode: "tr", hubLabel: "Istanbul IST" },
  { nat: "Philippines", natCode: "ph", hub: "Singapore", hubCode: "sg", hubLabel: "Singapore SIN" },
  { nat: "Bangladesh", natCode: "bd", hub: "Qatar", hubCode: "qa", hubLabel: "Doha DOH" },
  { nat: "Kenya", natCode: "ke", hub: "Netherlands", hubCode: "nl", hubLabel: "Amsterdam AMS" },
];

const TOP_HUBS = [
  { name: "Dubai (DXB)", code: "ae", transit: "Airport Transit Visa", processing: "Same day–24 hrs", note: "Airside visa-free under 24 hrs for many nationalities" },
  { name: "Istanbul (IST)", code: "tr", transit: "e-Visa / Airside", processing: "Immediate", note: "Free transit hotel for 6+ hr layovers on Turkish Airlines" },
  { name: "Singapore (SIN)", code: "sg", transit: "VFTF / DPVP", processing: "Same day", note: "Free 96-hr Visa Free Transit for eligible passports" },
  { name: "London Heathrow (LHR)", code: "gb", transit: "Direct Airside Transit Visa", processing: "3 weeks", note: "DATV required for many nationalities even airside" },
  { name: "Frankfurt (FRA)", code: "de", transit: "Schengen ATV", processing: "10–15 days", note: "Airport Transit Visa required for many nationalities" },
  { name: "Doha (DOH)", code: "qa", transit: "Qatar Transit Visa", processing: "Same day–48 hrs", note: "Free 4–96 hr transit visa for Qatar Airways passengers" },
  { name: "Amsterdam (AMS)", code: "nl", transit: "Schengen ATV", processing: "10–15 days", note: "Schengen Airport Transit Visa rules apply" },
  { name: "Hong Kong (HKG)", code: "hk", transit: "Visa-Free / TWOV", processing: "N/A", note: "Transit Without Visa for most — confirm with airline" },
];

const RULES_OVERVIEW = [
  { num: "01", title: "Airside vs Landside Transit", desc: "Airside means staying in the international departure zone without clearing immigration. Landside means entering the country — this almost always requires a transit visa or valid entry permit.", icon: "✈️" },
  { num: "02", title: "Connection Under 24 Hours", desc: "Most transit airports allow visa-free airside connections under 24 hours for many nationalities. However, certain passport holders always require an Airport Transit Visa regardless of layover duration.", icon: "⏱️" },
  { num: "03", title: "Checked-Through Baggage", desc: "If your bags are checked through to your final destination on a single booking, you may not need to collect them during transit. Confirm with your airline — interline agreements vary by carrier.", icon: "🧳" },
  { num: "04", title: "Overnight or Long Layover", desc: "Layovers over 8–24 hours may require a transit visa even if you plan to stay airside. Some airports offer shore pass or layover visa arrangements for eligible nationalities.", icon: "🌙" },
  { num: "05", title: "Separate vs Single Booking", desc: "Flights on two separate tickets require you to collect luggage and re-check in, meaning you must clear immigration — and need a valid entry or transit visa. Always book on one itinerary.", icon: "🎫" },
  { num: "06", title: "Overstay Consequences", desc: "Exceeding your permitted transit window — even by hours — can result in fines, detention, or a future entry ban at that hub. Always set a departure reminder and never assume delays grant extra time.", icon: "⚠️" },
];

const DOCUMENTS = [
  { title: "Valid Passport", detail: "Must be valid for at least 6 months beyond your final destination arrival date. Check hub-specific requirements.", mandatory: true },
  { title: "Full Flight Itinerary", detail: "Printed or digital copy of all legs including connection through the transit hub and your onward booking.", mandatory: true },
  { title: "Visa for Final Destination", detail: "Valid visa or entry authorisation for the country you are ultimately travelling to — airlines check this at boarding.", mandatory: true },
  { title: "Transit Visa / ATV (if required)", detail: "Airport Transit Visa or transit permit if your nationality requires one at the specific hub.", mandatory: false },
  { title: "Confirmed Onward / Return Ticket", detail: "Proof you will be leaving the transit country on a confirmed booking within the permitted transit period.", mandatory: true },
  { title: "Proof of Sufficient Funds", detail: "Bank statement or accessible funds covering your stay in the hub if asked by immigration or border control.", mandatory: false },
];

const TRUSTED_PORTALS = [
  { name: "TIMATIC (IATA)", purpose: "Airline industry tool — the definitive transit visa checker by nationality and hub", url: "https://www.iatatravelcentre.com", tag: "Official" },
  { name: "Dubai ICA e-Services", purpose: "UAE transit visa and immigration services portal", url: "https://smartservices.ica.gov.ae", tag: "Government" },
  { name: "UK Visas & Immigration", purpose: "Direct Airside Transit Visa for UK airport connections", url: "https://www.gov.uk/transit-visa", tag: "Government" },
  { name: "Schengen Visa Info", purpose: "Airport Transit Visa rules for all 27 Schengen member states", url: "https://www.schengenvisainfo.com", tag: "Official" },
  { name: "Singapore ICA", purpose: "Visa-Free Transit Facility and Destination Passage Visa", url: "https://www.ica.gov.sg", tag: "Government" },
  { name: "Qatar MOFA e-Visa", purpose: "Qatar transit visa for Qatar Airways layover passengers", url: "https://evisa.mfa.gov.qa", tag: "Government" },
];

const flagUrl = (code) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

// ── Shared auto-suggest search component ─────────────────────────────────────
function CountrySearch({ label, stepNum, value, onChange, countries, placeholder }) {
  const [query, setQuery] = useState(value?.name || '');
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const ref = useRef(null);

  const filtered = query.length > 0
    ? countries.filter(c => c.country.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  useEffect(() => { if (value?.name) setQuery(value.name); }, [value?.name]);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const select = (c) => {
    setQuery(c.country);
    onChange({ name: c.country, flag: c.flag, code: c.code });
    setOpen(false);
    setHighlighted(-1);
  };

  const handleKey = (e) => {
    if (!open || filtered.length === 0) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlighted(h => Math.min(h + 1, filtered.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setHighlighted(h => Math.max(h - 1, 0)); }
    if (e.key === 'Enter' && highlighted >= 0) select(filtered[highlighted]);
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div className="space-y-2" ref={ref}>
      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-black">{stepNum}</span>
        {label}
      </label>
      <div className="relative">
        <div className={`flex items-center gap-3 bg-white border-2 rounded-xl px-4 py-3 transition-all ${open ? 'border-amber-400 shadow-lg shadow-amber-50' : 'border-slate-200 hover:border-slate-300'}`}>
          {value?.flag
            ? <img src={value.flag} className="w-8 h-6 object-cover rounded shadow-sm shrink-0" alt="flag" />
            : <div className="w-8 h-6 bg-slate-100 rounded shrink-0 flex items-center justify-center text-slate-300 text-xs">🌍</div>
          }
          <input
            type="text"
            className="flex-1 bg-transparent font-semibold text-sm text-slate-800 outline-none placeholder:text-slate-400"
            placeholder={placeholder}
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); setHighlighted(-1); if (!e.target.value) onChange(null); }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKey}
          />
          {query && (
            <button onClick={() => { setQuery(''); onChange(null); setOpen(false); }} className="text-slate-300 hover:text-slate-500 transition-colors text-sm">✕</button>
          )}
          <span className="text-slate-300 text-xs">▾</span>
        </div>

        {open && filtered.length > 0 && (
          <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden">
            {filtered.map((c, i) => (
              <button
                key={c.code}
                onMouseDown={() => select(c)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${i === highlighted ? 'bg-amber-50 text-amber-800' : 'hover:bg-slate-50'}`}
              >
                <img src={c.flag} className="w-7 h-5 object-cover rounded shadow-sm shrink-0" alt={c.country} />
                <span className="text-sm font-medium text-slate-800">{c.country}</span>
              </button>
            ))}
          </div>
        )}

        {open && query.length > 1 && filtered.length === 0 && (
          <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl p-4 text-center">
            <p className="text-sm text-slate-400">No countries found for "<span className="font-semibold">{query}</span>"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TransitVisaSearch() {
  const [countries, setCountries] = useState([]);
  const [nationality, setNationality] = useState(null);
  const [hub, setHub] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/countries')
      .then((r) => r.json())
      .then((d) => {
        setCountries(d);
        // Default: India → UAE
        const india = d.find(c => c.country === 'India');
        const uae = d.find(c => c.country === 'United Arab Emirates');
        if (india) setNationality({ name: india.country, flag: india.flag, code: india.code });
        if (uae) setHub({ name: uae.country, flag: uae.flag, code: uae.code });
      })
      .catch((e) => console.error(e));
  }, []);

  const handleSearch = () => {
    if (nationality?.name && hub?.name) {
      const slug = `${nationality.name.toLowerCase()}-transit-at-${hub.name.toLowerCase()}`.replace(/\s+/g, '-');
      router.push(`/visa/transit-visa/${slug}`);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">

      {/* HERO */}
      <header className="border-b border-slate-100 py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-500 mb-4">
            Free Transit Visa & Layover Guide — Updated May 2026
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-5 text-slate-900">
            Transit Visa &<br />
            <span className="text-amber-500">Layover Rules</span><br />
            by Nationality
          </h1>
          <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
            Find out if your nationality needs a transit visa or Airport Transit Visa for layovers
            at major international hubs — with documents, time limits, and official portal links.
          </p>

          {/* Visa type nav */}
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { label: "Business Visa", href: "/visa/business-visa" },
              { label: "Work Visa", href: "/visa/work-visa" },
              { label: "Student Visa", href: "/visa/student-visa" },
              { label: "Tourist Visa", href: "/visa/tourist-visa" },
              { label: "Transit Visa", href: "/visa/transit-visa", active: true },
            ].map((v) => (
              <Link
                key={v.label}
                href={v.href}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${v.active
                  ? 'bg-amber-400 text-slate-900 border-amber-400'
                  : 'border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-700'
                }`}
              >
                {v.label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* SEARCH */}
      <section className="py-14 px-6 bg-slate-50 border-b border-slate-200" id="search">
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2 text-center">
            Check Transit Visa Requirements
          </p>
          <p className="text-center text-sm text-slate-500 mb-8">Select your passport and transit hub to get instant layover rules and document requirements</p>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CountrySearch
                label="Your Passport Nationality"
                stepNum="1"
                value={nationality}
                onChange={setNationality}
                countries={countries}
                placeholder="Type country name…"
              />
              <CountrySearch
                label="Transit Hub Country"
                stepNum="2"
                value={hub}
                onChange={setHub}
                countries={countries}
                placeholder="Type hub country…"
              />
            </div>

            {/* Preview strip */}
            {nationality && hub && (
              <div className="mt-6 flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl px-5 py-3">
                <img src={nationality.flag} className="w-7 h-5 rounded object-cover shadow-sm" alt={nationality.name} />
                <span className="text-sm font-semibold text-slate-700">{nationality.name}</span>
                <span className="text-amber-400 font-black">→</span>
                <img src={hub.flag} className="w-7 h-5 rounded object-cover shadow-sm" alt={hub.name} />
                <span className="text-sm font-semibold text-slate-700">{hub.name}</span>
                <span className="ml-auto text-[10px] font-bold text-amber-600 uppercase tracking-widest">Transit Guide Ready</span>
              </div>
            )}

            <button
              onClick={handleSearch}
              disabled={!nationality?.name || !hub?.name}
              className="w-full mt-6 bg-amber-400 text-slate-900 rounded-xl py-4 font-bold text-base hover:bg-amber-500 transition-all shadow-lg shadow-amber-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {nationality?.name && hub?.name
                ? `Check ${nationality.name} Transit Rules at ${hub.name} →`
                : "Check Transit Visa Requirements →"
              }
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-4">Free guide · No registration required · Updated May 2026</p>
          </div>
        </div>
      </section>

      {/* POPULAR ROUTES */}
      <section className="border-b border-slate-100 py-16 px-6 bg-white" id="popular-routes">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Most Searched</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Popular Transit Routes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_HUBS.map((r) => {
              const slug = `${r.nat.toLowerCase()}-transit-at-${r.hub.toLowerCase()}`.replace(/\s+/g, '-');
              const nf = flagUrl(r.natCode);
              const df = flagUrl(r.hubCode);
              return (
                <Link
                  key={slug}
                  href={`/visa/transit-visa/${slug}`}
                  className="border border-slate-200 rounded-xl p-5 flex items-center justify-between hover:border-amber-300 hover:shadow-md hover:shadow-amber-50 group transition-all bg-white"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <img src={nf} className="w-8 h-6 rounded border-2 border-white shadow-sm z-10 object-cover" alt={r.nat} />
                      <img src={df} className="w-8 h-6 rounded border-2 border-white shadow-sm z-20 object-cover" alt={r.hub} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900">{r.nat}</p>
                      <p className="text-xs text-slate-400 font-medium">→ Transit at {r.hubLabel}</p>
                    </div>
                  </div>
                  <span className="text-slate-300 group-hover:text-amber-500 font-bold text-lg transition-colors">›</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW TRANSIT VISAS WORK */}
      <section className="border-b border-slate-100 py-16 px-6 bg-slate-50" id="transit-rules">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Key Concepts</p>
            <h2 className="text-3xl font-extrabold tracking-tight">How Transit Visas Work</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-sm">
              Transit rules vary by nationality, airport, and layover duration. Understanding the basics prevents denied boarding.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {RULES_OVERVIEW.map((s) => (
              <div key={s.num} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md hover:shadow-slate-100 hover:border-amber-200 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">{s.num}</span>
                  <span className="text-2xl">{s.icon}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-2">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP HUBS */}
      <section className="border-b border-slate-100 py-16 px-6 bg-white" id="transit-hubs">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Major Airports</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Top Transit Hubs 2026</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOP_HUBS.map((h) => (
              <div key={h.code} className="border border-slate-200 rounded-xl p-5 bg-white hover:shadow-md hover:shadow-slate-100 hover:border-amber-200 transition-all">
                <img src={flagUrl(h.code)} className="w-10 h-7 object-cover rounded border border-slate-100 mb-4" alt={h.name} />
                <h3 className="font-bold text-sm text-slate-900 mb-1">{h.name}</h3>
                <p className="text-[11px] text-amber-600 font-semibold mb-3">{h.transit}</p>
                <div className="border-t border-slate-100 pt-3 space-y-2">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Processing</p>
                    <p className="text-xs font-semibold text-slate-700">{h.processing}</p>
                  </div>
                  <p className="text-[11px] text-slate-400">{h.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="border-b border-slate-100 py-16 px-6 bg-slate-50" id="documents">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Universal Checklist</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Documents Required for Transit</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-sm">
              Always carry these documents when transiting. Use our route search for hub-specific requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOCUMENTS.map((doc) => (
              <div key={doc.title} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-amber-200 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-sm text-slate-900">{doc.title}</h4>
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ml-2 ${doc.mandatory ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                    {doc.mandatory ? 'Required' : 'May Be Needed'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{doc.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/visa-resources/visa-checklist-generator"
              className="inline-block bg-amber-400 text-slate-900 px-10 py-4 rounded-xl font-bold hover:bg-amber-500 transition-all shadow-lg shadow-amber-100 text-sm"
            >
              Download Transit Checklist →
            </Link>
          </div>
        </div>
      </section>

      {/* TRUSTED PORTALS */}
      <section className="border-b border-slate-100 py-16 px-6 bg-white" id="trusted-portals">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Verify Before Travel</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Official Transit Visa Portals</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-sm">
              Always verify transit requirements using official government portals or your airline's TIMATIC tool. Requirements change without notice.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRUSTED_PORTALS.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3 hover:border-amber-300 hover:shadow-md hover:shadow-amber-50 group transition-all"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">{p.name}</h4>
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">{p.tag}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{p.purpose}</p>
                <span className="text-[10px] font-bold text-slate-300 group-hover:text-amber-500 transition-colors">{p.url.replace("https://", "")} ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT TO KNOW */}
      <section className="border-b border-slate-100 py-16 px-6 bg-slate-50" id="before-you-travel">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Important</p>
            <h2 className="text-3xl font-extrabold tracking-tight">What to Know Before Transiting</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                heading: "Always Check Via TIMATIC Before Booking Flights",
                body: "TIMATIC is the airline industry's official database for passport, visa, and health document requirements. Use your airline's TIMATIC checker or ask at the check-in desk. Transit rules change frequently — even monthly — and a guide from six months ago may be outdated."
              },
              {
                heading: "Separate Tickets Are the Most Common Mistake",
                body: "If you book two separate flights rather than a single itinerary, you will almost certainly need to collect your luggage and pass through immigration at the hub — which requires a valid transit visa or entry permit. Always book connecting flights on one booking reference where possible."
              },
              {
                heading: "Some Nationalities Always Need an ATV",
                body: "Certain passport holders — including some South Asian, African, and Middle Eastern nationals — are on 'ATV-required' lists for Schengen airports, the UK, and others. This applies even for connections of under two hours. Check your specific passport nationality against the hub's ATV-required list before booking."
              },
              {
                heading: "Transit Hotel Arrangements Vary Widely",
                body: "Airlines like Turkish Airlines, Qatar Airways, and Emirates offer free transit hotel accommodation for certain long layover passengers. Eligibility depends on your ticket class, layover duration, and nationality. Always request this at booking or check-in — it is not automatic."
              },
              {
                heading: "Your Final Destination Visa Must Be Valid",
                body: "Airlines are fined by destination governments if they carry passengers without valid onward visas. Expect to show your visa for your final destination at the check-in desk — not just at the transit hub's immigration. Carry printed and digital copies of all onward visas."
              },
              {
                heading: "Delays Do Not Automatically Extend Permitted Transit Time",
                body: "If a flight delay causes you to exceed your permitted transit window, notify airline staff immediately. They are typically responsible for liaising with hub immigration in cases of operational delays. Voluntarily extending your stay — for any reason — may result in fines or a future entry ban."
              },
            ].map((item) => (
              <div key={item.heading} className="border-l-4 border-amber-300 pl-6">
                <h3 className="font-bold text-base text-slate-900 mb-2">{item.heading}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISA TYPE BANNER */}
      <section className="border-b border-slate-100 py-14 px-6 bg-amber-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-800 mb-2">Also on WorkPass.Guide</p>
            <h3 className="text-2xl font-extrabold text-slate-900">Explore Other Visa Categories</h3>
            <p className="text-sm text-amber-900 mt-2">
              Full guides for work, business, student, and tourist visas across 40+ countries.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/visa/work-visa" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-700 transition-all">
              Work Visa →
            </Link>
            <Link href="/visa/business-visa" className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all border border-slate-200">
              Business Visa →
            </Link>
            <Link href="/visa/student-visa" className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all border border-slate-200">
              Student Visa →
            </Link>
            <Link href="/visa/tourist-visa" className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all border border-slate-200">
              Tourist Visa →
            </Link>
          </div>
        </div>
      </section>

      {/* GUIDE HUB */}
      <section className="border-b border-slate-100 py-16 px-6 bg-white" id="guides">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Guide Library</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Transit Guides by Hub</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOP_HUBS.slice(0, 8).map((hub) => (
              <div key={hub.code} className="border border-slate-200 rounded-xl p-5 bg-white hover:border-amber-200 transition-colors">
                <img src={flagUrl(hub.code)} className="w-10 h-7 object-cover rounded border border-slate-100 mb-3" alt={hub.name} />
                <h4 className="font-bold text-sm text-slate-900 mb-1">{hub.name}</h4>
                <p className="text-xs text-slate-400 mb-4">{hub.transit}</p>
                <div className="space-y-2">
                  {["Indian", "Nigerian", "Pakistani", "Filipino"].map((nat) => {
                    const nCode = nat === "Indian" ? "in" : nat === "Nigerian" ? "ng" : nat === "Pakistani" ? "pk" : "ph";
                    const hubSlug = hub.name.toLowerCase().split(' (')[0].replace(/\s+/g, '-');
                    const hubCountry = hub.code === "ae" ? "united-arab-emirates" : hub.code === "gb" ? "united-kingdom" : hub.code === "tr" ? "turkey" : hub.code === "sg" ? "singapore" : hub.code === "de" ? "germany" : hub.code === "qa" ? "qatar" : hub.code === "nl" ? "netherlands" : "hong-kong";
                    return (
                      <Link
                        key={nat}
                        href={`/visa/transit-visa/${nat.toLowerCase()}-transit-at-${hubCountry}`}
                        className="block text-[11px] font-semibold text-slate-400 hover:text-amber-600 hover:underline underline-offset-4"
                      >
                        {nat} nationals →
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}