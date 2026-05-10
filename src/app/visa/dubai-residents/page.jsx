import TouristVisaDubaiResidents from '@/components/Client/DubaiResidents/DubaiResidents'
import React from 'react'

export const metadata = {
  title: "Visa Services for Dubai Residents | Travel from UAE | Visa Express Hub",
  description:
    "Specialized visa assistance for UAE residents and expats in Dubai. Get expert help for Schengen, UK, USA, Canada, and Australia visas based on your UAE residency. High approval rates for all nationalities. Call +971 50 707 8334.",
  keywords: [
    "visa for UAE residents",
    "Schengen visa for Dubai expats",
    "UK visa from Dubai",
    "USA visa for UAE residents",
    "Canada visa from UAE",
    "Australia visa for Dubai residents",
    "Japan visa for UAE residents",
    "travel from Dubai for expats",
    "visa assistance for Indian expats in Dubai",
    "visa assistance for Pakistani expats in Dubai",
    "visa assistance for Filipino expats in UAE",
    "NOC for visa from UAE employer",
    "visa services Deira Dubai",
    "UAE residency visa travel help",
    "Europe tour from Dubai for residents",
  ],
  alternates: {
    canonical: "https://www.visaexpresshub.com/visa/dubai-residents",
  },
  openGraph: {
    title: "Travel the World from Dubai | Expert Visa Help for Residents",
    description:
      "Are you a UAE resident planning an international trip? We specialize in helping Dubai expats secure visas for Europe, North America, and beyond. Fast, reliable, and professional.",
    url: "https://www.visaexpresshub.com/visa/dubai-residents",
    siteName: "Visa Express Hub",
    images: [
      {
        url: "/visa-express-hub-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Visa Express Hub - International Visa Services for UAE Residents",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Visas for Dubai Residents | Visa Express Hub",
    description:
      "Expert visa processing for all nationalities residing in the UAE. Schengen, UK, USA & more. Professional guidance at your doorstep in Deira. Call +971 50 707 8334.",
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
      "@id": "https://www.visaexpresshub.com/visa/dubai-residents#service",
      name: "UAE Resident Visa Assistance",
      serviceType: "Outbound Travel Visa Consultancy",
      provider: {
        "@id": "https://www.visaexpresshub.com/#organization",
      },
      description:
        "Dedicated visa application support for expatriates living in the United Arab Emirates. We manage the entire process including document verification, appointment booking, and insurance specifically tailored for UAE resident requirements.",
      areaServed: {
        "@type": "State",
        name: "Dubai",
        containedInPlace: { "@type": "Country", name: "United Arab Emirates" }
      },
      offers: {
        "@type": "Offer",
        description: "Specialized consultancy for Schengen, UK, USA, and Canada visas for UAE visa holders.",
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
      address: {
        "@type": "PostalAddress",
        streetAddress: "Al Nasser Building, Deira",
        addressLocality: "Dubai",
        addressCountry: "AE",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://www.visaexpresshub.com/visa/dubai-residents#webpage",
      url: "https://www.visaexpresshub.com/visa/dubai-residents",
      name: "Visa Guide for UAE & Dubai Residents - Visa Express Hub",
      description: "Everything UAE residents need to know about applying for international visas from Dubai.",
      isPartOf: { "@id": "https://www.visaexpresshub.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.visaexpresshub.com" },
          { "@type": "ListItem", position: 2, name: "Visa Services", item: "https://www.visaexpresshub.com/visa" },
          { "@type": "ListItem", position: 3, name: "Dubai Residents", item: "https://www.visaexpresshub.com/visa/dubai-residents" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can I apply for a Schengen visa if my UAE residency is less than 6 months old?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Generally, embassies prefer at least 3-6 months of residency. However, depending on your nationality and contract type, we can provide guidance on how to strengthen your application.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need a salary certificate for my visa application from Dubai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, most embassies (including Schengen and UK) require a No Objection Certificate (NOC) and a Salary Certificate from your UAE employer, along with stamped bank statements.",
          },
        },
        {
          "@type": "Question",
          name: "How long should my UAE visa be valid to travel to the UK or Europe?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your UAE residency visa should typically be valid for at least 3 months beyond your intended return date from your international trip.",
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
      <TouristVisaDubaiResidents />
    </div>
  )
}
