// /app/work-visa/[slug]/page.jsx
// ─── Dynamic Work Visa Slug Page — Server Component with SEO ──────────────
// Route: /work-visa/[nationality]-work-visa-for-[destination]
// e.g.   /work-visa/bangladesh-work-visa-for-canada

import clientPromise from "@/app/lib/mongodb";
import WorkVisaSlugClient from "@/components/Client/WorkVisaSlugClient/WorkVisaSlugClient";


export const revalidate = 86400; // 24-hour ISR cache

// ── DESTINATION DATA (mirrors client) ─────────────────────────────────────
const DESTINATIONS = {
  "canada": {
    name: "Canada", flag: "🇨🇦", currency: "CAD",
    visaName: "Canada Work Permit (LMIA / LMIA-Exempt)",
    avgSalary: "CAD $55,000–$95,000/yr", minSalary: "CAD $30,000",
    processingTime: "8–27 weeks", approvalRate: 78, difficulty: "Medium",
    languages: ["English", "French"],
    topIndustries: ["Technology", "Healthcare", "Construction", "Finance", "Agriculture"],
    topRoles: ["Software Engineer", "Registered Nurse", "Truck Driver", "Accountant", "Welder"],
    embassyUrl: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
  },
  "united-states": {
    name: "United States", flag: "🇺🇸", currency: "USD",
    visaName: "H-1B Specialty Occupation / L-1 / O-1",
    avgSalary: "USD $70,000–$130,000/yr", minSalary: "USD $60,500",
    processingTime: "3–6 months", approvalRate: 72, difficulty: "Hard",
    languages: ["English"],
    topIndustries: ["Technology", "Finance", "Healthcare", "Research"],
    topRoles: ["Software Engineer", "Data Scientist", "Financial Analyst", "Doctor"],
    embassyUrl: "https://travel.state.gov/content/travel/en/us-visas/employment.html",
  },
  "united-kingdom": {
    name: "United Kingdom", flag: "🇬🇧", currency: "GBP",
    visaName: "UK Skilled Worker Visa",
    avgSalary: "GBP £35,000–£75,000/yr", minSalary: "GBP £38,700",
    processingTime: "3–8 weeks", approvalRate: 82, difficulty: "Medium",
    languages: ["English"],
    topIndustries: ["Healthcare", "Technology", "Finance", "Education"],
    topRoles: ["Nurse", "Software Engineer", "Chef", "Teacher"],
    embassyUrl: "https://www.gov.uk/skilled-worker-visa",
  },
  "germany": {
    name: "Germany", flag: "🇩🇪", currency: "EUR",
    visaName: "Germany Skilled Worker Visa / EU Blue Card",
    avgSalary: "EUR €45,000–€85,000/yr", minSalary: "EUR €43,992",
    processingTime: "1–3 months", approvalRate: 80, difficulty: "Medium",
    languages: ["German", "English"],
    topIndustries: ["Engineering", "Automotive", "IT", "Manufacturing"],
    topRoles: ["Mechanical Engineer", "IT Specialist", "Nurse", "Electrician"],
    embassyUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/skilled-worker",
  },
  "australia": {
    name: "Australia", flag: "🇦🇺", currency: "AUD",
    visaName: "Temporary Skill Shortage (TSS) 482 / Skilled 189",
    avgSalary: "AUD $65,000–$110,000/yr", minSalary: "AUD $70,000",
    processingTime: "2–6 months", approvalRate: 76, difficulty: "Medium",
    languages: ["English"],
    topIndustries: ["Healthcare", "Mining", "Construction", "IT"],
    topRoles: ["Registered Nurse", "Civil Engineer", "IT Project Manager", "Chef"],
    embassyUrl: "https://immi.homeaffairs.gov.au/",
  },
  "united-arab-emirates": {
    name: "United Arab Emirates", flag: "🇦🇪", currency: "AED",
    visaName: "UAE Employment Visa / Golden Visa",
    avgSalary: "AED 120,000–250,000/yr", minSalary: "AED 48,000/yr",
    processingTime: "2–6 weeks", approvalRate: 85, difficulty: "Easy",
    languages: ["English", "Arabic"],
    topIndustries: ["Construction", "Finance", "Oil & Gas", "Hospitality"],
    topRoles: ["Civil Engineer", "Finance Manager", "IT Specialist", "Hotel Manager"],
    embassyUrl: "https://icp.gov.ae/",
  },
  "singapore": {
    name: "Singapore", flag: "🇸🇬", currency: "SGD",
    visaName: "Singapore Employment Pass (EP) / S Pass",
    avgSalary: "SGD $72,000–$150,000/yr", minSalary: "SGD $5,000/month",
    processingTime: "3–8 weeks", approvalRate: 74, difficulty: "Medium",
    languages: ["English"],
    topIndustries: ["Finance", "Technology", "Biomedical", "Logistics"],
    topRoles: ["Software Engineer", "Finance Manager", "Data Scientist"],
    embassyUrl: "https://www.mom.gov.sg/passes-and-permits/employment-pass",
  },
  "saudi-arabia": {
    name: "Saudi Arabia", flag: "🇸🇦", currency: "SAR",
    visaName: "Saudi Arabia Work Visa / Iqama",
    avgSalary: "SAR 60,000–140,000/yr", minSalary: "SAR 48,000/yr",
    processingTime: "4–12 weeks", approvalRate: 80, difficulty: "Medium",
    languages: ["Arabic", "English"],
    topIndustries: ["Oil & Gas", "Construction", "Healthcare", "Education"],
    topRoles: ["Petroleum Engineer", "Doctor", "Construction Manager", "Teacher"],
    embassyUrl: "https://visa.mofa.gov.sa/",
  },
  "japan": {
    name: "Japan", flag: "🇯🇵", currency: "JPY",
    visaName: "Japan Work Visa / Highly Skilled Professional Visa",
    avgSalary: "JPY ¥3.5M–¥8M/yr", minSalary: "JPY ¥2,500,000/yr",
    processingTime: "4–12 weeks", approvalRate: 71, difficulty: "Hard",
    languages: ["Japanese", "English"],
    topIndustries: ["Technology", "Manufacturing", "Education", "Research"],
    topRoles: ["Software Engineer", "English Teacher", "Researcher", "Engineer"],
    embassyUrl: "https://www.mofa.go.jp/j_info/visit/visa/long/visa6.html",
  },
  "malaysia": {
    name: "Malaysia", flag: "🇲🇾", currency: "MYR",
    visaName: "Malaysia Employment Pass / Professional Visit Pass",
    avgSalary: "MYR 48,000–120,000/yr", minSalary: "MYR 36,000/yr",
    processingTime: "4–8 weeks", approvalRate: 79, difficulty: "Easy",
    languages: ["English", "Malay"],
    topIndustries: ["Manufacturing", "Technology", "Finance", "Oil & Gas"],
    topRoles: ["Engineer", "IT Professional", "Finance Manager", "Lecturer"],
    embassyUrl: "https://esd.imi.gov.my/",
  },
  "netherlands": {
    name: "Netherlands", flag: "🇳🇱", currency: "EUR",
    visaName: "Netherlands Highly Skilled Migrant / EU Blue Card",
    avgSalary: "EUR €50,000–€95,000/yr", minSalary: "EUR €46,107/yr",
    processingTime: "2–90 days", approvalRate: 81, difficulty: "Medium",
    languages: ["Dutch", "English"],
    topIndustries: ["Technology", "Logistics", "Agriculture", "Finance"],
    topRoles: ["Software Engineer", "Data Scientist", "Product Designer", "Researcher"],
    embassyUrl: "https://ind.nl/en/work/working_in_the_Netherlands",
  },
  "new-zealand": {
    name: "New Zealand", flag: "🇳🇿", currency: "NZD",
    visaName: "Accredited Employer Work Visa (AEWV)",
    avgSalary: "NZD $60,000–$110,000/yr", minSalary: "NZD $55,000/yr",
    processingTime: "6–12 weeks", approvalRate: 77, difficulty: "Medium",
    languages: ["English"],
    topIndustries: ["Healthcare", "Agriculture", "Construction", "Technology"],
    topRoles: ["Registered Nurse", "Civil Engineer", "IT Specialist", "Chef"],
    embassyUrl: "https://www.immigration.govt.nz/",
  },
};

// ── HELPERS ───────────────────────────────────────────────────────────────
async function getCountries() {
  try {
    const client = await clientPromise;
    const db = client.db("Eammu-Holidays");
    return db.collection("countries")
      .find({}, { projection: { _id: 0, country: 1, code: 1, flag: 1 } })
      .sort({ country: 1 })
      .toArray();
  } catch { return []; }
}

function parseSlug(slug) {
  const marker = "-work-visa-for-";
  const idx = (slug || "").indexOf(marker);
  if (idx === -1) return [slug || "", "unknown"];
  return [slug.slice(0, idx), slug.slice(idx + marker.length)];
}

function toName(slugPart, countries = []) {
  const found = countries.find(c =>
    c.country.toLowerCase().replace(/\s+/g, "-") === slugPart
  );
  return found?.country ||
    slugPart.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function getDestData(destSlug) {
  const key = Object.keys(DESTINATIONS).find(k => destSlug === k || destSlug.includes(k));
  if (key) return { key, ...DESTINATIONS[key] };
  const name = destSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    key: "generic", name, flag: "🌍", currency: "USD",
    visaName: "Work Visa / Work Permit",
    avgSalary: "Varies by role", minSalary: "Varies",
    processingTime: "4–16 weeks", approvalRate: 75, difficulty: "Medium",
    languages: ["English"], topIndustries: ["Technology", "Healthcare", "Engineering", "Finance"],
    topRoles: ["Engineer", "IT Specialist", "Healthcare Worker", "Finance Professional"],
    embassyUrl: null,
  };
}

// ── JSON-LD STRUCTURED DATA ────────────────────────────────────────────────
function JsonLd({ natName, destData, slug }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `How can a ${natName} get a work visa for ${destData.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${natName} passport holders can apply for the ${destData.visaName} to work in ${destData.name}. Requirements include a valid job offer from a licensed employer, proof of qualifications, language test results, and salary meeting the minimum threshold of ${destData.minSalary}. Processing takes ${destData.processingTime}.`,
        },
      },
      {
        "@type": "Question",
        name: `What is the minimum salary for a ${natName} to work in ${destData.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `The minimum salary requirement for a work permit in ${destData.name} is ${destData.minSalary}. The average salary range is ${destData.avgSalary}. Salary thresholds may vary by occupation and are updated annually by the ${destData.name} government.`,
        },
      },
      {
        "@type": "Question",
        name: `How long does ${destData.name} work visa processing take for ${natName} applicants?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${destData.name} work visa (${destData.visaName}) processing for ${natName} applicants typically takes ${destData.processingTime}. The current approval rate is approximately ${destData.approvalRate}%. Applying well in advance and submitting a complete application package reduces processing delays.`,
        },
      },
      {
        "@type": "Question",
        name: `What documents does a ${natName} need for a ${destData.name} work visa?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${natName} applicants for the ${destData.name} work visa need: a valid job offer from a licensed employer, educational credential assessment, language proficiency proof (${destData.languages.join(", ")}), clean criminal record certificate, medical examination results, and a valid passport with at least 6 months validity.`,
        },
      },
    ],
  };

  const howToData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Get a ${destData.name} Work Visa as a ${natName} — Step by Step`,
    description: `Complete guide for ${natName} passport holders applying for the ${destData.visaName}.`,
    step: [
      { "@type": "HowToStep", name: "Get a Job Offer",           text: "Secure a job offer from a licensed employer in " + destData.name + ". The employer must be authorised to sponsor foreign workers." },
      { "@type": "HowToStep", name: "Credential Assessment",     text: "Have your educational qualifications assessed and recognised by an approved body in " + destData.name + "." },
      { "@type": "HowToStep", name: "Language Test",             text: "Pass the required language test (" + destData.languages.join("/") + ") with the minimum score for your occupation." },
      { "@type": "HowToStep", name: "Gather Documents",          text: "Collect passport, degree certificates, work experience letters, police clearance, and medical exam results." },
      { "@type": "HowToStep", name: "Submit Application",        text: "Apply online through the official " + destData.name + " immigration portal. Pay the visa fee and attend biometrics if required." },
      { "@type": "HowToStep", name: "Receive Approval",          text: "Processing takes " + destData.processingTime + ". Once approved, arrange travel and register with local authorities on arrival." },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToData) }} />
    </>
  );
}

// ── DYNAMIC METADATA ──────────────────────────────────────────────────────
export async function generateMetadata({ params, searchParams }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";

  const countries = await getCountries();
  const [natSlug, destSlug] = parseSlug(slug);
  const natName  = toName(natSlug, countries);
  const destData = getDestData(destSlug);

  const title       = `${natName} Work Visa for ${destData.name} 2025 — Requirements, Salary & Process | Eammu`;
  const description = `Complete ${destData.name} work visa guide for ${natName} passport holders. ${destData.visaName} — minimum salary ${destData.minSalary}, processing ${destData.processingTime}, ${destData.approvalRate}% approval rate. Documents, requirements, and step-by-step process.`;
  const canonical   = `https://eammu.com/work-visa/${slug}`;
  const keywords    = [
    `${natName} work visa ${destData.name}`,
    `${natName} work permit ${destData.name} 2025`,
    `${destData.name} work visa requirements ${natName}`,
    `how to get work visa in ${destData.name} from ${natName}`,
    `${destData.name} work permit salary requirement`,
    `${destData.visaName} ${natName}`,
    `${destData.name} skilled worker visa ${natName}`,
    `work abroad ${destData.name} ${natName}`,
    `${natName} job visa ${destData.name}`,
    `work visa processing time ${destData.name}`,
  ];

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Eammu",
      type: "article",
      images: [{ url: `https://eammu.com/og/work-visa-${destSlug}.jpg`, width: 1200, height: 630, alt: `${natName} Work Visa for ${destData.name}` }],
    },
    twitter: { card: "summary_large_image", title, description },
    alternates: { canonical },
    robots: {
      index: true, follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    },
    other: {
      "article:published_time": "2025-01-01",
      "article:modified_time": new Date().toISOString().split("T")[0],
    },
  };
}

// ── DEFAULT EXPORT ─────────────────────────────────────────────────────────
export default async function WorkVisaSlugSeo({ params }) {
  const resolvedParams = await params;
  const slug    = resolvedParams?.slug || "";
  const [natSlug, destSlug] = parseSlug(slug);

  const countries = await getCountries();
  const natName   = toName(natSlug, countries);
  const destData  = getDestData(destSlug);

  return (
    <>
      <JsonLd natName={natName} destData={destData} slug={slug} />
      <WorkVisaSlugClient params={resolvedParams} />


    </>
  );
}