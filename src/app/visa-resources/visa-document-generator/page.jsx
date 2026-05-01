"use client";
import { useState } from "react";

// ─── Country data (inline subset for portability) ───────────────────────────
// Replace with your real `countries` import in production
import countries from "@/app/data/countries";

// ─── Visa Types ──────────────────────────────────────────────────────────────
const VISA_TYPES = {
  student: {
    label: "Student Visa",
    icon: "🎓",
    color: "emerald",
    tagline: "University & college admissions abroad",
    recommended: ["sop", "cover_letter", "noc", "salary_certificate", "sponsor_letter"],
    tip: "A strong SOP and sponsor letter are the most critical documents for student visa approval.",
  },
  tourist: {
    label: "Tourist Visa",
    icon: "✈️",
    color: "sky",
    tagline: "Travel, leisure & holiday trips",
    recommended: ["cover_letter", "sponsor_letter", "salary_certificate", "noc"],
    tip: "A clear cover letter with strong financial proof significantly improves tourist visa success.",
  },
  work: {
    label: "Work Visa",
    icon: "💼",
    color: "violet",
    tagline: "Employment & professional relocation",
    recommended: ["cover_letter", "noc", "salary_certificate", "power_of_attorney"],
    tip: "An NOC from your current employer and a detailed cover letter are essential for work visas.",
  },
  business: {
    label: "Business Visa",
    icon: "🤝",
    color: "amber",
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
    description: "From employer or institution",
    badge: "Employer",
    fields: ["full_name","passport","nationality","destination","purpose","occupation","employer","employer_address","travel_dates","issuer_name","issuer_designation","notes"],
    build: (d) => `NO OBJECTION CERTIFICATE

Date: ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
Ref No.: NOC-${Date.now().toString().slice(-6)}

${d.employer}
${d.employer_address}

TO WHOMSOEVER IT MAY CONCERN

This is to certify that Mr./Ms. ${d.full_name}, holding Passport No. ${d.passport}, is a bonafide employee of ${d.employer}, currently serving as ${d.occupation}. The employee has been associated with our organisation in good standing and has maintained a satisfactory record throughout their tenure.

We have no objection to ${d.full_name} travelling to ${d.destination} for the purpose of ${d.purpose} during the period of ${d.travel_dates}. The employee has been duly granted leave for this purpose and all employment responsibilities have been appropriately arranged during their absence.

We confirm that ${d.full_name} will resume duties upon return from the trip. Their position and employment status will remain unchanged.

${d.notes ? `Additional Note:\n${d.notes}` : ""}

This certificate is issued on the request of the employee for visa application purposes only and should not be used for any other purpose.

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
  full_name:          { label: "Full Name",                 placeholder: "e.g. Mohammad Rahman",                     type: "text",     optional: false },
  passport:           { label: "Passport Number",           placeholder: "e.g. AA1234567",                           type: "text",     optional: false },
  nationality:        { label: "Nationality",               placeholder: "e.g. Bangladeshi",                         type: "text",     optional: false },
  destination:        { label: "Destination Country",       placeholder: "Select destination country",                type: "country",  optional: false },
  purpose:            { label: "Purpose of Visit",          placeholder: "e.g. Tourism, Business, Education",        type: "text",     optional: false },
  university:         { label: "University Name",           placeholder: "e.g. University of Toronto",               type: "text",     optional: false },
  course:             { label: "Course / Program",          placeholder: "e.g. MSc Computer Science",                type: "text",     optional: false },
  education:          { label: "Academic Background",       placeholder: "e.g. BSc in CSE from BUET, GPA 3.8",       type: "textarea", optional: false },
  work_experience:    { label: "Work Experience",           placeholder: "e.g. 2 years as Software Engineer at XYZ", type: "textarea", optional: true  },
  why_country:        { label: "Why This Country?",         placeholder: "e.g. World-class universities, research",  type: "textarea", optional: false },
  why_course:         { label: "Why This Course?",          placeholder: "e.g. Aligns with my career goals in AI",   type: "textarea", optional: false },
  career_goal:        { label: "Career Goal After Study",   placeholder: "e.g. Return to BD, contribute to tech",   type: "textarea", optional: false },
  financial:          { label: "Financial Support",         placeholder: "e.g. Father sponsoring, BDT 15 lakh",     type: "text",     optional: false },
  travel_history:     { label: "Travel History",            placeholder: "e.g. India 2022, Malaysia 2023",           type: "text",     optional: true  },
  notes:              { label: "Additional Notes",          placeholder: "Any extra information to include",         type: "textarea", optional: true  },
  occupation:         { label: "Occupation / Designation",  placeholder: "e.g. Software Engineer",                  type: "text",     optional: false },
  employer:           { label: "Employer / Company Name",   placeholder: "e.g. ABC Technologies Ltd",               type: "text",     optional: false },
  employer_address:   { label: "Employer Address",          placeholder: "e.g. House 12, Road 3, Gulshan, Dhaka",   type: "textarea", optional: false },
  travel_dates:       { label: "Travel Dates",              placeholder: "e.g. 01 June 2025 to 15 June 2025",       type: "text",     optional: false },
  issuer_name:        { label: "Issued By (Full Name)",     placeholder: "e.g. Mr. Kamal Hossain",                  type: "text",     optional: false },
  issuer_designation: { label: "Issuer Designation",        placeholder: "e.g. HR Manager / Director",              type: "text",     optional: false },
  monthly_salary:     { label: "Monthly Gross Salary",      placeholder: "e.g. BDT 85,000",                         type: "text",     optional: false },
  joining_date:       { label: "Date of Joining",           placeholder: "e.g. 01 January 2022",                    type: "text",     optional: false },
  grantor_address:    { label: "Your (Grantor) Address",    placeholder: "Full residential address",                 type: "textarea", optional: false },
  attorney_name:      { label: "Attorney Full Name",        placeholder: "Person receiving authority",               type: "text",     optional: false },
  attorney_passport:  { label: "Attorney Passport / NID",   placeholder: "e.g. NID 1234567890",                     type: "text",     optional: false },
  attorney_relation:  { label: "Relation to You",           placeholder: "e.g. Father, Brother, Lawyer",            type: "text",     optional: false },
  attorney_address:   { label: "Attorney Address",          placeholder: "Full address of attorney",                 type: "textarea", optional: false },
  scope:              { label: "Scope of Authority",        placeholder: "e.g. Handle property, sign documents",    type: "textarea", optional: false },
  duration:           { label: "Validity / Duration",       placeholder: "e.g. 6 months from signing date",         type: "text",     optional: false },
  sponsor_name:       { label: "Sponsor Full Name",         placeholder: "e.g. Mr. Abdul Karim",                    type: "text",     optional: false },
  sponsor_passport:   { label: "Sponsor Passport / NID",    placeholder: "e.g. NID 9876543210",                     type: "text",     optional: false },
  sponsor_relation:   { label: "Sponsor Relation",          placeholder: "e.g. Father, Uncle, Employer",            type: "text",     optional: false },
  sponsor_occupation: { label: "Sponsor Occupation",        placeholder: "e.g. Business Owner",                     type: "text",     optional: false },
  sponsor_income:     { label: "Sponsor Income",            placeholder: "e.g. Monthly BDT 1,50,000",               type: "text",     optional: false },
  sponsor_address:    { label: "Sponsor Address",           placeholder: "Full address of sponsor",                  type: "textarea", optional: false },
};

// ─── PDF Generator ────────────────────────────────────────────────────────────
function generatePDF(docText, docLabel, formData, visaLabel) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<title>${docLabel} - Eammu.com</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Montserrat:wght@600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Libre Baskerville', 'Times New Roman', serif; background: #fff; color: #1a1a1a; }
  .page { max-width: 794px; margin: 0 auto; padding: 60px 70px; min-height: 1123px; position: relative; }
  .letterhead { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 20px; border-bottom: 3px solid #15803d; margin-bottom: 32px; }
  .brand-name { font-family: 'Montserrat', sans-serif; font-size: 22pt; font-weight: 700; color: #14532d; letter-spacing: -0.5px; }
  .brand-tagline { font-size: 8.5pt; color: #6b7280; margin-top: 3px; }
  .doc-meta { text-align: right; font-size: 9pt; color: #6b7280; line-height: 1.6; }
  .doc-meta strong { color: #374151; }
  .watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%) rotate(-35deg); font-size: 80pt; color: rgba(21,128,61,0.04); font-family: 'Montserrat', sans-serif; font-weight: 700; white-space: nowrap; pointer-events: none; z-index: 0; }
  .doc-title-block { text-align: center; margin-bottom: 28px; }
  .doc-title { font-family: 'Montserrat', sans-serif; font-size: 13pt; font-weight: 700; color: #14532d; letter-spacing: 2px; text-transform: uppercase; display: inline-block; border-bottom: 2px solid #16a34a; padding-bottom: 6px; }
  .visa-badge { display: inline-block; margin-top: 8px; font-size: 8pt; font-family: 'Montserrat', sans-serif; font-weight: 600; background: #f0fdf4; border: 1px solid #86efac; color: #166534; padding: 3px 12px; border-radius: 20px; letter-spacing: 1px; text-transform: uppercase; }
  .doc-body { font-size: 11.5pt; line-height: 1.95; color: #1f2937; white-space: pre-wrap; word-wrap: break-word; text-align: justify; position: relative; z-index: 1; }
  .info-bar { display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 28px; padding: 12px 16px; background: #f0fdf4; border-radius: 8px; border-left: 4px solid #16a34a; }
  .info-chip { font-size: 9pt; color: #374151; }
  .info-chip strong { color: #14532d; }
  .footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center; }
  .footer-left { font-size: 8.5pt; color: #9ca3af; }
  .footer-right { font-size: 8.5pt; color: #9ca3af; text-align: right; }
  .footer-brand { font-family: 'Montserrat', sans-serif; font-weight: 700; color: #15803d; }
  @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } .page { padding: 40px 50px; } @page { margin: 0; size: A4; } }
</style>
</head>
<body>
<div class="watermark">EAMMU</div>
<div class="page">
  <div class="letterhead">
    <div>
      <div class="brand-name">Eammu.com</div>
      <div class="brand-tagline">Trusted Visa, Travel &amp; Immigration Experts<br/>Bangladesh • Dubai • Armenia • Georgia</div>
    </div>
    <div class="doc-meta">
      <strong>Date:</strong> ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}<br/>
      <strong>Ref:</strong> EAMMU-${Date.now().toString().slice(-6)}<br/>
      <strong>Visa Type:</strong> ${visaLabel}
    </div>
  </div>
  <div class="doc-title-block">
    <div class="doc-title">${docLabel}</div><br/>
    <span class="visa-badge">For ${visaLabel}</span>
  </div>
  <div class="info-bar">
    ${formData.full_name ? `<div class="info-chip"><strong>Applicant:</strong> ${formData.full_name}</div>` : ""}
    ${formData.passport ? `<div class="info-chip"><strong>Passport:</strong> ${formData.passport}</div>` : ""}
    ${formData.nationality ? `<div class="info-chip"><strong>Nationality:</strong> ${formData.nationality}</div>` : ""}
    ${formData.destination ? `<div class="info-chip"><strong>Destination:</strong> ${formData.destination}</div>` : ""}
  </div>
  <div class="doc-body">${docText.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br/>")}</div>
  <div class="footer">
    <div class="footer-left">Generated via <span class="footer-brand">eammu.com</span> | info@eammu.com</div>
    <div class="footer-right">© ${new Date().getFullYear()} Eammu.com</div>
  </div>
</div>
<script>window.onload = function(){ window.print(); }</script>
</body>
</html>`;
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  window.open(url, "_blank");
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

// ─── Color maps ───────────────────────────────────────────────────────────────
const COLOR = {
  emerald: { bg: "bg-emerald-50", border: "border-emerald-400", text: "text-emerald-700", badge: "bg-emerald-100 text-emerald-800 border-emerald-200", btn: "bg-emerald-700 hover:bg-emerald-800", ring: "ring-emerald-200", selBorder: "border-emerald-500 bg-emerald-50" },
  sky:     { bg: "bg-sky-50",     border: "border-sky-400",     text: "text-sky-700",     badge: "bg-sky-100 text-sky-800 border-sky-200",             btn: "bg-sky-600 hover:bg-sky-700",       ring: "ring-sky-200",     selBorder: "border-sky-500 bg-sky-50"     },
  violet:  { bg: "bg-violet-50",  border: "border-violet-400",  text: "text-violet-700",  badge: "bg-violet-100 text-violet-800 border-violet-200",     btn: "bg-violet-700 hover:bg-violet-800", ring: "ring-violet-200",  selBorder: "border-violet-500 bg-violet-50" },
  amber:   { bg: "bg-amber-50",   border: "border-amber-400",   text: "text-amber-700",   badge: "bg-amber-100 text-amber-800 border-amber-200",        btn: "bg-amber-600 hover:bg-amber-700",   ring: "ring-amber-200",   selBorder: "border-amber-500 bg-amber-50"  },
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DocumentGenerator() {
  const [step,          setStep]          = useState(1);  // 1=visa, 2=doc, 3=form, 4=result
  const [visaType,      setVisaType]      = useState(null);
  const [selectedDoc,   setSelectedDoc]   = useState(null);
  const [formData,      setFormData]      = useState({});
  const [generatedDoc,  setGeneratedDoc]  = useState("");
  const [editedDoc,     setEditedDoc]     = useState("");
  const [isEditing,     setIsEditing]     = useState(false);
  const [error,         setError]         = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [countryOpen,   setCountryOpen]   = useState(false);
  const [copied,        setCopied]        = useState(false);

  const visa     = visaType ? VISA_TYPES[visaType] : null;
  const template = selectedDoc ? DOCUMENT_TEMPLATES[selectedDoc] : null;
  const palette  = visa ? COLOR[visa.color] : COLOR.emerald;
  const displayDoc = editedDoc || generatedDoc;
  const filteredCountries = countries.filter(c =>
    c.country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const inputCls = "w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition-all";

  const handleGenerate = () => {
    if (!template) return;
    const missing = template.fields.filter(f => {
      const meta = FIELD_META[f];
      if (!meta || meta.optional) return false;
      return !formData[f]?.trim();
    });
    if (missing.length > 0) {
      setError(`Please fill in: ${missing.map(f => FIELD_META[f]?.label).join(", ")}`);
      return;
    }
    setError("");
    const doc = template.build(formData);
    setGeneratedDoc(doc);
    setEditedDoc(doc);
    setIsEditing(false);
    setStep(4);
  };

  const handleDownloadPDF = () => generatePDF(displayDoc, template?.label, formData, visa?.label || "");

  const handleDownloadTxt = () => {
    const content = `${template?.label?.toUpperCase()}\n${"=".repeat(60)}\nVisa Type: ${visa?.label}\nGenerated by Eammu.com | ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}\n${"=".repeat(60)}\n\n${displayDoc}\n\n${"=".repeat(60)}\neammu.com — Trusted Visa, Travel & Immigration Experts`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `eammu-${selectedDoc}-${(formData.full_name || "document").replace(/\s+/g, "-").toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(displayDoc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAll = () => {
    setStep(1); setVisaType(null); setSelectedDoc(null); setFormData({});
    setGeneratedDoc(""); setEditedDoc(""); setIsEditing(false); setError("");
  };

  // ── Step labels ──
  const steps = [
    { n: 1, label: "Visa Type"    },
    { n: 2, label: "Document"     },
    { n: 3, label: "Your Details" },
    { n: 4, label: "Download"     },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50/30 py-20 px-4">
      <div className="max-w-3xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-1.5 bg-green-100 border border-green-200 text-green-800 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4">
            📄 Free Tool · Eammu.com
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Visa Document <span className="text-green-700">Generator</span>
          </h1>
          <p className="text-gray-500 text-base max-w-lg mx-auto">
            Embassy-ready documents in under 2 minutes — tailored to your visa type
          </p>
        </div>

        {/* ── Step Progress Bar ── */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((s, i) => (
            <div key={s.n} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                  ${step > s.n  ? "bg-green-700 border-green-700 text-white shadow-sm"
                  : step === s.n ? "bg-white border-green-600 text-green-700 shadow-md ring-4 ring-green-100"
                  : "bg-white border-gray-200 text-gray-400"}`}>
                  {step > s.n ? "✓" : s.n}
                </div>
                <span className={`text-xs font-semibold hidden sm:block ${step >= s.n ? "text-green-700" : "text-gray-400"}`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 sm:w-14 h-0.5 mx-1 transition-all duration-300 ${step > s.n ? "bg-green-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>

        {/* ══ STEP 1 — Select Visa Type ══ */}
        {step === 1 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="mb-6">
              <h2 className="text-xl font-extrabold text-gray-900 mb-1">What type of visa are you applying for?</h2>
              <p className="text-sm text-gray-500">We'll suggest the right documents for your specific visa category</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {Object.entries(VISA_TYPES).map(([key, vt]) => {
                const c = COLOR[vt.color];
                return (
                  <button key={key} type="button"
                    onClick={() => { setVisaType(key); setStep(2); }}
                    className={`group relative text-left p-5 rounded-2xl border-2 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg border-gray-200 hover:${c.selBorder}`}>
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ${c.bg} border ${c.border}`}>
                        {vt.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-extrabold text-gray-900 text-base mb-0.5">{vt.label}</div>
                        <div className="text-xs text-gray-500 mb-2">{vt.tagline}</div>
                        <div className="flex flex-wrap gap-1">
                          {vt.recommended.slice(0, 3).map(dk => (
                            <span key={dk} className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${c.badge}`}>
                              {DOCUMENT_TEMPLATES[dk]?.shortLabel}
                            </span>
                          ))}
                          {vt.recommended.length > 3 && (
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full border border-gray-200 text-gray-500">
                              +{vt.recommended.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 border-gray-300 group-hover:${c.border}`}>
                        <div className="w-2.5 h-2.5 rounded-full opacity-0 group-hover:opacity-100 bg-current transition-opacity" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "⚡", t: "Instant",   s: "No waiting" },
                { icon: "🔒", t: "Private",   s: "Data on your device" },
                { icon: "📄", t: "PDF Ready", s: "Print quality" },
              ].map((c, i) => (
                <div key={i} className="text-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-xl mb-1">{c.icon}</div>
                  <div className="text-xs font-bold text-gray-800">{c.t}</div>
                  <div className="text-xs text-gray-500">{c.s}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══ STEP 2 — Select Document ══ */}
        {step === 2 && visa && (
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            {/* Visa context bar */}
            <div className={`flex items-center gap-3 mb-6 p-4 rounded-xl ${palette.bg} border ${palette.border} border-opacity-50`}>
              <span className="text-3xl">{visa.icon}</span>
              <div className="flex-1">
                <div className={`font-extrabold text-sm ${palette.text}`}>{visa.label} — Recommended Documents</div>
                <div className="text-xs text-gray-600 mt-0.5">{visa.tip}</div>
              </div>
              <button type="button" onClick={() => setStep(1)}
                className="text-xs font-semibold text-gray-500 hover:text-gray-700 bg-white border border-gray-200 hover:border-gray-300 px-3 py-1.5 rounded-lg transition-all">
                ← Change
              </button>
            </div>

            <h2 className="text-lg font-extrabold text-gray-900 mb-1">Select Document to Generate</h2>
            <p className="text-sm text-gray-500 mb-5">Recommended documents for your visa type are highlighted</p>

            {/* Recommended */}
            <div className="mb-2">
              <div className={`text-xs font-bold uppercase tracking-widest ${palette.text} mb-3 flex items-center gap-2`}>
                <span className={`inline-block w-2 h-2 rounded-full bg-current`}></span>
                Recommended for {visa.label}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {visa.recommended.map(key => {
                  const tpl = DOCUMENT_TEMPLATES[key];
                  if (!tpl) return null;
                  return (
                    <button key={key} type="button"
                      onClick={() => { setSelectedDoc(key); setFormData({}); setStep(3); setError(""); }}
                      className={`text-left p-4 rounded-xl border-2 bg-white hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 ${palette.selBorder} border-opacity-60 hover:border-opacity-100`}>
                      <div className="flex items-start gap-3">
                        <span className={`text-2xl w-10 h-10 flex items-center justify-center rounded-xl ${palette.bg} flex-shrink-0`}>{tpl.icon}</span>
                        <div>
                          <div className="text-sm font-bold text-gray-900 mb-0.5">{tpl.label}</div>
                          <div className="text-xs text-gray-500">{tpl.description}</div>
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
                <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-gray-300"></span>
                  Other Available Documents
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {Object.entries(DOCUMENT_TEMPLATES).filter(([k]) => !visa.recommended.includes(k)).map(([key, tpl]) => (
                    <button key={key} type="button"
                      onClick={() => { setSelectedDoc(key); setFormData({}); setStep(3); setError(""); }}
                      className="text-left p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-gray-400 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 flex-shrink-0">{tpl.icon}</span>
                        <div>
                          <div className="text-sm font-bold text-gray-900 mb-0.5">{tpl.label}</div>
                          <div className="text-xs text-gray-500">{tpl.description}</div>
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
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            {/* Doc + Visa context */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${palette.bg} border ${palette.border} border-opacity-50 flex-shrink-0`}>
                  {template.icon}
                </div>
                <div>
                  <div className="text-lg font-extrabold text-gray-900">{template.label}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${palette.badge}`}>{visa.icon} {visa.label}</span>
                    <span className="text-xs text-gray-400">{template.description}</span>
                  </div>
                </div>
              </div>
              <button type="button" onClick={() => setStep(2)}
                className="text-xs font-semibold text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl transition-all">
                ← Change Doc
              </button>
            </div>

            {/* Required / Optional indicator */}
            <div className="flex items-center gap-4 mb-5 text-xs text-gray-500">
              <span className="flex items-center gap-1.5"><span className="text-red-400 font-bold">*</span> Required field</span>
              <span className="flex items-center gap-1.5"><span className="text-gray-400">(optional)</span> Can be skipped</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
              {template.fields.map(field => {
                const meta = FIELD_META[field];
                if (!meta) return null;
                const isWide = meta.type === "textarea" || meta.type === "country";
                const hasVal = formData[field]?.trim();
                return (
                  <div key={field} className={isWide ? "sm:col-span-2" : ""}>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                      {meta.label}
                      {meta.optional
                        ? <span className="ml-1.5 text-gray-400 normal-case font-normal">(optional)</span>
                        : <span className="ml-1 text-red-400">*</span>}
                      {hasVal && !meta.optional && <span className="ml-1.5 text-green-500">✓</span>}
                    </label>

                    {meta.type === "country" && (
                      <div className="relative">
                        <button type="button" onClick={() => setCountryOpen(o => !o)}
                          className={`${inputCls} flex items-center gap-2 cursor-pointer text-left`}>
                          {formData.destination ? (
                            <>
                              <img src={countries.find(c => c.country === formData.destination)?.flag}
                                width={22} height={15} className="object-contain flex-shrink-0" alt="" />
                              <span className="text-gray-900 font-medium">{formData.destination}</span>
                            </>
                          ) : <span className="text-gray-400">{meta.placeholder}</span>}
                          <span className="ml-auto text-gray-400 text-xs">{countryOpen ? "▲" : "▼"}</span>
                        </button>
                        {countryOpen && (
                          <div className="absolute z-50 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden">
                            <div className="p-2 border-b border-gray-100">
                              <input autoFocus value={countrySearch}
                                onChange={e => setCountrySearch(e.target.value)}
                                placeholder="🔍 Search country..."
                                className="w-full px-3 py-2 text-sm bg-gray-50 rounded-xl outline-none border border-gray-200 focus:border-green-400" />
                            </div>
                            <div className="max-h-52 overflow-y-auto">
                              {filteredCountries.map(c => (
                                <button key={c.code} type="button"
                                  onClick={() => { setFormData(p => ({ ...p, destination: c.country })); setCountryOpen(false); setCountrySearch(""); }}
                                  className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left hover:bg-green-50 transition-colors
                                    ${formData.destination === c.country ? "bg-green-50 text-green-800 font-semibold" : "text-gray-700"}`}>
                                  <img src={c.flag} width={22} height={15} className="object-contain flex-shrink-0" alt={c.country} />
                                  {c.country}
                                  {formData.destination === c.country && <span className="ml-auto text-green-600 font-bold text-xs">✓</span>}
                                </button>
                              ))}
                              {filteredCountries.length === 0 && (
                                <div className="px-4 py-6 text-center text-sm text-gray-400">No countries found</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    {meta.type === "textarea" && (
                      <textarea placeholder={meta.placeholder} value={formData[field] || ""}
                        onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))}
                        rows={3} className={`${inputCls} resize-y`} />
                    )}
                    {meta.type === "text" && (
                      <input type="text" placeholder={meta.placeholder} value={formData[field] || ""}
                        onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))}
                        className={inputCls} />
                    )}
                  </div>
                );
              })}
            </div>

            {error && (
              <div className="mt-5 flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                <span className="text-lg leading-tight">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button type="button" onClick={() => setStep(2)}
                className="px-5 py-3 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
                ← Back
              </button>
              <button type="button" onClick={handleGenerate}
                className={`flex-1 py-3.5 ${palette.btn} active:scale-[0.99] text-white font-bold text-base rounded-xl transition-all hover:shadow-lg flex items-center justify-center gap-2`}>
                ✨ Generate Document
              </button>
            </div>
            <p className="text-center text-xs text-gray-400 mt-2">No API required · Instant · Free · Private</p>
          </div>
        )}

        {/* ══ STEP 4 — Result ══ */}
        {step === 4 && template && visa && (
          <div className="space-y-4">
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">

              {/* Result header */}
              <div className="flex items-start justify-between mb-5 flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${palette.bg} border ${palette.border} border-opacity-50 flex-shrink-0`}>
                    {template.icon}
                  </div>
                  <div>
                    <div className="text-lg font-extrabold text-gray-900">{template.label}</div>
                    <div className="flex flex-wrap items-center gap-2 mt-0.5">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${palette.badge}`}>{visa.icon} {visa.label}</span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-green-100 text-green-800 text-xs font-bold rounded-full border border-green-200">
                        ✅ Ready
                      </span>
                    </div>
                    {formData.full_name && (
                      <div className="text-xs text-gray-500 mt-0.5">{formData.full_name}{formData.destination ? ` · ${formData.destination}` : ""}</div>
                    )}
                  </div>
                </div>
                <button type="button" onClick={resetAll}
                  className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
                  + New Doc
                </button>
              </div>

              {/* Action toolbar */}
              <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <button type="button" onClick={handleDownloadPDF}
                  className={`flex items-center gap-1.5 px-5 py-2.5 ${palette.btn} text-white font-bold text-sm rounded-xl transition-all hover:shadow-md`}>
                  📄 Download PDF
                </button>
                <button type="button" onClick={() => setIsEditing(e => !e)}
                  className={`flex items-center gap-1.5 px-4 py-2.5 font-bold text-sm rounded-xl transition-all
                    ${isEditing ? "bg-yellow-400 hover:bg-yellow-500 text-white" : "bg-white border border-gray-300 hover:border-yellow-400 text-gray-700 hover:text-yellow-700"}`}>
                  {isEditing ? "👁️ Preview" : "✏️ Edit"}
                </button>
                <button type="button" onClick={handleDownloadTxt}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-300 hover:border-green-500 hover:text-green-700 text-gray-700 font-semibold text-sm rounded-xl transition-all">
                  ⬇️ TXT
                </button>
                <button type="button" onClick={handleCopy}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-300 hover:border-green-500 hover:text-green-700 text-gray-700 font-semibold text-sm rounded-xl transition-all">
                  {copied ? "✅ Copied!" : "📋 Copy"}
                </button>
                <button type="button" onClick={() => setStep(3)}
                  className="flex items-center gap-1.5 px-4 py-2.5 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 font-semibold text-sm rounded-xl transition-all sm:ml-auto">
                  🔄 Edit Info
                </button>
              </div>

              {isEditing && (
                <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-3 text-sm text-amber-800 font-medium">
                  ✏️ Edit mode is on — changes will be reflected in your downloaded PDF
                </div>
              )}

              {/* Document preview */}
              <div className={`relative rounded-xl border-2 overflow-hidden transition-all ${isEditing ? "border-yellow-400" : "border-gray-200"}`}>
                {/* Doc header strip */}
                <div className={`px-5 py-2.5 flex items-center gap-2 border-b ${isEditing ? "bg-amber-50 border-amber-200" : "bg-gray-50 border-gray-200"}`}>
                  <span className="text-sm">{template.icon}</span>
                  <span className="text-xs font-bold text-gray-600">{template.label}</span>
                  <span className={`ml-auto text-xs font-semibold px-2 py-0.5 rounded-full border ${palette.badge}`}>{visa.label}</span>
                </div>
                {isEditing ? (
                  <textarea value={editedDoc} onChange={e => setEditedDoc(e.target.value)}
                    className="w-full min-h-96 px-6 py-5 bg-white text-sm text-gray-900 outline-none resize-y"
                    style={{ fontFamily: "'Times New Roman', Georgia, serif", lineHeight: "1.9" }} />
                ) : (
                  <div className="px-6 py-5 bg-white text-sm text-gray-900 whitespace-pre-wrap break-words min-h-64"
                    style={{ fontFamily: "'Times New Roman', Georgia, serif", lineHeight: "1.9" }}>
                    {displayDoc}
                  </div>
                )}
              </div>

              {/* Bottom actions */}
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setStep(2)}
                  className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
                  ← Different Doc
                </button>
                <button type="button" onClick={resetAll}
                  className="px-4 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all">
                  + New Document
                </button>
                <button type="button" onClick={handleDownloadPDF}
                  className={`ml-auto px-6 py-2 text-sm font-bold text-white ${palette.btn} rounded-xl transition-all hover:shadow-md flex items-center gap-1.5`}>
                  📄 Download PDF →
                </button>
              </div>
            </div>

            {/* CTA card */}
            <div className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-700 rounded-2xl p-6 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
              <div className="relative">
                <div className="text-3xl mb-2">🚀</div>
                <div className="text-white font-extrabold text-lg mb-1">Need an expert review?</div>
                <div className="text-green-200 text-sm mb-5">Our Eammu consultants will review, attest & submit your documents on your behalf</div>
                <a href="/contact"
                  className="inline-block px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-white font-extrabold text-sm rounded-xl transition-all hover:shadow-lg">
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
