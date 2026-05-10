import WorkVisaSearch from '@/components/Client/WorkVisa/WorkVisa'
import React from 'react'

export const metadata = {
  title: "Work Visa Consultant Dubai & Dhaka | Skilled Migration Experts",
  description:
    "Expert work visa assistance for UK Skilled Worker, Canada Work Permit, USA H-1B, and Europe. Our consultants in Dubai and Dhaka handle employer sponsorship documentation and professional relocation services. Call +971 50 707 8334.",
  keywords: [
    "work visa consultant Dubai",
    "work permit assistance Dhaka",
    "UK skilled worker visa help Dubai",
    "Canada work permit consultant UAE",
    "USA work visa assistance Dhaka",
    "Schengen work visa consultant Dubai",
    "Australia skilled migration UAE",
    "employer sponsored visa help",
    "professional relocation services Dubai",
    "work in Europe from Bangladesh",
    "job seeker visa assistance",
    "critical skills work permit",
    "labor market impact assessment help",
    "Visa Express Hub employment services",
  ],
  alternates: {
    canonical: "https://www.visaexpresshub.com/visa/work-visa",
  },
  openGraph: {
    title: "Global Work Visa & Professional Migration | Visa Express Hub",
    description:
      "Advance your career abroad. We provide specialized work visa processing and skilled migration support for the world's leading economies from our Dubai and Dhaka offices.",
    url: "https://www.visaexpresshub.com/visa/work-visa",
    siteName: "Visa Express Hub",
    images: [
      {
        url: "/visa-express-hub-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Visa Express Hub - Global Work Visa Specialists",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Work Visa & Migration Consultants | Dubai & Dhaka",
    description:
      "Secure your professional future abroad. Specialized guidance on work permits for UK, Canada, USA, and Europe. Call +971 50 707 8334.",
    images: ["/visa-express-hub-banner.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// ─── JSON-LD STRUCTURED DATA ──────────────────────────────────
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": "https://www.visaexpresshub.com/visa/work-visa#service",
      name: "International Work Visa & Skilled Migration Consultancy",
      serviceType: "Immigration & Employment Services",
      provider: {
        "@id": "https://www.visaexpresshub.com/#organization",
      },
      description:
        "Comprehensive assistance for professionals seeking international work permits. We guide applicants through employer sponsorship, labor market assessments (LMIA), point-based migration systems, and professional documentation.",
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Bangladesh" },
      ],
      offers: {
        "@type": "Offer",
        description: "Professional work permit processing and skilled worker migration support.",
      },
    },
    {
      "@type": "TravelAgency",
      "@id": "https://www.visaexpresshub.com/#organization",
      name: "Visa Express Hub",
      url: "https://www.visaexpresshub.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.visaexpresshub.com/visa-express-hub-logo.jpg",
        width: 200,
        height: 60,
      },
      image: "https://www.visaexpresshub.com/visa-express-hub-banner.jpg",
      telephone: "+971507078334",
      email: "info@visaexpresshub.com",
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "Al Nasser Building, Deira",
          addressLocality: "Dubai",
          addressCountry: "AE",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "Dhanmondi",
          addressLocality: "Dhaka",
          addressCountry: "BD",
        },
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.visaexpresshub.com/visa/work-visa#webpage",
      url: "https://www.visaexpresshub.com/visa/work-visa",
      name: "Work Visa and Skilled Migration Guide - Visa Express Hub",
      description: "Everything you need to know about applying for a work permit or skilled migration from Dubai or Dhaka.",
      isPartOf: { "@id": "https://www.visaexpresshub.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.visaexpresshub.com" },
          { "@type": "ListItem", position: 2, name: "Visa Services", item: "https://www.visaexpresshub.com/visa" },
          { "@type": "ListItem", position: 3, name: "Work Visa", item: "https://www.visaexpresshub.com/visa/work-visa" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do I need a job offer to apply for a work visa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most work visas, such as the UK Skilled Worker or Canada Work Permit, require a valid job offer and sponsorship from a licensed employer. However, some countries offer Job Seeker visas or points-based migration without a prior offer.",
          },
        },
        {
          "@type": "Question",
          name: "Can Visa Express Hub help with Canada LMIA applications?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we provide guidance on the LMIA process for Canada and can help applicants coordinate the necessary documentation required from both the employer and the employee.",
          },
        },
        {
          "@type": "Question",
          name: "How long is a typical work visa valid for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Validity depends on the contract and the country. For example, UK skilled worker visas are often issued for up to 5 years, while European work permits are typically linked to the duration of your employment contract.",
          },
        },
        {
          "@type": "Question",
          name: "What is the processing time for a work permit from Dubai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Processing times vary significantly. European work visas can take 2-4 months, while UK and USA permits may take 3-8 weeks depending on priority service availability.",
          },
        },
      ],
    },
  ],
};
export default function page() {
  return (
    <div>
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <WorkVisaSearch />
    </div>
  )
}
