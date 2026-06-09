"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

const API_KEY = process.env.NEXT_PUBLIC_EAMMU_API_KEY;
const BASE    = "https://api.eammu.com/api/v1";

const RECENT_KEY = "eammu_visa_recent";
const MAX_RECENT = 6;

function slugify(str) {
  return (str || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

const STATUS_META = {
  "visa required":   { fallbackColor: "#DC2626", fallbackLight: "#FFF5F5", label: "Visa Required",  slug: "visa-required"   },
  "e-visa":          { fallbackColor: "#2563EB", fallbackLight: "#EFF6FF", label: "E-Visa",          slug: "e-visa"          },
  "visa on arrival": { fallbackColor: "#059669", fallbackLight: "#ECFDF5", label: "Visa on Arrival", slug: "visa-on-arrival" },
  "eta":             { fallbackColor: "#7C3AED", fallbackLight: "#F5F3FF", label: "ETA",             slug: "eta"             },
  "no admission":    { fallbackColor: "#B45309", fallbackLight: "#FFFBEB", label: "No Admission",    slug: "no-admission"    },
};

function hexToLight(hex) {
  if (!hex) return null;
  try {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},0.08)`;
  } catch { return null; }
}

function extractGuideSlug(url) {
  if (!url) return null;
  const part = url.split("/visa-guides/")[1];
  if (!part) return null;
  return part.split("?")[0].split("#")[0].trim() || null;
}

function loadRecent() {
  try {
    if (typeof window === "undefined") return [];
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveRecent(passport, destination, status) {
  try {
    const prev = loadRecent();
    const entry = { passport, destination, status, ts: Date.now() };
    const filtered = prev.filter(
      (r) => !(r.passport.code === passport.code && r.destination.code === destination.code)
    );
    localStorage.setItem(RECENT_KEY, JSON.stringify([entry, ...filtered].slice(0, MAX_RECENT)));
  } catch {}
}

function removeRecent(index) {
  try {
    const prev = loadRecent();
    prev.splice(index, 1);
    localStorage.setItem(RECENT_KEY, JSON.stringify(prev));
    window.dispatchEvent(new Event("eammu_recent_update"));
  } catch {}
}

function PassportCover({ src, alt, flag, name, size = 64 }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: size + 20, minWidth: size + 20 }}>
      <div
        style={{ position: "relative", overflow: "visible", cursor: src ? "pointer" : "default" }}
        onMouseEnter={() => src && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {src ? (
          <img src={src} alt={alt} style={{ width: size, height: Math.round(size * 1.42), objectFit: "cover", borderRadius: 10, boxShadow: "0 4px 18px rgba(0,0,0,0.20)", border: "2.5px solid #fff", transition: "transform 0.2s", transform: hovered ? "scale(1.06)" : "scale(1)", display: "block" }} />
        ) : (
          <div style={{ width: size, height: Math.round(size * 1.42), borderRadius: 10, background: "linear-gradient(145deg,#e2e8f0,#cbd5e1)", border: "2.5px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.10)" }}>
            {flag ? <img src={flag} alt={name} style={{ width: 32, height: 20, objectFit: "cover", borderRadius: 3 }} /> : <span style={{ fontSize: 24 }}>🛂</span>}
          </div>
        )}
        {hovered && src && (
          <div style={{ position: "absolute", bottom: "calc(100% + 14px)", left: "50%", transform: "translateX(-50%)", zIndex: 9999, pointerEvents: "none" }}>
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 10, width: 190, boxShadow: "0 12px 40px rgba(0,0,0,0.18)" }}>
              <img src={src} alt={alt} style={{ width: "100%", height: 250, objectFit: "cover", borderRadius: 10, display: "block" }} />
              <p style={{ fontSize: 11, color: "#64748b", fontWeight: 700, textAlign: "center", marginTop: 8, marginBottom: 0 }}>{name}</p>
            </div>
            <div style={{ width: 12, height: 12, background: "#fff", border: "1px solid #e2e8f0", borderTop: "none", borderLeft: "none", transform: "rotate(45deg)", margin: "-6px auto 0", position: "relative", zIndex: -1 }} />
          </div>
        )}
      </div>
      {flag && <img src={flag} alt={name} style={{ width: 28, height: 18, objectFit: "cover", borderRadius: 3, boxShadow: "0 1px 4px rgba(0,0,0,0.14)" }} />}
      <p style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textAlign: "center", lineHeight: 1.35, margin: 0, maxWidth: size + 10, wordBreak: "break-word" }}>{name}</p>
    </div>
  );
}

function CountrySelect({ label, placeholder, value, onChange, excludeCode, recentList = [] }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [busy, setBusy] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setFocused(false); } };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    if (query.length < 1) return;
    const t = setTimeout(async () => {
      setBusy(true);
      try {
        const r = await fetch(`${BASE}/suggest?q=${encodeURIComponent(query)}&api_key=${API_KEY}`);
        const d = await r.json();
        const list = (d.suggestions || []).filter((s) => s.code !== excludeCode);
        setSuggestions(list);
        setOpen(list.length > 0);
      } catch { setSuggestions([]); }
      finally { setBusy(false); }
    }, 200);
    return () => clearTimeout(t);
  }, [query, excludeCode]);

  const handleFocus = async () => {
    setFocused(true);
    if (value) return;
    if (recentList.length > 0) { setOpen(true); return; }
    setBusy(true);
    try {
      const r = await fetch(`${BASE}/suggest?q=a&api_key=${API_KEY}`);
      const d = await r.json();
      const list = (d.suggestions || []).filter((s) => s.code !== excludeCode);
      if (list.length > 0) { setSuggestions(list); setOpen(true); }
    } catch {}
    finally { setBusy(false); }
  };

  const pick = (s) => { onChange(s); setQuery(""); setSuggestions([]); setOpen(false); setFocused(false); };
  const clear = () => { onChange(null); setQuery(""); setSuggestions([]); };

  const showRecent = focused && query.length === 0 && recentList.length > 0 && !value;
  const listItems = showRecent ? recentList : suggestions;

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <label style={{ display: "block", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 8 }}>{label}</label>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 14px", borderRadius: 14, border: `2px solid ${focused ? "#3b82f6" : value ? "#cbd5e1" : "#e2e8f0"}`, background: focused ? "#fff" : "#f8fafc", transition: "border-color 0.15s, background 0.15s", minHeight: 54 }}>
        <img src={value?.flag || "https://api.eammu.com/passports/eammu.png"} alt="" style={{ width: value?.flag ? 24 : 22, height: value?.flag ? 16 : 22, objectFit: "cover", borderRadius: value?.flag ? 3 : 4, flexShrink: 0, opacity: value?.flag ? 1 : 0.55 }} />
        <input type="text" style={{ flex: 1, padding: "15px 0", background: "transparent", fontSize: 14, color: "#1e293b", outline: "none", border: "none", minWidth: 0 }} placeholder={placeholder} value={value ? value.name : query} onChange={(e) => { if (value) clear(); setQuery(e.target.value); if (e.target.value.length === 0) setOpen(recentList.length > 0); }} onFocus={handleFocus} autoComplete="off" spellCheck={false} />
        {busy && <span style={{ width: 16, height: 16, border: "2px solid #cbd5e1", borderTop: "2px solid #3b82f6", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite", flexShrink: 0 }} />}
        {value && <button onClick={clear} style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: 20, lineHeight: 1, padding: 2, flexShrink: 0 }} aria-label="Clear">×</button>}
      </div>
      {open && listItems.length > 0 && (
        <ul style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, boxShadow: "0 8px 32px rgba(0,0,0,0.10)", zIndex: 200, maxHeight: 250, overflowY: "auto", padding: "6px 0", margin: 0, listStyle: "none" }}>
          {showRecent && <li style={{ padding: "6px 14px 4px", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94a3b8" }}>Recent</li>}
          {listItems.map((s) => (
            <li key={s.code} onMouseDown={(e) => { e.preventDefault(); pick(s); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", cursor: "pointer", fontSize: 13, color: "#334155" }} onMouseEnter={(e) => e.currentTarget.style.background = "#f1f5f9"} onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}>
              {s.flag && <img src={s.flag} alt="" style={{ width: 20, height: 13, objectFit: "cover", borderRadius: 2, flexShrink: 0 }} />}
              <span style={{ flex: 1 }}>{s.name}</span>
              {showRecent && <span style={{ fontSize: 10, color: "#94a3b8" }}>recent</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const TOP_PAIRS = [
  ["India", "United States"], ["Bangladesh", "Canada"], ["Canada", "United Arab Emirates"],
  ["Pakistan", "United Kingdom"], ["Philippines", "Singapore"], ["Nepal", "Australia"],
  ["Sri Lanka", "Germany"], ["Nigeria", "Turkey"], ["Egypt", "Malaysia"],
  ["Indonesia", "Japan"], ["Vietnam", "France"], ["Kenya", "Thailand"],
  ["Thailand", "Albania"], ["Bangladesh", "Albania"],
];
const INITIAL_PAIRS = 7;

function TopDestinations({ onSelectPassport, onSelectDestination }) {
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (fetched) return;
    setLoading(true);
    const go = async () => {
      try {
        const resolved = await Promise.all(
          TOP_PAIRS.map(async ([fromName, toName]) => {
            try {
              const r = await fetch(`${BASE}/passport?from=${encodeURIComponent(fromName)}&to=${encodeURIComponent(toName)}&api_key=${API_KEY}`);
              if (!r.ok) return null;
              const d = await r.json();
              if (!d?.from || !d?.to) return null;
              return { from: d.from, to: d.to };
            } catch { return null; }
          })
        );
        setPairs(resolved.filter(Boolean));
        setFetched(true);
      } catch {}
      finally { setLoading(false); }
    };
    go();
  }, [fetched]);

  const visiblePairs = showAll ? pairs : pairs.slice(0, INITIAL_PAIRS);

  const MiniPassport = ({ country, role, onClick }) => (
    <button onClick={(e) => { e.stopPropagation(); onClick(country); }} title={`Set as ${role}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", borderRadius: 10, padding: "6px 8px", transition: "background 0.12s", flex: 1 }} onMouseEnter={(e) => e.currentTarget.style.background = "rgba(37,99,235,0.07)"} onMouseLeave={(e) => e.currentTarget.style.background = "none"}>
      {country.passport_cover ? (
        <img src={country.passport_cover} alt={country.name} style={{ width: 42, height: 59, objectFit: "cover", borderRadius: 7, boxShadow: "0 3px 12px rgba(0,0,0,0.18)", border: "2px solid #fff" }} />
      ) : (
        <div style={{ width: 42, height: 59, borderRadius: 7, background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 6px rgba(0,0,0,0.10)" }}>
          <img src={country.flag || "https://api.eammu.com/passports/eammu.png"} alt={country.name} style={{ width: 26, height: 17, objectFit: "cover", borderRadius: 2 }} />
        </div>
      )}
      {country.flag && <img src={country.flag} alt="" style={{ width: 20, height: 13, objectFit: "cover", borderRadius: 2 }} />}
      <span style={{ fontSize: 9, fontWeight: 700, color: "#475569", textAlign: "center", lineHeight: 1.3, maxWidth: 58, wordBreak: "break-word", textTransform: "uppercase", letterSpacing: "0.02em" }}>{country.name}</span>
    </button>
  );

  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8", margin: 0 }}>Top Destinations</p>
        {loading && <span style={{ width: 12, height: 12, border: "2px solid #e2e8f0", borderTop: "2px solid #3b82f6", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />}
      </div>
      {pairs.length > 0 && (
        <>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 }}>
            {visiblePairs.map((pair, i) => (
              <div key={i} style={{ background: "#f8fafc", borderRadius: 16, border: "1px solid #e2e8f0", padding: "12px 8px 10px", display: "flex", alignItems: "center", gap: 4, transition: "border-color 0.12s, box-shadow 0.12s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#bfdbfe"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(37,99,235,0.08)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "none"; }}>
                <MiniPassport country={pair.from} role="passport" onClick={(c) => onSelectPassport(c)} />
                <span style={{ color: "#cbd5e1", fontSize: 13, flexShrink: 0 }}>→</span>
                <MiniPassport country={pair.to} role="destination" onClick={(c) => onSelectDestination(c)} />
              </div>
            ))}
          </div>
          {pairs.length > INITIAL_PAIRS && (
            <button onClick={() => setShowAll((v) => !v)} style={{ marginTop: 10, display: "block", width: "100%", padding: "8px 0", borderRadius: 10, border: "1.5px dashed #e2e8f0", background: "none", color: "#94a3b8", fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase", transition: "all 0.15s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#3b82f6"; e.currentTarget.style.color = "#3b82f6"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.color = "#94a3b8"; }}>
              {showAll ? "▲ Show Less" : `+ ${pairs.length - INITIAL_PAIRS} More Routes`}
            </button>
          )}
        </>
      )}
    </div>
  );
}

function RecentSearches({ onPick }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(loadRecent());
    const handler = () => setItems(loadRecent());
    window.addEventListener("eammu_recent_update", handler);
    return () => window.removeEventListener("eammu_recent_update", handler);
  }, []);
  if (items.length === 0) return null;
  return (
    <div style={{ marginBottom: 20 }}>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 10px" }}>Recent Searches</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {items.map((r, i) => {
          const meta = STATUS_META[r.status];
          return (
            <div key={i} style={{ display: "inline-flex", alignItems: "center", borderRadius: 999, border: `1.5px solid ${meta?.fallbackColor || "#e2e8f0"}`, background: "#fff", overflow: "hidden" }}>
              <button onClick={() => onPick(r.passport, r.destination)} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 10px 6px 12px", background: "none", border: "none", fontSize: 12, fontWeight: 500, color: "#334155", cursor: "pointer" }}>
                {r.passport.flag && <img src={r.passport.flag} alt="" style={{ width: 16, height: 11, objectFit: "cover", borderRadius: 2 }} />}
                <span style={{ color: "#64748b" }}>{r.passport.name}</span>
                <span style={{ color: "#cbd5e1" }}>→</span>
                {r.destination.flag && <img src={r.destination.flag} alt="" style={{ width: 16, height: 11, objectFit: "cover", borderRadius: 2 }} />}
                <span style={{ color: "#64748b" }}>{r.destination.name}</span>
                {meta && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: meta.fallbackLight, color: meta.fallbackColor }}>{meta.label}</span>}
              </button>
              <button onClick={() => removeRecent(i)} aria-label="Remove" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 26, height: "100%", minHeight: 30, background: "none", border: "none", borderLeft: `1px solid ${meta?.fallbackColor || "#e2e8f0"}`, color: "#94a3b8", fontSize: 14, cursor: "pointer", padding: "0 6px", transition: "background 0.12s, color 0.12s" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#fef2f2"; e.currentTarget.style.color = "#dc2626"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#94a3b8"; }}>×</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── SEO data ─────────────────────────────────────────────────────────────────

const VISA_TYPES_EXPLAINED = [
  {
    icon: "📋",
    title: "Visa Required",
    color: "#DC2626",
    light: "#FFF5F5",
    desc: "Your passport requires a visa to enter this country. You must apply at the embassy or consulate before departure. Processing time, cost, and document requirements vary by destination.",
  },
  {
    icon: "💻",
    title: "E-Visa (Electronic Visa)",
    color: "#2563EB",
    light: "#EFF6FF",
    desc: "Apply online before travel. An e-visa is approved digitally and linked to your passport. No embassy visit is needed. You receive approval by email, typically within a few hours to several days.",
  },
  {
    icon: "🛬",
    title: "Visa on Arrival",
    color: "#059669",
    light: "#ECFDF5",
    desc: "Obtain your visa at the destination airport or land border. You pay the fee on arrival. Bring a passport photo, return ticket, hotel booking proof, and sufficient funds as commonly required documents.",
  },
  {
    icon: "⚡",
    title: "ETA (Electronic Travel Authorization)",
    color: "#7C3AED",
    light: "#F5F3FF",
    desc: "A pre-approved electronic permission linked to your passport. Required before boarding a flight to certain countries. Apply online and receive approval within minutes to 72 hours. Not a visa but mandatory.",
  },
  {
    icon: "✅",
    title: "Visa-Free",
    color: "#10b981",
    light: "#ECFDF5",
    desc: "No visa needed. You may enter freely for a limited number of days using your passport only. A visa-free result shows the maximum allowed stay in days. Conditions still apply — check entry requirements.",
  },
  {
    icon: "🚫",
    title: "No Admission",
    color: "#B45309",
    light: "#FFFBEB",
    desc: "Entry is restricted or denied for this passport. This may be due to diplomatic reasons or sanctions. Contact the destination embassy for the latest rules. Alternative routing via a third country may be required.",
  },
];

const DOCUMENTS_CHECKLIST = [
  { label: "Valid Passport", note: "Must be valid for at least 6 months beyond your intended stay" },
  { label: "Passport-Sized Photos", note: "Usually 2–4 recent photos with white background, 35×45mm format" },
  { label: "Completed Visa Application Form", note: "Download from the official embassy or e-visa portal" },
  { label: "Flight Itinerary / Confirmed Booking", note: "Return or onward ticket details showing your travel dates" },
  { label: "Hotel Reservation or Host Letter", note: "Proof of accommodation for the duration of stay" },
  { label: "Travel Insurance", note: "Minimum €30,000 coverage required for Schengen and many other destinations" },
  { label: "Bank Statement / Financial Proof", note: "Last 3–6 months showing sufficient funds for your trip" },
  { label: "Employment Letter or Business Registration", note: "Employer letter with salary confirmation or self-employment proof" },
  { label: "Visa Fee Payment Receipt", note: "Varies by country: typically USD $15 – $200 for tourist visas" },
  { label: "National ID / Birth Certificate", note: "Sometimes required alongside passport for verification" },
];

const POPULAR_PASSPORT_ROUTES = [
  { from: "Bangladesh", to: "Canada", status: "Visa Required" },
  { from: "Bangladesh", to: "Malaysia", status: "Visa on Arrival" },
  { from: "Bangladesh", to: "Thailand", status: "Visa on Arrival" },
  { from: "Bangladesh", to: "Maldives", status: "Visa-Free · 30 days" },
  { from: "Bangladesh", to: "Indonesia", status: "Visa-Free · 30 days" },
  { from: "Bangladesh", to: "UAE", status: "Visa Required" },
  { from: "Bangladesh", to: "Turkey", status: "E-Visa" },
  { from: "Bangladesh", to: "Azerbaijan", status: "E-Visa" },
  { from: "India", to: "UAE", status: "Visa Required" },
  { from: "India", to: "Thailand", status: "Visa on Arrival" },
  { from: "India", to: "Sri Lanka", status: "E-Visa" },
  { from: "Pakistan", to: "Turkey", status: "Visa Required" },
  { from: "Nepal", to: "India", status: "Visa-Free" },
  { from: "Philippines", to: "Japan", status: "Visa-Free · 30 days" },
];

const VISA_TIPS = [
  {
    icon: "⏰",
    title: "Apply Early",
    tip: "Submit your visa application at least 4–6 weeks before travel. Some embassies take up to 8 weeks. Schengen visas can take 15 days on average.",
  },
  {
    icon: "📅",
    title: "Check Passport Validity",
    tip: "Most countries require 6 months of validity beyond your arrival date. Check this before booking flights — renewing a passport takes time.",
  },
  {
    icon: "🔍",
    title: "Verify Directly with the Embassy",
    tip: "Visa rules change frequently. Always confirm requirements on the official embassy or immigration website of the destination country before travel.",
  },
  {
    icon: "💰",
    title: "Show Sufficient Funds",
    tip: "Many countries require proof that you can financially support yourself during the trip. A typical guideline is USD $50–100 per day of stay.",
  },
  {
    icon: "🧳",
    title: "Book Refundable Flights First",
    tip: "For visa applications, you need a confirmed itinerary. Use a flexible or refundable booking so you can adjust dates after visa approval.",
  },
  {
    icon: "📋",
    title: "Complete Every Form Field",
    tip: "Incomplete applications are a top reason for delays and rejections. Double-check every field, sign all required sections, and include all attachments.",
  },
];

const VISA_FAQS = [
  {
    q: "How do I check visa requirements for my passport?",
    a: "Select your passport country and destination country, then click 'Check Visa Requirements'. The tool returns the current visa status for that route instantly based on live data from our API.",
  },
  {
    q: "What is the difference between a visa and an ETA?",
    a: "A visa is a physical or digital stamp in your passport granting entry permission. An ETA (Electronic Travel Authorization) is a pre-authorization linked electronically to your passport number — it does not appear as a stamp. Both must be obtained before flying to certain destinations.",
  },
  {
    q: "Can I get a visa on arrival for all countries?",
    a: "No. Visa on arrival availability depends on your passport and the destination country's agreements. Our visa checker will show you whether visa on arrival is available for your specific passport and destination combination.",
  },
  {
    q: "How long does a visa application take?",
    a: "Processing times vary widely: tourist e-visas can be approved within hours, while Schengen visas take 15 days on average and some embassy visas take 4–8 weeks. Always apply well in advance of your travel date.",
  },
  {
    q: "What documents are required for a tourist visa?",
    a: "Common requirements include a valid passport (6 months validity), completed application form, passport photos, return flight itinerary, hotel booking proof, travel insurance, bank statements, and visa fee payment. Exact requirements differ by destination.",
  },
  {
    q: "Is travel insurance required for a visa?",
    a: "It is mandatory for Schengen Area visas (minimum €30,000 coverage). Many other countries also require travel insurance. Even where it is not mandatory, travel insurance is strongly recommended for all international travel.",
  },
  {
    q: "What happens if my visa application is rejected?",
    a: "You can usually reapply with stronger supporting documents. The rejection letter often states the reason. Common reasons include insufficient funds proof, incomplete documents, travel history concerns, or previous overstays.",
  },
  {
    q: "Do children need separate visas?",
    a: "Yes. Children generally need their own visa or travel document. Some countries issue family visas. Always check the destination country's rules for minor travelers traveling with parents or guardians.",
  },
  {
    q: "What is a Schengen visa and which countries does it cover?",
    a: "A Schengen visa allows entry to 27 European countries — including France, Germany, Italy, Spain, Netherlands, and others — with a single visa for up to 90 days within a 180-day period.",
  },
  {
    q: "Can I extend my visa after arrival?",
    a: "Some countries allow visa extensions through their immigration authorities after arrival. This is not universally available and must be applied for before your current visa expires. Check with the destination country's immigration office.",
  },
  {
    q: "What is visa-free travel?",
    a: "Visa-free travel means your passport allows entry to a country without needing to apply for a visa beforehand. A maximum stay limit (such as 30 or 90 days) usually applies. The visa checker shows the allowed duration when this is available.",
  },
  {
    q: "How accurate is this visa checker?",
    a: "The visa checker uses real-time data from the Eammu API which is regularly updated. However, visa policies can change rapidly. Always verify final entry requirements with the official embassy or immigration authority before booking.",
  },
];

const COUNTRY_SPECIFIC_GUIDES = [
  { country: "Canada", flag: "🇨🇦", type: "Visa Required for most South Asian passports", note: "Apply through IRCC. Requires biometrics, strong financial proof, and travel history." },
  { country: "United Kingdom", flag: "🇬🇧", type: "Standard Visitor Visa", note: "Apply online via UK Visas and Immigration (UKVI). Processing: 3 weeks average." },
  { country: "United States", flag: "🇺🇸", type: "B1/B2 Tourist Visa", note: "Interview required at US Embassy. Apply well in advance — processing varies by post." },
  { country: "Schengen Area", flag: "🇪🇺", type: "Schengen Visa (Type C)", note: "Apply to the embassy of the country with the longest stay or main destination." },
  { country: "UAE (Dubai)", flag: "🇦🇪", type: "Visa on Arrival / E-Visa", note: "Many passports qualify for visa on arrival. Bangladeshi, Indian, Pakistani nationals require advance visa." },
  { country: "Turkey", flag: "🇹🇷", type: "E-Visa", note: "Apply at evisa.gov.tr. Most nationalities approved instantly. Valid 30–90 days." },
  { country: "Malaysia", flag: "🇲🇾", type: "Visa on Arrival / Visa-Free", note: "Many South Asian passports get 30-day visa on arrival. Indian nationals use eNTRI or e-Visa." },
  { country: "Thailand", flag: "🇹🇭", type: "Visa on Arrival / E-Visa", note: "30-day visa on arrival for many passports. Thailand e-Visa portal now active for pre-arrival approval." },
  { country: "Australia", flag: "🇦🇺", type: "ETA or Tourist Visa", note: "ETA available for selected passport holders. Others apply for Visitor Visa (subclass 600)." },
  { country: "Japan", flag: "🇯🇵", type: "Visa-Free / Visa Required", note: "Select passports enjoy 90-day visa-free access. South Asian passports require a tourist visa via the consulate." },
];

const HOW_IT_WORKS_STEPS = [
  { n: "01", title: "Select Your Passport", desc: "Choose your nationality from the dropdown. Start typing to search from our full country database." },
  { n: "02", title: "Choose Destination", desc: "Enter the country you plan to visit. The tool shows real-time visa status for that exact passport-destination pair." },
  { n: "03", title: "Get Instant Visa Status", desc: "The result shows whether you need a visa, can apply for e-visa, use visa on arrival, ETA, or travel visa-free." },
  { n: "04", title: "Follow the Step-by-Step Guide", desc: "Click 'View Guide' to see application steps, required documents, fees, processing times, and embassy contact details." },
];

const DEFAULT_PASSPORT_NAME    = "Bangladesh";
const DEFAULT_DESTINATION_NAME = "Canada";

// ── Accordion for FAQs ────────────────────────────────────────────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 14, marginTop: 14 }}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{ width: "100%", background: "none", border: "none", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, padding: 0 }}
      >
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", margin: 0, lineHeight: 1.45, flex: 1 }}>{q}</h3>
        <span style={{ color: "#2563eb", fontSize: 18, lineHeight: 1, flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▾</span>
      </button>
      {open && <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, margin: "10px 0 0" }}>{a}</p>}
    </div>
  );
}

export default function VisaCheckerPage() {
  const router = useRouter();
  const [passport, setPassport] = useState(null);
  const [destination, setDestination] = useState(null);
  const [result, setResult] = useState(null);
  const [guideColor, setGuideColor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentList, setRecentList] = useState([]);

  useEffect(() => {
    setRecentList(loadRecent());
    const handler = () => setRecentList(loadRecent());
    window.addEventListener("eammu_recent_update", handler);
    return () => window.removeEventListener("eammu_recent_update", handler);
  }, []);

  useEffect(() => {
    const fetchDefault = async (name) => {
      try {
        const r = await fetch(`${BASE}/suggest?q=${encodeURIComponent(name)}&api_key=${API_KEY}`);
        const d = await r.json();
        return (d.suggestions || []).find((s) => s.name.toLowerCase() === name.toLowerCase()) || (d.suggestions || [])[0] || null;
      } catch { return null; }
    };
    Promise.all([fetchDefault(DEFAULT_PASSPORT_NAME), fetchDefault(DEFAULT_DESTINATION_NAME)]).then(([pp, dd]) => {
      if (pp) setPassport(pp);
      if (dd) setDestination(dd);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const recentPassports    = recentList.map((r) => r.passport);
  const recentDestinations = recentList.map((r) => r.destination);
  const canCheck = passport && destination;

  const check = useCallback(async (pp = passport, dd = destination) => {
    if (!pp || !dd) return;
    setLoading(true);
    setError("");
    setResult(null);
    setGuideColor(null);
    try {
      const r = await fetch(`${BASE}/passport?from=${encodeURIComponent(pp.name)}&to=${encodeURIComponent(dd.name)}&api_key=${API_KEY}`);
      if (!r.ok) throw new Error(`API ${r.status}`);
      const data = await r.json();
      const guideSlug = extractGuideSlug(data.visa_guide_url) || STATUS_META[data.visa_status]?.slug || null;
      if (guideSlug) {
        fetch(`/api/visa-guide/${guideSlug}`)
          .then((gr) => gr.ok ? gr.json() : null)
          .then((gd) => {
            if (!gd) return;
            const apiColor = gd?.color || gd?.primary_color || gd?.theme_color || null;
            if (apiColor && /^#[0-9a-fA-F]{6}$/.test(apiColor)) setGuideColor(apiColor);
          })
          .catch(() => {});
      }
      setResult(data);
      if (data.visa_status) { saveRecent(pp, dd, data.visa_status); window.dispatchEvent(new Event("eammu_recent_update")); }
    } catch {
      setError("Visa Details Not Available. Please Contact - info@visaexpresshub.com");
    } finally {
      setLoading(false);
    }
  }, [passport, destination]);

  const handleRecentPick = (pp, dd) => { setPassport(pp); setDestination(dd); check(pp, dd); };

  const goToGuide = () => {
    if (!result) return;
    const cs = `${slugify(passport.name)}-visa-for-${slugify(destination.name)}`;
    const gs = extractGuideSlug(result.visa_guide_url) || STATUS_META[result.visa_status]?.slug || "visa-required";
    router.push(`/visa-checker/${cs}/${gs}`);
  };

  const baseMeta = result ? STATUS_META[result.visa_status] : null;
  const resolvedColor = guideColor || baseMeta?.fallbackColor || null;
  const resolvedLight = guideColor ? (hexToLight(guideColor) || baseMeta?.fallbackLight) : baseMeta?.fallbackLight || null;
  const meta = baseMeta ? { ...baseMeta, color: resolvedColor, light: resolvedLight } : null;
  const isNumericFree = result && !meta && result.visa_status && /^\d+$/.test(String(result.visa_status));

  const fromCover = result?.from?.passport_cover || null;
  const fromFlag  = result?.from?.flag  || passport?.flag  || null;
  const fromName  = result?.from?.name  || passport?.name  || "";
  const toCover   = result?.to?.passport_cover   || null;
  const toFlag    = result?.to?.flag    || destination?.flag    || null;
  const toName    = result?.to?.name    || destination?.name    || "";

  return (
    <>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .visa-page { min-height: 100vh; background: linear-gradient(135deg,#f0f4ff 0%,#fafbff 55%,#f0f9ff 100%); }
        .visa-container { max-width: 1280px; margin: 0 auto; padding: 52px 20px 80px; }
        .visa-search-card { background: #fff; border-radius: 24px; border: 1px solid #e2e8f0; box-shadow: 0 2px 24px rgba(0,0,0,0.06); padding: 28px 28px 24px; margin-bottom: 28px; }
        .visa-selector-grid { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); gap: 12px; align-items: end; margin-bottom: 16px; }
        .visa-swap-button { width: 42px; height: 42px; border-radius: 50%; border: 1.5px solid #e2e8f0; background: #f8fafc; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 19px; color: #94a3b8; transition: all 0.15s; flex-shrink: 0; margin-bottom: 2px; }
        .visa-result-route { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 28px 32px 16px; overflow: visible; }
        .visa-result-route.visa-free { padding-bottom: 24px; }
        .seo-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .seo-panel { background: #fff; border: 1px solid #e2e8f0; border-radius: 18px; padding: 28px 26px; box-shadow: 0 2px 18px rgba(15,23,42,0.04); }
        .seo-panel-title { font-size: 20px; font-weight: 800; color: #0f172a; margin: 0 0 6px; line-height: 1.25; }
        .seo-panel-sub { font-size: 13px; color: "#475569"; line-height: 1.7; margin: 0 0 18px; }
        .visa-type-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }
        .doc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .route-table { width: 100%; border-collapse: collapse; font-size: 13px; }
        .route-table th { text-align: left; padding: 8px 12px; background: #f8fafc; color: #94a3b8; font-size: 10px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; border-bottom: 1px solid #e2e8f0; }
        .route-table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; color: #334155; }
        .route-table tr:last-child td { border-bottom: none; }
        .tip-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
        .country-guide-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
        @media (max-width: 900px) {
          .visa-container { padding: 34px 14px 56px; }
          .seo-2col, .doc-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 640px) {
          .visa-search-card, .seo-panel { border-radius: 18px; padding: 18px 14px; }
          .visa-selector-grid { grid-template-columns: 1fr; gap: 14px; }
          .visa-swap-button { margin: 0 auto; transform: rotate(90deg); }
          .visa-result-route, .visa-result-route.visa-free { padding: 22px 12px 18px; gap: 8px; }
        }
      `}</style>

      <div className="visa-page">
        <div className="visa-container">

          {/* ── HERO HEADER ─────────────────────────────────────────── */}
          <header style={{ marginBottom: 36 }}>
            <span style={{ display: "inline-block", fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#2563eb", background: "#eff6ff", padding: "4px 12px", borderRadius: 999, marginBottom: 14 }}>
              Free Visa Check Tool — Instant Results
            </span>
            <h1 style={{ fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 800, color: "#0f172a", margin: "0 0 14px", lineHeight: 1.08 }}>
              Visa Checker — Check Visa Requirements by Passport &amp; Destination
            </h1>
            <p style={{ fontSize: 16, color: "#475569", margin: "0 0 28px", lineHeight: 1.75, maxWidth: 820 }}>
              Use the Visa Express Hub visa checker to instantly find out whether you need a visa, can apply for an e-visa, qualify for visa on arrival, need an ETA, or can travel visa-free — based on your exact passport nationality and destination country. Trusted by travelers from Bangladesh, India, Pakistan, Nepal, Philippines, and across South Asia.
            </p>

            {/* Stat strip */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, maxWidth: 740 }}>
              {[
                ["200+", "Passport & destination combinations"],
                ["6 Statuses", "Visa required, e-visa, VOA, ETA, visa-free, no admission"],
                ["Live Data", "Updated visa requirements from our API"],
                ["Free", "No sign-up needed — check instantly"],
              ].map(([v, l]) => (
                <div key={v} style={{ background: "#fff", border: "1px solid #dbeafe", borderRadius: 14, padding: "14px 14px" }}>
                  <p style={{ fontSize: 18, fontWeight: 800, color: "#2563eb", margin: "0 0 4px" }}>{v}</p>
                  <p style={{ fontSize: 11, color: "#64748b", lineHeight: 1.45, margin: 0 }}>{l}</p>
                </div>
              ))}
            </div>
          </header>

          {/* ── SEARCH CARD ─────────────────────────────────────────── */}
          <section className="visa-search-card" aria-label="Visa requirements checker">
            <RecentSearches onPick={handleRecentPick} />
  

            <div className="visa-selector-grid">
              <CountrySelect label="Your Passport / Nationality" placeholder="Select your passport country…" value={passport} onChange={setPassport} excludeCode={destination?.code} recentList={recentPassports.filter((r) => r.code !== destination?.code)} />
              <button onClick={() => { setPassport(destination); setDestination(passport); setResult(null); }} title="Swap" className="visa-swap-button" onMouseEnter={(e) => { e.currentTarget.style.background="#2563eb"; e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor="#2563eb"; }} onMouseLeave={(e) => { e.currentTarget.style.background="#f8fafc"; e.currentTarget.style.color="#94a3b8"; e.currentTarget.style.borderColor="#e2e8f0"; }}>⇄</button>
              <CountrySelect label="Destination Country" placeholder="Where are you travelling to?" value={destination} onChange={setDestination} excludeCode={passport?.code} recentList={recentDestinations.filter((r) => r.code !== passport?.code)} />
            </div>

            <button onClick={() => check()} disabled={!canCheck || loading} style={{ width: "100%", padding: "15px 0", borderRadius: 14, border: "none", cursor: canCheck && !loading ? "pointer" : "not-allowed", background: canCheck && !loading ? "#2563eb" : "#bfdbfe", color: canCheck && !loading ? "#fff" : "#93c5fd", fontSize: 14, fontWeight: 700, letterSpacing: "0.04em", transition: "background 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              {loading ? (<><span style={{ width: 16, height: 16, border: "2.5px solid rgba(255,255,255,0.35)", borderTop: "2.5px solid #fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />Checking…</>) : "Check Visa Requirements →"}
            </button>

            {error && <div style={{ marginTop: 14, padding: "12px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, color: "#dc2626", fontSize: 13 }}>{error}</div>}

            {/* Result: known status */}
            {result && meta && (
              <div style={{ marginTop: 20, borderRadius: 18, border: `2px solid ${meta.color}`, background: meta.light, overflow: "visible", animation: "fadeUp 0.3s ease" }}>
                <div className="visa-result-route">
                  <PassportCover src={fromCover} alt={fromName} flag={fromFlag} name={fromName} size={68} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", padding: "5px 16px", borderRadius: 999, background: meta.color, color: "#fff", whiteSpace: "nowrap" }}>{meta.label}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, width: "100%" }}>
                      <div style={{ flex: 1, height: 1, background: meta.color, opacity: 0.25 }} />
                      <span style={{ fontSize: 22, color: meta.color }}>✈</span>
                      <div style={{ flex: 1, height: 1, background: meta.color, opacity: 0.25 }} />
                    </div>
                  </div>
                  <PassportCover src={toCover} alt={toName} flag={toFlag} name={toName} size={68} />
                </div>
                {result.visa_guide_url && (
                  <div style={{ padding: "4px 24px 22px" }}>
                    <button onClick={goToGuide} style={{ width: "100%", padding: "11px 0", borderRadius: 12, border: `2px solid ${meta.color}`, background: "transparent", color: meta.color, fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.15s" }} onMouseEnter={(e) => { e.currentTarget.style.background = meta.color; e.currentTarget.style.color = "#fff"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = meta.color; }}>
                      View Step-by-Step Visa Guide →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Result: visa-free numeric */}
            {result && isNumericFree && (
              <div style={{ marginTop: 20, borderRadius: 18, border: "2px solid #10b981", background: "#ecfdf5", overflow: "visible", animation: "fadeUp 0.3s ease" }}>
                <div className="visa-result-route visa-free">
                  <PassportCover src={fromCover} alt={fromName} flag={fromFlag} name={fromName} size={68} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", padding: "5px 16px", borderRadius: 999, background: "#10b981", color: "#fff", whiteSpace: "nowrap" }}>Visa-Free · {result.visa_status} days</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, width: "100%" }}>
                      <div style={{ flex: 1, height: 1, background: "#10b981", opacity: 0.25 }} />
                      <span style={{ fontSize: 22, color: "#10b981" }}>✈</span>
                      <div style={{ flex: 1, height: 1, background: "#10b981", opacity: 0.25 }} />
                    </div>
                  </div>
                  <PassportCover src={toCover} alt={toName} flag={toFlag} name={toName} size={68} />
                </div>
              </div>
            )}
            <div className="mt-6" >
          <TopDestinations onSelectPassport={(c) => setPassport(c)} onSelectDestination={(c) => setDestination(c)} />
            </div>
             
          </section>
        
          {/* ── HOW IT WORKS ────────────────────────────────────────── */}
          <section style={{ marginBottom: 36 }} aria-label="How the visa checker works">
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 14 }}>How It Works</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
              {HOW_IT_WORKS_STEPS.map(({ n, title, desc }) => (
                <div key={n} style={{ background: "#fff", border: "1px solid #f1f5f9", borderRadius: 16, padding: "18px 16px" }}>
                  <p style={{ fontSize: 11, fontWeight: 800, color: "#2563eb", marginBottom: 6, margin: "0 0 6px" }}>{n}</p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", margin: "0 0 6px" }}>{title}</p>
                  <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.55, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── VISA TYPES EXPLAINED ─────────────────────────────────── */}
          <section style={{ marginBottom: 36 }} aria-label="Visa types explained">
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Understanding Visa Types</h2>
            <p style={{ fontSize: 14, color: "#475569", margin: "0 0 20px", lineHeight: 1.7 }}>
              The visa checker returns one of six statuses for any passport and destination combination. Here is what each one means and what you need to do before you fly.
            </p>
            <div className="visa-type-grid">
              {VISA_TYPES_EXPLAINED.map(({ icon, title, color, light, desc }) => (
                <div key={title} style={{ background: light, border: `1.5px solid ${color}22`, borderLeft: `4px solid ${color}`, borderRadius: 14, padding: "16px 18px" }}>
                  <p style={{ fontSize: 20, margin: "0 0 8px" }}>{icon}</p>
                  <p style={{ fontSize: 13, fontWeight: 800, color, margin: "0 0 6px" }}>{title}</p>
                  <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 2-COL: Popular Routes + Documents Checklist ──────────── */}
          <div className="seo-2col" style={{ marginBottom: 36 }}>

            {/* Popular routes */}
            <article className="seo-panel" aria-label="Popular visa check routes">
              <h2 className="seo-panel-title">Popular Visa Check Routes</h2>
              <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 18px", lineHeight: 1.6 }}>
                These are the most searched passport and destination combinations by travelers from South Asia and the Middle East.
              </p>
              <table className="route-table" aria-label="Common passport visa requirement routes">
                <thead>
                  <tr>
                    <th>Passport</th>
                    <th>Destination</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {POPULAR_PASSPORT_ROUTES.map((r, i) => (
                    <tr key={i}>
                      <td>{r.from}</td>
                      <td>{r.to}</td>
                      <td>
                        <span style={{ fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: "#f1f5f9", color: "#334155" }}>{r.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>

            {/* Documents checklist */}
            <article className="seo-panel" aria-label="Visa application document checklist">
              <h2 className="seo-panel-title">Visa Application Document Checklist</h2>
              <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 18px", lineHeight: 1.6 }}>
                Most tourist and visitor visa applications require the following documents. Requirements vary by destination — always confirm with the embassy.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
                {DOCUMENTS_CHECKLIST.map(({ label, note }) => (
                  <li key={label} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#2563eb", fontWeight: 800, fontSize: 14, flexShrink: 0, marginTop: 1 }}>✓</span>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", margin: "0 0 2px" }}>{label}</p>
                      <p style={{ fontSize: 12, color: "#64748b", margin: 0, lineHeight: 1.5 }}>{note}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          {/* ── VISA APPLICATION TIPS ────────────────────────────────── */}
          <section style={{ marginBottom: 36 }} aria-label="Visa application tips">
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Visa Application Tips Before You Fly</h2>
            <p style={{ fontSize: 14, color: "#475569", margin: "0 0 20px", lineHeight: 1.7 }}>
              Avoid delays, rejections, and last-minute problems. Follow these expert tips when applying for a tourist visa, business visa, or travel authorization.
            </p>
            <div className="tip-grid">
              {VISA_TIPS.map(({ icon, title, tip }) => (
                <div key={title} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: "18px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 24, flexShrink: 0 }}>{icon}</span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", margin: "0 0 5px" }}>{title}</p>
                    <p style={{ fontSize: 12, color: "#475569", lineHeight: 1.65, margin: 0 }}>{tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── COUNTRY-SPECIFIC GUIDES ──────────────────────────────── */}
          <section style={{ marginBottom: 36 }} aria-label="Country-specific visa guides">
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>Country-Specific Visa Guides</h2>
            <p style={{ fontSize: 14, color: "#475569", margin: "0 0 20px", lineHeight: 1.7 }}>
              Each destination has its own application process, fee structure, and processing timeline. These quick summaries cover the most-visited countries by South Asian travelers.
            </p>
            <div className="country-guide-grid">
              {COUNTRY_SPECIFIC_GUIDES.map(({ country, flag, type, note }) => (
                <div key={country} style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: "18px 18px" }}>
                  <p style={{ fontSize: 22, margin: "0 0 6px" }}>{flag}</p>
                  <p style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", margin: "0 0 4px" }}>{country}</p>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#2563eb", background: "#eff6ff", display: "inline-block", padding: "2px 8px", borderRadius: 999, margin: "0 0 8px" }}>{type}</p>
                  <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6, margin: 0 }}>{note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── 2-COL: About Tool + FAQ (accordion) ──────────────────── */}
          <section className="seo-2col" style={{ marginBottom: 36 }} aria-label="Visa checker information and FAQ">

            <article className="seo-panel">
              <h2 className="seo-panel-title">Check Visa Requirements Before You Fly</h2>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.75, margin: "0 0 14px" }}>
                The Visa Express Hub visa checker is a free online tool for travelers who want to know their visa status before booking international flights. Select your passport nationality and destination country to instantly see whether you need a visa, can apply for an e-visa, qualify for visa on arrival, need an ETA, or can travel visa-free for a set number of days.
              </p>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.75, margin: "0 0 14px" }}>
                Our tool is particularly popular with travelers from Bangladesh, India, Pakistan, Nepal, Sri Lanka, and the Philippines checking requirements for Canada, the UK, USA, Schengen countries, UAE, Malaysia, Thailand, Turkey, Australia, and Japan.
              </p>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.75, margin: "0 0 20px" }}>
                After checking your visa status, you can open a detailed step-by-step guide covering application methods, required documents, official embassy links, average processing time, and visa fees for that specific route.
              </p>
              <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 18 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.1em" }}>This tool is useful for</p>
                <ul style={{ padding: 0, margin: 0, listStyle: "none", display: "grid", gap: 8 }}>
                  {[
                    "Visa check online before booking international flights",
                    "Passport visa requirements by nationality and destination",
                    "Visa-free countries for your passport — with stay duration",
                    "E-visa eligibility check for Turkey, Azerbaijan, Sri Lanka, and more",
                    "Visa on arrival availability for UAE, Thailand, Malaysia, Indonesia",
                    "ETA requirements for Canada, Australia, UK, and New Zealand",
                    "Schengen visa guide for Bangladesh, India, Pakistan passports",
                    "Tourist visa application checklist and document requirements",
                  ].map((item) => (
                    <li key={item} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ color: "#2563eb", fontWeight: 800, flexShrink: 0 }}>→</span>
                      <span style={{ fontSize: 13, color: "#334155", lineHeight: 1.5 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>

            <article className="seo-panel">
              <h2 className="seo-panel-title">Frequently Asked Questions</h2>
              <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 4px", lineHeight: 1.6 }}>
                Common questions about visa requirements, application processes, and how the visa check tool works.
              </p>
              {VISA_FAQS.map((faq) => (
                <FaqItem key={faq.q} q={faq.q} a={faq.a} />
              ))}
            </article>
          </section>

          {/* ── DISCLAIMER ───────────────────────────────────────────── */}
          <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 14, padding: "16px 20px", marginBottom: 36 }}>
            <p style={{ fontSize: 13, color: "#92400e", lineHeight: 1.7, margin: 0 }}>
              <strong>Important:</strong> Visa rules and entry requirements change frequently. This visa checker provides guidance based on our API data, but you must always verify final requirements with the official embassy or consulate of your destination country and your airline before travel. Eammu Holidays is not responsible for denied boarding or entry based on changes in visa policy.
            </p>
          </div>

        </div>
      </div>
    </>
  );
}