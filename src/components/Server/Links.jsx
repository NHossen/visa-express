// Links.jsx — SEO Internal Linking Server Component (Next.js)
// Pure server component — zero client JS

import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const VISA_TYPES = [
  {
    label: "Tourist Visa",
    slug: "tourist-visa",
    icon: "✈️",
    description: "Explore destinations worldwide",
    links: [
      { label: "Albania Tourist Visa", href: "/visa/tourist-visa/albania" },
      { label: "Lithuania Tourist Visa", href: "/visa/tourist-visa/lithuania" },
      { label: "Armenia Tourist Visa", href: "/visa/tourist-visa/armenia" },
      { label: "Bangladesh Tourist Visa", href: "/visa/tourist-visa/bangladesh" },
      { label: "India Tourist Visa", href: "/visa/tourist-visa/india" },
      { label: "Nigeria Tourist Visa", href: "/visa/tourist-visa/nigeria" },
      { label: "Ghana Tourist Visa", href: "/visa/tourist-visa/ghana" },
      { label: "Pakistan Tourist Visa", href: "/visa/tourist-visa/pakistan" },
      { label: "Philippines Tourist Visa", href: "/visa/tourist-visa/philippines" },
      { label: "Egypt Tourist Visa", href: "/visa/tourist-visa/egypt" },
    ],
  },
  {
    label: "Student Visa",
    slug: "student-visa",
    icon: "🎓",
    description: "Study abroad with ease",
    links: [
      { label: "Armenia Student Visa", href: "/visa/student-visa/armenia" },
      { label: "Albania Student Visa", href: "/visa/student-visa/albania" },
      { label: "Bangladesh Student Visa", href: "/visa/student-visa/bangladesh" },
      { label: "India Student Visa", href: "/visa/student-visa/india" },
      { label: "Nigeria Student Visa", href: "/visa/student-visa/nigeria" },
      { label: "Ghana Student Visa", href: "/visa/student-visa/ghana" },
      { label: "Pakistan Student Visa", href: "/visa/student-visa/pakistan" },
      { label: "Nepal Student Visa", href: "/visa/student-visa/nepal" },
      { label: "Sri Lanka Student Visa", href: "/visa/student-visa/sri-lanka" },
      { label: "Philippines Student Visa", href: "/visa/student-visa/philippines" },
    ],
  },
  {
    label: "Work Visa",
    slug: "work-visa",
    icon: "💼",
    description: "Work legally in any country",
    links: [
      { label: "India to Canada Work Visa", href: "/visa/work-visa/india-to-canada" },
      { label: "Bangladesh to Canada Work Visa", href: "/visa/work-visa/bangladesh-to-canada" },
      { label: "Nigeria to Canada Work Visa", href: "/visa/work-visa/nigeria-to-canada" },
      { label: "Ghana to Canada Work Visa", href: "/visa/work-visa/ghana-to-canada" },
      { label: "India to UK Work Visa", href: "/visa/work-visa/india-to-united-kingdom" },
      { label: "Philippines to UAE Work Visa", href: "/visa/work-visa/philippines-to-united-arab-emirates" },
      { label: "Pakistan to UAE Work Visa", href: "/visa/work-visa/pakistan-to-united-arab-emirates" },
      { label: "Nepal to UAE Work Visa", href: "/visa/work-visa/nepal-to-united-arab-emirates" },
      { label: "Bangladesh to UAE Work Visa", href: "/visa/work-visa/bangladesh-to-united-arab-emirates" },
      { label: "India to Australia Work Visa", href: "/visa/work-visa/india-to-australia" },
    ],
  },
  {
    label: "Business Visa",
    slug: "business-visa",
    icon: "🏢",
    description: "Attend meetings & conferences",
    links: [
      { label: "Bangladesh to Singapore Business Visa", href: "/visa/business-visa/bangladesh-to-singapore" },
      { label: "India to USA Business Visa", href: "/visa/business-visa/india-to-united-states" },
      { label: "Nigeria to UK Business Visa", href: "/visa/business-visa/nigeria-to-united-kingdom" },
      { label: "Ghana to USA Business Visa", href: "/visa/business-visa/ghana-to-united-states" },
      { label: "Pakistan to UAE Business Visa", href: "/visa/business-visa/pakistan-to-united-arab-emirates" },
      { label: "Albania to Germany Business Visa", href: "/visa/business-visa/albania-to-germany" },
      { label: "Armenia to Russia Business Visa", href: "/visa/business-visa/armenia-to-russia" },
      { label: "India to Canada Business Visa", href: "/visa/business-visa/india-to-canada" },
      { label: "Bangladesh to Malaysia Business Visa", href: "/visa/business-visa/bangladesh-to-malaysia" },
      { label: "Nepal to India Business Visa", href: "/visa/business-visa/nepal-to-india" },
    ],
  },
  {
    label: "Transit Visa",
    slug: "transit-visa",
    icon: "🔄",
    description: "Smooth layovers & connections",
    links: [
      { label: "India Transit UAE", href: "/visa/transit-visa/india-transit-at-united-arab-emirates" },
      { label: "Bangladesh Transit UAE", href: "/visa/transit-visa/bangladesh-transit-at-united-arab-emirates" },
      { label: "Pakistan Transit UAE", href: "/visa/transit-visa/pakistan-transit-at-united-arab-emirates" },
      { label: "Nigeria Transit UK", href: "/visa/transit-visa/nigeria-transit-at-united-kingdom" },
      { label: "Ghana Transit UK", href: "/visa/transit-visa/ghana-transit-at-united-kingdom" },
      { label: "India Transit UK", href: "/visa/transit-visa/india-transit-at-united-kingdom" },
      { label: "Albania Transit Germany", href: "/visa/transit-visa/albania-transit-at-germany" },
      { label: "Armenia Transit Russia", href: "/visa/transit-visa/armenia-transit-at-russia" },
      { label: "Nepal Transit India", href: "/visa/transit-visa/nepal-transit-at-india" },
      { label: "Philippines Transit Japan", href: "/visa/transit-visa/philippines-transit-at-japan" },
    ],
  },
  {
    label: "E-Visa",
    slug: "e-visa",
    icon: "💻",
    description: "Apply online, travel faster",
    links: [
      { label: "Albania E-Visa", href: "/visa/e-visa/albania" },
      { label: "Armenia E-Visa", href: "/visa/e-visa/armenia" },
      { label: "Bangladesh E-Visa", href: "/visa/e-visa/bangladesh" },
      { label: "India E-Visa", href: "/visa/e-visa/india" },
      { label: "Nigeria E-Visa", href: "/visa/e-visa/nigeria" },
      { label: "Pakistan E-Visa", href: "/visa/e-visa/pakistan" },
      { label: "Nepal E-Visa", href: "/visa/e-visa/nepal" },
      { label: "Philippines E-Visa", href: "/visa/e-visa/philippines" },
      { label: "Ghana E-Visa", href: "/visa/e-visa/ghana" },
      { label: "Sri Lanka E-Visa", href: "/visa/e-visa/sri-lanka" },
    ],
  },
];

const COUNTRY_HUBS = [
  {
    label: "Dubai Residents",
    href: "/visa/dubai-residents",
    icon: "🇦🇪",
    links: [
      { label: "Armenia Visa for Dubai Residents", href: "/visa/dubai-residents/armenia" },
      { label: "Albania Visa for Dubai Residents", href: "/visa/dubai-residents/albania" },
      { label: "India Visa for Dubai Residents", href: "/visa/dubai-residents/india" },
      { label: "Pakistan Visa for Dubai Residents", href: "/visa/dubai-residents/pakistan" },
      { label: "Bangladesh Visa for Dubai Residents", href: "/visa/dubai-residents/bangladesh" },
      { label: "Philippines Visa for Dubai Residents", href: "/visa/dubai-residents/philippines" },
      { label: "Nepal Visa for Dubai Residents", href: "/visa/dubai-residents/nepal" },
      { label: "Nigeria Visa for Dubai Residents", href: "/visa/dubai-residents/nigeria" },
    ],
  },
  {
    label: "India",
    href: "/visa/india",
    icon: "🇮🇳",
    links: [
      { label: "India to USA Visa", href: "/visa/india/united-states" },
      { label: "India to UK Visa", href: "/visa/india/united-kingdom" },
      { label: "India to Canada Visa", href: "/visa/india/canada" },
      { label: "India to Australia Visa", href: "/visa/india/australia" },
      { label: "India to Germany Visa", href: "/visa/india/germany" },
      { label: "India to Singapore Visa", href: "/visa/india/singapore" },
      { label: "India to UAE Visa", href: "/visa/india/united-arab-emirates" },
      { label: "India to France Visa", href: "/visa/india/france" },
    ],
  },
  {
    label: "Nigeria",
    href: "/visa/nigeria",
    icon: "🇳🇬",
    links: [
      { label: "Nigeria to USA Visa", href: "/visa/nigeria/united-states" },
      { label: "Nigeria to UK Visa", href: "/visa/nigeria/united-kingdom" },
      { label: "Nigeria to Canada Visa", href: "/visa/nigeria/canada" },
      { label: "Nigeria to Germany Visa", href: "/visa/nigeria/germany" },
      { label: "Nigeria to Australia Visa", href: "/visa/nigeria/australia" },
      { label: "Nigeria to UAE Visa", href: "/visa/nigeria/united-arab-emirates" },
      { label: "Nigeria to France Visa", href: "/visa/nigeria/france" },
      { label: "Nigeria to Italy Visa", href: "/visa/nigeria/italy" },
    ],
  },
  {
    label: "Ghana",
    href: "/visa/ghana",
    icon: "🇬🇭",
    links: [
      { label: "Ghana to Albania Visa", href: "/visa/ghana/albania" },
      { label: "Ghana to USA Visa", href: "/visa/ghana/united-states" },
      { label: "Ghana to UK Visa", href: "/visa/ghana/united-kingdom" },
      { label: "Ghana to Canada Visa", href: "/visa/ghana/canada" },
      { label: "Ghana to Germany Visa", href: "/visa/ghana/germany" },
      { label: "Ghana to UAE Visa", href: "/visa/ghana/united-arab-emirates" },
      { label: "Ghana to Australia Visa", href: "/visa/ghana/australia" },
      { label: "Ghana to France Visa", href: "/visa/ghana/france" },
    ],
  },
  {
    label: "Bangladesh",
    href: "/visa/bangladesh-to-canada",
    icon: "🇧🇩",
    links: [
      { label: "Bangladesh to Canada Visa", href: "/visa/bangladesh-to-canada" },
      { label: "Bangladesh to Singapore Business Visa", href: "/visa/business-visa/bangladesh-to-singapore" },
      { label: "Bangladesh to UAE Work Visa", href: "/visa/work-visa/bangladesh-to-united-arab-emirates" },
      { label: "Bangladesh to UK Visa", href: "/visa/bangladesh-to-united-kingdom" },
      { label: "Bangladesh to USA Visa", href: "/visa/bangladesh-to-united-states" },
      { label: "Bangladesh to Australia Visa", href: "/visa/bangladesh-to-australia" },
      { label: "Bangladesh to Germany Visa", href: "/visa/bangladesh-to-germany" },
      { label: "Bangladesh to Malaysia Visa", href: "/visa/bangladesh-to-malaysia" },
    ],
  },
];

const POPULAR_DESTINATIONS = [
  { label: "USA Visa Guide", href: "/visa/tourist-visa/united-states", flag: "🇺🇸" },
  { label: "Canada Visa Guide", href: "/visa/tourist-visa/canada", flag: "🇨🇦" },
  { label: "UK Visa Guide", href: "/visa/tourist-visa/united-kingdom", flag: "🇬🇧" },
  { label: "Australia Visa Guide", href: "/visa/tourist-visa/australia", flag: "🇦🇺" },
  { label: "Germany Visa Guide", href: "/visa/tourist-visa/germany", flag: "🇩🇪" },
  { label: "France Visa Guide", href: "/visa/tourist-visa/france", flag: "🇫🇷" },
  { label: "Japan Visa Guide", href: "/visa/tourist-visa/japan", flag: "🇯🇵" },
  { label: "UAE Visa Guide", href: "/visa/tourist-visa/united-arab-emirates", flag: "🇦🇪" },
  { label: "Singapore Visa Guide", href: "/visa/tourist-visa/singapore", flag: "🇸🇬" },
  { label: "Italy Visa Guide", href: "/visa/tourist-visa/italy", flag: "🇮🇹" },
  { label: "Netherlands Visa Guide", href: "/visa/tourist-visa/netherlands", flag: "🇳🇱" },
  { label: "Spain Visa Guide", href: "/visa/tourist-visa/spain", flag: "🇪🇸" },
];

const SCHENGEN_COUNTRIES = [
  { label: "Germany Schengen Visa", href: "/schengen-visa/germany" },
  { label: "France Schengen Visa", href: "/schengen-visa/france" },
  { label: "Italy Schengen Visa", href: "/schengen-visa/italy" },
  { label: "Spain Schengen Visa", href: "/schengen-visa/spain" },
  { label: "Netherlands Schengen Visa", href: "/schengen-visa/netherlands" },
  { label: "Belgium Schengen Visa", href: "/schengen-visa/belgium" },
  { label: "Austria Schengen Visa", href: "/schengen-visa/austria" },
  { label: "Sweden Schengen Visa", href: "/schengen-visa/sweden" },
  { label: "Czech Republic Schengen Visa", href: "/schengen-visa/czech-republic" },
  { label: "Greece Schengen Visa", href: "/schengen-visa/greece" },
];

const TOOLS = [
  {
    label: "Visa Processing Time Tracker",
    href: "/visa-processing-time-tracker",
    icon: "⏱️",
    desc: "Real-time visa processing durations by country and type",
  },
  {
    label: "Visa Rejection Rate Stats",
    href: "/visa-rejection",
    icon: "📊",
    desc: "Rejection statistics to plan smarter applications",
  },
  {
    label: "Schengen Visa Complete Guide",
    href: "/schengen-visa",
    icon: "🇪🇺",
    desc: "Requirements, costs & tips for all 27 Schengen nations",
  },
  {
    label: "USA Scholarships",
    href: "/scholarships/united-states",
    icon: "🏅",
    desc: "Scholarships & funding for US university admission",
  },
  {
    label: "All Scholarships",
    href: "/scholarships",
    icon: "📚",
    desc: "Global scholarship database for international students",
  },
  {
    label: "Visa News & Updates",
    href: "/visa-news",
    icon: "📰",
    desc: "Latest visa policy changes and immigration news",
  },
  {
    label: "Visa Checklist Generator",
    href: "/visa-resources/visa-checklist-generator",
    icon: "✅",
    desc: "Auto-generate a custom checklist for your application",
  },
  {
    label: "Visa Document Generator",
    href: "/visa-resources/visa-document-generator",
    icon: "📄",
    desc: "Generate required documents for any visa type",
  },
  {
    label: "Visa API",
    href: "/visa-api",
    icon: "⚡",
    desc: "Developer API for visa data and requirements",
  },
];

const POPULAR_PROCESSING_TIMES = [
  { label: "Australia Visa Processing for Albania (Sticker)", href: "/visa-processing-time-tracker/australia-national-visa-processing-time-for-albania?type=sticker" },
  { label: "Australia E-Visa Processing for Albania", href: "/visa-processing-time-tracker/australia-national-visa-processing-time-for-albania?type=e-visa" },
  { label: "USA Visa Processing for India", href: "/visa-processing-time-tracker/usa-visa-processing-time-for-india" },
  { label: "Canada Visa Processing for Bangladesh", href: "/visa-processing-time-tracker/canada-visa-processing-time-for-bangladesh" },
  { label: "UK Visa Processing for Nigeria", href: "/visa-processing-time-tracker/uk-visa-processing-time-for-nigeria" },
  { label: "Germany Visa Processing for India", href: "/visa-processing-time-tracker/germany-visa-processing-time-for-india" },
  { label: "Schengen Visa Processing for Pakistan", href: "/visa-processing-time-tracker/schengen-visa-processing-time-for-pakistan" },
  { label: "UAE Visa Processing for Philippines", href: "/visa-processing-time-tracker/uae-visa-processing-time-for-philippines" },
];

const POPULAR_REJECTION_RATES = [
  { label: "Albania Student Visa Rejection (Anguilla)", href: "/visa-rejection/albania-visa-rejection-rate-for-anguilla?type=student" },
  { label: "Bangladesh Transit Visa Rejection (Albania)", href: "/visa-rejection/bangladesh-visa-rejection-rate-for-albania?type=transit" },
  { label: "Bangladesh Work Visa Rejection (Albania)", href: "/visa-rejection/bangladesh-visa-rejection-rate-for-albania?type=work" },
  { label: "India Tourist Visa Rejection (USA)", href: "/visa-rejection/india-visa-rejection-rate-for-united-states?type=tourist" },
  { label: "Nigeria Student Visa Rejection (UK)", href: "/visa-rejection/nigeria-visa-rejection-rate-for-united-kingdom?type=student" },
  { label: "Ghana Business Visa Rejection (Germany)", href: "/visa-rejection/ghana-visa-rejection-rate-for-germany?type=business" },
  { label: "Pakistan Work Visa Rejection (Canada)", href: "/visa-rejection/pakistan-visa-rejection-rate-for-canada?type=work" },
];

const LATEST_NEWS = [
  { label: "UK Skilled Worker Salary Increase 2026", href: "/visa-news/uk-skilled-worker-salary-increase-2026" },
  { label: "Schengen Digital Nomad Visa EU 2026", href: "/visa-news/schengen-digital-nomad-visa-eu-2026" },
  { label: "Canada Express Entry Healthcare Draw 2026", href: "/visa-news/canada-express-entry-healthcare-draw-2026" },
];

const SCHOLARSHIPS = [
  { label: "USA Scholarships", href: "/scholarships/united-states" },
  { label: "UK Scholarships", href: "/scholarships/united-kingdom" },
  { label: "Canada Scholarships", href: "/scholarships/canada" },
  { label: "Australia Scholarships", href: "/scholarships/australia" },
  { label: "Germany Scholarships", href: "/scholarships/germany" },
  { label: "Netherlands Scholarships", href: "/scholarships/netherlands" },
  { label: "France Scholarships", href: "/scholarships/france" },
  { label: "Sweden Scholarships", href: "/scholarships/sweden" },
  { label: "All Scholarships", href: "/scholarships" },
];

const VISA_RESOURCES = [
  { label: "Visa Checklist", href: "/visa-resources/visa-checklist" },
  { label: "Checklist Generator", href: "/visa-resources/visa-checklist-generator" },
  { label: "Document Generator", href: "/visa-resources/visa-document-generator" },
  { label: "All Visa Resources", href: "/visa-resources" },
];

const FOOTER_LINKS = [
  { label: "All Visas", href: "/visa" },
  { label: "Schengen Visa", href: "/schengen-visa" },
  { label: "E-Visa", href: "/visa/e-visa" },
  { label: "Tourist Visa", href: "/visa/tourist-visa" },
  { label: "Student Visa", href: "/visa/student-visa" },
  { label: "Work Visa", href: "/visa/work-visa" },
  { label: "Business Visa", href: "/visa/business-visa" },
  { label: "Transit Visa", href: "/visa/transit-visa" },
  { label: "Dubai Residents", href: "/visa/dubai-residents" },
  { label: "Scholarships", href: "/scholarships" },
  { label: "Visa News", href: "/visa-news" },
  { label: "Processing Times", href: "/visa-processing-time-tracker" },
  { label: "Rejection Rates", href: "/visa-rejection" },
  { label: "Visa API", href: "/visa-api" },
  { label: "Visa Resources", href: "/visa-resources" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
];

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function SectionHeading({ title, subtitle, href, linkLabel }) {
  return (
    <div className="flex items-end justify-between mb-5 gap-4">
      <div>
        <h2 className="text-base font-semibold text-gray-800 tracking-tight leading-snug">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">{subtitle}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="shrink-0 text-xs text-gray-400 hover:text-gray-700 border border-gray-200 hover:border-gray-400 rounded-full px-3 py-1 transition-all duration-150 whitespace-nowrap"
        >
          {linkLabel || "View all →"}
        </Link>
      )}
    </div>
  );
}

function VisaTypeCard({ type }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 hover:border-gray-300 hover:shadow-sm transition-all duration-200 flex flex-col group">
      <Link href={`/visa/${type.slug}`} className="flex items-center gap-2 mb-1">
        <span className="text-lg" aria-hidden="true">{type.icon}</span>
        <span className="text-sm font-semibold text-gray-800 group-hover:text-gray-950 transition-colors">
          {type.label}
        </span>
      </Link>
      <p className="text-xs text-gray-400 mb-3">{type.description}</p>
      <ul className="space-y-1.5 border-t border-gray-50 pt-3 flex-1">
        {type.links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-xs text-gray-500 hover:text-gray-800 hover:underline underline-offset-2 transition-colors flex items-start gap-1"
            >
              <span className="text-gray-300 mt-px" aria-hidden="true">›</span>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      <Link
        href={`/visa/${type.slug}`}
        className="mt-3 text-xs text-gray-400 hover:text-gray-700 transition-colors"
      >
        All {type.label} guides →
      </Link>
    </div>
  );
}

function ToolCard({ tool }) {
  return (
    <Link
      href={tool.href}
      className="group flex items-start gap-3 bg-white border border-gray-100 rounded-2xl p-4 hover:border-gray-300 hover:shadow-sm transition-all duration-200"
    >
      <span className="text-2xl mt-0.5 shrink-0" aria-hidden="true">{tool.icon}</span>
      <div>
        <div className="text-sm font-semibold text-gray-800 group-hover:text-gray-950 transition-colors leading-snug">
          {tool.label}
        </div>
        <div className="text-xs text-gray-400 mt-1 leading-relaxed">{tool.desc}</div>
      </div>
    </Link>
  );
}

function CountryHubCard({ hub }) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 hover:border-gray-200 transition-all duration-200">
      <Link
        href={hub.href}
        className="flex items-center gap-2 mb-3 group"
      >
        <span className="text-lg" aria-hidden="true">{hub.icon}</span>
        <span className="text-sm font-semibold text-gray-800 group-hover:text-gray-950 transition-colors">
          {hub.label} Visas
        </span>
      </Link>
      <ul className="space-y-1.5">
        {hub.links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-xs text-gray-500 hover:text-gray-800 hover:underline underline-offset-2 transition-colors flex items-start gap-1"
            >
              <span className="text-gray-300 mt-px" aria-hidden="true">›</span>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DestinationPill({ dest }) {
  return (
    <Link
      href={dest.href}
      className="inline-flex items-center gap-1.5 bg-white border border-gray-100 hover:border-gray-300 rounded-full px-3.5 py-1.5 text-xs text-gray-600 hover:text-gray-900 transition-all duration-150 hover:shadow-sm"
    >
      <span aria-hidden="true">{dest.flag}</span>
      {dest.label}
    </Link>
  );
}

function PillLink({ href, children }) {
  return (
    <Link
      href={href}
      className="inline-flex text-xs text-gray-500 hover:text-gray-800 bg-gray-50 hover:bg-gray-100 border border-gray-100 hover:border-gray-200 rounded-full px-3 py-1.5 transition-all duration-150 leading-none"
    >
      {children}
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────

export default function Links() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        name: "Visa Types on Visa Express Hub",
        description: "All visa categories available on Visa Express Hub",
        itemListElement: VISA_TYPES.map((v, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: v.label,
          url: `https://visaexpresshub.com/visa/${v.slug}`,
        })),
      },
      {
        "@type": "ItemList",
        name: "Visa Tools and Resources",
        itemListElement: TOOLS.map((t, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: t.label,
          url: `https://visaexpresshub.com${t.href}`,
        })),
      },
      {
        "@type": "ItemList",
        name: "Country Visa Hubs",
        itemListElement: COUNTRY_HUBS.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: `${c.label} Visas`,
          url: `https://visaexpresshub.com${c.href}`,
        })),
      },
      {
        "@type": "ItemList",
        name: "Latest Visa News",
        itemListElement: LATEST_NEWS.map((n, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: n.label,
          url: `https://visaexpresshub.com${n.href}`,
        })),
      },
    ],
  };

  return (
    <section
      aria-label="Explore Visa Types, Country Hubs, Tools and Resources"
      className="bg-white py-16 px-4"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="max-w-7xl mx-auto space-y-16">

        {/* ── 1. VISA TYPES ──────────────────────────────────────────── */}
        <div id="visa-types">
          <SectionHeading
            title="Explore All Visa Types"
            subtitle="Find the right visa for your journey — tourist, work, student, business, transit, and e-visa guides"
            href="/visa"
            linkLabel="Browse all visas →"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
            {VISA_TYPES.map((type) => (
              <VisaTypeCard key={type.slug} type={type} />
            ))}
          </div>
        </div>

        {/* ── 2. POPULAR DESTINATIONS ────────────────────────────────── */}
        <div id="popular-destinations">
          <SectionHeading
            title="Popular Visa Destinations"
            subtitle="Top destination guides from anywhere in the world"
            href="/visa/tourist-visa"
            linkLabel="All destinations →"
          />
          <div className="flex flex-wrap gap-2">
            {POPULAR_DESTINATIONS.map((d) => (
              <DestinationPill key={d.href} dest={d} />
            ))}
          </div>
        </div>

        {/* ── 3. COUNTRY HUBS ────────────────────────────────────────── */}
        <div id="country-hubs">
          <SectionHeading
            title="Visa Guides by Country of Passport"
            subtitle="Country-specific visa requirements, eligibility, and application processes"
            href="/visa"
            linkLabel="All country hubs →"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {COUNTRY_HUBS.map((hub) => (
              <CountryHubCard key={hub.href} hub={hub} />
            ))}
          </div>
        </div>

        {/* ── 4. TOOLS & RESOURCES ───────────────────────────────────── */}
        <div id="visa-tools">
          <SectionHeading
            title="Visa Tools & Resources"
            subtitle="Everything you need to prepare, track, and successfully apply"
            href="/visa-resources"
            linkLabel="All resources →"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TOOLS.map((tool) => (
              <ToolCard key={tool.href} tool={tool} />
            ))}
          </div>
        </div>

        {/* ── 5. SCHENGEN + SCHOLARSHIPS (two-col) ───────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Schengen */}
          <div id="schengen-countries">
            <SectionHeading
              title="Schengen Visa by Country"
              href="/schengen-visa"
              linkLabel="Full Schengen guide →"
            />
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {SCHENGEN_COUNTRIES.map((c) => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="text-xs text-gray-500 hover:text-gray-800 hover:underline underline-offset-2 transition-colors"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
              <Link
                href="/schengen-visa"
                className="inline-flex items-center gap-1 mt-4 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors"
              >
                🇪🇺 Complete Schengen Visa Guide →
              </Link>
            </div>
          </div>

          {/* Scholarships */}
          <div id="scholarships">
            <SectionHeading
              title="Scholarships by Country"
              href="/scholarships"
              linkLabel="All scholarships →"
            />
            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {SCHOLARSHIPS.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="text-xs text-gray-500 hover:text-gray-800 hover:underline underline-offset-2 transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── 6. PROCESSING TIMES + REJECTION RATES ──────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div id="processing-times">
            <SectionHeading
              title="Visa Processing Time Highlights"
              href="/visa-processing-time-tracker"
              linkLabel="Track all times →"
            />
            <ul className="space-y-2.5">
              {POPULAR_PROCESSING_TIMES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-start gap-2 group"
                  >
                    <span className="text-gray-300 text-xs mt-1 shrink-0" aria-hidden="true">⏱</span>
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 group-hover:underline underline-offset-2 transition-colors leading-snug">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div id="rejection-rates">
            <SectionHeading
              title="Visa Rejection Rate Data"
              href="/visa-rejection"
              linkLabel="See all stats →"
            />
            <ul className="space-y-2.5">
              {POPULAR_REJECTION_RATES.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-start gap-2 group"
                  >
                    <span className="text-gray-300 text-xs mt-1 shrink-0" aria-hidden="true">📊</span>
                    <span className="text-sm text-gray-600 group-hover:text-gray-900 group-hover:underline underline-offset-2 transition-colors leading-snug">
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── 7. LATEST NEWS ─────────────────────────────────────────── */}
        <div id="visa-news">
          <SectionHeading
            title="Latest Visa News & Policy Updates"
            subtitle="Stay current on visa rule changes, new routes, and immigration developments"
            href="/visa-news"
            linkLabel="All news →"
          />
          <ul className="divide-y divide-gray-50 border border-gray-100 rounded-2xl overflow-hidden">
            {LATEST_NEWS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center justify-between px-5 py-4 bg-white hover:bg-gray-50 group transition-colors duration-150"
                >
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-950 transition-colors leading-snug">
                    {item.label}
                  </span>
                  <span className="text-gray-300 group-hover:text-gray-500 text-xs ml-4 shrink-0 transition-colors" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── 8. DOCUMENT TOOLS ──────────────────────────────────────── */}
        <div id="visa-document-tools">
          <SectionHeading
            title="Visa Document Resources"
            subtitle="Generate checklists and documents tailored to your specific application"
          />
          <div className="flex flex-wrap gap-2">
            {VISA_RESOURCES.map((r) => (
              <PillLink key={r.href} href={r.href}>
                {r.label}
              </PillLink>
            ))}
          </div>
        </div>

        {/* ── 9. SEO FOOTER NAV ───────────────────────────────────────── */}
        <nav aria-label="Site-wide quick navigation" className="border-t border-gray-100 pt-8">
          <p className="text-xs font-semibold text-gray-300 uppercase tracking-widest mb-4">
            Quick Links
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-xs text-gray-400 hover:text-gray-700 hover:underline underline-offset-2 transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </section>
  );
}