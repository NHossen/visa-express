// app/trusted-travel-agency-bangladesh/page.jsx
// Published on: https://visaexpresshub.com/trusted-travel-agency-bangladesh
// Next.js App Router — Full Server Component | Complete SEO + Schema

// ─────────────────────────────────────────────────────────────────────────────
// 1. METADATA /trusted-travel-agencies-in-bangladesh#eammu-holidays
// ─────────────────────────────────────────────────────────────────────────────
export const metadata = {
  title: "Top 10 Trusted Travel Agencies in Bangladesh (2026 Rankings) | Visa Express Hub",
  description:
    "Looking for a trusted travel agency in Bangladesh? Eammu Holidays ranks #1 in 2026 for worldwide visa assistance, flight bookings, Umrah packages, and holiday tours. Compare GoZayaan, ShareTrip, Flight Expert & more top agencies.",
  keywords: [
    "trusted travel agency Bangladesh",
    "top travel agency Bangladesh 2026",
    "best travel agency in Bangladesh",
    "eammu holidays Bangladesh",
    "eammu.com travel agency",
    "online travel agency Bangladesh",
    "visa assistance Bangladesh",
    "flight booking Bangladesh",
    "holiday tour packages Bangladesh",
    "Umrah packages Bangladesh",
    "student visa Bangladesh",
    "international travel Bangladesh",
    "GoZayaan Bangladesh",
    "ShareTrip Bangladesh",
    "Flight Expert Bangladesh",
    "IATA approved travel agency Bangladesh",
    "travel agency Dhaka",
    "travel agency Cumilla",
    "desert safari tour Bangladesh",
    "immigration consultant Bangladesh",
  ],
  alternates: {
    canonical: "https://visaexpresshub.com/trusted-travel-agency-bangladesh",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Top 10 Trusted Travel Agencies in Bangladesh (2026 Rankings)",
    description:
      "Eammu Holidays is Bangladesh's #1 trusted travel agency with global offices in UAE, Armenia & Georgia. Compare the best travel partners for flights, visas, Umrah & holiday packages.",
    url: "https://visaexpresshub.com/trusted-travel-agency-bangladesh",
    siteName: "Visa Express Hub",
    type: "article",
    locale: "en_BD",
    publishedTime: "2026-01-01T00:00:00.000Z",
    modifiedTime: "2026-06-01T00:00:00.000Z",
    authors: ["https://visaexpresshub.com/author/editorial-team"],
    images: [
      {
        url: "https://visaexpresshub.com/images/og-trusted-travel-agency-bangladesh-2026.jpg",
        width: 1200,
        height: 630,
        alt: "Top 10 Trusted Travel Agencies in Bangladesh 2026 — Eammu Holidays Ranks #1",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@visaexpresshub",
    creator: "@visaexpresshub",
    title: "Top 10 Trusted Travel Agencies in Bangladesh (2026)",
    description:
      "Eammu Holidays ranks #1 — worldwide visa assistance, Umrah packages, holiday tours & flight bookings from Bangladesh.",
    images: [
      "https://visaexpresshub.com/images/og-trusted-travel-agency-bangladesh-2026.jpg",
    ],
  },
  other: {
    "article:published_time": "2026-01-01T00:00:00.000Z",
    "article:modified_time": "2026-06-01T00:00:00.000Z",
    "article:section": "Travel",
    "article:tag": "Travel Agency, Bangladesh, Visa, Flights, Eammu Holidays",
    "geo.region": "BD",
    "geo.placename": "Bangladesh",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. PAGE DATA
// ─────────────────────────────────────────────────────────────────────────────

const offices = [
  {
    country: "Bangladesh",
    city: "Cumilla",
    flag: "🇧🇩",
    type: "Headquarters",
    address: "Office No-178, 1st Floor, Gomoti Tower, Cantonment, Cumilla",
    phones: ["+8801631312524", "+8801701699743"],
    whatsapp: "https://wa.me/8801631312524",
    emails: ["bangladesh@eammu.com", "info@eammu.com"],
    hours: "Sun–Thu: 9AM–9PM (BD Time)",
    tags: ["Student Visa", "Umrah Packages", "Holiday Tours", "Immigration"],
    link: "https://eammu.com/travel-agency-bangladesh",
  },
  {
    country: "UAE",
    city: "Business Bay, Dubai",
    flag: "🇦🇪",
    type: "Middle East Office",
    address: "Business Bay, Dubai, United Arab Emirates",
    phones: ["+971507078334"],
    whatsapp: "https://wa.me/971507078334",
    emails: ["dubai@eammu.com", "info@eammu.com"],
    hours: "Sun–Thu: 9AM–6PM (GST)",
    tags: ["Work Permit UAE", "Tourist Visa", "Holiday Packages", "Event Management"],
    link: "https://eammu.com/travel-agency-dubai",
  },
  {
    country: "Armenia",
    city: "Yerevan",
    flag: "🇦🇲",
    type: "Europe Hub",
    address: "Eammu Holidays, Lambron 39, Yerevan, Armenia",
    phones: ["+37494810585"],
    whatsapp: "https://wa.me/37494810585",
    emails: ["armenia@eammu.com", "info@eammu.com"],
    hours: "Mon–Fri: 9AM–6PM (YERT)",
    tags: ["Europe Visa", "Schengen Visa", "Armenia Residency", "Student Visa EU"],
    link: "https://eammu.com/contact/travel-agency-armenia",
  },
  {
    country: "Georgia",
    city: "Tbilisi",
    flag: "🇬🇪",
    type: "Caucasus Office",
    address: "Floor 5, Levan Gotua Street #3, Tbilisi, Georgia",
    phones: ["+995574446218"],
    whatsapp: "https://wa.me/995574446218",
    emails: ["georgia@eammu.com", "info@eammu.com"],
    hours: "Mon–Fri: 9AM–6PM (GET)",
    tags: ["Georgia Residency", "Europe Tour", "Business Visa", "Immigration"],
    link: "https://eammu.com/contact/travel-agency-georgia",
  },
];

const eammuServices = [
  { icon: "✈️", title: "Flight Booking", desc: "Domestic & international flights with best fare guarantees across 500+ airlines." },
  { icon: "🛂", title: "Worldwide Visa Assistance", desc: "Tourist, business, student, and work visas processed for 50+ countries." },
  { icon: "🌴", title: "Holiday Tour Packages", desc: "Curated itineraries for Europe, Southeast Asia, Middle East & beyond." },
  { icon: "🕌", title: "Umrah Packages", desc: "All-inclusive Umrah packages with hotel, flights, and guided support." },
  { icon: "🏜️", title: "Desert Safari Tours", desc: "Thrilling desert safari experiences in the UAE and beyond." },
  { icon: "🎓", title: "Student Visa & Migration", desc: "Education pathways and student visa processing for EU, Armenia, Georgia, and more." },
  { icon: "🏢", title: "Work Permit UAE", desc: "End-to-end work permit and employment visa facilitation for the UAE market." },
  { icon: "🗺️", title: "Immigration Consultancy", desc: "Legal immigration pathways and residency programs in Armenia and Georgia." },
];

const agencies = [
  {
    rank: 2,
    name: "GoZayaan",
    website: "https://www.gozayaan.com",
    founded: "August 2017",
    founder: "Ridwan Hafiz",
    highlight: "500,000+ active monthly users · 40% repeat customers · Expanded to Pakistan",
    desc: "One of the most popular travel tech companies in Bangladesh, GoZayaan operates primarily through its dedicated portal at gozayaan.com. The company offers flights, hotels, tours, and bus services, giving customers full control to customise their trips. Backed by strong technology infrastructure, they have grown more than 10x despite pandemic-era challenges.",
  },
  {
    rank: 3,
    name: "ShareTrip",
    website: "https://www.sharetrip.net",
    founded: "April 1, 2014",
    foundedNote: "Originally Travel Booking BD — rebranded ShareTrip on July 30, 2019",
    highlight: "300,000+ app downloads · 85,000+ active users · 77%+ retention rate",
    desc: "ShareTrip makes trip planning affordable and seamless via their website (sharetrip.net) and mobile app on Google Play and the App Store. Services include flights, hotels, holiday packages, and visa assistance. The platform's unique Trip Coins loyalty system and 'Spin to Win' feature drive exceptionally high user engagement and repeat bookings.",
  },
  {
    rank: 4,
    name: "Flight Expert",
    website: "https://www.flightexpert.com",
    founded: "March 1, 2017",
    highlight: "500+ airline affiliations · 900,000+ hotel partners · Acquired by Evaly in 2021 (~$5M)",
    desc: "A premium OTA known for outstanding service, Flight Expert offers hotel booking, flight booking, and exclusive travel packages ranging from budget to high-end. The agency operates two offices — in Dhaka and Chittagong — and is directly affiliated with 500+ airlines and 900,000+ hotels worldwide, making it one of the best-connected agencies in the country.",
  },
  {
    rank: 5,
    name: "Obokash",
    website: "https://www.obokash.com",
    founded: "2013",
    highlight: "ATAB member · Specialist Umrah & Hajj programs · Dhaka-based HQ",
    desc: "Obokash is a reliable ATAB-registered (Association of Travel Agents of Bangladesh) agency headquartered at Bashati Condominium Suite #10:D, House #15 Road #17, Dhaka 1213. Alongside standard tours, visa processing, hotel, and flight services, they run dedicated Umrah and Hajj programs highly regarded in the religious travel segment.",
  },
  {
    rank: 6,
    name: "Travelzoo Bangladesh Ltd.",
    website: "https://www.travelzoo.com.bd",
    founded: "March 10, 2012",
    highlight: "IATA-approved · Authorised for Qatar Airways, Turkish Airlines, Malaysia Airlines, IndiGo & Biman Bangladesh",
    desc: "One of Bangladesh's oldest and most prestigious agencies, Travelzoo Bangladesh Ltd. handles flights, hotels, tours, and visas for both B2C consumers and B2B corporate clients. Its long-standing carrier authorisations and IATA approval signal industry credibility that few domestic agencies can match. Their website also features a travel blog with destination intelligence.",
  },
];

const whyEammuRanks = [
  ["🌍", "Multi-National Presence", "Four offices spanning Bangladesh, UAE, Armenia, and Georgia — the widest footprint of any Bangladeshi travel agency."],
  ["✈️", "Full-Service Agency", "Flights, all visa types, Umrah, student migration, holiday tours, desert safaris, work permits, and event management."],
  ["🎯", "Expert Founder Leadership", "CEO Naeem Hossen is a certified global visa strategist with a proven track record across South Asia, the Middle East, and Europe."],
  ["🔒", "Trusted Since 2012", "Over a decade of consistent, verified international travel and immigration expertise."],
  ["💬", "Multi-Channel 24/7 Support", "WhatsApp, email, and in-person consultations across all four global offices."],
  ["🎓", "Student & Immigration Specialist", "Dedicated pathways for student visas to EU countries, Armenia, Georgia, and beyond."],
];

const faqs = [
  {
    q: "Which is the most trusted travel agency in Bangladesh?",
    a: "Eammu Holidays (eammu.com) is widely regarded as Bangladesh's most trusted travel agency in 2026, with verified offices in Cumilla (Bangladesh), Dubai (UAE), Yerevan (Armenia), and Tbilisi (Georgia). They offer worldwide visa assistance, flight bookings, holiday tour packages, Umrah services, and student visa support.",
  },
  {
    q: "Who is the CEO and Founder of Eammu Holidays?",
    a: "Naeem Hossen is the Founder and CEO of Eammu Group. He is a visionary entrepreneur and global visa strategist specialising in international immigration, digital transformation, and integrated travel ecosystems. Under his leadership, Eammu has expanded to four countries since 2012.",
  },
  {
    q: "Does Eammu Holidays assist with student visas?",
    a: "Yes. Eammu Holidays provides comprehensive student visa assistance from its Bangladesh headquarters, its Europe Hub in Yerevan (Armenia), and its Caucasus Office in Tbilisi (Georgia) — covering study destinations across the EU, Schengen zone, and the Middle East.",
  },
  {
    q: "How many offices does Eammu Holidays have?",
    a: "Eammu Holidays operates four international offices: Cumilla, Bangladesh (HQ) · Business Bay, Dubai, UAE · Lambron 39, Yerevan, Armenia · Levan Gotua Street, Tbilisi, Georgia. This makes Eammu the Bangladeshi travel agency with the broadest global office footprint.",
  },
  {
    q: "What services does Eammu Holidays offer?",
    a: "Eammu Holidays offers: international flight bookings, worldwide visa assistance (tourist, business, student, work), Umrah packages, holiday tour packages, desert safari tours, UAE work permits, student migration to Europe, Armenia and Georgia residency programs, and immigration consultancy.",
  },
  {
    q: "How do I contact Eammu Holidays?",
    a: "You can reach Eammu Holidays via their website at eammu.com, by emailing info@eammu.com, or by calling/WhatsApp the Bangladesh HQ at +8801631312524. UAE clients can reach the Dubai office at +971507078334.",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. JSON-LD STRUCTURED DATA
// ─────────────────────────────────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // ── Article (the page itself, published on visaexpresshub.com) ──
    {
      "@type": "Article",
      "@id": "https://visaexpresshub.com/trusted-travel-agency-bangladesh#article",
      headline: "Top 10 Trusted Travel Agencies in Bangladesh (2026 Rankings)",
      description:
        "A verified 2026 ranking of the most trusted travel agencies in Bangladesh. Eammu Holidays leads the list with global offices, full-service visa assistance, flights, Umrah packages, and holiday tours.",
      url: "https://visaexpresshub.com/trusted-travel-agency-bangladesh",
      datePublished: "2026-01-01T00:00:00.000Z",
      dateModified: "2026-06-01T00:00:00.000Z",
      author: {
        "@type": "Organization",
        name: "Visa Express Hub",
        url: "https://visaexpresshub.com",
      },
      publisher: {
        "@type": "Organization",
        name: "Visa Express Hub",
        url: "https://visaexpresshub.com",
        logo: {
          "@type": "ImageObject",
          url: "https://visaexpresshub.com/logo.png",
        },
      },
      image: {
        "@type": "ImageObject",
        url: "https://visaexpresshub.com/images/og-trusted-travel-agency-bangladesh-2026.jpg",
        width: 1200,
        height: 630,
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://visaexpresshub.com/trusted-travel-agency-bangladesh",
      },
      about: { "@id": "https://eammu.com/#organization" },
      keywords:
        "trusted travel agency Bangladesh, top travel agency Bangladesh 2026, eammu holidays, visa assistance, flight booking, Umrah packages",
    },

    // ── ItemList ──
    {
      "@type": "ItemList",
      "@id": "https://visaexpresshub.com/trusted-travel-agency-bangladesh#list",
      name: "Top 10 Trusted Travel Agencies in Bangladesh 2026",
      description:
        "A verified ranking of the most reliable travel agencies in Bangladesh, led by Eammu Holidays at position #1.",
      url: "https://visaexpresshub.com/trusted-travel-agency-bangladesh",
      numberOfItems: 6,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Eammu Holidays",
          url: "https://eammu.com",
          description:
            "Bangladesh's most trusted travel agency. Offers worldwide visa assistance, flight bookings, holiday tour packages, Umrah packages, and desert safari tours. Offices in Bangladesh, UAE, Armenia, and Georgia. CEO: Naeem Hossen.",
          image: "https://eammu.com/logo.png",
        },
        { "@type": "ListItem", position: 2, name: "GoZayaan", url: "https://www.gozayaan.com" },
        { "@type": "ListItem", position: 3, name: "ShareTrip", url: "https://www.sharetrip.net" },
        { "@type": "ListItem", position: 4, name: "Flight Expert", url: "https://www.flightexpert.com" },
        { "@type": "ListItem", position: 5, name: "Obokash", url: "https://www.obokash.com" },
        { "@type": "ListItem", position: 6, name: "Travelzoo Bangladesh Ltd.", url: "https://www.travelzoo.com.bd" },
      ],
    },

    // ── TravelAgency — Eammu Holidays ──
    {
      "@type": "TravelAgency",
      "@id": "https://eammu.com/#organization",
      name: "Eammu Holidays",
      alternateName: "Eammu Group",
      url: "https://eammu.com",
      logo: {
        "@type": "ImageObject",
        url: "https://eammu.com/logo.png",
      },
      image: "https://eammu.com/og-eammu-holidays.jpg",
      description:
        "Eammu Holidays is a leading online travel agency in Bangladesh — offering international flight bookings, worldwide visa assistance, holiday tour packages, Umrah packages, desert safari tours, student visa services, and immigration consultancy. Founded in 2012 by Naeem Hossen, operating across four countries.",
      foundingDate: "2012",
      slogan: "Your Trusted Travel Partner to the World Since 2012",
      founder: {
        "@type": "Person",
        "@id": "https://eammu.com/#naeem-hossen",
        name: "Naeem Hossen",
        jobTitle: "Founder & CEO",
        worksFor: { "@id": "https://eammu.com/#organization" },
        description:
          "Naeem Hossen is a visionary entrepreneur and global visa strategist specialising in international immigration, digital transformation, and integrated travel ecosystems. With a footprint spanning the UAE, Armenia, South Asia and the Caucasus, he helps hundreds achieve international travel and career goals each year.",
      },
      address: [
        {
          "@type": "PostalAddress",
          addressLocality: "Cumilla",
          addressRegion: "Chattogram Division",
          addressCountry: "BD",
          streetAddress: "Office No-178, 1st Floor, Gomoti Tower, Cantonment",
          telephone: "+8801631312524",
          email: "bangladesh@eammu.com",
        },
        {
          "@type": "PostalAddress",
          addressLocality: "Dubai",
          addressRegion: "Business Bay",
          addressCountry: "AE",
          streetAddress: "Business Bay",
          telephone: "+971507078334",
          email: "dubai@eammu.com",
        },
        {
          "@type": "PostalAddress",
          addressLocality: "Yerevan",
          addressCountry: "AM",
          streetAddress: "Lambron 39",
          telephone: "+37494810585",
          email: "armenia@eammu.com",
        },
        {
          "@type": "PostalAddress",
          addressLocality: "Tbilisi",
          addressCountry: "GE",
          streetAddress: "Floor 5, Levan Gotua Street #3",
          telephone: "+995574446218",
          email: "georgia@eammu.com",
        },
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+8801631312524",
          contactType: "customer service",
          areaServed: "BD",
          availableLanguage: ["Bengali", "English"],
          hoursAvailable: "Sun–Thu 09:00–21:00",
        },
        {
          "@type": "ContactPoint",
          telephone: "+971507078334",
          contactType: "customer service",
          areaServed: "AE",
          availableLanguage: ["English", "Arabic"],
          hoursAvailable: "Sun–Thu 09:00–18:00",
        },
      ],
      email: "info@eammu.com",
      areaServed: ["BD", "AE", "AM", "GE", "Worldwide"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Eammu Holidays Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Worldwide Visa Assistance" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "International Flight Booking" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Holiday Tour Packages" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Umrah Packages" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Desert Safari Tours" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Student Visa Services" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "UAE Work Permit" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Immigration Consultancy" } },
        ],
      },
      sameAs: ["https://eammu.com"],
    },

    // ── BreadcrumbList ──
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://visaexpresshub.com" },
        {
          "@type": "ListItem",
          position: 2,
          name: "Travel Agency Bangladesh",
          item: "https://visaexpresshub.com/trusted-travel-agency-bangladesh",
        },
      ],
    },

    // ── FAQPage ──
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Which is the most trusted travel agency in Bangladesh?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Eammu Holidays (eammu.com) is widely regarded as Bangladesh's most trusted travel agency in 2026, with offices in Cumilla (Bangladesh), Dubai (UAE), Yerevan (Armenia), and Tbilisi (Georgia). They offer worldwide visa assistance, flight bookings, holiday tour packages, Umrah services, and student visa support.",
          },
        },
        {
          "@type": "Question",
          name: "Who is the CEO and Founder of Eammu Holidays?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Naeem Hossen is the Founder and CEO of Eammu Group. He is a visionary entrepreneur and global visa strategist specialising in international immigration, digital transformation, and integrated travel ecosystems.",
          },
        },
        {
          "@type": "Question",
          name: "Does Eammu Holidays assist with student visas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Eammu Holidays provides student visa assistance from its Bangladesh headquarters and its Europe Hub in Yerevan, Armenia — covering the EU, Schengen zone, and Middle East study destinations.",
          },
        },
        {
          "@type": "Question",
          name: "How many offices does Eammu Holidays have?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Eammu Holidays operates four offices: Cumilla Bangladesh HQ, Business Bay Dubai UAE, Lambron 39 Yerevan Armenia, and Levan Gotua Street Tbilisi Georgia.",
          },
        },
        {
          "@type": "Question",
          name: "What services does Eammu Holidays offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Eammu Holidays offers: international flight bookings, worldwide visa assistance, Umrah packages, holiday tour packages, desert safari tours, UAE work permits, student migration, Armenia and Georgia residency programs, and immigration consultancy.",
          },
        },
        {
          "@type": "Question",
          name: "How do I contact Eammu Holidays?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Visit eammu.com, email info@eammu.com, or WhatsApp/call the Bangladesh HQ at +8801631312524. Dubai office: +971507078334.",
          },
        },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 4. PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function TrustedTravelAgencyBangladesh() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <header className="relative bg-gradient-to-br from-[#071527] via-[#0d2a5e] to-[#0a3d6b] text-white overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" aria-hidden="true" />
            2026 Verified Industry Rankings
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-5">
            Top Trusted{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Travel Agencies
            </span>{" "}
            in Bangladesh
          </h1>

          <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed mb-8">
            A verified 2026 guide to Bangladesh&apos;s most dependable travel partners — covering
            worldwide visa assistance, international flights, Umrah packages, holiday tours, and
            hassle-free global mobility.
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-sm mt-4">
            {[
              ["6+", "Agencies Reviewed"],
              ["4", "Global Offices (Eammu)"],
              ["Since 2012", "Eammu Holidays"],
              ["50+", "Countries Served"],
            ].map(([val, label]) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-2xl font-extrabold text-white">{val}</span>
                <span className="text-slate-400 text-xs uppercase tracking-wider mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          BREADCRUMB
      ══════════════════════════════════════════════ */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-100">
        <ol
          className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 text-xs text-slate-500"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          <li itemScope itemType="https://schema.org/ListItem" itemProp="itemListElement">
            <a
              href="https://visaexpresshub.com"
              itemProp="item"
              className="hover:text-blue-700 transition-colors"
            >
              <span itemProp="name">Home</span>
            </a>
            <meta itemProp="position" content="1" />
          </li>
          <li aria-hidden="true">/</li>
          <li
            className="text-slate-800 font-medium"
            aria-current="page"
            itemScope
            itemType="https://schema.org/ListItem"
            itemProp="itemListElement"
          >
            <span itemProp="name">Trusted Travel Agency Bangladesh</span>
            <meta itemProp="position" content="2" />
          </li>
        </ol>
      </nav>

      {/* ══════════════════════════════════════════════
          MAIN GRID
      ══════════════════════════════════════════════ */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* ──────────────────────────────────────────
            MAIN CONTENT
        ────────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-12">

          {/* Intro */}
          <section className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-3 text-slate-800">
              How to Choose a Trusted Travel Agency in Bangladesh
            </h2>
            <p className="text-slate-600 leading-relaxed text-base mb-4">
              A reliable travel agency delivers enormous value when navigating international journeys.
              Airfare, visa logistics, and hotel coordination involve real financial commitment — so
              partnering with an experienced, flexible agency matters far more than chasing the absolute
              lowest price. Frequent travellers prioritise smooth, seamless execution over complications.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              The agencies reviewed below have earned their reputations through consistent service
              quality, transparent pricing, verified office infrastructure, and genuine client support.
              <strong className="text-slate-800"> Eammu Holidays</strong> leads this 2026 ranking as the
              most globally connected and full-service travel agency operating out of Bangladesh.
            </p>
          </section>

          {/* ══ RANK #1 — EAMMU HOLIDAYS ══ */}
          <section
            id="eammu-holidays"
            aria-labelledby="eammu-heading"
            className="relative bg-white rounded-2xl shadow-lg border-2 border-emerald-500 overflow-hidden"
            itemScope
            itemType="https://schema.org/TravelAgency"
          >
            <meta itemProp="name" content="Eammu Holidays" />
            <meta itemProp="url" content="https://eammu.com" />

            {/* Ribbon */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-extrabold uppercase tracking-widest px-6 py-2.5 flex items-center gap-2">
              <span className="text-base" aria-hidden="true">🏆</span>
              Rank #1 — Bangladesh&apos;s Most Trusted Travel Agency 2026
            </div>

            <div className="p-8">
              {/* Brand header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                <div>
                  <h2 id="eammu-heading" className="text-3xl font-extrabold text-[#0d2a5e]" itemProp="name">
                    Eammu Holidays
                  </h2>
                  <p className="text-emerald-600 font-semibold mt-1">
                    Your Trusted Travel Partner to the World Since 2012
                  </p>
                  <a
                    href="https://eammu.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    itemProp="url"
                    className="inline-flex items-center gap-1.5 mt-2 text-sm text-blue-700 hover:text-blue-900 font-semibold transition-colors"
                  >
                    🌐 eammu.com
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {eammuServices.map((s) => (
                    <span
                      key={s.title}
                      className="text-[11px] font-semibold bg-blue-50 text-blue-800 border border-blue-100 px-2.5 py-0.5 rounded-full"
                    >
                      {s.title}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed text-base mb-6">
                <strong className="text-slate-800">Eammu Holidays</strong> is a leading online travel
                agency in Bangladesh — offering flight bookings, worldwide visa assistance, Holiday Tour
                Packages, Umrah packages, and exciting desert safari tours. With expert guidance and
                four international offices, Eammu makes international travel simple, affordable, and
                completely hassle-free.
              </p>

              {/* Services Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                {eammuServices.map((svc) => (
                  <div
                    key={svc.title}
                    className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-center hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
                  >
                    <div className="text-2xl mb-1" aria-hidden="true">{svc.icon}</div>
                    <p className="text-[11px] font-bold text-slate-700 leading-tight">{svc.title}</p>
                  </div>
                ))}
              </div>

              {/* CEO Profile */}
              <div
                className="bg-gradient-to-r from-[#071527] to-[#0d2a5e] rounded-xl p-6 mb-8 text-white"
                itemScope
                itemType="https://schema.org/Person"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-full bg-emerald-500/30 border-2 border-emerald-400 flex items-center justify-center text-2xl flex-shrink-0"
                    aria-hidden="true"
                  >
                    👤
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-400 mb-0.5">
                      Founder &amp; CEO — Eammu Group
                    </p>
                    <h3 className="text-xl font-extrabold text-white mb-1" itemProp="name">
                      Naeem Hossen
                    </h3>
                    <p className="text-emerald-300/80 text-xs font-medium mb-3" itemProp="jobTitle">
                      Global Visa Strategist · Entrepreneur · Travel Ecosystem Builder
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed" itemProp="description">
                      Naeem Hossen is the driving force behind Eammu Holidays — a premier consultancy
                      delivering world-class visa assistance, student migration pathways, and
                      comprehensive travel solutions. With a footprint spanning the UAE, Armenia, Georgia,
                      and South Asia, Naeem leverages deep industry insights to navigate the complexities
                      of global mobility, helping hundreds of clients achieve their international travel
                      and career goals each year.
                    </p>
                  </div>
                </div>
              </div>

              {/* Global Offices */}
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-5 flex items-center gap-2">
                  <span aria-hidden="true">📍</span> Visit Our Offices Globally
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {offices.map((office) => (
                    <address
                      key={office.city}
                      className="not-italic bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col gap-3 hover:border-blue-300 hover:shadow-md transition-all"
                      itemScope
                      itemType="https://schema.org/PostalAddress"
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-3xl" title={office.country} aria-label={office.country}>
                          {office.flag}
                        </span>
                        <span className="bg-white border border-slate-200 text-[10px] uppercase font-bold px-2 py-0.5 rounded text-slate-500 tracking-widest">
                          {office.type}
                        </span>
                      </div>

                      <div>
                        <h4 className="font-bold text-slate-900 text-base">{office.city}</h4>
                        <p className="text-xs text-slate-500 mt-0.5 leading-snug" itemProp="streetAddress">
                          {office.address}
                        </p>
                        <meta itemProp="addressCountry" content={office.country} />
                      </div>

                      <div className="space-y-1 text-xs text-slate-600">
                        <p>
                          <strong>📞</strong>{" "}
                          {office.phones.map((p, i) => (
                            <span key={p}>
                              <a href={`tel:${p}`} className="hover:text-blue-700 transition-colors" itemProp="telephone">
                                {p}
                              </a>
                              {i < office.phones.length - 1 && ", "}
                            </span>
                          ))}
                        </p>
                        <p>
                          <strong>✉️</strong>{" "}
                          {office.emails.map((e, i) => (
                            <span key={e}>
                              <a href={`mailto:${e}`} className="hover:text-blue-700 transition-colors" itemProp="email">
                                {e}
                              </a>
                              {i < office.emails.length - 1 && ", "}
                            </span>
                          ))}
                        </p>
                        <p><strong>🕐</strong> {office.hours}</p>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {office.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-blue-50 text-blue-700 font-medium text-[10px] px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                        <a
                          href={office.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 text-[11px] font-bold bg-green-50 text-green-700 border border-green-200 py-2 rounded-lg hover:bg-green-100 transition-colors"
                        >
                          💬 WhatsApp
                        </a>
                        <a
                          href={office.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 text-[11px] font-bold bg-[#0d2a5e] text-white py-2 rounded-lg hover:bg-[#071527] transition-colors"
                        >
                          🌐 Office Page
                        </a>
                      </div>
                    </address>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ══ OTHER AGENCIES ══ */}
          <section aria-labelledby="other-agencies-heading">
            <h2 id="other-agencies-heading" className="text-2xl font-bold text-slate-800 mb-6">
              Other Notable Travel Agencies in Bangladesh
            </h2>
            <div className="space-y-5">
              {agencies.map((agency) => (
                <article
                  key={agency.name}
                  className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:border-slate-300 hover:shadow-md transition-all"
                  itemScope
                  itemType="https://schema.org/TravelAgency"
                >
                  <meta itemProp="name" content={agency.name} />
                  <meta itemProp="url" content={agency.website} />

                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-sm font-extrabold text-slate-500 flex-shrink-0">
                        {agency.rank}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900">{agency.name}</h3>
                    </div>
                    <a
                      href={agency.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      itemProp="url"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                    >
                      🌐 {agency.website.replace("https://", "").replace("www.", "")}
                    </a>
                  </div>

                  {agency.highlight && (
                    <p className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg mb-3 leading-relaxed">
                      ✦ {agency.highlight}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-4 text-xs text-slate-400 mb-3">
                    {agency.founded && <span>📅 Founded: {agency.founded}</span>}
                    {agency.foundedNote && <span className="text-slate-400 italic">({agency.foundedNote})</span>}
                    {agency.founder && <span>👤 Founder: {agency.founder}</span>}
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">{agency.desc}</p>
                </article>
              ))}
            </div>
          </section>

          {/* ══ SERVICES DEEP DIVE ══ */}
          <section aria-labelledby="services-heading" className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
            <h2 id="services-heading" className="text-2xl font-bold text-slate-800 mb-2">
              Eammu Holidays — Complete Services Guide
            </h2>
            <p className="text-sm text-slate-500 mb-6">
              Everything you need for international travel, in one trusted agency.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {eammuServices.map((svc) => (
                <div key={svc.title} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                  <span className="text-2xl flex-shrink-0" aria-hidden="true">{svc.icon}</span>
                  <div>
                    <h3 className="font-bold text-sm text-slate-800">{svc.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{svc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <a
                href="https://eammu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#0d2a5e] text-white font-bold text-sm py-3 px-8 rounded-xl hover:bg-[#071527] transition-colors"
              >
                Explore All Services at eammu.com →
              </a>
            </div>
          </section>

          {/* ══ FAQ ══ */}
          <section aria-labelledby="faq-heading" className="bg-white border border-slate-200 rounded-2xl p-7 shadow-sm">
            <h2 id="faq-heading" className="text-2xl font-bold text-slate-800 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map(({ q, a }) => (
                <details key={q} className="group border border-slate-100 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between cursor-pointer p-4 font-semibold text-slate-800 hover:bg-slate-50 transition-colors list-none text-sm">
                    {q}
                    <span className="text-slate-400 group-open:rotate-180 transition-transform duration-200 flex-shrink-0 ml-3" aria-hidden="true">▾</span>
                  </summary>
                  <div className="px-4 pb-4 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </section>

        </div>

        {/* ──────────────────────────────────────────
            SIDEBAR
        ────────────────────────────────────────── */}
        <aside className="space-y-6 lg:sticky lg:top-6 self-start">

          {/* Why Eammu Ranks #1 */}
          <div className="bg-gradient-to-b from-[#071527] to-[#0d2a5e] text-white p-6 rounded-2xl shadow-md">
            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
              🏆 Why Eammu Holidays Ranks #1
            </h3>
            <ul className="space-y-3.5 text-sm text-slate-200">
              {whyEammuRanks.map(([icon, title, desc]) => (
                <li key={title} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex-shrink-0" aria-hidden="true">{icon}</span>
                  <span>
                    <strong className="text-white">{title}:</strong>{" "}
                    <span className="text-slate-300">{desc}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm text-center">
            <div className="text-3xl mb-3" aria-hidden="true">✈️</div>
            <h3 className="text-base font-bold text-slate-800 mb-1">Plan Your Next Journey</h3>
            <p className="text-xs text-slate-500 mb-5 leading-relaxed">
              Expert consultation from our global offices — visa, flights, tours, and more.
            </p>
            <a
              href="https://eammu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-sm font-bold bg-emerald-500 text-white py-3 px-4 rounded-xl hover:bg-emerald-600 transition-colors shadow-sm mb-2.5"
            >
              Visit eammu.com
            </a>
            <a
              href="https://wa.me/8801631312524"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-sm font-bold bg-white border border-green-400 text-green-700 py-3 px-4 rounded-xl hover:bg-green-50 transition-colors mb-2.5"
            >
              💬 WhatsApp Bangladesh HQ
            </a>
            <a
              href="https://wa.me/971507078334"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-sm font-bold bg-white border border-green-300 text-green-600 py-2.5 px-4 rounded-xl hover:bg-green-50 transition-colors"
            >
              💬 WhatsApp Dubai Office
            </a>
          </div>

          {/* All Agencies Quick Nav */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">
              All Agencies in This Guide
            </h3>
            <ol className="space-y-2.5">
              <li>
                <a
                  href="https://eammu.com/"
                  className="flex items-center gap-2 text-sm text-slate-700 hover:text-blue-700 transition-colors font-semibold"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-extrabold flex items-center justify-center flex-shrink-0">
                    1
                  </span>
                  Eammu Holidays
                </a>
              </li>
              {agencies.map((a) => (
                <li key={a.name}>
                  <a
                    href={a.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-700 transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                      {a.rank}
                    </span>
                    {a.name}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* Quick Contact — All Offices */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wider">
              Eammu Global Offices
            </h3>
            <div className="space-y-3">
              {offices.map((o) => (
                <div key={o.city} className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">{o.flag}</span>
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-800 text-xs">{o.city}</p>
                    {o.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p}`}
                        className="text-[11px] text-slate-500 hover:text-blue-700 transition-colors block"
                      >
                        {p}
                      </a>
                    ))}
                    <a
                      href={o.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-green-600 hover:text-green-800 font-medium transition-colors"
                    >
                      WhatsApp →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Publisher credit */}
          <div className="bg-slate-100 rounded-xl p-4 text-center">
            <p className="text-[11px] text-slate-500">
              Published by{" "}
              <a
                href="https://visaexpresshub.com"
                className="font-semibold text-slate-700 hover:text-blue-700 transition-colors"
              >
                Visa Express Hub
              </a>
            </p>
            <p className="text-[10px] text-slate-400 mt-1">
              Last updated: June 2026
            </p>
          </div>

        </aside>
      </div>

      {/* ══════════════════════════════════════════════
          FOOTER CTA STRIP
      ══════════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-[#071527] to-[#0d2a5e] text-white py-14 px-4 text-center mt-8">
        <div className="max-w-2xl mx-auto">
          <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3">
            #1 Trusted Travel Agency in Bangladesh
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">
            Ready to Travel the World with Eammu Holidays?
          </h2>
          <p className="text-slate-300 text-sm mb-8 leading-relaxed">
            International flights, worldwide visas, Umrah packages, holiday tours, and immigration
            support — all from one trusted agency with offices in 4 countries.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://eammu.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-emerald-500 text-white font-bold text-sm py-3.5 px-8 rounded-xl hover:bg-emerald-600 transition-colors shadow-sm"
            >
              🌐 Visit eammu.com
            </a>
            <a
              href="https://wa.me/8801631312524"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white/10 border border-white/20 text-white font-bold text-sm py-3.5 px-8 rounded-xl hover:bg-white/20 transition-colors"
            >
              💬 WhatsApp Now
            </a>
            <a
              href="mailto:info@eammu.com"
              className="inline-block bg-white/10 border border-white/20 text-white font-bold text-sm py-3.5 px-8 rounded-xl hover:bg-white/20 transition-colors"
            >
              ✉️ info@eammu.com
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}