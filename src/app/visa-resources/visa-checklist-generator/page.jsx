"use client";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import countries from "@/app/data/countries.json";

// ─────────────────────────────────────────────────────────────
// VISA TYPES
// ─────────────────────────────────────────────────────────────
const VISA_TYPES = [
  { id: "student",  label: "Student Visa",  icon: "🎓" },
  { id: "tourist",  label: "Tourist Visa",  icon: "✈️" },
  { id: "work",     label: "Work Visa",     icon: "💼" },
  { id: "business", label: "Business Visa", icon: "🤝" },
];

// ─────────────────────────────────────────────────────────────
// BASE CHECKLISTS
// ─────────────────────────────────────────────────────────────
const BASE = {
  student: [
    { id:"s1",  text:"Valid Passport (min. 6 months validity)",     category:"Identity",    required:true  },
    { id:"s2",  text:"Passport-size Photographs (white background)", category:"Identity",    required:true  },
    { id:"s3",  text:"University / College Acceptance Letter",       category:"Academic",    required:true  },
    { id:"s4",  text:"Academic Transcripts & Certificates",          category:"Academic",    required:true  },
    { id:"s5",  text:"IELTS / TOEFL Score Certificate",             category:"Academic",    required:true  },
    { id:"s6",  text:"Bank Statement (Last 6 months)",              category:"Financial",   required:true  },
    { id:"s7",  text:"Sponsor's Financial Guarantee Letter",         category:"Financial",   required:true  },
    { id:"s8",  text:"Visa Application Form (Completed)",           category:"Application", required:true  },
    { id:"s9",  text:"Visa Fee Payment Receipt",                    category:"Application", required:true  },
    { id:"s10", text:"Health Insurance Certificate",                category:"Health",      required:true  },
    { id:"s11", text:"Medical Fitness Certificate",                 category:"Health",      required:false },
    { id:"s12", text:"Police Clearance Certificate",                category:"Background",  required:true  },
  ],
  tourist: [
    { id:"t1",  text:"Valid Passport (min. 6 months validity)", category:"Identity",    required:true  },
    { id:"t2",  text:"Passport-size Photographs",              category:"Identity",    required:true  },
    { id:"t3",  text:"Visa Application Form",                  category:"Application", required:true  },
    { id:"t4",  text:"Visa Fee Payment Receipt",               category:"Application", required:true  },
    { id:"t5",  text:"Hotel Booking Confirmation",             category:"Travel",      required:true  },
    { id:"t6",  text:"Return Flight Ticket",                   category:"Travel",      required:true  },
    { id:"t7",  text:"Travel Itinerary",                       category:"Travel",      required:true  },
    { id:"t8",  text:"Bank Statement (Last 3 months)",         category:"Financial",   required:true  },
    { id:"t9",  text:"Travel Insurance",                       category:"Health",      required:true  },
    { id:"t10", text:"Employment / Business Proof",            category:"Background",  required:false },
    { id:"t11", text:"Leave Letter from Employer",             category:"Background",  required:false },
  ],
  work: [
    { id:"w1",  text:"Valid Passport (min. 6 months validity)",   category:"Identity",    required:true  },
    { id:"w2",  text:"Passport-size Photographs",                 category:"Identity",    required:true  },
    { id:"w3",  text:"Job Offer Letter from Employer",            category:"Employment",  required:true  },
    { id:"w4",  text:"Employment Contract",                       category:"Employment",  required:true  },
    { id:"w5",  text:"Educational Certificates (Attested)",       category:"Academic",    required:true  },
    { id:"w6",  text:"Professional Experience Certificates",      category:"Employment",  required:true  },
    { id:"w7",  text:"Bank Statement",                            category:"Financial",   required:true  },
    { id:"w8",  text:"Medical Fitness Certificate",               category:"Health",      required:true  },
    { id:"w9",  text:"Police Clearance Certificate",              category:"Background",  required:true  },
    { id:"w10", text:"Visa Application Form",                     category:"Application", required:true  },
  ],
  business: [
    { id:"b1",  text:"Valid Passport (min. 6 months validity)", category:"Identity",    required:true  },
    { id:"b2",  text:"Passport-size Photographs",               category:"Identity",    required:true  },
    { id:"b3",  text:"Business Invitation Letter",              category:"Business",    required:true  },
    { id:"b4",  text:"Company Registration Documents",          category:"Business",    required:true  },
    { id:"b5",  text:"Business Bank Statement",                 category:"Financial",   required:true  },
    { id:"b6",  text:"Chamber of Commerce Letter",              category:"Business",    required:true  },
    { id:"b7",  text:"Hotel Booking & Return Ticket",           category:"Travel",      required:true  },
    { id:"b8",  text:"Visa Application Form",                   category:"Application", required:true  },
    { id:"b9",  text:"Travel Insurance",                        category:"Health",      required:true  },
    { id:"b10", text:"Business Card",                           category:"Business",    required:false },
  ],
};

// ─────────────────────────────────────────────────────────────
// COUNTRY-SPECIFIC EXTRAS
// ─────────────────────────────────────────────────────────────
const EXTRA = {
  us:{
    student: [
      { id:"us_s1", text:"DS-160 Form Confirmation Page",    category:"US Specific", required:true  },
      { id:"us_s2", text:"SEVIS Fee Receipt (I-901)",        category:"US Specific", required:true  },
      { id:"us_s3", text:"I-20 Form from University",        category:"US Specific", required:true  },
      { id:"us_s4", text:"GRE / GMAT Score (if required)",   category:"Academic",    required:false },
    ],
    tourist: [
      { id:"us_t1", text:"DS-160 Form Confirmation",                category:"US Specific", required:true },
      { id:"us_t2", text:"B-2 Visa Interview Appointment Letter",   category:"US Specific", required:true },
    ],
    work: [
      { id:"us_w1", text:"I-129 Petition (H-1B or relevant)",       category:"US Specific", required:true },
      { id:"us_w2", text:"Labor Condition Application (LCA)",        category:"US Specific", required:true },
      { id:"us_w3", text:"DS-160 Form Confirmation",                category:"US Specific", required:true },
    ],
  },
  gb:{
    student: [
      { id:"gb_s1", text:"CAS (Confirmation of Acceptance for Studies)", category:"UK Specific", required:true  },
      { id:"gb_s2", text:"TB Test Certificate",                          category:"Health",      required:true  },
      { id:"gb_s3", text:"ATAS Clearance (if applicable)",              category:"UK Specific", required:false },
    ],
    work: [
      { id:"gb_w1", text:"Certificate of Sponsorship (CoS)",      category:"UK Specific", required:true },
      { id:"gb_w2", text:"TB Test Certificate",                    category:"Health",      required:true },
      { id:"gb_w3", text:"English Language Proof (B1 level)",      category:"UK Specific", required:true },
    ],
    tourist: [
      { id:"gb_t1", text:"Strong Ties to Home Country Evidence",  category:"UK Specific", required:true },
    ],
  },
  ca:{
    student: [
      { id:"ca_s1", text:"Letter of Acceptance from DLI",              category:"Canada Specific", required:true  },
      { id:"ca_s2", text:"Proof of Financial Support (CAD 10,000+)",   category:"Financial",       required:true  },
      { id:"ca_s3", text:"Biometrics Enrollment",                      category:"Canada Specific", required:true  },
      { id:"ca_s4", text:"Quebec Acceptance Certificate (if Quebec)",  category:"Canada Specific", required:false },
    ],
    work: [
      { id:"ca_w1", text:"LMIA (Labour Market Impact Assessment)",    category:"Canada Specific", required:true },
      { id:"ca_w2", text:"Biometrics Enrollment",                     category:"Canada Specific", required:true },
      { id:"ca_w3", text:"Work Permit Application (IMM 1295)",        category:"Canada Specific", required:true },
    ],
    tourist: [
      { id:"ca_t1", text:"eTA (Electronic Travel Authorization)",     category:"Canada Specific", required:true  },
      { id:"ca_t2", text:"Biometrics (if required)",                  category:"Canada Specific", required:false },
    ],
  },
  au:{
    student: [
      { id:"au_s1", text:"CoE (Confirmation of Enrollment)",         category:"Australia Specific", required:true  },
      { id:"au_s2", text:"OSHC Health Insurance",                    category:"Health",             required:true  },
      { id:"au_s3", text:"GTE Statement (Genuine Temporary Entrant)",category:"Australia Specific", required:true  },
    ],
    work: [
      { id:"au_w1", text:"Nomination by Australian Employer (482)",  category:"Australia Specific", required:true },
      { id:"au_w2", text:"Skills Assessment",                        category:"Australia Specific", required:true },
      { id:"au_w3", text:"English Language Test Results",            category:"Academic",            required:true },
    ],
    tourist: [
      { id:"au_t1", text:"eVisitor or ETA Application",              category:"Australia Specific", required:true },
    ],
  },
  de:{
    student: [
      { id:"de_s1", text:"Blocked Account (Sperrkonto) — €11,208/year", category:"Financial", required:true },
      { id:"de_s2", text:"APS Certificate (for some nationalities)",    category:"Academic",   required:true },
      { id:"de_s3", text:"German / English Language Certificate",       category:"Academic",   required:true },
    ],
    work: [
      { id:"de_w1", text:"Recognition of Foreign Qualifications",       category:"Academic",  required:true },
      { id:"de_w2", text:"Employer Salary Confirmation / Blocked Acct", category:"Financial", required:true },
    ],
  },
  ae:{
    tourist: [
      { id:"ae_t1", text:"Online Visa Application (ICP Portal)", category:"UAE Specific", required:true },
      { id:"ae_t2", text:"Return Ticket Confirmation",           category:"Travel",        required:true },
    ],
    work: [
      { id:"ae_w1", text:"Emirates ID Application",              category:"UAE Specific",  required:true },
      { id:"ae_w2", text:"Employer's Trade License Copy",        category:"UAE Specific",  required:true },
      { id:"ae_w3", text:"Medical Test (UAE approved center)",   category:"Health",         required:true },
      { id:"ae_w4", text:"Labour Contract (MOHRE Attested)",     category:"Employment",     required:true },
    ],
    student: [
      { id:"ae_s1", text:"UAE University Acceptance Letter",     category:"Academic",       required:true },
      { id:"ae_s2", text:"Emirates ID Application",              category:"UAE Specific",   required:true },
    ],
  },
  fr:{
    student: [
      { id:"fr_s1", text:"Campus France Attestation",            category:"France Specific", required:true },
      { id:"fr_s2", text:"Long-Stay Visa (Carte de Séjour)",     category:"France Specific", required:true },
    ],
    tourist: [
      { id:"fr_t1", text:"Schengen Visa Application Form",       category:"Schengen",        required:true },
      { id:"fr_t2", text:"Schengen Travel Insurance",            category:"Health",           required:true },
    ],
    work: [
      { id:"fr_w1", text:"Work Authorization from DIRECCTE",    category:"France Specific", required:true },
      { id:"fr_w2", text:"Schengen Long-Stay Visa (D-Visa)",    category:"France Specific", required:true },
    ],
  },
  sa:{
    work: [
      { id:"sa_w1", text:"Iqama (Residence Permit) Application",   category:"Saudi Specific", required:true },
      { id:"sa_w2", text:"Medical Examination (Approved Center)",   category:"Health",          required:true },
      { id:"sa_w3", text:"Attested Educational Certificates",       category:"Academic",        required:true },
    ],
    tourist: [
      { id:"sa_t1", text:"Online Saudi Visa (Tawakkalna)",          category:"Saudi Specific", required:true },
    ],
  },
  sg:{
    work: [
      { id:"sg_w1", text:"Employment Pass Application (EP/S-Pass)", category:"Singapore Specific", required:true },
      { id:"sg_w2", text:"Fixed Monthly Salary Evidence",           category:"Financial",            required:true },
    ],
    student: [
      { id:"sg_s1", text:"Student's Pass Application (ICA)",        category:"Singapore Specific", required:true },
      { id:"sg_s2", text:"In-Principle Approval (IPA) Letter",      category:"Singapore Specific", required:true },
    ],
  },
  jp:{
    tourist: [
      { id:"jp_t1", text:"Itinerary & Accommodation Details",       category:"Travel",       required:true  },
      { id:"jp_t2", text:"Certificate of Employment or Enrollment", category:"Background",   required:true  },
    ],
    student: [
      { id:"jp_s1", text:"Certificate of Eligibility (COE)",        category:"Japan Specific", required:true  },
      { id:"jp_s2", text:"Residence Tax Payment Certificate",        category:"Financial",      required:false },
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// CATEGORY META  (dot colour + badge colour)
// ─────────────────────────────────────────────────────────────
const CAT_META = {
  Identity:             { dot:"#3b82f6",  bg:"#eff6ff",  text:"#1d4ed8"  },
  Academic:             { dot:"#8b5cf6",  bg:"#f5f3ff",  text:"#6d28d9"  },
  Financial:            { dot:"#16a34a",  bg:"#f0fdf4",  text:"#15803d"  },
  Application:          { dot:"#d97706",  bg:"#fffbeb",  text:"#b45309"  },
  Health:               { dot:"#dc2626",  bg:"#fef2f2",  text:"#dc2626"  },
  Background:           { dot:"#0891b2",  bg:"#ecfeff",  text:"#0e7490"  },
  Travel:               { dot:"#0d9488",  bg:"#f0fdfa",  text:"#0f766e"  },
  Employment:           { dot:"#65a30d",  bg:"#f7fee7",  text:"#4d7c0f"  },
  Business:             { dot:"#ea580c",  bg:"#fff7ed",  text:"#c2410c"  },
  "US Specific":        { dot:"#b91c1c",  bg:"#fef2f2",  text:"#b91c1c"  },
  "UK Specific":        { dot:"#1d4ed8",  bg:"#eff6ff",  text:"#1e40af"  },
  "Canada Specific":    { dot:"#b91c1c",  bg:"#fef2f2",  text:"#991b1b"  },
  "Australia Specific": { dot:"#15803d",  bg:"#f0fdf4",  text:"#166534"  },
  "UAE Specific":       { dot:"#7c3aed",  bg:"#f5f3ff",  text:"#6d28d9"  },
  "Saudi Specific":     { dot:"#15803d",  bg:"#f0fdf4",  text:"#166534"  },
  "Singapore Specific": { dot:"#0284c7",  bg:"#f0f9ff",  text:"#0369a1"  },
  "Japan Specific":     { dot:"#be123c",  bg:"#fff1f2",  text:"#be123c"  },
  "France Specific":    { dot:"#1e40af",  bg:"#eff6ff",  text:"#1e40af"  },
  Schengen:             { dot:"#0d9488",  bg:"#f0fdfa",  text:"#0f766e"  },
  Custom:               { dot:"#6b7280",  bg:"#f9fafb",  text:"#374151"  },
};
const ALL_CATEGORIES = Object.keys(CAT_META);

// ─────────────────────────────────────────────────────────────
// LOCAL-STORAGE KEY
// ─────────────────────────────────────────────────────────────
const LS_KEY = "eammu_checklist_v2";

function saveToLS(data) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch {}
}
function loadFromLS() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "null"); } catch { return null; }
}

// ─────────────────────────────────────────────────────────────
// COUNTRY DROPDOWN
// ─────────────────────────────────────────────────────────────
function CountryDropdown({ label, value, onChange, placeholder }) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const filtered = countries.filter(c => c.country.toLowerCase().includes(search.toLowerCase()));

  return (
    <div ref={ref} className="relative">
      <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">{label}</label>
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-white border-2 border-gray-200 hover:border-green-500 rounded-xl text-sm font-medium transition-all outline-none text-left"
      >
        {value ? (
          <>
            <img src={value.flag} width={24} height={17} className="object-contain rounded flex-shrink-0" alt="" />
            <span className="text-gray-900 font-semibold">{value.country}</span>
          </>
        ) : (
          <span className="text-gray-400">{placeholder}</span>
        )}
        <svg className={`w-4 h-4 ml-auto text-gray-400 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1.5 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-2 border-b border-gray-100">
            <input
              autoFocus value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search country…"
              className="w-full px-3 py-2 bg-gray-50 rounded-xl text-sm outline-none placeholder-gray-400"
            />
          </div>
          <ul className="max-h-56 overflow-y-auto divide-y divide-gray-50">
            {filtered.length === 0
              ? <li className="px-4 py-3 text-sm text-gray-400">No results</li>
              : filtered.map(c => (
                <li
                  key={c.code}
                  onClick={() => { onChange(c); setOpen(false); setSearch(""); }}
                  className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm transition-colors hover:bg-green-50
                    ${value?.code === c.code ? "bg-green-50 text-green-800 font-semibold" : "text-gray-700"}`}
                >
                  <img src={c.flag} width={22} height={15} className="object-contain rounded flex-shrink-0" alt="" />
                  {c.country}
                  {value?.code === c.code && <span className="ml-auto text-green-600 font-bold text-xs">✓</span>}
                </li>
              ))
            }
          </ul>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// EDIT ITEM MODAL
// ─────────────────────────────────────────────────────────────
function EditModal({ item, onSave, onClose }) {
  const [text, setText] = useState(item.text);
  const [cat, setCat] = useState(item.category);
  const [req, setReq] = useState(item.required);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-gray-100">
        <h3 className="text-lg font-extrabold text-gray-900 mb-5 flex items-center gap-2">
          <span className="text-xl">✏️</span> Edit Document
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Document Name</label>
            <input
              autoFocus value={text}
              onChange={e => setText(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-green-500 rounded-xl text-sm outline-none"
              placeholder="Document name…"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Category</label>
            <select
              value={cat} onChange={e => setCat(e.target.value)}
              className="w-full px-4 py-2.5 border-2 border-gray-200 focus:border-green-500 rounded-xl text-sm outline-none bg-white"
            >
              {ALL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <label className="flex items-center justify-between p-3 bg-gray-50 rounded-xl cursor-pointer">
            <span className="text-sm font-semibold text-gray-700">Mark as Required</span>
            <div
              onClick={() => setReq(r => !r)}
              className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${req ? "bg-green-600" : "bg-gray-300"}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${req ? "left-6" : "left-1"}`} />
            </div>
          </label>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
            Cancel
          </button>
          <button
            onClick={() => { if (text.trim()) onSave({ ...item, text: text.trim(), category: cat, required: req }); }}
            className="flex-1 py-2.5 text-sm font-bold text-white bg-green-700 hover:bg-green-800 rounded-xl transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PDF GENERATOR
// ─────────────────────────────────────────────────────────────
function generatePDF({ fromCountry, toCountry, visaType, checklist, grouped, checked, progress, checkedCount }) {
  const visaInfo = VISA_TYPES.find(v => v.id === visaType) || {};
  const dateStr = new Date().toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" });
  const refNo = `EAMMU-${Date.now().toString().slice(-7)}`;

  const categoriesHTML = Object.entries(grouped).map(([cat, items]) => {
    const meta = CAT_META[cat] || CAT_META.Custom;
    const catDone = items.filter(i => checked[i.id]).length;
    const itemsHTML = items.map(item => {
      const done = !!checked[item.id];
      return `
        <div class="item ${done ? "done" : ""}">
          <div class="cb ${done ? "cb-done" : ""}">
            ${done ? `<svg width="11" height="9" viewBox="0 0 11 9" fill="none"><path d="M1 4.5L4 7.5L10 1" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ""}
          </div>
          <div class="item-body">
            <span class="item-txt ${done ? "crossed" : ""}">${item.text}</span>
            <div class="tags">
              ${item.required ? `<span class="tag req">Required</span>` : `<span class="tag opt">Optional</span>`}
              ${item.custom ? `<span class="tag cust">Custom</span>` : ""}
            </div>
          </div>
        </div>`;
    }).join("");

    return `
      <div class="cat">
        <div class="cat-hdr" style="border-left:4px solid ${meta.dot}">
          <div class="cat-dot" style="background:${meta.dot}"></div>
          <span class="cat-name">${cat}</span>
          <span class="cat-prog" style="background:${meta.bg};color:${meta.text}">${catDone}/${items.length}</span>
        </div>
        <div class="cat-body">${itemsHTML}</div>
      </div>`;
  }).join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>Visa Checklist — Eammu.com</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Nunito','Segoe UI',sans-serif;background:#fff;color:#1e293b;print-color-adjust:exact;-webkit-print-color-adjust:exact;}
  .page{max-width:780px;margin:0 auto;background:#fff;}

  /* ── HEADER ── */
  .hdr{background:linear-gradient(135deg,#0a2e1f 0%,#134e35 55%,#1a6b47 100%);padding:36px 44px 30px;position:relative;overflow:hidden;}
  .hdr::before{content:'';position:absolute;top:-80px;right:-80px;width:240px;height:240px;background:rgba(255,255,255,0.04);border-radius:50%;}
  .hdr::after{content:'';position:absolute;bottom:-50px;left:30%;width:160px;height:160px;background:rgba(255,255,255,0.03);border-radius:50%;}
  .hdr-row1{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px;}
  .logo{font-size:20px;font-weight:900;color:#fff;letter-spacing:-0.3px;}
  .logo-dot{color:#4ade80;}
  .hdr-chip{background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.2);border-radius:100px;padding:5px 14px;font-size:11px;color:rgba(255,255,255,0.85);font-weight:700;letter-spacing:0.3px;}
  .hdr-title{font-size:26px;font-weight:900;color:#fff;margin-bottom:5px;letter-spacing:-0.5px;}
  .hdr-sub{font-size:12px;color:rgba(255,255,255,0.55);font-weight:400;}
  .pills{display:flex;gap:8px;margin-top:20px;flex-wrap:wrap;}
  .pill{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.18);border-radius:100px;padding:6px 16px;font-size:11.5px;color:#fff;font-weight:700;display:flex;align-items:center;gap:6px;}
  .pill.green{background:rgba(74,222,128,0.18);border-color:rgba(74,222,128,0.35);color:#4ade80;}

  /* ── PROGRESS ── */
  .prog-sec{padding:18px 44px;background:#f8faf8;border-bottom:1px solid #e2e8f0;}
  .prog-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:7px;}
  .prog-lbl{font-size:11px;font-weight:800;color:#6b7280;text-transform:uppercase;letter-spacing:1px;}
  .prog-val{font-size:13px;font-weight:900;color:#15803d;}
  .prog-track{background:#e5e7eb;border-radius:100px;height:9px;overflow:hidden;}
  .prog-fill{height:100%;border-radius:100px;background:linear-gradient(90deg,#15803d,#4ade80);width:${progress}%;}
  .complete{margin-top:12px;background:#f0fdf4;border:1.5px solid #86efac;border-radius:10px;padding:10px 16px;text-align:center;font-size:12.5px;font-weight:800;color:#15803d;}

  /* ── BODY ── */
  .body{padding:28px 44px 32px;}

  /* ── CATEGORY ── */
  .cat{margin-bottom:18px;break-inside:avoid;}
  .cat-hdr{display:flex;align-items:center;gap:10px;padding:10px 16px;background:#f9fafb;border:1.5px solid #e5e7eb;border-bottom:none;border-radius:12px 12px 0 0;}
  .cat-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0;}
  .cat-name{font-size:10.5px;font-weight:900;text-transform:uppercase;letter-spacing:1.2px;color:#4b5563;flex:1;}
  .cat-prog{font-size:10px;font-weight:800;border-radius:100px;padding:2px 10px;}
  .cat-body{border:1.5px solid #e5e7eb;border-top:none;border-radius:0 0 12px 12px;overflow:hidden;}

  /* ── ITEMS ── */
  .item{display:flex;align-items:flex-start;gap:12px;padding:11px 16px;border-bottom:1px solid #f3f4f6;background:#fff;}
  .item:last-child{border-bottom:none;}
  .item.done{background:#f0fdf4;}
  .cb{width:19px;height:19px;border-radius:5px;border:2px solid #d1d5db;background:#fff;flex-shrink:0;margin-top:1px;display:flex;align-items:center;justify-content:center;}
  .cb.cb-done{background:#16a34a;border-color:#16a34a;}
  .item-body{flex:1;}
  .item-txt{font-size:12.5px;font-weight:600;color:#374151;display:block;margin-bottom:4px;line-height:1.4;}
  .item-txt.crossed{text-decoration:line-through;color:#9ca3af;}
  .tags{display:flex;gap:5px;flex-wrap:wrap;}
  .tag{font-size:10px;font-weight:800;border-radius:4px;padding:2px 8px;border:1px solid transparent;}
  .tag.req{background:#fef2f2;color:#dc2626;border-color:#fecaca;}
  .tag.opt{background:#f9fafb;color:#9ca3af;border-color:#e5e7eb;}
  .tag.cust{background:#eff6ff;color:#2563eb;border-color:#bfdbfe;}

  /* ── STATS ── */
  .stats{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:24px;}
  .stat{background:#f9fafb;border:1.5px solid #e5e7eb;border-radius:12px;padding:14px;text-align:center;}
  .stat-val{font-size:22px;font-weight:900;color:#14532d;display:block;}
  .stat-lbl{font-size:10px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;margin-top:2px;}

  /* ── FOOTER ── */
  .ftr{background:linear-gradient(135deg,#0a2e1f,#134e35);padding:22px 44px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;}
  .ftr-logo{font-size:16px;font-weight:900;color:#fff;}
  .ftr-logo span{color:#4ade80;}
  .ftr-info{font-size:10.5px;color:rgba(255,255,255,0.5);line-height:1.7;text-align:right;}
  .ftr-link{color:#4ade80;font-weight:700;}

  @page{margin:0;size:A4;}
  @media print{body{background:#fff;} .page{max-width:100%;}}
</style>
</head>
<body>
<div class="page">

  <div class="hdr">
    <div class="hdr-row1">
      <div class="logo">eammu<span class="logo-dot">.com</span></div>
      <div class="hdr-chip">📅 ${dateStr} &nbsp;|&nbsp; Ref: ${refNo}</div>
    </div>
    <div class="hdr-title">📋 Visa Document Checklist</div>
    <div class="hdr-sub">Personalized document guide generated by Eammu.com</div>
    <div class="pills">
      <div class="pill">🌍 From: ${fromCountry.country}</div>
      <div class="pill">✈️ To: ${toCountry.country}</div>
      <div class="pill">${visaInfo.icon || ""} ${visaInfo.label || visaType}</div>
      <div class="pill green">✅ ${checkedCount}/${checklist.length} Completed</div>
    </div>
  </div>

  <div class="prog-sec">
    <div class="prog-row">
      <span class="prog-lbl">Overall Progress</span>
      <span class="prog-val">${progress}% Complete</span>
    </div>
    <div class="prog-track"><div class="prog-fill"></div></div>
    ${progress === 100 ? `<div class="complete">🎉 All documents collected! You're ready to apply.</div>` : ""}
  </div>

  <div class="body">
    <div class="stats">
      <div class="stat"><span class="stat-val">${checklist.length}</span><span class="stat-lbl">Total Docs</span></div>
      <div class="stat"><span class="stat-val">${checkedCount}</span><span class="stat-lbl">Collected</span></div>
      <div class="stat"><span class="stat-val">${checklist.length - checkedCount}</span><span class="stat-lbl">Remaining</span></div>
    </div>
    ${categoriesHTML}
  </div>

  <div class="ftr">
    <div class="ftr-logo">eammu<span>.com</span></div>
    <div class="ftr-info">
      Trusted Visa, Travel &amp; Immigration Experts<br/>
      Bangladesh • Dubai • Armenia • Georgia<br/>
      <span class="ftr-link">www.eammu.com</span> | info@eammu.com
    </div>
  </div>

</div>
<script>window.addEventListener('load',()=>setTimeout(()=>window.print(),500));</script>
</body>
</html>`;

  const blob = new Blob([html], { type:"text/html;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  window.open(url, "_blank");
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function VisaChecklistGenerator() {
  const [fromCountry, setFromCountry] = useState(null);
  const [toCountry,   setToCountry]   = useState(null);
  const [visaType,    setVisaType]    = useState(null);
  const [step,        setStep]        = useState(1); // 1=form  2=checklist
  const [checked,     setChecked]     = useState({});
  const [customItems, setCustomItems] = useState([]);
  const [editedItems, setEditedItems] = useState({}); // id → overrides
  const [editingItem, setEditingItem] = useState(null);
  const [addingItem,  setAddingItem]  = useState(false);
  const [newText,     setNewText]     = useState("");
  const [newCat,      setNewCat]      = useState("Custom");
  const [newReq,      setNewReq]      = useState(false);
  const [savedMsg,    setSavedMsg]    = useState(false);

  // ── build checklist ──
  const checklist = useMemo(() => {
    if (!visaType) return [];
    const base     = (BASE[visaType] || []).map(i => editedItems[i.id] ? { ...i, ...editedItems[i.id] } : i);
    const specific = toCountry ? (EXTRA[toCountry.code]?.[visaType] || []).map(i => editedItems[i.id] ? { ...i, ...editedItems[i.id] } : i) : [];
    const custom   = customItems.map(i => editedItems[i.id] ? { ...i, ...editedItems[i.id] } : i);
    return [...base, ...specific, ...custom];
  }, [visaType, toCountry, customItems, editedItems]);

  const grouped = useMemo(() =>
    checklist.reduce((acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {}),
  [checklist]);

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress     = checklist.length ? Math.round((checkedCount / checklist.length) * 100) : 0;

  // ── save to localStorage ──
  const saveState = useCallback(() => {
    if (!fromCountry || !toCountry || !visaType) return;
    saveToLS({ fromCountry, toCountry, visaType, checked, customItems, editedItems });
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  }, [fromCountry, toCountry, visaType, checked, customItems, editedItems]);

  // ── restore on mount ──
  useEffect(() => {
    const saved = loadFromLS();
    if (!saved) return;
    setFromCountry(saved.fromCountry || null);
    setToCountry(saved.toCountry || null);
    setVisaType(saved.visaType || null);
    setChecked(saved.checked || {});
    setCustomItems(saved.customItems || []);
    setEditedItems(saved.editedItems || {});
    if (saved.fromCountry && saved.toCountry && saved.visaType) setStep(2);
  }, []);

  // ── auto-save on change ──
  useEffect(() => {
    if (step === 2) saveToLS({ fromCountry, toCountry, visaType, checked, customItems, editedItems });
  }, [checked, customItems, editedItems, step]);

  const handleGenerate = () => {
    if (fromCountry && toCountry && visaType) {
      setStep(2); setChecked({}); setCustomItems([]); setEditedItems({});
    }
  };

  const resetAll = () => {
    setStep(1); setFromCountry(null); setToCountry(null); setVisaType(null);
    setChecked({}); setCustomItems([]); setEditedItems({}); setAddingItem(false);
    try { localStorage.removeItem(LS_KEY); } catch {}
  };

  const addCustomItem = () => {
    if (!newText.trim()) return;
    const item = { id:`c_${Date.now()}`, text:newText.trim(), category:newCat, required:newReq, custom:true };
    setCustomItems(p => [...p, item]);
    setNewText(""); setNewReq(false); setAddingItem(false);
  };

  const removeItem = (id) => {
    setCustomItems(p => p.filter(i => i.id !== id));
    setChecked(p => { const n={...p}; delete n[id]; return n; });
    setEditedItems(p => { const n={...p}; delete n[id]; return n; });
  };

  const saveEdit = (updated) => {
    setEditedItems(p => ({ ...p, [updated.id]: updated }));
    setEditingItem(null);
  };

 const downloadTXT = () => {
  if (!fromCountry || !toCountry || !visaType) {
    alert("Missing data. Please generate checklist first.");
    return;
  }

  const visaLabel =
    VISA_TYPES.find(v => v.id === visaType)?.label || visaType;

  let txt = `VISA DOCUMENT CHECKLIST
${"═".repeat(54)}
From: ${fromCountry?.country || ""}
To:   ${toCountry?.country || ""}
Type: ${visaLabel}
Date: ${new Date().toLocaleDateString()}
Site: eammu.com
${"═".repeat(54)}
`;

  Object.entries(grouped).forEach(([cat, items]) => {
    txt += `\n▸ ${cat.toUpperCase()}\n${"─".repeat(36)}\n`;
    items.forEach(i => {
      txt += `  ${checked[i.id] ? "[✓]" : "[ ]"}  ${i.text}${
        i.required ? "  ★" : ""
      }\n`;
    });
  });

  txt += `
${"═".repeat(54)}
Progress: ${checkedCount}/${checklist.length} (${progress}%)
★ = Required

For expert help: eammu.com
`;

  const blob = new Blob([txt], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `eammu-checklist-${toCountry?.code || "unknown"}-${visaType}.txt`;

  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(url);
};

  const isReady = fromCountry && toCountry && visaType;
  const inputCls = "w-full px-4 py-2.5 bg-white border-2 border-gray-200 focus:border-green-500 rounded-xl text-sm outline-none transition-all placeholder-gray-400 text-gray-900";

  return (
    <div className="min-h-screen bg-gray-50 py-22 px-4">
      {editingItem && <EditModal item={editingItem} onSave={saveEdit} onClose={() => setEditingItem(null)} />}

      <div className="max-w-2xl mx-auto">

        {/* ── HEADER ── */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 bg-green-100 border border-green-300 text-green-800 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            ✈️ Free Tool · Eammu.com
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-green-900 mb-3 leading-tight">
            Visa Checklist <span className="text-green-600">Generator</span>
          </h1>
          <p className="text-gray-500 text-base max-w-md mx-auto">
            Personalized visa document checklist — add, edit & download as PDF
          </p>
        </div>

        {/* ════════════════════════════════════════
            STEP 1 — FORM
        ════════════════════════════════════════ */}
        {step === 1 && (
          <div>
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-4">
              <div className="space-y-5">
                <CountryDropdown label="Your Nationality"    value={fromCountry} onChange={setFromCountry} placeholder="Select your country…" />
                <CountryDropdown label="Destination Country" value={toCountry}   onChange={setToCountry}   placeholder="Select destination…"   />

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5">Visa Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {VISA_TYPES.map(v => (
                      <button key={v.id} type="button" onClick={() => setVisaType(v.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all text-left
                          ${visaType === v.id
                            ? "border-green-600 bg-green-50 text-green-800"
                            : "border-gray-200 bg-white text-gray-600 hover:border-green-400 hover:bg-green-50"}`}
                      >
                        <span className="text-xl">{v.icon}</span>{v.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="button" onClick={handleGenerate} disabled={!isReady}
                  className={`w-full py-3.5 rounded-xl font-black text-base transition-all
                    ${isReady
                      ? "bg-green-700 hover:bg-green-800 text-white hover:shadow-lg active:scale-[0.99]"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}
                >
                  {isReady ? "Generate My Checklist →" : "Fill all fields to continue"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon:"🌍", t:"100+ Countries", s:"Complete visa data" },
                { icon:"✏️", t:"Customizable",   s:"Add & edit items"  },
                { icon:"📄", t:"PDF Download",   s:"Print-ready output" },
              ].map((c,i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
                  <div className="text-2xl mb-1">{c.icon}</div>
                  <div className="text-xs font-bold text-gray-800">{c.t}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{c.s}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════
            STEP 2 — CHECKLIST
        ════════════════════════════════════════ */}
        {step === 2 && (
          <div>
            {/* ── Result Card ── */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-4">

              {/* Trip info */}
              <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
                <div>
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <img src={fromCountry.flag} width={28} height={20} className="object-contain rounded shadow-sm" alt="" />
                    <span className="text-gray-300 font-bold text-lg">→</span>
                    <img src={toCountry.flag}   width={28} height={20} className="object-contain rounded shadow-sm" alt="" />
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full border border-green-200">
                      {VISA_TYPES.find(v => v.id === visaType)?.icon} {VISA_TYPES.find(v => v.id === visaType)?.label}
                    </span>
                  </div>
                  <p className="font-extrabold text-gray-900">{fromCountry.country} → {toCountry.country}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{checklist.length} documents required</p>
                </div>
                <button onClick={resetAll}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
                  ← New Search
                </button>
              </div>

              {/* Progress */}
              <div className="mb-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Progress</span>
                  <span className="font-extrabold text-green-700 text-sm">{checkedCount}/{checklist.length} — {progress}%</span>
                </div>
                <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width:`${progress}%`, background:"linear-gradient(90deg,#15803d,#4ade80)" }}
                  />
                </div>
                {progress === 100 && (
                  <div className="mt-3 flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 text-sm font-bold text-green-700">
                    🎉 All documents collected! You're ready to apply.
                  </div>
                )}
              </div>

              {/* Stat chips */}
              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { v:checklist.length,            l:"Total",     bg:"bg-gray-50",   t:"text-gray-700"  },
                  { v:checkedCount,                l:"Collected", bg:"bg-green-50",  t:"text-green-700" },
                  { v:checklist.length-checkedCount,l:"Remaining",bg:"bg-orange-50", t:"text-orange-700"},
                ].map((s,i) => (
                  <div key={i} className={`${s.bg} rounded-xl p-3 text-center border border-gray-100`}>
                    <div className={`text-xl font-black ${s.t}`}>{s.v}</div>
                    <div className="text-xs text-gray-400 font-semibold mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-2">
                <button onClick={() => generatePDF({ fromCountry, toCountry, visaType, checklist, grouped, checked, progress, checkedCount })}
                  className="flex items-center gap-2 px-5 py-2.5 bg-green-700 hover:bg-green-800 text-white font-bold text-sm rounded-xl transition-all hover:shadow-md">
                  📄 Download PDF
                </button>
                <button onClick={downloadTXT}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 hover:border-green-600 hover:text-green-700 text-gray-700 font-semibold text-sm rounded-xl transition-all">
                  ⬇️ TXT
                </button>
                <button onClick={saveState}
                  className={`flex items-center gap-2 px-4 py-2.5 border-2 font-semibold text-sm rounded-xl transition-all
                    ${savedMsg
                      ? "bg-green-50 border-green-500 text-green-700"
                      : "bg-white border-gray-200 hover:border-green-600 hover:text-green-700 text-gray-700"}`}
                >
                  {savedMsg ? "✅ Saved!" : "💾 Save"}
                </button>
              </div>
            </div>

            {/* ── Checklist Categories ── */}
            {Object.entries(grouped).map(([cat, items]) => {
              const meta = CAT_META[cat] || CAT_META.Custom;
              const catDone = items.filter(i => checked[i.id]).length;
              return (
                <div key={cat} className="bg-white border border-gray-200 rounded-2xl mb-3 overflow-hidden shadow-sm">
                  {/* Category header */}
                  <div className="flex items-center gap-3 px-5 py-3 border-b border-gray-100" style={{ borderLeft:`4px solid ${meta.dot}` }}>
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background:meta.dot }} />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-gray-500 flex-1">{cat}</span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full" style={{ background:meta.bg, color:meta.text }}>
                      {catDone}/{items.length}
                    </span>
                  </div>

                  {/* Items */}
                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => setChecked(p => ({ ...p, [item.id]: !p[item.id] }))}
                      className={`group flex items-center gap-3 px-5 py-3.5 cursor-pointer transition-colors
                        ${idx < items.length - 1 ? "border-b border-gray-50" : ""}
                        ${checked[item.id] ? "bg-green-50 hover:bg-green-100" : "hover:bg-gray-50"}`}
                    >
                      {/* Checkbox */}
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all
                        ${checked[item.id] ? "bg-green-600 border-green-600" : "border-gray-300 bg-white"}`}
                      >
                        {checked[item.id] && (
                          <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                            <path d="M1 4.5L4 7.5L10 1" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>

                      {/* Text */}
                      <span className={`flex-1 text-sm font-semibold transition-all leading-snug
                        ${checked[item.id] ? "line-through text-gray-400" : "text-gray-800"}`}>
                        {item.text}
                      </span>

                      {/* Badges + Actions */}
                      <div className="flex items-center gap-1.5 ml-1 flex-shrink-0">
                        {item.required
                          ? <span className="text-xs font-bold px-2 py-0.5 bg-red-50 text-red-600 border border-red-200 rounded-md">Required</span>
                          : <span className="text-xs font-semibold px-2 py-0.5 bg-gray-50 text-gray-400 border border-gray-200 rounded-md">Optional</span>
                        }
                        {item.custom && (
                          <span className="text-xs font-bold px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-md">Custom</span>
                        )}
                        <button
                          onClick={e => { e.stopPropagation(); setEditingItem(item); }}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-gray-200 text-gray-500 transition-all text-xs"
                          title="Edit"
                        >✏️</button>
                        {item.custom && (
                          <button
                            onClick={e => { e.stopPropagation(); removeItem(item.id); }}
                            className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-100 text-red-500 transition-all text-xs"
                            title="Remove"
                          >✕</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}

            {/* ── Add Custom Item ── */}
            <div className={`bg-white border-2 rounded-2xl mb-4 transition-all ${addingItem ? "border-green-400" : "border-dashed border-gray-300"}`}>
              {!addingItem ? (
                <button type="button" onClick={() => setAddingItem(true)}
                  className="w-full py-4 flex items-center justify-center gap-2 text-green-700 font-bold text-sm hover:bg-green-50 rounded-2xl transition-all">
                  <span className="text-lg font-black">＋</span> Add Custom Document
                </button>
              ) : (
                <div className="p-5">
                  <p className="text-sm font-extrabold text-gray-900 mb-4">Add Custom Document</p>
                  <div className="space-y-3">
                    <input
                      autoFocus value={newText}
                      onChange={e => setNewText(e.target.value)}
                      onKeyDown={e => e.key === "Enter" && addCustomItem()}
                      placeholder="e.g. NOC from employer, Bank guarantee letter…"
                      className={inputCls}
                    />
                    <div className="flex gap-3 items-center">
                      <select value={newCat} onChange={e => setNewCat(e.target.value)}
                        className={`${inputCls} flex-1`}>
                        {ALL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <label className="flex items-center gap-2 flex-shrink-0 cursor-pointer select-none">
                        <span className="text-xs font-bold text-gray-600">Required</span>
                        <div
                          onClick={() => setNewReq(r => !r)}
                          className={`w-10 h-5.5 rounded-full relative transition-colors flex-shrink-0 cursor-pointer ${newReq ? "bg-green-600" : "bg-gray-300"}`}
                          style={{ height:"22px", width:"42px" }}
                        >
                          <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${newReq ? "left-5.5" : "left-0.5"}`}
                            style={{ left: newReq ? "22px" : "2px" }} />
                        </div>
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={addCustomItem}
                        className="flex-1 py-2.5 bg-green-700 hover:bg-green-800 text-white font-bold text-sm rounded-xl transition-all">
                        Add Item
                      </button>
                      <button onClick={() => { setAddingItem(false); setNewText(""); setNewReq(false); }}
                        className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold text-sm rounded-xl transition-all">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ── CTA Banner ── */}
            <div className="rounded-2xl p-6 text-center mb-2" style={{ background:"linear-gradient(135deg,#0a2e1f 0%,#134e35 55%,#1a6b47 100%)" }}>
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="font-black text-xl text-white mb-2">
                Need help with your {VISA_TYPES.find(v => v.id === visaType)?.label}?
              </h3>
              <p className="text-green-300 text-sm mb-5">
                Eammu experts guide you from documents to approval — stress-free
              </p>
              <a href="/contact"
                className="inline-block px-8 py-3 bg-white text-green-900 font-extrabold text-sm rounded-xl hover:bg-green-50 transition-all hover:shadow-lg">
                Get Free Consultation →
              </a>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
