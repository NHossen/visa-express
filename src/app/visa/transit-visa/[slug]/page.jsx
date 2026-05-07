import React from 'react';
import Link from 'next/link';

const flagUrl = (code) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;
const cap = (str) => str.replace(/\b\w/g, (l) => l.toUpperCase());

const VISA_TYPES = [
  { label: "Business Visa", href: "/visa/business-visa" },
  { label: "Work Visa", href: "/visa/work-visa" },
  { label: "Student Visa", href: "/visa/student-visa" },
  { label: "Tourist Visa", href: "/visa/tourist-visa" },
  { label: "Transit Visa", href: "/visa/transit-visa", active: true },
];

const DOCUMENTS = [
  { icon: "🛂", title: "Valid Passport", detail: "Valid for at least 6 months beyond your final destination arrival date. Hub-specific minimums may vary.", mandatory: true },
  { icon: "✈️", title: "Full Flight Itinerary", detail: "Printed or digital — all legs including connection through the transit hub and confirmed onward booking.", mandatory: true },
  { icon: "📋", title: "Visa for Final Destination", detail: "Valid visa or entry authorisation for your ultimate destination. Airlines check this at departure check-in.", mandatory: true },
  { icon: "🪪", title: "Transit Visa / ATV", detail: "Airport Transit Visa or transit permit if your specific nationality requires one at this hub.", mandatory: false },
  { icon: "🎫", title: "Confirmed Onward Ticket", detail: "Proof you will be departing the transit country on a confirmed booking within the permitted transit window.", mandatory: true },
  { icon: "🏦", title: "Proof of Sufficient Funds", detail: "Bank statement or accessible funds showing you can cover your stay if requested by immigration or border control.", mandatory: false },
];

const TRANSIT_STEPS = [
  {
    t: "Check If You Need a Transit Visa",
    timing: "Before booking flights",
    d: (nat, hub) => `Before purchasing any flights, ${nat} passport holders must verify whether a transit visa or Airport Transit Visa (ATV) is required at ${hub}. This depends on your specific passport, the layover duration, and whether you intend to stay airside or enter the country. Use your airline's TIMATIC tool or the official ${hub} immigration authority's website to confirm requirements — do not rely on third-party guides alone, as rules change frequently.`
  },
  {
    t: "Understand Airside vs Landside Transit",
    timing: "Before travel",
    d: (nat, hub) => `Airside transit means you remain inside the international departure zone of ${hub} airport at all times, without passing through immigration or customs. Most ${nat} travellers on short connections can transit airside without a visa if they stay under 24 hours. Landside transit — for example, staying overnight outside the airport or if your bags are not checked through — typically requires a transit visa or valid ${hub} entry permit for ${nat} nationals.`
  },
  {
    t: "Confirm Your Baggage Arrangement",
    timing: "At booking and check-in",
    d: (nat, hub) => `One of the most common reasons ${nat} travellers need to enter ${hub} during a layover is because their bags are not checked through to their final destination. If your two flights are on separate bookings, you will almost certainly need to collect your luggage and re-check it, passing through immigration at ${hub}. This requires a transit visa or entry permit. Always book your full journey on a single itinerary where possible to avoid this requirement.`
  },
  {
    t: "Apply for Transit Visa If Required",
    timing: "4–6 weeks before travel",
    d: (nat, hub) => `If your nationality requires a transit visa for ${hub}, apply as early as possible — ideally 4–6 weeks before travel. Many hubs now offer online e-visa applications for transit purposes. You will typically need your confirmed flight itinerary, valid passport, a passport-size photograph, and a valid visa for your final destination. Check whether ${hub} offers a visa on arrival or e-visa option for ${nat} nationals before visiting an embassy in person.`
  },
  {
    t: "Prepare and Organise Documents",
    timing: "Before departure",
    d: (nat, hub) => `Carry printed and digital copies of your complete flight itinerary, confirmed onward ticket, valid visa for your final destination, and your ${nat} passport. At ${hub} check-in or immigration, you may be asked to show all of these simultaneously. Some airports also require proof of sufficient funds. Keep all documents accessible — searching through bags at a busy transit counter causes unnecessary delays and anxiety.`
  },
  {
    t: "Know Your Time Limits and Stay Compliant",
    timing: "At the airport",
    d: (nat, hub) => `Every transit arrangement at ${hub} has a permitted time window. Airside transit is typically limited to 24 hours. Landside transit visas may allow 48–96 hours. Overstaying your permitted transit period — even by a few hours — can result in fines, detention, or a future entry ban at ${hub}. Set reminders for your departure time. If a flight delay threatens to push you over your limit, notify airline staff immediately — they are responsible for liaising with immigration in genuine operational disruptions.`
  },
];

const RELATED_NATIONALITIES = [
  { name: "Indian", code: "in" },
  { name: "Filipino", code: "ph" },
  { name: "Pakistani", code: "pk" },
  { name: "Bangladeshi", code: "bd" },
  { name: "Nigerian", code: "ng" },
  { name: "Kenyan", code: "ke" },
];

const RELATED_HUBS = [
  { name: "United Arab Emirates", code: "ae", airport: "Dubai DXB" },
  { name: "Turkey", code: "tr", airport: "Istanbul IST" },
  { name: "Singapore", code: "sg", airport: "Singapore SIN" },
  { name: "United Kingdom", code: "gb", airport: "London LHR" },
  { name: "Germany", code: "de", airport: "Frankfurt FRA" },
  { name: "Qatar", code: "qa", airport: "Doha DOH" },
];

const TRUSTED_PORTALS = [
  { name: "TIMATIC (IATA)", url: "https://www.iatatravelcentre.com", desc: "Definitive airline industry transit visa checker by nationality and hub" },
  { name: "Dubai ICA e-Services", url: "https://smartservices.ica.gov.ae", desc: "UAE transit visa and immigration services portal" },
  { name: "UK Visas & Immigration", url: "https://www.gov.uk/transit-visa", desc: "Direct Airside Transit Visa applications for UK airports" },
  { name: "Singapore ICA", url: "https://www.ica.gov.sg", desc: "Visa-Free Transit Facility and Destination Passage Visa" },
];

export default async function TransitVisaSlugPage({ params, searchParams }) {
  const { slug } = await params;
  const { nFlag, dFlag } = await searchParams;

  const parts = decodeURIComponent(slug).split("-transit-at-");
  const nationality = parts[0]?.replace(/-/g, ' ') || "Your Nationality";
  const hub = parts[1]?.replace(/-/g, ' ') || "Transit Hub";
  const natCap = cap(nationality);
  const hubCap = cap(hub);

  // Determine Schengen hubs for ATV context
  const schengenHubs = ["germany", "netherlands", "france", "belgium", "austria", "sweden", "denmark", "finland", "norway", "switzerland"];
  const isSchengen = schengenHubs.some(h => hub.toLowerCase().includes(h));
  const isUK = hub.toLowerCase().includes("united kingdom") || hub.toLowerCase().includes("uk");
  const isDubai = hub.toLowerCase().includes("united arab emirates") || hub.toLowerCase().includes("uae") || hub.toLowerCase().includes("dubai");

  const atvNote = isSchengen
    ? "Schengen Airport Transit Visa (ATV) may be required for your nationality even for airside connections."
    : isUK
    ? "UK Direct Airside Transit Visa (DATV) may be required for many nationalities — even for very short connections."
    : isDubai
    ? "UAE airside transit is visa-free for most nationalities under 24 hours. Longer stays require a transit visa."
    : "Transit visa requirements vary by nationality and layover duration. Always verify before booking.";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">

      {/* BREADCRUMB */}
      <div className="bg-white border-b border-slate-100 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-slate-400 font-medium">
          <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/visa" className="hover:text-amber-600 transition-colors">Visa Guides</Link>
          <span>›</span>
          <Link href="/visa/transit-visa" className="hover:text-amber-600 transition-colors">Transit Visa</Link>
          <span>›</span>
          <span className="text-slate-600 font-semibold">{natCap} Transit at {hubCap}</span>
        </div>
      </div>

      {/* TOP BANNER */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-10">

          {/* Visa type pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {VISA_TYPES.map((v) => (
              <Link
                key={v.label}
                href={v.href}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold border transition-all ${v.active
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
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center -space-x-3">
                  <img src={nFlag || flagUrl('in')} className="w-12 h-8 rounded shadow-md border-2 border-white z-10 object-cover" alt={natCap} />
                  <img src={dFlag || flagUrl('ae')} className="w-12 h-8 rounded shadow-md border-2 border-white z-20 object-cover" alt={hubCap} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Transit Visa Guide</p>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                    {natCap} <span className="text-amber-500">→</span> {hubCap}
                  </h1>
                </div>
              </div>
              <p className="text-sm text-slate-500 max-w-xl">
                Complete transit visa and layover guide for {natCap} passport holders connecting through {hubCap} — visa requirements, documents, time limits, and what to do at the airport.
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-xs font-bold border border-amber-200 uppercase tracking-wider">
                {isSchengen ? "Schengen ATV Rules" : isUK ? "DATV Rules" : "Transit Visa"}
              </span>
              <p className="text-[10px] text-slate-400">Updated May 2026</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ─── MAIN CONTENT ─── */}
          <div className="lg:col-span-2 space-y-8">

            {/* OVERVIEW */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Transit Overview</h2>
              <p className="text-slate-600 leading-relaxed text-sm mb-4">
                As a <strong>{natCap}</strong> passport holder transiting through <strong>{hubCap}</strong>, you need to understand whether your nationality requires a formal transit visa, Airport Transit Visa (ATV), or whether you can connect freely in the airside international zone without any additional documentation.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
                <p className="text-sm font-bold text-amber-800 mb-1">ℹ️ Hub-Specific Note</p>
                <p className="text-xs text-amber-700 leading-relaxed">{atvNote}</p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="text-xs text-slate-500 leading-relaxed italic">
                  ⚠️ Transit rules change frequently. Always verify using your airline's TIMATIC tool or the official {hubCap} immigration authority website before booking. This guide reflects information available as of May 2026. For work or business travel, see our <Link href="/visa/work-visa" className="text-amber-600 font-semibold hover:underline">Work Visa Guide →</Link> or <Link href="/visa/business-visa" className="text-amber-600 font-semibold hover:underline">Business Visa Guide →</Link>
                </p>
              </div>
            </section>

            {/* AT A GLANCE */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-6">At a Glance</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Max Airside Stay", value: "Up to 24 hrs" },
                  { label: "Landside Transit", value: "Visa Required" },
                  { label: "ATV Requirement", value: "Nationality-Dependent" },
                  { label: "Verify Via", value: "TIMATIC / Airline" },
                ].map((item) => (
                  <div key={item.label} className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                    <p className="text-base font-extrabold text-slate-900 mb-1">{item.value}</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{item.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 6-STEP GUIDE */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">6-Step Transit Guide</h2>
              <p className="text-sm text-slate-500 mb-6">Written specifically for {natCap} passport holders transiting through {hubCap}.</p>
              <div className="space-y-5">
                {TRANSIT_STEPS.map((step, index) => (
                  <div key={index} className="flex gap-5">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="pt-1 border-b border-slate-100 pb-5 flex-1 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-sm text-slate-900">{step.t}</h4>
                        <span className="text-[9px] font-bold uppercase text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full shrink-0">{step.timing}</span>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed">{step.d(natCap, hubCap)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* DOCUMENTS */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Documents to Carry at {hubCap}</h2>
              <p className="text-sm text-slate-500 mb-6">For {natCap} passport holders transiting through {hubCap}.</p>
              <div className="space-y-3">
                {DOCUMENTS.map((doc) => (
                  <div key={doc.title} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 transition-colors">
                    <span className="text-xl shrink-0 mt-0.5">{doc.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-sm text-slate-900">{doc.title}</h4>
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${doc.mandatory ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-500'}`}>
                          {doc.mandatory ? 'Required' : 'May Be Needed'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{doc.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href="/visa-resources/visa-checklist-generator"
                  className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-amber-500 transition-all"
                >
                  Download Transit Checklist for {hubCap} →
                </Link>
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-5">
                {[
                  {
                    q: `Do ${natCap} passport holders need a transit visa at ${hubCap}?`,
                    a: `Whether ${natCap} nationals require a transit visa at ${hubCap} depends on the layover duration, whether you remain airside, and bilateral agreements between your home country and ${hubCap}. Always verify via the TIMATIC tool on your airline's website or the official ${hubCap} immigration authority portal before booking flights. Requirements can change without notice.`
                  },
                  {
                    q: `Can I leave the airport during a layover in ${hubCap}?`,
                    a: `Leaving the airport in ${hubCap} — even briefly — means entering the country and requires a valid entry visa or transit permit for ${natCap} nationals. Some transit hubs offer a free or reduced-fee transit visa for short periods (e.g. Dubai 96-hr transit visa, Singapore VFTF). Confirm your eligibility before making plans to explore the city during your layover.`
                  },
                  {
                    q: `What is an Airport Transit Visa (ATV) and does ${natCap} need one?`,
                    a: `An Airport Transit Visa allows you to pass through the international transit zone of an airport in certain countries without formally entering them. ${isSchengen ? `All 27 Schengen area airports require an ATV from specific nationalities for airside connections. Check whether your ${natCap} passport is on the ATV-required list for ${hubCap} before booking.` : isUK ? `The UK requires a Direct Airside Transit Visa (DATV) from many nationalities — including some ${natCap} passport holders — even for connections under two hours. Check the UK Home Office list of nationalities requiring a DATV.` : `Check whether your ${natCap} passport is on the ${hubCap} ATV-required nationality list before booking flights.`}`
                  },
                  {
                    q: `My connecting flight is on a separate ticket — what happens at ${hubCap}?`,
                    a: `If your two flights are on separate bookings, you will almost certainly need to collect your luggage and re-check it for your next flight. This means passing through immigration at ${hubCap}, which typically requires a transit or entry visa for ${natCap} nationals. This is one of the most common causes of denied boarding. Always book connecting flights on a single itinerary where possible.`
                  },
                  {
                    q: `What happens if my layover at ${hubCap} is delayed and I overstay?`,
                    a: `If a flight delay causes you to exceed your permitted transit time, this is generally treated as an irregular situation outside your control. Notify airline staff immediately — they are typically responsible for liaising with immigration authorities in operational delay cases. If you voluntarily extend your stay beyond the permitted window, you may face fines or future entry bans. Never leave the transit area without confirming it is legally permitted.`
                  },
                ].map((item, i) => (
                  <div key={i} className="border-b border-slate-100 last:border-0 pb-5 last:pb-0">
                    <h4 className="font-bold text-sm text-slate-900 mb-2">Q: {item.q}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* OFFICIAL PORTALS */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Official Verification Portals</h2>
              <p className="text-sm text-slate-500 mb-6">Always verify transit requirements through official sources before booking flights.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TRUSTED_PORTALS.map((p) => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-amber-300 hover:shadow-sm group transition-all"
                  >
                    <div>
                      <h5 className="font-bold text-sm text-slate-900 mb-1">{p.name}</h5>
                      <p className="text-xs text-slate-500">{p.desc}</p>
                    </div>
                    <span className="text-slate-300 group-hover:text-amber-500 font-bold transition-colors text-lg shrink-0">↗</span>
                  </a>
                ))}
              </div>
            </section>

            {/* RELATED ROUTES */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Related Transit Guides</h2>
              <p className="text-sm text-slate-500 mb-6">Other popular transit routes you may find useful.</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Same Passport — Other Hubs</p>
                  <div className="space-y-2">
                    {RELATED_HUBS
                      .filter(h => h.name.toLowerCase() !== hub.toLowerCase())
                      .slice(0, 5)
                      .map((h) => {
                        const sl = `${nationality.toLowerCase()}-transit-at-${h.name.toLowerCase().replace(/\s+/g, '-')}`;
                        const df = flagUrl(h.code);
                        return (
                          <Link
                            key={h.code}
                            href={`/visa/transit-visa/${sl}?nFlag=${encodeURIComponent(nFlag || '')}&dFlag=${encodeURIComponent(df)}`}
                            className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl hover:border-amber-300 hover:shadow-sm group transition-all"
                          >
                            <img src={df} className="w-7 h-5 rounded object-cover shadow-sm" alt={h.name} />
                            <span className="text-xs font-bold text-slate-700">{natCap} → {h.airport}</span>
                            <span className="ml-auto text-slate-300 group-hover:text-amber-500 font-bold">›</span>
                          </Link>
                        );
                      })}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Same Hub — Other Nationalities</p>
                  <div className="space-y-2">
                    {RELATED_NATIONALITIES
                      .filter(n => n.name.toLowerCase() !== natCap.toLowerCase())
                      .slice(0, 5)
                      .map((nat) => {
                        const sl = `${nat.name.toLowerCase()}-transit-at-${hub.toLowerCase().replace(/\s+/g, '-')}`;
                        const nf = flagUrl(nat.code);
                        return (
                          <Link
                            key={nat.code}
                            href={`/visa/transit-visa/${sl}?nFlag=${encodeURIComponent(nf)}&dFlag=${encodeURIComponent(dFlag || '')}`}
                            className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl hover:border-amber-300 hover:shadow-sm group transition-all"
                          >
                            <img src={nf} className="w-7 h-5 rounded object-cover shadow-sm" alt={nat.name} />
                            <span className="text-xs font-bold text-slate-700">{nat.name} → {hubCap}</span>
                            <span className="ml-auto text-slate-300 group-hover:text-amber-500 font-bold">›</span>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </div>
            </section>

            {/* OTHER VISA TYPES */}
            <section className="bg-amber-400 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Explore Other Visa Types</h2>
              <p className="text-sm text-amber-900 mb-6">Just passing through? Or planning a longer stay? Find the right visa category.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Business Visa", desc: "Meetings & conferences", href: "/visa/business-visa", icon: "💼" },
                  { label: "Work Visa", desc: "Employment & sponsorship", href: "/visa/work-visa", icon: "🏢" },
                  { label: "Student Visa", desc: "Study & university", href: "/visa/student-visa", icon: "🎓" },
                  { label: "Tourist Visa", desc: "Leisure & tourism", href: "/visa/tourist-visa", icon: "🌴" },
                ].map((v) => (
                  <Link
                    key={v.label}
                    href={v.href}
                    className="bg-white rounded-xl p-4 hover:shadow-md transition-all group"
                  >
                    <span className="text-2xl block mb-2">{v.icon}</span>
                    <p className="font-bold text-sm text-slate-900 group-hover:text-amber-700 transition-colors">{v.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{v.desc}</p>
                  </Link>
                ))}
              </div>
            </section>

          </div>

          {/* ─── SIDEBAR ─── */}
          <aside className="space-y-5">
            <div className="bg-slate-900 rounded-2xl p-7 text-white sticky top-10">
              <h3 className="text-lg font-bold mb-2">Get Your Transit Checklist</h3>
              <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                Personalised document checklist for {natCap} passport holders transiting through {hubCap}. Free download.
              </p>
              <Link
                href="/visa-resources/visa-checklist-generator"
                className="block w-full bg-amber-400 hover:bg-amber-300 text-slate-900 text-center py-3.5 rounded-xl font-bold transition-all text-sm"
              >
                Download Checklist (PDF)
              </Link>

              <div className="mt-6 border-t border-slate-800 pt-5 space-y-3">
                {[
                  { label: "Max Airside Stay", value: "Up to 24 hrs" },
                  { label: "Landside Transit", value: "Visa Required" },
                  { label: "ATV Requirement", value: "Check Nationality" },
                  { label: "Separate Tickets", value: "Visa Likely Needed" },
                  { label: "Verify Via", value: "TIMATIC / Airline" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-xs">
                    <span className="text-slate-500">{row.label}</span>
                    <span className="text-slate-200 font-bold text-right max-w-[55%]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Other visa types */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Other Visa Types</h3>
              <div className="space-y-2">
                {[
                  { label: "Business Visa Guides", href: "/visa/business-visa", icon: "💼" },
                  { label: "Work Visa Guides", href: "/visa/work-visa", icon: "🏢" },
                  { label: "Student Visa Guides", href: "/visa/student-visa", icon: "🎓" },
                  { label: "Tourist Visa Guides", href: "/visa/tourist-visa", icon: "🌴" },
                ].map((v) => (
                  <Link
                    key={v.label}
                    href={v.href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 hover:border-amber-200 border border-transparent transition-all"
                  >
                    <span className="text-lg">{v.icon}</span>
                    <span className="text-sm font-semibold text-slate-700 hover:text-amber-700">{v.label}</span>
                    <span className="ml-auto text-slate-300 text-sm">›</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* TIMATIC warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-amber-900 mb-2">⚠️ Always Verify Before Booking</h3>
              <p className="text-xs text-amber-800 leading-relaxed mb-3">
                Transit visa rules change frequently. Always check via your airline's TIMATIC tool or the official immigration authority before purchasing flights.
              </p>
              <a
                href="https://www.iatatravelcentre.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-amber-700 hover:underline underline-offset-4"
              >
                Open TIMATIC →
              </a>
            </div>

            {/* Resources */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-2">🔧 Visa Resources</h3>
              <div className="space-y-2">
                {[
                  { label: "Visa Checklist Generator", href: "/visa-resources/visa-checklist-generator" },
                  { label: "Embassy Directory", href: "/visa-resources/embassy-directory" },
                  { label: "Processing Time Tracker", href: "/visa-resources/processing-times" },
                  { label: "Transit Hub Directory", href: "/visa-resources/transit-hubs" },
                  { label: "TIMATIC Visa Checker", href: "https://www.iatatravelcentre.com" },
                ].map((r) => (
                  <Link key={r.label} href={r.href} className="block text-xs font-semibold text-slate-500 hover:text-amber-600 hover:underline underline-offset-4 py-1 transition-colors">
                    {r.label} →
                  </Link>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>

      {/* BOTTOM SEARCH CTA */}
      <div className="max-w-6xl mx-auto px-6 mt-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Search Another Route</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-3">Need a Different Transit Guide?</h3>
          <p className="text-sm text-slate-500 mb-6">Check transit visa rules for any nationality and hub combination instantly.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/visa/transit-visa"
              className="inline-block bg-amber-400 text-slate-900 px-10 py-4 rounded-xl font-bold hover:bg-amber-500 transition-all shadow-lg shadow-amber-100 text-sm"
            >
              Search Transit Visa Requirements →
            </Link>
            <Link
              href="/visa/work-visa"
              className="inline-block bg-white text-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all border border-slate-200 text-sm"
            >
              Work Visa Guides →
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}