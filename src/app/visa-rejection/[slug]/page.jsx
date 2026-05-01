// /app/travel-resources/visa-rejection-checker/[slug]/page.jsx
// ─── Dynamic SEO metadata changes with every country combination ──────────

import clientPromise from "@/app/lib/mongodb";
import VisaRejectionSlugClient from "@/components/Client/VisaRejectionSlugPage/VisaRejectionSlugPage";

export const revalidate = 86400; // cache 24 hours

// ── REJECTION DATA (mirrors client — used for metadata) ───────────────────
const REJECTION_RULES = {
  canada: {
    name: "Canada",
    types: {
      tourist:  { rate: 38, risk: "High",   label: "Temporary Resident Visa (TRV)" },
      student:  { rate: 18, risk: "Medium", label: "Canadian Study Permit" },
      work:     { rate: 22, risk: "Medium", label: "Canadian Work Permit" },
      transit:  { rate: 12, risk: "Low",    label: "Canada Transit Visa" },
      business: { rate: 28, risk: "Medium", label: "Business TRV" },
      family:   { rate: 33, risk: "High",   label: "Family Sponsorship / Super Visa" },
    },
  },
  "united-states": {
    name: "United States",
    types: {
      tourist:  { rate: 42, risk: "High",    label: "B1/B2 Tourist/Business Visa" },
      student:  { rate: 15, risk: "Low",     label: "F-1 Student Visa" },
      work:     { rate: 10, risk: "Low",     label: "H-1B / Work Visa" },
      transit:  { rate: 20, risk: "Medium",  label: "C-1 Transit Visa" },
      business: { rate: 35, risk: "High",    label: "B1 Business Visa" },
      family:   { rate: 25, risk: "Medium",  label: "K-1 / IR Family Visa" },
    },
  },
  "united-kingdom": {
    name: "United Kingdom",
    types: {
      tourist:  { rate: 29, risk: "Medium", label: "Standard Visitor Visa" },
      student:  { rate: 14, risk: "Low",    label: "UK Student Visa (Tier 4)" },
      work:     { rate: 8,  risk: "Low",    label: "Skilled Worker Visa" },
      transit:  { rate: 18, risk: "Medium", label: "Direct Airside Transit Visa" },
      business: { rate: 24, risk: "Medium", label: "Business Visitor Visa" },
      family:   { rate: 31, risk: "High",   label: "Family Visa / Spouse Visa" },
    },
  },
  schengen: {
    name: "Schengen Area",
    types: {
      tourist:  { rate: 31, risk: "High",   label: "Schengen Short-Stay C Visa" },
      student:  { rate: 12, risk: "Low",    label: "Schengen Student / National Visa" },
      work:     { rate: 15, risk: "Low",    label: "Schengen Work Visa" },
      transit:  { rate: 10, risk: "Low",    label: "Airport Transit Visa (ATV)" },
      business: { rate: 22, risk: "Medium", label: "Schengen Business Visa" },
      family:   { rate: 27, risk: "Medium", label: "Family Reunification Visa" },
    },
  },
  australia: {
    name: "Australia",
    types: {
      tourist:  { rate: 24, risk: "Medium", label: "Visitor Visa (Subclass 600)" },
      student:  { rate: 22, risk: "Medium", label: "Student Visa (Subclass 500)" },
      work:     { rate: 12, risk: "Low",    label: "Temporary Skill Shortage (TSS)" },
      transit:  { rate: 8,  risk: "Low",    label: "Transit Visa (Subclass 771)" },
      business: { rate: 18, risk: "Medium", label: "Business Innovation Visa" },
      family:   { rate: 20, risk: "Medium", label: "Partner / Family Stream Visa" },
    },
  },
  "united-arab-emirates": {
    name: "United Arab Emirates",
    types: {
      tourist:  { rate: 8,  risk: "Low",    label: "UAE Tourist e-Visa" },
      student:  { rate: 6,  risk: "Low",    label: "UAE Student Visa" },
      work:     { rate: 10, risk: "Low",    label: "UAE Employment Visa" },
      transit:  { rate: 5,  risk: "Low",    label: "UAE Transit Visa (96-hr)" },
      business: { rate: 9,  risk: "Low",    label: "UAE Business Visa" },
      family:   { rate: 12, risk: "Low",    label: "UAE Family / Residence Visa" },
    },
  },
  germany: {
    name: "Germany",
    types: {
      tourist:  { rate: 27, risk: "Medium", label: "Schengen Visitor Visa" },
      student:  { rate: 16, risk: "Medium", label: "German Student Visa" },
      work:     { rate: 14, risk: "Low",    label: "German Work / Skilled Worker Visa" },
      transit:  { rate: 10, risk: "Low",    label: "Airport Transit Visa (TATV)" },
      business: { rate: 20, risk: "Medium", label: "German Business Visa" },
      family:   { rate: 22, risk: "Medium", label: "Family Reunification Visa" },
    },
  },
};

// ── HELPERS ───────────────────────────────────────────────────────────────
async function getCountries() {
  const client = await clientPromise;
  const db = client.db("Eammu-Holidays");
  return db.collection("countries")
    .find({}, { projection: { _id: 0, country: 1, code: 1, flag: 1 } })
    .sort({ country: 1 })
    .toArray();
}

function parseSlug(slug) {
  const marker = "-visa-rejection-rate-for-";
  const idx = (slug || "").indexOf(marker);
  if (idx === -1) return [slug || "", "unknown"];
  return [slug.slice(0, idx), slug.slice(idx + marker.length)];
}

function toName(slugPart, countries = []) {
  const found = countries.find(c =>
    c.country.toLowerCase().replace(/\s+/g, "-") === slugPart
  );
  return found?.country || slugPart.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function getRejectionData(destSlug) {
  const key = Object.keys(REJECTION_RULES).find(k => destSlug.includes(k));
  if (key) return { key, ...REJECTION_RULES[key] };
  const destName = destSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    key: "generic",
    name: destName,
    types: {
      tourist:  { rate: 25, risk: "Medium", label: "Tourist / Visitor Visa" },
      student:  { rate: 18, risk: "Medium", label: "Student Visa" },
      work:     { rate: 15, risk: "Low",    label: "Work Visa" },
      transit:  { rate: 10, risk: "Low",    label: "Transit Visa" },
      business: { rate: 20, risk: "Medium", label: "Business Visa" },
      family:   { rate: 22, risk: "Medium", label: "Family Visa" },
    },
  };
}

const VISA_TYPE_LABELS = {
  tourist:  "Tourist Visa",
  student:  "Student Visa",
  work:     "Work Visa",
  transit:  "Transit Visa",
  business: "Business Visa",
  family:   "Family Visa",
};

// ── DYNAMIC METADATA ──────────────────────────────────────────────────────
export async function generateMetadata({ params, searchParams }) {
  const resolvedParams      = await params;
  const resolvedSearchParams = await searchParams;

  const slug     = resolvedParams?.slug || "";
  const visaType = resolvedSearchParams?.type || "tourist";

  const countries = await getCountries();
  const [natSlug, destSlug] = parseSlug(slug);
  const natName    = toName(natSlug, countries);
  const rejData    = getRejectionData(destSlug);
  const destName   = rejData.name;
  const rule       = rejData.types[visaType] || rejData.types["tourist"];
  const visaLabel  = VISA_TYPE_LABELS[visaType] || "Visa";
  const riskLabel  = rule.risk;
  const rate       = rule.rate;

  const title       = `${natName} ${visaLabel} Rejection Rate for ${destName} (${rate}% Refused) 2025 | Eammu`;
  const description = `${natName} passport holders face a ${rate}% rejection rate for ${destName} ${visaLabel}. Risk level: ${riskLabel}. Learn the top reasons for refusal and exactly how to fix your application. Free checker by Eammu.`;

  const keywords = [
    `${natName} visa rejection rate ${destName}`,
    `${natName} ${destName} ${visaLabel.toLowerCase()} rejection`,
    `why ${destName} visa refused ${natName}`,
    `${destName} visa refusal rate ${natName} 2025`,
    `${natName} ${visaLabel.toLowerCase()} rejection reasons`,
    "visa rejection checker",
    "visa refusal rate",
    "eammu visa checker",
  ];

  const canonical = `https://eammu.com/visa-rejection/${slug}?type=${visaType}`;

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url:      canonical,
      siteName: "Eammu",
      type:     "article",
      images: [{ url: `https://eammu.com/og/visa-rejection-${destSlug}.jpg`, width: 1200, height: 630, alt: `${natName} ${destName} Visa Rejection Rate` }],
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    other: {
      "article:published_time": "2025-01-01",
      "article:modified_time":  new Date().toISOString().split("T")[0],
    },
  };
}

// ── JSON-LD ───────────────────────────────────────────────────────────────
function JsonLd({ natName, destName, visaLabel, rate, risk }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the ${destName} ${visaLabel} rejection rate for ${natName} passport holders?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${natName} passport holders face approximately a ${rate}% rejection rate for ${destName} ${visaLabel} applications. The risk level is considered ${risk}. Common reasons include insufficient financial documentation, weak ties to home country, and incomplete application packages.`,
        },
      },
      {
        "@type": "Question",
        name: `Why do ${natName} citizens get rejected for ${destName} ${visaLabel}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The most common reasons for ${destName} ${visaLabel} rejection for ${natName} applicants include: insufficient bank balance, lack of strong ties to home country (employment/property), incomplete documents, poor travel history, and inconsistent application details.`,
        },
      },
      {
        "@type": "Question",
        name: `How can a ${natName} applicant improve ${destName} ${visaLabel} approval chances?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `To improve approval chances, ${natName} applicants should maintain 6 months of consistent bank statements, provide strong employment evidence, include a detailed cover letter, show clear return intent, and ensure all documents are complete and consistent.`,
        },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// ── DEFAULT EXPORT ────────────────────────────────────────────────────────
export default async function VisaRejectionSlugSeo({ params, searchParams }) {
  const resolvedParams      = await params;
  const resolvedSearchParams = await searchParams;

  const slug     = resolvedParams?.slug || "";
  const visaType = resolvedSearchParams?.type || "tourist";

  const countries = await getCountries();
  const [natSlug, destSlug] = parseSlug(slug);
  const natName  = toName(natSlug, countries);
  const rejData  = getRejectionData(destSlug);
  const rule     = rejData.types[visaType] || rejData.types["tourist"];

  return (
    <>
      <JsonLd
        natName={natName}
        destName={rejData.name}
        visaLabel={VISA_TYPE_LABELS[visaType] || "Visa"}
        rate={rule.rate}
        risk={rule.risk}
      />
      <VisaRejectionSlugClient params={resolvedParams} searchParams={resolvedSearchParams} />
    </>
  );
}