"use client";
import React from 'react';
import Link from 'next/link';

export default function DisclaimerPage() {
  const points = [
    {
      title: "Non-Governmental Status",
      content: "Visa Express Hub is a private travel consultancy and is not affiliated with any government agency, embassy, or consulate. We provide expert assistance for a fee; however, visa forms can often be obtained for a lower cost or for free directly from official government portals."
    },
    {
      title: "Decision Authority",
      content: "We do not have the authority to grant visas. The issuance of a visa is at the sole discretion of the relevant embassy or consulate. Our role is strictly limited to providing documentation support and ensuring your application meets the required standards."
    },
    {
      title: "Accuracy of Information",
      content: "While we strive to keep visa requirements and regulations updated, immigration laws change frequently. Visa Express Hub is not liable for any inaccuracies, errors, or omissions in the information provided on this website or during consultations."
    },
    {
      title: "Financial Liability",
      content: "Visa Express Hub shall not be held liable for any financial loss, missed flights, or travel cancellations resulting from visa delays or rejections. We strongly advise all clients not to book non-refundable travel until their visa is officially granted."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 selection:bg-yellow-200 font-sans pb-32">
      
      {/* --- MINIMAL HEADER --- */}
      <section className="pt-24 pb-20 px-6 text-center border-b border-slate-50 relative overflow-hidden">
        <div className="relative z-10">
          <span className="text-yellow-500 text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">
            Legal Notice
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
            General <span className="text-yellow-400">Disclaimer.</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl mx-auto text-base font-medium leading-relaxed">
            This disclaimer governs your use of our services and website. By engaging with Visa Express Hub, you acknowledge the following limitations of liability.
          </p>
        </div>
        
        {/* Subtle decorative "D" for Disclaimer */}
        <div className="absolute -bottom-20 -right-20 text-[20rem] font-black text-slate-50 select-none pointer-events-none">
          D
        </div>
      </section>

      <main className="max-w-4xl mx-auto px-6 mt-20">
        
        {/* --- DISCLAIMER CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {points.map((point, idx) => (
            <div key={idx} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-lg font-black mb-4 flex items-center gap-3">
                <span className="w-6 h-1 bg-yellow-400 rounded-full"></span>
                {point.title}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {point.content}
              </p>
            </div>
          ))}
        </div>

        {/* --- URGENT NOTICE BOX --- */}
        <div className="mt-16 p-8 bg-yellow-50 rounded-[2.5rem] border border-yellow-100 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-sm font-black uppercase tracking-widest text-yellow-700 mb-2">Important Notice</h3>
            <p className="text-xs text-yellow-800/70 font-bold max-w-lg mx-auto leading-relaxed">
              Visa processing times are estimates provided by embassies. We cannot expedite these timelines or provide "guaranteed" processing windows.
            </p>
          </div>
        </div>

        {/* --- FINAL ACTION --- */}
        <div className="mt-20 flex flex-col items-center gap-8">
          <div className="flex gap-4">
            <Link href="/contact" className="px-10 py-4 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-yellow-400 hover:text-slate-900 transition-all shadow-xl shadow-slate-200">
              Inquire Now
            </Link>
            <Link href="/terms" className="px-10 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
              Terms of Service
            </Link>
          </div>
          
          <div className="pt-10 border-t border-slate-100 w-full text-center">
            <Link href="https://www.eammu.com" target="_blank" className="group">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em] group-hover:text-yellow-500 transition-colors">
                Eammu Group Enterprise • Dubai • Dhaka
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}