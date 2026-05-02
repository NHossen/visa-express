"use client";
import React from 'react';
import Link from 'next/link';

// Static Data for 4 Professional Posts
const VISA_NEWS = [
  {
    id: 1,
    slug: "uk-skilled-worker-salary-increase-2026",
    title: "UK skilled worker salary threshold rises to £38,700",
    excerpt: "The Home Office has officially implemented the new salary requirements for international applicants. Here is how it affects your sponsorship.",
    category: "Policy Alert",
    date: "May 02, 2026",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070",
    readTime: "5",
    flag: "https://twemoji.maxcdn.com/2/svg/1f1ec-1f1e7.svg"
  },
  {
    id: 2,
    slug: "schengen-area-digital-nomad-rules",
    title: "EU Parliament approves unified Digital Nomad Visa for Schengen Area",
    excerpt: "A new 1-year residency permit will allow remote workers to travel across 27 European nations with a single application process.",
    category: "New Visa Type",
    date: "April 28, 2026",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070",
    readTime: "4",
    flag: "https://twemoji.maxcdn.com/2/svg/1f1ea-1f1fa.svg"
  },
  {
    id: 3,
    slug: "canada-express-entry-healthcare-draw",
    title: "Canada targets 5,000 healthcare professionals in latest Express Entry",
    excerpt: "IRCC prioritizes nurses and specialized doctors in the largest category-based selection of the year to address labor shortages.",
    category: "Work Permit",
    date: "April 25, 2026",
    image: "https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1974",
    readTime: "3",
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e8-1f1e6.svg"
  },
  {
    id: 4,
    slug: "australia-subclass-482-processing-update",
    title: "Australia reduces 482 Visa processing time to 21 days",
    excerpt: "Good news for skilled workers as the Department of Home Affairs fast-tracks priority sectors including IT and Engineering.",
    category: "Speed Update",
    date: "April 22, 2026",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2130",
    readTime: "6",
    flag: "https://twemoji.maxcdn.com/2/svg/1f1e6-1f1fa.svg"
  }
];

export default function VisaNewsHub() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 pb-20">
      <main className="max-w-7xl mx-auto px-6 py-12">
        
        {/* --- MAIN HERO STORY --- */}
        <section className="mb-16">
          <Link href={`/visa-news/${VISA_NEWS[0].slug}`} className="group">
            <div className="relative bg-slate-900 rounded-[2.5rem] overflow-hidden h-[550px] shadow-2xl border border-slate-200">
              <img 
                src={VISA_NEWS[0].image} 
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000" 
                alt="hero" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-10 md:p-20 max-w-4xl">
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-yellow-400 text-black px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    Critical Update
                  </span>
                  <span className="text-white/60 text-xs font-bold uppercase">{VISA_NEWS[0].date}</span>
                </div>
                <h2 className="text-4xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter mb-8 group-hover:text-yellow-400 transition-colors">
                  {VISA_NEWS[0].title}
                </h2>
                <p className="text-white/80 text-xl font-medium max-w-2xl line-clamp-2 italic border-l-4 border-yellow-400 pl-6">
                  {VISA_NEWS[0].excerpt}
                </p>
              </div>
            </div>
          </Link>
        </section>

        {/* --- NEWS LISTING --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-12">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 border-b border-slate-200 pb-6 mb-10">
              Latest Global Reports
            </h3>
            
            {VISA_NEWS.slice(1).map((post) => (
              <article key={post.id} className="flex flex-col md:flex-row gap-10 items-start group">
                <div className="w-full md:w-80 h-56 shrink-0 rounded-3xl overflow-hidden border border-slate-100 shadow-md">
                  <img src={post.image} className="w-full h-full object-cover group-hover:rotate-2 group-hover:scale-110 transition-transform duration-500" alt="thumb" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img src={post.flag} className="w-6 h-4 object-cover rounded shadow-sm" alt="flag" />
                    <span className="text-yellow-600 font-black text-[10px] uppercase tracking-widest">{post.category}</span>
                  </div>
                  <Link href={`/visa-news/${post.slug}`}>
                    <h4 className="text-3xl font-black leading-tight group-hover:text-yellow-500 transition-colors tracking-tight">
                      {post.title}
                    </h4>
                  </Link>
                  <p className="text-slate-500 text-base font-medium leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-6 pt-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-tighter">{post.date}</span>
                    <span className="text-xs font-black text-slate-900 bg-yellow-400 px-2 py-0.5 uppercase tracking-tighter">{post.readTime} MIN READ</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* --- SIDEBAR --- */}
          <aside className="lg:col-span-4 space-y-10">
            <div className="bg-white border-2 border-slate-900 rounded-[2rem] p-10 shadow-[10px_10px_0px_0px_rgba(250,204,21,1)]">
              <h4 className="text-2xl font-black uppercase leading-none mb-6">Expert <br /> Insights</h4>
              <p className="text-sm font-bold text-slate-500 mb-8 italic">Get professional consultation on the latest visa changes.</p>
              <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-yellow-400 hover:text-black transition-all">
                Talk to Consultant
              </button>
            </div>
            
            <div className="p-8 bg-slate-100 rounded-[2rem]">
               <h5 className="font-black uppercase text-[10px] tracking-widest mb-6 border-b border-slate-300 pb-2">Topic Focus</h5>
               <div className="space-y-4 font-black uppercase text-xs">
                  <div className="flex justify-between hover:text-yellow-600 cursor-pointer"><span>Work Visas</span> <span className="text-slate-300">12</span></div>
                  <div className="flex justify-between hover:text-yellow-600 cursor-pointer"><span>Permanent Residency</span> <span className="text-slate-300">08</span></div>
                  <div className="flex justify-between hover:text-yellow-600 cursor-pointer"><span>Tourist Bans</span> <span className="text-slate-300">03</span></div>
               </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}