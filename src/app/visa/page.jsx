import VisaGuide from '@/components/Client/Visa/Visa'
import React from 'react'
export const metadata = {
  title: "Global Visa Services Dubai & Dhaka | Visa Express Hub",
  description:
    "Professional visa assistance for 50+ countries. Specialized in Tourist, Business, and Family visas for UK, USA, Canada, Schengen, and Australia. Visit our offices in Dubai, UAE and Dhaka, Bangladesh for expert guidance.",
  keywords: [
    "global visa services Dubai",
    "visa consultancy Dubai",
    "visa consultant Dhaka",
    "tourist visa assistance UAE",
    "business visa services Dubai",
    "transit visa help Dubai",
    "family visit visa UAE",
    "visa application center Dhaka",
    "UK visa services Dubai",
    "USA visa assistance UAE",
    "Canada visa help Dhaka",
    "Schengen visa processing Dubai",
    "Australia visa consultants Dubai",
    "visa documentation services UAE",
    "urgent visa processing Dubai",
    "Visa Express Hub services",
  ],
  alternates: {
    canonical: "https://www.visaexpresshub.com/visa",
  },
  openGraph: {
    title: "Expert Visa Consultancy Services | Visa Express Hub",
    description:
      "Reliable visa solutions for travelers in UAE and Bangladesh. From tourist visas to long-term residency guidance, our experts ensure a smooth application process.",
    url: "https://www.visaexpresshub.com/visa",
    siteName: "Visa Express Hub",
    images: [
      {
        url: "/visa-express-hub-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Visa Express Hub - Comprehensive Visa Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Comprehensive Visa Assistance | Dubai & Dhaka",
    description:
      "Expert visa support for 50+ countries. High success rate for all visa categories. Call +971 50 707 8334 today.",
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
      "@id": "https://www.visaexpresshub.com/visa#service",
      name: "Comprehensive Visa Consultancy Services",
      serviceType: "Immigration & Travel Documentation",
      provider: {
        "@id": "https://www.visaexpresshub.com/#organization",
      },
      description:
        "End-to-end visa application support for tourists, business travelers, students, and workers. Specializing in high-demand destinations including Europe, North America, and Oceania.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Visa Categories",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tourist & Visitor Visas" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Business & MICE Visas" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Family & Spouse Visas" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Transit Visas" } },
        ],
      },
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Bangladesh" },
      ],
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
      "@id": "https://www.visaexpresshub.com/visa#webpage",
      url: "https://www.visaexpresshub.com/visa",
      name: "Global Visa Solutions - Visa Express Hub",
      description: "Explore our full range of visa services for all major international destinations.",
      isPartOf: { "@id": "https://www.visaexpresshub.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.visaexpresshub.com" },
          { "@type": "ListItem", position: 2, name: "Visa Services", item: "https://www.visaexpresshub.com/visa" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which countries do you provide visa assistance for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We provide visa assistance for over 50 countries, including the UK, USA, Canada, Australia, the Schengen Area, Japan, South Korea, and many more.",
          },
        },
        {
          "@type": "Question",
          name: "Do you handle business visas for corporate travelers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we specialize in business visas and MICE travel documentation for corporate clients in both Dubai and Dhaka.",
          },
        },
        {
          "@type": "Question",
          name: "What is your success rate for visa applications?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "While no agency can guarantee a visa, our 14 years of expertise and meticulous documentation process result in a very high success rate for our clients.",
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
      <VisaGuide />
    </div>
  )
}
