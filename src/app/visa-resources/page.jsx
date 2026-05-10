import React from 'react'
import VisaResources from '@/components/Client/VisaResources/VisaResources'

export const metadata = {
  title: "Global Visa Resources & Smart Tools | Visa Express Hub",
  description:
    "Access professional visa tools: AI-powered SOP & NOC generators, country-specific document checklists, and real-time processing trackers. Your one-stop hub for Schengen, UK, USA, and Canada visa preparation in Dubai and Dhaka.",
  keywords: [
    "visa resources and tools",
    "AI visa document generator",
    "SOP generator for student visa",
    "NOC letter sample for visa Dubai",
    "Schengen visa checklist 2026",
    "UK visa document list Dhaka",
    "US visa B1 B2 guide UAE",
    "Australia PR points calculator",
    "scholarship finder for international students",
    "salary certificate for visa application",
    "visa checker for UAE residents",
    "travel document generator online",
    "Visa Express Hub resources",
  ],
  alternates: {
    canonical: "https://www.visaexpresshub.com/visa-resources",
  },
  openGraph: {
    title: "Visa Tools & Professional Document Generators | Visa Express Hub",
    description:
      "Prepare your visa application with precision. Use our AI tools to generate SOPs, NOCs, and checklists tailored for 2026 immigration standards in the UAE and Bangladesh.",
    url: "https://www.visaexpresshub.com/visa-resources",
    siteName: "Visa Express Hub",
    images: [
      {
        url: "/visa-express-hub-resources-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Visa Express Hub - Smart Visa Tools and Resources",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Visa Prep Tools | Generate SOP, NOC & Checklists",
    description:
      "Take the guesswork out of visa applications. Access our smart trackers and document generators today. Professional support in Dubai & Dhaka.",
    images: ["/visa-express-hub-resources-banner.jpg"],
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
      "@type": "WebPage",
      "@id": "https://www.visaexpresshub.com/visa-resources#webpage",
      url: "https://www.visaexpresshub.com/visa-resources",
      name: "International Visa Resources & Application Tools",
      description: "A comprehensive suite of tools for travelers, including AI document generators, smart checklists, and processing trackers.",
      isPartOf: { "@id": "https://www.visaexpresshub.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.visaexpresshub.com" },
          { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.visaexpresshub.com/visa-resources" },
        ],
      },
    },
    {
      "@type": "ItemList",
      name: "Popular Visa Guides & Tools",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Schengen Visa Guide" },
        { "@type": "ListItem", position: 2, name: "Canada Student Visa Assistance" },
        { "@type": "ListItem", position: 3, name: "UK Visa Requirements 2026" },
        { "@type": "ListItem", position: 4, name: "USA B1/B2 Visa Prep" },
        { "@type": "ListItem", position: 5, name: "Australia PR Points Guide" },
        { "@type": "ListItem", position: 6, name: "Visa Processing Time Tracker" },
        { "@type": "ListItem", position: 7, name: "International Scholarship Finder" },
        { "@type": "ListItem", position: 8, name: "AI Document Generator (NOC/SOP)" }
      ],
    },
    {
      "@type": "SoftwareApplication",
      name: "Visa Document AI Generator",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: "AI-powered tool to generate Statement of Purpose (SOP), No Objection Certificates (NOC), and Power of Attorney for visa applications.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD"
      }
    }
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
      <VisaResources />
    </div>
  )
}
