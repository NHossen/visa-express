import TouristVisa from '@/components/Client/TouristVisa/TouristVisa'
import React from 'react'
export const metadata = {
  title: "Tourist Visa Consultant Dubai & Dhaka | Leisure Travel Experts",
  description:
    "Expert tourist visa assistance for Schengen, UK, USA, Canada, Australia, and 50+ countries. Our consultants in Dubai and Dhaka handle your itinerary, documentation, and appointments for a stress-free vacation. Call +971 50 707 8334.",
  keywords: [
    "tourist visa consultant Dubai",
    "leisure visa assistance Dhaka",
    "Schengen tourist visa Dubai",
    "USA visitor visa help UAE",
    "UK tourist visa consultant Dhaka",
    "Canada visitor visa assistance Dubai",
    "Australia tourist visa UAE",
    "holiday visa services Dubai",
    "family visit visa assistance Dhaka",
    "Europe tour visa consultant",
    "travel documentation for tourists UAE",
    "visa for vacation Dubai residents",
    "Japan tourist visa help UAE",
    "Thailand visa consultant Dhaka",
    "Visa Express Hub tourist services",
  ],
  alternates: {
    canonical: "https://www.visaexpresshub.com/visa/tourist-visa",
  },
  openGraph: {
    title: "Global Tourist Visa Services | Visa Express Hub",
    description:
      "Plan your dream vacation with confidence. We offer expert visitor visa processing for top global destinations with personalized support in Dubai and Dhaka.",
    url: "https://www.visaexpresshub.com/visa/tourist-visa",
    siteName: "Visa Express Hub",
    images: [
      {
        url: "/visa-express-hub-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Visa Express Hub - International Tourist Visa Specialists",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Tourist & Visitor Visa Consultants | Dubai & Dhaka",
    description:
      "Get your tourist visa for Europe, USA, UK, or Canada. Professional guidance on travel itineraries and documentation. Call +971 50 707 8334.",
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
      "@id": "https://www.visaexpresshub.com/visa/tourist-visa#service",
      name: "International Tourist & Visitor Visa Consultancy",
      serviceType: "Travel & Immigration Services",
      provider: {
        "@id": "https://www.visaexpresshub.com/#organization",
      },
      description:
        "Specialized assistance for travelers seeking tourist and visitor visas. We provide comprehensive support including flight/hotel bookings for visa purposes, document checklists, and appointment scheduling.",
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Bangladesh" },
      ],
      offers: {
        "@type": "Offer",
        description: "Complete tourist visa documentation and holiday travel consultancy.",
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
      "@id": "https://www.visaexpresshub.com/visa/tourist-visa#webpage",
      url: "https://www.visaexpresshub.com/visa/tourist-visa",
      name: "Tourist Visa and Visitor Visa Guide - Visa Express Hub",
      description: "Step-by-step guide and professional help for applying for a tourist visa from Dubai or Dhaka.",
      isPartOf: { "@id": "https://www.visaexpresshub.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.visaexpresshub.com" },
          { "@type": "ListItem", position: 2, name: "Visa Services", item: "https://www.visaexpresshub.com/visa" },
          { "@type": "ListItem", position: 3, name: "Tourist Visa", item: "https://www.visaexpresshub.com/visa/tourist-visa" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which countries are popular for tourist visas from Dubai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Popular destinations for UAE residents include Schengen countries (France, Switzerland, Italy), the UK, USA, Japan, and Singapore. We provide specialized assistance for all these regions.",
          },
        },
        {
          "@type": "Question",
          name: "What are the main documents required for a visitor visa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Generally, you need a valid passport, proof of residency (for expats), bank statements for 3-6 months, a No Objection Certificate (NOC) from your employer, and a detailed travel itinerary.",
          },
        },
        {
          "@type": "Question",
          name: "Can I get a tourist visa if I am visiting family?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, this is typically called a 'Family Visit' visa. In addition to standard documents, you will usually need an invitation letter from your relative and proof of your relationship.",
          },
        },
        {
          "@type": "Question",
          name: "How long does a tourist visa processing take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Processing times vary by country. Schengen visas often take 15–30 days, while USA and UK visas can take several weeks depending on appointment availability.",
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
      <TouristVisa />
    </div>
  )
}
