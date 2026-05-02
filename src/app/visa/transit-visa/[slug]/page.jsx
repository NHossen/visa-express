import React from 'react';
import Link from 'next/link';

const cap = (str) => str.replace(/\b\w/g, (l) => l.toUpperCase());
const flagUrl = (name) =>
  `https://flagcdn.com/w80/${name.toLowerCase().replace(/\s+/g, '-')}.png`;

const RELATED_NATIONALITIES = [
  { name: "Indian", code: "in" },
  { name: "Filipino", code: "ph" },
  { name: "Pakistani", code: "pk" },
  { name: "Bangladeshi", code: "bd" },
  { name: "Nigerian", code: "ng" },
  { name: "Kenyan", code: "ke" },
  { name: "Sri Lankan", code: "lk" },
  { name: "Nepali", code: "np" },
];

const RELATED_HUBS = [
  { name: "United Arab Emirates", code: "ae", airport: "Dubai DXB" },
  { name: "Turkey", code: "tr", airport: "Istanbul IST" },
  { name: "Singapore", code: "sg", airport: "Singapore SIN" },
  { name: "United Kingdom", code: "gb", airport: "London LHR" },
  { name: "Germany", code: "de", airport: "Frankfurt FRA" },
  { name: "Qatar", code: "qa", airport: "Doha DOH" },
  { name: "Netherlands", code: "nl", airport: "Amsterdam AMS" },
  { name: "Hong Kong", code: "hk", airport: "Hong Kong HKG" },
];

const TRANSIT_STEPS = [
  {
    num: "01",
    title: "Check If You Need a Transit Visa",
    duration: "Before booking",
    content: (nat, hub) =>
      `Before purchasing any flights, ${nat} passport holders must verify whether a transit visa is required at ${hub}. This depends on your specific passport, the airport, the duration of your layover, and whether you intend to stay airside (inside the international zone) or landside (clearing immigration to enter the country). Use the official ${hub} immigration authority website or your airline's TIMATIC database to confirm requirements specific to your nationality.`,
  },
  {
    num: "02",
    title: "Understand Airside vs Landside",
    duration: "Before travel",
    content: (nat, hub) =>
      `Airside transit means you remain in the international departure zone of ${hub} airport at all times — you do not pass through immigration or customs. Most ${nat} travellers on short connections can transit airside without a visa if they stay under 24 hours. Landside transit — for example, if your bags are not checked through, or you need to stay overnight in a hotel outside the airport — typically requires a transit visa or entry permit for ${hub}.`,
  },
  {
    num: "03",
    title: "Confirm Your Baggage Arrangement",
    duration: "At check-in",
    content: (nat, hub) =>
      `One of the most common reasons travellers need to enter ${hub} during a layover is because their bags are not checked through to their final destination. If your two flights are on separate bookings, you will almost certainly need to collect your luggage, re-check it, and pass through immigration in ${hub} — which requires a transit visa or entry permit. Book your full journey on a single itinerary wherever possible to avoid this.`,
  },
  {
    num: "04",
    title: "Apply for Transit Visa If Required",
    duration: "4–6 weeks before travel",
    content: (nat, hub) =>
      `If your nationality requires a transit visa for ${hub}, apply as early as possible — ideally 4–6 weeks before your travel date. Many countries offer online e-visa applications for transit purposes. You will typically need your confirmed flight itinerary, valid passport, passport-size photograph, and a visa or entry authorisation for your final destination. Check whether ${hub} offers a visa on arrival or e-visa option for your nationality before visiting an embassy.`,
  },
  {
    num: "05",
    title: "Prepare Required Documents",
    duration: "Before departure",
    content: (nat, hub) =>
      `Carry printed and digital copies of your complete flight itinerary, confirmed onward ticket, valid visa for your final destination, and your ${nat} passport. At ${hub} immigration or airline check-in, you may be asked to show all of these. Some airports also require proof of sufficient funds. Keep your documents organised and accessible — rummaging through bags at a busy transit desk causes unnecessary delays.`,
  },
  {
    num: "06",
    title: "Know Your Time Limits",
    duration: "At the airport",
    content: (nat, hub) =>
      `Every transit arrangement at ${hub} has a time limit. Airside transit is typically limited to 24 hours. Landside transit or transit visas may allow 48–96 hours. Overstaying your permitted transit period — even by a few hours — can result in fines, detention, or a ban from re-entering ${hub}. Set reminders for your departure time and do not assume your original flight delay creates extra permitted time automatically.`,
  },
];

const FAQ = (nat, hub) => [
  {
    q: `Do ${nat} passport holders need a transit visa at ${hub}?`,
    a: `Whether ${nat} nationals require a transit visa at ${hub} depends on the duration of the layover, whether you remain airside or enter the country, and specific bilateral agreements between ${nat} and ${hub}. Always verify using the TIMATIC tool on your airline's website or the official ${hub} immigration authority portal before booking. Requirements can change without notice.`,
  },
  {
    q: `Can I leave the airport during a layover in ${hub}?`,
    a: `Leaving the airport in ${hub} — even briefly — means entering the country and requires a valid entry visa or transit permit for ${nat} nationals. Some transit hubs offer a free or reduced-fee transit visa for short periods (e.g. Dubai 96-hr transit visa, Singapore VFTF). Confirm eligibility before making plans to explore the city during your layover.`,
  },
  {
    q: `What is an Airport Transit Visa (ATV) and does ${nat} need one?`,
    a: `An Airport Transit Visa (ATV) is a visa that allows you to pass through the international transit zone of an airport in certain countries without formally entering them. The EU Schengen area, the UK, and several other countries require an ATV from specific nationalities — including some ${nat} passport holders — even for connections under a few hours. Check the specific country's list of ATV-required nationalities.`,
  },
  {
    q: `My connecting flight is on a separate ticket — what happens in ${hub}?`,
    a: `If your two flights are on separate bookings, you will almost certainly need to collect your luggage and re-check it for your next flight. This means passing through immigration in ${hub}, which typically requires a transit or entry visa for ${nat} nationals. This is one of the most common causes of denied boarding. Always book connecting flights on a single itinerary where possible, or ensure you have the correct visa before buying separate tickets.`,
  },
  {
    q: `What happens if my layover in ${hub} is delayed and I overstay?`,
    a: `If a flight delay causes you to exceed your permitted transit time in ${hub}, this is generally treated as an irregular situation outside your control. Notify airline staff immediately — they are typically responsible for liaising with immigration authorities in cases of operational delays. However, if you chose to extend your stay voluntarily beyond the permitted period, you may face penalties. Never leave the transit area without confirming it is legally permitted first.`,
  },
];

export default async function TransitSlugPage({ params, searchParams }) {
  const { slug } = await params;
  const { nFlag, dFlag } = await searchParams;

  const parts = decodeURIComponent(slug).split("-transit-at-");
  const nationality = cap(parts[0]?.replace(/-/g, ' ') || "Your Nationality");
  const hub = cap(parts[1]?.replace(/-/g, ' ') || "Transit Hub");

  return (
    <div className="min-h-screen bg-white text-black font-sans">

      {/* BREADCRUMB */}
      <div className="border-b border-gray-100 px-6 py-3 bg-gray-50">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[10px] font-bold uppercase text-gray-400">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link href="/visa/transit-visa" className="hover:text-black transition-colors">Transit Visa</Link>
          <span>/</span>
          <span className="text-black">{nationality} Transit at {hub}</span>
        </div>
      </div>

      {/* HERO */}
      <header className="border-b-8 border-black py-14 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">

            <div className="flex-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-yellow-500 mb-4">
                Transit Visa Guide — Updated May 2026
              </p>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex -space-x-3">
                  <img
                    src={nFlag || ''}
                    className="w-14 h-10 border-2 border-black z-10 object-cover"
                    alt={`${nationality} passport`}
                  />
                  <img
                    src={dFlag || ''}
                    className="w-14 h-10 border-2 border-black z-20 object-cover"
                    alt={`${hub} airport`}
                  />
                </div>
                <span className="font-black text-3xl text-yellow-400">→</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-5">
                {nationality}<br />
                <span className="text-yellow-400">Transit</span><br />
                at {hub}
              </h1>

              <p className="text-lg text-gray-600 font-medium max-w-xl leading-relaxed">
                Complete transit visa and layover guide for {nationality} passport holders
                connecting through {hub} — visa requirements, documents, time limits, and what to do at the airport.
              </p>

              <div className="grid grid-cols-3 gap-4 mt-8 max-w-lg">
                {[
                  { label: "Guide Status", value: "Active 2026" },
                  { label: "Stages Covered", value: "6 Steps" },
                  { label: "Layover Types", value: "Air & Land" },
                ].map((s) => (
                  <div key={s.label} className="border-2 border-black p-3 text-center">
                    <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest mb-1">{s.label}</p>
                    <p className="font-black text-sm uppercase">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:w-80">
              <div className="border-4 border-black p-7 bg-black text-white shadow-[10px_10px_0px_0px_rgba(250,204,21,1)]">
                <p className="text-[9px] font-black uppercase tracking-widest text-yellow-400 mb-2">Start Here</p>
                <h3 className="font-black text-xl uppercase italic mb-2">Get the Checklist</h3>
                <p className="text-xs text-gray-400 leading-relaxed mb-6">
                  Download the {nationality} → {hub} transit document checklist to prepare your documents.
                </p>
                <Link
                  href="/visa-resources/visa-checklist-generator"
                  className="block w-full bg-yellow-400 text-black text-center py-4 font-black uppercase text-xs tracking-widest hover:bg-white transition-all border-2 border-yellow-400 mb-3"
                >
                  Download Checklist →
                </Link>
                <Link
                  href="/visa/transit-visa"
                  className="block w-full text-center py-3 font-black uppercase text-xs tracking-widest border border-gray-700 text-yellow-400 hover:text-white transition-all"
                >
                  Search Another Route
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ANCHOR BAR */}
      <section className="border-b-4 border-black py-5 px-6 bg-yellow-400">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-x-8 gap-y-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-black">On This Page:</span>
          {[
            ["#overview", "Overview"],
            ["#transit-steps", "6-Step Guide"],
            ["#documents", "Documents"],
            ["#faq", "FAQ"],
            ["#related-guides", "Related Guides"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="text-[10px] font-black uppercase tracking-widest text-black hover:underline underline-offset-4">
              {label}
            </a>
          ))}
        </div>
      </section>

      {/* MAIN GRID */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* MAIN COLUMN */}
          <main className="lg:col-span-8 space-y-20">

            {/* OVERVIEW */}
            <section id="overview">
              <h2 className="text-3xl font-black uppercase italic mb-6 border-l-8 border-yellow-400 pl-6">
                {nationality} Transit at {hub} — Overview
              </h2>
              <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
                <p>
                  As a <strong>{nationality}</strong> passport holder transiting through <strong>{hub}</strong>, you need to understand whether your nationality requires a formal transit visa, airport transit visa (ATV), or whether you can connect freely in the airside international zone.
                </p>
                <p>
                  Transit rules at {hub} depend on three main factors: how long your layover is, whether your bags are checked through to your final destination, and whether you intend to leave the airport. Most {nationality} travellers on short airside connections of under 24 hours do not require a transit visa at {hub}, but this varies — always confirm before travel.
                </p>
                <p>
                  If your connection exceeds 24 hours, or if you need to leave the airport (for example, to stay in a hotel overnight), you will typically need a transit visa or a valid {hub} entry visa. Some hubs like Dubai, Qatar, and Singapore offer free or low-cost transit visas for eligible nationalities.
                </p>
              </div>

              <div className="mt-8 border-2 border-black bg-yellow-50 p-6">
                <p className="text-[10px] font-black uppercase tracking-widest text-yellow-600 mb-2">
                  ⚠ Always Verify Before Travel
                </p>
                <p className="text-sm font-bold text-gray-800">
                  Transit visa requirements change frequently. Always confirm your specific requirements using your airline's TIMATIC system or the official {hub} immigration authority website before booking flights.
                </p>
              </div>
            </section>

            {/* 6-STEP GUIDE */}
            <section id="transit-steps">
              <h2 className="text-3xl font-black uppercase italic mb-2 border-l-8 border-yellow-400 pl-6">
                6-Step Transit Guide
              </h2>
              <p className="text-sm text-gray-500 mb-10 font-medium">
                Written specifically for {nationality} passport holders transiting through {hub}.
              </p>
              <div className="space-y-6">
                {TRANSIT_STEPS.map((step) => (
                  <div key={step.num} className="border-2 border-black">
                    <div className="bg-black text-white p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <span className="text-yellow-400 font-black text-sm">{step.num}</span>
                        <h3 className="font-black text-sm uppercase">{step.title}</h3>
                      </div>
                      <span className="text-[9px] font-black text-gray-400 uppercase hidden md:block">
                        ⏱ {step.duration}
                      </span>
                    </div>
                    <div className="p-6 bg-white">
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {step.content(nationality, hub)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* DOCUMENTS */}
            <section id="documents">
              <h2 className="text-3xl font-black uppercase italic mb-2 border-l-8 border-yellow-400 pl-6">
                Documents to Carry at {hub}
              </h2>
              <p className="text-sm text-gray-500 mb-8 font-medium">
                {nationality} passport holders should have these documents ready at {hub} transit.
              </p>
              <div className="border-4 border-black bg-black text-white p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    {
                      title: "Valid Passport",
                      detail: `${nationality} passport valid for at least 6 months beyond your final destination arrival date.`,
                      req: true,
                    },
                    {
                      title: "Full Flight Itinerary",
                      detail: `Printed or digital copy of all flights including your connection through ${hub} and your onward booking.`,
                      req: true,
                    },
                    {
                      title: "Visa for Final Destination",
                      detail: "Valid visa or entry authorisation for the country you are ultimately travelling to.",
                      req: true,
                    },
                    {
                      title: "Transit Visa for Hub (if required)",
                      detail: `Airport Transit Visa or transit permit for ${hub} if your ${nationality} passport requires one.`,
                      req: false,
                    },
                    {
                      title: "Confirmed Return or Onward Ticket",
                      detail: "Some transit hubs ask for proof that you will be leaving their territory on a confirmed booking.",
                      req: true,
                    },
                    {
                      title: "Proof of Funds",
                      detail: `Bank statement or cash evidence showing you can cover your stay in ${hub} if asked by immigration.`,
                      req: false,
                    },
                  ].map((doc) => (
                    <div key={doc.title} className="border-b border-gray-700 pb-4 last:border-b-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[8px] font-black uppercase px-2 py-0.5 ${doc.req ? 'bg-yellow-400 text-black' : 'bg-gray-700 text-gray-300'}`}>
                          {doc.req ? 'Mandatory' : 'May Be Required'}
                        </span>
                      </div>
                      <h5 className="font-black text-sm uppercase text-white mb-1">{doc.title}</h5>
                      <p className="text-[11px] text-gray-400 leading-relaxed">{doc.detail}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-center">
                  <Link
                    href="/visa-resources/visa-checklist-generator"
                    className="inline-block border-2 border-yellow-400 text-yellow-400 px-8 py-3 font-black uppercase text-xs tracking-widest hover:bg-yellow-400 hover:text-black transition-all"
                  >
                    Download as PDF Checklist →
                  </Link>
                </div>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq">
              <h2 className="text-3xl font-black uppercase italic mb-8 border-l-8 border-yellow-400 pl-6">
                Frequently Asked Questions — {nationality} at {hub}
              </h2>
              <div className="space-y-4">
                {FAQ(nationality, hub).map((item) => (
                  <details key={item.q} className="border-2 border-black group">
                    <summary className="p-5 font-black uppercase text-sm cursor-pointer select-none list-none flex items-center justify-between hover:bg-gray-50">
                      {item.q}
                      <span className="text-gray-400 group-open:rotate-180 transition-transform text-lg font-black shrink-0 ml-4">↓</span>
                    </summary>
                    <div className="border-t-2 border-black bg-gray-50 p-5">
                      <p className="text-sm text-gray-700 leading-relaxed">{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* WORK VISA LINK */}
            <div className="border-4 border-black bg-yellow-400 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest mb-1">Also on WorkPass.Guide</p>
                <h4 className="font-black text-xl uppercase">Need a Work Permit Too?</h4>
                <p className="text-sm mt-1 text-black/70">
                  Full work visa guides for {nationality} nationals across 40+ destination countries.
                </p>
              </div>
              <Link
                href="/visa/work-visa"
                className="shrink-0 bg-black text-white px-8 py-4 font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all border-2 border-black"
              >
                Work Visa Guides →
              </Link>
            </div>

          </main>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">

              <div className="border-4 border-black p-7 shadow-[8px_8px_0px_0px_rgba(250,204,21,1)]">
                <p className="text-[9px] font-black uppercase tracking-widest text-yellow-500 mb-1">Checklist</p>
                <h3 className="font-black text-lg uppercase italic mb-2">{nationality} Transit at {hub}</h3>
                <p className="text-xs text-gray-500 mb-5">
                  Personalised document list for your specific transit route.
                </p>
                <Link
                  href="/visa-resources/visa-checklist-generator"
                  className="block w-full bg-black text-white text-center py-4 font-black uppercase text-xs tracking-widest hover:bg-yellow-400 hover:text-black transition-all border-2 border-black mb-3"
                >
                  Download Checklist
                </Link>
                <Link
                  href="/visa/transit-visa"
                  className="block w-full text-center py-3 font-black uppercase text-xs tracking-widest border-2 border-gray-200 hover:border-black transition-all"
                >
                  Search Another Route
                </Link>
              </div>

              <div className="border-2 border-black p-6">
                <h4 className="font-black uppercase text-sm mb-5 border-b-2 border-black pb-3">
                  Quick Facts — {hub}
                </h4>
                <div className="space-y-4">
                  {[
                    { label: "Transit Type", value: "Airside & Landside" },
                    { label: "ATV May Be Required", value: "Nationality-Dependent" },
                    { label: "Max Airside Stay", value: "Typically 24 Hours" },
                    { label: "Exit Allowed", value: "Requires Transit Visa" },
                    { label: "Verify Via", value: "TIMATIC / Airline" },
                    { label: "Official Portal", value: `${hub} Immigration` },
                  ].map((f) => (
                    <div key={f.label} className="flex flex-col">
                      <span className="text-[9px] font-black uppercase text-gray-400 tracking-widest">{f.label}</span>
                      <span className="text-sm font-black">{f.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-2 border-black p-6">
                <h4 className="font-black uppercase text-xs mb-4 text-gray-400 tracking-widest">On This Page</h4>
                <div className="space-y-2">
                  {[
                    ["#overview", "Overview"],
                    ["#transit-steps", "6-Step Transit Guide"],
                    ["#documents", "Required Documents"],
                    ["#faq", "FAQ"],
                    ["#related-guides", "Related Guides"],
                  ].map(([href, label]) => (
                    <a
                      key={href}
                      href={href}
                      className="block text-xs font-bold uppercase text-gray-500 hover:text-black border-l-2 border-transparent hover:border-yellow-400 pl-2 transition-all"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              </div>

            </div>
          </aside>
        </div>
      </div>

      {/* RELATED GUIDES */}
      <section className="border-t-8 border-black py-20 px-6 bg-gray-50" id="related-guides">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Same nationality, other hubs */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-yellow-500 mb-3">Same Passport</p>
              <h3 className="text-2xl font-black uppercase mb-8">
                Other {nationality} Transit Guides
              </h3>
              <div className="space-y-3">
                {RELATED_HUBS
                  .filter((h) => h.name.toLowerCase() !== hub.toLowerCase())
                  .slice(0, 6)
                  .map((h) => {
                    const slugLink = `${nationality.toLowerCase()}-transit-at-${h.name.toLowerCase()}`.replace(/\s+/g, '-');
                    const nFlagLink = nFlag || '';
                    const dFlagLink = flagUrl(h.code);
                    return (
                      <Link
                        key={h.code}
                        href={`/visa/transit-visa/${slugLink}?nFlag=${encodeURIComponent(nFlagLink)}&dFlag=${encodeURIComponent(dFlagLink)}`}
                        className="flex items-center gap-4 border-2 border-black p-4 hover:bg-yellow-400 group transition-all"
                      >
                        <img src={dFlagLink} className="w-10 h-7 object-cover border border-black" alt={h.name} />
                        <div className="flex-1">
                          <p className="font-black text-sm uppercase">{nationality} Transit at {h.airport}</p>
                          <p className="text-[10px] text-gray-500 group-hover:text-black font-bold uppercase">Transit Guide →</p>
                        </div>
                        <span className="text-gray-200 group-hover:text-black font-black text-xl">›</span>
                      </Link>
                    );
                  })}
              </div>
            </div>

            {/* Same hub, other nationalities */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-yellow-500 mb-3">Same Hub</p>
              <h3 className="text-2xl font-black uppercase mb-8">
                Other Nationalities Transiting {hub}
              </h3>
              <div className="space-y-3">
                {RELATED_NATIONALITIES
                  .filter((n) => n.name.toLowerCase() !== nationality.toLowerCase())
                  .slice(0, 6)
                  .map((nat) => {
                    const slugLink = `${nat.name.toLowerCase()}-transit-at-${hub.toLowerCase()}`.replace(/\s+/g, '-');
                    const nFlagLink = flagUrl(nat.code);
                    const dFlagLink = dFlag || '';
                    return (
                      <Link
                        key={nat.code}
                        href={`/visa/transit-visa/${slugLink}?nFlag=${encodeURIComponent(nFlagLink)}&dFlag=${encodeURIComponent(dFlagLink)}`}
                        className="flex items-center gap-4 border-2 border-black p-4 hover:bg-yellow-400 group transition-all"
                      >
                        <img src={nFlagLink} className="w-10 h-7 object-cover border border-black" alt={nat.name} />
                        <div className="flex-1">
                          <p className="font-black text-sm uppercase">{nat.name} Transit at {hub}</p>
                          <p className="text-[10px] text-gray-500 group-hover:text-black font-bold uppercase">Transit Guide →</p>
                        </div>
                        <span className="text-gray-200 group-hover:text-black font-black text-xl">›</span>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Cross-link to Work Visa */}
          <div className="mt-16 border-4 border-black p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-white">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">Explore More Guides</p>
              <h4 className="font-black text-2xl uppercase">
                {nationality} Work Visa Guides
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                Step-by-step work permit guides for {nationality} nationals in Canada, UAE, UK, Germany, and more.
              </p>
            </div>
            <Link
              href="/visa/work-visa"
              className="shrink-0 bg-yellow-400 text-black px-10 py-4 font-black uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all border-2 border-black"
            >
              Work Visa Guides →
            </Link>
          </div>
        </div>
      </section>



    </div>
  );
}