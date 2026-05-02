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
  { icon: "🛂", title: "Valid Passport", detail: "Min. 6 months validity beyond intended stay. 2 blank pages minimum.", mandatory: true },
  { icon: "✉️", title: "Invitation Letter", detail: "From host company on letterhead, signed by a director. Includes meeting dates, purpose, and host details.", mandatory: true },
  { icon: "🏢", title: "Employer Cover Letter", detail: "From your company confirming your position, purpose of travel, and financial responsibility for the trip.", mandatory: true },
  { icon: "📄", title: "Bank Statements", detail: "Last 3–6 months. Personal or company account showing sufficient funds.", mandatory: true },
  { icon: "🛡️", title: "Travel Insurance", detail: "Medical coverage for full duration. Min. €30,000 for Schengen countries.", mandatory: true },
  { icon: "🏨", title: "Hotel Booking", detail: "Confirmed (refundable) accommodation for the entire stay.", mandatory: true },
  { icon: "✈️", title: "Return Flight", detail: "Confirmed return itinerary demonstrating intent to leave.", mandatory: true },
  { icon: "📸", title: "Passport Photos", detail: "2 recent photos, white background. Specifications vary by country.", mandatory: true },
  { icon: "📋", title: "Application Form", detail: "Download from official embassy site. Completed and signed.", mandatory: true },
  { icon: "💼", title: "Business Registration", detail: "Your employer's trade licence or company certificate.", mandatory: false },
  { icon: "🪪", title: "Business Card / Profile", detail: "LinkedIn printout accepted by many embassies as proof of role.", mandatory: false },
  { icon: "🗂️", title: "Prior Visa History", detail: "Prior Schengen or US visas significantly strengthen the application.", mandatory: false },
];

const FAQ = [
  {
    q: "How long can I stay on a business visa?",
    a: "Most business visas permit stays of 30–90 days per visit. Schengen business visas allow up to 90 days within any 180-day period across all 27 member states. Check the specific conditions printed on your visa sticker."
  },
  {
    q: "Can I extend my business visa?",
    a: "Extensions are rarely granted automatically. You must apply before your current visa expires through the local immigration authority. Overstaying — even by one day — can result in fines, deportation, or future visa bans."
  },
  {
    q: "Does a business visa allow remote work?",
    a: "No. Business visas strictly prohibit remote work or receiving payment from any local employer. Digital nomads and remote workers should look into dedicated digital nomad visas or work permits."
  },
  {
    q: "What if my application is rejected?",
    a: "You will receive a refusal notice with the reason. Common reasons include incomplete documentation, insufficient funds, or weak ties to your home country. You can reapply after addressing the rejection reason. Consider engaging a visa agent for complex cases."
  },
  {
    q: "Do I need an invitation letter for every country?",
    a: "Most countries strongly recommend or require one. For Schengen countries it is standard practice. The letter demonstrates the genuine business purpose of your trip and significantly reduces scrutiny."
  },
];

const RELATED_GUIDES = [
  { nat: "Indian", natCode: "in", dest: "Germany", destCode: "de" },
  { nat: "Indian", natCode: "in", dest: "United States", destCode: "us" },
  { nat: "Indian", natCode: "in", dest: "United Kingdom", destCode: "gb" },
  { nat: "Nigerian", natCode: "ng", dest: "Germany", destCode: "de" },
  { nat: "Pakistani", natCode: "pk", dest: "UAE", destCode: "ae" },
  { nat: "Filipino", natCode: "ph", dest: "Singapore", destCode: "sg" },
];

export default async function BusinessSlugPage({ params, searchParams }) {
  const { slug } = await params;
  const { nFlag, dFlag } = await searchParams;

  const parts = decodeURIComponent(slug).split("-to-");
  const nationality = parts[0]?.replace(/-/g, ' ') || "Origin";
  const destination = parts[1]?.replace(/-/g, ' ') || "Destination";
  const cap = (str) => str.replace(/\b\w/g, (l) => l.toUpperCase());

  const natCap = cap(nationality);
  const destCap = cap(destination);

  // Determine if Schengen
  const schengenCountries = ["Germany", "France", "Italy", "Spain", "Netherlands", "Belgium", "Austria", "Portugal", "Greece", "Sweden", "Denmark", "Finland", "Norway", "Switzerland", "Poland", "Czech Republic", "Hungary", "Slovakia", "Slovenia", "Croatia", "Estonia", "Latvia", "Lithuania", "Luxembourg", "Malta", "Iceland", "Liechtenstein"];
  const isSchengen = schengenCountries.includes(destCap);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">

      {/* BREADCRUMB */}
      <div className="bg-white border-b border-slate-100 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-slate-400 font-medium">
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
              <Link
                key={v.label}
                href={v.href}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold border transition-all ${v.active
                  ? 'bg-amber-400 text-slate-900 border-amber-400'
                  : 'border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-700'
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
                  <img src={nFlag || flagUrl('in')} className="w-12 h-8 rounded shadow-md border-2 border-white z-10 object-cover" alt={natCap} />
                  <img src={dFlag || flagUrl('de')} className="w-12 h-8 rounded shadow-md border-2 border-white z-20 object-cover" alt={destCap} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Business Visa Guide</p>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                    {natCap} <span className="text-amber-500">→</span> {destCap}
                  </h1>
                </div>
              </div>
              <p className="text-sm text-slate-500 max-w-xl">
                Complete business visa requirements for {natCap} passport holders travelling to {destCap} — documents, fees, timelines, and application steps.
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-xs font-bold border border-amber-200 uppercase tracking-wider">
                {isSchengen ? "Schengen Visa" : "Business Visa"}
              </span>
              <p className="text-[10px] text-slate-400">Updated May 2026</p>
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
              <h2 className="text-xl font-bold mb-4">Business Visa Overview</h2>
              <p className="text-slate-600 leading-relaxed text-sm mb-4">
                The business visa for <strong>{destCap}</strong> allows citizens of <strong>{natCap}</strong> to enter the country for short-term commercial activities. This includes attending meetings, negotiating contracts, visiting trade exhibitions, and conducting supplier audits.
              </p>
              {isSchengen && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
                  <p className="text-sm font-bold text-amber-800 mb-1">🇪🇺 Schengen Business Visa</p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Your {destCap} business visa is a Schengen visa — it covers all 27 Schengen member states. Apply at the {destCap} consulate if that is your primary destination. You may transit freely through other Schengen countries on the same visa.
                  </p>
                </div>
              )}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="text-xs text-slate-500 leading-relaxed italic">
                  ⚠️ This visa does not permit the holder to take up employment, receive payment from a local source in {destCap}, or remain long-term. For employment, see our <Link href="/visa/work-visa" className="text-amber-600 font-semibold hover:underline">Work Visa Guide →</Link>
                </p>
              </div>
            </section>

            {/* AT A GLANCE */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-6">At a Glance</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Processing Time", value: isSchengen ? "10–15 days" : "5–15 days" },
                  { label: "Max Stay", value: isSchengen ? "90 days / 180" : "30–90 days" },
                  { label: "Entries", value: "Single / Multi" },
                  { label: "Expedite", value: "Available" },
                ].map((item) => (
                  <div key={item.label} className="bg-slate-50 rounded-xl p-4 text-center border border-slate-100">
                    <p className="text-base font-extrabold text-slate-900 mb-1">{item.value}</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{item.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* PERMITTED ACTIVITIES */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Permitted Activities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { icon: "✅", text: "Attending business meetings and negotiations" },
                  { icon: "✅", text: "Participating in trade fairs and exhibitions" },
                  { icon: "✅", text: "Conducting supplier or partner site visits" },
                  { icon: "✅", text: "Signing contracts and commercial agreements" },
                  { icon: "✅", text: "Attending conferences and industry seminars" },
                  { icon: "✅", text: "Corporate training (receiving, not delivering)" },
                  { icon: "❌", text: "Taking up local employment or freelancing" },
                  { icon: "❌", text: "Receiving payment from a local company" },
                ].map((item, i) => (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-xl text-sm ${item.icon === '✅' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    <span className="shrink-0 mt-0.5">{item.icon}</span>
                    <span className="font-medium text-xs leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* DOCUMENTS */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Required Documents</h2>
              <p className="text-sm text-slate-500 mb-6">For {natCap} passport holders applying for a {destCap} business visa.</p>
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
              <div className="mt-6">
                <Link
                  href="/visa-resources/visa-checklist-generator"
                  className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-amber-500 transition-all"
                >
                  Download PDF Checklist for {destCap} →
                </Link>
              </div>
            </section>

            {/* APPLICATION STEPS */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Step-by-Step Application Process</h2>
              <div className="space-y-6">
                {[
                  { t: "Confirm Permitted Activities", d: `Verify your planned activities in ${destCap} fall within business visa scope — meetings, conferences, site visits. Employment of any kind is not permitted.` },
                  { t: "Obtain Invitation Letter", d: `Request a formal invitation letter from your host company in ${destCap} on official letterhead. The letter must state your name, job title, exact visit dates, and purpose.` },
                  { t: "Prepare Your Documents", d: `Gather your passport, employer cover letter, bank statements (3–6 months), travel insurance, hotel booking, and return flight. Double-check all documents are signed and dated.` },
                  { t: "Book Embassy Appointment", d: `Schedule your appointment at the ${destCap} embassy, consulate, or VFS Global centre. Many countries allow online booking. Secure your slot at least 4–6 weeks before travel.` },
                  { t: "Submit & Provide Biometrics", d: "Attend your appointment with all original documents. Pay the non-refundable processing fee. Biometric data (fingerprints and photograph) will be collected." },
                  { t: "Await Decision & Travel", d: "Standard processing is 10–15 working days. Expedited options may be available. Once approved, verify visa dates and conditions carefully before booking non-refundable travel." },
                ].map((item, index) => (
                  <div key={index} className="flex gap-6">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="pt-1">
                      <h4 className="font-bold text-sm text-slate-900 mb-1">{item.t}</h4>
                      <p className="text-slate-500 text-xs leading-relaxed">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-5">
                {FAQ.map((item, i) => (
                  <div key={i} className="border-b border-slate-100 last:border-0 pb-5 last:pb-0">
                    <h4 className="font-bold text-sm text-slate-900 mb-2">Q: {item.q}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* RELATED ROUTES */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Related Business Visa Guides</h2>
              <p className="text-sm text-slate-500 mb-6">Other popular routes you may find useful.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {RELATED_GUIDES.map((r) => {
                  const slug = `${r.nat.toLowerCase()}-to-${r.dest.toLowerCase().replace(/\s+/g, '-')}`;
                  const nf = flagUrl(r.natCode);
                  const df = flagUrl(r.destCode);
                  return (
                    <Link
                      key={slug}
                      href={`/visa/business-visa/${slug}?nFlag=${encodeURIComponent(nf)}&dFlag=${encodeURIComponent(df)}`}
                      className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl hover:border-amber-300 hover:shadow-sm group transition-all"
                    >
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

            {/* OTHER VISA TYPES */}
            <section className="bg-amber-400 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Explore Other Visa Types for {destCap}</h2>
              <p className="text-sm text-amber-900 mb-6">Not a business traveller? Find the right visa category below.</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Work Visa", desc: "Employment & sponsorship", href: "/visa/work-visa", icon: "💼" },
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
                Personalised PDF document checklist for {natCap} professionals visiting {destCap}. Free download.
              </p>
              <Link
                href="/visa-resources/visa-checklist-generator"
                className="block w-full bg-amber-400 hover:bg-amber-300 text-slate-900 text-center py-3.5 rounded-xl font-bold transition-all text-sm"
              >
                Download Checklist (PDF)
              </Link>

              <div className="mt-6 border-t border-slate-800 pt-5 space-y-3">
                {[
                  { label: "Visa Type", value: isSchengen ? "Schengen C" : "Business" },
                  { label: "Processing", value: isSchengen ? "10–15 days" : "5–15 days" },
                  { label: "Max Stay", value: isSchengen ? "90 / 180 days" : "Up to 90 days" },
                  { label: "Expedite", value: "Available" },
                  { label: "Multiple Entry", value: "Available" },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-xs">
                    <span className="text-slate-500">{row.label}</span>
                    <span className="text-slate-200 font-bold">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Other visa types sidebar */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Other Visa Types</h3>
              <div className="space-y-2">
                {[
                  { label: "Work Visa Guides", href: "/visa/work-visa", icon: "💼" },
                  { label: "Student Visa Guides", href: "/visa/student-visa", icon: "🎓" },
                  { label: "Tourist Visa Guides", href: "/visa/tourist-visa", icon: "🌴" },
                  { label: "Transit Visa Guides", href: "/visa/transit-visa", icon: "🛫" },
                ].map((v) => (
                  <Link
                    key={v.label}
                    href={v.href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 hover:border-amber-200 border border-transparent transition-all"
                  >
                    <span className="text-lg">{v.icon}</span>
                    <span className="text-sm font-semibold text-slate-700 hover:text-amber-700">{v.label}</span>
                    <span className="ml-auto text-slate-300 text-sm">›</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Important notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-amber-900 mb-2">⚠️ Important Reminder</h3>
              <p className="text-xs text-amber-800 leading-relaxed">
                A business visa does not guarantee entry. Border officers can deny entry at any time. Always carry your full document set — invitation letter, hotel bookings, and employer letter — in your hand luggage.
              </p>
            </div>

            {/* Checklist tool */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-slate-900 mb-2">🔧 Visa Resources</h3>
              <div className="space-y-2">
                {[
                  { label: "Visa Checklist Generator", href: "/visa-resources/visa-checklist-generator" },
                  { label: "Cover Letter Templates", href: "/visa-resources/cover-letter-templates" },
                  { label: "Embassy Directory", href: "/visa-resources/embassy-directory" },
                  { label: "Processing Time Tracker", href: "/visa-resources/processing-times" },
                ].map((r) => (
                  <Link key={r.label} href={r.href} className="block text-xs font-semibold text-slate-500 hover:text-amber-600 hover:underline underline-offset-4 py-1 transition-colors">
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
          <h3 className="text-2xl font-extrabold text-slate-900 mb-3">Need a Different Business Visa?</h3>
          <p className="text-sm text-slate-500 mb-6">Get a personalised guide for any nationality and destination combination.</p>
          <Link
            href="/visa/business-visa#search"
            className="inline-block bg-amber-400 text-slate-900 px-10 py-4 rounded-xl font-bold hover:bg-amber-500 transition-all shadow-lg shadow-amber-100 text-sm"
          >
            Search Business Visa Requirements →
          </Link>
        </div>
      </div>

    </div>
  );
}