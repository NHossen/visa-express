'use client'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="w-full text-[#4b4b4b] font-sans pt-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ══════════════════════════════
            TOP SECTION — Brand + Trust
        ══════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-gray-100">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-5">

            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-3 no-underline group">
            
              <div className="flex flex-col leading-tight">
                <span className="text-[18px] font-black text-black tracking-tight">
                  Visa<span className="text-[#FED700]">Express</span>Hub
                </span>
                <span className="text-[10px] text-gray-400 font-medium tracking-wide">
                  Visa Help, Anytime, Anywhere
                </span>
              </div>
            </Link>

            {/* Tagline */}
            <h2 className="text-lg font-bold text-[#111111]">
              Visa Success Starts Here
            </h2>

            {/* Description */}
            <p className="text-[#696969] text-sm leading-relaxed max-w-sm">
              Visa Express Hub provides visa requirements, processing times, document checklists,
              and application guides for tourist, student, work, and transit visas across 195+
              countries. Track your visa processing time in real time, download free SOP
              templates, NOC letters, and visa application guides — all in one place.
              Free and always up to date.
            </p>

          {/* Social Icons */}
<div className="flex gap-3 pt-1">
  {[
    { href: 'https://www.facebook.com', label: 'Facebook', icon: 'f' },
    { href: 'https://www.youtube.com',  label: 'YouTube',  icon: '▶' },
    { href: 'https://www.linkedin.com', label: 'LinkedIn', icon: 'in' },
    { href: 'https://www.instagram.com',label: 'Instagram',icon: '📸' },
  ].map((s) => (
    <a
      key={s.label}
      href={s.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={s.label}
      className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 flex items-center justify-center text-sm font-bold transition-all duration-300 hover:bg-[#FFD700] hover:border-[#FFD700] hover:text-black hover:scale-110 hover:shadow-[0_8px_20px_rgba(255,215,0,0.3)]"
    >
      {s.icon}
    </a>
  ))}
</div>
          </div>

          {/* Trust Badges + Payments */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-10">

            {/* Certified */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
                Certified & Approved
              </h4>
              <div className="flex flex-wrap gap-5 items-center">
                <img
                  src="https://www.alliancealliance.com/wp-content/uploads/2018/03/IATA-icon.png"
                  alt="IATA Approved"
                  width={80} height={80}
                  className="object-contain grayscale hover:grayscale-0 transition-all duration-200"
                />
                <img
                  src="https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/product-categories/security-identity-compliance/compliance/approved/images/9f85a551-bd1b-4f4e-b831-b4e007d98a38.84c734e79f09168de3a939175a1d477caf47d179.png"
                  alt="Government Approved"
                  width={70} height={70}
                  className="object-contain grayscale hover:grayscale-0 transition-all duration-200"
                />
                <img
                  src="/Trustpilot_eammu_holidays.png"
                  alt="Trustpilot Verified"
                  width={90} height={90}
                  className="object-contain grayscale hover:grayscale-0 transition-all duration-200"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
                <img
                  src="/google_verfied_eammu_holidays.jpg"
                  alt="Google Verified"
                  width={90} height={90}
                  className="object-contain grayscale hover:grayscale-0 transition-all duration-200"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">
                We Accept
              </h4>
              <div className="flex flex-wrap gap-4 items-center">
                {[
                  { src: 'https://1000logos.net/wp-content/uploads/2021/11/VISA-logo.png',               alt: 'VISA',       w: 50 },
                  { src: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',      alt: 'Mastercard', w: 40 },
                  { src: 'https://www.logo.wine/a/logo/BKash/BKash-bKash-Logo.wine.svg',                alt: 'bKash',      w: 56 },
                  { src: 'https://miro.medium.com/v2/resize:fit:1400/1*1JMzKz_LENBDkVN83qyE0Q.png',    alt: 'Rocket',     w: 56 },
                ].map((pm) => (
                  <div
                    key={pm.alt}
                    className="h-10 px-3 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-center hover:border-[#FED700] transition-all duration-200"
                  >
                    <img
                      src={pm.src}
                      alt={pm.alt}
                      width={pm.w}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            MIDDLE — Nav Links
        ══════════════════════════════ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 py-14">

          {/* Column 1 — Visa Express Hub */}
          <div>
            <h3 className="text-[15px] font-bold text-black mb-4 pb-2 border-b-2 border-[#FED700] inline-block">
              Visa Express Hub
            </h3>
            <nav className="flex flex-col space-y-2.5 mt-3">
              {[
                { label: 'Check Visa Requirements',      href: '/visa' },
                { label: 'Visa Processing Time Tracker', href: '/visa-processing-time-tracker' },
                { label: 'Apply for a Visa',             href: '/visa/tourist-visa' },
                { label: 'Schengen Visa Information',    href: '/schengen-visa' },
                { label: 'Visa Rejection Checker',       href: '/visa-rejection' },
                { label: 'Scholarships',                 href: '/scholarship' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#696969] hover:text-[#111] hover:translate-x-1 transition-all duration-150 text-[14px] flex items-center gap-1.5 group no-underline"
                >
                  <span className="w-1 h-1 rounded-full bg-[#FED700] opacity-0 group-hover:opacity-100 transition-all duration-150 flex-shrink-0" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 2 — Useful Links */}
          <div>
            <h3 className="text-[15px] font-bold text-black mb-4 pb-2 border-b-2 border-[#FED700] inline-block">
              Useful Links
            </h3>
            <nav className="flex flex-col space-y-2.5 mt-3">
              {[
                { label: 'Template Generator (NOC, SOP)', href: '/visa-resources/visa-document-generator' },
                { label: 'Visa Document Checklist',        href: '/visa-resources/visa-checklist-generator' },
                { label: 'Privacy Policy',                 href: '/privacy-policy' },
                { label: 'Travel Resources',               href: '/visa-resources' },
                { label: 'News Feeds',                     href: '/news' },
                { label: 'Travel API',                     href: '/travel-api' },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[#696969] hover:text-[#111] hover:translate-x-1 transition-all duration-150 text-[14px] flex items-center gap-1.5 group no-underline"
                >
                  <span className="w-1 h-1 rounded-full bg-[#FED700] opacity-0 group-hover:opacity-100 transition-all duration-150 flex-shrink-0" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 3 — Social Media */}
          <div>
            <h3 className="text-[15px] font-bold text-black mb-4 pb-2 border-b-2 border-[#FED700] inline-block">
              Social Media
            </h3>
            <nav className="flex flex-col space-y-2.5 mt-3">
              {[
                { label: 'Facebook',  href: 'https://www.facebook.com',  color: 'text-blue-700' },
                { label: 'YouTube',   href: 'https://www.youtube.com',   color: 'text-red-600'  },
                { label: 'LinkedIn',  href: 'https://www.linkedin.com',  color: 'text-blue-800' },
                { label: 'Instagram', href: 'https://www.instagram.com', color: 'text-pink-600' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${s.color} hover:underline text-[14px] font-medium transition-all no-underline hover:translate-x-1 duration-150 flex items-center gap-2`}
                >
                  {s.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 4 — Newsletter */}
          <div>
            <h3 className="text-[15px] font-bold text-black mb-4 pb-2 border-b-2 border-[#FED700] inline-block">
              Newsletter
            </h3>
            <div className="flex flex-col gap-3 mt-3">
              {/* Email input + Go button */}
              <div className="flex border-2 border-gray-200 rounded-xl overflow-hidden focus-within:border-[#FED700] transition-all duration-200">
                <input
                  type="email"
                  placeholder="info@visaexpresshub.com"
                  className="flex-1 px-3 py-3 text-sm bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-400 min-w-0"
                />
                <button className="bg-[#FED700] text-black font-bold px-4 text-sm hover:bg-[#e0c000] transition-colors duration-200 flex-shrink-0">
                  Go
                </button>
              </div>

              {/* Log in / Sign Up */}
              <div className="flex gap-2">
                <Link
                  href="/login"
                  className="flex-1 text-center py-2.5 text-sm font-bold border-2 border-black text-black rounded-xl hover:bg-[#FED700] hover:border-[#FED700] transition-all duration-200 no-underline"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="flex-1 text-center py-2.5 text-sm font-bold bg-[#FED700] text-black rounded-xl border-2 border-[#FED700] hover:bg-[#e0c000] hover:border-[#e0c000] transition-all duration-200 no-underline shadow-[0_4px_14px_rgba(254,215,0,0.35)]"
                >
                  Sign Up
                </Link>
              </div>

              {/* Trust note */}
              <p className="text-[11px] text-gray-400 leading-relaxed">
                🔒 No spam. Unsubscribe anytime. Join 50k+ travelers getting weekly visa updates.
              </p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════
            BOTTOM — Copyright
        ══════════════════════════════ */}
        <div className="border-t border-gray-100 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#696969] text-center md:text-left">
            © {new Date().getFullYear()}{' '}
            <Link href="/" className="font-bold text-[#111] hover:text-[#FED700] transition-colors no-underline">
              Visa Express Hub
            </Link>
            . All rights reserved. | For informational purposes only.
          </p>

          <div className="flex flex-wrap gap-4 text-xs text-gray-400 justify-center">
            {[
              { label: 'Privacy Policy', href: '/privacy-policy' },
              { label: 'Terms of Use',   href: '/terms' },
              { label: 'Disclaimer',     href: '/disclaimer' },
              { label: 'Sitemap',        href: '/sitemap.xml' },
              { label: 'Contact',        href: '/contact' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-[#111] hover:underline transition-colors no-underline"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <p className="text-[#FED700] text-base font-bold tracking-tight italic">
            Visa Help, Anytime, Anywhere
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer