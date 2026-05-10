import BusinessVisaSearch from '@/components/Client/BusinessVisa/BusinessVisa'
import React from 'react'
export const metadata = {
  title: "Business Visa Consultants Dubai & Dhaka | Visa Express Hub",
  description:
    "Expert business visa assistance for corporate travelers and entrepreneurs. Specialized in B1/B2 USA, UK Standard Visitor, Schengen Business, and Canada Business visas. Offices in Dubai and Dhaka. Call +971 50 707 8334.",
  keywords: [
    "business visa consultant Dubai",
    "corporate travel visa UAE",
    "business visa assistance Dhaka",
    "USA B1 visa consultant Dubai",
    "Schengen business visa assistance",
    "UK business visitor visa Dubai",
    "Canada business visa help UAE",
    "trade fair visa consultant Dubai",
    "entrepreneur visa assistance",
    "business meeting visa Europe",
    "executive travel documentation Dubai",
    "visa for investment meetings",
    "corporate visa services Deira",
    "business visa center Dhaka Dhanmondi",
    "conference visa assistance Dubai",
  ],
  alternates: {
    canonical: "https://www.visaexpresshub.com/visa/business-visa",
  },
  openGraph: {
    title: "Global Business Visa Solutions | Visa Express Hub",
    description:
      "Reliable visa processing for international business trips, conferences, and trade fairs. We handle the documentation so you can focus on your business.",
    url: "https://www.visaexpresshub.com/visa/business-visa",
    siteName: "Visa Express Hub",
    images: [
      {
        url: "/visa-express-hub-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Visa Express Hub - Professional Business Visa Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Corporate & Business Visa Services | Dubai & Dhaka",
    description:
      "Fast and reliable business visa processing for 50+ countries. Specialized support for corporate clients. Call +971 50 707 8334.",
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
      "@id": "https://www.visaexpresshub.com/visa/business-visa#service",
      name: "Business Visa Consultancy Services",
      serviceType: "Corporate Travel Services",
      provider: {
        "@id": "https://www.visaexpresshub.com/#organization",
      },
      description:
        "Dedicated visa solutions for business professionals, including invitation letter verification, travel itinerary planning, and priority document processing for global business hubs.",
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Bangladesh" },
      ],
      offers: {
        "@type": "Offer",
        description: "Priority business visa documentation and corporate account management.",
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
      "@id": "https://www.visaexpresshub.com/visa/business-visa#webpage",
      url: "https://www.visaexpresshub.com/visa/business-visa",
      name: "International Business Visa Services - Visa Express Hub",
      description: "Get expert assistance for B1, Business Schengen, and Corporate Visitor visas worldwide.",
      isPartOf: { "@id": "https://www.visaexpresshub.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.visaexpresshub.com" },
          { "@type": "ListItem", position: 2, name: "Visa Services", item: "https://www.visaexpresshub.com/visa" },
          { "@type": "ListItem", position: 3, name: "Business Visa", item: "https://www.visaexpresshub.com/visa/business-visa" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What documents are needed for a Business Visa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Typically, you need a valid passport, UAE residency (if applying from Dubai), an invitation letter from the host company abroad, a support letter from your current employer, and financial proof such as bank statements.",
          },
        },
        {
          "@type": "Question",
          name: "Can I attend a trade fair on a business visa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, most business visas (like the Schengen C-Type or USA B1) allow you to attend trade fairs, exhibitions, and conduct meetings or negotiations.",
          },
        },
        {
          "@type": "Question",
          name: "How fast can you process a corporate visa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Processing times depend on the embassy, but we offer priority documentation services to ensure your application is submitted correctly and as quickly as possible.",
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
      
      <BusinessVisaSearch />
    </div>
  )
}
