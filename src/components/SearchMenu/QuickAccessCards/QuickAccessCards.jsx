import React from "react";
import Link from "next/link";
import { FileEdit, ListChecks, Clock, ArrowRight } from "lucide-react";

const QuickAccessCards = () => {
  const cards = [
    {
      title: "Travel Document\nGenerator",
      desc: "Generate NOC, SOP, Salary Certificate & more in seconds",
      href: "/visa-resources/visa-document-generator",
      icon: <FileEdit size={15} strokeWidth={2.5} />,
      badge: "AI Generator",
      tags: ["NOC", "SOP", "Power of Attorney", "+ more"],
      isDark: true,
      cta: "Generate Now",
    },
    {
      title: "Visa Checklist\nGenerator",
      desc: "Country-specific document lists for every visa category",
      href: "/visa-resources/visa-checklist-generator",
      icon: <ListChecks size={15} strokeWidth={2.5} />,
      badge: "Smart Checklist",
      tags: ["Schengen", "USA", "UK", "Canada", "Australia"],
      isDark: false,
      cta: "Build Checklist",
    },
    {
      title: "Check Visa\nProcessing Time",
      desc: "Real-time processing times from every major consulate",
      href: "/visa-processing-time-tracker",
      icon: <Clock size={15} strokeWidth={2.5} />,
      badge: "Processing Tracker",
      tags: ["Schengen", "USA", "UK", "Canada", "+ more"],
      isDark: true,
      cta: "Track Visa Now",
    },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto max-w-7xl px-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Link
              key={index}
              href={card.href}
              className={`group relative rounded-3xl p-8 text-left overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2 ${
                card.isDark
                  ? "bg-[#004d2c] border-transparent"
                  : "bg-white border-slate-100 hover:border-[#004d2c]/20"
              }`}
            >
              {/* Decorative Background Circle */}
              <div
                className={`absolute -top-10 -right-10 w-40 h-40 rounded-full border-[18px] transition-all duration-500 ${
                  card.isDark
                    ? "border-white/5 group-hover:border-white/10"
                    : "border-slate-50 group-hover:border-[#004d2c]/5"
                }`}
              />

              {/* Top Badge */}
              <div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl mb-6 ${
                  card.isDark
                    ? "bg-amber-400 text-[#004d2c]"
                    : "bg-[#004d2c] text-white"
                }`}
              >
                {card.icon}
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {card.badge}
                </span>
              </div>

              {/* Title & Description */}
              <h3
                className={`text-2xl font-black leading-tight mb-2 whitespace-pre-line ${
                  card.isDark ? "text-white" : "text-[#004d2c]"
                }`}
              >
                {card.title}
              </h3>
              <p
                className={`text-sm font-medium mb-6 ${
                  card.isDark ? "text-green-100/60" : "text-slate-400"
                }`}
              >
                {card.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {card.tags.map((tag, i) => (
                  <span
                    key={i}
                    className={`text-[9px] font-bold uppercase px-2 py-1 rounded-lg ${
                      card.isDark
                        ? "bg-white/10 text-green-50"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA Link */}
              <div
                className={`flex items-center gap-2 font-black text-sm transition-all group-hover:gap-3 ${
                  card.isDark ? "text-amber-400" : "text-[#004d2c]"
                }`}
              >
                {card.cta} <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>
     <div class="max-w-7xl mx-auto mt-8">
  <p class="text-sm leading-relaxed tracking-wide text-gray-700 font-medium text-justify px-2">
    <span class="font-bold text-[#FED700]">Visa Express Hub</span> offers a 
    <strong> Visa Document Generator</strong> for expert-approved <strong> NOC templates</strong>, 
    <strong>SOPs</strong>, and <strong> Salary Certificates</strong>. Whether you're tracking 
    <strong> Schengen visa processing times</strong> or building a <strong>USA visa checklist</strong>, 
    our platform provides the <strong>2026 legal standards</strong> needed to boost your 
    approval odds.
  </p>
</div>
    </section>
  );
};

export default QuickAccessCards;