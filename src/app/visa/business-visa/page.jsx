"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const POPULAR_ROUTES = [
  { from: "India", to: "United States", fromCode: "in", toCode: "us" },
  { from: "China", to: "United Kingdom", fromCode: "cn", toCode: "gb" },
  { from: "Nigeria", to: "Germany", fromCode: "ng", toCode: "de" },
  { from: "Pakistan", to: "UAE", fromCode: "pk", toCode: "ae" },
  { from: "Bangladesh", to: "Singapore", fromCode: "bd", toCode: "sg" },
  { from: "Brazil", to: "France", fromCode: "br", toCode: "fr" },
];

const TOP_DESTINATIONS = [
  { name: "United States", code: "us", visa: "B-1 Business Visa", processing: "3–5 weeks", note: "Interview required at embassy" },
  { name: "United Kingdom", code: "gb", visa: "Standard Visitor Visa", processing: "3 weeks", note: "Covers meetings & conferences" },
  { name: "Germany", code: "de", visa: "Schengen Business Visa", processing: "10–15 days", note: "Covers all 27 Schengen states" },
  { name: "UAE", code: "ae", visa: "Visit / Business Visa", processing: "3–5 days", note: "Visa on arrival for many nationalities" },
  { name: "Singapore", code: "sg", visa: "Short-Term Visit Pass", processing: "3–10 days", note: "Visa-free for many nationalities" },
  { name: "Canada", code: "ca", visa: "Temporary Resident Visa", processing: "2–8 weeks", note: "ETA available for visa-exempt" },
  { name: "France", code: "fr", visa: "Schengen Business Visa", processing: "10–15 days", note: "Via French consulate or VFS" },
  { name: "Japan", code: "jp", visa: "Short-Stay Business Visa", processing: "5–7 days", note: "Invitation letter from Japanese company required" },
];

const STEPS = [
  { num: "01", title: "Confirm Permitted Activities", desc: "Business visas cover meetings, negotiations, conferences, and trade fairs — not employment. Confirm your planned activities fall within permitted scope before applying.", icon: "🔍" },
  { num: "02", title: "Obtain Invitation Letter", desc: "Your host company in the destination country issues a formal invitation letter on company letterhead, confirming dates, purpose, and that they will host you.", icon: "✉" },
  { num: "03", title: "Prepare Company Documentation", desc: "Gather your employer's cover letter, business registration, and proof of your position. Your company confirms the purpose and covers responsibility for your trip.", icon: "🏢" },
  { num: "04", title: "Book Appointment & Submit", desc: "Schedule a visa appointment at the embassy or VFS Global centre. Submit all documents, pay fees, and provide biometric data (fingerprints and photo).", icon: "📋" },
  { num: "05", title: "Await Decision & Travel", desc: "Processing typically takes 5–15 business days. Once approved, check visa validity, entry conditions, and permitted length of stay before booking flights.", icon: "✈" },
];

const DOCUMENTS = [
  { title: "Valid Passport", detail: "Minimum 6 months validity. At least 2 blank pages for visa stamps.", mandatory: true },
  { title: "Invitation Letter from Host Company", detail: "On company letterhead, signed by a director. Must include meeting dates, purpose, and host company details.", mandatory: true },
  { title: "Employer Cover Letter", detail: "From your company stating your position, purpose of travel, and that they financially guarantee your trip.", mandatory: true },
  { title: "Company Registration Documents", detail: "Proof that your employer is a registered, operating business — trade licence or company certificate.", mandatory: false },
  { title: "Bank Statements (3–6 months)", detail: "Personal or company statements showing sufficient funds to cover the trip independently.", mandatory: true },
  { title: "Travel Insurance", detail: "Medical coverage valid for the full duration of your stay. Minimum €30,000 cover required for Schengen.", mandatory: true },
  { title: "Hotel / Accommodation Booking", detail: "Confirmed hotel reservations for the full duration of your business trip.", mandatory: true },
  { title: "Return Flight Confirmation", detail: "Confirmed return booking showing you intend to leave before your visa expires.", mandatory: true },
  { title: "Visa Application Form", detail: "Completed and signed. Country-specific — download from the official embassy website only.", mandatory: true },
  { title: "Passport-Size Photographs", detail: "Usually 2 recent photos against a white background. Check exact specifications per destination.", mandatory: true },
  { title: "Business Card or Professional Profile", detail: "Supporting evidence of your role and professional standing. LinkedIn printout is accepted by some embassies.", mandatory: false },
  { title: "Previous Visa History", detail: "Prior visas to the destination or similar countries strengthen your application and demonstrate travel history.", mandatory: false },
];

const EMAIL_TEMPLATE = `Subject: Business Visit Invitation — [Your Full Name] — [Dates]

Dear [Consulate / Visa Officer],

I am writing to confirm that [Your Full Name], [Job Title] at [Your Company], has been formally invited to visit [Host Company Name] in [Destination Country] from [Start Date] to [End Date].

The purpose of the visit is [specific business activity: e.g. attending the annual trade conference / contract negotiation / supplier site visit]. All accommodation and travel costs will be covered by [Your Company / Host Company].

[Your Full Name] holds a valid passport and will return to [Home Country] upon conclusion of the scheduled meetings. A formal invitation letter on company letterhead is enclosed with this application.

We kindly request that this business visa application be processed at the earliest convenience.

Yours sincerely,
[Authorised Signatory]
[Company Name] | [Job Title]
[Company Address] | [Phone]`;

const flagUrl = (code) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

// Auto-suggest search component
function CountrySearch({ label, stepNum, value, onChange, countries, placeholder }) {
  const [query, setQuery] = useState(value?.name || '');
  const [open, setOpen] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const ref = useRef(null);

  const filtered = query.length > 0
    ? countries.filter(c => c.country.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  useEffect(() => {
    if (value?.name) setQuery(value.name);
  }, [value?.name]);

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

export default function BusinessVisaSearch() {
  const [countries, setCountries] = useState([]);
  const [nationality, setNationality] = useState(null);
  const [destination, setDestination] = useState(null);
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/countries')
      .then((r) => r.json())
      .then((d) => {
        setCountries(d);
        // Default: India → Germany
        const india = d.find(c => c.country === 'India');
        const germany = d.find(c => c.country === 'Germany');
        if (india) setNationality({ name: india.country, flag: india.flag, code: india.code });
        if (germany) setDestination({ name: germany.country, flag: germany.flag, code: germany.code });
      })
      .catch((e) => console.error(e));
  }, []);

  const handleSearch = () => {
    if (nationality?.name && destination?.name) {
      const slug = `${nationality.name.toLowerCase()}-to-${destination.name.toLowerCase()}`.replace(/\s+/g, '-');
      const nFlag = encodeURIComponent(nationality.flag);
      const dFlag = encodeURIComponent(destination.flag);
      router.push(`/visa/business-visa/${slug}?nFlag=${nFlag}&dFlag=${dFlag}`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(EMAIL_TEMPLATE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">

      {/* HERO */}
      <header className="border-b border-slate-100 py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-500 mb-4">
            Free Business Visa Guide — Updated May 2026
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-5 text-slate-900">
            Business Visa<br />
            <span className="text-amber-500">Requirements</span> by<br />
            Nationality
          </h1>
          <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
            Step-by-step business visa guides covering permitted activities, required documents,
            invitation letter templates, and official portals — for every nationality.
          </p>

          {/* Quick visa type nav */}
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { label: "Business Visa", href: "/visa/business-visa", active: true },
              { label: "Work Visa", href: "/visa/work-visa" },
              { label: "Student Visa", href: "/visa/student-visa" },
              { label: "Tourist Visa", href: "/visa/tourist-visa" },
              { label: "Transit Visa", href: "/visa/transit-visa" },
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
            Search Business Visa Requirements
          </p>
          <p className="text-center text-sm text-slate-500 mb-8">Select your passport nationality and destination to get a personalised guide</p>

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
                label="Destination Country"
                stepNum="2"
                value={destination}
                onChange={setDestination}
                countries={countries}
                placeholder="Type destination…"
              />
            </div>

            {/* Preview strip */}
            {nationality && destination && (
              <div className="mt-6 flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl px-5 py-3">
                <img src={nationality.flag} className="w-7 h-5 rounded object-cover shadow-sm" alt={nationality.name} />
                <span className="text-sm font-semibold text-slate-700">{nationality.name}</span>
                <span className="text-amber-400 font-black">→</span>
                <img src={destination.flag} className="w-7 h-5 rounded object-cover shadow-sm" alt={destination.name} />
                <span className="text-sm font-semibold text-slate-700">{destination.name}</span>
                <span className="ml-auto text-[10px] font-bold text-amber-600 uppercase tracking-widest">Business Visa Guide Ready</span>
              </div>
            )}

            <button
              onClick={handleSearch}
              disabled={!nationality?.name || !destination?.name}
              className="w-full mt-6 bg-amber-400 text-slate-900 rounded-xl py-4 font-bold text-base hover:bg-amber-500 transition-all shadow-lg shadow-amber-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {nationality?.name && destination?.name
                ? `Get ${nationality.name} → ${destination.name} Business Visa Guide →`
                : "Check Business Visa Requirements →"
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
            <h2 className="text-3xl font-extrabold tracking-tight">Popular Business Visa Routes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_ROUTES.map((r) => {
              const slug = `${r.from.toLowerCase()}-to-${r.to.toLowerCase()}`.replace(/\s+/g, '-');
              const nf = flagUrl(r.fromCode);
              const df = flagUrl(r.toCode);
              return (
                <Link
                  key={slug}
                  href={`/visa/business-visa/${slug}?nFlag=${encodeURIComponent(nf)}&dFlag=${encodeURIComponent(df)}`}
                  className="border border-slate-200 rounded-xl p-5 flex items-center justify-between hover:border-amber-300 hover:shadow-md hover:shadow-amber-50 group transition-all bg-white"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <img src={nf} className="w-8 h-6 rounded border-2 border-white shadow-sm z-10 object-cover" alt={r.from} />
                      <img src={df} className="w-8 h-6 rounded border-2 border-white shadow-sm z-20 object-cover" alt={r.to} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900">{r.from}</p>
                      <p className="text-xs text-slate-400 font-medium">→ {r.to}</p>
                    </div>
                  </div>
                  <span className="text-slate-300 group-hover:text-amber-500 font-bold text-lg transition-colors">›</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-slate-100 py-16 px-6 bg-slate-50" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Step-by-Step</p>
            <h2 className="text-3xl font-extrabold tracking-tight">How to Apply for a Business Visa</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-sm">
              A universal process for most countries. Use the route search above for country-specific details.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {STEPS.map((s) => (
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

      {/* TOP DESTINATIONS */}
      <section className="border-b border-slate-100 py-16 px-6 bg-white" id="destinations">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Explore Destinations</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Top Business Visa Destinations 2026</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOP_DESTINATIONS.map((d) => (
              <div key={d.code} className="border border-slate-200 rounded-xl p-5 bg-white hover:shadow-md hover:shadow-slate-100 hover:border-amber-200 transition-all">
                <img src={flagUrl(d.code)} className="w-10 h-7 object-cover rounded border border-slate-100 mb-4" alt={d.name} />
                <h3 className="font-bold text-sm text-slate-900 mb-1">{d.name}</h3>
                <p className="text-[11px] text-amber-600 font-semibold mb-3">{d.visa}</p>
                <div className="border-t border-slate-100 pt-3 space-y-2">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Processing</p>
                    <p className="text-xs font-semibold text-slate-700">{d.processing}</p>
                  </div>
                  <p className="text-[11px] text-slate-400">{d.note}</p>
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
            <h2 className="text-3xl font-extrabold tracking-tight">Documents Required for a Business Visa</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-sm">
              Required for almost every business visa application worldwide.
              Use our route search for the exact destination-specific list.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOCUMENTS.map((doc) => (
              <div key={doc.title} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-amber-200 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-sm text-slate-900">{doc.title}</h4>
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ml-2 ${doc.mandatory ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                    {doc.mandatory ? 'Required' : 'Often Needed'}
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
              Download Country-Specific Checklist →
            </Link>
          </div>
        </div>
      </section>

      {/* BEFORE YOU APPLY */}
      <section className="border-b border-slate-100 py-16 px-6 bg-white" id="before-you-apply">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Important</p>
            <h2 className="text-3xl font-extrabold tracking-tight">What to Know Before Applying</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                heading: "Business Visa vs Work Visa — Know the Difference",
                body: "A business visa permits short-term commercial activities: meetings, conferences, site visits, and contract signings. It does not allow you to take up employment, receive payment from a local company, or remain in the country long-term. If you intend to work for a company in the destination country, you need a work visa.",
              },
              {
                heading: "The Invitation Letter Is Critical",
                body: "Most business visa rejections happen because the invitation letter is missing, vague, or not on official company letterhead. The letter must be signed by a director or senior executive, state the exact dates and purpose of the visit, and confirm that the host company will receive you. Use our template below as a starting point.",
              },
              {
                heading: "Book Accommodation Before Applying",
                body: "Most embassies and consulates require confirmed hotel bookings for your full stay as part of the application. Do not book non-refundable hotels until your visa is approved. Instead, book refundable rates as placeholders during the application process.",
              },
              {
                heading: "Schengen Covers 27 Countries in One Application",
                body: "If your business travel involves multiple European countries, a Schengen Business Visa covers all 27 member states. Apply through the embassy of the country where you will spend the most days. If time is equal, apply through the country of first entry.",
              },
              {
                heading: "A Strong Travel History Speeds Up Processing",
                body: "If you have previously visited the destination country or similar high-income countries, include your old passport or copies of prior visas. A good travel history — especially prior Schengen or US visas — significantly increases approval rates and can reduce scrutiny of your application.",
              },
              {
                heading: "Business Visa Does Not Guarantee Entry",
                body: "A visa is permission to request entry, not a guarantee. Border officials at the destination country can deny entry if they are not satisfied with your stated purpose. Carry your full set of documents — invitation letter, hotel bookings, and company letter — in your hand luggage for inspection at the border.",
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

      {/* EMAIL TEMPLATE */}
      <section className="border-b border-slate-100 py-16 px-6 bg-slate-50" id="email-guide">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Invitation Letter Guide</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Business Visa Cover Letter Template</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-sm">
              Submit this from your employer or host company along with your visa application.
              Replace all fields in brackets with your specific information.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Business Visa Cover Letter — Template
                </span>
              </div>
              <button
                onClick={() => setShowEmail(!showEmail)}
                className="text-xs font-bold text-amber-600 hover:text-amber-800 transition-colors uppercase tracking-widest"
              >
                {showEmail ? "Hide ↑" : "Show Template ↓"}
              </button>
            </div>
            {showEmail && (
              <div className="p-8">
                <pre className="text-xs font-mono leading-relaxed text-slate-600 whitespace-pre-wrap bg-slate-50 p-6 rounded-xl border border-slate-100">
                  {EMAIL_TEMPLATE}
                </pre>
                <div className="mt-6">
                  <button
                    onClick={handleCopy}
                    className="bg-amber-400 text-slate-900 px-8 py-3 rounded-xl font-bold text-sm hover:bg-amber-500 transition-all"
                  >
                    {copied ? "Copied ✓" : "Copy Template"}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { tip: "Use official company letterhead", detail: "The letter must be on headed paper with company logo, address, and registration number." },
              { tip: "State specific dates and purpose", detail: "Vague phrases like 'business meetings' are weaker than 'attending quarterly supplier review, 10–12 June 2026.'" },
              { tip: "Senior signatory increases approval rates", detail: "A letter signed by a Director, MD, or C-level executive carries more weight than one from a middle manager." },
            ].map((t) => (
              <div key={t.tip} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-amber-200 transition-colors">
                <h4 className="font-bold text-sm text-slate-900 mb-2">{t.tip}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{t.detail}</p>
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
              Full guides for work, student, tourist, and transit visas across 40+ countries.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/visa/work-visa" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-700 transition-all">
              Work Visa →
            </Link>
            <Link href="/visa/student-visa" className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all border border-slate-200">
              Student Visa →
            </Link>
            <Link href="/visa/tourist-visa" className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all border border-slate-200">
              Tourist Visa →
            </Link>
            <Link href="/visa/transit-visa" className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all border border-slate-200">
              Transit Visa →
            </Link>
          </div>
        </div>
      </section>

      {/* INTERNAL LINK HUB */}
      <section className="border-b border-slate-100 py-16 px-6 bg-white" id="guides">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Guide Library</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Business Visa Guides by Destination</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOP_DESTINATIONS.map((dest) => (
              <div key={dest.code} className="border border-slate-200 rounded-xl p-5 bg-white hover:border-amber-200 transition-colors">
                <img src={flagUrl(dest.code)} className="w-10 h-7 object-cover rounded border border-slate-100 mb-3" alt={dest.name} />
                <h4 className="font-bold text-sm text-slate-900 mb-1">{dest.name} Business Visa</h4>
                <p className="text-xs text-slate-400 mb-4">{dest.visa}</p>
                <div className="space-y-2">
                  {["Indian", "Nigerian", "Pakistani", "Filipino"].map((nat) => {
                    const nCode = nat === "Indian" ? "in" : nat === "Nigerian" ? "ng" : nat === "Pakistani" ? "pk" : "ph";
                    return (
                      <Link
                        key={nat}
                        href={`/visa/business-visa/${nat.toLowerCase()}-to-${dest.name.toLowerCase().replace(/\s+/g, '-')}?nFlag=${encodeURIComponent(flagUrl(nCode))}&dFlag=${encodeURIComponent(flagUrl(dest.code))}`}
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