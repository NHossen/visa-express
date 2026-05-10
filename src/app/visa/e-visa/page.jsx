import EVISAMainPage from '@/components/Client/EVisa/EVisa'
import React from 'react'
export const metadata = {
  title: "Fast E-Visa Services Dubai & Dhaka | Apply Online | Visa Express Hub",
  description:
    "Apply for electronic visas (E-Visas) for Turkey, GCC, Azerbaijan, Singapore, and more. Fast processing, online documentation, and expert support in Dubai and Dhaka. Get your visa in as little as 24-72 hours. Call +971 50 707 8334.",
  keywords: [
    "e-visa services Dubai",
    "apply e-visa online UAE",
    "Turkey e-visa consultant Dubai",
    "Azerbaijan e-visa help Dhaka",
    "Singapore e-visa assistance Dubai",
    "GCC e-visa for residents",
    "Saudi Arabia e-visa consultant UAE",
    "online visa application Dubai",
    "fast e-visa processing Dhaka",
    "E-visa agency Deira Dubai",
    "Uzbekistan e-visa assistance",
    "Vietnam e-visa help UAE",
    "digital visa services Bangladesh",
    "urgent e-visa Dubai",
    "Visa Express Hub e-visa support",
  ],
  alternates: {
    canonical: "https://www.visaexpresshub.com/visa/e-visa",
  },
  openGraph: {
    title: "Quick & Easy E-Visa Processing | Visa Express Hub",
    description:
      "Skip the embassy queues. Our E-visa specialists provide quick digital visa solutions for over 30 countries. Safe, secure, and professional online processing.",
    url: "https://www.visaexpresshub.com/visa/e-visa",
    siteName: "Visa Express Hub",
    images: [
      {
        url: "/visa-express-hub-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Visa Express Hub - Fast Electronic Visa Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apply Online for E-Visas | Dubai & Dhaka Experts",
    description:
      "Fast-track your travel with our E-visa services. Turkey, GCC, Europe & Asia digital visas handled professionally. Call +971 50 707 8334.",
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
      "@id": "https://www.visaexpresshub.com/visa/e-visa#service",
      name: "Electronic Visa (E-Visa) Processing",
      serviceType: "Digital Visa Consultancy",
      provider: {
        "@id": "https://www.visaexpresshub.com/#organization",
      },
      description:
        "End-to-end digital visa solutions. We handle the entire online application process, document scanning, and payment for electronic visas across Asia, Europe, and the Middle East.",
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Bangladesh" },
      ],
      offers: {
        "@type": "Offer",
        description: "Standard and express e-visa processing for over 30 countries.",
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
      "@id": "https://www.visaexpresshub.com/visa/e-visa#webpage",
      url: "https://www.visaexpresshub.com/visa/e-visa",
      name: "E-Visa Online Application Guide - Visa Express Hub",
      description: "Quick and secure online visa applications for residents of Dubai and Dhaka.",
      isPartOf: { "@id": "https://www.visaexpresshub.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.visaexpresshub.com" },
          { "@type": "ListItem", position: 2, name: "Visa Services", item: "https://www.visaexpresshub.com/visa" },
          { "@type": "ListItem", position: 3, name: "E-Visa", item: "https://www.visaexpresshub.com/visa/e-visa" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is an E-visa and how does it work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An E-visa is an official document issued electronically by a government that permits travel to and within a country. It is linked to your passport number and replaces the traditional sticker visa.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to get an E-visa from Dubai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most E-visas (like Turkey or Azerbaijan) are processed within 24 to 72 hours. Some countries offer express services that can deliver the visa within a few hours.",
          },
        },
        {
          "@type": "Question",
          name: "Which countries offer E-visas for Bangladesh passport holders?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Bangladeshi citizens can apply for E-visas to many countries including Uzbekistan, Cambodia, Vietnam, Turkey (with certain conditions), and several African nations. Our Dhaka office can guide you on the latest eligibility rules.",
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
      <EVISAMainPage />
    </div>
  )
}
