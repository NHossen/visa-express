// /app/travel-resources/visa-processing-time-tracker/[slug]/page.jsx
// ─── Dynamic SEO metadata · JSON-LD FAQ + HowTo + BreadcrumbList ──────────

import clientPromise from "@/app/lib/mongodb";
import VisaProcessingSlugPage from "@/components/Client/VisaProcessingSlugPage/VisaProcessingSlugPage";

// ── DB HELPER ──────────────────────────────────────────────────────────────
async function getCountries() {
  const client = await clientPromise;
  const db = client.db("Eammu-Holidays");
  return db
    .collection("countries")
    .find({}, { projection: { _id: 0, country: 1, code: 1, flag: 1 } })
    .sort({ country: 1 })
    .toArray();
}

export const revalidate = 86400; // 24h ISR cache

// ── VISA RULES (server-side — for metadata) ────────────────────────────────
const VISA_RULES = {
  canada: {
    name: "Canada", flag: "🇨🇦",
    types: {
      "e-visa":           { min:2,  max:4,   label:"eTA (Electronic Travel Authorization)", fee:"CAD 7" },
      "sticker":          { min:15, max:21,  label:"Temporary Resident Visa (TRV)", fee:"CAD 100" },
      "sticker-extended": { min:45, max:60,  label:"TRV (Complex / Administrative Processing)", fee:"CAD 100" },
      "transit":          { min:6,  max:24,  unit:"hours", label:"Canada Transit Visa", fee:"CAD 100" },
    },
  },
  "united-states": {
    name: "United States", flag: "🇺🇸",
    types: {
      "e-visa":           { min:3,  max:5,   label:"ESTA (Visa Waiver Program)", fee:"USD 21" },
      "sticker":          { min:21, max:60,  label:"B1/B2 Tourist/Business Visa", fee:"USD 185" },
      "sticker-extended": { min:60, max:180, label:"Administrative Processing (221g)", fee:"USD 185" },
      "transit":          { min:6,  max:24,  unit:"hours", label:"C-1 Transit Visa", fee:"USD 185" },
    },
  },
  "united-kingdom": {
    name: "United Kingdom", flag: "🇬🇧",
    types: {
      "e-visa":           { min:3,  max:5,  label:"eVisa (UK digital visa)", fee:"GBP 115" },
      "sticker":          { min:15, max:21, label:"Standard Visitor Visa", fee:"GBP 115" },
      "sticker-extended": { min:30, max:60, label:"Priority / Complex Case", fee:"GBP 500+" },
      "transit":          { min:6,  max:24, unit:"hours", label:"Direct Airside Transit Visa (DATV)", fee:"GBP 64" },
    },
  },
  schengen: {
    name: "Schengen Area", flag: "🇪🇺",
    types: {
      "e-visa":           { min:5,  max:10, label:"ETIAS (From 2025)", fee:"EUR 7" },
      "sticker":          { min:15, max:30, label:"Schengen Short-Stay Visa (C Visa)", fee:"EUR 80" },
      "sticker-extended": { min:45, max:90, label:"Complex Case / Document Request", fee:"EUR 80" },
      "transit":          { min:6,  max:24, unit:"hours", label:"Airport Transit Visa (ATV)", fee:"EUR 80" },
    },
  },
  australia: {
    name: "Australia", flag: "🇦🇺",
    types: {
      "e-visa":           { min:1,  max:3,   label:"ETA / eVisitor (601/651)", fee:"AUD 20" },
      "sticker":          { min:20, max:35,  label:"Visitor Visa (Subclass 600)", fee:"AUD 150" },
      "sticker-extended": { min:60, max:120, label:"Complex Health/Character Check", fee:"AUD 150" },
      "transit":          { min:6,  max:24,  unit:"hours", label:"Transit Visa (771)", fee:"Free" },
    },
  },
  "united-arab-emirates": {
    name: "United Arab Emirates", flag: "🇦🇪",
    types: {
      "e-visa":           { min:2,  max:4,  label:"UAE e-Visa (Tourist/Visit)", fee:"AED 300–500" },
      "sticker":          { min:5,  max:10, label:"Visa on Arrival / Embassy Visa", fee:"AED 200+" },
      "sticker-extended": { min:15, max:30, label:"Complex / Employment Visa", fee:"AED 500+" },
      "transit":          { min:6,  max:24, unit:"hours", label:"UAE Transit Visa (96-hr)", fee:"AED 50" },
    },
  },
  germany: {
    name: "Germany", flag: "🇩🇪",
    types: {
      "sticker":          { min:15, max:21, label:"National Visa / Schengen Visa", fee:"EUR 75" },
      "sticker-extended": { min:45, max:90, label:"Complex Case / Student Visa", fee:"EUR 75" },
      "transit":          { min:6,  max:24, unit:"hours", label:"Airport Transit Visa (TATV)", fee:"EUR 75" },
    },
  },
  france: {
    name: "France", flag: "🇫🇷",
    types: {
      "e-visa":           { min:5,  max:10, label:"ETIAS (from 2025)", fee:"EUR 7" },
      "sticker":          { min:15, max:30, label:"Schengen C Visa / Long-Stay D Visa", fee:"EUR 80" },
      "sticker-extended": { min:45, max:90, label:"Complex Case", fee:"EUR 80" },
      "transit":          { min:6,  max:24, unit:"hours", label:"Airport Transit Visa", fee:"EUR 80" },
    },
  },
  "saudi-arabia": {
    name: "Saudi Arabia", flag: "🇸🇦",
    types: {
      "e-visa":           { min:2,  max:4,  label:"Saudi e-Visa (Tourist)", fee:"SAR 300" },
      "sticker":          { min:10, max:21, label:"Saudi Sticker Visa", fee:"SAR 200+" },
      "sticker-extended": { min:30, max:60, label:"Work / Iqama Visa", fee:"SAR 500+" },
      "transit":          { min:6,  max:24, unit:"hours", label:"Saudi Transit Visa", fee:"SAR 100" },
    },
  },
  singapore: {
    name: "Singapore", flag: "🇸🇬",
    types: {
      "e-visa":           { min:3,  max:5,  label:"Singapore e-Visa (SAVE)", fee:"SGD 30" },
      "sticker":          { min:7,  max:14, label:"Singapore Visit Visa", fee:"SGD 30" },
      "sticker-extended": { min:21, max:45, label:"EP / Employment Pass", fee:"SGD 105" },
      "transit":          { min:6,  max:24, unit:"hours", label:"Singapore Transit Visa", fee:"Free/SGD 30" },
    },
  },
  japan: {
    name: "Japan", flag: "🇯🇵",
    types: {
      "sticker":          { min:5,  max:7,  label:"Japan Tourist Visa", fee:"JPY 3,000" },
      "sticker-extended": { min:21, max:45, label:"Japan Long-Stay Visa", fee:"JPY 6,000" },
      "transit":          { min:6,  max:24, unit:"hours", label:"Japan Transit Visa", fee:"Free" },
    },
  },
  malaysia: {
    name: "Malaysia", flag: "🇲🇾",
    types: {
      "e-visa":           { min:1,  max:3,  label:"Malaysia eNTRI / eVisa", fee:"MYR 50" },
      "sticker":          { min:7,  max:14, label:"Malaysia Sticker Visa", fee:"MYR 100" },
      "transit":          { min:6,  max:24, unit:"hours", label:"Malaysia Transit Visa", fee:"Free" },
    },
  },
  thailand: {
    name: "Thailand", flag: "🇹🇭",
    types: {
      "e-visa":           { min:3,  max:5,  label:"Thailand eVisa", fee:"THB 2,000" },
      "sticker":          { min:7,  max:14, label:"Thailand Tourist Visa", fee:"THB 2,000" },
      "transit":          { min:6,  max:24, unit:"hours", label:"Thailand Transit Visa", fee:"Free" },
    },
  },
};

// ── HELPERS ────────────────────────────────────────────────────────────────
function getCountryData(destSlug) {
  const key = Object.keys(VISA_RULES).find(k => destSlug.includes(k));
  if (key) return { key, ...VISA_RULES[key] };
  const destName = destSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    key: "generic",
    name: destName,
    flag: "🌍",
    types: {
      "e-visa":           { min:2,  max:5,  label:"E-Visa (Online)",              fee:"Varies" },
      "sticker":          { min:15, max:21, label:"Sticker Visa",                  fee:"Varies" },
      "sticker-extended": { min:45, max:60, label:"Complex / Extended Processing", fee:"Varies" },
      "transit":          { min:6,  max:24, unit:"hours", label:"Transit Visa",    fee:"Varies" },
    },
  };
}

function parseSlug(slug) {
  const marker = "-national-visa-processing-time-for-";
  const idx    = (slug || "").indexOf(marker);
  if (idx === -1) return [slug || "", "unknown"];
  return [slug.slice(0, idx), slug.slice(idx + marker.length)];
}

function toName(slugPart, countries = []) {
  const found = countries.find(c =>
    c.country.toLowerCase().replace(/\s+/g, "-") === slugPart
  );
  return found?.country || slugPart.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

const VISA_TYPE_LABELS = {
  "e-visa":           "E-Visa",
  "sticker":          "Sticker Visa",
  "sticker-extended": "Complex Case Visa",
  "transit":          "Transit Visa",
};

// ── DYNAMIC METADATA ───────────────────────────────────────────────────────
export async function generateMetadata({ params, searchParams }) {
  const resolvedParams      = await params;
  const resolvedSearchParams = await searchParams;
  const countries = await getCountries();

  const slug     = resolvedParams?.slug || "";
  const visaType = resolvedSearchParams?.type || "sticker";
  const [natSlug, destSlug] = parseSlug(slug);
  const natName     = toName(natSlug, countries);
  const countryData = getCountryData(destSlug);
  const destName    = countryData.name;
  const rule        = countryData.types[visaType] || countryData.types["sticker"];
  const timeStr     = rule?.unit === "hours"
    ? `${rule.min}–${rule.max} hours`
    : `${rule.min}–${rule.max} business days`;
  const visaLabel   = VISA_TYPE_LABELS[visaType] || "Visa";
  const fee         = rule?.fee ? ` (Fee: ${rule.fee})` : "";

  const title = `${natName} Visa Processing Time for ${destName} (${visaLabel}) 2025 | Eammu`;
  const description = `${natName} passport holders: ${destName} ${visaLabel} (${rule?.label}) processing takes ${timeStr}${fee}. Learn delay reasons, pro tips, document checklist & reverse application calculator. Free tracker by Eammu — updated monthly.`;

  const keywords = [
    `${natName} visa processing time ${destName}`,
    `${natName} ${destName} ${visaLabel.toLowerCase()} processing time`,
    `how long ${destName} visa takes ${natName}`,
    `${destName} ${visaLabel.toLowerCase()} ${natName} 2025`,
    `${natName} passport ${destName} visa duration`,
    `${destName} visa processing time 2025`,
    `${visaLabel.toLowerCase()} processing time`,
    `${natName} ${destName} visa fee`,
    `${natName} ${destName} visa documents`,
    `${natName} ${destName} visa checklist`,
    `${destName} visa delay reasons`,
    `${natName} ${destName} visa tips`,
    "visa processing time tracker",
    "eammu visa tracker",
    `${natName} travel visa`,
    `${destName} embassy visa time`,
  ];

  const canonical = `https://eammu.com/travel-resources/visa-processing-time-tracker/${slug}?type=${visaType}`;

  return {
    title,
    description,
    keywords,
    authors: [{ name: "Eammu Travel", url: "https://eammu.com" }],
    creator: "Eammu",
    publisher: "Eammu",
    category: "Travel",
    openGraph: {
      title,
      description,
      url:       canonical,
      siteName:  "Eammu",
      type:      "article",
      locale:    "en_US",
      images: [
        {
          url:    `https://eammu.com/og/visa-processing-${destSlug}.jpg`,
          width:   1200,
          height:  630,
          alt:    `${natName} to ${destName} Visa Processing Time — Eammu Tracker`,
        },
      ],
    },
    twitter: {
      card:        "summary_large_image",
      title,
      description,
      creator:     "@eammu",
      site:        "@eammu",
    },
    alternates: {
      canonical,
    },
    robots: {
      index:  true,
      follow: true,
      googleBot: {
        index:               true,
        follow:              true,
        "max-video-preview":  -1,
        "max-image-preview":  "large",
        "max-snippet":        -1,
      },
    },
    other: {
      "article:published_time": "2025-01-01",
      "article:modified_time":  new Date().toISOString().split("T")[0],
      "article:author":         "Eammu Travel Team",
      "article:section":        "Visa Processing",
      "article:tag":            `${natName}, ${destName}, ${visaLabel}, Visa Processing Time`,
    },
  };
}

// ── JSON-LD STRUCTURED DATA ────────────────────────────────────────────────
function JsonLd({ natName, destName, visaLabel, visaType, timeStr, rule, slug }) {
  const canonical = `https://eammu.com/travel-resources/visa-processing-time-tracker/${slug}?type=${visaType}`;

  // FAQ schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type":    "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name:    `How long does ${destName} ${visaLabel} take for ${natName} passport holders?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:   `${natName} passport holders applying for a ${destName} ${visaLabel} (${rule?.label}) typically wait ${timeStr}. Processing time varies based on embassy workload, seasonal demand, and application completeness. Apply at least ${rule?.unit === "hours" ? "3–5 days" : `${(rule?.max || 21) + 14} days`} before your intended travel date for a safe buffer.`,
        },
      },
      {
        "@type": "Question",
        name:    `What documents does a ${natName} citizen need for a ${destName} ${visaLabel}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:   `${natName} citizens applying for a ${destName} ${visaLabel} typically need: a valid passport (6+ months validity), completed application form, passport-sized photographs, bank statements (last 3–6 months), employment or enrollment letter, travel itinerary, hotel bookings, return flight confirmation, and travel insurance. Specific requirements vary by visa type and may include biometrics or health examinations.`,
        },
      },
      {
        "@type": "Question",
        name:    `Can a ${natName} apply for a ${destName} ${visaLabel} online?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:   `${visaType === "e-visa" ? `Yes — the ${destName} ${visaLabel} is available entirely online. No embassy visit required. You'll receive approval by email.` : `The ${destName} ${visaLabel} typically requires biometrics at an authorized Visa Application Centre (VAC) and may require an in-person interview. However, the initial application form is submitted online through the official portal.`}`,
        },
      },
      {
        "@type": "Question",
        name:    `What is the ${destName} ${visaLabel} application fee for ${natName} nationals?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:   `The ${destName} ${visaLabel} application fee is ${rule?.fee || "subject to change — check the official embassy website"}. Note that biometrics, health examination, and VFS/TLS service charges may be additional. Fees are non-refundable even if your visa is refused.`,
        },
      },
      {
        "@type": "Question",
        name:    `When should a ${natName} passport holder apply for a ${destName} visa?`,
        acceptedAnswer: {
          "@type": "Answer",
          text:   `${natName} nationals should apply for a ${destName} ${visaLabel} at least ${rule?.unit === "hours" ? "3–5 days" : `${(rule?.max || 21) + 14} business days`} before their travel date. This includes the maximum ${timeStr} processing window plus a 2-week safety buffer for unexpected delays. Use Eammu's Reverse Application Calculator on this page to find your exact ideal application date.`,
        },
      },
    ],
  };

  // HowTo schema for the application process
  const howToSchema = {
    "@context": "https://schema.org",
    "@type":    "HowTo",
    name:       `How to Apply for ${destName} ${visaLabel} as a ${natName} National`,
    description: `Step-by-step guide for ${natName} passport holders to apply for a ${destName} ${visaLabel} with ${timeStr} processing time.`,
    totalTime:   rule?.unit === "hours" ? `PT${rule.max}H` : `P${rule.max}D`,
    supply: [
      { "@type": "HowToSupply", name: "Valid passport (6+ months validity)" },
      { "@type": "HowToSupply", name: "Bank statements (last 3–6 months)" },
      { "@type": "HowToSupply", name: "Employment or enrollment letter" },
      { "@type": "HowToSupply", name: "Travel itinerary and hotel bookings" },
      { "@type": "HowToSupply", name: "Passport-sized photographs" },
      { "@type": "HowToSupply", name: "Travel insurance (where required)" },
    ],
    step: [
      {
        "@type":   "HowToStep",
        name:      "Prepare your documents",
        text:      `Gather all required documents for the ${destName} ${visaLabel}: valid passport, photographs, bank statements, employment letter, travel itinerary, hotel bookings, and travel insurance. Use Eammu's document checklist on this page to track your preparation.`,
        url:       `${canonical}#checklist`,
      },
      {
        "@type":   "HowToStep",
        name:      "Complete the application form",
        text:      `Fill out the official ${destName} ${visaLabel} application form accurately and completely. Inconsistencies between your form and supporting documents are a common cause of delays and refusals.`,
        url:       canonical,
      },
      {
        "@type":   "HowToStep",
        name:      "Submit biometrics (if required)",
        text:      `For sticker visas, book a biometrics appointment at an authorized Visa Application Centre (VAC). Submit your fingerprints and photograph in person. Processing time officially begins after biometrics are collected.`,
        url:       canonical,
      },
      {
        "@type":   "HowToStep",
        name:      "Pay the application fee",
        text:      `Pay the ${destName} ${visaLabel} application fee of ${rule?.fee || "the applicable amount"}. Keep your payment receipt as it is required for tracking and collecting your visa.`,
        url:       canonical,
      },
      {
        "@type":   "HowToStep",
        name:      "Track your application",
        text:      `Monitor your application status through the official embassy portal or VAC tracking system. Respond promptly to any requests for additional documents. Processing takes ${timeStr} in standard cases.`,
        url:       canonical,
      },
    ],
  };

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type":    "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home",                          item: "https://eammu.com" },
      { "@type": "ListItem", position: 2, name: "Travel Resources",               item: "https://eammu.com/travel-resources" },
      { "@type": "ListItem", position: 3, name: "Visa Processing Time Tracker",   item: "https://eammu.com/travel-resources/visa-processing-time-tracker" },
      { "@type": "ListItem", position: 4, name: `${natName} → ${destName} ${visaLabel}`, item: canonical },
    ],
  };

  // Article schema
  const articleSchema = {
    "@context":       "https://schema.org",
    "@type":          "Article",
    headline:         `${natName} Visa Processing Time for ${destName} (${visaLabel}) 2025`,
    description:      `Complete guide: ${natName} ${destName} ${visaLabel} processing takes ${timeStr}. Document checklist, delay reasons, tips, and application calculator.`,
    author:           { "@type": "Organization", name: "Eammu Travel", url: "https://eammu.com" },
    publisher: {
      "@type": "Organization",
      name:    "Eammu",
      url:     "https://eammu.com",
      logo:    { "@type": "ImageObject", url: "https://eammu.com/logo.png" },
    },
    datePublished:    "2025-01-01",
    dateModified:     new Date().toISOString().split("T")[0],
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    url:              canonical,
    image:            `https://eammu.com/og/visa-processing-${slug}.jpg`,
    keywords:         `${natName} visa, ${destName} visa, ${visaLabel}, processing time, ${natName} ${destName}`,
    about: [
      { "@type": "Thing", name: `${destName} ${visaLabel}` },
      { "@type": "Thing", name: `${natName} passport` },
      { "@type": "Thing", name: "Visa Processing Time" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
    </>
  );
}

// ── DEFAULT EXPORT ─────────────────────────────────────────────────────────
export default async function VisaProcessingSlugPageSeo({ params, searchParams }) {
  const resolvedParams       = await params;
  const resolvedSearchParams = await searchParams;
  const countries = await getCountries();

  const slug     = resolvedParams?.slug || "";
  const visaType = resolvedSearchParams?.type || "sticker";

  const [natSlug, destSlug] = parseSlug(slug);
  const natName     = toName(natSlug, countries);
  const countryData = getCountryData(destSlug);
  const rule        = countryData.types[visaType] || countryData.types["sticker"];
  const timeStr     = rule?.unit === "hours"
    ? `${rule.min}–${rule.max} hours`
    : `${rule.min}–${rule.max} business days`;

  return (
    <>
      <JsonLd
        natName={natName}
        destName={countryData.name}
        visaLabel={VISA_TYPE_LABELS[visaType] || "Visa"}
        visaType={visaType}
        timeStr={timeStr}
        rule={rule}
        slug={slug}
      />
      <VisaProcessingSlugPage
        params={resolvedParams}
        searchParams={resolvedSearchParams}
      />
    </>
  );
}