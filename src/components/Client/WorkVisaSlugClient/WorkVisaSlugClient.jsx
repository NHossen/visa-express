"use client";
// app/visa/work-visa/[slug]/WorkVisaSlugClient.jsx  ← CLIENT COMPONENT
// Receives all resolved data as props from page.jsx (server component)

import React, { useState } from "react";
import Link from "next/link";

const flagUrl = (code) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

const VISA_TYPES = [
  { label: "Business Visa", href: "/visa/business-visa" },
  { label: "Work Visa", href: "/visa/work-visa", active: true },
  { label: "Student Visa", href: "/visa/student-visa" },
  { label: "Tourist Visa", href: "/visa/tourist-visa" },
  { label: "Transit Visa", href: "/visa/transit-visa" },
];

const DOCUMENTS = [
  { icon: "🛂", title: "Valid Passport", detail: "Min. 12 months validity beyond intended stay. 2 blank pages minimum for stamps.", mandatory: true },
  { icon: "💼", title: "Formal Job Offer Letter", detail: "On company letterhead. Must include job title, salary, start date, and contract duration.", mandatory: true },
  { icon: "🏢", title: "Sponsorship Licence / LMIA", detail: "Employer's government-issued sponsorship number or Labour Market Impact Assessment approval.", mandatory: true },
  { icon: "🎓", title: "Educational Certificates", detail: "Attested degree certificates with apostille or notarisation as required by destination country.", mandatory: true },
  { icon: "📄", title: "Work Experience Letters", detail: "From all previous employers on official letterhead, covering full relevant work history with dates.", mandatory: true },
  { icon: "🏥", title: "Medical Examination Report", detail: "Completed by a government-approved panel physician. Includes chest X-ray and blood tests.", mandatory: true },
  { icon: "🚔", title: "Police Clearance Certificate", detail: "From your home country and any country you've lived in for 6+ months in the past 5 years.", mandatory: true },
  { icon: "🗣️", title: "Language Test Results", detail: "IELTS General (min 6.0), TOEFL iBT, PTE Academic, or Goethe/DELF for non-English destinations.", mandatory: false },
  { icon: "📋", title: "Professional CV / Resume", detail: "Reverse-chronological, aligned to destination standards. No photo for UK/US applications.", mandatory: false },
  { icon: "🏦", title: "Bank Statements (3–6 months)", detail: "Demonstrating financial stability during relocation and initial employment period.", mandatory: false },
  { icon: "🖐️", title: "Biometric Data", detail: "Fingerprints and photo at nearest VFS Global centre or official embassy.", mandatory: true },
  { icon: "💳", title: "Visa Application Fee", detail: "Paid online at submission. See At a Glance section above for exact fee.", mandatory: true },
];

const RELATED_NATIONALITIES = [
  { name: "Indian", code: "in" },
  { name: "Filipino", code: "ph" },
  { name: "Pakistani", code: "pk" },
  { name: "Bangladeshi", code: "bd" },
  { name: "Nigerian", code: "ng" },
  { name: "Kenyan", code: "ke" },
];

const RELATED_DESTINATIONS = [
  { name: "Canada", code: "ca" },
  { name: "United Arab Emirates", code: "ae" },
  { name: "United Kingdom", code: "gb" },
  { name: "Germany", code: "de" },
  { name: "Australia", code: "au" },
  { name: "Saudi Arabia", code: "sa" },
];

const TRUSTED_APPS = [
  { name: "VFS Global", url: "https://www.vfsglobal.com", desc: "Biometrics collection & visa application centres worldwide" },
  { name: "Canada IRCC Portal", url: "https://www.canada.ca/en/immigration-refugees-citizenship.html", desc: "Express Entry, LMIA & work permits" },
  { name: "UK Visas & Immigration", url: "https://www.gov.uk/browse/visas-immigration/work-visas", desc: "Skilled Worker Visa applications and sponsor register" },
  { name: "MOHRE UAE", url: "https://www.mohre.gov.ae", desc: "UAE Ministry of Human Resources — work permits & contracts" },
];

// ─── FaqItem accordion ────────────────────────────────────────────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-0 pb-5 last:pb-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-start justify-between gap-4 group"
        aria-expanded={open}
      >
        <h4 className="font-bold text-sm text-slate-900 group-hover:text-amber-600 transition-colors">
          Q: {q}
        </h4>
        <span className={`text-slate-400 font-black flex-shrink-0 mt-0.5 transition-transform ${open ? "rotate-45" : ""}`}>+</span>
      </button>
      {open && <p className="text-xs text-slate-500 leading-relaxed mt-2">{a}</p>}
    </div>
  );
}

// ─── Main Client Component ────────────────────────────────────────────────────
export default function WorkVisaSlugClient({
  slug,
  natCap,
  destCap,
  nFlag,
  dFlag,
  destInfo,
  isGulf,
  canonicalUrl,
}) {
  const nationality = natCap.toLowerCase();
  const destination = destCap.toLowerCase().replace(/ /g, "-");

  const emailTemplate = `Subject: Work Visa Sponsorship Inquiry — ${natCap} National — [Job Title]

Dear [Hiring Manager / HR],

I am a ${natCap} national with [X years] of experience in [field], seeking employment in ${destCap} with employer visa sponsorship.

My qualifications include [degrees/certifications] attested from ${natCap}. I am fully prepared to provide all required documentation — degree attestations, police clearance certificate, and certified medical examination — to support your ${destInfo.visaName} application.

I am available for interview at your convenience and can commence employment [timeframe] following visa approval.

Kind regards,
[Your Name] | [LinkedIn] | [Phone]`;

  const applicationSteps = [
    {
      t: "Eligibility & Occupation Check",
      d: `Verify your occupation falls under ${destCap}'s recognised skilled occupations list. ${isGulf ? `In ${destCap}, check the MOHRE or MISA approved job categories.` : `If your role is on a shortage occupation list, you may qualify for expedited processing.`}`,
    },
    {
      t: "Language Proficiency Test",
      d: destInfo.languageReq === "None formally required"
        ? `No formal language test is required for the ${destCap} work visa. However, professional communication skills are expected in most workplaces.`
        : `Most ${destCap} work visa applications require: ${destInfo.languageReq}. Book early as test slots and results can take up to 4 weeks.`,
    },
    {
      t: "Find a Sponsoring Employer",
      d: `Your employer in ${destCap} must hold an active government-issued sponsorship licence before they can legally hire you. ${isGulf ? `In ${destCap}, the employer initiates the work permit process through the Ministry of Labour.` : `Use LinkedIn, Indeed, and ${destCap}-specific job boards. State "I require employer sponsorship" clearly in your cover letter.`}`,
    },
    {
      t: "Credential Attestation & Document Gathering",
      d: `${natCap} qualifications must be assessed and attested by the body recognised in ${destCap}. Simultaneously, gather your experience letters, police clearance from ${natCap}, and medical examination from a ${destCap}-approved panel physician.`,
    },
    {
      t: "Submit Your Work Visa Application",
      d: `Once your employer has the sponsorship number and issued your formal job offer, submit through the official ${destCap} immigration portal. Pay the application fee of ${destInfo.fee} and schedule biometrics at a VFS Global centre.`,
    },
    {
      t: "Biometrics, Medical & Background Checks",
      d: `After submission, attend a biometrics appointment for fingerprints and photograph. Your medical results are submitted directly by the clinic. Avoid international travel with your original passport during this stage.`,
    },
    {
      t: "Visa Decision & Conditions Review",
      d: `Processing takes ${destInfo.processingTime}. Upon approval, review your visa conditions carefully — the employer it's tied to, the permitted occupation, and the validity period of ${destInfo.initialValidity}.`,
    },
    {
      t: "Travel & Onboarding in Your Destination",
      d: `On arrival in ${destCap}, your employer completes onboarding — registering your work permit with local authorities, setting up your tax and social security numbers, and providing your employment contract.`,
    },
  ];

  const faqItems = [
    {
      q: `Does ${destCap} require credential recognition for ${natCap} degrees?`,
      a: `Most ${destCap} employers and immigration authorities require ${natCap} educational qualifications to be assessed by an approved credential evaluation body. This takes 4–12 weeks and must be completed before your visa application is submitted. Start this as early as possible.`,
    },
    {
      q: `Can I change employers after arriving in ${destCap}?`,
      a: isGulf
        ? `In ${destCap}, changing employers typically requires a No Objection Certificate (NOC) from your current sponsor or completion of your contract. Always check your specific visa conditions and consult a registered adviser before making any changes.`
        : `In most cases yes, but you may need to notify immigration authorities or obtain a new ${destInfo.visaName} endorsement tied to the new employer. Check your specific visa conditions carefully before changing jobs.`,
    },
    {
      q: `Can my family accompany me to ${destCap}?`,
      a: isGulf
        ? `${destCap} allows sponsored workers to bring dependants (spouse and children) subject to minimum salary thresholds. Dependant spouses are generally not permitted to work in most Gulf countries without their own separate work permit.`
        : `Most skilled worker visas allow you to bring your spouse and dependent children under 18. Many destinations permit dependant spouses to work as well. Confirm the specific rules for the ${destInfo.visaName}.`,
    },
    {
      q: `Is there a path to permanent residency in ${destCap}?`,
      a: isGulf
        ? `${destCap} does not currently offer permanent residency through standard employment visas. ${destInfo.prPathway}. For long-term residency schemes, check investor or exceptional talent categories.`
        : `Yes. ${destInfo.prPathway}. Continuous employment and maintaining visa conditions are typically required throughout the qualifying period.`,
    },
    {
      q: `What are the main reasons ${natCap} work visa applications are refused?`,
      a: `Common refusal reasons include: discrepancies between application and supporting documents; missing or non-attested credentials; failure to meet language requirements (${destInfo.languageReq}); an employer whose sponsorship licence was revoked; and providing false information. Double-check every detail before submission.`,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">

      {/* BREADCRUMB */}
      <div className="bg-white border-b border-slate-100 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-slate-400 font-medium flex-wrap">
          <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/visa" className="hover:text-amber-600 transition-colors">Visa Guides</Link>
          <span>›</span>
          <Link href="/visa/work-visa" className="hover:text-amber-600 transition-colors">Work Visa</Link>
          <span>›</span>
          <span className="text-slate-600 font-semibold">{natCap} → {destCap}</span>
        </div>
      </div>

      {/* TOP BANNER */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-10">

          {/* Visa type pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {VISA_TYPES.map((v) => (
              <Link
                key={v.label}
                href={v.href}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                  v.active
                    ? "bg-amber-400 text-slate-900 border-amber-400"
                    : "border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-700"
                }`}
              >
                {v.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center -space-x-3">
                  <img src={nFlag} className="w-12 h-8 rounded shadow-md border-2 border-white z-10 object-cover" alt={`${natCap} flag`} loading="eager" width={48} height={32} />
                  <img src={dFlag} className="w-12 h-8 rounded shadow-md border-2 border-white z-20 object-cover" alt={`${destCap} flag`} loading="eager" width={48} height={32} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Work Visa Guide · Updated May 2026
                  </p>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                    {natCap} <span className="text-amber-500">→</span> {destCap}
                  </h1>
                </div>
              </div>
              <p className="text-sm text-slate-500 max-w-xl">
                Complete {destInfo.visaName} requirements for {natCap} passport holders seeking employment in {destCap} — sponsorship, documents, fees ({destInfo.fee}), processing ({destInfo.processingTime}), and official portals.
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-xs font-bold border border-amber-200 uppercase tracking-wider">
                Employer Sponsored
              </span>
              {!isGulf && (
                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold border border-green-100 uppercase tracking-wider">
                  PR Pathway Available
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ─── MAIN CONTENT ─── */}
          <div className="lg:col-span-2 space-y-8">

            {/* OVERVIEW */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-4">{destCap} Work Visa Overview for {natCap} Nationals</h2>
              <p className="text-slate-600 leading-relaxed text-sm mb-4">
                As a <strong>{natCap}</strong> national, you can legally work in <strong>{destCap}</strong> by obtaining the <strong>{destInfo.visaName}</strong>. The fee is <strong>{destInfo.fee}</strong> with a standard processing time of <strong>{destInfo.processingTime}</strong>. The visa is initially valid for <strong>{destInfo.initialValidity}</strong>.
              </p>
              {isGulf && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
                  <p className="text-sm font-bold text-amber-800 mb-1">🏜️ Gulf Employment Visa</p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    {destCap} operates an employer-tied work permit system. Your visa is linked to your sponsor employer. Changing employers requires a No Objection Certificate (NOC) or completion of your contract. {destInfo.notes}
                  </p>
                </div>
              )}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-4">
                <p className="text-xs text-blue-700 font-medium leading-relaxed">
                  📌 <strong>Key requirement:</strong> {destInfo.sponsorship}
                </p>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="text-xs text-slate-500 leading-relaxed italic">
                  ⚠️ Always verify current requirements directly with the {destCap} immigration authority before submitting. Rules change frequently and this guide reflects information available as of May 2026. For short-term business travel, see our{" "}
                  <Link href="/visa/business-visa" className="text-amber-600 font-semibold hover:underline">Business Visa Guide →</Link>
                </p>
              </div>
            </section>

            {/* AT A GLANCE */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-6">{natCap} → {destCap} Work Visa at a Glance</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {[
                  { label: "Processing Time", value: destInfo.processingTime },
                  { label: "Initial Validity", value: destInfo.initialValidity },
                  { label: "Visa Fee", value: destInfo.fee },
                  { label: "PR Pathway", value: isGulf ? "Not Available" : "Available" },
                ].map((item) => (
                  <div key={item.label} className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100 hover:border-amber-200 transition-colors">
                    <p className="text-base font-extrabold text-slate-900 mb-1">{item.value}</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Visa Name</p>
                  <p className="text-sm font-bold text-slate-900">{destInfo.visaName}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Language Requirement</p>
                  <p className="text-sm font-bold text-slate-900">{destInfo.languageReq}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mb-1">Expedited Processing</p>
                  <p className="text-sm font-bold text-slate-900">{destInfo.expedite}</p>
                </div>
              </div>
            </section>

            {/* 8-STEP APPLICATION */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">8-Step Application Guide</h2>
              <p className="text-sm text-slate-500 mb-6">Specifically written for {natCap} nationals applying to work in {destCap}.</p>
              <div className="space-y-5">
                {applicationSteps.map((step, index) => (
                  <div key={index} className="flex gap-5">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="pt-1 border-b border-slate-100 pb-5 flex-1 last:border-0 last:pb-0">
                      <h4 className="font-bold text-sm text-slate-900 mb-1">{step.t}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{step.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* DOCUMENTS */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Required Documents</h2>
              <p className="text-sm text-slate-500 mb-6">For {natCap} passport holders applying for a {destCap} {destInfo.visaName}.</p>
              <div className="space-y-3">
                {DOCUMENTS.map((doc) => (
                  <div key={doc.title} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 transition-colors">
                    <span className="text-xl shrink-0 mt-0.5">{doc.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-sm text-slate-900">{doc.title}</h4>
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${doc.mandatory ? "bg-amber-100 text-amber-700" : "bg-slate-200 text-slate-500"}`}>
                          {doc.mandatory ? "Required" : "Recommended"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{doc.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link
                  href="/visa-resources/visa-checklist-generator"
                  className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-amber-500 transition-all"
                >
                  Download PDF Checklist for {destCap} →
                </Link>
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-6">
                Frequently Asked Questions — {natCap} to {destCap} Work Visa
              </h2>
              <div className="space-y-5">
                {faqItems.map((item, i) => (
                  <FaqItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </section>

            {/* EMAIL TEMPLATE */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">
                Email Template: Requesting Sponsorship from {destCap} Employers
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Use this when reaching out to {destCap} employers about the {destInfo.visaName}. Replace all brackets with your own information.
              </p>
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <div className="border-b border-slate-100 px-5 py-3 bg-slate-50 flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    {natCap} → {destCap} Sponsorship Template
                  </span>
                </div>
                <pre className="text-xs font-mono leading-relaxed text-slate-600 whitespace-pre-wrap p-6 bg-slate-50">
                  {emailTemplate}
                </pre>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { tip: "Personalise every email", detail: "Generic bulk emails are ignored. Research the company and mention a specific role or project." },
                  { tip: "Include your LinkedIn URL", detail: `${destCap} recruiters verify candidates on LinkedIn before responding to unsolicited emails.` },
                  { tip: "Be upfront about sponsorship", detail: "Mentioning visa sponsorship from the start saves time and ensures you only hear from willing sponsors." },
                ].map((t) => (
                  <div key={t.tip} className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <h5 className="font-bold text-xs text-slate-900 mb-1">{t.tip}</h5>
                    <p className="text-[11px] text-slate-500 leading-relaxed">{t.detail}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* TRUSTED PORTALS */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Official Application Portals</h2>
              <p className="text-sm text-slate-500 mb-6">
                Submit your {destCap} work visa application through official government channels only.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TRUSTED_APPS.map((app) => (
                  <a
                    key={app.name}
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-amber-300 hover:shadow-sm group transition-all"
                  >
                    <div>
                      <h5 className="font-bold text-sm text-slate-900 mb-1">{app.name}</h5>
                      <p className="text-xs text-slate-500">{app.desc}</p>
                    </div>
                    <span className="text-slate-300 group-hover:text-amber-500 font-bold transition-colors text-lg shrink-0">↗</span>
                  </a>
                ))}
              </div>
            </section>

            {/* RELATED ROUTES */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Related Work Visa Guides</h2>
              <p className="text-sm text-slate-500 mb-6">Other popular routes you may find useful.</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Same Nationality</p>
                  <div className="space-y-2">
                    {RELATED_DESTINATIONS
                      .filter((d) => d.name.toLowerCase() !== destCap.toLowerCase())
                      .slice(0, 5)
                      .map((dest) => {
                        const sl = `${nationality}-to-${dest.name.toLowerCase().replace(/\s+/g, "-")}`;
                        const df = flagUrl(dest.code);
                        return (
                          <Link
                            key={dest.code}
                            href={`/visa/work-visa/${sl}?nFlag=${encodeURIComponent(nFlag)}&dFlag=${encodeURIComponent(df)}`}
                            className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl hover:border-amber-300 hover:shadow-sm group transition-all"
                          >
                            <img src={df} className="w-7 h-5 rounded object-cover shadow-sm" alt={dest.name} loading="lazy" width={28} height={20} />
                            <span className="text-xs font-bold text-slate-700">{natCap} → {dest.name}</span>
                            <span className="ml-auto text-slate-300 group-hover:text-amber-500 font-bold">›</span>
                          </Link>
                        );
                      })}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Same Destination</p>
                  <div className="space-y-2">
                    {RELATED_NATIONALITIES
                      .filter((n) => n.name.toLowerCase() !== natCap.toLowerCase())
                      .slice(0, 5)
                      .map((nat) => {
                        const sl = `${nat.name.toLowerCase()}-to-${destination}`;
                        const nf = flagUrl(nat.code);
                        return (
                          <Link
                            key={nat.code}
                            href={`/visa/work-visa/${sl}?nFlag=${encodeURIComponent(nf)}&dFlag=${encodeURIComponent(dFlag)}`}
                            className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl hover:border-amber-300 hover:shadow-sm group transition-all"
                          >
                            <img src={nf} className="w-7 h-5 rounded object-cover shadow-sm" alt={nat.name} loading="lazy" width={28} height={20} />
                            <span className="text-xs font-bold text-slate-700">{nat.name} → {destCap}</span>
                            <span className="ml-auto text-slate-300 group-hover:text-amber-500 font-bold">›</span>
                          </Link>
                        );
                      })}
                  </div>
                </div>
              </div>
            </section>

            {/* OTHER VISA TYPES */}
            <section className="bg-amber-400 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Explore Other Visa Types for {destCap}</h2>
              <p className="text-sm text-amber-900 mb-6">Not a skilled worker? Find the right visa category below.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Business Visa", desc: "Meetings & conferences", href: "/visa/business-visa", icon: "💼" },
                  { label: "Student Visa", desc: "Study & university", href: "/visa/student-visa", icon: "🎓" },
                  { label: "Tourist Visa", desc: "Leisure & tourism", href: "/visa/tourist-visa", icon: "🌴" },
                  { label: "Transit Visa", desc: "Layovers & connections", href: "/visa/transit-visa", icon: "🛫" },
                ].map((v) => (
                  <Link
                    key={v.label}
                    href={v.href}
                    className="bg-white rounded-xl p-4 hover:shadow-md transition-all group"
                  >
                    <span className="text-2xl block mb-2">{v.icon}</span>
                    <p className="font-bold text-sm text-slate-900 group-hover:text-amber-700 transition-colors">{v.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{v.desc}</p>
                  </Link>
                ))}
              </div>
            </section>

          </div>

          {/* ─── SIDEBAR ─── */}
          <aside className="space-y-5">

            {/* CTA */}
            <div className="bg-slate-900 rounded-2xl p-7 text-white sticky top-10">
              <h3 className="text-lg font-bold mb-2">Get Your Full Checklist</h3>
              <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                Personalised PDF document checklist for {natCap} professionals seeking work in {destCap}. Free download.
              </p>
              <Link
                href="/visa-resources/visa-checklist-generator"
                className="block w-full bg-amber-400 hover:bg-amber-300 text-slate-900 text-center py-3.5 rounded-xl font-bold transition-all text-sm"
              >
                Download Checklist (PDF)
              </Link>

              <div className="mt-6 border-t border-slate-800 pt-5 space-y-3">
                {[
                  { label: "Visa Type", value: destInfo.visaName },
                  { label: "Processing", value: destInfo.processingTime },
                  { label: "Initial Validity", value: destInfo.initialValidity },
                  { label: "Fee", value: destInfo.fee },
                  { label: "Language Req.", value: destInfo.languageReq },
                  { label: "PR Pathway", value: isGulf ? "Not Available" : "Available" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-xs gap-2">
                    <span className="text-slate-500 shrink-0">{row.label}</span>
                    <span className="text-slate-200 font-bold text-right max-w-[55%]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Other visa types */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Other Visa Types</h3>
              <div className="space-y-2">
                {[
                  { label: "Business Visa Guides", href: "/visa/business-visa", icon: "💼" },
                  { label: "Student Visa Guides", href: "/visa/student-visa", icon: "🎓" },
                  { label: "Tourist Visa Guides", href: "/visa/tourist-visa", icon: "🌴" },
                  { label: "Transit Visa Guides", href: "/visa/transit-visa", icon: "🛫" },
                ].map((v) => (
                  <Link
                    key={v.label}
                    href={v.href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 border border-transparent hover:border-amber-200 transition-all"
                  >
                    <span className="text-lg">{v.icon}</span>
                    <span className="text-sm font-semibold text-slate-700">{v.label}</span>
                    <span className="ml-auto text-slate-300 text-sm">›</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-amber-900 mb-2">⚠️ Use Licensed Advisers Only</h3>
              <p className="text-xs text-amber-800 leading-relaxed">
                Only use RCIC (Canada), OISC-registered (UK), or RMA-licensed (Australia) immigration consultants. Unregulated agents have caused thousands of visa rejections and permanent bans.
              </p>
            </div>

            {/* Resources */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-3">🔧 Visa Resources</h3>
              <div className="space-y-2">
                {[
                  { label: "Visa Checklist Generator", href: "/visa-resources/visa-checklist-generator" },
                  { label: "Sponsorship Email Templates", href: "/visa-resources/email-templates" },
                  { label: "Embassy Directory", href: "/visa-resources/embassy-directory" },
                  { label: "Processing Time Tracker", href: "/visa-resources/processing-times" },
                  { label: "Credential Assessment Guide", href: "/visa-resources/credential-assessment" },
                ].map((r) => (
                  <Link
                    key={r.label}
                    href={r.href}
                    className="block text-xs font-semibold text-slate-500 hover:text-amber-600 hover:underline underline-offset-4 py-1 transition-colors"
                  >
                    {r.label} →
                  </Link>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>

      {/* BOTTOM SEARCH CTA */}
      <div className="max-w-6xl mx-auto px-6 mt-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Search Another Route</p>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-3">Need a Different Work Visa?</h3>
          <p className="text-sm text-slate-500 mb-6">Get a personalised guide for any nationality and destination combination.</p>
          <Link
            href="/visa/work-visa#search"
            className="inline-block bg-amber-400 text-slate-900 px-10 py-4 rounded-xl font-bold hover:bg-amber-500 transition-all shadow-lg shadow-amber-100 text-sm"
          >
            Search Work Visa Requirements →
          </Link>
        </div>
      </div>

    </div>
  );
}