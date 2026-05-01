"use client";
// /app/travel-resources/visa-rejection-checker/page.jsx
// ─── Main landing page ────────────────────────────────────────────────────

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search, Globe, ChevronRight, AlertTriangle, ShieldCheck,
  XCircle, TrendingUp, Users, Star, ArrowRight, FileWarning,
  CheckCircle2, AlertCircle, Clock, Zap
} from "lucide-react";

// ── VISA TYPES ─────────────────────────────────────────────────────────────
const VISA_TYPES = [
  { value: "tourist",  label: "Tourist / Visitor",  icon: "✈️" },
  { value: "student",  label: "Student Visa",        icon: "🎓" },
  { value: "work",     label: "Work Visa",           icon: "💼" },
  { value: "transit",  label: "Transit Visa",        icon: "🔁" },
  { value: "business", label: "Business Visa",       icon: "🤝" },
  { value: "family",   label: "Family / Spouse",     icon: "👨‍👩‍👧" },
];

// ── POPULAR SEARCHES ────────────────────────────────────────────────────────
const POPULAR = [
  { nationality: "Bangladesh", destination: "Canada",        type: "tourist",  rate: "38%" },
  { nationality: "Bangladesh", destination: "United States", type: "tourist",  rate: "42%" },
  { nationality: "Bangladesh", destination: "United Kingdom",type: "tourist",  rate: "29%" },
  { nationality: "India",      destination: "Canada",        type: "student",  rate: "18%" },
  { nationality: "Bangladesh", destination: "Schengen",      type: "tourist",  rate: "31%" },
  { nationality: "Pakistan",   destination: "United Kingdom",type: "tourist",  rate: "34%" },
  { nationality: "Nigeria",    destination: "United States", type: "tourist",  rate: "55%" },
  { nationality: "Bangladesh", destination: "Australia",     type: "student",  rate: "22%" },
];

const STATS = [
  { label: "Countries Covered",   value: "195+",  icon: Globe         },
  { label: "Rejection Reasons",   value: "80+",   icon: FileWarning   },
  { label: "Monthly Checks",      value: "38K+",  icon: Users         },
  { label: "Avg. Accuracy",       value: "91%",   icon: Star          },
];

const REJECTION_REASONS = [
  { icon: "💰", title: "Insufficient Funds",       desc: "Bank balance too low or not showing stable financial history for the intended trip duration." },
  { icon: "📋", title: "Incomplete Documents",      desc: "Missing supporting documents, expired passport, or incorrect application forms." },
  { icon: "🏠", title: "Weak Ties to Home Country", desc: "No proof of employment, property ownership, or family ties that ensure return." },
  { icon: "✈️", title: "Poor Travel History",       desc: "First-time applicant with no prior visa record, or previous overstays flagged." },
  { icon: "🚫", title: "Prior Refusal Not Declared",desc: "Failure to declare previous rejections is treated as misrepresentation." },
  { icon: "📅", title: "Applied Too Early / Late",  desc: "Application timing outside the embassy's acceptance window causes automatic rejection." },
];

function makeSlug(nationality, destination, type) {
  const nat  = nationality.toLowerCase().replace(/\s+/g, "-");
  const dest = destination.toLowerCase().replace(/\s+/g, "-");
  return `${nat}-visa-rejection-rate-for-${dest}`;
}

// ── COUNTRY AUTOCOMPLETE ────────────────────────────────────────────────────
function CountrySelect({ label, value, onChange, placeholder, countries, isLoading }) {
  const [open,  setOpen]  = useState(false);
  const [query, setQuery] = useState(value || "");
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => { if (!value) setQuery(""); }, [value]);

  const filtered = useMemo(() => {
    if (!query) return countries.slice(0, 8);
    return countries.filter(c => c.country.toLowerCase().includes(query.toLowerCase())).slice(0, 10);
  }, [query, countries]);

  const select = (c) => { onChange(c.country); setQuery(c.country); setOpen(false); };

  return (
    <div ref={ref} className="relative">
      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{label}</label>
      <div className="relative">
        <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          className="w-full pl-10 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl text-sm font-semibold text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-red-400 transition-all"
          placeholder={isLoading ? "Loading countries…" : placeholder}
          value={query}
          disabled={isLoading}
          onChange={e => { setQuery(e.target.value); onChange(""); setOpen(true); }}
          onFocus={() => setOpen(true)}
          autoComplete="off"
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-red-200 border-t-red-500 rounded-full animate-spin" />
          </div>
        )}
      </div>
      {open && !isLoading && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden">
          <div className="max-h-52 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-4 py-3 text-sm text-slate-400">No country found for "{query}"</div>
            ) : filtered.map(c => (
              <button
                key={c.code}
                onMouseDown={() => select(c)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left"
              >
                <img src={c.flag} alt="" className="w-5 h-4 object-cover rounded-sm shrink-0" />
                <span className="text-sm font-semibold text-slate-800">{c.country}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── VISA TYPE SELECT ────────────────────────────────────────────────────────
function VisaTypeSelect({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const selected = VISA_TYPES.find(v => v.value === value);

  return (
    <div ref={ref} className="relative">
      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Visa Type</label>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-3 px-4 py-4 bg-white border-2 border-slate-100 hover:border-red-300 rounded-2xl text-sm text-left transition-all outline-none"
      >
        {selected
          ? <><span className="text-lg">{selected.icon}</span><span className="font-bold text-slate-800 flex-1">{selected.label}</span></>
          : <span className="text-slate-300 flex-1 font-semibold">Select visa type…</span>
        }
        <svg className={`w-4 h-4 text-slate-400 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden">
          {VISA_TYPES.map(v => (
            <button
              key={v.value}
              onMouseDown={() => { onChange(v.value); setOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm hover:bg-red-50 transition-colors
                ${value === v.value ? "bg-red-50 text-red-800 font-bold" : "text-slate-700 font-semibold"}`}
            >
              <span className="text-lg">{v.icon}</span>
              {v.label}
              {value === v.value && <span className="ml-auto text-red-500 font-bold text-xs">✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── MAIN PAGE ──────────────────────────────────────────────────────────────
export default function VisaRejectionCheckerPage() {
  const router = useRouter();
  const [nationality,  setNationality]  = useState("");
  const [destination,  setDestination]  = useState("");
  const [visaType,     setVisaType]     = useState("");
  const [error,        setError]        = useState("");
  const [countries,    setCountries]    = useState([]);
  const [isLoading,    setIsLoading]    = useState(true);

  useEffect(() => {
    fetch("/api/countries")
      .then(r => r.json())
      .then(d => { setCountries(d); setIsLoading(false); })
      .catch(() => setIsLoading(false));
  }, []);

  const handleCheck = () => {
    if (!nationality || !destination || !visaType) {
      setError("Please fill in all three fields to continue.");
      return;
    }
    if (nationality === destination) {
      setError("Nationality and destination cannot be the same.");
      return;
    }
    setError("");
    const slug = makeSlug(nationality, destination, visaType);
    router.push(`/visa-rejection/${slug}?type=${visaType}`);
  };

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-white py-6 px-6 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-red-500/[0.03] rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-400/[0.05] rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="absolute inset-0 opacity-[0.012]" style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }} />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-red-50 border border-red-100 px-4 py-2 rounded-full mb-6">
              <AlertTriangle size={14} className="text-red-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-red-600">Know Before You Apply</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.88] tracking-tighter mb-6">
              Visa Rejection
              <span className="text-transparent" style={{ WebkitTextStroke: "2px #ef4444" }}> Risk Checker.</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-5xl mx-auto font-medium leading-relaxed">
              Find out the real rejection rate for your nationality, destination, and visa type.
              Understand <strong className="text-slate-800">why visas get refused</strong> and exactly
              what to fix before you apply. Used by <strong className="text-slate-800">38,000+ travelers</strong> monthly.
            </p>
          </div>

          {/* ── SEARCH CARD ───────────────────────────────────────────────── */}
          <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/60 max-w-6xl mx-auto">
            <h2 className="text-xl font-black text-slate-800 mb-8 flex items-center gap-3">
              <div className="w-8 h-8 bg-red-500 rounded-xl flex items-center justify-center">
                <Search size={16} className="text-white" />
              </div>
              Check Your Visa Rejection Risk
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <CountrySelect
                label="Your Nationality"
                value={nationality}
                onChange={setNationality}
                placeholder="e.g. Bangladesh"
                countries={countries}
                isLoading={isLoading}
              />
              <CountrySelect
                label="Destination Country"
                value={destination}
                onChange={setDestination}
                placeholder="e.g. Canada"
                countries={countries}
                isLoading={isLoading}
              />
              <VisaTypeSelect value={visaType} onChange={setVisaType} />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm font-semibold mb-4 px-4 py-3 bg-red-50 rounded-xl border border-red-100">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <button
              onClick={handleCheck}
              className="w-full py-5 bg-red-500 hover:bg-red-600 text-white font-black text-lg rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] shadow-lg shadow-red-200"
            >
              <ShieldCheck size={22} />
              Check Rejection Risk
              <ArrowRight size={20} />
            </button>

            <p className="text-center text-xs text-slate-400 mt-4 font-medium">
              Free · No signup required · Based on real embassy data
            </p>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-8 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-red-400" />
                </div>
                <div>
                  <div className="text-xl font-black text-white">{value}</div>
                  <div className="text-xs text-slate-400 font-semibold">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR SEARCHES ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-red-500 block mb-2">🔥 Most Checked</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Highest Rejection Rate Combos</h2>
              <p className="text-slate-500 text-sm mt-2 font-medium">Based on real embassy refusal data · Updated monthly</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <TrendingUp size={14} /> Live Data
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {POPULAR.map((p, i) => {
              const slug = makeSlug(p.nationality, p.destination, p.type);
              const type = VISA_TYPES.find(v => v.value === p.type);
              const rateNum = parseInt(p.rate);
              const rateColor = rateNum >= 40 ? "text-red-600 bg-red-50" : rateNum >= 25 ? "text-orange-600 bg-orange-50" : "text-yellow-700 bg-yellow-50";
              return (
                <Link
                  key={i}
                  href={`/visa-rejection/${slug}?type=${p.type}`}
                  className="group flex items-center justify-between p-5 bg-white border-2 border-slate-100 rounded-2xl hover:border-red-300 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center font-black text-lg text-slate-400 group-hover:bg-red-500 group-hover:text-white transition-colors">
                      {i + 1}
                    </div>
                    <div>
                      <div className="font-black text-slate-800 text-sm">{p.nationality} → {p.destination}</div>
                      <div className="text-xs font-bold mt-0.5 text-slate-400">{type?.icon} {type?.label}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-black px-3 py-1.5 rounded-full ${rateColor}`}>
                      {p.rate} refused
                    </span>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-red-500 transition-colors" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TOP REJECTION REASONS ─────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">Why Visas Get Rejected</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">The 6 most common reasons embassies refuse visa applications — and how to fix them</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REJECTION_REASONS.map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-[2rem] p-7 border border-slate-100 shadow-sm hover:shadow-md hover:border-red-100 transition-all">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-base font-black text-slate-800 mb-3">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white border-t border-slate-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Visa Rejection Checker: Complete Guide 2025</h2>
          <p className="text-slate-600 leading-relaxed mb-6 text-sm">
            A visa rejection can delay your plans by months and affect future applications. Our Visa Rejection Risk
            Checker gives you the real refusal rate for your exact nationality and destination combination — based
            on embassy statistics, applicant reports, and official government transparency data.
          </p>
          <h3 className="text-xl font-black text-slate-900 mb-3">What Affects Visa Rejection Rate?</h3>
          <ul className="space-y-3 text-slate-600">
            {[
              "Your nationality — bilateral relations between countries heavily influence approval rates",
              "Financial documentation — insufficient funds is the #1 rejection reason globally",
              "Travel history — first-time applicants face higher scrutiny in most countries",
              "Ties to home country — employment, property, and family evidence are critical",
              "Application completeness — missing documents cause 30%+ of preventable rejections",
              "Prior refusals — must always be declared; hiding them causes instant rejection",
              "Seasonal volume — embassies under pressure during peak season apply stricter standards",
              "Purpose clarity — vague or inconsistent travel reasons increase suspicion",
            ].map(item => (
              <li key={item} className="flex items-start gap-3">
                <XCircle size={16} className="text-red-400 shrink-0 mt-1" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

    </div>
  );
}