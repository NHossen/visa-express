import clientPromise from '@/app/lib/mongodb';
import { createSlug } from '@/app/lib/utils';
import Link from 'next/link';

function parseSlug(slug) {
  const marker = '-to-';
  const pos = slug.indexOf(marker);
  if (pos === -1) return { originSlug: slug, destSlug: '' };
  return {
    originSlug: slug.slice(0, pos),              // e.g. "bangladesh" (NATIONALITY)
    destSlug:   slug.slice(pos + marker.length), // e.g. "canada"     (DESTINATION)
  };
}

/**
 * Build DB slug — ALWAYS "origin/to/destination"
 * e.g. originName="Bangladesh", destName="Canada" → "bangladesh/to/canada"
 */
function buildDbSlug(originName, destName) {
  return `${originName.toLowerCase()}/to/${destName.toLowerCase()}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// DB HELPERS
// ─────────────────────────────────────────────────────────────────────────────

async function getCountries() {
  const client = await clientPromise;
  const db = client.db('Eammu-Holidays');
  return db.collection('countries')
    .find({})
    .project({ _id: 0, country: 1, flag: 1, code: 1 })
    .toArray();
}

async function getTouristVisaGuide(originName, destName) {
  const client = await clientPromise;
  const db = client.db('Eammu-Holidays');
  const dbSlug = buildDbSlug(originName, destName);
  const doc = await db.collection('touristvisaguide')
    .findOne({ slug: dbSlug }, { projection: { _id: 0 } });
  return doc || null;
}

// ─────────────────────────────────────────────────────────────────────────────
// SEO METADATA
// ─────────────────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { originSlug, destSlug } = parseSlug(slug);

  const visaData    = await getCountries();
  // originSlug → applicant NATIONALITY   (e.g. Bangladesh)
  // destSlug   → country to VISIT        (e.g. Canada)
  const origin      = visaData.find(c => createSlug(c.country) === originSlug);
  const destination = visaData.find(c => createSlug(c.country) === destSlug);
  const originName  = origin?.country      || 'Citizens';      // Bangladesh
  const destName    = destination?.country || 'Destination';   // Canada

  const guideData = destination && origin
    ? await getTouristVisaGuide(originName, destName)
    : null;

  // Title: "Canada Visa for Bangladesh Citizens 2026"
  const title = guideData?.seoContent?.title ||
    `${destName} Visa for ${originName} Citizens 2026 — Requirements, Fees & Documents`;

  const description = guideData?.seoContent?.description ||
    `Complete ${destName} visa guide for ${originName} passport holders. Documents checklist, photo specs, bank statement requirements, processing time (10–21 days), embassy fees, and expert tips — updated for 2026. 98% approval rate.`;

  const keywords = (guideData?.seoContent?.keywords || [
    `${destName} visa for ${originName} citizens`,
    `${destName} visa requirements ${originName} 2026`,
    `${destName} visa documents checklist ${originName}`,
    `how to apply ${destName} visa from ${originName}`,
    `${destName} tourist visa processing time`,
    `${destName} visa fees ${originName} 2026`,
    `${destName} visa bank statement requirements`,
    `${destName} visa cover letter ${originName}`,
    `${destName} embassy ${originName} visa application`,
    `${destName} visa photo specification`,
    `${destName} visa rejection reasons`,
    `${destName} visa application guide 2026`,
    `${originName} passport ${destName} visa`,
    `${destName} visa success tips ${originName}`,
    `eammu holidays visa guide`,
  ]).join(', ');

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Eammu Holidays', url: 'https://www.eammu.com' }],
    creator: 'Eammu Holidays',
    publisher: 'Eammu Holidays',
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    alternates: { canonical: `/visa/${slug}` },
    openGraph: {
      title: `${destName} Visa for ${originName} Citizens 2026 — Complete Guide`,
      description: `Embassy-verified ${destName} visa requirements for ${originName} nationals. Full checklist, fees, photo specs & expert tips. Updated 2026. 98% success rate.`,
      url: `https://www.eammu.com/visa/${slug}`,
      siteName: 'Eammu Holidays',
      images: [
        {
          url: destination?.flag || 'https://www.eammu.com/og-default.jpg',
          width: 1200,
          height: 630,
          alt: `${destName} Visa Guide for ${originName} Citizens`,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${destName} Visa for ${originName} Citizens 2026`,
      description: `Complete ${destName} visa guide — documents, fees, processing time. Updated 2026.`,
      images: [destination?.flag || ''],
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// STATIC FALLBACK DATA
// destName   = country to VISIT       (e.g. Canada)
// originName = applicant's nationality (e.g. Bangladesh)
// ─────────────────────────────────────────────────────────────────────────────

function getDocuments(destName, originName) {
  return {
    identity: [
      {
        title: `Original ${originName} Passport`,
        required: true,
        desc: `Valid for at least 6 months beyond your return date from ${destName}. Minimum 2 blank visa pages required. Submit all old/expired passports alongside the current one.`,
      },
      {
        title: 'Visa Application Form',
        required: true,
        desc: `Typed digital form only — handwritten forms are rejected immediately. Must be signed with QR code verification (2026 mandatory requirement for ${destName} embassy).`,
      },
      {
        title: 'Passport-Size Photographs',
        required: true,
        desc: '47×36mm rectangular format, pure white background, no glasses, no shadows. Face must occupy 70–80% of frame. Taken within the last 90 days. Minimum 2 copies.',
      },
    ],
    financial: [
      {
        title: 'Bank Statement (Last 6 Months)',
        required: true,
        desc: 'Official bank stamp on every single page — unstamped pages cause immediate rejection. Consistent transaction history required. Sudden large deposits immediately before applying are a red flag.',
      },
      {
        title: 'Bank Solvency Certificate',
        required: true,
        desc: `On bank letterhead, signed by branch manager, showing current balance in both local currency and USD. Must be dated within 30 days of your ${destName} visa application.`,
      },
      {
        title: 'Income Tax Documentation',
        required: true,
        desc: 'ITDR / Tax Return for last 2–3 years proving legitimate, declared income consistent with your bank activity.',
      },
    ],
    professional: [
      {
        title: 'NOC / Leave Certificate',
        required: true,
        desc: `Original on company letterhead. Must include your designation, salary, approved leave dates for your ${destName} trip, company seal, and HR/MD signature.`,
      },
      {
        title: 'Business Documents (Self-Employed)',
        required: false,
        note: 'Required if self-employed',
        desc: 'Trade License with notarized English translation, company bank statement for last 6 months, and chamber of commerce certificate.',
      },
      {
        title: 'Student Documents',
        required: false,
        note: 'Required for students',
        desc: 'Current student ID, enrollment letter from institution, and NOC from the institution confirming your student status.',
      },
    ],
    travel: [
      {
        title: 'Cover Letter / Visa Request Letter',
        required: true,
        desc: `Addressed to the ${destName} Embassy Visa Officer. Must clearly state your full name, passport number, exact travel dates to ${destName}, purpose of visit, financial standing, accommodation plan, and strong ties to ${originName} guaranteeing your return.`,
      },
      {
        title: 'Flight Reservation (Not Paid Ticket)',
        required: true,
        desc: `Round-trip itinerary from ${originName} to ${destName} with valid PNR confirmation. Do NOT buy the actual ticket before visa approval — a reservation/hold is fully sufficient.`,
      },
      {
        title: 'Hotel Booking / Accommodation Proof',
        required: true,
        desc: `Full property address in ${destName}, check-in/check-out dates matching your flight, and booking reference number for every night of your stay.`,
      },
      {
        title: 'Detailed Day-by-Day Itinerary',
        required: true,
        desc: `City names, planned activities, and attractions per day in ${destName}. Embassy officers verify plausibility — itinerary must align with hotel bookings and be realistic.`,
      },
      {
        title: 'Travel Insurance',
        required: true,
        note: 'Minimum €30,000 coverage for Schengen countries',
        desc: `Must cover emergency medical treatment, hospitalization, and repatriation for the full duration of your stay in ${destName}.`,
      },
    ],
  };
}

const STATIC_PROCESS_STEPS = [
  { num: '01', icon: '📋', title: 'Document Preparation',       time: '3–5 days',             body: 'Gather all mandatory documents. Bank stamps on every page, 47×36mm photos on white background, typed digital forms only. Photocopy everything.' },
  { num: '02', icon: '🛡️', title: 'Expert Review',              time: '1–2 days',             body: 'Our visa consultants review for errors, missing items, financial consistency, photo compliance, and cover letter strength before submission.' },
  { num: '03', icon: '💳', title: 'Fee Payment & Appointment',  time: '1–3 days',             body: 'Embassy fee and VFS/BLS service charges paid. Biometric appointment booked if required by the destination embassy.' },
  { num: '04', icon: '🏛️', title: 'Embassy Submission',         time: 'Day of submission',    body: 'Complete documents submitted to the embassy or VFS Global. Biometrics collected on-site if required.' },
  { num: '05', icon: '⏳', title: 'Processing Period',           time: '10–21 business days',  body: 'Embassy processes your application. Track status online via the embassy portal. Avoid booking non-refundable travel until passport is returned.' },
  { num: '06', icon: '✅', title: 'Visa Collection',             time: 'Same day as decision', body: 'Immediately verify your name spelling, visa validity dates, number of permitted entries, and maximum stay duration before leaving.' },
];

const STATIC_REJECTION_REASONS = [
  { icon: '💰', title: 'Insufficient Financial Proof',   desc: 'Bank balance too low, sudden large deposits shortly before applying, or no consistent income history over the previous 6 months.' },
  { icon: '📝', title: 'Weak or Missing Cover Letter',   desc: 'No clear ties to home country demonstrated, vague or generic purpose statement, or a copied template that lacks personalisation.' },
  { icon: '📸', title: 'Non-Compliant Photos',           desc: 'Wrong dimensions (must be 47×36mm), grey or off-white background, glasses in photo, shadows on face, or photos taken more than 90 days ago.' },
  { icon: '📄', title: 'Incomplete Documentation',       desc: 'Missing official bank stamps, unsigned application form, expired NOC letter, or incorrect 2026 form version submitted.' },
  { icon: '📅', title: 'Inconsistent Dates',             desc: "Hotel booking dates do not match flight reservation, or day-by-day itinerary doesn't account for every night of the stay." },
  { icon: '🏠', title: 'Weak Ties to Home Country',      desc: 'No stable employment, property ownership, or family dependants — embassy suspects immigration intent rather than temporary visit.' },
];

const STATIC_EXPERT_TIPS = [
  'Apply 6–8 weeks before your intended travel date — never less than 3 weeks.',
  'Maintain a consistent bank balance for at least 3 months before applying to show financial stability.',
  'Your cover letter must include a dedicated paragraph explaining your strong reasons to return home.',
  "Keep your itinerary realistic — don't plan 5 cities in 3 days. Embassy officers check plausibility.",
  'Book refundable hotels for the application; convert to non-refundable after visa approval to save money.',
  'If your NOC is from a small company, attach the company trade license and registration documents too.',
  'Photocopy your entire submitted dossier in sequence — keep this copy safe at home.',
  'Track your application status online every day once submitted and respond quickly to any requests.',
];

function getStaticFAQs(destName, originName) {
  return [
    {
      question: `How long does ${destName} visa processing take for ${originName} citizens?`,
      answer:   `Standard processing takes 10–21 business days. During peak seasons (June–August and December–January) this can extend to 30–45 days. We strongly recommend applying at least 6–8 weeks before your planned travel date to ${destName}.`,
    },
    {
      question: `What is the exact photo specification for a ${destName} visa application?`,
      answer:   `Photos must be 47×36mm rectangular with a pure white background. No glasses, no shadows on the face. Your face must occupy 70–80% of the frame. Photos must have been taken within the last 90 days. This is strictly enforced in 2026.`,
    },
    {
      question: 'Why must the bank statement have a stamp on every page?',
      answer:   'Unstamped pages are considered unofficial and cause immediate rejection. An official branch stamp AND authorised signature are required on each page — a digital printout alone is not accepted by embassies.',
    },
    {
      question: 'Do I need to buy a flight ticket before applying?',
      answer:   `No — a confirmed flight reservation or hold with a PNR reference number is completely sufficient. Only purchase the actual ticket after your ${destName} visa is approved to avoid financial loss.`,
    },
    {
      question: `What is a Cover Letter and is it mandatory for ${originName} applicants?`,
      answer:   `It is critical, especially for ${originName} nationals applying to visit ${destName}. The cover letter explains your purpose of visit, financial capability, accommodation plan, and — most importantly — strong ties to ${originName} proving you will return home after your trip.`,
    },
    {
      question: 'What should I do if my visa application is refused?',
      answer:   `A refusal is not permanent. The most common causes for ${destName} visa refusals are weak financials, a vague cover letter, or inconsistent documentation. Strengthen these areas and reapply. Our consultants specialise in refusal resubmission cases with a high reversal rate.`,
    },
    {
      question: `Can I apply for a ${destName} visa if I have had a previous refusal?`,
      answer:   'Yes — but you must disclose all previous refusals honestly on the application form. Undisclosed refusals can result in permanent bans. A stronger, well-prepared application that directly addresses the previous rejection reason is the key to success.',
    },
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default async function VisaDetails({ params }) {
  const { slug } = await params;

  // ── PARSE SLUG ────────────────────────────────────────────────────────────
  // URL  : /visa/bangladesh-to-canada
  //               ^^^^^^^^^^    ^^^^^^
  //               ORIGIN        DESTINATION
  //
  // originSlug = "bangladesh"  → applicant's NATIONALITY / passport country
  // destSlug   = "canada"      → country to VISIT
  const { originSlug, destSlug } = parseSlug(slug);

  const visaData = await getCountries();

  // originData = Bangladesh  (passport holder — LEFT of "-to-" in URL)
  // destData   = Canada      (country to VISIT — RIGHT of "-to-" in URL)
  const originData      = visaData.find(c => createSlug(c.country) === originSlug);
  const destinationData = visaData.find(c => createSlug(c.country) === destSlug);

  if (!destinationData || !originData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-10 text-center">
        <div className="text-6xl mb-6">🌍</div>
        <h1 className="text-3xl font-black text-slate-900 mb-4">Visa Guide Not Found</h1>
        <p className="text-slate-500 mb-8 max-w-md">
          We couldn&apos;t find a visa guide for this route. The countries may be misspelled or the route is not yet supported.
        </p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/visa" className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all">← Back to Visa Guide</Link>
          <Link href="/visa/tourist-visa"    className="px-8 py-4 bg-slate-100 text-slate-700 rounded-2xl font-black hover:bg-slate-200 transition-all">Tourist Visa</Link>
        </div>
      </div>
    );
  }

  // originName = "Bangladesh"  — the applicant's NATIONALITY / passport country
  // destName   = "Canada"      — the country the person wants to VISIT
  const originName = originData.country;
  const destName   = destinationData.country;

  // DB slug: "bangladesh/to/canada" (origin FIRST, then destination)
  const guideData = await getTouristVisaGuide(originName, destName);

  // Check if DB data is available
  const hasDbData = !!guideData;

  // Fallback merge — all static data if DB has no entry
  const documents        = getDocuments(destName, originName);
  const staticFAQs       = getStaticFAQs(destName, originName);

  const heroStats        = guideData?.heroStats        || {};
  const quickStats       = guideData?.quickStats       || {};
  const processingSteps  = guideData?.processingSteps?.length  ? guideData.processingSteps  : STATIC_PROCESS_STEPS;
  const rejectionReasons = guideData?.rejectionReasons?.length ? guideData.rejectionReasons : STATIC_REJECTION_REASONS;
  const expertTips       = guideData?.expertTips?.length       ? guideData.expertTips       : STATIC_EXPERT_TIPS;
  const faqs             = guideData?.faqs?.length             ? guideData.faqs             : staticFAQs;

  const whatsappNumber = guideData?.whatsappNumber || '8801631312524';
  // WhatsApp message: "I (Bangladesh citizen) want help for Canada visa"
  const whatsappMsg = encodeURIComponent(
    `Hello, I am a ${originName} citizen and need help applying for a ${destName} visa. I reviewed the guide on Eammu Holidays.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  // Related routes: other destinations for the SAME origin nationality
  // URL pattern: /visa/[originSlug]-to-[destSlug]
  const relatedDests = visaData
    .filter(c => createSlug(c.country) !== destSlug && createSlug(c.country) !== originSlug)
    .slice(0, 6);

  // ── JSON-LD STRUCTURED DATA ───────────────────────────────────────────────
  // All text: "[destName] Visa for [originName] Citizens"
  // e.g.      "Canada Visa for Bangladesh Citizens"
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${destName} Visa for ${originName} Citizens 2026 — Requirements, Fees & Documents`,
      description: `Complete ${destName} visa guide for ${originName} passport holders with documents checklist, fees, and expert tips.`,
      author:    { '@type': 'Organization', name: 'Eammu Holidays', url: 'https://www.eammu.com' },
      publisher: {
        '@type': 'Organization',
        name: 'Eammu Holidays',
        url: 'https://www.eammu.com',
        logo: { '@type': 'ImageObject', url: 'https://www.eammu.com/logo.png' },
      },
      dateModified:    new Date().toISOString().split('T')[0],
      datePublished:   '2026-01-01',
      mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.eammu.com/visa/${slug}` },
      image: destinationData?.flag,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://www.eammu.com' },
        { '@type': 'ListItem', position: 2, name: 'Tourist Visa', item: 'https://www.eammu.com/tourist-visa' },
        { '@type': 'ListItem', position: 3, name: 'Visa Guide',   item: 'https://www.eammu.com/visa' },
        { '@type': 'ListItem', position: 4, name: `${destName} Visa for ${originName} Citizens`, item: `https://www.eammu.com/visa/${slug}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.question || f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.answer || f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      // "Canada Visa Consultation for Bangladesh Citizens"
      name:        `${destName} Visa Consultation for ${originName} Citizens`,
      description: `Expert visa consultation service for ${originName} nationals applying for a ${destName} visa. 98% approval rate.`,
      provider:    { '@type': 'Organization', name: 'Eammu Holidays', url: 'https://www.eammu.com' },
      areaServed:  originName,
      serviceType: 'Visa Consultation',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc] pb-24 font-sans antialiased text-slate-900">

      {/* ── STRUCTURED DATA ── */}
      {structuredData.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ── DATA STATUS BANNER (shown when no DB data available) ── */}
      {!hasDbData && (
        <div className="w-full bg-amber-50 border-b border-amber-200">
          <div className="max-w-6xl mx-auto px-5 py-3 flex items-center gap-3">
            <span className="text-amber-500 text-lg shrink-0">🔄</span>
            <p className="text-amber-800 text-xs font-semibold leading-relaxed">
              <strong>Our team is working on updating the dedicated {destName} visa data for {originName} citizens.</strong>{' '}
              The guide below is based on our standard verified requirements — contact us via WhatsApp for the most specific, up-to-date information for your route.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto shrink-0 px-4 py-1.5 bg-green-600 text-white text-xs font-black rounded-full hover:bg-green-500 transition-all whitespace-nowrap"
            >
              Ask Expert →
            </a>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <div className="relative bg-gradient-to-br from-[#02c7e0] via-[#0ea5d0] to-[#0284c7] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[300px] h-[300px] bg-indigo-600/20 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-6xl mx-auto px-5 py-16 md:py-20 relative z-10">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/60 text-xs font-semibold mb-8 flex-wrap">
            <Link href="/"                className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/visa/tourist-visa"    className="hover:text-white transition-colors">Tourist Visa</Link>
            <span>/</span>
            <Link href="/visa" className="hover:text-white transition-colors">Visa Guide</Link>
            <span>/</span>
            {/* "Canada Visa for Bangladesh Citizens" */}
            <span className="text-white">{destName} Visa for {originName} Citizens</span>
          </nav>

          {/* Badge: origin flag → dest flag */}
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
            {/* originData.flag = Bangladesh flag (LEFT = nationality) */}
            <img src={originData.flag}      className="w-6 h-4 object-cover rounded-sm shadow" alt={`${originName} flag`} />
            <span className="text-white text-[10px] font-black uppercase tracking-widest">Official Protocol · Eammu Holidays 2026</span>
            {/* destinationData.flag = Canada flag (RIGHT = destination) */}
            <img src={destinationData.flag} className="w-6 h-4 object-cover rounded-sm shadow" alt={`${destName} flag`} />
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              {/*
                H1: "Canada Visa for Bangladesh Citizens 2026"
                destName   = Canada      (VISITING)
                originName = Bangladesh  (NATIONALITY)
              */}
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                {destName} Visa
                <br />
                <span className="text-white/80 font-light text-2xl md:text-3xl">
                  for {originName} Citizens 2026
                </span>
              </h1>
              <p className="text-white/80 text-base leading-relaxed mb-6 max-w-lg">
                {guideData?.introduction?.overview ||
                  `Complete ${destName} visa requirements for ${originName} passport holders — embassy-verified documents, fees, photo specs, and processing timeline for 2026.`}
              </p>
              <div className="flex flex-wrap gap-2">
                {['Embassy Verified', '2026 Updated', 'Expert Reviewed', '98% Success Rate'].map(b => (
                  <span key={b} className="px-3 py-1.5 bg-white/15 border border-white/20 rounded-full text-[10px] font-black text-white uppercase tracking-wider">
                    {b}
                  </span>
                ))}
                {!hasDbData && (
                  <span className="px-3 py-1.5 bg-amber-400/30 border border-amber-300/40 rounded-full text-[10px] font-black text-amber-100 uppercase tracking-wider">
                    🔄 Data Update Pending
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Processing Time', value: quickStats.processingTime || heroStats.processingTime || '10–21 Days',      sub: 'Business days',   icon: '⏱️' },
                { label: 'Visa Type',       value: quickStats.visaType       || heroStats.visaType       || 'Sticker + eVisa',  sub: 'Available',       icon: '🪪' },
                { label: 'Entry Type',      value: quickStats.entryType      || heroStats.entryType      || 'Single / Multi',   sub: 'Embassy decides', icon: '🛂' },
                { label: 'Success Rate',    value: quickStats.successRate    || '98%',                    sub: 'With Eammu',    icon: '📈' },
              ].map((s, i) => (
                <div key={i} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-4">
                  <div className="text-xl mb-1">{s.icon}</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-white/50 mb-1">{s.label}</div>
                  <div className="text-lg font-black text-white">{s.value}</div>
                  <div className="text-[10px] text-white/50 font-medium">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-6xl mx-auto px-5 -mt-8 relative z-20">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* ────────────── LEFT COLUMN ────────────── */}
          <div className="lg:col-span-8 space-y-8">

            {/* QUICK STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Validity',    value: quickStats.validity       || '30–180 Days',    icon: '📅' },
                { label: 'Entry',       value: quickStats.entryType      || 'Single / Multi', icon: '🛂' },
                { label: 'Processing',  value: quickStats.processingTime || '10–21 Days',     icon: '⚡' },
                { label: 'Embassy Fee', value: quickStats.embassyFee     || 'Check Below',    icon: '💰' },
              ].map((s, i) => (
                <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 text-center hover:-translate-y-1 transition-transform">
                  <div className="text-2xl mb-2">{s.icon}</div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{s.label}</p>
                  <p className="text-sm font-black text-slate-800">{s.value}</p>
                </div>
              ))}
            </div>

            {/* INTRODUCTION */}
            {/* H2: "Canada Visa for Bangladesh Citizens — What You Need to Know" */}
            <section id="introduction" className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full" />
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {destName} Visa for {originName} Citizens — What You Need to Know
                </h2>
              </div>
              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>
                  {guideData?.introduction?.overview ||
                    `The ${destName} visa for ${originName} citizens requires submitting a comprehensive dossier to the ${destName} Embassy or designated Visa Application Centre (VFS Global / BLS International). Every document must be in order — missing even one item results in outright rejection without a refund of fees.`}
                </p>
                <p>
                  {guideData?.introduction?.processingNote ||
                    `${destName} visa processing for ${originName} passport holders typically takes 10–21 business days. During peak seasons (summer and year-end holidays), this can extend to 30–45 days. Apply at least 6–8 weeks before your intended travel date.`}
                </p>
                <p>
                  {guideData?.introduction?.rejectionNote ||
                    `The most common rejection reason for ${originName} applicants is insufficient financial documentation combined with a weak cover letter that fails to demonstrate strong ties to ${originName}. Our guides address both in detail.`}
                </p>
                {!hasDbData && (
                  <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3">
                    <span className="text-amber-500 text-xl shrink-0">⚙️</span>
                    <div>
                      <p className="text-amber-800 text-xs font-bold leading-relaxed">
                        <strong>Our team is actively working on dedicated {destName} visa data for {originName} citizens.</strong>{' '}
                        The information shown here reflects our standard embassy-verified requirements. For route-specific details, please contact our experts via WhatsApp.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* DOCUMENTS CHECKLIST */}
            {/* H2: "Canada Visa Documents Checklist for Bangladesh Citizens" */}
            <section id="documents" className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 md:p-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  {destName} Visa Documents Checklist for {originName} Citizens
                </h2>
              </div>
              <p className="text-slate-500 text-sm mb-8 ml-4">
                All items below are required for {originName} citizens applying for a {destName} visa.
                Missing even one document causes rejection without a refund.
              </p>

              {guideData?.documents?.length ? (
                <div className="space-y-3">
                  {guideData.documents.map((doc, i) => (
                    <div key={i} className="flex gap-4 p-5 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all">
                      <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-black text-slate-800 text-sm">{doc.title || doc.name || doc}</h4>
                          <span className="text-[8px] font-black bg-red-100 text-red-700 px-2 py-0.5 rounded-full uppercase shrink-0">Required</span>
                        </div>
                        {doc.desc && <p className="text-slate-500 text-xs leading-relaxed mt-1">{doc.desc}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : guideData?.documents && typeof guideData.documents === 'object' && !Array.isArray(guideData.documents) ? (
                // DB data has categorized documents object
                <>
                  {guideData.documents.identity?.length > 0 && (
                    <DocCategory number="01" title="Travel Identity"     color="blue"   docs={guideData.documents.identity} />
                  )}
                  {guideData.documents.financial?.length > 0 && (
                    <DocCategory number="02" title="Financial Standing"  color="green"  docs={guideData.documents.financial}    note="Financial documents are the #1 rejection reason — bank stamps are required on every single page." />
                  )}
                  {guideData.documents.professional?.length > 0 && (
                    <DocCategory number="03" title="Professional Status" color="purple" docs={guideData.documents.professional} />
                  )}
                  {guideData.documents.travel?.length > 0 && (
                    <DocCategory number="04" title="Travel Planning"     color="amber"  docs={guideData.documents.travel}       note="Itinerary, hotel bookings, and flights must have consistent, matching dates throughout." />
                  )}
                </>
              ) : (
                // Static fallback
                <>
                  <DocCategory number="01" title="Travel Identity"     color="blue"   docs={documents.identity} />
                  <DocCategory number="02" title="Financial Standing"  color="green"  docs={documents.financial}    note="Financial documents are the #1 rejection reason — bank stamps are required on every single page." />
                  <DocCategory number="03" title="Professional Status" color="purple" docs={documents.professional} />
                  <DocCategory number="04" title="Travel Planning"     color="amber"  docs={documents.travel}       note="Itinerary, hotel bookings, and flights must have consistent, matching dates throughout." />
                </>
              )}
            </section>

            {/* STEP-BY-STEP PROCESS */}
            {/* H2: "How to Apply for a Canada Visa from Bangladesh — Step by Step" */}
            <section id="process" className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-gradient-to-b from-indigo-500 to-blue-500 rounded-full" />
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  How to Apply for a {destName} Visa from {originName} — Step by Step
                </h2>
              </div>
              <div className="space-y-4">
                {processingSteps.map((step, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 border-2 border-slate-100 group-hover:bg-blue-600 group-hover:border-blue-600 flex items-center justify-center text-xl transition-all shrink-0">
                        {step.icon || `0${i + 1}`}
                      </div>
                      {i < processingSteps.length - 1 && (
                        <div className="w-0.5 flex-1 bg-gradient-to-b from-slate-200 to-transparent mt-2" />
                      )}
                    </div>
                    <div className="pb-6 flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest">
                          Step {step.num || (i + 1)}
                        </span>
                        {step.time && (
                          <span className="text-[9px] font-black text-slate-400 bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full">
                            ⏱ {step.time}
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-black text-slate-800 mb-1">{step.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{step.body || step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* REJECTION REASONS */}
            {/* H2: "Why Canada Visa Applications Get Rejected — Bangladesh Applicants" */}
            <section id="rejection-reasons" className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 md:p-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-1 h-8 bg-gradient-to-b from-red-500 to-rose-500 rounded-full" />
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Why {destName} Visa Applications Get Rejected — {originName} Applicants
                </h2>
              </div>
              <p className="text-slate-500 text-sm mb-8 ml-4">
                Understanding these common mistakes helps you prepare a flawless {destName} visa application from {originName}.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {rejectionReasons.map((r, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-red-50 border border-red-100 rounded-2xl">
                    <span className="text-2xl shrink-0">{r.icon || '⚠️'}</span>
                    <div>
                      <h4 className="font-black text-red-900 text-sm mb-1">{r.title || r.reason}</h4>
                      <p className="text-xs text-red-700/80 leading-relaxed">{r.desc || r.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* EXPERT TIPS */}
            {/* H2: "Expert Tips — Canada Visa for Bangladesh Citizens" */}
            <section id="expert-tips" className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 md:p-10 text-white">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl">💡</span>
                <div>
                  <h2 className="text-2xl font-black tracking-tight">
                    Expert Tips — {destName} Visa for {originName} Citizens
                  </h2>
                  <p className="text-blue-200 text-sm mt-1">
                    Proven strategies from our visa consultants that significantly increase approval chances
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {expertTips.map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-white/10 rounded-2xl border border-white/10">
                    <span className="w-6 h-6 bg-amber-400 text-slate-900 rounded-lg flex items-center justify-center font-black text-xs shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-white/90 leading-relaxed">
                      {typeof tip === 'string' ? tip : tip.tip || tip.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            {/* H2: "Canada Visa FAQ for Bangladesh Citizens 2026" */}
            <section id="faq" className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1 h-8 bg-gradient-to-b from-amber-400 to-orange-500 rounded-full" />
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    {destName} Visa FAQ for {originName} Citizens 2026
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">
                    Answers to the most common questions from {originName} applicants applying to visit {destName}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                {faqs.map((f, i) => (
                  <FAQItem
                    key={i}
                    question={f.question || f.q}
                    answer={f.answer || f.a}
                  />
                ))}
              </div>
            </section>

            {/* SEO LONG-FORM ARTICLE */}
            {/* H2: "Complete Canada Visa Guide for Bangladesh Nationals — 2026" */}
            <section id="complete-guide" className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-slate-400 to-slate-600 rounded-full" />
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Complete {destName} Visa Guide for {originName} Nationals — 2026
                </h2>
              </div>
              <div className="space-y-6 text-sm text-slate-600 leading-relaxed">

                <p>
                  The <strong>{destName} visa for {originName} citizens</strong> is one of the most sought-after
                  travel documents, requiring careful preparation and a strong application. Financial documentation
                  is the most critical component — embassy officers assess whether your bank balance and income are
                  consistent and sufficient to support your trip to {destName} without needing to work abroad.
                </p>

                {/* H3: "Canada Visa Fees for Bangladesh Citizens 2026" */}
                <div>
                  <h3 className="text-lg font-black text-slate-800 mb-2">
                    {destName} Visa Fees for {originName} Citizens 2026
                  </h3>
                  <p>
                    {guideData?.seoContent?.feeSection ||
                      `Embassy fees for a ${destName} visa are typically non-refundable regardless of the outcome. Additional VFS Global or BLS International service charges apply on top of the embassy fee. Our consultants provide a precise, up-to-date fee breakdown during your free consultation.`}
                  </p>
                </div>

                {/* H3: "Bank Statement Requirements for Canada Visa" */}
                <div>
                  <h3 className="text-lg font-black text-slate-800 mb-2">
                    Bank Statement Requirements for {destName} Visa — {originName} Applicants
                  </h3>
                  <p>
                    {guideData?.seoContent?.bankStatementSection ||
                      `Embassy officers review ${originName} applicants' bank statements for: a minimum balance that comfortably covers daily living expenses in ${destName}, a consistent 6-month transaction history (not a dormant account), official branch stamps on every page, and the account holder name matching the passport exactly. As a general guideline, USD 3,000–5,000 equivalent for a 2-week trip to ${destName} is typically considered sufficient.`}
                  </p>
                </div>

                {/* H3: "Cover Letter for Canada Visa — Bangladesh Citizens" */}
                <div>
                  <h3 className="text-lg font-black text-slate-800 mb-2">
                    Cover Letter for {destName} Visa — {originName} Citizens
                  </h3>
                  <p>
                    A strong cover letter is essential for {originName} nationals applying to visit {destName}.
                    It must address: your full name and passport details, exact travel dates, purpose of visit,
                    financial capacity, accommodation plan in {destName}, and — critically — a dedicated section
                    demonstrating your strong ties to {originName} (employment, property, family) that guarantee
                    your return home.
                  </p>
                </div>

                {/* H3: "2026 Updates — Canada Embassy Requirements" */}
                <div>
                  <h3 className="text-lg font-black text-slate-800 mb-2">
                    2026 Updates — {destName} Embassy Requirements for {originName} Citizens
                  </h3>
                  <p>
                    {guideData?.seoContent?.updatesSection ||
                      `In 2026, the ${destName} embassy strictly enforces the 47×36mm photo format with a pure white background. Handwritten application forms are no longer accepted — typed digital forms with QR code verification are now mandatory. Our team monitors ${destName} embassy circulars and VFS Global announcements to ensure every guide reflects current protocols.`}
                  </p>
                </div>

                {/* Internal SEO links */}
                <div className="mt-6 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
                    Related Visa Guides for {originName} Citizens
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Link href="/visa/tourist-visa"
                      className="text-xs font-bold text-blue-600 bg-white border border-blue-100 px-3 py-1.5 rounded-full hover:bg-blue-50 transition">
                      Tourist Visa Guide →
                    </Link>
                    <Link href="/visa/student-visa"
                      className="text-xs font-bold text-purple-600 bg-white border border-purple-100 px-3 py-1.5 rounded-full hover:bg-purple-50 transition">
                      Student Visa →
                    </Link>
                    <Link href="/scholarship"
                      className="text-xs font-bold text-rose-600 bg-white border border-rose-100 px-3 py-1.5 rounded-full hover:bg-rose-50 transition">
                      Scholarships →
                    </Link>
                    <Link href="/visa"
                      className="text-xs font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-full hover:bg-slate-50 transition">
                      All Visa Guides →
                    </Link>
                    {/* Other destinations for the same nationality */}
                    {/* URL: /visa/[originSlug]-to-[destSlug] */}
                    {relatedDests.slice(0, 4).map(c => (
                      <Link
                        key={c.code}
                        href={`/visa/${originSlug}-to-${createSlug(c.country)}`}
                        className="text-xs font-bold text-green-600 bg-white border border-green-100 px-3 py-1.5 rounded-full hover:bg-green-50 transition"
                      >
                        {c.country} Visa for {originName} →
                      </Link>
                    ))}
                    {/* Reverse direction — for citizens of destName going to originName */}
                    <Link
                      href={`/visa/${destSlug}-to-${originSlug}`}
                      className="text-xs font-bold text-amber-600 bg-white border border-amber-100 px-3 py-1.5 rounded-full hover:bg-amber-50 transition"
                    >
                      {originName} Visa for {destName} Citizens →
                    </Link>
                  </div>
                </div>

              </div>
            </section>

          </div>{/* /LEFT COLUMN */}

          {/* ────────────── SIDEBAR ────────────── */}
          <div className="lg:col-span-4 space-y-6">

            {/* STICKY CTA */}
            <div className="bg-slate-900 rounded-[2rem] p-7 text-white sticky top-6 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-500/20 border border-green-500/30 rounded-2xl flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.13 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <div>
                    {/* "Apply for Canada Visa" */}
                    <h3 className="text-lg font-black">Apply for {destName} Visa</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Free Expert Consultation</p>
                  </div>
                </div>

                {/* Route display: Bangladesh → Canada */}
                <div className="flex items-center gap-2 mb-5 p-3 bg-white/5 border border-white/10 rounded-2xl">
                  <img src={originData.flag}      className="w-7 h-5 object-cover rounded shadow-sm shrink-0" alt={originName} />
                  <span className="text-white/60 text-xs font-bold">{originName}</span>
                  <span className="text-white/40 text-sm">→</span>
                  <img src={destinationData.flag} className="w-7 h-5 object-cover rounded shadow-sm shrink-0" alt={destName} />
                  <span className="text-white text-xs font-black">{destName}</span>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    { icon: '⏱️', label: 'Processing Time', val: quickStats.processingTime || '10–21 Business Days' },
                    { icon: '🏛️', label: 'Submission',      val: 'Embassy / VFS Global' },
                    { icon: '📈', label: 'Success Rate',    val: '98% Approval' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl">
                      <span className="text-xl">{s.icon}</span>
                      <div>
                        <div className="text-[9px] font-black text-blue-400 uppercase tracking-widest">{s.label}</div>
                        <div className="text-base font-black">{s.val}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {!hasDbData && (
                  <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                    <p className="text-amber-300 text-[10px] font-bold leading-relaxed">
                      ⚙️ Our team is updating dedicated data for this route. Contact us for the most accurate details.
                    </p>
                  </div>
                )}

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-5 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-black transition-all shadow-xl shadow-green-900/30 active:scale-95 group mb-3"
                  aria-label={`Apply for ${destName} visa as a ${originName} citizen via WhatsApp`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                  <span>Apply via WhatsApp</span>
                  <svg className="group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </a>
                <p className="text-[9px] text-center text-slate-500 font-bold">FREE CONSULTATION · NO UPFRONT FEES · 24/7 TEAM</p>
              </div>
            </div>

            {/* WHAT EAMMU PROVIDES */}
            <div className="bg-white border border-slate-100 rounded-[2rem] p-7 shadow-sm">
              <h4 className="font-black text-slate-900 mb-5 text-lg">What Eammu Provides</h4>
              <div className="space-y-3">
                {[
                  'Complete document verification',
                  'Cover letter drafting',
                  'Correct photo formatting',
                  'Embassy fee guidance',
                  'Appointment booking help',
                  'Application tracking support',
                  'Refusal case resubmission',
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RELATED GUIDES SIDEBAR */}
            {/* Links: other DESTINATIONS for the same ORIGIN nationality */}
            {/* URL pattern: /visa/[originSlug]-to-[destCountrySlug] */}
            <div className="bg-white border border-slate-100 rounded-[2rem] p-7 shadow-sm">
              <h4 className="font-black text-slate-900 mb-1">
                More Visa Guides for {originName} Citizens
              </h4>
              <p className="text-[10px] text-slate-400 font-semibold mb-4">
                Other destinations you can apply to visit
              </p>
              <div className="space-y-2">
                {relatedDests.map(c => (
                  <Link
                    key={c.code}
                    // URL: /visa/[originSlug]-to-[destCountrySlug]
                    // e.g. /visa/bangladesh-to-uk
                    href={`/visa/${originSlug}-to-${createSlug(c.country)}`}
                    title={`${c.country} visa for ${originName} citizens`}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all group"
                  >
                    <img src={c.flag} className="w-8 h-5 object-cover rounded shadow-sm" alt={`${c.country} flag`} />
                    <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors flex-1">
                      {c.country} Visa for {originName}
                    </span>
                    <svg className="text-slate-300 group-hover:text-blue-400 shrink-0" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </Link>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                <Link href="/visa/tourist-visa"               className="flex items-center gap-2 text-sm font-bold text-green-600 hover:text-green-700 transition">🏖️ Tourist Visa Directory</Link>
                <Link href="/visa/student-visa"  className="flex items-center gap-2 text-sm font-bold text-purple-600 hover:text-purple-700 transition">🎓 Student Visa Guides</Link>
                <Link href="/scholarship"                className="flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-700 transition">🏆 Scholarship Finder</Link>
              </div>
            </div>

          </div>{/* /SIDEBAR */}

        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="max-w-6xl mx-auto px-5 mt-16">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2rem] p-10 md:p-14 text-center overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[60px]" />
          <div className="relative z-10">
            {/* Flags: origin (Bangladesh) → dest (Canada) */}
            <div className="flex justify-center items-center gap-3 mb-6">
              <img src={originData.flag}      className="w-10 h-6 object-cover rounded shadow-md" alt={`${originName} flag`} />
              <span className="text-white text-2xl">✈️</span>
              <img src={destinationData.flag} className="w-10 h-6 object-cover rounded shadow-md" alt={`${destName} flag`} />
            </div>
            {/* "Ready to Apply for Your Canada Visa?" */}
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
              Ready to Apply for Your {destName} Visa?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto mb-8 leading-relaxed">
              Skip the confusion. Let our expert consultants prepare your complete {destName} visa application
              for {originName} citizens — correctly, on time, with a 98% success rate.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-green-600 hover:bg-green-500 text-white rounded-2xl font-black transition-all shadow-xl shadow-green-900/30 active:scale-95"
                aria-label={`Apply for ${destName} visa as a ${originName} citizen via WhatsApp`}
              >
                Apply via WhatsApp
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </a>
              <Link
                href="/visa"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 border-2 border-white/20 text-white rounded-2xl font-black hover:bg-white/10 transition-all"
              >
                Search Another Country
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function DocCategory({ number, title, color, docs, note }) {
  const colorMap = {
    blue:   { label: 'text-blue-600',   badge: 'bg-blue-50 border-blue-100',     dot: 'bg-blue-500'   },
    green:  { label: 'text-green-600',  badge: 'bg-green-50 border-green-100',   dot: 'bg-green-500'  },
    purple: { label: 'text-purple-600', badge: 'bg-purple-50 border-purple-100', dot: 'bg-purple-500' },
    amber:  { label: 'text-amber-700',  badge: 'bg-amber-50 border-amber-100',   dot: 'bg-amber-500'  },
  };
  const c = colorMap[color];
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-2 h-2 rounded-full ${c.dot}`} />
        <h3 className={`text-xs font-black uppercase tracking-[0.2em] ${c.label}`}>{number}. {title}</h3>
      </div>
      {note && (
        <div className={`flex items-start gap-2 p-3 rounded-xl border mb-4 ${c.badge}`}>
          <span className="text-base">⚠️</span>
          <p className={`text-xs font-bold ${c.label} leading-relaxed`}>{note}</p>
        </div>
      )}
      <div className="space-y-2">
        {docs.map((doc, i) => (
          <div key={i} className="flex gap-4 p-5 rounded-2xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all">
            <div className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-black text-slate-800 text-sm">{doc.title}</h4>
                <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${doc.required ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-500'}`}>
                  {doc.required ? 'Required' : 'Conditional'}
                </span>
              </div>
              <p className="text-slate-500 text-xs leading-relaxed mt-1">{doc.desc}</p>
              {doc.note && <p className="text-amber-700 text-[10px] font-bold mt-1.5">📌 {doc.note}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQItem({ question, answer }) {
  return (
    <div className="border-2 border-slate-100 rounded-2xl overflow-hidden bg-white hover:border-slate-200 transition-all">
      <details className="group">
        <summary className="list-none w-full p-6 text-left flex items-center justify-between cursor-pointer hover:bg-slate-50/80 transition-colors select-none">
          <span className="font-bold text-slate-800 pr-4 text-sm leading-snug">{question}</span>
          <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 text-slate-500 group-open:rotate-180 group-open:bg-blue-600 group-open:text-white transition-all duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </summary>
        <div className="px-6 pb-6 text-sm text-slate-600 font-medium leading-relaxed border-t border-slate-100 pt-4 bg-slate-50/40">
          {answer}
        </div>
      </details>
    </div>
  );
}