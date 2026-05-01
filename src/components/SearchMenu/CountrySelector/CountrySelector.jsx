'use client';
import { useState, useRef, useEffect } from 'react';

export default function CountrySelector({ label, selected, exclude, countries, onSelect }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef(null);
  const searchRef = useRef(null);
  

  const filtered = countries.filter(c =>
    c.country.toLowerCase().includes(search.toLowerCase()) &&
    c.country.toLowerCase() !== exclude?.country?.toLowerCase()
  );

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => searchRef.current?.focus(), 80);
    else setSearch('');
  }, [open]);

  return (
    <div ref={ref} className="flex-1 min-w-0 relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl border text-left transition-all
          ${open
            ? 'border-purple-400 bg-white shadow-sm'
            : 'border-slate-100 bg-slate-50/70 hover:border-purple-300'
          }`}
      >
        <img
          src={selected?.flag}
          className="w-6 h-[15px] object-cover rounded-sm border border-slate-200 flex-shrink-0"
          alt=""
        />
        <div className="flex-1 min-w-0">
          <p className="text-[8px] font-black uppercase text-slate-400 leading-none mb-0.5">{label}</p>
          <p className="text-[13px] font-bold text-gray-800 truncate">{selected?.country}</p>
        </div>
        <span className={`text-slate-300 text-[10px] transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1.5 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden">
          {/* Search */}
          <div className="p-2 border-b border-gray-50">
            <input
              ref={searchRef}
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search country…"
              className="w-full px-3 py-1.5 text-[12px] font-semibold bg-slate-50 border border-slate-100 rounded-lg outline-none focus:border-purple-400 transition-colors"
            />
          </div>

          {/* List */}
          <div className="overflow-y-auto max-h-48">
            {filtered.length > 0 ? filtered.map(c => (
              <button
                key={c.code}
                type="button"
                onClick={() => { onSelect(c); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors border-b border-gray-50 last:border-none
                  ${selected?.code === c.code ? 'bg-purple-50' : 'hover:bg-purple-50'}`}
              >
                <img
                  src={c.flag}
                  className="w-5 h-[13px] object-cover rounded-sm border border-gray-100 flex-shrink-0"
                  alt=""
                />
                <span className={`text-[12.5px] font-bold ${selected?.code === c.code ? 'text-purple-700' : 'text-gray-600'}`}>
                  {c.country}
                </span>
              </button>
            )) : (
              <div className="px-4 py-3 text-[12px] text-gray-400 font-medium">No results</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}