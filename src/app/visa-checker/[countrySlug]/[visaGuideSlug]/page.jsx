// app/visa-checker/[countrySlug]/[visaGuideSlug]/page.jsx
// ─────────────────────────────────────────────────────────────────────────────
// FULL SEO + GUIDE PAGE
// Supports slugs like:
//   canada-visa-for-bangladesh/visa-on-arrival
//   canada-visa-for-bangladesh/e-visa
//   canada-visa-for-bangladesh/eta
//   united-states-visa-for-india/visa-required
// ─────────────────────────────────────────────────────────────────────────────

import { Suspense } from "react";
import VisaGuideClient from "./Visaguideclient";


const BASE = "https://api.eammu.com/api/v1";
const API_KEY = process.env.NEXT_PUBLIC_EAMMU_API_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yoursite.com";

// ── Helpers (shared between server + client) ──────────────────────────────────

export function parseSlug(raw) {
  const s = decodeURIComponent(raw || "");
  const toTitle = (t) =>
    t.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const m = s.match(/^(.+?)-visa-for-(.+)$/);
  if (m) return { passport: toTitle(m[1]), destination: toTitle(m[2]) };
  return { passport: toTitle(s), destination: null };
}

const VISA_TYPE_META = {
  "e-visa": {
    label: "E-Visa",
    description: (from, to) =>
      `${from} passport holders can apply for an electronic visa (e-Visa) to enter ${to} online. Learn about fees, processing time, required documents, and step-by-step application instructions.`,
    faqSchema: (from, to) => [
      { q: `Can ${from} passport holders get an e-Visa for ${to}?`, a: `Yes, ${from} citizens are eligible to apply for an e-Visa to ${to} online through the official government portal.` },
      { q: `How long does it take to get an e-Visa for ${to}?`, a: `E-Visa processing for ${to} typically takes 3–7 business days, though this can vary. Apply well in advance of your travel date.` },
      { q: `What documents do I need for a ${to} e-Visa?`, a: `You generally need a valid passport (6+ months validity), a digital photo, return ticket, and proof of accommodation. Additional documents may be required.` },
    ],
  },
  "visa-on-arrival": {
    label: "Visa on Arrival",
    description: (from, to) =>
      `${from} passport holders are eligible for a Visa on Arrival (VOA) when travelling to ${to}. Discover fees, validity, entry requirements, and what to prepare before you fly.`,
    faqSchema: (from, to) => [
      { q: `Can ${from} citizens get a Visa on Arrival in ${to}?`, a: `Yes, ${from} passport holders are eligible for a Visa on Arrival at designated international airports and entry points in ${to}.` },
      { q: `How much does Visa on Arrival cost in ${to}?`, a: `Visa on Arrival fees in ${to} vary. Check our fee section above for the latest rates and accepted payment methods.` },
      { q: `What documents are required for Visa on Arrival in ${to}?`, a: `Typically: valid passport, completed arrival form, passport-size photo, sufficient funds, and onward/return ticket. Requirements may vary.` },
    ],
  },
  "eta": {
    label: "ETA",
    description: (from, to) =>
      `${from} citizens travelling to ${to} require an Electronic Travel Authorization (ETA). Find out how to apply, costs, processing time, and entry conditions.`,
    faqSchema: (from, to) => [
      { q: `Do ${from} citizens need an ETA for ${to}?`, a: `Yes, ${from} passport holders must obtain an Electronic Travel Authorization (ETA) before flying to ${to}.` },
      { q: `How do I apply for a ${to} ETA?`, a: `You can apply for a ${to} ETA online through the official government website. The process is quick and usually approved within minutes to 72 hours.` },
      { q: `How long is a ${to} ETA valid?`, a: `ETAs for ${to} are generally valid for multiple entries over several years, but each stay is typically limited. See the validity section above for exact details.` },
    ],
  },
  "visa-required": {
    label: "Visa Required",
    description: (from, to) =>
      `${from} passport holders must obtain a visa before travelling to ${to}. Read the complete guide including application process, required documents, fees, and processing times.`,
    faqSchema: (from, to) => [
      { q: `Do ${from} citizens need a visa to visit ${to}?`, a: `Yes, ${from} passport holders require a valid visa to enter ${to}. You must apply before your trip through the ${to} embassy or consulate.` },
      { q: `Where can ${from} citizens apply for a ${to} visa?`, a: `${from} citizens can apply at the ${to} embassy or consulate in their country, or through an authorized visa application centre.` },
      { q: `How early should I apply for a ${to} visa?`, a: `It is recommended to apply at least 4–8 weeks before your intended travel date to allow sufficient processing time.` },
    ],
  },
  "visa-free": {
    label: "Visa Free",
    description: (from, to) =>
      `${from} passport holders can enter ${to} without a visa. Discover the maximum stay allowed, entry requirements, and what you need to know before travelling.`,
    faqSchema: (from, to) => [
      { q: `Can ${from} citizens visit ${to} without a visa?`, a: `Yes, ${from} passport holders can enter ${to} visa-free. See above for the maximum permitted stay and any conditions that apply.` },
      { q: `How long can ${from} citizens stay in ${to} without a visa?`, a: `The visa-free stay allowance is detailed in the key facts above. Overstaying can result in fines or future entry bans.` },
    ],
  },
  "no-admission": {
    label: "No Admission",
    description: (from, to) =>
      `${from} passport holders are currently not admitted entry to ${to}. Learn about the restrictions, exceptions, and alternative travel options.`,
    faqSchema: (from, to) => [
      { q: `Can ${from} citizens travel to ${to}?`, a: `Currently, ${from} passport holders are not admitted entry to ${to}. There may be limited exceptions for certain visa categories.` },
    ],
  },
};

function getVisaMeta(slug) {
  if (!slug) return {
    label: "Visa Guide",
    description: (from, to) => `Complete visa guide for ${from} passport holders travelling to ${to}. Requirements, fees, processing time, and application steps.`,
    faqSchema: () => [],
  };
  return VISA_TYPE_META[slug] || {
    label: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    description: (from, to) => `Complete visa guide for ${from} passport holders travelling to ${to}. Requirements, fees, processing time, and application steps.`,
    faqSchema: () => [],
  };
}

// ── Server-side: fetch guide for metadata ────────────────────────────────────

async function fetchGuideForMeta(visaGuideSlug) {
  try {
    const res = await fetch(
      `${SITE_URL}/api/visa-guide/${visaGuideSlug}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

// ── generateMetadata ─────────────────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const { countrySlug, visaGuideSlug } = await params;
  const { passport: passportName, destination: destName } = parseSlug(countrySlug);
  const visaMeta = getVisaMeta(visaGuideSlug);
  const guide = await fetchGuideForMeta(visaGuideSlug);

  const from = passportName;
  const to = destName || "the destination";
  const label = guide?.label || visaMeta.label;

  const title = destName
    ? `${from} to ${to} Visa - Price, Requirements and Application – ${label} Guide`
    : `${label} Guide | Visa Checker`;

  const description =
    guide?.seo_summary ||
    guide?.description ||
    visaMeta.description(from, to);

  const canonical = `${SITE_URL}/visa-checker/${countrySlug}/${visaGuideSlug}`;

  const ogTitle = destName
    ? `${from} Passport → ${to}: ${label} Requirements & Guide`
    : `${label} Visa Guide`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: ogTitle,
      description,
      url: canonical,
      type: "article",
      siteName: "Visa Checker",
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

// ── JSON-LD structured data builder ──────────────────────────────────────────

function buildJsonLd({ passportName, destName, visaGuideSlug, guide, canonical }) {
  const visaMeta = getVisaMeta(visaGuideSlug);
  const from = passportName;
  const to = destName || "the destination";
  const label = guide?.label || visaMeta.label;

  const faqs = [
    ...(visaMeta.faqSchema(from, to) || []),
    ...(guide?.faqs?.map((f) => ({ q: f.question, a: f.answer })) || []),
  ];

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Visa Checker", item: `${SITE_URL}/visa-checker` },
      {
        "@type": "ListItem", position: 3,
        name: destName ? `${from} Visa for ${to}` : from,
        item: `${SITE_URL}/visa-checker/${encodeURIComponent(visaGuideSlug.split("/")[0])}`,
      },
      {
        "@type": "ListItem", position: 4,
        name: label,
        item: canonical,
      },
    ],
  };

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: destName
      ? `${from} to ${to} – ${label} Visa Guide`
      : `${label} Visa Guide`,
    description:
      guide?.seo_summary ||
      guide?.description ||
      visaMeta.description(from, to),
    url: canonical,
    dateModified: guide?.last_updated || new Date().toISOString().split("T")[0],
    author: { "@type": "Organization", name: "Visa Checker" },
    publisher: {
      "@type": "Organization",
      name: "Visa Checker",
      url: SITE_URL,
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
  };

  const faqPage = faqs.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map(({ q, a }) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: { "@type": "Answer", text: a },
        })),
      }
    : null;

  // HowTo schema — built from guide steps if available
  const howTo = guide?.steps?.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: `How to Apply for ${label} – ${from} to ${to}`,
        description: `Step-by-step guide for ${from} passport holders applying for a ${label} to enter ${to}.`,
        step: guide.steps.map((s, i) => ({
          "@type": "HowToStep",
          position: i + 1,
          name: typeof s === "string" ? `Step ${i + 1}` : s.title,
          text: typeof s === "string" ? s : s.detail,
        })),
      }
    : null;

  return [breadcrumb, article, faqPage, howTo].filter(Boolean);
}

// ── SEO Stats Section (server-rendered, static for Googlebot) ────────────────

function SeoStatsSection({ passportName, destName, visaGuideSlug, guide }) {
  const visaMeta = getVisaMeta(visaGuideSlug);
  const label = guide?.label || visaMeta.label;
  const kf = guide?.key_facts;

  const stats = [
    kf?.fee_range
      ? { label: "Visa Fee", value: kf.fee_range }
      : guide?.fee
      ? { label: "Visa Fee", value: guide.fee }
      : null,
    kf?.processing_time
      ? { label: "Processing Time", value: kf.processing_time }
      : guide?.processing_time
      ? { label: "Processing Time", value: guide.processing_time }
      : null,
    kf?.validity_range
      ? { label: "Visa Validity", value: kf.validity_range }
      : guide?.validity
      ? { label: "Visa Validity", value: guide.validity }
      : null,
    kf?.passport_validity
      ? { label: "Passport Required", value: kf.passport_validity }
      : null,
    destName ? { label: "Destination", value: destName } : null,
    passportName ? { label: "Passport", value: passportName } : null,
    { label: "Visa Type", value: label },
  ].filter(Boolean);

  if (!stats.length) return null;

  return (
    <section
      aria-label="Visa statistics at a glance"
      style={{ display: "none" }}   /* hidden visually — Googlebot still indexes this */
    >
      <h2>{label} – Quick Facts for {passportName} Holders{destName ? ` Travelling to ${destName}` : ""}</h2>
      <dl>
        {stats.map((s) => (
          <div key={s.label}>
            <dt>{s.label}</dt>
            <dd>{s.value}</dd>
          </div>
        ))}
      </dl>
      {guide?.requirements?.mandatory?.length > 0 && (
        <>
          <h3>Required Documents</h3>
          <ul>
            {guide.requirements.mandatory.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </>
      )}
      {guide?.common_rejection_reasons?.length > 0 && (
        <>
          <h3>Common Rejection Reasons</h3>
          <ul>
            {guide.common_rejection_reasons.map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

// ── Page (Server Component) ───────────────────────────────────────────────────

export default async function VisaGuidePage({ params }) {
  const { countrySlug, visaGuideSlug } = await params;
  const { passport: passportName, destination: destName } = parseSlug(countrySlug);
  const canonical = `${SITE_URL}/visa-checker/${countrySlug}/${visaGuideSlug}`;

  // Fetch guide server-side so JSON-LD has real data at render time
  const guide = await fetchGuideForMeta(visaGuideSlug);

  const jsonLdScripts = buildJsonLd({ passportName, destName, visaGuideSlug, guide, canonical });

  return (
    <>
      {/* ── Structured Data ─────────────────────────────────────── */}
      {jsonLdScripts.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* ── Hidden SEO text (indexed by Google, invisible to users) ─ */}
      <SeoStatsSection
        passportName={passportName}
        destName={destName}
        visaGuideSlug={visaGuideSlug}
        guide={guide}
      />

      {/* ── Visible page — server-fetched guide passed as prop to avoid double fetch ─ */}
      <Suspense fallback={null}>
        <VisaGuideClient
          initialGuide={guide}
          passportName={passportName}
          destName={destName}
          countrySlug={countrySlug}
          visaGuideSlug={visaGuideSlug}
        />
      </Suspense>

    </>
  );
}