'use client'
import React, { useState, useRef, useEffect ,useCallback} from 'react'
import Link from 'next/link'
import Image from 'next/image';
/* ─────────────────────────────────────────
   NAV DATA
───────────────────────────────────────── */
// ── TOP SEARCHES (hardcoded popular pages) ──
const TOP_SEARCHES = [
  { title: 'Schengen Visa Guide',   url: '/schengen-visa',         icon: '🇪🇺', category: 'Visa Guide' },
  { title: 'UAE Tourist Visa',      url: '/visa/tourist-visa/uae', icon: '🇦🇪', category: 'Tourist Visa' },
  { title: 'UK Work Visa',          url: '/visa/work-visa/uk',     icon: '🇬🇧', category: 'Work Visa' },
  { title: 'Canada Student Visa',   url: '/visa/student-visa/canada', icon: '🇨🇦', category: 'Student Visa' },
  { title: 'Visa Checklist',        url: '/visa-resources/visa-checklist', icon: '✅', category: 'Resources' },
  { title: 'Visa Processing Tracker', url: '/visa-processing-time-tracker', icon: '⏱️', category: 'Tools' },
];

const NAV_ITEMS = [
  {
    label: 'Check Visa',
    dropdown: [
      { icon: '✈️', label: 'Tourist Visa',   href: '/visa/tourist-visa' },
      { icon: '🎓', label: 'Student Visa',   href: '/visa/student-visa' },
      { icon: '💼', label: 'Work Visa',      href: '/visa/work-visa' },
      { icon: '🔄', label: 'Transit Visa',   href: '/visa/transit-visa' },
      { icon: '🤝', label: 'Business Visa',  href: '/visa/business-visa' },
    ],
  },
  {
    label: 'Tools',
    dropdown: [
      { icon: '⏱️', label: 'Processing Time Tracker', href: '/visa-processing-time-tracker' },
      { icon: '📋', label: 'Visa Document Checklist',  href: '/visa-resources/visa-checklist-generator' },
      { icon: '📝', label: 'SOP Template Generator',   href: '/visa-resources/visa-document-generator' },
      { icon: '📄', label: 'NOC Letter Template',      href: '/visa-resources/visa-document-generator' },
      { icon: '❌', label: 'Visa Rejection Checker',   href: '/visa-rejection' },
    ],
  },
  { label: 'Schengen',     href: '/schengen-visa' },
  {
    label: 'Scholarships',
    dropdown: [
      { icon: '🇨🇦', label: 'Canada Scholarships',    href: '/scholarships/canada' },
      { icon: '🇬🇧', label: 'UK Scholarships',        href: '/scholarships/united-kingdom' },
      { icon: '🇦🇺', label: 'Australia Scholarships', href: '/scholarships/australia' },
      { icon: '🇺🇸', label: 'USA Scholarships',       href: '/scholarships/united-states' },
      { icon: '🏆', label: 'Fully Funded List',       href: '/scholarships' },
    ],
  },
  { label: 'News', href: '/visa-news' },
]

const MOBILE_LINKS = [
  { icon: '✅', label: 'Check Visa',          href: '/visa' },
  { icon: '⏱️', label: 'Processing Tracker', href: '/visa-processing-time-tracker' },
  { icon: '✈️', label: 'Tourist Visa',        href: '/visa/tourist-visa' },
  { icon: '🎓', label: 'Student Visa',        href: '/visa/student-visa' },
  { icon: '💼', label: 'Work Visa',           href: '/visa/work-visa' },
  { icon: '🔄', label: 'Transit Visa',        href: '/visa/transit-visa' },
  { icon: '📝', label: 'SOP Template',        href: '/visa-resources/visa-document-generator' },
  { icon: '📄', label: 'NOC Letter',          href: '/visa-resources/visa-document-generator' },
  { icon: '❌', label: 'Rejection Checker',   href: '/visa-rejection' },
  { icon: '🌍', label: 'Schengen Info',       href: '/schengen-visa' },
  { icon: '🏆', label: 'Scholarships',        href: '/scholarships' },
  { icon: '📰', label: 'News Feeds',          href: '/visa-news' },
]

const MARQUEE_ITEMS = [
  '🌍 Visa Guides for 195+ Countries',
  '📋 Free SOP & NOC Templates',
  '⏱️ Real-Time Processing Tracker',
  '🏆 Fully Funded Scholarship Guides',
  '✅ Free & Always Up to Date',
  '✈️ Tourist · Student · Work · Transit Visas',
]

/* ─────────────────────────────────────────
   DROPDOWN ITEM
───────────────────────────────────────── */
function DropdownItem({ item }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  /* plain link — no dropdown */
  if (!item.dropdown) {
    return (
      <Link
        href={item.href || '#'}
        className="
          relative px-4 py-2 rounded-xl text-sm font-semibold text-gray-800
          transition-all duration-200 hover:bg-[#FFFBE6] hover:text-[#b89a00]
          after:absolute after:bottom-1 after:left-1/2 after:right-1/2
          after:h-[2.5px] after:bg-amber-400 after:rounded-full
          after:transition-all after:duration-200
          hover:after:left-3 hover:after:right-3
        "
      >
        {item.label}
      </Link>
    )
  }

  /* with dropdown */
  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen(o => !o)}
        className={`
          relative flex items-center gap-1.5 px-4 py-2 rounded-xl
          text-sm font-semibold text-gray-800 border-none cursor-pointer
          transition-all duration-200
          after:absolute after:bottom-1 after:left-1/2 after:right-1/2
          after:h-[2.5px] after:bg-amber-400 after:rounded-full
          after:transition-all after:duration-200
          hover:after:left-3 hover:after:right-3
          ${open ? 'bg-[#FFFBE6] text-[#b89a00]' : 'bg-transparent hover:bg-[#FFFBE6] hover:text-[#b89a00]'}
        `}
      >
        {item.label}
        <svg
          className={`w-3 h-3 text-amber-400 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="currentColor" viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[9999]"
          style={{ animation: 'vehDropIn 0.2s cubic-bezier(.4,0,.2,1) both' }}
        >
          <div className="bg-white border border-[#FED700] border-t-[3px] border-t-[#FED700] rounded-2xl shadow-xl min-w-[250px] p-2">
            {item.dropdown.map((d, i) => (
              <Link
                key={i}
                href={d.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 no-underline transition-all duration-150 hover:bg-[#FFFBE6] hover:text-gray-900 hover:translate-x-1 group"
                style={{ animationDelay: `${i * 0.04}s`, animation: 'vehFadeSlide 0.18s ease both' }}
              >
                <span className="w-8 h-8 bg-[#FFFBE6] border border-[#FED700] rounded-lg flex items-center justify-center text-base flex-shrink-0 transition-all duration-150 group-hover:bg-[#FED700] group-hover:border-[#FED700]">
                  {d.icon}
                </span>
                {d.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────
   MAIN HEADER
───────────────────────────────────────── */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // ── SEARCH STATE (add alongside your existing state) ──
const [searchQuery, setSearchQuery]   = useState('');
const [searchOpen, setSearchOpen]     = useState(false);
const [searchIndex, setSearchIndex]   = useState([]);
const [searchResults, setSearchResults] = useState([]);
const searchRef = useRef(null);

// Add this new state for mobile dropdown
const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
// Add this new ref for mobile
const mobileSearchRef = useRef(null);

// ── RECENT SEARCHES STATE ──
const [recentSearches, setRecentSearches] = useState(() => {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem('visa_recent_searches') || '[]');
  } catch { return []; }
});

// ── SAVE TO RECENT ON CLICK ──
const handleResultClick = (item) => {
  setSearchOpen(false);
  setSearchQuery('');
  setSearchFocused(false);

  const updated = [item, ...recentSearches.filter(r => r.url !== item.url)].slice(0, 6);
  setRecentSearches(updated);
  localStorage.setItem('visa_recent_searches', JSON.stringify(updated));
};

// ── BUILD SEARCH INDEX ON MOUNT ──
useEffect(() => {
  let isMounted = true;
  async function buildIndex() {
    const index = [];

    // 1. Static pages
    const staticPages = [
      { title: 'Schengen Visa Guide',         url: '/schengen-visa',                        icon: '🇪🇺', category: 'Visa Guide' },
      { title: 'Scholarships',                url: '/scholarships',                          icon: '🎓', category: 'Scholarships' },
      { title: 'Visa News',                   url: '/visa-news',                             icon: '📰', category: 'News' },
      { title: 'Visa Processing Time Tracker',url: '/visa-processing-time-tracker',          icon: '⏱️', category: 'Tools' },
      { title: 'Visa Rejection Help',         url: '/visa-rejection',                        icon: '❌', category: 'Help' },
      { title: 'Visa Resources',              url: '/visa-resources',                        icon: '📚', category: 'Resources' },
      { title: 'Visa Checklist',              url: '/visa-resources/visa-checklist',         icon: '✅', category: 'Resources' },
      { title: 'Visa Checklist Generator',    url: '/visa-resources/visa-checklist-generator', icon: '🛠️', category: 'Tools' },
      { title: 'Visa Document Generator',     url: '/visa-resources/visa-document-generator',  icon: '📄', category: 'Tools' },
      { title: 'Tourist Visa',                url: '/visa/tourist-visa',                     icon: '🏖️', category: 'Visa Type' },
      { title: 'Student Visa',                url: '/visa/student-visa',                     icon: '🎓', category: 'Visa Type' },
      { title: 'Work Visa',                   url: '/visa/work-visa',                        icon: '💼', category: 'Visa Type' },
      { title: 'Business Visa',               url: '/visa/business-visa',                    icon: '🤝', category: 'Visa Type' },
      { title: 'Transit Visa',                url: '/visa/transit-visa',                     icon: '✈️', category: 'Visa Type' },
      { title: 'Dubai Residents Visa',        url: '/visa/dubai-residents',                  icon: '🇦🇪', category: 'Visa Type' },
      { title: 'India Visa',                  url: '/visa/india',                            icon: '🇮🇳', category: 'Country Visa' },
      { title: 'Nigeria Visa',                url: '/visa/nigeria',                          icon: '🇳🇬', category: 'Country Visa' },
      { title: 'Ghana Visa',                  url: '/visa/ghana',                            icon: '🇬🇭', category: 'Country Visa' },
      { title: 'Contact Us',                  url: '/contact',                               icon: '📞', category: 'Info' },
    ];
    index.push(...staticPages);

    // 2. Countries from MongoDB → multiple visa page types per country
    try {
      const res = await fetch('/api/countries');
      const countries = await res.json();
      for (const c of countries) {
        const slug = c.country?.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        const flag = c.flag || '🌍';
        const name = c.country;
        index.push(
          { title: `${name} Tourist Visa`,   url: `/visa/tourist-visa/${slug}`,     icon: flag, category: 'Tourist Visa' },
          { title: `${name} Student Visa`,   url: `/visa/student-visa/${slug}`,     icon: flag, category: 'Student Visa' },
          { title: `${name} Work Visa`,      url: `/visa/work-visa/${slug}`,        icon: flag, category: 'Work Visa' },
          { title: `${name} Business Visa`,  url: `/visa/business-visa/${slug}`,    icon: flag, category: 'Business Visa' },
          { title: `${name} Transit Visa`,   url: `/visa/transit-visa/${slug}`,     icon: flag, category: 'Transit Visa' },
          { title: `${name} Scholarship`,    url: `/scholarships/${slug}`,          icon: '🎓', category: 'Scholarship' },
        );
      }
    } catch (e) { console.error('Search index: countries fetch failed', e); }

    // 3. Scholarships from MongoDB
    try {
      const res = await fetch('/api/scholarships');
      const scholarships = await res.json();
      for (const s of scholarships) {
        if (s.scholarship_name && s.slug) {
          index.push({
            title:    s.scholarship_name,
            url:      `/scholarships/${s.slug}`,
            icon:     '🎓',
            category: 'Scholarship',
          });
        }
      }
       if (isMounted) {
        setSearchIndex(index); // ✅ safe now
      }
    } catch (e) { console.error('Search index: scholarships fetch failed', e); }

    setSearchIndex(index);
  }

  buildIndex();
}, []);

// ── SEARCH FILTER ──
useEffect(() => {
  if (!searchQuery || searchQuery.length < 2) {
    setSearchResults([]);
    return;
  }
  const q = searchQuery.toLowerCase();
  const results = searchIndex.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
  );
  setSearchResults(results);
}, [searchQuery, searchIndex]);

// ── CLOSE ON OUTSIDE CLICK ──// Add mobile to your outside-click handler (update the existing one)
useEffect(() => {
  function handleClick(e) {
    const outsideDesktop = searchRef.current && !searchRef.current.contains(e.target);
    const outsideMobile = mobileSearchRef.current && !mobileSearchRef.current.contains(e.target);
    if (outsideDesktop) { setSearchOpen(false); setSearchFocused(false); }
    if (outsideMobile) { setMobileSearchOpen(false); }
  }
  document.addEventListener('mousedown', handleClick);
  return () => document.removeEventListener('mousedown', handleClick);
}, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, []);

  


  return (
    <>
      <style>{`
        @keyframes vehDropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1);    }
        }
        @keyframes vehFadeSlide {
          from { opacity: 0; transform: translateX(-5px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        @keyframes vehMarquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes vehSlideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to   { opacity: 1; transform: translateY(0);     }
        }
        @keyframes vehPulse {
          0%,100% { box-shadow: 0 0 0 0   rgba(254,215,0,0.5); }
          50%      { box-shadow: 0 0 0 8px rgba(254,215,0,0);   }
        }
        .veh-signup { animation: vehPulse 2.2s infinite; }
        .veh-signup:hover { animation: none !important; }
        .veh-moblink:hover span.mob-icon {
          background: #FED700 !important;
          border-color: #FED700 !important;
        }
      `}</style>

      <header
        className={`sticky top-0 z-[100] w-full font-sans transition-shadow duration-300 ${
          scrolled ? 'shadow-md' : 'shadow-sm'
        }`}
        style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
      >

        {/* ══════════════════════════════
            TOP NOTICE BAR — FULL YELLOW
            Scrolling marquee, no buttons
        ══════════════════════════════ */}
        <div className="bg-[#FED700] overflow-hidden py-[7px]">
          <div
            className="flex w-max"
            style={{ animation: 'vehMarquee 30s linear infinite', gap: '64px' }}
          >
            {[...Array(2)].map((_, ri) => (
              <div key={ri} className="flex items-center gap-10 whitespace-nowrap">
                {MARQUEE_ITEMS.map((text, i) => (
                  <React.Fragment key={i}>
                    <span className="text-[12.5px] font-bold text-black tracking-wide">
                      {text}
                    </span>
                    {i < MARQUEE_ITEMS.length - 1 && (
                      <span className="text-black/25 text-[10px]">●</span>
                    )}
                  </React.Fragment>
                ))}
                <span className="text-black/25 text-[10px]">●</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════
            MAIN HEADER — WHITE
        ══════════════════════════════ */}
        <div
          className={`bg-white transition-all duration-300 ${
            scrolled ? 'border-b-2 border-[#FED700]' : 'border-b border-gray-100'
          }`}
        >
          <div className="flex items-center justify-around px-4 md:px-6 lg:px-8 h-[55px] lg:h-[70px] gap-2">

    
            {/* ── LOGO ── */}
<Link
  href="/"
  className="flex items-center gap-2.5 no-underline flex-shrink-0 group"
>
  {/* 
      1. added 'relative' so 'fill' knows where to stay.
      2. defined a width and height (e.g., w-40 h-10). 
  */}
  <div className="relative w-60 h-24 flex-shrink-0 mt-2">
    <Image
      src="/visa_express_hub_log.png"
      alt="Visa Express Hub Logo"
      fill
      priority
      sizes="(max-width: 768px) 100vw, 33vw"
      style={{
        objectFit: 'contain',
        objectPosition: 'left', // Forces the image to hug the left side
      }}
    />
  </div>
</Link>

            {/* ── DESKTOP NAV ── */}
            <nav className="hidden lg:flex items-center justify-center gap-0.5">
              {NAV_ITEMS.map((item, i) => (
                <DropdownItem key={i} item={item} />
              ))}
            </nav>

            {/* ── SEARCH ── */}
{/* ── SEARCH ── */}
<div className="hidden lg:block relative flex-shrink-0" ref={searchRef}>
  <input
    type="text"
    placeholder="🔍  Search visa guides…"
    value={searchQuery}
    onChange={(e) => {
      setSearchQuery(e.target.value);
      setSearchOpen(true);
    }}
    onFocus={() => {
      setSearchFocused(true);
      setSearchOpen(true);
    }}
    className={`
      pl-4 pr-4 py-2.5 rounded-xl text-sm font-medium
      border-2 bg-gray-50 text-gray-800 outline-none
      transition-all duration-250 placeholder:text-gray-400
      ${searchFocused
        ? 'border-[#FED700] bg-white w-[280px] shadow-[0_0_0_3px_rgba(254,215,0,0.2)]'
        : 'border-gray-200 w-[185px] hover:border-gray-300'
      }
    `}
  />

  {searchOpen && (
    <div className="absolute top-full mt-2 left-0 w-[360px] bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">

      {/* ── Empty state: Recent + Top Searches ── */}
      {searchQuery.length < 2 && (
        <>
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div>
              <div className="flex items-center justify-between px-4 pt-3 pb-1">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Recent</span>
                <button
                  onClick={() => { setRecentSearches([]); localStorage.removeItem('visa_recent_searches'); }}
                  className="text-[11px] text-gray-400 hover:text-red-400 transition-colors"
                >
                  Clear
                </button>
              </div>
              {recentSearches.slice(0, 4).map((item, i) => (
                <Link
                  key={i}
                  href={item.url}
                  onClick={() => handleResultClick(item)}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#FFFBEA] transition-colors group"
                >
                  <span className="text-gray-300 text-sm flex-shrink-0">🕐</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-700 group-hover:text-[#B8960C] truncate">{item.title}</div>
                    <div className="text-xs text-gray-400 truncate">{item.category}</div>
                  </div>
                </Link>
              ))}
              <div className="border-t border-gray-100 my-1" />
            </div>
          )}

          {/* Top Searches */}
          <div>
            <div className="px-4 pt-3 pb-1">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">🔥 Popular</span>
            </div>
            {TOP_SEARCHES.map((item, i) => (
              <Link
                key={i}
                href={item.url}
                onClick={() => handleResultClick(item)}
                className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#FFFBEA] transition-colors group"
              >
                <span className="text-xl flex-shrink-0 w-7 h-7 flex items-center justify-center">
                  {item.icon}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-700 group-hover:text-[#B8960C] truncate">{item.title}</div>
                  <div className="text-xs text-gray-400 truncate">{item.category}</div>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {/* ── Search Results ── */}
      {searchQuery.length >= 2 && searchResults.length > 0 && (
        <div className="max-h-[420px] overflow-y-auto divide-y divide-gray-50">
          {searchResults.slice(0, 10).map((result, i) => (
            <Link
              key={i}
              href={result.url}
              onClick={() => handleResultClick(result)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#FFFBEA] transition-colors group"
            >
              <span className="text-xl flex-shrink-0 w-7 h-7 flex items-center justify-center">
                {result.icon?.startsWith('http') ? (
                  <img
                    src={result.icon}
                    alt=""
                    className="w-6 h-6 object-contain rounded-sm"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  result.icon
                )}
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-800 group-hover:text-[#B8960C] truncate">
                  {result.title}
                </div>
                <div className="text-xs text-gray-400 truncate">{result.category}</div>
              </div>
            </Link>
          ))}
          {searchResults.length > 10 && (
            <div className="px-4 py-2 text-xs text-center text-gray-400 bg-gray-50 border-t border-gray-100">
              {searchResults.length - 10} more results — refine your search
            </div>
          )}
        </div>
      )}

      {/* ── No Results ── */}
      {searchQuery.length >= 2 && searchResults.length === 0 && (
        <div className="px-4 py-6 text-center">
          <div className="text-2xl mb-1">🔍</div>
          <div className="text-sm text-gray-500">No results for <strong>&quot;{searchQuery}&quot;</strong></div>
        </div>
      )}

    </div>
  )}
</div>

            {/* ── DESKTOP BUTTONS ── */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <Link
                href="/auth"
                className="
                  px-5 py-2.5 text-sm font-bold text-black
                  border-2 border-black rounded-xl
                  transition-all duration-200 no-underline
                  hover:border-[#FED700] hover:bg-[#FFFBE6] hover:text-black
                "
              >Log in</Link>

              <Link
                href="/auth"
                className="veh-signup
                  px-5 py-2.5 text-sm font-extrabold text-black
                  bg-[#FED700] border-2 border-[#FED700] rounded-xl
                  no-underline flex items-center gap-1.5
                  transition-all duration-200
                  hover:bg-[#e0be00] hover:border-[#e0be00]
                  hover:translate-y-[-2px] hover:scale-[1.03]
                  hover:shadow-[0_8px_24px_rgba(254,215,0,0.45)]
                  active:scale-[0.98]
                "
              >
                Sign Up

              </Link>
            </div>

            {/* ── HAMBURGER ── */}
            <button
              onClick={() => setMobileOpen(o => !o)}
              className={`
                lg:hidden flex flex-col gap-[5px] w-10 h-10
                items-center justify-center rounded-xl
                border-2 transition-all duration-200 cursor-pointer
                ${mobileOpen
                  ? 'bg-[#FFFBE6] border-[#FED700]'
                  : 'bg-white border-gray-200 hover:border-[#FED700] hover:bg-[#FFFBE6]'
                }
              `}
            >
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="block rounded-sm transition-all duration-250"
                  style={{
                    width: 18, height: 2.5,
                    background: mobileOpen ? '#FED700' : '#111',
                    transform: mobileOpen
                      ? i === 0 ? 'translateY(7.5px) rotate(45deg)'
                      : i === 1 ? 'scaleX(0)'
                      : 'translateY(-7.5px) rotate(-45deg)'
                      : 'none',
                    opacity: (mobileOpen && i === 1) ? 0 : 1,
                  }}
                />
              ))}
            </button>

          </div>
        </div>

        {/* ══════════════════════════════
            MOBILE MENU DRAWER
        ══════════════════════════════ */}
        {mobileOpen && (
          <div
            className="lg:hidden bg-gray-50 border-t-[3px] border-[#FED700] px-4 pt-4 pb-5 max-h-[82vh] overflow-y-auto"
            style={{ animation: 'vehSlideDown 0.22s cubic-bezier(.4,0,.2,1) both' }}
          >

            {/* Mobile Search */}
<div className="mb-4 relative" ref={mobileSearchRef}>
  <input
    type="text"
    placeholder="🔍  Search visa guides…"
    value={searchQuery}
    onChange={(e) => {
      setSearchQuery(e.target.value);
      setMobileSearchOpen(true);
    }}
    onFocus={() => setMobileSearchOpen(true)}
    className="
      w-full px-4 py-3 rounded-xl text-sm font-medium
      border-2 border-gray-200 bg-white text-gray-800 outline-none
      transition-all duration-200 placeholder:text-gray-400
      focus:border-[#FED700] focus:shadow-[0_0_0_3px_rgba(254,215,0,0.18)]
    "
  />

  {mobileSearchOpen && (
    <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">

      {/* Empty state: Recent + Popular */}
      {searchQuery.length < 2 && (
        <>
          {recentSearches.length > 0 && (
            <div>
              <div className="flex items-center justify-between px-4 pt-3 pb-1">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">Recent</span>
                <button
                  onClick={() => { setRecentSearches([]); localStorage.removeItem('visa_recent_searches'); }}
                  className="text-[11px] text-gray-400 hover:text-red-400 transition-colors"
                >
                  Clear
                </button>
              </div>
              {recentSearches.slice(0, 4).map((item, i) => (
                <Link
                  key={i}
                  href={item.url}
                  onClick={() => { handleResultClick(item); setMobileSearchOpen(false); }}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#FFFBEA] transition-colors group"
                >
                  <span className="text-gray-300 text-sm flex-shrink-0">🕐</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-700 group-hover:text-[#B8960C] truncate">{item.title}</div>
                    <div className="text-xs text-gray-400 truncate">{item.category}</div>
                  </div>
                </Link>
              ))}
              <div className="border-t border-gray-100 my-1" />
            </div>
          )}

          <div>
            <div className="px-4 pt-3 pb-1">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">🔥 Popular</span>
            </div>
            <div className="max-h-[260px] overflow-y-auto">
              {TOP_SEARCHES.map((item, i) => (
                <Link
                  key={i}
                  href={item.url}
                  onClick={() => { handleResultClick(item); setMobileSearchOpen(false); }}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#FFFBEA] transition-colors group"
                >
                  <span className="text-xl flex-shrink-0 w-7 h-7 flex items-center justify-center">{item.icon}</span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-gray-700 group-hover:text-[#B8960C] truncate">{item.title}</div>
                    <div className="text-xs text-gray-400 truncate">{item.category}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Search Results */}
      {searchQuery.length >= 2 && searchResults.length > 0 && (
        <div className="max-h-[320px] overflow-y-auto divide-y divide-gray-50">
          {searchResults.slice(0, 10).map((result, i) => (
            <Link
              key={i}
              href={result.url}
              onClick={() => { handleResultClick(result); setMobileSearchOpen(false); }}
              className="flex items-center gap-3 px-4 py-3 hover:bg-[#FFFBEA] transition-colors group"
            >
              <span className="text-xl flex-shrink-0 w-7 h-7 flex items-center justify-center">
                {result.icon?.startsWith('http') ? (
                  <img src={result.icon} alt="" className="w-6 h-6 object-contain rounded-sm" onError={(e) => { e.target.style.display = 'none'; }} />
                ) : result.icon}
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-800 group-hover:text-[#B8960C] truncate">{result.title}</div>
                <div className="text-xs text-gray-400 truncate">{result.category}</div>
              </div>
            </Link>
          ))}
          {searchResults.length > 10 && (
            <div className="px-4 py-2 text-xs text-center text-gray-400 bg-gray-50 border-t border-gray-100">
              {searchResults.length - 10} more results — refine your search
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {searchQuery.length >= 2 && searchResults.length === 0 && (
        <div className="px-4 py-6 text-center">
          <div className="text-2xl mb-1">🔍</div>
          <div className="text-sm text-gray-500">No results for <strong>&quot;{searchQuery}&quot;</strong></div>
        </div>
      )}

    </div>
  )}
</div>

            {/* Mobile Links Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {MOBILE_LINKS.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="veh-moblink flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 border-gray-100 bg-white text-gray-800 text-[12.5px] font-semibold no-underline transition-all duration-180 hover:border-[#FED700] hover:bg-[#FFFBE6] hover:translate-x-1"
                  style={{ animation: `vehFadeSlide 0.18s ${i * 0.03}s ease both` }}
                >
                  <span
                    className="mob-icon w-7 h-7 bg-[#FFFBE6] border border-[#FED700] rounded-lg flex items-center justify-center text-sm flex-shrink-0 transition-all duration-150"
                  >{link.icon}</span>
                  <span className="leading-tight">{link.label}</span>
                </Link>
              ))}
            </div>

            {/* Mobile CTA Buttons */}
            <div className="flex gap-3 pt-3 border-t border-gray-100">
              <Link
                href="/auth"
                className="
                  flex-1 py-3 text-sm font-bold text-center text-black
                  border-2 border-amber-400 rounded-xl no-underline
                  transition-all duration-180
                  hover:border-amber-400 hover:bg-[#FFFBE6]
                "
              >Log in</Link>

              <Link
                href="/auth"
                className="
                  flex-1 py-3 text-sm font-extrabold text-center text-black
                  bg-amber-400 border-2 border-[#FED700] rounded-xl no-underline
                  flex items-center justify-center gap-1.5
                  transition-all duration-180
                  hover:bg-[#e0be00] hover:border-[#e0be00]
                  shadow-[0_4px_16px_rgba(254,215,0,0.3)]
                "
              >Sign Up Free ✈️</Link>
            </div>

          </div>
        )}

      </header>
    </>
  )
}