"use client";
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

const TOP_COUNTRIES = [
  { name: "United States", code: "us" },
  { name: "United Kingdom", code: "gb" },
  { name: "Canada", code: "ca" },
  { name: "Australia", code: "au" },
  { name: "Germany", code: "de" },
  { name: "Turkey", code: "tr" },
];

export default function ScholarshipSearch() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    fetch('/api/countries')
      .then(r => r.json())
      .then(d => setCountries(Array.isArray(d) ? d : []));
  }, []);

  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const slug = (name) => name?.toLowerCase().replace(/\s+/g, '-') || '';
  const getFlag = (name) => countries.find(c => c.country.toLowerCase() === name.toLowerCase());

  const results = query.length > 1
    ? countries.filter(c => c.country.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
    : [];

  return (
    <section className="w-full bg-white py-20 px-6">
      <div className="max-w-2xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight mb-3">
            Find Your <span className="text-blue-600">Scholarship</span>
          </h2>
          <p className="text-gray-400 font-medium text-base">
            850+ fully funded programs across 260+ countries
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative" ref={ref}>
          <div className={`flex items-center bg-white rounded-2xl border-2 transition-all duration-200 ${open && query ? 'border-blue-500 shadow-xl shadow-blue-100/40' : 'border-gray-200 shadow-lg shadow-gray-100/50'}`}>
            <span className="pl-5 text-xl text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search a country..."
              value={query}
              onChange={e => { setQuery(e.target.value); setOpen(true); }}
              onFocus={() => setOpen(true)}
              className="flex-1 px-4 py-4 bg-transparent outline-none text-gray-800 font-bold text-base placeholder:text-gray-300 placeholder:font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="pr-3 text-gray-300 hover:text-gray-500 text-lg transition"
              >
                ✕
              </button>
            )}
            <Link
              href={results[0] ? `/scholarships/${slug(results[0].country)}` : '/scholarships'}
              className="m-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white px-5 py-3 rounded-xl font-black text-sm transition-all"
            >
              Search
            </Link>
          </div>

          {/* Dropdown */}
          <AnimatePresence>
            {open && query.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.12 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-gray-100 shadow-2xl overflow-hidden z-50"
              >
                {results.length > 0 ? results.map(c => (
                  <Link
                    key={c.code}
                    href={`/scholarships/${slug(c.country)}`}
                    onClick={() => { setOpen(false); setQuery(''); }}
                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-blue-50 transition group"
                  >
                    <img src={c.flag} className="w-9 h-6 object-cover rounded-md shadow-sm" alt="" />
                    <span className="font-bold text-gray-700 text-sm group-hover:text-blue-600 transition">{c.country}</span>
                    <span className="ml-auto text-gray-300 group-hover:text-blue-400 text-sm transition">→</span>
                  </Link>
                )) : (
                  <div className="px-5 py-8 text-center text-gray-400 text-sm font-bold">
                    No results —{' '}
                    <Link href="/scholarships" className="text-blue-600 underline">browse all countries</Link>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Popular Destinations */}
        <div className="mt-10">
          <p className="text-[11px] font-black text-gray-300 uppercase tracking-[0.25em] text-center mb-5">
            Popular Destinations
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {TOP_COUNTRIES.map(dest => {
              const data = getFlag(dest.name);
              return (
                <Link
                  key={dest.code}
                  href={`/scholarships/${slug(dest.name)}`}
                  title={`${dest.name} Scholarships`}
                  className="flex items-center gap-2.5 bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 px-4 py-2.5 rounded-full transition-all group"
                >
                  {data && (
                    <img src={data.flag} className="w-6 h-4 object-cover rounded shadow-sm" alt="" />
                  )}
                  <span className="text-sm font-black text-gray-600 group-hover:text-blue-600 transition">
                    {dest.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}