"use client";
import { useState, useMemo, useRef, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────────────────────
// VISA TYPES
// ─────────────────────────────────────────────────────────────
const VISA_TYPES = [
  { id: "student",  label: "Student Visa",  icon: "🎓", desc: "University & college" },
  { id: "tourist",  label: "Tourist Visa",  icon: "✈️", desc: "Holiday & sightseeing" },
  { id: "work",     label: "Work Visa",     icon: "💼", desc: "Employment & career" },
  { id: "business", label: "Business Visa", icon: "🤝", desc: "Meetings & trade" },
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
    student:[
      { id:"us_s1", text:"DS-160 Form Confirmation Page",    category:"US Specific", required:true  },
      { id:"us_s2", text:"SEVIS Fee Receipt (I-901)",        category:"US Specific", required:true  },
      { id:"us_s3", text:"I-20 Form from University",        category:"US Specific", required:true  },
      { id:"us_s4", text:"GRE / GMAT Score (if required)",   category:"Academic",    required:false },
    ],
    tourist:[
      { id:"us_t1", text:"DS-160 Form Confirmation",                category:"US Specific", required:true },
      { id:"us_t2", text:"B-2 Visa Interview Appointment Letter",   category:"US Specific", required:true },
    ],
    work:[
      { id:"us_w1", text:"I-129 Petition (H-1B or relevant)",       category:"US Specific", required:true },
      { id:"us_w2", text:"Labor Condition Application (LCA)",        category:"US Specific", required:true },
      { id:"us_w3", text:"DS-160 Form Confirmation",                category:"US Specific", required:true },
    ],
  },
  gb:{
    student:[
      { id:"gb_s1", text:"CAS (Confirmation of Acceptance for Studies)", category:"UK Specific", required:true  },
      { id:"gb_s2", text:"TB Test Certificate",                          category:"Health",      required:true  },
      { id:"gb_s3", text:"ATAS Clearance (if applicable)",              category:"UK Specific", required:false },
    ],
    work:[
      { id:"gb_w1", text:"Certificate of Sponsorship (CoS)",      category:"UK Specific", required:true },
      { id:"gb_w2", text:"TB Test Certificate",                    category:"Health",      required:true },
      { id:"gb_w3", text:"English Language Proof (B1 level)",      category:"UK Specific", required:true },
    ],
    tourist:[
      { id:"gb_t1", text:"Strong Ties to Home Country Evidence",  category:"UK Specific", required:true },
    ],
  },
  ca:{
    student:[
      { id:"ca_s1", text:"Letter of Acceptance from DLI",              category:"Canada Specific", required:true  },
      { id:"ca_s2", text:"Proof of Financial Support (CAD 10,000+)",   category:"Financial",       required:true  },
      { id:"ca_s3", text:"Biometrics Enrollment",                      category:"Canada Specific", required:true  },
      { id:"ca_s4", text:"Quebec Acceptance Certificate (if Quebec)",  category:"Canada Specific", required:false },
    ],
    work:[
      { id:"ca_w1", text:"LMIA (Labour Market Impact Assessment)",    category:"Canada Specific", required:true },
      { id:"ca_w2", text:"Biometrics Enrollment",                     category:"Canada Specific", required:true },
      { id:"ca_w3", text:"Work Permit Application (IMM 1295)",        category:"Canada Specific", required:true },
    ],
    tourist:[
      { id:"ca_t1", text:"eTA (Electronic Travel Authorization)",     category:"Canada Specific", required:true  },
      { id:"ca_t2", text:"Biometrics (if required)",                  category:"Canada Specific", required:false },
    ],
  },
  au:{
    student:[
      { id:"au_s1", text:"CoE (Confirmation of Enrollment)",         category:"Australia Specific", required:true  },
      { id:"au_s2", text:"OSHC Health Insurance",                    category:"Health",             required:true  },
      { id:"au_s3", text:"GTE Statement (Genuine Temporary Entrant)",category:"Australia Specific", required:true  },
    ],
    work:[
      { id:"au_w1", text:"Nomination by Australian Employer (482)",  category:"Australia Specific", required:true },
      { id:"au_w2", text:"Skills Assessment",                        category:"Australia Specific", required:true },
      { id:"au_w3", text:"English Language Test Results",            category:"Academic",            required:true },
    ],
    tourist:[
      { id:"au_t1", text:"eVisitor or ETA Application",              category:"Australia Specific", required:true },
    ],
  },
  de:{
    student:[
      { id:"de_s1", text:"Blocked Account (Sperrkonto) — €11,208/year", category:"Financial", required:true },
      { id:"de_s2", text:"APS Certificate (for some nationalities)",    category:"Academic",   required:true },
      { id:"de_s3", text:"German / English Language Certificate",       category:"Academic",   required:true },
    ],
    work:[
      { id:"de_w1", text:"Recognition of Foreign Qualifications",       category:"Academic",  required:true },
      { id:"de_w2", text:"Employer Salary Confirmation / Blocked Acct", category:"Financial", required:true },
    ],
  },
  ae:{
    tourist:[
      { id:"ae_t1", text:"Online Visa Application (ICP Portal)", category:"UAE Specific", required:true },
      { id:"ae_t2", text:"Return Ticket Confirmation",           category:"Travel",        required:true },
    ],
    work:[
      { id:"ae_w1", text:"Emirates ID Application",              category:"UAE Specific",  required:true },
      { id:"ae_w2", text:"Employer's Trade License Copy",        category:"UAE Specific",  required:true },
      { id:"ae_w3", text:"Medical Test (UAE approved center)",   category:"Health",         required:true },
      { id:"ae_w4", text:"Labour Contract (MOHRE Attested)",     category:"Employment",     required:true },
    ],
    student:[
      { id:"ae_s1", text:"UAE University Acceptance Letter",     category:"Academic",       required:true },
      { id:"ae_s2", text:"Emirates ID Application",              category:"UAE Specific",   required:true },
    ],
  },
  fr:{
    student:[
      { id:"fr_s1", text:"Campus France Attestation",            category:"France Specific", required:true },
      { id:"fr_s2", text:"Long-Stay Visa (Carte de Séjour)",     category:"France Specific", required:true },
    ],
    tourist:[
      { id:"fr_t1", text:"Schengen Visa Application Form",       category:"Schengen",        required:true },
      { id:"fr_t2", text:"Schengen Travel Insurance",            category:"Health",           required:true },
    ],
    work:[
      { id:"fr_w1", text:"Work Authorization from DIRECCTE",    category:"France Specific", required:true },
      { id:"fr_w2", text:"Schengen Long-Stay Visa (D-Visa)",    category:"France Specific", required:true },
    ],
  },
  sa:{
    work:[
      { id:"sa_w1", text:"Iqama (Residence Permit) Application",   category:"Saudi Specific", required:true },
      { id:"sa_w2", text:"Medical Examination (Approved Center)",   category:"Health",          required:true },
      { id:"sa_w3", text:"Attested Educational Certificates",       category:"Academic",        required:true },
    ],
    tourist:[
      { id:"sa_t1", text:"Online Saudi Visa (Tawakkalna)",          category:"Saudi Specific", required:true },
    ],
  },
  sg:{
    work:[
      { id:"sg_w1", text:"Employment Pass Application (EP/S-Pass)", category:"Singapore Specific", required:true },
      { id:"sg_w2", text:"Fixed Monthly Salary Evidence",           category:"Financial",            required:true },
    ],
    student:[
      { id:"sg_s1", text:"Student's Pass Application (ICA)",        category:"Singapore Specific", required:true },
      { id:"sg_s2", text:"In-Principle Approval (IPA) Letter",      category:"Singapore Specific", required:true },
    ],
  },
  jp:{
    tourist:[
      { id:"jp_t1", text:"Itinerary & Accommodation Details",       category:"Travel",       required:true  },
      { id:"jp_t2", text:"Certificate of Employment or Enrollment", category:"Background",   required:true  },
    ],
    student:[
      { id:"jp_s1", text:"Certificate of Eligibility (COE)",        category:"Japan Specific", required:true  },
      { id:"jp_s2", text:"Residence Tax Payment Certificate",        category:"Financial",      required:false },
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// CATEGORY META
// ─────────────────────────────────────────────────────────────
const CAT_META = {
  Identity:             { dot:"#1e40af", bg:"#eff6ff",  text:"#1d4ed8",  icon:"🪪",  letter:"A" },
  Academic:             { dot:"#6d28d9", bg:"#f5f3ff",  text:"#6d28d9",  icon:"📚",  letter:"B" },
  Financial:            { dot:"#15803d", bg:"#f0fdf4",  text:"#15803d",  icon:"💰",  letter:"C" },
  Application:          { dot:"#b45309", bg:"#fffbeb",  text:"#b45309",  icon:"📝",  letter:"D" },
  Health:               { dot:"#dc2626", bg:"#fef2f2",  text:"#dc2626",  icon:"🏥",  letter:"E" },
  Background:           { dot:"#0e7490", bg:"#ecfeff",  text:"#0e7490",  icon:"🔍",  letter:"F" },
  Travel:               { dot:"#0f766e", bg:"#f0fdfa",  text:"#0f766e",  icon:"✈️",  letter:"G" },
  Employment:           { dot:"#4d7c0f", bg:"#f7fee7",  text:"#4d7c0f",  icon:"💼",  letter:"H" },
  Business:             { dot:"#c2410c", bg:"#fff7ed",  text:"#c2410c",  icon:"🤝",  letter:"I" },
  "US Specific":        { dot:"#b91c1c", bg:"#fef2f2",  text:"#b91c1c",  icon:"🇺🇸", letter:"J" },
  "UK Specific":        { dot:"#1e40af", bg:"#eff6ff",  text:"#1e40af",  icon:"🇬🇧", letter:"K" },
  "Canada Specific":    { dot:"#991b1b", bg:"#fef2f2",  text:"#991b1b",  icon:"🇨🇦", letter:"L" },
  "Australia Specific": { dot:"#166534", bg:"#f0fdf4",  text:"#166534",  icon:"🇦🇺", letter:"M" },
  "UAE Specific":       { dot:"#6d28d9", bg:"#f5f3ff",  text:"#6d28d9",  icon:"🇦🇪", letter:"N" },
  "Saudi Specific":     { dot:"#166534", bg:"#f0fdf4",  text:"#166534",  icon:"🇸🇦", letter:"O" },
  "Singapore Specific": { dot:"#0369a1", bg:"#f0f9ff",  text:"#0369a1",  icon:"🇸🇬", letter:"P" },
  "Japan Specific":     { dot:"#be123c", bg:"#fff1f2",  text:"#be123c",  icon:"🇯🇵", letter:"Q" },
  "France Specific":    { dot:"#1e40af", bg:"#eff6ff",  text:"#1e40af",  icon:"🇫🇷", letter:"R" },
  Schengen:             { dot:"#0f766e", bg:"#f0fdfa",  text:"#0f766e",  icon:"🇪🇺", letter:"S" },
  Custom:               { dot:"#374151", bg:"#f9fafb",  text:"#374151",  icon:"⭐",  letter:"Z" },
};
const ALL_CATEGORIES = Object.keys(CAT_META);

// ─────────────────────────────────────────────────────────────
// LOCAL-STORAGE KEY
// ─────────────────────────────────────────────────────────────
const LS_KEY = "eammu_checklist_v3";
function saveToLS(data) { try { localStorage.setItem(LS_KEY, JSON.stringify(data)); } catch {} }
function loadFromLS() { try { return JSON.parse(localStorage.getItem(LS_KEY) || "null"); } catch { return null; } }

// ─────────────────────────────────────────────────────────────
// PDF GENERATOR — matches the design in the screenshot
// Fixed: Visa Express Hub header & Eammu Holidays footer
// Dynamic: flags, countries, visa type, checklist sections
// ─────────────────────────────────────────────────────────────
function generatePDF({ fromCountry, toCountry, visaType, checklist, grouped, checked, progress, checkedCount }) {
  const visaInfo  = VISA_TYPES.find(v => v.id === visaType) || {};
  const dateStr   = new Date().toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" });
  const shortDate = new Date().toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" });
  const refNo     = `VEH-${Date.now().toString().slice(-8)}`;
  const total     = checklist.length;
  const remaining = total - checkedCount;

  // Build category sections — one section per category (A, B, C… labels)
  const catKeys   = Object.keys(grouped);
  const sectionsHTML = catKeys.map((cat, catIdx) => {
    const items  = grouped[cat];
    const letter = String.fromCharCode(65 + catIdx); // A, B, C…
    const itemsHTML = items.map(item => {
      const done = !!checked[item.id];
      return `
        <tr>
          <td style="width:22px;padding:7px 6px 7px 0;vertical-align:top;">
            <div style="width:14px;height:14px;border:1.5px solid ${done ? "#1e40af" : "#9ca3af"};border-radius:3px;background:${done ? "#1e40af" : "#fff"};display:flex;align-items:center;justify-content:center;margin-top:1px;flex-shrink:0;">
              ${done ? `<svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>` : ""}
            </div>
          </td>
          <td style="padding:7px 12px 7px 4px;font-size:11.5px;color:${done ? "#9ca3af" : "#1f2937"};font-weight:500;line-height:1.45;${done ? "text-decoration:line-through;" : ""}vertical-align:top;">
            ${item.text}
          </td>
          <td style="padding:7px 0 7px 4px;white-space:nowrap;vertical-align:top;text-align:right;">
            ${item.required
              ? `<span style="font-size:9px;font-weight:700;color:#dc2626;background:#fef2f2;border:1px solid #fecaca;border-radius:4px;padding:2px 7px;">Required</span>`
              : `<span style="font-size:9px;font-weight:600;color:#9ca3af;background:#f9fafb;border:1px solid #e5e7eb;border-radius:4px;padding:2px 7px;">Optional</span>`
            }
          </td>
        </tr>`;
    }).join("");

    return `
      <div style="margin-bottom:16px;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;break-inside:avoid;">
        <!-- Section header -->
        <div style="background:#f8fafc;border-bottom:1px solid #e5e7eb;padding:9px 16px;display:flex;align-items:center;gap:10px;">
          <div style="width:26px;height:26px;background:#1e3a5f;color:#fff;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;flex-shrink:0;">${letter}</div>
          <div style="font-size:12px;font-weight:800;color:#1e3a5f;text-transform:uppercase;letter-spacing:0.8px;flex:1;">${cat}</div>
          <div style="font-size:10px;color:#6b7280;font-weight:600;">${items.filter(i=>checked[i.id]).length}/${items.length} collected</div>
        </div>
        <!-- Items table -->
        <div style="padding:4px 16px 4px;">
          <table style="width:100%;border-collapse:collapse;">
            <tbody>${itemsHTML}</tbody>
          </table>
        </div>
      </div>`;
  }).join("");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>${toCountry.country} Visa Checklist — Visa Express Hub</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Plus Jakarta Sans','Segoe UI',sans-serif;background:#f3f4f6;print-color-adjust:exact;-webkit-print-color-adjust:exact;}
  .page{max-width:794px;margin:0 auto;background:#fff;min-height:100vh;display:flex;flex-direction:column;}
  @page{margin:0;size:A4;}
  @media print{body{background:#fff;}.page{box-shadow:none;max-width:100%;}}
</style>
</head>
<body>
<div class="page">

  <!-- ══════════════════════════════════════
       FIXED HEADER — Visa Express Hub style
  ══════════════════════════════════════ -->
  <div style="background:#fff;border-bottom:2px solid #e5e7eb;padding:16px 32px;">
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <!-- Logo left -->
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:42px;height:42px;background:linear-gradient(135deg,#1e3a5f,#1e40af);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">🌐</div>
        <div>
          <div style="font-size:18px;font-weight:900;color:#1e3a5f;line-height:1;letter-spacing:-0.5px;">Visa Express<span style="color:#1e40af;"> Hub</span></div>
          <div style="font-size:9px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:1.2px;margin-top:2px;">Trusted Visa Experts</div>
        </div>
      </div>

      <!-- Flags + visa type — dynamic -->
      <div style="display:flex;align-items:center;gap:10px;">
        <img src="${fromCountry.flag}" width="32" height="22" style="object-fit:contain;border-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,0.2);" alt="${fromCountry.country}"/>
        <span style="font-size:20px;color:#9ca3af;font-weight:300;">&amp;</span>
        <img src="${toCountry.flag}" width="32" height="22" style="object-fit:contain;border-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,0.2);" alt="${toCountry.country}"/>
        <div style="width:1px;height:28px;background:#e5e7eb;margin:0 6px;"></div>
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:5px 12px;display:flex;align-items:center;gap:6px;">
          <span style="font-size:14px;">${visaInfo.icon || "📄"}</span>
          <span style="font-size:11px;font-weight:800;color:#1e40af;">${visaInfo.label || visaType}</span>
        </div>
      </div>

      <!-- Powered by right -->
      <div style="text-align:right;">
        <div style="font-size:9px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;">Powered by</div>
        <div style="font-size:14px;font-weight:900;color:#1e3a5f;margin-top:1px;">Eammu Holidays</div>
        <div style="display:flex;align-items:center;gap:4px;justify-content:flex-end;margin-top:2px;">
          <div style="width:16px;height:16px;background:#c0392b;border-radius:50%;display:flex;align-items:center;justify-content:center;">
            <div style="width:6px;height:6px;background:#fff;border-radius:50%;"></div>
          </div>
          <span style="font-size:9px;font-weight:800;color:#c0392b;letter-spacing:0.5px;">IATA</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════════════════
       TITLE BAR — dynamic per checklist
  ══════════════════════════════════════ -->
  <div style="padding:20px 32px 16px;border-bottom:1px solid #f3f4f6;">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;">
      <div>
        <div style="font-size:22px;font-weight:900;color:#1e3a5f;letter-spacing:-0.5px;line-height:1.1;">
          ${toCountry.country} Visa Checklist
          <span style="font-size:13px;font-weight:700;color:#6b7280;margin-left:6px;">— ${visaInfo.label}</span>
        </div>
        <div style="margin-top:5px;display:flex;align-items:center;gap:16px;">
          <span style="font-size:11px;color:#6b7280;font-weight:500;">
            📍 From: <strong style="color:#1e3a5f;">${fromCountry.country}</strong>
            &nbsp;→&nbsp;
            <strong style="color:#1e3a5f;">${toCountry.country}</strong>
          </span>
          <span style="font-size:9px;font-weight:600;color:#9ca3af;background:#f9fafb;border:1px solid #e5e7eb;border-radius:20px;padding:2px 10px;">Ref: ${refNo}</span>
        </div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:10px;color:#6b7280;font-weight:600;">Generated on</div>
        <div style="font-size:12px;font-weight:800;color:#1e3a5f;">${shortDate}</div>
      </div>
    </div>
  </div>

  <!-- ══════════════════════════════════════
       PROGRESS SUMMARY BAR — dynamic
  ══════════════════════════════════════ -->
  <div style="padding:12px 32px;background:#f8fafc;border-bottom:1px solid #e5e7eb;display:flex;align-items:center;gap:20px;">
    <!-- Progress bar -->
    <div style="flex:1;">
      <div style="display:flex;justify-content:space-between;margin-bottom:5px;">
        <span style="font-size:10px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.8px;">Document Progress</span>
        <span style="font-size:13px;font-weight:900;color:#1e40af;">${progress}%</span>
      </div>
      <div style="height:7px;background:#e5e7eb;border-radius:100px;overflow:hidden;">
        <div style="height:100%;width:${progress}%;background:linear-gradient(90deg,#1e40af,#3b82f6);border-radius:100px;"></div>
      </div>
    </div>
    <!-- Stats -->
    <div style="display:flex;gap:10px;flex-shrink:0;">
      ${[
        { v:total,       l:"Total",     c:"#1e3a5f", b:"#f1f5f9", bd:"#e2e8f0" },
        { v:checkedCount,l:"Collected", c:"#15803d", b:"#f0fdf4", bd:"#bbf7d0" },
        { v:remaining,   l:"Remaining", c:"#c2410c", b:"#fff7ed", bd:"#fed7aa" },
      ].map(s=>`
        <div style="background:${s.b};border:1px solid ${s.bd};border-radius:8px;padding:6px 14px;text-align:center;">
          <div style="font-size:18px;font-weight:900;color:${s.c};line-height:1;">${s.v}</div>
          <div style="font-size:9px;font-weight:700;color:#9ca3af;text-transform:uppercase;margin-top:2px;">${s.l}</div>
        </div>`).join("")}
    </div>
  </div>

  <!-- ══════════════════════════════════════
       DISCLAIMER
  ══════════════════════════════════════ -->
  <div style="margin:16px 32px 0;background:#fffbeb;border:1.5px solid #fde68a;border-radius:10px;padding:11px 16px;display:flex;gap:10px;">
    <div style="font-size:16px;flex-shrink:0;margin-top:1px;">⚠️</div>
    <div style="font-size:10.5px;color:#92400e;font-weight:500;line-height:1.6;">
      <strong style="font-weight:800;">Important Notice:</strong>
      This checklist is a general guide based on standard requirements. Consulate requirements may vary. Always verify the complete and current document list directly with the official embassy or consulate of <strong>${toCountry.country}</strong> before submitting your application. Visa Express Hub and Eammu Holidays are not responsible for any changes in official requirements.
    </div>
  </div>

  <!-- ══════════════════════════════════════
       CHECKLIST SECTIONS — fully dynamic
  ══════════════════════════════════════ -->
  <div style="padding:16px 32px 24px;flex:1;">
    ${sectionsHTML}
    ${progress === 100 ? `
    <div style="background:linear-gradient(90deg,#f0fdf4,#dcfce7);border:1.5px solid #86efac;border-radius:10px;padding:12px 18px;display:flex;align-items:center;gap:10px;margin-top:4px;">
      <span style="font-size:18px;">🎉</span>
      <span style="font-size:12px;font-weight:800;color:#15803d;">All documents collected — you are ready to submit your visa application!</span>
    </div>` : ""}
  </div>

  <!-- ══════════════════════════════════════
       FIXED FOOTER — Eammu Holidays / Visa Express Hub
  ══════════════════════════════════════ -->
  <div style="background:#1e3a5f;padding:20px 32px;margin-top:auto;">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;">
      <!-- Brand left -->
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="width:36px;height:36px;background:linear-gradient(135deg,#fbbf24,#f59e0b);border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:17px;">🌐</div>
        <div>
          <div style="font-size:14px;font-weight:900;color:#fff;letter-spacing:-0.3px;">Visa Express Hub</div>
          <div style="font-size:9px;color:rgba(255,255,255,0.5);font-weight:600;margin-top:1px;text-transform:uppercase;letter-spacing:0.8px;">Sponsored by Eammu Holidays</div>
        </div>
      </div>

      <!-- Links center -->
      <div style="text-align:center;">
        <div style="font-size:10.5px;color:rgba(255,255,255,0.7);font-weight:600;">Dubai, UAE &nbsp;·&nbsp; Dhaka &nbsp;·&nbsp; Global</div>
        <div style="font-size:10px;color:rgba(255,255,255,0.5);margin-top:3px;">
          <span style="color:#fbbf24;font-weight:700;">www.visaexpresshub.com</span>
          &nbsp;·&nbsp; info@visaexpresshub.com
        </div>
        <div style="font-size:10px;color:rgba(255,255,255,0.4);margin-top:2px;">Phone: +971-4-XXX-XXXX</div>
      </div>

      <!-- Right: IATA badge + ref -->
      <div style="text-align:right;">
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:7px 14px;">
          <div style="width:24px;height:24px;background:#c0392b;border-radius:50%;display:flex;align-items:center;justify-content:center;">
            <div style="width:9px;height:9px;background:#fff;border-radius:50%;"></div>
          </div>
          <div>
            <div style="font-size:11px;font-weight:900;color:#fff;">IATA</div>
            <div style="font-size:8px;color:rgba(255,255,255,0.5);font-weight:600;">Accredited Partner</div>
          </div>
        </div>
        <div style="margin-top:6px;font-size:9px;color:rgba(255,255,255,0.3);">Generated ${dateStr} · Ref ${refNo}</div>
      </div>
    </div>

    <!-- Bottom strip -->
    <div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
      <div style="display:flex;gap:12px;">
        ${["Company","Resources","Partners","Legal & Contact"].map(l=>`<span style="font-size:9.5px;color:rgba(255,255,255,0.4);font-weight:600;">${l}</span>`).join(`<span style="color:rgba(255,255,255,0.2);">·</span>`)}
      </div>
      <div style="font-size:9px;color:rgba(255,255,255,0.3);">© ${new Date().getFullYear()} Visa Express Hub · For personal use only</div>
    </div>
  </div>

</div>
<script>window.addEventListener('load', () => setTimeout(() => window.print(), 700));</script>
</body>
</html>`;

  const blob = new Blob([html], { type:"text/html;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  window.open(url, "_blank");
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

// ─────────────────────────────────────────────────────────────
// TXT DOWNLOAD
// ─────────────────────────────────────────────────────────────
function downloadTXT({ fromCountry, toCountry, visaType, grouped, checked, checklist, checkedCount, progress }) {
  if (!fromCountry || !toCountry || !visaType) return;
  const visaLabel = VISA_TYPES.find(v => v.id === visaType)?.label || visaType;
  let txt = `VISA DOCUMENT CHECKLIST\n${"═".repeat(56)}\nFrom: ${fromCountry.country}\nTo:   ${toCountry.country}\nType: ${visaLabel}\nDate: ${new Date().toLocaleDateString()}\nSite: visaexpresshub.com\n${"═".repeat(56)}\n`;
  Object.entries(grouped).forEach(([cat, items]) => {
    txt += `\n▸ ${cat.toUpperCase()}\n${"─".repeat(40)}\n`;
    items.forEach(i => {
      txt += `  ${checked[i.id] ? "[✓]" : "[ ]"}  ${i.text}${i.required ? "  ★" : ""}\n`;
    });
  });
  txt += `\n${"═".repeat(56)}\nProgress: ${checkedCount}/${checklist.length} (${progress}%)\n★ = Required\n\nFor expert help: visaexpresshub.com\n`;
  const blob = new Blob([txt], { type:"text/plain;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = `checklist-${toCountry.code}-${visaType}.txt`;
  document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────────────────────────
// COUNTRY DROPDOWN
// ─────────────────────────────────────────────────────────────
function CountryDropdown({ label, value, onChange, placeholder, countries, loading }) {
  const [search, setSearch] = useState("");
  const [open,   setOpen]   = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  const filtered = useMemo(() =>
    countries.filter(c => c.country.toLowerCase().includes(search.toLowerCase())),
    [countries, search]
  );

  return (
    <div ref={ref} className="relative">
      <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.1em] mb-2">{label}</label>
      <button
        type="button"
        onClick={() => !loading && setOpen(v => !v)}
        className="w-full flex items-center gap-3 px-4 py-3.5 bg-white border-2 border-slate-200 hover:border-blue-400 focus:border-blue-500 rounded-2xl text-sm font-semibold transition-all outline-none text-left shadow-sm"
      >
        {loading ? (
          <span className="text-slate-400 text-sm">Loading countries…</span>
        ) : value ? (
          <>
            <img src={value.flag} width={26} height={18} className="object-contain rounded-md shadow-sm flex-shrink-0" alt="" />
            <span className="text-slate-800 font-bold">{value.country}</span>
          </>
        ) : (
          <span className="text-slate-400">{placeholder}</span>
        )}
        <svg className={`w-4 h-4 ml-auto text-slate-400 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      {open && !loading && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden" style={{boxShadow:"0 20px 60px rgba(0,0,0,0.15)"}}>
          <div className="p-3 border-b border-slate-100 bg-slate-50/80">
            <input
              autoFocus value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search country…"
              className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm outline-none placeholder-slate-400 focus:border-blue-400 transition-colors"
            />
          </div>
          <ul className="max-h-60 overflow-y-auto divide-y divide-slate-50">
            {filtered.length === 0
              ? <li className="px-4 py-4 text-sm text-slate-400 text-center">No results for "{search}"</li>
              : filtered.map(c => (
                <li
                  key={c.code}
                  onClick={() => { onChange(c); setOpen(false); setSearch(""); }}
                  className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm transition-all hover:bg-blue-50 ${value?.code === c.code ? "bg-blue-50 text-blue-800 font-bold" : "text-slate-700"}`}
                >
                  <img src={c.flag} width={22} height={15} className="object-contain rounded flex-shrink-0 shadow-sm" alt="" />
                  <span className="flex-1">{c.country}</span>
                  {value?.code === c.code && <span className="text-blue-500 font-black text-xs">✓</span>}
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
// EDIT MODAL
// ─────────────────────────────────────────────────────────────
function EditModal({ item, onSave, onClose }) {
  const [text, setText] = useState(item.text);
  const [cat,  setCat]  = useState(item.category);
  const [req,  setReq]  = useState(item.required);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-7 border border-slate-100" style={{boxShadow:"0 30px 80px rgba(0,0,0,0.2)"}}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-xl">✏️</div>
          <div>
            <h3 className="text-base font-black text-slate-900">Edit Document</h3>
            <p className="text-xs text-slate-400">Modify document details</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Document Name</label>
            <input autoFocus value={text} onChange={e => setText(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 focus:border-blue-500 rounded-2xl text-sm outline-none font-medium transition-colors"
              placeholder="Document name…" />
          </div>
          <div>
            <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Category</label>
            <select value={cat} onChange={e => setCat(e.target.value)}
              className="w-full px-4 py-3 border-2 border-slate-200 focus:border-blue-500 rounded-2xl text-sm outline-none bg-white font-medium transition-colors">
              {ALL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
            <div>
              <p className="text-sm font-bold text-slate-700">Mark as Required</p>
              <p className="text-xs text-slate-400 mt-0.5">Required docs are flagged in the PDF</p>
            </div>
            <button onClick={() => setReq(r => !r)} className={`w-12 h-7 rounded-full relative transition-all duration-200 flex-shrink-0 ${req ? "bg-blue-600" : "bg-slate-300"}`}>
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-200 ${req ? "left-6" : "left-1"}`} />
            </button>
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all">Cancel</button>
          <button onClick={() => { if (text.trim()) onSave({ ...item, text: text.trim(), category: cat, required: req }); }}
            className="flex-1 py-3 text-sm font-black text-white bg-blue-600 hover:bg-blue-700 rounded-2xl transition-all shadow-lg shadow-blue-200">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// STEP INDICATOR
// ─────────────────────────────────────────────────────────────
function StepIndicator({ current }) {
  const steps = ["Choose Countries", "Select Visa Type", "Your Checklist"];
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((label, i) => {
        const idx   = i + 1;
        const done  = current > idx;
        const active = current === idx;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-black transition-all ${
                done ? "bg-blue-600 text-white" : active ? "bg-blue-600 text-white ring-4 ring-blue-100" : "bg-slate-100 text-slate-400"
              }`}>
                {done ? "✓" : idx}
              </div>
              <span className={`text-[10px] font-bold mt-1.5 text-center max-w-[64px] leading-tight ${active ? "text-blue-600" : done ? "text-slate-500" : "text-slate-300"}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-1 mb-5 rounded-full transition-all ${current > idx ? "bg-blue-600" : "bg-slate-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────
export default function VisaChecklistGenerator() {
  const [countries,         setCountries]         = useState([]);
  const [countriesLoading,  setCountriesLoading]  = useState(true);
  const [countriesError,    setCountriesError]    = useState(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res  = await fetch("/api/countries");
        if (!res.ok) throw new Error("Failed to load countries");
        const data = await res.json();
        setCountries(Array.isArray(data) ? data : []);
      } catch (err) {
        setCountriesError(err.message);
      } finally {
        setCountriesLoading(false);
      }
    }
    fetchCountries();
  }, []);

  const [fromCountry, setFromCountry] = useState(null);
  const [toCountry,   setToCountry]   = useState(null);
  const [visaType,    setVisaType]    = useState(null);
  const [step,        setStep]        = useState(1);

  const [checked,     setChecked]     = useState({});
  const [customItems, setCustomItems] = useState([]);
  const [editedItems, setEditedItems] = useState({});
  const [editingItem, setEditingItem] = useState(null);
  const [addingItem,  setAddingItem]  = useState(false);
  const [newText,     setNewText]     = useState("");
  const [newCat,      setNewCat]      = useState("Custom");
  const [newReq,      setNewReq]      = useState(false);
  const [savedMsg,    setSavedMsg]    = useState(false);
  const [filterCat,   setFilterCat]   = useState("All");
  const [showOnlyPending, setShowOnlyPending] = useState(false);

  const checklist = useMemo(() => {
    if (!visaType) return [];
    const apply = (items) => items.map(i => editedItems[i.id] ? { ...i, ...editedItems[i.id] } : i);
    return [
      ...apply(BASE[visaType] || []),
      ...apply(toCountry ? (EXTRA[toCountry.code]?.[visaType] || []) : []),
      ...apply(customItems),
    ];
  }, [visaType, toCountry, customItems, editedItems]);

  const grouped = useMemo(() =>
    checklist.reduce((acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {}),
  [checklist]);

  const checkedCount = Object.values(checked).filter(Boolean).length;
  const progress     = checklist.length ? Math.round((checkedCount / checklist.length) * 100) : 0;

  const saveState = useCallback(() => {
    if (!fromCountry || !toCountry || !visaType) return;
    saveToLS({ fromCountry, toCountry, visaType, checked, customItems, editedItems });
    setSavedMsg(true); setTimeout(() => setSavedMsg(false), 2000);
  }, [fromCountry, toCountry, visaType, checked, customItems, editedItems]);

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

  useEffect(() => {
    if (step === 2) saveToLS({ fromCountry, toCountry, visaType, checked, customItems, editedItems });
  }, [checked, customItems, editedItems, step]);

  const handleGenerate = () => {
    if (fromCountry && toCountry && visaType) {
      setStep(2); setChecked({}); setCustomItems([]); setEditedItems({});
      setFilterCat("All"); setShowOnlyPending(false);
    }
  };

  const resetAll = () => {
    setStep(1); setFromCountry(null); setToCountry(null); setVisaType(null);
    setChecked({}); setCustomItems([]); setEditedItems({}); setAddingItem(false);
    setFilterCat("All"); setShowOnlyPending(false);
    try { localStorage.removeItem(LS_KEY); } catch {}
  };

  const addCustomItem = () => {
    if (!newText.trim()) return;
    setCustomItems(p => [...p, { id:`c_${Date.now()}`, text:newText.trim(), category:newCat, required:newReq, custom:true }]);
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

  const toggleAll = () => {
    if (checkedCount === checklist.length) setChecked({});
    else setChecked(Object.fromEntries(checklist.map(i => [i.id, true])));
  };

  const isReady = fromCountry && toCountry && visaType;
  const uiStep  = step === 2 ? 3 : fromCountry && toCountry ? 2 : 1;

  const filteredGrouped = useMemo(() => {
    if (filterCat === "All" && !showOnlyPending) return grouped;
    return Object.fromEntries(
      Object.entries(grouped)
        .filter(([cat]) => filterCat === "All" || cat === filterCat)
        .map(([cat, items]) => [cat, showOnlyPending ? items.filter(i => !checked[i.id]) : items])
        .filter(([, items]) => items.length > 0)
    );
  }, [grouped, filterCat, showOnlyPending, checked]);

  return (
    <div className="min-h-screen py-16 px-4" style={{background:"linear-gradient(135deg,#f0f4ff 0%,#fafbff 50%,#f0f9ff 100%)"}}>
      {editingItem && <EditModal item={editingItem} onSave={saveEdit} onClose={() => setEditingItem(null)} />}

      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest px-5 py-2 rounded-full mb-5 shadow-lg shadow-blue-200">
            <span>✈️</span> Free Tool · Visa Express Hub
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 leading-[1.05] tracking-tight">
            Visa Document<br/>
            <span style={{background:"linear-gradient(90deg,#1e40af,#0ea5e9)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
              Checklist Generator
            </span>
          </h1>
          <p className="text-slate-500 text-base max-w-sm mx-auto leading-relaxed">
            Get a personalised, country-specific visa document checklist in seconds.
          </p>
        </div>

        <StepIndicator current={uiStep} />

        {/* STEP 1 — FORM */}
        {step === 1 && (
          <div>
            {countriesError && (
              <div className="mb-4 px-4 py-3 bg-amber-50 border border-amber-300 rounded-2xl text-xs text-amber-700 font-semibold flex items-center gap-2">
                ⚠️ Could not load live country data — please refresh. ({countriesError})
              </div>
            )}

            <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-xl shadow-slate-100/80 mb-5">
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <CountryDropdown label="Your Nationality"    value={fromCountry} onChange={setFromCountry} placeholder="Select your country…"  countries={countries} loading={countriesLoading} />
                  <CountryDropdown label="Destination Country" value={toCountry}   onChange={setToCountry}   placeholder="Select destination…"    countries={countries} loading={countriesLoading} />
                </div>

                {(fromCountry || toCountry) && (
                  <div className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl border border-slate-100">
                    {fromCountry ? (
                      <div className="flex items-center gap-2">
                        <img src={fromCountry.flag} width={24} height={17} className="object-contain rounded shadow-sm" alt="" />
                        <span className="text-sm font-bold text-slate-700">{fromCountry.country}</span>
                      </div>
                    ) : <span className="text-xs text-slate-400">Select origin</span>}
                    <span className="text-slate-300 font-black mx-1">→</span>
                    {toCountry ? (
                      <div className="flex items-center gap-2">
                        <img src={toCountry.flag} width={24} height={17} className="object-contain rounded shadow-sm" alt="" />
                        <span className="text-sm font-bold text-slate-700">{toCountry.country}</span>
                      </div>
                    ) : <span className="text-xs text-slate-400">Select destination</span>}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.1em] mb-3">Visa Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {VISA_TYPES.map(v => (
                      <button key={v.id} type="button" onClick={() => setVisaType(v.id)}
                        className={`flex items-start gap-3 px-4 py-4 rounded-2xl border-2 text-left transition-all ${
                          visaType === v.id ? "border-blue-500 bg-blue-50 shadow-lg shadow-blue-100" : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50"
                        }`}
                      >
                        <span className="text-2xl leading-none mt-0.5">{v.icon}</span>
                        <div>
                          <div className={`text-sm font-black ${visaType === v.id ? "text-blue-800" : "text-slate-700"}`}>{v.label}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{v.desc}</div>
                        </div>
                        {visaType === v.id && (
                          <div className="ml-auto w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <button type="button" onClick={handleGenerate} disabled={!isReady || countriesLoading}
                  className={`w-full py-4 rounded-2xl font-black text-base transition-all ${
                    isReady && !countriesLoading ? "bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-200 hover:shadow-blue-300 active:scale-[0.99]" : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  {countriesLoading ? "Loading countries…" : isReady ? "Generate My Checklist →" : "Fill all fields to continue"}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon:"🌍", t:"Live Country Data", s:"From our database" },
                { icon:"✏️", t:"Fully Editable",    s:"Add & customise"   },
                { icon:"📄", t:"Premium PDF",        s:"Print-ready"       },
              ].map((c, i) => (
                <div key={i} className="bg-white border border-slate-100 rounded-2xl p-4 text-center shadow-sm">
                  <div className="text-2xl mb-2">{c.icon}</div>
                  <div className="text-xs font-black text-slate-700">{c.t}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{c.s}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 — CHECKLIST */}
        {step === 2 && (
          <div>
            {/* Summary card */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xl shadow-slate-100/80 mb-4">
              <div className="flex items-center gap-3 flex-wrap mb-5">
                <div className="flex items-center gap-2.5 bg-slate-50 rounded-2xl px-4 py-2.5 border border-slate-100 flex-1 min-w-0">
                  <img src={fromCountry.flag} width={24} height={17} className="object-contain rounded shadow-sm flex-shrink-0" alt="" />
                  <span className="font-bold text-sm text-slate-700 truncate">{fromCountry.country}</span>
                  <span className="text-slate-300 font-black mx-1">→</span>
                  <img src={toCountry.flag}   width={24} height={17} className="object-contain rounded shadow-sm flex-shrink-0" alt="" />
                  <span className="font-bold text-sm text-slate-700 truncate">{toCountry.country}</span>
                  <span className="ml-auto flex items-center gap-1.5 bg-blue-100 text-blue-700 text-xs font-black px-2.5 py-1 rounded-full flex-shrink-0">
                    {VISA_TYPES.find(v => v.id === visaType)?.icon} {VISA_TYPES.find(v => v.id === visaType)?.label}
                  </span>
                </div>
                <button onClick={resetAll} className="px-4 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all flex-shrink-0">
                  ← New
                </button>
              </div>

              {/* Progress ring */}
              <div className="flex items-center gap-5 mb-5">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <svg viewBox="0 0 80 80" className="w-full h-full -rotate-90">
                    <circle cx="40" cy="40" r="34" fill="none" stroke="#e2e8f0" strokeWidth="8"/>
                    <circle cx="40" cy="40" r="34" fill="none" stroke="url(#prog)" strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 34}`}
                      strokeDashoffset={`${2 * Math.PI * 34 * (1 - progress / 100)}`}
                      className="transition-all duration-700"
                    />
                    <defs>
                      <linearGradient id="prog" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1e40af"/>
                        <stop offset="100%" stopColor="#0ea5e9"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-black text-slate-900 leading-none">{progress}%</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mt-0.5">Done</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { v:checklist.length,               l:"Total",     c:"text-slate-700",  bg:"bg-slate-50",  bd:"border-slate-100" },
                      { v:checkedCount,                   l:"Collected", c:"text-blue-700",   bg:"bg-blue-50",   bd:"border-blue-100"  },
                      { v:checklist.length - checkedCount,l:"Remaining", c:"text-orange-600", bg:"bg-orange-50", bd:"border-orange-100"},
                    ].map((s, i) => (
                      <div key={i} className={`${s.bg} ${s.bd} border rounded-2xl py-3 text-center`}>
                        <div className={`text-xl font-black ${s.c}`}>{s.v}</div>
                        <div className="text-[10px] text-slate-400 font-bold mt-0.5">{s.l}</div>
                      </div>
                    ))}
                  </div>
                  {progress === 100 && (
                    <div className="mt-2 bg-blue-50 border border-blue-200 rounded-2xl px-4 py-2.5 text-xs font-bold text-blue-700 flex items-center gap-2">
                      🎉 All documents collected — ready to apply!
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => generatePDF({ fromCountry, toCountry, visaType, checklist, grouped, checked, progress, checkedCount })}
                  className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-2xl transition-all shadow-lg shadow-blue-200"
                >
                  📄 Download PDF
                </button>
                <button onClick={() => downloadTXT({ fromCountry, toCountry, visaType, grouped, checked, checklist, checkedCount, progress })}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-600 font-bold text-sm rounded-2xl transition-all">
                  ⬇️ TXT
                </button>
                <button onClick={saveState}
                  className={`flex items-center gap-2 px-4 py-2.5 border-2 font-bold text-sm rounded-2xl transition-all ${
                    savedMsg ? "bg-blue-50 border-blue-400 text-blue-700" : "bg-white border-slate-200 hover:border-blue-400 hover:text-blue-600 text-slate-600"
                  }`}
                >
                  {savedMsg ? "✅ Saved!" : "💾 Save"}
                </button>
                <button onClick={toggleAll}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-slate-200 hover:border-slate-400 text-slate-600 font-bold text-sm rounded-2xl transition-all ml-auto">
                  {checkedCount === checklist.length ? "☐ Uncheck All" : "☑ Check All"}
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white border border-slate-100 rounded-2xl px-5 py-4 mb-4 shadow-sm flex items-center gap-3 flex-wrap">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex-shrink-0">Filter:</span>
              <div className="flex gap-2 flex-wrap flex-1">
                <button onClick={() => setFilterCat("All")} className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${filterCat === "All" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>All</button>
                {Object.keys(grouped).map(cat => {
                  const meta   = CAT_META[cat] || CAT_META.Custom;
                  const active = filterCat === cat;
                  return (
                    <button key={cat} onClick={() => setFilterCat(active ? "All" : cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${active ? "text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                      style={active ? {background:meta.dot} : {}}
                    >
                      <span>{meta.icon}</span> {cat}
                    </button>
                  );
                })}
              </div>
              <button onClick={() => setShowOnlyPending(v => !v)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 ${showOnlyPending ? "bg-orange-100 text-orange-700 border border-orange-200" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                ⏳ {showOnlyPending ? "Showing pending" : "Show pending"}
              </button>
            </div>

            {/* Category cards */}
            {Object.entries(filteredGrouped).map(([cat, items]) => {
              const meta    = CAT_META[cat] || CAT_META.Custom;
              const catDone = items.filter(i => checked[i.id]).length;
              const catPct  = Math.round((catDone / items.length) * 100);
              return (
                <div key={cat} className="bg-white border border-slate-100 rounded-2xl mb-3 overflow-hidden shadow-sm">
                  <div className="flex items-center gap-3 px-5 py-4" style={{ borderLeft:`4px solid ${meta.dot}`, background:`linear-gradient(90deg, ${meta.bg}80, #fff)` }}>
                    <span className="text-xl flex-shrink-0">{meta.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-600">{cat}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background:meta.bg, color:meta.text }}>{catDone}/{items.length}</span>
                      </div>
                      <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden w-32">
                        <div className="h-full rounded-full transition-all duration-500" style={{ width:`${catPct}%`, background:meta.dot }} />
                      </div>
                    </div>
                    <span className="text-sm font-black flex-shrink-0" style={{color:meta.dot}}>{catPct}%</span>
                  </div>

                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => setChecked(p => ({ ...p, [item.id]: !p[item.id] }))}
                      className={`group flex items-center gap-3 px-5 py-4 cursor-pointer transition-all ${idx < items.length - 1 ? "border-b border-slate-50" : ""} ${checked[item.id] ? "bg-blue-50/50 hover:bg-blue-50" : "hover:bg-slate-50"}`}
                    >
                      <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150 ${checked[item.id] ? "bg-blue-600 border-blue-600" : "border-slate-300 bg-white group-hover:border-blue-400"}`}>
                        {checked[item.id] && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        )}
                      </div>
                      <span className={`flex-1 text-sm font-semibold leading-snug transition-all ${checked[item.id] ? "line-through text-slate-400" : "text-slate-800"}`}>
                        {item.text}
                      </span>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {item.required
                          ? <span className="text-[10px] font-black px-2 py-0.5 bg-red-50 text-red-600 border border-red-200 rounded-lg">Required</span>
                          : <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-50 text-slate-400 border border-slate-200 rounded-lg">Optional</span>
                        }
                        {item.custom && <span className="text-[10px] font-black px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg">Custom</span>}
                        <button onClick={e => { e.stopPropagation(); setEditingItem(item); }} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-600 transition-all text-xs" title="Edit">✏️</button>
                        {item.custom && (
                          <button onClick={e => { e.stopPropagation(); removeItem(item.id); }} className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-100 text-slate-400 hover:text-red-500 transition-all text-xs" title="Remove">✕</button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}

            {/* Add Custom */}
            <div className={`bg-white border-2 rounded-2xl mb-4 overflow-hidden transition-all ${addingItem ? "border-blue-400 shadow-lg shadow-blue-100" : "border-dashed border-slate-300"}`}>
              {!addingItem ? (
                <button type="button" onClick={() => setAddingItem(true)} className="w-full py-4 flex items-center justify-center gap-2 text-blue-600 font-black text-sm hover:bg-blue-50 rounded-2xl transition-all">
                  <span className="text-xl font-black w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center leading-none">+</span>
                  Add Custom Document
                </button>
              ) : (
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center text-base">➕</div>
                    <p className="text-sm font-black text-slate-900">Add Custom Document</p>
                  </div>
                  <div className="space-y-3">
                    <input autoFocus value={newText} onChange={e => setNewText(e.target.value)} onKeyDown={e => e.key === "Enter" && addCustomItem()}
                      placeholder="e.g. NOC from employer, Bank guarantee letter…"
                      className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white rounded-2xl text-sm outline-none transition-all font-medium"
                    />
                    <div className="flex gap-3 items-center">
                      <select value={newCat} onChange={e => setNewCat(e.target.value)} className="flex-1 px-4 py-3 bg-slate-50 border-2 border-slate-200 focus:border-blue-500 focus:bg-white rounded-2xl text-sm outline-none transition-all">
                        {ALL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <label className="flex items-center gap-2 flex-shrink-0 cursor-pointer select-none">
                        <span className="text-xs font-bold text-slate-600">Required</span>
                        <button type="button" onClick={() => setNewReq(r => !r)} className={`w-11 h-6 rounded-full relative transition-all duration-200 flex-shrink-0 ${newReq ? "bg-blue-600" : "bg-slate-300"}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all duration-200 ${newReq ? "left-6" : "left-1"}`} />
                        </button>
                      </label>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={addCustomItem} className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm rounded-2xl transition-all shadow-lg shadow-blue-100">Add Document</button>
                      <button onClick={() => { setAddingItem(false); setNewText(""); setNewReq(false); }} className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm rounded-2xl transition-all">Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Banner */}
            <div className="rounded-3xl p-7 text-center overflow-hidden relative" style={{background:"linear-gradient(135deg,#0f172a 0%,#1e3a5f 55%,#1e40af 100%)"}}>
              <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10" style={{background:"radial-gradient(circle,#fbbf24,transparent)",transform:"translate(30%,-30%)"}} />
              <div className="relative z-10">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="font-black text-xl text-white mb-2">
                  Need help with your {VISA_TYPES.find(v => v.id === visaType)?.label}?
                </h3>
                <p className="text-blue-300 text-sm mb-5 max-w-xs mx-auto leading-relaxed">
                  Our experts guide you from documents to approval — stress-free and fast.
                </p>
                <a href="/contact" className="inline-flex items-center gap-2 px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-sm rounded-2xl transition-all shadow-xl shadow-amber-900/30">
                  Get Free Consultation →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}