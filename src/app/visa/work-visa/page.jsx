"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const POPULAR_ROUTES = [
  { from: "India", to: "Canada", fromCode: "in", toCode: "ca" },
  { from: "Philippines", to: "UAE", fromCode: "ph", toCode: "ae" },
  { from: "Nigeria", to: "United Kingdom", fromCode: "ng", toCode: "gb" },
  { from: "Pakistan", to: "Saudi Arabia", fromCode: "pk", toCode: "sa" },
  { from: "Bangladesh", to: "Qatar", fromCode: "bd", toCode: "qa" },
  { from: "Mexico", to: "United States", fromCode: "mx", toCode: "us" },
];

const TOP_DESTINATIONS = [
  { name: "Canada", code: "ca", visa: "Express Entry & LMIA", processing: "6–12 months", note: "PR pathway available" },
  { name: "United Kingdom", code: "gb", visa: "Skilled Worker Visa", processing: "3–8 weeks", note: "Points-based system" },
  { name: "United Arab Emirates", code: "ae", visa: "Employment Visa", processing: "2–4 weeks", note: "Tax-free income" },
  { name: "Germany", code: "de", visa: "EU Blue Card", processing: "1–3 months", note: "Opportunity Card 2024" },
  { name: "Australia", code: "au", visa: "Skilled Migration 482", processing: "2–4 months", note: "Points test required" },
  { name: "Saudi Arabia", code: "sa", visa: "Iqama Work Permit", processing: "2–6 weeks", note: "Vision 2030 jobs" },
  { name: "Qatar", code: "qa", visa: "Work Permit (QID)", processing: "2–4 weeks", note: "High demand sectors" },
  { name: "United States", code: "us", visa: "H-1B / L-1 Visa", processing: "3–6 months", note: "STEM priority" },
];

const STEPS = [
  { num: "01", title: "Research & Eligibility Check", desc: "Verify your occupation falls under the destination country's recognised skilled occupations list (NOC, SOC, or ISCO-08). Check language requirements — IELTS, TOEFL, or DELF depending on destination.", icon: "🔍" },
  { num: "02", title: "Secure a Job Offer", desc: "Apply via LinkedIn, Indeed, or local job boards. Your employer must hold an active government-issued sponsorship licence or LMIA before they can legally issue your offer letter.", icon: "💼" },
  { num: "03", title: "Document Preparation", desc: "Gather your passport, attested degree certificates, experience letters, police clearance, medical exam report, and a professionally formatted CV aligned to destination standards.", icon: "📋" },
  { num: "04", title: "Submit Visa Application", desc: "Apply through the official immigration portal, VFS Global, or your employer. Pay the visa fee and schedule biometrics at the nearest application centre.", icon: "📤" },
  { num: "05", title: "Track & Follow Up", desc: "Monitor your application status through the official portal. Respond promptly to any requests for additional documents or information within the stipulated deadline.", icon: "📡" },
  { num: "06", title: "Travel & Onboarding", desc: "Receive visa approval, book flights, arrange initial accommodation, and complete onboarding with your sponsor employer within the entry deadline stated on your visa.", icon: "✈️" },
];

const DOCUMENTS = [
  { title: "Valid Passport", detail: "Minimum 12 months validity beyond your intended stay. At least 2 blank pages for stamps.", mandatory: true },
  { title: "Job Offer Letter", detail: "Official letter on company letterhead including job title, salary, start date, and contract duration.", mandatory: true },
  { title: "Employer Sponsorship / LMIA", detail: "Your employer's government-issued sponsorship number or Labour Market Impact Assessment approval.", mandatory: true },
  { title: "Educational Certificates", detail: "Attested degree certificates and transcripts. May require apostille or notarisation depending on destination.", mandatory: true },
  { title: "Work Experience Letters", detail: "Reference letters from all previous employers on official letterhead covering all relevant work history.", mandatory: true },
  { title: "Medical Examination Report", detail: "From a government-approved panel physician. Includes chest X-ray and blood tests.", mandatory: true },
  { title: "Police Clearance Certificate", detail: "From your home country and any country where you lived for 6+ months in the past 5 years.", mandatory: true },
  { title: "Language Test Results", detail: "IELTS General (min 6.0), TOEFL iBT, PTE Academic, or DELF/Goethe for non-English destinations.", mandatory: false },
  { title: "Professional CV / Resume", detail: "Formatted to destination country standards. Reverse-chronological order. Remove photo for US/UK applications.", mandatory: false },
  { title: "Bank Statements (3–6 months)", detail: "Demonstrating sufficient funds to support yourself during the initial relocation period.", mandatory: false },
  { title: "Biometric Data", detail: "Fingerprints and photograph captured at a VFS Global or official visa application centre.", mandatory: true },
  { title: "Visa Application Fee", detail: "Paid online at time of submission. Ranges from $50–$1,500 USD depending on visa category and country.", mandatory: true },
];

const TRUSTED_APPS = [
  { name: "VFS Global", purpose: "Biometrics & visa application centres worldwide", url: "https://www.vfsglobal.com", tag: "Official" },
  { name: "IRCC Portal", purpose: "Canada immigration, Express Entry, PR applications", url: "https://www.canada.ca/en/immigration", tag: "Government" },
  { name: "UK Visas & Immigration", purpose: "UK Skilled Worker visa applications", url: "https://www.gov.uk/work-uk-visa", tag: "Government" },
  { name: "MOHRE UAE", purpose: "UAE employment contracts and work permits", url: "https://www.mohre.gov.ae", tag: "Government" },
  { name: "ImmiAccount Australia", purpose: "Australian skilled migration lodgement", url: "https://online.immi.gov.au", tag: "Government" },
  { name: "Make It In Germany", purpose: "EU Blue Card and German work visa portal", url: "https://www.make-it-in-germany.com", tag: "Official" },
];

const EMAIL_TEMPLATE = `Subject: Work Visa Sponsorship Inquiry – [Your Full Name] – [Job Title]

Dear [Hiring Manager / HR Department],

I am writing to inquire about the possibility of employer-sponsored work authorisation for the position of [Job Title]. I am a [Nationality] national currently based in [Current Country] with [X years] of experience in [your field].

I have reviewed your sponsorship license and believe my qualifications in [specific skills] align well with your requirements. I am fully prepared to initiate my own visa process and can provide all necessary documentation including degree attestations, police clearance certificates, and a valid medical examination report.

I would appreciate the opportunity to discuss this further at your convenience.

Kind regards,
[Your Full Name]
[LinkedIn Profile URL]
[Phone / WhatsApp]`;

const flagUrl = (code) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

// ── Auto-suggest search component (shared design with business visa) ──────────
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

export default function WorkVisaSearch() {
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
        // Default: India → Canada
        const india = d.find(c => c.country === 'India');
        const canada = d.find(c => c.country === 'Canada');
        if (india) setNationality({ name: india.country, flag: india.flag, code: india.code });
        if (canada) setDestination({ name: canada.country, flag: canada.flag, code: canada.code });
      })
      .catch((e) => console.error(e));
  }, []);

  const handleSearch = () => {
    if (nationality?.name && destination?.name) {
      const slug = `${nationality.name.toLowerCase()}-to-${destination.name.toLowerCase()}`.replace(/\s+/g, '-');
      const nFlag = encodeURIComponent(nationality.flag);
      const dFlag = encodeURIComponent(destination.flag);
      router.push(`/visa/work-visa/${slug}?nFlag=${nFlag}&dFlag=${dFlag}`);
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
            Free Work Visa & Work Permit Guide — Updated May 2026
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-5 text-slate-900">
            Work Visa &<br />
            <span className="text-amber-500">Work Permit</span><br />
            Requirements
          </h1>
          <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
            Step-by-step work visa guides covering employer sponsorship, document checklists,
            credential recognition, and official portals — for every nationality and destination.
          </p>

          {/* Visa type nav */}
          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { label: "Business Visa", href: "/visa/business-visa" },
              { label: "Work Visa", href: "/visa/work-visa", active: true },
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
            Search Work Visa Requirements
          </p>
          <p className="text-center text-sm text-slate-500 mb-8">Select your passport nationality and destination to get a personalised work visa guide</p>

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
                <span className="ml-auto text-[10px] font-bold text-amber-600 uppercase tracking-widest">Work Visa Guide Ready</span>
              </div>
            )}

            <button
              onClick={handleSearch}
              disabled={!nationality?.name || !destination?.name}
              className="w-full mt-6 bg-amber-400 text-slate-900 rounded-xl py-4 font-bold text-base hover:bg-amber-500 transition-all shadow-lg shadow-amber-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {nationality?.name && destination?.name
                ? `Get ${nationality.name} → ${destination.name} Work Visa Guide →`
                : "Check Work Visa Requirements →"
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
            <h2 className="text-3xl font-extrabold tracking-tight">Popular Work Visa Routes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_ROUTES.map((r) => {
              const slug = `${r.from.toLowerCase()}-to-${r.to.toLowerCase()}`.replace(/\s+/g, '-');
              const nf = flagUrl(r.fromCode);
              const df = flagUrl(r.toCode);
              return (
                <Link
                  key={slug}
                  href={`/visa/work-visa/${slug}?nFlag=${encodeURIComponent(nf)}&dFlag=${encodeURIComponent(df)}`}
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
            <h2 className="text-3xl font-extrabold tracking-tight">How to Apply for a Work Visa</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-sm">
              A universal process that applies to most countries. Use our route search above for country-specific guides.
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
            <h2 className="text-3xl font-extrabold tracking-tight">Top Work Permit Destinations 2026</h2>
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
            <h2 className="text-3xl font-extrabold tracking-tight">Documents Required for a Work Visa</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-sm">
              Required for almost every work visa application worldwide.
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
                heading: "Understand the Exact Visa Category You Need",
                body: "Work visas are not all the same. Skilled worker visas require a job offer first. Points-based systems (Canada, Australia) let you apply without one. Intra-company transfer visas apply if moving within a multinational. Research the exact category before spending money on documents."
              },
              {
                heading: "Credential Recognition Takes Time — Start Early",
                body: "Your degree may need to be assessed by a government-approved body (WES for Canada, NARIC for UK, AEI-NOOSR for Australia). This process can take 4–12 weeks and must be completed before submitting your visa application."
              },
              {
                heading: "Never Use an Unlicensed Immigration Consultant",
                body: "Only use Regulated Canadian Immigration Consultants (RCICs), UK OISC-registered advisers, or Registered Migration Agents (RMAs) in Australia. Unregulated agents have caused thousands of visa rejections and immigration bans."
              },
              {
                heading: "The Job Offer Must Be Genuine and Verifiable",
                body: "Many countries now verify job offers directly with employers during processing. A fabricated offer letter results in a permanent immigration ban. Ensure your employer is willing to respond to government inquiries and holds an active operations licence."
              },
              {
                heading: "Processing Times Are Estimates — Don't Resign Early",
                body: "Do not resign from your current job or purchase non-refundable flights until you have a visa decision in hand. Processing times can extend significantly due to background check delays, document requests, or high application volumes."
              },
              {
                heading: "Understand Dependent and Family Rights Before You Apply",
                body: "Most skilled worker visas allow you to bring your spouse and dependent children. Check whether dependants can work — UK and Canada allow it, while some Gulf countries do not. Rules vary significantly across destinations."
              }
            ].map((item) => (
              <div key={item.heading} className="border-l-4 border-amber-300 pl-6">
                <h3 className="font-bold text-base text-slate-900 mb-2">{item.heading}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUSTED PORTALS */}
      <section className="border-b border-slate-100 py-16 px-6 bg-slate-50" id="trusted-apps">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Official Channels Only</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Trusted Portals for Work Permit Applications</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-sm">
              Always submit through official government portals or their authorised representatives. Never pay fees to unofficial third-party websites.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TRUSTED_APPS.map((app) => (
              <a
                key={app.name}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col gap-3 hover:border-amber-300 hover:shadow-md hover:shadow-amber-50 group transition-all"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">{app.name}</h4>
                  <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">{app.tag}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{app.purpose}</p>
                <span className="text-[10px] font-bold text-slate-300 group-hover:text-amber-500 transition-colors">{app.url.replace("https://", "")} ↗</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* EMAIL TEMPLATE */}
      <section className="border-b border-slate-100 py-16 px-6 bg-white" id="email-guide">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Employer Outreach</p>
            <h2 className="text-3xl font-extrabold tracking-tight">How to Email an Employer for Visa Sponsorship</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-sm">
              A professional sponsorship inquiry email increases your chances of getting a response.
              Replace all fields in brackets with your own information.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Visa Sponsorship Inquiry — Template
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
              { tip: "Send on a Tuesday or Wednesday", detail: "Response rates are 30% higher mid-week than Monday morning or Friday afternoon." },
              { tip: "Reference their specific job post", detail: "Mention the exact job posting number or title to show genuine preparation and interest." },
              { tip: "Attach a one-page profile summary", detail: "Include a brief PDF highlighting your key skills, certifications, and work eligibility status." }
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
              Full guides for business, student, tourist, and transit visas across 40+ countries.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/visa/business-visa" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-700 transition-all">
              Business Visa →
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

      {/* GUIDE HUB */}
      <section className="border-b border-slate-100 py-16 px-6 bg-white" id="guides">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Guide Library</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Work Visa Guides by Destination</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOP_DESTINATIONS.map((dest) => (
              <div key={dest.code} className="border border-slate-200 rounded-xl p-5 bg-white hover:border-amber-200 transition-colors">
                <img src={flagUrl(dest.code)} className="w-10 h-7 object-cover rounded border border-slate-100 mb-3" alt={dest.name} />
                <h4 className="font-bold text-sm text-slate-900 mb-1">{dest.name} Work Visa</h4>
                <p className="text-xs text-slate-400 mb-4">{dest.visa}</p>
                <div className="space-y-2">
                  {["Indian", "Filipino", "Nigerian", "Pakistani"].map((nat) => {
                    const nCode = nat === "Indian" ? "in" : nat === "Filipino" ? "ph" : nat === "Nigerian" ? "ng" : "pk";
                    return (
                      <Link
                        key={nat}
                        href={`/visa/work-visa/${nat.toLowerCase()}-to-${dest.name.toLowerCase().replace(/\s+/g, '-')}?nFlag=${encodeURIComponent(flagUrl(nCode))}&dFlag=${encodeURIComponent(flagUrl(dest.code))}`}
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