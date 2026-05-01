"use client";
// /app/travel-resources/visa-processing-time-tracker/page-client.jsx

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search, Clock, TrendingUp, Globe, ChevronRight, Zap,
  AlertCircle, CheckCircle2, Timer, Users, Star, ArrowRight,
  Shield, BookOpen, HelpCircle, BarChart2, MapPin, Phone
} from "lucide-react";

// ── VISA TYPES ─────────────────────────────────────────────────────────────
const VISA_TYPES = [
  { value: "e-visa",           label: "E-Visa (Online)",        icon: "⚡", desc: "2–5 days" },
  { value: "sticker",          label: "Sticker Visa",           icon: "🏷️", desc: "15–21 days" },
  { value: "sticker-extended", label: "Sticker (Complex Case)", icon: "📋", desc: "45–60 days" },
  { value: "transit",          label: "Transit Visa",           icon: "🔁", desc: "6–24 hours" },
];

// ── POPULAR SEARCHES ───────────────────────────────────────────────────────
const POPULAR = [
  { nationality:"Bangladesh",  destination:"Canada",               type:"sticker",  searches:"18.4K/mo", flag:"🇨🇦" },
  { nationality:"Bangladesh",  destination:"United States",        type:"sticker",  searches:"14.1K/mo", flag:"🇺🇸" },
  { nationality:"Bangladesh",  destination:"United Kingdom",       type:"sticker",  searches:"12.8K/mo", flag:"🇬🇧" },
  { nationality:"India",       destination:"Canada",               type:"sticker",  searches:"9.6K/mo",  flag:"🇨🇦" },
  { nationality:"Bangladesh",  destination:"Schengen",             type:"sticker",  searches:"8.3K/mo",  flag:"🇪🇺" },
  { nationality:"Pakistan",    destination:"United Arab Emirates", type:"e-visa",   searches:"7.1K/mo",  flag:"🇦🇪" },
  { nationality:"Nigeria",     destination:"United Kingdom",       type:"sticker",  searches:"6.9K/mo",  flag:"🇬🇧" },
  { nationality:"Bangladesh",  destination:"Australia",            type:"sticker",  searches:"5.7K/mo",  flag:"🇦🇺" },
  { nationality:"Bangladesh",  destination:"Germany",              type:"sticker",  searches:"4.9K/mo",  flag:"🇩🇪" },
  { nationality:"Bangladesh",  destination:"United Arab Emirates", type:"transit",  searches:"4.1K/mo",  flag:"🇦🇪" },
];

// ── STATS ─────────────────────────────────────────────────────────────────
const STATS = [
  { label:"Countries Covered",  value:"195+",  icon:Globe,    color:"text-emerald-400" },
  { label:"Processing Times",   value:"1,200+",icon:Clock,    color:"text-amber-400"   },
  { label:"Monthly Users",      value:"42K+",  icon:Users,    color:"text-blue-400"    },
  { label:"Avg. Accuracy",      value:"94%",   icon:Star,     color:"text-rose-400"    },
];

// ── VISA CATEGORIES EXPLAINER ───────────────────────────────────────────────
const VISA_CATEGORIES = [
  {
    icon:"🔁",
    color:"bg-purple-500",
    lightColor:"bg-purple-50 border-purple-100",
    title:"Transit Visa",
    time:"6–24 Hours",
    desc:"For airport layovers. Required even if you never leave the terminal for certain nationalities. Same-day or overnight decision.",
    examples:["UK DATV", "Germany TATV", "Canada Transit", "France ATV"],
  },
  {
    icon:"⚡",
    color:"bg-amber-400",
    lightColor:"bg-amber-50 border-amber-100",
    title:"E-Visa (Online)",
    time:"2–5 Business Days",
    desc:"Fully online application via the destination government portal. Approval delivered by email. No embassy visit required.",
    examples:["UAE e-Visa", "Turkey e-Visa", "India e-Visa", "Saudi e-Visa"],
  },
  {
    icon:"🏷️",
    color:"bg-[#005a31]",
    lightColor:"bg-emerald-50 border-emerald-100",
    title:"Sticker Visa",
    time:"15–21 Business Days",
    desc:"Physical visa stamped in passport. Requires biometrics and sometimes an in-person interview at an embassy or VAC.",
    examples:["USA B1/B2", "UK Visitor", "Canada TRV", "Schengen C Visa"],
  },
  {
    icon:"📋",
    color:"bg-slate-800",
    lightColor:"bg-slate-50 border-slate-100",
    title:"Complex Case",
    time:"45–90 Business Days",
    desc:"Administrative processing, security checks, or additional document requests. Can happen to any applicant regardless of nationality.",
    examples:["US 221(g)", "UK Deferred", "Canada Admin Review", "Aus. Health Check"],
  },
];

// ── WHY EAMMU SECTION ──────────────────────────────────────────────────────
const WHY_EAMMU = [
  { icon:"📊", title:"Embassy-Verified Data", desc:"Processing times sourced from official embassy guidelines, not speculation." },
  { icon:"🔄", title:"Updated Monthly",       desc:"Real applicant reports help us keep timelines accurate year-round." },
  { icon:"🧮", title:"Application Calculator", desc:"Our reverse calculator tells you exactly when to apply based on your travel date." },
  { icon:"🌍", title:"195+ Countries",         desc:"Covers virtually every travel corridor with e-visa, sticker, transit & complex cases." },
  { icon:"🆓", title:"Completely Free",        desc:"No signup, no fees. Instant results for any nationality-destination combination." },
  { icon:"🧑‍💼", title:"Expert Support",         desc:"Real visa consultants available on WhatsApp for personalized guidance." },
];

function makeSlug(nationality, destination) {
  const nat  = nationality.toLowerCase().replace(/\s+/g, "-");
  const dest = destination.toLowerCase().replace(/\s+/g, "-");
  return `${nat}-national-visa-processing-time-for-${dest}`;
}

// ── COUNTRY AUTOCOMPLETE ───────────────────────────────────────────────────
function CountrySelect({ label, value, onChange, placeholder, countries }) {
  const [open,  setOpen]  = useState(false);
  const [query, setQuery] = useState(value || "");
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const filtered = useMemo(() => {
    if (!query) return countries.slice(0, 8);
    return countries.filter(c =>
      c.country.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);
  }, [query, countries]);

  const select = (c) => { onChange(c.country); setQuery(c.country); setOpen(false); };

  return (
    <div ref={ref} className="relative">
      <label className="block text-xs font-black uppercase tracking-widest text-slate-400 mb-2">{label}</label>
      <div className="relative">
        <Globe size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        <input
          className="w-full pl-10 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl text-sm font-semibold text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-[#005a31] transition-all"
          placeholder={placeholder}
          value={query}
          onChange={e => { setQuery(e.target.value); onChange(""); setOpen(true); }}
          onFocus={() => setOpen(true)}
          autoComplete="off"
        />
      </div>
      {open && filtered.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden">
          {filtered.map(c => (
            <button
              key={c.code}
              onMouseDown={() => select(c)}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
            >
              <img src={c.flag} alt="" className="w-5 h-4 object-cover rounded-sm shrink-0" />
              <span className="text-sm font-semibold text-slate-800">{c.country}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── VISA TYPE SELECT ──────────────────────────────────────────────────────
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
        className="w-full flex items-center gap-3 px-4 py-4 bg-white border-2 border-slate-100 hover:border-[#005a31] rounded-2xl text-sm text-left transition-all outline-none"
      >
        {selected
          ? <><span className="text-lg">{selected.icon}</span><span className="font-bold text-slate-800 flex-1">{selected.label}</span><span className="text-xs text-slate-400 font-semibold">{selected.desc}</span></>
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
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left text-sm hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0
                ${value === v.value ? "bg-[#005a31]/5 text-[#005a31] font-bold" : "text-slate-700 font-semibold"}`}
            >
              <span className="text-lg">{v.icon}</span>
              <div className="flex-1">
                <div>{v.label}</div>
                <div className="text-[10px] font-semibold text-slate-400">{v.desc}</div>
              </div>
              {value === v.value && <span className="ml-auto text-[#005a31] font-black text-xs bg-[#005a31]/10 px-2 py-1 rounded-lg">✓ Selected</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── MAIN PAGE COMPONENT ───────────────────────────────────────────────────
export default function VisaProcessingTimeTrackerClient() {
  const router = useRouter();
  const [nationality, setNationality] = useState("");
  const [destination, setDestination] = useState("");
  const [visaType,    setVisaType]    = useState("");
  const [error,       setError]       = useState("");
  const [countries,   setCountries]   = useState([]);

  const handleCheck = () => {
    if (!nationality || !destination || !visaType) {
      setError("Please fill in all three fields to check processing time.");
      return;
    }
    setError("");
    const slug = makeSlug(nationality, destination);
    router.push(`/visa-processing-time-tracker/${slug}?type=${visaType}`);
  };

  useEffect(() => {
    fetch('/api/countries')
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── ANNOUNCEMENT BAR ──────────────────────────────────────────────── */}
      <div className="bg-[#004d2c] py-2.5 px-6 text-center">
        <p className="text-xs text-green-300/80 font-semibold">
          🆕 Now tracking transit visa times for 40+ major airport transit hubs &nbsp;·&nbsp;
          ✅ Data updated April 2025
        </p>
      </div>

      {/* ── BREADCRUMB ────────────────────────────────────────────────────── */}
      <div className="bg-slate-50 border-b border-slate-100 px-6 py-3">
        <div className="container mx-auto max-w-6xl flex items-center gap-2 text-xs text-slate-400 font-semibold">
          <Link href="/" className="hover:text-[#005a31] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/travel-resources" className="hover:text-[#005a31] transition-colors">Travel Resources</Link>
          <ChevronRight size={12} />
          <span className="text-slate-600">Visa Processing Time Tracker</span>
        </div>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-white py-6 px-6 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#005a31]/4 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-400/8 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage:`linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize:"60px 60px",
          }} />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-[#005a31]/8 border border-[#005a31]/15 px-4 py-2 rounded-full mb-6">
              <Timer size={14} className="text-[#005a31]" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#005a31]">Embassy-Verified Processing Data · 2025</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-[#004d2c] leading-[0.88] tracking-tighter mb-6">
              Visa Processing <span className="text-transparent" style={{ WebkitTextStroke:"2px #004d2c" }}>Time Tracker.</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-5xl mx-auto font-medium leading-relaxed mb-8">
              Find out exactly how long your visa will take — by nationality, destination, and visa type.
              Covers E-Visa, Sticker, Transit & complex cases for{" "}
              <strong className="text-slate-800">195+ countries</strong>. Used by{" "}
              <strong className="text-slate-800">42,000+ travelers</strong> every month. Free, no signup.
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10 text-xs font-bold text-slate-500">
              {[
                { icon:"✅", text:"Embassy-verified data" },
                { icon:"🔄", text:"Updated monthly" },
                { icon:"🔒", text:"No account required" },
                { icon:"🆓", text:"100% free" },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-1.5 bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl">
                  <span>{t.icon}</span> {t.text}
                </div>
              ))}
            </div>
          </div>

          {/* ── SEARCH CARD ───────────────────────────────────────────────── */}
          <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/80 max-w-6xl mx-auto">
            <h2 className="text-xl font-black text-slate-800 mb-2 flex items-center gap-3">
              <div className="w-8 h-8 bg-amber-400 rounded-xl flex items-center justify-center">
                <Search size={16} className="text-[#004d2c]" />
              </div>
              Check Your Visa Processing Time
            </h2>
            <p className="text-slate-400 text-sm font-medium mb-8">Select your nationality, destination country, and visa type to get an accurate estimate.</p>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <CountrySelect
                label="Your Nationality"
                value={nationality}
                onChange={setNationality}
                placeholder="e.g. Bangladesh"
                countries={countries}
              />
              <CountrySelect
                label="Applying For (Destination)"
                value={destination}
                onChange={setDestination}
                placeholder="e.g. Canada"
                countries={countries}
              />
              <VisaTypeSelect value={visaType} onChange={setVisaType} />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 text-sm font-semibold mb-4 bg-red-50 border border-red-100 px-4 py-3 rounded-xl">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <button
              onClick={handleCheck}
              className="w-full py-5 bg-amber-400 hover:bg-[#004d2c] text-[#004d2c] hover:text-white font-black text-lg rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98] shadow-lg shadow-amber-200"
            >
              <Timer size={22} />
              Check Processing Time
              <ArrowRight size={20} />
            </button>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-[11px] text-slate-400 font-semibold">
              <span>✅ Free</span>
              <span>·</span>
              <span>⚡ Instant results</span>
              <span>·</span>
              <span>🔒 No signup required</span>
              <span>·</span>
              <span>📊 Updated monthly</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────────────────────────── */}
      <section className="bg-[#004d2c] py-10 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={20} className={color} />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{value}</div>
                  <div className="text-xs text-green-300/70 font-semibold">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR SEARCHES ───────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-amber-600 block mb-2">🔥 Trending Searches</span>
              <h2 className="text-3xl font-black text-[#004d2c] tracking-tight">Most Searched Visa Processing Times</h2>
              <p className="text-slate-500 text-sm mt-2 font-medium">Based on real monthly search volume · Updated weekly</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl">
              <TrendingUp size={14} /> Live Data
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {POPULAR.map((p, i) => {
              const slug = makeSlug(p.nationality, p.destination);
              const type = VISA_TYPES.find(v => v.value === p.type);
              return (
                <Link
                  key={i}
                  href={`/visa-processing-time-tracker/${slug}?type=${p.type}`}
                  className="group flex items-center justify-between p-5 bg-white border-2 border-slate-100 rounded-2xl hover:border-[#005a31] hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center font-black text-base text-slate-400 group-hover:bg-[#005a31] group-hover:text-white transition-colors shrink-0">
                      {i < 3 ? <span className="text-amber-500 group-hover:text-amber-300">{i + 1}</span> : i + 1}
                    </div>
                    <div>
                      <div className="font-black text-slate-800 text-sm flex items-center gap-2">
                        <span>{p.flag}</span> {p.nationality} → {p.destination}
                      </div>
                      <div className="text-xs font-bold mt-0.5 text-slate-400">{type?.icon} {type?.label} · {type?.desc}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">{p.searches}</span>
                    <ChevronRight size={18} className="text-slate-300 group-hover:text-[#005a31] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW VISA PROCESSING WORKS ──────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <span className="text-xs font-black uppercase tracking-widest text-[#005a31] block mb-3">📚 Learn</span>
            <h2 className="text-3xl font-black text-[#004d2c] tracking-tight mb-3">How Visa Processing Time Works</h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">Understanding why some visas take hours and others take months — and how to plan accordingly.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VISA_CATEGORIES.map(({ icon, color, lightColor, title, time, desc, examples }) => (
              <div key={title} className={`rounded-[2rem] p-7 border ${lightColor}`}>
                <div className={`w-12 h-12 ${color} rounded-2xl flex items-center justify-center mb-5 text-xl shadow-sm`}>
                  {icon}
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{time}</div>
                <h3 className="text-base font-black text-slate-800 mb-3">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {examples.map(t => (
                    <span key={t} className="text-[10px] font-black uppercase tracking-wider bg-white text-slate-500 px-2.5 py-1.5 rounded-lg border border-slate-100">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY EAMMU ─────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-white border-t border-slate-100">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#005a31] block mb-3">Why Eammu?</span>
              <h2 className="text-3xl font-black text-[#004d2c] mb-4 leading-tight">The Most Accurate Visa Processing Tracker in Bangladesh</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8">
                Eammu's Visa Processing Time Tracker is built specifically for travelers from Bangladesh, India, Pakistan,
                Nigeria, and other countries that face stricter embassy scrutiny. We combine official embassy data with
                real applicant reports to give you the most accurate picture possible.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {WHY_EAMMU.map((w, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-xl shrink-0">{w.icon}</span>
                    <div>
                      <div className="font-black text-sm text-slate-800 mb-1">{w.title}</div>
                      <div className="text-xs text-slate-500 font-medium leading-relaxed">{w.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#004d2c] rounded-[2rem] p-10 text-white">
              <div className="text-5xl mb-5">🧑‍💼</div>
              <h3 className="text-2xl font-black mb-3">Need Personal Visa Help?</h3>
              <p className="text-green-200/70 text-sm leading-relaxed mb-8">
                Our certified visa consultants handle applications for USA, UK, Canada, Schengen, Australia,
                UAE, and 50+ more countries. From document preparation to submission and tracking — we handle everything.
              </p>
              <div className="space-y-3 mb-8">
                {["Document checklist review", "Application form completion", "Cover letter writing", "Submission & tracking support"].map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                    <span className="text-sm font-semibold text-green-100/90">{s}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://wa.me/8801631312524"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 bg-amber-400 text-[#004d2c] font-black rounded-2xl hover:bg-white transition-all text-center text-sm"
              >
                💬 WhatsApp a Visa Consultant →
              </a>
              <p className="text-center text-xs text-green-300/50 mt-3 font-medium">Free initial consultation · Fast response</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEO CONTENT ────────────────────────────────────────────────────── */}
      <section className="py-20 px-6 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-black text-[#004d2c] mb-4">Visa Processing Time: Complete Guide for 2025</h2>
          <p className="text-slate-600 leading-relaxed mb-6 text-sm">
            Visa processing time varies dramatically depending on your nationality, the destination country, visa type, and
            the current season. Eammu's Visa Processing Time Tracker gives you accurate, up-to-date estimates based on real
            applicant data and official embassy guidelines — so you never miss a travel deadline.
          </p>

          <h3 className="text-xl font-black text-[#004d2c] mb-3">What Affects Visa Processing Time?</h3>
          <ul className="space-y-3 text-slate-600 mb-8">
            {[
              "Transit visa: 6–24 hours — fastest type, usually same-day decision at most international airports",
              "E-Visa: 2–5 business days via automated online processing through official government portals",
              "Sticker visa: 15–21 business days after biometrics submission and/or interview at embassy or VAC",
              "Your nationality and bilateral diplomatic relations with the destination country",
              "Embassy backlog and seasonal demand — summer and holiday peaks add 2–4 weeks on average",
              "Whether biometrics, a health examination, or an in-person interview is required",
              "Application completeness — missing or inconsistent documents cause the majority of delays",
              "Administrative processing (security checks) — unpredictable, 45–180+ days in extreme cases",
              "Peak application periods for your nationality — Eid, school years, fiscal year ends",
            ].map(item => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 size={16} className="text-[#005a31] shrink-0 mt-1 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="text-xl font-black text-[#004d2c] mb-3">Transit Visa Processing Time: What to Expect</h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            A transit visa is required when you pass through certain countries even without leaving the airport.
            Processing typically takes 6–24 hours, making it the fastest visa type available. Countries like the UK (DATV),
            Germany (TATV), France (ATV), and Canada require transit visas for specific nationalities transiting their
            airports. Always check with the embassy or your airline before booking a connecting flight, as requirements
            differ by nationality, layover airport, and the airline operating the connection.
          </p>

          <h3 className="text-xl font-black text-[#004d2c] mb-3">How to Use Eammu's Application Date Calculator</h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">
            Once you select your nationality, destination, and visa type, Eammu's detail page includes a
            <strong className="text-slate-800"> Reverse Application Calculator</strong> that automatically calculates
            the latest safe date to submit your application. It incorporates the full maximum processing window
            plus a 2-week safety buffer, so you have adequate time even if unexpected delays occur.
          </p>

          {/* Internal links block */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 mt-8">
            <h4 className="font-black text-slate-800 mb-4 text-sm uppercase tracking-wider">Popular Visa Guides on Eammu</h4>
            <div className="grid sm:grid-cols-2 gap-3">
              {POPULAR.slice(0, 6).map((p, i) => {
                const slug = makeSlug(p.nationality, p.destination);
                return (
                  <Link
                    key={i}
                    href={`/visa-processing-time-tracker/${slug}?type=${p.type}`}
                    className="flex items-center justify-between px-4 py-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-[#005a31] text-sm font-semibold text-slate-700 hover:text-[#005a31] transition-all group"
                  >
                    <span>{p.flag} {p.nationality} → {p.destination}</span>
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-[#005a31]" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}