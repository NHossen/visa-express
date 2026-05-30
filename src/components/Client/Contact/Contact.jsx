import React from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const offices = [
    {
      city: "Dubai, UAE",
      address: "Al Nasser Building, Deira, Dubai, United Arab Emirates",
      phone: "+971 50 707 8334",
      callLink: "tel:+971507078334",
      whatsapp: "https://wa.me/971507078334",
      map: "https://www.google.com/maps/search/Al+Nasser+Building+Deira+Dubai",
      flag: "🇦🇪",
      badge: "Main Office",
      serves: "UAE, GCC, Expats in Dubai & Abu Dhabi",
      landmark: "Near Deira City Centre, Dubai",
    },
    {
      city: "Dhaka, Bangladesh",
      address: "Dhanmondi, Dhaka, Bangladesh",
      phone: "+880 1631 312524",
      callLink: "tel:+8801631312524",
      whatsapp: "https://wa.me/8801631312524",
      map: "https://www.google.com/maps/search/Dhanmondi+Dhaka",
      flag: "🇧🇩",
      badge: "Bangladesh Office",
      serves: "Bangladeshi nationals, Dhaka-based applicants",
      landmark: "Dhanmondi, Dhaka",
    },
  ];

  const services = [
    { icon: "🇪🇺", label: "Schengen Visa Assistance", href: "/schengen-visa" },
    { icon: "🌍", label: "Tourist Visa Consultation", href: "/visa/tourist-visa" },
    { icon: "💼", label: "Business Visa Support", href: "/visa/business-visa" },
    { icon: "🎓", label: "Student Visa Guidance", href: "/visa/student-visa" },
    { icon: "🛠️", label: "Work Visa Help", href: "/visa/work-visa" },
    { icon: "🛫", label: "Transit Visa Queries", href: "/visa/transit-visa" },
    { icon: "💻", label: "E-Visa Applications", href: "/visa/e-visa" },
    { icon: "❌", label: "Visa Rejection Appeals", href: "/visa-rejection" },
    { icon: "📋", label: "Document Checklist Help", href: "/visa-resources/visa-checklist-generator" },
    { icon: "📝", label: "Cover Letter & SOP", href: "/visa-resources/visa-document-generator" },
    { icon: "⏱️", label: "Processing Time Queries", href: "/visa-processing-time-tracker" },
    { icon: "🏆", label: "Scholarship Guidance", href: "/scholarships" },
  ];

  const faqs = [
    {
      q: "How do I contact Visa Express Hub in Dubai?",
      a: "Call or WhatsApp our Dubai office at +971 50 707 8334 (Sun–Thu 9am–6pm, Sat 10am–2pm GST). You can also email info@visaexpresshub.com — we respond to urgent visa queries 24/7.",
    },
    {
      q: "Where is the Visa Express Hub Dubai office located?",
      a: "Our Dubai office is located at Al Nasser Building, Deira, Dubai, UAE — near Deira City Centre. Walk-in consultations are welcome during business hours.",
    },
    {
      q: "Does Visa Express Hub have an office in Dhaka, Bangladesh?",
      a: "Yes. Our Dhaka office is based in Dhanmondi, Dhaka, Bangladesh. Bangladeshi nationals can contact us at +880 1631 312524 for Schengen, UK, Canada, and other visa consultations.",
    },
    {
      q: "What visas does Visa Express Hub assist with?",
      a: "We assist with Schengen visas, UK visas, USA visas, Canada visas, Australia visas, tourist visas, work visas, student visas, business visas, transit visas, and e-visas — for applicants based in Dubai, UAE and Dhaka, Bangladesh.",
    },
    {
      q: "Is the initial consultation free?",
      a: "Yes — all initial visa consultations with our team are completely free. We assess your travel plan, nationality, visa history, and recommend the best approach before you commit to anything.",
    },
    {
      q: "How quickly does Visa Express Hub respond to email inquiries?",
      a: "We respond to all email inquiries within 2–4 business hours during office hours. For urgent visa status updates, our team monitors info@visaexpresshub.com around the clock.",
    },
  ];

  const trustSignals = [
    { icon: "✅", label: "Registered UAE visa consultants" },
    { icon: "🏆", label: "High Schengen approval rate" },
    { icon: "🌍", label: "29 Schengen countries covered" },
    { icon: "📞", label: "24/7 urgent email support" },
    { icon: "🏢", label: "Offices in Dubai & Dhaka" },
    { icon: "🆓", label: "Free initial consultation" },
  ];

  const internalLinks = [
    { href: "/schengen-visa", label: "Schengen Visa Guide", icon: "🇪🇺" },
    { href: "/visa", label: "All Visa Guides", icon: "🌍" },
    { href: "/visa/tourist-visa", label: "Tourist Visa", icon: "✈️" },
    { href: "/visa/work-visa", label: "Work Visa", icon: "💼" },
    { href: "/visa/business-visa", label: "Business Visa", icon: "🤝" },
    { href: "/visa/student-visa", label: "Student Visa", icon: "🎓" },
    { href: "/visa/transit-visa", label: "Transit Visa", icon: "🛫" },
    { href: "/visa/e-visa", label: "E-Visa", icon: "💻" },
    { href: "/visa/dubai-residents", label: "Dubai Residents Hub", icon: "🏙️" },
    { href: "/visa/india", label: "India Nationals", icon: "🇮🇳" },
    { href: "/visa/nigeria", label: "Nigeria Nationals", icon: "🇳🇬" },
    { href: "/visa/ghana", label: "Ghana Nationals", icon: "🇬🇭" },
    { href: "/visa-resources/visa-checklist-generator", label: "Checklist Generator", icon: "📋" },
    { href: "/visa-resources/visa-document-generator", label: "Document Generator", icon: "📝" },
    { href: "/visa-resources/visa-checklist", label: "Visa Checklists", icon: "✅" },
    { href: "/visa-resources", label: "Visa Resources", icon: "🏛️" },
    { href: "/visa-processing-time-tracker", label: "Processing Times", icon: "⏱️" },
    { href: "/visa-rejection", label: "Rejection Guide", icon: "❌" },
    { href: "/visa-news", label: "Visa News", icon: "📰" },
    { href: "/scholarships", label: "Scholarships", icon: "🏆" },
    { href: "/disclaimer", label: "Disclaimer", icon: "📄" },
    { href: "/privacy-policy", label: "Privacy Policy", icon: "🔒" },
    { href: "/terms", label: "Terms of Service", icon: "⚖️" },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-yellow-100">

      {/* ── JSON-LD: LocalBusiness + FAQ ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "TravelAgency",
                "@id": "https://www.visaexpresshub.com/#organization",
                name: "Visa Express Hub",
                url: "https://www.visaexpresshub.com",
                logo: { "@type": "ImageObject", url: "https://www.visaexpresshub.com/visa-express-hub-logo.jpg" },
                image: "https://www.visaexpresshub.com/visa-express-hub-banner.jpg",
                description: "Visa Express Hub is a registered visa consultancy in Dubai, UAE and Dhaka, Bangladesh. We specialise in Schengen, UK, USA, Canada, tourist, business, student, and work visa assistance with a high approval rate.",
                telephone: "+971507078334",
                email: "info@visaexpresshub.com",
                priceRange: "$$",
                currenciesAccepted: "AED, USD, EUR, BDT",
                paymentAccepted: "Cash, Card, Bank Transfer",
                address: [
                  {
                    "@type": "PostalAddress",
                    streetAddress: "Al Nasser Building, Deira",
                    addressLocality: "Dubai",
                    addressRegion: "Dubai",
                    addressCountry: "AE",
                  },
                  {
                    "@type": "PostalAddress",
                    streetAddress: "Dhanmondi",
                    addressLocality: "Dhaka",
                    addressCountry: "BD",
                  },
                ],
                geo: { "@type": "GeoCoordinates", latitude: 25.2708, longitude: 55.3073 },
                openingHoursSpecification: [
                  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], opens: "09:00", closes: "18:00" },
                  { "@type": "OpeningHoursSpecification", dayOfWeek: ["Saturday"], opens: "10:00", closes: "14:00" },
                ],
                contactPoint: [
                  { "@type": "ContactPoint", telephone: "+971507078334", contactType: "customer service", areaServed: "AE", availableLanguage: ["English", "Arabic", "Bengali"] },
                  { "@type": "ContactPoint", telephone: "+8801631312524", contactType: "customer service", areaServed: "BD", availableLanguage: ["English", "Bengali"] },
                  { "@type": "ContactPoint", email: "info@visaexpresshub.com", contactType: "customer support", contactOption: "TollFree" },
                ],
                sameAs: [
                  "https://www.facebook.com/visaexpresshub",
                  "https://www.instagram.com/visaexpresshub",
                  "https://www.linkedin.com/company/visaexpresshub",
                ],
                hasMap: "https://www.google.com/maps/search/Al+Nasser+Building+Deira+Dubai",
                knowsAbout: [
                  "Schengen Visa", "UK Visa", "USA Visa", "Canada Visa", "Tourist Visa",
                  "Business Visa", "Student Visa", "Work Visa", "Transit Visa", "E-Visa",
                  "Visa Rejection Appeal", "Travel Documentation", "VFS Global Appointments",
                ],
              },
              {
                "@type": "ContactPage",
                "@id": "https://www.visaexpresshub.com/contact#webpage",
                url: "https://www.visaexpresshub.com/contact",
                name: "Contact Visa Express Hub — Dubai UAE & Dhaka Bangladesh",
                description: "Contact Visa Express Hub — registered visa consultants in Dubai, UAE and Dhaka, Bangladesh. Call +971 50 707 8334 for Schengen, UK, USA, Canada, tourist, student, and work visa assistance.",
                isPartOf: { "@id": "https://www.visaexpresshub.com/#organization" },
                dateModified: "2026-05-30",
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
                mainEntity: faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.q,
                  acceptedAnswer: { "@type": "Answer", text: faq.a },
                })),
              },
            ],
          }),
        }}
      />

      {/* ── BREADCRUMB ── */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-100 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-400 font-medium flex-wrap">
          <Link href="/" className="hover:text-yellow-600 transition-colors">Home</Link>
          <span aria-hidden="true">›</span>
          <span className="text-slate-700 font-semibold">Contact Visa Express Hub</span>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="bg-yellow-400 py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/world-item.png')] bg-center" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="bg-black/10 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
            Visa Express Hub — Dubai & Dhaka
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-white mt-5 tracking-tighter leading-tight">
            Contact Our <span className="text-black">Visa Experts</span>
          </h1>
          <p className="mt-4 text-black/70 max-w-xl mx-auto text-base font-semibold leading-relaxed">
            Get free visa consultation from registered specialists in Dubai, UAE and Dhaka, Bangladesh. Schengen, UK, USA, Canada, tourist, work & student visas.
          </p>
          {/* Trust pills */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {trustSignals.map((t) => (
              <span key={t.label} className="bg-black/10 text-black text-[10px] font-bold px-3 py-1 rounded-full">
                {t.icon} {t.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 -mt-10 relative z-20 pb-24">

        {/* ── OFFICE CARDS ── */}
        <section aria-labelledby="offices-heading">
          <h2 id="offices-heading" className="sr-only">Our Office Locations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {offices.map((office, idx) => (
              <div key={idx} className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 hover:border-yellow-400 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-yellow-400 w-14 h-14 rounded-2xl flex items-center justify-center text-3xl">
                    {office.flag}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-yellow-500 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-200">
                    {office.badge}
                  </span>
                </div>

                <h3 className="text-3xl font-black mb-1 tracking-tight">{office.city}</h3>
                <p className="text-xs font-bold text-yellow-600 mb-3 uppercase tracking-wide">{office.serves}</p>
                <p className="text-slate-500 font-medium leading-relaxed mb-1">{office.address}</p>
                <p className="text-xs text-slate-400 mb-6">📍 {office.landmark}</p>

                <div className="space-y-3 border-t border-slate-100 pt-6">
                  {/* Phone */}
                  <a href={office.callLink} className="flex items-center gap-4 group/link hover:bg-yellow-50 rounded-xl px-3 py-2 transition-colors -mx-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover/link:bg-yellow-400 transition-colors shrink-0">
                      📞
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Call / SMS</p>
                      <span className="font-black text-lg tracking-tight group-hover/link:text-yellow-600 transition-colors">
                        {office.phone}
                      </span>
                    </div>
                  </a>
                  {/* WhatsApp */}
                  <a href={office.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group/wa hover:bg-green-50 rounded-xl px-3 py-2 transition-colors -mx-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover/wa:bg-green-400 transition-colors shrink-0 text-lg">
                      💬
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">WhatsApp</p>
                      <span className="font-black text-base text-green-700 group-hover/wa:text-green-800 transition-colors">
                        Chat on WhatsApp →
                      </span>
                    </div>
                  </a>
                  {/* Map */}
                  <a href={office.map} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group/map hover:bg-blue-50 rounded-xl px-3 py-2 transition-colors -mx-3">
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover/map:bg-blue-400 transition-colors shrink-0 text-lg">
                      🗺️
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Directions</p>
                      <span className="font-black text-base text-blue-700 group-hover/map:text-blue-800 transition-colors">
                        Open in Google Maps →
                      </span>
                    </div>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── DIGITAL + HOURS ── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

          <div className="lg:col-span-2 bg-slate-50 rounded-[2.5rem] p-10 md:p-14 flex flex-col justify-center">
            <h2 className="text-3xl font-black mb-8 tracking-tighter">Get in Touch Online</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Official Email</p>
                <a href="mailto:info@visaexpresshub.com" className="text-lg font-black hover:text-yellow-600 transition-colors break-all">
                  info@visaexpresshub.com
                </a>
                <p className="text-xs text-slate-400 mt-1">Response within 2–4 hours (business days)</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Website</p>
                <Link href="/" className="text-lg font-black hover:text-yellow-600 transition-colors">
                  www.visaexpresshub.com
                </Link>
                <p className="text-xs text-slate-400 mt-1">Free tools, guides & visa resources</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Dubai WhatsApp</p>
                <a href="https://wa.me/971507078334" target="_blank" rel="noopener noreferrer" className="text-lg font-black text-green-700 hover:text-green-800 transition-colors">
                  +971 50 707 8334
                </a>
                <p className="text-xs text-slate-400 mt-1">Fastest response for urgent queries</p>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Dhaka WhatsApp</p>
                <a href="https://wa.me/8801631312524" target="_blank" rel="noopener noreferrer" className="text-lg font-black text-green-700 hover:text-green-800 transition-colors">
                  +880 1631 312524
                </a>
                <p className="text-xs text-slate-400 mt-1">Bangladesh applicants</p>
              </div>
            </div>
            {/* Social */}
            <div className="border-t border-slate-200 pt-6 mb-8">
              <p className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Follow Us</p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Facebook", href: "https://www.facebook.com/visaexpresshub", icon: "📘" },
                  { label: "Instagram", href: "https://www.instagram.com/visaexpresshub", icon: "📸" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/company/visaexpresshub", icon: "💼" },
                ].map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full text-sm font-bold hover:border-yellow-400 hover:bg-yellow-50 transition-all">
                    <span>{s.icon}</span> {s.label}
                  </a>
                ))}
              </div>
            </div>
            {/* Managed by */}
            <div className="border-t border-slate-200 pt-6">
              <p className="text-sm font-bold text-slate-400 mb-3 italic">Managed & Powered by</p>
              <a href="https://www.eammu.com" target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-4">
                <div className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black uppercase text-xs tracking-[0.2em] group-hover:bg-yellow-400 group-hover:text-black transition-all shadow-lg">
                  Eammu Holidays
                </div>
                <span className="text-xs font-black text-slate-900 underline underline-offset-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  Visit eammu.com →
                </span>
              </a>
            </div>
          </div>

          {/* Hours sidebar */}
          <div className="bg-yellow-400 rounded-[2.5rem] p-10 flex flex-col">
            <h3 className="text-2xl font-black uppercase leading-none mb-8">Office<br />Hours</h3>
            <div className="space-y-4 font-bold text-sm mb-8">
              {[
                { day: "Sunday – Thursday", hours: "09:00 – 18:00", open: true },
                { day: "Saturday", hours: "10:00 – 14:00", open: true },
                { day: "Friday", hours: "Closed", open: false },
              ].map((row) => (
                <div key={row.day} className={`flex justify-between border-b border-black/10 pb-3 ${!row.open ? 'text-black/40' : ''}`}>
                  <span>{row.day}</span>
                  <span>{row.hours}</span>
                </div>
              ))}
            </div>
            <div className="bg-black/10 rounded-2xl p-5 mb-6">
              <p className="text-xs font-black uppercase tracking-widest mb-2">Timezone</p>
              <p className="text-sm font-bold">Gulf Standard Time (GST)<br />UTC +4 — Dubai, UAE</p>
            </div>
            <div className="mt-auto">
              <p className="text-xs font-black uppercase tracking-widest mb-2">Urgent Visa Query?</p>
              <p className="text-[11px] font-medium leading-relaxed mb-4">
                Email support monitors inquiries 24/7 for urgent visa status updates and rejection appeals.
              </p>
              <a href="mailto:info@visaexpresshub.com" className="block text-center bg-black text-yellow-400 font-black text-xs uppercase tracking-widest py-3 px-4 rounded-xl hover:bg-slate-800 transition-colors">
                Email Us Now →
              </a>
            </div>
          </div>
        </section>

        {/* ── SERVICES WE HELP WITH ── */}
        <section aria-labelledby="services-heading" className="mb-12">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-10">
            <div className="mb-8">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">What We Do</p>
              <h2 id="services-heading" className="text-3xl font-black tracking-tighter">Visa Services We Assist With</h2>
              <p className="text-slate-500 text-sm mt-2 max-w-2xl">
                Contact us for any of the following visa services — our Dubai and Dhaka teams handle everything from document preparation to VFS appointment booking and rejection appeals.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {services.map((s) => (
                <Link key={s.label} href={s.href}
                  className="flex items-center gap-3 p-4 border border-slate-100 rounded-2xl hover:border-yellow-400 hover:bg-yellow-50 group transition-all">
                  <span className="text-xl shrink-0">{s.icon}</span>
                  <span className="text-sm font-bold text-slate-700 group-hover:text-yellow-700 transition-colors leading-tight">{s.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY CONTACT US ── */}
        <section aria-labelledby="why-heading" className="mb-12">
          <div className="bg-slate-900 rounded-[2rem] p-10 text-white">
            <p className="text-[10px] font-black uppercase tracking-widest text-yellow-400 mb-2">Why Choose Us</p>
            <h2 id="why-heading" className="text-3xl font-black tracking-tighter mb-8">Why Applicants in Dubai Trust Visa Express Hub</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { icon: "🎯", title: "High Approval Rate", desc: "Our document review and cover letter preparation significantly reduces the most common rejection triggers seen at UAE-based consulates." },
                { icon: "🏢", title: "Registered UAE Consultants", desc: "Visa Express Hub is a registered visa consultancy operating from Al Nasser Building, Deira, Dubai — not an online-only service." },
                { icon: "🌍", title: "All 29 Schengen Countries", desc: "We advise on the correct consulate for all 29 Schengen member states including France, Germany, Italy, Spain, Greece, and more." },
                { icon: "📋", title: "End-to-End Document Support", desc: "From personalised checklists and cover letters to employer NOCs, SOPs, and financial templates — we prepare every document." },
                { icon: "📅", title: "VFS Appointment Booking", desc: "We book VFS Global and TLSContact appointments on your behalf — critical during peak summer months when slots fill weeks ahead." },
                { icon: "❌", title: "Rejection Appeal Expertise", desc: "Had a visa refused? Our team prepares strong reapplications and formal appeals addressing the exact consulate-stated rejection grounds." },
              ].map((item) => (
                <div key={item.title} className="bg-slate-800 rounded-2xl p-6 hover:bg-slate-700 transition-colors">
                  <span className="text-2xl block mb-3">{item.icon}</span>
                  <h3 className="font-black text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section aria-labelledby="faq-heading" className="mb-12">
          <div className="bg-white border border-slate-200 rounded-[2rem] p-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Common Questions</p>
            <h2 id="faq-heading" className="text-3xl font-black tracking-tighter mb-8">Frequently Asked Questions</h2>
            <div className="space-y-5">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-slate-100 last:border-0 pb-5 last:pb-0">
                  <h3 className="font-black text-sm text-slate-900 mb-2">Q: {faq.q}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-5">
              <p className="text-sm font-bold text-yellow-900">
                Have a specific visa question not listed here?{" "}
                <a href="mailto:info@visaexpresshub.com" className="underline underline-offset-4 hover:text-yellow-700">
                  Email us at info@visaexpresshub.com
                </a>{" "}
                or call{" "}
                <a href="tel:+971507078334" className="underline underline-offset-4 hover:text-yellow-700">
                  +971 50 707 8334
                </a>{" "}
                — free consultation, no obligation.
              </p>
            </div>
          </div>
        </section>

        {/* ── INTERNAL LINKS HUB ── */}
        <section aria-labelledby="links-heading" className="mb-4">
          <div className="bg-slate-50 rounded-[2rem] p-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Explore More</p>
            <h2 id="links-heading" className="text-2xl font-black tracking-tighter mb-6">All Visa Guides & Resources</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {internalLinks.map((link) => (
                <Link key={link.href + link.label} href={link.href}
                  className="flex items-center gap-2 p-3 bg-white border border-slate-100 rounded-xl hover:border-yellow-400 hover:bg-yellow-50 group transition-all">
                  <span className="text-base shrink-0">{link.icon}</span>
                  <span className="text-xs font-bold text-slate-600 group-hover:text-yellow-700 transition-colors leading-tight">{link.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>


    </div>
  );
}