// ─── workVisaSeo.js ───────────────────────────────────────────────────────────
// Dynamic SEO metadata generator for Work Visa pages.
// Used by both the main /visa/work-visa page and all /visa/work-visa/[slug] pages.
// ─────────────────────────────────────────────────────────────────────────────

const SITE_URL = 'https://www.workpass.guide';
const SITE_NAME = 'WorkPass.Guide';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og/work-visa-default.png`;

// ── Destination-specific data for richer SEO copy ─────────────────────────────
const DESTINATION_META = {
  'canada': {
    visaName: 'Express Entry & LMIA Work Permit',
    processing: '6–12 months',
    fee: 'CAD 155',
    salaryThreshold: 'CAD 56,000+',
    prPathway: true,
    highlight: 'Express Entry points-based system with PR pathway',
    schemaType: 'Country',
  },
  'united kingdom': {
    visaName: 'Skilled Worker Visa',
    processing: '3–8 weeks',
    fee: '£610–£1,220',
    salaryThreshold: '£26,200+ (or going rate)',
    prPathway: true,
    highlight: 'Points-based system, sponsor licence required',
    schemaType: 'Country',
  },
  'united arab emirates': {
    visaName: 'UAE Employment Visa',
    processing: '2–4 weeks',
    fee: 'AED 300–1,000',
    salaryThreshold: 'No minimum',
    prPathway: false,
    highlight: 'Tax-free income, employer-tied kafala system',
    schemaType: 'Country',
  },
  'germany': {
    visaName: 'EU Blue Card / Skilled Worker Visa',
    processing: '1–3 months',
    fee: '€75–€100',
    salaryThreshold: '€45,300+ (Blue Card)',
    prPathway: true,
    highlight: 'EU Blue Card & new Opportunity Card for job seekers',
    schemaType: 'Country',
  },
  'australia': {
    visaName: 'Temporary Skill Shortage Visa (482)',
    processing: '2–4 months',
    fee: 'AUD 1,320–3,035',
    salaryThreshold: 'TSMIT AUD 70,000+',
    prPathway: true,
    highlight: 'Points test required, skills assessment mandatory',
    schemaType: 'Country',
  },
  'saudi arabia': {
    visaName: 'Iqama Work Permit',
    processing: '2–6 weeks',
    fee: 'SAR 300–800',
    salaryThreshold: 'No minimum',
    prPathway: false,
    highlight: 'Vision 2030 jobs boom, employer-sponsored only',
    schemaType: 'Country',
  },
  'qatar': {
    visaName: 'Work Permit (QID)',
    processing: '2–4 weeks',
    fee: 'QAR 500–1,000',
    salaryThreshold: 'No minimum',
    prPathway: false,
    highlight: 'High-demand sectors, reformed kafala system',
    schemaType: 'Country',
  },
  'united states': {
    visaName: 'H-1B / L-1 / O-1 Work Visa',
    processing: '3–6 months',
    fee: '$460–$4,500+',
    salaryThreshold: 'Prevailing wage (varies by SOC)',
    prPathway: true,
    highlight: 'H-1B lottery system, STEM priority, green card pathway',
    schemaType: 'Country',
  },
  'singapore': {
    visaName: 'Employment Pass (EP)',
    processing: '3–8 weeks',
    fee: 'SGD 105',
    salaryThreshold: 'SGD 5,000+/month',
    prPathway: true,
    highlight: 'Employment Pass, S Pass, and PR pathway available',
    schemaType: 'Country',
  },
  'new zealand': {
    visaName: 'Accredited Employer Work Visa (AEWV)',
    processing: '4–8 weeks',
    fee: 'NZD 700',
    salaryThreshold: 'NZD 29.66/hour (median wage)',
    prPathway: true,
    highlight: 'Accredited employer scheme, skills shortage lists',
    schemaType: 'Country',
  },
};

// ── Nationality-specific data ──────────────────────────────────────────────────
const NATIONALITY_META = {
  'india': {
    demonym: 'Indian',
    languageTest: 'IELTS Academic/General',
    credentialBody: 'WES (Canada), UK ENIC (UK), AEI-NOOSR (Australia)',
    popularDest: 'Canada, UAE, UK, USA, Germany',
    topSectors: 'IT, engineering, healthcare, finance',
  },
  'philippines': {
    demonym: 'Filipino',
    languageTest: 'IELTS General / OET (healthcare)',
    credentialBody: 'WES (Canada), POEA clearance required',
    popularDest: 'UAE, Saudi Arabia, Qatar, Canada, UK',
    topSectors: 'Healthcare, hospitality, construction, domestic work',
  },
  'nigeria': {
    demonym: 'Nigerian',
    languageTest: 'IELTS Academic/General',
    credentialBody: 'WES (Canada), UK ENIC, NOOSR',
    popularDest: 'UK, Canada, UAE, Germany, USA',
    topSectors: 'Healthcare, engineering, IT, finance',
  },
  'pakistan': {
    demonym: 'Pakistani',
    languageTest: 'IELTS Academic/General',
    credentialBody: 'WES (Canada), UK ENIC (UK)',
    popularDest: 'UAE, Saudi Arabia, UK, Canada, Qatar',
    topSectors: 'Construction, engineering, IT, healthcare',
  },
  'bangladesh': {
    demonym: 'Bangladeshi',
    languageTest: 'IELTS General',
    credentialBody: 'WES (Canada), UK ENIC',
    popularDest: 'UAE, Qatar, Saudi Arabia, Malaysia, UK',
    topSectors: 'Construction, garments, IT, healthcare',
  },
  'mexico': {
    demonym: 'Mexican',
    languageTest: 'TOEFL iBT / IELTS',
    credentialBody: 'NACES member organizations (USA)',
    popularDest: 'USA, Canada, Spain, Germany, UK',
    topSectors: 'Agriculture, construction, hospitality, manufacturing',
  },
  'kenya': {
    demonym: 'Kenyan',
    languageTest: 'IELTS General',
    credentialBody: 'WES (Canada), UK ENIC',
    popularDest: 'UAE, UK, Canada, Saudi Arabia, Qatar',
    topSectors: 'Healthcare, IT, finance, hospitality',
  },
  'ghana': {
    demonym: 'Ghanaian',
    languageTest: 'IELTS Academic/General',
    credentialBody: 'WES (Canada), UK ENIC',
    popularDest: 'UK, Canada, UAE, USA, Germany',
    topSectors: 'Healthcare, engineering, finance, education',
  },
};

// ── Gulf countries list ────────────────────────────────────────────────────────
export const GULF_COUNTRIES = [
  'united arab emirates', 'saudi arabia', 'qatar',
  'kuwait', 'bahrain', 'oman',
];

// ── Helper: capitalize words ──────────────────────────────────────────────────
export const capWords = (str = '') =>
  str.replace(/\b\w/g, (l) => l.toUpperCase());

// ── Parse slug → nationality / destination ────────────────────────────────────
export function parseWorkVisaSlug(slug = '') {
  const decoded = decodeURIComponent(slug).replace(/-/g, ' ');
  const parts = decoded.split(' to ');
  const nationality = parts[0]?.trim() || 'Origin';
  const destination = parts[1]?.trim() || 'Destination';
  return {
    nationality,
    destination,
    natCap: capWords(nationality),
    destCap: capWords(destination),
    natKey: nationality.toLowerCase(),
    destKey: destination.toLowerCase(),
    isGulf: GULF_COUNTRIES.includes(destination.toLowerCase()),
  };
}

// ── Get destination-specific data ─────────────────────────────────────────────
export function getDestinationData(destKey) {
  return DESTINATION_META[destKey] || {
    visaName: 'Work Visa / Work Permit',
    processing: '4–12 weeks',
    fee: 'Varies by country',
    salaryThreshold: 'Varies by occupation',
    prPathway: true,
    highlight: 'Employer-sponsored work authorisation',
    schemaType: 'Country',
  };
}

// ── Get nationality-specific data ─────────────────────────────────────────────
export function getNationalityData(natKey) {
  return NATIONALITY_META[natKey] || {
    demonym: capWords(natKey),
    languageTest: 'IELTS General / TOEFL iBT',
    credentialBody: 'Varies by destination',
    popularDest: 'Varies',
    topSectors: 'Varies by profession',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE METADATA — /visa/work-visa
// ─────────────────────────────────────────────────────────────────────────────
export function generateWorkVisaIndexMetadata() {
  const title = 'Work Visa & Work Permit Requirements 2026 — By Nationality | WorkPass.Guide';
  const description =
    'Free work visa and work permit guides for every nationality and destination. ' +
    'Covers employer sponsorship, LMIA, Express Entry, EU Blue Card, Skilled Worker Visa, ' +
    'required documents, processing times, and official portals. Updated May 2026.';

  return {
    title,
    description,
    keywords: [
      'work visa requirements 2026',
      'work permit by nationality',
      'employer sponsored work visa',
      'skilled worker visa',
      'LMIA Canada work permit',
      'EU Blue Card requirements',
      'UK Skilled Worker Visa',
      'UAE employment visa',
      'work visa documents checklist',
      'how to apply for work visa',
      'work visa guide',
      'international work permit',
    ].join(', '),
    alternates: {
      canonical: `${SITE_URL}/visa/work-visa`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/visa/work-visa`,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/og/work-visa-guide.png`,
          width: 1200,
          height: 630,
          alt: 'Work Visa & Work Permit Guide 2026 — WorkPass.Guide',
        },
      ],
      type: 'website',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/og/work-visa-guide.png`],
      site: '@workpassguide',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'article:modified_time': new Date().toISOString(),
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// SLUG PAGE METADATA — /visa/work-visa/[slug]
// Fully dynamic, country-specific metadata
// ─────────────────────────────────────────────────────────────────────────────
export function generateWorkVisaSlugMetadata({ natCap, destCap, natKey, destKey, isGulf }) {
  const destData = getDestinationData(destKey);
  const natData = getNationalityData(natKey);

  const visaName = destData.visaName;
  const processing = destData.processing;

  // Primary title — exact-match keyword first
  const title =
    `${natCap} Work Visa for ${destCap} ${new Date().getFullYear()} — ` +
    `${visaName} Requirements & Application Guide | WorkPass.Guide`;

  // Rich description with specific data points
  const description =
    `Complete ${natCap} work visa guide for ${destCap}. Requirements for the ${visaName}: ` +
    `documents, employer sponsorship, processing time (${processing}), fees (${destData.fee}), ` +
    `${isGulf ? 'kafala system & NOC rules' : 'credential recognition & PR pathway'}. ` +
    `Updated May ${new Date().getFullYear()}.`;

  const canonicalUrl = `${SITE_URL}/visa/work-visa/${natKey.replace(/\s+/g, '-')}-to-${destKey.replace(/\s+/g, '-')}`;

  const ogImageUrl =
    `${SITE_URL}/og/work-visa/` +
    `${natKey.replace(/\s+/g, '-')}-to-${destKey.replace(/\s+/g, '-')}.png`;

  const keywords = [
    `${natCap} work visa ${destCap}`,
    `${natCap} work permit ${destCap}`,
    `${natCap} to ${destCap} work visa requirements`,
    `how to get work visa in ${destCap} for ${natCap} nationals`,
    `${destCap} ${visaName} for ${natCap}`,
    `${natCap} skilled worker visa ${destCap}`,
    `${natCap} employment visa ${destCap} 2026`,
    `${destCap} work permit documents ${natCap}`,
    `${natCap} employer sponsorship ${destCap}`,
    `work in ${destCap} from ${natCap}`,
    `${natCap} ${destCap} work authorization`,
    isGulf ? `kafala system ${destCap} ${natCap}` : `${destCap} PR pathway ${natCap}`,
  ].join(', ');

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${natCap} → ${destCap} Work Visa Guide ${new Date().getFullYear()} | WorkPass.Guide`,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImageUrl,
          fallback: DEFAULT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: `${natCap} Work Visa for ${destCap} — ${visaName} Guide`,
        },
      ],
      type: 'article',
      locale: 'en_US',
      article: {
        publishedTime: '2026-01-01T00:00:00Z',
        modifiedTime: new Date().toISOString(),
        authors: [`${SITE_URL}/about`],
        tags: [
          `${natCap} work visa`,
          `${destCap} work permit`,
          visaName,
          'employer sponsorship',
          'work authorization',
          natData.topSectors,
        ],
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: `${natCap} Work Visa for ${destCap} — ${visaName} Guide 2026`,
      description,
      images: [ogImageUrl],
      site: '@workpassguide',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD SCHEMA for slug pages — structured data for Google rich results
// ─────────────────────────────────────────────────────────────────────────────
export function generateWorkVisaSchema({ natCap, destCap, natKey, destKey, isGulf, slug }) {
  const destData = getDestinationData(destKey);
  const canonicalUrl = `${SITE_URL}/visa/work-visa/${slug}`;

  // FAQPage schema — Google may show FAQ rich result in SERP
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Does ${destCap} require credential recognition for ${natCap} degrees?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes. ${natCap} qualifications must be assessed and attested by an approved credential evaluation body before your ${destCap} work visa application is submitted. This process typically takes 4–12 weeks. Start this as early as possible to avoid delays.`,
        },
      },
      {
        '@type': 'Question',
        name: `How long does the ${natCap} to ${destCap} work visa take to process?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The ${destData.visaName} typically takes ${destData.processing} to process. Expedited processing may be available for an additional fee. Do not resign from your current job or book non-refundable flights until you have a visa decision.`,
        },
      },
      {
        '@type': 'Question',
        name: `What is the visa fee for ${natCap} nationals applying for a ${destCap} work permit?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The government visa fee for the ${destData.visaName} is approximately ${destData.fee}. Additional costs include credential assessment fees, medical examination, police clearance certificates, and any agent or VFS Global service fees. Total out-of-pocket costs typically range from $500–$3,000 USD.`,
        },
      },
      {
        '@type': 'Question',
        name: `Can ${natCap} nationals bring family members to ${destCap} on a work visa?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: isGulf
            ? `${destCap} allows sponsored workers to bring dependants (spouse and children) subject to minimum salary thresholds set by the employer. Dependant spouses in most Gulf countries require their own separate work permit to be employed.`
            : `Most ${destCap} skilled worker visas allow you to bring your spouse and dependent children under 18. Dependant spouses are typically permitted to work in ${destCap} without a separate work permit.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is there permanent residency available in ${destCap} for ${natCap} workers?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: isGulf
            ? `${destCap} does not offer permanent residency through standard employment visas. Long-term residency schemes (such as the UAE Golden Visa) are available separately for investors and highly skilled professionals.`
            : `Yes, ${destCap} offers a permanent residency pathway for skilled workers. Eligibility typically requires 2–5 years of continuous employment in ${destCap}, clean immigration history, and meeting language and financial requirements.`,
        },
      },
    ],
  };

  // Article schema
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${natCap} Work Visa for ${destCap} ${new Date().getFullYear()} — ${destData.visaName} Guide`,
    description: `Complete guide for ${natCap} nationals applying for a work visa in ${destCap}. Documents, sponsorship requirements, fees, processing times, and step-by-step application process.`,
    url: canonicalUrl,
    datePublished: '2026-01-01T00:00:00Z',
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'WorkPass.Guide',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'WorkPass.Guide',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    about: [
      { '@type': 'Country', name: natCap },
      { '@type': 'Country', name: destCap },
    ],
    keywords: `${natCap} work visa, ${destCap} work permit, ${destData.visaName}, employer sponsorship, work authorization`,
  };

  // BreadcrumbList schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Visa Guides', item: `${SITE_URL}/visa` },
      { '@type': 'ListItem', position: 3, name: 'Work Visa', item: `${SITE_URL}/visa/work-visa` },
      { '@type': 'ListItem', position: 4, name: `${natCap} → ${destCap}`, item: canonicalUrl },
    ],
  };

  return { faqSchema, articleSchema, breadcrumbSchema };
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD SCHEMA for index page
// ─────────────────────────────────────────────────────────────────────────────
export function generateWorkVisaIndexSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Work Visa & Work Permit Guide 2026',
    description:
      'Comprehensive work visa and work permit guides for every nationality and destination. ' +
      'Covering employer sponsorship, document checklists, processing times, and official portals.',
    url: `${SITE_URL}/visa/work-visa`,
    publisher: {
      '@type': 'Organization',
      name: 'WorkPass.Guide',
      url: SITE_URL,
    },
    dateModified: new Date().toISOString(),
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Visa Guides', item: `${SITE_URL}/visa` },
        { '@type': 'ListItem', position: 3, name: 'Work Visa', item: `${SITE_URL}/visa/work-visa` },
      ],
    },
  };
}