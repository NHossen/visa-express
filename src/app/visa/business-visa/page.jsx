"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const POPULAR_ROUTES = [
  { from: "India", to: "United States", fromCode: "in", toCode: "us", processing: "3–5 weeks", fee: "$185" },
  { from: "China", to: "United Kingdom", fromCode: "cn", toCode: "gb", processing: "3 weeks", fee: "£115" },
  { from: "Nigeria", to: "Germany", fromCode: "ng", toCode: "de", processing: "10–15 days", fee: "€80" },
  { from: "Pakistan", to: "UAE", fromCode: "pk", toCode: "ae", processing: "3–5 days", fee: "AED 300" },
  { from: "Bangladesh", to: "Singapore", fromCode: "bd", toCode: "sg", processing: "3–10 days", fee: "SGD 30" },
  { from: "Brazil", to: "France", fromCode: "br", toCode: "fr", processing: "10–15 days", fee: "€80" },
  { from: "Philippines", to: "Japan", fromCode: "ph", toCode: "jp", processing: "5–7 days", fee: "¥3,000" },
  { from: "Egypt", to: "Canada", fromCode: "eg", toCode: "ca", processing: "2–8 weeks", fee: "CAD 100" },
  { from: "Indonesia", to: "Australia", fromCode: "id", toCode: "au", processing: "10–20 days", fee: "AUD 145" },
];

const TOP_DESTINATIONS = [
  {
    name: "United States", code: "us",
    visa: "B-1 Business Visa", processing: "3–5 weeks",
    fee: "$185 USD", maxStay: "Up to 6 months",
    note: "Interview required at embassy",
    schengen: false,
    highlights: ["Embassy interview mandatory", "DS-160 form online", "Strong ties to home required"],
  },
  {
    name: "United Kingdom", code: "gb",
    visa: "Standard Visitor Visa", processing: "3 weeks",
    fee: "£115 GBP", maxStay: "Up to 6 months",
    note: "Covers meetings & conferences",
    schengen: false,
    highlights: ["Online application via UKVI", "Biometrics at Visa Application Centre", "No interview for most nationalities"],
  },
  {
    name: "Germany", code: "de",
    visa: "Schengen Business Visa (Type C)", processing: "10–15 days",
    fee: "€80 EUR", maxStay: "90 days / 180-day period",
    note: "Covers all 27 Schengen states",
    schengen: true,
    highlights: ["Apply at German consulate", "Covers entire Schengen zone", "VFS Global for many countries"],
  },
  {
    name: "UAE", code: "ae",
    visa: "Visit / Business Visa", processing: "3–5 days",
    fee: "AED 300–1,000", maxStay: "30–90 days",
    note: "Visa on arrival for many nationalities",
    schengen: false,
    highlights: ["Visa on arrival for 50+ passports", "eVisa available online", "DXB airport processing"],
  },
  {
    name: "Singapore", code: "sg",
    visa: "Short-Term Visit Pass", processing: "3–10 days",
    fee: "SGD 30", maxStay: "30–90 days",
    note: "Visa-free for many nationalities",
    schengen: false,
    highlights: ["Visa-free for 90+ countries", "eVisa available", "ICA online portal"],
  },
  {
    name: "Canada", code: "ca",
    visa: "Temporary Resident Visa (TRV)", processing: "2–8 weeks",
    fee: "CAD 100", maxStay: "Up to 6 months",
    note: "ETA for visa-exempt nationals",
    schengen: false,
    highlights: ["Biometrics required", "eTA for visa-exempt", "IRCC online portal"],
  },
  {
    name: "France", code: "fr",
    visa: "Schengen Business Visa (Type C)", processing: "10–15 days",
    fee: "€80 EUR", maxStay: "90 days / 180-day period",
    note: "Via French consulate or VFS",
    schengen: true,
    highlights: ["French consulate or TLScontact", "Covers Schengen zone", "Paris conferences hub"],
  },
  {
    name: "Japan", code: "jp",
    visa: "Short-Stay Business Visa", processing: "5–7 days",
    fee: "¥3,000 JPY", maxStay: "90 days",
    note: "Invitation letter from Japanese company required",
    schengen: false,
    highlights: ["Sponsor/guarantor in Japan required", "Single & multiple entry available", "Embassy appointment needed"],
  },
  {
    name: "Australia", code: "au",
    visa: "Business Innovation & Investment Visa / ETA", processing: "10–20 days",
    fee: "AUD 145", maxStay: "3–12 months",
    note: "ETA 601 for eligible nationalities",
    schengen: false,
    highlights: ["ETA for 34 eligible passports", "Subclass 600 Visitor Visa", "ImmiAccount online portal"],
  },
  {
    name: "Netherlands", code: "nl",
    visa: "Schengen Business Visa (Type C)", processing: "10–15 days",
    fee: "€80 EUR", maxStay: "90 days / 180-day period",
    note: "Major European business hub",
    schengen: true,
    highlights: ["VFS Global centres worldwide", "Amsterdam is a top business city", "Schengen coverage"],
  },
  {
    name: "South Korea", code: "kr",
    visa: "Short-Term Business Visa (C-2)", processing: "5–7 days",
    fee: "USD 40–80", maxStay: "90 days",
    note: "Visa-free for many countries",
    schengen: false,
    highlights: ["K-ETA for eligible countries", "Consulate appointment online", "Single & multiple entry"],
  },
  {
    name: "Switzerland", code: "ch",
    visa: "Schengen Business Visa (Type C)", processing: "10–15 days",
    fee: "CHF 80", maxStay: "90 days / 180-day period",
    note: "Covers Schengen zone incl. Switzerland",
    schengen: true,
    highlights: ["Swiss-Schengen zone", "Davos & Geneva conferences", "VFS Global centres"],
  },
];

const STEPS = [
  {
    num: "01", title: "Confirm Permitted Activities", icon: "🔍",
    desc: "Business visas cover meetings, negotiations, conferences, trade fairs, and supplier visits — not employment. Verify your planned activities fall within permitted scope before applying. Employment or receiving payment from a local company is strictly prohibited and can lead to deportation.",
    tip: "Keep a written itinerary of planned business activities to present at the embassy.",
  },
  {
    num: "02", title: "Obtain an Invitation Letter", icon: "✉",
    desc: "Your host company in the destination country issues a formal invitation letter on company letterhead. It must confirm your full name, job title, exact visit dates, the purpose of the visit, and that they will host and receive you. Signed by a director or C-level executive only.",
    tip: "A vague letter is the #1 cause of business visa rejection. Be specific about meeting dates and purpose.",
  },
  {
    num: "03", title: "Prepare Company Documentation", icon: "🏢",
    desc: "Gather your employer's cover letter, business registration certificate, and proof of your position. Your company confirms the business purpose of your travel, commits to your return, and ideally states that they will cover travel costs — strengthening your application significantly.",
    tip: "A company cover letter signed by HR Director or CEO carries far more weight than a standard letter.",
  },
  {
    num: "04", title: "Book Refundable Accommodation", icon: "🏨",
    desc: "Most embassies require confirmed hotel reservations for your entire stay. Always book refundable rates as placeholders — do not pay non-refundable hotels until your visa is approved. Print the confirmation including hotel name, address, check-in/check-out dates.",
    tip: "Booking.com free cancellation bookings are widely accepted as proof of accommodation.",
  },
  {
    num: "05", title: "Book Appointment & Submit Documents", icon: "📋",
    desc: "Schedule a visa appointment at the embassy, consulate, or VFS Global centre serving your city. Submit original documents, certified copies, and pay the non-refundable processing fee. Biometric data (fingerprints and digital photograph) will be collected at the centre.",
    tip: "Book your appointment 6–8 weeks before your planned travel date to account for processing delays.",
  },
  {
    num: "06", title: "Await Decision & Verify Visa Conditions", icon: "✈",
    desc: "Processing typically takes 5–15 business days. Expedited processing is available at most embassies for an additional fee. Once approved, carefully check your visa sticker: verify the validity dates, number of entries permitted, and the allowed duration of stay per visit.",
    tip: "The 'valid until' date is not the same as how long you can stay — check 'duration of stay' separately.",
  },
];

const DOCUMENTS = [
  { icon: "🛂", title: "Valid Passport", detail: "Minimum 6 months validity beyond your planned return date. At least 2 blank pages required for visa stamps and entry/exit stamps. If your passport is nearly full, renew before applying.", mandatory: true },
  { icon: "✉️", title: "Invitation Letter from Host Company", detail: "On company letterhead, signed by a Director or C-level executive. Must include your full name, position, exact visit dates, purpose of the visit, and confirmation that the host company will receive you. Missing or vague letters are the #1 cause of rejection.", mandatory: true },
  { icon: "🏢", title: "Employer Cover Letter", detail: "From your company stating your position, how long you have worked there, the purpose of your travel, and that they guarantee your return. Should ideally confirm who is funding the trip. Sign from HR Director or company CEO is strongest.", mandatory: true },
  { icon: "📄", title: "Bank Statements (3–6 months)", detail: "Personal or company account showing sufficient funds to cover the trip without needing to work locally. Avoid large unexplained deposits immediately before applying — these raise flags. For Schengen visas, aim to show €100+ per day of stay.", mandatory: true },
  { icon: "🛡️", title: "Travel Insurance", detail: "Medical coverage valid for the full duration of your stay and the entire Schengen zone if applicable. Minimum €30,000 medical cover required for Schengen. Repatriation cover is strongly recommended. Print the policy certificate for submission.", mandatory: true },
  { icon: "🏨", title: "Hotel / Accommodation Booking", detail: "Confirmed hotel reservations for the full duration of your business trip. Book refundable rates only until your visa is approved. The booking must show your full name, hotel address, check-in and check-out dates matching your visa application.", mandatory: true },
  { icon: "✈️", title: "Return Flight Confirmation", detail: "A confirmed return itinerary demonstrating your intention to leave before your visa expires. This is a key indicator of non-immigrant intent. If you have a flexible travel date, a refundable return booking is acceptable.", mandatory: true },
  { icon: "📋", title: "Visa Application Form", detail: "Country-specific form, completed fully and signed. Download only from the official embassy website — avoid third-party versions. For Schengen countries, the Schengen Visa Application Form is standardised. Ensure no fields are left blank.", mandatory: true },
  { icon: "📸", title: "Passport-Size Photographs", detail: "Usually 2 recent photos (taken within the last 6 months) against a white background. Exact specifications vary by country — check the embassy website. For most countries: 35mm × 45mm, face taking up 70–80% of the frame, no glasses.", mandatory: true },
  { icon: "💼", title: "Company Registration Documents", detail: "Your employer's trade licence, company registration certificate, or certificate of incorporation. Demonstrates that your employer is a legitimate, registered business. Some embassies also request a company profile or website printout.", mandatory: false },
  { icon: "🪪", title: "Business Card or Professional Profile", detail: "Supporting evidence of your professional role and standing. A business card or LinkedIn profile printout is accepted by many embassies as supplementary evidence. Useful especially if your job title differs from what appears in the invitation letter.", mandatory: false },
  { icon: "🗂️", title: "Previous Visa History", detail: "Prior visas to the destination country or similar countries (Schengen, US, UK) significantly strengthen your application. Include your old passport if it contains prior visas. A strong travel history demonstrates you have respected visa conditions previously.", mandatory: false },
  { icon: "📊", title: "Income Tax Returns / ITR", detail: "Many embassies (especially US, Canada, UK) request your last 1–2 years of income tax returns as financial evidence. This supplements bank statements and establishes your financial standing and ties to your home country.", mandatory: false },
  { icon: "📁", title: "No Objection Certificate (NOC)", detail: "A letter from your employer confirming they have no objection to your travel and that your position will be held upon your return. Particularly useful for government employees or those travelling without a specific host company invitation.", mandatory: false },
];

const EMAIL_TEMPLATE = `Subject: Business Visit Invitation — [Visitor Full Name] — [Start Date] to [End Date]

[Host Company Letterhead — Logo, Address, Registration Number]

Date: [Date]

To,
The Visa Officer
[Embassy Name]
[Embassy Address]

Dear Visa Officer,

RE: FORMAL BUSINESS INVITATION — [VISITOR FULL NAME]

We, [Host Company Name], a company registered under [Company Registration Number] in [Destination Country], hereby formally invite [Visitor Full Name], [Job Title] at [Visitor's Company Name], to visit our offices in [City, Destination Country] from [Start Date] to [End Date].

PURPOSE OF VISIT:
The purpose of this visit is [specific business activity — e.g., attending our annual supplier review meeting / finalising the Q3 distribution contract / participating in the International Trade Expo as our representative]. The agenda includes [brief 2–3 line description of planned meetings and activities].

FINANCIAL RESPONSIBILITY:
[All accommodation and travel costs will be borne by [Host Company / Visitor's Company]. / The visitor will be self-funding their stay.]

We confirm that [Visitor Full Name] will reside at [Hotel Name, Address] during the visit and will return to [Home Country] upon conclusion of the scheduled programme. The visitor holds a valid passport and has no intention of seeking employment in [Destination Country].

Should you require any further information, please do not hesitate to contact us directly.

Yours sincerely,

[Authorised Signatory — Director / MD / CEO]
[Full Name] | [Designation]
[Host Company Name]
[Company Address] | [Phone] | [Email]
[Company Website]`;

const VISA_TYPES_COMPARISON = [
  {
    type: "Business Visa",
    icon: "💼",
    permitted: ["Meetings & negotiations", "Trade fairs & conferences", "Site visits & inspections", "Contract signings", "Corporate training (receiving)"],
    notPermitted: ["Local employment", "Receiving local payment", "Long-term stay", "Studying"],
    duration: "30–90 days per visit",
    color: "amber",
  },
  {
    type: "Work Visa",
    icon: "🏗️",
    permitted: ["Full-time employment", "Receiving local salary", "Long-term residency", "Professional services"],
    notPermitted: ["Tourist activities", "Exceeding work hours", "Dual employment"],
    duration: "1–5 years (renewable)",
    color: "blue",
  },
  {
    type: "Tourist Visa",
    icon: "🌴",
    permitted: ["Sightseeing & leisure", "Visiting family/friends", "Short courses (non-credit)", "Medical tourism"],
    notPermitted: ["Business meetings", "Employment", "Studying for qualifications"],
    duration: "30–180 days per visit",
    color: "green",
  },
];

const REJECTION_REASONS = [
  { reason: "Vague or missing invitation letter", fix: "Ensure the letter is on company letterhead, signed by a Director, and specifies exact dates, purpose, and that they will receive you.", severity: "high" },
  { reason: "Insufficient funds / weak bank statements", fix: "Show 3–6 months of statements with consistent balance. Aim for €100+ per day of stay for Schengen. Avoid large unexplained deposits.", severity: "high" },
  { reason: "No strong ties to home country", fix: "Provide evidence of property ownership, family, employment contract, and salary slips proving you have reason to return.", severity: "high" },
  { reason: "Previous visa overstay", fix: "This is a serious flag. Consider professional visa assistance. Provide a credible explanation with supporting documents.", severity: "critical" },
  { reason: "Incomplete application form", fix: "Leave no fields blank. Double-check signature and date. Use the embassy's own form — do not use third-party versions.", severity: "medium" },
  { reason: "Inadequate travel insurance", fix: "Ensure policy covers medical and repatriation for the full trip duration. For Schengen, minimum €30,000 cover required.", severity: "medium" },
  { reason: "No prior travel history", fix: "If first-time applicant, compensate with very strong financials, a detailed itinerary, and a strong company cover letter.", severity: "low" },
  { reason: "Hotel bookings not matching visa dates", fix: "Ensure hotel check-in and check-out exactly match your stated travel dates. Inconsistency is an immediate red flag.", severity: "medium" },
];

const SCHENGEN_COUNTRIES = [
  "Austria", "Belgium", "Czech Republic", "Denmark", "Estonia", "Finland",
  "France", "Germany", "Greece", "Hungary", "Iceland", "Italy", "Latvia",
  "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Netherlands", "Norway",
  "Poland", "Portugal", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland",
];

const PROCESSING_TIMES = [
  { country: "UAE", flag: "ae", standard: "3–5 days", expedited: "24–48 hours", fee: "AED 300–1,000" },
  { country: "Singapore", flag: "sg", standard: "3–10 days", expedited: "N/A (fast by default)", fee: "SGD 30" },
  { country: "Germany (Schengen)", flag: "de", standard: "10–15 days", expedited: "5–7 days (limited)", fee: "€80" },
  { country: "Japan", flag: "jp", standard: "5–7 days", expedited: "3–4 days", fee: "¥3,000" },
  { country: "United States", flag: "us", standard: "3–5 weeks", expedited: "2–3 weeks (extra fee)", fee: "$185" },
  { country: "United Kingdom", flag: "gb", standard: "3 weeks", expedited: "5–7 days (priority)", fee: "£115 + £200 priority" },
  { country: "Canada", flag: "ca", standard: "2–8 weeks", expedited: "1–2 weeks (IRCC)", fee: "CAD 100" },
  { country: "Australia", flag: "au", standard: "10–20 days", expedited: "5–10 days", fee: "AUD 145" },
];

const flagUrl = (code) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

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
              <button key={c.code} onMouseDown={() => select(c)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${i === highlighted ? 'bg-amber-50 text-amber-800' : 'hover:bg-slate-50'}`}>
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
  const [activeTab, setActiveTab] = useState('all');
  const router = useRouter();

  useEffect(() => {
    fetch('/api/countries')
      .then((r) => r.json())
      .then((d) => {
        setCountries(d);
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
    setTimeout(() => setCopied(false), 2500);
  };

  const filteredDestinations = activeTab === 'schengen'
    ? TOP_DESTINATIONS.filter(d => d.schengen)
    : activeTab === 'non-schengen'
    ? TOP_DESTINATIONS.filter(d => !d.schengen)
    : TOP_DESTINATIONS;

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">

      {/* HERO */}
      <header className="border-b border-slate-100 py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 items-center mb-5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">Free Guide</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">Updated May 2026</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full">40+ Destinations</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight mb-5 text-slate-900">
            Business Visa<br />
            <span className="text-amber-500">Requirements</span> by<br />
            Nationality — 2026
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed mb-4">
            Complete, government-verified business visa guides for every nationality and destination. Covering permitted activities, required documents, invitation letter templates, fee schedules, processing times, and direct links to official embassy portals.
          </p>
          <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
            Whether you're a first-time business traveller or managing visa applications for a team, our guides give you everything needed to prepare a strong, complete application — without a visa agent.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            {[
              { label: "Business Visa", href: "/visa/business-visa", active: true },
              { label: "Work Visa", href: "/visa/work-visa" },
              { label: "Student Visa", href: "/visa/student-visa" },
              { label: "Tourist Visa", href: "/visa/tourist-visa" },
              { label: "Transit Visa", href: "/visa/transit-visa" },
            ].map((v) => (
              <Link key={v.label} href={v.href}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${v.active
                  ? 'bg-amber-400 text-slate-900 border-amber-400'
                  : 'border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-700'}`}>
                {v.label}
              </Link>
            ))}
          </div>

          {/* Stats bar */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { val: "40+", label: "Destinations Covered" },
              { val: "150+", label: "Nationality Guides" },
              { val: "99%", label: "Document Accuracy" },
              { val: "Free", label: "No Registration Needed" },
            ].map(s => (
              <div key={s.label} className="border border-slate-100 rounded-xl p-4 bg-slate-50">
                <p className="text-2xl font-extrabold text-amber-500">{s.val}</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* SEARCH */}
      <section className="py-14 px-6 bg-slate-50 border-b border-slate-200" id="search">
        <div className="max-w-4xl mx-auto">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2 text-center">Personalised Business Visa Guide</p>
          <h2 className="text-center text-2xl font-extrabold text-slate-900 mb-2">Search Business Visa Requirements</h2>
          <p className="text-center text-sm text-slate-500 mb-8 max-w-lg mx-auto">Select your passport nationality and destination to get a complete, personalised business visa checklist and guide</p>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CountrySearch label="Your Passport Nationality" stepNum="1" value={nationality} onChange={setNationality} countries={countries} placeholder="Type country name…" />
              <CountrySearch label="Destination Country" stepNum="2" value={destination} onChange={setDestination} countries={countries} placeholder="Type destination…" />
            </div>

            {nationality && destination && (
              <div className="mt-6 flex items-center gap-3 bg-amber-50 border border-amber-100 rounded-xl px-5 py-3">
                <img src={nationality.flag} className="w-7 h-5 rounded object-cover shadow-sm" alt={nationality.name} />
                <span className="text-sm font-semibold text-slate-700">{nationality.name}</span>
                <span className="text-amber-400 font-black">→</span>
                <img src={destination.flag} className="w-7 h-5 rounded object-cover shadow-sm" alt={destination.name} />
                <span className="text-sm font-semibold text-slate-700">{destination.name}</span>
                <span className="ml-auto text-[10px] font-bold text-amber-600 uppercase tracking-widest">Guide Ready →</span>
              </div>
            )}

            <button onClick={handleSearch} disabled={!nationality?.name || !destination?.name}
              className="w-full mt-6 bg-amber-400 text-slate-900 rounded-xl py-4 font-bold text-base hover:bg-amber-500 transition-all shadow-lg shadow-amber-100 disabled:opacity-40 disabled:cursor-not-allowed">
              {nationality?.name && destination?.name
                ? `Get ${nationality.name} → ${destination.name} Business Visa Guide →`
                : "Check Business Visa Requirements →"}
            </button>

            <p className="text-center text-[11px] text-slate-400 mt-4">Free guide · No registration required · Government-verified · Updated May 2026</p>
          </div>
        </div>
      </section>

      {/* POPULAR ROUTES */}
      <section className="border-b border-slate-100 py-16 px-6 bg-white" id="popular-routes">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Most Searched Routes 2026</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Popular Business Visa Routes</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl">The most frequently searched business visa routes on WorkPass.Guide — click any route for a full personalised guide including documents, fees, and official portals.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {POPULAR_ROUTES.map((r) => {
              const slug = `${r.from.toLowerCase()}-to-${r.to.toLowerCase()}`.replace(/\s+/g, '-');
              const nf = flagUrl(r.fromCode);
              const df = flagUrl(r.toCode);
              return (
                <Link key={slug}
                  href={`/visa/business-visa/${slug}?nFlag=${encodeURIComponent(nf)}&dFlag=${encodeURIComponent(df)}`}
                  className="border border-slate-200 rounded-xl p-5 flex items-center justify-between hover:border-amber-300 hover:shadow-md hover:shadow-amber-50 group transition-all bg-white">
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      <img src={nf} className="w-8 h-6 rounded border-2 border-white shadow-sm z-10 object-cover" alt={r.from} />
                      <img src={df} className="w-8 h-6 rounded border-2 border-white shadow-sm z-20 object-cover" alt={r.to} />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900">{r.from} → {r.to}</p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">{r.processing} · {r.fee}</p>
                    </div>
                  </div>
                  <span className="text-slate-300 group-hover:text-amber-500 font-bold text-lg transition-colors">›</span>
                </Link>
              );
            })}
          </div>
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400">Don't see your route? <button onClick={() => document.getElementById('search')?.scrollIntoView({ behavior: 'smooth' })} className="text-amber-600 font-bold hover:underline">Search any nationality and destination above →</button></p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-b border-slate-100 py-16 px-6 bg-slate-50" id="how-it-works">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Step-by-Step Process</p>
            <h2 className="text-3xl font-extrabold tracking-tight">How to Apply for a Business Visa</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-sm">A universal 6-step process applicable to most countries. Use the route search above for destination-specific requirements, fees, and official portal links.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {STEPS.map((s) => (
              <div key={s.num} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md hover:shadow-slate-100 hover:border-amber-200 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">{s.num}</span>
                  <span className="text-2xl">{s.icon}</span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-2">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{s.desc}</p>
                <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                  <p className="text-[11px] text-amber-700 font-semibold leading-relaxed">💡 {s.tip}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-white border border-slate-200 rounded-2xl p-8">
            <h3 className="font-bold text-base text-slate-900 mb-3">Planning Your Application Timeline</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { label: "Book Appointment", time: "6–8 weeks before travel" },
                { label: "Submit Documents", time: "5–6 weeks before travel" },
                { label: "Processing Period", time: "10–30 business days" },
                { label: "Receive Decision", time: "1–2 weeks before travel" },
              ].map(t => (
                <div key={t.label} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-xs font-bold text-slate-900 mb-1">{t.label}</p>
                  <p className="text-[11px] text-amber-600 font-semibold">{t.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESSING TIMES TABLE */}
      <section className="border-b border-slate-100 py-16 px-6 bg-white" id="processing-times">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">2026 Data</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Business Visa Processing Times & Fees</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl">Standard and expedited processing times for the most popular business visa destinations. Fees shown are approximate and subject to change — verify at the official embassy website before applying.</p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Destination</th>
                  <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Standard Processing</th>
                  <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Expedited Processing</th>
                  <th className="text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Visa Fee</th>
                </tr>
              </thead>
              <tbody>
                {PROCESSING_TIMES.map((row, i) => (
                  <tr key={row.country} className={`border-b border-slate-100 hover:bg-amber-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={flagUrl(row.flag)} className="w-7 h-5 rounded object-cover shadow-sm" alt={row.country} />
                        <span className="font-semibold text-slate-800 text-sm">{row.country}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm font-medium">{row.standard}</td>
                    <td className="px-6 py-4 text-amber-700 text-sm font-semibold">{row.expedited}</td>
                    <td className="px-6 py-4 text-slate-700 text-sm font-bold">{row.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] text-slate-400 mt-4">* Processing times are estimates. Peak seasons, public holidays, and incomplete applications can extend these significantly. Always allow a buffer of at least 1 week beyond stated times. For full details, see our <Link href="/visa-resources/processing-times" className="text-amber-600 font-semibold hover:underline">Processing Time Tracker →</Link></p>
        </div>
      </section>

      {/* TOP DESTINATIONS */}
      <section className="border-b border-slate-100 py-16 px-6 bg-slate-50" id="destinations">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Explore Destinations</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Top Business Visa Destinations 2026</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl">Click any destination to explore it in our <Link href="/visa/business-visa#search" className="text-amber-600 font-semibold hover:underline">personalised route search</Link>, or browse key details below.</p>
          </div>

          {/* Filter tabs */}
          <div className="flex gap-3 mb-7">
            {[
              { id: 'all', label: 'All Destinations' },
              { id: 'schengen', label: 'Schengen Zone' },
              { id: 'non-schengen', label: 'Non-Schengen' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${activeTab === tab.id ? 'bg-amber-400 text-slate-900 border-amber-400' : 'border-slate-200 text-slate-500 hover:border-amber-300'}`}>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDestinations.map((d) => (
              <div key={d.code} className="border border-slate-200 rounded-xl p-5 bg-white hover:shadow-md hover:shadow-slate-100 hover:border-amber-200 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <img src={flagUrl(d.code)} className="w-10 h-7 object-cover rounded border border-slate-100" alt={d.name} />
                  {d.schengen && (
                    <span className="text-[9px] font-bold uppercase bg-blue-50 text-blue-600 border border-blue-200 px-2 py-0.5 rounded-full">Schengen</span>
                  )}
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-0.5">{d.name}</h3>
                <p className="text-[11px] text-amber-600 font-semibold mb-3">{d.visa}</p>
                <div className="border-t border-slate-100 pt-3 space-y-2 mb-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-[9px] uppercase font-bold text-slate-400">Processing</p>
                      <p className="text-xs font-semibold text-slate-700">{d.processing}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase font-bold text-slate-400">Fee</p>
                      <p className="text-xs font-semibold text-slate-700">{d.fee}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase font-bold text-slate-400">Max Stay</p>
                      <p className="text-xs font-semibold text-slate-700">{d.maxStay}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 italic">{d.note}</p>
                </div>
                <div className="border-t border-slate-100 pt-3 space-y-1">
                  {d.highlights.map(h => (
                    <p key={h} className="text-[10px] text-slate-500 flex items-start gap-1.5"><span className="text-amber-400 font-black mt-0.5">·</span>{h}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISA TYPE COMPARISON */}
      <section className="border-b border-slate-100 py-16 px-6 bg-white" id="visa-types">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Know the Difference</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Business Visa vs Work Visa vs Tourist Visa</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl">Choosing the wrong visa category is the most common and costly mistake. Here's exactly what each visa type permits — and what it does not.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VISA_TYPES_COMPARISON.map((v) => (
              <div key={v.type} className={`border-2 rounded-2xl p-6 ${v.type === 'Business Visa' ? 'border-amber-300 bg-amber-50' : 'border-slate-200 bg-white'}`}>
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{v.icon}</span>
                  <h3 className="font-extrabold text-base text-slate-900">{v.type}</h3>
                  {v.type === 'Business Visa' && <span className="text-[9px] font-bold uppercase bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full">This Guide</span>}
                </div>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Permitted Activities</p>
                <ul className="space-y-1.5 mb-4">
                  {v.permitted.map(p => <li key={p} className="flex items-start gap-2 text-xs text-slate-700"><span className="text-green-500 shrink-0 mt-0.5">✓</span>{p}</li>)}
                </ul>
                <p className="text-[10px] uppercase font-bold text-slate-400 mb-2">Not Permitted</p>
                <ul className="space-y-1.5 mb-5">
                  {v.notPermitted.map(p => <li key={p} className="flex items-start gap-2 text-xs text-slate-500"><span className="text-red-400 shrink-0 mt-0.5">✕</span>{p}</li>)}
                </ul>
                <div className="border-t border-slate-200 pt-4">
                  <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Typical Duration</p>
                  <p className="text-xs font-bold text-slate-800">{v.duration}</p>
                </div>
                {v.type === 'Work Visa' && (
                  <Link href="/visa/work-visa" className="mt-4 block text-center text-xs font-bold text-blue-600 hover:underline">View Work Visa Guide →</Link>
                )}
                {v.type === 'Tourist Visa' && (
                  <Link href="/visa/tourist-visa" className="mt-4 block text-center text-xs font-bold text-green-600 hover:underline">View Tourist Visa Guide →</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="border-b border-slate-100 py-16 px-6 bg-slate-50" id="documents">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Universal Checklist</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Documents Required for a Business Visa</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-sm">The following documents are required for almost every business visa application worldwide. Use our <Link href="#search" className="text-amber-600 font-semibold hover:underline">route search</Link> for the exact destination-specific checklist, including any country-specific requirements not listed here.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DOCUMENTS.map((doc) => (
              <div key={doc.title} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-amber-200 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{doc.icon}</span>
                    <h4 className="font-bold text-sm text-slate-900">{doc.title}</h4>
                  </div>
                  <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ml-2 ${doc.mandatory ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-500'}`}>
                    {doc.mandatory ? 'Required' : 'Recommended'}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{doc.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/visa-resources/visa-checklist-generator"
              className="inline-block bg-amber-400 text-slate-900 px-10 py-4 rounded-xl font-bold hover:bg-amber-500 transition-all shadow-lg shadow-amber-100 text-sm text-center">
              Generate Country-Specific Checklist (PDF) →
            </Link>
            <Link href="/visa-resources/visa-document-generator"
              className="inline-block bg-white text-slate-900 border border-slate-200 px-10 py-4 rounded-xl font-bold hover:border-amber-300 transition-all text-sm text-center">
              View Cover Letter Templates →
            </Link>
          </div>
        </div>
      </section>

      {/* SCHENGEN ZONE INFO */}
      <section className="border-b border-slate-100 py-16 px-6 bg-white" id="schengen">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">European Business Travel</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Schengen Business Visa — Complete Guide</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl">A single Schengen Business Visa covers 27 European countries. Here's everything you need to know about applying, which country to apply through, and how the 90/180-day rule works.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-5">
              {[
                {
                  heading: "Which Embassy Do You Apply Through?",
                  body: "Apply through the embassy of the country where you will spend the most days. If two countries have equal days, apply through the country of first entry. If attending a conference that spans multiple countries, apply through the country hosting the main event.",
                },
                {
                  heading: "The 90/180 Day Rule Explained",
                  body: "A Schengen business visa allows a maximum of 90 days within any rolling 180-day period across all 27 Schengen member states combined. The 180 days is a rolling window — not a calendar half-year. Use the EU's official Schengen calculator to track your days.",
                },
                {
                  heading: "Single Entry vs Multiple Entry",
                  body: "First-time Schengen applicants typically receive single-entry visas. After a good travel history with previous Schengen visas, you may qualify for a multiple-entry Schengen visa valid for 1–5 years — significantly reducing future application hassle.",
                },
                {
                  heading: "€30,000 Insurance Requirement",
                  body: "All Schengen visa applicants must provide travel insurance with a minimum coverage of €30,000 for medical expenses and emergency repatriation, valid in all Schengen countries and for the full duration of the visit.",
                },
              ].map(item => (
                <div key={item.heading} className="border-l-4 border-amber-300 pl-5">
                  <h3 className="font-bold text-sm text-slate-900 mb-1.5">{item.heading}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-4 tracking-widest">27 Schengen Member States</p>
              <div className="grid grid-cols-2 gap-2">
                {SCHENGEN_COUNTRIES.map(c => (
                  <p key={c} className="text-xs text-slate-600 font-medium flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />{c}
                  </p>
                ))}
              </div>
              <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-5">
                <h4 className="font-bold text-sm text-amber-900 mb-2">🇪🇺 Important Schengen Note</h4>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Switzerland, Norway, Iceland, and Liechtenstein are Schengen members but NOT EU members. Your Schengen visa is still valid there. Bulgaria, Romania, and Croatia joined Schengen in 2024 and are now fully covered.
                </p>
              </div>
              <div className="mt-4 bg-white border border-slate-200 rounded-xl p-5">
                <h4 className="font-bold text-sm text-slate-900 mb-3">Business Visa Guides for Schengen Countries</h4>
                <div className="space-y-2">
                  {[
                    { name: "Germany Business Visa", code: "de", href: "/visa/business-visa/india-to-germany" },
                    { name: "France Business Visa", code: "fr", href: "/visa/business-visa/india-to-france" },
                    { name: "Netherlands Business Visa", code: "nl", href: "/visa/business-visa/india-to-netherlands" },
                    { name: "Spain Business Visa", code: "es", href: "/visa/business-visa/india-to-spain" },
                    { name: "Italy Business Visa", code: "it", href: "/visa/business-visa/india-to-italy" },
                  ].map(link => (
                    <Link key={link.href} href={link.href}
                      className="flex items-center gap-3 py-2 border-b border-slate-100 last:border-0 hover:text-amber-600 transition-colors">
                      <img src={flagUrl(link.code)} className="w-6 h-4 rounded object-cover" alt={link.name} />
                      <span className="text-xs font-semibold text-slate-700 hover:text-amber-600">{link.name} →</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REJECTION REASONS */}
      <section className="border-b border-slate-100 py-16 px-6 bg-slate-50" id="rejection-reasons">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Avoid Common Mistakes</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Top Reasons Business Visas Get Rejected</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl">Most business visa rejections are preventable. Here are the most common causes — and exactly how to fix them before you apply.</p>
          </div>
          <div className="space-y-4">
            {REJECTION_REASONS.map((r) => (
              <div key={r.reason} className={`bg-white border rounded-xl p-5 flex flex-col md:flex-row gap-4 ${r.severity === 'critical' ? 'border-red-200 bg-red-50' : r.severity === 'high' ? 'border-orange-200' : 'border-slate-200'}`}>
                <div className="shrink-0">
                  <span className={`inline-block text-[9px] font-bold uppercase px-3 py-1 rounded-full ${r.severity === 'critical' ? 'bg-red-100 text-red-700' : r.severity === 'high' ? 'bg-orange-100 text-orange-700' : r.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-slate-100 text-slate-500'}`}>
                    {r.severity === 'critical' ? '🚨 Critical' : r.severity === 'high' ? '⚠️ High Risk' : r.severity === 'medium' ? '⚡ Medium Risk' : 'Low Risk'}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-slate-900 mb-1">{r.reason}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">Fix: {r.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE YOU APPLY */}
      <section className="border-b border-slate-100 py-16 px-6 bg-white" id="before-you-apply">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Expert Guidance</p>
            <h2 className="text-3xl font-extrabold tracking-tight">What to Know Before Applying</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                heading: "Business Visa vs Work Visa — Know the Difference",
                body: "A business visa permits short-term commercial activities: meetings, conferences, site visits, and contract signings. It does not allow you to take up employment, receive payment from a local company, or remain in the country long-term. If you intend to work for a company in the destination country — even remotely — you need a work visa. See our complete Work Visa Guide for details.",
                link: { href: "/visa/work-visa", label: "Work Visa Guide →" },
              },
              {
                heading: "The Invitation Letter Is the Most Critical Document",
                body: "Most business visa rejections happen because the invitation letter is missing, vague, or not on official company letterhead. The letter must be signed by a director or senior executive, state the exact dates and purpose of the visit, and confirm the host company will receive you. Use our template below as a starting point — and ensure specific meeting dates and activities are named, not just 'business meetings'.",
                link: { href: "/visa-resources/visa-document-generator", label: "View Invitation Letter Template →" },
              },
              {
                heading: "Book Refundable Accommodation Only",
                body: "Most embassies require confirmed hotel bookings for your full stay as part of the application. Do not book non-refundable hotels until your visa is approved. Instead, book refundable rates as placeholders during the application process. Booking.com's free cancellation option is widely accepted. The booking must show your full name, hotel address, and exact dates matching your visa application.",
                link: null,
              },
              {
                heading: "Schengen Covers 27 Countries in One Application",
                body: "If your business travel involves multiple European countries, a single Schengen Business Visa covers all 27 member states. Apply through the embassy of the country where you will spend the most days. The visa allows up to 90 days within any 180-day period across all Schengen countries combined. See our full Schengen guide above for the 90/180-day calculation rule.",
                link: { href: "#schengen", label: "Schengen Visa Guide →" },
              },
              {
                heading: "Prior Visa History Significantly Speeds Up Processing",
                body: "If you have previously visited the destination country or similar high-income countries (US, UK, Schengen), include copies of your prior visas with your application. A strong travel history demonstrates you have respected visa conditions previously and typically results in faster approvals with less scrutiny. Some embassies may grant multiple-entry visas to applicants with strong travel histories.",
                link: null,
              },
              {
                heading: "A Business Visa Does Not Guarantee Entry",
                body: "A visa is permission to request entry — not a guarantee. Border officials at the destination country can deny entry if they are not satisfied with your stated purpose or if they feel your documents are inconsistent. Always carry your full document set — invitation letter, hotel bookings, employer letter, and return ticket — in your hand luggage, not in checked baggage, for inspection at the border.",
                link: null,
              },
            ].map((item) => (
              <div key={item.heading} className="border-l-4 border-amber-300 pl-6">
                <h3 className="font-bold text-base text-slate-900 mb-2">{item.heading}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-2">{item.body}</p>
                {item.link && <Link href={item.link.href} className="text-xs font-bold text-amber-600 hover:underline">{item.link.label}</Link>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EMAIL TEMPLATE */}
      <section className="border-b border-slate-100 py-16 px-6 bg-slate-50" id="email-guide">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Free Template — Updated 2026</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Business Visa Invitation Letter Template</h2>
            <p className="text-slate-500 mt-3 max-w-xl text-sm">
              This template should be issued by your host company in the destination country on official letterhead.
              Replace all fields in [square brackets] with your specific information. This format is accepted by most embassies worldwide for business visa applications.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="border-b border-slate-100 px-6 py-4 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="ml-3 text-[11px] font-bold uppercase tracking-widest text-slate-400">Invitation Letter Template — Business Visa 2026</span>
              </div>
              <button onClick={() => setShowEmail(!showEmail)}
                className="text-xs font-bold text-amber-600 hover:text-amber-800 transition-colors uppercase tracking-widest">
                {showEmail ? "Hide ↑" : "Show Template ↓"}
              </button>
            </div>
            {showEmail && (
              <div className="p-8">
                <pre className="text-xs font-mono leading-relaxed text-slate-600 whitespace-pre-wrap bg-slate-50 p-6 rounded-xl border border-slate-100">{EMAIL_TEMPLATE}</pre>
                <div className="mt-6 flex flex-wrap gap-3">
                  <button onClick={handleCopy}
                    className="bg-amber-400 text-slate-900 px-8 py-3 rounded-xl font-bold text-sm hover:bg-amber-500 transition-all">
                    {copied ? "Copied ✓" : "Copy Template"}
                  </button>
                  <Link href="/visa-resources/cover-letter-templates"
                    className="bg-white text-slate-700 border border-slate-200 px-8 py-3 rounded-xl font-bold text-sm hover:border-amber-300 transition-all">
                    View More Templates →
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { tip: "Use official company letterhead", detail: "The letter must be on headed paper with company logo, address, phone, email, and company registration number. A plain white paper letter will likely result in rejection." },
              { tip: "State specific dates and meeting purpose", detail: "Vague phrases like 'business meetings' are weaker than 'attending the Q3 Global Supplier Review at [Host Company HQ], 10–12 June 2026.' Consular officers want specifics." },
              { tip: "Senior signatory is essential", detail: "A letter signed by a Director, MD, or C-level executive carries significantly more weight than one from a middle manager or administrator. The signatory's full name and designation must be clearly printed below the signature." },
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
            <h3 className="text-2xl font-extrabold text-slate-900">Not a Business Traveller? Explore Other Visa Types</h3>
            <p className="text-sm text-amber-900 mt-2">Full guides for work, student, tourist, and transit visas — 40+ countries, all nationalities.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/visa/work-visa" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-700 transition-all">Work Visa →</Link>
            <Link href="/visa/student-visa" className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all border border-slate-200">Student Visa →</Link>
            <Link href="/visa/tourist-visa" className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all border border-slate-200">Tourist Visa →</Link>
            <Link href="/visa/transit-visa" className="bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all border border-slate-200">Transit Visa →</Link>
          </div>
        </div>
      </section>

      {/* GUIDE LIBRARY — Internal Linking Hub */}
      <section className="border-b border-slate-100 py-16 px-6 bg-white" id="guides">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Full Guide Library</p>
            <h2 className="text-3xl font-extrabold tracking-tight">Business Visa Guides by Destination & Nationality</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl">Each guide includes the full document checklist, current fees, processing times, and direct links to official embassy portals — personalised for your nationality.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOP_DESTINATIONS.slice(0, 8).map((dest) => (
              <div key={dest.code} className="border border-slate-200 rounded-xl p-5 bg-white hover:border-amber-200 transition-colors">
                <img src={flagUrl(dest.code)} className="w-10 h-7 object-cover rounded border border-slate-100 mb-3" alt={dest.name} />
                <h4 className="font-bold text-sm text-slate-900 mb-1">{dest.name} Business Visa</h4>
                <p className="text-[11px] text-amber-600 font-semibold mb-4">{dest.visa}</p>
                <div className="space-y-2">
                  {[
                    { label: "Indian", code: "in" },
                    { label: "Nigerian", code: "ng" },
                    { label: "Pakistani", code: "pk" },
                    { label: "Filipino", code: "ph" },
                    { label: "Bangladeshi", code: "bd" },
                  ].map((nat) => (
                    <Link key={nat.label}
                      href={`/visa/business-visa/${nat.label.toLowerCase()}-to-${dest.name.toLowerCase().replace(/\s+/g, '-')}?nFlag=${encodeURIComponent(flagUrl(nat.code))}&dFlag=${encodeURIComponent(flagUrl(dest.code))}`}
                      className="block text-[11px] font-semibold text-slate-400 hover:text-amber-600 hover:underline underline-offset-4 transition-colors">
                      {nat.label} nationals →
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Visa Resources Links */}
          <div className="mt-10 bg-slate-50 border border-slate-200 rounded-2xl p-8">
            <h3 className="font-bold text-base text-slate-900 mb-6">Visa Tools & Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: "📋", title: "Visa Checklist Generator", desc: "Personalised PDF checklist for any nationality and destination", href: "/visa-resources/visa-checklist-generator" },
                { icon: "✉️", title: "Cover Letter Templates", desc: "Invitation letter and employer cover letter templates", href: "/visa-resources/visa-document-generator" },
                { icon: "🏛️", title: "Embassy Directory", desc: "Official embassy contacts, addresses, and appointment links", href: "/visa-resources" },
                { icon: "⏱️", title: "Processing Time Tracker", desc: "Live-updated processing times for 40+ countries", href: "/visa-resources/visa-processing-time-tracker" },
              ].map(r => (
                <Link key={r.title} href={r.href}
                  className="bg-white border border-slate-200 rounded-xl p-5 hover:border-amber-200 hover:shadow-sm transition-all">
                  <span className="text-2xl mb-3 block">{r.icon}</span>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">{r.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{r.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}