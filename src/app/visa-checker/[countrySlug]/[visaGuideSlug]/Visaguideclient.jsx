"use client";

import { useEffect, useState, useMemo, useRef } from "react";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_EAMMU_API_KEY;
const BASE    = "https://api.eammu.com/api/v1";

// ═══════════════════════════════════════════════════════════════════════════════
// STATIC RICH DATA  (used when visaGuideSlug === "visa-required")
// ═══════════════════════════════════════════════════════════════════════════════

function getStaticDocuments(dest, origin) {
  return {
    identity: [
      {
        title: `Original ${origin} Passport`,
        required: true,
        desc: `Valid for at least 6 months beyond your return date from ${dest}. Minimum 2 blank visa pages required. Submit all old/expired passports alongside your current one — embassies verify travel history.`,
      },
      {
        title: "Visa Application Form",
        required: true,
        desc: `Typed digital form only — handwritten forms are rejected immediately. Must be signed with QR-code verification (2026 mandatory requirement for ${dest} embassy). Download only from the official ${dest} embassy website.`,
      },
      {
        title: "Passport-Size Photographs",
        required: true,
        desc: "47×36 mm rectangular, pure white background, no glasses, no shadows. Face must occupy 70–80% of frame. Taken within the last 90 days. Minimum 2 copies. Matte finish preferred.",
      },
      {
        title: "National ID Card (NID) / Birth Certificate",
        required: true,
        desc: `Notarised photocopy of your ${origin} National ID card with certified English translation if originally in Bengali or Arabic. Birth certificate may be requested for first-time applicants under 18.`,
      },
    ],
    financial: [
      {
        title: "Bank Statement (Last 6 Months)",
        required: true,
        desc: "Official bank stamp on every single page — unstamped pages cause immediate rejection. Consistent transaction history required. Sudden large deposits immediately before applying are a major red flag.",
      },
      {
        title: "Bank Solvency Certificate",
        required: true,
        desc: `On bank letterhead, signed by branch manager, showing current balance in both local currency and USD/EUR. Must be dated within 30 days of your ${dest} visa application submission date.`,
      },
      {
        title: "Income Tax Documentation (TIN/ITDR)",
        required: true,
        desc: "ITDR / Tax Return for last 2–3 assessment years proving legitimate, declared income consistent with your bank activity. E-TIN certificate photocopy must accompany the return acknowledgement slip.",
      },
      {
        title: "Salary Certificate / Pay Slip",
        required: true,
        note: "Required for salaried employees",
        desc: "Issued on company letterhead, signed by HR Manager or Accounts Department, showing monthly gross and net salary, job designation, and employment start date. Last 3 months' pay slips strongly recommended.",
      },
      {
        title: "Sponsor Letter & Bank Statement (If Sponsored)",
        required: false,
        note: "Required if a sponsor covers your travel expenses",
        desc: `If a relative, spouse, or employer is sponsoring your trip to ${dest}, provide their bank statement (last 6 months), sponsor's passport copy, and a notarised sponsor declaration letter.`,
      },
    ],
    professional: [
      {
        title: "NOC / Leave Certificate from Employer",
        required: true,
        desc: `Original on company letterhead with company seal. Must include: your full name, designation, salary, approved leave dates covering your ${dest} trip, and HR Manager / Managing Director signature.`,
      },
      {
        title: "Business Documents (Self-Employed)",
        required: false,
        note: "Required if self-employed or business owner",
        desc: "Trade License with notarised English translation, company bank statement for last 6 months, Memorandum of Association (MoA), and Chamber of Commerce membership certificate.",
      },
      {
        title: "Student Documents",
        required: false,
        note: "Required for students",
        desc: "Current student ID, enrolment / continuation letter from institution on letterhead, NOC from institution confirming student status, and guardian's bank statement if financially dependent.",
      },
      {
        title: "Retirement / Pension Documents",
        required: false,
        note: "Required for retired applicants",
        desc: "Official pension certificate, last 6 months' pension disbursement record from bank, and a letter from the former employer or government body confirming retired status.",
      },
    ],
    travel: [
      {
        title: "Cover Letter / Visa Request Letter",
        required: true,
        desc: `Addressed to the ${dest} Embassy Visa Officer. Must state: full name, passport number, exact travel dates, purpose of visit, financial standing, accommodation details, and strong ties to ${origin} guaranteeing your return. 1–2 pages, typed on A4, signed by hand.`,
      },
      {
        title: "Flight Reservation (Confirmed Itinerary — Not Paid Ticket)",
        required: true,
        desc: `Round-trip itinerary from ${origin} to ${dest} with valid PNR confirmation code. Do NOT purchase the actual ticket before visa approval — a reservation/hold is fully sufficient and saves money.`,
      },
      {
        title: "Hotel Booking / Accommodation Proof",
        required: true,
        desc: `Full property address in ${dest}, check-in and check-out dates matching flight itinerary, and booking reference number for every single night of your stay.`,
      },
      {
        title: "Detailed Day-by-Day Itinerary",
        required: true,
        desc: `City names, planned activities, attractions, and approximate timings per day in ${dest}. Embassy officers verify plausibility — itinerary must align with hotel bookings and be geographically realistic.`,
      },
      {
        title: "Travel Insurance",
        required: true,
        note: "Minimum €30,000 coverage required for Schengen countries",
        desc: `Must cover emergency medical treatment, hospitalisation, repatriation to ${origin}, and the full duration of your stay in ${dest} plus any transit countries.`,
      },
      {
        title: "Previous Visa Copies (If Any)",
        required: false,
        note: "Strongly recommended if available",
        desc: `Photocopies of any previously issued visas (especially Schengen, UK, US, UAE) significantly strengthen your application profile.`,
      },
    ],
  };
}

function getStaticProcessSteps() {
  return [
    { num: "01", icon: "📋", title: "Document Preparation",        time: "3–5 business days", body: "Gather all mandatory documents. Ensure bank stamps on every page of statements, 47×36 mm white-background photos, typed digital forms only. Photocopy the entire dossier and keep a duplicate set at home." },
    { num: "02", icon: "✍️", title: "Cover Letter & Itinerary",    time: "1–2 days",           body: "Write your personalised cover letter demonstrating strong ties to your home country. Build a day-by-day itinerary that is realistic, geographically consistent, and matches every hotel and flight date exactly." },
    { num: "03", icon: "🔍", title: "Professional Document Review", time: "1 day",              body: "Expert visa consultants review your full dossier for errors, missing items, financial consistency, photo compliance, form completion, and cover letter strength before any submission." },
    { num: "04", icon: "🛡️", title: "Travel Insurance Purchase",   time: "Same day",           body: "Purchase an internationally valid travel insurance policy covering the full trip duration plus transit. Confirm the policy explicitly covers emergency medical and repatriation to your home country." },
    { num: "05", icon: "💳", title: "Fee Payment & Appointment",   time: "1–3 days",           body: "Embassy visa fee and VFS/BLS service charges paid online or at the application centre. Biometric appointment booked online — slots fill quickly during peak season." },
    { num: "06", icon: "🏛️", title: "Embassy / VFS Submission",   time: "Day of appointment", body: "Complete documents submitted in person at the embassy or VFS Global centre. Biometrics (fingerprints and photograph) collected on-site if required. Keep the submission receipt." },
    { num: "07", icon: "⏳", title: "Embassy Processing Period",   time: "10–21 business days", body: "Embassy processes your application. Track status via the official embassy portal or VFS tracking number. Avoid booking any non-refundable travel until your passport is physically returned with the visa." },
    { num: "08", icon: "✅", title: "Passport & Visa Collection",  time: "Day of decision",    body: "Collect your passport from VFS or the embassy. Immediately verify: your full name spelling, visa validity dates, number of permitted entries, and maximum stay duration — before leaving the counter." },
  ];
}

function getStaticRejectionReasons() {
  return [
    { icon: "💰", title: "Insufficient Financial Proof",           desc: "Bank balance too low relative to trip cost, sudden large deposits before applying, inconsistent income history, or unstamped bank statement pages." },
    { icon: "📝", title: "Weak or Missing Cover Letter",           desc: "No clear demonstration of ties to home country, vague purpose statement, copied generic template, or failure to explain why you will return home." },
    { icon: "📸", title: "Non-Compliant Photographs",              desc: "Wrong dimensions (must be 47×36 mm), grey or off-white background, glasses in photo, shadows on face, photos taken more than 90 days ago." },
    { icon: "📄", title: "Incomplete or Inconsistent Documentation", desc: "Missing official bank stamps, unsigned application form, expired NOC letter, wrong 2026 form version, or contradicting documents." },
    { icon: "📅", title: "Mismatched Travel Dates",                desc: "Hotel booking dates do not match flight reservation, or day-by-day itinerary doesn't account for every single night of stay." },
    { icon: "🏠", title: "Weak Ties to Home Country",              desc: "No stable employment, property ownership, family dependants, or ongoing commitments — embassy suspects immigration intent." },
    { icon: "🔍", title: "Undisclosed Previous Refusals",          desc: "Failing to declare prior visa refusals from any country. Embassies cross-reference data and undisclosed refusals can result in permanent bans." },
    { icon: "📑", title: "NOC / Employment Letter Issues",         desc: "NOC not on company letterhead, missing company seal, unsigned, backdated, or issued by someone without authority." },
  ];
}

function getStaticExpertTips() {
  return [
    "Apply 6–8 weeks before your intended travel date — never less than 3 weeks. Peak season (June–August, December–January) adds 2–3 extra weeks to processing.",
    "Maintain a consistent bank balance for at least 3 months before applying. The average daily balance should comfortably exceed your estimated daily travel cost.",
    "Your cover letter must include a dedicated paragraph explaining your strong reasons to return home — job, family, property, ongoing studies. This is the most-read section.",
    "Keep your itinerary realistic — 2 cities per week maximum. Embassy officers check plausibility against your flight/hotel dates and geographical distances.",
    "Book refundable hotels for the visa application; switch to non-refundable rates only after visa approval. This saves significant money on cancellation fees.",
    "If your NOC is from a small or private company, attach the company trade licence, TIN certificate, and bank statement — this validates your employer's legitimacy.",
    "Photocopy your entire submitted dossier in the exact order submitted and keep this copy safe at home. You need it if asked to resubmit.",
    "Track your application status online every day once submitted. Respond within 24 hours to any embassy request — delays cause automatic rejection.",
    "If you have prior Schengen, UK, UAE, or US visas, include photocopies — this is one of the strongest signals you are a genuine traveller.",
    "Do not submit multiple simultaneous visa applications to different countries — embassies share data, and concurrent applications raise serious red flags.",
    "Purchase travel insurance before submitting the application (not after) — the policy number must be valid at the time of submission.",
    "If self-employed, have your Trade Licence translated and notarised into English, and provide 12 months of company bank statements.",
  ];
}

function getStaticFAQs(dest, origin) {
  return [
    { question: `How long does ${dest} visa processing take for ${origin} passport holders?`, answer: `Standard processing takes 10–21 business days from the date of submission. During peak travel seasons (June–August and December–January) this can extend to 30–45 business days. Apply at least 6–8 weeks before your planned travel date.` },
    { question: `What is the exact photo specification for a ${dest} visa application in 2026?`, answer: `Photos must be exactly 47×36 mm rectangular with a pure white background. No glasses, no shadows, no head coverings (except religious). Face must occupy 70–80% of the frame. Photos taken within the last 90 days. Matte finish preferred.` },
    { question: "Why must the bank statement have an official stamp on every single page?", answer: `Unstamped pages are considered unofficial and cause immediate rejection. The embassy requires both an official branch stamp AND an authorised signature on every page. A digital printout alone is never accepted. Visit your bank branch in person.` },
    { question: "Do I need to buy a flight ticket before applying for the visa?", answer: `No — a confirmed flight reservation or hold with a valid PNR reference number is completely sufficient. Only purchase the actual ticket after your visa is approved. Buying non-refundable tickets before approval is a common and costly mistake.` },
    { question: `Is a cover letter mandatory for ${origin} passport holders applying for a ${dest} visa?`, answer: `Yes, a cover letter is critical. It explains your purpose of visit, financial capability, accommodation plan, exact travel dates, and most importantly your strong ties to ${origin} that guarantee your return home.` },
    { question: `What should I do if my ${dest} visa application is refused?`, answer: `A refusal is not permanent. Carefully read the refusal letter to identify the stated reason. The most common causes are weak financials, a generic cover letter, or inconsistent documentation. Strengthen each area, wait 2–4 weeks, and reapply.` },
    { question: `Can I apply for a ${dest} visa if I have had a previous visa refusal from any country?`, answer: `Yes — but you must disclose all previous refusals honestly on the application form. Undisclosed refusals discovered by embassy cross-checking can result in permanent bans.` },
    { question: `What is the minimum bank balance required for a ${dest} visa from ${origin}?`, answer: `Embassies do not publish a fixed minimum, but your account should show a balance equivalent to at least USD 50–100 per day of the trip. More importantly, the balance must have been maintained consistently for the past 3–6 months.` },
    { question: `Can ${origin} citizens apply for a ${dest} visa online or is in-person submission required?`, answer: `As of 2026, most ${dest} embassies require in-person submission of biometrics (fingerprints and photograph) at a VFS Global or BLS International centre. Check the specific embassy website for the current procedure.` },
    { question: "How far in advance should I book my hotel and flights for the visa application?", answer: `Make your hotel and flight reservations (not purchases — just holds/bookings) 6–8 weeks before your planned departure. Reserve refundable options until your visa is approved, then switch to non-refundable rates.` },
  ];
}

function getStaticEmbassyInfo(dest) {
  return {
    title: `${dest} Embassy Requirements — 2026 Updates`,
    updates: [
      `The ${dest} embassy now strictly enforces the 47×36 mm photo format with a pure white background — any deviation causes automatic rejection at the counter.`,
      `Handwritten visa application forms are no longer accepted as of 2026. Only typed, digitally completed forms with QR-code verification are valid.`,
      `The ${dest} embassy has implemented a new document verification system in 2026 that cross-references employer details stated in NOC letters. Ensure all employer contact information is current and verifiable.`,
      `Travel insurance with a minimum coverage of €30,000 (for Schengen destinations) is now strictly verified — policies with lower coverage result in form rejection at submission.`,
      `Processing times at the ${dest} embassy have been revised for 2026: standard applications take 10–21 business days; complex cases may take up to 45 business days during peak season.`,
    ],
  };
}

function getStaticCostBreakdown(dest) {
  return [
    { label: "Embassy Visa Fee",                    range: "Varies by destination",        note: "Non-refundable regardless of outcome" },
    { label: "VFS / BLS Service Charge",            range: "~USD 30–65",                   note: "Payable to the visa application centre" },
    { label: "Travel Insurance",                    range: "~USD 20–50",                   note: "For full trip duration, minimum €30,000 cover" },
    { label: "Hotel Reservation Hold",              range: "Refundable",                   note: "Convert to non-refundable only after approval" },
    { label: "Flight Reservation Hold",             range: "Usually free – USD 20",        note: "PNR hold, not a purchased ticket" },
    { label: "Document Translation / Notarisation", range: "~USD 10–40 per document",      note: "If bank or NOC documents require certified English translation" },
    { label: "Professional Visa Consultation",      range: "Varies",                       note: "Eammu Holidays — free initial consultation" },
  ];
}

function getStaticComparisonTable(dest, origin) {
  return {
    title: `${dest} Visa Types at a Glance — ${origin} Applicants`,
    rows: [
      { type: "Single Entry Tourist",   validity: "30–90 days",        stay: "Up to validity",       entry: "1",        processing: "10–21 days", bestFor: "First-time visitors" },
      { type: "Multiple Entry Tourist", validity: "180 days – 1 year", stay: "30–90 days per entry", entry: "Multiple", processing: "15–25 days", bestFor: "Frequent travellers" },
      { type: "Business Visa",          validity: "30–180 days",       stay: "Up to validity",       entry: "1 or Multi", processing: "10–21 days", bestFor: "Business meetings" },
      { type: "Transit Visa",           validity: "72–120 hours",      stay: "Transit only",         entry: "1",        processing: "5–10 days",  bestFor: "Connecting flights" },
      { type: "Family / Dependent",     validity: "Linked to sponsor", stay: "Linked to sponsor",    entry: "Multiple", processing: "15–30 days", bestFor: "Joining family member" },
    ],
  };
}

function getStaticChecklist(dest, origin) {
  return [
    { category: "Before You Apply", icon: "📋", items: ["Passport valid 6+ months beyond return date", "At least 2 blank visa pages available", "Bank balance maintained consistently for 3+ months", "ITDR / tax return filed and acknowledgement obtained", "NOC / leave approved by employer", "Exact travel dates decided", "Refundable hotel bookings made for all nights", "Round-trip flight reservation (PNR hold, not ticket)"] },
    { category: "Documents to Prepare", icon: "📁", items: ["Completed, typed, signed visa application form (2026 version)", "2 passport photos (47×36 mm, white background, matte)", "Bank statement last 6 months — stamped every page", "Bank solvency certificate (dated within 30 days)", "Cover letter addressed to Visa Officer", "Detailed day-by-day itinerary", "Travel insurance policy document", "NOC / leave letter (original)", "Income tax return acknowledgement copy"] },
    { category: "On Submission Day", icon: "🏛️", items: ["Arrive 15 minutes before your VFS/BLS appointment", "Bring originals AND photocopies of every document", "Pay embassy fee and service charge at the counter", "Provide biometrics if required", "Keep the submission receipt carefully", "Note down the application tracking reference number"] },
    { category: "After Submission", icon: "✅", items: ["Track status online every day", "Respond to any embassy requests within 24 hours", "Do NOT purchase non-refundable flights/hotels yet", "On collection, verify name, validity dates, entry count immediately", "Photograph the visa page before travelling"] },
  ];
}

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

function hexToLight(hex) {
  if (!hex) return "rgba(37,99,235,0.07)";
  try {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},0.07)`;
  } catch { return "rgba(37,99,235,0.07)"; }
}

function hexToMedium(hex) {
  if (!hex) return "rgba(37,99,235,0.15)";
  try {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},0.15)`;
  } catch { return "rgba(37,99,235,0.15)"; }
}

function normalizeGuide(raw) {
  if (!raw) return raw;
  let requirements = raw.requirements;
  if (Array.isArray(requirements)) requirements = { mandatory: requirements };
  let steps = raw.steps;
  if (Array.isArray(steps) && steps.length && typeof steps[0] === "string")
    steps = steps.map((s, i) => ({ step: i + 1, title: `Step ${i + 1}`, detail: s }));
  let tips = raw.tips;
  if (Array.isArray(tips)) tips = { general: tips };
  return { ...raw, requirements, steps, tips };
}

const GUIDE_META = {
  "e-visa":          { color: "#2563EB", label: "E-Visa",          icon: "🌐", tagline: "Apply online, travel with ease" },
  "visa-required":   { color: "#DC2626", label: "Visa Required",   icon: "📋", tagline: "Embassy application required" },
  "visa-on-arrival": { color: "#059669", label: "Visa on Arrival", icon: "✈️", tagline: "Get your visa at the airport" },
  "eta":             { color: "#7C3AED", label: "ETA",             icon: "⚡", tagline: "Electronic travel authorisation" },
  "no-admission":    { color: "#B45309", label: "No Admission",    icon: "🚫", tagline: "Entry not permitted" },
  "visa-free":       { color: "#0891B2", label: "Visa Free",       icon: "🆓", tagline: "No visa needed — travel freely" },
};

const KNOWN_FIELDS = new Set([
  "visa_type", "label", "color", "description", "seo_summary",
  "fee", "processing_time", "validity",
  "key_facts", "requirements", "steps", "tips",
  "common_rejection_reasons", "faqs", "glossary",
  "schema_hints", "last_updated", "data_source", "disclaimer", "related_links",
]);

// ═══════════════════════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

function PassportCover({ src, alt, flag, name, size = "md" }) {
  const [hovered, setHovered] = useState(false);
  const w = size === "lg" ? 88 : 68;
  const h = size === "lg" ? 124 : 96;
  return (
    <div className="flex flex-col items-center gap-2" style={{ position: "relative", overflow: "visible", width: w + 20 }}>
      <div
        style={{ position: "relative", overflow: "visible", cursor: src ? "pointer" : "default" }}
        onMouseEnter={() => src && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {src ? (
          <img src={src} alt={alt} style={{ width: w, height: h, objectFit: "cover", borderRadius: 12, boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.35)" : "0 6px 24px rgba(0,0,0,0.25)", border: "3px solid rgba(255,255,255,0.3)", transition: "all 0.25s ease", transform: hovered ? "scale(1.07) translateY(-3px)" : "scale(1)", display: "block" }} />
        ) : (
          <div style={{ width: w, height: h, borderRadius: 12, background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
            {flag && <img src={flag} alt={name} style={{ width: 36, height: 24, objectFit: "cover", borderRadius: 4, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }} />}
          </div>
        )}
        {hovered && src && (
          <div style={{ position: "absolute", bottom: "calc(100% + 14px)", left: "50%", transform: "translateX(-50%)", zIndex: 9999, pointerEvents: "none", filter: "drop-shadow(0 12px 40px rgba(0,0,0,0.3))" }}>
            <div style={{ background: "#fff", borderRadius: 18, border: "1px solid #e2e8f0", padding: 10, width: 196 }}>
              <img src={src} alt={alt} style={{ width: "100%", height: 260, objectFit: "cover", borderRadius: 12, display: "block" }} />
              <p style={{ fontSize: 11, color: "#64748b", fontWeight: 700, textAlign: "center", marginTop: 8 }}>{name}</p>
            </div>
            <div style={{ width: 14, height: 14, background: "#fff", border: "1px solid #e2e8f0", borderTop: "none", borderLeft: "none", transform: "rotate(45deg)", margin: "-7px auto 0", position: "relative", zIndex: -1 }} />
          </div>
        )}
      </div>
      {flag && <img src={flag} alt={name} style={{ width: 34, height: 22, objectFit: "cover", borderRadius: 4, boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }} />}
      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", fontWeight: 700, textAlign: "center", lineHeight: 1.3, margin: 0, maxWidth: w + 20, textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>{name}</p>
    </div>
  );
}

function SectionBlock({ title, accent, children, id }) {
  return (
    <section id={id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="px-6 pt-6 pb-0 flex items-center gap-3 mb-5">
        {accent && <div className="w-1 h-7 rounded-full shrink-0" style={{ background: accent }} />}
        <h2 className="text-[11px] font-black tracking-[0.18em] uppercase text-slate-400">{title}</h2>
      </div>
      <div className="px-6 pb-6">{children}</div>
    </section>
  );
}

function StatPill({ icon, label, value, accentColor, accentLight }) {
  return (
    <div className="flex flex-col items-center justify-center p-4 rounded-2xl border border-slate-100 bg-white shadow-sm text-center hover:-translate-y-0.5 transition-transform cursor-default">
      <span className="text-xl mb-1.5">{icon}</span>
      <p className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color: accentColor }}>{label}</p>
      <p className="text-sm font-black text-slate-800 leading-snug">{value}</p>
    </div>
  );
}

function DocCard({ doc }) {
  return (
    <div className="flex gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/70 transition-all">
      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-emerald-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-bold text-slate-800 text-sm leading-snug">{doc.title}</h4>
          <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 whitespace-nowrap ${doc.required !== false ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-500"}`}>
            {doc.required !== false ? "Required" : "Conditional"}
          </span>
        </div>
        {doc.note && <p className="text-amber-700 text-[10px] font-bold mb-1">📌 {doc.note}</p>}
        {doc.desc && <p className="text-slate-500 text-xs leading-relaxed">{doc.desc}</p>}
      </div>
    </div>
  );
}

function DocGroup({ number, title, colorClass, warnMsg, docs }) {
  const colors = {
    blue:   { dot: "bg-blue-500",   label: "text-blue-700",   warn: "bg-blue-50 border-blue-100 text-blue-800"   },
    green:  { dot: "bg-emerald-500", label: "text-emerald-700", warn: "bg-emerald-50 border-emerald-100 text-emerald-800" },
    purple: { dot: "bg-violet-500", label: "text-violet-700", warn: "bg-violet-50 border-violet-100 text-violet-800" },
    amber:  { dot: "bg-amber-500",  label: "text-amber-700",  warn: "bg-amber-50 border-amber-200 text-amber-900"  },
  };
  const c = colors[colorClass] || colors.blue;
  return (
    <div className="mb-7 last:mb-0">
      <div className="flex items-center gap-2.5 mb-3">
        <div className={`w-2 h-2 rounded-full shrink-0 ${c.dot}`} />
        <h3 className={`text-[10px] font-black uppercase tracking-[0.18em] ${c.label}`}>{number}. {title}</h3>
      </div>
      {warnMsg && (
        <div className={`flex items-start gap-2.5 p-3 rounded-xl border mb-3 ${c.warn}`}>
          <span className="text-sm shrink-0">⚠️</span>
          <p className="text-[11px] font-bold leading-relaxed">{warnMsg}</p>
        </div>
      )}
      <div className="space-y-2">
        {docs.map((doc, i) => <DocCard key={i} doc={doc} />)}
      </div>
    </div>
  );
}

function FAQItem({ question, answer, accentColor }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border-2 overflow-hidden transition-all ${open ? "border-slate-200" : "border-slate-100 hover:border-slate-200"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors"
        aria-expanded={open}
      >
        <span className="font-bold text-slate-800 text-sm leading-snug">{question}</span>
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300"
          style={open ? { background: accentColor, color: "#fff" } : { background: "#f1f5f9", color: "#64748b" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.3s" }}>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/40">{answer}</div>
      )}
    </div>
  );
}

function TabNav({ tabs, activeTab, setActiveTab, accentColor }) {
  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-5">
        <div className="flex gap-0.5 overflow-x-auto scrollbar-none py-2">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => {
                setActiveTab(t.id);
                const el = document.getElementById(`sec-${t.id}`);
                if (el) { const y = el.getBoundingClientRect().top + window.scrollY - 70; window.scrollTo({ top: y, behavior: "smooth" }); }
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider whitespace-nowrap transition-all shrink-0 ${activeTab === t.id ? "text-white shadow-sm" : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"}`}
              style={activeTab === t.id ? { background: accentColor } : {}}
            >
              <span className="text-sm">{t.icon}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export default function VisaGuideClient({
  initialGuide,
  passportName,
  destName,
  countrySlug,
  visaGuideSlug,
}) {
  const [guide,        setGuide]        = useState(() => normalizeGuide(initialGuide));
  const [passportData, setPassportData] = useState(null);
  const [passLoading,  setPassLoading]  = useState(false);
  const [error,        setError]        = useState("");
  const [activeTab,    setActiveTab]    = useState("overview");

  const isVisaRequired = visaGuideSlug === "visa-required";

  // Client-side fallback fetch
  useEffect(() => {
    if (guide || !visaGuideSlug) return;
    fetch(`/api/visa-guide/${visaGuideSlug}`)
      .then(async (res) => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || `HTTP ${res.status}`);
        setGuide(normalizeGuide(json));
      })
      .catch((err) => setError(err.message || "Could not load guide."));
  }, [visaGuideSlug]); // eslint-disable-line

  // Passport cover + flag — always client-side
  useEffect(() => {
    if (!passportName || !destName) return;
    setPassLoading(true);
    fetch(`${BASE}/passport?from=${encodeURIComponent(passportName)}&to=${encodeURIComponent(destName)}&api_key=${API_KEY}`)
      .then(async (res) => {
        if (!res.ok) throw new Error();
        const data = await res.json();
        if (data.from || data.to) setPassportData({ from: data.from, to: data.to });
      })
      .catch(() => {})
      .finally(() => setPassLoading(false));
  }, [passportName, destName]);

  // ── Derived values ──────────────────────────────────────────────────────────
  const fallbackMeta = GUIDE_META[visaGuideSlug] || { color: "#2563EB", label: visaGuideSlug || "Guide", icon: "📄", tagline: "Visa information" };
  const activeColor  = guide?.color || fallbackMeta.color;
  const activeLight  = hexToLight(activeColor);
  const activeMed    = hexToMedium(activeColor);
  const meta         = { ...fallbackMeta, color: activeColor };
  const headline     = destName ? `${passportName} → ${destName}` : passportName;
  const fromName     = passportData?.from?.name || passportName || "";
  const toName       = passportData?.to?.name   || destName     || "";

  // ── Static data (memoised) ──────────────────────────────────────────────────
  const staticDocs       = useMemo(() => isVisaRequired ? getStaticDocuments(toName || destName, fromName || passportName)       : null, [isVisaRequired, toName, fromName]);
  const staticSteps      = useMemo(() => isVisaRequired ? getStaticProcessSteps()                                                : null, [isVisaRequired]);
  const staticRejections = useMemo(() => isVisaRequired ? getStaticRejectionReasons()                                            : null, [isVisaRequired]);
  const staticTips       = useMemo(() => isVisaRequired ? getStaticExpertTips()                                                  : null, [isVisaRequired]);
  const staticFAQs       = useMemo(() => isVisaRequired ? getStaticFAQs(toName || destName, fromName || passportName)            : null, [isVisaRequired, toName, fromName]);
  const staticEmbassy    = useMemo(() => isVisaRequired ? getStaticEmbassyInfo(toName || destName)                               : null, [isVisaRequired, toName]);
  const staticCosts      = useMemo(() => isVisaRequired ? getStaticCostBreakdown(toName || destName)                             : null, [isVisaRequired, toName]);
  const staticComparison = useMemo(() => isVisaRequired ? getStaticComparisonTable(toName || destName, fromName || passportName) : null, [isVisaRequired, toName, fromName]);
  const staticChecklist  = useMemo(() => isVisaRequired ? getStaticChecklist(toName || destName, fromName || passportName)       : null, [isVisaRequired, toName, fromName]);

  // ── Merge: API first, static appended ──────────────────────────────────────
  const kf             = guide?.key_facts;
  const apiTips        = guide?.tips ? Object.values(guide.tips).flat() : [];
  const apiRejections  = guide?.common_rejection_reasons || [];
  const apiFAQs        = guide?.faqs || [];
  const mergedSteps    = guide?.steps?.length ? guide.steps : (staticSteps || []);
  const mergedTips     = [...apiTips, ...(isVisaRequired ? (staticTips || []) : [])];
  const mergedRejections = isVisaRequired ? [...staticRejections.map(r => ({ ...r, isStatic: true })), ...apiRejections.map(r => ({ title: typeof r === "string" ? r : r.title, desc: typeof r === "string" ? "" : r.desc, icon: "⚠️" }))] : apiRejections;
  const mergedFAQs     = [...apiFAQs, ...(isVisaRequired ? (staticFAQs || []) : [])];

  const quickStats = {
    processingTime: kf?.processing_time || guide?.processing_time || (isVisaRequired ? "10–21 Days"    : null),
    validity:       kf?.validity_range  || guide?.validity        || (isVisaRequired ? "30–180 Days"   : null),
    fee:            kf?.fee_range       || guide?.fee             || (isVisaRequired ? "Check Below"   : null),
    entryType:      kf?.entry_type      || (isVisaRequired        ? "Single / Multi"                  : null),
  };

  const showSkeleton = !guide && !error;
  const showContent  = guide || isVisaRequired;

  const tabs = [
    { id: "overview",   label: "Overview",     icon: "📌" },
    { id: "documents",  label: "Documents",    icon: "📁" },
    { id: "process",    label: "How to Apply", icon: "🗺️" },
    { id: "costs",      label: "Costs & Fees", icon: "💰" },
    { id: "checklist",  label: "Checklist",    icon: "✅" },
    { id: "tips",       label: "Expert Tips",  icon: "💡" },
    { id: "rejection",  label: "Avoid Refusal", icon: "🚫" },
    { id: "faq",        label: "FAQ",          icon: "❓" },
  ];

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER SECTIONS
  // ═══════════════════════════════════════════════════════════════════════════

  function renderQuickStats() {
    const statsToRender = [];
    if (kf) {
      const LABELS = { fee_range: "Fee", processing_time: "Processing", validity_range: "Validity", passport_validity: "Passport Min.", common_visa_types: "Visa Types", entry_type: "Entry Type" };
      Object.entries(kf).forEach(([k, v]) => {
        if (!v) return;
        const label = LABELS[k] || k.replace(/_/g, " ");
        const icon = k.includes("fee") ? "💰" : k.includes("time") || k.includes("process") ? "⏱️" : k.includes("valid") ? "📅" : k.includes("entry") ? "🛂" : "📋";
        if (!Array.isArray(v)) statsToRender.push({ icon, label, value: v });
      });
    } else {
      if (quickStats.processingTime) statsToRender.push({ icon: "⏱️", label: "Processing Time", value: quickStats.processingTime });
      if (quickStats.validity)       statsToRender.push({ icon: "📅", label: "Validity",         value: quickStats.validity });
      if (quickStats.fee)            statsToRender.push({ icon: "💰", label: "Embassy Fee",      value: quickStats.fee });
      if (quickStats.entryType)      statsToRender.push({ icon: "🛂", label: "Entry Type",       value: quickStats.entryType });
    }
    if (!statsToRender.length) return null;
    return (
      <div className={`grid gap-3 ${statsToRender.length === 1 ? "grid-cols-1" : statsToRender.length === 2 ? "grid-cols-2" : statsToRender.length === 3 ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}>
        {statsToRender.map((s, i) => (
          <StatPill key={i} icon={s.icon} label={s.label} value={s.value} accentColor={activeColor} accentLight={activeLight} />
        ))}
      </div>
    );
  }

  function renderComparisonTable() {
    if (!isVisaRequired || !staticComparison) return null;
    return (
      <section id="sec-overview" className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 pt-6 pb-4 flex items-center gap-3">
          <div className="w-1 h-7 rounded-full shrink-0" style={{ background: `linear-gradient(to bottom, ${activeColor}, ${activeColor}99)` }} />
          <div>
            <h2 className="text-lg font-black text-slate-900 leading-tight">{staticComparison.title}</h2>
            <p className="text-slate-500 text-xs mt-0.5">Compare all {toName || destName} visa options for {fromName || passportName} passport holders — 2026</p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left min-w-[580px]">
            <thead>
              <tr style={{ background: activeColor }}>
                {["Visa Type", "Validity", "Max Stay", "Entries", "Processing", "Best For"].map(h => (
                  <th key={h} className="px-4 py-3 text-[9px] font-black uppercase tracking-wider text-white whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {staticComparison.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                  <td className="px-4 py-3 font-bold text-slate-800 text-xs whitespace-nowrap">{row.type}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs whitespace-nowrap">{row.validity}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs whitespace-nowrap">{row.stay}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs">{row.entry}</td>
                  <td className="px-4 py-3 text-slate-600 text-xs whitespace-nowrap">{row.processing}</td>
                  <td className="px-4 py-3 text-xs"><span className="px-2 py-1 rounded-full font-bold text-[10px] whitespace-nowrap" style={{ background: activeLight, color: activeColor }}>{row.bestFor}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  function renderIntro() {
    if (!guide?.description && !isVisaRequired) return null;
    const dn = toName || destName;
    const fn = fromName || passportName;
    return (
      <section id="sec-introduction" className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-7 rounded-full shrink-0" style={{ background: `linear-gradient(to bottom, #3b82f6, #6366f1)` }} />
          <h2 className="text-lg font-black text-slate-900 leading-tight">
            {dn} {guide?.label || meta.label} — What {fn} Citizens Need to Know
          </h2>
        </div>
        <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
          {guide?.description && <p>{guide.description}</p>}
          {isVisaRequired && !guide?.description && (
            <>
              <p>The <strong className="text-slate-800">{dn} visa for {fn} citizens</strong> requires submitting a comprehensive dossier to the {dn} Embassy or designated Visa Application Centre (VFS Global / BLS International). Every document must be in order — missing even one item results in outright rejection without a refund of fees paid.</p>
              <p>{dn} visa processing for {fn} passport holders typically takes <strong className="text-slate-800">10–21 business days</strong> from the date of submission. During peak travel seasons this can extend to 30–45 days. Apply at least 6–8 weeks before your intended travel date to account for delays.</p>
              <p>The most common rejection reason for {fn} applicants is <strong className="text-slate-800">insufficient financial documentation</strong> combined with a weak cover letter that fails to demonstrate strong ties to {fn} and a clear intention to return home after the visit.</p>
            </>
          )}
          {isVisaRequired && (
            <div className="p-4 rounded-xl border border-blue-100 bg-blue-50 flex gap-3">
              <span className="text-xl shrink-0">🇦🇪</span>
              <p className="text-blue-800 text-sm font-medium leading-relaxed">
                <strong>UAE Residents ({fn} passport holders):</strong> If you are based in Dubai, Abu Dhabi, or elsewhere in the UAE, you can apply through the {dn} embassy in Abu Dhabi or the nearest VFS/BLS centre. Include your UAE residence visa copy and Emirates ID with all standard documents. UAE bank statements are accepted alongside home-country statements.
              </p>
            </div>
          )}
        </div>
      </section>
    );
  }

  function renderEmbassyUpdates() {
    if (!isVisaRequired || !staticEmbassy) return null;
    return (
      <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-7 rounded-full shrink-0" style={{ background: "linear-gradient(to bottom, #f97316, #f59e0b)" }} />
          <h2 className="text-lg font-black text-slate-900 leading-tight">{staticEmbassy.title}</h2>
        </div>
        <p className="text-slate-500 text-xs mb-5 ml-4">Critical changes {toName || destName} applicants must be aware of before submitting their application.</p>
        <div className="space-y-2.5">
          {staticEmbassy.updates.map((update, i) => (
            <div key={i} className="flex items-start gap-3.5 p-4 rounded-xl border border-amber-100 bg-amber-50">
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 mt-0.5 bg-amber-200 text-amber-800">{i + 1}</div>
              <p className="text-sm text-amber-900 leading-relaxed">{update}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }

  function renderRequirements() {
    const req = guide?.requirements;
    const dn = toName || destName;
    const fn = fromName || passportName;

    if (isVisaRequired && staticDocs && !req?.mandatory?.length) {
      return (
        <section id="sec-documents" className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-1 h-7 rounded-full shrink-0 bg-gradient-to-b from-emerald-500 to-teal-600" />
            <h2 className="text-lg font-black text-slate-900 leading-tight">{dn} Visa Documents for {fn} Citizens</h2>
          </div>
          <p className="text-slate-500 text-xs mb-6 ml-4">Missing even one document causes rejection without a refund of the embassy fee.</p>
          <DocGroup number="01" title="Travel Identity & Personal Documents" colorClass="blue"   docs={staticDocs.identity} />
          <DocGroup number="02" title="Financial Documents"                  colorClass="green"  docs={staticDocs.financial}    warnMsg="Financial documents are the #1 rejection reason — bank stamps required on every single page. Unstamped pages = immediate rejection." />
          <DocGroup number="03" title="Professional & Employment Status"     colorClass="purple" docs={staticDocs.professional} />
          <DocGroup number="04" title="Travel Planning Documents"            colorClass="amber"  docs={staticDocs.travel}       warnMsg="Itinerary, hotel bookings, and flights must have perfectly matching dates. Any gap in accommodation causes rejection." />
        </section>
      );
    }

    if (!req) return null;
    const PURPOSE_LABELS = { tourism: "🏖️ Tourism", business: "💼 Business", study: "🎓 Study", transit: "🔄 Transit" };
    return (
      <SectionBlock id="sec-documents" title={`${dn} Visa — Requirements Checklist`} accent={activeColor}>
        {req.mandatory?.length > 0 && (
          <ul className="space-y-2.5 mb-5">
            {req.mandatory.map((r, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs shrink-0 mt-0.5 font-bold" style={{ background: activeColor }}>✓</span>
                <span className="text-sm text-slate-700 leading-relaxed">{r}</span>
              </li>
            ))}
          </ul>
        )}
        {req.by_purpose && Object.keys(req.by_purpose).length > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Additional by purpose</p>
            {Object.entries(req.by_purpose).map(([purpose, items]) => (
              <div key={purpose}>
                <p className="text-xs font-bold text-slate-600 mb-2">{PURPOSE_LABELS[purpose] || purpose}</p>
                <ul className="space-y-1.5 pl-2">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <span style={{ color: activeColor }} className="shrink-0 mt-0.5">›</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </SectionBlock>
    );
  }

  function renderSteps() {
    if (!isVisaRequired && !guide?.steps?.length) return null;
    if (!mergedSteps?.length) return null;
    const dn = toName || destName;
    const fn = fromName || passportName;
    const isStatic = !guide?.steps?.length;
    return (
      <section id="sec-process" className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-7 rounded-full shrink-0" style={{ background: "linear-gradient(to bottom, #6366f1, #3b82f6)" }} />
          <h2 className="text-lg font-black text-slate-900 leading-tight">
            {isStatic && isVisaRequired ? `How to Apply for ${dn} Visa from ${fn} — Step by Step` : "Step-by-Step Application Process"}
          </h2>
        </div>
        <p className="text-slate-500 text-xs mb-6 ml-4">Follow every step precisely to maximise your {dn} visa approval chances.</p>
        <ol className="space-y-0">
          {mergedSteps.map((s, i) => {
            const stepNum    = s.num   || s.step || (i + 1);
            const stepTitle  = s.title || `Step ${i + 1}`;
            const stepDetail = s.body  || s.detail || s.description || (typeof s === "string" ? s : "");
            const stepTime   = s.time;
            const stepIcon   = s.icon;
            return (
              <li key={i} className="flex gap-4 group relative pb-6 last:pb-0">
                {i < mergedSteps.length - 1 && <div className="absolute left-5 top-12 bottom-0 w-px bg-gradient-to-b from-slate-200 to-transparent" />}
                <div className="flex flex-col items-center shrink-0">
                  <div className="w-10 h-10 rounded-xl border-2 border-slate-100 group-hover:border-current flex items-center justify-center text-lg transition-all" style={{ background: activeLight }}>
                    {stepIcon ? <span>{stepIcon}</span> : <span className="text-xs font-black" style={{ color: activeColor }}>{stepNum}</span>}
                  </div>
                </div>
                <div className="flex-1 pt-1.5 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: activeColor }}>Step {stepNum}</span>
                    {stepTime && <span className="text-[9px] font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">⏱ {stepTime}</span>}
                  </div>
                  <p className="text-sm font-black text-slate-800 mb-1 leading-snug">{stepTitle}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{stepDetail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>
    );
  }

  function renderCostBreakdown() {
    if (!isVisaRequired || !staticCosts) return null;
    const dn = toName || destName;
    const fn = fromName || passportName;
    return (
      <section id="sec-costs" className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-1.5">
          <div className="w-1 h-7 rounded-full shrink-0 bg-gradient-to-b from-emerald-500 to-green-600" />
          <h2 className="text-lg font-black text-slate-900 leading-tight">{dn} Visa Cost Breakdown — {fn} Citizens 2026</h2>
        </div>
        <p className="text-slate-500 text-xs mb-5 ml-4">Total visa cost for {fn} applicants includes multiple components beyond just the embassy fee.</p>
        <div className="space-y-2">
          {staticCosts.map((cost, i) => (
            <div key={i} className="flex items-start gap-3.5 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/60 transition-all">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-base" style={{ background: activeLight }}>💳</div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h4 className="font-bold text-slate-800 text-sm">{cost.label}</h4>
                  <span className="text-[10px] font-black px-2.5 py-1 rounded-full whitespace-nowrap" style={{ background: activeLight, color: activeColor }}>{cost.range}</span>
                </div>
                {cost.note && <p className="text-slate-500 text-xs mt-0.5">{cost.note}</p>}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 rounded-xl border-2 border-amber-200 bg-amber-50">
          <p className="text-sm font-black text-amber-800 mb-1">⚠️ Embassy fees are non-refundable</p>
          <p className="text-xs text-amber-700 leading-relaxed">The {dn} embassy fee is non-refundable regardless of whether your visa is approved or refused. Budget for the total cost including VFS/BLS service charges and travel insurance before applying.</p>
        </div>
      </section>
    );
  }

  function renderChecklist() {
    if (!isVisaRequired || !staticChecklist) return null;
    const dn = toName || destName;
    const fn = fromName || passportName;
    return (
      <section id="sec-checklist" className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-1.5">
          <div className="w-1 h-7 rounded-full shrink-0 bg-gradient-to-b from-violet-500 to-purple-600" />
          <h2 className="text-lg font-black text-slate-900 leading-tight">{dn} Visa Application Checklist — {fn} Citizens</h2>
        </div>
        <p className="text-slate-500 text-xs mb-5 ml-4">Use this checklist to track every stage of your {dn} visa application from {fn}.</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {staticChecklist.map((section, si) => (
            <div key={si} className="rounded-xl border border-slate-100 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2" style={{ background: activeLight }}>
                <span className="text-base">{section.icon}</span>
                <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: activeColor }}>{section.category}</p>
              </div>
              <div className="p-4 space-y-2.5">
                {section.items.map((item, ii) => (
                  <label key={ii} className="flex items-start gap-2.5 cursor-pointer group">
                    <div className="w-4 h-4 mt-0.5 rounded border-2 border-slate-200 group-hover:border-emerald-500 shrink-0 transition-colors" style={{ minWidth: 16 }} />
                    <span className="text-xs text-slate-600 leading-relaxed group-hover:text-slate-800 transition-colors">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-400 text-center mt-4 font-medium">Print this checklist and physically tick each item before submission.</p>
      </section>
    );
  }

  function renderTips() {
    if (!mergedTips.length) return null;
    const dn = toName || destName;
    const fn = fromName || passportName;
    return (
      <section id="sec-tips" className="rounded-2xl p-6 text-white overflow-hidden relative" style={{ background: `linear-gradient(135deg, ${activeColor} 0%, ${activeColor}cc 100%)` }}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 blur-2xl rounded-full pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-start gap-3.5 mb-6">
            <span className="text-3xl shrink-0">💡</span>
            <div>
              <h2 className="text-lg font-black leading-tight">Expert Tips — {dn} Visa for {fn} Citizens</h2>
              <p className="text-white/65 text-xs mt-1">Proven strategies that significantly increase your approval chances in 2026</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {mergedTips.map((tip, i) => {
              const text = typeof tip === "string" ? tip : tip.tip || tip.text || "";
              return (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-white/15 bg-white/10 hover:bg-white/15 transition-colors">
                  <span className="w-6 h-6 bg-amber-400 text-slate-900 rounded-lg flex items-center justify-center font-black text-[11px] shrink-0 mt-0.5">{i + 1}</span>
                  <p className="text-[13px] text-white/90 leading-relaxed">{text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  function renderRejections() {
    if (!mergedRejections.length) return null;
    const dn = toName || destName;
    const fn = fromName || passportName;
    return (
      <section id="sec-rejection" className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-1.5">
          <div className="w-1 h-7 rounded-full shrink-0 bg-gradient-to-b from-red-500 to-rose-600" />
          <h2 className="text-lg font-black text-slate-900 leading-tight">Why {dn} Visa Applications Get Rejected — {fn} Applicants 2026</h2>
        </div>
        <p className="text-slate-500 text-xs mb-5 ml-4">Understanding these common mistakes helps you prepare a flawless {dn} visa application.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {mergedRejections.map((r, i) => {
            const title = typeof r === "string" ? r : r.title || "";
            const desc  = typeof r === "object" ? r.desc  || "" : "";
            const icon  = typeof r === "object" ? r.icon  || "⚠️" : "⚠️";
            return (
              <div key={i} className="flex gap-3.5 p-4 bg-red-50 border border-red-100 rounded-xl hover:border-red-200 transition-all">
                <span className="text-2xl shrink-0">{icon}</span>
                <div>
                  <h4 className="font-black text-red-900 text-sm mb-1 leading-snug">{title}</h4>
                  {desc && <p className="text-xs text-red-700/80 leading-relaxed">{desc}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  function renderFAQs() {
    if (!mergedFAQs.length) return null;
    const dn = toName || destName;
    const fn = fromName || passportName;
    return (
      <section id="sec-faq" className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-1.5">
          <div className="w-1 h-7 rounded-full shrink-0 bg-gradient-to-b from-amber-400 to-orange-500" />
          <h2 className="text-lg font-black text-slate-900 leading-tight">{dn} Visa FAQ for {fn} Citizens 2026</h2>
        </div>
        <p className="text-slate-500 text-xs mb-5 ml-4">Answers to the most common questions from {fn} applicants planning to visit {dn}.</p>
        <div className="space-y-2.5">
          {mergedFAQs.map((f, i) => (
            <FAQItem key={i} question={f.question || f.q} answer={f.answer || f.a} accentColor={activeColor} />
          ))}
        </div>
      </section>
    );
  }

  function renderGlossary() {
    const glossary = guide?.glossary;
    if (!glossary || !Object.keys(glossary).length) return null;
    return (
      <SectionBlock title="Glossary" accent={activeColor}>
        <div className="space-y-3">
          {Object.entries(glossary).map(([term, def]) => (
            <div key={term} className="pl-3 border-l-2" style={{ borderColor: activeColor }}>
              <p className="text-[10px] font-black text-slate-700 uppercase tracking-widest mb-0.5">{term.replace(/_/g, " ")}</p>
              <p className="text-sm text-slate-600 leading-relaxed">{def}</p>
            </div>
          ))}
        </div>
      </SectionBlock>
    );
  }

  function renderSeoLongForm() {
    if (!isVisaRequired) return null;
    const dn = toName || destName;
    const fn = fromName || passportName;
    return (
      <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-1 h-7 rounded-full shrink-0 bg-gradient-to-b from-slate-400 to-slate-600" />
          <h2 className="text-lg font-black text-slate-900 leading-tight">Complete {dn} Visa Guide for {fn} Nationals — 2026</h2>
        </div>
        <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
          <p>The <strong className="text-slate-800">{dn} visa for {fn} citizens</strong> is one of the most important travel documents to prepare carefully and well in advance. Financial documentation is the most critical component — embassy officers assess whether your bank balance and income are consistent, legitimate, and sufficient to support your entire trip to {dn} without the risk of overstaying.</p>

          <div>
            <h3 className="text-base font-black text-slate-800 mb-2">{dn} Visa Fees for {fn} Citizens 2026</h3>
            <p>Embassy fees for a {dn} visa are non-refundable regardless of the outcome of your application. Additional VFS Global or BLS International service charges apply on top of the embassy fee. Budget for travel insurance, document translation, and consultation fees in your total cost estimate before submitting your application.</p>
          </div>

          <div>
            <h3 className="text-base font-black text-slate-800 mb-2">Bank Statement Requirements for {dn} Visa — {fn} Applicants</h3>
            <p>Embassy officers reviewing {fn} applicants' bank statements assess four key factors: (1) minimum balance that comfortably covers daily living expenses in {dn} plus return airfare, (2) a consistent 6-month transaction history with no suspicious sudden deposits, (3) official branch stamps on every single page, and (4) the account holder name matching the passport exactly with no discrepancies.</p>
          </div>

          <div>
            <h3 className="text-base font-black text-slate-800 mb-2">How to Write a Strong Cover Letter for {dn} Visa</h3>
            <p>A strong cover letter for {fn} nationals applying to visit {dn} must address six core elements: your full name and passport details, exact travel dates, detailed purpose of visit, financial capacity with reference to your bank statements, your accommodation plan in {dn}, and most critically — a dedicated section demonstrating your strong ties to {fn} that guarantee your return home after your visit. The cover letter should be 1–2 pages, typed on A4, and signed in ink.</p>
          </div>

          <div>
            <h3 className="text-base font-black text-slate-800 mb-2">Best Time to Apply for a {dn} Visa from {fn}</h3>
            <p>The ideal time to apply is 6–8 weeks before your planned travel date. Peak application seasons (June–August for summer travel, December–January for holidays) see processing times extend to 30–45 business days. Applying during off-peak periods (February–April, September–November) generally results in faster processing and lower appointment waiting times.</p>
          </div>

          <div>
            <h3 className="text-base font-black text-slate-800 mb-2">Applying for {dn} Visa from Dubai — UAE Residents with {fn} Passport</h3>
            <p>{fn} passport holders residing in the UAE (Dubai, Abu Dhabi, Sharjah) can apply for a {dn} visa through the {dn} embassy in Abu Dhabi or the relevant VFS/BLS centre. UAE residents must additionally provide their UAE residence visa copy, Emirates ID, and proof of UAE residence alongside all standard {dn} visa documents. UAE bank statements are accepted alongside or instead of home-country bank statements for UAE-resident applicants.</p>
          </div>

          <div>
            <h3 className="text-base font-black text-slate-800 mb-2">What to Do If Your {dn} Visa Application Is Refused</h3>
            <p>A {dn} visa refusal is not a permanent ban. Read the refusal letter carefully — embassies are required to state the reason. The most common refusal reasons for {fn} applicants are insufficient financial documentation, a weak cover letter, or inconsistent documentation dates. Address each stated reason specifically, strengthen your dossier, wait 2–4 weeks, and reapply. Eammu Holidays specialises in successful resubmission cases with a strong track record.</p>
          </div>
        </div>
      </section>
    );
  }

  function renderApiOnlyContent() {
    // For non-visa-required types: render whatever API returns
    if (isVisaRequired || !guide) return null;
    const req = guide?.requirements;
    const hasReq = req?.mandatory?.length || (req?.by_purpose && Object.keys(req.by_purpose).length);
    return (
      <>
        {/* API tips */}
        {apiTips.length > 0 && renderTips()}
        {/* API rejection reasons */}
        {apiRejections.length > 0 && (
          <SectionBlock title="Common Rejection Reasons" accent={activeColor} id="sec-rejection">
            <ul className="space-y-2">
              {apiRejections.map((r, i) => {
                const text = typeof r === "string" ? r : r.title || r.reason || "";
                const desc = typeof r === "object" ? r.desc || r.description || "" : "";
                return (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="text-red-400 shrink-0 mt-0.5 font-black text-base">✕</span>
                    <div>
                      <span>{text}</span>
                      {desc && <p className="text-xs text-slate-500 mt-0.5">{desc}</p>}
                    </div>
                  </li>
                );
              })}
            </ul>
          </SectionBlock>
        )}
        {/* API FAQs */}
        {apiFAQs.length > 0 && (
          <SectionBlock title="Frequently Asked Questions" accent={activeColor} id="sec-faq">
            <div className="space-y-2.5">
              {apiFAQs.map((f, i) => <FAQItem key={i} question={f.question || f.q} answer={f.answer || f.a} accentColor={activeColor} />)}
            </div>
          </SectionBlock>
        )}
      </>
    );
  }

  function renderGenericFallback() {
    if (!guide) return null;
    return Object.entries(guide)
      .filter(([k]) => !KNOWN_FIELDS.has(k))
      .map(([k, v]) => {
        if (Array.isArray(v) && v.length > 0 && typeof v[0] === "string") return (
          <SectionBlock key={k} title={k.replace(/_/g, " ")} accent={activeColor}>
            <ul className="space-y-2">{v.map((item, i) => <li key={i} className="text-sm text-slate-700 leading-relaxed flex gap-2"><span style={{ color: activeColor }}>•</span>{item}</li>)}</ul>
          </SectionBlock>
        );
        if (typeof v === "string" && v) return (
          <div key={k} className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">{k.replace(/_/g, " ")}</p>
            <p className="text-sm text-slate-700">{v}</p>
          </div>
        );
        return null;
      });
  }

  function renderDisclaimer() {
    const { disclaimer, data_source, last_updated } = guide || {};
    if (!disclaimer && !data_source) return null;
    return (
      <div className="rounded-xl border border-amber-100 bg-amber-50 px-5 py-4 text-xs text-amber-700 space-y-1">
        {disclaimer  && <p>{disclaimer}</p>}
        {data_source && <p className="font-bold">{data_source}</p>}
        {last_updated && <p className="text-amber-500">Last updated: {last_updated}</p>}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // MAIN RENDER
  // ═══════════════════════════════════════════════════════════════════════════

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${activeColor} 0%, ${activeColor}bb 100%)` }}>
        {/* Decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[100px] opacity-20 bg-white" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full blur-[80px] opacity-15 bg-black" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-px bg-white/10" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20 md:pt-14 md:pb-24 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb" className="flex items-center gap-1.5 text-white/55 text-xs font-semibold mb-7 flex-wrap">
            <Link href="/visa-checker" className="hover:text-white/90 transition-colors">Visa Checker</Link>
            <span className="text-white/30">/</span>
            <Link href={`/visa-checker/${countrySlug}`} className="hover:text-white/90 transition-colors truncate max-w-[180px]">{headline}</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/80" aria-current="page">{guide?.label || meta.label}</span>
          </nav>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left: text */}
            <div>
              {/* Type badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full mb-5">
                <span className="text-base">{meta.icon}</span>
                <span className="text-white text-[10px] font-black uppercase tracking-widest">{guide?.label || meta.label} · Eammu Holidays 2026</span>
                {passportData?.to?.flag && <img src={passportData.to.flag} className="w-5 h-3.5 object-cover rounded shadow" alt={toName} />}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-4xl font-black text-white mb-3 leading-tight">
                {destName
                  ? <>{toName || destName} <span style={{ color: "rgba(255,255,255,0.9)" }}>{guide?.label || meta.label}</span><br /><span className="text-white/70 font-normal text-xl sm:text-2xl">for {fromName || passportName} Citizens</span></>
                  : <>{guide?.label || meta.label} Guide</>
                }
              </h1>
              <p className="text-white/75 text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                {guide?.description ||
                  (isVisaRequired
                    ? `Complete ${toName || destName} visa requirements for ${fromName || passportName} passport holders — embassy-verified documents, fees, process, and expert tips for 2026.`
                    : `${fromName || passportName} passport holders: ${guide?.label || meta.label} information for ${toName || destName}. Requirements, fees, and key facts.`
                  )}
              </p>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-2">
                {["Embassy Verified", "2026 Updated", "Expert Reviewed"].map(b => (
                  <span key={b} className="px-2.5 py-1.5 bg-white/15 border border-white/20 rounded-full text-[9px] font-black text-white uppercase tracking-wider">{b}</span>
                ))}
                {isVisaRequired && (
                  <>
                    <span className="px-2.5 py-1.5 bg-white/15 border border-white/20 rounded-full text-[9px] font-black text-white uppercase tracking-wider">98% Success Rate</span>
                    <span className="px-2.5 py-1.5 bg-white/15 border border-white/20 rounded-full text-[9px] font-black text-white uppercase tracking-wider">UAE Residents ✓</span>
                  </>
                )}
              </div>
            </div>

            {/* Right: passport covers */}
            {destName && (
              <div className="flex items-center justify-center gap-5 sm:gap-8 py-4 overflow-visible">
                {passLoading ? (
                  <>
                    <div className="flex flex-col items-center gap-2"><div className="w-20 h-[110px] rounded-xl bg-white/20 animate-pulse" /><div className="w-8 h-5 rounded bg-white/20 animate-pulse" /></div>
                    <div className="flex flex-col items-center gap-2"><span className="text-3xl text-white/40">✈</span></div>
                    <div className="flex flex-col items-center gap-2"><div className="w-20 h-[110px] rounded-xl bg-white/20 animate-pulse" /><div className="w-8 h-5 rounded bg-white/20 animate-pulse" /></div>
                  </>
                ) : (
                  <>
                    <PassportCover src={passportData?.from?.passport_cover} alt={fromName || passportName} flag={passportData?.from?.flag} name={fromName || passportName} size="lg" />
                    <div className="flex flex-col items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="w-10 sm:w-14 h-px bg-white/30" />
                        <span className="text-2xl text-white drop-shadow">✈</span>
                        <div className="w-10 sm:w-14 h-px bg-white/30" />
                      </div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-white/45">Travel Route</p>
                    </div>
                    <PassportCover src={passportData?.to?.passport_cover} alt={toName || destName} flag={passportData?.to?.flag} name={toName || destName} size="lg" />
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── TAB NAV (visa-required only) ─────────────────────────────────────── */}
      {isVisaRequired && (guide || isVisaRequired) && (
        <TabNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} accentColor={activeColor} />
      )}

      {/* ── MAIN LAYOUT ───────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-10 relative z-20">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">

          {/* ── CONTENT COLUMN ─────────────────────────────────────────────── */}
          <main className="lg:col-span-8 space-y-5 min-w-0">

            {/* Skeleton */}
            {showSkeleton && (
              <div className="space-y-4 pt-10">
                {[32, 48, 64].map(h => <div key={h} className={`h-${h} bg-slate-200 rounded-2xl animate-pulse`} />)}
              </div>
            )}

            {/* Error */}
            {error && !guide && (
              <div className="mt-10 p-5 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700">
                <p className="font-bold mb-1">Failed to load guide</p>
                <p>{error}</p>
              </div>
            )}

            {showContent && (
              <div className="space-y-5 pt-10">
                {/* Quick stats */}
                {renderQuickStats()}

                {/* Comparison table */}
                {isVisaRequired && renderComparisonTable()}

                {/* Introduction */}
                {renderIntro()}

                {/* Embassy 2026 updates */}
                {isVisaRequired && renderEmbassyUpdates()}

                {/* Documents / Requirements */}
                {renderRequirements()}

                {/* Cost breakdown */}
                {isVisaRequired && renderCostBreakdown()}

                {/* Steps */}
                {renderSteps()}

                {/* Checklist */}
                {isVisaRequired && renderChecklist()}

                {/* For non-visa-required: API tips, rejections, FAQs */}
                {!isVisaRequired && renderApiOnlyContent()}

                {/* Tips (visa-required: merged) */}
                {isVisaRequired && renderTips()}

                {/* Rejection reasons (visa-required: merged) */}
                {isVisaRequired && renderRejections()}

                {/* FAQs (visa-required: merged) */}
                {isVisaRequired && renderFAQs()}

                {/* Glossary */}
                {renderGlossary()}

                {/* SEO long-form */}
                {renderSeoLongForm()}

                {/* Generic fallback for unknown API fields */}
                {renderGenericFallback()}

                {/* Disclaimer */}
                {renderDisclaimer()}

                {/* Nav buttons */}
                <div className="flex gap-3 flex-wrap pt-2 pb-4">
                  <Link href="/visa-checker" className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:border-slate-400 hover:text-slate-900 transition-all shadow-sm">
                    🔍 Check another passport
                  </Link>
                  <Link href={`/visa-checker/${countrySlug}`} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:border-slate-400 hover:text-slate-900 transition-all shadow-sm">
                    ← {headline}
                  </Link>
                </div>
              </div>
            )}
          </main>

          {/* ── SIDEBAR ────────────────────────────────────────────────────── */}
          <aside className="lg:col-span-4 space-y-5 pt-10">

            {/* Sticky CTA card */}
            <div className="rounded-2xl overflow-hidden shadow-xl" style={{ background: "linear-gradient(155deg, #0f172a 0%, #1e293b 100%)" }}>
              {/* Accent bar */}
              <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, ${activeColor}, ${activeColor}88)` }} />
              <div className="p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl" style={{ background: `${activeColor}18` }} />
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center border border-emerald-500/30 bg-emerald-500/15 shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                    </div>
                    <div>
                      <p className="text-white font-black text-base leading-tight">Apply for {(toName || destName) ? `${toName || destName} Visa` : "Visa"}</p>
                      <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest">Free Expert Consultation</p>
                    </div>
                  </div>

                  {/* Passport route pill */}
                  {destName && (
                    <div className="flex items-center gap-2 mb-4 p-3 bg-white/5 border border-white/10 rounded-xl">
                      {passportData?.from?.flag ? <img src={passportData.from.flag} className="w-7 h-4.5 object-cover rounded shadow-sm shrink-0" alt={fromName} /> : <span className="text-slate-400 text-xs">{(fromName || passportName)?.slice(0, 2)}</span>}
                      <span className="text-slate-300 text-xs font-bold truncate">{fromName || passportName}</span>
                      <span className="text-slate-500 text-sm shrink-0">→</span>
                      {passportData?.to?.flag ? <img src={passportData.to.flag} className="w-7 h-4.5 object-cover rounded shadow-sm shrink-0" alt={toName} /> : <span className="text-white text-xs">{(toName || destName)?.slice(0, 2)}</span>}
                      <span className="text-white text-xs font-black truncate">{toName || destName}</span>
                    </div>
                  )}

                  {/* Quick info rows */}
                  <div className="space-y-2 mb-5">
                    {[
                      { icon: "⏱️", label: "Processing",   val: quickStats.processingTime || "10–21 Business Days" },
                      { icon: "🏛️", label: "Submission",   val: "Embassy / VFS Global" },
                      { icon: "📈", label: "Success Rate", val: "98% Approval" },
                      { icon: "🌍", label: "UAE Residents", val: "Dubai & Abu Dhabi" },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white/5 border border-white/8 rounded-xl">
                        <span className="text-lg shrink-0">{s.icon}</span>
                        <div>
                          <div className="text-[8px] font-black uppercase tracking-widest" style={{ color: activeColor }}>{s.label}</div>
                          <div className="text-sm font-black text-white leading-tight">{s.val}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* WhatsApp CTA */}
                  <a
                    href={`https://wa.me/8801631312524?text=${encodeURIComponent(`Hello, I am a ${fromName || passportName} citizen and need help applying for a ${toName || destName} visa.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2.5 w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black transition-all shadow-lg shadow-emerald-900/30 active:scale-95 group mb-2.5"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" /></svg>
                    Apply via WhatsApp
                    <svg className="group-hover:translate-x-0.5 transition-transform" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                  </a>
                  <p className="text-[8px] text-center text-slate-600 font-black tracking-wider">FREE CONSULTATION · NO UPFRONT FEES · 24/7 TEAM</p>
                </div>
              </div>
            </div>

            {/* What Eammu Provides */}
            {isVisaRequired && (
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <h4 className="font-black text-slate-900 mb-4 text-sm">What Eammu Provides</h4>
                <div className="space-y-2.5">
                  {[
                    "Complete document verification",
                    "Cover letter drafting",
                    "Correct photo formatting",
                    "Embassy fee guidance",
                    "Appointment booking help",
                    "Application tracking support",
                    "Refusal case resubmission",
                    "UAE resident applications (Dubai/Abu Dhabi)",
                    "Bangladesh office support (Cumilla & Dhaka)",
                  ].map(item => (
                    <div key={item} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 bg-emerald-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                      </div>
                      <span className="text-xs text-slate-700 font-medium leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Reference (visa-required only) */}
            {isVisaRequired && (
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3.5">Quick Reference</p>
                <div className="space-y-2.5">
                  {[
                    { label: "Photo Size",      val: "47×36 mm",             icon: "📸" },
                    { label: "Background",      val: "Pure White",           icon: "🖼️" },
                    { label: "Bank Statement",  val: "Last 6 Months",        icon: "🏦" },
                    { label: "Processing",      val: "10–21 Business Days",  icon: "⏱️" },
                    { label: "Apply Before",    val: "6–8 Weeks Ahead",      icon: "📅" },
                    { label: "Insurance Min.",  val: "€30,000 Cover",        icon: "🛡️" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                      <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1.5"><span>{s.icon}</span>{s.label}</span>
                      <span className="text-[11px] font-black text-slate-800">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Non-visa-required sidebar: API key facts if available */}
            {!isVisaRequired && (kf || guide?.fee || guide?.processing_time || guide?.validity) && (
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-3.5">Key Information</p>
                <div className="space-y-2.5">
                  {kf && Object.entries(kf).filter(([, v]) => v && !Array.isArray(v)).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                      <span className="text-[11px] text-slate-500 font-medium">{k.replace(/_/g, " ")}</span>
                      <span className="text-[11px] font-black text-slate-800">{v}</span>
                    </div>
                  ))}
                  {!kf && [
                    guide?.fee            && { label: "Fee",             val: guide.fee            },
                    guide?.processing_time && { label: "Processing Time", val: guide.processing_time },
                    guide?.validity       && { label: "Validity",        val: guide.validity       },
                  ].filter(Boolean).map((s, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                      <span className="text-[11px] text-slate-500 font-medium">{s.label}</span>
                      <span className="text-[11px] font-black text-slate-800">{s.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </aside>
        </div>
      </div>

      {/* ── BOTTOM CTA (visa-required only) ─────────────────────────────────── */}
      {isVisaRequired && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-14">
          <div className="rounded-2xl p-8 md:p-12 text-center overflow-hidden relative" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}>
            <div className="absolute top-0 right-0 w-72 h-72 rounded-full blur-[80px]" style={{ background: `${activeColor}18` }} />
            <div className="relative z-10">
              {(passportData?.from?.flag || passportData?.to?.flag) && (
                <div className="flex justify-center items-center gap-3 mb-5">
                  {passportData?.from?.flag && <img src={passportData.from.flag} className="w-10 h-6 object-cover rounded shadow-md" alt={fromName} />}
                  <span className="text-white text-2xl">✈️</span>
                  {passportData?.to?.flag && <img src={passportData.to.flag} className="w-10 h-6 object-cover rounded shadow-md" alt={toName} />}
                </div>
              )}
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 leading-tight">
                Ready to Apply for Your {toName || destName} Visa?
              </h2>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-2 leading-relaxed">
                Skip the confusion. Let our expert consultants prepare your complete {toName || destName} visa application — correctly, on time, with a 98% success rate.
              </p>
              <p className="text-slate-600 text-xs max-w-sm mx-auto mb-7">
                Serving Bangladesh (Cumilla & Dhaka), UAE residents in Dubai & Abu Dhabi, and Armenia (Yerevan). IATA-accredited.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/8801631312524?text=${encodeURIComponent(`Hello, I am a ${fromName || passportName} citizen and need help applying for a ${toName || destName} visa.`)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-black transition-all shadow-xl shadow-emerald-900/30 active:scale-95 text-sm"
                >
                  Apply via WhatsApp
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg>
                </a>
                <Link href="/visa-checker" className="inline-flex items-center justify-center gap-2 px-7 py-4 border-2 border-white/20 text-white rounded-xl font-black hover:bg-white/8 transition-all text-sm">
                  Check Another Country
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}