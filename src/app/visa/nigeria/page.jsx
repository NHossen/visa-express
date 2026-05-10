import TouristVisaNigerianNationals from '@/components/Client/Nigeria/Nigeria'
import React from 'react'
export const metadata = {
  title: "Nigeria Visa Assistance & Requirements | Visa Express Hub",
  description:
    "Expert visa services for Nigeria. We assist with Nigeria Business Visa on Arrival (VoA), Tourist visas, and outbound visa processing for Nigerian nationals in Dubai and Dhaka. Call +971 50 707 8334 for professional guidance.",
  keywords: [
    "Nigeria visa assistance Dubai",
    "Nigeria visa on arrival for UAE residents",
    "visa for Nigerian nationals in Dubai",
    "Nigeria business visa consultant UAE",
    "apply for Nigeria visa from Dhaka",
    "Nigeria tourist visa help Dubai",
    "Schengen visa for Nigerians in UAE",
    "UK visa assistance for Nigerian citizens",
    "Nigeria immigration consultants Dubai",
    "visa for Nigeria from Bangladesh",
    "Nigeria visa on arrival letter UAE",
    "Nigeria entry permit services",
    "travel from Dubai to Lagos",
    "Nigerian expat visa services Deira",
    "Visa Express Hub Nigeria services",
  ],
  alternates: {
    canonical: "https://www.visaexpresshub.com/visa/nigeria",
  },
  openGraph: {
    title: "Nigeria Visa Services | Entry Visas & Nigerian National Support",
    description:
      "Comprehensive visa solutions for Nigeria. Whether you are traveling to Nigeria for business or are a Nigerian national seeking international visas, we are here to help.",
    url: "https://www.visaexpresshub.com/visa/nigeria",
    siteName: "Visa Express Hub",
    images: [
      {
        url: "/visa-express-hub-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Visa Express Hub - Nigeria Visa and Immigration Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Nigeria Visa Consultancy | Dubai & Dhaka",
    description:
      "Reliable assistance for Nigeria Business Visas on Arrival and outbound travel for Nigerian citizens. Fast and professional. Call +971 50 707 8334.",
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
      "@id": "https://www.visaexpresshub.com/visa/nigeria#service",
      name: "Nigeria Visa & Documentation Services",
      serviceType: "Visa Consultancy",
      provider: {
        "@id": "https://www.visaexpresshub.com/#organization",
      },
      description:
        "Specialized support for Nigeria-bound travel, including Business Visa on Arrival (VoA) approval letters. We also provide outbound visa consultancy for Nigerian passport holders residing in the UAE and Bangladesh for Schengen, UK, and USA applications.",
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Bangladesh" },
        { "@type": "Country", name: "Nigeria" },
      ],
      offers: {
        "@type": "Offer",
        description: "Assistance with Nigeria entry permits and international visas for Nigerian expats.",
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
      "@id": "https://www.visaexpresshub.com/visa/nigeria#webpage",
      url: "https://www.visaexpresshub.com/visa/nigeria",
      name: "Nigeria Visa Requirements & Expat Services - Visa Express Hub",
      description: "A complete guide for travelers to Nigeria and visa services for Nigerian citizens in Dubai and Dhaka.",
      isPartOf: { "@id": "https://www.visaexpresshub.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.visaexpresshub.com" },
          { "@type": "ListItem", position: 2, name: "Visa Services", item: "https://www.visaexpresshub.com/visa" },
          { "@type": "ListItem", position: 3, name: "Nigeria", item: "https://www.visaexpresshub.com/visa/nigeria" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can I get a Nigeria Business Visa on Arrival from Dubai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we can assist in obtaining the Nigeria Business Visa on Arrival (VoA) approval letter. This allows you to travel and get your visa stamped at the port of entry in Nigeria (e.g., Lagos or Abuja).",
          },
        },
        {
          "@type": "Question",
          name: "What visas can Nigerian citizens apply for from the UAE?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nigerian nationals residing in the UAE can apply for Schengen, UK, USA, Canada, and Australia visas through their respective embassies in Dubai or Abu Dhabi. We provide full documentation support for these applications.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need a yellow fever certificate to travel to Nigeria?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, a valid Yellow Fever vaccination certificate is mandatory for all travelers entering Nigeria. We recommend ensuring this is ready along with your visa approval.",
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
      <TouristVisaNigerianNationals />
    </div>
  )
}
