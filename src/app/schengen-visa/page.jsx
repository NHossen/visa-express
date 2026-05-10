import SchengenVisaPage from '@/components/Client/SchengenVisa/SchengenVisa'
import React from 'react'
export const metadata = {
  title: "Schengen Visa Consultant Dubai & Dhaka | Visa Express Hub",
  description:
    "Expert Schengen visa assistance in Dubai (UAE) and Dhaka (Bangladesh). We help with tourist, business, and student visas for all 29 Schengen countries including France, Germany, Italy, and Spain. Call +971 50 707 8334.",
  keywords: [
    "Schengen visa assistance Dubai",
    "Schengen visa consultant Dubai UAE",
    "Schengen visa consultant Dhaka Bangladesh",
    "Europe tourist visa Dubai",
    "Schengen visa appointment Dubai",
    "France visa consultant Dubai",
    "Germany visa assistance UAE",
    "Italy visa help Dubai",
    "Spain visa consultant Dhaka",
    "Switzerland visa assistance Dubai",
    "Netherlands visa Dubai",
    "Schengen business visa UAE",
    "Schengen student visa assistance",
    "Europe travel documentation Dubai",
    "Schengen visa requirements for UAE residents",
    "Schengen visa agency Deira",
    "apply for Schengen visa from Bangladesh",
  ],
  alternates: {
    canonical: "https://www.visaexpresshub.com/schengen-visa",
  },
  openGraph: {
    title: "Schengen Visa Assistance | Expert Consultants in Dubai & Dhaka",
    description:
      "Planning a trip to Europe? Get professional Schengen visa support from our specialists in Dubai and Dhaka. High success rate for tourist and business visas. Call +971 50 707 8334.",
    url: "https://www.visaexpresshub.com/schengen-visa",
    siteName: "Visa Express Hub",
    images: [
      {
        url: "/visa-express-hub-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Visa Express Hub - Schengen Visa Specialists in Dubai and Dhaka",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schengen Visa Consultants Dubai & Dhaka | Visa Express Hub",
    description:
      "Expert assistance for Schengen visas (Europe). Offices in Dubai (UAE) and Dhaka (Bangladesh). High success rate. Call +971 50 707 8334 today.",
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
      "@id": "https://www.visaexpresshub.com/schengen-visa#service",
      name: "Schengen Visa Assistance Services",
      serviceType: "Visa Consultancy",
      provider: {
        "@id": "https://www.visaexpresshub.com/#organization",
      },
      description:
        "Comprehensive visa processing and documentation support for the Schengen Area. We assist with appointments, documentation, and application submission for all European Schengen member states.",
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Bangladesh" },
      ],
      offers: {
        "@type": "Offer",
        description: "Professional consultancy for Schengen tourist, business, and student visas.",
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
      description:
        "Visa Express Hub is a leading visa consultancy specializing in Schengen, UK, USA, and Canada visas with dedicated offices in Dubai and Dhaka.",
      telephone: "+971507078334",
      email: "info@visaexpresshub.com",
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "Al Nasser Building, Deira",
          addressLocality: "Dubai",
          addressRegion: "Dubai",
          addressCountry: "AE",
          postalCode: "00000",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "Dhanmondi",
          addressLocality: "Dhaka",
          addressCountry: "BD",
        },
      ],
      sameAs: [
        "https://www.facebook.com/visaexpresshub",
        "https://www.instagram.com/visaexpresshub",
        "https://www.linkedin.com/company/visaexpresshub",
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://www.visaexpresshub.com/schengen-visa#webpage",
      url: "https://www.visaexpresshub.com/schengen-visa",
      name: "Schengen Visa Consultancy Services - Visa Express Hub",
      description:
        "Complete guide and assistance for obtaining a Schengen Visa from Dubai, UAE or Dhaka, Bangladesh.",
      isPartOf: { "@id": "https://www.visaexpresshub.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.visaexpresshub.com" },
          { "@type": "ListItem", position: 2, name: "Schengen Visa", item: "https://www.visaexpresshub.com/schengen-visa" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How long does a Schengen visa take to process in Dubai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Schengen visa processing typically takes between 15 to 30 days. However, during peak travel seasons, it can take longer, so we recommend applying at least 2 months in advance.",
          },
        },
        {
          "@type": "Question",
          name: "Which European countries are included in the Schengen visa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Schengen visa covers 29 European countries, including popular destinations like France, Germany, Italy, Spain, Switzerland, Greece, and the Netherlands.",
          },
        },
        {
          "@type": "Question",
          name: "What documents are required for a Schengen visa for UAE residents?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Common requirements include a valid passport, UAE residency visa (valid for at least 3 months after return), NOC from your employer, bank statements for the last 3-6 months, travel insurance, and flight/hotel bookings.",
          },
        },
        {
          "@type": "Question",
          name: "Can I apply for a Schengen visa from Dhaka through Visa Express Hub?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, our Dhaka office provides full support for Schengen visa applications for Bangladeshi citizens, including document preparation, invitation letters, and interview coaching.",
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
      <SchengenVisaPage />
    </div>
  )
}
