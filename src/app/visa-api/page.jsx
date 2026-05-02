"use client";
import React from 'react';

export default function VisaApiPage() {
  const apiFeatures = [
    { title: "Real-time Requirements", desc: "Instant access to 190+ country visa rules.", icon: "🌍" },
    { title: "JSON Responses", desc: "Clean, structured data for easy integration.", icon: "📦" },
    { title: "Secure Authentication", desc: "Enterprise-grade JWT & OAuth2 security.", icon: "🔐" },
    { title: "Webhook Alerts", desc: "Get notified immediately when policies change.", icon: "🔔" },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-yellow-500/10 blur-[120px] rounded-full -z-10"></div>

      <main className="max-w-6xl mx-auto px-6 pt-24 pb-32">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">
            Developer Access
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-none">
            The World’s Most <br /> 
            <span className="text-yellow-400">Powerful Visa API</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto font-medium">
            Integrate global visa intelligence directly into your travel app, HR platform, or booking engine.
          </p>
        </div>

        {/* Status Card */}
        <div className="max-w-4xl mx-auto bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl mb-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(250,204,21,1)]"></div>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic">Currently in Private Beta</h2>
              </div>
              <p className="text-slate-400 font-medium">
                We are fine-tuning our endpoints. Join the waitlist to be among the first to get API documentation and early-access keys.
              </p>
              <div className="flex gap-3">
                <input 
                  type="email" 
                  placeholder="dev@yourcompany.com" 
                  className="bg-slate-800/50 border border-slate-700 rounded-xl px-6 py-4 w-full focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
                />
                <button className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-white transition-all shrink-0">
                  Get Access
                </button>
              </div>
            </div>

            {/* Code Snippet Visual */}
            <div className="w-full md:w-[400px] bg-[#011627] rounded-2xl p-6 border border-slate-700 shadow-inner font-mono text-sm leading-relaxed">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="text-blue-300">GET</div>
              <div className="text-yellow-400">/v1/requirements?to=UK</div>
              <div className="mt-4 text-slate-500">{"{"}</div>
              <div className="pl-4">
                <span className="text-pink-400">"visa_type"</span>: <span className="text-green-400">"Business"</span>,
                <br />
                <span className="text-pink-400">"status"</span>: <span className="text-green-400">"Required"</span>,
                <br />
                <span className="text-pink-400">"stay_duration"</span>: <span className="text-green-400">"90_days"</span>
              </div>
              <div className="text-slate-500">{"}"}</div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {apiFeatures.map((f, i) => (
            <div key={i} className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800 hover:border-yellow-400/50 transition-colors">
              <div className="text-3xl mb-4">{f.icon}</div>
              <h4 className="font-black uppercase text-sm tracking-widest mb-2">{f.title}</h4>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer Branding */}
      <footer className="text-center pb-20 opacity-30">
        <p className="text-[10px] font-black uppercase tracking-[1em]">Powered by Visa Express Intelligence</p>
      </footer>
    </div>
  );
}