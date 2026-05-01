"use client";

import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Globe,
  GraduationCap,
  Clock,
  FileText,
  BookOpen,
  ChevronRight as ChevronRightIcon,
  Search,
  XCircle,
} from 'lucide-react';

import { createSlug } from '@/app/lib/utils';
import CountrySelector from '../SearchMenu/CountrySelector/CountrySelector';

const TABS = [
  { id: 'visa',        label: 'Check Visa',    icon: Globe,        activeColor: 'text-yellow-600',  underline: 'bg-[#FED700]'  },
  { id: 'processing',  label: 'Processing',    icon: Clock,        activeColor: 'text-blue-700',    underline: 'bg-blue-500'   },
  { id: 'study',       label: 'Study Abroad',  icon: GraduationCap,activeColor: 'text-purple-700',  underline: 'bg-purple-500' },
  { id: 'templates',   label: 'Templates',     icon: FileText,     activeColor: 'text-green-700',   underline: 'bg-green-500'  },
  { id: 'scholarship', label: 'Scholarship',   icon: BookOpen,     activeColor: 'text-rose-600',    underline: 'bg-rose-500'   },
];

const iconAnimations = {
  visa:        { animate: { rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.2, 1.2, 1.1, 1.1, 1] }, transition: { duration: 0.6, ease: 'easeInOut' } },
  processing:  { animate: { x: [0, 6, -2, 0], y: [0, -5, -3, 0], rotate: [0, 8, 4, 0] },           transition: { duration: 0.55, ease: 'easeInOut' } },
  study:       { animate: { y: [0, -5, 0, -3, 0], scale: [1, 1.2, 1, 1.1, 1] },                    transition: { duration: 0.55, ease: 'easeOut'  } },
  templates:   { animate: { rotate: [0, -10, 12, -6, 0], scale: [1, 1.15, 1.1, 1.05, 1] },          transition: { duration: 0.6, ease: 'easeInOut' } },
  scholarship: { animate: { scale: [1, 1.3, 0.9, 1.2, 1], rotate: [0, 8, -5, 3, 0] },              transition: { duration: 0.55, ease: 'easeOut'  } },
};

const VISA_TYPES = [
  { label: 'Tourist',  href: '/tourist-visa',  color: 'text-blue-700' },
  { label: 'Student',  href: '/student-visa',  color: 'text-purple-700' },
  { label: 'Work',     href: '/work-visa',     color: 'text-green-700' },
  { label: 'Transit',  href: '/transit-visa',  color: 'text-orange-600' },
  { label: 'Business', href: '/business-visa', color: 'text-rose-600' },
  { label: 'Family',   href: '/family-visa',   color: 'text-indigo-600' },
];

const VISA_TYPES_CAT = [
  { value: "e-visa",             label: "E-Visa (Online)",           icon: "⚡" },
  { value: "sticker",            label: "Sticker Visa",              icon: "🏷️" },
  { value: "sticker-extended",   label: "Sticker (Complex Case)",    icon: "📋" },
  { value: "transit",            label: "Transit Visa",              icon: "🔁" },
];

const PROCESSING_COUNTRIES = [
  { name: 'Canada',        flag: 'https://flagcdn.com/w80/ca.png', time: '15–30 days' },
  { name: 'USA',           flag: 'https://flagcdn.com/w80/us.png', time: '3–5 weeks'  },
  { name: 'UK',            flag: 'https://flagcdn.com/w80/gb.png', time: '3 weeks'    },
  { name: 'Australia',     flag: 'https://flagcdn.com/w80/au.png', time: '4–6 weeks'  },
  { name: 'Schengen',      flag: 'https://flagcdn.com/w80/eu.png', time: '15 days'    },
  { name: 'Japan',         flag: 'https://flagcdn.com/w80/jp.png', time: '5–7 days'   },
  { name: 'UAE',           flag: 'https://flagcdn.com/w80/ae.png', time: '3–5 days'   },
  { name: 'New Zealand',   flag: 'https://flagcdn.com/w80/nz.png', time: '20–25 days' },
];

const TEMPLATES = [
  { icon: '📝', label: 'SOP Template',          href: '/visa-resources/visa-document-generator',       badge: 'Free',  color: 'bg-yellow-50 border-yellow-200 text-yellow-700' },
  { icon: '📄', label: 'NOC Letter Template',    href: '/visa-resources/visa-document-generator',       badge: 'Free',  color: 'bg-green-50 border-green-200 text-green-700' },
  { icon: '⚖️', label: 'Power of Attorney',      href: '/visa-resources/visa-document-generator',  badge: 'Free',  color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { icon: '📋', label: 'Visa Document Checklist',href: '/visa-resources/visa-checklist-generator',     badge: 'Free',  color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { icon: '💼', label: 'Cover Letter Template',  href: '/visa-resources/visa-document-generator',       badge: 'New',   color: 'bg-rose-50 border-rose-200 text-rose-700' },
  { icon: '🏦', label: 'Bank Statement Template',href: '/visa-resources/visa-document-generator',     badge: 'New',   color: 'bg-indigo-50 border-indigo-200 text-indigo-700' },
];

const SCHOLARSHIP_COUNTRIES = [
  { name: 'Canada',    flag: 'https://flagcdn.com/w80/ca.png', count: '120+ Scholarships' },
  { name: 'UK',        flag: 'https://flagcdn.com/w80/gb.png', count: '95+ Scholarships'  },
  { name: 'Australia', flag: 'https://flagcdn.com/w80/au.png', count: '80+ Scholarships'  },
  { name: 'USA',       flag: 'https://flagcdn.com/w80/us.png', count: '200+ Scholarships' },
];

export default function TravelMenu() {
  const [activeTab, setActiveTab]             = useState('visa');
  const [searchTerm, setSearchTerm]           = useState('');
  const [animatingTab, setAnimatingTab]       = useState('visa');
  const [countries, setCountries]             = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  // ✅ FIX 1: Replaced origin/destination strings with full country objects
  const [originCountry, setOriginCountry]           = useState(null);
  const [destinationCountry, setDestinationCountry] = useState(null);

  // For processing tab (still string-based selects)
  const [origin, setOrigin]           = useState('bangladesh');
  const [destination, setDestination] = useState('canada');
// Change default from empty string to first option
const [visaType, setVisaType] = useState("sticker");
  // ✅ FIX 2: Added missing dropdownOpen state
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const scrollRef = useRef(null);

  const [recentCountries, setRecentCountries] = useState(() => {
    try { return JSON.parse(localStorage.getItem('recentStudyCountries') || '[]'); }
    catch { return []; }
  });

  const addToRecent = (country) => {
    setRecentCountries(prev => {
      const updated = [country, ...prev.filter(c => c.code !== country.code)].slice(0, 5);
      localStorage.setItem('recentStudyCountries', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromRecent = (code) => {
    setRecentCountries(prev => {
      const updated = prev.filter(c => c.code !== code);
      localStorage.setItem('recentStudyCountries', JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    fetch('/api/countries')
      .then(res => res.json())
      .then(data => {
        setCountries(data);
        // ✅ FIX 3: Set default country objects once countries are loaded
        const defaultOrigin      = data.find(c => c.country.toLowerCase() === 'bangladesh') || data[0];
        const defaultDestination = data.find(c => c.country.toLowerCase() === 'canada')     || data[1];
        setOriginCountry(defaultOrigin);
        setDestinationCountry(defaultDestination);
        setLoadingCountries(false);
      })
      .catch(err => {
        console.error('Failed to load countries:', err);
        setLoadingCountries(false);
      });
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left'
        ? scrollLeft - clientWidth * 0.6
        : scrollLeft + clientWidth * 0.6;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setSearchTerm('');
    setDropdownOpen(false);
    setAnimatingTab(tabId);
    setTimeout(() => setAnimatingTab(null), 700);
  };

  const filteredStudyCountries = useMemo(() =>
    countries
      .filter(c => c.country.toLowerCase().includes(searchTerm.toLowerCase()))
      .slice(0, 5),
    [countries, searchTerm]
  );

  const btnHref = {
    visa:        `/visa/${createSlug(destinationCountry?.country || 'canada')}-to-${createSlug(originCountry?.country || 'bangladesh')}`,
    processing: `/visa-processing-time-tracker/${origin.replace(/\s+/g, "-")}-national-visa-processing-time-for-${destination.replace(/\s+/g, "-")}?type=${visaType}`,
    study:       `/visa/student-visa/${createSlug(destination)}`,
    templates:   '/visa-resources',
    scholarship: '/scholarship',
  }[activeTab] ?? '/';

  const btnLabel = {
    visa:        'Check Visa Now',
    processing:  'Track Processing',
    study:       'Explore Courses',
    templates:   'Download Templates',
    scholarship: 'Find Scholarships',
  }[activeTab] ?? 'Search';

  if (loadingCountries) {
    return (
      <div className="w-full max-w-7xl mx-auto p-4 flex justify-center items-center h-40">
        <span className="text-sm text-gray-400 font-bold animate-pulse">
          Loading countries...
        </span>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-4 font-sans relative pt-20 pb-26">

      {/* ── 1. FLOATING MENU BAR ── */}
      <div className="relative z-20 flex justify-center px-2">
        <div className="flex items-center bg-white border border-gray-100 shadow-xl rounded-2xl p-1 w-full sm:w-auto">

          <button onClick={() => scroll('left')} className="p-1.5 hover:bg-gray-50 rounded-xl shrink-0 sm:hidden">
            <ChevronLeft size={16} className="text-gray-400" />
          </button>

          <div
            ref={scrollRef}
            className="flex items-center overflow-x-auto no-scrollbar scroll-smooth flex-nowrap px-1"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {TABS.map((tab) => {
              const Icon     = tab.icon;
              const isActive = activeTab === tab.id;
              const anim     = iconAnimations[tab.id];

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className="flex-shrink-0 relative flex flex-col items-center px-4 sm:px-6 py-1.5 transition-all outline-none"
                >
                  <motion.div
                    animate={animatingTab === tab.id ? anim.animate : {}}
                    transition={animatingTab === tab.id ? anim.transition : {}}
                    className="mb-0.5"
                  >
                    <Icon size={18} className={isActive ? tab.activeColor : 'text-gray-400'} />
                  </motion.div>

                  <span className={`text-[10px] sm:text-[11px] font-extrabold whitespace-nowrap tracking-tight ${isActive ? tab.activeColor : 'text-gray-400'}`}>
                    {tab.label}
                  </span>

                  {isActive && (
                    <motion.div
                      layoutId="tabMarker"
                      className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full ${tab.underline}`}
                    />
                  )}
                </button>
              );
            })}
          </div>

          <button onClick={() => scroll('right')} className="p-1.5 hover:bg-gray-50 rounded-xl shrink-0 sm:hidden">
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>
      </div>

      {/* ── 2. MAIN CONTENT AREA ── */}
      <div className="bg-white rounded-[24px] shadow-2xl border border-gray-100 -mt-3 pt-6 pb-10 px-4 sm:px-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col items-center"
          >

            {/* ════════════════ VISA TAB ════════════════ */}
            {activeTab === 'visa' && (
              <div className="space-y-3 w-full">
                <h2 className="text-sm sm:text-lg font-black text-gray-800 text-center tracking-tight leading-none">
                  Check Your Visa Requirements
                </h2>

                <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 max-w-4xl mx-auto w-full">

                  <CountrySelector
                    label="Citizenship"
                    selected={originCountry}
                    exclude={destinationCountry}
                    countries={countries}
                    onSelect={(c) => setOriginCountry(c)}
                  />

                  <div className="hidden md:flex shrink-0 px-1">
                    <ChevronRightIcon size={14} className="text-slate-300" />
                  </div>

                  <CountrySelector
                    label="Destination"
                    selected={destinationCountry}
                    exclude={originCountry}
                    countries={countries}
                    onSelect={(c) => setDestinationCountry(c)}
                  />

                  <div className="md:w-40 bg-slate-50/70 px-3 py-2 rounded-xl border border-slate-100 text-left">
                    <p className="text-[8px] font-black uppercase text-yellow-600 leading-none mb-1">Visa Type</p>
                    <select className="bg-transparent text-[13px] font-bold outline-none w-full appearance-none text-yellow-700">
                      {VISA_TYPES.map(v => <option key={v.label}>{v.label}</option>)}
                    </select>
                  </div>

                </div>
              </div>
            )}

            {/* ════════════════ PROCESSING TAB ════════════════ */}
        {/* ════════════════ PROCESSING TAB ════════════════ */}
{activeTab === 'processing' && (
  <div className="space-y-3 w-full">
    <h2 className="text-sm sm:text-lg font-black text-gray-800 text-center tracking-tight leading-none">
      Visa Processing Time Tracker
    </h2>

    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 max-w-4xl mx-auto w-full">
      <div className="flex-1 min-w-0 bg-slate-50/70 px-3 py-1.5 rounded-xl border border-slate-100 flex items-center gap-3">
        <div className="w-7 h-[18px] rounded-sm overflow-hidden border border-slate-200 shrink-0">
          <img src={countries.find(c => c.country.toLowerCase() === origin)?.flag} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="flex-1 text-left">
          <label className="block text-[8px] font-black uppercase text-slate-400 leading-none mb-0.5">Your Passport</label>
          <select
            value={origin}
            onChange={e => setOrigin(e.target.value)}
            className="bg-transparent text-[13px] font-bold outline-none w-full appearance-none"
          >
            {countries.filter(c => c.country.toLowerCase() !== destination).map(c => (
              <option key={c.code} value={c.country.toLowerCase()}>{c.country}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="hidden md:flex shrink-0 px-1">
        <ChevronRightIcon size={14} className="text-slate-300" />
      </div>

      <div className="flex-1 min-w-0 bg-slate-50/70 px-3 py-1.5 rounded-xl border border-slate-100 flex items-center gap-3">
        <div className="w-7 h-[18px] rounded-sm overflow-hidden border border-slate-200 shrink-0">
          <img src={countries.find(c => c.country.toLowerCase() === destination)?.flag} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="flex-1 text-left">
          <label className="block text-[8px] font-black uppercase text-slate-400 leading-none mb-0.5">Destination</label>
          <select
            value={destination}
            onChange={e => setDestination(e.target.value)}
            className="bg-transparent text-[13px] font-bold outline-none w-full appearance-none"
          >
            {countries.filter(c => c.country.toLowerCase() !== origin).map(c => (
              <option key={c.code} value={c.country.toLowerCase()}>{c.country}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="md:w-40 bg-slate-50/70 px-3 py-1.5 rounded-xl border border-slate-100 text-left">
        <p className="text-[8px] font-black uppercase text-blue-700 leading-none mb-0.5">Visa Type</p>
        {/* ✅ wire up visaType state */}
        <select
          value={visaType}
          onChange={e => setVisaType(e.target.value)}
          className="bg-transparent text-[13px] font-bold outline-none w-full appearance-none text-blue-800"
        >
          {VISA_TYPES_CAT.map(v => (
            <option key={v.value} value={v.value}>{v.label}</option>
          ))}
        </select>
      </div>
    </div>

    {/* popular destinations unchanged */}
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Popular Destinations</p>
        <div className="h-[1px] flex-1 bg-slate-100 ml-4" />
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {PROCESSING_COUNTRIES.map(c => (
          <Link
            key={c.name}
            href={`/visa-processing-time-tracker/${origin.replace(/\s+/g, "-")}-national-visa-processing-time-for-${destination.replace(/\s+/g, "-")}?type=${visaType}`}
            className="group flex flex-col items-center gap-1 bg-white border border-gray-100 rounded-xl p-2 hover:border-blue-400 hover:shadow-sm transition-all"
          >
            <img src={c.flag} alt={c.name} className="w-8 h-5 object-cover rounded-sm" />
            <span className="text-[9px] font-black text-gray-700 text-center leading-tight">{c.name}</span>
            <span className="text-[8px] font-bold text-blue-600 text-center leading-tight">{c.time}</span>
          </Link>
        ))}
      </div>
    </div>
  </div>
)}

            {/* ════════════════ STUDY ABROAD TAB ════════════════ */}
            {activeTab === 'study' && (
              <div className="space-y-4 w-full">

                <div className="flex flex-col items-center gap-2 max-w-4xl mx-auto w-full relative">
                  <h2 className="text-sm sm:text-lg font-black text-gray-800 text-center tracking-tight leading-none">
                    Find Your Higher Study Destinations
                  </h2>

                  <div className="relative w-full max-w-2xl">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="text"
                      placeholder="Search your study destination…"
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      // ✅ FIX 2 applied: dropdownOpen state now exists
                      onFocus={() => searchTerm.length > 0 && setDropdownOpen(true)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[13px] font-bold outline-none focus:border-purple-400 transition-colors"
                    />

                    <AnimatePresence>
                      {searchTerm.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          className="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden"
                        >
                          {filteredStudyCountries.length > 0 ? filteredStudyCountries.map(c => (
                            <Link
                              key={c.code}
                              href={`/visa/student-visa/${createSlug(c.country)}`}
                              onClick={() => addToRecent(c)}
                              className="flex items-center gap-2.5 px-4 py-2 hover:bg-purple-50 transition-colors border-b border-gray-50 last:border-none"
                            >
                              <img
                                src={c.flag}
                                className="w-5 h-3.5 object-cover rounded-sm border border-gray-100 flex-shrink-0"
                                alt=""
                              />
                              <span className="text-[12.5px] font-bold text-gray-700">{c.country}</span>
                            </Link>
                          )) : (
                            <div className="px-4 py-3 text-[12px] text-gray-400 font-medium">No countries found</div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {recentCountries.length > 0 && (
                  <div className="w-full max-w-4xl mx-auto">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Recently Visited</p>
                      <div className="h-[1px] flex-1 bg-slate-100 ml-4" />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {recentCountries.map(c => (
                        <Link
                          key={c.code}
                          href={`/visa/student-visa/${createSlug(c.country)}`}
                          onClick={() => addToRecent(c)}
                          className="flex items-center gap-1.5 pl-1.5 pr-3 py-1 bg-white border border-gray-200 rounded-full hover:border-purple-400 hover:bg-purple-50 transition-all group"
                        >
                          <img
                            src={c.flag}
                            className="w-4.5 h-3 object-cover rounded-sm border border-gray-100 flex-shrink-0"
                            alt=""
                          />
                          <span className="text-[11.5px] font-bold text-gray-600 group-hover:text-purple-700">{c.country}</span>
                          <button
                            onClick={e => { e.preventDefault(); e.stopPropagation(); removeFromRecent(c.code); }}
                            className="ml-1 text-gray-300 hover:text-purple-400 text-[10px] leading-none"
                          >✕</button>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="w-full max-w-4xl mx-auto">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Top Destinations</p>
                    <div className="h-[1px] flex-1 bg-slate-100 ml-4" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {countries
                      .filter(c => ["Canada", "European Union", "United States", "Australia"].includes(c.country))
                      .map(c => (
                        <Link
                          key={c.code}
                          href={`/visa/student-visa/${createSlug(c.country)}`}
                          onClick={() => addToRecent(c)}
                          className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-purple-400 hover:shadow-md transition-all"
                        >
                          <div className="h-14 bg-gray-100 overflow-hidden">
                            <img
                              src={c.flag}
                              alt={c.country}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-1.5 text-center bg-white">
                            <p className="text-[10.5px] font-black text-gray-800 truncate">{c.country}</p>
                          </div>
                          <div className="absolute top-1 right-1 bg-purple-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase">Hot</div>
                        </Link>
                      ))}
                  </div>
                </div>

              </div>
            )}

            {/* ════════════════ TEMPLATES TAB ════════════════ */}
            {activeTab === 'templates' && (
              <div className="space-y-3 w-full">
                <h2 className="text-sm sm:text-lg font-black text-gray-800 text-center tracking-tight leading-none">
                  Free Visa Document Templates
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-w-4xl mx-auto w-full">
                  {TEMPLATES.map(t => (
                    <Link
                      key={t.label}
                      href={t.href}
                      className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl border bg-white hover:shadow-md transition-all duration-150 no-underline ${t.color}`}
                    >
                      <span className="text-xl flex-shrink-0">{t.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-black leading-tight truncate">{t.label}</p>
                      </div>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full bg-white/60 flex-shrink-0">
                        {t.badge}
                      </span>
                    </Link>
                  ))}
                </div>

                <p className="text-[11px] text-center text-gray-400 font-medium">
                  ✅ All templates are free to download and customise
                </p>
              </div>
            )}

            {/* ════════════════ SCHOLARSHIP TAB ════════════════ */}
            {activeTab === 'scholarship' && (
              <div className="space-y-3 w-full">
                <h2 className="text-sm sm:text-lg font-black text-gray-800 text-center tracking-tight leading-none">
                  Find Fully Funded Scholarships
                </h2>

                <div className="relative w-full max-w-2xl mx-auto">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  <input
                    type="text"
                    placeholder="Search scholarships by country…"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[13px] font-bold outline-none focus:border-rose-400 transition-colors"
                  />
                </div>

                <div className="w-full max-w-4xl mx-auto">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Top Countries</p>
                    <div className="h-[1px] flex-1 bg-slate-100 ml-4" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {SCHOLARSHIP_COUNTRIES.map(c => (
                      <Link
                        key={c.name}
                        href={`/scholarship/${createSlug(c.name)}`}
                        className="group relative bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-rose-400 hover:shadow-md transition-all"
                      >
                        <div className="h-16 bg-gray-100 overflow-hidden">
                          <img src={c.flag} alt={c.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="p-2 text-center bg-white">
                          <p className="text-[11px] font-black text-gray-800 truncate">{c.name}</p>
                          <p className="text-[9px] text-rose-500 font-bold">{c.count}</p>
                        </div>
                        <div className="absolute top-1 right-1 bg-[#FED700] text-black text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase">Hot</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* ── OVERLAPPING CTA BUTTON ── */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 flex justify-center w-full px-8">
          <Link
            href={btnHref}
            className="w-full sm:w-64 bg-[#FED700] hover:bg-[#e0c000] text-black py-3.5 rounded-xl font-black text-sm uppercase shadow-xl text-center active:scale-95 transition-all"
          >
            {btnLabel}
          </Link>
        </div>
      </div>

    </div>
  );
}