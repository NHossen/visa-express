"use client";
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const bottomSlides = [

  // ── VISA GUIDES ──────────────────────────────────────────────────────────
  {
    id: 0,
    category: "visa",
    title: "CANADA VISA",
    type: "Visitor / Student / Work",
    validity: "Up to 10 Years",
    processingTime: "15–30 Working Days",
    price: "Free Guide",
    img: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=800&auto=format&fit=crop&q=80",
    alt: "Canada Visa Requirements & Application Guide",
    link: "/visa/tourist-visa/canada",
  },
  {
    id: 1,
    category: "visa",
    title: "SCHENGEN VISA",
    type: "Short Stay – 26 Countries",
    validity: "30 to 90 Days",
    processingTime: "15–30 Working Days",
    price: "Free Guide",
    img: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&auto=format&fit=crop&q=80",
    alt: "Schengen Visa Requirements for Bangladesh",
    link: "/visa/tourist-visa/european-union",
  },
  {
    id: 2,
    category: "visa",
    title: "UK VISA",
    type: "Visitor / Student / Work",
    validity: "Up to 10 Years",
    processingTime: "3 Weeks",
    price: "Free Guide",
    img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format&fit=crop&q=80",
    alt: "UK Visa Requirements and Application Guide",
    link: "/visa/tourist-visa/united-kingdom",
  },
  {
    id: 3,
    category: "visa",
    title: "USA VISA",
    type: "B1/B2 / F1 / H1B",
    validity: "Up to 10 Years",
    processingTime: "3–5 Weeks",
    price: "Free Guide",
    img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&auto=format&fit=crop&q=80",
    alt: "USA Visa Requirements for Bangladesh Nationals",
    link: "/visa/tourist-visa/united-states",
  },
  {
    id: 4,
    category: "visa",
    title: "AUSTRALIA VISA",
    type: "Tourist / Student / PR",
    validity: "Up to 12 Months",
    processingTime: "4–6 Weeks",
    price: "Free Guide",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop&q=80",
    alt: "Australia Visa Requirements and Application Steps",
    link: "/visa/tourist-visa/australia",
  },
  {
    id: 5,
    category: "visa",
    title: "DUBAI (UAE) VISA",
    type: "Tourist / Work / Transit",
    validity: "14 to 90 Days",
    processingTime: "3–5 Working Days",
    price: "Free Guide",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop&q=80",
    alt: "Dubai UAE Visa Requirements for Bangladesh",
    link: "/visa/tourist-visa/united-arab-emirates",
  },
 
  // ── PROCESSING TIME ───────────────────────────────────────────────────────
  {
    id: 6,
    category: "tour",
    title: "CANADA PROCESSING TIME",
    duration: "15 – 30 Working Days",
    includes: "Tourist · Student · Work Visa",
    price: "Track Now →",
    img: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&auto=format&fit=crop&q=80",
    alt: "Canada Visa Processing Time for Bangladesh",
    link: "/visa-processing-time/canada/for/bangladesh",
  },
  {
    id: 7,
    category: "tour",
    title: "UK PROCESSING TIME",
    duration: "3 Weeks Average",
    includes: "Visitor · Student · Work Visa",
    price: "Track Now →",
    img: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?w=800&auto=format&fit=crop&q=80",
    alt: "UK Visa Processing Time for Bangladesh",
    link: "/visa-processing-time/uk/for/bangladesh",
  },
  {
    id: 8,
    category: "tour",
    title: "SCHENGEN PROCESSING",
    duration: "15 Days Average",
    includes: "All 26 Schengen Countries",
    price: "Track Now →",
    img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800&auto=format&fit=crop&q=80",
    alt: "Schengen Visa Processing Time",
    link: "/visa-processing-time/schengen/for/bangladesh",
  },
  {
    id: 9,
    category: "tour",
    title: "USA PROCESSING TIME",
    duration: "3 – 5 Weeks",
    includes: "B1/B2 · F1 · H1B Visas",
    price: "Track Now →",
    img: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=800&auto=format&fit=crop&q=80",
    alt: "USA Visa Processing Time for Bangladesh Nationals",
    link: "/visa-processing-time/usa/for/bangladesh",
  },
 
  // ── FREE TOOLS & TEMPLATES ────────────────────────────────────────────────
  {
    id: 10,
    category: "offer",
    title: "FREE SOP TEMPLATE",
    promo: "Download Instantly",
    validUntil: "Statement of Purpose – Ready to Use",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80",
    alt: "Free SOP Template Download for Visa Application",
    link: "/sop-template",
  },
  {
    id: 11,
    category: "offer",
    title: "FREE NOC TEMPLATE",
    promo: "No Registration Needed",
    validUntil: "No Objection Certificate – Editable",
    img: "https://images.unsplash.com/photo-1568219557405-376e23e4f7cf?w=800&auto=format&fit=crop&q=80",
    alt: "Free NOC Letter Template for Visa Application",
    link: "/noc-template",
  },
  {
    id: 12,
    category: "offer",
    title: "VISA REJECTION CHECKER",
    promo: "Find Out Why You Were Rejected",
    validUntil: "Free Tool – Instant Results",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=80",
    alt: "Visa Rejection Reason Checker Tool",
    link: "/visa-rejection",
  },
  {
    id: 13,
    category: "offer",
    title: "DOCUMENT CHECKLIST",
    promo: "Never Miss a Document",
    validUntil: "Country-Specific Checklists – Free",
    img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&auto=format&fit=crop&q=80",
    alt: "Visa Document Checklist for Every Country",
    link: "/visa-checklist",
  },
 
  // ── STUDENT VISA & SCHOLARSHIP ────────────────────────────────────────────
  {
    id: 14,
    category: "service",
    title: "STUDY IN CANADA",
    detail: "Student Visa + Scholarship Guide",
    note: "Processing · Requirements · SOP Help",
    img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80",
    alt: "Canada Student Visa Guide for Bangladesh Students",
    link: "/visa/student-visa/canada",
  },
  {
    id: 15,
    category: "service",
    title: "STUDY IN UK",
    detail: "Post-Study Work Permit Available",
    note: "Top Ranked Universities · Scholarship List",
    img: "https://images.unsplash.com/photo-1627894006066-b45d1a7e2b37?w=800&auto=format&fit=crop&q=80",
    alt: "UK Student Visa Guide and Scholarship Information",
    link: "/visa/student-visa/united-kingdom",
  },
  {
    id: 16,
    category: "service",
    title: "STUDY IN AUSTRALIA",
    detail: "Fully Funded Scholarships Available",
    note: "Student Visa · IELTS Requirement · SOP",
    img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80",
    alt: "Australia Student Visa Guide for Bangladesh",
    link: "/visa/student-visa/australia",
  },
  {
    id: 17,
    category: "service",
    title: "STUDY IN USA",
    detail: "70%+ Scholarship Opportunities",
    note: "F1 Visa · Admission · Interview Prep",
    img: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&auto=format&fit=crop&q=80",
    alt: "USA Student Visa and Scholarship Guide",
    link: "/visa/student-visa/united-states",
  },
];

export default function BottomCarousel() {
  const [bottomIndex, setBottomIndex] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setBottomIndex((prev) => (prev + 1) % bottomSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const container = bottomRef.current;
    if (container && container.children[bottomIndex]) {
      const activeItem = container.children[bottomIndex];
      container.scrollTo({ left: activeItem.offsetLeft - container.offsetLeft, behavior: "smooth" });
    }
  }, [bottomIndex]);

  return (
    <div className="bg-white py-10 px-4">
      <div className="max-w-7xl mx-auto relative">
        <div ref={bottomRef} className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 hide-scrollbar">
          {bottomSlides.map((slide, index) => (
            <motion.div
              key={index}
              className="group snap-center min-w-[90%] sm:min-w-[60%] md:min-w-[45%] lg:min-w-[32%] aspect-[3/1.3] rounded-xl overflow-hidden relative shadow-md bg-gray-100"
              whileHover={{ scale: 1.02 }}
            >
              <Link href={slide.link || "#"} className="block w-full h-full relative">

                {/* Image */}
                <img
                  src={slide.img}
                  alt={slide.alt || slide.title}
                  className="object-fill w-full h-full transition-all duration-700 group-hover:blur-md group-hover:scale-110"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Hover Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <h3 className="text-white font-bold text-sm md:text-lg mb-1 uppercase tracking-tight">
                    {slide.title}
                  </h3>

                  <div className="text-white/95 text-[10px] md:text-xs flex flex-col gap-0.5 leading-tight">

                    {/* VISA */}
                    {slide.category === "visa" && (
                      <>
                        <p><span className="text-[#FED700] font-semibold">TYPE:</span> {slide.type}</p>
                        <p><span className="text-[#FED700] font-semibold">TIME:</span> {slide.processingTime}</p>
                        <p className="mt-1 text-sm md:text-base font-black text-[#FED700] drop-shadow-md">{slide.price}</p>
                      </>
                    )}

                    {/* PROCESSING TIME */}
                    {slide.category === "tour" && (
                      <>
                        <p className="text-[#FED700] font-bold uppercase tracking-tighter">{slide.duration}</p>
                        <p className="opacity-80 line-clamp-1">{slide.includes}</p>
                        <p className="mt-1 text-sm md:text-base font-black text-white">{slide.price}</p>
                      </>
                    )}

                    {/* FREE TOOLS */}
                    {slide.category === "offer" && (
                      <>
                        <div className="bg-[#FED700] text-black px-3 py-1 rounded-full font-black text-[10px] md:text-xs mb-1">
                          {slide.promo}
                        </div>
                        <p className="text-white/80 font-medium tracking-wide italic">{slide.validUntil}</p>
                      </>
                    )}

                    {/* STUDENT VISA / SCHOLARSHIP */}
                    {slide.category === "service" && (
                      <>
                        <p className="text-white font-bold tracking-normal">{slide.detail}</p>
                        <p className="text-[#FED700] text-[9px] uppercase tracking-widest">{slide.note}</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Default Bottom Label */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3 group-hover:opacity-0 transition-opacity duration-300">
                  <p className="text-white font-bold text-xs md:text-base">{slide.title}</p>
                </div>

              </Link>
            </motion.div>
          ))}
        </div>

        {/* Nav Buttons */}
        <button
          className="hidden md:flex absolute -left-5 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg text-gray-800 z-30 hover:bg-[#FED700] hover:text-black transition-all"
          onClick={() => setBottomIndex((prev) => (prev - 1 + bottomSlides.length) % bottomSlides.length)}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg text-gray-800 z-30 hover:bg-[#FED700] hover:text-black transition-all"
          onClick={() => setBottomIndex((prev) => (prev + 1) % bottomSlides.length)}
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <div class="max-w-7xl mx-auto">
    <p class="text-sm leading-relaxed tracking-wide text-gray-700 font-medium text-justify">
      <span class="font-bold text-[#FED700]">Visa Express Hub</span> provides accurate, real-time data on 
      <strong> visa requirements</strong>, <strong>embassy fees</strong>, and <strong>processing times </strong> 
      for all nationalities. From the <strong>USA</strong>, <strong>UK</strong>, and <strong>Canada</strong> 
      to <strong>Schengen</strong> and <strong>Australia</strong>, we offer expert step-by-step guides for 
      <strong> tourist visas</strong>, <strong>student visas</strong>, and <strong>work permits</strong>. 
      Our platform is engineered to simplify global applications, minimize rejection risks, and ensure 
      fast, successful visa approvals through verified, SEO-optimized information for international travelers 
      and professionals.
    </p>
  </div>
    </div>
  );
}