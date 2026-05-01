// ── IMPORTS ───────────────────────────────────────────────────────────────────
import clientPromise from '@/app/lib/mongodb';
import { createSlug } from "@/app/lib/utils";
import Link from "next/link";
import {
  CheckCircle, Clock, CreditCard, Info, AlertTriangle,
  Lightbulb, HelpCircle, Calendar, ShieldCheck, Landmark,
  GraduationCap, BookOpen, Briefcase, Award, Plane,
  ChevronRight, ArrowRightCircle, Languages, ListOrdered,
  Globe, TriangleAlert, MessageCircle, Wallet, ArrowRight,
  Mail, Star
} from "lucide-react";

// ── DATA FETCHERS ─────────────────────────────────────────────────────────────
async function getCountries() {
  const client = await clientPromise;
  const db = client.db('Eammu-Holidays');
  return db.collection('countries')
    .find({})
    .project({ _id: 0, country: 1, flag: 1, code: 1 })
    .toArray();
}

async function getStudentVisaData(slug) {
  const client = await clientPromise;
  const db = client.db('Eammu-Holidays');
  const doc = await db.collection('studentvisadata')
    .findOne({ slug }, { projection: { _id: 0 } });
  return doc || null;
}

// ── RELATED COUNTRIES ─────────────────────────────────────────────────────────
const RELATED_BY_REGION = {
  europe: ["Germany","France","Netherlands","Sweden","Denmark","Austria","Belgium","Switzerland"],
  anglophone: ["Canada","United Kingdom","Australia","New Zealand","USA","Ireland"],
  asia: ["Malaysia","Japan","South Korea","China","Singapore","Thailand"],
  gulf: ["UAE","Qatar","Saudi Arabia","Kuwait","Bahrain"],
};

function getRelatedCountries(name) {
  const found = Object.values(RELATED_BY_REGION).find(list => list.includes(name));
  const pool = found ? found.filter(c => c !== name) : ["Canada","United Kingdom","Australia","Germany","Malaysia"];
  return pool.slice(0, 5);
}

// ── SEO METADATA ──────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cleanSlug = slug.replace(/-student-visa$/, "").replace(/-visa$/, "");
  const countries = await getCountries();
  const country = countries.find(c => createSlug(c.country) === cleanSlug);
  const d = await getStudentVisaData(cleanSlug);
  const countryName = country?.country || "International";
  const year = new Date().getFullYear();
  const title = d?.title || `${countryName} Student Visa for Bangladeshi Students ${year} — Requirements, Fees & Scholarships`;
  const description = d?.description || `Complete ${year} guide to studying in ${countryName} for Bangladesh passport holders. Student visa requirements, IELTS scores, bank balance, scholarships, processing time and step-by-step application.`;
  return {
    metadataBase: new URL("https://www.eammu.com"),
    title,
    description,
    keywords: d?.seo_keywords?.join(", ") ||
      `${countryName} student visa Bangladesh ${year}, study in ${countryName} from Bangladesh, ${countryName} student visa requirements Bangladesh, ${countryName} scholarship Bangladeshi students, ${countryName} student visa bank balance, how to apply ${countryName} student visa Bangladesh, ${countryName} IELTS requirement student visa`,
    alternates: { canonical: `https://www.eammu.com/visa/student-visa/${cleanSlug}` },
    openGraph: {
      title: `Study in ${countryName} — Student Visa Guide Bangladesh ${year}`,
      description,
      images: [{ url: country?.flag || "", alt: `Study in ${countryName}` }],
      type: "article",
    },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  };
}

// ── JSON-LD SCHEMAS ───────────────────────────────────────────────────────────
function ArticleSchema({ countryName, slug, flag, description, year }) {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": `${countryName} Student Visa for Bangladeshi Students ${year}`,
        "description": description,
        "image": flag,
        "datePublished": `${year}-01-01`,
        "dateModified": new Date().toISOString().split("T")[0],
        "author": { "@type": "Organization", "name": "Eammu Holidays", "url": "https://www.eammu.com" },
        "publisher": {
          "@type": "Organization",
          "name": "Eammu Holidays",
          "logo": { "@type": "ImageObject", "url": "https://www.eammu.com/logo.png" }
        },
        "mainEntityOfPage": `https://www.eammu.com/visa/student-visa/${slug}`,
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.eammu.com" },
          { "@type": "ListItem", "position": 2, "name": "Student Visa", "item": "https://www.eammu.com/study-abroad/student-visa" },
          { "@type": "ListItem", "position": 3, "name": `Study in ${countryName}`, "item": `https://www.eammu.com/study-abroad/student-visa/${slug}` }
        ]
      },
      {
        "@type": "LocalBusiness",
        "name": "Eammu Holidays — Student Visa Consultancy",
        "url": "https://www.eammu.com",
        "telephone": "+880-163-131-2524",
        "email": "support@eammu.com",
        "address": { "@type": "PostalAddress", "addressLocality": "Dhaka", "addressCountry": "BD" },
        "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "1200" }
      }
    ]
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function FaqSchema({ faqs }) {
  if (!faqs?.length) return null;
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
      "@type": "Question",
      "name": f.question || f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer || f.a }
    }))
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

// ── REUSABLE SIDEBAR COMPONENTS ───────────────────────────────────────────────
function WhatsAppCTABox({ countryName, whatsappUrl }) {
  return (
    <div className="bg-black rounded-3xl p-7 text-white shadow-2xl overflow-hidden relative sticky top-6">
      <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-400/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 bg-yellow-400/20 border border-yellow-400/30 rounded-2xl flex items-center justify-center">
            <MessageCircle size={20} className="text-yellow-400" />
          </div>
          <div>
            <h3 className="font-black text-lg leading-none">Free Consultation</h3>
            <p className="text-gray-400 text-xs font-bold mt-0.5">Reply within 2 hours</p>
          </div>
        </div>
        <p className="text-gray-400 text-xs leading-relaxed mb-5">
          Expert consultants for <strong className="text-white">{countryName}</strong> student visas.
          SOP writing, document review, university selection — all included.
        </p>
        {[
          { icon: "🎓", label: "Service", val: "Full student visa support" },
          { icon: "📈", label: "Success Rate", val: "98% approved" },
          { icon: "💬", label: "Response", val: "Within 2 hours" },
          { icon: "📋", label: "Includes", val: "SOP review + doc check" },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl mb-2">
            <span className="text-lg">{s.icon}</span>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-yellow-400">{s.label}</p>
              <p className="font-black text-white text-sm">{s.val}</p>
            </div>
          </div>
        ))}
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full py-4 mt-4 bg-yellow-400 hover:bg-yellow-300 text-black rounded-2xl font-black transition-all shadow-xl active:scale-95 mb-2 group text-sm no-underline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
          </svg>
          WhatsApp — {countryName} Visa Help
          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </a>
        <p className="text-[9px] text-center text-gray-500 font-bold">FREE ADVICE · NO UPFRONT FEES</p>
      </div>
    </div>
  );
}

function RelatedCountriesBox({ currentCountry }) {
  const related = getRelatedCountries(currentCountry);
  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 p-5">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Also Explore</p>
      <div className="flex flex-col gap-1">
        {related.map(c => (
          <Link key={c} href={`/visa/student-visa/${createSlug(c)}`}
            title={`Study in ${c} — Student Visa Guide for Bangladeshi Students`}
            className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-green-700 px-3 py-2 rounded-xl hover:bg-green-50 transition-all no-underline"
          >
            <ChevronRight size={12} className="text-yellow-500 shrink-0" /> Study in {c}
          </Link>
        ))}
        <Link href="/visa/student-visa"
          className="flex items-center gap-2 text-xs font-black text-green-700 px-3 py-2 rounded-xl hover:bg-green-50 transition-all no-underline mt-1 border-t border-gray-100 pt-3"
        >
          <Globe size={12} className="shrink-0" /> View All 200+ Countries →
        </Link>
      </div>
    </div>
  );
}

function OtherVisaBox({ countryName, slug }) {
  return (
    <div className="bg-gray-50 rounded-2xl border-2 border-gray-100 p-5">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-3">Other {countryName} Visas</p>
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: "Tourist Visa", href: `/visa/tourist-visa/${slug}`, icon: "✈️" },
          { label: "Work Visa", href: `/visa/work-visa/${slug}`, icon: "💼" },
          { label: "Business Visa", href: `/visa/business-visa/${slug}`, icon: "🏢" },
          { label: "Medical Visa", href: `/visa/medical-visa/${slug}`, icon: "🏥" },
        ].map(t => (
          <Link key={t.href} href={t.href}
            title={`${countryName} ${t.label} for Bangladeshi Citizens`}
            className="flex items-center gap-2 text-xs font-bold text-gray-600 hover:text-green-700 p-2.5 rounded-xl bg-white border border-gray-100 hover:border-yellow-300 transition-all no-underline"
          >
            <span>{t.icon}</span> {t.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function EmailCTABox({ countryName, whatsappUrl }) {
  return (
    <div className="bg-yellow-400 rounded-3xl p-7 text-center">
      <div className="text-4xl mb-3">🎓</div>
      <h4 className="font-black text-xl text-black mb-2">Ready to Study in {countryName}?</h4>
      <p className="text-black/70 text-xs leading-relaxed mb-5">
        Our specialists handle admission support, SOP writing, document review, and full visa application.
      </p>
      <a href="mailto:info@visaexpresshub.com"
        className="flex items-center justify-center gap-2 bg-black text-white py-3 rounded-xl font-black text-sm hover:bg-gray-800 transition mb-3 no-underline"
      >
        <Mail size={14} /> info@visaexpresshub.com
      </a>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-black text-sm hover:bg-green-700 transition no-underline"
      >
        💬 WhatsApp Now — Free
      </a>
    </div>
  );
}
// ── FALLBACK PAGE (country exists, no DB data yet) ────────────────────────────
function FallbackStudentVisaPage({ country, whatsappUrl, cleanSlug }) {
  const countryName = country.country;
  const year = new Date().getFullYear();

  const generalDocs = [
    "Original valid passport (minimum 6 months validity beyond study duration)",
    "University / College admission letter or Offer of Admission (LOA)",
    "Completed student visa application form (signed)",
    "Recent passport-size photographs — white background, ICAO standard",
    "Academic certificates and transcripts (SSC, HSC, Bachelor's) — notarized and attested",
    "English language test scores: IELTS Academic, PTE Academic, TOEFL iBT, or Duolingo",
    "Personal bank statement — last 6 months showing sufficient funds",
    "Sponsor's bank statement, solvency certificate and income proof",
    "Statement of Purpose (SOP) — study goals, career plan and intent to return to Bangladesh",
    "Financial affidavit or proof of scholarship / sponsorship letter",
    "Travel insurance covering the full duration of study",
    "Biometric appointment confirmation at VFS Global Dhaka (if required by country)",
  ];

  const byProfession = [
    { role: "Fresh Graduate", items: ["SSC & HSC certificates + transcripts", "Bachelor's degree + mark sheets", "Gap explanation letter (if study gap)", "Parents' financial documents"] },
    { role: "Working Professional", items: ["Employer NOC (on letterhead)", "Salary certificate / pay slips (6 months)", "Income tax return (last 2–3 years)", "Employment verification letter"] },
    { role: "Self-Sponsored", items: ["Trade license (English + notary)", "Business bank statement (6–12 months)", "CA-certified financial statement", "Asset documents (land, property)"] },
    { role: "Scholarship Holder", items: ["Official scholarship award letter", "University sponsor confirmation", "No-objection from sponsoring body", "Scholarship terms & coverage proof"] },
  ];

  const langTests = [
    { name: "IELTS Academic", min: "6.0 – 6.5", target: "7.0+", note: "Most widely accepted globally" },
    { name: "PTE Academic", min: "50 – 58", target: "65+", note: "Fast results, widely accepted" },
    { name: "TOEFL iBT", min: "80 – 90", target: "100+", note: "Preferred by US/Canada universities" },
    { name: "Duolingo DET", min: "100 – 110", target: "125+", note: "Accepted by many colleges" },
  ];

  const steps = [
    { n: "01", title: "Choose Program & University", desc: "Research accredited institutions and confirm post-study work eligibility for your chosen program." },
    { n: "02", title: "Take Language Tests (IELTS/PTE/TOEFL)", desc: "Meet the minimum score required by your target institution and the visa category." },
    { n: "03", title: "Receive Admission / Offer Letter (LOA)", desc: "Apply to 3–5 universities simultaneously. Secure Letter of Acceptance before applying for visa." },
    { n: "04", title: "Prepare Financial Documents", desc: "Gather 6–12 months of consistent bank statements, solvency certificate and financial affidavit." },
    { n: "05", title: "Write a Strong Statement of Purpose", desc: "Clearly explain study goals, career plan in Bangladesh, and your ties to your home country." },
    { n: "06", title: "Submit Visa Application at Embassy / VFS", desc: "Apply at the embassy or JVAC/VFS Global Dhaka with a complete, consistent document package." },
    { n: "07", title: "Biometrics & Interview (if required)", desc: "Some countries require biometric enrollment or consular interview — confirm with the embassy." },
    { n: "08", title: "Receive Visa & Book Flight", desc: "Collect your passport, arrange travel insurance, and begin your international study journey." },
  ];

  const faqs = [
    { q: `Do Bangladeshi students need a visa to study in ${countryName}?`, a: `Yes. Bangladesh passport holders require a student visa or study permit to enrol in ${countryName}. Requirements, fees and processing times vary. WhatsApp our consultants for the exact current ${year} policy for ${countryName}.` },
    { q: `How much bank balance do I need for a ${countryName} student visa?`, a: `Most countries require full first-year tuition plus living expenses (BDT 3–10 lakh depending on institution and city). A consistent 6–12 month banking history is equally critical — last-minute lump deposits are flagged as red signals.` },
    { q: `Is IELTS mandatory for ${countryName} student visa?`, a: `IELTS Academic (6.0–6.5) is widely required, but many institutions also accept PTE Academic, TOEFL iBT, or Duolingo. Always verify from your target university and the specific visa category.` },
    { q: `Can I work part-time while studying in ${countryName}?`, a: `Most destinations allow 20–24 hours per week during semester and full-time during academic breaks. Work rights vary by country — our consultants can confirm current ${countryName} policy.` },
    { q: `How long does the ${countryName} student visa take to process?`, a: `Processing varies: typically 4–16 weeks depending on the country, season, and completeness of your application. Apply at least 3 months before your course start date.` },
    { q: `What scholarships are available for Bangladeshi students in ${countryName}?`, a: `${countryName} universities and government bodies offer scholarships ranging from partial tuition waivers to fully-funded programs. Contact Eammu Holidays for a personalized ${year} scholarship shortlist.` },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'DM Sans','Plus Jakarta Sans',system-ui,sans-serif" }}>
      <FaqSchema faqs={faqs} />
      <ArticleSchema countryName={countryName} slug={cleanSlug} flag={country.flag}
        description={`Complete ${year} guide to studying in ${countryName} for Bangladesh passport holders.`} year={year} />

      {/* ── HERO ── */}
      <div className="relative bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-5 py-16 md:py-24 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs text-white/40 font-semibold flex-wrap">
              <li><Link href="/" className="hover:text-white/70 transition">Home</Link></li>
              <li><ChevronRight size={12} /></li>
              <li><Link href="/visa/student-visa" className="hover:text-white/70 transition">Student Visa</Link></li>
              <li><ChevronRight size={12} /></li>
              <li className="text-white/60">{countryName}</li>
            </ol>
          </nav>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="bg-yellow-400/20 border border-yellow-400/40 text-yellow-400 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">{year} Student Visa Guide</span>
                <span className="bg-white/10 border border-white/20 text-white/60 px-4 py-1.5 rounded-full text-xs font-bold">Bangladesh Passport Holders</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-3">
                Study in {countryName}<br />
                <span className="text-yellow-400">Student Visa Guide</span>
              </h1>
              <p className="text-sm text-white/50 mb-2 font-medium">{countryName} student visa requirements for Bangladeshi students — {year}</p>
              <p className="text-white/40 text-sm leading-relaxed mb-8 max-w-lg">
                Verified {year} requirements for {countryName} are being finalized. The comprehensive guide below is a highly accurate starting point.
                <a href={whatsappUrl} className="text-yellow-400 font-black ml-1 hover:underline" target="_blank" rel="noopener noreferrer">WhatsApp our consultants</a> for confirmed details.
              </p>
              <div className="flex flex-wrap gap-3">
                {["✅ Expert Consultants", "📋 Document Checklist", "🎓 Scholarship Guidance", "🔒 Confidential"].map(b => (
                  <span key={b} className="bg-white/8 border border-white/10 px-3 py-2 rounded-xl text-xs font-bold text-white/60">{b}</span>
                ))}
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative group">
                <div className="absolute -inset-3 bg-yellow-400/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-90 transition duration-700" />
                <div className="relative bg-white/10 backdrop-blur border border-white/20 p-4 rounded-3xl overflow-hidden w-72 h-52 flex items-center justify-center">
                  <img src={country.flag} alt={`Study in ${countryName} — student visa guide for Bangladeshi students`} className="w-full h-full object-cover rounded-2xl" loading="eager" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap shadow-xl">
                  Student Visa {year}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* NOTICE BANNER */}
      <div className="max-w-7xl mx-auto px-5 mt-8 mb-2">
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 flex gap-4 items-start">
          <div className="p-2 bg-amber-100 rounded-xl shrink-0">
            <span className="text-amber-600 text-lg">⏳</span>
          </div>
          <div>
            <p className="font-black text-amber-800 text-sm mb-1">Detailed {countryName} student visa data coming soon</p>
            <p className="text-amber-700 text-xs leading-relaxed">
              Our team is verifying {year} requirements for {countryName}. The guide below is an accurate starting point.{" "}
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-black underline">WhatsApp our consultants</a> for confirmed country-specific details — they reply within 2 hours.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-5 py-10 pb-20">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* MAIN COLUMN */}
          <main className="lg:col-span-8 space-y-8">

            {/* SEO INTRO */}
            <section className="bg-white rounded-3xl border-2 border-gray-100 shadow-sm p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-10 bg-yellow-400 rounded-full" />
                <h2 className="text-2xl font-black text-gray-900">How to Apply for {countryName} Student Visa from Bangladesh</h2>
              </div>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>For <strong className="text-gray-900">Bangladeshi students</strong> planning higher education in <strong className="text-gray-900">{countryName}</strong>, the journey starts with an admission offer from an accredited institution, followed by applying for a student visa through the {countryName} Embassy or VFS Global Dhaka.</p>
                <p>The <strong className="text-gray-900">{countryName} student visa {year}</strong> requires proof of admission, English proficiency (IELTS/PTE/TOEFL), strong financial documentation, and a well-crafted <strong className="text-gray-900">Statement of Purpose (SOP)</strong> showing your academic intent and ties to Bangladesh.</p>
                <p>Embassy officers scrutinize bank statement consistency, career plan clarity, and whether your program aligns with your academic background. See our <a href="#rejection-risks" className="text-green-700 font-bold hover:underline">rejection prevention guide</a> below.</p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Compare with top destinations:</p>
                <div className="flex flex-wrap gap-2">
                  {["Canada","United Kingdom","Australia","Germany","USA","Malaysia"].map(c => (
                    <Link key={c} href={`/visa/student-visa/${createSlug(c)}`}
                      title={`Study in ${c} — Student Visa Guide`}
                      className="text-xs font-bold text-gray-600 hover:text-green-700 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100 hover:border-yellow-300 transition-all no-underline"
                    >Study in {c}</Link>
                  ))}
                </div>
              </div>
            </section>

            {/* DOCUMENTS */}
            <section className="bg-white rounded-3xl border-2 border-gray-100 shadow-sm p-8 md:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-green-50 rounded-2xl"><CheckCircle size={26} className="text-green-600" /></div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">{countryName} Student Visa Documents Checklist {year}</h2>
                  <p className="text-sm text-gray-400 mt-0.5">All required documents for Bangladeshi applicants</p>
                </div>
              </div>
              <div className="space-y-3 mb-8">
                {generalDocs.map((item, i) => (
                  <div key={i} className="flex gap-3 p-4 bg-green-50 border border-green-100 rounded-2xl">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><CheckCircle size={12} className="text-white" /></div>
                    <p className="text-sm text-gray-700 font-medium leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-8">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Additional Documents by Applicant Profile</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {byProfession.map(({ role, items }) => (
                    <div key={role} className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
                      <h4 className="text-xs font-black text-gray-700 uppercase tracking-wider mb-3">{role}</h4>
                      <ul className="space-y-2">
                        {items.map((item, i) => (
                          <li key={i} className="text-xs text-gray-500 flex gap-2 leading-relaxed">
                            <span className="text-yellow-500 shrink-0 mt-0.5">✓</span>{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* LANGUAGE */}
            <section className="bg-white rounded-3xl border-2 border-gray-100 shadow-sm p-8 md:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-indigo-50 rounded-2xl"><Languages size={26} className="text-indigo-600" /></div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">English Language Requirements — {countryName} {year}</h2>
                  <p className="text-sm text-gray-400 mt-0.5">IELTS, PTE, TOEFL and Duolingo scores needed</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-6 border-l-4 border-indigo-100 pl-4">
                English proficiency tests are mandatory for both university admission and student visa applications in {countryName}. Scores vary by institution — always verify with your target university.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {langTests.map((test, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100 hover:bg-white hover:shadow-md transition-all">
                    <p className="font-black text-indigo-900 mb-2 text-base">{test.name}</p>
                    <div className="space-y-1 mb-3">
                      <p className="text-xs font-bold text-indigo-700">Min: {test.min}</p>
                      <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-tight">Competitive: {test.target}</p>
                    </div>
                    <p className="text-[10px] text-gray-500 leading-relaxed">{test.note}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* BANK BALANCE */}
            <section className="bg-white rounded-3xl border-2 border-gray-100 shadow-sm p-8 md:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-blue-50 rounded-2xl"><Wallet size={26} className="text-blue-600" /></div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">Bank Balance Required for {countryName} Student Visa</h2>
                  <p className="text-sm text-gray-400 mt-0.5">Financial requirements for Bangladesh passport holders</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  { label: "Tuition (1st Year)", val: "Full 1st year tuition fee proof required", color: "blue" },
                  { label: "Living Expenses", val: "~BDT 3–8 lakh/year (varies by country & city)", color: "green" },
                  { label: "Emergency Reserve", val: "25–30% extra above total estimated cost", color: "amber" },
                  { label: "Banking History", val: "6–12 months consistent transaction records", color: "purple" },
                ].map(({ label, val, color }) => (
                  <div key={label} className={`bg-${color}-50 border border-${color}-100 rounded-2xl p-5`}>
                    <p className={`text-[9px] font-black uppercase tracking-widest text-${color}-500 mb-2`}>{label}</p>
                    <p className="text-sm font-black text-gray-800 leading-snug">{val}</p>
                  </div>
                ))}
              </div>
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 flex gap-3">
                <TriangleAlert size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 font-medium leading-relaxed">
                  <strong>Critical:</strong> Never deposit a large lump sum right before applying. Embassy officers flag sudden balance spikes as red signals. Build a consistent, growing balance over 6–12 months before your application date.
                </p>
              </div>
            </section>

            {/* STEP BY STEP */}
            <section className="bg-black text-white rounded-3xl p-10 md:p-12 relative overflow-hidden shadow-2xl">
              <Plane className="absolute top-10 right-10 text-white opacity-5 rotate-45" size={200} aria-hidden="true" />
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-yellow-400 rounded-2xl text-black"><ListOrdered size={28} /></div>
                <div>
                  <h2 className="text-2xl font-black">{countryName} Student Visa — Step by Step Process</h2>
                  <p className="text-gray-400 text-sm mt-0.5">Complete application roadmap for Bangladeshi students</p>
                </div>
              </div>
              <div className="grid gap-6 relative z-10">
                {steps.map((s, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shrink-0 font-black text-sm group-hover:bg-yellow-400 group-hover:text-black group-hover:border-yellow-400 transition-all">
                      {s.n}
                    </div>
                    <div className="pt-2">
                      <p className="font-black text-white text-sm mb-1">{s.title}</p>
                      <p className="text-gray-400 text-xs font-medium leading-relaxed group-hover:text-gray-300">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* REJECTION RISKS */}
            <section id="rejection-risks" className="bg-red-50 border-2 border-red-100 rounded-3xl p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-red-100 rounded-xl"><AlertTriangle size={22} className="text-red-600" /></div>
                <div>
                  <h2 className="text-2xl font-black text-red-900">{countryName} Student Visa — Common Rejection Reasons</h2>
                  <p className="text-sm text-red-400 mt-0.5">Why Bangladeshi students get rejected & how to avoid it</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  "Weak SOP — fails to prove genuine study intent and post-study career plan in Bangladesh",
                  "Insufficient financial proof — inconsistent statements or large unexplained last-minute deposits",
                  "Program mismatch — chosen course doesn't align with previous academic background",
                  "Undisclosed prior visa rejections — considered misrepresentation by embassies",
                  "Weak home ties — no evidence of family, property or employment ties to Bangladesh",
                  "Missing or incorrect documents — incomplete applications are automatically rejected",
                ].map((risk, i) => (
                  <div key={i} className="flex gap-3 p-4 bg-white border border-red-100 rounded-xl">
                    <span className="text-red-400 shrink-0 font-black text-sm mt-0.5">0{i+1}.</span>
                    <p className="text-sm text-red-800 font-medium leading-relaxed">{risk}</p>
                  </div>
                ))}
              </div>
              <div className="p-5 bg-green-50 border border-green-200 rounded-2xl">
                <p className="text-xs font-black text-green-700 uppercase tracking-wider mb-2">✅ How to Maximize Approval Chances</p>
                <p className="text-sm text-green-800 font-medium leading-relaxed">
                  Write a highly specific SOP linking the {countryName} degree to a clear career path back in Bangladesh. Maintain consistent banking history for 6–12 months, explain any study gaps with genuine letters, and ensure every document is consistent with your stated travel dates.{" "}
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-black underline text-green-700">Let our experts review your documents</a> before submission.
                </p>
              </div>
            </section>

            {/* SEO ARTICLE */}
            <section className="bg-white rounded-3xl border-2 border-gray-100 shadow-sm p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-10 bg-gray-300 rounded-full" />
                <h2 className="text-2xl font-black text-gray-900">Study in {countryName} from Bangladesh — {year} Complete Guide</h2>
              </div>
              <div className="space-y-5 text-sm text-gray-600 leading-relaxed">
                <p>Pursuing a <strong className="text-gray-900">degree in {countryName}</strong> is increasingly popular among Bangladeshi students seeking quality higher education and international career prospects. The visa process typically takes 2–4 months from admission offer to visa stamp.</p>
                <h3 className="text-lg font-black text-gray-900">{countryName} Student Visa Fee for Bangladeshi Students</h3>
                <p>Student visa fees for {countryName} vary by program level. Embassy fees are non-refundable. VFS Global Dhaka service charges (approx. BDT 1,500–4,000) apply additionally. Contact our consultants for the current exact fee structure for {countryName} in {year}.</p>
                <h3 className="text-lg font-black text-gray-900">Scholarships for Bangladeshi Students in {countryName}</h3>
                <p>{countryName} universities and government bodies offer scholarships ranging from partial tuition waivers to fully-funded programs. <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-green-700 font-bold hover:underline">Contact our consultants</a> for the best {year} funding options.</p>
                <h3 className="text-lg font-black text-gray-900">Post-Study Work Rights in {countryName}</h3>
                <p>Post-study work visa availability greatly affects study destination value. Countries like Canada, Australia, UK, and New Zealand offer strong 2–3 year post-study work pathways. Confirm {countryName}'s current rules with our consultants before enrolling.</p>
                <h3 className="text-lg font-black text-gray-900">Why Choose Eammu Holidays for Your {countryName} Student Visa?</h3>
                <p>With a 98% visa success rate and 10,000+ students helped, Eammu Holidays is Bangladesh's most trusted student visa consultancy. We handle university selection, SOP writing, document prep, financial review, and visa submission. Email <strong>support@eammu.com</strong> or <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-green-700 font-bold hover:underline">WhatsApp us</a> to start today.</p>
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white rounded-3xl border-2 border-gray-100 shadow-sm p-8 md:p-10" aria-label="Frequently asked questions">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 bg-purple-50 rounded-xl"><HelpCircle size={22} className="text-purple-600" /></div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">{countryName} Student Visa FAQ — Bangladesh {year}</h2>
                  <p className="text-sm text-gray-400 mt-0.5">Most asked questions from Bangladeshi students applying to {countryName}</p>
                </div>
              </div>
              <div className="space-y-4" itemScope itemType="https://schema.org/FAQPage">
                {faqs.map((faq, i) => (
                  <details key={i} className="group bg-gray-50 border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-yellow-300 transition-all"
                    itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                    <summary className="list-none flex items-center justify-between p-6 cursor-pointer">
                      <span className="font-black text-gray-800 pr-4 leading-snug text-sm" itemProp="name">
                        <span className="text-yellow-500 mr-2">Q.</span>{faq.q}
                      </span>
                      <div className="w-8 h-8 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center shrink-0 group-open:bg-yellow-400 group-open:border-yellow-400 transition-all">
                        <ChevronRight size={14} className="text-gray-500 group-open:text-black rotate-90 transition-transform" />
                      </div>
                    </summary>
                    <div className="px-6 pb-6 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-100 ml-8"
                      itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <span itemProp="text">{faq.a}</span>
                    </div>
                  </details>
                ))}
              </div>
            </section>

            {/* INTERNAL LINKS */}
            <section className="bg-white rounded-3xl border-2 border-gray-100 shadow-sm p-8">
              <h3 className="font-black text-gray-900 text-lg mb-5">Compare Popular Study Destinations from Bangladesh</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {["Canada","United Kingdom","Australia","Germany","USA","Malaysia","Japan","New Zealand"].map(c => (
                  <Link key={c} href={`/visa/student-visa/${createSlug(c)}`}
                    title={`Study in ${c} — Student Visa for Bangladeshi Students ${year}`}
                    className="flex items-center gap-3 p-4 bg-gray-50 border-2 border-gray-100 hover:border-yellow-300 hover:bg-yellow-50 rounded-2xl transition-all group no-underline"
                  >
                    <GraduationCap size={16} className="text-yellow-500 shrink-0" />
                    <div>
                      <p className="text-sm font-black text-gray-800 group-hover:text-black transition-colors">Study in {c}</p>
                      <p className="text-xs text-gray-400">Student Visa Guide {year}</p>
                    </div>
                    <ArrowRight size={13} className="ml-auto text-gray-300 group-hover:text-yellow-500 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </section>

          </main>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 space-y-6" aria-label="Contact and related info">
            <WhatsAppCTABox countryName={countryName} whatsappUrl={whatsappUrl} />
            <div className="bg-amber-50 border-2 border-amber-100 rounded-3xl p-7">
              <div className="flex items-center gap-2 mb-6">
                <Lightbulb size={20} className="text-amber-600" />
                <h3 className="font-black text-gray-900 text-base">Expert Tips for {countryName} Student Visa</h3>
              </div>
              <div className="space-y-4">
                {[
                  "Start banking 6–12 months before applying. Consistent history beats a large single deposit.",
                  "Your SOP should show a clear career path back to Bangladesh — 'dual intent' is key.",
                  "Apply to 3–5 universities simultaneously. Multiple offers strengthen your visa profile.",
                  "Include previous international visa approvals — they significantly boost confidence.",
                  "Book a flight itinerary (not ticket) and provisional accommodation before submitting.",
                ].map((tip, i) => (
                  <div key={i} className="flex gap-3 bg-white rounded-2xl p-4 border border-amber-100 shadow-sm">
                    <span className="text-sm font-black text-amber-200 shrink-0">0{i+1}</span>
                    <p className="text-xs text-gray-700 font-medium leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
            <RelatedCountriesBox currentCountry={countryName} />
            <OtherVisaBox countryName={countryName} slug={cleanSlug} />
            <EmailCTABox countryName={countryName} whatsappUrl={whatsappUrl} />
          </aside>
        </div>
      </div>

      {/* FOOTER CTA */}
      <section className="bg-black py-16 px-5 text-center">
        <div className="max-w-2xl mx-auto">
          <img src={country.flag} alt={`Study in ${countryName} from Bangladesh`} className="w-20 h-14 object-cover rounded-xl mx-auto mb-5 shadow-xl" loading="lazy" />
          <h2 className="text-3xl font-black text-white mb-3">Plan Your Studies in {countryName}</h2>
          <p className="text-gray-400 mb-8 leading-relaxed text-sm">
            Let our student visa experts guide your complete journey — university selection to visa approval. 98% success rate for Bangladeshi students applying to {countryName}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-yellow-400 hover:bg-yellow-300 text-black rounded-2xl font-black transition-all text-sm no-underline shadow-xl shadow-yellow-900/20"
            >
              Start Application via WhatsApp →
            </a>
            <Link href="/visa/student-visa"
              className="inline-flex items-center justify-center px-8 py-5 border-2 border-white/20 text-white rounded-2xl font-black hover:bg-white/10 transition-all text-sm no-underline"
            >Browse All 200+ Countries</Link>
          </div>
          <p className="text-gray-600 text-xs">
            Also explore:{" "}
            {["Canada","UK","Australia","Germany","USA"].map((c, i) => (
              <span key={c}>
                <Link href={`/visa/student-visa/${createSlug(c)}`} className="text-gray-500 hover:text-white transition underline">Study in {c}</Link>
                {i < 4 && " · "}
              </span>
            ))}
          </p>
        </div>
      </section>
    </div>
  );
}
// ── FULL DATA PAGE ─────────────────────────────────────────────────────────────
function FullDataPage({ country, d, countryName, year, whatsappUrl, cleanSlug }) {
  const faqs = d?.faq_student_edition || [];

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'DM Sans','Plus Jakarta Sans',system-ui,sans-serif" }}>

      {/* HERO */}
      <div className="relative bg-black py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23fff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-xs text-white/40 font-semibold flex-wrap">
              <li><Link href="/" className="hover:text-white/70 transition">Home</Link></li>
              <li><ChevronRight size={12} /></li>
              <li><Link href="/visa/student-visa" className="hover:text-white/70 transition">Student Visa</Link></li>
              <li><ChevronRight size={12} /></li>
              <li className="text-white/60">{countryName}</li>
            </ol>
          </nav>

          <div className="flex flex-col md:flex-row items-center gap-12 text-white">
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 bg-yellow-400/30 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-700" />
              <div className="relative w-72 h-44 bg-white p-2 rounded-2xl shadow-2xl overflow-hidden">
                <img src={country.flag} alt={`Study in ${countryName} from Bangladesh — student visa ${year}`} className="w-full h-full object-cover rounded-xl" loading="eager" />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                <span className="bg-white/15 backdrop-blur px-4 py-1 rounded-full text-xs font-bold uppercase border border-white/30 tracking-widest">Academic Year {year}</span>
                <span className="bg-yellow-400 text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{d?.visa_category_details?.visa_type}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter leading-tight">
                <span className="text-yellow-400">Study in</span> {countryName}
              </h1>
              <p className="text-xl md:text-2xl font-semibold text-white/90 mb-3">{d?.title}</p>
              <p className="max-w-3xl text-white/60 leading-relaxed mb-5 font-light text-sm">{d?.description}</p>
              <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-mono text-white/40">
                <Calendar size={13} /> Updated: {d?.last_updated}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-20 grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "COE Processing", val: d?.processing_and_approval_metrics?.coe_processing_time, icon: <Clock className="text-blue-600" size={22} /> },
          { label: "Approval Rate", val: d?.processing_and_approval_metrics?.approval_chances, icon: <GraduationCap className="text-green-600" size={22} /> },
          { label: "Part-Time Work", val: d?.work_rights_and_stay?.part_time_permission, icon: <Briefcase className="text-yellow-500" size={22} /> },
          { label: "Visa Category", val: d?.visa_category_details?.main_category, icon: <ShieldCheck className="text-purple-600" size={22} /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border-2 border-gray-100 text-center hover:shadow-md hover:border-yellow-200 transition-all">
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <p className="text-[9px] uppercase text-gray-400 font-black mb-1 tracking-widest">{stat.label}</p>
            <p className="text-xs font-black text-gray-800 leading-snug">{stat.val}</p>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* MAIN COLUMN */}
          <main className="lg:col-span-8 space-y-10">

            {/* SEO INTRO */}
            <section className="bg-white rounded-3xl border-2 border-gray-100 shadow-sm p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-10 bg-yellow-400 rounded-full" />
                <h2 className="text-2xl font-black text-gray-900">How to Apply for {countryName} Student Visa from Bangladesh</h2>
              </div>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>For <strong className="text-gray-900">Bangladeshi students</strong> planning higher education in <strong className="text-gray-900">{countryName}</strong>, the process starts with securing admission, then applying for a student visa through the {countryName} Embassy or VFS Global Dhaka.</p>
                <p>The <strong className="text-gray-900">{countryName} student visa {year}</strong> requires proof of admission, English proficiency, strong financial documentation, and a well-crafted <strong className="text-gray-900">Statement of Purpose (SOP)</strong>.</p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">Compare with top destinations:</p>
                <div className="flex flex-wrap gap-2">
                  {["Canada","United Kingdom","Australia","Germany","USA","Malaysia"].map(c => (
                    <Link key={c} href={`/visa/student-visa/${createSlug(c)}`}
                      title={`Study in ${c} — Student Visa Guide`}
                      className="text-xs font-bold text-gray-600 hover:text-green-700 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-100 hover:border-yellow-300 transition-all no-underline"
                    >Study in {c}</Link>
                  ))}
                </div>
              </div>
            </section>

            {/* SCHOLARSHIPS */}
            {d?.scholarship_ecosystem_2026 && (
              <section className="bg-white rounded-3xl shadow-sm p-10 border-2 border-gray-100">
                <div className="flex items-center gap-4 mb-10">
                  <div className="p-3 bg-yellow-50 rounded-2xl text-yellow-600"><Award size={32} /></div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">{countryName} Scholarships for Bangladeshi Students {year}</h2>
                    <p className="text-gray-400 text-sm mt-0.5">Government and private funding opportunities</p>
                  </div>
                </div>
                <div className="space-y-6">
                  {d.scholarship_ecosystem_2026.government_funded?.map((sch, i) => (
                    <div key={i} className="p-8 bg-blue-50 rounded-3xl border border-blue-100 relative overflow-hidden group">
                      <div className="absolute -right-4 -top-4 text-blue-100 opacity-20 group-hover:scale-110 transition-transform pointer-events-none"><Award size={120} /></div>
                      <h3 className="text-blue-900 font-black text-xl mb-3">{sch.name}</h3>
                      <p className="text-sm text-blue-800/80 mb-4 leading-relaxed">{sch.benefits}</p>
                      <div className="flex flex-wrap gap-4 items-center">
                        <span className="text-[10px] bg-white text-blue-600 px-4 py-1.5 rounded-full font-black shadow-sm uppercase border border-blue-100">Window: {sch.application_window}</span>
                        <p className="text-[10px] text-blue-400 font-medium">Criteria: {sch.selection_criteria}</p>
                      </div>
                    </div>
                  ))}
                  <div className="grid md:grid-cols-2 gap-6">
                    {d.scholarship_ecosystem_2026.private_and_partial?.map((sch, i) => (
                      <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                        <h4 className="font-black text-gray-800 mb-2 uppercase text-xs tracking-widest">{sch.name}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{sch.benefits}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* LANGUAGE TESTS */}
            {d?.english_language_test_requirements_2026 && (
              <section className="bg-white rounded-3xl shadow-sm p-10 border-2 border-gray-100">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600"><Languages size={30} /></div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">English Test Requirements — {countryName} {year}</h2>
                    <p className="text-gray-400 text-sm mt-0.5">IELTS, PTE, TOEFL and Duolingo minimum scores</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-8 border-l-4 border-indigo-100 pl-4 leading-relaxed">{d.english_language_test_requirements_2026.overview}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: "IELTS Academic", data: d.english_language_test_requirements_2026.ielts_academic },
                    { name: "PTE Academic", data: d.english_language_test_requirements_2026.pte_academic },
                    { name: "Duolingo DET", data: d.english_language_test_requirements_2026.duolingo_det },
                    { name: "TOEFL iBT", data: d.english_language_test_requirements_2026.toefl_ibt },
                  ].map((test, i) => test.data && (
                    <div key={i} className="p-5 rounded-2xl bg-indigo-50 border border-indigo-100 hover:bg-white hover:shadow-md transition-all">
                      <p className="font-black text-indigo-900 mb-3 text-base">{test.name}</p>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-indigo-700">Min: {test.data.min_score}</p>
                        <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-tight">Target: {test.data.competitive_score}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* DOCUMENTS */}
            <section className="bg-white rounded-3xl shadow-sm p-10 border-2 border-gray-100">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-green-50 rounded-2xl text-green-600"><BookOpen size={30} /></div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">{countryName} Student Visa Documents Checklist {year}</h2>
                  <p className="text-gray-400 text-sm mt-0.5">All required documents for Bangladeshi applicants</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] border-b pb-4 mb-5">Embassy Submission</h3>
                  <div className="space-y-3">
                    {d.comprehensive_requirements_checklist?.embassy_submission_docs?.map((doc, i) => (
                      <div key={i} className="flex gap-3 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><CheckCircle size={11} className="text-white" /></div>
                        <p className="text-xs text-gray-700 font-medium leading-relaxed">{doc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-green-600 font-black text-xs uppercase tracking-[0.2em] border-b pb-4 mb-5">COE / Financial Phase</h3>
                  <div className="space-y-3">
                    {d.comprehensive_requirements_checklist?.coe_phase_documents?.map((doc, i) => (
                      <div key={i} className="flex gap-3 p-4 bg-green-50 border border-green-100 rounded-2xl">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><CheckCircle size={11} className="text-white" /></div>
                        <p className="text-xs text-gray-700 font-medium leading-relaxed">{doc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* ROADMAP */}
            {d?.step_by_step_application_roadmap && (
              <section className="bg-black text-white rounded-3xl p-12 relative overflow-hidden shadow-2xl">
                <Plane className="absolute top-10 right-10 text-white opacity-5 rotate-45" size={200} aria-hidden="true" />
                <div className="flex items-center gap-4 mb-12">
                  <div className="p-3 bg-yellow-400 rounded-2xl text-black"><ListOrdered size={28} /></div>
                  <div>
                    <h2 className="text-2xl font-black">{countryName} Student Visa — Step by Step</h2>
                    <p className="text-gray-500 text-sm mt-0.5">Official process for Bangladeshi students</p>
                  </div>
                </div>
                <div className="grid gap-8 relative z-10">
                  {Object.entries(d.step_by_step_application_roadmap).map(([key, step], i) => (
                    <div key={key} className="flex gap-8 group">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 font-black text-xl group-hover:bg-yellow-400 group-hover:text-black transition-all">
                        {i + 1}
                      </div>
                      <div className="pt-2">
                        <p className="text-gray-300 text-sm font-medium leading-relaxed group-hover:text-white">{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* REJECTION RISKS */}
            <section id="rejection-risks" className="bg-red-50 rounded-3xl p-10 border-2 border-red-100">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-red-100 rounded-2xl text-red-600"><AlertTriangle size={28} /></div>
                <div>
                  <h2 className="text-2xl font-black text-red-900">{countryName} Student Visa Rejection Reasons</h2>
                  <p className="text-red-400 text-sm mt-0.5">Common mistakes Bangladeshi applicants make</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  {d.rejection_risk_matrix?.high_risk_reasons?.map((risk, i) => (
                    <div key={i} className="flex gap-4 items-start p-4 bg-white border border-red-100 rounded-xl">
                      <span className="text-red-400 font-black text-xs shrink-0">0{i+1}.</span>
                      <p className="text-xs font-bold text-red-900/80 leading-relaxed">{risk}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-red-200 flex flex-col justify-center">
                  <p className="text-[10px] font-black text-green-700 uppercase mb-3 tracking-widest">✅ How to Get Approved</p>
                  <p className="text-sm text-gray-600 leading-relaxed font-medium">{d.rejection_risk_matrix?.mitigation_strategy}</p>
                </div>
              </div>
            </section>

            {/* YOUTUBE */}
            {d?.youtube_video_options?.length > 0 && (
              <section>
                <h2 className="text-2xl font-black text-gray-900 mb-6">Study in {countryName} — Watch & Learn</h2>
                <div className="grid md:grid-cols-3 gap-5">
                  {d.youtube_video_options.map((video, i) => {
                    const getYouTubeId = url => {
                      const match = url?.match(/^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
                      return match && match[2]?.length === 11 ? match[2] : null;
                    };
                    const videoId = getYouTubeId(video.video_link);
                    const thumbUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
                    return (
                      <a key={i} href={video.video_link} target="_blank" rel="noopener noreferrer"
                        className="group bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-yellow-400 shadow-sm hover:shadow-xl transition-all duration-300 no-underline"
                      >
                        <div className="relative aspect-video bg-gray-100 overflow-hidden">
                          {thumbUrl && <img src={thumbUrl} alt={video.video_title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />}
                          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 flex items-center justify-center">
                            <div className="w-14 h-14 bg-yellow-400 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                              <svg className="w-6 h-6 fill-black ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            </div>
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="font-black text-sm text-gray-800 group-hover:text-yellow-600 line-clamp-2 mb-2 transition-colors">{video.video_title}</h3>
                          <span className="text-xs font-bold text-gray-400 group-hover:text-yellow-500 transition-colors">Watch on YouTube →</span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </section>
            )}

            {/* FAQ */}
            {faqs.length > 0 && (
              <section className="bg-white rounded-3xl shadow-sm p-10 border-2 border-gray-100" aria-label="Frequently asked questions">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 bg-blue-50 rounded-xl"><HelpCircle size={24} className="text-blue-600" /></div>
                  <div>
                    <h2 className="text-2xl font-black text-gray-900">{countryName} Student Visa FAQ — Bangladesh {year}</h2>
                    <p className="text-gray-400 text-sm mt-0.5">Most asked questions from Bangladeshi students</p>
                  </div>
                </div>
                <div className="space-y-5" itemScope itemType="https://schema.org/FAQPage">
                  {faqs.map((faq, i) => (
                    <details key={i} className="group bg-gray-50 border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-yellow-300 transition-all"
                      itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                      <summary className="list-none flex items-center justify-between p-6 cursor-pointer">
                        <span className="font-black text-gray-900 pr-4 text-sm group-hover:text-black transition-colors" itemProp="name">
                          <span className="text-yellow-500 mr-2">Q.</span>{faq.question}
                        </span>
                        <div className="w-8 h-8 bg-white border-2 border-gray-200 rounded-xl flex items-center justify-center shrink-0 group-open:bg-yellow-400 group-open:border-yellow-400 transition-all">
                          <ChevronRight size={14} className="text-gray-500 group-open:text-black rotate-90 transition-transform" />
                        </div>
                      </summary>
                      <div className="px-6 pb-6 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-100 ml-8"
                        itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                        <span itemProp="text">{faq.answer}</span>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* INTERNAL LINKS */}
            <section className="bg-white rounded-3xl border-2 border-gray-100 shadow-sm p-8">
              <h3 className="font-black text-gray-900 text-lg mb-5">Compare Popular Study Destinations from Bangladesh</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {["Canada","United Kingdom","Australia","Germany","USA","Malaysia","Japan","New Zealand"].map(c => (
                  <Link key={c} href={`/visa/student-visa/${createSlug(c)}`}
                    title={`Study in ${c} — Student Visa for Bangladeshi Students ${year}`}
                    className="flex items-center gap-3 p-4 bg-gray-50 border-2 border-gray-100 hover:border-yellow-300 hover:bg-yellow-50 rounded-2xl transition-all group no-underline"
                  >
                    <GraduationCap size={16} className="text-yellow-500 shrink-0" />
                    <div>
                      <p className="text-sm font-black text-gray-800">Study in {c}</p>
                      <p className="text-xs text-gray-400">Student Visa Guide {year}</p>
                    </div>
                    <ArrowRight size={13} className="ml-auto text-gray-300 group-hover:text-yellow-500 group-hover:translate-x-0.5 transition-all" />
                  </Link>
                ))}
              </div>
            </section>

          </main>

          {/* SIDEBAR */}
          <aside className="lg:col-span-4 space-y-6" aria-label="Contact and related info">

            {/* FINANCIAL BOX */}
            <div className="bg-black p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden sticky top-6">
              <Landmark className="absolute -top-6 -right-6 text-white/5 pointer-events-none" size={150} />
              <h3 className="text-lg font-black mb-6 text-yellow-400 uppercase tracking-tight flex items-center gap-2">
                <CreditCard size={18} /> Financial Requirements
              </h3>
              <div className="space-y-4 relative z-10">
                <div>
                  <p className="text-[10px] uppercase text-gray-500 font-black tracking-widest mb-1">Minimum Balance Required</p>
                  <p className="text-2xl font-black text-white italic leading-none mb-1">
                    {d?.financial_solvency_thresholds?.self_funded_min_balance?.split(' ').slice(0, 2).join(' ')}
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed">{d?.financial_solvency_thresholds?.self_funded_min_balance}</p>
                </div>
                <div className="pt-5 border-t border-white/10 space-y-3">
                  <div className="flex gap-3 items-start bg-white/5 border border-white/10 rounded-xl p-4">
                    <Info size={14} className="text-yellow-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-gray-400 leading-relaxed">{d?.financial_solvency_thresholds?.bank_history_requirement}</p>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-relaxed pl-1">{d?.financial_solvency_thresholds?.logic}</p>
                </div>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-yellow-400 hover:bg-yellow-300 text-black py-4 rounded-2xl font-black transition-all shadow-lg no-underline mt-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                  Apply via WhatsApp
                  <ArrowRightCircle size={18} />
                </a>
                <p className="text-[9px] text-center text-gray-600 font-bold">FREE ADVICE · NO UPFRONT FEES</p>
              </div>
            </div>

            {/* WORK RIGHTS */}
            {d?.work_rights_and_stay && (
              <div className="bg-black p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
                <Briefcase className="absolute -bottom-4 -left-4 text-white opacity-10 pointer-events-none" size={120} />
                <h3 className="font-black text-lg mb-6 uppercase tracking-tight flex items-center gap-2 text-yellow-400">
                  <Briefcase size={18} /> Work Rights in {countryName}
                </h3>
                <div className="space-y-3 relative z-10">
                  <div className="bg-white/10 backdrop-blur p-4 rounded-2xl border border-white/10">
                    <p className="text-[9px] uppercase text-gray-400 font-black mb-1 tracking-widest">During Semester</p>
                    <p className="font-black text-base text-white">{d.work_rights_and_stay.part_time_permission}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur p-4 rounded-2xl border border-white/10">
                    <p className="text-[9px] uppercase text-gray-400 font-black mb-1 tracking-widest">Academic Breaks</p>
                    <p className="font-black text-base text-white">{d.work_rights_and_stay.vacation_hours}</p>
                  </div>
                  {d.work_rights_and_stay.post_study_work && (
                    <div className="bg-white/10 backdrop-blur p-4 rounded-2xl border border-white/10">
                      <p className="text-[9px] uppercase text-gray-400 font-black mb-1 tracking-widest">Post Study Work</p>
                      <p className="font-bold text-sm text-gray-300">{d.work_rights_and_stay.post_study_work}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TIPS */}
            <div className="bg-amber-50 p-7 rounded-3xl border-2 border-amber-100">
              <div className="flex items-center gap-3 mb-5">
                <Lightbulb className="text-amber-500" size={22} />
                <h3 className="font-black text-gray-900 text-base">Expert Advice</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed font-medium border-l-2 border-yellow-400 pl-4 mb-4">
                {d?.faq_student_edition?.[0]?.answer}
              </p>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                Maintain your minimum balance consistently for 12 months for a strong financial solvency profile.
              </p>
            </div>

            <RelatedCountriesBox currentCountry={countryName} />
            <OtherVisaBox countryName={countryName} slug={cleanSlug} />
            <EmailCTABox countryName={countryName} whatsappUrl={whatsappUrl} />
          </aside>
        </div>
      </div>

      {/* FOOTER CTA */}
      <section className="bg-black py-16 px-5 text-center">
        <div className="max-w-2xl mx-auto">
          <img src={country.flag} alt={`Study in ${countryName}`} className="w-20 h-14 object-cover rounded-xl mx-auto mb-5 shadow-xl" loading="lazy" />
          <h2 className="text-3xl font-black text-white mb-3">Ready to Study in {countryName}?</h2>
          <p className="text-gray-400 mb-8 leading-relaxed text-sm">
            Let our student visa experts handle your complete journey — university shortlisting to visa stamping — with a 98% approval rate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-yellow-400 hover:bg-yellow-300 text-black rounded-2xl font-black transition-all text-sm no-underline shadow-xl"
            >Start Application via WhatsApp →</a>
            <Link href="/visa/student-visa"
              className="inline-flex items-center justify-center px-8 py-5 border-2 border-white/20 text-white rounded-2xl font-black hover:bg-white/10 transition-all text-sm no-underline"
            >Browse Other Countries</Link>
          </div>
          <p className="text-gray-600 text-xs">
            Also explore:{" "}
            {["Canada","UK","Australia","Germany","USA"].map((c, i) => (
              <span key={c}>
                <Link href={`/visa/student-visa/${createSlug(c)}`} className="text-gray-500 hover:text-white transition underline">Study in {c}</Link>
                {i < 4 && " · "}
              </span>
            ))}
          </p>
        </div>
      </section>
    </div>
  );
}

// ── MAIN EXPORT ───────────────────────────────────────────────────────────────
export default async function StudentVisaSlugPage({ params }) {
  const { slug } = await params;
  const cleanSlug = slug.replace(/-student-visa$/, "").replace(/-visa$/, "");
  const countries = await getCountries();
  const country = countries.find(c => createSlug(c.country) === cleanSlug);
  const year = new Date().getFullYear();

  if (!country) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center p-10">
        <div className="text-7xl mb-6">🎓</div>
        <h1 className="text-3xl font-black text-gray-900 mb-3">Country Not Found</h1>
        <p className="text-gray-500 mb-8">We couldn't find that destination. Please browse all countries.</p>
        <Link href="/study-abroad/student-visa" className="px-8 py-4 bg-yellow-400 text-black rounded-2xl font-black hover:bg-yellow-300 transition no-underline">
          ← Browse All Countries
        </Link>
      </div>
    );
  }

  const d = await getStudentVisaData(cleanSlug);
  const countryName = country.country;
  const whatsappUrl = `https://wa.me/8801631312524?text=${encodeURIComponent(`Hi, I want to apply for a ${countryName} Student Visa. I checked the guide on Eammu Holidays.`)}`;

  if (!d) {
    return <FallbackStudentVisaPage country={country} whatsappUrl={whatsappUrl} cleanSlug={cleanSlug} />;
  }

  return (
    <>
      <ArticleSchema countryName={countryName} slug={cleanSlug} flag={country.flag} description={d?.description} year={year} />
      <FaqSchema faqs={d?.faq_student_edition || []} />
      <FullDataPage country={country} d={d} countryName={countryName} year={year} whatsappUrl={whatsappUrl} cleanSlug={cleanSlug} />
    </>
  );
}