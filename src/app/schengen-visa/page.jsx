// app/schengen-visa/page.jsx
// VisaExpressHub — Schengen Visa Page
// Full SEO: metadata, JSON-LD, internal linking, external authority links

import Link from 'next/link';

/* ─── SEO METADATA ─────────────────────────────────────────────── */
export const metadata = {
  title: 'Schengen Visa from UAE 2025 | Apply Online | Visa Express Hub',
  description:
    'Apply for your Schengen visa from UAE with expert guidance. Complete requirements, fees (€90), processing times, documents checklist, and 26-country coverage. Fast approval — start today.',
  keywords:
    'Schengen visa UAE, Schengen visa apply online, Schengen visa requirements 2025, Europe visa from Dubai, Schengen visa documents, Schengen visa fee, multiple entry Schengen visa',
  alternates: {
    canonical: 'https://www.schengenvisahub.ae/schengen-visa',
  },
  openGraph: {
    title: 'Schengen Visa from UAE 2025 | Expert Assistance | Visa Express Hub',
    description:
      'Get your Schengen visa approved fast. Expert visa agents, complete document support, and guaranteed application submission for 26 European countries.',
    url: 'https://www.schengenvisahub.ae/schengen-visa',
    siteName: 'Visa Express Hub',
    images: [
      {
        url: 'https://www.schengenvisahub.ae/og/schengen-visa.jpg',
        width: 1200,
        height: 630,
        alt: 'Schengen Visa Application — Visa Express Hub UAE',
      },
    ],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schengen Visa from UAE 2025 | Visa Express Hub',
    description:
      'Expert Schengen visa assistance from UAE. €90 fee, 15-day processing, 26 countries covered.',
    images: ['https://www.schengenvisahub.ae/og/schengen-visa.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
};

/* ─── JSON-LD STRUCTURED DATA ──────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Schengen Visa Application Service',
      description:
        'Professional Schengen visa application assistance for UAE residents. Expert document preparation, appointment booking, and application tracking.',
      provider: {
        '@type': 'Organization',
        name: 'Visa Express Hub',
        url: 'https://www.schengenvisahub.ae',
        telephone: '+971-4-000-0000',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Dubai',
          addressCountry: 'AE',
        },
      },
      areaServed: 'AE',
      serviceType: 'Visa Consulting',
      offers: {
        '@type': 'Offer',
        price: '90',
        priceCurrency: 'EUR',
        description: 'Schengen visa government fee (adults)',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much does a Schengen visa cost from UAE?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The official Schengen visa fee is €90 for adults and €45 for children aged 6–12. Additional service centre fees may apply.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does Schengen visa processing take?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Normal processing time is 15 calendar days. It can be extended up to 45 days in complex cases. Apply at least 15 days before travel.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many countries can I visit with a Schengen visa?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A Schengen visa covers 26 countries — 22 EU member states plus Norway, Iceland, Liechtenstein, and Switzerland (EFTA members).',
          },
        },
        {
          '@type': 'Question',
          name: 'Where do I apply if I visit multiple Schengen countries?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Apply at the consulate of the country where you will spend the most time. If stays are equal, apply at the consulate of your first destination.',
          },
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.schengenvisahub.ae' },
        { '@type': 'ListItem', position: 2, name: 'Visa Services', item: 'https://www.schengenvisahub.ae/visa-services' },
        { '@type': 'ListItem', position: 3, name: 'Schengen Visa', item: 'https://www.schengenvisahub.ae/schengen-visa' },
      ],
    },
  ],
};

/* ─── DATA ──────────────────────────────────────────────────────── */
const schengenCountries = [
  { name: 'Austria', flag: '🇦🇹' }, { name: 'Belgium', flag: '🇧🇪' },
  { name: 'Croatia', flag: '🇭🇷' }, { name: 'Czech Republic', flag: '🇨🇿' },
  { name: 'Denmark', flag: '🇩🇰' }, { name: 'Estonia', flag: '🇪🇪' },
  { name: 'Finland', flag: '🇫🇮' }, { name: 'France', flag: '🇫🇷' },
  { name: 'Germany', flag: '🇩🇪' }, { name: 'Greece', flag: '🇬🇷' },
  { name: 'Hungary', flag: '🇭🇺' }, { name: 'Iceland', flag: '🇮🇸' },
  { name: 'Italy', flag: '🇮🇹' }, { name: 'Latvia', flag: '🇱🇻' },
  { name: 'Liechtenstein', flag: '🇱🇮' }, { name: 'Lithuania', flag: '🇱🇹' },
  { name: 'Luxembourg', flag: '🇱🇺' }, { name: 'Malta', flag: '🇲🇹' },
  { name: 'Netherlands', flag: '🇳🇱' }, { name: 'Norway', flag: '🇳🇴' },
  { name: 'Poland', flag: '🇵🇱' }, { name: 'Portugal', flag: '🇵🇹' },
  { name: 'Slovakia', flag: '🇸🇰' }, { name: 'Slovenia', flag: '🇸🇮' },
  { name: 'Spain', flag: '🇪🇸' }, { name: 'Sweden', flag: '🇸🇪' },
  { name: 'Switzerland', flag: '🇨🇭' },
];

const visaTypes = [
  {
    icon: '🔵',
    title: 'Single-Entry Visa',
    desc: 'Enter the Schengen area once. Perfect for a one-time holiday or short trip. Once you leave, the visa becomes void even if unused days remain.',
    badge: 'Tourist',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
  {
    icon: '🟡',
    title: 'Multiple-Entry Visa',
    desc: 'Make multiple visits within the visa validity period (usually 1–5 years). Ideal for business travellers and frequent Europe visitors.',
    badge: 'Business / Frequent',
    badgeColor: 'bg-yellow-100 text-yellow-800',
  },
  {
    icon: '⚪',
    title: 'Airport Transit Visa',
    desc: 'Allows transit through the international zone of a Schengen airport without entering the country. Required for certain nationalities.',
    badge: 'Transit',
    badgeColor: 'bg-gray-100 text-gray-700',
  },
];

const documents = [
  { item: 'Valid passport', detail: 'Must be valid 3+ months beyond your departure date from Schengen' },
  { item: 'Completed visa application form', detail: 'Signed and dated — our team will prepare this for you' },
  { item: 'Passport-size photograph', detail: 'ICAO standard, white background, taken within 6 months' },
  { item: 'Travel medical insurance', detail: 'Minimum €30,000 coverage for emergency, hospitalisation & repatriation' },
  { item: 'Flight itinerary', detail: 'Confirmed return flight booking (not necessarily paid ticket)' },
  { item: 'Hotel / accommodation proof', detail: 'Hotel bookings, invitation letter, or Airbnb confirmation' },
  { item: 'Bank statements (3–6 months)', detail: 'Showing sufficient funds — min. €100/day recommended' },
  { item: 'Employment letter / salary slip', detail: 'Confirming your employment and approved leave' },
  { item: 'Visa fee payment', detail: '€90 adults · €45 children (6–12) · Free under 6' },
  { item: 'Biometrics (fingerprints)', detail: 'Collected at the consulate or visa application centre' },
];

const feeTable = [
  { category: 'Adults (12+)', fee: '€90', note: 'Standard rate' },
  { category: 'Children (6–12 years)', fee: '€45', note: '50% reduction' },
  { category: 'Children under 6', fee: 'Free', note: 'No charge' },
  { category: 'Armenia, Azerbaijan, Belarus nationals', fee: '€35', note: 'Bilateral agreement' },
  { category: 'Cabo Verde nationals', fee: '€67.50', note: 'Bilateral agreement' },
  { category: 'Service centre fee', fee: 'Varies', note: 'Added where applicable' },
];

const steps = [
  { num: '01', title: 'Consultation', desc: 'Speak to our visa expert. We assess your profile, trip purpose, and recommend the right visa type.' },
  { num: '02', title: 'Document Preparation', desc: 'We prepare your application form, checklist, SOP, cover letter, and review all supporting documents.' },
  { num: '03', title: 'Appointment Booking', desc: 'We book your consulate appointment (available 6 months to 15 days before travel).' },
  { num: '04', title: 'Submission', desc: 'Submit your application with biometrics at the visa application centre or consulate.' },
  { num: '05', title: 'Tracking', desc: 'We track your application status and respond to any consulate queries promptly.' },
  { num: '06', title: 'Visa Collection', desc: 'Collect your visa — and travel! We debrief you on entry rules and 90/180-day limits.' },
];

const faqs = [
  {
    q: 'How many days can I stay in Europe on a Schengen visa?',
    a: 'A Schengen visa allows stays of up to 90 days in any 180-day rolling period across all 26 Schengen countries combined. Use the official EU short-stay calculator to track your remaining days.',
  },
  {
    q: 'Can I extend my Schengen visa while inside Europe?',
    a: 'Extensions are only granted in exceptional circumstances (force majeure, humanitarian reasons). You cannot extend simply because you want to stay longer. Plan your trip within the 90-day limit.',
  },
  {
    q: 'Which consulate should I apply to if I visit multiple countries?',
    a: 'Apply to the consulate of the country where you will spend the most nights. If visits are equally long, apply to the consulate of your first destination country.',
  },
  {
    q: 'How far in advance should I apply?',
    a: 'Submit your application between 6 months and 15 days before your intended travel date. We recommend applying 4–6 weeks in advance to allow for processing and any document requests.',
  },
  {
    q: 'What if my Schengen visa application is refused?',
    a: 'You will receive a written refusal stating the reason. You have the right to appeal — our team can help you prepare a strong appeal or reapplication with additional supporting evidence.',
  },
  {
    q: 'Do UAE residents (non-UAE nationals) need a Schengen visa?',
    a: 'It depends on your passport nationality. UAE passport holders can visit most Schengen countries visa-free for 90 days. Other nationalities residing in the UAE typically need to apply. Contact us for country-specific guidance.',
  },
];

const internalLinks = [
  { href: '/visa/tourist-visa', label: 'Tourist Visa', icon: '🌍' },
  { href: '/visa/work-visa', label: 'Work Visa', icon: '💼' },
  { href: '/visa', label: 'Check Visa Status', icon: '🔍' },
  { href: '/visa-processing-time-tracker', label: 'Processing Times', icon: '⏱' },
  { href: '/visa/student-visa', label: 'Study Abroad Visa', icon: '🎓' },
  { href: '/scholarship', label: 'Scholarship Guide', icon: '📚' },
  { href: '/visa-resources/visa-checklist-generator', label: 'Visa Checklist Generator', icon: '📋' },
  { href: '/visa-resources/visa-document-generator', label: 'SOP Template', icon: '📝' },
  { href: '/visa-resources/visa-document-generator', label: 'NOC Letter Template', icon: '📄' },
  { href: '/visa-resources/visa-document-generator', label: 'Cover Letter Template', icon: '💼' },
  { href: '/visa-resources/visa-document-generator', label: 'Bank Statement Template', icon: '🏦' },
  { href: '/visa-resources/visa-document-generator', label: 'Power of Attorney', icon: '⚖️' },
];

/* ─── COMPONENT ─────────────────────────────────────────────────── */
export default function SchengenVisaPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-white text-black font-sans antialiased">

        {/* ── BREADCRUMB ─────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="bg-gray-50 border-b border-gray-100 px-4 md:px-10 py-3">
          <ol className="flex items-center gap-2 text-xs font-semibold text-gray-400 flex-wrap" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" className="hover:text-yellow-600 transition-colors" itemProp="item"><span itemProp="name">Home</span></Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-gray-300">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/visa" className="hover:text-yellow-600 transition-colors" itemProp="item"><span itemProp="name">Visa Services</span></Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-gray-300">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-black font-bold" itemProp="name">Schengen Visa</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </nav>

        {/* ── HERO ────────────────────────────────────────────────── */}
        <section className="relative bg-black overflow-hidden border-b-4 border-yellow-400">
          {/* EU Flag pattern background */}
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: 'radial-gradient(circle, #facc15 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-10 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-yellow-400 text-black text-[10px] font-black tracking-[2.5px] uppercase px-3 py-1.5">
                  🇪🇺 Schengen Area
                </span>
                <span className="text-yellow-400/60 text-[10px] font-bold tracking-widest uppercase">26 Countries · 1 Visa</span>
              </div>

              <h1 className="font-serif text-white text-4xl md:text-6xl font-black leading-[1.05] mb-6">
                Schengen Visa<br />
                <em className="text-yellow-400 not-italic">from UAE</em>{' '}
                <span className="text-white/50">2025</span>
              </h1>

              <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-lg">
                One visa. 26 European countries. Our expert visa team at Visa Express Hub handles your complete Schengen application — from document preparation to approval.
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { val: '€90', sub: 'Visa Fee' },
                  { val: '15 days', sub: 'Processing' },
                  { val: '90 days', sub: 'Max Stay' },
                ].map((s) => (
                  <div key={s.val} className="border border-yellow-400/30 p-4 text-center">
                    <div className="text-yellow-400 font-serif text-2xl font-black">{s.val}</div>
                    <div className="text-white/50 text-[11px] font-bold tracking-widest uppercase mt-1">{s.sub}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="bg-yellow-400 text-black font-black px-8 py-4 text-sm tracking-[1.5px] uppercase hover:bg-yellow-300 transition-colors inline-block"
                >
                  Apply Now →
                </Link>
                <Link
                  href="/visa-resources/visa-checklist-generator"
                  className="border-2 border-yellow-400/40 text-yellow-400 font-bold px-8 py-4 text-sm tracking-[1.5px] uppercase hover:border-yellow-400 transition-colors inline-block"
                >
                  📋 Get Checklist
                </Link>
              </div>
            </div>

            {/* Country flags grid */}
            <div className="hidden lg:grid grid-cols-6 gap-2">
              {schengenCountries.slice(0, 24).map((c) => (
                <div key={c.name} title={c.name}
                  className="aspect-square flex flex-col items-center justify-center border border-white/10 hover:border-yellow-400/60 hover:bg-white/5 transition-all duration-300 cursor-default group p-2">
                  <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{c.flag}</span>
                  <span className="text-[9px] text-white/30 group-hover:text-yellow-400/60 mt-1 text-center leading-tight font-medium">{c.name.split(' ')[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ───────────────────────────────────────────── */}
        <section className="bg-yellow-400 py-4 border-b-2 border-black">
          <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-wrap items-center justify-center md:justify-between gap-4 text-black text-sm font-bold">
            {['✅ 5,000+ Visas Approved', '⚡ 15-Day Fast Processing', '🔒 100% Secure Application', '📞 Expert Support — Dubai Based', '🌍 26 Schengen Countries Covered'].map((t) => (
              <span key={t} className="tracking-wide">{t}</span>
            ))}
          </div>
        </section>

        {/* ── WHAT IS SCHENGEN ────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 md:px-10 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-yellow-600 text-[11px] font-black tracking-[3px] uppercase mb-3">Overview</p>
              <h2 className="font-serif text-4xl font-black text-black leading-tight mb-5">
                What is a<br /><span className="border-b-4 border-yellow-400">Schengen Visa?</span>
              </h2>
              <div className="prose prose-black max-w-none space-y-4 text-gray-600 leading-relaxed">
                <p>
                  A <strong className="text-black">Schengen visa</strong> is an entry permit for non-EU nationals to make a short, temporary visit of up to <strong className="text-black">90 days in any 180-day period</strong> to any country within the Schengen Area.
                </p>
                <p>
                  The Schengen Area is one of the world's largest free-travel zones, comprising <strong className="text-black">26 European nations</strong> — 22 EU member states plus four{' '}
                  <abbr title="European Free Trade Association">EFTA</abbr> countries: Norway, Iceland, Liechtenstein, and Switzerland.
                </p>
                <p>
                  With a single Schengen visa obtained through{' '}
                  <strong className="text-black">Visa Express Hub</strong>, you can travel freely across all 26 member countries without border controls between them — visiting France, Italy, Spain, Germany, Greece, and beyond on the same visa.
                </p>
                <p>
                  Whether you're planning a holiday, a business trip, or visiting family, our qualified visa agents at{' '}
                  <a href="https://SchengenVisa.ae" target="_blank" rel="noopener noreferrer" className="text-yellow-600 font-bold hover:underline">
                    SchengenVisa.ae
                  </a>{' '}
                  will guide you through every step — from choosing the correct visa type to prompt application submission.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/visa" className="flex items-center gap-2 bg-black text-yellow-400 font-bold px-5 py-3 text-sm hover:bg-yellow-400 hover:text-black transition-all duration-300">
                  🔍 Check Visa Requirements
                </Link>
                <Link href="/visa/tourist-visa" className="flex items-center gap-2 border-2 border-black text-black font-bold px-5 py-3 text-sm hover:bg-black hover:text-white transition-all duration-300">
                  🌍 Tourist Visa Guide
                </Link>
              </div>
            </div>

            {/* Key facts card */}
            <div className="bg-black text-white p-8 border-l-4 border-yellow-400">
              <h3 className="font-serif text-2xl font-black text-yellow-400 mb-6">Quick Facts</h3>
              <dl className="space-y-4">
                {[
                  { dt: 'Countries Covered', dd: '26 Schengen Member States' },
                  { dt: 'Maximum Stay', dd: '90 days in any 180-day period' },
                  { dt: 'Visa Types', dd: 'Single-entry · Multiple-entry · Airport Transit' },
                  { dt: 'Standard Fee', dd: '€90 (adults) · €45 (children 6–12)' },
                  { dt: 'Processing Time', dd: '15 days (up to 45 days if complex)' },
                  { dt: 'Apply From', dd: '6 months before travel — no later than 15 days' },
                  { dt: 'Insurance Required', dd: 'Min. €30,000 medical coverage' },
                  { dt: 'Biometrics', dd: 'Required at time of application' },
                ].map(({ dt, dd }) => (
                  <div key={dt} className="flex justify-between items-start gap-4 border-b border-white/10 pb-4">
                    <dt className="text-white/50 text-sm font-semibold flex-shrink-0">{dt}</dt>
                    <dd className="text-yellow-400 font-bold text-sm text-right">{dd}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 pt-4 border-t border-white/10">
                <p className="text-white/40 text-xs">
                  Source:{' '}
                  <a href="https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en" target="_blank" rel="noopener noreferrer" className="text-yellow-400/70 hover:text-yellow-400 underline">
                    European Commission — Visa Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── VISA TYPES ───────────────────────────────────────────── */}
        <section className="bg-gray-50 border-y border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="text-center mb-12">
              <p className="text-yellow-600 text-[11px] font-black tracking-[3px] uppercase mb-3">Visa Categories</p>
              <h2 className="font-serif text-4xl font-black text-black">Types of Schengen Visa</h2>
              <p className="text-gray-500 mt-3 max-w-xl mx-auto">Our experts help you select the right visa type based on your travel purpose and frequency.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {visaTypes.map((v) => (
                <article key={v.title} className="bg-white border border-gray-100 hover:border-yellow-400 hover:shadow-[0_6px_28px_rgba(250,204,21,0.18)] transition-all duration-300 p-8 relative group">
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-yellow-400 border-l-[40px] border-l-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="text-4xl mb-4">{v.icon}</div>
                  <h3 className="font-serif text-xl font-black text-black mb-3">{v.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{v.desc}</p>
                  <span className={`inline-block text-[10px] font-black tracking-[1.5px] uppercase px-3 py-1 ${v.badgeColor}`}>
                    {v.badge}
                  </span>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm mb-3">Not sure which type you need?</p>
              <Link href="/contact" className="inline-block bg-yellow-400 text-black font-black px-8 py-3 text-sm tracking-[1.5px] uppercase hover:bg-yellow-300 transition-colors">
                Get Free Advice →
              </Link>
            </div>
          </div>
        </section>

        {/* ── 26 COUNTRIES ────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 md:px-10 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-yellow-600 text-[11px] font-black tracking-[3px] uppercase mb-3">Coverage</p>
              <h2 className="font-serif text-4xl font-black text-black">
                26 Countries,<br /><em className="not-italic border-b-4 border-yellow-400">One Visa</em>
              </h2>
            </div>
            <p className="text-gray-500 text-sm max-w-sm">Your Schengen visa grants borderless access to all countries listed below — move freely without re-applying.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2" role="list" aria-label="Schengen member countries">
            {schengenCountries.map((c) => (
              <div key={c.name} role="listitem"
                className="flex items-center gap-3 p-3 border border-gray-100 hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-200 group cursor-default">
                <span className="text-xl flex-shrink-0 group-hover:scale-110 transition-transform">{c.flag}</span>
                <span className="text-black text-xs font-semibold leading-tight">{c.name}</span>
              </div>
            ))}
          </div>
          <p className="text-gray-400 text-xs mt-4">
            * The Schengen Area as defined by{' '}
            <a href="https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/schengen-area_en" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline font-semibold">
              European Commission — Schengen Area
            </a>. Bulgaria and Romania joined in 2024.
          </p>
        </section>

        {/* ── DOCUMENTS REQUIRED ──────────────────────────────────── */}
        <section className="bg-black py-16 border-y-4 border-yellow-400">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-yellow-400 text-[11px] font-black tracking-[3px] uppercase mb-3">Checklist</p>
                <h2 className="font-serif text-4xl font-black text-white mb-4">
                  Documents Required<br />for <em className="text-yellow-400 not-italic">Schengen Visa</em>
                </h2>
                <p className="text-white/60 leading-relaxed mb-8">
                  The following documents are required for a standard Schengen visa application. Additional documents may be requested by individual consulates. Use our{' '}
                  <Link href="/visa-resources/visa-checklist-generator" className="text-yellow-400 font-bold hover:underline">
                    free Visa Checklist Generator
                  </Link>{' '}
                  for a personalised list.
                </p>

                <ol className="space-y-3" aria-label="Required documents">
                  {documents.map((d, i) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-400 text-black font-black text-xs flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <div>
                        <span className="text-white font-bold text-sm">{d.item}</span>
                        <p className="text-white/50 text-xs mt-0.5 leading-relaxed">{d.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* CTA column */}
              <div className="flex flex-col gap-5">
                <div className="bg-yellow-400 p-8">
                  <h3 className="font-serif text-2xl font-black text-black mb-3">Free Document Tools</h3>
                  <p className="text-black/70 text-sm mb-5 leading-relaxed">
                    Generate professional visa documents in minutes — SOP, NOC, cover letter, bank statement template and more.
                  </p>
                  <div className="space-y-2">
                    {[
                      { href: '/visa-resources/visa-document-generator', label: '📝 SOP Template', badge: 'Free' },
                      { href: '/visa-resources/visa-document-generator', label: '📄 NOC Letter Template', badge: 'Free' },
                      { href: '/visa-resources/visa-document-generator', label: '💼 Cover Letter Template', badge: 'New' },
                      { href: '/visa-resources/visa-document-generator', label: '🏦 Bank Statement Template', badge: 'Free' },
                      { href: '/visa-resources/visa-document-generator', label: '⚖️ Power of Attorney', badge: 'Free' },
                      { href: '/visa-resources/visa-checklist-generator', label: '📋 Visa Document Checklist', badge: 'Free' },
                    ].map((tool) => (
                      <Link key={tool.href + tool.label} href={tool.href}
                        className="flex items-center justify-between bg-black text-white px-4 py-3 text-sm font-semibold hover:bg-white hover:text-black transition-all duration-200 group">
                        <span className="group-hover:translate-x-1 transition-transform">{tool.label}</span>
                        <span className="text-[10px] font-black tracking-widest bg-yellow-400 text-black px-2 py-0.5 group-hover:bg-black group-hover:text-yellow-400">
                          {tool.badge}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="border-2 border-yellow-400/30 p-6 text-white">
                  <h3 className="font-bold text-yellow-400 mb-2">Need Help With Documents?</h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    Our visa specialists review your full document package before submission — catching errors that lead to refusals.
                  </p>
                  <Link href="/contact" className="inline-block bg-yellow-400 text-black font-black px-6 py-3 text-sm tracking-wide hover:bg-yellow-300 transition-colors">
                    Book Document Review →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEE TABLE ────────────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 md:px-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-yellow-600 text-[11px] font-black tracking-[3px] uppercase mb-3">Pricing</p>
              <h2 className="font-serif text-4xl font-black text-black mb-5">
                Schengen Visa<br />Fee Structure
              </h2>
              <p className="text-gray-500 leading-relaxed mb-8">
                The Schengen visa fee is set by the EU and applies uniformly across all member states' consulates. Fees were updated in June 2024.
              </p>

              <div className="overflow-hidden border-2 border-black">
                <table className="w-full text-sm" role="table" aria-label="Schengen visa fee table">
                  <thead>
                    <tr className="bg-black text-yellow-400">
                      <th className="text-left px-5 py-4 font-black text-[11px] tracking-[2px] uppercase">Applicant Category</th>
                      <th className="text-right px-5 py-4 font-black text-[11px] tracking-[2px] uppercase">Fee</th>
                      <th className="text-right px-5 py-4 font-black text-[11px] tracking-[2px] uppercase hidden md:table-cell">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeTable.map((row, i) => (
                      <tr key={i} className={`border-b border-gray-100 hover:bg-yellow-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                        <td className="px-5 py-4 font-semibold text-black">{row.category}</td>
                        <td className="px-5 py-4 text-right font-black text-yellow-600 text-base">{row.fee}</td>
                        <td className="px-5 py-4 text-right text-gray-400 text-xs hidden md:table-cell">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-gray-400 text-xs mt-3">
                Fee waiver may apply for specific categories. See{' '}
                <a href="https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline">
                  official EU visa policy
                </a>.
              </p>
            </div>

            {/* Processing timeline */}
            <div>
              <p className="text-yellow-600 text-[11px] font-black tracking-[3px] uppercase mb-3">Timeline</p>
              <h2 className="font-serif text-4xl font-black text-black mb-5">Processing Time</h2>
              <div className="space-y-4">
                {[
                  { time: '15 days', label: 'Standard processing', desc: 'Most applications are decided within 15 calendar days of submission.', color: 'bg-green-50 border-green-300' },
                  { time: 'Up to 45 days', label: 'Extended review', desc: 'Required when additional documents are needed or detailed examination applies.', color: 'bg-yellow-50 border-yellow-300' },
                  { time: 'Accelerated', label: 'EU/EEA family members', desc: 'Family members of EU/EEA citizens qualify for a free, faster procedure.', color: 'bg-blue-50 border-blue-200' },
                ].map((p) => (
                  <div key={p.label} className={`border-l-4 p-5 ${p.color}`}>
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="font-serif font-black text-2xl text-black">{p.time}</span>
                      <span className="text-[11px] font-black tracking-widest uppercase text-gray-500">{p.label}</span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-yellow-400 p-5">
                <p className="text-black font-bold text-sm">
                  ⚡ <strong>Apply at least 4–6 weeks before travel</strong> to ensure your visa arrives on time, even in peak season.
                </p>
                <Link href="/processing" className="inline-block mt-3 text-black text-xs font-black tracking-widest uppercase underline hover:no-underline">
                  ⏱ View All Processing Times →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW TO APPLY ────────────────────────────────────────── */}
        <section className="bg-gray-50 border-y border-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-10">
            <div className="text-center mb-12">
              <p className="text-yellow-600 text-[11px] font-black tracking-[3px] uppercase mb-3">Process</p>
              <h2 className="font-serif text-4xl font-black text-black">How to Apply — Step by Step</h2>
              <p className="text-gray-500 mt-3 max-w-xl mx-auto text-sm">
                From initial consultation to visa in hand — our team guides you through every stage.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {steps.map((s, i) => (
                <div key={s.num} className="bg-white border border-gray-100 hover:border-yellow-400 transition-all duration-300 p-7 group relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 text-[90px] font-black text-gray-50 leading-none group-hover:text-yellow-50 transition-colors select-none pointer-events-none">
                    {s.num}
                  </div>
                  <div className="relative z-10">
                    <div className="w-10 h-10 bg-yellow-400 flex items-center justify-center font-black text-black text-sm mb-4">
                      {s.num}
                    </div>
                    <h3 className="font-serif font-black text-black text-lg mb-2">{s.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 text-yellow-400 text-xl z-20">→</div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link href="/contact" className="inline-block bg-black text-yellow-400 font-black px-10 py-4 text-sm tracking-[2px] uppercase hover:bg-yellow-400 hover:text-black transition-all duration-300">
                Start Your Application →
              </Link>
            </div>
          </div>
        </section>

        {/* ── WHERE TO APPLY ───────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 md:px-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-yellow-600 text-[11px] font-black tracking-[3px] uppercase mb-3">Where to Apply</p>
              <h2 className="font-serif text-4xl font-black text-black mb-5">
                Which Consulate<br />Do I Apply To?
              </h2>
              <div className="space-y-5 text-gray-600 text-sm leading-relaxed">
                <div className="flex gap-4 p-5 border-l-4 border-yellow-400 bg-yellow-50">
                  <span className="text-2xl flex-shrink-0">🎯</span>
                  <div>
                    <strong className="text-black block mb-1">Visiting one country:</strong>
                    Apply at the consulate of that specific Schengen country.
                  </div>
                </div>
                <div className="flex gap-4 p-5 border-l-4 border-black bg-gray-50">
                  <span className="text-2xl flex-shrink-0">⏱</span>
                  <div>
                    <strong className="text-black block mb-1">Visiting multiple countries (unequal stays):</strong>
                    Apply at the consulate of the country where you will spend the <strong>most nights</strong>.
                  </div>
                </div>
                <div className="flex gap-4 p-5 border-l-4 border-gray-300 bg-gray-50">
                  <span className="text-2xl flex-shrink-0">✈️</span>
                  <div>
                    <strong className="text-black block mb-1">Visiting multiple countries (equal stays):</strong>
                    Apply at the consulate of the <strong>first country you will enter</strong>.
                  </div>
                </div>
                <div className="flex gap-4 p-5 border-l-4 border-gray-300 bg-gray-50">
                  <span className="text-2xl flex-shrink-0">🏠</span>
                  <div>
                    <strong className="text-black block mb-1">General rule:</strong>
                    Apply at the consulate responsible for your country of legal residence (in the UAE — Dubai or Abu Dhabi).
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-yellow-600 text-[11px] font-black tracking-[3px] uppercase mb-3">Timing</p>
              <h2 className="font-serif text-4xl font-black text-black mb-5">When Should<br />I Apply?</h2>
              <div className="bg-black text-white p-8">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center border border-yellow-400/30 p-5">
                    <div className="font-serif text-yellow-400 text-3xl font-black">6 months</div>
                    <div className="text-white/50 text-xs font-bold tracking-widest uppercase mt-1">Earliest</div>
                    <div className="text-white/40 text-xs mt-2">Before your travel date</div>
                  </div>
                  <div className="text-center border border-yellow-400/30 p-5">
                    <div className="font-serif text-yellow-400 text-3xl font-black">15 days</div>
                    <div className="text-white/50 text-xs font-bold tracking-widest uppercase mt-1">Latest</div>
                    <div className="text-white/40 text-xs mt-2">Before your travel date</div>
                  </div>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  You may need to book an appointment in advance — especially during peak summer months when consulate slots fill up fast. We recommend applying <strong className="text-yellow-400">4–6 weeks before travel</strong>.
                </p>
                <Link href="/contact" className="inline-block bg-yellow-400 text-black font-black px-6 py-3 text-xs tracking-[2px] uppercase hover:bg-yellow-300 transition-colors">
                  Book Appointment Support →
                </Link>
              </div>

              {/* External authority links */}
              <div className="mt-5 p-5 border border-gray-100">
                <p className="text-[10px] font-black tracking-[2px] uppercase text-gray-400 mb-3">Official Resources</p>
                <div className="space-y-2">
                  {[
                    { href: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en', label: 'EU Schengen Visa Policy (Official)' },
                    { href: 'https://ec.europa.eu/assets/home/visa-calculator/calculator.htm', label: 'EU Short-Stay Calculator (90/180 days)' },
                    { href: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy/visa-lists_en', label: 'Check If Your Country Needs a Visa' },
                  ].map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-yellow-600 transition-colors group">
                      <span className="text-yellow-400 group-hover:translate-x-0.5 transition-transform">↗</span>
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────────────── */}
        <section className="bg-gray-50 border-y border-gray-100 py-16">
          <div className="max-w-3xl mx-auto px-4 md:px-10">
            <div className="text-center mb-12">
              <p className="text-yellow-600 text-[11px] font-black tracking-[3px] uppercase mb-3">FAQ</p>
              <h2 className="font-serif text-4xl font-black text-black">
                Schengen Visa — Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details key={i} className="group bg-white border border-gray-100 hover:border-yellow-400 transition-colors overflow-hidden">
                  <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none font-bold text-black text-sm leading-snug">
                    <span className="pr-4">{faq.q}</span>
                    <span className="text-yellow-400 text-lg flex-shrink-0 group-open:rotate-45 transition-transform duration-300">+</span>
                  </summary>
                  <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-gray-500 text-sm mb-3">Have a specific question?</p>
              <Link href="/contact" className="inline-block bg-yellow-400 text-black font-black px-8 py-3 text-sm tracking-[1.5px] uppercase hover:bg-yellow-300 transition-colors">
                Ask Our Visa Team →
              </Link>
            </div>
          </div>
        </section>

        {/* ── INTERNAL LINKS ───────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-4 md:px-10 py-16">
          <div className="mb-10">
            <p className="text-yellow-600 text-[11px] font-black tracking-[3px] uppercase mb-3">More Resources</p>
            <h2 className="font-serif text-3xl font-black text-black">Explore Our Visa Services</h2>
            <p className="text-gray-500 mt-2 text-sm">Everything you need for a successful visa application — in one place.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {internalLinks.map((link) => (
              <Link key={link.href + link.label} href={link.href}
                className="flex items-center gap-3 p-4 border border-gray-100 hover:border-yellow-400 hover:bg-yellow-50 transition-all duration-200 group">
                <span className="text-xl flex-shrink-0 group-hover:scale-110 transition-transform">{link.icon}</span>
                <span className="text-black font-semibold text-sm leading-tight group-hover:text-yellow-700 transition-colors">{link.label}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── CTA BANNER ───────────────────────────────────────────── */}
        <section className="bg-yellow-400 border-t-4 border-black py-16 px-4 md:px-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl font-black text-black mb-4 leading-tight">
              Ready to Visit Europe?<br />Let's Get Your Visa.
            </h2>
            <p className="text-black/70 text-lg mb-8 max-w-lg mx-auto">
              Talk to a visa expert today. No queues, no confusion — just straightforward guidance from Dubai's trusted Schengen specialists.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="bg-black text-yellow-400 font-black px-10 py-4 text-sm tracking-[2px] uppercase hover:bg-gray-900 transition-colors">
                Book Free Consultation →
              </Link>
              <Link href="/visa-resources/visa-checklist-generator" className="border-2 border-black text-black font-black px-10 py-4 text-sm tracking-[2px] uppercase hover:bg-black hover:text-yellow-400 transition-colors">
                📋 Get Document Checklist
              </Link>
            </div>
            <p className="text-black/50 text-xs mt-6">
              🔒 Your information is secure. We are registered visa consultants based in Dubai, UAE.
            </p>
          </div>
        </section>

        {/* ── SCHEMA LAST-UPDATED NOTE ─────────────────────────────── */}
        <div className="bg-gray-50 border-t border-gray-100 px-4 md:px-10 py-4 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
          <span>
            Page last updated: <time dateTime="2025-12-02" className="font-semibold text-gray-600">December 2025</time> ·
            Source:{' '}
            <a href="https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en" target="_blank" rel="noopener noreferrer" className="text-yellow-600 hover:underline font-semibold">
              European Commission
            </a>
          </span>
          <nav aria-label="Related pages" className="flex flex-wrap gap-4">
            <Link href="/visa/tourist-visa" className="hover:text-yellow-600 font-semibold transition-colors">Tourist Visa</Link>
            <Link href="/visa/work-visa" className="hover:text-yellow-600 font-semibold transition-colors">Work Visa</Link>
            <Link href="/visa/student-visa" className="hover:text-yellow-600 font-semibold transition-colors">Study Abroad</Link>
            <Link href="/visa" className="hover:text-yellow-600 font-semibold transition-colors">Check Visa</Link>
            <Link href="/visa-processing-time-tracker" className="hover:text-yellow-600 font-semibold transition-colors">Processing Times</Link>
          </nav>
        </div>

      </main>
    </>
  );
}