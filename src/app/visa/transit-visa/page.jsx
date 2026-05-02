"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const POPULAR_HUBS = [
  { nat: "Indian", natCode: "in", hub: "Dubai", hubCode: "ae" },
  { nat: "Nigerian", natCode: "ng", hub: "London Heathrow", hubCode: "gb" },
  { nat: "Pakistani", natCode: "pk", hub: "Istanbul", hubCode: "tr" },
  { nat: "Filipino", natCode: "ph", hub: "Singapore", hubCode: "sg" },
  { nat: "Bangladeshi", natCode: "bd", hub: "Doha", hubCode: "qa" },
  { nat: "Kenyan", natCode: "ke", hub: "Amsterdam", hubCode: "nl" },
];

const TOP_HUBS = [
  { name: "Dubai (DXB)", code: "ae", note: "Airside transit — no visa for most nationalities under 24 hrs" },
  { name: "Istanbul (IST)", code: "tr", note: "Free transit hotel for layovers over 6 hrs on Turkish Airlines" },
  { name: "Singapore (SIN)", code: "sg", note: "Free 96-hr VFTF for eligible passport holders" },
  { name: "London Heathrow (LHR)", code: "gb", note: "Direct Airside Transit Visa may be required" },
  { name: "Frankfurt (FRA)", code: "de", note: "Airport Transit Visa required for many nationalities" },
  { name: "Doha (DOH)", code: "qa", note: "Qatar Transit Visa free for 4–96 hrs on Qatar Airways" },
  { name: "Amsterdam (AMS)", code: "nl", note: "Schengen Airport Transit Visa rules apply" },
  { name: "Hong Kong (HKG)", code: "hk", note: "Visa-free transit for most — confirm with airline" },
];

const RULES_OVERVIEW = [
  {
    title: "Airside vs Landside Transit",
    desc: "Airside means you stay in the international zone without passing through immigration. Landside means you clear customs and enter the country — this almost always requires a transit visa or entry permit.",
    icon: "✈",
  },
  {
    title: "Connection Under 24 Hours",
    desc: "Most transit airports allow visa-free airside connections under 24 hours for many nationalities. However, certain passport holders always require an Airport Transit Visa regardless of duration.",
    icon: "⏱",
  },
  {
    title: "Checked-Through Baggage",
    desc: "If your bags are checked through to your final destination on a single booking, you may not need to collect them during transit. Confirm with your airline — interline agreements vary by carrier.",
    icon: "🧳",
  },
  {
    title: "Overnight or Long Layover",
    desc: "Layovers over 8–24 hours may require a transit visa even if you plan to stay airside. Some airports offer shore pass or layover visa arrangements for eligible nationalities.",
    icon: "🌙",
  },
];

const DOCUMENTS_NEEDED = [
  { title: "Valid Passport", detail: "Must be valid for at least 6 months beyond your final destination date." },
  { title: "Confirmed Onward Ticket", detail: "You must show a confirmed booking to your next destination to prove you are genuinely in transit." },
  { title: "Visa for Final Destination", detail: "You must hold a valid visa or entry authorisation for the country you are travelling to." },
  { title: "Transit Visa (if required)", detail: "Some nationalities require an Airport Transit Visa or Transit Permit even for airside connections." },
  { title: "Proof of Sufficient Funds", detail: "Some transit hubs may ask for evidence of funds covering your stay and onward travel." },
  { title: "Return or Onward Flight Booking", detail: "A printed or digital copy of your full itinerary including all connecting flights." },
];

const flagUrl = (code) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

export default function TransitVisaSearch() {
  const [countries, setCountries] = useState([]);
  const [nationality, setNationality] = useState({ name: '', flag: '' });
  const [hub, setHub] = useState({ name: '', flag: '' });
  const router = useRouter();

  useEffect(() => {
    fetch('/api/countries')
      .then((r) => r.json())
      .then((d) => setCountries(d))
      .catch((e) => console.error(e));
  }, []);

  const handleSearch = () => {
    if (nationality.name && hub.name) {
      const slug = `${nationality.name.toLowerCase()}-transit-at-${hub.name.toLowerCase()}`.replace(/\s+/g, '-');
      router.push(`/visa/transit-visa/${slug}?nFlag=${encodeURIComponent(nationality.flag)}&dFlag=${encodeURIComponent(hub.flag)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">

      {/* HERO */}
      <header className="border-b-8 border-black py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-[10px] font-black uppercase tracking-widest text-yellow-500 mb-4">
            Free Transit Visa & Layover Guide — Updated May 2026
          </p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-5">
            Transit<br />
            <span className="bg-yellow-400 px-3 inline-block">Visa Guide</span>
          </h1>
          <p className="text-lg font-medium text-gray-600 max-w-xl leading-relaxed">
            Find out if your nationality needs a transit visa or airport transit visa for layovers
            and stopovers at major international hubs — with documents, rules, and official links.
          </p>
        </div>
      </header>

      {/* SEARCH */}
      <section className="bg-black py-14 px-6" id="search">
        <div className="max-w-4xl mx-auto">
          <p className="text-yellow-400 text-[10px] font-black uppercase tracking-widest mb-4 text-center">
            Select Your Passport & Transit Hub — Get Instant Rules
          </p>
          <div className="border-4 border-yellow-400 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-yellow-400">
                  01. Your Passport Nationality
                </label>
                <div className="border-2 border-white p-3 flex items-center gap-3 hover:border-yellow-400 transition-colors">
                  {nationality.flag
                    ? <img src={nationality.flag} className="w-8 h-6 object-cover border border-gray-600" alt="flag" />
                    : <div className="w-8 h-6 bg-gray-800 border border-gray-600" />
                  }
                  <select
                    className="w-full bg-transparent text-white font-bold outline-none h-10 text-sm"
                    onChange={(e) => {
                      const c = countries.find(x => x.country === e.target.value);
                      if (c) setNationality({ name: c.country, flag: c.flag });
                    }}
                  >
                    <option value="" className="bg-black">Select your nationality</option>
                    {countries.map((c) => <option key={c.code} value={c.country} className="bg-black">{c.country}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-yellow-400">
                  02. Transit / Layover Airport Country
                </label>
                <div className="border-2 border-white p-3 flex items-center gap-3 hover:border-yellow-400 transition-colors">
                  {hub.flag
                    ? <img src={hub.flag} className="w-8 h-6 object-cover border border-gray-600" alt="flag" />
                    : <div className="w-8 h-6 bg-gray-800 border border-gray-600" />
                  }
                  <select
                    className="w-full bg-transparent text-white font-bold outline-none h-10 text-sm"
                    onChange={(e) => {
                      const c = countries.find(x => x.country === e.target.value);
                      if (c) setHub({ name: c.country, flag: c.flag });
                    }}
                  >
                    <option value="" className="bg-black">Select transit hub country</option>
                    {countries.map((c) => <option key={c.code} value={c.country} className="bg-black">{c.country}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={handleSearch}
              disabled={!nationality.name || !hub.name}
              className="w-full mt-8 bg-yellow-400 text-black py-5 font-black uppercase tracking-widest text-sm hover:bg-white transition-all disabled:opacity-40 disabled:cursor-not-allowed border-2 border-yellow-400"
            >
              {nationality.name && hub.name
                ? `Check ${nationality.name} Transit Rules at ${hub.name} →`
                : "Check Transit Visa Requirements →"
              }
            </button>
          </div>
        </div>
      </section>

      {/* POPULAR ROUTES */}
      <section className="border-b-4 border-black py-16 px-6" id="popular-routes">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Most Searched</p>
            <h2 className="text-3xl font-black uppercase tracking-tight">Popular Transit Routes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_HUBS.map((r) => {
              const slug = `${r.nat.toLowerCase()}-transit-at-${r.hub.toLowerCase()}`.replace(/\s+/g, '-');
              const nf = flagUrl(r.natCode);
              const df = flagUrl(r.hubCode);
              return (
                <Link
                  key={slug}
                  href={`/visa/transit-visa/${slug}?nFlag=${encodeURIComponent(nf)}&dFlag=${encodeURIComponent(df)}`}
                  className="border-2 border-black p-5 flex items-center justify-between hover:bg-yellow-400 group transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <img src={nf} className="w-8 h-6 border border-black z-10 object-cover" alt={r.nat} />
                      <img src={df} className="w-8 h-6 border border-black z-20 object-cover" alt={r.hub} />
                    </div>
                    <div>
                      <p className="font-black text-sm uppercase">{r.nat} Passport</p>
                      <p className="text-xs text-gray-500 group-hover:text-black font-bold">Transit at {r.hub}</p>
                    </div>
                  </div>
                  <span className="text-gray-300 group-hover:text-black font-black text-xl">›</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* TRANSIT RULES */}
      <section className="border-b-4 border-black py-16 px-6 bg-gray-50" id="transit-rules">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[10px] font-black uppercase tracking-widest text-yellow-500 mb-2">Key Concepts</p>
            <h2 className="text-4xl font-black uppercase tracking-tight">How Transit Visas Work</h2>
            <p className="text-gray-500 font-medium mt-3 max-w-xl text-sm">
              Transit rules vary by nationality, airport, and layover duration.
              Understanding the basics saves you from being denied boarding.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {RULES_OVERVIEW.map((r) => (
              <div key={r.title} className="border-2 border-black p-6 bg-white hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-black text-sm uppercase">{r.title}</h3>
                  <span className="text-xl">{r.icon}</span>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP HUBS */}
      <section className="border-b-4 border-black py-16 px-6" id="transit-hubs">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[10px] font-black uppercase tracking-widest text-yellow-500 mb-2">Major Airports</p>
            <h2 className="text-4xl font-black uppercase tracking-tight">Top Transit Hubs 2026</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOP_HUBS.map((h) => (
              <div key={h.code} className="border-2 border-black p-5 hover:bg-black hover:text-white group transition-all">
                <img
                  src={flagUrl(h.code)}
                  className="w-10 h-7 object-cover border-2 border-black group-hover:border-yellow-400 mb-4"
                  alt={h.name}
                />
                <h4 className="font-black text-sm uppercase mb-2">{h.name}</h4>
                <p className="text-[11px] text-gray-500 group-hover:text-gray-300 leading-relaxed">{h.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="border-b-4 border-black py-16 px-6 bg-black text-white" id="documents">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[10px] font-black uppercase tracking-widest text-yellow-400 mb-2">Universal Checklist</p>
            <h2 className="text-4xl font-black uppercase tracking-tight text-white">Transit Documents Required</h2>
            <p className="text-gray-400 font-medium mt-3 max-w-xl text-sm">
              Always carry these documents when transiting. Use our route search for country-specific requirements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOCUMENTS_NEEDED.map((d) => (
              <div key={d.title} className="border border-gray-700 p-5 hover:border-yellow-400 transition-colors">
                <h4 className="font-black text-sm uppercase text-white mb-2">{d.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{d.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/visa-resources/visa-checklist-generator"
              className="inline-block border-2 border-yellow-400 text-yellow-400 px-10 py-4 font-black uppercase tracking-widest text-xs hover:bg-yellow-400 hover:text-black transition-all"
            >
              Download Transit Checklist →
            </Link>
          </div>
        </div>
      </section>

      {/* INTERNAL LINK: WORK VISA CTA */}
      <section className="border-b-4 border-black py-14 px-6 bg-yellow-400">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest mb-2">Also on WorkPass.Guide</p>
            <h3 className="text-2xl font-black uppercase">Looking for a Work Visa Guide?</h3>
            <p className="text-sm font-medium mt-2 text-black/70">
              Step-by-step work permit guides for every nationality and 40+ destination countries.
            </p>
          </div>
          <Link
            href="/visa/work-visa"
            className="shrink-0 bg-black text-white px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all border-2 border-black"
          >
            Explore Work Visa Guides →
          </Link>
        </div>
      </section>

    </div>
  );
}