


import VisaProcessingTimeTrackerClient from '@/components/Client/VisaProcessing/VisaProcessing'
import React from 'react'
export const metadata = {
  title: "Visa Processing Time Tracker 2026 | Real-Time Updates Dubai & Dhaka",
  description:
    "Check current visa processing times for UK, USA, Canada, Australia, and Schengen countries. Get real-time updates for UAE residents and Bangladeshi citizens. Plan your travel with accuracy using Visa Express Hub. Call +971 50 707 8334.",
  keywords: [
    "visa processing time tracker 2026",
    "how long does UK visa take from Dubai",
    "Canada visa processing time Dhaka 2026",
    "Schengen visa waiting time UAE",
    "USA visa appointment wait time Dhaka",
    "Australia visa processing time 2026",
    "urgent Dubai visa processing time",
    "India visa processing for Bangladeshis",
    "UK priority visa processing time Dubai",
    "visa wait time calculator 2026",
    "current immigration timelines UAE",
    "Visa Express Hub tracker",
    "fast track visa processing Dubai",
  ],
  alternates: {
    canonical: "https://www.visaexpresshub.com/visa-processing-time-tracker",
  },
  openGraph: {
    title: "Visa Processing Time Tracker | Live Immigration Timelines 2026",
    description:
      "Avoid travel delays. Monitor the latest processing speeds for tourist, student, and work visas globally. Expert insights for travelers in Dubai and Dhaka.",
    url: "https://www.visaexpresshub.com/visa-processing-time-tracker",
    siteName: "Visa Express Hub",
    images: [
      {
        url: "/visa-express-hub-tracker-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Visa Express Hub - Global Visa Processing Time Tracker",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Real-Time Visa Processing Times | Dubai & Dhaka",
    description:
      "Is your visa delayed? Check the latest average processing times for all major destinations in 2026. Call +971 50 707 8334 for priority services.",
    images: ["/visa-express-hub-tracker-banner.jpg"],
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
      "@type": "SoftwareApplication",
      "@id": "https://www.visaexpresshub.com/visa-processing-time-tracker#software",
      name: "Visa Processing Time Tracker",
      applicationCategory: "TravelApplication",
      operatingSystem: "Web",
      description:
        "A real-time data tool providing average visa processing times for various visa categories (Tourist, Work, Student) across major global destinations for residents of UAE and Bangladesh.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://www.visaexpresshub.com/visa-processing-time-tracker#webpage",
      url: "https://www.visaexpresshub.com/visa-processing-time-tracker",
      name: "Live Visa Processing Time Tracker 2026",
      description: "Daily updated timelines for international visa approvals and embassy wait times.",
      isPartOf: { "@id": "https://www.visaexpresshub.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.visaexpresshub.com" },
          { "@type": "ListItem", position: 2, name: "Visa Services", item: "https://www.visaexpresshub.com/visa" },
          { "@type": "ListItem", position: 3, name: "Processing Time Tracker", item: "https://www.visaexpresshub.com/visa-processing-time-tracker" },
        ],
      },
    },
    {
      "@type": "Table",
      "about": "2026 Average Visa Processing Times",
      "mainEntity": [
        { "Destination": "UK", "Standard": "3 Weeks", "Priority": "5 Days" },
        { "Destination": "Schengen", "Standard": "15-21 Days", "Priority": "N/A" },
        { "Destination": "USA", "Standard": "30-60 Days", "Priority": "Varies" },
        { "Destination": "Canada", "Standard": "4-8 Weeks", "Priority": "Varies" },
        { "Destination": "UAE (Urgent)", "Standard": "24-48 Hours", "Priority": "4-12 Hours" }
      ]
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
  <VisaProcessingTimeTrackerClient />
    </div>
  )
}
