import ContactPage from '@/components/Client/Contact/Contact'
import React from 'react'
export const metadata = {
  title: "Contact Visa Express Hub | Visa Assistance in Dubai & Dhaka",
  description:
    "Speak with our expert visa consultants in Dubai (UAE) and Dhaka (Bangladesh). We assist with Schengen, UK, Canada, USA, Australia tourist, student, and work visas. Call +971 50 707 8334 or email info@visaexpresshub.com.",
  keywords: [
    "visa assistance Dubai",
    "visa consultant Dubai UAE",
    "visa consultant Dhaka Bangladesh",
    "Visa Express Hub contact",
    "Schengen visa help Dubai",
    "Canada visa consultant UAE",
    "UK visa assistance Dubai",
    "USA visa consultant Dubai",
    "Australia visa Dubai",
    "student visa consultant Dubai",
    "work visa Dubai",
    "tourist visa Dubai",
    "travel documentation services UAE",
    "visa agency Deira Dubai",
    "visa office Dhaka Dhanmondi",
    "immigration consultants Dubai",
    "visa application help UAE",
    "visa appointment Dubai",
  ],
  alternates: {
    canonical: "https://www.visaexpresshub.com/contact",
  },
  openGraph: {
    title: "Contact Visa Express Hub | Expert Visa Assistance in Dubai & Dhaka",
    description:
      "Get professional visa support from our offices in Dubai, UAE and Dhaka, Bangladesh. We handle tourist, student, and work visas for 50+ countries. Call +971 50 707 8334.",
    url: "https://www.visaexpresshub.com/contact",
    siteName: "Visa Express Hub",
    images: [
      {
        url: "/visa-express-hub-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Visa Express Hub - Contact our global visa specialists in Dubai and Dhaka",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Visa Express Hub | Visa Consultants Dubai & Dhaka",
    description:
      "Expert visa assistance for 50+ countries. Offices in Dubai (UAE) and Dhaka (Bangladesh). Call +971 50 707 8334 today.",
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
        "Visa Express Hub is a professional visa consultancy and travel documentation agency with offices in Dubai (UAE) and Dhaka (Bangladesh), serving clients worldwide with tourist, student, work, and business visa applications for 50+ countries.",
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
      areaServed: [
        "United Arab Emirates",
        "Bangladesh",
        "United Kingdom",
        "Canada",
        "United States",
        "Australia",
        "Schengen Area",
        "Worldwide",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Visa Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Schengen Visa Assistance" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "UK Visa Assistance" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Canada Visa Assistance" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "USA Visa Assistance" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Australia Visa Assistance" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Student Visa Assistance" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Work Visa Assistance" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Tourist Visa Assistance" } },
        ],
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "09:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday", "Sunday"],
          opens: "10:00",
          closes: "16:00",
        },
      ],
      sameAs: [
        "https://www.facebook.com/visaexpresshub",
        "https://www.instagram.com/visaexpresshub",
        "https://www.linkedin.com/company/visaexpresshub",
      ],
    },
    {
      "@type": "ContactPage",
      "@id": "https://www.visaexpresshub.com/contact#webpage",
      url: "https://www.visaexpresshub.com/contact",
      name: "Contact Visa Express Hub",
      description:
        "Contact our visa specialists in Dubai and Dhaka for expert guidance on tourist, student, work, and business visas for 50+ countries.",
      isPartOf: { "@id": "https://www.visaexpresshub.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.visaexpresshub.com" },
          { "@type": "ListItem", position: 2, name: "Contact", item: "https://www.visaexpresshub.com/contact" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How can I contact Visa Express Hub in Dubai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can reach our Dubai office by calling +971 50 707 8334, emailing info@visaexpresshub.com, or visiting us at Al Nasser Building, Deira, Dubai, UAE. Our office hours are Sunday to Thursday, 9 AM to 6 PM.",
          },
        },
        {
          "@type": "Question",
          name: "Does Visa Express Hub have an office in Dhaka, Bangladesh?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Visa Express Hub has a branch office in Dhanmondi, Dhaka, Bangladesh. You can contact us via phone or email to schedule an appointment at our Dhaka office.",
          },
        },
        {
          "@type": "Question",
          name: "Which visa types does Visa Express Hub assist with?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We assist with a wide range of visa types including Schengen visas, UK visas, Canada visas, USA visas, Australia visas, student visas, work visas, tourist visas, and business visas for 50+ countries worldwide.",
          },
        },
        {
          "@type": "Question",
          name: "How long does visa processing take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Processing times vary by visa type and destination country. Schengen visas typically take 15–30 days, UK visas 3–8 weeks, and Canadian visas 4–12 weeks. Contact our consultants for a personalized timeline based on your specific case.",
          },
        },
        {
          "@type": "Question",
          name: "Can I apply for a visa consultation online?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Visa Express Hub offers online consultations. You can submit your enquiry via our contact form, email us at info@visaexpresshub.com, or WhatsApp us at +971 50 707 8334 for a remote consultation.",
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
      <ContactPage />
    </div>
  )
}
