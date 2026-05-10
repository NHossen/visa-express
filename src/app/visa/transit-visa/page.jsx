import TransitVisaSearch from '@/components/Client/TransitVisa/TransitVisa'
import React from 'react'

export const metadata = {
  title: "Transit Visa Assistance Dubai & Dhaka | Global Layover Permits",
  description:
    "Expert assistance for transit visas worldwide. We help travelers in Dubai and Dhaka secure layover permits for the UK, Schengen Area, USA, and Canada. Ensure a smooth journey with Visa Express Hub. Call +971 50 707 8334.",
  keywords: [
    "transit visa assistance Dubai",
    "layover visa help UAE",
    "UK transit visa consultant Dubai",
    "Schengen transit visa UAE",
    "USA C1 transit visa consultant",
    "Canada transit visa assistance Dhaka",
    "airport transit visa requirements",
    "layover permit services Dubai",
    "transit visa for Indian citizens in Dubai",
    "transit visa for Bangladeshi citizens",
    "Europe transit visa help",
    "travel documentation for layovers",
    "urgent transit visa Dubai",
    "Visa Express Hub transit services",
  ],
  alternates: {
    canonical: "https://www.visaexpresshub.com/visa/transit-visa",
  },
  openGraph: {
    title: "Global Transit Visa Solutions | Visa Express Hub",
    description:
      "Don't let a layover ruin your travel plans. Our experts provide fast and reliable transit visa processing for all major global hubs. Professional support in Dubai and Dhaka.",
    url: "https://www.visaexpresshub.com/visa/transit-visa",
    siteName: "Visa Express Hub",
    images: [
      {
        url: "/visa-express-hub-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Visa Express Hub - Global Transit Visa Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fast Transit Visa Processing | Dubai & Dhaka",
    description:
      "Secure your transit visa for the UK, USA, or Europe. Professional guidance for short-term layover permits. Call +971 50 707 8334.",
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
      "@id": "https://www.visaexpresshub.com/visa/transit-visa#service",
      name: "Transit Visa & Layover Consultancy",
      serviceType: "Travel Documentation Services",
      provider: {
        "@id": "https://www.visaexpresshub.com/#organization",
      },
      description:
        "Comprehensive support for travelers requiring transit visas. We assist with document verification, airline requirement checks, and application submission for short-term airport transit and layover stays.",
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Bangladesh" },
      ],
      offers: {
        "@type": "Offer",
        description: "Standard and express transit visa documentation for global destinations.",
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
      "@id": "https://www.visaexpresshub.com/visa/transit-visa#webpage",
      url: "https://www.visaexpresshub.com/visa/transit-visa",
      name: "Transit Visa Guide and Requirements - Visa Express Hub",
      description: "Everything you need to know about applying for a transit visa from Dubai or Dhaka.",
      isPartOf: { "@id": "https://www.visaexpresshub.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.visaexpresshub.com" },
          { "@type": "ListItem", position: 2, name: "Visa Services", item: "https://www.visaexpresshub.com/visa" },
          { "@type": "ListItem", position: 3, name: "Transit Visa", item: "https://www.visaexpresshub.com/visa/transit-visa" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do I need a transit visa for a layover in London?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It depends on your nationality and whether you are passing through border control. Many nationalities require a Direct Airside Transit Visa (DATV). We can check your specific eligibility based on your passport and flight path.",
          },
        },
        {
          "@type": "Question",
          name: "Can I leave the airport with a transit visa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A 'Visitor in Transit' visa usually allows you to leave the airport for up to 48 hours. If you only have an 'Airport Transit' visa, you must remain in the international zone.",
          },
        },
        {
          "@type": "Question",
          name: "What documents are required for a transit visa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Typically, you need your confirmed onward flight ticket, a valid visa for your final destination, a valid passport, and proof of residency in the UAE or Bangladesh.",
          },
        },
        {
          "@type": "Question",
          name: "How long does a transit visa take to process?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most transit visas are processed within 5 to 15 working days. We recommend applying as soon as your main travel is confirmed.",
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
      
      <TransitVisaSearch />
    </div>
  )
}
