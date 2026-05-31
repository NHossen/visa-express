"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { createSlug } from "@/app/lib/utils";

// ─────────────────────────────────────────────────────────────────────────────
// STATIC SEO DATA
// ─────────────────────────────────────────────────────────────────────────────

const POPULAR = [
  { name: "United States",    emoji: "🇺🇸", tag: "B1/B2 Visa" },
  { name: "United Kingdom",   emoji: "🇬🇧", tag: "Standard Visitor" },
  { name: "Canada",           emoji: "🇨🇦", tag: "TRV" },
  { name: "Germany",          emoji: "🇩🇪", tag: "Schengen" },
  { name: "France",           emoji: "🇫🇷", tag: "Schengen" },
  { name: "Italy",            emoji: "🇮🇹", tag: "Schengen" },
  { name: "Japan",            emoji: "🇯🇵", tag: "Tourist Visa" },
  { name: "Australia",        emoji: "🇦🇺", tag: "Subclass 600" },
  { name: "Singapore",        emoji: "🇸🇬", tag: "Visitor Pass" },
  { name: "Thailand",         emoji: "🇹🇭", tag: "TR Visa" },
  { name: "Malaysia",         emoji: "🇲🇾", tag: "eNTRI / eVISA" },
  { name: "South Korea",      emoji: "🇰🇷", tag: "C-3 Visa" },
  { name: "Netherlands",      emoji: "🇳🇱", tag: "Schengen" },
  { name: "Spain",            emoji: "🇪🇸", tag: "Schengen" },
  { name: "United Arab Emirates", emoji: "🇦🇪", tag: "Visit Visa" },
  { name: "New Zealand",      emoji: "🇳🇿", tag: "Visitor Visa" },
];

// All major visa destination guides — SEO internal links
const SEO_LINKS = [
  { name: "USA B1/B2 Tourist & Business Visa",    slug: "united-states",        desc: "DS-160, interview prep, bank balance guide for Ghanaian applicants at US Embassy Accra" },
  { name: "UK Standard Visitor Visa",             slug: "united-kingdom",       desc: "UKVI checklist, financial proof, cover letter format for Ghana passport holders" },
  { name: "Canada Visitor Visa (TRV)",            slug: "canada",               desc: "IRCC requirements, biometrics, ties-to-Ghana documentation for Canadian TRV" },
  { name: "Germany Schengen Visa",                slug: "germany",              desc: "German Embassy Accra requirements, Schengen application guide for Ghanaians" },
  { name: "France Schengen Visa",                 slug: "france",               desc: "VFS France Accra — full checklist for Ghanaian passport holders" },
  { name: "Italy Schengen Visa",                  slug: "italy",                desc: "Italian Consulate Accra requirements, invitation letter guide for Ghanaians" },
  { name: "Spain Schengen Visa",                  slug: "spain",                desc: "Spanish Embassy requirements, financial documents for Ghanaian applicants" },
  { name: "Netherlands Schengen Visa",            slug: "netherlands",          desc: "Dutch Embassy, VFS Netherlands — full Schengen guide for Ghana nationals" },
  { name: "Japan Tourist Visa",                   slug: "japan",                desc: "Embassy of Japan Accra — checklist, bank balance, itinerary for Ghanaians" },
  { name: "Australia Visitor Visa (Subclass 600)",slug: "australia",            desc: "Home Affairs requirements, processing time, documents for Ghanaian nationals" },
  { name: "South Korea C-3 Tourist Visa",         slug: "south-korea",          desc: "Korean Embassy Accra — full guide and requirements for Ghana passport" },
  { name: "Singapore Visitor Pass",               slug: "singapore",            desc: "ICA requirements, sponsor letter, tourist pass for Ghanaian nationals" },
  { name: "Malaysia eNTRI / eVISA",               slug: "malaysia",             desc: "Online visa options, eNTRI eligibility for Ghanaian passport holders" },
  { name: "Thailand TR Tourist Visa",             slug: "thailand",             desc: "Royal Thai Embassy Accra requirements for Ghanaian passport holders" },
  { name: "UAE Visit Visa for Ghanaians",         slug: "united-arab-emirates", desc: "Dubai visit visa, requirements, sponsor vs company-sponsored for Ghanaians" },
  { name: "New Zealand Visitor Visa",             slug: "new-zealand",          desc: "Immigration NZ requirements, online application guide for Ghana nationals" },
  { name: "Switzerland Schengen Visa",            slug: "switzerland",          desc: "Swiss Embassy Accra — Schengen checklist for Ghanaian applicants" },
  { name: "Belgium Schengen Visa",                slug: "belgium",              desc: "Belgian Embassy requirements, VFS Belgium Ghana guide" },
  { name: "Sweden Schengen Visa",                 slug: "sweden",               desc: "Swedish Embassy Accra, full application guide for Ghanaian passport" },
  { name: "Norway Schengen Visa",                 slug: "norway",               desc: "Norwegian Embassy requirements, documents for Ghanaian nationals" },
  { name: "Turkey e-Visa",                        slug: "turkey",               desc: "Online e-Visa requirements for Ghanaian passport holders — fast approval" },
  { name: "Kenya eTA for Ghanaians",              slug: "kenya",                desc: "East Africa entry — Kenya eTA online application for Ghana passport" },
];

const VISA_CATEGORIES = [
  { label: "Schengen Visa for Ghanaians",  icon: "🏰", desc: "Germany, France, Italy, Spain, Netherlands & 22 more countries. Step-by-step guide for Ghanaian applicants.", href: "/schengen-visa", badge: "27 Countries" },
  { label: "USA Visa for Ghanaians",       icon: "🗽", desc: "B1/B2 tourist & business visa — DS-160, interview prep, financial docs for Ghana passport at US Embassy Accra.", href: "/visa/ghana/united-states", badge: "Interview Required" },
  { label: "UK Visa for Ghanaians",        icon: "🎡", desc: "UK Standard Visitor Visa — UKVI checklist, bank statements, cover letter for Ghanaian passport holders.", href: "/visa/ghana/united-kingdom", badge: "3–4 Weeks" },
  { label: "Canada Visa for Ghanaians",    icon: "🍁", desc: "Visitor Visa (TRV) — IRCC requirements, biometrics, tie-to-Ghana documentation for Ghanaian applicants.", href: "/visa/ghana/canada", badge: "6–12 Weeks" },
  { label: "Asia Pacific Visas",           icon: "🏯", desc: "Japan, South Korea, Singapore, Thailand, Malaysia, Australia — full country-specific guides for Ghanaians.", href: "/visa/tourist-visa/japan", badge: "200+ Countries" },
  { label: "Business Visa for Ghanaians",  icon: "💼", desc: "Short-stay business visas for USA, UK, Schengen & Asia — meeting, conference and trade visit documentation.", href: "/visa/business-visa/ghana-to-united-states", badge: "All Destinations" },
  { label: "Student Visa for Ghanaians",   icon: "🎓", desc: "Study abroad funding and student visa guide for Ghanaian nationals — USA F-1, UK Tier 4, Canada & more.", href: "/visa/student-visa/ghana", badge: "Study Abroad" },
  { label: "Work Visa for Ghanaians",      icon: "🔧", desc: "UK Skilled Worker, Canada LMIA, UAE work permit — complete work visa guide for Ghanaian passport holders.", href: "/visa/work-visa/ghana-to-united-kingdom", badge: "Relocate" },
  { label: "e-Visa for Ghanaians",         icon: "💻", desc: "Online visas — Turkey, Kenya, Cambodia, Rwanda, Sri Lanka ETA — instant to 72hr approval for Ghanaians.", href: "/visa/e-visa/ghana", badge: "Online" },
];

const WHY_US = [
  { icon: "🛡️", title: "98% Visa Approval Rate",         desc: "Our consultants have helped thousands of Ghanaian passport holders secure approvals worldwide. We know precisely what the US Embassy Accra, British High Commission Ghana, and Schengen embassies look for from Ghanaian applicants." },
  { icon: "📋", title: "Embassy-Accurate Checklists",     desc: "Every document checklist is verified against official embassy circulars and VFS Global Ghana announcements — updated monthly. Built specifically for Ghana passport holders applying in 2026." },
  { icon: "⚡", title: "24-Hour Document Review",         desc: "Expert review and feedback eliminates the most common rejection triggers for Ghanaian applicants — insufficient funds documentation, weak cover letters, and formatting errors — before you submit." },
  { icon: "🌍", title: "200+ Countries Covered",          desc: "From Schengen embassies in Accra to online e-Visa portals — tourist, business, student, and medical visas expertly handled for Ghanaian passport holders in Ghana, UAE, and Bangladesh." },
  { icon: "📞", title: "Dedicated Ghana Passport Team",   desc: "Our consultants specialise in Ghana passport applications. We understand the specific challenges Ghanaian nationals face at each embassy — from the US Embassy appointment backlog to Schengen financial proof requirements." },
  { icon: "✈️", title: "Serving Ghanaians Worldwide",     desc: "Based in Dubai and Dhaka, we help Ghanaian expats across the UAE, Bangladesh, and Ghana with visa applications for all destinations. WhatsApp consultation available 7 days a week." },
];

const TESTIMONIALS = [
  { name: "Abena Mensah",     country: "UK Standard Visitor Visa ✅", text: "Got my UK visa approved in 14 days from Accra. The team reviewed every document and my cover letter — zero rejection issues at the British High Commission. They really understand what UKVI needs from Ghanaian applicants.", stars: 5 },
  { name: "Kwame Asante",     country: "Germany Schengen Visa ✅",    text: "Applied for a Germany Schengen as a Ghanaian national. Perfect document checklist, excellent financial file guidance, no rejection. My second application after being refused elsewhere — approved first time with these guys.", stars: 5 },
  { name: "Akosua Boateng",   country: "Canada Visitor Visa ✅",      text: "Canada TRV approved — they helped me structure everything exactly the way IRCC expects from a Ghanaian applicant. Approved in 5 weeks. The cover letter they drafted made all the difference.", stars: 5 },
  { name: "Kofi Darko",       country: "USA B1/B2 Visa ✅",           text: "US visa interview at Embassy Accra — fully prepared by their team. Mock interview, DS-160 review, financial document formatting. Approved first attempt after a previous refusal. Highly recommended for all Ghanaians.", stars: 5 },
  { name: "Ama Owusu",        country: "Japan Tourist Visa ✅",        text: "Japan tourist visa from Accra in 6 working days. Their Japan-specific Ghana checklist was perfect — exact bank balance format, itinerary template and invitation letter. No issues at the Embassy.", stars: 5 },
  { name: "Yaw Amponsah",     country: "Australia Subclass 600 ✅",   text: "Australia Visitor Visa approved as a self-employed Ghanaian. They knew exactly how to present business income as a sole trader. Approved in 3 weeks — much faster than I expected.", stars: 5 },
];

// Key requirements data for SEO content richness
const VISA_REQUIREMENTS = [
  {
    country: "USA (B1/B2)",
    flag: "🇺🇸",
    processing: "2–8 months (interview)",
    bankBalance: "USD 3,000+",
    keyDocs: ["DS-160", "Interview at US Embassy Accra", "Bank statements 6 months", "Employment letter", "Property/ties to Ghana"],
    href: "/visa/ghana/united-states",
  },
  {
    country: "UK (Standard Visitor)",
    flag: "🇬🇧",
    processing: "3–4 weeks",
    bankBalance: "GBP 2,000+",
    keyDocs: ["Online application", "VFS Ghana submission", "Bank statements 6 months", "Employer NOC", "Hotel/flight bookings"],
    href: "/visa/ghana/united-kingdom",
  },
  {
    country: "Schengen (Germany/France)",
    flag: "🇩🇪",
    processing: "15–20 working days",
    bankBalance: "EUR 3,000+",
    keyDocs: ["Application form", "Travel insurance min €30k", "Bank statements 3 months", "Return flight + hotel", "VFS or Embassy Accra"],
    href: "/visa/ghana/germany",
  },
  {
    country: "Canada (TRV)",
    flag: "🇨🇦",
    processing: "6–12 weeks",
    bankBalance: "CAD 5,000+",
    keyDocs: ["Online IRCC application", "Biometrics", "Bank statements 6 months", "Employment letter", "Ties to Ghana evidence"],
    href: "/visa/ghana/canada",
  },
];

const SEO_ARTICLES = [
  {
    icon: "📄",
    heading: "How to Apply for a Schengen Visa as a Ghanaian in 2026",
    body: "Ghanaian nationals need a Schengen visa to enter any of the 27 Schengen Area countries. Applications are submitted through the embassy of the country you'll spend the most time in — typically Germany, France, or Italy from Accra. Requirements include: valid Ghana passport, travel insurance (min €30,000 coverage), 3 months bank statements, employment letter, confirmed flight and hotel bookings. Processing takes 15–20 working days.",
    href: "/visa/ghana/germany",
    linkLabel: "Schengen Visa Guide for Ghanaians →",
  },
  {
    icon: "🇺🇸",
    heading: "USA B1/B2 Visa for Ghanaian Passport Holders",
    body: "The USA B1/B2 tourist and business visa requires a mandatory interview at the US Embassy in Accra. Current interview wait times vary from 2–8 months. Key documents: DS-160 form, valid Ghana passport, 6 months bank statements (minimum $3,000 average), employment letter or business proof, property ownership documents, and family ties in Ghana to demonstrate non-immigrant intent.",
    href: "/visa/ghana/united-states",
    linkLabel: "USA Visa Guide for Ghanaians →",
  },
  {
    icon: "🇬🇧",
    heading: "UK Standard Visitor Visa from Ghana — 2026 Requirements",
    body: "Ghanaians apply for the UK Standard Visitor Visa through VFS Global Ghana in Accra. Processing takes 3–4 weeks standard, or 3–5 working days with Priority Service. Key documents: 6 months bank statements, employer letter/NOC, hotel and flight bookings, and a strong cover letter explaining your ties to Ghana. UK visa refusal rates for Ghanaians are significant — professional document preparation is critical.",
    href: "/visa/ghana/united-kingdom",
    linkLabel: "UK Visa Guide for Ghanaians →",
  },
  {
    icon: "🍁",
    heading: "Canada Visitor Visa (TRV) for Ghanaian Nationals",
    body: "Canada Visitor Visa applications from Ghana are submitted online through IRCC. Biometrics are required in Accra. Processing takes 6–12 weeks from Ghana. IRCC focuses heavily on ties-to-Ghana documentation for Ghanaian applicants — property, employment stability, family responsibilities, and financial self-sufficiency are key approval factors. Bank statements showing consistent income over 6 months are essential.",
    href: "/visa/ghana/canada",
    linkLabel: "Canada Visa Guide for Ghanaians →",
  },
  {
    icon: "🇦🇺",
    heading: "Australia Visitor Visa for Ghanaians — Subclass 600",
    body: "The Australian Subclass 600 tourist stream is applied online through the Department of Home Affairs. Ghanaian nationals typically see processing times of 3–6 weeks. Key requirements: valid Ghana passport, genuine temporary entrant (GTE) statement, strong bank statements (6 months, AUD 5,000+), employment or business proof, accommodation and itinerary details. Offshore applications from Ghana are assessed based on compelling ties to return home.",
    href: "/visa/ghana/australia",
    linkLabel: "Australia Visa Guide for Ghanaians →",
  },
  {
    icon: "🇯🇵",
    heading: "Japan Tourist Visa for Ghanaian Passport Holders",
    body: "Japan tourist visas for Ghanaians are processed through the Embassy of Japan in Accra. Processing is typically 5–7 working days — one of the fastest among major destination countries. Required documents include: valid Ghana passport, bank statements (3 months, GHS equivalent of JPY 300,000+), confirmed itinerary, hotel bookings, invitation letter (if applicable), and employer/business proof. Japan does not require an interview for Ghanaian applicants.",
    href: "/visa/ghana/japan",
    linkLabel: "Japan Visa Guide for Ghanaians →",
  },
];

const STATS = [
  { val: "50,000+", label: "Visas Processed" },
  { val: "98%",     label: "Approval Rate" },
  { val: "200+",    label: "Countries Covered" },
  { val: "24hr",    label: "Document Review" },
  { val: "2026",    label: "Updated Protocols" },
];

// Internal links — all Ghana visa-related routes
const INTERNAL_LINKS_VISA_TYPES = [
  { label: "Tourist Visa for Ghanaians",  href: "/visa/tourist-visa/ghana" },
  { label: "Business Visa from Ghana",    href: "/visa/business-visa/ghana-to-united-states" },
  { label: "Student Visa for Ghanaians",  href: "/visa/student-visa/ghana" },
  { label: "Work Visa from Ghana",        href: "/visa/work-visa/ghana-to-united-kingdom" },
  { label: "e-Visa for Ghanaians",        href: "/visa/e-visa/ghana" },
  { label: "Transit Visa for Ghanaians",  href: "/visa/transit-visa/ghana-transit-at-united-kingdom" },
  { label: "Schengen Visa from Ghana",    href: "/schengen-visa" },
  { label: "Ghana to Canada Visa",        href: "/visa/ghana/canada" },
  { label: "Ghana to USA Visa",           href: "/visa/ghana/united-states" },
  { label: "Ghana to UK Visa",            href: "/visa/ghana/united-kingdom" },
  { label: "Ghana to Germany Visa",       href: "/visa/ghana/germany" },
  { label: "Ghana to Japan Visa",         href: "/visa/ghana/japan" },
  { label: "Ghana to Australia Visa",     href: "/visa/ghana/australia" },
  { label: "Ghana to UAE Visa",           href: "/visa/ghana/united-arab-emirates" },
  { label: "Ghana to France Visa",        href: "/visa/ghana/france" },
  { label: "Ghana to Singapore Visa",     href: "/visa/ghana/singapore" },
  { label: "Ghana to South Korea Visa",   href: "/visa/ghana/south-korea" },
  { label: "Ghana to Italy Visa",         href: "/visa/ghana/italy" },
  { label: "Ghana to Spain Visa",         href: "/visa/ghana/spain" },
  { label: "Ghana to Netherlands Visa",   href: "/visa/ghana/netherlands" },
];

const INTERNAL_LINKS_RESOURCES = [
  { label: "Visa Processing Time Tracker", href: "/visa-processing-time-tracker" },
  { label: "Ghana Visa Rejection Rates",   href: "/visa-rejection/ghana-visa-rejection-rate-for-united-states?type=tourist" },
  { label: "Visa Checklist for Ghanaians", href: "/visa-resources/visa-checklist" },
  { label: "Visa Document Generator",      href: "/visa-resources/visa-document-generator" },
  { label: "Scholarships for Ghanaians",   href: "/scholarships/ghana" },
  { label: "Visa News & Updates",          href: "/visa-news" },
  { label: "All Visa Resources",           href: "/visa-resources" },
  { label: "Visa API",                     href: "/visa-api" },
];

const FAQS = [
  {
    q: "Which countries can Ghanaian passport holders visit without a visa in 2026?",
    a: "Ghanaian passport holders enjoy visa-free or visa-on-arrival access to approximately 60–65 countries in 2026 — one of the stronger West African passports. These include Kenya (eTA), Malaysia (30 days), Singapore (30 days), Seychelles, Maldives, Cape Verde, Barbados, Trinidad & Tobago, Haiti, and most ECOWAS nations. Use our country search above to check exact requirements for any specific destination.",
  },
  {
    q: "What bank balance is required for a tourist visa as a Ghanaian national?",
    a: "Requirements vary by destination. USA B1/B2: minimum USD 3,000 average over 6 months. UK Standard Visitor: minimum GBP 2,000. Schengen: minimum EUR 3,000. Canada TRV: minimum CAD 5,000. Australia: minimum AUD 5,000. Bank statements must be in your name and show consistent, legitimate income — not sudden large deposits. Our team formats these statements to embassy standards.",
  },
  {
    q: "How long does USA visa processing take for Ghanaians from Accra?",
    a: "US Embassy Accra B1/B2 visa interview wait times currently range from 2–8 months depending on the appointment calendar. After your interview, visa processing takes 3–5 working days. Total timeline from application to receiving your passport: 2–9 months. Always check the current wait time on the US Embassy Ghana website and apply as early as possible.",
  },
  {
    q: "Can Ghanaians living in Dubai apply for international visas from the UAE?",
    a: "Yes. Ghanaian nationals with a valid UAE residence visa can apply for third-country visas (USA, UK, Schengen, Canada, Japan) from Dubai. Most embassies in Dubai accept applications from Ghanaian UAE residents. Requirements are similar to applying from Ghana, but some embassies may also require UAE residency proof and UAE salary/bank statements in addition to Ghanaian documents. Our Dubai team specialises in this.",
  },
  {
    q: "What is the UK visa refusal rate for Ghanaian nationals?",
    a: "The UK Home Office publishes visa statistics showing Ghana has one of the higher refusal rates among West African nations — approximately 25–40% depending on the year. The most common reasons for refusal are: insufficient financial evidence, weak ties to Ghana, unclear purpose of visit, and immigration history concerns. Professional document preparation and a well-written cover letter significantly improve approval chances.",
  },
  {
    q: "How do I apply for a Japan tourist visa from Ghana?",
    a: "Japan tourist visa applications for Ghanaian nationals are submitted at the Embassy of Japan in Accra. Processing takes 5–7 working days — no interview required. Core documents: valid Ghana passport, 3 months bank statements, employment letter with leave approval, confirmed flight and hotel bookings, detailed itinerary, and a cover letter. Japan visa for Ghanaians has one of the highest approval rates among major destinations when documents are correctly prepared.",
  },
  {
    q: "Is travel insurance mandatory for a Schengen visa from Ghana?",
    a: "Yes. Travel insurance is a mandatory requirement for all Schengen visa applications from Ghana. The insurance must provide minimum coverage of €30,000, be valid across all Schengen Area countries, and cover the entire duration of your stay. The policy must be purchased before submitting your application and must include medical evacuation cover. We recommend providers like Allianz, AXA, or Europ Assistance accepted by all Schengen embassies.",
  },
  {
    q: "What is the processing time for Canada Visitor Visa for Ghanaian applicants?",
    a: "Canada Visitor Visa (TRV) from Ghana currently takes 6–12 weeks through IRCC's online portal. Biometrics must be enrolled in person at a VFS Global or IRCC-designated centre in Accra. IRCC processes applications from Ghana with particular attention to ties-to-home documentation — employment stability, property ownership, family in Ghana, and financial self-sufficiency are all critical factors for Ghanaian applicants.",
  },
];

const alphabet = ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function TouristVisaGhanaianNationals() {
  const [searchTerm,      setSearchTerm]      = useState("");
  const [suggestions,     setSuggestions]     = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedLetter,  setSelectedLetter]  = useState("All");
  const [currentPage,     setCurrentPage]     = useState(1);
  const [currentSlide,    setCurrentSlide]    = useState(0);
  const [countries,       setCountries]       = useState([]);
  const [isLoaded,        setIsLoaded]        = useState(false);
  const searchRef    = useRef(null);
  const itemsPerPage = 12;

  const slides = [
    { img: "/the-love-island.webp",               tag: "Island Getaways",  title: "Explore Paradise" },
    { img: "/top-travel-agency.webp",             tag: "Trusted Agency",   title: "Expert Guidance" },
    { img: "/travel_banner_second_part_one.webp", tag: "200+ Countries",   title: "Your World Awaits" },
  ];

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [slides.length]);

  useEffect(() => {
    fetch("/api/countries")
      .then(r => r.json())
      .then(data => { setCountries(data); setIsLoaded(true); })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 1) {
      const filtered = countries
        .filter(c => c.country?.toLowerCase().startsWith(searchTerm.toLowerCase()))
        .slice(0, 8);
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchTerm, countries]);

  useEffect(() => {
    const handler = e => {
      if (searchRef.current && !searchRef.current.contains(e.target))
        setShowSuggestions(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredCountries = countries.filter(c => {
    const matchLetter = selectedLetter === "All" || c.country?.[0]?.toUpperCase() === selectedLetter;
    const matchSearch = c.country?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchLetter && matchSearch;
  });

  const totalPages   = Math.ceil(filteredCountries.length / itemsPerPage);
  const currentItems = filteredCountries.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleSuggestionClick = country => {
    setSearchTerm(country.country);
    setShowSuggestions(false);
    setCurrentPage(1);
    setSelectedLetter("All");
  };

  const resetFilters = () => { setSelectedLetter("All"); setSearchTerm(""); setCurrentPage(1); };

  return (
    <div className="min-h-screen bg-white text-black" style={{ fontFamily: "'Plus Jakarta Sans','DM Sans',system-ui,sans-serif" }}>

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ minHeight: "580px" }}>
        {slides.map((slide, i) => (
          <div key={i} className={`absolute inset-0 ${i === currentSlide ? "opacity-100" : "opacity-0"}`} style={{ transition: "opacity 1.5s ease" }}>
            <img src={slide.img} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom,rgba(255,255,255,0.75) 0%,rgba(255,255,255,0.45) 50%,rgba(255,255,255,0.97) 100%)" }} />
          </div>
        ))}

        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.15) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.15) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrentSlide(i)} aria-label={`Slide ${i + 1}`}
              className={`rounded-full transition-all duration-500 ${i === currentSlide ? "w-8 h-2.5 bg-[#f5c800]" : "w-2.5 h-2.5 bg-black/20 hover:bg-black/40"}`} />
          ))}
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 text-center pt-10 pb-20">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex justify-center gap-2 text-[10px] text-black/40 mb-6 uppercase tracking-widest font-bold">
            <Link href="/" className="hover:text-[#f5c800] transition">Home</Link>
            <span>/</span>
            <Link href="/visa" className="hover:text-[#f5c800] transition">Visa</Link>
            <span>/</span>
            <span className="text-[#f5c800]">Ghana Nationals</span>
          </nav>

          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 mb-7 rounded-full bg-white border border-black/10 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#f5c800] animate-pulse" />
            <span className="text-xs font-bold text-black/80 tracking-widest uppercase">200+ Countries · 98% Approval · Ghana Passport Specialists</span>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-[52px] font-black leading-[0.95] tracking-tight mb-5 text-black">
            Visa for <span className="text-[#f5c800]">Ghanaian Nationals</span> 2026 —<br />
            <span className="text-black/30">USA, UK, Canada, Schengen & More</span>
          </h1>

          <p className="text-black/60 text-base md:text-lg max-w-2xl mx-auto mb-3 leading-relaxed">
            Expert visa consultancy for Ghana passport holders.{" "}
            <strong className="text-black">Embassy-accurate documentation</strong> for{" "}
            <Link href="/visa/ghana/united-states" className="text-black font-bold hover:text-[#f5c800] transition">USA B1/B2</Link>,{" "}
            <Link href="/visa/ghana/united-kingdom" className="text-black font-bold hover:text-[#f5c800] transition">UK Standard Visitor</Link>,{" "}
            <Link href="/visa/ghana/canada" className="text-black font-bold hover:text-[#f5c800] transition">Canada TRV</Link>,{" "}
            <Link href="/visa/ghana/germany" className="text-black font-bold hover:text-[#f5c800] transition">Schengen</Link>,{" "}
            <Link href="/visa/ghana/japan" className="text-black font-bold hover:text-[#f5c800] transition">Japan</Link>,{" "}
            and 200+ countries.
          </p>
          <p className="text-black/40 text-sm max-w-xl mx-auto mb-10">
            Serving Ghanaians in Accra, Kumasi, Dubai, and Dhaka. Call{" "}
            <a href="tel:+971507078334" className="text-[#f5c800] font-bold hover:underline">+971 50 707 8334</a>
          </p>

          {/* ── SEARCH CARD ── */}
          <div className="bg-white rounded-3xl p-6 md:p-8 max-w-3xl mx-auto border border-black/5 shadow-2xl mb-4">

            <div ref={searchRef} className="relative mb-5">
              <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#f5c800] z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="search"
                placeholder="Search destination — USA, UK, Germany, Japan, Canada..."
                className="w-full pl-14 pr-12 py-5 rounded-2xl text-base font-semibold outline-none transition-all shadow-inner"
                style={{ background: "#f8f8f8", border: "1.5px solid rgba(0,0,0,0.05)", color: "black" }}
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); setSelectedLetter("All"); }}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                onKeyDown={e => {
                  if (e.key === "Escape") setShowSuggestions(false);
                  if (e.key === "Enter" && suggestions.length > 0) handleSuggestionClick(suggestions[0]);
                }}
                autoComplete="off"
                aria-label="Search visa destination country for Ghanaian passport holders"
              />
              {searchTerm && (
                <button onClick={() => { setSearchTerm(""); setSelectedLetter("All"); setCurrentPage(1); setSuggestions([]); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full text-black/30 hover:text-black hover:bg-black/5 transition text-lg font-bold" aria-label="Clear search">✕</button>
              )}

              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl overflow-hidden z-50 shadow-2xl bg-white border border-[#f5c800]/30">
                  <div className="p-2">
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/30 px-3 py-2">🔍 {suggestions.length} destinations found for Ghanaian nationals</p>
                    {suggestions.map((c, i) => (
                      <Link key={i} href={`/visa/ghana/${createSlug(c.country)}`} onClick={() => handleSuggestionClick(c)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-all cursor-pointer">
                        {c.flag && <img src={c.flag} alt={`${c.country} visa for Ghanaians`} className="w-8 object-cover rounded shadow-sm" style={{ height: "22px" }} />}
                        <div className="text-left flex-1">
                          <p className="font-bold text-black text-sm">{c.country}</p>
                          <p className="text-[11px] text-black/40">{c.country} Visa — Ghana Passport Requirements & Documents 2026</p>
                        </div>
                        <span className="text-[#f5c800] text-xs font-black">View →</span>
                      </Link>
                    ))}
                    <div className="border-t border-black/5 mt-2 pt-2 px-3 pb-1">
                      <p className="text-[10px] text-black/25 font-medium">Press Enter to go to top result · Esc to close</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* A-Z */}
            <div className="flex flex-wrap justify-center gap-1.5 mb-5">
              {alphabet.map(l => (
                <button key={l} onClick={() => { setSelectedLetter(l); setCurrentPage(1); setShowSuggestions(false); }}
                  aria-label={`Filter by ${l}`}
                  className={`w-8 h-8 md:w-9 md:h-9 rounded-xl text-xs font-black transition-all ${selectedLetter === l ? "bg-[#f5c800] text-black shadow-md scale-110" : "text-black/40 hover:text-black bg-gray-100 hover:bg-gray-200"}`}
                >{l}</button>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-black/40 font-bold px-1">
              <span>{filteredCountries.length} visa destinations available for Ghanaian passport holders</span>
              <span>2026 Embassy-Verified</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 text-xs font-bold text-black/50">
            {["✅ 98% Approval Rate", "📋 Embassy-Verified Docs", "⚡ 24hr Document Review", "🌍 200+ Countries", "🔒 100% Confidential"].map(b => (
              <span key={b} className="bg-white/80 border border-black/5 px-3 py-1.5 rounded-full">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          STATS
      ══════════════════════════════════════════════════════════ */}
      <section style={{ background: "#f5c800" }} className="py-5 shadow-sm" aria-label="Visa Express Hub statistics">
        <div className="max-w-6xl mx-auto px-5">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl md:text-3xl font-black text-black">{s.val}</p>
                <p className="text-xs font-bold text-black/60 uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          VISA CATEGORIES
      ══════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-5 py-16" aria-labelledby="categories-heading">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#f5c800] text-xs font-black uppercase tracking-widest mb-2">All Visa Types</p>
            <h2 id="categories-heading" className="text-3xl md:text-4xl font-black text-black">Visa Services for Ghanaian Passport Holders</h2>
            <p className="text-black/40 text-sm mt-2 max-w-xl">Every visa type handled by our Ghana passport specialists — tourist, business, student, work, transit and e-visa for 200+ countries.</p>
          </div>
          <Link href="/visa/ghana" className="hidden md:block text-xs font-bold text-black/40 hover:text-[#f5c800] transition border border-black/10 px-4 py-2 rounded-xl hover:border-[#f5c800]/40">
            All visa types →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {VISA_CATEGORIES.map((cat, i) => (
            <Link key={i} href={cat.href}
              className="group flex items-start gap-4 p-5 rounded-2xl border border-black/5 bg-gray-50 hover:bg-white hover:shadow-lg hover:border-[#f5c800]/30 transition-all duration-300"
              title={cat.label}>
              <span className="text-3xl flex-shrink-0">{cat.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h3 className="font-black text-black text-sm group-hover:text-[#d4a800] transition">{cat.label}</h3>
                  <span className="text-[9px] font-black text-[#f5c800] bg-[#f5c800]/10 rounded-full px-2 py-0.5">{cat.badge}</span>
                </div>
                <p className="text-xs text-black/40 leading-relaxed">{cat.desc}</p>
              </div>
              <span className="text-[#f5c800] font-black text-sm opacity-0 group-hover:opacity-100 transition flex-shrink-0">→</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          QUICK REQUIREMENTS TABLE
      ══════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-5 pb-16" aria-labelledby="requirements-heading">
        <div className="mb-8">
          <p className="text-[#f5c800] text-xs font-black uppercase tracking-widest mb-2">At a Glance</p>
          <h2 id="requirements-heading" className="text-2xl md:text-3xl font-black text-black">Key Requirements by Destination — Ghanaian Nationals</h2>
          <p className="text-black/40 text-sm mt-1">Processing time, minimum bank balance, and key documents for the top 4 destinations for Ghanaian passport holders.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {VISA_REQUIREMENTS.map((v, i) => (
            <Link key={i} href={v.href}
              className="group p-5 rounded-2xl border border-black/5 bg-white hover:border-[#f5c800]/40 hover:shadow-lg transition-all duration-300 flex flex-col"
              title={`${v.country} visa requirements for Ghanaian nationals`}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{v.flag}</span>
                <span className="font-black text-black text-sm group-hover:text-[#d4a800] transition">{v.country}</span>
              </div>
              <div className="space-y-2 mb-4 flex-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-black/40 font-bold">Processing</span>
                  <span className="font-black text-black/70">{v.processing}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-black/40 font-bold">Min. Bank Balance</span>
                  <span className="font-black text-orange-500">{v.bankBalance}</span>
                </div>
              </div>
              <ul className="space-y-1 border-t border-black/5 pt-3">
                {v.keyDocs.slice(0, 3).map((doc, j) => (
                  <li key={j} className="flex items-start gap-1.5 text-[10px] text-black/40">
                    <span className="text-[#f5c800] font-black mt-0.5">✓</span>{doc}
                  </li>
                ))}
              </ul>
              <div className="mt-3 text-[10px] font-black text-[#f5c800] group-hover:underline">Full requirements guide →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          POPULAR QUICK LINKS
      ══════════════════════════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-5 pb-8" aria-label="Popular visa destinations for Ghanaian nationals">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs font-black uppercase tracking-widest text-black/30">🔥 Most Applied by Ghanaians:</span>
          {POPULAR.map(({ name, emoji, tag }) => {
            const c = countries.find(x => x.country === name);
            return (
              <Link key={name} href={`/visa/ghana/${createSlug(name)}`}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-black/60 hover:text-black border border-black/5 hover:border-[#f5c800]/40 transition-all bg-gray-50 hover:bg-white shadow-sm"
                title={`${name} visa for Ghanaian nationals`}>
                {c?.flag ? <img src={c.flag} className="w-5 object-cover rounded-sm" style={{ height: "14px" }} alt="" /> : <span>{emoji}</span>}
                <span>{name}</span>
                <span className="text-[9px] text-[#f5c800] font-black">{tag}</span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          COUNTRIES GRID
      ══════════════════════════════════════════════════════════ */}
      <main className="max-w-6xl mx-auto px-5 pb-20" id="all-countries" aria-labelledby="grid-heading">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 id="grid-heading" className="text-2xl md:text-3xl font-black text-black">
              {selectedLetter === "All" && !searchTerm
                ? "All Visa Destinations — Ghanaian Nationals 2026"
                : searchTerm ? `Results for "${searchTerm}"`
                : `Countries Starting with "${selectedLetter}"`}
            </h2>
            <p className="text-black/30 text-sm mt-1">{filteredCountries.length} destinations · Full visa requirements for Ghanaian passport holders</p>
          </div>
          {(selectedLetter !== "All" || searchTerm) && (
            <button onClick={resetFilters} className="text-xs font-bold text-[#f5c800] border border-[#f5c800]/30 px-4 py-2 rounded-xl hover:bg-[#f5c800]/5 transition">Show All</button>
          )}
        </div>

        {!isLoaded ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-black/5 animate-pulse bg-gray-100">
                <div className="h-28 bg-gray-200" />
                <div className="p-3"><div className="h-3 bg-gray-200 rounded mb-2" /><div className="h-6 bg-gray-200 rounded" /></div>
              </div>
            ))}
          </div>
        ) : currentItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {currentItems.map((c, i) => (
              <Link key={`${c.country}-${i}`} href={`/visa/ghana/${createSlug(c.country)}`}
                className="group rounded-2xl overflow-hidden border border-black/5 flex flex-col bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300"
                title={`${c.country} Tourist Visa — Ghanaian Passport Requirements 2026`}>
                <div className="relative h-28 overflow-hidden bg-gray-200">
                  <img src={c.flag} alt={`${c.country} visa requirements for Ghanaian nationals 2026`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(0,0,0,0.2) 0%,transparent 60%)" }} />
                </div>
                <div className="p-3 flex flex-col flex-1 justify-between">
                  <h3 className="text-sm font-black text-black/80 leading-tight group-hover:text-black transition-colors mb-2">{c.country}</h3>
                  <div className="text-[10px] font-bold text-[#f5c800] bg-[#f5c800]/5 rounded-lg px-2 py-1 text-center group-hover:bg-[#f5c800] group-hover:text-black transition-all">
                    Ghana Passport Guide →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 rounded-3xl border border-black/5 bg-gray-50">
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="text-xl font-black text-black">No destinations found</h3>
            <p className="text-black/40 mt-2 text-sm">Try a different search term or browse by letter above.</p>
            <button onClick={resetFilters} className="mt-5 px-6 py-3 bg-[#f5c800] rounded-xl font-black text-sm">Show All Countries</button>
          </div>
        )}

        {totalPages > 1 && (
          <nav className="mt-12 flex justify-center items-center gap-3" aria-label="Country pages">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}
              className="px-6 py-3 rounded-xl font-bold text-black/60 disabled:opacity-30 disabled:pointer-events-none hover:text-black transition border border-black/10 hover:border-[#f5c800]/40">← Prev</button>
            <div className="flex gap-1.5">
              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(n => (
                <button key={n} onClick={() => setCurrentPage(n)} aria-label={`Page ${n}`} aria-current={currentPage === n ? "page" : undefined}
                  className={`w-10 h-10 rounded-xl font-black text-sm transition-all ${currentPage === n ? "bg-[#f5c800] text-black shadow-md" : "text-black/40 hover:text-black bg-gray-50 border border-black/5"}`}>{n}</button>
              ))}
              {totalPages > 7 && <span className="w-10 h-10 flex items-center justify-center text-black/30">…</span>}
            </div>
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}
              className="px-6 py-3 rounded-xl font-bold text-black/60 disabled:opacity-30 disabled:pointer-events-none hover:text-black transition border border-black/10 hover:border-[#f5c800]/40">Next →</button>
          </nav>
        )}
      </main>

      {/* ══════════════════════════════════════════════════════════
          WHY CHOOSE US
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-black/5 py-24 bg-gray-50" aria-labelledby="why-heading">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <p className="text-[#f5c800] text-xs font-black uppercase tracking-widest mb-3">Why Thousands of Ghanaians Trust Us</p>
            <h2 id="why-heading" className="text-4xl md:text-5xl font-black text-black mb-4">Ghana's Most Trusted Visa Consultancy</h2>
            <p className="text-black/40 max-w-xl mx-auto text-sm leading-relaxed">We don't just tell you what documents you need — we verify them, format them, and ensure your Ghanaian passport application is embassy-ready first time.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {WHY_US.map((w, i) => (
              <div key={i} className="p-7 rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="text-4xl mb-4">{w.icon}</div>
                <h3 className="font-black text-black text-lg mb-2">{w.title}</h3>
                <p className="text-sm text-black/40 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 max-w-6xl mx-auto px-5" aria-labelledby="testimonials-heading">
        <div className="text-center mb-12">
          <p className="text-[#f5c800] text-xs font-black uppercase tracking-widest mb-3">Real Stories</p>
          <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-black text-black">Approved — Ghanaian Passport Holders</h2>
          <p className="text-black/40 text-sm mt-2">Real approvals from Ghanaian nationals who applied through Visa Express Hub</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="p-7 rounded-2xl border border-black/5 bg-white shadow-sm hover:shadow-lg transition-all duration-300">
              <div className="flex gap-1 mb-4">{"★".repeat(t.stars).split("").map((s, j) => <span key={j} className="text-[#f5c800] text-sm">{s}</span>)}</div>
              <p className="text-black/70 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
              <div>
                <p className="font-black text-black text-sm">{t.name}</p>
                <p className="text-xs text-[#f5c800] font-bold">{t.country}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          DESTINATION-SPECIFIC GUIDES (SEO LINKS)
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-black/5 py-20 bg-gray-50" aria-labelledby="guides-heading">
        <div className="max-w-6xl mx-auto px-5">
          <h2 id="guides-heading" className="text-2xl md:text-3xl font-black text-black mb-2">
            Visa Guides by Destination — Ghanaian Nationals 2026
          </h2>
          <p className="text-black/40 text-sm mb-10 max-w-2xl">
            Country-specific visa requirements, documents, bank balance, fees and expert tips for Ghana passport holders — verified against official embassy sources.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {SEO_LINKS.map((link, i) => (
              <Link key={i} href={`/visa/ghana/${link.slug}`}
                className="flex items-start gap-3 p-4 rounded-xl border border-black/5 bg-white hover:border-[#f5c800]/30 hover:shadow-md transition-all group"
                title={`${link.name} — Complete guide for Ghanaian passport holders 2026`}>
                <span className="text-[#f5c800] font-black text-lg mt-0.5 flex-shrink-0">→</span>
                <div>
                  <p className="font-bold text-black/80 text-sm group-hover:text-black transition">{link.name}</p>
                  <p className="text-xs text-black/35 mt-0.5">{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SEO ARTICLES — 6 destination deep-dives
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-black/5 py-20" aria-labelledby="articles-heading">
        <div className="max-w-6xl mx-auto px-5">
          <h2 id="articles-heading" className="text-2xl md:text-3xl font-black text-black mb-2">
            Detailed Visa Guides for Ghanaian Nationals
          </h2>
          <p className="text-black/40 text-sm mb-10 max-w-2xl">
            In-depth requirements, processing times, and expert tips for the most popular visa destinations for Ghana passport holders in 2026.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {SEO_ARTICLES.map((a, i) => (
              <div key={i} className="bg-white border border-black/5 rounded-2xl p-6 hover:shadow-lg hover:border-[#f5c800]/20 transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{a.icon}</span>
                  <h3 className="font-black text-black text-base">{a.heading}</h3>
                </div>
                <p className="text-sm text-black/50 leading-relaxed mb-4">{a.body}</p>
                <Link href={a.href} className="text-xs font-black text-[#f5c800] hover:underline">{a.linkLabel}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-black/5 py-20 bg-gray-50" aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-5">
          <h2 id="faq-heading" className="text-2xl md:text-3xl font-black text-black mb-2 text-center">
            Frequently Asked Questions — Visa for Ghanaian Nationals
          </h2>
          <p className="text-black/40 text-sm text-center mb-10">Common questions from Ghanaian passport holders applying for international visas in 2026.</p>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details key={i} className="border border-black/5 rounded-2xl overflow-hidden group bg-white">
                <summary className="px-5 py-4 cursor-pointer font-bold text-black/80 text-sm flex items-center justify-between list-none hover:bg-gray-50">
                  {faq.q}
                  <span className="text-[#f5c800] font-black group-open:rotate-45 transition-transform inline-block flex-shrink-0 ml-3">+</span>
                </summary>
                <div className="px-5 pb-5 pt-2 text-sm text-black/50 leading-relaxed">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          INTERNAL LINKS FOOTER — full site coverage
      ══════════════════════════════════════════════════════════ */}
      <section className="border-t border-black/5 py-16 bg-white" aria-label="Related visa pages">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid md:grid-cols-2 gap-10">

            <div>
              <p className="text-xs text-black/25 font-black uppercase tracking-widest mb-5">Visa Guides for Ghanaians by Destination</p>
              <div className="flex flex-wrap gap-2">
                {INTERNAL_LINKS_VISA_TYPES.map(l => (
                  <Link key={l.label} href={l.href}
                    className="text-xs font-bold text-black/40 hover:text-[#f5c800] transition border border-black/8 px-3 py-1.5 rounded-lg hover:border-[#f5c800]/30 bg-gray-50">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs text-black/25 font-black uppercase tracking-widest mb-5">Visa Tools & Resources</p>
              <div className="flex flex-wrap gap-2">
                {INTERNAL_LINKS_RESOURCES.map(l => (
                  <Link key={l.label} href={l.href}
                    className="text-xs font-bold text-black/40 hover:text-[#f5c800] transition border border-black/8 px-3 py-1.5 rounded-lg hover:border-[#f5c800]/30 bg-gray-50">
                    {l.label}
                  </Link>
                ))}
              </div>

              <p className="text-xs text-black/25 font-black uppercase tracking-widest mb-5 mt-8">Other Country Visa Hubs</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Nigeria Visa Hub",     href: "/visa/nigeria" },
                  { label: "India Visa Hub",       href: "/visa/india" },
                  { label: "Bangladesh Visa Hub",  href: "/visa/bangladesh-to-canada" },
                  { label: "Dubai Residents Visa", href: "/visa/dubai-residents" },
                  { label: "All Tourist Visas",    href: "/visa/tourist-visa" },
                  { label: "All Work Visas",       href: "/visa/work-visa" },
                  { label: "All Student Visas",    href: "/visa/student-visa" },
                  { label: "All e-Visas",          href: "/visa/e-visa" },
                ].map(l => (
                  <Link key={l.label} href={l.href}
                    className="text-xs font-bold text-black/40 hover:text-[#f5c800] transition border border-black/8 px-3 py-1.5 rounded-lg hover:border-[#f5c800]/30 bg-gray-50">
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════ */}
      <div className="py-20 px-5 text-center" style={{ background: "#111111" }}>
        <div className="max-w-2xl mx-auto">
          <div className="text-6xl mb-6">✈️</div>
          <h2 className="text-3xl md:text-4xl font-black mb-3 text-white">
            Ready to Apply? <span style={{ color: "#f5c800" }}>Let's Get Your Visa Approved.</span>
          </h2>
          <p className="mb-10 leading-relaxed text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,.45)" }}>
            Our Ghana passport specialists prepare your complete visa application — documents, cover letter, financial file — to the exact standard each embassy requires. 98% approval rate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/971507078334?text=Hi%2C%20I%20am%20a%20Ghanaian%20national%20and%20I%20need%20help%20with%20a%20visa%20application."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl font-black text-sm text-white transition"
              style={{ background: "#25D366" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
              WhatsApp — Ghana Passport Help
            </a>
            <Link href="/visa/ghana"
              className="inline-flex items-center justify-center px-8 py-5 rounded-2xl font-black text-sm transition hover:bg-white hover:text-black"
              style={{ border: "2px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.6)" }}>
              Browse All Ghana Visa Guides
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}