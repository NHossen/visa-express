// components/AboutVisaExpress.jsx
import React from "react";
import Link from "next/link";

const stats = [
  { value: "50,000+", label: "Visa Applications Processed" },
  { value: "120+", label: "Countries Covered" },
  { value: "98%", label: "Client Satisfaction Rate" },
  { value: "10+", label: "Years of Expertise" },
];

const services = [
  {
    icon: "✈️",
    title: "Tourist & Visit Visa",
    desc: "Complete tourist visa processing for Schengen, UK, USA, Canada, Australia, UAE, and 100+ destinations with document checklist and embassy guidance.",
  },
  {
    icon: "💼",
    title: "Business Visa Assistance",
    desc: "Professional business visa support including invitation letter guidance, bank statement templates, and company sponsorship documentation.",
  },
  {
    icon: "🎓",
    title: "Student Visa Consultation",
    desc: "End-to-end student visa support for the UK, Canada, Australia, USA, Germany, and more — from university admission to visa interview preparation.",
  },
  {
    icon: "🏗️",
    title: "Work Permit & Employment Visa",
    desc: "Work permit applications for GCC countries, Europe, and Canada. Assistance with job offer letters, LMIA documents, and employer sponsorship.",
  },
  {
    icon: "📋",
    title: "Document Verification & Review",
    desc: "Expert review of all supporting documents including bank statements, employment letters, travel history, and NOC certificates before submission.",
  },
  {
    icon: "🛫",
    title: "Flight & Hotel Reservations",
    desc: "Dummy flight reservations and hotel booking confirmations acceptable for visa applications — recognized by embassies worldwide.",
  },
  {
    icon: "🛡️",
    title: "Travel Insurance Guidance",
    desc: "Schengen-compliant travel insurance advisory with minimum coverage recommendations for EU, UK, and other visa-requiring destinations.",
  },
  {
    icon: "🔁",
    title: "Visa Refusal Case Handling",
    desc: "Specialized reapplication support after visa rejection — detailed refusal analysis, gap identification, and stronger resubmission strategy.",
  },
  {
    icon: "📍",
    title: "Real-Time Application Tracking",
    desc: "Live visa status tracking via VFS Global, BLS International, TLScontact, and direct embassy portals for accurate, up-to-date updates.",
  },
  {
    icon: "🌍",
    title: "E-Visa & Visa on Arrival",
    desc: "Fast e-visa processing for Turkey, Egypt, Sri Lanka, Cambodia, Kenya, and 40+ countries offering electronic or on-arrival entry.",
  },
  {
    icon: "👨‍👩‍👧",
    title: "Family & Dependent Visas",
    desc: "Family reunification, spouse visas, and dependent visa applications with relationship documentation and financial sponsorship guidance.",
  },
  {
    icon: "🔄",
    title: "Visa Extension & Renewal",
    desc: "In-country visa extension support and renewal applications for tourist visas, residency permits, and long-stay authorizations.",
  },
];

const destinations = [
  { name: "United Kingdom", flag: "🇬🇧", type: "Standard Visitor Visa" },
  { name: "Schengen Europe", flag: "🇪🇺", type: "Schengen C & D Visa" },
  { name: "Canada", flag: "🇨🇦", type: "TRV, Study & Work Permit" },
  { name: "Australia", flag: "🇦🇺", type: "ETA, Subclass 600/500" },
  { name: "United States", flag: "🇺🇸", type: "B1/B2, F1, H1B Visa" },
  { name: "Dubai / UAE", flag: "🇦🇪", type: "Tourist, Transit & Residency" },
  { name: "Japan", flag: "🇯🇵", type: "Short Stay & Work Visa" },
  { name: "Singapore", flag: "🇸🇬", type: "Visit, Employment Pass" },
  { name: "New Zealand", flag: "🇳🇿", type: "NZeTA, Student Visa" },
  { name: "South Korea", flag: "🇰🇷", type: "C3, D2 Student Visa" },
  { name: "Thailand", flag: "🇹🇭", type: "TR, STV, Work Permit" },
  { name: "Malaysia", flag: "🇲🇾", type: "eVisa, MM2H, Work Pass" },
];

const whyUs = [
  {
    title: "Licensed & Accredited Consultancy",
    body: "Visa Express Hub operates as a specialized division of Eammu Holidays, a registered travel and visa consultancy with offices in Dubai, Armenia, and Georgia. Our team includes IATA-affiliated agents and certified immigration consultants.",
  },
  {
    title: "Up-to-Date Visa Intelligence",
    body: "Our consultants actively monitor embassy circulars, VFS Global updates, immigration law changes, and bilateral travel agreements to ensure every client receives current, accurate advice — not outdated templates.",
  },
  {
    title: "High Visa Approval Rate",
    body: "With structured document review, mock interview preparation, and embassy-specific SOPs, we consistently achieve above-average approval rates for first-time applicants, students, and individuals with complex travel history.",
  },
  {
    title: "End-to-End Application Support",
    body: "From eligibility assessment and document checklist to form filling, application submission, and status tracking — we manage the entire process so clients avoid costly errors and unnecessary delays.",
  },
  {
    title: "Multi-Nationality Expertise",
    body: "We serve applicants from Bangladesh, India, Pakistan, Nigeria, Ghana, Ethiopia, Philippines, and other nationalities with destination-specific advice tailored to each passport's unique visa requirements and embassy policies.",
  },
  {
    title: "Transparent Pricing, No Hidden Fees",
    body: "Our service fees are clearly disclosed upfront. We never charge for consultations that yield no actionable plan, and we provide detailed cost breakdowns including embassy fees, VFS charges, and our consultancy fee.",
  },
];

const faqs = [
  {
    q: "What documents are required for a tourist visa application?",
    a: "Required documents typically include a valid passport (6+ months validity), completed visa application form, passport-size photographs, travel itinerary, confirmed flight reservations, hotel bookings, travel insurance, bank statements (last 3–6 months), employment letter or business registration, and proof of ties to your home country. Requirements vary by destination.",
  },
  {
    q: "How long does visa processing take?",
    a: "Visa processing times vary by country and application centre. Standard processing ranges from 5–15 working days for Schengen visas, 3–8 weeks for UK visas, and 2–4 weeks for Canadian visitor visas. We recommend applying at least 6–8 weeks before your travel date.",
  },
  {
    q: "Can Visa Express Hub help after a visa rejection?",
    a: "Yes. Our refusal case specialists analyze the rejection letter, identify the grounds for refusal, and build a stronger reapplication with improved documentation, updated financial proof, and a compelling cover letter addressing the refusal reason.",
  },
  {
    q: "Do you provide dummy flight tickets for visa applications?",
    a: "Yes. We provide embassy-accepted flight reservation confirmation and hotel booking letters that satisfy visa application requirements without requiring a paid, non-refundable booking in advance.",
  },
  {
    q: "Which nationalities do you assist?",
    a: "We assist applicants from all nationalities, with specialized expertise for Bangladeshi, Indian, Pakistani, Nigerian, Ghanaian, and Filipino passport holders — covering major destinations including the UK, Schengen, Canada, Australia, USA, and GCC countries.",
  },
];

const AboutVisaExpress = () => {
  return (
    <main
      className="bg-slate-50 text-gray-800"
      aria-label="About Visa Express Hub"
      itemScope
      itemType="https://schema.org/Organization"
    >
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_#60a5fa,_transparent_60%)]" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <p className="inline-block text-xs font-semibold tracking-widest uppercase bg-blue-700/40 border border-blue-500/40 text-blue-200 px-4 py-1 rounded-full mb-5">
            Trusted Visa Consultancy Since 2014
          </p>
          <h1
            className="text-4xl md:text-5xl font-extrabold leading-tight mb-6"
            itemProp="name"
          >
            About Visa Express Hub — Global Visa Assistance & Travel Experts
          </h1>
          <p
            className="text-lg md:text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed"
            itemProp="description"
          >
            Visa Express Hub is a professional visa consultancy platform
            providing tourist visas, student visas, business visas, work
            permits, and travel documentation for 120+ countries. As a
            specialist division of{" "}
            <strong className="text-white">Eammu Holidays</strong>, we combine
            deep immigration expertise with end-to-end travel support to help
            you travel smarter, faster, and stress-free.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/visa"
              className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold px-7 py-3 rounded-full text-sm transition-colors"
            >
              Explore Visa Services
            </Link>
            <Link
              href="/contact"
              className="border border-blue-300 hover:bg-blue-700/40 text-white font-semibold px-7 py-3 rounded-full text-sm transition-colors"
            >
              Get Free Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-white border-b border-gray-100 py-12 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-4xl font-extrabold text-blue-700">{s.value}</p>
              <p className="text-sm text-gray-500 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission & Sponsor ── */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-stretch">
          <article className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">
              Our Mission — Simplifying Visa Applications Worldwide
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Visa Express Hub, we believe that international travel should
              not be blocked by confusing visa procedures. Our mission is to
              make visa applications transparent, accurate, and accessible — for
              first-time travelers, students, business professionals, and
              frequent flyers alike.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              We assist applicants with embassy requirements, VFS Global
              appointments, BLS International centres, document preparation,
              cover letters, financial proof, travel history explanations, and
              full application review before submission.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Whether you're applying for a Schengen visa, UK Standard Visitor
              Visa, Canadian TRV, Australian ETA, or a UAE residence permit —
              our team provides destination-specific, nationality-aware
              guidance backed by years of real-world immigration experience.
            </p>
          </article>

          <article
            className="bg-blue-950 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between"
            itemScope
            itemType="https://schema.org/Organization"
          >
            <div>
              <h2 className="text-2xl font-bold mb-2">
                Proudly Powered by Eammu Holidays
              </h2>
              <p className="text-blue-300 text-sm mb-6">
                International Travel, Tours & Visa Solutions
              </p>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-amber-400 rounded-full flex items-center justify-center font-extrabold text-blue-950 text-lg shrink-0">
                  EH
                </div>
                <div>
                  <p
                    className="font-bold text-lg"
                    itemProp="name"
                  >
                    Eammu Holidays
                  </p>
                  <p className="text-blue-300 text-sm">
                    Offices in Dubai · Armenia · Georgia
                  </p>
                </div>
              </div>
              <p className="text-blue-100 leading-relaxed text-sm border-t border-blue-800 pt-5">
                Visa Express Hub is the visa consultancy arm of Eammu Holidays —
                a globally operating travel company with offices in Dubai,
                Armenia, and Georgia. Our infrastructure connects clients to
                airline GDS systems, global hotel networks, VFS appointment
                platforms, and a dedicated team of visa specialists and
                immigration consultants across multiple time zones.
              </p>
            </div>
            <div className="mt-6 pt-5 border-t border-blue-800">
              <Link
                href="https://eammu.com/"
                className="text-amber-400 hover:text-amber-300 font-semibold text-sm underline underline-offset-4"
              >
                Visit Eammu Holidays →
              </Link>
            </div>
          </article>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="bg-white py-20 px-4" aria-labelledby="services-heading">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-14">
            <h2
              id="services-heading"
              className="text-3xl font-extrabold text-gray-900 mb-3"
            >
              Comprehensive Visa & Travel Services
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              From tourist visa processing to work permit support, student visa
              consultation, and visa refusal case handling — we cover every stage
              of your international travel journey.
            </p>
          </header>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc, i) => (
              <div
                key={i}
                className="bg-slate-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="text-3xl mb-3">{svc.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{svc.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Destinations ── */}
      <section className="py-20 px-4 bg-slate-50" aria-labelledby="destinations-heading">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h2
              id="destinations-heading"
              className="text-3xl font-extrabold text-gray-900 mb-3"
            >
              Top Visa Destinations We Cover
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              We provide specialist visa support for the most popular and
              complex destinations — with nationality-specific document
              checklists and embassy-verified procedures.
            </p>
          </header>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {destinations.map((d, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-100 p-4 text-center hover:shadow-md hover:border-blue-200 transition-all"
              >
                <div className="text-4xl mb-2">{d.flag}</div>
                <p className="font-bold text-gray-800 text-sm">{d.name}</p>
                <p className="text-xs text-gray-500 mt-1">{d.type}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm text-gray-500">
            + 100 more destinations including Africa, Central Asia, Latin America,
            and Pacific island nations.{" "}
            <Link href="/visa" className="text-blue-600 underline">
              View all visa destinations →
            </Link>
          </p>
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="bg-white py-20 px-4" aria-labelledby="why-us-heading">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-14">
            <h2
              id="why-us-heading"
              className="text-3xl font-extrabold text-gray-900 mb-3"
            >
              Why Clients Choose Visa Express Hub
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Thousands of applicants trust us every year. Here's what sets us
              apart from generic travel agents and unqualified visa advisory
              websites.
            </p>
          </header>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => (
              <div key={i} className="border-l-4 border-blue-600 pl-5 py-1">
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEO Rich Text ── */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="max-w-7xl mx-auto prose prose-gray">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-6">
            Visa Consultancy Services for All Nationalities — Bangladeshi,
            Indian, Pakistani, Nigerian & More
          </h2>
          <div className="space-y-4 text-gray-700 leading-relaxed text-[15px]">
            <p>
              Visa Express Hub is a leading online visa consultancy platform
              serving applicants from Bangladesh, India, Pakistan, Nigeria,
              Ghana, Ethiopia, the Philippines, and other developing nations
              who apply to embassies in the UK, Europe, North America,
              Australia, and East Asia. We understand the specific
              documentation challenges faced by applicants with complex
              employment histories, irregular financial records, or prior
              visa refusals.
            </p>
            <p>
              Our consultants are trained in destination-specific embassy
              policies — including UK Visas &amp; Immigration (UKVI) rules, IRCC
              (Immigration, Refugees and Citizenship Canada) requirements,
              Schengen uniform visa code standards, and Australian Department
              of Home Affairs guidelines. We tailor every application package
              to the client's nationality, travel history, employment
              category, and specific visa type.
            </p>
            <p>
              For students, we provide full student visa guidance covering IELTS
              and English language requirements, university acceptance letters,
              CAS (Confirmation of Acceptance for Studies), GIC (Guaranteed
              Investment Certificate) deposits for Canada, OSHC (Overseas
              Student Health Cover) for Australia, and BioCAS document
              submission for the UK. Our student visa specialists have guided
              thousands of students to their dream study destinations.
            </p>
            <p>
              For business travelers, we provide business visa support including
              chamber of commerce letters, invitation letter verification,
              balance sheet summaries, and tax return documentation acceptable
              to Schengen embassies, British High Commissions, and Canadian
              consulates.
            </p>
            <p>
              Visa Express Hub also specializes in visa refusal case recovery.
              Our refusal consultants analyze V3.1, V3.2, V3.4 (UK) refusal
              codes, IRCC refusal notices (Canada), and Section 48, 49, 101
              refusals (Australia) to build targeted reapplication strategies
              with stronger documentation, improved itineraries, and clearer
              financial narratives.
            </p>
            <p>
              As a division of{" "}
              <strong>
                <Link href="https://eammu.com/" className="text-blue-700 no-underline hover:underline">
                  Eammu Holidays
                </Link>
              </strong>
              , Visa Express Hub combines travel consultancy with visa advisory
              to offer clients dummy flight bookings, hotel reservation letters,
              travel insurance guidance, and travel itinerary preparation —
              all essential components of a complete and embassy-ready visa
              application package.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="bg-white py-20 px-4"
        aria-labelledby="faq-heading"
        itemScope
        itemType="https://schema.org/FAQPage"
      >
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h2
              id="faq-heading"
              className="text-3xl font-extrabold text-gray-900 mb-3"
            >
              Frequently Asked Questions About Visa Applications
            </h2>
            <p className="text-gray-500">
              Common questions from visa applicants about documents, processing
              times, refusals, and our services.
            </p>
          </header>
          <div className="space-y-5">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-2xl p-6 hover:border-blue-200 transition-colors"
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <h3
                  className="font-bold text-gray-900 mb-3 flex items-start gap-2"
                  itemProp="name"
                >
                  <span className="text-blue-600 mt-0.5 shrink-0">Q.</span>
                  {faq.q}
                </h3>
                <div
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <p
                    className="text-gray-600 text-sm leading-relaxed pl-5"
                    itemProp="text"
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center mt-8 text-sm text-gray-500">
            Have more questions?{" "}
            <Link href="/contact" className="text-blue-600 underline">
              Contact our visa experts →
            </Link>
          </p>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold mb-4">
            Start Your Visa Application Today
          </h2>
          <p className="text-blue-200 mb-8 leading-relaxed">
            Whether you need a tourist visa, student visa, work permit, or
            emergency travel documentation — Visa Express Hub is ready to
            guide you from eligibility check to visa approval.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/visa-processing-time-tracker"
              className="bg-amber-400 hover:bg-amber-300 text-blue-950 font-bold px-8 py-3 rounded-full text-sm transition-colors"
            >
              Check Visa Requirements
            </Link>
            <Link
              href="/contact"
              className="border border-blue-400 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full text-sm transition-colors"
            >
              Talk to a Visa Consultant
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer note ── */}
      <footer className="py-8 px-4 text-center text-gray-400 text-xs bg-white border-t border-gray-100">
        <p>
          Visa Express Hub is a division of{" "}
          <a
            href="https://eammu.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Eammu Holidays
          </a>
          . Data infrastructure powered by{" "}
          <a
            href="https://api.eammu.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Visa Api by Eammu
          </a>
          .
        </p>
        <p className="mt-1">
          © {new Date().getFullYear()} Visa Express Hub. All rights reserved.
          Offices in Dubai, Armenia &amp; Georgia.
        </p>
      </footer>
    </main>
  );
};

export default AboutVisaExpress;