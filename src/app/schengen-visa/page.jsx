// app/schengen-visa/page.jsx
// ✅ SERVER COMPONENT — no 'use client' directive

import SchengenCountriesSection from '@/components/Client/SchengenVisa/SchengenVisa';
import Links from '@/components/Server/Links';
import Link from 'next/link';

/* ─── SEO METADATA ─────────────────────────────────────────────── */
export const metadata = {
  title: 'Schengen Visa from Dubai UAE 2026 — Complete Guide, Fees & Expert Assistance | Visa Express Hub',
  description:
    'Apply for a Schengen visa from Dubai, UAE in 2026. Official €90 fee, 15-day processing. Expert consultants in Dubai (Deira) and Dhaka. One visa covers 29 European countries. Tourist, business & student visas. Call +971 50 707 8334.',
  keywords: [
    'Schengen visa from UAE 2026',
    'Schengen visa Dubai 2026',
    'Schengen visa assistance Dubai',
    'Schengen visa consultant Dubai UAE',
    'Schengen visa requirements UAE residents',
    'how to apply Schengen visa from Dubai',
    'Schengen visa fee 2026',
    'Europe tourist visa from Dubai',
    'Schengen visa appointment UAE',
    'Schengen visa documents UAE',
    'France visa Dubai consultant',
    'Germany visa assistance Dubai UAE',
    'Italy visa consultant Dubai',
    'Spain visa from UAE',
    'Schengen visa rejection appeal UAE',
    'Schengen visa processing time Dubai',
    'VFS Global Schengen visa Dubai',
    'multiple entry Schengen visa UAE',
    'Schengen visa for expats Dubai',
    'Schengen 90 180 day rule UAE',
    'Schengen visa consultant Dhaka Bangladesh',
    'apply Schengen visa from Bangladesh',
    'Europe visa help Dubai',
    'Schengen visa agency Deira Dubai',
    'travel insurance Schengen visa',
  ],
  alternates: {
    canonical: 'https://www.visaexpresshub.com/schengen-visa',
  },
  openGraph: {
    title: 'Schengen Visa from UAE 2026 — Expert Consultants in Dubai & Dhaka | Visa Express Hub',
    description:
      'One Schengen visa. 29 European countries. Get expert assistance from Dubai-based specialists — €90 fee, 15-day processing, high approval rate. Free consultation. Call +971 50 707 8334.',
    url: 'https://www.visaexpresshub.com/schengen-visa',
    siteName: 'Visa Express Hub',
    images: [
      {
        url: '/visa-express-hub-banner.jpg',
        width: 1200,
        height: 630,
        alt: 'Schengen Visa Assistance Dubai UAE — Visa Express Hub',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schengen Visa from UAE 2026 | Expert Assistance Dubai | Visa Express Hub',
    description:
      'Apply for Schengen visa from Dubai with expert help. All 29 European countries. €90 fee. 15-day processing. High success rate. Call +971 50 707 8334.',
    images: ['/visa-express-hub-banner.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

/* ─── JSON-LD STRUCTURED DATA ───────────────────────────────────── */
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://www.visaexpresshub.com/schengen-visa#service',
      name: 'Schengen Visa Assistance from Dubai UAE',
      serviceType: 'Visa Consultancy',
      provider: { '@id': 'https://www.visaexpresshub.com/#organization' },
      description:
        'Professional Schengen visa assistance for UAE residents and expats in Dubai. We handle document preparation, VFS appointment booking, cover letters, SOPs, and application tracking for all 29 Schengen member countries.',
      areaServed: [
        { '@type': 'City', name: 'Dubai', containedInPlace: { '@type': 'Country', name: 'United Arab Emirates' } },
        { '@type': 'City', name: 'Abu Dhabi', containedInPlace: { '@type': 'Country', name: 'United Arab Emirates' } },
        { '@type': 'City', name: 'Dhaka', containedInPlace: { '@type': 'Country', name: 'Bangladesh' } },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Schengen Visa Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Schengen Tourist Visa Assistance' }, price: '90', priceCurrency: 'EUR', description: 'Official Schengen tourist visa — €90 adult fee, 15-day processing' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Schengen Business Visa Assistance' }, price: '90', priceCurrency: 'EUR' },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Schengen Student Visa Assistance' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Schengen Visa Rejection Appeal' } },
        ],
      },
    },
    {
      '@type': 'TravelAgency',
      '@id': 'https://www.visaexpresshub.com/#organization',
      name: 'Visa Express Hub',
      url: 'https://www.visaexpresshub.com',
      logo: { '@type': 'ImageObject', url: 'https://www.visaexpresshub.com/visa-express-hub-logo.jpg', width: 200, height: 60 },
      image: 'https://www.visaexpresshub.com/visa-express-hub-banner.jpg',
      description: 'Visa Express Hub — trusted visa consultancy in Dubai UAE and Dhaka Bangladesh. Specialising in Schengen, UK, USA, Canada, and Australia visas.',
      telephone: '+971507078334',
      email: 'info@visaexpresshub.com',
      priceRange: '$$',
      currenciesAccepted: 'AED, USD, EUR',
      paymentAccepted: 'Cash, Card, Bank Transfer',
      address: [
        { '@type': 'PostalAddress', streetAddress: 'Al Nasser Building, Deira', addressLocality: 'Dubai', addressRegion: 'Dubai', addressCountry: 'AE', postalCode: '00000' },
        { '@type': 'PostalAddress', streetAddress: 'Dhanmondi', addressLocality: 'Dhaka', addressCountry: 'BD' },
      ],
      geo: { '@type': 'GeoCoordinates', latitude: 25.2708, longitude: 55.3073 },
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday'], opens: '10:00', closes: '14:00' },
      ],
      sameAs: [
        'https://www.facebook.com/visaexpresshub',
        'https://www.instagram.com/visaexpresshub',
        'https://www.linkedin.com/company/visaexpresshub',
      ],
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.visaexpresshub.com/schengen-visa#webpage',
      url: 'https://www.visaexpresshub.com/schengen-visa',
      name: 'Schengen Visa from Dubai UAE 2026 — Complete Guide & Expert Assistance | Visa Express Hub',
      description: 'Full guide to applying for a Schengen visa from Dubai, UAE in 2026. Official fees, required documents, processing times, consulate selection, and expert assistance from Visa Express Hub.',
      isPartOf: { '@id': 'https://www.visaexpresshub.com/#organization' },
      dateModified: '2026-05-30',
      datePublished: '2024-01-01',
      author: { '@id': 'https://www.visaexpresshub.com/#organization' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.visaexpresshub.com' },
          { '@type': 'ListItem', position: 2, name: 'Visa Services', item: 'https://www.visaexpresshub.com/visa' },
          { '@type': 'ListItem', position: 3, name: 'Schengen Visa from UAE', item: 'https://www.visaexpresshub.com/schengen-visa' },
        ],
      },
      mainEntity: { '@id': 'https://www.visaexpresshub.com/schengen-visa#faq' },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://www.visaexpresshub.com/schengen-visa#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How much does a Schengen visa cost from Dubai in 2026?',
          acceptedAnswer: { '@type': 'Answer', text: 'The official Schengen visa fee updated in June 2024 is €90 for adults (aged 12+), €45 for children aged 6–12, and free for children under 6. VFS Global service fees apply separately and vary by consulate and location in Dubai or Abu Dhabi.' },
        },
        {
          '@type': 'Question',
          name: 'How long does Schengen visa processing take from UAE?',
          acceptedAnswer: { '@type': 'Answer', text: 'Standard Schengen visa processing takes 15 calendar days. In complex cases it may extend up to 45 days. We recommend applying 4–6 weeks before your travel date — and earlier during June to August peak season when consulate slots are limited.' },
        },
        {
          '@type': 'Question',
          name: 'Which Schengen consulate should I apply to from Dubai?',
          acceptedAnswer: { '@type': 'Answer', text: 'Apply at the consulate of the Schengen country where you will spend the most nights. If stays are equal, apply at the consulate of your first entry country. For UAE residents, most Schengen consulates operate through VFS Global centres in Dubai and Abu Dhabi.' },
        },
        {
          '@type': 'Question',
          name: 'What documents are required for a Schengen visa from UAE?',
          acceptedAnswer: { '@type': 'Answer', text: 'Core documents include: valid passport (3+ months beyond travel), UAE residence visa, completed application form, ICAO passport photo, travel insurance (min. €30,000), return flight itinerary, hotel bookings, 3–6 months bank statements, employer NOC/salary certificate, and €90 visa fee. Self-employed applicants also need trade licence and business financials.' },
        },
        {
          '@type': 'Question',
          name: 'How many days can I stay in Europe on a Schengen visa?',
          acceptedAnswer: { '@type': 'Answer', text: 'A Schengen visa allows stays of up to 90 days in any 180-day rolling period across all 29 member countries combined — not per country. Days spent in France, Germany, Italy, and Spain all count toward the same 90-day limit.' },
        },
        {
          '@type': 'Question',
          name: 'Can I apply for a Schengen visa even if I was rejected before?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. A previous rejection does not permanently ban you. You must disclose prior refusals on the new application. Our experts help prepare a stronger reapplication addressing the original refusal reasons — commonly insufficient funds, weak itinerary, or missing documents.' },
        },
        {
          '@type': 'Question',
          name: 'Can Bangladesh nationals apply for Schengen visa through Visa Express Hub in Dhaka?',
          acceptedAnswer: { '@type': 'Answer', text: 'Yes. Our Dhaka office provides full Schengen visa assistance for Bangladeshi citizens — including document preparation, cover letters, statements of purpose, and appointment guidance for all Schengen country consulates.' },
        },
        {
          '@type': 'Question',
          name: 'Do UAE nationals need a Schengen visa?',
          acceptedAnswer: { '@type': 'Answer', text: 'UAE passport holders can visit most Schengen countries visa-free for up to 90 days in any 180-day period. Residents of the UAE holding other nationalities (e.g. Indian, Pakistani, Bangladeshi, Filipino passports) typically require a Schengen visa. Contact us with your passport nationality for specific advice.' },
        },
      ],
    },
    {
      '@type': 'HowTo',
      name: 'How to Apply for a Schengen Visa from Dubai UAE',
      description: 'Step-by-step guide to applying for a Schengen visa from the UAE in 2026.',
      totalTime: 'P6W',
      estimatedCost: { '@type': 'MonetaryAmount', currency: 'EUR', value: '90' },
      step: [
        { '@type': 'HowToStep', position: 1, name: 'Free Consultation', text: 'Speak to a Schengen visa specialist. We assess your travel purpose, nationality, and destination to recommend the correct visa type and consulate.' },
        { '@type': 'HowToStep', position: 2, name: 'Document Preparation', text: 'We prepare your application form, cover letter, SOP, and review your full document package to eliminate errors.' },
        { '@type': 'HowToStep', position: 3, name: 'VFS Appointment Booking', text: 'We book your VFS Global or consulate appointment on your behalf — as early as 6 months before travel.' },
        { '@type': 'HowToStep', position: 4, name: 'Application Submission', text: 'Submit your documents with biometrics at the designated centre. We provide a final checklist walkthrough.' },
        { '@type': 'HowToStep', position: 5, name: 'Application Tracking', text: 'We monitor your case and respond promptly to any additional requests from the consulate.' },
        { '@type': 'HowToStep', position: 6, name: 'Visa Collection & Travel Briefing', text: 'Collect your approved visa. We brief you on entry conditions, the 90/180-day rule, and travel-ready requirements.' },
      ],
    },
  ],
};

/* ─── STATIC DATA ──────────────────────────────────────────────── */
const VISA_TYPES = [
  { label: 'Tourist Visa', href: '/visa/tourist-visa' },
  { label: 'Business Visa', href: '/visa/business-visa' },
  { label: 'Work Visa', href: '/visa/work-visa' },
  { label: 'Student Visa', href: '/visa/student-visa' },
  { label: 'Transit Visa', href: '/visa/transit-visa' },
  { label: 'Schengen Visa', href: '/schengen-visa', active: true },
  { label: 'E-Visa', href: '/visa/e-visa' },
];

const KEY_STATS = [
  { label: 'Official Visa Fee', value: '€90', sub: 'Adults 12+', icon: '💶' },
  { label: 'Processing Time', value: '15 days', sub: 'Standard', icon: '⏱️' },
  { label: 'Max Stay', value: '90 days', sub: 'Per 180-day period', icon: '📅' },
  { label: 'Countries Covered', value: '29', sub: 'Schengen members', icon: '🇪🇺' },
  { label: 'Insurance Required', value: '€30K', sub: 'Minimum cover', icon: '🛡️' },
  { label: 'Apply From', value: '6 months', sub: 'Before travel date', icon: '📋' },
];

const VISA_CATEGORIES = [
  {
    icon: '✈️',
    title: 'Single-Entry Visa (Type C)',
    desc: 'Permits one entry into the Schengen Area. Once you exit, the visa becomes void even if unused days remain. Best suited for a single holiday or one-time business trip.',
    badge: 'Tourist / Short Stay',
    color: 'bg-amber-100 text-amber-800',
    useCases: ['First-time Europe visitors', 'One-destination holidays', 'Short business trips'],
  },
  {
    icon: '🔄',
    title: 'Double-Entry Visa',
    desc: 'Allows two separate entries into the Schengen Area within the visa validity period. Ideal if your itinerary requires exiting and re-entering (e.g. a side trip to a non-Schengen country like the UK or Turkey).',
    badge: 'Dual Entry',
    color: 'bg-blue-100 text-blue-800',
    useCases: ['UK + Europe combo trips', 'Turkey–Greece itineraries', 'Split Europe holidays'],
  },
  {
    icon: '🌐',
    title: 'Multiple-Entry Visa',
    desc: 'Enables unlimited entries within the visa validity period — typically 1, 2, or 5 years. Each stay must not exceed 90 days in any 180-day period. Most consulates issue MEVs to applicants with strong travel history.',
    badge: 'Business / Frequent Travel',
    color: 'bg-green-100 text-green-800',
    useCases: ['Frequent business travellers', 'Expats visiting family regularly', 'Repeat conference attendees'],
  },
  {
    icon: '🛫',
    title: 'Airport Transit Visa (ATV)',
    desc: 'Required for certain nationalities to pass through the international transit zone of a Schengen airport without entering the country. Does not permit leaving the airport transit area.',
    badge: 'Transit Only',
    color: 'bg-slate-100 text-slate-600',
    useCases: ['Connecting flights through Schengen airports', 'Layovers in Frankfurt, Paris CDG, Amsterdam'],
  },
];

const DOCUMENTS = [
  { icon: '🛂', title: 'Valid Passport', detail: 'Must be valid for at least 3 months beyond your planned departure from the Schengen Area. Must contain at least 2 blank pages. Passports issued more than 10 years ago are not accepted.', mandatory: true, tip: 'Renew your passport at least 8 weeks before applying.' },
  { icon: '🪪', title: 'UAE Residence Visa / ID', detail: 'Proof of legal residence in the UAE — Emirates ID and/or residence visa stamp. Must be valid at the time of application and for the duration of your trip.', mandatory: true, tip: 'Most consulates require at least 3 months validity remaining on your UAE visa.' },
  { icon: '📋', title: 'Completed Visa Application Form', detail: 'Signed and dated. Different consulates use their own forms — France uses TLSContact, Germany and others use VFS Global. Our team prepares and reviews this to eliminate the most common rejection triggers.', mandatory: true },
  { icon: '📸', title: 'Passport-Size Photograph', detail: 'ICAO biometric standard: white or off-white background, 35×45mm, taken within the last 6 months. No glasses, head coverings (except for religious reasons), or filters.', mandatory: true },
  { icon: '🛡️', title: 'Schengen Travel Insurance', detail: 'Minimum €30,000 coverage for emergency medical treatment, hospitalisation, and medical repatriation. Policy must be valid across ALL Schengen countries for the full duration of your stay — not just your primary destination.', mandatory: true, tip: 'AXA Schengen, Allianz Travel, and BUPA are widely accepted by EU consulates.' },
  { icon: '✈️', title: 'Confirmed Flight Itinerary', detail: 'Return flight reservation showing entry and exit dates. Most consulates accept a confirmed booking — not necessarily a fully paid ticket. Ask your airline or travel agent for a reservation without full payment.', mandatory: true },
  { icon: '🏨', title: 'Accommodation Proof', detail: 'Hotel bookings, Airbnb confirmation, or a formal invitation letter (with sponsor\'s ID copy) covering your full stay. All dates must match your flight itinerary precisely.', mandatory: true },
  { icon: '🏦', title: 'Bank Statements (3–6 Months)', detail: 'Demonstrate sufficient funds to cover all trip expenses. General guidance: minimum €100 per day of stay. Statements must show consistent activity. Avoid large unexplained cash deposits in the weeks before applying.', mandatory: true, tip: 'Some consulates (e.g. France, Germany) prefer statements spanning 3 months; others request 6.' },
  { icon: '💼', title: 'Employer NOC & Salary Certificate', detail: 'A letter from your UAE employer confirming your position, monthly salary, and approved leave dates. Must be on company letterhead, signed and stamped. Include your most recent salary slip (last 1–3 months).', mandatory: true },
  { icon: '💳', title: 'Visa Fee Payment', detail: 'Adults (12+): €90 · Children 6–12: €45 · Under 6: Free · Armenia/Azerbaijan/Belarus nationals: €35. Paid in AED at the VFS centre at the time of submission (converted at the daily exchange rate).', mandatory: true },
  { icon: '🖐️', title: 'Biometric Data (Fingerprints)', detail: 'Collected at the VFS Global application centre or consulate at the time of submission. Required for all adults 12 and above. Biometrics taken within the last 59 months may be reused for some nationalities.', mandatory: true },
  { icon: '📄', title: 'Cover Letter', detail: 'A personally addressed letter to the consulate explaining your trip purpose, itinerary, financial situation, and intention to return. A strong cover letter is one of the most underrated factors in approval rates.', mandatory: true, tip: 'Use our free Cover Letter Generator to produce a consulate-optimised letter in minutes.' },
  { icon: '🏢', title: 'Business Owner: Trade Licence', detail: 'Self-employed applicants and business owners must provide their valid UAE trade licence, company registration, and 6 months of business bank statements.', mandatory: false },
  { icon: '🎓', title: 'Students: University Enrolment Letter', detail: 'A letter from your UAE educational institution confirming enrolment, academic standing, and approved leave during the travel period. Include a copy of your student ID.', mandatory: false },
  { icon: '👨‍👩‍👧', title: 'Family Travelling: Parental Consent', detail: 'Children travelling with only one parent, or unaccompanied, require a notarised consent letter from the absent parent(s) with passport copies. Some consulates require an apostille.', mandatory: false },
  { icon: '📜', title: 'Previous Schengen Visa Copies', detail: 'If you hold any previously issued Schengen visas (approved or rejected), include copies. Prior approvals strengthen your application; prior rejections must be disclosed with an explanation.', mandatory: false },
];

const STEPS = [
  {
    num: '01',
    title: 'Free Expert Consultation',
    desc: 'A Schengen visa specialist assesses your nationality, UAE residency status, travel purpose, and destination. We advise on the correct visa type, which consulate to apply to, and your realistic approval prospects.',
    time: '30–45 min',
    icon: '🗣️',
  },
  {
    num: '02',
    title: 'Personalised Document Checklist',
    desc: 'We generate a tailored document checklist based on your specific situation — employment type, nationality, prior travel history, and destination. No guesswork, no missing documents.',
    time: 'Same day',
    icon: '📋',
  },
  {
    num: '03',
    title: 'Document Preparation & Review',
    desc: 'We draft your application form, cover letter, Statement of Purpose, and any supporting letters. Every document in your package is reviewed against consulate-specific requirements before submission.',
    time: '2–5 days',
    icon: '📝',
  },
  {
    num: '04',
    title: 'VFS Appointment Booking',
    desc: 'We book your VFS Global or consulate appointment on your behalf — as early as 6 months before your travel date. Peak summer slots (June–August) fill weeks in advance. We handle scheduling so you don\'t miss the window.',
    time: 'As early as 6 months ahead',
    icon: '📅',
  },
  {
    num: '05',
    title: 'Application Submission',
    desc: 'You attend your booked appointment to submit documents and give biometrics. We provide a comprehensive final checklist walkthrough before your appointment — so you arrive prepared and confident.',
    time: 'Appointment day',
    icon: '📨',
  },
  {
    num: '06',
    title: 'Real-Time Tracking & Updates',
    desc: 'We monitor your application status throughout the 15-day processing window. If the consulate requests additional documents, we respond immediately. You receive updates at every stage.',
    time: 'Throughout processing',
    icon: '🔍',
  },
  {
    num: '07',
    title: 'Visa Collection & Travel Briefing',
    desc: 'Once your visa is approved, we guide you through collection. We then provide a full travel briefing — covering entry conditions, the 90/180-day rule, travel insurance activation, and what to carry at the border.',
    time: 'After approval',
    icon: '🎉',
  },
];

const FEE_TABLE = [
  { category: 'Adults (aged 12 and above)', fee: '€90', aeqd: '~AED 362', note: 'Standard — all nationalities' },
  { category: 'Children aged 6–12 years', fee: '€45', aeqd: '~AED 181', note: '50% reduction' },
  { category: 'Children under 6 years', fee: 'Free', aeqd: '—', note: 'Fully exempt' },
  { category: 'Armenia, Azerbaijan, Belarus', fee: '€35', aeqd: '~AED 141', note: 'Bilateral agreement rate' },
  { category: 'Cabo Verde nationals', fee: '€67.50', aeqd: '~AED 271', note: 'Bilateral agreement rate' },
  { category: 'Family members of EU/EEA citizens', fee: 'Free', aeqd: '—', note: 'Under EU Free Movement Directive' },
  { category: 'VFS Global service fee', fee: 'Varies', aeqd: '~AED 75–110', note: 'Paid in AED at centre' },
];

const REJECTION_REASONS = [
  { icon: '🏦', reason: 'Insufficient Financial Proof', fix: 'Show at least €100/day in genuine bank activity. Avoid unexplained large deposits. Supplement with salary slips, sponsor letters, or credit card statements.' },
  { icon: '📋', reason: 'Incomplete Documentation', fix: 'Missing a single required document is enough for automatic rejection. Use our Visa Checklist Generator to produce a personalised list before submission.' },
  { icon: '🛡️', reason: 'Invalid Travel Insurance', fix: 'Insurance must cover ALL Schengen states (not just your destination) and meet the €30,000 minimum. Some cheap policies exclude certain countries — read the fine print.' },
  { icon: '✈️', reason: 'Weak Return Intent', fix: 'Consulates must believe you will return to the UAE. Strong employment ties, property ownership, and family in the UAE all support your case. A clear cover letter stating your return plan helps enormously.' },
  { icon: '🔄', reason: 'Prior Visa Rejection History', fix: 'You must disclose all prior refusals. Hiding a rejection is grounds for permanent ban. Our team prepares strong reapplications that directly address previous refusal reasons.' },
  { icon: '📄', reason: 'Weak or Missing Cover Letter', fix: 'Many applicants skip the cover letter — a major mistake. A well-structured, personalised cover letter explaining purpose, itinerary, finances, and return intent significantly raises approval rates.' },
];

const COUNTRY_CONSULATES = [
  { country: 'France', flag: '🇫🇷', centre: 'TLSContact Dubai', processingDays: '15', href: '/visa/tourist-visa/france', popular: true },
  { country: 'Germany', flag: '🇩🇪', centre: 'VFS Global Dubai', processingDays: '15', href: '/visa/tourist-visa/germany', popular: true },
  { country: 'Italy', flag: '🇮🇹', centre: 'VFS Global Dubai', processingDays: '15', href: '/visa/tourist-visa/italy', popular: true },
  { country: 'Spain', flag: '🇪🇸', centre: 'VFS Global Dubai', processingDays: '10–15', href: '/visa/tourist-visa/spain', popular: true },
  { country: 'Greece', flag: '🇬🇷', centre: 'VFS Global Dubai', processingDays: '15', href: '/visa/tourist-visa/greece', popular: true },
  { country: 'Netherlands', flag: '🇳🇱', centre: 'VFS Global Dubai', processingDays: '15', href: '/visa/tourist-visa/netherlands', popular: false },
  { country: 'Switzerland', flag: '🇨🇭', centre: 'VFS Global Dubai', processingDays: '10–15', href: '/visa/tourist-visa/switzerland', popular: false },
  { country: 'Portugal', flag: '🇵🇹', centre: 'VFS Global Dubai', processingDays: '15', href: '/visa/tourist-visa/portugal', popular: false },
  { country: 'Austria', flag: '🇦🇹', centre: 'VFS Global Abu Dhabi', processingDays: '15', href: '/visa/tourist-visa/austria', popular: false },
  { country: 'Belgium', flag: '🇧🇪', centre: 'VFS Global Dubai', processingDays: '15', href: '/visa/tourist-visa/belgium', popular: false },
];

const FAQS = [
  {
    q: 'How much does a Schengen visa cost from Dubai in 2026?',
    a: 'The official Schengen visa fee (updated June 2024) is €90 for adults aged 12 and above, €45 for children aged 6–12, and free for children under 6. Certain nationality groups (Armenia, Azerbaijan, Belarus) pay €35 under bilateral agreements. These fees are paid in AED at the VFS Global application centre, converted at the daily exchange rate. VFS Global service charges are additional and vary by consulate.',
  },
  {
    q: 'Which consulate should I apply to from Dubai if I\'m visiting multiple Schengen countries?',
    a: 'Apply at the consulate of the country where you will spend the most nights. If stays are exactly equal across two or more countries, apply at the consulate of the first Schengen country you will enter. For UAE residents, most Schengen consulates operate through VFS Global in Dubai or Abu Dhabi — some operate their own dedicated centres (e.g. France\'s TLSContact). Our team will identify the correct consulate for your specific itinerary.',
  },
  {
    q: 'How long does Schengen visa processing take from UAE?',
    a: 'Standard processing is 15 calendar days from the date of a complete application submission. In cases requiring additional review — typically complex travel histories or incomplete documentation — processing can extend up to 45 days. Apply at least 4–6 weeks before your travel date. During peak summer (June–August) and December holiday periods, book your VFS appointment even earlier as slots fill several weeks in advance.',
  },
  {
    q: 'How many days can I stay in Europe on a Schengen visa?',
    a: 'You may stay up to 90 days in any rolling 180-day period across all 29 Schengen countries combined. Days are not counted per country — one night in France, two nights in Germany, and five nights in Italy all count toward the same 90-day total. Use the official EU short-stay calculator to track your permitted days accurately before each trip. Overstaying can result in future visa bans.',
  },
  {
    q: 'What financial proof is required for a Schengen visa from UAE?',
    a: 'You must demonstrate sufficient funds to cover all expenses during your stay. As a general guideline, consulates expect to see at least €100 per day of your planned stay in accessible bank account funds. Three to six months of genuine bank statements are required — avoid making large unexplained cash deposits in the weeks before applying as these raise flags. Supplementary proof such as salary slips, credit card statements, or a financial sponsor letter can strengthen your case.',
  },
  {
    q: 'Can UAE residents without UAE passports apply for a Schengen visa?',
    a: 'Yes — most expatriate residents of the UAE (holding Indian, Pakistani, Bangladeshi, Filipino, or other non-UAE passports) require a Schengen visa to visit Europe. You apply through the Schengen consulate responsible for your UAE residence location — typically Dubai or Abu Dhabi. UAE nationals (holders of UAE passports) do not need a Schengen visa for stays up to 90 days under the UAE–EU visa-free arrangement.',
  },
  {
    q: 'My Schengen visa was rejected — can I reapply?',
    a: 'Yes. A rejection does not permanently bar you from reapplying. You will receive a written refusal notice stating the grounds for rejection. You must disclose this prior refusal on all future Schengen applications. Our team specialises in preparing strong reapplications that directly address the stated rejection reasons — whether that\'s strengthening financial proof, improving the cover letter, or completing missing documents. We also assist with formal appeals where appropriate.',
  },
  {
    q: 'Can I extend my Schengen visa once I\'m inside Europe?',
    a: 'Schengen visa extensions are only granted in exceptional and documented circumstances — such as force majeure (e.g. a medical emergency), humanitarian grounds, or serious personal necessity. You cannot extend your visa simply because you wish to stay longer. Extensions must be applied for at the national immigration office of the country where you are staying. Overstaying without authorisation is a serious offence and can result in removal from the Schengen Area and a future entry ban.',
  },
  {
    q: 'Is Schengen travel insurance mandatory, and what should it cover?',
    a: 'Yes — travel medical insurance is a mandatory requirement for all Schengen visa applications without exception. The policy must cover emergency medical treatment, hospitalisation, and repatriation to a minimum of €30,000. Crucially, the policy must be valid across ALL 29 Schengen countries — not just your main destination. Many low-cost policies exclude certain countries or activities. Widely accepted insurers include AXA Schengen, Allianz Travel, and Europ Assistance.',
  },
];

const PROCESSING_TIMELINES = [
  { time: '15 calendar days', label: 'Standard processing', desc: 'Most complete applications decided within 15 days of submission.', color: 'border-green-400 bg-green-50', textColor: 'text-green-800' },
  { time: 'Up to 30 days', label: 'Extended cases', desc: 'Nationality-specific or documentation-complex applications.', color: 'border-amber-400 bg-amber-50', textColor: 'text-amber-800' },
  { time: 'Up to 45 days', label: 'Maximum statutory period', desc: 'Consulate\'s right under Schengen Visa Code for thorough review.', color: 'border-red-300 bg-red-50', textColor: 'text-red-800' },
  { time: 'Accelerated', label: 'EU/EEA family members', desc: 'Free and expedited under the EU Free Movement Directive.', color: 'border-blue-300 bg-blue-50', textColor: 'text-blue-800' },
];

const INTERNAL_LINKS_HUB = [
  // Visa categories
  { href: '/visa/tourist-visa', label: 'Tourist Visa Guides', icon: '🌍', category: 'Visa Types' },
  { href: '/visa/work-visa', label: 'Work Visa Guides', icon: '💼', category: 'Visa Types' },
  { href: '/visa/business-visa', label: 'Business Visa Guides', icon: '🤝', category: 'Visa Types' },
  { href: '/visa/student-visa', label: 'Student Visa Guides', icon: '🎓', category: 'Visa Types' },
  { href: '/visa/transit-visa', label: 'Transit Visa Guides', icon: '🛫', category: 'Visa Types' },
  { href: '/visa/e-visa', label: 'E-Visa Guides', icon: '💻', category: 'Visa Types' },
  // By nationality
  { href: '/visa/dubai-residents', label: 'Dubai Residents\' Visa Hub', icon: '🏙️', category: 'By Nationality' },
  { href: '/visa/india', label: 'India Visa Guides', icon: '🇮🇳', category: 'By Nationality' },
  { href: '/visa/nigeria', label: 'Nigeria Visa Guides', icon: '🇳🇬', category: 'By Nationality' },
  { href: '/visa/ghana', label: 'Ghana Visa Guides', icon: '🇬🇭', category: 'By Nationality' },
  // Resources
  { href: '/visa-resources/visa-checklist-generator', label: 'Visa Checklist Generator', icon: '📋', category: 'Free Tools' },
  { href: '/visa-resources/visa-document-generator', label: 'SOP & Cover Letter Generator', icon: '📝', category: 'Free Tools' },
  { href: '/visa-resources/visa-checklist', label: 'Visa Document Checklists', icon: '✅', category: 'Free Tools' },
  { href: '/visa-resources', label: 'Visa Resources Hub', icon: '🏛️', category: 'Free Tools' },
  // Tracking & rejection
  { href: '/visa-processing-time-tracker', label: 'Processing Time Tracker', icon: '⏱️', category: 'Tools' },
  { href: '/visa-rejection', label: 'Visa Rejection Guide', icon: '❌', category: 'Tools' },
  // News
  { href: '/visa-news', label: 'Latest Visa News', icon: '📰', category: 'News' },
  { href: '/visa-news/schengen-digital-nomad-visa-eu-2026', label: 'Schengen Digital Nomad 2026', icon: '💻', category: 'News' },
  // Scholarships
  { href: '/scholarships', label: 'Scholarship Opportunities', icon: '🏆', category: 'Education' },
  // Support
  { href: '/contact', label: 'Contact Our Experts', icon: '💬', category: 'Support' },
  { href: '/visa-api', label: 'Visa Data API', icon: '⚙️', category: 'Developer' },
];

/* ─── PAGE COMPONENT ────────────────────────────────────────────── */
export default function SchengenVisaPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">

      {/* ── JSON-LD ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ── BREADCRUMB ── */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-100 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-slate-400 font-medium flex-wrap">
          <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <span aria-hidden="true">›</span>
          <Link href="/visa" className="hover:text-amber-600 transition-colors">All Visa Guides</Link>
          <span aria-hidden="true">›</span>
          <Link href="/visa/tourist-visa" className="hover:text-amber-600 transition-colors">Tourist Visa</Link>
          <span aria-hidden="true">›</span>
          <span className="text-slate-700 font-semibold">Schengen Visa from UAE 2026</span>
        </div>
      </nav>

      {/* ── HEADER ── */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Pill nav */}
          <div className="flex flex-wrap gap-2 mb-6" role="navigation" aria-label="Visa type navigation">
            {VISA_TYPES.map((v) => (
              <Link
                key={v.label}
                href={v.href}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                  v.active
                    ? 'bg-amber-400 text-slate-900 border-amber-400'
                    : 'border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-700'
                }`}
                aria-current={v.active ? 'page' : undefined}
              >
                {v.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <p className="text-[11px] font-black uppercase tracking-widest text-amber-500 mb-2">Visa Express Hub — Updated May 2026</p>
              <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-3 leading-tight">
                Schengen Visa from UAE <span className="text-amber-500">2026</span>
                <span className="block text-lg md:text-xl font-semibold text-slate-500 mt-1">Complete Guide for Dubai Residents — Requirements, Fees & Expert Help</span>
              </h1>
              <p className="text-sm text-slate-500 max-w-2xl leading-relaxed mb-4">
                One Schengen visa unlocks <strong>29 European countries</strong> — France, Germany, Italy, Spain, Greece, and 24 more. Get professional visa assistance from our Dubai-based specialists.
                Official fee: <strong>€90 · 15-day processing · High approval rate.</strong>
              </p>
              {/* Trust signals */}
              <div className="flex flex-wrap gap-3 text-[11px]">
                <span className="flex items-center gap-1 text-slate-500 font-semibold">✅ Registered UAE visa consultants</span>
                <span className="flex items-center gap-1 text-slate-500 font-semibold">✅ Offices in Dubai & Dhaka</span>
                <span className="flex items-center gap-1 text-slate-500 font-semibold">✅ Free initial consultation</span>
                <span className="flex items-center gap-1 text-slate-500 font-semibold">✅ All 29 Schengen countries</span>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
              <Link
                href="/contact"
                className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-6 py-3 rounded-xl font-bold text-sm transition-all"
              >
                Book Free Consultation →
              </Link>
              <a href="tel:+971507078334" className="text-xs font-bold text-slate-600 hover:text-amber-600 transition-colors">
                📞 +971 50 707 8334
              </a>
              <p className="text-[10px] text-slate-400">Mon–Fri 9am–6pm, Sat 10am–2pm (GST)</p>
            </div>
          </div>
        </div>
      </header>

      {/* ── KEY STATS BAR ── */}
      <div className="bg-slate-900 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {KEY_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-lg font-extrabold text-amber-400">{stat.value}</p>
                <p className="text-[9px] uppercase font-bold text-slate-500 tracking-widest mt-0.5">{stat.label}</p>
                <p className="text-[9px] text-slate-600 mt-0.5">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT ── */}
      <div className="max-w-6xl mx-auto px-6 mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ─── MAIN CONTENT ─── */}
          <main className="lg:col-span-2 space-y-8">

            {/* ── WHAT IS SCHENGEN ── */}
            <section id="what-is-schengen" className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-4">What Is a Schengen Visa? (2026 Guide for UAE Residents)</h2>
              <p className="text-slate-600 leading-relaxed text-sm mb-4">
                A <strong>Schengen visa</strong> is a short-stay entry permit issued under the EU Schengen Visa Code that allows non-EU nationals to travel freely across all{' '}
                <strong>29 Schengen member states</strong> on a single visa — for up to <strong>90 days in any rolling 180-day period</strong>. For most UAE residents holding non-EU passports, it is the primary — and only — legal route to visiting Europe for tourism, business, family visits, medical treatment, or short-term conferences.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm mb-5">
                With one visa obtained through a consulate or VFS Global centre in Dubai or Abu Dhabi, you can travel freely between France, Germany, Italy, Spain, Greece, the Netherlands, Switzerland, and 22 other Schengen countries without stopping at internal borders. There are no separate visas, no multiple applications, no extra fees — one visa covers the entire area.
              </p>

              {/* Key stats grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Official Visa Fee (adults)', value: '€90', icon: '💶' },
                  { label: 'Standard Processing', value: '15 days', icon: '⏱️' },
                  { label: 'Maximum Stay', value: '90 / 180 days', icon: '📅' },
                  { label: 'Countries Covered', value: '29', icon: '🌍' },
                  { label: 'Min. Insurance Cover', value: '€30,000', icon: '🛡️' },
                  { label: 'Earliest Apply', value: '6 months before', icon: '📋' },
                ].map((item) => (
                  <div key={item.label} className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-center">
                    <p className="text-2xl mb-1">{item.icon}</p>
                    <p className="text-lg font-extrabold text-slate-900">{item.value}</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest mt-1 leading-tight">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* 90/180 rule */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-4">
                <p className="text-sm font-bold text-amber-800 mb-2">📌 Understanding the Schengen 90/180-Day Rule</p>
                <p className="text-xs text-amber-700 leading-relaxed mb-2">
                  Your 90 days are counted across <em>all</em> Schengen countries combined — not per country. A week in France, three days in Germany, and four days in Spain = 14 days toward your 90-day total. The 180-day window is rolling, not fixed to a calendar period.
                </p>
                <a href="https://ec.europa.eu/assets/home/visa-calculator/calculator.htm" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-amber-800 underline underline-offset-4">
                  Use the official EU short-stay calculator to track your remaining days →
                </a>
              </div>

              {/* Who needs it */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                <p className="text-sm font-bold text-slate-900 mb-3">Who Needs a Schengen Visa from the UAE?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 font-black mt-0.5">✓</span>
                    <span className="text-slate-600"><strong>UAE residents</strong> with Indian, Pakistani, Bangladeshi, Filipino, Egyptian, or most other non-EU passports</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-green-500 font-black mt-0.5">✓</span>
                    <span className="text-slate-600"><strong>Bangladeshi nationals</strong> applying from our Dhaka office</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-400 font-black mt-0.5">✗</span>
                    <span className="text-slate-400"><strong>UAE passport holders</strong> — visa-free up to 90 days under UAE–EU agreement</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-400 font-black mt-0.5">✗</span>
                    <span className="text-slate-400"><strong>EU/EEA/Swiss nationals</strong> — free movement rights</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ── 29 SCHENGEN COUNTRIES ── */}
            <section id="schengen-countries" className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                <div>
                  <h2 className="text-xl font-bold">29 Countries Covered by One Schengen Visa</h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Click any country for its dedicated visa guide and requirements.
                  </p>
                </div>
                <a href="https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/schengen-area_en" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-amber-600 hover:underline underline-offset-4 shrink-0">
                  Official EU Schengen list ↗
                </a>
              </div>

              <SchengenCountriesSection variant="grid" />

              <p className="text-[11px] text-slate-400 mt-4">
                * Bulgaria and Romania joined the Schengen Area on 1 January 2024 (air/sea borders) and 1 March 2024 (land borders). Source:{' '}
                <a href="https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/schengen-area_en" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-semibold hover:underline">European Commission</a>.
              </p>
            </section>

            {/* ── COUNTRY-SPECIFIC GUIDES ── */}
            <section id="country-guides" className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700">
              <div className="mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-2 block">Destination Guides</span>
                <h2 className="text-xl font-bold text-white mb-1">Tourist Visa by Country — Consulate Requirements</h2>
                <p className="text-sm text-slate-400">Each Schengen country has its own consulate, specific documentary requirements, and processing quirks. Select your destination for a tailored guide.</p>
              </div>

              <SchengenCountriesSection variant="dark-hub" />

              <div className="mt-5 pt-5 border-t border-slate-700">
                <p className="text-xs text-slate-500">
                  Not sure which destination best suits your travel plans or approval prospects?{' '}
                  <Link href="/contact" className="text-amber-400 font-bold hover:underline">Ask our Schengen experts for free →</Link>
                </p>
              </div>
            </section>

            {/* ── VFS / CONSULATE GUIDE ── */}
            <section id="consulates-dubai" className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Schengen Consulates & VFS Centres in Dubai UAE</h2>
              <p className="text-sm text-slate-500 mb-6">
                Most Schengen countries process UAE applications through <strong>VFS Global Dubai</strong> or <strong>VFS Global Abu Dhabi</strong>. France operates its own dedicated <strong>TLSContact</strong> centre. The table below lists the most applied-for destinations from the UAE.
              </p>
              <div className="overflow-hidden rounded-xl border border-slate-200">
                <table className="w-full text-sm" role="table">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="text-left px-4 py-3 font-bold text-[11px] uppercase tracking-widest">Country</th>
                      <th className="text-left px-4 py-3 font-bold text-[11px] uppercase tracking-widest hidden sm:table-cell">Application Centre</th>
                      <th className="text-center px-4 py-3 font-bold text-[11px] uppercase tracking-widest">Processing</th>
                      <th className="text-right px-4 py-3 font-bold text-[11px] uppercase tracking-widest">Guide</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COUNTRY_CONSULATES.map((c, i) => (
                      <tr key={c.country} className={`border-b border-slate-100 last:border-0 hover:bg-amber-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span>{c.flag}</span>
                            <span className="font-semibold text-slate-800 text-sm">{c.country}</span>
                            {c.popular && <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full uppercase tracking-wide hidden md:inline">Popular</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-500 hidden sm:table-cell">{c.centre}</td>
                        <td className="px-4 py-3 text-center text-xs font-bold text-green-700">{c.processingDays} days</td>
                        <td className="px-4 py-3 text-right">
                          <Link href={c.href} className="text-xs font-bold text-amber-600 hover:underline">View →</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 bg-slate-50 border border-slate-100 rounded-xl p-4">
                <p className="text-xs text-slate-500">
                  <strong className="text-slate-700">Which consulate should I apply to?</strong> Apply at the consulate of the Schengen country where you will spend the most nights. If stays are equal, apply at the first entry country's consulate.{' '}
                  <Link href="/contact" className="text-amber-600 font-bold hover:underline">Ask our team to confirm your correct consulate →</Link>
                </p>
              </div>
            </section>

            {/* ── VISA TYPES ── */}
            <section id="visa-types" className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Types of Schengen Visa — Which One Do You Need?</h2>
              <p className="text-sm text-slate-500 mb-6">The correct visa category depends on your travel frequency and purpose. Our experts advise you free of charge.</p>
              <div className="space-y-4">
                {VISA_CATEGORIES.map((v) => (
                  <div key={v.title} className="p-5 bg-slate-50 border border-slate-100 rounded-xl hover:border-amber-200 transition-colors">
                    <div className="flex items-start gap-4">
                      <span className="text-2xl shrink-0 mt-0.5">{v.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-bold text-sm text-slate-900">{v.title}</h3>
                          <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${v.color}`}>{v.badge}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed mb-3">{v.desc}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {v.useCases.map((uc) => (
                            <span key={uc} className="text-[10px] bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded-full">{uc}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-xs text-amber-800">
                  <strong>💡 Pro tip:</strong> If you have a strong EU travel history (2+ previous Schengen visas with full use), many consulates will automatically issue a multiple-entry visa (MEV) — even if you applied for a single-entry. Our team advises on how to build and present your travel history effectively.{' '}
                  <Link href="/contact" className="font-bold hover:underline">Ask us for free →</Link>
                </p>
              </div>
            </section>

            {/* ── DOCUMENTS ── */}
            <section id="documents-required" className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Schengen Visa Documents Required from UAE 2026</h2>
              <p className="text-sm text-slate-500 mb-6">
                Standard requirements for UAE-based applicants. Requirements vary slightly by consulate and applicant profile — generate a personalised checklist using our{' '}
                <Link href="/visa-resources/visa-checklist-generator" className="text-amber-600 font-bold hover:underline">
                  free Visa Checklist Generator →
                </Link>
              </p>
              <div className="space-y-3">
                {DOCUMENTS.map((doc) => (
                  <div key={doc.title} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 transition-colors">
                    <span className="text-xl shrink-0 mt-0.5">{doc.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="font-bold text-sm text-slate-900">{doc.title}</h4>
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0 ${doc.mandatory ? 'bg-amber-100 text-amber-700' : 'bg-slate-200 text-slate-500'}`}>
                          {doc.mandatory ? 'Required' : 'If Applicable'}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed">{doc.detail}</p>
                      {doc.tip && (
                        <p className="text-xs text-amber-700 mt-2 bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">
                          💡 {doc.tip}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Link href="/visa-resources/visa-checklist-generator" className="flex items-center justify-center gap-2 bg-amber-400 text-slate-900 px-5 py-3 rounded-xl font-bold text-sm hover:bg-amber-500 transition-all">
                  📋 Get My Checklist
                </Link>
                <Link href="/visa-resources/visa-document-generator" className="flex items-center justify-center gap-2 bg-white text-slate-700 px-5 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all border border-slate-200">
                  📝 Cover Letter
                </Link>
                <Link href="/visa-resources/visa-document-generator" className="flex items-center justify-center gap-2 bg-white text-slate-700 px-5 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all border border-slate-200">
                  📄 SOP Template
                </Link>
              </div>
            </section>

            {/* ── FEES ── */}
            <section id="visa-fees" className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Schengen Visa Fee 2026 — Official Rates from UAE</h2>
              <p className="text-sm text-slate-500 mb-6">
                Schengen visa fees were revised upward in June 2024 from €80 to €90 for adults. AED amounts are approximate and converted at the daily VFS rate.{' '}
                <a href="https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-semibold hover:underline">Official EU visa policy ↗</a>
              </p>
              <div className="overflow-hidden rounded-xl border border-slate-200 mb-6">
                <table className="w-full text-sm" role="table">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      <th className="text-left px-5 py-4 font-bold text-xs uppercase tracking-widest">Applicant Category</th>
                      <th className="text-right px-5 py-4 font-bold text-xs uppercase tracking-widest">EUR Fee</th>
                      <th className="text-right px-5 py-4 font-bold text-xs uppercase tracking-widest hidden sm:table-cell">AED (approx)</th>
                      <th className="text-right px-5 py-4 font-bold text-xs uppercase tracking-widest hidden md:table-cell">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FEE_TABLE.map((row, i) => (
                      <tr key={i} className={`border-b border-slate-100 last:border-0 hover:bg-amber-50 transition-colors ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                        <td className="px-5 py-4 font-semibold text-slate-800 text-sm">{row.category}</td>
                        <td className="px-5 py-4 text-right font-extrabold text-amber-600 text-base">{row.fee}</td>
                        <td className="px-5 py-4 text-right text-slate-500 text-xs hidden sm:table-cell">{row.aeqd}</td>
                        <td className="px-5 py-4 text-right text-slate-400 text-xs hidden md:table-cell">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="font-bold text-slate-900 text-base mb-4">Processing Times from UAE</h3>
              <div className="space-y-3">
                {PROCESSING_TIMELINES.map((p) => (
                  <div key={p.label} className={`border-l-4 px-5 py-4 rounded-r-xl ${p.color}`}>
                    <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                      <span className={`font-extrabold text-xl ${p.textColor}`}>{p.time}</span>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500">{p.label}</span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between">
                <p className="text-sm font-bold text-amber-900">⚡ Apply at least 4–6 weeks before travel — earlier during summer and holidays.</p>
                <Link href="/visa-processing-time-tracker" className="text-xs font-bold text-amber-700 hover:underline underline-offset-4 shrink-0">
                  ⏱ Check live processing times →
                </Link>
              </div>
            </section>

            {/* ── 7-STEP PROCESS ── */}
            <section id="application-process" className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">How to Apply for a Schengen Visa from Dubai — 7-Step Process</h2>
              <p className="text-sm text-slate-500 mb-6">
                From free consultation to visa in hand — our team in Dubai handles every stage of your Schengen application.
              </p>
              <div className="space-y-5">
                {STEPS.map((step, i) => (
                  <div key={step.num} className="flex gap-5">
                    <div className="shrink-0 flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">{step.num}</div>
                      {i < STEPS.length - 1 && <div className="w-0.5 bg-amber-100 flex-1 mt-2 min-h-[20px]" />}
                    </div>
                    <div className={`pt-1 pb-5 flex-1 ${i < STEPS.length - 1 ? 'border-b border-slate-100' : ''}`}>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-base">{step.icon}</span>
                        <h4 className="font-bold text-sm text-slate-900">{step.title}</h4>
                        <span className="text-[9px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{step.time}</span>
                      </div>
                      <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/contact" className="inline-flex items-center gap-2 bg-amber-400 text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-amber-500 transition-all">
                  Start Your Application →
                </Link>
                <Link href="/visa-resources/visa-checklist-generator" className="inline-flex items-center gap-2 bg-white text-slate-700 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all border border-slate-200">
                  📋 Get Document Checklist First
                </Link>
              </div>
            </section>

            {/* ── TOP REASONS FOR REJECTION ── */}
            <section id="rejection-reasons" className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Top Reasons Schengen Visas Are Rejected from UAE</h2>
              <p className="text-sm text-slate-500 mb-6">
                Understanding rejection patterns is the first step to avoiding them. See our full{' '}
                <Link href="/visa-rejection" className="text-amber-600 font-bold hover:underline">Visa Rejection Guide →</Link>{' '}
                and country-specific rejection rates.
              </p>
              <div className="space-y-4">
                {REJECTION_REASONS.map((r) => (
                  <div key={r.reason} className="flex items-start gap-4 p-4 bg-red-50 border border-red-100 rounded-xl hover:border-red-200 transition-colors">
                    <span className="text-xl shrink-0 mt-0.5">{r.icon}</span>
                    <div>
                      <h4 className="font-bold text-sm text-red-900 mb-1">{r.reason}</h4>
                      <p className="text-xs text-red-700 leading-relaxed">{r.fix}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 bg-slate-50 border border-slate-100 rounded-xl p-4">
                <p className="text-xs text-slate-600">
                  Had a previous rejection?{' '}
                  <Link href="/visa-rejection" className="text-amber-600 font-bold hover:underline">Read our Schengen Visa Rejection & Appeal Guide →</Link>{' '}
                  or{' '}
                  <Link href="/contact" className="text-amber-600 font-bold hover:underline">book a consultation with our experts →</Link>
                </p>
              </div>
            </section>

            {/* ── WHAT TO KNOW ── */}
            <section id="important-tips" className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-6">What UAE Applicants Must Know Before Applying</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    heading: 'Financial Proof Must Be Genuine',
                    body: 'Aim to show at least €100 per day of planned stay in genuine, consistent bank activity. Avoid large unexplained deposits in the weeks before applying — consulates treat these as red flags. Self-employed applicants should also submit business bank statements and trade licence.',
                    link: null,
                  },
                  {
                    heading: 'Insurance Must Cover All 29 Schengen States',
                    body: 'Your travel insurance must be valid across every Schengen country you plan to visit — not just your primary destination. Minimum coverage is €30,000. Read the policy carefully: many low-cost policies exclude specific countries or activities.',
                    link: null,
                  },
                  {
                    heading: 'Your Itinerary and Cover Letter Must Align',
                    body: 'Consulates assess whether your planned trip is realistic and consistent with your visa type. A tourist visa with a business-heavy itinerary raises flags. Your cover letter, accommodation bookings, and flight itinerary must tell a coherent, verifiable story.',
                    link: { href: '/visa-resources/visa-document-generator', label: 'Generate a cover letter free →' },
                  },
                  {
                    heading: 'Disclose All Prior Rejections',
                    body: 'You must declare any previous Schengen visa refusals on your new application. Hiding a prior rejection is grounds for a permanent ban. If you have a prior refusal, our team builds a strong reapplication addressing the specific stated reasons.',
                    link: { href: '/visa-rejection', label: 'Read our rejection & appeal guide →' },
                  },
                  {
                    heading: 'VFS Appointment Slots Fill Fast',
                    body: 'In Dubai and Abu Dhabi, popular consulate appointment slots (especially France, Germany, and Italy) fill up weeks in advance during peak summer months. Apply 6–8 weeks ahead — and book through us to avoid last-minute appointment shortages.',
                    link: { href: '/visa-processing-time-tracker', label: 'Check current processing times →' },
                  },
                  {
                    heading: 'Children Require Separate Applications',
                    body: 'Each child needs their own visa application, photo, and fee. If a child travels with only one parent or without both parents, most consulates require a notarised parental consent letter with a copy of the absent parent\'s passport.',
                    link: null,
                  },
                ].map((item) => (
                  <div key={item.heading} className="border-l-4 border-amber-300 pl-5">
                    <h3 className="font-bold text-sm text-slate-900 mb-1">{item.heading}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.body}</p>
                    {item.link && (
                      <Link href={item.link.href} className="text-xs font-bold text-amber-600 hover:underline mt-2 block">{item.link.label}</Link>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ── POPULAR ROUTES ── */}
            <section id="popular-routes" className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Most Popular Schengen Applications from Dubai UAE</h2>
              <p className="text-sm text-slate-500 mb-6">The most-requested visa destinations by UAE residents — with direct links to each country guide.</p>

              <SchengenCountriesSection variant="top-routes" />

              <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { flag: '🇫🇷', country: 'France', href: '/visa/tourist-visa/france' },
                  { flag: '🇩🇪', country: 'Germany', href: '/visa/tourist-visa/germany' },
                  { flag: '🇮🇹', country: 'Italy', href: '/visa/tourist-visa/italy' },
                  { flag: '🇪🇸', country: 'Spain', href: '/visa/tourist-visa/spain' },
                  { flag: '🇬🇷', country: 'Greece', href: '/visa/tourist-visa/greece' },
                  { flag: '🇨🇭', country: 'Switzerland', href: '/visa/tourist-visa/switzerland' },
                ].map((c) => (
                  <Link key={c.country} href={c.href} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-300 hover:bg-amber-50 transition-all group">
                    <span className="text-xl">{c.flag}</span>
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-amber-700">{c.country} Visa Guide</span>
                    <span className="ml-auto text-slate-300 text-sm">›</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* ── DHAKA OFFICE ── */}
            <section id="dhaka-office" className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700">
              <div className="mb-5">
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 mb-2 block">🇧🇩 Dhaka, Bangladesh</span>
                <h2 className="text-xl font-bold text-white mb-2">Schengen Visa Assistance for Bangladeshi Nationals</h2>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Our Dhanmondi, Dhaka office provides comprehensive Schengen visa support for Bangladeshi citizens applying at European consulates in Dhaka. Bangladeshi nationals require a Schengen visa regardless of UAE residency.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                {[
                  { label: 'Document Preparation', icon: '📋' },
                  { label: 'Cover Letter & SOP', icon: '📝' },
                  { label: 'Appointment Guidance', icon: '📅' },
                  { label: 'Application Review', icon: '🔍' },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-3 bg-slate-700/50 rounded-xl p-3">
                    <span>{s.icon}</span>
                    <span className="text-sm font-semibold text-slate-200">{s.label}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="bg-amber-400 text-slate-900 px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-amber-300 transition-all">
                  Contact Dhaka Office →
                </Link>
                <Link href="/visa/tourist-visa" className="bg-slate-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-600 transition-all">
                  All Tourist Visa Guides →
                </Link>
              </div>
            </section>

            {/* ── FAQ ── */}
            <section id="faq" className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-6">Schengen Visa FAQ — Dubai & UAE Residents 2026</h2>
              <div className="space-y-5">
                {FAQS.map((faq, i) => (
                  <div key={i} className="border-b border-slate-100 last:border-0 pb-5 last:pb-0">
                    <h3 className="font-bold text-sm text-slate-900 mb-2">Q: {faq.q}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 bg-slate-50 border border-slate-100 rounded-xl p-4">
                <p className="text-xs text-slate-500">
                  Have a specific question about your situation?{' '}
                  <Link href="/contact" className="text-amber-600 font-bold hover:underline">Ask our Schengen experts directly — free →</Link>
                </p>
              </div>
            </section>

            {/* ── VISA NEWS LINKS ── */}
            <section id="visa-news" className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold">Latest Schengen Visa News 2026</h2>
                <Link href="/visa-news" className="text-xs font-bold text-amber-600 hover:underline">All visa news →</Link>
              </div>
              <div className="space-y-3">
                {[
                  { href: '/visa-news/schengen-digital-nomad-visa-eu-2026', title: 'EU Digital Nomad Visa 2026 — What Schengen Residents Need to Know', date: 'May 2026', badge: 'New' },
                  { href: '/visa-news/uk-skilled-worker-salary-increase-2026', title: 'UK Skilled Worker Visa Salary Threshold Increases 2026', date: 'Apr 2026', badge: 'Update' },
                  { href: '/visa-news/canada-express-entry-healthcare-draw-2026', title: 'Canada Express Entry Healthcare Draw — How to Apply', date: 'Mar 2026', badge: 'Update' },
                ].map((news) => (
                  <Link key={news.href} href={news.href} className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-amber-200 hover:bg-amber-50 group transition-all">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full uppercase">{news.badge}</span>
                        <span className="text-[10px] text-slate-400">{news.date}</span>
                      </div>
                      <p className="text-sm font-semibold text-slate-700 group-hover:text-amber-700 transition-colors leading-snug">{news.title}</p>
                    </div>
                    <span className="text-slate-300 group-hover:text-amber-500 transition-colors text-lg shrink-0">›</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* ── OFFICIAL RESOURCES ── */}
            <section id="official-resources" className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Official EU & UAE Schengen Visa Resources</h2>
              <p className="text-sm text-slate-500 mb-6">Always verify current requirements at official government sources before submitting your application.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: 'EU Schengen Visa Policy (Official)', url: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en', desc: 'European Commission — official fees, rules, and Schengen Visa Code' },
                  { name: 'EU Short-Stay Day Calculator', url: 'https://ec.europa.eu/assets/home/visa-calculator/calculator.htm', desc: 'Calculate your remaining 90/180-day permitted days before travel' },
                  { name: 'Visa Nationality Lists', url: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy/visa-lists_en', desc: 'Check whether your passport requires a Schengen visa' },
                  { name: 'VFS Global UAE — Book Appointment', url: 'https://www.vfsglobal.com/en/individuals/index.html', desc: 'Book your Schengen visa appointment at VFS Global Dubai or Abu Dhabi' },
                  { name: 'Schengen Area Official Info', url: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/schengen-area_en', desc: 'Complete list of 29 Schengen member states and area rules' },
                  { name: 'EU Travel Insurance Requirements', url: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en', desc: 'Official guidance on Schengen travel medical insurance obligations' },
                ].map((r) => (
                  <a key={r.name} href={r.url} target="_blank" rel="noopener noreferrer"
                    className="flex items-start justify-between gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-amber-300 hover:shadow-sm group transition-all">
                    <div>
                      <h5 className="font-bold text-sm text-slate-900 mb-1">{r.name}</h5>
                      <p className="text-xs text-slate-500">{r.desc}</p>
                    </div>
                    <span className="text-slate-300 group-hover:text-amber-500 font-bold transition-colors text-lg shrink-0">↗</span>
                  </a>
                ))}
              </div>
            </section>

            {/* ── FREE TOOLS ── */}
            <section id="free-tools" className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Free Schengen Visa Document Tools</h2>
              <p className="text-sm text-slate-500 mb-6">Generate professional, consulate-optimised Schengen visa documents in minutes — free for all UAE applicants.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { href: '/visa-resources/visa-checklist-generator', label: '📋 Personalised Visa Checklist', badge: 'Free', desc: 'Tailored by nationality, destination & employment' },
                  { href: '/visa-resources/visa-document-generator', label: '📝 Statement of Purpose (SOP)', badge: 'Free', desc: 'Consulate-optimised SOP generator' },
                  { href: '/visa-resources/visa-document-generator', label: '📄 Schengen Cover Letter', badge: 'Free', desc: 'Personalised cover letter template' },
                  { href: '/visa-resources/visa-document-generator', label: '💼 NOC Letter Template', badge: 'Free', desc: 'Employer no-objection letter template' },
                  { href: '/visa-resources/visa-document-generator', label: '🏦 Bank Statement Template', badge: 'Free', desc: 'Supporting financial document template' },
                  { href: '/visa-resources/visa-checklist', label: '✅ Document Checklists by Country', badge: 'Free', desc: 'Country-specific checklist library' },
                  { href: '/visa-processing-time-tracker', label: '⏱️ Processing Time Tracker', badge: 'Free', desc: 'Live Schengen consulate processing times' },
                  { href: '/visa-rejection', label: '❌ Rejection & Appeal Guide', badge: 'Free', desc: 'How to appeal or reapply after rejection' },
                ].map((tool) => (
                  <Link key={tool.href + tool.label} href={tool.href}
                    className="flex items-start justify-between gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-amber-300 hover:bg-amber-50 group transition-all">
                    <div>
                      <p className="text-sm font-semibold text-slate-700 group-hover:text-amber-700 transition-colors">{tool.label}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{tool.desc}</p>
                    </div>
                    <span className="text-[10px] font-black tracking-widest bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full shrink-0 mt-0.5">{tool.badge}</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* ── RELATED VISA TYPES ── */}
            <section className="bg-amber-400 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-slate-900 mb-2">Explore Other Visa Categories</h2>
              <p className="text-sm text-amber-900 mb-6">Planning work, study, or longer stays abroad? Find the right visa category below.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { label: 'Tourist Visa', desc: 'Holiday & leisure travel', href: '/visa/tourist-visa', icon: '🌍' },
                  { label: 'Business Visa', desc: 'Meetings & conferences', href: '/visa/business-visa', icon: '🤝' },
                  { label: 'Work Visa', desc: 'Employment abroad', href: '/visa/work-visa', icon: '💼' },
                  { label: 'Student Visa', desc: 'Study & university', href: '/visa/student-visa', icon: '🎓' },
                  { label: 'Transit Visa', desc: 'Layovers & connections', href: '/visa/transit-visa', icon: '🛫' },
                  { label: 'E-Visa', desc: 'Online visa applications', href: '/visa/e-visa', icon: '💻' },
                ].map((v) => (
                  <Link key={v.label} href={v.href} className="bg-white rounded-xl p-4 hover:shadow-md transition-all group">
                    <span className="text-2xl block mb-2">{v.icon}</span>
                    <p className="font-bold text-sm text-slate-900 group-hover:text-amber-700 transition-colors">{v.label}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{v.desc}</p>
                  </Link>
                ))}
              </div>
            </section>

          </main>

          {/* ─── SIDEBAR ─── */}
          <aside className="space-y-5">

            {/* Apply CTA */}
            <div className="bg-slate-900 rounded-2xl p-7 text-white sticky top-10">
              <h3 className="text-lg font-bold mb-1">Apply for Schengen Visa</h3>
              <p className="text-amber-400 text-xs font-bold mb-4 uppercase tracking-widest">Expert assistance · Dubai & Dhaka</p>
              <p className="text-slate-400 text-xs mb-5 leading-relaxed">
                Our Schengen specialists handle your entire application — document prep, VFS booking, cover letter, tracking, and travel briefing. Free consultation.
              </p>
              <Link href="/contact" className="block w-full bg-amber-400 hover:bg-amber-300 text-slate-900 text-center py-3.5 rounded-xl font-bold transition-all text-sm mb-3">
                Book Free Consultation →
              </Link>
              <a href="tel:+971507078334" className="block w-full bg-slate-800 hover:bg-slate-700 text-white text-center py-3 rounded-xl font-bold transition-all text-sm mb-3">
                📞 +971 50 707 8334
              </a>
              <Link href="/visa-resources/visa-checklist-generator" className="block w-full bg-slate-800 hover:bg-slate-700 text-white text-center py-3 rounded-xl font-bold transition-all text-sm">
                📋 Get Document Checklist
              </Link>
              <div className="mt-6 border-t border-slate-800 pt-5 space-y-2.5">
                {[
                  { label: 'Visa Fee (Adults)', value: '€90' },
                  { label: 'Children 6–12', value: '€45' },
                  { label: 'Under 6', value: 'Free' },
                  { label: 'Processing', value: '15 days' },
                  { label: 'Max Stay', value: '90 / 180 days' },
                  { label: 'Countries', value: '29 Schengen' },
                  { label: 'Insurance Min.', value: '€30,000' },
                  { label: 'Apply From', value: '6 months ahead' },
                  { label: 'Latest Apply', value: '15 days before' },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-xs">
                    <span className="text-slate-500">{row.label}</span>
                    <span className="text-slate-200 font-bold text-right">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visa by destination */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-1">🌍 Visa by Destination</h3>
              <p className="text-[10px] text-slate-400 mb-4">Country-specific Schengen guides</p>
              <SchengenCountriesSection variant="sidebar" />
            </div>

            {/* Quick tools */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-4">⚡ Quick Tools</h3>
              <div className="space-y-2">
                {[
                  { label: 'Visa Checklist Generator', href: '/visa-resources/visa-checklist-generator', icon: '📋' },
                  { label: 'SOP & Cover Letter', href: '/visa-resources/visa-document-generator', icon: '📝' },
                  { label: 'Document Checklists', href: '/visa-resources/visa-checklist', icon: '✅' },
                  { label: 'Processing Time Tracker', href: '/visa-processing-time-tracker', icon: '⏱️' },
                  { label: 'Rejection Guide', href: '/visa-rejection', icon: '❌' },
                  { label: 'All Visa Resources', href: '/visa-resources', icon: '🏛️' },
                ].map((r) => (
                  <Link key={r.label + r.href} href={r.href} className="flex items-center gap-2 p-2.5 rounded-lg hover:bg-amber-50 group transition-all">
                    <span className="text-base">{r.icon}</span>
                    <span className="text-xs font-semibold text-slate-600 group-hover:text-amber-700 transition-colors">{r.label} →</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Other visa types */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <h3 className="text-sm font-bold text-slate-900 mb-4">Other Visa Types</h3>
              <div className="space-y-1.5">
                {[
                  { label: 'Tourist Visa', href: '/visa/tourist-visa', icon: '🌍' },
                  { label: 'Business Visa', href: '/visa/business-visa', icon: '🤝' },
                  { label: 'Work Visa', href: '/visa/work-visa', icon: '💼' },
                  { label: 'Student Visa', href: '/visa/student-visa', icon: '🎓' },
                  { label: 'Transit Visa', href: '/visa/transit-visa', icon: '🛫' },
                  { label: 'E-Visa Guide', href: '/visa/e-visa', icon: '💻' },
                  { label: 'Dubai Residents Hub', href: '/visa/dubai-residents', icon: '🏙️' },
                ].map((v) => (
                  <Link key={v.label} href={v.href} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-amber-50 hover:border-amber-200 border border-transparent transition-all">
                    <span>{v.icon}</span>
                    <span className="text-sm font-semibold text-slate-700 hover:text-amber-700">{v.label}</span>
                    <span className="ml-auto text-slate-300 text-sm">›</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Visa news sidebar */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-slate-900">📰 Visa News</h3>
                <Link href="/visa-news" className="text-[10px] font-bold text-amber-600 hover:underline">All →</Link>
              </div>
              <div className="space-y-3">
                {[
                  { href: '/visa-news/schengen-digital-nomad-visa-eu-2026', title: 'EU Digital Nomad Visa 2026', date: 'May 2026' },
                  { href: '/visa-news/uk-skilled-worker-salary-increase-2026', title: 'UK Skilled Worker Salary Update', date: 'Apr 2026' },
                ].map((n) => (
                  <Link key={n.href} href={n.href} className="block group">
                    <p className="text-xs font-semibold text-slate-700 group-hover:text-amber-600 transition-colors leading-snug">{n.title}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{n.date}</p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Scholarships cross-link */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-amber-900 mb-2">🏆 Study in Europe?</h3>
              <p className="text-xs text-amber-800 leading-relaxed mb-3">
                If you're applying for a student Schengen visa, check our scholarship database for fully-funded European university opportunities.
              </p>
              <Link href="/scholarships" className="text-xs font-bold text-amber-700 hover:underline underline-offset-4">
                Browse scholarships →
              </Link>
            </div>

            {/* 90/180 tip */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white">
              <h3 className="text-sm font-bold text-amber-400 mb-2">📌 90/180-Day Rule</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Your 90 days are counted across ALL Schengen countries — not per country. Days in France + Germany + Spain all count toward the same total.
              </p>
              <a href="https://ec.europa.eu/assets/home/visa-calculator/calculator.htm" target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-amber-400 hover:underline underline-offset-4">
                Use the EU calculator →
              </a>
            </div>

          </aside>

        </div>
      </div>

      {/* ── COMPREHENSIVE INTERNAL LINKS HUB ── */}
      <div className="max-w-6xl mx-auto px-6 mt-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-8">
          <div className="mb-8">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Visa Express Hub — Complete Resource Directory</p>
            <h2 className="text-2xl font-extrabold text-slate-900">Explore All Visa Services & Tools</h2>
            <p className="text-sm text-slate-500 mt-1">Everything you need for a successful visa application — guides, tools, news, and expert support in one place.</p>
          </div>

      
        </div>
      </div>

      {/* ── FINAL CTA ── */}
      <div className="max-w-6xl mx-auto px-6 mt-8 mb-12">
        <div className="bg-amber-400 rounded-2xl p-10 text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-800 mb-2">Ready to Visit Europe?</p>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-3 leading-tight">Let's Get Your Schengen Visa.</h2>
          <p className="text-sm text-amber-900 max-w-lg mx-auto mb-7 leading-relaxed">
            Talk to a Schengen visa specialist today. Expert assistance from Dubai — document preparation, VFS appointment booking, cover letters, tracking, and briefing. <strong>Free initial consultation.</strong>
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-5">
            <Link href="/contact" className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold hover:bg-slate-700 transition-all text-sm">
              Book Free Consultation →
            </Link>
            <a href="tel:+971507078334" className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all border border-slate-200 text-sm">
              📞 Call +971 50 707 8334
            </a>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/visa-resources/visa-checklist-generator" className="text-sm font-bold text-amber-800 hover:underline underline-offset-4">
              📋 Free Checklist
            </Link>
            <Link href="/visa-resources/visa-document-generator" className="text-sm font-bold text-amber-800 hover:underline underline-offset-4">
              📝 Cover Letter Tool
            </Link>
            <Link href="/visa-processing-time-tracker" className="text-sm font-bold text-amber-800 hover:underline underline-offset-4">
              ⏱️ Processing Times
            </Link>
            <Link href="/visa-rejection" className="text-sm font-bold text-amber-800 hover:underline underline-offset-4">
              ❌ Rejection Guide
            </Link>
          </div>
          <p className="text-amber-800 text-xs mt-6">🔒 Your information is secure. Registered visa consultants — Dubai, UAE & Dhaka, Bangladesh.</p>
        </div>
      </div>

      {/* ── FOOTER NAV ── */}
      <footer className="bg-white border-t border-slate-100 px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <p className="text-xs text-slate-400">
              Page last updated:{' '}
              <time dateTime="2026-05-30" className="font-semibold text-slate-600">May 2026</time> · Source:{' '}
              <a href="https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:underline font-semibold">European Commission</a>
            </p>
            <nav aria-label="Related pages" className="flex flex-wrap gap-3">
              {[
                { href: '/visa', label: 'All Visa Guides' },
                { href: '/visa/tourist-visa', label: 'Tourist Visa' },
                { href: '/visa/work-visa', label: 'Work Visa' },
                { href: '/visa/business-visa', label: 'Business Visa' },
                { href: '/visa/student-visa', label: 'Student Visa' },
                { href: '/visa/transit-visa', label: 'Transit Visa' },
                { href: '/visa-news', label: 'Visa News' },
                { href: '/visa-processing-time-tracker', label: 'Processing Times' },
                { href: '/visa-rejection', label: 'Rejection Guide' },
                { href: '/visa-resources', label: 'Visa Resources' },
                { href: '/scholarships', label: 'Scholarships' },
                { href: '/contact', label: 'Contact' },
                { href: '/disclaimer', label: 'Disclaimer' },
                { href: '/privacy-policy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms' },
              ].map((l) => (
                <Link key={l.href} href={l.href} className="text-xs font-semibold text-slate-400 hover:text-amber-600 transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="text-[10px] text-slate-300 text-center">
            Visa Express Hub — Al Nasser Building, Deira, Dubai, UAE · Dhanmondi, Dhaka, Bangladesh · info@visaexpresshub.com · +971 50 707 8334
          </p>
        </div>
        <Links />
      </footer>

    </div>
  );
}