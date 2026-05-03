"use client";
import React from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const offices = [
    {
      city: "Dubai, UAE",
      address: "Al Nasser Building, Deira, Dubai, United Arab Emirates",
      phone: "+971 50 707 8334",
      callLink: "tel:+971507078334",
      map: "https://www.google.com/maps/search/Al+Nasser+Building+Deira+Dubai"
    },
    {
      city: "Dhaka, Bangladesh",
      address: "Dhanmondi, Dhaka, Bangladesh",
      phone: "+880 1631 312524",
      callLink: "tel:+8801631312524",
      map: "https://www.google.com/maps/search/Dhanmondi+Dhaka"
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-yellow-100">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-yellow-400 py-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/world-item.png')] bg-center"></div>
        </div>
        
        <div className="relative z-10">
          <span className="bg-yellow-400 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em]">
            Get In Touch
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white mt-6 tracking-tighter">
            Global <span className="text-black">Support</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-xl mx-auto text-lg font-medium">
            Connect with our visa specialists across our international offices for seamless travel documentation.
          </p>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 pb-24">
        
        {/* --- CORE CONTACT CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {offices.map((office, idx) => (
            <div key={idx} className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-10 shadow-xl shadow-slate-200/50 hover:border-yellow-400 transition-all group">
              <div className="flex justify-between items-start mb-8">
                <div className="bg-yellow-400 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl">
                  📍
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300 group-hover:text-yellow-500">
                  Office {idx + 1}
                </span>
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight">{office.city}</h3>
              <p className="text-slate-500 font-medium leading-relaxed mb-8 h-12">
                {office.address}
              </p>
              <div className="space-y-4 border-t border-slate-50 pt-8">
                <a href={office.callLink} className="flex items-center gap-4 group/link">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover/link:bg-yellow-400 transition-colors">
                    📞
                  </div>
                  <span className="font-black text-lg tracking-tight group-hover/link:text-yellow-600">
                    {office.phone}
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* --- DIGITAL CHANNELS & SPONSOR --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Quick Links */}
          <div className="lg:col-span-2 bg-slate-50 rounded-[2.5rem] p-10 md:p-16 flex flex-col justify-center">
            <h2 className="text-4xl font-black mb-8 tracking-tighter">Digital Reach</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Official Email</p>
                <a href="mailto:info@visaexpresshub.com" className="text-xl font-black hover:text-yellow-600 transition-colors">
                  info@visaexpresshub.com
                </a>
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Official Website</p>
                <Link href="https://www.visaexpresshub.com" className="text-xl font-black hover:text-yellow-600 transition-colors">
                  www.visaexpresshub.com
                </Link>
              </div>
            </div>

            {/* Sponsored Branding */}
            <div className="mt-16 pt-10 border-t border-slate-200">
               <p className="text-sm font-bold text-slate-400 mb-4 italic">Managed & Powered by</p>
               <Link href="https://www.eammu.com" target="_blank" className="group inline-flex items-center gap-4">
                  <div className="bg-slate-900 text-white px-6 py-3 rounded-xl font-black uppercase text-xs tracking-[0.2em] group-hover:bg-yellow-400 group-hover:text-black transition-all shadow-lg">
                    Eammu Holidays
                  </div>
                  <span className="text-xs font-black text-slate-900 underline underline-offset-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    Visit eammu.com →
                  </span>
               </Link>
            </div>
          </div>

          {/* Business Hours Sidebar */}
          <div className="bg-yellow-400 rounded-[2.5rem] p-10 flex flex-col">
            <h4 className="text-2xl font-black uppercase leading-none mb-8">Service <br /> Hours</h4>
            <div className="space-y-4 font-bold text-sm">
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span>Sunday - Thursday</span>
                <span>09:00 - 18:00</span>
              </div>
              <div className="flex justify-between border-b border-black/10 pb-2">
                <span>Saturday</span>
                <span>10:00 - 14:00</span>
              </div>
              <div className="flex justify-between text-black/40">
                <span>Friday</span>
                <span>Closed</span>
              </div>
            </div>
            <div className="mt-auto pt-10">
              <p className="text-xs font-black uppercase tracking-widest mb-4">Urgent Inquiry?</p>
              <p className="text-[10px] font-medium leading-relaxed italic">
                Our support team monitors emails 24/7 for urgent visa status updates.
              </p>
            </div>
          </div>

        </div>
      </main>

      {/* --- SEO FOOTER TRADEMARK --- */}
      <footer className="bg-white py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">
            Visa Express Hub © 2026 • All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}