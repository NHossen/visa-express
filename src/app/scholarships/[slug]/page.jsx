"use client";
// /app/scholarships/[slug]/_client.jsx
// Scholarship detail page per country — white bg, black text, yellow accents

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  GraduationCap, ChevronRight, ArrowLeft, Calendar, Clock,
  CheckCircle2, AlertCircle, AlertTriangle, Globe, ExternalLink,
  Star, Award, DollarSign, BookOpen, Users, Lightbulb,
  HelpCircle, ChevronDown, BarChart2, CheckSquare, XCircle,
  TrendingUp, ArrowRight, Zap, MapPin, X
} from "lucide-react";
import {
  SCHOLARSHIP_RULES, SCHOLARSHIP_TYPE_META,
  getScholarshipData, makeScholarshipSlug
} from "@/app/lib/scholarshipData";

// ── DEADLINE CALCULATOR ────────────────────────────────────────────────────
function DeadlineCalculator({ types, activeType }) {
  const [intakeYear, setIntakeYear] = useState("2026");
  const rule = types[activeType];
  const deadline = rule?.deadline || "Check official portal";
  const currentYear = new Date().getFullYear();

  const urgency = useMemo(() => {
    const months = {
      "January": 1, "February": 2, "March": 3, "April": 4,
      "May": 5, "June": 6, "July": 7, "August": 8,
      "September": 9, "October": 10, "November": 11, "December": 12,
    };
    const firstMonth = Object.keys(months).find(m => deadline.includes(m));
    if (!firstMonth) return null;
    const deadlineDate = new Date(parseInt(intakeYear) - 1, months[firstMonth] - 1, 15);
    const today = new Date();
    const daysUntil = Math.floor((deadlineDate - today) / 86400000);
    if (daysUntil < 0)   return { label:`⚠️ This cycle has passed — prepare for ${parseInt(intakeYear)+1}`, color:"text-red-700 bg-red-50 border-red-200" };
    if (daysUntil < 30)  return { label:`🔴 ${daysUntil} days left — apply immediately!`, color:"text-orange-700 bg-orange-50 border-orange-200" };
    if (daysUntil < 90)  return { label:`🟡 ${daysUntil} days left — start preparing now`, color:"text-amber-700 bg-amber-50 border-amber-200" };
    return               { label:`🟢 ${daysUntil} days left — good time to start`, color:"text-green-700 bg-green-50 border-green-200" };
  }, [deadline, intakeYear]);

  return (
    <div className="bg-black rounded-2xl p-7 text-white">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center shrink-0">
          <Calendar size={20} className="text-black" />
        </div>
        <div>
          <h3 className="font-black text-base">Deadline Tracker</h3>
          <p className="text-gray-400 text-xs">Track your application timeline</p>
        </div>
      </div>
      <label className="block text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Target Intake Year</label>
      <select
        value={intakeYear}
        onChange={e => setIntakeYear(e.target.value)}
        className="w-full px-4 py-3.5 bg-white/10 border-2 border-white/10 rounded-xl text-white font-bold text-sm focus:outline-none focus:border-yellow-400 transition-all mb-4"
      >
        {[currentYear, currentYear+1, currentYear+2].map(y => (
          <option key={y} value={y} className="text-black">{y} Intake</option>
        ))}
      </select>
      <div className="space-y-3">
        <div className="flex justify-between items-center bg-white/10 px-4 py-3 rounded-xl">
          <span className="text-xs text-gray-400 font-semibold">Application Deadline</span>
          <span className="font-black text-yellow-400 text-sm">{deadline}</span>
        </div>
        <div className="flex justify-between items-center bg-white/10 px-4 py-3 rounded-xl">
          <span className="text-xs text-gray-400 font-semibold">Preparation Start</span>
          <span className="font-black text-white text-sm">12–18 months before</span>
        </div>
        {urgency && (
          <div className={`border-2 px-4 py-3 rounded-xl font-bold text-xs ${urgency.color}`}>
            {urgency.label}
          </div>
        )}
      </div>
    </div>
  );
}

// ── DOCUMENT CHECKLIST ─────────────────────────────────────────────────────
function DocumentChecklist({ items }) {
  const [checked, setChecked] = useState({});
  const toggle = i => setChecked(c => ({ ...c, [i]: !c[i] }));
  const count = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((count / items.length) * 100);

  return (
    <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-black text-sm text-black uppercase tracking-wider flex items-center gap-2">
          <CheckSquare size={15} className="text-yellow-500" />
          Application Checklist
        </h3>
        <div className="text-xs font-black text-gray-500">{count}/{items.length}</div>
      </div>
      <div className="h-2 bg-gray-100 rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-yellow-400 rounded-full transition-all duration-500"
          style={{ width:`${pct}%` }}
        />
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${
              checked[i] ? "bg-yellow-50 border border-yellow-200" : "bg-gray-50 hover:bg-gray-100 border border-transparent"
            }`}
          >
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
              checked[i] ? "bg-yellow-400 border-yellow-400" : "border-gray-300"
            }`}>
              {checked[i] && <CheckCircle2 size={11} className="text-black" />}
            </div>
            <span className={`text-xs font-semibold leading-relaxed ${checked[i] ? "text-yellow-700 line-through opacity-60" : "text-gray-700"}`}>
              {item}
            </span>
          </button>
        ))}
      </div>
      {count === items.length && (
        <div className="mt-4 bg-yellow-400 text-black text-center py-3 rounded-xl font-black text-sm">
          🎉 All documents ready — good luck!
        </div>
      )}
    </div>
  );
}

// ── FAQ ACCORDION ──────────────────────────────────────────────────────────
function FAQAccordion({ faqs }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className={`border-2 rounded-2xl overflow-hidden transition-all ${open === i ? "border-yellow-400" : "border-gray-100"}`}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between gap-4 p-5 text-left"
          >
            <span className="text-sm font-black text-black leading-relaxed">{faq.q}</span>
            <ChevronDown size={18} className={`text-gray-400 shrink-0 transition-transform mt-0.5 ${open === i ? "rotate-180 text-yellow-500" : ""}`} />
          </button>
          {open === i && (
            <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed font-medium border-t border-gray-100 pt-4">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── UNIVERSITY CHIPS ───────────────────────────────────────────────────────
function UniversityChips({ unis }) {
  return (
    <div className="flex flex-wrap gap-2">
      {unis.map(u => (
        <span key={u} className="bg-gray-50 border border-gray-200 text-gray-700 text-xs font-black px-3 py-1.5 rounded-lg">
          🎓 {u}
        </span>
      ))}
    </div>
  );
}

// ── SCHOLARSHIP TYPE TABS ──────────────────────────────────────────────────
function ScholarshipTypeTabs({ types, activeType, setActiveType }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {Object.entries(types).map(([k]) => (
        <button
          key={k}
          onClick={() => setActiveType(k)}
          className={`px-4 py-2.5 rounded-xl border-2 text-xs font-black uppercase tracking-wide transition-all
            ${activeType === k
              ? "bg-yellow-400 text-black border-yellow-400 shadow-sm"
              : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"}`}
        >
          {SCHOLARSHIP_TYPE_META[k]?.icon} {SCHOLARSHIP_TYPE_META[k]?.label || k}
        </button>
      ))}
    </div>
  );
}

// ── POPULAR SCHOLARSHIP TABLE ──────────────────────────────────────────────
function PopularScholarships({ items, countrySlug }) {
  return (
    <div className="space-y-3">
      {items.map((s, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl hover:border-yellow-400 hover:bg-yellow-50/50 transition-all group">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 bg-yellow-400/20 rounded-lg flex items-center justify-center font-black text-xs text-yellow-700 shrink-0 mt-0.5">
              {i + 1}
            </div>
            <div>
              <div className="font-black text-sm text-black">{s.name}</div>
              <div className="flex flex-wrap gap-2 mt-1">
                <span className="text-[10px] font-bold text-gray-500">📅 {s.deadline}</span>
                <span className="text-[10px] font-bold text-gray-500">🎓 {s.level}</span>
              </div>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-xs font-black text-yellow-700 bg-yellow-50 border border-yellow-200 px-2 py-1 rounded-lg">{s.fund}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── MAIN CLIENT COMPONENT ─────────────────────────────────────────────────
export default function ScholarshipSlugClient({ params: serverParams, searchParams: serverSearchParams }) {
  const clientParams      = useParams();
  const clientSearchParams = useSearchParams();

  const slug         = clientParams?.slug || serverParams?.slug || "";
  const typeParam    = clientSearchParams?.get?.("type") || serverSearchParams?.type || "";

  const countryData = useMemo(() => getScholarshipData(slug), [slug]);

  const [activeType, setActiveType] = useState(() => {
    if (typeParam && countryData?.types?.[typeParam]) return typeParam;
    return countryData ? Object.keys(countryData.types)[0] : "fully-funded";
  });

  if (!countryData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌍</div>
          <h1 className="font-black text-2xl text-black mb-2">Country Not Found</h1>
          <p className="text-gray-500 mb-6">We don't have scholarship data for this country yet.</p>
          <Link href="/scholarships" className="bg-yellow-400 text-black font-black px-6 py-3 rounded-xl hover:bg-black hover:text-yellow-400 transition-all">
            ← Back to Scholarship Finder
          </Link>
        </div>
      </div>
    );
  }

  const activeRule = countryData.types[activeType];
  const otherTypes = Object.entries(countryData.types).filter(([k]) => k !== activeType);

  // All other countries for internal linking
  const relatedCountries = countryData.relatedLinks || [];
  const allOtherCountries = Object.entries(SCHOLARSHIP_RULES)
    .filter(([s]) => s !== slug)
    .slice(0, 6)
    .map(([s, d]) => ({ slug: s, name: d.name, flag: d.flag }));

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── TRUST BAR ────────────────────────────────────────────────────── */}
      <div className="bg-black py-2.5 px-6 text-center">
        <p className="text-xs text-yellow-400 font-bold">
          ✅ Data verified from official scholarship portals &nbsp;·&nbsp;
          🔄 Updated monthly &nbsp;·&nbsp;
          🆓 Free — No signup required
        </p>
      </div>

      {/* ── BREADCRUMB ───────────────────────────────────────────────────── */}
      <div className="bg-gray-50 border-b border-gray-100 px-6 py-3">
        <div className="container mx-auto max-w-6xl flex items-center gap-2 text-xs text-gray-400 font-semibold flex-wrap">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/scholarships" className="hover:text-black transition-colors">Scholarship Finder</Link>
          <ChevronRight size={12} />
          <span className="text-black">{countryData.name} Scholarships</span>
        </div>
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-12 pb-12 px-6 border-b border-gray-100 overflow-hidden">
        <div className="absolute top-0 right-0 text-[200px] opacity-[0.04] select-none pointer-events-none leading-none translate-x-8">
          {countryData.flag}
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <Link href="/scholarships"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black mb-8 transition-colors">
            <ArrowLeft size={16} /> All Countries
          </Link>

          {/* Type switcher */}
          <ScholarshipTypeTabs
            types={countryData.types}
            activeType={activeType}
            setActiveType={setActiveType}
          />

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              {/* Country badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="text-3xl">{countryData.flag}</span>
                <span className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-600 text-xs font-black rounded-xl">{countryData.continent}</span>
                <span className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-600 text-xs font-black rounded-xl">💬 {countryData.language}</span>
                <span className="px-3 py-1.5 bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs font-black rounded-xl">✅ Updated 2025</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-black leading-tight tracking-tight mb-4">
                {countryData.name}<br />
                <span className="bg-yellow-400 px-2">Scholarships</span><br />
                <span className="text-gray-400 text-3xl">{activeRule?.label}</span>
              </h1>
              <p className="text-gray-500 font-medium leading-relaxed mb-6 text-sm">
                Complete guide to <strong className="text-black">{countryData.name} {activeRule?.label}</strong> for
                international students including Bangladeshis. Coverage, deadlines, eligibility, required documents,
                and expert application tips — verified from official sources.
              </p>
              {/* Top universities */}
              <div className="mb-4">
                <div className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">Top Universities</div>
                <UniversityChips unis={countryData.topUniversities} />
              </div>
            </div>

            {/* Quick stats card */}
            <div className="bg-black rounded-2xl p-8 text-white">
              <div className="text-xs font-black uppercase tracking-widest text-gray-500 mb-2">Scholarship Overview</div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label:"Total Scholarships", value: countryData.totalScholarships, icon:"🎓" },
                  { label:"Avg. Award Value",   value: countryData.avgAward,          icon:"💰" },
                  { label:"Application Deadline", value: activeRule?.deadline || "Varies", icon:"📅" },
                  { label:"Competition Level",  value: activeRule?.competition || "High", icon:"🏆" },
                ].map(s => (
                  <div key={s.label} className="bg-white/10 rounded-xl p-4">
                    <div className="text-lg mb-1">{s.icon}</div>
                    <div className="text-[10px] text-gray-500 font-black uppercase tracking-wide mb-1">{s.label}</div>
                    <div className="text-sm font-black text-white leading-tight">{s.value}</div>
                  </div>
                ))}
              </div>

              {/* Active type details */}
              <div className="space-y-2">
                {[
                  { label:"Coverage",  value: activeRule?.coverage  || "See program details" },
                  { label:"Min. GPA",  value: activeRule?.gpa       || "Check program" },
                  { label:"IELTS",     value: activeRule?.ielts      || "Check program" },
                  { label:"Open To",   value: activeRule?.openTo    || "Check program" },
                ].map(d => (
                  <div key={d.label} className="flex items-center justify-between bg-white/5 px-4 py-2.5 rounded-xl">
                    <span className="text-xs text-gray-500 font-semibold">{d.label}</span>
                    <span className="text-xs font-black text-yellow-400 max-w-[60%] text-right">{d.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div className="container mx-auto max-w-6xl px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT — MAIN CONTENT */}
          <div className="lg:col-span-2 space-y-12">

            {/* Popular Scholarships */}
            {countryData.popularScholarships && (
              <section>
                <h2 className="text-2xl font-black text-black mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-400/20 rounded-xl flex items-center justify-center">
                    <Star size={16} className="text-yellow-600 fill-yellow-400" />
                  </div>
                  Top {countryData.name} Scholarships 2025
                </h2>
                <PopularScholarships items={countryData.popularScholarships} countrySlug={slug} />
              </section>
            )}

            {/* Eligibility Requirements */}
            <section>
              <h2 className="text-2xl font-black text-black mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
                  <CheckCircle2 size={16} className="text-blue-600" />
                </div>
                Eligibility & Requirements
              </h2>
              <div className="space-y-3">
                {(countryData.requirements || []).map((req, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-gray-50 border border-gray-100 rounded-2xl hover:border-yellow-400/50 transition-colors">
                    <div className="w-6 h-6 bg-yellow-400 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={13} className="text-black" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium leading-relaxed">{req}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Application Timeline Visual */}
            <section>
              <h2 className="text-2xl font-black text-black mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center">
                  <BarChart2 size={16} className="text-gray-600" />
                </div>
                Application Timeline
              </h2>
              <div className="relative">
                <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-gray-100" />
                <div className="space-y-4">
                  {[
                    { icon:"🔍", label:"Research & Shortlist",    when:"18 months before", color:"bg-gray-800" },
                    { icon:"📝", label:"IELTS / Language Tests",  when:"12 months before", color:"bg-blue-600" },
                    { icon:"✍️", label:"SOP & References",        when:"8 months before",  color:"bg-purple-600" },
                    { icon:"📤", label:"Submit Application",       when: activeRule?.deadline || "Per program deadline", color:"bg-yellow-500" },
                    { icon:"✅", label:"Decision & Visa",         when:"3–4 months after", color:"bg-emerald-600" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-4 relative">
                      <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center text-sm shrink-0 z-10 shadow-sm`}>
                        {s.icon}
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-xl px-4 py-3 flex items-center justify-between border border-gray-100">
                        <span className="text-sm font-semibold text-gray-700">{s.label}</span>
                        <span className="text-xs font-black text-gray-500 bg-white px-2 py-1 rounded-lg border border-gray-100 shrink-0 ml-2">{s.when}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Why Delayed / Common Mistakes */}
            <section>
              <h2 className="text-2xl font-black text-black mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center">
                  <AlertTriangle size={16} className="text-red-500" />
                </div>
                Common Mistakes That Cause Rejection
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Weak or generic Statement of Purpose not tailored to the scholarship values",
                  "IELTS score below the minimum — always check band-specific requirements",
                  "Submitting without strong references from senior academics or employers",
                  "Applying too close to the deadline with a rushed, incomplete application",
                  "Not demonstrating clear post-study plans and ties to home country",
                  "Ignoring scholarship-specific essay questions or word limits",
                  "Not matching research interests with the faculty or program focus",
                  "Missing or inconsistent supporting documents (bank statements, transcripts)",
                ].map((reason, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl">
                    <XCircle size={15} className="text-red-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-red-800 font-medium leading-relaxed">{reason}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Expert Tips */}
            <section>
              <h2 className="text-2xl font-black text-black mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-50 rounded-xl flex items-center justify-center">
                  <Lightbulb size={16} className="text-yellow-600" />
                </div>
                Expert Tips to Win {countryData.name} Scholarships
              </h2>
              <div className="space-y-3">
                {(countryData.tips || []).map((tip, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-yellow-50 border border-yellow-100 rounded-2xl hover:border-yellow-300 transition-colors">
                    <span className="w-7 h-7 bg-yellow-400 text-black font-black text-xs rounded-lg flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-800 font-medium leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            {countryData.faqs && countryData.faqs.length > 0 && (
              <section>
                <h2 className="text-2xl font-black text-black mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
                    <HelpCircle size={16} className="text-blue-600" />
                  </div>
                  Frequently Asked Questions
                </h2>
                <FAQAccordion faqs={countryData.faqs} />
              </section>
            )}

            {/* Internal Links — Related Countries */}
            <section>
              <h2 className="text-2xl font-black text-black mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center">
                  <TrendingUp size={16} className="text-emerald-600" />
                </div>
                Compare Other Country Scholarships
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedCountries.length > 0
                  ? relatedCountries.map((link, i) => (
                    <Link key={i} href={`/scholarships/${link.slug}`}
                      className="group flex items-center justify-between p-5 bg-white border-2 border-gray-100 rounded-2xl hover:border-yellow-400 hover:shadow-md transition-all">
                      <div>
                        <div className="font-black text-sm text-black mb-1 group-hover:text-yellow-700 transition-colors">
                          {SCHOLARSHIP_RULES[link.slug]?.flag} {link.label}
                        </div>
                        <div className="text-xs text-gray-400 font-semibold">{SCHOLARSHIP_RULES[link.slug]?.totalScholarships} scholarships</div>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-yellow-500 transition-colors" />
                    </Link>
                  ))
                  : allOtherCountries.map((c, i) => (
                    <Link key={i} href={`/scholarships/${c.slug}`}
                      className="group flex items-center justify-between p-5 bg-white border-2 border-gray-100 rounded-2xl hover:border-yellow-400 hover:shadow-md transition-all">
                      <div className="font-black text-sm text-black group-hover:text-yellow-700 transition-colors">
                        {c.flag} {c.name} Scholarships
                      </div>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-yellow-500" />
                    </Link>
                  ))
                }
              </div>
            </section>

            {/* SEO Article */}
            <section className="border-t border-gray-100 pt-10">
              <h2 className="text-2xl font-black text-black mb-4">
                {countryData.name} Scholarships for International Students: 2025 Guide
              </h2>
              <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
                <p>
                  <strong className="text-black">{countryData.name}</strong> is home to some of the world's most
                  prestigious universities including {countryData.topUniversities.slice(0,3).join(", ")}.
                  International students — including those from Bangladesh — can access{" "}
                  <strong className="text-black">{countryData.totalScholarships} scholarships</strong>, with average
                  award values of <strong className="text-black">{countryData.avgAward}</strong>.
                </p>
                <p>
                  The <strong className="text-black">{activeRule?.label}</strong> is one of the most sought-after
                  funding mechanisms for international students applying to {countryData.name}. It covers{" "}
                  {activeRule?.coverage || "tuition and related costs"}, with applications due{" "}
                  {activeRule?.deadline || "as per program guidelines"}.
                  Competition is <strong className="text-black">{activeRule?.competition || "high"}</strong>,
                  making a strong application with all required documents essential to success.
                </p>
                <p>
                  The minimum academic requirement for most {countryData.name} scholarships is{" "}
                  {activeRule?.gpa || "a strong academic record"}, and English language proficiency of{" "}
                  {activeRule?.ielts || "IELTS 6.5+"} is typically required. Programs are open to{" "}
                  {activeRule?.openTo || "graduate and PhD students"}.
                </p>

                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-5">
                  <p className="text-sm font-black text-black mb-3">⚡ Quick Reference — {countryData.name} Scholarships</p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-yellow-500 shrink-0" />Scholarship count: <strong>{countryData.totalScholarships}</strong></li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-yellow-500 shrink-0" />Average value: <strong>{countryData.avgAward}</strong></li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-yellow-500 shrink-0" />Deadline ({activeRule?.label}): <strong>{activeRule?.deadline || "Varies"}</strong></li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-yellow-500 shrink-0" />Language: <strong>{countryData.language}</strong></li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-yellow-500 shrink-0" />Top universities: <strong>{countryData.topUniversities.slice(0,3).join(", ")}</strong></li>
                  </ul>
                </div>
              </div>
            </section>

            {/* More internal links */}
            <section className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
              <h3 className="font-black text-black text-lg mb-2">Explore More Scholarship Resources</h3>
              <p className="text-gray-500 text-sm mb-5">Comprehensive guides for international students</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label:"🌍 All Country Scholarships",    href:"/scholarships" },
                  { label:"📋 Visa Processing Time Tracker", href:"/travel-resources/visa-processing-time-tracker" },
                  { label:"✈️ Travel Resources",            href:"/travel-resources" },
                  { label:"💬 Talk to a Scholarship Expert", href:"https://wa.me/8801631312524" },
                ].map((l, i) => (
                  <Link key={i} href={l.href}
                    className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-gray-100 hover:border-yellow-400 text-sm font-semibold text-gray-700 hover:text-black transition-all group">
                    {l.label}
                    <ChevronRight size={14} className="text-gray-300 group-hover:text-yellow-500" />
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* Deadline calculator */}
            <DeadlineCalculator types={countryData.types} activeType={activeType} />

            {/* Document checklist */}
            {countryData.requirements && <DocumentChecklist items={countryData.requirements} />}

            {/* Other scholarship types */}
            {otherTypes.length > 0 && (
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
                <h4 className="font-black text-sm text-black uppercase tracking-wider mb-4 flex items-center gap-2">
                  <GraduationCap size={14} className="text-gray-400" />
                  Other {countryData.name} Scholarship Types
                </h4>
                <div className="space-y-3">
                  {otherTypes.map(([k, v]) => (
                    <button
                      key={k}
                      onClick={() => setActiveType(k)}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-yellow-50 border border-transparent hover:border-yellow-200 transition-all text-left"
                    >
                      <div>
                        <div className="text-xs font-black text-black">
                          {SCHOLARSHIP_TYPE_META[k]?.icon} {SCHOLARSHIP_TYPE_META[k]?.label || k}
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{v.examples?.slice(0,2).join(", ")}</div>
                      </div>
                      <ChevronRight size={14} className="text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* All countries quick nav */}
            <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
              <h4 className="font-black text-sm text-black uppercase tracking-wider mb-4 flex items-center gap-2">
                <Globe size={14} className="text-gray-400" />
                All Country Guides
              </h4>
              <div className="space-y-2">
                {Object.entries(SCHOLARSHIP_RULES).map(([s, d]) => (
                  <Link key={s} href={`/scholarships/${s}`}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold transition-all ${
                      s === slug
                        ? "bg-yellow-400 text-black font-black"
                        : "text-gray-600 hover:bg-gray-50 hover:text-black"
                    }`}
                  >
                    <span>{d.flag}</span> {d.name}
                    {s === slug && <span className="ml-auto text-[10px] font-black">← You are here</span>}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-black rounded-2xl p-7 text-white text-center">
              <div className="text-3xl mb-3">🧑‍💼</div>
              <h4 className="font-black text-lg mb-2">Get Expert Help</h4>
              <p className="text-gray-400 text-xs leading-relaxed mb-5">
                Our consultants handle your {countryData.name} scholarship application from SOP writing to final submission.
              </p>
              <a href="https://wa.me/8801631312524" target="_blank" rel="noopener noreferrer"
                className="block w-full py-4 bg-yellow-400 text-black font-black rounded-xl hover:bg-white transition-all text-sm mb-3">
                💬 WhatsApp Now →
              </a>
              <div className="flex items-center justify-center gap-4 text-[10px] text-gray-600 font-semibold">
                <span>✅ Free assessment</span>
                <span>⚡ Fast reply</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
              <div className="flex items-start gap-2">
                <AlertCircle size={14} className="text-yellow-600 shrink-0 mt-0.5" />
                <p className="text-xs text-yellow-800 leading-relaxed">
                  Scholarship details are verified from official sources and updated monthly.
                  Always confirm deadlines and requirements on the official scholarship portal before applying.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BACK CTA ─────────────────────────────────────────────────────── */}
      <section className="bg-black py-16 px-6 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-black text-white mb-4">Explore More Countries</h2>
          <p className="text-gray-400 font-medium mb-8">
            Compare scholarships across 15+ countries — fully funded to partial awards, government to university grants.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/scholarships"
              className="inline-flex items-center gap-3 bg-yellow-400 text-black px-10 py-5 rounded-2xl font-black hover:bg-white transition-all shadow-xl text-sm">
              <GraduationCap size={20} /> Browse All Countries
            </Link>
            <a href="https://wa.me/8801631312524" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/10 text-white px-8 py-5 rounded-2xl font-black hover:bg-white/20 transition-all text-sm">
              💬 Talk to Expert
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}