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
  const [query,       setQuery]       = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open,        setOpen]        = useState(false);
  const [focused,     setFocused]     = useState(false);
  const [busy,        setBusy]        = useState(false);
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

  const pick  = (s) => { onChange(s); setQuery(""); setSuggestions([]); setOpen(false); setFocused(false); };
  const clear = ()  => { onChange(null); setQuery(""); setSuggestions([]); };

  const showRecent = focused && query.length === 0 && recentList.length > 0 && !value;
  const listItems  = showRecent ? recentList : suggestions;

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
  ["India","United States"],["Bangladesh","Canada"],["Canada","United Arab Emirates"],["Pakistan","United Kingdom"],
  ["Philippines","Singapore"],["Nepal","Australia"],["Sri Lanka","Germany"],["Nigeria","Turkey"],
  ["Egypt","Malaysia"],["Indonesia","Japan"],["Vietnam","France"],["Kenya","Thailand"],
  ["Thailand","Albania"],["Bangladesh","Albania"],
];
const INITIAL_PAIRS = 7;

function TopDestinations({ onSelectPassport, onSelectDestination }) {
  const [pairs,   setPairs]   = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (fetched) return;
    setLoading(true);
    const go = async () => {
      try {
        const resolved = await Promise.all(TOP_PAIRS.map(async ([fromName, toName]) => {
          try {
            const r = await fetch(`${BASE}/passport?from=${encodeURIComponent(fromName)}&to=${encodeURIComponent(toName)}&api_key=${API_KEY}`);
            if (!r.ok) return null;
            const d = await r.json();
            if (!d?.from || !d?.to) return null;
            return { from: d.from, to: d.to };
          } catch { return null; }
        }));
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

const DEFAULT_PASSPORT_NAME    = "Bangladesh";
const DEFAULT_DESTINATION_NAME = "Canada";

export default function VisaCheckerHome() {
  const router = useRouter();

  const [passport,    setPassport]    = useState(null);
  const [destination, setDestination] = useState(null);
  const [result,      setResult]      = useState(null);
  const [guideColor,  setGuideColor]  = useState(null);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState("");
  const [recentList,  setRecentList]  = useState([]);

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
  }, []);

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
        fetch(`/api/visa-guide/${guideSlug}`).then((gr) => gr.ok ? gr.json() : null).then((gd) => {
          if (!gd) return;
          const apiColor = gd?.color || gd?.primary_color || gd?.theme_color || null;
          if (apiColor && /^#[0-9a-fA-F]{6}$/.test(apiColor)) setGuideColor(apiColor);
        }).catch(() => {});
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
        .visa-checker-wrap {
          width: 100%;
          max-width: 83rem;
          margin-left: auto;
          margin-right: auto;
          padding-top: 3rem;
          padding-bottom: 3rem;
          padding-left: 1rem;
          padding-right: 1rem;
          box-sizing: border-box;
        }
        @media (min-width: 640px) {
          .visa-checker-wrap { padding-left: 1.5rem; padding-right: 1.5rem; }
        }
        @media (min-width: 1024px) {
          .visa-checker-wrap { padding-left: 2rem; padding-right: 2rem; }
        }
        .visa-checker-selectors {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 12px;
          align-items: end;
          margin-bottom: 16px;
        }
        @media (max-width: 480px) {
          .visa-checker-selectors {
            grid-template-columns: 1fr;
          }
          .visa-checker-swap {
            display: none !important;
          }
        }
        .visa-checker-result-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 28px 32px 16px;
          overflow: visible;
        }
        @media (max-width: 480px) {
          .visa-checker-result-inner {
            flex-direction: column;
            padding: 20px 16px 12px;
            gap: 8px;
          }
        }
      `}</style>

      <div className="visa-checker-wrap">
      <div style={{
        background: "#fff",
        borderRadius: 24,
        border: "1px solid #e2e8f0",
        boxShadow: "0 2px 24px rgba(0,0,0,0.06)",
        padding: "28px 28px 24px",
      }}>

        {/* ── Short header ── */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", margin: "0 0 4px", lineHeight: 1.2 }}>
            Check your visa and passport requirements before you fly
          </h2>
          <p style={{ fontSize: 13, color: "#94a3b8", margin: 0 }}>
            Instantly check visa requirements for any passport and destination.
          </p>
        </div>

        {/* Recent searches */}
        <RecentSearches onPick={handleRecentPick} />

     

        {/* Selectors row */}
        <div className="visa-checker-selectors">
          <CountrySelect label="Your Passport" placeholder="Select nationality…" value={passport} onChange={setPassport} excludeCode={destination?.code} recentList={recentPassports.filter((r) => r.code !== destination?.code)} />
          <button className="visa-checker-swap" onClick={() => { setPassport(destination); setDestination(passport); setResult(null); }} title="Swap" style={{ width: 42, height: 42, borderRadius: "50%", border: "1.5px solid #e2e8f0", background: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 19, color: "#94a3b8", transition: "all 0.15s", flexShrink: 0, marginBottom: 2 }} onMouseEnter={(e) => { e.currentTarget.style.background="#2563eb"; e.currentTarget.style.color="#fff"; e.currentTarget.style.borderColor="#2563eb"; }} onMouseLeave={(e) => { e.currentTarget.style.background="#f8fafc"; e.currentTarget.style.color="#94a3b8"; e.currentTarget.style.borderColor="#e2e8f0"; }}>⇄</button>
          <CountrySelect label="Destination" placeholder="Where are you going?" value={destination} onChange={setDestination} excludeCode={passport?.code} recentList={recentDestinations.filter((r) => r.code !== passport?.code)} />
        </div>

        {/* Check button */}
        <button onClick={() => check()} disabled={!canCheck || loading} style={{ width: "100%", padding: "15px 0", borderRadius: 14, border: "none", cursor: canCheck && !loading ? "pointer" : "not-allowed", background: canCheck && !loading ? "#2563eb" : "#bfdbfe", color: canCheck && !loading ? "#fff" : "#93c5fd", fontSize: 14, fontWeight: 700, letterSpacing: "0.04em", transition: "background 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          {loading ? (<><span style={{ width: 16, height: 16, border: "2.5px solid rgba(255,255,255,0.35)", borderTop: "2.5px solid #fff", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} />Checking…</>) : "Check Visa Requirements →"}
        </button>

        {error && <div style={{ marginTop: 14, padding: "12px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, color: "#dc2626", fontSize: 13 }}>{error}</div>}

        {/* Result: known status */}
        {result && meta && (
          <div style={{ marginTop: 20, borderRadius: 18, border: `2px solid ${meta.color}`, background: meta.light, overflow: "visible", animation: "fadeUp 0.3s ease" }}>
            <div className="visa-checker-result-inner">
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
                  View Step-by-Step Guide →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Result: visa-free numeric days */}
        {result && isNumericFree && (
          <div style={{ marginTop: 20, borderRadius: 18, border: "2px solid #10b981", background: "#ecfdf5", overflow: "visible", animation: "fadeUp 0.3s ease" }}>
            <div className="visa-checker-result-inner" style={{ paddingBottom: 24 }}>
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
   {/* Top destinations */}
        <TopDestinations onSelectPassport={(c) => setPassport(c)} onSelectDestination={(c) => setDestination(c)} />
      </div>
      </div>
    </>
  );
}