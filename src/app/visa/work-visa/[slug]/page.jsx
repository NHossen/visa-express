// app/visa/work-visa/[slug]/page.jsx  ← SERVER COMPONENT
// Handles all SEO: generateMetadata + 4 JSON-LD schemas
// Passes resolved data as props to WorkVisaSlugClient

import WorkVisaSlugClient from "@/components/Client/WorkVisaSlugClient/WorkVisaSlugClient";



// ─── Constants ────────────────────────────────────────────────────────────────
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://visaexpresshub.com";

const GULF_COUNTRIES = [
  "United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Bahrain", "Oman",
];

// Per-destination work visa data
const DESTINATION_DATA = {
  "Canada": {
    visaName: "Express Entry / LMIA Work Permit",
    processingTime: "6–12 months (Express Entry) / 2–4 months (LMIA)",
    initialValidity: "1–3 years",
    fee: "CAD 155 + CAD 100 open permit",
    sponsorship: "Employer LMIA or Express Entry CRS score",
    prPathway: "Available after 1–3 years (CEC, PNP, FSWP)",
    languageReq: "IELTS General min. 6.0 per band",
    notes: "Express Entry pool draws happen every 2 weeks. Check CRS score requirements via IRCC.",
    expedite: "Priority processing available for some streams",
    isGulf: false,
  },
  "United Kingdom": {
    visaName: "Skilled Worker Visa",
    processingTime: "3–8 weeks",
    initialValidity: "Up to 5 years",
    fee: "GBP 719–1,423 (depending on duration)",
    sponsorship: "Employer must hold active UK sponsorship licence",
    prPathway: "Available after 5 years (Indefinite Leave to Remain)",
    languageReq: "IELTS or approved English test, B1 level minimum",
    notes: "Points-based system — minimum 70 points. Check SOC code eligibility.",
    expedite: "Priority: GBP 500 (5 working days)",
    isGulf: false,
  },
  "United Arab Emirates": {
    visaName: "UAE Employment Visa",
    processingTime: "2–4 weeks",
    initialValidity: "2–3 years",
    fee: "AED 300–1,500 (employer typically covers)",
    sponsorship: "Employer sponsorship (kafala system)",
    prPathway: "Not available (Golden Visa for exceptional talent)",
    languageReq: "None formally required",
    notes: "Employer tied. Changing jobs requires NOC or contract completion. Tax-free income.",
    expedite: "Urgent processing: 3–5 working days",
    isGulf: true,
  },
  "Germany": {
    visaName: "EU Blue Card / Skilled Worker Visa",
    processingTime: "1–3 months",
    initialValidity: "Up to 4 years",
    fee: "EUR 75–100",
    sponsorship: "Job offer from German employer (no sponsorship licence required)",
    prPathway: "Available after 21–33 months (EU Blue Card holders faster)",
    languageReq: "German A1–B2 recommended; English roles available",
    notes: "Opportunity Card (Chancenkarte) available since 2024 for job-seekers. Credential recognition required.",
    expedite: "Express not standard — apply 3 months in advance",
    isGulf: false,
  },
  "Australia": {
    visaName: "Temporary Skill Shortage Visa (Subclass 482)",
    processingTime: "2–4 months",
    initialValidity: "2–4 years",
    fee: "AUD 3,115",
    sponsorship: "Approved sponsor employer (DAMA or standard TSS)",
    prPathway: "Available via ENS (subclass 186) after 3 years",
    languageReq: "IELTS min. 5.0 per band (stream dependent)",
    notes: "Points test via SkillSelect for PR pathways. Occupation must be on MLTSSL or STSOL.",
    expedite: "Priority processing available (additional fee)",
    isGulf: false,
  },
  "Saudi Arabia": {
    visaName: "Iqama (Residence & Work Permit)",
    processingTime: "2–6 weeks",
    initialValidity: "1–2 years (renewable)",
    fee: "SAR 2,400–9,600 per year (employer typically covers)",
    sponsorship: "Employer sponsorship required (kafala system)",
    prPathway: "Not available (Premium Residency for investors only)",
    languageReq: "Arabic beneficial; English widely used in multinationals",
    notes: "Saudisation (Nitaqat) quotas apply. Vision 2030 creating strong demand in tech, tourism, and healthcare.",
    expedite: "Subject to MOFA processing",
    isGulf: true,
  },
  "Qatar": {
    visaName: "Work Permit (QID / Residence Permit)",
    processingTime: "2–4 weeks",
    initialValidity: "1–2 years",
    fee: "QAR 100–500 (employer typically covers)",
    sponsorship: "Employer sponsorship required",
    prPathway: "Not available",
    languageReq: "None formally required",
    notes: "High demand in construction, hospitality, healthcare, and finance. Labour reforms post-2022 improved worker mobility.",
    expedite: "3–5 working days with employer urgency request",
    isGulf: true,
  },
  "United States": {
    visaName: "H-1B / L-1 / O-1 Visa",
    processingTime: "3–6 months (H-1B lottery in April)",
    initialValidity: "3 years (H-1B) / 1–3 years (L-1)",
    fee: "USD 460–4,000+ (employer typically pays most)",
    sponsorship: "Employer petitions USCIS on your behalf",
    prPathway: "Available via EB-1, EB-2, EB-3 green card categories",
    languageReq: "No formal test; English proficiency expected",
    notes: "H-1B subject to annual cap (65,000 + 20,000 advanced degree). STEM roles prioritised.",
    expedite: "Premium processing: USD 2,805 (15 business days)",
    isGulf: false,
  },
};

const DEFAULT_DESTINATION_DATA = {
  visaName: "Employer-Sponsored Work Visa",
  processingTime: "4–12 weeks",
  initialValidity: "1–3 years",
  fee: "Varies by country",
  sponsorship: "Employer sponsorship required",
  prPathway: "Check local immigration authority",
  languageReq: "Varies by destination",
  notes: "Verify latest requirements at the official immigration authority of your destination.",
  expedite: "May be available",
  isGulf: false,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function cap(str) {
  if (!str || typeof str !== "string") return "";
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
}

function getDestinationInfo(destCap) {
  return DESTINATION_DATA[destCap] || {
    ...DEFAULT_DESTINATION_DATA,
    isGulf: GULF_COUNTRIES.includes(destCap),
  };
}

// ─── generateMetadata ─────────────────────────────────────────────────────────
export async function generateMetadata({ params, searchParams }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug ?? "";
  if (!slug) return {};

  const parts = decodeURIComponent(slug).split("-to-");
  const natCap = cap(parts[0]?.replace(/-/g, " ") || "");
  const destCap = cap(parts[1]?.replace(/-/g, " ") || "");

  const destInfo = getDestinationInfo(destCap);
  const isGulf = destInfo.isGulf;

  const title = `${natCap} to ${destCap} Work Visa 2026 — Requirements, Sponsorship & Processing | VisaExpressHub`;

  const description = `Complete ${destCap} work visa guide for ${natCap} nationals. Visa: ${destInfo.visaName}. Processing: ${destInfo.processingTime}. Fee: ${destInfo.fee}. Covers employer sponsorship, required documents, credential recognition, and step-by-step application.${isGulf ? ` Kafala system and NOC requirements explained.` : ` PR pathway: ${destInfo.prPathway}.`}`;

  const canonicalUrl = `${BASE_URL}/visa/work-visa/${slug}`;
  const ogImage = `${BASE_URL}/og/visa/work-visa/${slug}.jpg`;

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
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${natCap} to ${destCap} Work Visa Requirements 2026` }],
      publishedTime: "2026-01-01T00:00:00Z",
      modifiedTime: "2026-05-01T00:00:00Z",
      section: "Visa Guides",
      tags: [
        `${natCap} work visa ${destCap}`,
        `${destCap} work permit ${natCap}`,
        `${destInfo.visaName}`,
        "work abroad 2026",
        "employer sponsorship",
        "international work permit",
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
      `${natCap} work visa ${destCap} 2026`,
      `${destCap} work permit for ${natCap} nationals`,
      `${destInfo.visaName} requirements`,
      `how to get work visa in ${destCap}`,
      `${natCap} passport work abroad ${destCap}`,
      `${destCap} employer sponsorship ${natCap}`,
      `${destCap} work visa documents`,
      `${destCap} work visa processing time`,
      `${destCap} work visa fee`,
      isGulf ? `kafala system ${destCap}` : `${destCap} skilled worker visa`,
    ],
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

// ─── generateStaticParams ─────────────────────────────────────────────────────
export async function generateStaticParams() {
  const topRoutes = [
    { nat: "india", dest: "canada" },
    { nat: "india", dest: "united-kingdom" },
    { nat: "india", dest: "united-arab-emirates" },
    { nat: "india", dest: "germany" },
    { nat: "india", dest: "australia" },
    { nat: "india", dest: "united-states" },
    { nat: "philippines", dest: "united-arab-emirates" },
    { nat: "philippines", dest: "saudi-arabia" },
    { nat: "philippines", dest: "qatar" },
    { nat: "nigeria", dest: "united-kingdom" },
    { nat: "nigeria", dest: "canada" },
    { nat: "pakistan", dest: "saudi-arabia" },
    { nat: "pakistan", dest: "united-arab-emirates" },
    { nat: "bangladesh", dest: "qatar" },
    { nat: "mexico", dest: "united-states" },
    { nat: "kenya", dest: "united-kingdom" },
  ];
  return topRoutes.map(({ nat, dest }) => ({ slug: `${nat}-to-${dest}` }));
}

// ─── Page (Server Component) ──────────────────────────────────────────────────
export default async function WorkVisaSlugPage({ params, searchParams }) {
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
  const isGulf = destInfo.isGulf;

  const nFlag = nFlagParam
    ? decodeURIComponent(nFlagParam)
    : `https://flagcdn.com/w80/${natRaw.toLowerCase().replace(/ /g, "-").slice(0, 2)}.png`;

  const dFlag = dFlagParam
    ? decodeURIComponent(dFlagParam)
    : `https://flagcdn.com/w80/${destRaw.toLowerCase().replace(/ /g, "-").slice(0, 2)}.png`;

  const canonicalUrl = `${BASE_URL}/visa/work-visa/${slug}`;

  // ── JSON-LD 1: Article ────────────────────────────────────────────────────
  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${natCap} to ${destCap} Work Visa Requirements 2026`,
    description: `Complete ${destCap} work visa guide for ${natCap} passport holders — sponsorship, documents, fees, processing time, and application steps.`,
    url: canonicalUrl,
    datePublished: "2026-01-01",
    dateModified: "2026-05-01",
    author: { "@type": "Organization", name: "VisaExpressHub", url: BASE_URL },
    publisher: {
      "@type": "Organization",
      name: "VisaExpressHub",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
    keywords: [
      `${natCap} work visa ${destCap}`,
      `${destCap} work permit`,
      `${destInfo.visaName}`,
    ],
  };

  // ── JSON-LD 2: BreadcrumbList ─────────────────────────────────────────────
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Visa Guides", item: `${BASE_URL}/visa` },
      { "@type": "ListItem", position: 3, name: "Work Visa", item: `${BASE_URL}/visa/work-visa` },
      {
        "@type": "ListItem",
        position: 4,
        name: `${natCap} → ${destCap} Work Visa`,
        item: canonicalUrl,
      },
    ],
  };

  // ── JSON-LD 3: FAQPage ────────────────────────────────────────────────────
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How can ${natCap} nationals get a work visa for ${destCap}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${natCap} nationals can work in ${destCap} by obtaining the ${destInfo.visaName}. The primary route is employer sponsorship — a ${destCap} employer with an active sponsorship licence issues a formal job offer, then jointly applies for your work authorisation. Processing takes ${destInfo.processingTime}.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the ${destCap} work visa fee for ${natCap} nationals?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The ${destInfo.visaName} costs ${destInfo.fee}. ${isGulf ? `In ${destCap}, the employer typically covers work permit costs.` : `Some fees may be covered by the sponsoring employer — confirm in your offer letter.`} Application fees are non-refundable.`,
        },
      },
      {
        "@type": "Question",
        name: `How long does ${destCap} work visa processing take for ${natCap} nationals?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Standard processing time for the ${destCap} ${destInfo.visaName} is ${destInfo.processingTime}. Expedited option: ${destInfo.expedite}. Apply well in advance — do not resign from your current role until you have an approved visa in hand.`,
        },
      },
      {
        "@type": "Question",
        name: `Can ${natCap} nationals get permanent residency in ${destCap} through a work visa?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: isGulf
            ? `${destCap} does not offer permanent residency through standard employment visas. ${destInfo.prPathway}. For long-term residency, check special investor or talent schemes.`
            : `Yes. ${destInfo.prPathway}. Continuous employment and maintaining visa conditions are typically required throughout the qualifying period.`,
        },
      },
      {
        "@type": "Question",
        name: `What documents do ${natCap} nationals need for a ${destCap} work visa?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Required documents for a ${natCap} national applying for the ${destCap} ${destInfo.visaName} include: valid passport (min. 12 months validity), formal job offer letter on company letterhead, employer sponsorship number or ${isGulf ? "work permit approval" : "LMIA"}, attested educational certificates, work experience letters from all previous employers, medical examination from an approved panel physician, police clearance certificate from ${natCap}, ${destInfo.languageReq !== "None formally required" ? `language test results (${destInfo.languageReq}),` : ""} and biometric data collected at a VFS Global centre.`,
        },
      },
      {
        "@type": "Question",
        name: `Can ${natCap} nationals change employers after getting a ${destCap} work visa?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: isGulf
            ? `In ${destCap}, changing employers requires a No Objection Certificate (NOC) from your current sponsor or completion of your contract. Always review your specific visa conditions before making any employer changes.`
            : `In most cases yes, but you may need to notify immigration authorities or obtain a new work permit endorsement tied to the new employer. Check your ${destInfo.visaName} conditions carefully before changing jobs.`,
        },
      },
      {
        "@type": "Question",
        name: `What language requirements do ${natCap} nationals need for a ${destCap} work visa?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: destInfo.languageReq === "None formally required"
            ? `There is no formal language test requirement for the ${destCap} work visa. However, professional-level English or local language ability is expected in most workplaces.`
            : `${natCap} nationals applying for the ${destCap} ${destInfo.visaName} must typically meet the language requirement: ${destInfo.languageReq}. Book your test well in advance as results can take 2–4 weeks.`,
        },
      },
    ],
  };

  // ── JSON-LD 4: HowTo (application process) ────────────────────────────────
  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Apply for a ${destCap} Work Visa as a ${natCap} National`,
    description: `8-step application guide for ${natCap} passport holders obtaining the ${destCap} ${destInfo.visaName}.`,
    totalTime: "P8W",
    estimatedCost: {
      "@type": "MonetaryAmount",
      value: destInfo.fee,
    },
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Eligibility & Occupation Check",
        text: `Verify your occupation is on ${destCap}'s recognised skilled occupations list and that you meet minimum experience and qualification requirements.`,
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Language Proficiency Test",
        text: `Book and complete the required language test: ${destInfo.languageReq}. Results take 2–4 weeks.`,
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Find a Sponsoring Employer",
        text: `Apply for jobs in ${destCap}. Your employer must hold an active sponsorship licence before they can legally issue your work offer.`,
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Credential Attestation & Document Gathering",
        text: `Have your ${natCap} qualifications assessed and attested. Gather experience letters, police clearance, and medical examination from an approved physician.`,
      },
      {
        "@type": "HowToStep",
        position: 5,
        name: "Submit Work Visa Application",
        text: `Submit through the official ${destCap} immigration portal. Pay the fee of ${destInfo.fee} and schedule biometrics at VFS Global.`,
      },
      {
        "@type": "HowToStep",
        position: 6,
        name: "Biometrics, Medical & Background Checks",
        text: "Attend biometrics appointment. Medical results are submitted directly by the approved clinic. Keep your passport available.",
      },
      {
        "@type": "HowToStep",
        position: 7,
        name: "Visa Decision & Conditions Review",
        text: `Processing takes ${destInfo.processingTime}. Review visa conditions — employer tie, permitted occupation, and validity period.`,
      },
      {
        "@type": "HowToStep",
        position: 8,
        name: "Travel & Onboarding in Your Destination",
        text: `On arrival, your employer completes onboarding — registering your work permit, setting up tax and social security, and providing your employment contract.`,
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

      <WorkVisaSlugClient
        slug={slug}
        natCap={natCap}
        destCap={destCap}
        nFlag={nFlag}
        dFlag={dFlag}
        destInfo={destInfo}
        isGulf={isGulf}
        canonicalUrl={canonicalUrl}
      />

   
    </>
  );
}