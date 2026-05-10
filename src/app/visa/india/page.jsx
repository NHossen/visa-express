import TouristVisaIndia from '@/components/Client/India/India'
import React from 'react'
export const metadata = {
  title: "India Visa Assistance Dubai & Dhaka | Apply Online | Visa Express Hub",
  description:
    "Apply for your Indian E-Visa or Regular Sticker Visa from Dubai and Dhaka. Expert guidance for Indian Tourist, Business, and Medical visas. Fast processing for all nationalities. Call +971 50 707 8334 or email info@visaexpresshub.com.",
  keywords: [
    "India visa assistance Dubai",
    "Indian e-visa for UAE residents",
    "apply for India visa from Dhaka",
    "Indian tourist visa consultant Dubai",
    "India business visa UAE",
    "Indian medical visa assistance Dhaka",
    "India visa for Bangladeshi citizens",
    "Indian visa application center Dubai",
    "India e-tourist visa UAE",
    "urgent India visa Dubai",
    "visa for India from UAE",
    "India visa requirements for foreigners in Dubai",
    "Indian visa documentation services",
    "Visa Express Hub India visa",
  ],
  alternates: {
    canonical: "https://www.visaexpresshub.com/visa/india",
  },
  openGraph: {
    title: "Indian Visa Services | Expert Consultants in Dubai & Dhaka",
    description:
      "Get your India visa quickly and easily. We specialize in E-Visas and sticker visas for tourists and business travelers. Professional support at our Dubai and Dhaka offices.",
    url: "https://www.visaexpresshub.com/visa/india",
    siteName: "Visa Express Hub",
    images: [
      {
        url: "/visa-express-hub-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Visa Express Hub - Indian Visa Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply for Indian Visa from Dubai & Dhaka | Visa Express Hub",
    description:
      "Hassle-free India visa processing. E-visa and regular visa support for all categories. Call +971 50 707 8334 today.",
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
      "@id": "https://www.visaexpresshub.com/visa/india#service",
      name: "Indian Visa Consultancy Services",
      serviceType: "Visa Application Support",
      provider: {
        "@id": "https://www.visaexpresshub.com/#organization",
      },
      description:
        "Comprehensive support for Indian visa applications. We assist with E-Visas (Tourist, Business, Medical) and regular sticker visas through BLS or IVAC, ensuring all documentation meets government standards.",
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Bangladesh" },
      ],
      offers: {
        "@type": "Offer",
        description: "Professional processing for Indian E-visas and documentation for sticker visas.",
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
      "@id": "https://www.visaexpresshub.com/visa/india#webpage",
      url: "https://www.visaexpresshub.com/visa/india",
      name: "Indian Visa Requirements & Application - Visa Express Hub",
      description: "Detailed guide for applying for an Indian visa from the UAE or Bangladesh.",
      isPartOf: { "@id": "https://www.visaexpresshub.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.visaexpresshub.com" },
          { "@type": "ListItem", position: 2, name: "Visa Services", item: "https://www.visaexpresshub.com/visa" },
          { "@type": "ListItem", position: 3, name: "India Visa", item: "https://www.visaexpresshub.com/visa/india" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Who is eligible for an Indian E-Visa from Dubai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most nationalities residing in the UAE are eligible for an Indian E-Visa for tourism, business, or medical purposes. It is typically processed within 72 hours.",
          },
        },
        {
          "@type": "Question",
          name: "How can Bangladeshi citizens apply for an Indian visa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Bangladeshi citizens must apply for a sticker visa through the Indian Visa Application Center (IVAC). We provide expert assistance in document preparation and appointment booking for all categories.",
          },
        },
        {
          "@type": "Question",
          name: "What documents are required for an Indian Business Visa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Requirements include a valid passport, invitation letter from the Indian company, a recommendation letter from the local chamber of commerce or employer, and financial documents.",
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
      <TouristVisaIndia />
    </div>
  )
}
