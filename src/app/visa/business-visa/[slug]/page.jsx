// app/visa/business-visa/[slug]/page.jsx  ← SERVER COMPONENT
// Handles all SEO: generateMetadata + 4 JSON-LD schemas
// Passes resolved data as props to the client UI component

import BusinessSlugPage from "@/components/Client/BusinessVisaSlugClient/BusinessVisaSlugClient";



// ─── Constants ────────────────────────────────────────────────────────────────
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://visaexpresshub.com";

const SCHENGEN_COUNTRIES = [
  "Germany", "France", "Italy", "Spain", "Netherlands", "Belgium", "Austria",
  "Portugal", "Greece", "Sweden", "Denmark", "Finland", "Norway", "Switzerland",
  "Poland", "Czech Republic", "Hungary", "Slovakia", "Slovenia", "Croatia",
  "Estonia", "Latvia", "Lithuania", "Luxembourg", "Malta", "Iceland", "Liechtenstein",
];

// Per-destination visa data for richer SEO + UI
const DESTINATION_DATA = {
  "United States": {
    visaName: "B-1 Business Visa",
    processingTime: "3–5 weeks",
    maxStay: "Up to 6 months",
    fee: "USD 185",
    entries: "Multiple",
    notes: "Interview at US Embassy required. Strong ties to home country essential.",
    expedite: "Available (additional fee)",
    isSchengen: false,
  },
  "United Kingdom": {
    visaName: "Standard Visitor Visa",
    processingTime: "3 weeks",
    maxStay: "Up to 6 months",
    fee: "GBP 115",
    entries: "Multiple",
    notes: "Covers meetings, conferences, and site visits. No paid work permitted.",
    expedite: "Priority (5 days): GBP 500",
    isSchengen: false,
  },
  "Germany": {
    visaName: "Schengen Business Visa (Type C)",
    processingTime: "10–15 working days",
    maxStay: "90 days per 180-day period",
    fee: "EUR 80",
    entries: "Single or Multiple",
    notes: "Covers all 27 Schengen states. Apply at German embassy or VFS Global.",
    expedite: "Express: EUR 120",
    isSchengen: true,
  },
  "France": {
    visaName: "Schengen Business Visa (Type C)",
    processingTime: "10–15 working days",
    maxStay: "90 days per 180-day period",
    fee: "EUR 80",
    entries: "Single or Multiple",
    notes: "Apply via French consulate or VFS Global centre.",
    expedite: "Express available",
    isSchengen: true,
  },
  "UAE": {
    visaName: "Visit / Business Visa",
    processingTime: "3–5 working days",
    maxStay: "30 or 90 days",
    fee: "AED 300–500",
    entries: "Single or Multiple",
    notes: "Visa on arrival for many nationalities. Online e-Visa available.",
    expedite: "Urgent: 24–48 hours",
    isSchengen: false,
  },
  "Singapore": {
    visaName: "Short-Term Visit Pass (Business)",
    processingTime: "3–10 working days",
    maxStay: "30 days (extendable)",
    fee: "SGD 30",
    entries: "Single",
    notes: "Visa-free for many nationalities. Apply via ICA website or sponsor.",
    expedite: "Generally not available",
    isSchengen: false,
  },
  "Canada": {
    visaName: "Temporary Resident Visa (TRV)",
    processingTime: "2–8 weeks",
    maxStay: "Up to 6 months",
    fee: "CAD 100",
    entries: "Single or Multiple",
    notes: "ETA available for visa-exempt nationalities. Online IRCC application.",
    expedite: "Not guaranteed",
    isSchengen: false,
  },
  "Japan": {
    visaName: "Short-Stay Business Visa",
    processingTime: "5–7 working days",
    maxStay: "90 days",
    fee: "JPY 3,000",
    entries: "Single or Multiple",
    notes: "Formal invitation letter from Japanese company required for most nationalities.",
    expedite: "Not typically available",
    isSchengen: false,
  },
};

// Fallback for destinations not in DESTINATION_DATA
const DEFAULT_DESTINATION_DATA = {
  visaName: "Business Visa",
  processingTime: "5–15 working days",
  maxStay: "30–90 days",
  fee: "Varies by country",
  entries: "Single or Multiple",
  notes: "Check official embassy website for latest requirements.",
  expedite: "May be available",
  isSchengen: false,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function cap(str) {
  if (!str || typeof str !== "string") return "";
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
}

function slugToTitle(str) {
  if (!str || typeof str !== "string") return "";
  return str.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

function getDestinationInfo(destCap) {
  return DESTINATION_DATA[destCap] || {
    ...DEFAULT_DESTINATION_DATA,
    isSchengen: SCHENGEN_COUNTRIES.includes(destCap),
    visaName: SCHENGEN_COUNTRIES.includes(destCap)
      ? "Schengen Business Visa (Type C)"
      : "Business Visa",
  };
}

// ─── generateMetadata ─────────────────────────────────────────────────────────
export async function generateMetadata({ params, searchParams }) {
  // Next.js 15: both params and searchParams are Promises
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;

  const slug = resolvedParams?.slug ?? "";
  if (!slug) return {};

  const parts = decodeURIComponent(slug).split("-to-");
  const natRaw = parts[0]?.replace(/-/g, " ") || "";
  const destRaw = parts[1]?.replace(/-/g, " ") || "";
  const natCap = cap(natRaw);
  const destCap = cap(destRaw);

  const destInfo = getDestinationInfo(destCap);
  const isSchengen = destInfo.isSchengen;

  const visaTypeName = isSchengen ? "Schengen Business Visa" : "Business Visa";

  // ── Dynamic Title (keyword-rich) ──
  const title = `${natCap} to ${destCap} Business Visa 2026 — Requirements, Documents & Fees | VisaExpressHub`;

  // ── Dynamic Description ──
  const description = `Complete ${destCap} business visa guide for ${natCap} passport holders. Processing time: ${destInfo.processingTime}. Fee: ${destInfo.fee}. Covers required documents, invitation letter, permitted activities, and step-by-step application process.${isSchengen ? ` Valid for all 27 Schengen states.` : ""}`;

  const canonicalUrl = `${BASE_URL}/visa/business-visa/${slug}`;
  const ogImage = `${BASE_URL}/og/visa/business-visa/${slug}.jpg`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title,
      description,
      siteName: "VisaExpressHub",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${natCap} to ${destCap} Business Visa Requirements 2026`,
        },
      ],
      // Article-specific OG
      publishedTime: "2026-01-01T00:00:00Z",
      modifiedTime: "2026-05-01T00:00:00Z",
      section: "Visa Guides",
      tags: [
        `${natCap} business visa`,
        `${destCap} visa`,
        `${destCap} business visa requirements`,
        visaTypeName,
        "international travel",
        "visa guide 2026",
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      site: "@visaexpresshub",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    keywords: [
      `${natCap} to ${destCap} business visa`,
      `${destCap} business visa for ${natCap} nationals`,
      `${destCap} business visa requirements 2026`,
      `${destCap} business visa documents`,
      `${destCap} business visa processing time`,
      `${destCap} business visa fee`,
      `${natCap} passport ${destCap} visa`,
      `how to apply ${destCap} business visa`,
      `${destCap} visa invitation letter`,
      isSchengen ? `schengen business visa ${natCap}` : `${destCap} short stay visa`,
    ],
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

// ─── generateStaticParams (pre-build top routes) ──────────────────────────────
export async function generateStaticParams() {
  const topRoutes = [
    { nat: "india", dest: "united-states" },
    { nat: "india", dest: "united-kingdom" },
    { nat: "india", dest: "germany" },
    { nat: "india", dest: "uae" },
    { nat: "india", dest: "singapore" },
    { nat: "india", dest: "canada" },
    { nat: "nigeria", dest: "germany" },
    { nat: "nigeria", dest: "united-kingdom" },
    { nat: "pakistan", dest: "uae" },
    { nat: "pakistan", dest: "germany" },
    { nat: "bangladesh", dest: "singapore" },
    { nat: "china", dest: "united-kingdom" },
    { nat: "brazil", dest: "france" },
    { nat: "philippines", dest: "singapore" },
  ];
  return topRoutes.map(({ nat, dest }) => ({ slug: `${nat}-to-${dest}` }));
}

// ─── Page (Server Component) ──────────────────────────────────────────────────
export default async function BusinessVisaSlugPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearch = await searchParams;

  const slug = resolvedParams?.slug ?? "";
  if (!slug) return null;

  const nFlagParam = resolvedSearch?.nFlag || "";
  const dFlagParam = resolvedSearch?.dFlag || "";

  const parts = decodeURIComponent(slug).split("-to-");
  const natRaw = parts[0]?.replace(/-/g, " ") || "";
  const destRaw = parts[1]?.replace(/-/g, " ") || "";
  const natCap = cap(natRaw);
  const destCap = cap(destRaw);

  const destInfo = getDestinationInfo(destCap);
  const isSchengen = destInfo.isSchengen;

  const nFlag = nFlagParam
    ? decodeURIComponent(nFlagParam)
    : `https://flagcdn.com/w80/${natRaw.toLowerCase().replace(/ /g, "-").slice(0, 2)}.png`;

  const dFlag = dFlagParam
    ? decodeURIComponent(dFlagParam)
    : `https://flagcdn.com/w80/${destRaw.toLowerCase().replace(/ /g, "-").slice(0, 2)}.png`;

  const canonicalUrl = `${BASE_URL}/visa/business-visa/${slug}`;

  // ── JSON-LD 1: Article (main content schema) ──────────────────────────────
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${natCap} to ${destCap} Business Visa Requirements 2026`,
    description: `Complete guide for ${natCap} passport holders applying for a ${destCap} business visa — documents, fees, processing times, and application steps.`,
    url: canonicalUrl,
    datePublished: "2026-01-01",
    dateModified: "2026-05-01",
    author: {
      "@type": "Organization",
      name: "VisaExpressHub",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "VisaExpressHub",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    keywords: [
      `${natCap} business visa`,
      `${destCap} visa requirements`,
      `${destCap} business visa 2026`,
    ],
  };

  // ── JSON-LD 2: BreadcrumbList ─────────────────────────────────────────────
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Visa Guides", item: `${BASE_URL}/visa` },
      { "@type": "ListItem", position: 3, name: "Business Visa", item: `${BASE_URL}/visa/business-visa` },
      {
        "@type": "ListItem",
        position: 4,
        name: `${natCap} → ${destCap} Business Visa`,
        item: canonicalUrl,
      },
    ],
  };

  // ── JSON-LD 3: FAQPage (boosts rich results) ──────────────────────────────
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Do ${natCap} nationals need a business visa for ${destCap}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Yes. ${natCap} passport holders travelling to ${destCap} for business purposes require a ${destInfo.visaName}. The visa covers meetings, conferences, contract signings, and supplier visits. It does not permit local employment.`,
        },
      },
      {
        "@type": "Question",
        name: `How long does it take to process a ${destCap} business visa for ${natCap} nationals?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The standard processing time for a ${destCap} business visa is ${destInfo.processingTime}. Expedited processing may be available: ${destInfo.expedite}. Apply at least 4–6 weeks before your travel date.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the ${destCap} business visa fee for ${natCap} passport holders?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The ${destCap} business visa fee is ${destInfo.fee}. This fee is non-refundable regardless of the outcome. ${destInfo.notes}`,
        },
      },
      {
        "@type": "Question",
        name: `How long can ${natCap} nationals stay in ${destCap} on a business visa?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The maximum permitted stay on a ${destCap} business visa is ${destInfo.maxStay}. ${isSchengen ? "As a Schengen visa, this allows travel across all 27 Schengen member states within the same period." : "Overstaying can result in fines, deportation, or future visa bans."}`,
        },
      },
      {
        "@type": "Question",
        name: `What documents are required for a ${destCap} business visa application?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Required documents for a ${natCap} national applying for a ${destCap} business visa include: valid passport (min. 6 months validity), formal invitation letter from the host company in ${destCap}, employer cover letter, 3–6 months bank statements, travel insurance${isSchengen ? " (min. €30,000 coverage)" : ""}, confirmed hotel booking, return flight confirmation, and a completed visa application form.`,
        },
      },
      {
        "@type": "Question",
        name: `Can ${natCap} nationals work remotely on a ${destCap} business visa?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `No. A ${destCap} business visa strictly prohibits remote work or receiving any payment from a local employer. It only permits short-term commercial activities such as meetings and conferences. Digital nomads and remote workers should apply for a dedicated digital nomad visa or work permit.`,
        },
      },
      ...(isSchengen
        ? [
            {
              "@type": "Question",
              name: `Does the ${destCap} business visa cover other Schengen countries?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `Yes. The ${destCap} business visa is a Schengen Type C visa that allows travel across all 27 Schengen member states within the validity period — up to 90 days within any 180-day window. Apply through the ${destCap} embassy if it is your primary destination.`,
              },
            },
          ]
        : []),
    ],
  };

  // ── JSON-LD 4: HowTo (application process) ────────────────────────────────
  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Apply for a ${destCap} Business Visa as a ${natCap} National`,
    description: `Step-by-step process for ${natCap} passport holders to obtain a ${destCap} business visa.`,
    totalTime: "P4W",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: isSchengen ? "EUR" : "USD",
      value: destInfo.fee,
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Confirm Permitted Activities",
        text: `Verify that your planned activities in ${destCap} — meetings, conferences, site visits — fall within business visa scope. Employment is not permitted.`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Obtain Invitation Letter",
        text: `Request a formal invitation letter from your host company in ${destCap} on official letterhead. It must state your name, job title, visit dates, and purpose.`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Prepare Your Documents",
        text: `Gather your passport, employer cover letter, bank statements (3–6 months), travel insurance, hotel booking, and return flight confirmation.`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Book Embassy Appointment",
        text: `Schedule your visa appointment at the ${destCap} embassy, consulate, or VFS Global centre. Book at least 4–6 weeks before travel.`,
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Submit Application & Provide Biometrics",
        text: `Attend your appointment with original documents. Pay the non-refundable fee of ${destInfo.fee}. Biometric data will be collected.`,
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Await Decision & Travel",
        text: `Processing takes ${destInfo.processingTime}. Once approved, verify visa dates and entry conditions before booking non-refundable travel.`,
      },
    ],
  };

  return (
    <>
      {/* All JSON-LD injected server-side — fully crawlable */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />

      <BusinessSlugPage
        slug={slug}
        natCap={natCap}
        destCap={destCap}
        nFlag={nFlag}
        dFlag={dFlag}
        destInfo={destInfo}
        isSchengen={isSchengen}
        canonicalUrl={canonicalUrl}
      />
   
    </>
  );
}