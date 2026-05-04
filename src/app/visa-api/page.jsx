"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const API_FEATURES = [
  {
    icon: "🌍",
    title: "190+ Countries",
    desc: "Real-time visa requirements for every country pair — business, work, student, tourist, and transit visa data in a single endpoint.",
    stat: "190+",
    statLabel: "Countries",
  },
  {
    icon: "📦",
    title: "Clean JSON Responses",
    desc: "Structured, consistent JSON responses designed for fast frontend integration. No parsing headaches, no undocumented fields.",
    stat: "<120ms",
    statLabel: "Avg. Response",
  },
  {
    icon: "🔐",
    title: "Enterprise Security",
    desc: "JWT and OAuth2 authentication, rate limiting, IP whitelisting, and full audit logging for compliance-heavy platforms.",
    stat: "99.98%",
    statLabel: "Uptime SLA",
  },
  {
    icon: "🔔",
    title: "Webhook Alerts",
    desc: "Get notified within minutes when visa policies change for any country pair. No more manual monitoring or compliance gaps.",
    stat: "Real-time",
    statLabel: "Policy Alerts",
  },
  {
    icon: "🔄",
    title: "Bulk Lookups",
    desc: "Query visa requirements for multiple nationality-destination pairs in a single API call. Perfect for HR platforms managing global workforces.",
    stat: "500/req",
    statLabel: "Bulk Limit",
  },
  {
    icon: "📋",
    title: "Document Checklists",
    desc: "Return a full, structured document checklist for any visa type and nationality — invitation letters, financial docs, insurance requirements.",
    stat: "14+",
    statLabel: "Doc Types",
  },
  {
    icon: "📊",
    title: "Processing Time Data",
    desc: "Historical and live processing time data for standard and expedited visa applications. Include confidence intervals and seasonal trends.",
    stat: "Live",
    statLabel: "Processing Data",
  },
  {
    icon: "🗺️",
    title: "Schengen Calculator",
    desc: "Built-in Schengen 90/180-day calculation endpoint. Pass a trip history, receive remaining allowed days — fully compliant with EU rules.",
    stat: "27",
    statLabel: "Schengen States",
  },
];

const ENDPOINTS = [
  {
    method: "GET",
    path: "/v1/requirements",
    desc: "Fetch visa requirements for a nationality–destination pair. Returns visa type, processing time, fee, max stay, and permitted activities.",
    params: ["from (ISO 3166-1 alpha-2)", "to (ISO 3166-1 alpha-2)", "visa_type (optional)", "lang (optional)"],
    color: "blue",
  },
  {
    method: "GET",
    path: "/v1/documents",
    desc: "Return the full document checklist for a specific visa application. Includes mandatory and recommended documents with detailed descriptions.",
    params: ["nationality", "destination", "visa_type"],
    color: "green",
  },
  {
    method: "GET",
    path: "/v1/processing-times",
    desc: "Live and historical processing time data. Standard vs expedited. Includes current wait time estimates and seasonal delay warnings.",
    params: ["destination", "visa_type", "origin_city (optional)"],
    color: "purple",
  },
  {
    method: "POST",
    path: "/v1/bulk",
    desc: "Query up to 500 nationality–destination pairs in a single request. Returns full visa intelligence for each pair. Ideal for HR platforms.",
    params: ["pairs[] (array of {from, to, visa_type})"],
    color: "orange",
  },
  {
    method: "POST",
    path: "/v1/schengen/calculator",
    desc: "Pass a traveller's Schengen trip history and receive remaining allowed days, overstay risk level, and a compliance summary.",
    params: ["trips[] (array of {entry, exit, country})"],
    color: "red",
  },
  {
    method: "POST",
    path: "/v1/webhooks/subscribe",
    desc: "Subscribe to real-time policy change alerts for specific country pairs or regions. Receive webhook POST to your endpoint when policies update.",
    params: ["url", "pairs[]", "events[] (policy_change, fee_change, suspension)"],
    color: "amber",
  },
];

const USE_CASES = [
  {
    icon: "✈️",
    title: "Travel Booking Platforms",
    desc: "Show travellers whether they need a visa before checkout — with real-time data, required documents, and current processing times. Reduce abandoned bookings caused by visa uncertainty.",
    links: [
      { label: "Business Visa Guide", href: "/visa/business-visa" },
      { label: "Tourist Visa Guide", href: "/visa/tourist-visa" },
    ],
  },
  {
    icon: "🏢",
    title: "HR & Workforce Platforms",
    desc: "Automate visa compliance checking for globally mobile workforces. Bulk-query requirements for entire teams, trigger alerts when policies change, and integrate document checklists into onboarding flows.",
    links: [
      { label: "Work Visa Guide", href: "/visa/work-visa" },
      { label: "Visa Checklist Generator", href: "/visa-resources/visa-checklist-generator" },
    ],
  },
  {
    icon: "🎓",
    title: "International Education Platforms",
    desc: "Automatically surface student visa requirements, processing timelines, and document checklists when students select a study destination. Integrate into enrollment flows seamlessly.",
    links: [
      { label: "Student Visa Guide", href: "/visa/student-visa" },
    ],
  },
  {
    icon: "🌐",
    title: "Immigration & Relocation Software",
    desc: "Power case management tools with live, authoritative visa data. Automate requirement lookups, flag policy changes to case workers, and generate compliance reports for clients.",
    links: [
      { label: "Processing Times", href: "/visa-resources/processing-times" },
      { label: "Embassy Directory", href: "/visa-resources/embassy-directory" },
    ],
  },
  {
    icon: "💳",
    title: "Financial & Insurance Products",
    desc: "Validate travel insurance requirements (Schengen €30,000 minimum cover) against live visa rules. Trigger upsell flows for clients who need higher coverage for specific destinations.",
    links: [
      { label: "Schengen Visa Guide", href: "/visa/business-visa#schengen" },
    ],
  },
  {
    icon: "🤖",
    title: "AI & Chatbot Integration",
    desc: "Power visa-related AI assistants with authoritative, structured data. Replace hallucinated LLM responses on visa requirements with real-time, verified API data.",
    links: [
      { label: "View All Visa Guides", href: "/visa" },
    ],
  },
];

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    period: "during beta",
    desc: "For indie developers and small teams evaluating the API.",
    limit: "1,000 requests/month",
    features: [
      "Requirements endpoint",
      "Documents endpoint",
      "JSON responses",
      "Community support",
      "Rate limit: 10 req/sec",
    ],
    cta: "Join Beta Waitlist",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$149",
    period: "/ month",
    desc: "For travel startups and HR tools with moderate API usage.",
    limit: "100,000 requests/month",
    features: [
      "All endpoints including bulk",
      "Processing time data",
      "Webhook alerts",
      "Priority email support",
      "Rate limit: 100 req/sec",
      "SLA: 99.9% uptime",
    ],
    cta: "Join Beta Waitlist",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    desc: "For large platforms with high-volume or mission-critical usage.",
    limit: "Unlimited requests",
    features: [
      "All Growth features",
      "Dedicated infrastructure",
      "Custom data refresh rates",
      "Slack / dedicated support",
      "IP whitelisting & SSO",
      "SLA: 99.98% uptime",
      "Custom data agreements",
    ],
    cta: "Contact Sales",
    highlight: false,
  },
];

const CODE_SAMPLES = {
  curl: `curl -X GET "https://api.workpass.guide/v1/requirements?from=IN&to=DE&visa_type=business" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,

  response: `{
  "status": "success",
  "data": {
    "from": "India",
    "to": "Germany",
    "visa_type": "Business",
    "visa_required": true,
    "visa_name": "Schengen Business Visa (Type C)",
    "schengen": true,
    "max_stay": "90 days / 180-day period",
    "processing_time": {
      "standard": "10–15 business days",
      "expedited": "5–7 business days"
    },
    "fee": {
      "amount": 80,
      "currency": "EUR"
    },
    "permitted_activities": [
      "Business meetings",
      "Trade fair participation",
      "Contract signing",
      "Conference attendance"
    ],
    "prohibited_activities": [
      "Local employment",
      "Receiving local payment"
    ],
    "required_documents": [
      "Valid passport (6+ months)",
      "Invitation letter from host company",
      "Employer cover letter",
      "Bank statements (3–6 months)",
      "Travel insurance (min. €30,000)"
    ],
    "embassy_url": "https://india.diplo.de/",
    "last_updated": "2026-05-01T00:00:00Z"
  }
}`,

  javascript: `const response = await fetch(
  'https://api.workpass.guide/v1/requirements?from=IN&to=DE&visa_type=business',
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  }
);

const { data } = await response.json();

console.log(data.visa_name);        // "Schengen Business Visa (Type C)"
console.log(data.max_stay);         // "90 days / 180-day period"
console.log(data.processing_time);  // { standard: "10–15 business days" }`,

  python: `import requests

response = requests.get(
    "https://api.workpass.guide/v1/requirements",
    params={"from": "IN", "to": "DE", "visa_type": "business"},
    headers={"Authorization": "Bearer YOUR_API_KEY"}
)

data = response.json()["data"]

print(data["visa_name"])          # Schengen Business Visa (Type C)
print(data["fee"]["amount"])      # 80
print(data["schengen"])           # True`,
};

const METHOD_COLORS = {
  GET: "bg-blue-100 text-blue-700 border-blue-200",
  POST: "bg-green-100 text-green-700 border-green-200",
};

export default function VisaApiPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('curl');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">

      {/* BREADCRUMB */}
      <div className="bg-white border-b border-slate-100 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-xs text-slate-400 font-medium flex-wrap">
          <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/developers" className="hover:text-amber-600 transition-colors">Developers</Link>
          <span>›</span>
          <span className="text-slate-600 font-semibold">Visa API</span>
        </div>
      </div>

      {/* HERO */}
      <header className="border-b border-slate-100 py-20 px-6 bg-white relative overflow-hidden">
        {/* Subtle grid background */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        {/* Amber glow accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="max-w-6xl mx-auto relative">
          <div className="flex flex-wrap gap-2 items-center mb-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">Developer Access</span>
            <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Private Beta — Waitlist Open
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">190+ Countries</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-none mb-6 text-slate-900">
                Visa Intelligence<br />
                <span className="text-amber-500">API</span> for Developers
              </h1>
              <p className="text-lg text-slate-500 leading-relaxed mb-3 max-w-lg">
                Integrate real-time visa requirements, document checklists, processing times, and policy change webhooks directly into your travel platform, HR tool, or booking engine.
              </p>
              <p className="text-sm text-slate-400 max-w-lg leading-relaxed mb-8">
                Built on the same data powering <Link href="/visa/business-visa" className="text-amber-600 font-semibold hover:underline">WorkPass.Guide</Link> — 190+ countries, 5 visa types, updated continuously from official government sources.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 mb-10">
                {[
                  { val: "190+", label: "Countries" },
                  { val: "<120ms", label: "Avg Response" },
                  { val: "99.98%", label: "Uptime SLA" },
                  { val: "5", label: "Visa Types" },
                ].map(s => (
                  <div key={s.label}>
                    <p className="text-2xl font-extrabold text-slate-900">{s.val}</p>
                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Waitlist form */}
              {!submitted ? (
                <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="dev@yourcompany.com"
                    required
                    className="flex-1 bg-white border-2 border-slate-200 focus:border-amber-400 rounded-xl px-5 py-3.5 text-sm font-medium outline-none transition-all"
                  />
                  <button type="submit"
                    className="bg-amber-400 text-slate-900 px-7 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-amber-500 transition-all shadow-lg shadow-amber-100 shrink-0">
                    Get Access
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-5 py-4 max-w-md">
                  <span className="text-xl">✅</span>
                  <div>
                    <p className="text-sm font-bold text-green-800">You're on the waitlist!</p>
                    <p className="text-xs text-green-600">We'll email API docs and your key as soon as you're approved.</p>
                  </div>
                </div>
              )}
              <p className="text-[11px] text-slate-400 mt-3">Free during beta · No credit card required · Early access keys sent within 48 hours</p>
            </div>

            {/* Code snippet */}
            <div className="w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 shadow-xl">
              <div className="flex items-center gap-2 px-5 py-4 bg-slate-800 border-b border-slate-700">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">GET /v1/requirements</span>
                <span className="ml-auto text-[9px] text-green-400 font-bold uppercase tracking-wider">200 OK</span>
              </div>
              <pre className="text-xs font-mono p-6 leading-relaxed text-slate-300 overflow-x-auto">
{`{
  `}<span className="text-pink-400">"visa_name"</span>{`: `}<span className="text-green-400">"Schengen Business Visa"</span>{`,
  `}<span className="text-pink-400">"visa_required"</span>{`: `}<span className="text-blue-400">true</span>{`,
  `}<span className="text-pink-400">"max_stay"</span>{`: `}<span className="text-green-400">"90 days / 180-day period"</span>{`,
  `}<span className="text-pink-400">"processing_time"</span>{`: {
    `}<span className="text-pink-400">"standard"</span>{`: `}<span className="text-green-400">"10–15 business days"</span>{`,
    `}<span className="text-pink-400">"expedited"</span>{`: `}<span className="text-green-400">"5–7 business days"</span>{`
  },
  `}<span className="text-pink-400">"fee"</span>{`: { `}<span className="text-pink-400">"amount"</span>{`: `}<span className="text-amber-400">80</span>{`, `}<span className="text-pink-400">"currency"</span>{`: `}<span className="text-green-400">"EUR"</span>{` },
  `}<span className="text-pink-400">"last_updated"</span>{`: `}<span className="text-green-400">"2026-05-01T00:00:00Z"</span>{`
}`}
              </pre>
            </div>
          </div>
        </div>
      </header>

      {/* FEATURES */}
      <section className="border-b border-slate-100 py-16 px-6 bg-slate-50" id="features">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">API Capabilities</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Everything You Need — In One API</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl">
              One API key, one integration, all the visa intelligence your platform needs. Covering <Link href="/visa/business-visa" className="text-amber-600 font-semibold hover:underline">business visas</Link>, <Link href="/visa/work-visa" className="text-amber-600 font-semibold hover:underline">work visas</Link>, <Link href="/visa/student-visa" className="text-amber-600 font-semibold hover:underline">student visas</Link>, <Link href="/visa/tourist-visa" className="text-amber-600 font-semibold hover:underline">tourist visas</Link>, and <Link href="/visa/transit-visa" className="text-amber-600 font-semibold hover:underline">transit visas</Link> — for 190+ countries.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {API_FEATURES.map((f) => (
              <div key={f.title} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-amber-300 hover:shadow-md hover:shadow-amber-50 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-2xl">{f.icon}</span>
                  <div className="text-right">
                    <p className="text-lg font-extrabold text-amber-500">{f.stat}</p>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">{f.statLabel}</p>
                  </div>
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-2">{f.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENDPOINTS */}
      <section className="border-b border-slate-100 py-16 px-6 bg-white" id="endpoints">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">API Reference</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Available Endpoints</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl">Full API documentation is available to waitlist members. Below is an overview of the core endpoints available in v1.</p>
          </div>
          <div className="space-y-3">
            {ENDPOINTS.map((ep) => (
              <div key={ep.path} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-amber-200 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg border ${METHOD_COLORS[ep.method]}`}>
                      {ep.method}
                    </span>
                    <code className="text-sm font-mono font-bold text-slate-800 bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg">{ep.path}</code>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">{ep.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {ep.params.map(p => (
                        <code key={p} className="text-[10px] font-mono text-slate-600 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">{p}</code>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CODE SAMPLES */}
      <section className="border-b border-slate-100 py-16 px-6 bg-slate-50" id="code-samples">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Quick Start</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Code Samples</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl">
              Query the India → Germany business visa requirements endpoint in your preferred language. Full SDKs for JavaScript, Python, PHP, and Ruby available to waitlist members.
            </p>
          </div>

          {/* Tab switcher */}
          <div className="flex gap-2 mb-6">
            {['curl', 'javascript', 'python', 'response'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all uppercase tracking-wider ${activeTab === tab ? 'bg-amber-400 text-slate-900 border-amber-400' : 'bg-white border-slate-200 text-slate-500 hover:border-amber-300'}`}>
                {tab === 'response' ? 'JSON Response' : tab}
              </button>
            ))}
          </div>

          <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 shadow-lg">
            <div className="flex items-center gap-2 px-5 py-4 bg-slate-800 border-b border-slate-700">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {activeTab === 'response' ? 'API Response — India → Germany Business Visa' : `${activeTab} — India → Germany Business Visa`}
              </span>
            </div>
            <pre className="text-xs font-mono p-6 leading-relaxed text-slate-300 overflow-x-auto max-h-96">
              <code>{CODE_SAMPLES[activeTab]}</code>
            </pre>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { lang: "JavaScript", icon: "🟨", note: "ES2020+ async/await. Node.js, Deno, browser-compatible." },
              { lang: "Python", icon: "🐍", note: "Python 3.8+. Compatible with Django, FastAPI, Flask." },
              { lang: "PHP", icon: "🐘", note: "PHP 8.0+. Laravel, Symfony, and WordPress ready." },
            ].map(s => (
              <div key={s.lang} className="bg-white border border-slate-200 rounded-xl p-5 hover:border-amber-200 transition-colors">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{s.icon}</span>
                  <h4 className="font-bold text-sm text-slate-900">{s.lang} SDK</h4>
                  <span className="ml-auto text-[9px] font-bold uppercase bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Beta</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{s.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="border-b border-slate-100 py-16 px-6 bg-white" id="use-cases">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Platform Integrations</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Who Uses the Visa API?</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl">
              The WorkPass.Guide Visa API powers visa intelligence across travel, HR, education, and immigration platforms.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {USE_CASES.map((uc) => (
              <div key={uc.title} className="border border-slate-200 rounded-2xl p-6 bg-white hover:border-amber-200 hover:shadow-md hover:shadow-amber-50 transition-all">
                <span className="text-3xl mb-4 block">{uc.icon}</span>
                <h3 className="font-bold text-sm text-slate-900 mb-2">{uc.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{uc.desc}</p>
                <div className="border-t border-slate-100 pt-4 flex flex-wrap gap-2">
                  {uc.links.map(l => (
                    <Link key={l.href} href={l.href}
                      className="text-[10px] font-bold text-amber-600 hover:text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full hover:bg-amber-100 transition-colors">
                      {l.label} →
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="border-b border-slate-100 py-16 px-6 bg-slate-50" id="pricing">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Simple, Transparent Pricing</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">API Pricing Plans</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-lg mx-auto">All plans are free during the private beta. Pricing below reflects our post-launch structure. Waitlist members receive 3 months free at the Growth tier upon launch.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((plan) => (
              <div key={plan.name}
                className={`rounded-2xl p-7 border-2 transition-all ${plan.highlight ? 'border-amber-400 bg-white shadow-xl shadow-amber-100' : 'border-slate-200 bg-white'}`}>
                {plan.highlight && (
                  <div className="mb-4">
                    <span className="text-[9px] font-black uppercase tracking-widest bg-amber-400 text-slate-900 px-3 py-1 rounded-full">Most Popular</span>
                  </div>
                )}
                <h3 className="font-extrabold text-xl text-slate-900 mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-extrabold text-slate-900">{plan.price}</span>
                  <span className="text-sm text-slate-400 font-medium">{plan.period}</span>
                </div>
                <p className="text-xs text-slate-500 mb-2">{plan.desc}</p>
                <p className="text-[11px] font-bold text-amber-600 mb-5">{plan.limit}</p>
                <ul className="space-y-2.5 mb-7 border-t border-slate-100 pt-5">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-slate-600">
                      <span className="text-green-500 shrink-0 mt-0.5 font-bold">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${plan.highlight
                    ? 'bg-amber-400 text-slate-900 hover:bg-amber-500 shadow-lg shadow-amber-100'
                    : 'bg-slate-900 text-white hover:bg-slate-700'}`}>
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 mt-8">Need a custom plan? <a href="mailto:api@workpass.guide" className="text-amber-600 font-semibold hover:underline">Contact our team →</a></p>
        </div>
      </section>

      {/* DATA SOURCES */}
      <section className="border-b border-slate-100 py-16 px-6 bg-white" id="data">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Data Integrity</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Where Does the Data Come From?</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl">Accuracy is everything for visa data. Our data sourcing and update process is built to match official government sources — not scraped blogs or outdated PDFs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-5">
              {[
                {
                  heading: "Official Government Sources Only",
                  body: "All visa requirements are sourced directly from official embassy websites, government immigration portals, and foreign ministry publications. We do not rely on third-party aggregators or travel blog content.",
                },
                {
                  heading: "Continuous Monitoring & Update Pipeline",
                  body: "Our automated pipeline checks official embassy pages daily for changes in requirements, fees, processing times, and visa suspensions. Policy changes trigger immediate data updates and push webhook alerts to subscribed API consumers.",
                },
                {
                  heading: "Human Verification Layer",
                  body: "Automated changes are reviewed by our editorial team before being published to the API. For high-traffic country pairs, changes go through a dual-verification process to eliminate false positives.",
                },
                {
                  heading: "Timestamps on Every Response",
                  body: "Every API response includes a last_updated timestamp so your application can display data freshness to end users — critical for compliance platforms and immigration case management tools.",
                },
              ].map(item => (
                <div key={item.heading} className="border-l-4 border-amber-300 pl-5">
                  <h3 className="font-bold text-sm text-slate-900 mb-1.5">{item.heading}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-7 space-y-5">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Data Coverage Summary</p>
              {[
                { label: "Countries covered", val: "190+" },
                { label: "Visa types per route", val: "Up to 5" },
                { label: "Data refresh frequency", val: "Daily" },
                { label: "Average data age", val: "< 24 hours" },
                { label: "Schengen countries", val: "27 (full coverage)" },
                { label: "Processing time data", val: "Standard + expedited" },
                { label: "Fee data", val: "Local currency + USD" },
                { label: "Document checklists", val: "14+ doc types" },
                { label: "Webhook event types", val: "Policy, fee, suspension" },
                { label: "API versioning", val: "Semantic versioning (v1 stable)" },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between text-xs border-b border-slate-100 last:border-0 pb-3 last:pb-0">
                  <span className="text-slate-500">{row.label}</span>
                  <span className="font-bold text-slate-800">{row.val}</span>
                </div>
              ))}
              <div className="pt-2">
                <p className="text-[11px] text-slate-400">All visa data is sourced from official embassy and government immigration portals. <Link href="/visa/business-visa" className="text-amber-600 font-semibold hover:underline">Browse our human-readable guides →</Link></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERNAL LINK HUB */}
      <section className="border-b border-slate-100 py-16 px-6 bg-slate-50" id="resources">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Also on WorkPass.Guide</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Visa Guides & Tools Powering the API</h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl">The same data available via API is also available as human-readable guides — free, no account required.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: "💼", title: "Business Visa Guides",
                desc: "Complete guides for 190+ routes — documents, fees, timelines, and invitation letter templates.",
                href: "/visa/business-visa", color: "amber",
              },
              {
                icon: "🏗️", title: "Work Visa Guides",
                desc: "Country-specific work visa requirements, sponsorship rules, and employer obligations.",
                href: "/visa/work-visa", color: "blue",
              },
              {
                icon: "🎓", title: "Student Visa Guides",
                desc: "University admission requirements, student visa applications, and proof of funds guidance.",
                href: "/visa/student-visa", color: "green",
              },
              {
                icon: "🌴", title: "Tourist Visa Guides",
                desc: "Tourist visa requirements, visa-on-arrival eligibility, and eVisa portals for 190+ countries.",
                href: "/visa/tourist-visa", color: "teal",
              },
              {
                icon: "🛫", title: "Transit Visa Guides",
                desc: "Airside transit and landside transit visa requirements — avoid costly layover surprises.",
                href: "/visa/transit-visa", color: "purple",
              },
              {
                icon: "📋", title: "Checklist Generator",
                desc: "Personalised PDF document checklist for any nationality and destination — free download.",
                href: "/visa-resources/visa-checklist-generator", color: "slate",
              },
              {
                icon: "🏛️", title: "Embassy Directory",
                desc: "Official embassy contacts, appointment booking links, and address data for 190+ countries.",
                href: "/visa-resources/embassy-directory", color: "slate",
              },
              {
                icon: "⏱️", title: "Processing Time Tracker",
                desc: "Live-updated standard and expedited visa processing times — the same data in the API.",
                href: "/visa-resources/processing-times", color: "slate",
              },
            ].map(r => (
              <Link key={r.title} href={r.href}
                className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-amber-200 hover:shadow-md hover:shadow-amber-50 transition-all">
                <span className="text-2xl mb-3 block">{r.icon}</span>
                <h4 className="font-bold text-sm text-slate-900 mb-1.5">{r.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{r.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-slate-100 py-16 px-6 bg-white" id="faq">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">Common Questions</p>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">API FAQ</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "How accurate is the visa data?",
                a: "All data is sourced from official government embassy websites and immigration portals, monitored daily. Every response includes a last_updated timestamp. For mission-critical applications, we recommend subscribing to webhook alerts for any country pairs your platform covers.",
              },
              {
                q: "What visa types does the API cover?",
                a: "The API covers business visas, work visas, student visas, tourist visas, and transit visas for 190+ countries. Data includes visa requirements, document checklists, processing times, embassy contacts, and permitted activities for each visa type.",
              },
              {
                q: "Is there a free tier available?",
                a: "During the private beta, all access is free with 1,000 requests/month on the Starter tier. Post-launch, the Starter tier remains free up to 1,000 requests per month. Waitlist members who join before launch receive 3 months free at the Growth tier.",
              },
              {
                q: "How are policy changes communicated?",
                a: "Webhook subscribers receive real-time POST notifications within minutes of a policy change being verified. Webhook events include policy_change (requirements updated), fee_change (visa fees updated), and suspension (visa suspended for a nationality). You can subscribe to specific country pairs or whole regions.",
              },
              {
                q: "What is the rate limit?",
                a: "Starter tier: 10 requests/second. Growth tier: 100 requests/second. Enterprise: custom. Bulk endpoint allows up to 500 country pairs per request, counted as 1 request against the rate limit. Contact us if your application requires higher throughput.",
              },
              {
                q: "Is there an SLA for uptime?",
                a: "Growth tier includes a 99.9% monthly uptime SLA. Enterprise tier includes a 99.98% monthly uptime SLA with dedicated infrastructure. Status and incident history is published at status.workpass.guide.",
              },
            ].map((item, i) => (
              <div key={i} className="border border-slate-200 rounded-xl p-6 bg-white hover:border-amber-200 transition-colors">
                <h4 className="font-bold text-sm text-slate-900 mb-2">{item.q}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 px-6 bg-amber-400">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[11px] font-bold uppercase tracking-widest text-amber-800 mb-3">Private Beta — Limited Spots</p>
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Join the Visa API Waitlist</h2>
          <p className="text-amber-900 text-sm max-w-xl mx-auto mb-8 leading-relaxed">
            Be among the first developers to access the WorkPass.Guide Visa API. Early access members receive API documentation, test credentials, and 3 months free at the Growth tier when we launch.
          </p>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="dev@yourcompany.com"
                required
                className="flex-1 bg-white border-2 border-amber-300 focus:border-slate-900 rounded-xl px-5 py-4 text-sm font-medium outline-none transition-all"
              />
              <button type="submit"
                className="bg-slate-900 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-700 transition-all shrink-0">
                Get Access
              </button>
            </form>
          ) : (
            <div className="inline-flex items-center gap-3 bg-white rounded-xl px-6 py-4">
              <span>✅</span>
              <p className="text-sm font-bold text-slate-800">You're on the list! We'll be in touch within 48 hours.</p>
            </div>
          )}
          <p className="text-[11px] text-amber-800 mt-4">Free during beta · No credit card · API docs sent within 48 hours</p>
        </div>
      </section>

      {/* SEO FOOTER NAV */}
      <footer className="bg-white border-t border-slate-200 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Visa Guides</p>
              {[
                { label: "Business Visa", href: "/visa/business-visa" },
                { label: "Work Visa", href: "/visa/work-visa" },
                { label: "Student Visa", href: "/visa/student-visa" },
                { label: "Tourist Visa", href: "/visa/tourist-visa" },
                { label: "Transit Visa", href: "/visa/transit-visa" },
              ].map(l => <Link key={l.href} href={l.href} className="block text-xs text-slate-500 hover:text-amber-600 py-0.5 hover:underline">{l.label} →</Link>)}
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Popular Routes</p>
              {[
                { label: "India → Germany", href: "/visa/business-visa/indian-to-germany" },
                { label: "India → USA", href: "/visa/business-visa/indian-to-united-states" },
                { label: "Nigeria → UK", href: "/visa/business-visa/nigerian-to-united-kingdom" },
                { label: "Pakistan → UAE", href: "/visa/business-visa/pakistani-to-uae" },
                { label: "Philippines → Singapore", href: "/visa/business-visa/filipino-to-singapore" },
              ].map(l => <Link key={l.href} href={l.href} className="block text-xs text-slate-500 hover:text-amber-600 py-0.5 hover:underline">{l.label} →</Link>)}
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Visa Resources</p>
              {[
                { label: "Checklist Generator", href: "/visa-resources/visa-checklist-generator" },
                { label: "Cover Letter Templates", href: "/visa-resources/cover-letter-templates" },
                { label: "Embassy Directory", href: "/visa-resources/embassy-directory" },
                { label: "Processing Times", href: "/visa-resources/processing-times" },
                { label: "Schengen Calculator", href: "/visa-resources/schengen-calculator" },
              ].map(l => <Link key={l.href} href={l.href} className="block text-xs text-slate-500 hover:text-amber-600 py-0.5 hover:underline">{l.label} →</Link>)}
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Developer</p>
              {[
                { label: "API Overview", href: "/developers/api" },
                { label: "API Features", href: "/developers/api#features" },
                { label: "Endpoints", href: "/developers/api#endpoints" },
                { label: "Code Samples", href: "/developers/api#code-samples" },
                { label: "API Pricing", href: "/developers/api#pricing" },
              ].map(l => <Link key={l.href} href={l.href} className="block text-xs text-slate-500 hover:text-amber-600 py-0.5 hover:underline">{l.label} →</Link>)}
            </div>
          </div>
          <div className="border-t border-slate-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-slate-400">© 2026 Eammu Holidays — Visa Intelligence API. All rights reserved.</p>
            <p className="text-[11px] text-slate-400">Data sourced from official government and embassy portals · Updated daily</p>
          </div>
        </div>
      </footer>

    </div>
  );
}