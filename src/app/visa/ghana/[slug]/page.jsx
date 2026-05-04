import clientPromise from '@/app/lib/mongodb';
import { createSlug } from "@/app/lib/utils";
import Link from "next/link";
import {
  CheckCircle, Clock, CreditCard, Camera, Info,
  MapPin, AlertTriangle, Lightbulb, HelpCircle,
  Calendar, ShieldCheck, Landmark, Map,
  Globe, ChevronRight, MessageCircle,
  Plane, Wallet, CircleDashed, TriangleAlert
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// DATA FETCHERS
// ─────────────────────────────────────────────────────────────────────────────
async function getCountries() {
  const client = await clientPromise;
  const db = client.db('Eammu-Holidays');
  return db.collection('countries')
    .find({})
    .project({ _id: 0, country: 1, flag: 1, code: 1 })
    .toArray();
}

async function getVisaData(slug) {
  const client = await clientPromise;
  const db = client.db('Eammu-Holidays');
  const doc = await db.collection('ghanaianvisadata')
    .findOne({ slug }, { projection: { _id: 0 } });
  return doc || null;
}

const RELATED_VISA_LINKS = {
  default: ["United States", "United Kingdom", "Canada", "Germany", "France", "Japan", "Australia", "Malaysia"],
};

// ─────────────────────────────────────────────────────────────────────────────
// SEO METADATA
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug }    = await params;
  const cleanSlug   = slug.replace(/-visa$/, "");
  const countries   = await getCountries();
  const country     = countries.find(c => createSlug(c.country) === cleanSlug);
  const d           = await getVisaData(cleanSlug);
  const countryName = country?.country || "Destination";
  const currentYear = new Date().getFullYear();

  const defaultTitle = `${countryName} Tourist Visa for Ghanaian Nationals ${currentYear} — Requirements, Fees & How to Apply`;
  const defaultDesc  = `Complete ${currentYear} ${countryName} visa guide for Ghanaian passport holders. Documents required, embassy fees in Ghana, bank balance, photo size, processing time & expert tips. Apply from Accra.`;

  return {
    title:       d?.seo_and_metadata?.meta_title || defaultTitle,
    description: d?.description || defaultDesc,
    keywords:    d?.seo_and_metadata?.keywords?.join(", ") ||
      `${countryName} visa from Ghana ${currentYear}, ${countryName} tourist visa Ghanaian passport, ${countryName} visa requirements Ghana, ${countryName} visa fee Ghana, ${countryName} visa processing time Ghana, ${countryName} visa documents Ghanaian nationals, how to apply ${countryName} visa from Ghana, ${countryName} visa bank balance Ghana, ${countryName} visa photo size, ${countryName} embassy Ghana Accra`,
    alternates: {
      canonical: d?.seo_and_metadata?.canonical_url || `https://visaexpresshub.com/visa/ghana/${cleanSlug}`,
    },
    openGraph: {
      title:       `${countryName} Tourist Visa for Ghanaian Nationals — ${currentYear} Complete Guide`,
      description: `Embassy-verified ${countryName} visa checklist, processing time, fees & expert tips for Ghanaian passport holders. Updated ${currentYear}.`,
      images:      [country?.flag || ""],
      type:        "article",
    },
    twitter: {
      card:        "summary_large_image",
      title:       `${countryName} Visa from Ghana ${currentYear} — Ghanaian Passport Guide`,
      description: defaultDesc,
    },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED STYLES
// ─────────────────────────────────────────────────────────────────────────────
function PageStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');
      *, *::before, *::after { box-sizing: border-box; }
      body { font-family: 'DM Sans', sans-serif; background: #ffffff; color: #111111; }
      .font-display { font-family: 'DM Serif Display', serif; }
      :root {
        --yellow: #f5c800; --yellow-dark: #d4a800; --yellow-light: #fff8d6;
        --black: #111111; --gray-700: #444444; --gray-500: #777777;
        --gray-100: #f5f5f5; --gray-50: #fafafa; --white: #ffffff; --border: #e8e8e8;
      }
      .btn-yellow { background:var(--yellow); color:var(--black); font-weight:800; border:2px solid var(--yellow); transition:all .2s ease; }
      .btn-yellow:hover { background:var(--yellow-dark); border-color:var(--yellow-dark); transform:translateY(-2px); box-shadow:0 8px 24px rgba(245,200,0,.35); }
      .whatsapp-btn { background:#25D366; color:white; font-weight:800; transition:all .2s ease; box-shadow:0 4px 16px rgba(37,211,102,.25); }
      .whatsapp-btn:hover { background:#128C7E; transform:translateY(-2px); box-shadow:0 8px 28px rgba(37,211,102,.35); }
      .card { background:var(--white); border:1.5px solid var(--border); border-radius:16px; }
      .card-yellow { background:var(--yellow-light); border:1.5px solid rgba(245,200,0,.3); border-radius:16px; }
      .tag { display:inline-flex; align-items:center; padding:4px 12px; border-radius:100px; font-size:11px; font-weight:700; letter-spacing:.03em; }
      .tag-yellow { background:var(--yellow); color:var(--black); }
      .tag-dark { background:var(--black); color:white; }
      .section-line { width:4px; height:32px; background:linear-gradient(to bottom,var(--yellow),var(--yellow-dark)); border-radius:4px; display:inline-block; flex-shrink:0; }
      .check-box { width:20px; height:20px; background:#16a34a; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
      .faq-item { border:1.5px solid var(--border); border-radius:12px; overflow:hidden; margin-bottom:8px; }
      .faq-item summary { padding:16px 20px; cursor:pointer; list-style:none; display:flex; align-items:center; justify-content:space-between; font-weight:700; color:var(--black); }
      .faq-item summary:hover { background:var(--gray-50); }
      .faq-item[open] summary { background:var(--yellow-light); border-bottom:1.5px solid rgba(245,200,0,.3); }
      .faq-item summary::-webkit-details-marker { display:none; }
      .faq-item .chevron { transition:transform .25s; flex-shrink:0; }
      .faq-item[open] .chevron { transform:rotate(90deg); }
      .step-line { position:absolute; left:13px; top:8px; bottom:0; width:2px; background:linear-gradient(to bottom,var(--yellow),rgba(245,200,0,.1)); }
      .hover-yellow:hover { background:var(--yellow-light) !important; border-color:rgba(245,200,0,.4) !important; }
      a { color:inherit; }
      ::-webkit-scrollbar { width:5px; }
      ::-webkit-scrollbar-thumb { background:var(--yellow); border-radius:3px; }
      .risk-high { background:#fef2f2; border:1.5px solid #fecaca; border-radius:10px; }
      .risk-med  { background:var(--yellow-light); border:1.5px solid rgba(245,200,0,.3); border-radius:10px; }
      .sidebar-sticky { position:sticky; top:24px; }
      @media (max-width:768px) { .sidebar-sticky { position:static; } }
    `}</style>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WHATSAPP BUTTON
// ─────────────────────────────────────────────────────────────────────────────
function WhatsAppBtn({ href, label, className = "" }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`whatsapp-btn inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-sm ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
      {label}
      <ChevronRight size={14} />
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR CTA
// ─────────────────────────────────────────────────────────────────────────────
function SidebarCTA({ whatsappUrl, countryName, data }) {
  return (
    <div className="rounded-2xl overflow-hidden sidebar-sticky shadow-lg" style={{ border: "1.5px solid #e8e8e8" }}>
      <div className="p-5" style={{ background: "#f5c800" }}>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,0,0,0.12)" }}>
            <MessageCircle size={22} className="text-black" />
          </div>
          <div>
            <h3 className="font-black text-black text-base leading-none">Free Consultation</h3>
            <p className="text-black/60 text-xs font-semibold mt-1">Expert reply within 2 hours</p>
          </div>
        </div>
      </div>
      <div className="p-5 space-y-2.5" style={{ background: "white" }}>
        {[
          { icon: "📈", label: "Success Rate",      val: "98% Approved" },
          ...(data?.processing_time_metrics?.standard_turnaround
            ? [{ icon: "⏱️", label: "Processing Time",  val: data.processing_time_metrics.standard_turnaround }]
            : [{ icon: "⏱️", label: "Typical Processing", val: "10–20 Working Days" }]),
          { icon: "📋", label: "Service",           val: "Full Document Review" },
          { icon: "💬", label: "Response",          val: "Within 2 Hours" },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#fafafa", border: "1.5px solid #eee" }}>
            <span className="text-lg">{s.icon}</span>
            <div>
              <p style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em", color: "#999" }}>{s.label}</p>
              <p className="font-black text-black text-sm">{s.val}</p>
            </div>
          </div>
        ))}
        <WhatsAppBtn href={whatsappUrl} label={`WhatsApp for ${countryName} Visa`} className="w-full mt-1" />
        <p style={{ fontSize: "9px", textAlign: "center", color: "#aaa", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" }}>
          FREE ADVICE · NO UPFRONT FEES · EXPERT TEAM
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RELATED VISA LINKS
// ─────────────────────────────────────────────────────────────────────────────
function RelatedVisaLinks({ countries, currentSlug }) {
  const relatedNames = RELATED_VISA_LINKS.default.filter(n => createSlug(n) !== currentSlug).slice(0, 6);
  return (
    <div className="rounded-2xl p-5" style={{ background: "#fafafa", border: "1.5px solid #eee" }}>
      <h3 className="font-black text-black text-sm mb-4 flex items-center gap-2">
        <Globe size={15} style={{ color: "#f5c800" }} /> Other Popular Visa Guides
      </h3>
      <div className="space-y-1.5">
        {relatedNames.map((name, i) => {
          const c = countries.find(x => x.country === name);
          return (
            <Link
              key={i}
              href={`/visa/ghana/${createSlug(name)}`}
              title={`${name} tourist visa for Ghanaian passport holders`}
              className="flex items-center gap-3 p-2.5 rounded-xl transition-all group hover-yellow"
              style={{ border: "1.5px solid transparent" }}
            >
              {c?.flag && <img src={c.flag} alt={`${name} flag`} className="w-8 h-5 object-cover rounded" />}
              <span className="text-sm font-semibold text-black group-hover:font-bold transition">{name}</span>
              <ChevronRight size={12} style={{ color: "#ccc", marginLeft: "auto" }} />
            </Link>
          );
        })}
      </div>
      <Link href="/visa/ghana"
        className="flex items-center justify-center gap-2 mt-4 pt-4 text-xs font-black transition hover:text-black"
        style={{ borderTop: "1.5px solid #eee", color: "#f5c800" }}>
        View All 200+ Countries →
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BREADCRUMB
// ─────────────────────────────────────────────────────────────────────────────
function Breadcrumb({ countryName, dark = false }) {
  const muted   = dark ? "rgba(255,255,255,0.4)" : "#777";
  const current = dark ? "#f5c800" : "#111";
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold mb-8 flex-wrap">
      <Link href="/"                              style={{ color: muted }} className="hover:text-white transition">Home</Link>
      <ChevronRight size={12} style={{ color: muted }} />
      <Link href="/visa/ghana"       style={{ color: muted }} className="hover:text-white transition">Visa Guide — Ghanaian Nationals</Link>
      <ChevronRight size={12} style={{ color: muted }} />
      <span style={{ color: current, fontWeight: 800 }}>{countryName} Visa</span>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FALLBACK PAGE
// ─────────────────────────────────────────────────────────────────────────────
function FallbackVisaPage({ country, whatsappUrl, allCountries }) {
  const countryName = country.country;
  const currentYear = new Date().getFullYear();
  const cleanSlug   = createSlug(countryName);

  const commonDocs = [
    "Valid Ghanaian passport (minimum 6 months validity beyond intended travel dates, at least 2 blank visa pages)",
    "Previous Ghanaian passports (if any) — submit all for complete travel and visa history",
    "Recent passport-size photographs (plain white background, ICAO compliant, taken within 3 months)",
    "Completed visa application form (signed and dated)",
    "Confirmed round-trip flight reservation (refundable or dummy ticket from Accra)",
    "Hotel booking / accommodation proof for entire duration of stay",
    "Ghanaian bank statement — last 6 months (savings and/or current account), showing consistent healthy balance",
    "Bank reference / confirmation letter on bank letterhead (signed by bank manager)",
    "Cover letter clearly stating purpose of travel, full itinerary, and confirmed return to Ghana",
    "Travel insurance covering medical emergencies for the entire trip duration",
    "Proof of employment: employer introduction letter on company letterhead + last 3–6 payslips, OR business registration documents",
    "Ghana Revenue Authority (GRA) tax clearance certificate (required by several embassies for Ghanaian applicants)",
  ];

  const faqs = [
    {
      q: `Do Ghanaian nationals need a visa to visit ${countryName}?`,
      a: `Visa requirements depend on ${countryName}'s bilateral relationship with Ghana. Most high-income countries require a prior visa for Ghanaian passport holders. A number of countries offer visa-on-arrival or e-Visa options. Contact the ${countryName} Embassy or High Commission in Accra, or reach our consultants for the latest ${currentYear} requirements.`,
    },
    {
      q: `How long does the ${countryName} visa take to process from Ghana?`,
      a: `Standard processing typically takes 10–20 working days from Ghana submission. We always recommend Ghanaian applicants apply at least 8–10 weeks before travel to account for embassy workloads and public holidays in Ghana.`,
    },
    {
      q: `What bank balance is required for a ${countryName} visa for Ghanaian nationals?`,
      a: `Most embassies expect a minimum equivalent of USD 2,500–6,000 (approximately GHS 30,000–75,000 at current rates) for solo travelers with 6 months of stable Ghanaian bank transaction history. Schengen visas typically require €3,000–5,000 equivalent. USA and UK require strong financial documentation from a Ghanaian bank. Our consultants advise based on your individual profile.`,
    },
    {
      q: `Where do Ghanaian nationals submit the ${countryName} visa application?`,
      a: `Depending on the destination country, you submit at the ${countryName} Embassy or High Commission in Accra, at a VFS Global Ghana centre, or through an authorised visa application centre. Our team will confirm the correct Ghana submission point for you.`,
    },
    {
      q: `What is the photo specification for ${countryName} visa for Ghanaian passport holders?`,
      a: `Most embassies require 35×45mm photos on a plain white background, ICAO compliant, taken within 3 months. No glasses, no head coverings (unless for religious reasons), no heavy retouching. Some countries (e.g. USA) require 51×51mm (2×2 inch) photos. Professional photo studios across Accra and Kumasi can produce correct visa photos.`,
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${countryName} Tourist Visa for Ghanaian Nationals ${currentYear} — Requirements & Documents`,
    "description": `Complete ${countryName} tourist visa guide for Ghanaian passport holders — documents, bank balance, photo specs, processing time & expert tips.`,
    "image": country.flag,
    "author": { "@type": "Organization", "name": "Visa Expert Hub" },
    "publisher": { "@type": "Organization", "name": "Visa Expert Hub", "logo": { "@type": "ImageObject", "url": "/logo.png" } },
    "dateModified": new Date().toISOString(),
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home",                          "item": "https://visaexpresshub.com/" },
        { "@type": "ListItem", "position": 2, "name": "Visa Guide — Ghanaian Nationals","item": "https://visaexpresshub.com/visa/ghanaian-nationals" },
        { "@type": "ListItem", "position": 3, "name": `${countryName} Visa`,            "item": `https://visaexpresshub.com/visa/ghanaian-nationals/${cleanSlug}` },
      ],
    },
  };

  return (
    <div className="min-h-screen" style={{ background: "#fff", fontFamily: "'DM Sans',system-ui,sans-serif", color: "#111" }}>
      <PageStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* ── HERO ── */}
      <div style={{ background: "#111111", color: "white" }}>
        <div className="max-w-7xl mx-auto px-5 py-14 md:py-20">
          <Breadcrumb countryName={countryName} dark />
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="tag tag-yellow">{currentYear} Guide</span>
                <span className="tag tag-dark">Ghanaian Passport Holders</span>
                <span className="tag" style={{ background: "rgba(245,200,0,.15)", color: "#f5c800", border: "1.5px solid rgba(245,200,0,.25)" }}>⏳ Full Data Coming Soon</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl xl:text-6xl leading-tight font-black mb-3" style={{ color: "white" }}>
                {countryName} <span style={{ color: "#f5c800" }}>Tourist Visa</span> for Ghanaian Nationals
              </h1>
              <h2 className="text-base font-semibold mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                How to apply for {countryName} visa from Ghana — {currentYear} complete requirements guide for Ghanaian passport holders
              </h2>
              <p className="leading-relaxed text-sm mb-8 max-w-lg" style={{ color: "rgba(255,255,255,.55)" }}>
                Detailed {countryName} visa data for Ghanaian nationals is being prepared. The general requirements below are a reliable starting point. Contact our consultants for Ghana-specific guidance.
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["✅ Expert Consultants", "📋 Document Review", "⚡ Fast Processing", "🔒 Confidential"].map(b => (
                  <span key={b} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold"
                    style={{ background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.5)", border: "1.5px solid rgba(255,255,255,.1)" }}>{b}</span>
                ))}
              </div>
              <WhatsAppBtn href={whatsappUrl} label={`Ask About ${countryName} Visa from Ghana`} />
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="w-72 h-48 rounded-2xl overflow-hidden shadow-2xl" style={{ border: "3px solid rgba(245,200,0,.4)" }}>
                  <img src={country.flag} alt={`${countryName} flag — ${countryName} tourist visa from Ghana`} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap shadow-xl"
                  style={{ background: "#f5c800", color: "#000" }}>
                  Tourist Visa Guide {currentYear}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coming-soon alert */}
      <div className="max-w-7xl mx-auto px-5 mt-8 mb-6">
        <div className="flex gap-4 items-start p-5 rounded-2xl" style={{ background: "#fff8d6", border: "1.5px solid rgba(245,200,0,.4)" }}>
          <CircleDashed size={20} style={{ color: "#d4a800", flexShrink: 0, marginTop: "2px" }} />
          <div>
            <p className="font-black text-black text-sm mb-1">Detailed {countryName} visa data for Ghanaian nationals coming soon</p>
            <p className="text-sm leading-relaxed" style={{ color: "#555" }}>
              Our team is verifying the latest {currentYear} requirements from the {countryName} Embassy or High Commission in Ghana. The checklist below is a reliable general guide. WhatsApp our consultants — they respond within 2 hours.
            </p>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-5 pb-20">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">

            {/* INTRO */}
            <section className="card p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="section-line" />
                <h2 className="font-display text-2xl font-black text-black">{countryName} Visa from Ghana — What You Need to Know</h2>
              </div>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#555" }}>
                <p>If you hold a <strong className="text-black">Ghanaian passport</strong> and plan to visit <strong className="text-black">{countryName}</strong>, you will most likely need to apply for a visa in advance from Ghana. The process involves submitting a document package to the {countryName} Embassy, High Commission or Consulate in Accra, or to an authorised Visa Application Centre (VFS Global / BLS International) in Ghana.</p>
                <p>The <strong className="text-black">{countryName} visa for Ghanaian nationals</strong> in {currentYear} generally requires proof of financial solvency from a Ghanaian bank, a confirmed travel itinerary, hotel bookings, proof of strong ties to Ghana (employment, business, family property), and a well-structured cover letter. Embassy officers particularly scrutinise Ghanaian bank statements, tax clearance certificates, and proof of intent to return to Ghana.</p>
                <p>Common rejection reasons for Ghanaian applicants: <strong className="text-black">insufficient or unstable Ghanaian bank balance</strong>, weak cover letter with vague travel purpose, non-compliant photographs, missing GRA tax clearance certificate, and poor documentation of economic ties to Ghana.</p>
              </div>
            </section>

            {/* DOCUMENTS */}
            <section className="card p-8 md:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl" style={{ background: "#f0fdf4" }}><CheckCircle size={24} style={{ color: "#16a34a" }} /></div>
                <div>
                  <h2 className="font-display text-2xl font-black text-black">{countryName} Visa Checklist — Ghanaian Passport Holders</h2>
                  <p className="text-sm mt-0.5" style={{ color: "#777" }}>Standard checklist for Ghanaian nationals applying for {countryName} visa</p>
                </div>
              </div>
              <div className="space-y-2.5 mb-8">
                {commonDocs.map((item, i) => (
                  <div key={i} className="flex gap-3 p-4 rounded-xl" style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}>
                    <div className="check-box mt-0.5"><CheckCircle size={10} color="white" /></div>
                    <p className="text-sm font-medium leading-relaxed" style={{ color: "#333" }}>{item}</p>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: "1.5px solid #eee", paddingTop: "28px" }}>
                <p style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".15em", color: "#aaa", marginBottom: "20px" }}>Additional Documents by Profession (Ghanaian Context)</p>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { role: "Ghanaian Salaried",   items: ["Employer introduction letter on official company letterhead (signed by HR or MD)", "Last 3–6 months payslips", "Employment contract / appointment letter", "Company staff ID card copy"] },
                    { role: "Ghanaian Business",   items: ["Ghana Registrar General's Department certificate", "Ghana Revenue Authority (GRA) TCC (tax clearance)", "Company Ghanaian bank statement (6 months)", "GIPC or sector-specific registration (if applicable)"] },
                    { role: "Student (Ghana)",     items: ["University / school admission or enrollment letter", "Ghana Education Service or institution letter", "Parent/guardian's financial proof and Ghanaian bank statement", "Academic transcripts and school ID"] },
                    { role: "Retired / Pensioner", items: ["SSNIT pension statement", "Retirement letter from former employer", "Investment/property ownership documents", "Guarantor letter if sponsored by a family member"] },
                  ].map(({ role, items }) => (
                    <div key={role} className="card p-5" style={{ background: "#fafafa" }}>
                      <h4 style={{ fontSize: "11px", fontWeight: 800, color: "#444", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: "10px" }}>{role}</h4>
                      <ul className="space-y-1.5">
                        {items.map((item, i) => (
                          <li key={i} className="text-xs flex gap-2 leading-relaxed" style={{ color: "#666" }}>
                            <span style={{ color: "#16a34a", flexShrink: 0 }}>✓</span> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* PHOTO + TIPS */}
            <div className="grid md:grid-cols-2 gap-5">
              <section className="card p-8" style={{ background: "#fff5f5", border: "1.5px solid #fecaca" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl" style={{ background: "#fee2e2" }}><Camera size={20} style={{ color: "#dc2626" }} /></div>
                  <h2 className="font-display text-xl font-black text-black">Photo Specifications</h2>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {[
                    { label: "Common Size",  val: "35×45mm or 51×51mm" },
                    { label: "Background",   val: "Plain White only" },
                    { label: "Standard",     val: "ICAO Compliant" },
                    { label: "Taken Within", val: "3 months" },
                  ].map(({ label, val }) => (
                    <div key={label} className="rounded-xl p-3" style={{ background: "white", border: "1.5px solid #fee2e2" }}>
                      <p style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", color: "#dc2626", marginBottom: "4px" }}>{label}</p>
                      <p className="text-xs font-bold text-black">{val}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em", color: "#dc2626", marginBottom: "8px" }}>❌ Not Accepted</p>
                {["Glasses, hats, or accessories", "Heavy filters or retouching", "White clothing on white background", "Blurry, old, or expired photos", "Any shadow on the face or background"].map((no, i) => (
                  <div key={i} className="flex gap-2 text-xs font-semibold px-3 py-2 mb-1.5 rounded-lg" style={{ background: "#fee2e2", color: "#dc2626" }}>
                    <span className="shrink-0">✕</span> {no}
                  </div>
                ))}
              </section>

              <section className="card-yellow p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl" style={{ background: "rgba(245,200,0,.2)" }}><Lightbulb size={20} style={{ color: "#d4a800" }} /></div>
                  <h2 className="font-display text-xl font-black text-black">Approval Tips for Ghanaian Nationals</h2>
                </div>
                <div className="space-y-3">
                  {[
                    "Apply at least 8–12 weeks before your travel date. Ghanaian passport applications for UK, USA, Canada, and Schengen visas often experience longer processing queues — plan ahead.",
                    "Maintain a stable Ghanaian bank balance for at least 6 months before applying. Avoid large last-minute deposits — embassies flag sudden balance spikes as suspicious for Ghanaian applicants.",
                    "Include a GRA tax clearance certificate where possible — several embassies, including USA and Schengen, look favourably on Ghanaians who can demonstrate formal tax compliance.",
                    "Write a compelling cover letter: state your Ghanaian employer, monthly income, clear travel purpose, full itinerary, and why you will return to Ghana (property, family, employment).",
                    "Prior visa history to the USA, UK, Schengen, or UAE dramatically improves your chances. Include copies of all previously issued visas in your current and old passports.",
                  ].map((tip, i) => (
                    <div key={i} className="flex gap-3 p-3.5 rounded-xl" style={{ background: "rgba(255,255,255,.7)" }}>
                      <span className="font-black text-lg shrink-0" style={{ color: "#d4a800" }}>0{i + 1}</span>
                      <p className="text-xs font-medium leading-relaxed" style={{ color: "#444" }}>{tip}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* BANK BALANCE */}
            <section className="card p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl" style={{ background: "#eff6ff" }}><Wallet size={22} style={{ color: "#2563eb" }} /></div>
                <div>
                  <h2 className="font-display text-2xl font-black text-black">Bank Balance Required — {countryName} Visa from Ghana</h2>
                  <p className="text-sm mt-0.5" style={{ color: "#777" }}>General Ghanaian bank balance guidelines for {countryName} visa applicants</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Solo Traveler",  val: "GHS 30,000–60,000",  note: "GHS 75,000+ recommended",           bg: "#eff6ff", border: "#bfdbfe", col: "#2563eb" },
                  { label: "Couple Travel",  val: "GHS 60,000–100,000", note: "Stable 6-month history required",    bg: "#f0fdf4", border: "#bbf7d0", col: "#16a34a" },
                  { label: "Family Trip",    val: "GHS 100,000–200,000+",note: "Varies by trip duration & size",    bg: "#faf5ff", border: "#e9d5ff", col: "#9333ea" },
                ].map(({ label, val, note, bg, border, col }) => (
                  <div key={label} className="rounded-2xl p-5" style={{ background: bg, border: `1.5px solid ${border}` }}>
                    <p style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em", color: col, marginBottom: "8px" }}>{label}</p>
                    <p className="text-xl font-black text-black mb-1">{val}</p>
                    <p className="text-xs font-medium" style={{ color: "#666" }}>{note}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 p-5 rounded-2xl" style={{ background: "#fff8d6", border: "1.5px solid rgba(245,200,0,.4)" }}>
                <TriangleAlert size={18} style={{ color: "#d4a800", flexShrink: 0, marginTop: "2px" }} />
                <p className="text-sm font-medium leading-relaxed" style={{ color: "#555" }}>
                  <strong className="text-black">Important:</strong> Do not deposit a large lump sum into your Ghanaian bank account immediately before applying. Embassy officers check the full 6-month transaction history — a sudden balance spike is a major red flag for Ghanaian applicants. Build your balance steadily over months before applying.
                </p>
              </div>
            </section>

            {/* FAQ */}
            <section className="card p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl" style={{ background: "#faf5ff" }}><HelpCircle size={22} style={{ color: "#9333ea" }} /></div>
                <div>
                  <h2 className="font-display text-2xl font-black text-black">FAQ — {countryName} Visa for Ghanaian Nationals {currentYear}</h2>
                  <p className="text-sm mt-0.5" style={{ color: "#777" }}>Common questions from Ghanaian passport holders applying for {countryName} visa</p>
                </div>
              </div>
              <div>
                {faqs.map((item, i) => (
                  <details key={i} className="faq-item">
                    <summary>
                      <span className="font-bold pr-4 leading-snug text-sm" style={{ color: "#111" }}>
                        <span style={{ color: "#d4a800", marginRight: "8px" }}>Q.</span>{item.q}
                      </span>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 chevron" style={{ background: "#f5f5f5" }}>
                        <ChevronRight size={14} style={{ color: "#888" }} />
                      </div>
                    </summary>
                    <div className="px-5 pb-5 pt-4 text-sm leading-relaxed" style={{ color: "#555", marginLeft: "28px" }}>{item.a}</div>
                  </details>
                ))}
              </div>
            </section>

            {/* SEO ARTICLE */}
            <section className="card p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="section-line" style={{ background: "linear-gradient(to bottom,#e8e8e8,#ccc)" }} />
                <h2 className="font-display text-2xl font-black text-black">{countryName} Visa for Ghanaian Nationals — {currentYear} Guide</h2>
              </div>
              <div className="space-y-5 text-sm leading-relaxed" style={{ color: "#555" }}>
                <p>Getting a <strong className="text-black">{countryName} visa from Ghana</strong> in {currentYear} requires thorough and professional preparation. Ghanaian passport holders are assessed carefully at most embassies, meaning your document file must be complete, consistent, and backed by strong evidence of economic ties to Ghana.</p>
                <h3 className="text-lg font-black text-black">{countryName} Visa Application Process for Ghanaian Nationals</h3>
                <p>The process begins at the {countryName} Embassy, High Commission or Consulate in Accra, or at a VFS Global / BLS International centre in Ghana. You complete the visa application form, attach all required documents including a GRA tax clearance where applicable, pay the applicable embassy and service fees, and await the visa officer's decision. Biometrics (fingerprints and photograph) are required for most Schengen, UK, USA, and Canadian applications.</p>
                <h3 className="text-lg font-black text-black">How Long Does {countryName} Visa Processing Take from Ghana?</h3>
                <p>Standard processing typically takes <strong className="text-black">10–20 working days</strong> from Ghana. We strongly advise Ghanaian applicants to apply at least 8–12 weeks before the flight date, especially during peak travel seasons and Ghanaian public holidays.</p>
                <h3 className="text-lg font-black text-black">Can You Help Ghanaian Nationals with {countryName} Visa Applications?</h3>
                <p>Yes — our experienced consultants specialise in Ghanaian passport applications. <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-bold" style={{ color: "#d4a800", textDecoration: "underline" }}>WhatsApp us</a> or email <strong className="text-black">info@visaexperthub.com</strong> to get started today.</p>
              </div>
            </section>

            {/* INTERNAL LINKS */}
            <section className="card-yellow p-8 rounded-2xl">
              <h3 className="font-display text-xl font-black text-black mb-1">Also Explore These Visa Guides</h3>
              <p className="text-xs mb-6" style={{ color: "#888" }}>Popular tourist visa guides for Ghanaian passport holders — updated 2026</p>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {["United States", "United Kingdom", "Canada", "Germany", "Japan", "Australia", "Malaysia", "Thailand"].map(name =>
                  name !== countryName ? (
                    <Link key={name} href={`/visa/ghana/${createSlug(name)}`}
                      title={`${name} tourist visa from Ghana — complete guide`}
                      className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold transition-all group"
                      style={{ background: "rgba(255,255,255,.7)", border: "1.5px solid rgba(245,200,0,.2)", color: "#333" }}>
                      <span className="font-black group-hover:translate-x-0.5 transition-transform" style={{ color: "#d4a800" }}>→</span>
                      {name} Tourist Visa — Ghana Guide
                    </Link>
                  ) : null
                )}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:col-span-4 space-y-5">
            <SidebarCTA whatsappUrl={whatsappUrl} countryName={countryName} data={null} />

            {/* Steps */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Plane size={17} style={{ color: "#888" }} />
                <h3 className="font-black text-black text-sm">How to Apply from Ghana — 5 Steps</h3>
              </div>
              <div className="space-y-5 relative">
                <div className="step-line" />
                {[
                  { n: "01", title: "Check Requirements",  desc: `Verify ${countryName} visa requirements for Ghanaian passport holders in ${new Date().getFullYear()}` },
                  { n: "02", title: "Collect Documents",   desc: "Gather all required Ghanaian financial, tax & employment papers using the checklist above" },
                  { n: "03", title: "Book Appointment",    desc: "Schedule at VFS Global Ghana, or the embassy / high commission in Accra" },
                  { n: "04", title: "Submit & Pay Fees",   desc: "Submit in person at the Ghana centre; all embassy fees are non-refundable" },
                  { n: "05", title: "Track & Collect",     desc: "Monitor application status online; collect passport when decision is communicated" },
                ].map((s, i) => (
                  <div key={i} className="relative pl-9">
                    <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: i === 0 ? "#f5c800" : "#f5f5f5", border: "3px solid white", boxShadow: "0 0 0 2px #eee" }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: i === 0 ? "#111" : "#ccc" }} />
                    </div>
                    <p style={{ fontSize: "9px", textTransform: "uppercase", fontWeight: 800, color: "#aaa", letterSpacing: ".1em" }}>{s.n}</p>
                    <p className="font-black text-black text-sm">{s.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "#777" }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Ghana Submission Centres */}
            <div className="rounded-2xl p-5" style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe" }}>
              <h3 className="font-black text-black text-sm mb-3 flex items-center gap-2">
                <MapPin size={14} style={{ color: "#2563eb" }} /> Visa Application Centres in Ghana
              </h3>
              <div className="space-y-1.5">
                {["Accra — Airport City", "Accra — East Legon", "Accra — Cantonments", "Kumasi", "Takoradi", "Tamale"].map(city => (
                  <div key={city} className="flex items-center gap-2 text-xs font-semibold" style={{ color: "#2563eb" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                    {city}
                  </div>
                ))}
              </div>
              <p className="text-[10px] mt-3 font-medium" style={{ color: "#4b7db8" }}>Availability varies by destination country. Our team will confirm the correct Ghana submission centre for you.</p>
            </div>

            <RelatedVisaLinks countries={allCountries} currentSlug={cleanSlug} />

            <div className="rounded-2xl p-6 text-center" style={{ background: "#f5c800" }}>
              <div className="text-4xl mb-3">🙋</div>
              <h4 className="font-black text-xl text-black mb-2">Need Help?</h4>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(0,0,0,.6)" }}>Our consultants specialise in {countryName} visa applications for Ghanaian nationals — complete document review from Accra or Kumasi.</p>
              <a href="mailto:info@visaexperthub.com" className="block bg-black text-white py-3 rounded-xl font-black text-sm hover:bg-gray-900 transition mb-3">
                📧 info@visaexperthub.com
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="block py-3 rounded-xl font-black text-sm text-white transition" style={{ background: "#128C7E" }}>
                💬 WhatsApp Us Now
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="py-20 px-5 text-center" style={{ background: "#111111", color: "white" }}>
        <div className="max-w-2xl mx-auto">
          <img src={country.flag} alt={`${countryName} flag`} className="w-24 h-16 object-cover rounded-2xl mx-auto mb-6 shadow-2xl" />
          <h2 className="font-display text-3xl md:text-4xl font-black mb-3">Planning to Visit {countryName} from Ghana?</h2>
          <p className="mb-10 leading-relaxed text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,.5)" }}>
            Let our expert consultants guide your {countryName} visa application from Ghana — the right documents, the right way, with a 98% approval rate for Ghanaian passport holders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppBtn href={whatsappUrl} label="Start Application via WhatsApp" />
            <Link href="/visa/ghana"
              className="inline-flex items-center justify-center px-8 py-4 rounded-2xl font-black text-sm transition"
              style={{ border: "2px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.6)" }}>
              Browse All Countries
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE — full data version
// ─────────────────────────────────────────────────────────────────────────────
export default async function CountryVisaPage({ params }) {
  const { slug }  = await params;
  const cleanSlug = slug.replace(/-visa$/, "");
  const countries = await getCountries();
  const country   = countries.find(c => createSlug(c.country) === cleanSlug);

  if (!country) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-10"
        style={{ background: "#fff", fontFamily: "'DM Sans',sans-serif" }}>
        <PageStyles />
        <div className="text-8xl mb-6">🌍</div>
        <h1 className="font-display text-3xl font-black text-black mb-3">Country Not Found</h1>
        <p className="mb-4" style={{ color: "#777" }}>We couldn't find that destination in our database.</p>
        <Link href="/visa/ghana" className="btn-yellow px-8 py-4 rounded-2xl text-sm inline-flex">
          ← Browse All Destinations
        </Link>
      </div>
    );
  }

  const d           = await getVisaData(cleanSlug);
  const countryName = country.country;
  const currentYear = new Date().getFullYear();

  const whatsappMsg = encodeURIComponent(`Hi, I'm a Ghanaian national and want to apply for a ${countryName} Tourist Visa. I found the guide on your website.`);
  const whatsappUrl = `https://wa.me/971507078334?text=${whatsappMsg}`;

  if (!d) {
    return <FallbackVisaPage country={country} whatsappUrl={whatsappUrl} allCountries={countries} />;
  }

  // ── FULL DATA PAGE ──────────────────────────────────────────────────────────
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${countryName} Tourist Visa for Ghanaian Nationals ${currentYear} — Requirements, Fees & Documents`,
    "description": d.description || `Complete ${countryName} visa guide for Ghanaian passport holders — updated ${currentYear}.`,
    "image": country.flag,
    "author": { "@type": "Organization", "name": "Visa Expert Hub" },
    "publisher": { "@type": "Organization", "name": "Visa Expert Hub", "logo": { "@type": "ImageObject", "url": "/logo.png" } },
    "dateModified": new Date().toISOString(),
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": d.faq_extended?.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer },
      })) || [],
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home",                           "item": "https://visaexpresshub.com/" },
        { "@type": "ListItem", "position": 2, "name": "Visa Guide — Ghanaian Nationals", "item": "https://visaexpresshub.com/visa/ghanaian-nationals" },
        { "@type": "ListItem", "position": 3, "name": `${countryName} Visa`,             "item": `https://visaexpresshub.com/visa/ghanaian-nationals/${cleanSlug}` },
      ],
    },
  };

  return (
    <div className="min-h-screen" style={{ background: "#ffffff", fontFamily: "'DM Sans',system-ui,sans-serif", color: "#111" }}>
      <PageStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* ── HERO ── */}
      <div style={{ background: "#111111", color: "white" }}>
        <div className="max-w-7xl mx-auto px-5 py-14 md:py-20">
          <Breadcrumb countryName={countryName} dark />
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="tag tag-yellow">{currentYear} Embassy Protocol</span>
                <span className="tag tag-dark">{d.visa_category_details?.visa_type}</span>
                <span className="tag" style={{ background: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.6)", border: "1.5px solid rgba(255,255,255,.12)" }}>
                  <Calendar size={10} style={{ marginRight: "4px" }} /> Updated: {d.last_updated}
                </span>
                <span className="tag" style={{ background: "rgba(206,17,38,.2)", color: "#fca5a5", border: "1.5px solid rgba(206,17,38,.3)" }}>🇬🇭 Ghanaian Nationals</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl xl:text-6xl leading-tight font-black mb-3" style={{ color: "white" }}>
                {countryName} Tourist Visa <span style={{ color: "#f5c800" }}>for Ghanaian Nationals</span>
              </h1>
              <h2 className="text-base font-semibold mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,.6)" }}>{d.title}</h2>
              <p className="leading-relaxed text-sm mb-8 max-w-lg" style={{ color: "rgba(255,255,255,.5)" }}>{d.description}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {["✅ 98% Success Rate", "📋 Embassy Verified", "⚡ 24hr Review", "🇬🇭 Ghana Specialist", "🔒 Confidential"].map(b => (
                  <span key={b} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold"
                    style={{ background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.55)", border: "1.5px solid rgba(255,255,255,.1)" }}>{b}</span>
                ))}
              </div>
              <WhatsAppBtn href={whatsappUrl} label={`Start ${countryName} Visa — WhatsApp`} />
            </div>
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <div className="w-72 h-48 rounded-2xl overflow-hidden shadow-2xl" style={{ border: "3px solid rgba(245,200,0,.5)" }}>
                  <img src={country.flag} alt={`${countryName} flag — tourist visa for Ghanaian nationals ${currentYear}`} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap shadow-xl"
                  style={{ background: "#f5c800", color: "#000" }}>
                  {d.visa_category_details?.main_category}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── QUICK STATS ── */}
      <div className="max-w-7xl mx-auto px-5 -mt-5 relative z-20 mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: <Clock size={20} style={{ color: "#f5c800" }} />,      label: "Processing Time", val: d.processing_time_metrics?.standard_turnaround },
            { icon: <Calendar size={20} style={{ color: "#2563eb" }} />,   label: "Stay Duration",   val: d.stay_and_validity_rules?.standard_stay },
            { icon: <ShieldCheck size={20} style={{ color: "#16a34a" }} />,label: "Visa Validity",   val: d.stay_and_validity_rules?.visa_validity_window },
            { icon: <Landmark size={20} style={{ color: "#9333ea" }} />,   label: "Embassy Fee",     val: d.visa_fee_structure_2026?.embassy_visa_fee },
          ].map((s, i) => (
            <div key={i} className="p-5 rounded-2xl flex flex-col items-center text-center shadow-lg bg-white" style={{ border: "1.5px solid #eee" }}>
              <div className="mb-2">{s.icon}</div>
              <p style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", color: "#aaa", marginBottom: "4px" }}>{s.label}</p>
              <p className="text-sm font-black text-black leading-tight">{s.val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-5 pb-20">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-6">

            {/* INTRO */}
            <section className="card p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="section-line" />
                <h2 className="font-display text-2xl font-black text-black">{countryName} Visa for Ghanaian Nationals — Everything You Need</h2>
              </div>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#555" }}>
                <p>For <strong className="text-black">Ghanaian passport holders</strong>, obtaining a <strong className="text-black">{countryName} tourist visa</strong> requires meticulous document preparation, a strong Ghanaian financial profile, and a professionally assembled application package submitted to the {countryName} Embassy or High Commission in Accra, or a designated VFS Global centre in Ghana.</p>
                <p>The <strong className="text-black">{d.visa_category_details?.visa_type}</strong> is processed in <strong className="text-black">{d.processing_time_metrics?.standard_turnaround}</strong>. During busy periods this can extend to <strong className="text-black">{d.processing_time_metrics?.peak_season_delay}</strong>. We strongly recommend Ghanaian nationals apply at least 8–12 weeks before the travel date.</p>
                <p>Most common rejection reasons for Ghanaian applicants: <strong className="text-black">insufficient or inconsistent Ghanaian bank balance</strong>, missing GRA tax clearance certificate, weak cover letter that lacks clear ties to Ghana, non-compliant photographs, and no prior international travel history.</p>
              </div>
            </section>

            {/* MANDATORY DOCUMENTS */}
            <section className="card p-8 md:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl" style={{ background: "#f0fdf4" }}><CheckCircle size={24} style={{ color: "#16a34a" }} /></div>
                <div>
                  <h2 className="font-display text-2xl font-black text-black">{countryName} Visa — Mandatory Documents for Ghanaian Nationals</h2>
                  <p className="text-sm mt-0.5" style={{ color: "#777" }}>All items below are required. Missing even one document causes rejection.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div>
                  <p style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".15em", color: "#d4a800", marginBottom: "16px", paddingBottom: "8px", borderBottom: "1.5px solid #eee" }}>01. Primary Documents</p>
                  <div className="space-y-2.5">
                    {d.comprehensive_requirements_checklist?.primary_documents.map((item, i) => (
                      <div key={i} className="flex gap-3 p-3.5 rounded-xl" style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}>
                        <div className="check-box mt-0.5"><CheckCircle size={10} color="white" /></div>
                        <p className="text-sm font-medium leading-relaxed" style={{ color: "#333" }}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".15em", color: "#2563eb", marginBottom: "16px", paddingBottom: "8px", borderBottom: "1.5px solid #eee" }}>02. Financial Proof</p>
                  <div className="space-y-2.5">
                    {d.comprehensive_requirements_checklist?.financial_proofs.map((item, i) => (
                      <div key={i} className="flex gap-3 p-3.5 rounded-xl" style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe" }}>
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><CheckCircle size={10} color="white" /></div>
                        <p className="text-sm font-medium leading-relaxed" style={{ color: "#333" }}>{item}</p>
                      </div>
                    ))}
                  </div>
                  {d.comprehensive_requirements_checklist?.logistics_proofs && (
                    <>
                      <p style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".15em", color: "#9333ea", marginTop: "24px", marginBottom: "16px", paddingBottom: "8px", borderBottom: "1.5px solid #eee" }}>03. Travel Logistics</p>
                      <div className="space-y-2.5">
                        {d.comprehensive_requirements_checklist.logistics_proofs.map((item, i) => (
                          <div key={i} className="flex gap-3 p-3.5 rounded-xl" style={{ background: "#faf5ff", border: "1.5px solid #e9d5ff" }}>
                            <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center shrink-0 mt-0.5"><CheckCircle size={10} color="white" /></div>
                            <p className="text-sm font-medium leading-relaxed" style={{ color: "#333" }}>{item}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
              {d.comprehensive_requirements_checklist?.occupation_specific && (
                <div style={{ borderTop: "1.5px solid #eee", paddingTop: "28px" }}>
                  <p style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".15em", color: "#aaa", marginBottom: "20px" }}>04. Occupation-Specific Documents (Ghanaian Context)</p>
                  <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.entries(d.comprehensive_requirements_checklist.occupation_specific).map(([role, items]) => (
                      <div key={role} className="card p-5" style={{ background: "#fafafa" }}>
                        <h4 style={{ fontSize: "11px", fontWeight: 800, color: "#444", textTransform: "uppercase", letterSpacing: ".05em", marginBottom: "10px" }}>{role.replace(/_/g, " ")}</h4>
                        <ul className="space-y-1.5">
                          {items.map((item, i) => (
                            <li key={i} className="text-xs flex gap-2 leading-relaxed" style={{ color: "#666" }}>
                              <span style={{ color: "#16a34a", flexShrink: 0 }}>✓</span> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* PHOTO + ITINERARY */}
            <div className="grid md:grid-cols-2 gap-5">
              <section className="card p-8" style={{ background: "#fff5f5", border: "1.5px solid #fecaca" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl" style={{ background: "#fee2e2" }}><Camera size={20} style={{ color: "#dc2626" }} /></div>
                  <h2 className="font-display text-xl font-black text-black">Photo Specifications</h2>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-5">
                  {[
                    { label: "Size",       val: d.technical_photo_specifications?.dimensions },
                    { label: "Background", val: d.technical_photo_specifications?.background_color },
                    { label: "Standard",   val: d.technical_photo_specifications?.standard },
                    { label: "Face Size",  val: d.technical_photo_specifications?.facial_metrics },
                  ].map(({ label, val }) => (
                    <div key={label} className="rounded-xl p-3" style={{ background: "white", border: "1.5px solid #fee2e2" }}>
                      <p style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", color: "#dc2626", marginBottom: "4px" }}>{label}</p>
                      <p className="text-xs font-bold text-black">{val}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em", color: "#dc2626", marginBottom: "8px" }}>❌ Strictly Prohibited</p>
                {d.technical_photo_specifications?.strict_donots?.map((no, i) => (
                  <div key={i} className="flex gap-2 text-xs font-semibold px-3 py-2 mb-1.5 rounded-lg" style={{ background: "#fee2e2", color: "#dc2626" }}>
                    <span className="shrink-0">✕</span> {no}
                  </div>
                ))}
              </section>

              <section className="card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl" style={{ background: "#fff7ed" }}><Map size={20} style={{ color: "#ea580c" }} /></div>
                  <h2 className="font-display text-xl font-black text-black">Itinerary Strategy</h2>
                </div>
                <div className="space-y-3">
                  <div className="p-5 rounded-2xl" style={{ background: "#fff8d6", border: "1.5px solid rgba(245,200,0,.4)" }}>
                    <p style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em", color: "#d4a800", marginBottom: "8px" }}>⭐ Recommended Route</p>
                    <p className="font-black text-black text-base">{d.itinerary_design_strategy?.golden_route}</p>
                  </div>
                  {d.itinerary_design_strategy?.regional_focus && (
                    <div className="p-4 rounded-xl" style={{ background: "#fafafa", border: "1.5px solid #eee" }}>
                      <p style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em", color: "#aaa", marginBottom: "4px" }}>Seasonal Focus</p>
                      <p className="text-sm font-semibold text-black">{d.itinerary_design_strategy.regional_focus}</p>
                    </div>
                  )}
                  <div className="p-4 rounded-xl" style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe" }}>
                    <p style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em", color: "#2563eb", marginBottom: "4px" }}>📌 Embassy Rule</p>
                    <p className="text-sm leading-relaxed" style={{ color: "#444" }}>{d.itinerary_design_strategy?.requirements}</p>
                  </div>
                </div>
              </section>
            </div>

            {/* SUBMISSION CENTRES */}
            {d.geospatial_submission_data?.length > 0 && (
              <section className="card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-xl" style={{ background: "#eff6ff" }}><MapPin size={22} style={{ color: "#2563eb" }} /></div>
                  <div>
                    <h2 className="font-display text-2xl font-black text-black">Official Submission Centres in Ghana</h2>
                    <p className="text-sm mt-0.5" style={{ color: "#777" }}>Where to submit your {countryName} visa application from Accra or Kumasi</p>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  {d.geospatial_submission_data.map((loc, i) => (
                    <div key={i} className="card p-6 hover-yellow transition-all">
                      <div className="flex items-start gap-3 mb-4">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: "#2563eb" }}>
                          <MapPin size={15} color="white" />
                        </div>
                        <div>
                          <h4 className="font-black text-black text-sm">{loc.center}</h4>
                          <p className="text-xs leading-relaxed mt-1" style={{ color: "#777" }}>{loc.address}</p>
                        </div>
                      </div>
                      <div className="rounded-xl p-4 space-y-2 text-xs" style={{ background: "#fafafa", border: "1.5px solid #eee" }}>
                        <div className="flex justify-between">
                          <span className="font-semibold" style={{ color: "#777" }}>Submission Hours</span>
                          <span className="font-black text-black">{loc.submission_hours}</span>
                        </div>
                        {loc.passport_collection && (
                          <div className="flex justify-between" style={{ borderTop: "1.5px solid #eee", paddingTop: "8px" }}>
                            <span className="font-semibold" style={{ color: "#777" }}>Passport Collection</span>
                            <span className="font-black text-black">{loc.passport_collection}</span>
                          </div>
                        )}
                        {loc.gps_coordinates && (
                          <div style={{ borderTop: "1.5px solid #eee", paddingTop: "8px" }}>
                            <span style={{ fontSize: "9px", color: "#aaa", fontWeight: 700 }}>GPS: {loc.gps_coordinates}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* EXPERT TIPS */}
            <section className="card-yellow p-8 md:p-10 rounded-2xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl" style={{ background: "rgba(245,200,0,.3)" }}><Lightbulb size={22} style={{ color: "#d4a800" }} /></div>
                <div>
                  <h2 className="font-display text-2xl font-black text-black">{countryName} Visa Approval Tips for Ghanaian Nationals</h2>
                  <p className="text-sm mt-0.5" style={{ color: "#888" }}>Insider tips from our consultants — what embassies look for from Ghanaian applicants</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {d.expert_approval_hacks?.map((hack, i) => (
                  <div key={i} className="flex gap-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,.75)" }}>
                    <span className="text-2xl font-black shrink-0" style={{ color: "rgba(212,168,0,.4)" }}>0{i + 1}</span>
                    <p className="text-sm font-medium leading-relaxed" style={{ color: "#444" }}>{hack}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* REJECTION RISKS */}
            <section className="card p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl" style={{ background: "#fff5f5" }}><AlertTriangle size={22} style={{ color: "#dc2626" }} /></div>
                <div>
                  <h2 className="font-display text-2xl font-black text-black">{countryName} Visa Rejection Risks — Ghanaian Nationals</h2>
                  <p className="text-sm mt-0.5" style={{ color: "#777" }}>Why Ghanaian applicants get rejected — and how to avoid it</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                {d.rejection_risk_matrix?.high_risk?.map((risk, i) => (
                  <div key={i} className="flex gap-3 p-4 risk-high">
                    <span style={{ color: "#dc2626", flexShrink: 0, fontWeight: 900, fontSize: "18px", lineHeight: 1 }}>●</span>
                    <p className="text-sm font-medium leading-relaxed" style={{ color: "#dc2626" }}>{risk}</p>
                  </div>
                ))}
                {d.rejection_risk_matrix?.medium_risk?.map((risk, i) => (
                  <div key={i} className="flex gap-3 p-4 risk-med">
                    <span style={{ color: "#d4a800", flexShrink: 0, fontWeight: 900, fontSize: "18px", lineHeight: 1 }}>◐</span>
                    <p className="text-sm font-medium leading-relaxed" style={{ color: "#555" }}>{risk}</p>
                  </div>
                ))}
              </div>
              <div className="p-5 rounded-2xl" style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}>
                <p style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#16a34a", letterSpacing: ".08em", marginBottom: "8px" }}>✅ Mitigation Strategy</p>
                <p className="text-sm font-medium leading-relaxed" style={{ color: "#444" }}>{d.rejection_risk_matrix?.mitigation}</p>
              </div>
            </section>

            {/* ADDITIONAL LOGISTICS */}
            {d.additional_logistics_2026 && (
              <section className="card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl" style={{ background: "#f5f5f5" }}><Info size={22} style={{ color: "#888" }} /></div>
                  <h2 className="font-display text-2xl font-black text-black">Essential {countryName} {currentYear} Logistics</h2>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  {Object.entries(d.additional_logistics_2026).map(([key, val]) => (
                    <div key={key} className="rounded-2xl p-5" style={{ background: "#fafafa", border: "1.5px solid #eee" }}>
                      <p style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", color: "#aaa", marginBottom: "8px" }}>{key.replace(/_/g, " ")}</p>
                      <p className="text-sm font-medium leading-relaxed" style={{ color: "#444" }}>{val}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* YOUTUBE VIDEOS */}
            {d.youtube_video_options?.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-black text-black mb-6">{countryName} Visa — Watch &amp; Learn</h2>
                <div className="grid md:grid-cols-3 gap-5">
                  {d.youtube_video_options.map((video, i) => {
                    const videoId = video.video_link?.split("v=")[1]?.split("&")[0];
                    const thumb   = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
                    return (
                      <a key={i} href={video.video_link} target="_blank" rel="noopener noreferrer"
                        className="card group rounded-2xl overflow-hidden transition-all hover-yellow">
                        <div className="relative aspect-video overflow-hidden" style={{ background: "#f5f5f5" }}>
                          {thumb && <img src={thumb} alt={video.video_title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform" style={{ background: "#f5c800" }}>
                              <svg className="w-6 h-6 fill-black ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-black text-sm text-black group-hover:text-gray-700 transition line-clamp-2 mb-2">{video.video_title}</h3>
                          <span className="text-xs font-bold" style={{ color: "#d4a800" }}>Watch on YouTube →</span>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </section>
            )}

            {/* FAQ */}
            {d.faq_extended?.length > 0 && (
              <section className="card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-xl" style={{ background: "#faf5ff" }}><HelpCircle size={22} style={{ color: "#9333ea" }} /></div>
                  <div>
                    <h2 className="font-display text-2xl font-black text-black">FAQ — {countryName} Visa for Ghanaian Nationals {currentYear}</h2>
                    <p className="text-sm mt-0.5" style={{ color: "#777" }}>Real questions from Ghanaian passport holders applying for {countryName} visa</p>
                  </div>
                </div>
                <div>
                  {d.faq_extended.map((item, i) => (
                    <details key={i} className="faq-item">
                      <summary>
                        <span className="font-bold pr-4 leading-snug text-sm" style={{ color: "#111" }}>
                          <span style={{ color: "#d4a800", marginRight: "8px" }}>Q.</span>{item.question}
                        </span>
                        <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 chevron" style={{ background: "#f5f5f5" }}>
                          <ChevronRight size={14} style={{ color: "#888" }} />
                        </div>
                      </summary>
                      <div className="px-5 pb-5 pt-4 text-sm leading-relaxed" style={{ color: "#555", marginLeft: "28px" }}>{item.answer}</div>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* SEO ARTICLE FOOTER */}
            <section className="card p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="section-line" />
                <h2 className="font-display text-2xl font-black text-black">{countryName} Visa for Ghanaian Nationals — {currentYear} Complete Guide</h2>
              </div>
              <div className="space-y-5 text-sm leading-relaxed" style={{ color: "#555" }}>
                <p>Applying for a <strong className="text-black">{countryName} tourist visa from Ghana</strong> involves submitting a complete Ghanaian document package to the {countryName} Embassy or VFS Global centre in Ghana. The {d.visa_category_details?.visa_type} allows a stay of <strong className="text-black">{d.stay_and_validity_rules?.standard_stay}</strong>.</p>
                <h3 className="text-lg font-black text-black">{countryName} Visa Fee for Ghanaian Nationals — {currentYear}</h3>
                <p>The current embassy fee is <strong className="text-black">{d.visa_fee_structure_2026?.embassy_visa_fee}</strong>. VFS Global Ghana service charge adds <strong className="text-black">{d.visa_fee_structure_2026?.vfs_service_charge}</strong>. All fees are <strong className="text-black">non-refundable</strong> regardless of outcome.</p>
                <h3 className="text-lg font-black text-black">Bank Balance Required for {countryName} Visa from Ghana</h3>
                <p>Ghanaian applicants should maintain a minimum bank balance of <strong className="text-black">{d.financial_thresholds_2026?.solo_traveler_min}</strong> for solo travel, with <strong className="text-black">{d.financial_thresholds_2026?.solo_traveler_recommended}</strong> recommended. Avoid large last-minute Ghanaian bank deposits.</p>
                <h3 className="text-lg font-black text-black">{countryName} Visa Photo Size for Ghanaian Nationals</h3>
                <p>Photos must be <strong className="text-black">{d.technical_photo_specifications?.dimensions}</strong> ({d.technical_photo_specifications?.standard}), on a <strong className="text-black">{d.technical_photo_specifications?.background_color}</strong> background, taken within 3 months. Available at professional photo studios across Accra, Kumasi, and all major Ghanaian cities.</p>
              </div>
            </section>

            {/* INTERNAL LINKS */}
            <section className="card-yellow p-8 rounded-2xl">
              <h3 className="font-display text-xl font-black text-black mb-1">Also Explore These Visa Guides</h3>
              <p className="text-xs mb-6" style={{ color: "#888" }}>Popular tourist visa guides for Ghanaian passport holders — updated 2026</p>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {["United States", "United Kingdom", "Canada", "Germany", "France", "Japan", "Australia", "Malaysia", "Thailand", "Singapore"].map(name =>
                  name !== countryName ? (
                    <Link key={name} href={`/visa/ghana/${createSlug(name)}`}
                      title={`${name} tourist visa from Ghana — complete 2026 guide`}
                      className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold transition-all group"
                      style={{ background: "rgba(255,255,255,.7)", border: "1.5px solid rgba(245,200,0,.2)", color: "#333" }}>
                      <span className="font-black group-hover:translate-x-0.5 transition-transform" style={{ color: "#d4a800" }}>→</span>
                      {name} Tourist Visa — Ghana Guide
                    </Link>
                  ) : null
                )}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:col-span-4 space-y-5">
            <SidebarCTA whatsappUrl={whatsappUrl} countryName={countryName} data={d} />

            {/* Cost Breakdown */}
            <div className="rounded-2xl p-6" style={{ background: "#fff8d6", border: "1.5px solid rgba(245,200,0,.4)" }}>
              <div className="flex items-center gap-2 mb-6">
                <CreditCard size={17} style={{ color: "#d4a800" }} />
                <h3 className="font-black text-black text-sm">{currentYear} Cost Breakdown</h3>
              </div>
              <div className="space-y-2 mb-5">
                <div className="flex justify-between items-center py-3" style={{ borderBottom: "1.5px solid rgba(245,200,0,.2)" }}>
                  <span className="text-sm font-semibold" style={{ color: "#555" }}>Embassy Fee</span>
                  <span className="font-black text-black">{d.visa_fee_structure_2026?.embassy_visa_fee}</span>
                </div>
                <div className="flex justify-between items-center py-3" style={{ borderBottom: "1.5px solid rgba(245,200,0,.2)" }}>
                  <span className="text-sm font-semibold" style={{ color: "#555" }}>VFS Ghana Service</span>
                  <span className="font-black text-black">{d.visa_fee_structure_2026?.vfs_service_charge}</span>
                </div>
                {d.visa_fee_structure_2026?.optional_value_added_services &&
                  Object.entries(d.visa_fee_structure_2026.optional_value_added_services).map(([k, v]) => (
                    <div key={k} className="flex justify-between text-xs py-1.5">
                      <span style={{ color: "#888" }} className="capitalize">{k.replace(/_/g, " ")}</span>
                      <span className="font-bold" style={{ color: "#555" }}>{v}</span>
                    </div>
                  ))}
              </div>
              <div className="p-3 rounded-xl text-xs font-bold text-center" style={{ background: "rgba(245,200,0,.2)", color: "#d4a800" }}>
                ⚠️ {d.visa_fee_structure_2026?.payment_policy}
              </div>
            </div>

            {/* Timeline */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-6">
                <Clock size={17} style={{ color: "#888" }} />
                <h3 className="font-black text-black text-sm">Processing Timeline from Ghana</h3>
              </div>
              <div className="space-y-5 relative">
                <div className="step-line" />
                {[
                  { label: "Standard Turnaround", time: d.processing_time_metrics?.standard_turnaround, col: "#16a34a" },
                  { label: "Embassy Review Phase", time: d.processing_time_metrics?.embassy_review_phase, col: "#2563eb" },
                  { label: "Peak Season Delay",    time: d.processing_time_metrics?.peak_season_delay,   col: "#ea580c" },
                  ...(d.processing_time_metrics?.express_service ? [{ label: "Express Option", time: d.processing_time_metrics.express_service, col: "#9333ea" }] : []),
                ].filter(s => s.time).map((item, i) => (
                  <div key={i} className="relative pl-9">
                    <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: item.col, border: "3px solid white", boxShadow: "0 0 0 2px #eee" }}>
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <p style={{ fontSize: "9px", textTransform: "uppercase", fontWeight: 800, color: "#aaa", letterSpacing: ".1em" }}>{item.label}</p>
                    <p className="font-black text-black text-sm">{item.time}</p>
                  </div>
                ))}
              </div>
              {d.processing_time_metrics?.notes && (
                <div className="mt-5 p-3 rounded-xl text-xs leading-relaxed font-medium" style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe", color: "#2563eb" }}>
                  ℹ️ {d.processing_time_metrics.notes}
                </div>
              )}
            </div>

            {/* Bank Balance */}
            <div className="rounded-2xl p-6 text-white" style={{ background: "#111111" }}>
              <div className="flex items-center gap-2 mb-4">
                <CreditCard size={17} />
                <h3 className="font-black text-sm">Minimum Ghanaian Bank Balance</h3>
              </div>
              <div className="text-4xl font-black mb-1" style={{ color: "#f5c800" }}>{d.financial_thresholds_2026?.solo_traveler_min}</div>
              <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,.5)" }}>Recommended: <strong style={{ color: "white" }}>{d.financial_thresholds_2026?.solo_traveler_recommended}</strong></p>
              <div className="space-y-2 mb-4 text-xs">
                <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,.08)" }}>
                  <p style={{ color: "rgba(255,255,255,.5)", fontWeight: 700 }}>Family Travel</p>
                  <p className="font-black">{d.financial_thresholds_2026?.family_travel_min}</p>
                </div>
                <div className="rounded-xl p-3" style={{ background: "rgba(255,255,255,.08)" }}>
                  <p style={{ color: "rgba(255,255,255,.5)", fontWeight: 700 }}>Calculation Logic</p>
                  <p className="font-semibold" style={{ color: "rgba(255,255,255,.7)" }}>{d.financial_thresholds_2026?.logic}</p>
                </div>
              </div>
              <div className="flex gap-2 text-xs p-3 rounded-xl" style={{ background: "rgba(245,200,0,.1)", border: "1.5px solid rgba(245,200,0,.2)", color: "rgba(255,255,255,.7)" }}>
                <AlertTriangle size={13} style={{ flexShrink: 0, marginTop: "2px", color: "#f5c800" }} />
                <p className="leading-relaxed">{d.financial_thresholds_2026?.warning}</p>
              </div>
            </div>

            <RelatedVisaLinks countries={countries} currentSlug={cleanSlug} />

            <div className="rounded-2xl p-6 text-center" style={{ background: "#f5c800" }}>
              <div className="text-4xl mb-3">🙋</div>
              <h4 className="font-black text-xl text-black mb-2">Need Help?</h4>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(0,0,0,.6)" }}>
                Our experts handle form-filling, photo verification &amp; document review for Ghanaian nationals applying for {countryName} visa.
              </p>
              <a href="mailto:info@visaexperthub.com" className="block bg-black text-white py-3 rounded-xl font-black text-sm mb-3">
                📧 info@visaexperthub.com
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="block py-3 rounded-xl font-black text-sm text-white transition" style={{ background: "#128C7E" }}>
                💬 WhatsApp Us Now
              </a>
            </div>
          </aside>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="py-20 px-5 text-center" style={{ background: "#111111" }}>
        <div className="max-w-2xl mx-auto">
          <img src={country.flag} alt={`${countryName} flag`} className="w-24 h-16 object-cover rounded-2xl mx-auto mb-6 shadow-2xl" />
          <h2 className="font-display text-3xl md:text-4xl font-black mb-3" style={{ color: "white" }}>
            Ready to Apply for Your <span style={{ color: "#f5c800" }}>{countryName} Visa as a Ghanaian National?</span>
          </h2>
          <p className="mb-10 leading-relaxed text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,.45)" }}>
            Let our experts handle your complete {countryName} visa application from Ghana — correctly, on time, with a 98% success rate for Ghanaian passport holders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppBtn href={whatsappUrl} label="Start Application via WhatsApp" className="px-8 py-5" />
            <Link href="/visa/ghana"
              className="inline-flex items-center justify-center px-8 py-5 rounded-2xl font-black text-sm transition hover:bg-white hover:text-black"
              style={{ border: "2px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.6)" }}>
              Browse Other Countries
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}