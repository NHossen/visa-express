// app/visa/page.jsx
// ✅ SERVER COMPONENT — no 'use client' directive

import VisaGuide from "@/components/Client/Visa/Visa";



/* ─── SEO METADATA ─────────────────────────────────────────────── */
export const metadata = {
  title: 'Visa Requirements 2026 — 195+ Countries | Expert Consultants Dubai & Dhaka | Visa Express Hub',
  description:
    'Embassy-accurate visa requirements for 195+ countries. Professional visa assistance for tourist, business, student & transit visas — offices in Dubai (UAE) and Dhaka (Bangladesh). 98% success rate, 42,000+ travelers helped. Call +971 50 707 8334.',
  keywords: [
    // service + location
    'global visa services Dubai',
    'visa consultancy Dubai UAE',
    'visa consultant Dhaka Bangladesh',
    'visa agency Deira Dubai',
    'visa express hub',
    // visa categories
    'tourist visa assistance UAE',
    'business visa services Dubai',
    'student visa assistance Dubai',
    'transit visa help Dubai',
    'e-visa application service',
    'family visit visa UAE',
    // destination-specific
    'UK visa services Dubai',
    'USA visa assistance UAE',
    'Canada visa help Dhaka',
    'Schengen visa processing Dubai',
    'Australia visa consultants Dubai',
    'Germany visa for Bangladeshi',
    'Italy visa for Bangladeshi',
    'France visa consultant Dubai',
    'Malaysia visa Dhaka',
    'Japan visa Bangladeshi',
    'Singapore visa Bangladeshi',
    // intent / long-tail
    'visa requirements 2026',
    'visa documents checklist 2026',
    'visa processing time 2026',
    'urgent visa processing Dubai',
    'visa application center Dhaka',
    'embassy requirements Bangladesh',
    'how to apply tourist visa from Bangladesh',
  ],
  alternates: {
    canonical: 'https://www.visaexpresshub.com/visa',
  },
  openGraph: {
    title: 'Visa Requirements 2026 for 195+ Countries | Expert Visa Consultancy | Visa Express Hub',
    description:
      'Reliable visa solutions for UAE and Bangladesh travelers. Embassy-verified requirements, document checklists, and processing times for every destination. 98% approval rate. Call +971 50 707 8334.',
    url: 'https://www.visaexpresshub.com/visa',
    siteName: 'Visa Express Hub',
    images: [
      {
        url: '/visa-express-hub-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Visa Express Hub — Comprehensive Visa Solutions for Dubai and Dhaka',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visa Requirements 2026 | Expert Consultancy Dubai & Dhaka | Visa Express Hub',
    description:
      'Expert visa support for 195+ countries. Tourist, business, student & transit visas. High success rate. Offices in Dubai & Dhaka. Call +971 50 707 8334.',
    images: ['/visa-express-hub-banner.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

/* ─── JSON-LD STRUCTURED DATA ───────────────────────────────────── */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://www.visaexpresshub.com/visa#service',
      name: 'Comprehensive Visa Consultancy Services',
      serviceType: 'Immigration & Travel Documentation',
      provider: {
        '@id': 'https://www.visaexpresshub.com/#organization',
      },
      description:
        'End-to-end visa application support for tourists, business travelers, students, and workers. Embassy-accurate requirements for 195+ countries. Offices in Dubai (UAE) and Dhaka (Bangladesh).',
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Visa Categories',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tourist & Visitor Visas' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business & MICE Visas' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Student Visas' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Transit Visas' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-Visa Applications' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Family & Spouse Visas' } },
        ],
      },
      areaServed: [
        { '@type': 'Country', name: 'United Arab Emirates' },
        { '@type': 'Country', name: 'Bangladesh' },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '42000',
        bestRating: '5',
      },
    },
    {
      '@type': 'TravelAgency',
      '@id': 'https://www.visaexpresshub.com/#organization',
      name: 'Visa Express Hub',
      url: 'https://www.visaexpresshub.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.visaexpresshub.com/visa-express-hub-logo.jpg',
        width: 200,
        height: 60,
      },
      image: 'https://www.visaexpresshub.com/visa-express-hub-banner.jpg',
      description:
        'Visa Express Hub is a leading visa consultancy with offices in Dubai and Dhaka, specialising in tourist, business, student, and transit visas for 195+ countries.',
      telephone: '+971507078334',
      email: 'info@visaexpresshub.com',
      address: [
        {
          '@type': 'PostalAddress',
          streetAddress: 'Al Nasser Building, Deira',
          addressLocality: 'Dubai',
          addressRegion: 'Dubai',
          addressCountry: 'AE',
        },
        {
          '@type': 'PostalAddress',
          streetAddress: 'Dhanmondi',
          addressLocality: 'Dhaka',
          addressCountry: 'BD',
        },
      ],
      sameAs: [
        'https://www.facebook.com/visaexpresshub',
        'https://www.instagram.com/visaexpresshub',
        'https://www.linkedin.com/company/visaexpresshub',
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.visaexpresshub.com/visa#webpage',
      url: 'https://www.visaexpresshub.com/visa',
      name: 'Visa Requirements 2026 — 195+ Countries | Visa Express Hub',
      description:
        'Embassy-accurate visa requirements, document checklists, processing times and fees for 195+ countries. Expert consultancy for Bangladeshi and UAE-resident travelers.',
      isPartOf: { '@id': 'https://www.visaexpresshub.com/#organization' },
      dateModified: '2026-05-01',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home',          item: 'https://www.visaexpresshub.com' },
          { '@type': 'ListItem', position: 2, name: 'Visa Services', item: 'https://www.visaexpresshub.com/visa' },
        ],
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Which countries do you provide visa assistance for?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We provide visa assistance for over 195 countries including the UK, USA, Canada, Australia, all 29 Schengen Area states, Japan, South Korea, Malaysia, Singapore, and many more.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I check visa requirements for my destination?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Select your nationality and destination country using our Visa Intelligence tool. You will instantly get the embassy-verified document checklist, processing time, fees, and photo specifications for your specific route.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you handle business visas for corporate travelers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we specialise in business and MICE travel visas for corporate clients in both Dubai and Dhaka, including documentation for trade fairs, conferences, and investor meetings.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is your visa approval success rate?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Our meticulous documentation process and 14+ years of expertise result in a 98% visa approval rate across all categories. We have helped over 42,000 travelers successfully obtain their visas.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can Bangladeshi citizens apply for visas through Visa Express Hub in Dhaka?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Our Dhaka office provides full visa application support for Bangladeshi citizens including document preparation, bank statement guidance, cover letters, and appointment booking for all major embassies.',
          },
        },
        {
          '@type': 'Question',
          name: 'What documents are typically required for a tourist visa?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Common tourist visa requirements include a valid passport, completed application form, passport photographs, travel medical insurance, confirmed flight itinerary, hotel bookings, bank statements (3–6 months), and an employment or leave letter. Requirements vary by destination — use our Visa Intelligence tool for the exact list.',
          },
        },
      ],
    },
    // ItemList for top destination pages — boosts sitelinks and entity understanding
    {
      '@type': 'ItemList',
      name: 'Top Visa Destinations for Bangladeshi Citizens 2026',
      description: 'Most searched visa guides for Bangladeshi passport holders — updated for 2026 embassy protocols.',
      itemListElement: [
        { '@type': 'ListItem', position: 1,  name: 'Canada Visa for Bangladeshi',        url: 'https://www.visaexpresshub.com/visa/bangladesh-to-canada' },
        { '@type': 'ListItem', position: 2,  name: 'USA Visa for Bangladeshi',           url: 'https://www.visaexpresshub.com/visa/bangladesh-to-united-states' },
        { '@type': 'ListItem', position: 3,  name: 'UK Visa for Bangladeshi',            url: 'https://www.visaexpresshub.com/visa/bangladesh-to-united-kingdom' },
        { '@type': 'ListItem', position: 4,  name: 'Australia Visa for Bangladeshi',     url: 'https://www.visaexpresshub.com/visa/bangladesh-to-australia' },
        { '@type': 'ListItem', position: 5,  name: 'Germany Visa for Bangladeshi',       url: 'https://www.visaexpresshub.com/visa/bangladesh-to-germany' },
        { '@type': 'ListItem', position: 6,  name: 'Italy Visa for Bangladeshi',         url: 'https://www.visaexpresshub.com/visa/bangladesh-to-italy' },
        { '@type': 'ListItem', position: 7,  name: 'France Visa for Bangladeshi',        url: 'https://www.visaexpresshub.com/visa/bangladesh-to-france' },
        { '@type': 'ListItem', position: 8,  name: 'Malaysia Visa for Bangladeshi',      url: 'https://www.visaexpresshub.com/visa/bangladesh-to-malaysia' },
        { '@type': 'ListItem', position: 9,  name: 'Japan Visa for Bangladeshi',         url: 'https://www.visaexpresshub.com/visa/bangladesh-to-japan' },
        { '@type': 'ListItem', position: 10, name: 'Singapore Visa for Bangladeshi',     url: 'https://www.visaexpresshub.com/visa/bangladesh-to-singapore' },
        { '@type': 'ListItem', position: 11, name: 'Thailand Visa for Bangladeshi',      url: 'https://www.visaexpresshub.com/visa/bangladesh-to-thailand' },
        { '@type': 'ListItem', position: 12, name: 'Dubai Visa for Bangladeshi',         url: 'https://www.visaexpresshub.com/visa/bangladesh-to-united-arab-emirates' },
      ],
    },
  ],
};

/* ─── PAGE ───────────────────────────────────────────────────────── */
export default function VisaPage() {
  return (
    <>
      {/* ── JSON-LD STRUCTURED DATA ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ── CLIENT COMPONENT — all interactive UI ── */}
 <VisaGuide />


    </>
  );
}