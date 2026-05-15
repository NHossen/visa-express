import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import WhatsAppFloatingButton from "@/components/Client/WhatsAppFloatingButton/WhatsAppFloatingButton";
import Scroll from "@/components/Client/Scroll/Scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// ─── COMPREHENSIVE SEO METADATA ───────────────────────────────────────────────
export const metadata = {
  title: {
    default: "Visa Express Hub | Global Visa Requirements, Guides & Checklists",
    template: "%s | Visa Express Hub",
  },
  description:
    "Visa Express Hub provides visa requirements, processing times, document checklists, and application guides for tourist, student, work, and transit visas across 195+ countries. Free SOP templates, NOC letters & real-time processing tracker. Corporate office Dubai — +971 50 707 8334.",
  keywords: [
    // Core intent keywords
    "visa requirements",
    "visa guide",
    "how to apply for visa",
    "visa application checklist",
    "visa processing time",
    "visa documents required",
    // Visa type keywords
    "tourist visa",
    "student visa",
    "work visa",
    "transit visa",
    "business visa",
    "Schengen visa",
    "UAE visa",
    "Dubai visa",
    "US visa requirements",
    "UK visa requirements",
    "Canada visa requirements",
    "Australia visa requirements",
    // Template & tool keywords
    "SOP template visa",
    "NOC letter template",
    "visa application guide",
    "free visa SOP",
    "visa cover letter",
    // Brand & local keywords
    "Visa Express Hub",
    "visa consultant Dubai",
    "visa services UAE",
    "Eammu Holidays",
    "visa help Dubai",
    "visa checklist download",
  ],
  metadataBase: new URL("https://visaexpresshub.com"),
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Visa Express Hub", url: "https://visaexpresshub.com" }],
  creator: "Visa Express Hub",
  publisher: "Eammu Holidays",
  category: "Travel & Visa Services",
  classification: "Visa Information Portal",
  openGraph: {
    title: "Visa Express Hub – Global Visa Information Center",
    description:
      "Free visa guides, real-time processing time tracker, and downloadable document checklists for 195+ countries. SOP templates & NOC letters included.",
    url: "https://visaexpresshub.com",
    siteName: "Visa Express Hub",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://visaexpresshub.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Visa Express Hub – Your Global Visa Guide",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Visa Express Hub – Global Visa Information Center",
    description:
      "Free visa guides, processing time tracker & document checklists for 195+ countries.",
    images: ["https://visaexpresshub.com/og-image.png"],
    creator: "@VisaExpressHub",
    site: "@VisaExpressHub",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/visa_express_hub_log.png", sizes: "16x16", type: "image/png" },
      { url: "/visa_express_hub_log.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/visa_express_hub_log.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#0047AB" }],
  },
  manifest: "/site.webmanifest",
  verification: {
    // Add your verification tokens here after setup:
    // google: "YOUR_GOOGLE_SEARCH_CONSOLE_TOKEN",
    // bing: "YOUR_BING_WEBMASTER_TOKEN",
  },
  other: {
    // Dublin Core metadata for extra crawlability
    "DC.title": "Visa Express Hub",
    "DC.description":
      "Global visa requirements, processing times, document checklists, and application guides for 195+ countries.",
    "DC.publisher": "Eammu Holidays",
    "DC.language": "en",
    "DC.coverage": "Worldwide",
    "DC.subject": "Visa Information, Travel Documentation, Visa Application",
    // Geo tags for Dubai office — helps local SEO
    "geo.region": "AE-DU",
    "geo.placename": "Dubai",
    "geo.position": "25.2048;55.2708",
    ICBM: "25.2048, 55.2708",
    // Contact
    "contact:phone_number": "+971507078334",
  },
};

// ─── STRUCTURED DATA SCHEMAS ──────────────────────────────────────────────────
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    // 1. WebSite — triggers sitelinks search box in Google
    {
      "@type": "WebSite",
      "@id": "https://visaexpresshub.com/#website",
      url: "https://visaexpresshub.com",
      name: "Visa Express Hub",
      alternateName: ["Visa Express", "Visa Hub", "VEH" , "Visa"],
      description:
        "Global visa requirements, processing times, document checklists, and application guides for 195+ countries.",
      inLanguage: "en-US",
      publisher: { "@id": "https://visaexpresshub.com/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://visaexpresshub.com/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },

    // 2. Organization
    {
      "@type": "Organization",
      "@id": "https://visaexpresshub.com/#organization",
      name: "Visa Express Hub",
      alternateName: "Visa",
      url: "https://visaexpresshub.com",
      logo: {
        "@type": "ImageObject",
        "@id": "https://visaexpresshub.com/#logo",
        url: "https://visaexpresshub.com/logo.png",
        contentUrl: "https://visaexpresshub.com/logo.png",
        width: 512,
        height: 512,
        caption: "Visa Express Hub",
      },
      image: { "@id": "https://visaexpresshub.com/#logo" },
      description:
        "Visa Express Hub provides free visa requirements, processing times, document checklists, and application guides for tourist, student, work, and transit visas across 195+ countries.",
      foundingLocation: {
        "@type": "Place",
        name: "Dubai, United Arab Emirates",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+971-50-707-8334",
          contactType: "customer service",
          areaServed: ["AE", "Worldwide"],
          availableLanguage: ["English", "Arabic"],
          hoursAvailable: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "09:00",
            closes: "18:00",
          },
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dubai",
        addressRegion: "Dubai",
        addressCountry: "AE",
      },
      sameAs: [
        // Add your verified social profiles:
        // "https://www.facebook.com/VisaExpressHub",
        // "https://www.instagram.com/visaexpresshub",
        // "https://twitter.com/VisaExpressHub",
        // "https://www.linkedin.com/company/visa-express-hub",
        // "https://www.youtube.com/@VisaExpressHub",
      ],
      funder: {
        "@type": "Organization",
        name: "Eammu Holidays",
        url: "https://eammu.com", // Update if Eammu has its own site
      },
    },

    // 3. LocalBusiness — critical for "visa services near me" / Dubai local searches
    {
      "@type": ["LocalBusiness", "TravelAgency"],
      "@id": "https://visaexpresshub.com/#localbusiness",
      name: "Visa Express Hub",
      image: "https://visaexpresshub.com/og-image.png",
      url: "https://visaexpresshub.com",
      telephone: "+971507078334",
      priceRange: "Free",
      description:
        "Dubai-based visa information portal offering free visa guides, document checklists, SOP templates, NOC letters, and real-time processing time tracking for 195+ countries. Sponsored by Eammu Holidays.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Corporate Office",
        addressLocality: "Dubai",
        addressRegion: "Dubai",
        postalCode: "00000",
        addressCountry: "AE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 25.2048,
        longitude: 55.2708,
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "09:00",
          closes: "18:00",
        },
      ],
      areaServed: {
        "@type": "Place",
        name: "Worldwide",
      },
      hasMap: "https://maps.google.com/?q=Dubai,UAE",
      parentOrganization: {
        "@type": "Organization",
        name: "Eammu Holidays",
      },
    },

    // 4. WebPage — Homepage entity
    {
      "@type": "WebPage",
      "@id": "https://visaexpresshub.com/#webpage",
      url: "https://visaexpresshub.com",
      name: "Visa Express Hub | Global Visa Requirements, Guides & Checklists",
      isPartOf: { "@id": "https://visaexpresshub.com/#website" },
      about: { "@id": "https://visaexpresshub.com/#organization" },
      description:
        "Free visa requirements, processing times, document checklists, and application guides for tourist, student, work, and transit visas across 195+ countries.",
      inLanguage: "en-US",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://visaexpresshub.com",
          },
        ],
      },
    },

    // 5. Service — what the site actually offers
    {
      "@type": "Service",
      "@id": "https://visaexpresshub.com/#service",
      name: "Global Visa Information & Document Guide Service",
      provider: { "@id": "https://visaexpresshub.com/#organization" },
      serviceType: "Visa Information & Documentation",
      description:
        "Free visa requirements, real-time processing time tracking, downloadable SOP templates, NOC letters, and visa application guides for 195+ countries worldwide.",
      areaServed: {
        "@type": "Place",
        name: "Worldwide",
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        description: "Free visa guides, checklists, and templates",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Visa Services & Resources",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Tourist Visa Guide",
              description:
                "Complete tourist visa requirements and application guides for 195+ countries.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Student Visa Guide",
              description:
                "Student visa document checklists and processing time tracker.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Work Visa Guide",
              description:
                "Work visa requirements and application guides globally.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "SOP & NOC Templates",
              description:
                "Free downloadable SOP templates and NOC letters for visa applications.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Visa Processing Time Tracker",
              description:
                "Real-time visa processing time tracking for all major embassies.",
            },
          },
        ],
      },
    },

    // 6. FAQPage schema — boosts rich snippets in Google search results
    {
      "@type": "FAQPage",
      "@id": "https://visaexpresshub.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What documents are required for a tourist visa?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tourist visa documents typically include a valid passport, passport-size photographs, completed visa application form, travel itinerary, hotel bookings, bank statements (last 3–6 months), travel insurance, and a cover letter. Requirements vary by destination country. Check our country-specific checklists at Visa Express Hub for exact requirements.",
          },
        },
        {
          "@type": "Question",
          name: "How long does visa processing take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Visa processing times vary by country and visa type. Schengen visas typically take 15 calendar days, US visas can take 2–12 weeks, UK visas take 3 weeks, and Canada visas take 4–8 weeks. Use our real-time Visa Processing Time Tracker for up-to-date information.",
          },
        },
        {
          "@type": "Question",
          name: "What is an SOP for a visa application?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An SOP (Statement of Purpose) is a personal letter submitted with your visa application explaining your travel purpose, itinerary, financial ability, and intent to return to your home country. Visa Express Hub provides free SOP templates for tourist, student, and work visa applications.",
          },
        },
        {
          "@type": "Question",
          name: "Is Visa Express Hub free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, Visa Express Hub is completely free. All visa guides, document checklists, SOP templates, NOC letters, and processing time tracking tools are available at no cost. The platform is sponsored by Eammu Holidays, based in Dubai, UAE.",
          },
        },
        {
          "@type": "Question",
          name: "How can I contact Visa Express Hub?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can contact Visa Express Hub at our Dubai corporate office by calling +971 50 707 8334. We are sponsored by Eammu Holidays and serve clients worldwide.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      // Prevents dark mode flash & forces light theme
      style={{ colorScheme: "light" }}
    >
      <head>
        {/* ── Force Light Mode ── */}
        <meta name="color-scheme" content="light only" />
        <meta name="theme-color" content="#0047AB" />

        {/* ── Viewport ── */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* ── Preconnect for performance (Core Web Vitals = ranking factor) ── */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* ── All-in-one Structured Data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-black">
        <Header />
        <main className="flex-grow" id="main-content" role="main">
          {children}
        </main>
        <WhatsAppFloatingButton />
        <Scroll />
        <Footer />
      </body>
    </html>
  );
}