"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const API_KEY = process.env.NEXT_PUBLIC_EAMMU_API_KEY;
const BASE    = "https://api.eammu.com/api/v1";

function slugify(str) {
  return (str || "").toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function hexToLight(hex) {
  if (!hex) return null;
  try {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},0.08)`;
  } catch { return null; }
}

const STATUS_META = {
  "visa required":   { color: "#DC2626", light: "#FEF2F2", label: "Visa Required",    slug: "visa-required"   },
  "e-visa":          { color: "#2563EB", light: "#EFF6FF", label: "E-Visa",            slug: "e-visa"          },
  "visa on arrival": { color: "#059669", light: "#ECFDF5", label: "Visa on Arrival",   slug: "visa-on-arrival" },
  "eta":             { color: "#7C3AED", light: "#F5F3FF", label: "ETA",               slug: "eta"             },
  "no admission":    { color: "#B45309", light: "#FFFBEB", label: "No Admission",      slug: "no-admission"    },
};

const PRIORITY = ["e-visa", "visa on arrival", "eta", "visa required", "no admission"];

// ── SEO Content Block ─────────────────────────────────────────────────────────

function SeoContent({ passport, destination, visaStatus, visaDays }) {
  // Determine human-readable status label
  const isVisaFree = visaStatus && !isNaN(Number(visaStatus));
  const statusMeta = STATUS_META[visaStatus?.toLowerCase?.()] || null;
  const statusLabel = isVisaFree
    ? `Visa-Free (${visaDays || visaStatus} days)`
    : statusMeta?.label || visaStatus || null;

  if (destination) {
    // ── Single pair SEO block ───────────────────────────────────────────────
    return (
      <section className="mt-10 mb-4 bg-white border border-slate-100 rounded-2xl px-6 py-8 space-y-5">

        {/* H1 */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
          {passport} Passport Visa for {destination} –{" "}
          <span className={statusMeta ? "" : "text-emerald-600"}
            style={statusMeta ? { color: statusMeta.color } : {}}
          >
            {statusLabel || "Requirements & Guide"}
          </span>
        </h1>

        {/* Intro paragraph */}
        <p className="text-slate-600 text-sm leading-relaxed">
          {passport} passport holders planning to travel to {destination} must understand
          the current visa requirements before booking flights or accommodation. This page
          provides up-to-date visa status, required documents, estimated processing times,
          and a step-by-step application guide — all powered by the Eammu Holidays live
          visa database.
        </p>

        {/* H2 + details */}
        <div>
          <h2 className="text-base font-semibold text-slate-800 mb-1.5">
            Do {passport} Citizens Need a Visa for {destination}?
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            {statusLabel
              ? <>
                  Based on current data, {passport} passport holders require a{" "}
                  <strong>{statusLabel}</strong> to enter {destination}.{" "}
                  {isVisaFree
                    ? `Citizens can stay in ${destination} for up to ${visaDays || visaStatus} days without a prior visa arrangement.`
                    : statusMeta?.slug === "e-visa"
                      ? `Travellers can conveniently apply online before departure without visiting an embassy.`
                      : statusMeta?.slug === "visa on arrival"
                        ? `Travellers can obtain their visa upon landing at designated ${destination} entry points.`
                        : statusMeta?.slug === "eta"
                          ? `An Electronic Travel Authorization (ETA) must be obtained online before boarding.`
                          : `Please contact Eammu Holidays for full details and embassy appointment assistance.`}
                </>
              : `Please check the result card above for the current visa status between ${passport} and ${destination}.`}
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-800 mb-1.5">
            Required Documents for {passport} Nationals Visiting {destination}
          </h2>
          <ul className="text-sm text-slate-600 space-y-1.5 list-none">
            {[
              `Valid ${passport} passport (minimum 6 months validity)`,
              "Completed visa application form",
              "Recent passport-size photographs",
              "Flight itinerary and confirmed return ticket",
              "Hotel booking or proof of accommodation in " + destination,
              "Bank statements showing sufficient funds",
              "Travel insurance covering the duration of stay",
              "Proof of employment or business registration (if applicable)",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5 shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-400 mt-3">
            * Document requirements may vary. Always confirm with the official {destination} embassy
            or consulate before submitting your application. Eammu Holidays provides personalised
            document checklists for all visa types.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-slate-800 mb-1.5">
            Why Use Eammu Holidays for Your {destination} Visa?
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Eammu Holidays is an IATA-accredited travel and visa consultancy with offices in
            Bangladesh (Cumilla &amp; Dhaka), Dubai/UAE, and Yerevan, Armenia. Our expert visa
            counsellors guide {passport} nationals through every step of the {destination} visa
            process — from document preparation to embassy submission and follow-up. We have helped
            thousands of Bangladeshi and UAE-based travellers secure visas across 150+ countries.
          </p>
        </div>

      </section>
    );
  }

  // ── All-destinations SEO block ──────────────────────────────────────────────
  return (
    <section className="mt-10 mb-4 bg-white border border-slate-100 rounded-2xl px-6 py-8 space-y-5">

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
        {passport} Passport — Visa Requirements for All Countries
      </h1>

      <p className="text-slate-600 text-sm leading-relaxed">
        Discover visa requirements for {passport} passport holders travelling to any destination
        worldwide. This comprehensive guide lists all countries categorised by visa type —
        including visa-free access, e-visa, visa on arrival, ETA, and visa required — helping
        you plan your international travel with confidence.
      </p>

      <div>
        <h2 className="text-base font-semibold text-slate-800 mb-1.5">
          How Strong Is the {passport} Passport?
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          The {passport} passport provides access to a range of global destinations across
          different visa categories. Whether you&apos;re planning a business trip, vacation, or
          long-term stay abroad, use the destination cards above to instantly check the entry
          requirement for any country.
        </p>
      </div>

      <div>
        <h2 className="text-base font-semibold text-slate-800 mb-1.5">
          Plan Your Trip with Eammu Holidays
        </h2>
        <p className="text-slate-600 text-sm leading-relaxed">
          Eammu Holidays is an IATA-accredited visa consultancy serving Bangladeshi travellers
          and UAE-based expatriates. Our offices in Cumilla, Dhaka, Dubai, and Yerevan offer
          end-to-end visa assistance for {passport} passport holders. Contact us for a free
          consultation and personalised document checklist for your chosen destination.
        </p>
      </div>

    </section>
  );
}

// ── PassportCover ─────────────────────────────────────────────────────────────

function PassportCover({ src, alt, flag, name, size = "md" }) {
  const [hovered, setHovered] = useState(false);
  const w = size === "lg" ? 80 : 64;
  const h = size === "lg" ? 112 : 90;

  return (
    <div
      className="flex flex-col items-center gap-2"
      style={{ position: "relative", overflow: "visible", width: w + 16 }}
    >
      <div
        style={{ position: "relative", overflow: "visible", cursor: src ? "pointer" : "default" }}
        onMouseEnter={() => src && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            style={{
              width: w, height: h, objectFit: "cover", borderRadius: 10,
              boxShadow: "0 4px 16px rgba(0,0,0,0.18)", border: "2px solid #fff",
              transition: "transform 0.2s",
              transform: hovered ? "scale(1.06)" : "scale(1)", display: "block",
            }}
          />
        ) : (
          <div style={{
            width: w, height: h, borderRadius: 10, background: "#e2e8f0",
            border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {flag && <img src={flag} alt={name} style={{ width: 36, height: 22, objectFit: "cover", borderRadius: 3 }} />}
          </div>
        )}
        {hovered && src && (
          <div style={{
            position: "absolute", bottom: "calc(100% + 12px)", left: "50%",
            transform: "translateX(-50%)", zIndex: 9999, pointerEvents: "none",
            filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.22))",
          }}>
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 8, width: 180 }}>
              <img src={src} alt={alt} style={{ width: "100%", height: 240, objectFit: "cover", borderRadius: 10, display: "block" }} />
              <p style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textAlign: "center", marginTop: 8 }}>{name}</p>
            </div>
            <div style={{
              width: 12, height: 12, background: "#fff", border: "1px solid #e2e8f0",
              borderTop: "none", borderLeft: "none", transform: "rotate(45deg)",
              margin: "-6px auto 0", position: "relative", zIndex: -1,
            }} />
          </div>
        )}
      </div>
      {flag && (
        <img src={flag} alt={name} style={{ width: 32, height: 20, objectFit: "cover", borderRadius: 3, boxShadow: "0 1px 4px rgba(0,0,0,0.12)" }} />
      )}
      <p style={{ fontSize: 11, color: "#64748b", fontWeight: 600, textAlign: "center", lineHeight: 1.3, margin: 0, maxWidth: w + 16 }}>
        {name}
      </p>
    </div>
  );
}

// ── Main client component ─────────────────────────────────────────────────────

export default function CountryVisaClient({ countrySlug, passportName, destinationName }) {
  const router = useRouter();

  const [data,       setData]       = useState(null);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState("");
  const [search,     setSearch]     = useState("");
  const [guideColor, setGuideColor] = useState(null);

  // 1. Fetch passport API data
  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      setGuideColor(null);
      try {
        const url = destinationName
          ? `${BASE}/passport?from=${encodeURIComponent(passportName)}&to=${encodeURIComponent(destinationName)}&api_key=${API_KEY}`
          : `${BASE}/passport?from=${encodeURIComponent(passportName)}&api_key=${API_KEY}`;
        const r = await fetch(url);
        if (!r.ok) throw new Error("API error");
        setData(await r.json());
      } catch {
        setError("Could not load visa data. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [countrySlug]);

  // 2. Fetch guide color once passport data ready
  useEffect(() => {
    if (!data?.visa_guide_url) return;
    const guideSlug = data.visa_guide_url.split("/visa-guides/")[1]?.split("?")[0];
    if (!guideSlug) return;
    fetch(`/api/visa-guide/${guideSlug}`)
      .then(async (res) => {
        if (!res.ok) return;
        const gd = await res.json();
        const apiColor = gd?.color || gd?.primary_color || gd?.theme_color || null;
        if (apiColor && /^#[0-9a-fA-F]{6}$/.test(apiColor)) setGuideColor(apiColor);
      })
      .catch(() => {});
  }, [data?.visa_guide_url]);

  // Normalise → flat destination array
  const allDests = (() => {
    if (!data) return [];
    if (data.destinations) return data.destinations;
    if (data.to) return [{
      country: data.to.name, flag: data.to.flag, code: data.to.code,
      visa_status: data.visa_status, visa_guide_url: data.visa_guide_url,
    }];
    const flat = [];
    for (const [k, v] of Object.entries(data)) {
      if (Array.isArray(v) && v[0]?.country) {
        v.forEach((d) => flat.push({ ...d, visa_status: d.visa_status || k }));
      }
    }
    return flat;
  })();

  const filtered = search.trim()
    ? allDests.filter((d) => d.country?.toLowerCase().includes(search.toLowerCase()))
    : allDests;

  const groups = {};
  for (const d of filtered) {
    const k = d.visa_status || "other";
    (groups[k] = groups[k] || []).push(d);
  }
  const sortedKeys = [
    ...PRIORITY.filter((k) => groups[k]),
    ...Object.keys(groups).filter((k) => !PRIORITY.includes(k) && k !== "other"),
    ...(groups.other ? ["other"] : []),
  ];

  const goGuide = (destCountry, guideSlug) => {
    const cs = `${slugify(passportName)}-visa-for-${slugify(destCountry)}`;
    router.push(`/visa-checker/${cs}/${guideSlug}`);
  };

  const singleResult  = destinationName && data?.visa_status ? data : null;
  const singleMetaRaw = singleResult ? STATUS_META[singleResult.visa_status?.toLowerCase?.()] : null;
  const singleMeta    = singleMetaRaw ? {
    ...singleMetaRaw,
    color: guideColor || singleMetaRaw.color,
    light: guideColor ? (hexToLight(guideColor) || singleMetaRaw.light) : singleMetaRaw.light,
  } : null;

  const isVisaFree =
    singleResult && !singleMetaRaw && singleResult.visa_status && !isNaN(Number(singleResult.visa_status));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* Back */}
        <Link
          href="/visa-checker"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 transition-colors mb-8"
        >
          ← Back to Visa Checker
        </Link>

        {/* ── SEO: Page title area (visible header) ── */}
        {/* Note: the <h1> lives inside <SeoContent> below for clean DOM order.
            We show the passport flag + route here as visual branding only. */}
        <div className="flex items-center gap-4 mb-1">
          {data?.from?.flag && (
            <img src={data.from.flag} alt={passportName} className="w-12 h-8 object-cover rounded shadow-sm" />
          )}
          <p className="text-slate-500 font-medium">
            {destinationName
              ? `${passportName} → ${destinationName}`
              : `${passportName} Passport`}
          </p>
        </div>
        <p className="text-slate-400 text-xs mb-8">
          {destinationName ? `Visa requirements for ${destinationName}` : "Visa requirements for all destinations"}
        </p>

        {/* Stats — all-destinations view */}
        {!loading && !error && !destinationName && allDests.length > 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {PRIORITY.slice(0, 4).map((key) => {
              const m = STATUS_META[key];
              return (
                <div key={key} className="bg-white border border-slate-100 rounded-xl p-4 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">{m.label}</p>
                  <p className="text-2xl font-bold" style={{ color: m.color }}>{groups[key]?.length ?? 0}</p>
                </div>
              );
            })}
          </div>
        )}

        {/* ── Single-pair result: passport hero + status ── */}
        {!loading && singleResult && singleMeta && (
          <div
            className="rounded-2xl border-2 mb-8 transition-colors"
            style={{ borderColor: singleMeta.color, background: singleMeta.light, overflow: "visible" }}
          >
            <div className="flex items-center justify-between px-6 pt-5 pb-0 flex-wrap gap-2">
              <span
                className="inline-block text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full text-white"
                style={{ background: singleMeta.color }}
              >
                {singleMeta.label}
              </span>
              <p className="text-xs text-slate-400">{passportName} → {destinationName}</p>
            </div>
            <div className="flex items-center justify-between gap-3 px-8 py-5" style={{ overflow: "visible" }}>
              <PassportCover src={data.from?.passport_cover} alt={data.from?.name || passportName} flag={data.from?.flag} name={data.from?.name || passportName} size="lg" />
              <div className="flex-1 flex flex-col items-center gap-1.5 min-w-0">
                <div className="flex items-center gap-1 w-full">
                  <div className="h-px flex-1" style={{ background: singleMeta.color, opacity: 0.35 }} />
                  <span className="text-xl shrink-0" style={{ color: singleMeta.color }}>✈</span>
                  <div className="h-px flex-1" style={{ background: singleMeta.color, opacity: 0.35 }} />
                </div>
                <p className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 text-center">Travel Route</p>
              </div>
              <PassportCover src={data.to?.passport_cover} alt={data.to?.name || destinationName} flag={data.to?.flag} name={data.to?.name || destinationName} size="lg" />
            </div>
            {singleResult.visa_guide_url && (
              <div className="px-6 pb-5 border-t" style={{ borderColor: `${singleMeta.color}22` }}>
                <button
                  onClick={() => goGuide(destinationName, singleMeta.slug)}
                  className="w-full mt-4 py-2.5 rounded-lg border-2 text-sm font-semibold transition-all"
                  style={{ borderColor: singleMeta.color, color: singleMeta.color }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = singleMeta.color; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = singleMeta.color; }}
                >
                  View Step-by-Step Guide →
                </button>
              </div>
            )}
          </div>
        )}

        {/* ── Visa-free single-pair result ── */}
        {!loading && isVisaFree && (
          <div className="rounded-2xl border-2 border-emerald-400 mb-8" style={{ background: "#ECFDF5", overflow: "visible" }}>
            <div className="flex items-center justify-between px-6 pt-5 pb-0 flex-wrap gap-2">
              <span className="inline-block text-[11px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-emerald-600 text-white">
                Visa-Free · {singleResult.visa_status} days
              </span>
              <p className="text-xs text-slate-400">{passportName} → {destinationName}</p>
            </div>
            <div className="flex items-center justify-between gap-3 px-8 py-5" style={{ overflow: "visible" }}>
              <PassportCover src={data.from?.passport_cover} alt={data.from?.name || passportName} flag={data.from?.flag} name={data.from?.name || passportName} size="lg" />
              <div className="flex-1 flex flex-col items-center gap-1.5 min-w-0">
                <div className="flex items-center gap-1 w-full">
                  <div className="h-px flex-1 bg-emerald-300" />
                  <span className="text-xl text-emerald-500 shrink-0">✈</span>
                  <div className="h-px flex-1 bg-emerald-300" />
                </div>
                <p className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 text-center">Travel Route</p>
              </div>
              <PassportCover src={data.to?.passport_cover} alt={data.to?.name || destinationName} flag={data.to?.flag} name={data.to?.name || destinationName} size="lg" />
            </div>
          </div>
        )}

        {/* Search */}
        {allDests.length > 5 && (
          <input
            type="search"
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:outline-none bg-white text-sm mb-8 transition-colors"
            placeholder="Search destinations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-12 rounded-xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
        )}

        {/* Grouped destination cards */}
        {!loading && !error && sortedKeys.map((key) => {
          const m = STATUS_META[key];
          const items = groups[key] || [];
          if (destinationName && items.length === 1) return null;
          return (
            <div key={key} className="mb-8">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span
                  className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ background: m?.light || "#f1f5f9", color: m?.color || "#475569" }}
                >
                  {m?.label || key}
                </span>
                <span className="text-xs text-slate-400">{items.length} countries</span>
                {m?.slug && (
                  <button
                    onClick={() => items[0] && goGuide(items[0].country, m.slug)}
                    className="text-xs text-blue-500 hover:text-blue-700 transition-colors ml-auto"
                  >
                    View {m.label} guide →
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {items.map((d) => (
                  <button
                    key={d.code || d.country}
                    onClick={() => m?.slug && goGuide(d.country, m.slug)}
                    className="flex items-center gap-2.5 px-3 py-2.5 bg-white border border-slate-100 rounded-xl text-left hover:border-slate-300 hover:bg-slate-50 transition-all group"
                  >
                    {d.flag && <img src={d.flag} alt="" className="w-6 h-4 object-cover rounded-sm shrink-0" />}
                    <span className="text-sm text-slate-700 flex-1 truncate">{d.country}</span>
                    <span className="text-slate-300 group-hover:text-slate-500 text-xs">›</span>
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        {/* ── SEO Content Section ── placed after interactive content for UX,
            but Google still indexes it fully. Render once data has settled. */}
        {!loading && (
          <SeoContent
            passport={passportName}
            destination={destinationName}
            visaStatus={singleResult?.visa_status || null}
            visaDays={isVisaFree ? singleResult?.visa_status : null}
          />
        )}

        {/* JSON-LD structured data */}
        {!loading && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                destinationName
                  ? {
                      "@context": "https://schema.org",
                      "@type": "FAQPage",
                      "mainEntity": [
                        {
                          "@type": "Question",
                          "name": `Do ${passportName} passport holders need a visa for ${destinationName}?`,
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": singleResult?.visa_status
                              ? `${passportName} nationals require a ${STATUS_META[singleResult.visa_status?.toLowerCase?.()]?.label || singleResult.visa_status} to enter ${destinationName}.`
                              : `Please check the current visa requirement for ${passportName} nationals visiting ${destinationName} on Eammu Holidays.`,
                          },
                        },
                        {
                          "@type": "Question",
                          "name": `What documents does a ${passportName} citizen need for ${destinationName}?`,
                          "acceptedAnswer": {
                            "@type": "Answer",
                            "text": `A valid ${passportName} passport, completed visa application form, photographs, flight itinerary, hotel booking, bank statements, and travel insurance are typically required for ${destinationName}.`,
                          },
                        },
                      ],
                    }
                  : {
                      "@context": "https://schema.org",
                      "@type": "WebPage",
                      "name": `${passportName} Passport Visa Requirements`,
                      "description": `Explore visa requirements for ${passportName} passport holders across all countries. Powered by Eammu Holidays.`,
                      "url": `https://eammu.com/visa-checker/${slugify(passportName)}-passport`,
                      "publisher": {
                        "@type": "Organization",
                        "name": "Eammu Holidays",
                        "url": "https://eammu.com",
                      },
                    }
              ),
            }}
          />
        )}

      </div>
    </div>
  );
}