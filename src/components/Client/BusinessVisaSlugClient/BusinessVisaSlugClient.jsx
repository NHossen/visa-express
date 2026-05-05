import React from 'react';
import Link from 'next/link';

const flagUrl = (code) => `https://flagcdn.com/w80/${code.toLowerCase()}.png`;

const VISA_TYPES = [
  { label: "Business Visa", href: "/visa/business-visa", active: true },
  { label: "Work Visa", href: "/visa/work-visa" },
  { label: "Student Visa", href: "/visa/student-visa" },
  { label: "Tourist Visa", href: "/visa/tourist-visa" },
  { label: "Transit Visa", href: "/visa/transit-visa" },
];

const DOCUMENTS = [
  { icon: "🛂", title: "Valid Passport", detail: "Minimum 6 months validity beyond your planned return date. At least 2 blank pages required for visa stamps. If your passport expires within 12 months, renew it before applying — some countries require 12 months of validity.", mandatory: true },
  { icon: "✉️", title: "Invitation Letter from Host Company", detail: "Issued by your host company in the destination country on official company letterhead, signed by a Director or C-level executive. Must state your full name, job title, exact visit dates (start and end), the specific purpose of the visit, and that the company will formally receive you.", mandatory: true },
  { icon: "🏢", title: "Employer Cover Letter", detail: "From your company confirming your name, position, and employment duration; stating the business purpose of the trip; confirming that you will return to your role after the visit; and ideally stating who is funding the travel. Signed by HR Director or CEO for maximum impact.", mandatory: true },
  { icon: "📄", title: "Bank Statements (3–6 months)", detail: "Personal or company account showing consistent financial standing and sufficient funds to cover the trip without needing to work locally. For Schengen applications, aim to demonstrate at least €100 per day of stay. Avoid large unexplained deposits immediately before applying.", mandatory: true },
  { icon: "🛡️", title: "Travel Insurance Certificate", detail: "Medical coverage valid for the full duration of your stay and covering emergency repatriation. Minimum €30,000 medical cover required for all Schengen visa applications. Print the insurance certificate and policy schedule — not just the receipt or booking confirmation.", mandatory: true },
  { icon: "🏨", title: "Hotel / Accommodation Booking", detail: "Confirmed accommodation for the entire stay showing your full name, hotel name and address, and check-in / check-out dates that precisely match your visa application dates. Use refundable bookings only until your visa is approved.", mandatory: true },
  { icon: "✈️", title: "Return Flight Confirmation", detail: "A confirmed return itinerary demonstrating your intention to leave before your visa expires. If your travel dates are flexible, a refundable return booking is acceptable. Carry your return ticket in hand luggage — border officials may check it on arrival.", mandatory: true },
  { icon: "📋", title: "Visa Application Form", detail: "Download only from the official embassy or consulate website — do not use third-party versions which may be outdated. Complete every field in English (unless instructed otherwise). Sign and date the form exactly as your name appears in your passport.", mandatory: true },
  { icon: "📸", title: "Passport-Size Photographs", detail: "Typically 2 recent photos (taken within last 6 months) against a plain white background. Standard size: 35mm × 45mm. Your face should take up 70–80% of the frame. No glasses, no head coverings (unless for religious reasons). Check exact specifications for your destination embassy.", mandatory: true },
  { icon: "📊", title: "Income Tax Returns / ITR", detail: "Last 1–2 years of income tax returns, particularly required for US, Canada, UK, and Australia. Demonstrates established financial ties to your home country. Self-employed applicants should include tax registration and business turnover documentation.", mandatory: false },
  { icon: "💼", title: "Company Registration Documents", detail: "Your employer's trade licence, company registration certificate, or certificate of incorporation. Demonstrates that your employer is a legitimate, operating registered business. Some embassies request a company profile or website printout as supplementary evidence.", mandatory: false },
  { icon: "📁", title: "No Objection Certificate (NOC)", detail: "A letter from your employer or organisation stating they have no objection to your travel and that your position will be available on your return. Particularly useful for government employees, those applying without a host company invitation, or applicants with short employment tenure.", mandatory: false },
  { icon: "🪪", title: "Business Card / Professional Profile", detail: "Supplementary evidence of your professional role. A business card or printed LinkedIn profile is accepted by many embassies. Useful when your job title on documents differs from what's in the invitation letter, or to reinforce your professional standing.", mandatory: false },
  { icon: "🗂️", title: "Prior Visa History", detail: "Prior visas to the destination country or comparable countries (Schengen, US, UK, Australia) significantly strengthen your application and often result in faster processing. Include your old passport(s) if they contain relevant visa stamps. A clean travel history is a major positive factor.", mandatory: false },
];

const APPLICATION_STEPS = [
  {
    title: "Confirm Permitted Activities",
    detail: (dest) => `Verify that your planned activities in ${dest} fall strictly within business visa scope — meetings, conferences, site visits, contract signings, and corporate training (receiving only). Employment or receiving any payment from a ${dest}-based employer is strictly prohibited. Document your intended itinerary in writing before beginning your application.`,
    tip: "A written day-by-day business itinerary attached to your application significantly reduces embassy queries.",
  },
  {
    title: "Obtain the Invitation Letter",
    detail: (dest) => `Request a formal, detailed invitation letter from your host company in ${dest}. The letter must be on official company letterhead, signed by a Director or C-level executive, and must state your full name, job title, exact visit dates, and the specific purpose of each business activity. Generic phrases like 'business meetings' are weaker than specific descriptions.`,
    tip: "Ask your host company to include their company registration number and direct contact details for consulate verification calls.",
  },
  {
    title: "Prepare Your Complete Document Pack",
    detail: (_) => `Gather all required documents: valid passport, employer cover letter, bank statements (3–6 months), travel insurance certificate, hotel booking confirmation, return flight itinerary, and a completed visa application form. Double-check every document is signed, dated, and consistent — names must match exactly across all documents.`,
    tip: "Any inconsistency between documents — different spellings, mismatched dates — is an immediate red flag for visa officers.",
  },
  {
    title: "Book Your Embassy Appointment",
    detail: (dest) => `Schedule your appointment at the ${dest} embassy, consulate, or authorised Visa Application Centre (such as VFS Global or TLScontact) serving your city. Many embassies allow online appointment booking. Aim to secure your appointment at least 6–8 weeks before your planned travel date to allow for processing delays and potential re-applications.`,
    tip: "Appointment slots fill up fast during peak season (April–June, September–November). Book early.",
  },
  {
    title: "Submit Documents & Provide Biometrics",
    detail: (_) => `Attend your appointment with all original documents and photocopies. Pay the non-refundable visa processing fee at the centre — keep your receipt. Biometric data (digitally scanned fingerprints and photograph) will be collected at the application centre. For Schengen visas, biometrics are stored for 59 months.`,
    tip: "Bring more copies than you think you need. Most centres require 2–3 copies of each document.",
  },
  {
    title: "Track Your Application & Collect Your Visa",
    detail: (_) => `Standard processing is 10–20 business days depending on destination. Most embassies and VFS centres offer an SMS or online tracking service. Once approved, collect your passport from the centre or request courier return. Carefully verify: the visa validity dates, the number of entries permitted, the maximum allowed stay per entry, and that your name matches your passport exactly.`,
    tip: "Check the 'duration of stay' field on your visa sticker — this is how long you can stay per visit, not the total visa validity period.",
  },
];

const FAQ = [
  {
    q: "How long can I stay on a business visa?",
    a: "Most business visas permit stays of 30–90 days per visit. Schengen business visas allow a maximum of 90 days within any rolling 180-day period across all 27 member states combined. US B-1 visas can permit up to 6 months, but this is at the discretion of the border officer. Always check the 'duration of stay' printed on your visa — the validity period and the allowed stay are different things.",
  },
  {
    q: "Can I work remotely on a business visa?",
    a: "No. Business visas strictly prohibit remote work for any employer — including your own home-country employer. Working remotely on a business visa technically violates the visa conditions in most countries. If you need to work remotely while abroad, look into dedicated digital nomad visas (available in UAE, Portugal, Germany, and others) or work permits relevant to your situation. See our Work Visa Guide for more details.",
  },
  {
    q: "Can I extend my business visa once I'm in the country?",
    a: "Extensions are rarely granted and require application through the local immigration authority before your current visa expires. Overstaying — even by a single day — can result in fines, deportation, a future visa ban, and serious complications for subsequent visa applications worldwide. If you need more time, leave and reapply from your home country.",
  },
  {
    q: "What if my business visa application is rejected?",
    a: "You will receive a refusal notice stating the reason. Common reasons include incomplete documentation, insufficient funds, weak ties to your home country, or prior visa overstays. You can reapply after addressing the specific rejection reason with additional supporting documents. For complex cases or repeat rejections, consider engaging a professional visa consultant. Note that refusal stamps on your passport may affect future applications to other countries.",
  },
  {
    q: "Do I always need an invitation letter from the host company?",
    a: "For most countries — yes. An invitation letter is either mandatory or very strongly recommended. For Schengen countries it is standard practice. For the US, while not always required, a strong invitation letter from a US-based company significantly reduces the likelihood of visa rejection and interview complications. Without a letter, you must provide very strong alternative evidence of your business purpose.",
  },
  {
    q: "What is the difference between a business visa and a work permit?",
    a: "A business visa is a short-term visa for commercial activities only — meetings, conferences, and site visits. It does not allow you to enter the local labour market. A work permit (or work visa) authorises you to work for an employer in the destination country, typically requires employer sponsorship, and involves a more complex application process. See our Work Visa Guide for a complete breakdown by country.",
  },
  {
    q: "Can I attend a job interview on a business visa?",
    a: "In most countries, attending a job interview is technically permitted on a business visa, as it does not constitute employment. However, signing an employment contract, starting work, or receiving payment is not permitted. If you are offered a job, you must leave the country and return on the appropriate work visa or permit before commencing employment.",
  },
  {
    q: "What documents should I carry at the border when arriving on a business visa?",
    a: "Carry your full application document set in your hand luggage: the original invitation letter, hotel booking confirmations, your employer's cover letter, your return flight ticket, and your travel insurance certificate. Border officers can ask to see any of these at immigration, and failure to produce them can result in denial of entry even with a valid visa.",
  },
];

const RELATED_GUIDES = [
  { nat: "Indian", natCode: "in", dest: "Germany", destCode: "de" },
  { nat: "Indian", natCode: "in", dest: "United States", destCode: "us" },
  { nat: "Indian", natCode: "in", dest: "United Kingdom", destCode: "gb" },
  { nat: "Nigerian", natCode: "ng", dest: "Germany", destCode: "de" },
  { nat: "Pakistani", natCode: "pk", dest: "UAE", destCode: "ae" },
  { nat: "Filipino", natCode: "ph", dest: "Singapore", destCode: "sg" },
  { nat: "Bangladeshi", natCode: "bd", dest: "Singapore", destCode: "sg" },
  { nat: "Brazilian", natCode: "br", dest: "France", destCode: "fr" },
];

const PERMITTED_ACTIVITIES = [
  { icon: "✅", text: "Attending business meetings, discussions, and negotiations" },
  { icon: "✅", text: "Participating in trade fairs, exhibitions, and expos" },
  { icon: "✅", text: "Conducting supplier, factory, or partner site visits" },
  { icon: "✅", text: "Signing contracts and commercial agreements" },
  { icon: "✅", text: "Attending industry conferences and professional seminars" },
  { icon: "✅", text: "Corporate training — receiving, not delivering" },
  { icon: "✅", text: "Attending board meetings or investor presentations" },
  { icon: "✅", text: "Scouting locations for potential business expansion" },
  { icon: "❌", text: "Taking up local employment or freelance work" },
  { icon: "❌", text: "Receiving payment from any local employer or client" },
  { icon: "❌", text: "Working remotely for your home-country employer" },
  { icon: "❌", text: "Remaining beyond the permitted visa duration" },
];

export default function BusinessSlugPage({
  slug,
  natCap,
  destCap,
  nFlag,
  dFlag,
  destInfo,
  isSchengen,
  canonicalUrl
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">

      {/* BREADCRUMB — SEO Internal Links */}
      <div className="bg-white border-b border-slate-100 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-slate-400 font-medium flex-wrap">
          <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/visa" className="hover:text-amber-600 transition-colors">Visa Guides</Link>
          <span>›</span>
          <Link href="/visa/business-visa" className="hover:text-amber-600 transition-colors">Business Visa</Link>
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
              <Link key={v.label} href={v.href}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold border transition-all ${v.active
                  ? 'bg-amber-400 text-slate-900 border-amber-400'
                  : 'border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-700'}`}>
                {v.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center -space-x-3">
                  <img src={nFlag || flagUrl('in')} className="w-12 h-8 rounded shadow-md border-2 border-white z-10 object-cover" alt={natCap} />
                  <img src={dFlag || flagUrl('de')} className="w-12 h-8 rounded shadow-md border-2 border-white z-20 object-cover" alt={destCap} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Business Visa Guide — Updated May 2026</p>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                    {natCap} <span className="text-amber-500">→</span> {destCap} Business Visa
                  </h1>
                </div>
              </div>
              <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
                Complete, government-verified business visa requirements for <strong>{natCap} passport holders</strong> travelling to <strong>{destCap}</strong> — including the full document checklist, current fees, official processing times, invitation letter template, and direct embassy portal links.
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-xs font-bold border border-amber-200 uppercase tracking-wider">
                {isSchengen ? "Schengen Type C Visa" : "Business Visa"}
              </span>
              {isSchengen && (
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-[10px] font-bold border border-blue-200">
                  🇪🇺 Covers 27 Countries
                </span>
              )}
              <p className="text-[10px] text-slate-400">Free Guide · Updated May 2026</p>
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
              <h2 className="text-xl font-bold mb-4">Business Visa Overview — {natCap} to {destCap}</h2>
              <p className="text-slate-600 leading-relaxed text-sm mb-4">
                The <strong>{destCap} business visa</strong> allows citizens and permanent residents of <strong>{natCap}</strong> to enter {destCap} for short-term commercial and professional activities. This includes attending meetings with business partners, negotiating contracts, visiting trade exhibitions, conducting supplier audits, participating in industry conferences, and signing commercial agreements.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm mb-4">
                A {destCap} business visa does <strong>not</strong> permit the holder to take up employment, receive payment from any {destCap}-based employer or client, or remain in the country beyond the permitted duration. For employment-related travel, see our <Link href="/visa/work-visa" className="text-amber-600 font-semibold hover:underline">{destCap} Work Visa Guide →</Link>
              </p>

              {isSchengen && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-4">
                  <p className="text-sm font-bold text-blue-900 mb-2">🇪🇺 This Is a Schengen Business Visa (Type C)</p>
                  <p className="text-xs text-blue-800 leading-relaxed mb-2">
                    Your {destCap} business visa is a Schengen Type C visa. This means it is valid for travel across <strong>all 27 Schengen member states</strong> — not just {destCap}. You may transit freely through any other Schengen country on the same visa.
                  </p>
                  <p className="text-xs text-blue-800 leading-relaxed">
                    The visa permits a <strong>maximum stay of 90 days within any 180-day rolling period</strong> across all Schengen countries combined. Apply at the {destCap} consulate if {destCap} is your primary destination country.
                  </p>
                </div>
              )}

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="text-xs text-slate-500 leading-relaxed">
                  ⚠️ <strong>Employment Prohibition:</strong> This visa strictly does not permit employment, freelance work, or receiving any form of payment from a {destCap}-based source. This includes remote work for your home-country employer. Violation of visa conditions can result in deportation, future visa bans, and criminal charges. If employment is your purpose, see our <Link href="/visa/work-visa" className="text-amber-600 font-semibold hover:underline">Work Visa Guide →</Link>
                </p>
              </div>
            </section>

            {/* AT A GLANCE */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-6">{natCap} → {destCap} Business Visa: At a Glance</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Processing Time", value: isSchengen ? "10–15 days" : "5–15 days" },
                  { label: "Max Stay", value: isSchengen ? "90 days / 180" : "30–90 days" },
                  { label: "Entry Type", value: "Single / Multiple" },
                  { label: "Expedite Option", value: "Available" },
                ].map((item) => (
                  <div key={item.label} className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                    <p className="text-base font-extrabold text-slate-900 mb-1">{item.value}</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{item.label}</p>
                  </div>
                ))}
              </div>
              {/* Application timeline */}
              <div className="border-t border-slate-100 pt-5">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Recommended Application Timeline</p>
                <div className="space-y-3">
                  {[
                    { time: "8 weeks before", action: "Start gathering documents — request invitation letter from host company" },
                    { time: "6–7 weeks before", action: "Book embassy appointment, confirm hotel and return flight bookings" },
                    { time: "5–6 weeks before", action: "Submit complete application and provide biometrics" },
                    { time: "2–3 weeks before", action: "Expected decision — verify visa details upon collection" },
                    { time: "1 week before", action: "Confirm all bookings, prepare document pack for travel" },
                  ].map(t => (
                    <div key={t.time} className="flex items-start gap-4">
                      <span className="shrink-0 text-[10px] font-bold text-amber-600 uppercase tracking-wider w-28">{t.time}</span>
                      <p className="text-xs text-slate-600">{t.action}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* PERMITTED ACTIVITIES */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">What Is (and Isn't) Permitted on a {destCap} Business Visa</h2>
              <p className="text-sm text-slate-500 mb-6">Understanding the scope of your visa is critical. Misrepresenting your activities can lead to deportation and future visa bans.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {PERMITTED_ACTIVITIES.map((item, i) => (
                  <div key={i} className={`flex items-start gap-3 p-3.5 rounded-xl text-sm ${item.icon === '✅' ? 'bg-green-50 border border-green-100 text-green-800' : 'bg-red-50 border border-red-100 text-red-800'}`}>
                    <span className="shrink-0 mt-0.5">{item.icon}</span>
                    <span className="font-medium text-xs leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-5">
                <p className="text-xs text-amber-800 leading-relaxed">
                  <strong>Grey Area:</strong> Attending a job interview in {destCap} is generally permitted on a business visa in most countries — but signing an employment contract or starting work is not. If you are offered a job, you must leave and return on the appropriate work visa. See our <Link href="/visa/work-visa" className="text-amber-700 font-semibold hover:underline">{destCap} Work Visa Guide →</Link>
                </p>
              </div>
            </section>

            {/* DOCUMENTS */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Required Documents — {natCap} Applying for {destCap} Business Visa</h2>
              <p className="text-sm text-slate-500 mb-6">The following documents are required for a {natCap} passport holder's {destCap} business visa application. Use our <Link href="/visa-resources/visa-checklist-generator" className="text-amber-600 font-semibold hover:underline">Checklist Generator</Link> to download a personalised PDF version of this list.</p>
              <div className="space-y-3">
                {DOCUMENTS.map((doc) => (
                  <div key={doc.title} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 transition-colors">
                    <span className="text-xl shrink-0 mt-0.5">{doc.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-sm text-slate-900">{doc.title}</h4>
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${doc.mandatory ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-500'}`}>
                          {doc.mandatory ? 'Required' : 'Recommended'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{doc.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/visa-resources/visa-checklist-generator"
                  className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-amber-500 transition-all">
                  Download PDF Checklist for {destCap} →
                </Link>
                <Link href="/visa-resources/visa-document-generator"
                  className="inline-flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-bold text-sm hover:border-amber-300 transition-all">
                  Invitation Letter Templates →
                </Link>
              </div>
            </section>

            {/* APPLICATION STEPS */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Step-by-Step: How {natCap} Nationals Apply for a {destCap} Business Visa</h2>
              <p className="text-sm text-slate-500 mb-7">Follow these steps in order to prepare the strongest possible application. Each step includes an expert tip from our visa guides team.</p>
              <div className="space-y-6">
                {APPLICATION_STEPS.map((item, index) => (
                  <div key={index} className="flex gap-5">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="font-bold text-sm text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed mb-3">{item.detail(destCap)}</p>
                      <div className="bg-amber-50 border border-amber-100 rounded-lg px-4 py-2.5">
                        <p className="text-[11px] text-amber-700 font-semibold">💡 Expert Tip: {item.tip}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Schengen-specific section */}
            {isSchengen && (
              <section className="bg-white rounded-2xl p-8 border border-blue-200 shadow-sm">
                <h2 className="text-xl font-bold mb-5">🇪🇺 Schengen Business Visa — Special Rules for {natCap} Applicants</h2>
                <div className="space-y-5">
                  {[
                    {
                      heading: "The 90/180 Day Rule",
                      body: `Your ${destCap} business visa allows a maximum of 90 days within any rolling 180-day period across ALL 27 Schengen member states combined. This is a rolling window, not a calendar period. Even a single day in any Schengen country counts toward your 90 days. Use the EU's official Schengen calculator to plan your trips and avoid overstaying.`,
                    },
                    {
                      heading: "Multiple-Entry Privileges",
                      body: `First-time Schengen applicants from ${natCap} typically receive single-entry visas. After demonstrating a clean Schengen travel history, subsequent applications may yield multiple-entry visas valid for 1, 2, or 5 years — greatly reducing future application costs and hassle.`,
                    },
                    {
                      heading: `Which ${destCap} Consulate to Apply Through`,
                      body: `Apply at the ${destCap} consulate or embassy in your home country, or through an authorised Visa Application Centre (VFS Global, TLScontact, etc.). If your trip includes multiple Schengen countries, apply through the consulate of the country where you will spend the most days.`,
                    },
                    {
                      heading: "Insurance Requirements",
                      body: `All Schengen visa applicants must provide travel insurance with a minimum coverage of €30,000 for medical expenses and emergency repatriation, valid for all Schengen member states and the entire duration of every trip on the visa. This is mandatory — not optional.`,
                    },
                  ].map(item => (
                    <div key={item.heading} className="border-l-4 border-blue-300 pl-5">
                      <h3 className="font-bold text-sm text-slate-900 mb-1.5">{item.heading}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">{natCap} to {destCap} Business Visa — Frequently Asked Questions</h2>
              <p className="text-sm text-slate-500 mb-6">Answers to the most common questions from {natCap} business travellers applying for {destCap} business visas.</p>
              <div className="space-y-5">
                {FAQ.map((item, i) => (
                  <div key={i} className="border-b border-slate-100 last:border-0 pb-5 last:pb-0">
                    <h4 className="font-bold text-sm text-slate-900 mb-2">{item.q}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* RELATED ROUTES */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Related Business Visa Guides</h2>
              <p className="text-sm text-slate-500 mb-6">Other popular business visa routes frequently searched alongside {natCap} → {destCap}.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RELATED_GUIDES.map((r) => {
                  const routeSlug = `${r.nat.toLowerCase()}-to-${r.dest.toLowerCase().replace(/\s+/g, '-')}`;
                  const nf = flagUrl(r.natCode);
                  const df = flagUrl(r.destCode);
                  return (
                    <Link key={routeSlug}
                      href={`/visa/business-visa/${routeSlug}`}
                      className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-amber-300 hover:shadow-sm group transition-all">
                      <div className="flex -space-x-2">
                        <img src={nf} className="w-7 h-5 rounded object-cover border-2 border-white shadow-sm z-10" alt={r.nat} />
                        <img src={df} className="w-7 h-5 rounded object-cover border-2 border-white shadow-sm z-20" alt={r.dest} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{r.nat} → {r.dest}</p>
                        <p className="text-[10px] text-slate-400">Business Visa Guide</p>
                      </div>
                      <span className="ml-auto text-slate-300 group-hover:text-amber-500 font-bold transition-colors">›</span>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* INTERNAL RESOURCE LINKS */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Visa Tools & Resources for {natCap} Travellers</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: "📋", title: `${destCap} Visa Checklist Generator`, desc: `Download a personalised PDF document checklist for ${natCap} nationals applying for a ${destCap} business visa.`, href: "/visa-resources/visa-checklist-generator" },
                  { icon: "✉️", title: "Invitation Letter Templates", desc: `Business visa invitation letter templates accepted by the ${destCap} embassy — free to download.`, href: "/visa-resources/cover-letter-templates" },
                  { icon: "🏛️", title: `${destCap} Embassy Directory`, desc: `Official contact details, addresses, and appointment booking links for the ${destCap} embassy.`, href: "/visa-resources/embassy-directory" },
                  { icon: "⏱️", title: "Processing Time Tracker", desc: `Live-updated ${destCap} business visa processing times for ${natCap} applicants.`, href: "/visa-resources/processing-times" },
                ].map(r => (
                  <Link key={r.title} href={r.href}
                    className="flex items-start gap-4 p-5 border border-slate-200 rounded-xl hover:border-amber-200 hover:shadow-sm transition-all">
                    <span className="text-2xl shrink-0">{r.icon}</span>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 mb-1">{r.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{r.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* OTHER VISA TYPES */}
            <section className="bg-amber-400 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Explore Other Visa Types for {destCap}</h2>
              <p className="text-sm text-amber-900 mb-6">Need a different visa category for {destCap}? Find the right guide below.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Work Visa", desc: "Employment & sponsorship", href: "/visa/work-visa", icon: "💼" },
                  { label: "Student Visa", desc: "Study & university", href: "/visa/student-visa", icon: "🎓" },
                  { label: "Tourist Visa", desc: "Leisure & tourism", href: "/visa/tourist-visa", icon: "🌴" },
                  { label: "Transit Visa", desc: "Layovers & connections", href: "/visa/transit-visa", icon: "🛫" },
                ].map((v) => (
                  <Link key={v.label} href={v.href}
                    className="bg-white rounded-xl p-4 hover:shadow-md transition-all group">
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
              <h3 className="text-lg font-bold mb-2">Get Your Full {destCap} Checklist</h3>
              <p className="text-slate-400 text-xs mb-6 leading-relaxed">
                Personalised PDF document checklist for <strong className="text-white">{natCap}</strong> professionals visiting <strong className="text-white">{destCap}</strong>. Includes all required and recommended documents with specific notes for your nationality.
              </p>
              <Link href="/visa-resources/visa-checklist-generator"
                className="block w-full bg-amber-400 hover:bg-amber-300 text-slate-900 text-center py-3.5 rounded-xl font-bold transition-all text-sm">
                Download Checklist (Free PDF) →
              </Link>

              <div className="mt-6 border-t border-slate-800 pt-5 space-y-3">
                {[
                  { label: "Visa Type", value: isSchengen ? "Schengen Type C" : "Business" },
                  { label: "Processing", value: isSchengen ? "10–15 days" : "5–15 days" },
                  { label: "Max Stay", value: isSchengen ? "90 / 180 days" : "Up to 90 days" },
                  { label: "Multiple Entry", value: "Available" },
                  { label: "Expedited", value: "Available" },
                  { label: "Embassy Interview", value: "May be required" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-xs">
                    <span className="text-slate-500">{row.label}</span>
                    <span className="text-slate-200 font-bold">{row.value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t border-slate-800 pt-5">
                <Link href="/visa-resources/embassy-directory"
                  className="block w-full text-center text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors py-1">
                  Find {destCap} Embassy Near You →
                </Link>
              </div>
            </div>

            {/* Other visa types sidebar */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Other Visa Types for {destCap}</h3>
              <div className="space-y-2">
                {[
                  { label: `${destCap} Work Visa`, href: "/visa/work-visa", icon: "💼" },
                  { label: `${destCap} Student Visa`, href: "/visa/student-visa", icon: "🎓" },
                  { label: `${destCap} Tourist Visa`, href: "/visa/tourist-visa", icon: "🌴" },
                  { label: `${destCap} Transit Visa`, href: "/visa/transit-visa", icon: "🛫" },
                ].map((v) => (
                  <Link key={v.label} href={v.href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 hover:border-amber-200 border border-transparent transition-all">
                    <span className="text-lg">{v.icon}</span>
                    <span className="text-sm font-semibold text-slate-700 hover:text-amber-700">{v.label}</span>
                    <span className="ml-auto text-slate-300 text-sm">›</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Other nationalities for this destination */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-4">{destCap} Business Visa — Other Nationalities</h3>
              <div className="space-y-2">
                {[
                  { nat: "Indian", code: "in" },
                  { nat: "Nigerian", code: "ng" },
                  { nat: "Pakistani", code: "pk" },
                  { nat: "Filipino", code: "ph" },
                  { nat: "Bangladeshi", code: "bd" },
                  { nat: "Egyptian", code: "eg" },
                ].map(({ nat, code }) => {
                  const routeSlug = `${nat.toLowerCase()}-to-${destCap.toLowerCase().replace(/\s+/g, '-')}`;
                  return (
                    <Link key={nat} href={`/visa/business-visa/${routeSlug}?nFlag=${encodeURIComponent(flagUrl(code))}&dFlag=${encodeURIComponent(dFlag || flagUrl('de'))}`}
                      className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-amber-50 transition-colors">
                      <img src={flagUrl(code)} className="w-6 h-4 rounded object-cover shadow-sm" alt={nat} />
                      <span className="text-xs font-semibold text-slate-600 hover:text-amber-700">{nat} Nationals →</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Important notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-amber-900 mb-2">⚠️ Important Disclaimer</h3>
              <p className="text-xs text-amber-800 leading-relaxed">
                A business visa does not guarantee entry into {destCap}. Border officers can deny entry at their discretion. Always carry your full document set — invitation letter, hotel bookings, employer letter, and return ticket — in your hand luggage. Requirements change frequently — verify details at the official {destCap} embassy website before submitting.
              </p>
            </div>

            {/* Resources */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-3">🔧 Free Visa Tools</h3>
              <div className="space-y-2">
                {[
                  { label: "Visa Checklist Generator", href: "/visa-resources/visa-checklist-generator" },
                  { label: "Invitation Letter Templates", href: "/visa-resources/visa-document-generator" },
                  { label: "Embassy Directory", href: "/visa-resources" },
                  { label: "Processing Time Tracker", href: "/visa-processing-time-tracker" },
                  { label: "Schengen Visa Guide", href: "/visa-resources/schengen-visa" },
                ].map((r) => (
                  <Link key={r.label} href={r.href}
                    className="block text-xs font-semibold text-slate-500 hover:text-amber-600 hover:underline underline-offset-4 py-1 transition-colors">
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
          <h3 className="text-2xl font-extrabold text-slate-900 mb-3">Need a Different Business Visa Guide?</h3>
          <p className="text-sm text-slate-500 mb-6">Get a personalised, complete guide for any nationality and destination combination — free, no registration required.</p>
          <div className="flex flex-col md:flex-row gap-3 justify-center">
            <Link href="/visa/business-visa#search"
              className="inline-block bg-amber-400 text-slate-900 px-10 py-4 rounded-xl font-bold hover:bg-amber-500 transition-all shadow-lg shadow-amber-100 text-sm">
              Search Business Visa Requirements →
            </Link>
            <Link href="/visa/business-visa"
              className="inline-block bg-white text-slate-700 border border-slate-200 px-10 py-4 rounded-xl font-bold hover:border-amber-300 transition-all text-sm">
              View All Business Visa Guides →
            </Link>
          </div>
        </div>

        {/* SEO-rich footer nav */}
        <div className="mt-8 border-t border-slate-200 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Popular Destinations</p>
            {[
              { label: "Business Visa USA", href: "/visa/business-visa/indian-to-united-states" },
              { label: "Business Visa UK", href: "/visa/business-visa/indian-to-united-kingdom" },
              { label: "Business Visa Germany", href: "/visa/business-visa/indian-to-germany" },
              { label: "Business Visa UAE", href: "/visa/business-visa/indian-to-uae" },
              { label: "Business Visa Canada", href: "/visa/business-visa/indian-to-canada" },
            ].map(l => <Link key={l.href} href={l.href} className="block text-[11px] text-slate-500 hover:text-amber-600 py-0.5 hover:underline">{l.label} →</Link>)}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">By Nationality</p>
            {[
              { label: "Indian Business Visa", href: "/visa/business-visa?nat=India" },
              { label: "Nigerian Business Visa", href: "/visa/business-visa?nat=Nigeria" },
              { label: "Pakistani Business Visa", href: "/visa/business-visa?nat=Pakistan" },
              { label: "Filipino Business Visa", href: "/visa/business-visa?nat=Philippines" },
              { label: "Bangladeshi Business Visa", href: "/visa/business-visa?nat=Bangladesh" },
            ].map(l => <Link key={l.href} href={l.href} className="block text-[11px] text-slate-500 hover:text-amber-600 py-0.5 hover:underline">{l.label} →</Link>)}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Other Visa Types</p>
            {[
              { label: "Work Visa Guides", href: "/visa/work-visa" },
              { label: "Student Visa Guides", href: "/visa/student-visa" },
              { label: "Tourist Visa Guides", href: "/visa/tourist-visa" },
              { label: "Transit Visa Guides", href: "/visa/transit-visa" },
              { label: "Schengen Visa Guide", href: "/visa/schengen-visa" },
            ].map(l => <Link key={l.href} href={l.href} className="block text-[11px] text-slate-500 hover:text-amber-600 py-0.5 hover:underline">{l.label} →</Link>)}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Visa Resources</p>
            {[
              { label: "Checklist Generator", href: "/visa-resources/visa-checklist-generator" },
              { label: "Cover Letter Templates", href: "/visa-resources/visa-document-generator" },
              { label: "Embassy Directory", href: "/visa-resources" },
              { label: "Processing Times", href: "/visa-processing-time-tracker" },
              { label: "Schengen Visa", href: "/visa-resources/schengen-visa" },
            ].map(l => <Link key={l.href} href={l.href} className="block text-[11px] text-slate-500 hover:text-amber-600 py-0.5 hover:underline">{l.label} →</Link>)}
          </div>
        </div>
      </div>

    </div>
  );
}