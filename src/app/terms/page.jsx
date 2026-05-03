"use client";
import React from 'react';
import Link from 'next/link';

export default function TermsAndConditions() {
  const terms = [
    {
      id: "01",
      title: "Service Scope",
      content: "Visa Express Hub provides consultancy and documentation assistance for global visa applications. We act as an intermediary between the applicant and the respective embassy or consulate. Our service is limited to administrative support and expert guidance."
    },
    {
      id: "02",
      title: "No Guarantee of Approval",
      content: "The final decision to grant or deny a visa rests solely with the government of the destination country. Visa Express Hub cannot and does not guarantee the outcome of any application. Service fees are charged for the professional handling of documentation, not for the visa result."
    },
    {
      id: "03",
      title: "Client Responsibility",
      content: "Clients are responsible for providing accurate, truthful, and complete information. Any delays or rejections caused by fraudulent documents or missing information provided by the client are not the responsibility of Visa Express Hub."
    },
    {
      id: "04",
      title: "Refund & Cancellation",
      content: "Once documentation processing has commenced, service fees paid to Visa Express Hub are generally non-refundable. Embassy fees and third-party charges are subject to the specific refund policies of those entities."
    },
    {
      id: "05",
      title: "Corporate Affiliation",
      content: "Visa Express Hub is a registered business entity under the Eammu Group. By using our services, you acknowledge that our operational standards and liability are governed by the group's corporate policies and the laws of the UAE and Bangladesh."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-yellow-200 font-sans pb-24">
      
      {/* --- MINIMAL HERO --- */}
      <section className="pt-24 pb-16 px-6 text-center border-b border-slate-50">
        <span className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">
          Legal Agreement
        </span>
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
          Terms of <span className="text-yellow-400">Service.</span>
        </h1>
        <p className="mt-4 text-slate-400 max-w-lg mx-auto text-sm font-medium leading-relaxed">
          Effective Date: May 2026. Please read these terms carefully before engaging our visa documentation services.
        </p>
      </section>

      <main className="max-w-4xl mx-auto px-6 mt-20">
        
        {/* --- TERMS GRID/LIST --- */}
        <div className="space-y-12">
          {terms.map((item) => (
            <div key={item.id} className="grid grid-cols-1 md:grid-cols-12 gap-6 group">
              <div className="md:col-span-1">
                <span className="text-yellow-400 font-black text-2xl opacity-40 group-hover:opacity-100 transition-opacity">
                  {item.id}
                </span>
              </div>
              <div className="md:col-span-11 pb-10 border-b border-slate-50">
                <h2 className="text-xl font-black mb-4 tracking-tight text-slate-900">
                  {item.title}
                </h2>
                <p className="text-slate-500 leading-relaxed font-medium text-sm md:text-base">
                  {item.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- ACCEPTANCE BOX --- */}
        <div className="mt-20 p-12 bg-white border border-slate-100 rounded-[3rem] shadow-sm text-center">
          <div className="w-16 h-16 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
            ⚖️
          </div>
          <h3 className="text-xl font-black mb-4">Acceptance of Terms</h3>
          <p className="text-sm text-slate-400 max-w-md mx-auto mb-10 font-medium">
            By proceeding with a payment or submitting your documents, you agree to be bound by the terms outlined above.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-10 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase hover:bg-yellow-400 hover:text-slate-900 transition-all shadow-lg shadow-slate-200">
              Inquire Further
            </Link>
            <Link href="/" className="px-10 py-4 bg-slate-50 text-slate-900 rounded-2xl text-xs font-black uppercase hover:bg-slate-100 transition-all">
              Return Home
            </Link>
          </div>
        </div>

        {/* --- CORPORATE FOOTNOTE --- */}
        <div className="mt-24 text-center">
           <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.4em]">
             Official Documentation • Eammu Group Enterprise
           </p>
        </div>
      </main>
    </div>
  );
}