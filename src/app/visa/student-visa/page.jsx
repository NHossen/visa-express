import StudentVisa from '@/components/Client/StudentVisa/StudentVisa'
import React from 'react'
export const metadata = {
  title: "Student Visa Consultant Dubai & Dhaka | Study Abroad Experts",
  description:
    "Expert student visa assistance for UK, USA, Canada, Australia, and Europe. Our consultants in Dubai and Dhaka provide end-to-end support for university admissions, documentation, and study permit applications. Start your education journey today.",
  keywords: [
    "student visa consultant Dubai",
    "study abroad consultants Dhaka",
    "Canada student visa assistance UAE",
    "UK Tier 4 visa help Dubai",
    "USA F1 visa consultant Dhaka",
    "Australia study permit assistance",
    "Schengen student visa Dubai",
    "university admission help UAE",
    "student visa documentation services",
    "study in Europe from Bangladesh",
    "educational consultant Deira Dubai",
    "student visa interview coaching",
    "IELTS for student visa assistance",
    "Visa Express Hub education services",
  ],
  alternates: {
    canonical: "https://www.visaexpresshub.com/visa/student-visa",
  },
  openGraph: {
    title: "Global Student Visa & Study Abroad Services | Visa Express Hub",
    description:
      "Turn your dream of international education into reality. We offer specialized student visa processing for top universities worldwide with offices in Dubai and Dhaka.",
    url: "https://www.visaexpresshub.com/visa/student-visa",
    siteName: "Visa Express Hub",
    images: [
      {
        url: "/visa-express-hub-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Visa Express Hub - International Student Visa Specialists",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Expert Student Visa Consultants | Dubai & Dhaka",
    description:
      "Secure your student visa for the UK, USA, Canada, or Europe. Professional guidance on admissions and visas. Call +971 50 707 8334.",
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
      "@id": "https://www.visaexpresshub.com/visa/student-visa#service",
      name: "International Student Visa Consultancy",
      serviceType: "Educational & Immigration Services",
      provider: {
        "@id": "https://www.visaexpresshub.com/#organization",
      },
      description:
        "Specialized assistance for students seeking study permits and university admissions. We guide applicants through the CAS/I-20 process, financial proof requirements, and visa interview preparation.",
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Bangladesh" },
      ],
      offers: {
        "@type": "Offer",
        description: "End-to-end student visa processing and university placement support.",
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
      "@id": "https://www.visaexpresshub.com/visa/student-visa#webpage",
      url: "https://www.visaexpresshub.com/visa/student-visa",
      name: "Student Visa and Study Abroad Guide - Visa Express Hub",
      description: "Everything you need to know about applying for a student visa from Dubai or Dhaka.",
      isPartOf: { "@id": "https://www.visaexpresshub.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.visaexpresshub.com" },
          { "@type": "ListItem", position: 2, name: "Visa Services", item: "https://www.visaexpresshub.com/visa" },
          { "@type": "ListItem", position: 3, name: "Student Visa", item: "https://www.visaexpresshub.com/visa/student-visa" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which countries do you assist with for student visas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We specialize in student visas for the UK, USA (F-1), Canada (Study Permit), Australia, and various European countries including Germany, France, and Poland.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need an offer letter from a university before applying for a visa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, you must have a valid offer letter or Confirmation of Acceptance for Studies (CAS) from a recognized educational institution before the visa process begins. We can help you secure these admissions.",
          },
        },
        {
          "@type": "Question",
          name: "What financial documents are required for a student visa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most countries require proof of sufficient funds to cover tuition fees and living expenses, typically shown through bank statements (last 4-6 months), sponsor letters, or education loans.",
          },
        },
        {
          "@type": "Question",
          name: "Can Visa Express Hub help with scholarship applications?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we provide guidance on identifying and applying for merit-based and government-funded scholarships to help reduce your educational costs abroad.",
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
      
      <StudentVisa />
    </div>
  )
}
