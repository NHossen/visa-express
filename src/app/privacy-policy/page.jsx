"use client";
import React from 'react';
import Link from 'next/link';

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "Information Collection",
      content: "We collect information you provide directly to us when you inquire about visa services, including your name, contact details, passport information, and travel plans. We also collect technical data such as IP addresses and browser types to improve our platform's performance."
    },
    {
      title: "How We Use Your Data",
      content: "Your data is used strictly to process visa applications, provide travel consultations, and send important updates regarding your documentation status. We do not sell your personal information to third parties."
    },
    {
      title: "Information Sharing",
      content: "As a subsidiary of Eammu Group, your information may be shared within our corporate umbrella (e.g., Eammu Holidays) to provide comprehensive travel solutions. We may also share data with government authorities as required for visa processing."
    },
    {
      title: "Data Security",
      content: "We implement industry-standard encryption and security protocols to protect your personal documentation. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security."
    }
  ];

  return (
    <div className="min-h-screen text-slate-900 selection:bg-yellow-200 font-sans pb-24">
      
      {/* --- MINIMAL HERO --- */}
      <section className="pt-24 pb-16 px-6 text-center border-b border-slate-50">
        <span className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">
          Legal Transparency
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
          Privacy <span className="text-yellow-400">Policy.</span>
        </h1>
        <p className="mt-4 text-slate-400 max-w-lg mx-auto text-sm font-medium leading-relaxed">
          Last Updated: May 2026. This policy outlines how Visa Express Hub handles and protects your personal documentation.
        </p>
      </section>

      <main className="max-w-3xl mx-auto px-6 mt-16">
        
        {/* --- CONTENT SECTIONS --- */}
        <div className="space-y-16">
          {sections.map((section, idx) => (
            <section key={idx} className="group">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-yellow-400 font-black text-lg">0{idx + 1}.</span>
                <h2 className="text-xl font-black tracking-tight text-slate-900 group-hover:text-yellow-500 transition-colors">
                  {section.title}
                </h2>
              </div>
              <p className="text-slate-500 leading-relaxed font-medium pl-10 border-l border-slate-100">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        {/* --- CONTACT CTA --- */}
        <div className="mt-24 p-10 bg-slate-50 rounded-[2.5rem] border border-slate-100 text-center">
          <h3 className="text-lg font-black mb-2">Have questions about your data?</h3>
          <p className="text-sm text-slate-400 mb-8 font-medium">
            Reach out to our compliance officer for any privacy-related inquiries.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <Link href="/contact" className="px-8 py-3 bg-slate-900 text-white rounded-xl text-xs font-black uppercase hover:bg-yellow-400 hover:text-slate-900 transition-all">
              Contact Compliance
            </Link>
            <a href="mailto:info@visaexpresshub.com" className="px-8 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl text-xs font-black uppercase hover:bg-slate-50 transition-all">
              Email Legal
            </a>
          </div>
        </div>

        {/* --- GROUP AFFILIATION --- */}
        <div className="mt-20 pt-10 border-t border-slate-100 flex items-center justify-between opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
          <p className="text-[10px] font-bold text-slate-400">© 2026 Visa Express Hub</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-900">
            Part of Eammu Holidays
          </p>
        </div>
      </main>
    </div>
  );
}