'use client'
import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

/* ─────────────────────────────────────────
   NAV DATA
───────────────────────────────────────── */
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
      { icon: '🇨🇦', label: 'Canada Scholarships',    href: '/scholarship/canada' },
      { icon: '🇬🇧', label: 'UK Scholarships',        href: '/scholarship/uk' },
      { icon: '🇦🇺', label: 'Australia Scholarships', href: '/scholarship/australia' },
      { icon: '🇺🇸', label: 'USA Scholarships',       href: '/scholarship/usa' },
      { icon: '🏆', label: 'Fully Funded List',       href: '/scholarship/fully-funded' },
    ],
  },
  { label: 'News', href: '/news' },
]

const MOBILE_LINKS = [
  { icon: '✅', label: 'Check Visa',          href: '/visa' },
  { icon: '⏱️', label: 'Processing Tracker', href: '/visa-processing-time' },
  { icon: '✈️', label: 'Tourist Visa',        href: '/visa/tourist-visa' },
  { icon: '🎓', label: 'Student Visa',        href: '/visa/student-visa' },
  { icon: '💼', label: 'Work Visa',           href: '/visa/work-visa' },
  { icon: '🔄', label: 'Transit Visa',        href: '/visa/transit-visa' },
  { icon: '📝', label: 'SOP Template',        href: '/sop-template' },
  { icon: '📄', label: 'NOC Letter',          href: '/noc-template' },
  { icon: '❌', label: 'Rejection Checker',   href: '/visa-rejection' },
  { icon: '🌍', label: 'Schengen Info',       href: '/schengen-visa' },
  { icon: '🏆', label: 'Scholarships',        href: '/scholarship' },
  { icon: '📰', label: 'News Feeds',          href: '/news' },
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
          after:h-[2.5px] after:bg-[#FED700] after:rounded-full
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
          after:h-[2.5px] after:bg-[#FED700] after:rounded-full
          after:transition-all after:duration-200
          hover:after:left-3 hover:after:right-3
          ${open ? 'bg-[#FFFBE6] text-[#b89a00]' : 'bg-transparent hover:bg-[#FFFBE6] hover:text-[#b89a00]'}
        `}
      >
        {item.label}
        <svg
          className={`w-3 h-3 text-[#FED700] transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
          <div className="flex items-center justify-around px-4 md:px-6 lg:px-8 h-[70px] lg:h-[78px] gap-2">

            {/* ── LOGO ── */}
            <Link
              href="/"
              className="flex items-center gap-2.5 no-underline flex-shrink-0 group"
            >
              <div className="flex flex-col leading-tight">
                <span className="text-[17px] font-black text-black tracking-tight">
                  Visa <span className="text-[#FED700]">Express </span>Hub
                </span>
                <span className="text-[10px] text-gray-400 font-medium tracking-wide hidden sm:block">
                  Visa Help, Anytime, Anywhere
                </span>
              </div>
            </Link>

            {/* ── DESKTOP NAV ── */}
            <nav className="hidden lg:flex items-center justify-center gap-0.5">
              {NAV_ITEMS.map((item, i) => (
                <DropdownItem key={i} item={item} />
              ))}
            </nav>

            {/* ── SEARCH ── */}
            <div className="hidden lg:block relative flex-shrink-0">
              <input
                type="text"
                placeholder="🔍  Search visa guides…"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                className={`
                  pl-4 pr-4 py-2.5 rounded-xl text-sm font-medium
                  border-2 bg-gray-50 text-gray-800 outline-none
                  transition-all duration-250 placeholder:text-gray-400
                  ${searchFocused
                    ? 'border-[#FED700] bg-white w-[230px] shadow-[0_0_0_3px_rgba(254,215,0,0.2)]'
                    : 'border-gray-200 w-[185px] hover:border-gray-300'
                  }
                `}
              />
            </div>

            {/* ── DESKTOP BUTTONS ── */}
            <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
              <Link
                href="/login"
                className="
                  px-5 py-2.5 text-sm font-bold text-black
                  border-2 border-black rounded-xl
                  transition-all duration-200 no-underline
                  hover:border-[#FED700] hover:bg-[#FFFBE6] hover:text-black
                "
              >Log in</Link>

              <Link
                href="/signup"
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
                Sign Up Free
                <span className="text-base">✈️</span>
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
            <div className="mb-4">
              <input
                type="text"
                placeholder="🔍  Search visa guides…"
                className="
                  w-full px-4 py-3 rounded-xl text-sm font-medium
                  border-2 border-gray-200 bg-white text-gray-800 outline-none
                  transition-all duration-200 placeholder:text-gray-400
                  focus:border-[#FED700] focus:shadow-[0_0_0_3px_rgba(254,215,0,0.18)]
                "
              />
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
                href="/login"
                className="
                  flex-1 py-3 text-sm font-bold text-center text-black
                  border-2 border-black rounded-xl no-underline
                  transition-all duration-180
                  hover:border-[#FED700] hover:bg-[#FFFBE6]
                "
              >Log in</Link>

              <Link
                href="/signup"
                className="
                  flex-1 py-3 text-sm font-extrabold text-center text-black
                  bg-[#FED700] border-2 border-[#FED700] rounded-xl no-underline
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