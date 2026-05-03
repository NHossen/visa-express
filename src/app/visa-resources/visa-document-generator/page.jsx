"use client";
import { useState, useEffect, useMemo, useRef } from "react";

// ─── Visa Types ───────────────────────────────────────────────────────────────
const VISA_TYPES = {
  student: {
    label: "Student Visa",
    icon: "🎓",
    hue: "indigo",
    tagline: "University & college admissions abroad",
    recommended: ["sop", "cover_letter", "noc", "salary_certificate", "sponsor_letter"],
    tip: "A strong SOP and sponsor letter are the most critical documents for student visa approval.",
  },
  tourist: {
    label: "Tourist Visa",
    icon: "✈️",
    hue: "cyan",
    tagline: "Travel, leisure & holiday trips",
    recommended: ["cover_letter", "sponsor_letter", "salary_certificate", "noc"],
    tip: "A clear cover letter with strong financial proof significantly improves tourist visa success.",
  },
  work: {
    label: "Work Visa",
    icon: "💼",
    hue: "violet",
    tagline: "Employment & professional relocation",
    recommended: ["cover_letter", "noc", "salary_certificate", "power_of_attorney"],
    tip: "An NOC from your current employer and a detailed cover letter are essential for work visas.",
  },
  business: {
    label: "Business Visa",
    icon: "🤝",
    hue: "amber",
    tagline: "Corporate visits, meetings & conferences",
    recommended: ["cover_letter", "noc", "salary_certificate", "sponsor_letter"],
    tip: "Business invitation letters combined with salary/NOC documents strengthen your application.",
  },
};

// ─── Document Templates ───────────────────────────────────────────────────────
const DOCUMENT_TEMPLATES = {
  sop: {
    label: "Statement of Purpose",
    shortLabel: "SOP",
    icon: "🎓",
    description: "For university admissions",
    badge: "Student",
    fields: ["full_name","passport","nationality","destination","university","course","education","work_experience","why_country","why_course","career_goal","financial","notes"],
    build: (d) => `To Whomsoever It May Concern,

I, ${d.full_name}, holder of Passport No. ${d.passport}, a citizen of ${d.nationality}, am writing this Statement of Purpose in support of my application for a student visa to ${d.destination}. I wish to pursue ${d.course} at ${d.university}, and I believe this opportunity will be a defining milestone in my academic and professional journey.

${d.education}. This academic foundation has equipped me with a strong theoretical and practical understanding of my chosen field. ${d.work_experience ? `In addition to my academic background, I have gained practical experience: ${d.work_experience}.` : ""} These experiences have sharpened my analytical skills and deepened my commitment to advancing further in this discipline.

My decision to pursue this course in ${d.destination} is driven by several compelling reasons. ${d.why_country}. The academic environment, research opportunities, and multicultural exposure that ${d.destination} offers are unparalleled, and I am confident that studying there will broaden both my intellectual and personal horizons. Specifically regarding my chosen program: ${d.why_course}.

Upon successful completion of my studies, I intend to return to ${d.nationality} and apply the knowledge and skills I have acquired. ${d.career_goal}. I am firmly committed to contributing to the development of my home country and have strong ties — family, professional, and social — that will ensure my return.

With respect to my financial arrangements, ${d.financial}. I am confident that all academic and living expenses will be met without any difficulty throughout the duration of my studies.

${d.notes ? `Additional Information:\n${d.notes}` : ""}

I sincerely request the concerned authorities to grant me a student visa and look forward to a positive response. I assure you that I will abide by all visa conditions and regulations during my stay in ${d.destination}.

Yours faithfully,

${d.full_name}
Passport No.: ${d.passport}
Date: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`,
  },

  cover_letter: {
    label: "Cover Letter",
    shortLabel: "Cover Letter",
    icon: "📝",
    description: "For visa applications & embassy",
    badge: "All Visas",
    fields: ["full_name","passport","nationality","destination","purpose","occupation","employer","education","financial","travel_history","notes"],
    build: (d) => `Date: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}

The Visa Officer
Embassy / Consulate of ${d.destination}

Subject: Application for ${d.destination} Visa — ${d.purpose}

Respected Sir/Madam,

I, ${d.full_name}, a citizen of ${d.nationality} holding Passport No. ${d.passport}, respectfully submit this cover letter in support of my visa application to ${d.destination}. The purpose of my visit is ${d.purpose}.

I am currently employed as ${d.occupation} at ${d.employer}. My educational background: ${d.education}. I am a responsible individual with strong ties to my home country, and I intend to return upon completion of my visit. ${d.travel_history ? `My travel history includes: ${d.travel_history}.` : "This will be my first international travel."}

Regarding my financial capability, ${d.financial}. I am fully prepared to meet all travel-related expenses including accommodation, transportation, and daily living costs during my stay in ${d.destination}.

${d.notes ? `Additional details:\n${d.notes}` : ""}

I sincerely request you to consider my application favourably. I assure you that I will comply with all visa terms and conditions and will return to ${d.nationality} before the expiry of my visa.

Yours sincerely,

${d.full_name}
Passport No.: ${d.passport}
Nationality: ${d.nationality}
Date: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`,
  },

  noc: {
    label: "No Objection Certificate",
    shortLabel: "NOC",
    icon: "🏢",
    description: "From employer — with embassy address",
    badge: "Employer",
    fields: ["full_name","passport","nationality","destination","embassy_address","purpose","occupation","employer","employer_address","travel_dates","issuer_name","issuer_designation","notes"],
    build: (d) => `NO OBJECTION CERTIFICATE

Date: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
Ref No.: NOC-${Date.now().toString().slice(-6)}

${d.employer}
${d.employer_address}

TO WHOMSOEVER IT MAY CONCERN

The Visa Officer
Embassy / Consulate of ${d.destination}
${d.embassy_address ? d.embassy_address : ""}

This is to certify that Mr./Ms. ${d.full_name}, holding Passport No. ${d.passport}, Nationality: ${d.nationality}, is a bonafide employee of ${d.employer}, currently serving as ${d.occupation}. The employee has been associated with our organisation in good standing and has maintained a satisfactory record throughout their tenure.

We have no objection to ${d.full_name} travelling to ${d.destination} for the purpose of ${d.purpose} during the period of ${d.travel_dates}. The employee has been duly granted leave for this purpose and all employment responsibilities have been appropriately arranged during their absence.

We confirm that ${d.full_name} will resume duties upon return from the trip. Their position and employment status will remain unchanged.

${d.notes ? `Additional Note:\n${d.notes}` : ""}

This certificate is issued on the request of the employee for visa application purposes at the Embassy / Consulate of ${d.destination}${d.embassy_address ? `, ${d.embassy_address}` : ""}, and should not be used for any other purpose.

Issued by:

${d.issuer_name}
${d.issuer_designation}
${d.employer}
Date: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}

[Company Seal / Stamp]`,
  },

  salary_certificate: {
    label: "Salary Certificate",
    shortLabel: "Salary Cert.",
    icon: "💰",
    description: "Proof of income for visa",
    badge: "Financial",
    fields: ["full_name","passport","nationality","destination","occupation","employer","employer_address","monthly_salary","joining_date","issuer_name","issuer_designation","notes"],
    build: (d) => `SALARY CERTIFICATE

Date: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
Ref No.: SAL-${Date.now().toString().slice(-6)}

${d.employer}
${d.employer_address}

TO WHOMSOEVER IT MAY CONCERN

This is to certify that Mr./Ms. ${d.full_name}, holding Passport No. ${d.passport}, Nationality: ${d.nationality}, is employed with ${d.employer} in the capacity of ${d.occupation} with effect from ${d.joining_date}.

The details of the employee's remuneration are as follows:

  Monthly Gross Salary  : ${d.monthly_salary}
  Net Take-Home Salary  : ${d.monthly_salary} (after applicable deductions)
  Nature of Employment  : Permanent / Regular Full-Time

The employee is currently in active service and their conduct, performance, and work ethic have been satisfactory throughout their tenure with us.

This certificate is issued solely for visa application purposes for travel to ${d.destination} and should not be used for any other purpose without prior written consent from ${d.employer}.

${d.notes ? `Note:\n${d.notes}` : ""}

Certified by:

${d.issuer_name}
${d.issuer_designation}
${d.employer}
Date: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}

[Company Seal / Stamp]`,
  },

  power_of_attorney: {
    label: "Power of Attorney",
    shortLabel: "POA",
    icon: "⚖️",
    description: "Legal authority document",
    badge: "Legal",
    fields: ["full_name","passport","nationality","grantor_address","attorney_name","attorney_passport","attorney_relation","attorney_address","purpose","scope","duration","notes"],
    build: (d) => `POWER OF ATTORNEY

Date: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}

KNOW ALL MEN BY THESE PRESENTS that I, ${d.full_name}, Passport No. ${d.passport}, Nationality: ${d.nationality}, residing at ${d.grantor_address} (hereinafter referred to as the "Principal"), do hereby appoint and constitute:

${d.attorney_name}
Passport / NID: ${d.attorney_passport}
Relation to Principal: ${d.attorney_relation}
Address: ${d.attorney_address}

as my true and lawful Attorney-in-Fact (hereinafter referred to as the "Attorney") to act in my name, place, and stead for the following purposes:

PURPOSE:
${d.purpose}

SCOPE OF AUTHORITY:
${d.scope}

DURATION:
This Power of Attorney shall remain valid and binding for a period of ${d.duration} from the date of execution, unless sooner revoked by the Principal by written notice to the Attorney.

${d.notes ? `ADDITIONAL TERMS AND CONDITIONS:\n${d.notes}` : ""}

I hereby ratify, confirm, and adopt all acts lawfully done by my Attorney-in-Fact in pursuance of this authority, as if personally done by me.

IN WITNESS WHEREOF, I have hereunto set my hand and seal on the date first written above.

PRINCIPAL (Grantor):                       ATTORNEY (Agent):
Name:  ${d.full_name}                      Name:  ${d.attorney_name}
Sign:  ______________________              Sign:  ______________________
Date:  ______________________              Date:  ______________________

WITNESS 1:                                 WITNESS 2:
Name:  ______________________              Name:  ______________________
Sign:  ______________________              Sign:  ______________________

[Notary Seal / Attestation / Stamp]`,
  },

  sponsor_letter: {
    label: "Sponsor Letter",
    shortLabel: "Sponsor",
    icon: "🤝",
    description: "Financial sponsor declaration",
    badge: "Sponsor",
    fields: ["full_name","passport","nationality","destination","purpose","sponsor_name","sponsor_passport","sponsor_relation","sponsor_occupation","sponsor_income","sponsor_address","travel_dates","notes"],
    build: (d) => `Date: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}

The Visa Officer
Embassy / Consulate of ${d.destination}

Subject: Sponsorship Declaration for ${d.full_name} — Visa Application to ${d.destination}

Respected Sir/Madam,

I, ${d.sponsor_name}, holding Passport / NID No. ${d.sponsor_passport}, residing at ${d.sponsor_address}, am writing this letter to formally declare my unconditional financial sponsorship for ${d.full_name} (Passport No.: ${d.passport}), who is my ${d.sponsor_relation}, in connection with their visa application for ${d.destination}.

I am currently employed as ${d.sponsor_occupation}, with a monthly/annual income of ${d.sponsor_income}. I am fully capable of and committed to bearing all expenses related to ${d.full_name}'s travel, including but not limited to air tickets, accommodation, daily living expenses, medical contingencies, and any other costs incurred during the visit to ${d.destination} during the period of ${d.travel_dates}.

I will also be providing suitable accommodation arrangements for ${d.full_name} during their stay. I take full financial and moral responsibility for ensuring that ${d.full_name} complies with all visa conditions and departs from ${d.destination} within the permitted period.

${d.notes ? `Additional Information:\n${d.notes}` : ""}

I kindly request the embassy authorities to consider this sponsorship declaration favourably. I assure you of the genuineness and sincerity of this application.

Yours faithfully,

${d.sponsor_name}
Relation: ${d.sponsor_relation} of ${d.full_name}
Passport / NID: ${d.sponsor_passport}
Address: ${d.sponsor_address}
Date: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`,
  },
};

// ─── Field Definitions ────────────────────────────────────────────────────────
const FIELD_META = {
  full_name:          { label: "Full Name",                     placeholder: "e.g. Mohammad Rahman",                      type: "text",     optional: false },
  passport:           { label: "Passport Number",               placeholder: "e.g. AA1234567",                            type: "text",     optional: false },
  nationality:        { label: "Nationality",                   placeholder: "e.g. Bangladeshi",                          type: "text",     optional: false },
  destination:        { label: "Destination Country",           placeholder: "Select destination country",                 type: "country",  optional: false },
  embassy_address:    { label: "Embassy / Consulate Address",   placeholder: "e.g. House 18, Road 137, Gulshan, Dhaka",   type: "textarea", optional: false, note: "Address of the destination country's embassy in your country" },
  purpose:            { label: "Purpose of Visit",              placeholder: "e.g. Tourism, Business, Education",         type: "text",     optional: false },
  university:         { label: "University Name",               placeholder: "e.g. University of Toronto",                type: "text",     optional: false },
  course:             { label: "Course / Program",              placeholder: "e.g. MSc Computer Science",                 type: "text",     optional: false },
  education:          { label: "Academic Background",           placeholder: "e.g. BSc in CSE from BUET, GPA 3.8",        type: "textarea", optional: false },
  work_experience:    { label: "Work Experience",               placeholder: "e.g. 2 years as Software Engineer at XYZ",  type: "textarea", optional: true  },
  why_country:        { label: "Why This Country?",             placeholder: "e.g. World-class universities, research",   type: "textarea", optional: false },
  why_course:         { label: "Why This Course?",              placeholder: "e.g. Aligns with my career goals in AI",    type: "textarea", optional: false },
  career_goal:        { label: "Career Goal After Study",       placeholder: "e.g. Return to BD, contribute to tech",    type: "textarea", optional: false },
  financial:          { label: "Financial Support",             placeholder: "e.g. Father sponsoring, BDT 15 lakh",      type: "text",     optional: false },
  travel_history:     { label: "Travel History",                placeholder: "e.g. India 2022, Malaysia 2023",            type: "text",     optional: true  },
  notes:              { label: "Additional Notes",              placeholder: "Any extra information to include",          type: "textarea", optional: true  },
  occupation:         { label: "Occupation / Designation",      placeholder: "e.g. Software Engineer",                   type: "text",     optional: false },
  employer:           { label: "Employer / Company Name",       placeholder: "e.g. ABC Technologies Ltd",                type: "text",     optional: false },
  employer_address:   { label: "Employer Address",              placeholder: "e.g. House 12, Road 3, Gulshan, Dhaka",    type: "textarea", optional: false },
  travel_dates:       { label: "Travel Dates",                  placeholder: "e.g. 01 June 2025 to 15 June 2025",        type: "text",     optional: false },
  issuer_name:        { label: "Issued By (Full Name)",         placeholder: "e.g. Mr. Kamal Hossain",                   type: "text",     optional: false },
  issuer_designation: { label: "Issuer Designation",            placeholder: "e.g. HR Manager / Director",               type: "text",     optional: false },
  monthly_salary:     { label: "Monthly Gross Salary",          placeholder: "e.g. BDT 85,000",                          type: "text",     optional: false },
  joining_date:       { label: "Date of Joining",               placeholder: "e.g. 01 January 2022",                     type: "text",     optional: false },
  grantor_address:    { label: "Your (Grantor) Address",        placeholder: "Full residential address",                  type: "textarea", optional: false },
  attorney_name:      { label: "Attorney Full Name",            placeholder: "Person receiving authority",                type: "text",     optional: false },
  attorney_passport:  { label: "Attorney Passport / NID",       placeholder: "e.g. NID 1234567890",                      type: "text",     optional: false },
  attorney_relation:  { label: "Relation to You",               placeholder: "e.g. Father, Brother, Lawyer",             type: "text",     optional: false },
  attorney_address:   { label: "Attorney Address",              placeholder: "Full address of attorney",                  type: "textarea", optional: false },
  scope:              { label: "Scope of Authority",            placeholder: "e.g. Handle property, sign documents",     type: "textarea", optional: false },
  duration:           { label: "Validity / Duration",           placeholder: "e.g. 6 months from signing date",          type: "text",     optional: false },
  sponsor_name:       { label: "Sponsor Full Name",             placeholder: "e.g. Mr. Abdul Karim",                     type: "text",     optional: false },
  sponsor_passport:   { label: "Sponsor Passport / NID",        placeholder: "e.g. NID 9876543210",                      type: "text",     optional: false },
  sponsor_relation:   { label: "Sponsor Relation",              placeholder: "e.g. Father, Uncle, Employer",             type: "text",     optional: false },
  sponsor_occupation: { label: "Sponsor Occupation",            placeholder: "e.g. Business Owner",                      type: "text",     optional: false },
  sponsor_income:     { label: "Sponsor Income",                placeholder: "e.g. Monthly BDT 1,50,000",                type: "text",     optional: false },
  sponsor_address:    { label: "Sponsor Address",               placeholder: "Full address of sponsor",                   type: "textarea", optional: false },
};

// ─── PDF Generator — Visa Express Hub / Eammu style ──────────────────────────
function generatePDF(docText, docLabel, formData, visaLabel, destCountry) {
  const dateStr   = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const shortDate = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
  const refNo     = `EAMMU-${Date.now().toString().slice(-8)}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>${docLabel} — Eammu.com</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap');
  *{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Plus Jakarta Sans','Segoe UI',sans-serif;background:#f3f4f6;print-color-adjust:exact;-webkit-print-color-adjust:exact;}
  .page{max-width:794px;margin:0 auto;background:#fff;min-height:1123px;display:flex;flex-direction:column;position:relative;}

  /* ── TOP HEADER ── */
  .header{background:#fff;border-bottom:2.5px solid #e5e7eb;padding:18px 36px;}
  .header-inner{display:flex;align-items:center;justify-content:space-between;gap:12px;}
  .logo-group{display:flex;align-items:center;gap:12px;}
  .logo-icon{width:44px;height:44px;background:linear-gradient(135deg,#14532d,#16a34a);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;box-shadow:0 4px 12px rgba(21,128,61,0.25);}
  .logo-name{font-size:20px;font-weight:900;color:#14532d;letter-spacing:-0.5px;line-height:1;}
  .logo-sub{font-size:9px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1.2px;margin-top:2px;}
  .header-center{display:flex;align-items:center;gap:10px;}
  .flag-wrap{display:flex;align-items:center;gap:6px;padding:8px 14px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;}
  .flag-img{width:28px;height:19px;object-fit:contain;border-radius:3px;box-shadow:0 1px 3px rgba(0,0,0,0.15);}
  .flag-country{font-size:11px;font-weight:800;color:#374151;}
  .flag-label{font-size:9px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.6px;}
  .doc-pill{display:flex;align-items:center;gap:7px;background:#f0fdf4;border:1.5px solid #86efac;border-radius:9px;padding:7px 14px;}
  .doc-pill-icon{font-size:15px;}
  .doc-pill-text{font-size:11px;font-weight:800;color:#15803d;}
  .powered-block{text-align:right;}
  .powered-label{font-size:9px;font-weight:600;color:#9ca3af;text-transform:uppercase;letter-spacing:0.8px;}
  .powered-name{font-size:14px;font-weight:900;color:#14532d;margin-top:1px;}
  .powered-badge{display:flex;align-items:center;gap:5px;justify-content:flex-end;margin-top:3px;}
  .iata-dot{width:16px;height:16px;background:#15803d;border-radius:50%;display:flex;align-items:center;justify-content:center;}
  .iata-inner{width:6px;height:6px;background:#fff;border-radius:50%;}
  .iata-text{font-size:9px;font-weight:800;color:#15803d;letter-spacing:0.5px;}

  /* ── TITLE BAR ── */
  .title-bar{padding:18px 36px 14px;border-bottom:1px solid #f3f4f6;}
  .title-row{display:flex;align-items:flex-end;justify-content:space-between;}
  .doc-title{font-size:20px;font-weight:900;color:#14532d;letter-spacing:-0.3px;line-height:1.1;}
  .doc-subtitle{font-size:12px;font-weight:600;color:#6b7280;margin-left:8px;}
  .meta-right{text-align:right;}
  .meta-date-label{font-size:9px;font-weight:600;color:#9ca3af;text-transform:uppercase;}
  .meta-date-val{font-size:12px;font-weight:800;color:#374151;}
  .meta-ref{font-size:9px;font-weight:600;color:#9ca3af;background:#f9fafb;border:1px solid #e5e7eb;border-radius:20px;padding:2px 10px;margin-top:4px;display:inline-block;}
  .info-chips{display:flex;align-items:center;gap:14px;flex-wrap:wrap;margin-top:8px;}
  .info-chip{font-size:10px;color:#374151;font-weight:500;}
  .info-chip b{color:#14532d;font-weight:800;}
  .visa-tag{display:inline-flex;align-items:center;gap:5px;background:#f0fdf4;border:1px solid #86efac;border-radius:20px;padding:3px 12px;font-size:10px;font-weight:800;color:#15803d;}

  /* ── BODY ── */
  .body{padding:20px 36px 32px;flex:1;}
  .disclaimer{background:#fefce8;border:1.5px solid #fde047;border-radius:10px;padding:11px 16px;display:flex;gap:10px;margin-bottom:20px;}
  .disc-icon{font-size:15px;flex-shrink:0;margin-top:1px;}
  .disc-text{font-size:10px;color:#854d0e;font-weight:500;line-height:1.6;}
  .doc-body{font-size:12px;line-height:2;color:#1f2937;white-space:pre-wrap;word-wrap:break-word;font-family:'Plus Jakarta Sans',sans-serif;}

  /* ── FOOTER ── */
  .footer{background:#14532d;padding:20px 36px;margin-top:auto;}
  .footer-inner{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;}
  .footer-brand{display:flex;align-items:center;gap:10px;}
  .footer-logo-icon{width:32px;height:32px;background:linear-gradient(135deg,#4ade80,#16a34a);border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:15px;}
  .footer-logo-name{font-size:13px;font-weight:900;color:#fff;}
  .footer-logo-sub{font-size:8.5px;color:rgba(255,255,255,0.5);font-weight:600;text-transform:uppercase;letter-spacing:0.8px;margin-top:1px;}
  .footer-center{text-align:center;}
  .footer-line{font-size:10px;color:rgba(255,255,255,0.6);line-height:1.8;}
  .footer-url{color:#4ade80;font-weight:700;}
  .footer-right{text-align:right;}
  .footer-iata{display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:8px;padding:7px 14px;}
  .footer-iata-dot{width:22px;height:22px;background:#16a34a;border-radius:50%;display:flex;align-items:center;justify-content:center;}
  .footer-iata-inner{width:8px;height:8px;background:#fff;border-radius:50%;}
  .footer-iata-text{font-size:11px;font-weight:900;color:#fff;}
  .footer-iata-sub{font-size:8px;color:rgba(255,255,255,0.5);font-weight:600;}
  .footer-ref{margin-top:5px;font-size:9px;color:rgba(255,255,255,0.3);}
  .footer-strip{margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.1);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;}
  .footer-strip-links{display:flex;gap:14px;}
  .footer-strip-link{font-size:9px;color:rgba(255,255,255,0.4);font-weight:600;}
  .footer-copy{font-size:9px;color:rgba(255,255,255,0.3);}

  @page{margin:0;size:A4;}
  @media print{body{background:#fff;}.page{box-shadow:none;max-width:100%;}}
</style>
</head>
<body>
<div class="page">

  <!-- HEADER -->
  <div class="header">
    <div class="header-inner">
      <div class="logo-group">
        <div class="logo-icon">🌿</div>
        <div>
          <div class="logo-name">Eammu.com</div>
          <div class="logo-sub">Visa · Travel · Immigration</div>
        </div>
      </div>

      <div class="header-center">
        ${destCountry ? `
        <div class="flag-wrap">
          <div>
            <div class="flag-label">Destination</div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:2px;">
              <img class="flag-img" src="${destCountry.flag}" alt="${destCountry.country}"/>
              <span class="flag-country">${destCountry.country}</span>
            </div>
          </div>
        </div>` : ""}
        <div class="doc-pill">
          <span class="doc-pill-icon">${DOCUMENT_TEMPLATES[Object.keys(DOCUMENT_TEMPLATES).find(k => DOCUMENT_TEMPLATES[k].label === docLabel)]?.icon || "📄"}</span>
          <span class="doc-pill-text">${docLabel}</span>
        </div>
      </div>

      <div class="powered-block">
        <div class="powered-label">Powered by</div>
        <div class="powered-name">Eammu Holidays</div>
        <div class="powered-badge">
          <div class="iata-dot"><div class="iata-inner"></div></div>
          <span class="iata-text">IATA Accredited</span>
        </div>
      </div>
    </div>
  </div>

  <!-- TITLE BAR -->
  <div class="title-bar">
    <div class="title-row">
      <div>
        <span class="doc-title">${docLabel}</span>
        <span class="doc-subtitle">— ${visaLabel}</span>
      </div>
      <div class="meta-right">
        <div class="meta-date-label">Generated on</div>
        <div class="meta-date-val">${shortDate}</div>
        <div class="meta-ref">Ref: ${refNo}</div>
      </div>
    </div>
    <div class="info-chips">
      ${formData.full_name  ? `<div class="info-chip">👤 <b>${formData.full_name}</b></div>` : ""}
      ${formData.passport   ? `<div class="info-chip">🛂 <b>${formData.passport}</b></div>` : ""}
      ${formData.nationality? `<div class="info-chip">🌍 <b>${formData.nationality}</b></div>` : ""}
      ${formData.destination? `<div class="info-chip">📍 To: <b>${formData.destination}</b></div>` : ""}
      <div class="visa-tag">${visaLabel}</div>
    </div>
  </div>

  <!-- BODY -->
  <div class="body">
    <div class="disclaimer">
      <div class="disc-icon">⚠️</div>
      <div class="disc-text">
        This document was generated via <strong>eammu.com</strong> for visa application support purposes. Please review all details carefully before submission. Eammu.com is not responsible for visa outcomes based on this document. Verify requirements with the official embassy of <strong>${formData.destination || "the destination country"}</strong>.
      </div>
    </div>
    <div class="doc-body">${docText.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br/>")}</div>
  </div>

  <!-- FOOTER -->
  <div class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="footer-logo-icon">🌿</div>
        <div>
          <div class="footer-logo-name">Eammu.com</div>
          <div class="footer-logo-sub">Trusted Visa & Immigration Experts</div>
        </div>
      </div>
      <div class="footer-center">
        <div class="footer-line">Bangladesh · Dubai · Armenia · Georgia</div>
        <div class="footer-line"><span class="footer-url">www.eammu.com</span> · info@eammu.com</div>
      </div>
      <div class="footer-right">
        <div class="footer-iata">
          <div class="footer-iata-dot"><div class="footer-iata-inner"></div></div>
          <div>
            <div class="footer-iata-text">IATA</div>
            <div class="footer-iata-sub">Accredited Partner</div>
          </div>
        </div>
        <div class="footer-ref">${dateStr} · Ref ${refNo}</div>
      </div>
    </div>
    <div class="footer-strip">
      <div class="footer-strip-links">
        <span class="footer-strip-link">eammu.com</span>
        <span class="footer-strip-link">Visa Services</span>
        <span class="footer-strip-link">Travel Packages</span>
        <span class="footer-strip-link">Legal & Contact</span>
      </div>
      <div class="footer-copy">© ${new Date().getFullYear()} Eammu.com · For visa application use only</div>
    </div>
  </div>

</div>
<script>window.addEventListener('load',()=>setTimeout(()=>window.print(),700));</script>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  window.open(url, "_blank");
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

// ─── Hue palette map ──────────────────────────────────────────────────────────
const HUE = {
  indigo: {
    cardBg:   "bg-indigo-50",
    border:   "border-indigo-200",
    selBg:    "bg-indigo-50 border-indigo-500",
    text:     "text-indigo-700",
    badge:    "bg-indigo-100 text-indigo-800 border-indigo-200",
    iconBg:   "bg-indigo-100",
    btn:      "bg-indigo-700 hover:bg-indigo-800 shadow-indigo-200",
    dot:      "#4f46e5",
    progress: "bg-indigo-500",
  },
  cyan: {
    cardBg:   "bg-cyan-50",
    border:   "border-cyan-200",
    selBg:    "bg-cyan-50 border-cyan-500",
    text:     "text-cyan-700",
    badge:    "bg-cyan-100 text-cyan-800 border-cyan-200",
    iconBg:   "bg-cyan-100",
    btn:      "bg-cyan-600 hover:bg-cyan-700 shadow-cyan-200",
    dot:      "#0891b2",
    progress: "bg-cyan-500",
  },
  violet: {
    cardBg:   "bg-violet-50",
    border:   "border-violet-200",
    selBg:    "bg-violet-50 border-violet-500",
    text:     "text-violet-700",
    badge:    "bg-violet-100 text-violet-800 border-violet-200",
    iconBg:   "bg-violet-100",
    btn:      "bg-violet-700 hover:bg-violet-800 shadow-violet-200",
    dot:      "#7c3aed",
    progress: "bg-violet-500",
  },
  amber: {
    cardBg:   "bg-amber-50",
    border:   "border-amber-200",
    selBg:    "bg-amber-50 border-amber-500",
    text:     "text-amber-700",
    badge:    "bg-amber-100 text-amber-800 border-amber-200",
    iconBg:   "bg-amber-100",
    btn:      "bg-amber-600 hover:bg-amber-700 shadow-amber-200",
    dot:      "#d97706",
    progress: "bg-amber-500",
  },
};

// ─── Country Dropdown ─────────────────────────────────────────────────────────
function CountryDropdown({ value, onChange, countries, loading, placeholder = "Select country…" }) {
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

  const selected = countries.find(c => c.country === value);

  return (
    <div ref={ref} className="relative">
      <button type="button" onClick={() => !loading && setOpen(v => !v)}
        className="w-full flex items-center gap-2.5 px-4 py-3 bg-white border-2 border-slate-200 hover:border-green-400 rounded-2xl text-sm font-semibold transition-all outline-none text-left shadow-sm">
        {loading ? <span className="text-slate-400">Loading countries…</span>
          : selected ? (
          <>
            <img src={selected.flag} width={24} height={16} className="object-contain rounded flex-shrink-0 shadow-sm" alt="" />
            <span className="text-slate-800 font-bold">{selected.country}</span>
          </>
        ) : <span className="text-slate-400">{placeholder}</span>}
        <svg className={`w-4 h-4 ml-auto text-slate-400 flex-shrink-0 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && !loading && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1.5 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden" style={{boxShadow:"0 20px 60px rgba(0,0,0,0.15)"}}>
          <div className="p-2.5 border-b border-slate-100 bg-slate-50">
            <input autoFocus value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search country…"
              className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none placeholder-slate-400 focus:border-green-400 transition-colors" />
          </div>
          <ul className="max-h-56 overflow-y-auto">
            {filtered.length === 0 ? (
              <li className="px-4 py-5 text-sm text-slate-400 text-center">No results</li>
            ) : filtered.map(c => (
              <li key={c.code} onClick={() => { onChange(c); setOpen(false); setSearch(""); }}
                className={`flex items-center gap-2.5 px-4 py-2.5 cursor-pointer text-sm transition-all hover:bg-green-50 ${value === c.country ? "bg-green-50 text-green-800 font-bold" : "text-slate-700"}`}>
                <img src={c.flag} width={22} height={15} className="object-contain rounded flex-shrink-0 shadow-sm" alt="" />
                <span className="flex-1">{c.country}</span>
                {value === c.country && <span className="text-green-600 font-black text-xs">✓</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ─── Field Renderer ───────────────────────────────────────────────────────────
function FieldRenderer({ field, formData, setFormData, countries, countriesLoading }) {
  const meta = FIELD_META[field];
  if (!meta) return null;
  const val    = formData[field] || "";
  const hasVal = val.trim().length > 0;

  const base = "w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 focus:border-green-500 focus:bg-white rounded-2xl text-sm text-slate-900 placeholder-slate-400 outline-none transition-all";

  return (
    <div className={meta.type === "textarea" || meta.type === "country" ? "sm:col-span-2" : ""}>
      <label className="flex items-center gap-1.5 text-[11px] font-black text-slate-600 uppercase tracking-[0.08em] mb-1.5">
        {meta.label}
        {meta.optional
          ? <span className="text-slate-400 normal-case font-normal text-[10px]">(optional)</span>
          : <span className="text-red-400">*</span>}
        {hasVal && <span className="ml-auto text-green-500 text-xs font-bold">✓</span>}
      </label>
      {meta.note && <p className="text-[10px] text-blue-600 font-semibold mb-1.5 bg-blue-50 border border-blue-100 rounded-lg px-2.5 py-1">ℹ️ {meta.note}</p>}
      {meta.type === "country" && (
        <CountryDropdown
          value={formData[field] || ""}
          onChange={(c) => setFormData(p => ({ ...p, [field]: c.country }))}
          countries={countries}
          loading={countriesLoading}
          placeholder={meta.placeholder}
        />
      )}
      {meta.type === "textarea" && (
        <textarea value={val} onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))}
          placeholder={meta.placeholder} rows={3} className={`${base} resize-y`} />
      )}
      {meta.type === "text" && (
        <input type="text" value={val} onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))}
          placeholder={meta.placeholder} className={base} />
      )}
    </div>
  );
}

// ─── Progress Steps ───────────────────────────────────────────────────────────
function ProgressSteps({ step }) {
  const steps = [
    { n: 1, label: "Visa Type",     icon: "🎯" },
    { n: 2, label: "Document",      icon: "📄" },
    { n: 3, label: "Your Details",  icon: "✍️" },
    { n: 4, label: "Download",      icon: "⬇️" },
  ];
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((s, i) => (
        <div key={s.n} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-black border-2 transition-all duration-300 ${
              step > s.n  ? "bg-green-700 border-green-700 text-white shadow-md"
              : step === s.n ? "bg-white border-green-600 text-green-700 shadow-xl ring-4 ring-green-100"
              : "bg-white border-slate-200 text-slate-400"
            }`}>
              {step > s.n ? "✓" : s.icon}
            </div>
            <span className={`text-[10px] font-bold hidden sm:block text-center leading-tight max-w-[56px] ${step >= s.n ? "text-green-700" : "text-slate-400"}`}>
              {s.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-10 sm:w-16 h-0.5 mx-1.5 mb-4 rounded-full transition-all duration-500 ${step > s.n ? "bg-green-600" : "bg-slate-200"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DocumentGenerator() {
  // ── countries from MongoDB ──
  const [countries,        setCountries]        = useState([]);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [countriesError,   setCountriesError]   = useState(null);

  useEffect(() => {
    (async () => {
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
    })();
  }, []);

  const [step,         setStep]         = useState(1);
  const [visaType,     setVisaType]     = useState(null);
  const [selectedDoc,  setSelectedDoc]  = useState(null);
  const [formData,     setFormData]     = useState({});
  const [generatedDoc, setGeneratedDoc] = useState("");
  const [editedDoc,    setEditedDoc]    = useState("");
  const [isEditing,    setIsEditing]    = useState(false);
  const [error,        setError]        = useState("");
  const [copied,       setCopied]       = useState(false);
  const [hoveredVisa,  setHoveredVisa]  = useState(null);

  const visa         = visaType ? VISA_TYPES[visaType] : null;
  const template     = selectedDoc ? DOCUMENT_TEMPLATES[selectedDoc] : null;
  const palette      = visa ? HUE[visa.hue] : HUE.indigo;
  const displayDoc   = editedDoc || generatedDoc;
  const destCountry  = countries.find(c => c.country === formData.destination) || null;

  const handleGenerate = () => {
    if (!template) return;
    const missing = template.fields.filter(f => {
      const meta = FIELD_META[f];
      if (!meta || meta.optional) return false;
      return !formData[f]?.trim();
    });
    if (missing.length > 0) {
      setError(`Please fill: ${missing.map(f => FIELD_META[f]?.label).join(" · ")}`);
      return;
    }
    setError("");
    const doc = template.build(formData);
    setGeneratedDoc(doc);
    setEditedDoc(doc);
    setIsEditing(false);
    setStep(4);
  };

  const handleDownloadPDF = () => generatePDF(displayDoc, template?.label, formData, visa?.label || "", destCountry);

  const handleDownloadTxt = () => {
    const content = `${template?.label?.toUpperCase()}\n${"=".repeat(60)}\nVisa Type: ${visa?.label}\nGenerated: ${new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}\neammu.com — Trusted Visa, Travel & Immigration Experts\n${"=".repeat(60)}\n\n${displayDoc}`;
    const blob = new Blob([content], { type:"text/plain;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement("a"), { href:url, download:`eammu-${selectedDoc}-${(formData.full_name||"document").replace(/\s+/g,"-").toLowerCase()}.txt` });
    a.click(); URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(displayDoc);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const resetAll = () => {
    setStep(1); setVisaType(null); setSelectedDoc(null); setFormData({});
    setGeneratedDoc(""); setEditedDoc(""); setIsEditing(false); setError("");
  };

  return (
    <div className="min-h-screen py-16 px-4" style={{background:"linear-gradient(160deg,#f0fdf4 0%,#fafffe 40%,#f0f9ff 100%)"}}>
      <div className="max-w-3xl mx-auto">

        {/* ══ HEADER ══ */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-green-800 text-white text-[10px] font-black uppercase tracking-[0.15em] px-5 py-2 rounded-full mb-5 shadow-lg shadow-green-900/20">
            <span>📄</span> Free Tool · Eammu.com
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 mb-3 tracking-tight leading-[1.05]">
            Visa Document<br/>
            <span style={{background:"linear-gradient(90deg,#14532d,#16a34a)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>
              Generator
            </span>
          </h1>
          <p className="text-slate-500 text-base max-w-sm mx-auto leading-relaxed">
            Embassy-ready documents tailored to your visa type — generated in seconds
          </p>
          {countriesError && (
            <div className="mt-4 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold px-4 py-2 rounded-xl">
              ⚠️ Could not load countries ({countriesError}) — please refresh
            </div>
          )}
        </div>

        <ProgressSteps step={step} />

        {/* ══ STEP 1 — Visa Type ══ */}
        {step === 1 && (
          <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-xl shadow-slate-100/60">
            <div className="mb-7">
              <h2 className="text-xl font-black text-slate-900 mb-1">What visa are you applying for?</h2>
              <p className="text-sm text-slate-500">We'll recommend the right documents for your situation</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
              {Object.entries(VISA_TYPES).map(([key, vt]) => {
                const c = HUE[vt.hue];
                const isHov = hoveredVisa === key;
                return (
                  <button key={key} type="button"
                    onMouseEnter={() => setHoveredVisa(key)}
                    onMouseLeave={() => setHoveredVisa(null)}
                    onClick={() => { setVisaType(key); setStep(2); }}
                    className={`relative text-left p-5 rounded-2xl border-2 bg-white transition-all duration-200 ${isHov ? `border-current ${c.text} shadow-xl -translate-y-0.5` : "border-slate-200"}`}
                    style={isHov ? {borderColor:c.dot,boxShadow:`0 12px 40px ${c.dot}22`} : {}}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 border transition-all ${isHov ? c.cardBg + " " + c.border : "bg-slate-50 border-slate-200"}`}>
                        {vt.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-black text-slate-900 text-sm mb-0.5">{vt.label}</div>
                        <div className="text-xs text-slate-500 mb-3 leading-snug">{vt.tagline}</div>
                        <div className="flex flex-wrap gap-1.5">
                          {vt.recommended.slice(0, 3).map(dk => (
                            <span key={dk} className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${isHov ? c.badge : "bg-slate-100 text-slate-500 border-slate-200"}`}>
                              {DOCUMENT_TEMPLATES[dk]?.shortLabel}
                            </span>
                          ))}
                          {vt.recommended.length > 3 && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full border border-slate-200 text-slate-400">
                              +{vt.recommended.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Arrow indicator */}
                    <div className={`absolute top-4 right-4 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${isHov ? "border-current bg-white" : "border-slate-200"}`} style={isHov ? {borderColor:c.dot,color:c.dot} : {}}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>
            <div className="grid grid-cols-3 gap-3 pt-5 border-t border-slate-100">
              {[
                { icon:"⚡", t:"Instant",       s:"Generated locally" },
                { icon:"🔒", t:"100% Private",  s:"No data uploaded"  },
                { icon:"📋", t:"PDF Ready",      s:"Print quality"    },
              ].map((c, i) => (
                <div key={i} className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-xl mb-1.5">{c.icon}</div>
                  <div className="text-xs font-black text-slate-700">{c.t}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{c.s}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ STEP 2 — Select Document ══ */}
        {step === 2 && visa && (
          <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-xl shadow-slate-100/60">
            {/* Visa context */}
            <div className={`flex items-center gap-3 p-4 rounded-2xl border-2 mb-7 ${palette.cardBg} ${palette.border}`}>
              <span className="text-3xl flex-shrink-0">{visa.icon}</span>
              <div className="flex-1">
                <div className={`font-black text-sm ${palette.text}`}>{visa.label}</div>
                <div className="text-xs text-slate-600 mt-0.5 leading-snug">{visa.tip}</div>
              </div>
              <button type="button" onClick={() => setStep(1)}
                className="px-3 py-1.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:border-slate-400 rounded-xl transition-all">
                ← Change
              </button>
            </div>

            <h2 className="text-lg font-black text-slate-900 mb-1">Select document to generate</h2>
            <p className="text-sm text-slate-500 mb-6">Recommended for {visa.label} are highlighted</p>

            {/* Recommended */}
            <div className="mb-6">
              <div className={`text-[10px] font-black uppercase tracking-[0.12em] ${palette.text} mb-3 flex items-center gap-2`}>
                <span className={`w-2 h-2 rounded-full`} style={{background:palette.dot}}></span>
                Recommended for {visa.label}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {visa.recommended.map(key => {
                  const tpl = DOCUMENT_TEMPLATES[key];
                  if (!tpl) return null;
                  return (
                    <button key={key} type="button"
                      onClick={() => { setSelectedDoc(key); setFormData({}); setStep(3); setError(""); }}
                      className={`group text-left p-4 rounded-2xl border-2 bg-white hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 ${palette.border} hover:${palette.selBg}`}
                      style={{borderColor:`${palette.dot}55`}}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${palette.iconBg}`}>{tpl.icon}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-black text-slate-900 text-sm">{tpl.label}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{tpl.description}</div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all`} style={{borderColor:palette.dot,color:palette.dot}}>
                          <svg width="8" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Other documents */}
            {Object.entries(DOCUMENT_TEMPLATES).filter(([k]) => !visa.recommended.includes(k)).length > 0 && (
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                  Other documents
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(DOCUMENT_TEMPLATES).filter(([k]) => !visa.recommended.includes(k)).map(([key, tpl]) => (
                    <button key={key} type="button"
                      onClick={() => { setSelectedDoc(key); setFormData({}); setStep(3); setError(""); }}
                      className="group text-left p-4 rounded-2xl border-2 border-slate-200 bg-white hover:border-slate-400 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-slate-50">{tpl.icon}</div>
                        <div>
                          <div className="font-black text-slate-800 text-sm">{tpl.label}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{tpl.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ STEP 3 — Fill Form ══ */}
        {step === 3 && template && visa && (
          <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-xl shadow-slate-100/60">
            {/* Context bar */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 border ${palette.iconBg} ${palette.border}`}>
                  {template.icon}
                </div>
                <div>
                  <div className="text-base font-black text-slate-900">{template.label}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${palette.badge}`}>{visa.icon} {visa.label}</span>
                    <span className="text-xs text-slate-400">{template.description}</span>
                  </div>
                </div>
              </div>
              <button type="button" onClick={() => setStep(2)} className="px-3 py-2 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all">
                ← Change
              </button>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-5 mb-6 text-xs text-slate-500 bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-100">
              <span><span className="text-red-400 font-black">*</span> Required</span>
              <span><span className="text-slate-400">(optional)</span> Can skip</span>
              <span className="text-green-600 font-bold ml-auto">✓ = Filled</span>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
              {template.fields.map(field => (
                <FieldRenderer key={field} field={field} formData={formData} setFormData={setFormData}
                  countries={countries} countriesLoading={countriesLoading} />
              ))}
            </div>

            {error && (
              <div className="mt-5 flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-2xl px-4 py-3.5 text-sm text-red-700">
                <span className="text-lg flex-shrink-0">⚠️</span>
                <span className="font-semibold">{error}</span>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => setStep(2)}
                className="px-5 py-3.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-2xl transition-all">
                ← Back
              </button>
              <button type="button" onClick={handleGenerate}
                className={`flex-1 py-3.5 text-white font-black text-base rounded-2xl transition-all shadow-xl active:scale-[0.99] flex items-center justify-center gap-2 ${palette.btn}`}>
                ✨ Generate Document
              </button>
            </div>
            <p className="text-center text-xs text-slate-400 mt-3">No API · Instant · Free · 100% Private</p>
          </div>
        )}

        {/* ══ STEP 4 — Result ══ */}
        {step === 4 && template && visa && (
          <div className="space-y-4">
            <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-xl shadow-slate-100/60">

              {/* Result header */}
              <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 border ${palette.iconBg} ${palette.border}`}>
                    {template.icon}
                  </div>
                  <div>
                    <div className="text-lg font-black text-slate-900">{template.label}</div>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border ${palette.badge}`}>{visa.icon} {visa.label}</span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-green-100 text-green-800 text-[10px] font-black rounded-full border border-green-200">✅ Ready</span>
                    </div>
                    {(formData.full_name || formData.destination) && (
                      <div className="text-xs text-slate-500 mt-1">
                        {[formData.full_name, formData.destination].filter(Boolean).join(" · ")}
                      </div>
                    )}
                  </div>
                </div>
                <button type="button" onClick={resetAll}
                  className="px-4 py-2 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all">
                  + New Doc
                </button>
              </div>

              {/* Action bar */}
              <div className="flex flex-wrap gap-2 mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <button type="button" onClick={handleDownloadPDF}
                  className={`flex items-center gap-2 px-5 py-2.5 text-white font-black text-sm rounded-xl transition-all shadow-lg ${palette.btn}`}>
                  📄 Download PDF
                </button>
                <button type="button" onClick={() => setIsEditing(e => !e)}
                  className={`flex items-center gap-2 px-4 py-2.5 font-bold text-sm rounded-xl transition-all ${
                    isEditing ? "bg-amber-400 hover:bg-amber-500 text-white shadow-md" : "bg-white border border-slate-300 hover:border-amber-400 text-slate-700 hover:text-amber-700"
                  }`}>
                  {isEditing ? "👁 Preview" : "✏️ Edit"}
                </button>
                <button type="button" onClick={handleDownloadTxt}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 hover:border-green-500 hover:text-green-700 text-slate-700 font-semibold text-sm rounded-xl transition-all">
                  ⬇️ TXT
                </button>
                <button type="button" onClick={handleCopy}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 hover:border-green-500 hover:text-green-700 text-slate-700 font-semibold text-sm rounded-xl transition-all">
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
                <button type="button" onClick={() => setStep(3)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 font-semibold text-sm rounded-xl transition-all sm:ml-auto">
                  🔄 Edit Info
                </button>
              </div>

              {isEditing && (
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 mb-4 text-sm text-amber-800 font-semibold">
                  ✏️ Edit mode — changes will appear in your downloaded PDF
                </div>
              )}

              {/* Document preview */}
              <div className={`rounded-2xl border-2 overflow-hidden transition-all ${isEditing ? "border-amber-400 shadow-lg shadow-amber-100" : "border-slate-200"}`}>
                <div className={`px-5 py-3 flex items-center gap-2 border-b ${isEditing ? "bg-amber-50 border-amber-200" : "bg-slate-50 border-slate-200"}`}>
                  <span>{template.icon}</span>
                  <span className="text-xs font-black text-slate-600">{template.label}</span>
                  {destCountry && (
                    <div className="flex items-center gap-1.5 ml-2">
                      <img src={destCountry.flag} width={18} height={13} className="object-contain rounded shadow-sm" alt="" />
                      <span className="text-xs font-bold text-slate-500">{destCountry.country}</span>
                    </div>
                  )}
                  <span className={`ml-auto text-[10px] font-black px-2.5 py-0.5 rounded-full border ${palette.badge}`}>{visa.label}</span>
                </div>
                {isEditing ? (
                  <textarea value={editedDoc} onChange={e => setEditedDoc(e.target.value)}
                    className="w-full min-h-[420px] px-6 py-5 bg-white text-sm text-slate-900 outline-none resize-y"
                    style={{fontFamily:"'Georgia', 'Times New Roman', serif", lineHeight:"1.95"}} />
                ) : (
                  <div className="px-6 py-5 bg-white text-sm text-slate-900 whitespace-pre-wrap break-words min-h-[280px]"
                    style={{fontFamily:"'Georgia', 'Times New Roman', serif", lineHeight:"1.95"}}>
                    {displayDoc}
                  </div>
                )}
              </div>

              {/* Bottom actions */}
              <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-slate-100">
                <button type="button" onClick={() => setStep(2)}
                  className="px-4 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all">
                  ← Different Doc
                </button>
                <button type="button" onClick={resetAll}
                  className="px-4 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all">
                  + New Document
                </button>
                <button type="button" onClick={handleDownloadPDF}
                  className={`ml-auto flex items-center gap-2 px-6 py-2.5 text-sm font-black text-white rounded-xl transition-all shadow-lg ${palette.btn}`}>
                  📄 Download PDF →
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-3xl p-7 text-center relative overflow-hidden" style={{background:"linear-gradient(135deg,#052e16 0%,#14532d 55%,#16a34a 100%)"}}>
              <div className="absolute top-0 right-0 w-52 h-52 rounded-full opacity-10" style={{background:"radial-gradient(circle,#4ade80,transparent)",transform:"translate(30%,-30%)"}} />
              <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full opacity-10" style={{background:"radial-gradient(circle,#86efac,transparent)",transform:"translate(-30%,30%)"}} />
              <div className="relative z-10">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="font-black text-xl text-white mb-2">Need an expert review?</h3>
                <p className="text-green-300 text-sm mb-5 max-w-xs mx-auto leading-relaxed">
                  Our Eammu consultants will review, attest & submit your documents for you
                </p>
                <a href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black text-sm rounded-2xl transition-all shadow-xl shadow-yellow-900/30">
                  Get Expert Help →
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}