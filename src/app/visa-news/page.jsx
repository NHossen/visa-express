// app/visa-news/page.jsx
import Link from 'next/link';

/* ─── SEO METADATA ────────────────────────────────────────── */
export const metadata = {
  title: 'Visa News 2026 | Latest Immigration Updates & Policy Changes | Visa Express Hub',
  description:
    'Stay ahead with the latest visa news, immigration policy changes, processing time updates and work permit alerts for UAE residents in 2026. Expert analysis from Dubai.',
  keywords:
    'visa news 2026, immigration news UAE, work visa updates, schengen news, uk visa changes, canada immigration 2026, australia visa news, dubai visa consultant',
  alternates: { canonical: 'https://www.visaexpresshub.ae/visa-news' },
  openGraph: {
    title: 'Visa News 2026 | Immigration Updates | Visa Express Hub',
    description: 'Latest visa policy changes, processing updates and immigration alerts for UAE residents. Expert coverage from Dubai.',
    url: 'https://www.visaexpresshub.ae/visa-news',
    siteName: 'Visa Express Hub',
    images: [{ url: 'https://www.visaexpresshub.ae/og/visa-news.jpg', width: 1200, height: 630 }],
    locale: 'en_AE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visa News 2026 | Visa Express Hub',
    description: 'Latest immigration updates and visa policy changes for UAE residents.',
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' } },
};

/* ─── JSON-LD ─────────────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Visa News Hub — Visa Express Hub',
  description: 'Latest visa news, immigration policy changes and processing updates for UAE residents.',
  url: 'https://www.visaexpresshub.ae/visa-news',
  publisher: {
    '@type': 'Organization',
    name: 'Visa Express Hub',
    url: 'https://www.visaexpresshub.ae',
    logo: { '@type': 'ImageObject', url: 'https://www.visaexpresshub.ae/logo.png' },
  },
};

/* ─── ALL POSTS DATA ──────────────────────────────────────── */
export const VISA_NEWS = [
  {
    id: 1,
    slug: 'uk-skilled-worker-salary-increase-2026',
    title: 'UK Skilled Worker Salary Threshold Rises to £38,700 in 2026',
    excerpt:
      'The UK Home Office has implemented a major salary hike for Skilled Worker visa applicants. We break down who is affected, which sectors are exempt, and what UAE-based applicants must do now to protect their sponsorship.',
    category: 'Policy Alert',
    categoryColor: '#dc2626',
    date: 'May 2, 2026',
    dateISO: '2026-05-02',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070',
    readTime: '5',
    country: 'United Kingdom',
    countryCode: 'gb',
    flag: 'https://flagcdn.com/w40/gb.png',
    tags: ['UK Visa', 'Work Permit', 'Salary Threshold', 'Sponsorship'],
    featured: true,
  },
  {
    id: 2,
    slug: 'schengen-digital-nomad-visa-eu-2026',
    title: 'EU Approves Unified Digital Nomad Visa for All 27 Schengen Nations',
    excerpt:
      'Remote workers can now apply for a single 1-year permit valid across the entire Schengen Area. Full eligibility requirements, income thresholds, and how UAE residents can apply from Dubai.',
    category: 'New Visa Type',
    categoryColor: '#0d9488',
    date: 'April 28, 2026',
    dateISO: '2026-04-28',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070',
    readTime: '4',
    country: 'European Union',
    countryCode: 'eu',
    flag: 'https://flagcdn.com/w40/eu.png',
    tags: ['Schengen Visa', 'Digital Nomad', 'Remote Work', 'EU Policy'],
    featured: true,
  },
  {
    id: 3,
    slug: 'canada-express-entry-healthcare-draw-2026',
    title: 'Canada Targets 5,000 Healthcare Workers in Largest Express Entry Draw of 2026',
    excerpt:
      'IRCC launches a category-based selection round prioritising nurses, specialists and allied health workers. CRS cut-off scores, provincial pathways and how to boost your profile explained.',
    category: 'Work Permit',
    categoryColor: '#b91c1c',
    date: 'April 25, 2026',
    dateISO: '2026-04-25',
    image: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1974',
    readTime: '6',
    country: 'Canada',
    countryCode: 'ca',
    flag: 'https://flagcdn.com/w40/ca.png',
    tags: ['Canada PR', 'Express Entry', 'Healthcare', 'IRCC'],
    featured: false,
  },
  {
    id: 4,
    slug: 'australia-482-visa-processing-time-2026',
    title: 'Australia Cuts Subclass 482 Processing Time to 21 Days for Priority Sectors',
    excerpt:
      'The Department of Home Affairs fast-tracks skilled migration for IT, Engineering and Nursing applicants. New priority assessment stream, employer obligations and nomination caps explained.',
    category: 'Speed Update',
    categoryColor: '#0891b2',
    date: 'April 22, 2026',
    dateISO: '2026-04-22',
    image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2130',
    readTime: '5',
    country: 'Australia',
    countryCode: 'au',
    flag: 'https://flagcdn.com/w40/au.png',
    tags: ['Australia Work Visa', '482 Visa', 'TSS Visa', 'Processing Time'],
    featured: false,
  },
  {
    id: 5,
    slug: 'uae-golden-visa-criteria-expanded-2026',
    title: 'UAE Expands Golden Visa Eligibility to Include Freelancers and Content Creators',
    excerpt:
      'The UAE government has broadened the 10-year Golden Visa criteria, adding freelance professionals and social media influencers with a minimum follower threshold. Full criteria, document list and process from inside the UAE.',
    category: 'Residency',
    categoryColor: '#d97706',
    date: 'April 18, 2026',
    dateISO: '2026-04-18',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070',
    readTime: '7',
    country: 'UAE',
    countryCode: 'ae',
    flag: 'https://flagcdn.com/w40/ae.png',
    tags: ['UAE Golden Visa', 'Residency', 'Freelancer Visa', 'UAE 2026'],
    featured: true,
  },
  {
    id: 6,
    slug: 'germany-opportunity-card-launch-2026',
    title: "Germany's Opportunity Card (Chancenkarte) Is Now Accepting Applications Worldwide",
    excerpt:
      'Germany launches its points-based Chancenkarte, allowing skilled workers to move to Germany for job searching without a prior offer. Who qualifies, how points are calculated, and the application process from UAE.',
    category: 'New Visa Type',
    categoryColor: '#0d9488',
    date: 'April 14, 2026',
    dateISO: '2026-04-14',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070',
    readTime: '6',
    country: 'Germany',
    countryCode: 'de',
    flag: 'https://flagcdn.com/w40/de.png',
    tags: ['Germany Work Visa', 'Chancenkarte', 'Opportunity Card', 'EU Immigration'],
    featured: false,
  },
  {
    id: 7,
    slug: 'usa-h1b-visa-lottery-2026-results',
    title: 'USA H-1B Visa Lottery 2026: Registration Results, Cap Numbers and What to Do If Not Selected',
    excerpt:
      "USCIS confirms 780,000 registrations for 65,000 cap-subject H-1B slots. Selection ratios, cap-exempt employers, and five legal alternatives for UAE professionals who missed this year's lottery.",
    category: 'Work Permit',
    categoryColor: '#b91c1c',
    date: 'April 10, 2026',
    dateISO: '2026-04-10',
    image: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2099',
    readTime: '8',
    country: 'USA',
    countryCode: 'us',
    flag: 'https://flagcdn.com/w40/us.png',
    tags: ['H-1B Visa', 'USA Work Visa', 'USCIS', 'US Immigration 2026'],
    featured: false,
  },
  {
    id: 8,
    slug: 'schengen-visa-fee-increase-2026',
    title: 'Schengen Visa Fee Rises to €90: What UAE Applicants Need to Know',
    excerpt:
      'The European Commission raised the short-stay Schengen visa fee for the first time since 2014. New fee table by applicant category, refund policy, and whether paying more means faster processing.',
    category: 'Fee Change',
    categoryColor: '#7c3aed',
    date: 'April 5, 2026',
    dateISO: '2026-04-05',
    image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020',
    readTime: '4',
    country: 'Schengen Area',
    countryCode: 'eu',
    flag: 'https://flagcdn.com/w40/eu.png',
    tags: ['Schengen Visa', 'Visa Fee', 'Europe Visa UAE', 'EU Policy 2026'],
    featured: false,
  },
];

/* ─── CATEGORY BADGE ──────────────────────────────────────── */
function CategoryBadge({ category, color, small = false }) {
  return (
    <span
      className={`inline-flex items-center font-black uppercase tracking-widest rounded-full ${small ? 'text-[9px] px-2.5 py-1' : 'text-[10px] px-3.5 py-1.5'}`}
      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
    >
      {category}
    </span>
  );
}

/* ─── HERO CARD ───────────────────────────────────────────── */
function HeroCard({ post }) {
  return (
    <Link href={`/visa-news/${post.slug}`} className="group block">
      <div className="relative rounded-[2.5rem] overflow-hidden h-[560px] shadow-2xl">
        <img
          src={post.image}
          className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-[1200ms] ease-out"
          alt={post.title}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        {/* Top strip */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
          <CategoryBadge category={post.category} color={post.categoryColor} />
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5">
            <img src={post.flag} width={20} height={14} className="object-contain rounded" alt={post.country} />
            <span className="text-white text-[10px] font-black uppercase tracking-wider">{post.country}</span>
          </div>
        </div>

        {/* Bottom content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-white/50 text-xs font-bold uppercase tracking-widest">{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-white/30" />
            <span className="text-white/50 text-xs font-bold uppercase">{post.readTime} min read</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.05] tracking-tight mb-4 group-hover:text-amber-400 transition-colors duration-300 max-w-4xl">
            {post.title}
          </h2>
          <p className="text-white/70 text-base font-medium max-w-2xl line-clamp-2 leading-relaxed border-l-4 border-amber-400 pl-5">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap gap-2 mt-5">
            {post.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[10px] font-bold text-white/60 bg-white/10 border border-white/15 rounded-full px-3 py-1">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── FEATURED ROW CARD ───────────────────────────────────── */
function FeaturedCard({ post }) {
  return (
    <Link href={`/visa-news/${post.slug}`} className="group relative block rounded-3xl overflow-hidden shadow-lg h-72">
      <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div className="absolute top-4 left-4">
        <CategoryBadge category={post.category} color={post.categoryColor} small />
      </div>
      <div className="absolute bottom-0 p-5">
        <h3 className="text-white font-black text-lg leading-tight tracking-tight group-hover:text-amber-400 transition-colors line-clamp-2 mb-2">
          {post.title}
        </h3>
        <div className="flex items-center gap-2">
          <img src={post.flag} width={16} height={11} className="object-contain rounded" alt="" />
          <span className="text-white/50 text-[10px] font-bold uppercase">{post.date}</span>
        </div>
      </div>
    </Link>
  );
}

/* ─── LIST ARTICLE CARD ───────────────────────────────────── */
function ArticleCard({ post }) {
  return (
    <article
      className="group flex flex-col sm:flex-row gap-6 items-start py-8 border-b border-slate-100 last:border-0"
      itemScope itemType="https://schema.org/NewsArticle"
    >
      <meta itemProp="datePublished" content={post.dateISO} />
      <meta itemProp="author" content="Visa Express Hub Editorial" />

      <Link href={`/visa-news/${post.slug}`} className="w-full sm:w-56 h-40 shrink-0 rounded-2xl overflow-hidden shadow-sm border border-slate-100 block">
        <img
          src={post.image}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          alt={post.title}
          itemProp="image"
          loading="lazy"
        />
      </Link>

      <div className="flex-1 min-w-0 space-y-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          <img src={post.flag} width={18} height={13} className="object-contain rounded shadow-sm" alt={post.country} />
          <CategoryBadge category={post.category} color={post.categoryColor} small />
          <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{post.country}</span>
        </div>

        <Link href={`/visa-news/${post.slug}`}>
          <h3
            className="text-xl font-black leading-snug tracking-tight text-slate-900 group-hover:text-amber-600 transition-colors line-clamp-2"
            itemProp="headline"
          >
            {post.title}
          </h3>
        </Link>

        <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 font-medium" itemProp="description">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-4 pt-1">
          <time className="text-xs font-bold text-slate-400 uppercase tracking-tight" dateTime={post.dateISO}>
            {post.date}
          </time>
          <span className="text-xs font-black text-slate-800 bg-amber-400 px-2.5 py-0.5 rounded-sm uppercase tracking-tighter">
            {post.readTime} min
          </span>
          <div className="flex gap-1.5 ml-auto">
            {post.tags.slice(0, 2).map(tag => (
              <span key={tag} className="hidden sm:inline text-[9px] font-bold text-slate-400 bg-slate-100 rounded-full px-2 py-0.5">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

/* ─── TOPICS DATA ─────────────────────────────────────────── */
const TOPICS = [
  { label: 'Work Visas', href: '/visa/work-visa', count: 12 },
  { label: 'Permanent Residency', href: '/visa-news?cat=residency', count: 8 },
  { label: 'Schengen Updates', href: '/schengen-visa', count: 6 },
  { label: 'Student Visas', href: '/visa/student-visa', count: 5 },
  { label: 'Tourist Bans', href: '/visa-news?cat=bans', count: 3 },
  { label: 'Fee Changes', href: '/visa-news?cat=fees', count: 4 },
];

const QUICK_LINKS = [
  { label: 'Schengen Visa Guide', href: '/schengen-visa', icon: '🇪🇺' },
  { label: 'UK Work Visa', href: '/visa/work-visa', icon: '🇬🇧' },
  { label: 'Canada PR Guide', href: '/visa/tourist-visa/canada', icon: '🇨🇦' },
  { label: 'Australia Visa', href: '/visa/tourist-visa/australia', icon: '🇦🇺' },
  { label: 'USA Visa Guide', href: '/visa/tourist-visa/usa', icon: '🇺🇸' },
  { label: 'Document Checklist', href: '/visa-resources/visa-checklist-generator', icon: '📋' },
  { label: 'Processing Tracker', href: '/visa-processing-time-tracker', icon: '⏱️' },
  { label: 'Embassy Directory', href: '/visa-resources/embassy-directory', icon: '🏛️' },
];

/* ─── PAGE COMPONENT ──────────────────────────────────────── */
export default function VisaNewsPage() {
  const hero       = VISA_NEWS[0];
  const featured   = VISA_NEWS.filter(p => p.featured && p.id !== 1).slice(0, 3);
  const listPosts  = VISA_NEWS.filter(p => !p.featured || p.id > 1);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-100 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-400 font-semibold flex-wrap">
          <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <span>›</span>
          <span className="text-slate-700 font-bold">Visa News</span>
        </div>
      </nav>

      <div className="min-h-screen bg-[#f9fafb] text-slate-900">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

          {/* ── PAGE HEADER ── */}
          <header className="mb-12">
            <div className="flex items-end justify-between gap-6 flex-wrap">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-500 mb-2">
                  Visa Express Hub · Updated {new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
                </p>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-slate-900">
                  Visa <span className="text-amber-500">News</span>
                </h1>
                <p className="text-slate-500 font-medium mt-3 max-w-xl text-base leading-relaxed">
                  Live immigration policy updates, processing time changes, and fee alerts for UAE residents and global applicants.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Live Updates</span>
              </div>
            </div>
          </header>

          {/* ── HERO ── */}
          <section className="mb-12" aria-label="Featured story">
            <HeroCard post={hero} />
          </section>

          {/* ── FEATURED ROW ── */}
          {featured.length > 0 && (
            <section className="mb-14" aria-label="Featured news">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
                <span className="flex-1 h-px bg-slate-200" />
                Featured Stories
                <span className="flex-1 h-px bg-slate-200" />
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {featured.map(post => <FeaturedCard key={post.id} post={post} />)}
              </div>
            </section>
          )}

          {/* ── TWO-COL LAYOUT ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* ── MAIN ARTICLES ── */}
            <section className="lg:col-span-8" aria-label="Latest news">
              <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 border-b-2 border-slate-900 pb-4 mb-2 inline-block">
                Latest Reports
              </h2>
              <div>
                {listPosts.map(post => <ArticleCard key={post.id} post={post} />)}
              </div>

              {/* Internal links block */}
              <div className="mt-10 bg-white border border-slate-200 rounded-3xl p-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-5">Related Visa Guides</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {QUICK_LINKS.map(l => (
                    <Link key={l.href} href={l.href}
                      className="flex items-center gap-2.5 p-3 bg-slate-50 border border-slate-100 rounded-2xl hover:border-amber-300 hover:bg-amber-50 group transition-all">
                      <span className="text-base">{l.icon}</span>
                      <span className="text-xs font-bold text-slate-600 group-hover:text-amber-700 transition-colors leading-tight">{l.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* ── SIDEBAR ── */}
            <aside className="lg:col-span-4 space-y-8">

              {/* CTA */}
              <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(251,191,36,1)] border border-slate-800">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400 mb-2">Free Consultation</p>
                <h4 className="text-2xl font-black uppercase leading-tight mb-3">Expert<br/>Visa Advice</h4>
                <p className="text-sm text-slate-400 font-medium mb-6 leading-relaxed">
                  Our Dubai-based consultants stay on top of every policy change — so you don't have to.
                </p>
                <Link href="/contact"
                  className="block w-full bg-amber-400 text-slate-900 py-4 rounded-2xl font-black uppercase text-xs tracking-widest text-center hover:bg-amber-300 transition-colors">
                  Talk to a Consultant →
                </Link>
                <Link href="/visa-resources/visa-checklist-generator"
                  className="block w-full bg-slate-800 text-white py-3 rounded-2xl font-bold text-xs text-center mt-3 hover:bg-slate-700 transition-colors">
                  📋 Get Document Checklist
                </Link>
              </div>

              {/* Topics */}
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-sm">
                <h5 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5 pb-3 border-b border-slate-100">
                  Topic Focus
                </h5>
                <div className="space-y-1">
                  {TOPICS.map(t => (
                    <Link key={t.href} href={t.href}
                      className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-amber-50 group transition-all">
                      <span className="text-sm font-bold text-slate-700 group-hover:text-amber-700 transition-colors">{t.label}</span>
                      <span className="text-xs font-black text-slate-300 bg-slate-100 group-hover:bg-amber-100 group-hover:text-amber-600 w-7 h-7 rounded-full flex items-center justify-center transition-all">
                        {t.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick navigation */}
              <div className="bg-amber-50 border border-amber-200 rounded-3xl p-7">
                <h5 className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-600 mb-5">Visa Resources</h5>
                <div className="space-y-2">
                  {[
                    { label: 'Schengen Visa Guide 2026', href: '/schengen-visa' },
                    { label: 'Visa Checklist Generator', href: '/visa-resources/visa-checklist-generator' },
                    { label: 'Processing Time Tracker', href: '/visa-processing-time-tracker' },
                    { label: 'Embassy Directory UAE', href: '/visa-resources/embassy-directory' },
                    { label: 'SOP & Cover Letter', href: '/visa-resources/visa-document-generator' },
                  ].map(l => (
                    <Link key={l.href} href={l.href}
                      className="flex items-center justify-between text-sm font-bold text-amber-800 hover:text-amber-900 py-1.5 border-b border-amber-100 last:border-0 transition-colors">
                      {l.label}
                      <span className="text-amber-400 font-black">›</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent posts mini */}
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-sm">
                <h5 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5 pb-3 border-b border-slate-100">
                  Recent Posts
                </h5>
                <div className="space-y-4">
                  {VISA_NEWS.slice(4, 8).map(post => (
                    <Link key={post.id} href={`/visa-news/${post.slug}`} className="group flex items-start gap-3">
                      <div className="w-14 h-10 rounded-xl overflow-hidden shrink-0">
                        <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-700 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">{post.title}</p>
                        <p className="text-[10px] text-slate-400 font-semibold mt-1">{post.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </aside>
          </div>

          {/* ── BOTTOM CTA ── */}
          <section className="mt-16 bg-amber-400 rounded-[2.5rem] p-12 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-700 mb-3">Stay Ahead of Changes</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
              Need Help with Your<br />Visa Application?
            </h2>
            <p className="text-amber-800 font-medium text-base max-w-md mx-auto mb-8 leading-relaxed">
              Our Dubai experts track every policy update and guide you through your full application — from documents to decision.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact"
                className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-slate-700 transition-colors shadow-xl">
                Book Free Consultation →
              </Link>
              <Link href="/schengen-visa"
                className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-sm border border-slate-200 hover:bg-slate-50 transition-colors">
                🇪🇺 Schengen Visa Guide
              </Link>
            </div>
          </section>

        </main>
      </div>
    </>
  );
}