import HeroSection from '@/components/HeroSection/HeroSection'
import EVisaSearchMenu from '@/components/SearchMenu/EVisaSearchMenu/EVisaSearchMenu';
import QuickAccessCards from '@/components/SearchMenu/QuickAccessCards/QuickAccessCards'
import ScholarshipSearch from '@/components/SearchMenu/ScholarshipSearch/ScholarshipSearch';
import VisaProcessingTime from '@/components/SearchMenu/VisaProcessingTime/VisaProcessingTime'
import React from 'react'

// ─── HOME PAGE SEO METADATA ───────────────────────────────────────────────────
export const metadata = {
  // Title is intentionally keyword-rich and action-oriented
  title: 'Visa Requirements, Processing Times & Document Checklists for 195+ Countries',

  description:
    'Visa Express Hub — Free visa requirements, real-time processing times, document checklists, SOP templates & NOC letters for tourist, student, work, and transit visas across 195+ countries. Corporate office Dubai | +971 50 707 8334 | Sponsored by Eammu Holidays.',

  keywords: [
    // High-volume primary keywords
    'visa requirements',
    'visa processing time',
    'visa document checklist',
    'how to apply for visa',
    'tourist visa requirements',
    'student visa requirements',
    'work visa requirements',
    'transit visa requirements',
    'Schengen visa requirements',
    // Tool / template keywords
    'SOP template visa',
    'NOC letter visa',
    'free visa SOP download',
    'visa cover letter template',
    'visa application guide',
    // Country-specific high-traffic queries
    'UAE visa requirements',
    'Dubai visa',
    'USA visa requirements',
    'UK visa requirements',
    'Canada visa requirements',
    'Australia visa requirements',
    'Europe visa requirements',
    // Brand + local
    'Visa Express Hub',
    'visa services Dubai',
    'visa consultant UAE',
    'Eammu Holidays',
    'visa help Dubai',
    'e-visa application',
    'scholarship visa guide',
  ],

  alternates: {
    canonical: 'https://visaexpresshub.com',
  },

  openGraph: {
    title: 'Visa Express Hub – Free Visa Guides, Checklists & Processing Times for 195+ Countries',
    description:
      'Get visa requirements, real-time processing times, document checklists, free SOP & NOC templates for tourist, student, work & transit visas worldwide. Based in Dubai, UAE.',
    url: 'https://visaexpresshub.com',
    siteName: 'Visa Express Hub',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/visa-express-hub-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Visa Express Hub – Global Visa Information Center',
        type: 'image/png',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Visa Express Hub – Free Visa Guides & Checklists for 195+ Countries',
    description:
      'Real-time visa processing times, document checklists, SOP & NOC templates for tourist, student, work & transit visas. Free. Always updated.',
    images: ['/visa-express-hub-banner.jpg'],
    creator: '@VisaExpressHub',
    site: '@VisaExpressHub',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

// ─── HOME PAGE STRUCTURED DATA ────────────────────────────────────────────────
// Page-level schema that complements the global layout schemas.
// This targets rich snippets specific to the homepage content sections.
const homePageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    // Breadcrumb for homepage (signals hierarchy to Google)
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://visaexpresshub.com',
        },
      ],
    },

    // ItemList — showcases the core tools/sections for Google Discover & rich results
    {
      '@type': 'ItemList',
      name: 'Visa Express Hub — Free Visa Tools & Resources',
      description:
        'Comprehensive visa information tools including processing time tracker, e-visa search, scholarship visa guide, and quick-access country checklists.',
      url: 'https://visaexpresshub.com',
      numberOfItems: 5,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Visa Processing Time Tracker',
          description:
            'Real-time visa processing time tracking for all major embassies and 195+ countries.',
          url: 'https://visaexpresshub.com/visa-processing-time-tracker',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Scholarship Visa Guide',
          description:
            'Step-by-step scholarship visa application guides and document checklists.',
          url: 'https://visaexpresshub.com/scholarships',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Quick Access Visa Checklists',
          description:
            'Instant access to visa document checklists for tourist, student, work, and transit visas by country.',
          url: 'https://visaexpresshub.com/visa-resources/visa-checklist-generator',
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'E-Visa Search & Application Guide',
          description:
            'Find out which countries offer e-visas and get step-by-step e-visa application instructions.',
          url: 'https://visaexpresshub.com/visa/e-visa',
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Free SOP & NOC Templates',
          description:
            'Download free Statement of Purpose (SOP) and No Objection Certificate (NOC) templates for visa applications.',
          url: 'https://visaexpresshub.com/visa-resources/visa-document-generator',
        },
      ],
    },

    // SpeakableSpecification — for voice search & Google Assistant answers
    {
      '@type': 'WebPage',
      '@id': 'https://visaexpresshub.com/#homepage',
      url: 'https://visaexpresshub.com',
      name: 'Visa Express Hub — Free Visa Requirements, Processing Times & Guides',
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'h2', '.speakable'],
      },
      significantLink: [
        'https://visaexpresshub.com/visa-processing-time-tracker',
        'https://visaexpresshub.com/visa-resources/visa-document-generator',
        'https://visaexpresshub.com/visa/e-visa',
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      {/* Page-level structured data (complements layout.jsx global schemas) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homePageSchema) }}
      />

      <div>
        {/* Section IDs are referenced in the ItemList schema above —
            they help Google understand the page structure and
            anchor links improve crawlability */}
        <HeroSection />

        <section id="visa-processing-time-tracker" aria-label="Visa Processing Time Tracker">
          <VisaProcessingTime />
        </section>

        <section id="scholarships" aria-label="Scholarship Visa Guide">
          <ScholarshipSearch />
        </section>

        <section id="quick-access" aria-label="Quick Access Visa Checklists">
          <QuickAccessCards />
        </section>

        <section id="e-visa" aria-label="E-Visa Search and Application Guide">
          <EVisaSearchMenu />
        </section>
      </div>
    </>
  );
}