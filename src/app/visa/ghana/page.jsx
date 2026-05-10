import TouristVisaGhanaianNationals from '@/components/Client/Ghana/Ghana'
import React from 'react'

export const metadata = {
  title: "Visa Requirements for Ghanaian Nationals | Visa Express Hub",
  description:
    "Expert visa assistance for Ghana passport holders. Guidance on Schengen, UK, USA, Canada, and Asian visas for Ghanaian nationals residing in Dubai & Dhaka. Check full requirements and call +971 50 707 8334.",
  keywords: [
    "visa for Ghanaian nationals in Dubai",
    "Ghana passport visa requirements",
    "Schengen visa for Ghana citizens in UAE",
    "UK visa for Ghanaian nationals",
    "USA visa assistance for Ghanaians",
    "Canada visa requirements for Ghana citizens",
    "Ghanaian expat visa services Dubai",
    "travel from Dubai to Ghana",
    "visa consultant for Ghanaians in Dhaka",
    "Ghanaian passport visa free countries list",
    "Schengen visa requirements for Ghanaians",
    "Ghanaian community visa help Dubai",
    "apply for Europe visa from Ghana",
    "Ghanaian student visa assistance",
    "Visa Express Hub Ghana services",
  ],
  alternates: {
    canonical: "https://www.visaexpresshub.com/visa/ghana",
  },
  openGraph: {
    title: "Visa Assistance for Ghana Passport Holders | Dubai & Dhaka",
    description:
      "Are you a Ghanaian national living in the UAE or Bangladesh? We provide specialized visa documentation and application support for your global travel needs.",
    url: "https://www.visaexpresshub.com/visa/ghana",
    siteName: "Visa Express Hub",
    images: [
      {
        url: "/visa-express-hub-banner.jpg",
        width: 1200,
        height: 630,
        alt: "Visa Express Hub - Visa Services for Ghanaian Citizens",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Visa Help for Ghanaians | Visa Express Hub",
    description:
      "Expert visa support for Ghana nationals. Schengen, UK, USA & Canada visa processing from Dubai and Dhaka. Call +971 50 707 8334.",
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
      "@id": "https://www.visaexpresshub.com/visa/ghana#service",
      name: "Visa Consultancy for Ghanaian Nationals",
      serviceType: "Passport & Visa Services",
      provider: {
        "@id": "https://www.visaexpresshub.com/#organization",
      },
      description:
        "Specialized visa application support for citizens of Ghana. We provide document checklists, interview preparation, and submission assistance for Ghanaian passport holders residing in the UAE and Bangladesh.",
      areaServed: [
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Bangladesh" },
        { "@type": "Country", name: "Ghana" }
      ],
      offers: {
        "@type": "Offer",
        description: "Comprehensive visa documentation for Ghana citizens traveling to Europe, North America, and Asia.",
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
      "@id": "https://www.visaexpresshub.com/visa/ghana#webpage",
      url: "https://www.visaexpresshub.com/visa/ghana",
      name: "Visa Requirements for Ghanaians - Visa Express Hub",
      description: "Everything Ghanaian nationals need to know about applying for international visas from Dubai or Dhaka.",
      isPartOf: { "@id": "https://www.visaexpresshub.com/#organization" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.visaexpresshub.com" },
          { "@type": "ListItem", position: 2, name: "Visa Services", item: "https://www.visaexpresshub.com/visa" },
          { "@type": "ListItem", position: 3, name: "Ghana Nationals", item: "https://www.visaexpresshub.com/visa/ghana" },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Do Ghanaian nationals need a visa for Europe (Schengen)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Ghanaian passport holders require a Schengen visa to enter the European Schengen Area. If you are a resident in the UAE, you can apply through the respective embassy in Dubai or Abu Dhabi with our assistance.",
          },
        },
        {
          "@type": "Question",
          name: "What are the requirements for a UK visa for Ghanaians living in Dubai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Key requirements include a valid Ghana passport, UAE residency visa (valid for 3-6 months), 6 months of bank statements, a salary certificate/NOC from your employer, and proof of accommodation in the UK.",
          },
        },
        {
          "@type": "Question",
          name: "Can Visa Express Hub help with Ghana passport renewal or entry visas to Ghana?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "While we primarily focus on outbound visas for Ghanaians, we also assist foreign nationals with entry visas to Ghana and can provide guidance on document requirements for Ghanaian consular services.",
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
      
      <TouristVisaGhanaianNationals />
    </div>
  )
}
