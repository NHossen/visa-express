import VisaRejectionCheckerPage from '@/components/Client/VisaRejection/VisaRejection'
import React from 'react'

export const metadata = {
  title: "Visa Rejection Appeal & Re-application | Success Experts Dubai & Dhaka",
  description:
    "Facing a visa refusal? Our experts specialize in analyzing rejection letters, correcting documentation errors, and managing successful re-applications for UK, USA, Canada, and Schengen visas. Call +971 50 707 8334 for a free consultation.",
  keywords: [
    "visa rejection appeal Dubai",
    "reapply after visa refusal Dhaka",
    "Schengen visa rejection help UAE",
    "USA visa refusal reasons 2026",
    "Canada visa re-application consultant",
    "UK visa appeal services Dubai",
    "how to fix visa rejection",
    "visa refusal letter analysis",
    "Indian visa rejection for Bangladeshis",
    "professional appeal letter writing",
    "overstay and deportation help UAE",
    "correcting visa application mistakes",
    "Visa Express Hub rejection experts",
    "high success rate visa re-application",
  ],
  alternates: {
    canonical: "https://www.visaexpresshub.com/visa-rejection",
  },
  openGraph: {
    title: "Overcoming Visa Rejections | Professional Appeal Services",
    description:
      "A rejection isn't the end. We analyze your refusal letter to identify the core issue—whether it's financial, ties to home country, or documentation—and help you re-apply with a stronger case.",
    url: "https://www.visaexpresshub.com/visa-rejection",
    siteName: "Visa Express Hub",
    images: [
      {
        url: "/visa-express-hub-rejection-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Visa Express Hub - Visa Rejection and Appeal Assistance",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visa Refused? Get Expert Help in Dubai & Dhaka",
    description:
      "Don't let a visa rejection stop your travel plans. Specialist advice on re-applications and appeals for all major countries. Call +971 50 707 8334.",
    images: ["/visa-express-hub-rejection-banner.jpg"],
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
      "@id": "https://www.visaexpresshub.com/visa-rejection#service",
      name: "Visa Rejection Analysis & Appeal Services",
      serviceType: "Legal & Immigration Consultation",
      provider: {
        "@id": "https://www.visaexpresshub.com/#organization",
      },
      description:
        "Specialized consultancy to help applicants understand and overcome visa refusals. We provide refusal letter auditing, administrative review support, and professional re-application strategies for all major visa categories.",
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Bangladesh" },
      ],
      offers: {
        "@type": "Offer",
        description: "Comprehensive visa refusal audit and re-application guidance.",
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
      "@id": "https://www.visaexpresshub.com/visa-rejection#webpage",
      url: "https://www.visaexpresshub.com/visa-rejection",
      name: "Visa Rejection & Appeal Guide - Visa Express Hub",
      description: "How to handle a visa refusal and successfully re-apply from Dubai or Dhaka.",
      isPartOf: { "@id": "https://www.visaexpresshub.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.visaexpresshub.com" },
          { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.visaexpresshub.com/resources" },
          { "@type": "ListItem", position: 3, name: "Visa Rejection", item: "https://www.visaexpresshub.com/visa-rejection" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can I re-apply for a visa immediately after a rejection?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, in most cases you can re-apply immediately. However, it is vital to address the specific reasons for the refusal in your new application. If nothing has changed in your circumstances, you are likely to be rejected again.",
          },
        },
        {
          "@type": "Question",
          name: "What are the common reasons for visa rejection in 2026?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The most common reasons include insufficient proof of funds, lack of strong ties to your home country (job, family, property), inconsistent information, and low-quality supporting documents. In 2026, incorrect photo specifications have also become a major cause for UAE and Schengen rejections.",
          },
        },
        {
          "@type": "Question",
          name: "How can an appeal letter help my case?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A professionally written appeal letter directly addresses the visa officer's concerns with factual evidence. It clarifies misunderstandings and provides additional context that might have been missing in the initial application.",
          },
        },
        {
          "@type": "Question",
          name: "Does a previous rejection affect my future visa applications?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, you must always declare previous rejections. While it may lead to closer scrutiny, a properly explained past rejection that has been resolved (by providing new evidence) does not automatically result in a future denial.",
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
      
      <VisaRejectionCheckerPage />
    </div>
  )
}
