import ScholarshipsMain from '@/components/Client/Scholarships/Scholarships'
import React from 'react'

export const metadata = {
  title: "Scholarship Assistance & Study Abroad Consultants | Visa Express Hub",
  description:
    "Apply for fully funded international scholarships with Visa Express Hub. Expert guidance for student visas and financial aid in the UK, USA, Canada, and Europe. Offices in Dubai and Dhaka. Call +971 50 707 8334.",
  keywords: [
    "international scholarships for students",
    "fully funded scholarships 2026",
    "study abroad consultants Dubai",
    "scholarship assistance Dhaka",
    "UK university scholarships for international students",
    "Canada student visa and scholarship help",
    "USA merit-based scholarships Dubai",
    "Erasmus Mundus scholarship assistance",
    "Australia research scholarships UAE",
    "financial aid for study abroad",
    "undergraduate scholarships international",
    "postgraduate scholarship consultant",
    "PhD funding assistance Dubai",
    "student visa consultant Dhaka Dhanmondi",
    "visa express hub education services",
    "IELTS and scholarship guidance UAE",
  ],
  alternates: {
    canonical: "https://www.visaexpresshub.com/scholarships",
  },
  openGraph: {
    title: "International Scholarship Assistance | Study Abroad Experts",
    description:
      "Your bridge to global education. We help students secure scholarships and study visas for top universities worldwide. Visit our Dubai or Dhaka offices today.",
    url: "https://www.visaexpresshub.com/scholarships",
    siteName: "Visa Express Hub",
    images: [
      {
        url: "/visa-express-hub-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Visa Express Hub - Scholarship and Student Visa Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Study Abroad & Scholarship Consultants | Visa Express Hub",
    description:
      "Secure your future with fully funded scholarships. Expert student visa assistance in Dubai and Dhaka. Call +971 50 707 8334.",
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
      "@id": "https://www.visaexpresshub.com/scholarships#service",
      name: "International Scholarship & Education Consultancy",
      serviceType: "Education Consultancy",
      provider: {
        "@id": "https://www.visaexpresshub.com/#organization",
      },
      description:
        "Professional assistance for students seeking international scholarships, university admissions, and student visas for global destinations including the UK, USA, Canada, and Australia.",
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Bangladesh" },
      ],
      offers: {
        "@type": "Offer",
        description: "Free initial assessment for scholarship eligibility and university placement.",
      },
    },
    {
      "@type": "TravelAgency", // Keeping Organization type consistent with your site structure
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
      "@id": "https://www.visaexpresshub.com/scholarships#webpage",
      url: "https://www.visaexpresshub.com/scholarships",
      name: "Scholarship Guidance and Student Services",
      description: "Find fully funded scholarships and get expert study abroad advice from Visa Express Hub.",
      isPartOf: { "@id": "https://www.visaexpresshub.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.visaexpresshub.com" },
          { "@type": "ListItem", position: 2, name: "Scholarships", item: "https://www.visaexpresshub.com/scholarships" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Can Visa Express Hub help me find fully funded scholarships?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, we specialize in identifying fully funded and partial scholarships based on your academic profile, including government-funded programs like Chevening, Erasmus, and university-specific merit awards.",
          },
        },
        {
          "@type": "Question",
          name: "What countries do you cover for scholarship assistance?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We provide scholarship and student visa assistance for top destinations including the United Kingdom, USA, Canada, Australia, Germany, and several other European countries.",
          },
        },
        {
          "@type": "Question",
          name: "Do I need an IELTS score for scholarship applications?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most international scholarships require proof of English proficiency (IELTS, TOEFL, or Duolingo). Our consultants can guide you on the specific requirements for your target university.",
          },
        },
        {
          "@type": "Question",
          name: "Is there a fee for scholarship consultancy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer a free initial consultation to evaluate your eligibility. For end-to-end documentation, application, and visa processing, please contact our Dubai or Dhaka office for service details.",
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
      <ScholarshipsMain />
    </div>
  )
}
