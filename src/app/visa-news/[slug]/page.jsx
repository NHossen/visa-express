import React from 'react';

export default async function NewsDetailPage({ params }) {
  const { slug } = await params;

  // In a real app, you would fetch post by slug from MongoDB.
  // This is a static detailed template.
  return (
    <article className="min-h-screen bg-white">
      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-6 pt-20">
        <div className="flex items-center gap-4 mb-8">
          <span className="bg-yellow-400 text-black px-4 py-1 text-[10px] font-black uppercase tracking-widest">Global Policy</span>
          <span className="text-slate-400 font-bold text-xs">May 02, 2026 • 5 Min Read</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black leading-[1.1] tracking-tighter mb-10">
          UK Implementing New Skilled Worker Salary Thresholds: A Complete Breakdown
        </h1>
        
        <div className="flex items-center gap-4 mb-12 border-y border-slate-100 py-6">
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center font-black">VE</div>
          <div>
            <p className="text-sm font-black uppercase tracking-tighter">Visa Express Editorial</p>
            <p className="text-xs text-slate-400 font-bold uppercase">Policy Specialist</p>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <img 
          src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070" 
          className="w-full h-[500px] object-cover rounded-[3rem] shadow-xl"
          alt="article header"
        />
      </div>

      {/* Article Content */}
      <div className="max-w-3xl mx-auto px-6 text-slate-800 space-y-8 pb-32">
        <p className="text-2xl font-medium leading-relaxed text-slate-500 italic">
          The UK Home Office has officially raised the minimum salary threshold for those arriving on a Skilled Worker visa from £26,200 to £38,700.
        </p>

        <h2 className="text-3xl font-black uppercase tracking-tight pt-4">Why the change?</h2>
        <p className="text-lg leading-relaxed">
          The UK government aims to reduce net migration by ensuring that workers brought from abroad are filling high-skilled roles that pay a premium. This change significantly impacts recruiters in the hospitality and manufacturing sectors who previously relied on the lower threshold.
        </p>

        <div className="bg-yellow-50 border-l-8 border-yellow-400 p-8 rounded-r-3xl">
          <h4 className="font-black uppercase text-sm mb-2">Exemptions to Note:</h4>
          <p className="text-sm font-medium">Health and Care visa workers and those on national pay scales (like teachers) are currently exempt from the £38,700 requirement.</p>
        </div>

        <h2 className="text-3xl font-black uppercase tracking-tight pt-4">How to Prepare</h2>
        <p className="text-lg leading-relaxed">
          If you are an employer, you must review your current Certificate of Sponsorship (CoS) allocations. If you are an applicant, ensure your job offer letter reflects the updated salary requirements to avoid automatic visa rejection.
        </p>
      </div>
    </article>
  );
}