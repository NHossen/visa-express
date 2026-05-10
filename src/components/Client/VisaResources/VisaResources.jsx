"use client"
import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, Download, Search, Calculator, Compass, Briefcase, 
  ShieldCheck, Banknote, ScrollText, Lightbulb, ArrowRight, 
  ExternalLink, MessageSquare, FileSearch, CheckCircle, PlusCircle,
  X, Copy, Check, Filter, Globe, Plane, CreditCard, Landmark,
  ChevronRight, Sparkles, FileEdit, ListChecks, Zap, Star,
  TrendingUp, Users, Clock, BadgeCheck, BookOpen, Map, Award
} from "lucide-react";

const TravelResources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [copyStatus, setCopyStatus] = useState(null);
  
  const allResources = [
    { id: 1, category: "corporate", title: "Standard NOC", desc: "No Objection Certificate template for Private & Govt employees.", format: "DOCX", size: "1.2MB", icon: <Briefcase />, href: "/visa-resources/visa-document-generator", downloads: "12.4k", badge: "Most Popular" },
    { id: 2, category: "financial", title: "Salary Certificate", desc: "Official monthly income breakdown including house rent & medical.", format: "PDF", size: "850KB", icon: <Banknote />, href: "/visa-resources/visa-document-generator", downloads: "8.1k", badge: null },
    { id: 3, category: "legal", title: "Power of Attorney", desc: "Legal draft for visa processing via third-party agents.", format: "DOCX", size: "2.1MB", icon: <ShieldCheck />, href: "/visa-resources/visa-document-generator", downloads: "5.7k", badge: null },
    { id: 4, category: "financial", title: "Bank Statement Log", desc: "Excel sheet to track your 6-month transaction history for visas.", format: "XLSX", size: "500KB", icon: <Landmark />, href: "/visa-resources/visa-document-generator", downloads: "9.3k", badge: "New" },
    { id: 5, category: "visa-tools", title: "Itinerary Architect", desc: "Day-to-day activity planner designed specifically for Schengen/US visas.", format: "TOOL", size: "WEB", icon: <Compass />, href: "/visa-resources/visa-document-generator", downloads: "3.2k", badge: "Free Tool" },
    { id: 6, category: "corporate", title: "Trade License (English)", desc: "Translated template for business owners in Bangladesh/UAE.", format: "PDF", size: "1.5MB", icon: <FileText />, href: "/visa-resources/visa-document-generator", downloads: "4.8k", badge: null },
    { id: 7, category: "legal", title: "Affidavit of Support", desc: "Required when a sponsor is funding the traveler's expenses.", format: "DOCX", size: "1.1MB", icon: <ScrollText />, href: "/visa-resources/visa-document-generator", downloads: "6.2k", badge: null },
    { id: 8, category: "financial", title: "Tax Return (IT-10B)", desc: "Standard tax certificate format for high-net-worth applicants.", format: "PDF", size: "3.2MB", icon: <CreditCard />, href: "/visa-resources/visa-document-generator", downloads: "3.9k", badge: null },
    { id: 9, category: "visa-tools", title: "Cover Letter Master", desc: "A persuasive cover letter focusing on 'Ties to Home Country'.", format: "DOCX", size: "900KB", icon: <Plane />, href: "/visa-resources/visa-document-generator", downloads: "11.2k", badge: "Top Rated" },
  ];

  const aiPrompts = [
    { id: "p1", title: "The 'Ties to Home' SOP", tag: "SOP", prompt: "Write an SOP for a [Country] visa. Focus heavily on my property ownership, family business, and elderly parents in [Home Country] to prove I will return after my 15-day visit." },
    { id: "p2", title: "Corporate Trip Justifier", tag: "Business", prompt: "Draft a formal letter from a company CEO justifying why [Employee Name] needs to attend the [Event Name] in [City], highlighting the business impact." },
    { id: "p3", title: "The 'Gap' Explainer", tag: "Employment", prompt: "Write a polite explanation for a 6-month employment gap in my CV for a visa application, focusing on personal development and skill acquisition." },
    { id: "p4", title: "Itinerary Detailer", tag: "Travel", prompt: "Create a detailed 10-day itinerary for [Country]. For each day, provide one historical site, one local restaurant, and the estimated travel time between them." },
    { id: "p5", title: "Interview Prep Bot", tag: "Interview", prompt: "Act as a Visa Officer at the [Country] Consulate. Ask me 5 tough questions about my financial standing and travel history, then critique my answers." },
  ];

  const STATS = [
    { icon: <Users size={18} />, value: "48,000+", label: "Downloads" },
    { icon: <BadgeCheck size={18} />, value: "99.2%", label: "Success Rate" },
    { icon: <Globe size={18} />, value: "120+", label: "Countries" },
    { icon: <Star size={18} />, value: "4.9 / 5", label: "User Rating" },
  ];

  const SEO_LINKS = [
    { label: "Schengen Visa Guide", href: "/visa/tourist-visa/european-union-visa", icon: <Map size={13} /> },
    { label: "Canada Student Visa", href: "/visa/student-visa/canada", icon: <BookOpen size={13} /> },
    { label: "UK Visa Requirements", href: "/visa/tourist-visa/united-kingdom", icon: <Globe size={13} /> },
    { label: "USA B1/B2 Visa", href: "/visa/tourist-visa/united-states", icon: <Plane size={13} /> },
    { label: "Australia PR Guide", href: "/visa/tourist-visa/australia", icon: <Award size={13} /> },
    { label: "Processing Times", href: "/visa-processing-time-tracker", icon: <Clock size={13} /> },
    { label: "Scholarship Finder", href: "/scholarship", icon: <TrendingUp size={13} /> },
    { label: "Visa Checker", href: "/visa", icon: <Search size={13} /> },
  ];

  const TABS = [
    { id: "all", label: "All Resources" },
    { id: "financial", label: "Financial" },
    { id: "corporate", label: "Corporate" },
    { id: "legal", label: "Legal" },
    { id: "visa-tools", label: "Visa Tools" },
  ];

  const filteredResources = allResources.filter((res) => {
    const matchesSearch = 
      res.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      res.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "all" || res.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(id);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  return (
    <div className="bg-[#f8f9fb] min-h-screen font-sans text-slate-900 selection:bg-amber-400 selection:text-[#004d2c]">
      
      {/* ── HERO ── */}
      <section className="relative bg-white pt-24 pb-16 px-6 overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-amber-400/6 rounded-full blur-[100px]" />
          <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[#005a31]/5 rounded-full blur-[100px]" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.015]" style={{backgroundImage:'linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)', backgroundSize:'60px 60px'}} />
        </div>

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 px-4 py-2 rounded-full mb-6">
              <Sparkles size={13} className="text-amber-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-700">Free Visa Document Vault — 2025</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-[#004d2c] leading-[0.95] tracking-tighter mb-5">
              Every Document.<br />
              <span className="relative inline-block">
                <span className="relative z-10">Every Visa.</span>
                <span className="absolute bottom-1 left-0 right-0 h-3 bg-amber-400/30 -skew-x-2 rounded" />
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-500 max-w-xl mx-auto font-medium leading-relaxed mb-10">
              Download professionally crafted visa templates, legal drafts, and AI prompts trusted by 48,000+ travelers worldwide.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {STATS.map((s, i) => (
                <div key={i} className="flex items-center gap-2.5 bg-slate-50 border border-slate-100 px-4 py-2.5 rounded-2xl">
                  <span className="text-[#005a31]">{s.icon}</span>
                  <div className="text-left">
                    <div className="text-sm font-black text-slate-800 leading-none">{s.value}</div>
                    <div className="text-[9px] font-bold uppercase text-slate-400 tracking-wider mt-0.5">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Search */}
            <div className="w-full max-w-2xl mx-auto relative">
              <div className="flex items-center bg-white border-2 border-slate-200 hover:border-[#005a31]/40 focus-within:border-[#005a31] rounded-2xl shadow-sm transition-all duration-200 overflow-hidden">
                <div className="pl-5 text-slate-400 shrink-0">
                  <Search size={20} />
                </div>
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder='Search templates — "NOC", "SOP", "Bank Statement"...'
                  className="w-full py-4 px-4 outline-none text-[15px] font-semibold placeholder:text-slate-300 bg-transparent"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")} className="mr-2 p-1.5 hover:bg-slate-100 text-slate-400 rounded-lg transition-all">
                    <X size={16} />
                  </button>
                )}
                <div className="pr-2 shrink-0">
                  <div className="bg-[#005a31] text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider">
                    Search
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── SEO Internal Link Bar ── */}
          <div className="mt-8">
            <p className="text-center text-[9px] font-black uppercase tracking-widest text-slate-300 mb-3">Popular Guides & Tools</p>
            <div className="flex flex-wrap justify-center gap-2">
              {SEO_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-100 rounded-full text-[11px] font-bold text-slate-500 hover:text-[#005a31] hover:border-[#005a31]/30 hover:bg-[#005a31]/5 transition-all"
                >
                  <span className="text-slate-400">{l.icon}</span>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK ACCESS CARDS ── */}
      <section className="container mx-auto max-w-7xl px-6 py-10">
        <div className="grid md:grid-cols-3 gap-5">

          {/* Card 1 */}
          <Link href="/visa-resources/visa-document-generator"
            className="group relative bg-[#004d2c] rounded-3xl p-7 text-left overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full border-[16px] border-white/5 group-hover:border-white/10 transition-all duration-500" />
            <div className="inline-flex items-center gap-2 bg-amber-400 text-[#004d2c] px-3 py-1.5 rounded-xl mb-5">
              <FileEdit size={15} strokeWidth={2.5} />
              <span className="text-[10px] font-black uppercase tracking-widest">AI Generator</span>
            </div>
            <h2 className="text-xl font-black text-white leading-tight mb-2">Travel Document<br />Generator</h2>
            <p className="text-green-200/60 text-xs font-medium mb-5">Generate NOC, SOP, Salary Certificate & more in seconds</p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {["NOC", "SOP", "Power of Attorney", "+ more"].map(tag => (
                <span key={tag} className="bg-white/10 text-green-100 text-[9px] font-bold uppercase px-2 py-1 rounded-lg">{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-amber-400 font-black text-sm group-hover:gap-3 transition-all">
              Generate Now <ArrowRight size={15} />
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/visa-resources/visa-checklist-generator"
            className="group relative bg-white border-2 border-slate-100 rounded-3xl p-7 text-left overflow-hidden hover:border-[#004d2c]/25 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full border-[16px] border-slate-100 group-hover:border-[#004d2c]/10 transition-all duration-500" />
            <div className="inline-flex items-center gap-2 bg-[#004d2c] text-white px-3 py-1.5 rounded-xl mb-5">
              <ListChecks size={15} strokeWidth={2.5} />
              <span className="text-[10px] font-black uppercase tracking-widest">Smart Checklist</span>
            </div>
            <h2 className="text-xl font-black text-[#004d2c] leading-tight mb-2">Visa Checklist<br />Generator</h2>
            <p className="text-slate-400 text-xs font-medium mb-5">Country-specific document lists for every visa category</p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {["Schengen", "USA", "UK", "Canada", "Australia"].map(tag => (
                <span key={tag} className="bg-slate-50 text-[#004d2c] text-[9px] font-bold uppercase px-2 py-1 rounded-lg border border-slate-200">{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-[#004d2c] font-black text-sm group-hover:gap-3 transition-all">
              Build Checklist <ArrowRight size={15} />
            </div>
          </Link>

          {/* Card 3 */}
          <Link href="/visa-processing-time-tracker"
            className="group relative bg-[#004d2c] rounded-3xl p-7 text-left overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full border-[16px] border-white/5 group-hover:border-white/10 transition-all duration-500" />
            <div className="inline-flex items-center gap-2 bg-amber-400 text-[#004d2c] px-3 py-1.5 rounded-xl mb-5">
              <Clock size={15} strokeWidth={2.5} />
              <span className="text-[10px] font-black uppercase tracking-widest">Processing Tracker</span>
            </div>
            <h2 className="text-xl font-black text-white leading-tight mb-2">Check Visa<br />Processing Time</h2>
            <p className="text-green-200/60 text-xs font-medium mb-5">Real-time processing times from every major consulate</p>
            <div className="flex flex-wrap gap-1.5 mb-6">
              {["Schengen", "USA", "UK", "Canada", "+ more"].map(tag => (
                <span key={tag} className="bg-white/10 text-green-100 text-[9px] font-bold uppercase px-2 py-1 rounded-lg">{tag}</span>
              ))}
            </div>
            <div className="flex items-center gap-2 text-amber-400 font-black text-sm group-hover:gap-3 transition-all">
              Track Visa Now <ArrowRight size={15} />
            </div>
          </Link>
        </div>
      </section>

      {/* ── CONTENT EXPLORER ── */}
      <div className="container mx-auto max-w-7xl px-6 pb-20">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-6 space-y-6">

              {/* Filter */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <Filter size={11} /> Filter by Category
                </h4>
                <nav className="flex flex-col gap-1.5">
                  {TABS.map(tab => (
                    <button 
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all ${
                        activeTab === tab.id 
                        ? 'bg-[#005a31] text-white shadow-md' 
                        : 'text-slate-500 hover:bg-slate-50 hover:text-[#005a31]'
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && <ChevronRight size={12} />}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Quick Tools */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <Zap size={11} className="text-amber-500" /> Quick Tools
                </h4>
                <div className="flex flex-col gap-2">
                  <Link href="/visa-resources/visa-document-generator" className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-amber-50 border border-amber-100 hover:bg-amber-400 hover:border-amber-400 group transition-all">
                    <FileEdit size={14} className="text-amber-600 group-hover:text-white shrink-0" />
                    <span className="text-[11px] font-black text-amber-800 group-hover:text-white">Doc Generator</span>
                  </Link>
                  <Link href="/visa-resources/visa-checklist-generator" className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#004d2c]/5 border border-[#004d2c]/10 hover:bg-[#004d2c] group transition-all">
                    <ListChecks size={14} className="text-[#005a31] group-hover:text-white shrink-0" />
                    <span className="text-[11px] font-black text-[#004d2c] group-hover:text-white">Checklist Builder</span>
                  </Link>
                  <Link href="/visa" className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-blue-50 border border-blue-100 hover:bg-blue-600 group transition-all">
                    <Globe size={14} className="text-blue-600 group-hover:text-white shrink-0" />
                    <span className="text-[11px] font-black text-blue-800 group-hover:text-white">Visa Checker</span>
                  </Link>
                  <Link href="/visa-processing-time-tracker" className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-purple-50 border border-purple-100 hover:bg-purple-600 group transition-all">
                    <Clock size={14} className="text-purple-600 group-hover:text-white shrink-0" />
                    <span className="text-[11px] font-black text-purple-800 group-hover:text-white">Processing Time Tracker</span>
                  </Link>
                </div>
              </div>

              {/* SEO Internal Links */}
              <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <TrendingUp size={11} /> Popular Guides
                </h4>
                <div className="flex flex-col gap-1">
                  {[
                    { label: "Schengen Visa Guide", href: "/schengen-visa" },
                    { label: "Canada Student Visa", href: "/visa/student-visa/canada" },
                    { label: "UK Visa Requirements", href: "/visa/tourist-visa/united-kingdom" },
                    { label: "USA Tourist Visa", href: "/visa/tourist-visa/united-states" },
                    { label: "Australia PR Guide", href: "/visa/tourist-visa/australia" },
                    { label: "Scholarship Finder", href: "/scholarship" },
                  ].map(l => (
                    <Link key={l.href} href={l.href} className="flex items-center gap-2 py-2 text-[11px] font-bold text-slate-500 hover:text-[#005a31] transition-colors group">
                      <ChevronRight size={11} className="text-slate-300 group-hover:text-[#005a31] shrink-0" />
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Box */}
              <div className="bg-[#004d2c] p-6 rounded-2xl text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-5"><Globe size={80} /></div>
                <h5 className="font-black text-base mb-2 relative z-10">Need Custom Drafts?</h5>
                <p className="text-xs text-green-100/60 mb-4 relative z-10 leading-relaxed">Specialized legal letters for complex visa cases.</p>
                <Link href="https://wa.me/8801631312524" className="block text-center w-full py-3 bg-amber-400 text-[#004d2c] rounded-xl font-black text-xs hover:bg-white transition-all relative z-10">
                  Contact Legal Team →
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {/* Header row */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-[#005a31] uppercase tracking-tighter">
                  {activeTab === 'all' ? 'All Resources' : TABS.find(t => t.id === activeTab)?.label}
                </h2>
                <p className="text-xs text-slate-400 font-bold mt-0.5">{filteredResources.length} documents available</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-wider bg-white border border-slate-100 px-3 py-2 rounded-xl">
                <TrendingUp size={11} className="text-amber-500" /> Most Downloaded First
              </div>
            </div>

            {filteredResources.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-5">
                {filteredResources.map((res) => (
                  <DocCard key={res.id} {...res} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <FileSearch size={40} className="mx-auto text-slate-300 mb-3" />
                <h3 className="text-lg font-black text-slate-800">No documents found</h3>
                <p className="text-slate-400 text-sm mt-1">Try "Bank", "NOC" or "Letter"</p>
              </div>
            )}

            {/* SEO link cluster */}
            <div className="mt-10 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                <Globe size={11} /> Explore Visa Guides by Country
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: "Schengen", href: "/visa/tourist-visa/europian-union", flag: "🇪🇺" },
                  { label: "Canada", href: "/visa/tourist-visa/canada", flag: "🇨🇦" },
                  { label: "United Kingdom", href: "/visa/tourist-visa/united-kingdom", flag: "🇬🇧" },
                  { label: "United States", href: "/visa/tourist-visa/united-states", flag: "🇺🇸" },
                  { label: "Australia", href: "/visa/tourist-visa/australia", flag: "🇦🇺" },
                  { label: "Japan", href: "/visa/tourist-visa/japan", flag: "🇯🇵" },
                  { label: "UAE / Dubai", href: "/visa/tourist-visa/united-arab-emirates", flag: "🇦🇪" },
                  { label: "New Zealand", href: "/visa/tourist-visa/new-zealand", flag: "🇳🇿" },
                ].map(c => (
                  <Link
                    key={c.href}
                    href={c.href}
                    className="flex items-center gap-2 px-3 py-2.5 bg-slate-50 hover:bg-[#005a31]/5 hover:border-[#005a31]/20 border border-slate-100 rounded-xl text-[11px] font-bold text-slate-600 hover:text-[#005a31] transition-all"
                  >
                    <span className="text-base leading-none">{c.flag}</span>
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* AI Prompts */}
            <div className="mt-8 bg-slate-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.04] pointer-events-none"><MessageSquare size={220} /></div>
              <div className="relative z-10">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 bg-amber-400/15 border border-amber-400/20 px-3 py-1.5 rounded-full mb-4">
                    <Sparkles size={12} className="text-amber-400" />
                    <span className="text-amber-400 font-black tracking-widest uppercase text-[9px]">AI Integration</span>
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-black text-white mb-3">Visa AI Prompt Library</h2>
                  <p className="text-slate-400 text-sm font-medium max-w-lg">Expert-engineered prompts for ChatGPT & Gemini. Copy, paste, and generate your visa story instantly.</p>
                </div>
                <div className="grid gap-4">
                  {aiPrompts.map((p) => (
                    <PromptBox 
                      key={p.id}
                      title={p.title}
                      tag={p.tag}
                      prompt={p.prompt} 
                      onCopy={() => handleCopy(p.prompt, p.id)}
                      isCopied={copyStatus === p.id}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTRIBUTE ── */}
      <section className="container mx-auto max-w-7xl px-6 py-16 border-t border-slate-100">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#005a31]/8 border border-[#005a31]/15 px-3 py-1.5 rounded-full">
              <Users size={12} className="text-[#005a31]" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#005a31]">Community Vault</span>
            </div>
            <h2 className="text-3xl font-black text-[#005a31] leading-tight uppercase tracking-tighter">Contribute to<br />the Vault</h2>
            <p className="text-slate-500 text-base leading-relaxed font-medium">
              Have a document template that helped secure a visa? Share it with 48,000+ travelers. Every contribution is verified and anonymized.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <ShieldCheck size={20} className="text-[#005a31] mb-2" />
                <h6 className="font-black text-sm uppercase mb-1">Admin Verified</h6>
                <p className="text-[10px] text-slate-400 leading-relaxed">Every file is reviewed before publishing.</p>
              </div>
              <div className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <CheckCircle size={20} className="text-amber-500 mb-2" />
                <h6 className="font-black text-sm uppercase mb-1">Anonymized</h6>
                <p className="text-[10px] text-slate-400 leading-relaxed">All personal data is stripped on upload.</p>
              </div>
            </div>
          </div>
          <div className="bg-white border-2 border-dashed border-slate-200 p-10 rounded-3xl flex flex-col items-center text-center group hover:border-amber-400/60 transition-all cursor-pointer">
            <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5 group-hover:bg-amber-50 group-hover:border-amber-200 transition-all">
              <PlusCircle size={28} className="text-slate-300 group-hover:text-amber-500 transition-all" />
            </div>
            <h4 className="text-xl font-black text-slate-800 mb-1">Upload a Resource</h4>
            <p className="text-slate-400 text-sm mb-6">PDF, DOCX, or XLSX · Max 10MB</p>
            <button className="bg-[#005a31] text-white px-8 py-3.5 rounded-xl font-black text-sm shadow-lg hover:bg-amber-400 hover:text-[#004d2c] transition-all active:scale-95">
              Select Document
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <footer className="bg-[#005a31] text-white py-20 text-center mx-6 mb-10 rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 pointer-events-none opacity-5" style={{backgroundImage:'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize:'60px 60px'}} />
        <div className="container mx-auto max-w-4xl px-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
            <BadgeCheck size={13} className="text-amber-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-white/70">Trusted by 48,000+ Travelers</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">Zero-Stress Visa<br />Documentation.</h2>
          <p className="text-green-200/60 text-base mb-10 font-medium">Talk to an expert or explore 300+ visa destinations on our platform.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="https://wa.me/8801631312524" className="bg-amber-400 text-[#004d2c] px-10 py-4 rounded-2xl font-black shadow-xl hover:bg-white transition-all flex items-center justify-center gap-2">
              Talk to an Expert <ArrowRight size={17} />
            </Link>
            <Link href="/visa" className="px-10 py-4 rounded-2xl font-black border-2 border-white/20 hover:bg-white/10 transition-all">
              Explore All Visas
            </Link>
          </div>

          {/* Footer SEO links */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {[
                { label: "Visa Checker", href: "/check-visa" },
                { label: "Processing Times", href: "/visa-processing-time" },
                { label: "Student Visa", href: "/visa/student-visa" },
                { label: "Scholarships", href: "/scholarship" },
                { label: "Document Generator", href: "/visa-resources/visa-document-generator" },
                { label: "Visa Checklist", href: "/visa-resources/visa-checklist-generator" },
              ].map(l => (
                <Link key={l.href} href={l.href} className="text-[11px] font-bold text-white/40 hover:text-white/80 transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// ── HELPER COMPONENTS ──

const DocCard = ({ icon, title, desc, format, size, href, downloads, badge }) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group overflow-hidden">
    <div className="p-6">
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-slate-50 text-[#005a31] rounded-xl flex items-center justify-center group-hover:bg-[#005a31] group-hover:text-white transition-all duration-300 border border-slate-100">
            {React.cloneElement(icon, { size: 22 })}
          </div>
          {badge && (
            <span className={`text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
              badge === 'Most Popular' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
              badge === 'New' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
              badge === 'Top Rated' ? 'bg-green-50 text-green-700 border border-green-200' :
              'bg-slate-50 text-slate-600 border border-slate-200'
            }`}>{badge}</span>
          )}
        </div>
        <div className="text-right">
          <span className="block text-[10px] font-black text-amber-600 uppercase tracking-widest">{format}</span>
          <span className="block text-[10px] font-bold text-slate-400 mt-0.5">{size}</span>
        </div>
      </div>

      <h3 className="text-lg font-black text-slate-800 mb-1.5 group-hover:text-[#005a31] transition-colors">{title}</h3>
      <p className="text-slate-500 text-xs leading-relaxed mb-4 font-medium">{desc}</p>

      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 mb-5">
        <Download size={11} className="text-slate-300" />
        {downloads} downloads
      </div>
    </div>

    <div className="px-6 pb-5">
      <Link
        href={href}
        className="w-full py-3 bg-slate-50 hover:bg-[#005a31] hover:text-white text-[#005a31] font-black rounded-xl transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-wider border border-slate-100 hover:border-[#005a31] active:scale-[0.98]"
      >
        <Download size={15} /> Download Free
      </Link>
    </div>
  </div>
);

const PromptBox = ({ title, tag, prompt, onCopy, isCopied }) => (
  <div className="bg-white/5 border border-white/8 p-6 rounded-2xl hover:border-amber-400/40 transition-all group">
    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
          <h4 className="font-black text-white text-sm tracking-tight">{title}</h4>
          <span className="text-[9px] font-black uppercase tracking-wider bg-white/10 text-slate-400 px-2 py-0.5 rounded-full">{tag}</span>
        </div>
        <p className="bg-black/25 p-4 rounded-xl text-slate-400 text-xs font-medium leading-relaxed italic border border-white/5 group-hover:text-slate-300 transition-colors">
          "{prompt}"
        </p>
      </div>
      <button 
        onClick={onCopy}
        className={`shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-[11px] uppercase tracking-wider transition-all ${
          isCopied ? "bg-green-500 text-white" : "bg-amber-400 text-[#004d2c] hover:bg-white hover:text-slate-900"
        }`}
      >
        {isCopied ? <><Check size={14} /> Copied!</> : <><Copy size={14} /> Copy</>}
      </button>
    </div>
  </div>
);

export default TravelResources;