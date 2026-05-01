"use client";
// /app/work-visa/page.jsx
// ─── Work Visa Main Landing Page ──────────────────────────────────────────
// Countries fetched from MongoDB via /api/countries
// Slug: /work-visa/[nationality-slug]-work-visa-for-[destination-slug]

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Briefcase, Search, Globe, ChevronRight, ArrowRight,
  TrendingUp, Users, Clock, Star, CheckCircle2, AlertCircle,
  Zap, Shield, BarChart2, Building2, Calendar, Award,
  DollarSign, FileText, MapPin, GraduationCap, Timer,
} from "lucide-react";

// ── SLUG BUILDER ──────────────────────────────────────────────────────────
function makeSlug(nationality, destination) {
  const nat  = nationality.toLowerCase().replace(/\s+/g, "-");
  const dest = destination.toLowerCase().replace(/\s+/g, "-");
  return `${nat}-work-visa-for-${dest}`;
}

// ── DESTINATION STATIC DATA ───────────────────────────────────────────────
// Only destination-specific facts — nationality names injected dynamically
const DESTINATIONS = {
  "canada": {
    name: "Canada", flag: "🇨🇦", currency: "CAD",
    visaName: "Canada Work Permit (LMIA / LMIA-Exempt)",
    avgSalary: "CAD $55,000–$95,000/yr",
    minSalary: "CAD $30,000",
    processingTime: "8–27 weeks",
    approvalRate: 78,
    difficulty: "Medium",
    languages: ["English", "French"],
    topIndustries: ["Technology", "Healthcare", "Construction", "Finance", "Agriculture"],
    topRoles: ["Software Engineer", "Registered Nurse", "Truck Driver", "Accountant", "Welder"],
    searches: "28.4K/mo",
    embassyUrl: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
    requirements: ["Valid LMIA or LMIA-exempt job offer", "Educational credential assessment (WES)", "Proof of work experience (2+ years)", "Language proof IELTS/CELPIP", "Clean criminal record", "Medical exam"],
    keyFact: "Canada processes over 400,000 work permits per year, with Express Entry as the primary skilled worker pathway.",
  },
  "united-states": {
    name: "United States", flag: "🇺🇸", currency: "USD",
    visaName: "H-1B Specialty Occupation / L-1 / O-1",
    avgSalary: "USD $70,000–$130,000/yr",
    minSalary: "USD $60,500 (prevailing wage)",
    processingTime: "3–6 months",
    approvalRate: 72,
    difficulty: "Hard",
    languages: ["English"],
    topIndustries: ["Technology", "Finance", "Healthcare", "Research", "Engineering"],
    topRoles: ["Software Engineer", "Data Scientist", "Financial Analyst", "Doctor", "Researcher"],
    searches: "44.1K/mo",
    embassyUrl: "https://travel.state.gov/content/travel/en/us-visas/employment.html",
    requirements: ["H-1B petition by employer (April lottery)", "Specialty occupation degree", "Prevailing wage compliance", "LCA (Labor Condition Application)", "Valid job offer from US employer", "Relevant degree in specific field"],
    keyFact: "The H-1B cap is 85,000 per year with a lottery system. STEM-OPT graduates from US universities are cap-exempt.",
  },
  "united-kingdom": {
    name: "United Kingdom", flag: "🇬🇧", currency: "GBP",
    visaName: "UK Skilled Worker Visa",
    avgSalary: "GBP £35,000–£75,000/yr",
    minSalary: "GBP £38,700 (from April 2024)",
    processingTime: "3–8 weeks",
    approvalRate: 82,
    difficulty: "Medium",
    languages: ["English"],
    topIndustries: ["Healthcare (NHS)", "Technology", "Finance", "Education", "Engineering"],
    topRoles: ["Nurse", "Software Engineer", "Chef", "Teacher", "Civil Engineer"],
    searches: "19.8K/mo",
    embassyUrl: "https://www.gov.uk/skilled-worker-visa",
    requirements: ["Certificate of Sponsorship (CoS) from licensed employer", "Salary meeting £38,700 threshold", "English language proof (B1+)", "ATAS certificate (for certain subjects)", "Tuberculosis test (some nationalities)", "Valid passport"],
    keyFact: "The UK Skilled Worker Visa replaced Tier 2 in 2021. NHS healthcare workers get reduced fees and salary thresholds.",
  },
  "germany": {
    name: "Germany", flag: "🇩🇪", currency: "EUR",
    visaName: "Germany Skilled Worker Visa / EU Blue Card",
    avgSalary: "EUR €45,000–€85,000/yr",
    minSalary: "EUR €43,992 (Blue Card threshold)",
    processingTime: "1–3 months",
    approvalRate: 80,
    difficulty: "Medium",
    languages: ["German (B1+)", "English (some roles)"],
    topIndustries: ["Engineering", "Automotive", "IT", "Manufacturing", "Healthcare"],
    topRoles: ["Mechanical Engineer", "IT Specialist", "Nurse", "Electrician", "Researcher"],
    searches: "14.2K/mo",
    embassyUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/skilled-worker",
    requirements: ["Recognized German or equivalent degree", "Job offer with qualifying salary", "German language proof (B1 for most roles)", "APS certificate (for some nationalities)", "Blocked account (if no job offer yet)", "Health insurance proof"],
    keyFact: "Germany's Skilled Immigration Act (2020) and 2023 update significantly expanded pathways for non-EU skilled workers.",
  },
  "australia": {
    name: "Australia", flag: "🇦🇺", currency: "AUD",
    visaName: "Temporary Skill Shortage (TSS) 482 / Skilled Independent 189",
    avgSalary: "AUD $65,000–$110,000/yr",
    minSalary: "AUD $70,000 (TSMIT from July 2023)",
    processingTime: "2–6 months",
    approvalRate: 76,
    difficulty: "Medium",
    languages: ["English"],
    topIndustries: ["Healthcare", "Mining", "Construction", "IT", "Agriculture"],
    topRoles: ["Registered Nurse", "Civil Engineer", "IT Project Manager", "Electrician", "Chef"],
    searches: "16.7K/mo",
    embassyUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-skill-shortage-482",
    requirements: ["Sponsorship from approved employer", "Occupation on MLTSSL or STSOL list", "Skills assessment from relevant authority", "English: IELTS 5.0+ (varies by role)", "Salary above TSMIT ($70,000 AUD)", "2 years relevant work experience"],
    keyFact: "Australia's Points of Interest Test for skilled migration awards points for age, education, work experience, and English proficiency.",
  },
  "united-arab-emirates": {
    name: "United Arab Emirates", flag: "🇦🇪", currency: "AED",
    visaName: "UAE Employment Visa / Golden Visa",
    avgSalary: "AED 120,000–250,000/yr",
    minSalary: "AED 48,000/yr (free zone varies)",
    processingTime: "2–6 weeks",
    approvalRate: 85,
    difficulty: "Easy",
    languages: ["English", "Arabic"],
    topIndustries: ["Construction", "Finance", "Oil & Gas", "Hospitality", "Technology"],
    topRoles: ["Civil Engineer", "Finance Manager", "Hotel Manager", "IT Specialist", "Sales Executive"],
    searches: "22.3K/mo",
    embassyUrl: "https://icp.gov.ae/en/residencypermits/employmentresidencyvisa/",
    requirements: ["Employment contract from UAE employer", "Entry permit (sponsored by employer)", "Medical fitness test in UAE", "Emirates ID registration", "Attestation of educational certificates", "Police clearance certificate"],
    keyFact: "The UAE Golden Visa offers 10-year residency for investors, executives, and talented individuals without employer sponsorship.",
  },
  "singapore": {
    name: "Singapore", flag: "🇸🇬", currency: "SGD",
    visaName: "Singapore Employment Pass (EP) / S Pass",
    avgSalary: "SGD $72,000–$150,000/yr",
    minSalary: "SGD $5,000/month EP (from Sep 2023)",
    processingTime: "3–8 weeks",
    approvalRate: 74,
    difficulty: "Medium",
    languages: ["English"],
    topIndustries: ["Finance", "Technology", "Biomedical", "Logistics", "Manufacturing"],
    topRoles: ["Software Engineer", "Finance Manager", "Data Scientist", "Supply Chain Manager", "Biomedical Researcher"],
    searches: "9.4K/mo",
    embassyUrl: "https://www.mom.gov.sg/passes-and-permits/employment-pass",
    requirements: ["Job offer from Singapore-registered company", "Salary meeting EP/S Pass threshold", "Recognized degree or diploma", "COMPASS points scoring (for EP)", "No criminal record", "Employer submits application via myMOM portal"],
    keyFact: "Singapore's COMPASS (Complementarity Assessment Framework) scores EP applications on salary, qualifications, diversity, and support for local employment.",
  },
  "saudi-arabia": {
    name: "Saudi Arabia", flag: "🇸🇦", currency: "SAR",
    visaName: "Saudi Arabia Work Visa / Iqama",
    avgSalary: "SAR 60,000–140,000/yr",
    minSalary: "SAR 48,000/yr",
    processingTime: "4–12 weeks",
    approvalRate: 80,
    difficulty: "Medium",
    languages: ["Arabic", "English (corporate)"],
    topIndustries: ["Oil & Gas", "Construction", "Healthcare", "Education", "Vision 2030 Projects"],
    topRoles: ["Petroleum Engineer", "Doctor", "Construction Manager", "IT Specialist", "English Teacher"],
    searches: "11.6K/mo",
    embassyUrl: "https://visa.mofa.gov.sa/",
    requirements: ["Employment contract from Saudi employer", "Medical fitness certificate (MOH-approved)", "Attested educational certificates (MFA + Saudi Embassy)", "Clean criminal record", "Iqama registration within 90 days of arrival", "Nitaqat compliance by employer (green/platinum band)"],
    keyFact: "Saudi Vision 2030 has created over 1.2 million new jobs with quotas requiring 30–40% Saudi nationals across most sectors.",
  },
  "japan": {
    name: "Japan", flag: "🇯🇵", currency: "JPY",
    visaName: "Japan Work Visa / Highly Skilled Professional Visa",
    avgSalary: "JPY ¥3.5M–¥8M/yr",
    minSalary: "JPY ¥2,500,000/yr",
    processingTime: "4–12 weeks",
    approvalRate: 71,
    difficulty: "Hard",
    languages: ["Japanese (N3+ preferred)", "English (tech roles)"],
    topIndustries: ["Technology", "Manufacturing", "Education", "Research", "Engineering"],
    topRoles: ["Software Engineer", "English Teacher (ALT)", "Researcher", "Engineer", "IT Specialist"],
    searches: "7.8K/mo",
    embassyUrl: "https://www.mofa.go.jp/j_info/visit/visa/long/visa6.html",
    requirements: ["Certificate of Eligibility (CoE) from Japanese employer", "Bachelor's degree minimum", "Relevant work experience", "Japanese language (N3+ for most roles)", "Health certificate", "Criminal record clearance"],
    keyFact: "Japan's Highly Skilled Professional (HSP) visa uses a points-based system awarding permanent residence in just 1–3 years.",
  },
  "malaysia": {
    name: "Malaysia", flag: "🇲🇾", currency: "MYR",
    visaName: "Malaysia Employment Pass / Professional Visit Pass",
    avgSalary: "MYR 48,000–120,000/yr",
    minSalary: "MYR 36,000/yr (Category I)",
    processingTime: "4–8 weeks",
    approvalRate: 79,
    difficulty: "Easy",
    languages: ["English", "Malay"],
    topIndustries: ["Manufacturing", "Technology", "Finance", "Oil & Gas", "Education"],
    topRoles: ["Engineer", "IT Professional", "Finance Manager", "Lecturer", "Operations Manager"],
    searches: "6.2K/mo",
    embassyUrl: "https://esd.imi.gov.my/",
    requirements: ["Employment contract from Malaysian company", "Employer must prove local recruitment attempt", "Degree certificate (attested)", "Minimum salary MYR 3,000/month (Cat I)", "Company must be registered with SSM", "Health screening"],
    keyFact: "Malaysia's Employment Pass has 3 categories: Cat I (>MYR 10K/month), Cat II (MYR 5K–10K), Cat III (MYR 3K–5K).",
  },
  "netherlands": {
    name: "Netherlands", flag: "🇳🇱", currency: "EUR",
    visaName: "Netherlands Highly Skilled Migrant Visa / EU Blue Card",
    avgSalary: "EUR €50,000–€95,000/yr",
    minSalary: "EUR €46,107/yr (2024, under 30: €33,877)",
    processingTime: "2–90 days",
    approvalRate: 81,
    difficulty: "Medium",
    languages: ["Dutch (helpful)", "English (widely accepted)"],
    topIndustries: ["Technology", "Logistics", "Agriculture (Agri-tech)", "Finance", "Life Sciences"],
    topRoles: ["Software Engineer", "Data Scientist", "Product Designer", "Logistics Manager", "Researcher"],
    searches: "8.1K/mo",
    embassyUrl: "https://ind.nl/en/work/working_in_the_Netherlands",
    requirements: ["Job offer from IND-recognised sponsor employer", "Salary meeting highly skilled migrant threshold", "Valid passport (6+ months)", "Antecedents certificate (criminal record)", "CV and degree certificate", "Health insurance upon arrival"],
    keyFact: "The Dutch 30% tax ruling allows highly skilled migrants to receive 30% of their salary tax-free for up to 5 years.",
  },
  "new-zealand": {
    name: "New Zealand", flag: "🇳🇿", currency: "NZD",
    visaName: "Accredited Employer Work Visa (AEWV)",
    avgSalary: "NZD $60,000–$110,000/yr",
    minSalary: "NZD $55,000/yr (MWUT 2024)",
    processingTime: "6–12 weeks",
    approvalRate: 77,
    difficulty: "Medium",
    languages: ["English"],
    topIndustries: ["Healthcare", "Agriculture", "Construction", "Technology", "Tourism"],
    topRoles: ["Registered Nurse", "Civil Engineer", "IT Specialist", "Chef", "Farm Manager"],
    searches: "5.9K/mo",
    embassyUrl: "https://www.immigration.govt.nz/new-zealand-visas/visas/visa/accredited-employer-work-visa",
    requirements: ["Job offer from NZ accredited employer", "Salary at or above median wage", "Proof of relevant qualifications/experience", "English language: IELTS 6.5+ (most roles)", "Immigration NZ Skills Match Report", "Criminal and medical clearance"],
    keyFact: "New Zealand's AEWV replaced 6 previous visa categories in 2022. Over 100 occupations qualify under the Green List for residency pathways.",
  },
};

// ── VISA CATEGORIES ───────────────────────────────────────────────────────
const VISA_CATEGORIES = [
  { icon: "💻", title: "Skilled Worker",      desc: "Tech, finance, engineering professionals",  count: "120+ countries", badge: "Most Popular" },
  { icon: "🏥", title: "Healthcare Worker",   desc: "Nurses, doctors, allied health",             count: "85+ countries",  badge: "High Demand"  },
  { icon: "🔧", title: "Tradesperson",        desc: "Electricians, plumbers, welders, builders",  count: "60+ countries",  badge: ""             },
  { icon: "👨‍🏫", title: "Teacher / Educator", desc: "English teachers, lecturers, tutors",        count: "90+ countries",  badge: ""             },
  { icon: "🏢", title: "Intracompany Transfer",desc: "Multinational employee transfers",           count: "150+ countries", badge: "Fast Track"   },
  { icon: "🌾", title: "Seasonal Work",       desc: "Agriculture, hospitality, tourism",           count: "40+ countries",  badge: ""             },
];

const STATS_BAR = [
  { value: "195+",   label: "Countries Covered",  icon: Globe     },
  { value: "2,400+", label: "Job Categories",      icon: Briefcase },
  { value: "52K+",   label: "Monthly Users",       icon: Users     },
  { value: "93%",    label: "Data Accuracy",       icon: Star      },
];

const PROCESS_STEPS = [
  { step: "01", title: "Get a Job Offer",          desc: "Most work visas require a confirmed offer from a licensed employer in the destination country. The employer usually initiates the sponsorship process.", icon: Building2  },
  { step: "02", title: "Credential Assessment",    desc: "Have your educational qualifications officially assessed and recognised by an approved body in the destination country (WES, ENIC, AEI, etc.).", icon: GraduationCap },
  { step: "03", title: "Language Test",            desc: "Prove language proficiency via an official test (IELTS, TOEFL, Goethe Institut, etc.). Minimum scores vary by country and occupation.", icon: Award      },
  { step: "04", title: "Gather Documents",         desc: "Collect passport, degree certificates, work experience letters, police clearance, and medical exam results. Attestation is often required.", icon: FileText   },
  { step: "05", title: "Submit Application",        desc: "Apply online or through the embassy. Employer files sponsorship documents first in most countries. Biometrics and interview may be required.", icon: Search     },
  { step: "06", title: "Work & Settle",            desc: "Once approved, comply with visa conditions. Many work visas lead to permanent residency after 2–5 years of qualifying employment.", icon: MapPin     },
];

const TOP_REJECTION_REASONS = [
  { no: "01", reason: "Salary Below Threshold",       fix: "Always check the current minimum salary for your occupation code in the destination country — thresholds update annually." },
  { no: "02", reason: "Qualifications Not Recognised", fix: "Get a recognised credential assessment (WES, ENIC-NARIC, AEI) before applying — unrecognised degrees are an automatic disqualifier." },
  { no: "03", reason: "Employer Not Licensed",         fix: "Verify your employer holds a valid sponsor licence or is registered on the official government sponsor register." },
  { no: "04", reason: "Language Score Insufficient",   fix: "Both the immigration authority AND the employer may have minimum language requirements — the higher one applies." },
  { no: "05", reason: "Work Experience Gap",           fix: "Most skilled worker visas require 2–5 years of documented work experience in the relevant field." },
  { no: "06", reason: "Criminal / Medical Issues",     fix: "Police clearance and medical certificates from approved institutions are mandatory — apply for these early as they take time." },
];

const DIFF_CONFIG = {
  Easy:   { cls: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  Medium: { cls: "bg-amber-50 text-amber-700 border-amber-200",       dot: "bg-amber-500"   },
  Hard:   { cls: "bg-red-50 text-red-700 border-red-200",             dot: "bg-red-500"     },
};

// ── COUNTRY AUTOCOMPLETE ──────────────────────────────────────────────────
function CountrySelect({ label, value, onChange, placeholder, countries, isLoading }) {
  const [open,  setOpen]  = useState(false);
  const [query, setQuery] = useState(value || "");
  const ref = useRef(null);

  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  useEffect(() => { if (!value) setQuery(""); }, [value]);

  const filtered = useMemo(() => {
    if (!query) return countries.slice(0, 8);
    return countries.filter(c => c.country.toLowerCase().includes(query.toLowerCase())).slice(0, 10);
  }, [query, countries]);

  const selectedCountry = countries.find(c => c.country === value);

  return (
    <div ref={ref} className="relative">
      <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{label}</label>
      <div className="relative">
        {selectedCountry?.flag
          ? <img src={selectedCountry.flag} alt="" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-3.5 object-cover rounded-sm pointer-events-none z-10" />
          : <Globe size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none z-10" />
        }
        <input
          className="w-full pl-10 pr-4 py-3.5 bg-white/10 border-2 border-white/10 hover:border-white/20 focus:border-blue-400 rounded-xl text-sm font-semibold text-white placeholder:text-slate-500 outline-none transition-all"
          placeholder={isLoading ? "Loading countries…" : placeholder}
          value={query}
          disabled={isLoading}
          onChange={e => { setQuery(e.target.value); onChange(""); setOpen(true); }}
          onFocus={() => setOpen(true)}
          autoComplete="off"
        />
        {isLoading && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
          </div>
        )}
      </div>
      {open && !isLoading && (
        <div className="absolute z-50 w-full mt-2 bg-[#0d1424] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="max-h-52 overflow-y-auto">
            {filtered.length === 0
              ? <div className="px-4 py-3 text-sm text-slate-500">No country found for "{query}"</div>
              : filtered.map(c => (
                <button key={c.code} onMouseDown={() => { onChange(c.country); setQuery(c.country); setOpen(false); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 text-left transition-colors">
                  <img src={c.flag} alt="" className="w-5 h-3.5 object-cover rounded-sm flex-shrink-0" />
                  <span className="text-sm font-semibold text-white">{c.country}</span>
                </button>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
}

// ── DESTINATION CARD ──────────────────────────────────────────────────────
function DestCard({ slug, data, nationality }) {
  const diff = DIFF_CONFIG[data.difficulty] || DIFF_CONFIG.Medium;
  const href = nationality
    ? `/work-visa/${makeSlug(nationality, data.name)}`
    : `/work-visa/${slug}-work-visa-guide`;

  return (
    <Link href={href}
      className="group bg-white border-2 border-slate-100 rounded-2xl p-5 hover:border-blue-300 hover:shadow-lg transition-all duration-200 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{data.flag}</span>
          <div>
            <h3 className="font-black text-slate-800 text-base leading-none">{data.name}</h3>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">{data.visaName}</p>
          </div>
        </div>
        <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg border flex-shrink-0 ${diff.cls}`}>
          {data.difficulty}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-slate-50 rounded-xl p-3">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Avg. Salary</p>
          <p className="text-xs font-black text-slate-700 leading-tight">{data.avgSalary}</p>
        </div>
        <div className="bg-slate-50 rounded-xl p-3">
          <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-0.5">Processing</p>
          <p className="text-xs font-black text-slate-700 leading-tight">{data.processingTime}</p>
        </div>
      </div>

      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mb-2">Top Industries</p>
        <div className="flex flex-wrap gap-1">
          {data.topIndustries.slice(0, 4).map(ind => (
            <span key={ind} className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md border border-blue-100">{ind}</span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
        <div className="flex items-center gap-1.5">
          <div className={`w-2 h-2 rounded-full ${diff.dot}`} />
          <span className="text-[11px] font-bold text-slate-500">{data.approvalRate}% approval</span>
        </div>
        <span className="text-xs font-black text-blue-500 group-hover:text-blue-700 flex items-center gap-1 transition-colors">
          Full Guide <ChevronRight size={13} />
        </span>
      </div>
    </Link>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────
export default function WorkVisaMainPage() {
  const router = useRouter();
  const [nationality, setNationality] = useState("");
  const [destination, setDestination] = useState("");
  const [countries,   setCountries]   = useState([]);
  const [isLoading,   setIsLoading]   = useState(true);
  const [error,       setError]       = useState("");
  const [filter,      setFilter]      = useState("All");

  useEffect(() => {
    fetch("/api/countries")
      .then(r => r.json())
      .then(d => { setCountries(d); setIsLoading(false); })
      .catch(() => setIsLoading(false));
  }, []);

  const handleSearch = () => {
    if (!nationality) { setError("Please select your nationality."); return; }
    if (!destination) { setError("Please select a destination country."); return; }
    if (nationality === destination) { setError("Nationality and destination cannot be the same."); return; }
    setError("");
    router.push(`/work-visa/${makeSlug(nationality, destination)}`);
  };

  const filteredDests = useMemo(() =>
    Object.entries(DESTINATIONS).filter(([, d]) => filter === "All" || d.difficulty === filter),
    [filter]
  );

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans">

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#080d1a] overflow-hidden pt-24 pb-20 px-4">
        <div className="absolute inset-0 opacity-[0.035]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }} />
        <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Top badge */}
          <div className="flex justify-center mb-7">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300">
                2025 Work Visa Intelligence — 195+ Countries
              </span>
            </div>
          </div>

          <h1 className="text-center text-5xl md:text-6xl lg:text-[5.5rem] font-black text-white leading-[0.88] tracking-tighter mb-6">
            Work Visa<br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-emerald-400 bg-clip-text text-transparent">
              Requirements
            </span><br />
            <span className="text-white/20" style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.2)" }}>
              & Guides 2025.
            </span>
          </h1>

          <p className="text-center text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            Salary thresholds, approval rates, processing timelines, and step-by-step work permit guides
            for every major destination. Personalised by your nationality.{" "}
            <strong className="text-white">Used by 52,000+ applicants monthly.</strong>
          </p>

          {/* ── SEARCH CARD ─────────────────────────────────────────────── */}
          <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-6 md:p-8 max-w-3xl mx-auto backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Briefcase size={15} className="text-white" />
              </div>
              <div>
                <h2 className="text-sm font-black text-white">Find Your Work Visa Requirements</h2>
                <p className="text-[11px] text-slate-500">Personalised guide based on your nationality</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-5">
              <CountrySelect
                label="Your Nationality"
                value={nationality}
                onChange={v => { setNationality(v); setError(""); }}
                placeholder="e.g. Bangladesh"
                countries={countries}
                isLoading={isLoading}
              />
              <CountrySelect
                label="Work Destination"
                value={destination}
                onChange={v => { setDestination(v); setError(""); }}
                placeholder="e.g. Canada"
                countries={countries}
                isLoading={isLoading}
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-xs font-semibold mb-4 px-3 py-2.5 bg-red-500/10 rounded-xl border border-red-500/20">
                <AlertCircle size={14} /> {error}
              </div>
            )}

            <button onClick={handleSearch}
              className="w-full py-4 bg-blue-500 hover:bg-blue-400 active:scale-[0.98] text-white font-black text-base rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20">
              <Briefcase size={19} />
              Check Work Visa Requirements
              <ArrowRight size={17} />
            </button>
            <p className="text-center text-[11px] text-slate-600 mt-3">Free · No signup required · Updated monthly</p>
          </div>

          {/* ── QUICK DESTINATION PILLS ──────────────────────────────────── */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {Object.entries(DESTINATIONS).slice(0, 8).map(([slug, d]) => (
              <button key={slug}
                onClick={() => { setDestination(d.name); setError(""); }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all
                  ${destination === d.name
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-white"}`}>
                <span>{d.flag}</span> {d.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="bg-[#0d1424] py-6 px-4 border-b border-white/5">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {STATS_BAR.map(({ value, label, icon: Icon }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-9 h-9 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon size={16} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-lg font-black text-white">{value}</div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISA CATEGORIES ──────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white border-b border-slate-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 block mb-3">Visa Pathways</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">Types of Work Visas Available</h2>
            <p className="text-slate-500 text-sm font-medium max-w-xl mx-auto">
              Every legal pathway to working abroad — from skilled professional to seasonal labourer
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {VISA_CATEGORIES.map(({ icon, title, desc, count, badge }) => (
              <div key={title} className="relative bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:border-blue-200 hover:bg-blue-50/20 transition-all">
                {badge && (
                  <span className="absolute top-4 right-4 text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                    {badge}
                  </span>
                )}
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-sm font-black text-slate-800 mb-2">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{desc}</p>
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <Globe size={10} /> {count}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESTINATION GUIDES ───────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-[#f8f9fc]">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 block mb-2">🌍 Country Guides</span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Work Visa Destination Guides</h2>
              <p className="text-slate-500 text-sm mt-1.5 font-medium">
                Salary thresholds · Approval rates · Step-by-step requirements
                {nationality && <span className="text-blue-600 font-black"> — personalised for {nationality}</span>}
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              {["All", "Easy", "Medium", "Hard"].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-xs font-black border-2 transition-all
                    ${filter === f ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-500 border-slate-100 hover:border-slate-300"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDests.map(([slug, data]) => (
              <DestCard key={slug} slug={slug} data={data} nationality={nationality} />
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-white border-t border-slate-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 block mb-3">Process</span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">How to Get a Work Visa — 6 Steps</h2>
            <p className="text-slate-500 text-sm font-medium max-w-xl mx-auto">The universal work visa process applies across most countries with minor variations</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PROCESS_STEPS.map(({ step, title, desc, icon: Icon }) => (
              <div key={step} className="flex items-start gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-100 transition-all">
                <div className="w-10 h-10 bg-blue-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-200">
                  <Icon size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-blue-400 uppercase tracking-wider mb-0.5">Step {step}</div>
                  <h3 className="text-sm font-black text-slate-800 mb-1.5">{title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REJECTION REASONS ────────────────────────────────────────────── */}
      <section className="py-20 px-4 bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <span className="text-[10px] font-black uppercase tracking-widest text-red-400 block mb-3">⚠ Why Applications Fail</span>
            <h2 className="text-3xl font-black text-white tracking-tight mb-3">Top 6 Work Visa Rejection Reasons</h2>
            <p className="text-slate-500 text-sm font-medium max-w-xl mx-auto">Understanding why work visas get refused is the first step to getting approved</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TOP_REJECTION_REASONS.map(({ no, reason, fix }) => (
              <div key={no} className="bg-white/[0.04] border border-white/10 rounded-2xl p-6 hover:bg-white/[0.06] transition-all">
                <div className="text-5xl font-black text-white/8 mb-3 leading-none select-none">{no}</div>
                <h3 className="text-sm font-black text-white mb-3">{reason}</h3>
                <p className="text-xs text-slate-500 leading-relaxed flex items-start gap-2">
                  <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span><strong className="text-emerald-400">Fix:</strong> {fix}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTERNAL LINKS GRID ──────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-white border-t border-slate-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-slate-900 mb-2">Related Visa Resources</h2>
            <p className="text-slate-500 text-sm font-medium">Everything you need to plan your move abroad</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/travel-resources/visa-processing-time-tracker"
              className="group flex items-start gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-200 hover:bg-blue-50/30 transition-all">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Timer size={18} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-black text-sm text-slate-800 mb-1 group-hover:text-blue-700 transition-colors">Visa Processing Time Tracker</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Real processing times for work permits in 195+ countries — by nationality.</p>
                <span className="text-xs font-black text-blue-500 flex items-center gap-1 mt-2">Check Times <ArrowRight size={12} /></span>
              </div>
            </Link>

            <Link href="/travel-resources/visa-rejection-checker"
              className="group flex items-start gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-red-200 hover:bg-red-50/20 transition-all">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield size={18} className="text-red-500" />
              </div>
              <div>
                <h3 className="font-black text-sm text-slate-800 mb-1 group-hover:text-red-600 transition-colors">Visa Rejection Checker</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Check your rejection risk before applying — with proven fixes per nationality.</p>
                <span className="text-xs font-black text-red-500 flex items-center gap-1 mt-2">Check Risk <ArrowRight size={12} /></span>
              </div>
            </Link>

            <Link href="/travel-resources"
              className="group flex items-start gap-4 p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-emerald-200 hover:bg-emerald-50/20 transition-all">
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Globe size={18} className="text-emerald-600" />
              </div>
              <div>
                <h3 className="font-black text-sm text-slate-800 mb-1 group-hover:text-emerald-700 transition-colors">All Travel Resources</h3>
                <p className="text-xs text-slate-500 leading-relaxed">Tourist visas, study permits, transit visas, and more travel tools.</p>
                <span className="text-xs font-black text-emerald-600 flex items-center gap-1 mt-2">Explore <ArrowRight size={12} /></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── SEO CONTENT ──────────────────────────────────────────────────── */}
      <section className="py-16 px-4 bg-[#f8f9fc] border-t border-slate-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Work Visa Requirements 2025: Complete Guide</h2>
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              A <strong className="text-slate-800">work visa</strong> is a legal document issued by a foreign government
              allowing a non-citizen to take up paid employment in that country. Unlike tourist visas, work visas typically
              require an employer sponsor, proof of qualifications, and in many countries, evidence that the role could not
              be filled by a local worker (Labour Market Impact Assessment or equivalent).
            </p>
            <p>
              The most in-demand work visa destinations for South Asian and African applicants in 2025 are{" "}
              <Link href="/work-visa/bangladesh-work-visa-for-canada" className="text-blue-600 hover:text-blue-800 font-semibold">Canada</Link>,{" "}
              <Link href="/work-visa/bangladesh-work-visa-for-united-kingdom" className="text-blue-600 hover:text-blue-800 font-semibold">United Kingdom</Link>,{" "}
              <Link href="/work-visa/bangladesh-work-visa-for-germany" className="text-blue-600 hover:text-blue-800 font-semibold">Germany</Link>,{" "}
              <Link href="/work-visa/bangladesh-work-visa-for-australia" className="text-blue-600 hover:text-blue-800 font-semibold">Australia</Link>, and the{" "}
              <Link href="/work-visa/bangladesh-work-visa-for-united-arab-emirates" className="text-blue-600 hover:text-blue-800 font-semibold">United Arab Emirates</Link>.
              Each country has distinct minimum salary thresholds, occupation lists, and employer licensing requirements.
            </p>
            <h3 className="text-lg font-black text-slate-900 mt-6 mb-3">Minimum Salary Requirements by Country (2025)</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {Object.entries(DESTINATIONS).map(([slug, d]) => (
                <div key={slug} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{d.flag}</span>
                    <Link href={`/work-visa/${slug}-work-visa-guide`} className="text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors">{d.name}</Link>
                  </div>
                  <span className="text-xs font-black text-slate-500">{d.minSalary}</span>
                </div>
              ))}
            </div>
            <h3 className="text-lg font-black text-slate-900 mt-6 mb-3">Processing Times by Country (2025)</h3>
            <p>
              Work visa processing times range from{" "}
              <strong className="text-slate-800">2 weeks (UAE, Malaysia)</strong> to{" "}
              <strong className="text-slate-800">6+ months (United States H-1B)</strong>. Factors affecting processing
              include employer licensing status, occupation type, language test submission, and biometrics appointment
              availability. Always apply at least 3–4 months before your intended start date.
            </p>
            <ul className="space-y-2 mt-3">
              {Object.entries(DESTINATIONS).map(([slug, d]) => (
                <li key={slug} className="flex items-center gap-3">
                  <CheckCircle2 size={14} className="text-blue-500 flex-shrink-0" />
                  <span>
                    <strong className="text-slate-700">{d.name}:</strong>{" "}
                    <Link href={`/work-visa/${slug}-work-visa-guide`} className="text-blue-600 hover:text-blue-800">{d.visaName}</Link>{" "}
                    — {d.processingTime} · {d.approvalRate}% approval rate
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ───────────────────────────────────────────────────── */}
      <section className="bg-[#080d1a] py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-black text-white mb-3">Ready to Start Your Work Visa Application?</h2>
          <p className="text-slate-500 font-medium mb-8 text-sm">Our visa experts handle every step — from document checklist to submission.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="https://wa.me/8801631312524"
              className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 rounded-2xl font-black transition-all text-sm shadow-lg shadow-blue-500/20">
              <Briefcase size={18} /> Talk to a Visa Expert
            </a>
            <Link href="/travel-resources/visa-processing-time-tracker"
              className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white px-8 py-4 rounded-2xl font-black transition-all text-sm border border-white/10">
              <Timer size={18} /> Check Processing Times
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}