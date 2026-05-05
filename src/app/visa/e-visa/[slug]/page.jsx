import clientPromise from '@/app/lib/mongodb';
import { createSlug } from "@/app/lib/utils";
import Link from "next/link";
import {
  CheckCircle, Clock, CreditCard, Camera,
  MapPin, AlertTriangle, Lightbulb, HelpCircle,
  Calendar, ShieldCheck, Globe, ChevronRight,
  MessageCircle, Plane, Wifi, Smartphone,
  CircleCheck, TriangleAlert, Info, Zap
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// URL PATTERN: /visa/e-visa/[nationality]-e-visa-requirements-for-[destination]
// Example:     /visa/e-visa/nigerian-e-visa-requirements-for-turkey
// ─────────────────────────────────────────────────────────────────────────────

// ─────────────────────────────────────────────────────────────────────────────
// DATA FETCHERS
// ─────────────────────────────────────────────────────────────────────────────
async function getCountries() {
  const client = await clientPromise;
  const db = client.db('Eammu-Holidays');
  return db.collection('countries')
    .find({})
    .project({ _id: 0, country: 1, flag: 1, code: 1 })
    .toArray();
}

async function getEVisaData(slug) {
  const client = await clientPromise;
  const db = client.db('Eammu-Holidays');
  const doc = await db.collection('evisadata')
    .findOne({ slug }, { projection: { _id: 0 } });
  return doc || null;
}

// ─────────────────────────────────────────────────────────────────────────────
// PARSE SLUG → nationality + destination
// slug format: "nigerian-e-visa-requirements-for-turkey"
// ─────────────────────────────────────────────────────────────────────────────
function parseEvisaSlug(slug) {
  // Split on "-e-visa-requirements-for-"
  const separator = "-e-visa-requirements-for-";
  const idx = slug.indexOf(separator);
  if (idx === -1) return { nationalitySlug: null, destinationSlug: null };
  const nationalitySlug = slug.slice(0, idx);           // e.g. "nigerian"
  const destinationSlug = slug.slice(idx + separator.length); // e.g. "turkey"
  return { nationalitySlug, destinationSlug };
}

// Convert slug back to a readable name for matching
function slugToName(slug) {
  return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

// ─────────────────────────────────────────────────────────────────────────────
// NATIONALITY ADJECTIVE MAP (slug → adjective label)
// ─────────────────────────────────────────────────────────────────────────────
const NATIONALITY_MAP = {
  "nigerian":        { adj: "Nigerian",        country: "Nigeria",        flag: "🇳🇬" },
  "ghanaian":        { adj: "Ghanaian",        country: "Ghana",          flag: "🇬🇭" },
  "indian":          { adj: "Indian",          country: "India",          flag: "🇮🇳" },
  "pakistani":       { adj: "Pakistani",       country: "Pakistan",       flag: "🇵🇰" },
  "bangladeshi":     { adj: "Bangladeshi",     country: "Bangladesh",     flag: "🇧🇩" },
  "kenyan":          { adj: "Kenyan",          country: "Kenya",          flag: "🇰🇪" },
  "south-african":   { adj: "South African",   country: "South Africa",   flag: "🇿🇦" },
  "dubai-resident":  { adj: "Dubai Resident",  country: "UAE",            flag: "🇦🇪" },
  "egyptian":        { adj: "Egyptian",        country: "Egypt",          flag: "🇪🇬" },
  "philippine":      { adj: "Filipino",        country: "Philippines",    flag: "🇵🇭" },
  "indonesian":      { adj: "Indonesian",      country: "Indonesia",      flag: "🇮🇩" },
  "ethiopian":       { adj: "Ethiopian",       country: "Ethiopia",       flag: "🇪🇹" },
  "tanzanian":       { adj: "Tanzanian",       country: "Tanzania",       flag: "🇹🇿" },
  "ugandan":         { adj: "Ugandan",         country: "Uganda",         flag: "🇺🇬" },
  "rwandan":         { adj: "Rwandan",         country: "Rwanda",         flag: "🇷🇼" },
  "cameroonian":     { adj: "Cameroonian",     country: "Cameroon",       flag: "🇨🇲" },
  "senegalese":      { adj: "Senegalese",      country: "Senegal",        flag: "🇸🇳" },
  "ivorian":         { adj: "Ivorian",         country: "Côte d'Ivoire",  flag: "🇨🇮" },
};

// ─────────────────────────────────────────────────────────────────────────────
// STATIC E-VISA DATA PER DESTINATION (for static content blocks)
// ─────────────────────────────────────────────────────────────────────────────
const EVISA_DESTINATION_DATA = {
  "turkey": {
    officialName: "Turkey e-Visa",
    portalUrl: "https://www.evisa.gov.tr",
    type: "Single/Multiple Entry",
    maxStay: "30 days (single) / 90 days in 180 days (multiple)",
    validity: "180 days from issue date",
    processingTime: "Usually within 24 hours (often minutes)",
    fee: "USD 50 (varies by nationality — check official portal)",
    paymentMethod: "Credit/Debit card (Visa, Mastercard, UnionPay)",
    photoRequired: false,
    documentsRequired: [
      "Valid passport (minimum 6 months validity beyond stay)",
      "Active email address to receive the e-Visa",
      "Credit or debit card for online payment",
      "Return or onward ticket (recommended to carry)",
      "Hotel booking / accommodation confirmation",
    ],
    importantNotes: [
      "Not all nationalities are eligible for Turkey e-Visa — some must apply at a Turkish consulate.",
      "The e-Visa is linked to your passport — any name or date discrepancies cause denial at the border.",
      "Print the e-Visa or save it digitally — show it alongside your passport at Turkish border control.",
      "The e-Visa is strictly for tourism and short business visits — not for work or study.",
    ],
    approvalTips: [
      "Apply on the OFFICIAL Turkish government portal only (evisa.gov.tr) — avoid third-party 'agency' sites that charge inflated fees.",
      "Ensure your passport has at least 6 months validity on the date of arrival in Turkey.",
      "Double-check your name, passport number, and travel dates before submitting — errors cannot be easily corrected.",
      "Keep a printed and digital copy of your Turkey e-Visa on all your devices.",
    ],
  },
  "kenya": {
    officialName: "Kenya Electronic Travel Authorisation (ETA)",
    portalUrl: "https://etakenya.go.ke",
    type: "Single Entry",
    maxStay: "90 days",
    validity: "90 days from approval date",
    processingTime: "1–3 business days",
    fee: "USD 30 (East African Community nationals may be exempt)",
    paymentMethod: "Credit/Debit card (Visa, Mastercard)",
    photoRequired: true,
    documentsRequired: [
      "Valid passport (minimum 6 months validity, at least 1 blank page)",
      "Digital passport-size photograph (white background, ICAO compliant)",
      "Confirmed return/onward flight booking",
      "Hotel booking / accommodation proof",
      "Bank statement or proof of sufficient funds",
      "Yellow fever vaccination certificate (required for most nationalities)",
      "Travel insurance covering Kenya",
    ],
    importantNotes: [
      "Kenya replaced the visa-on-arrival system with the ETA in 2023. All visitors (except EAC nationals) must apply online before travel.",
      "A yellow fever vaccination certificate is mandatory for entry into Kenya for most nationalities.",
      "The ETA must be approved before you board your flight — airlines will check.",
      "EAC member state citizens (Uganda, Tanzania, Rwanda, Burundi, South Sudan, DRC) generally enter visa-free.",
    ],
    approvalTips: [
      "Apply at least 3–5 business days before travel — do not leave it to the last minute.",
      "Ensure your yellow fever certificate is valid and carries the stamp from a recognised vaccination centre.",
      "Upload a high-quality, compliant passport photograph — blurry or non-white-background photos cause rejection.",
      "Save your ETA reference number and keep the approval email accessible on your phone.",
    ],
  },
  "united-arab-emirates": {
    officialName: "UAE e-Visa / Visit Visa",
    portalUrl: "https://icp.gov.ae",
    type: "Single Entry / Multiple Entry",
    maxStay: "30 or 60 days (extendable)",
    validity: "60 days from issue date",
    processingTime: "2–5 business days",
    fee: "AED 300–700+ (varies by type and nationality)",
    paymentMethod: "Credit/Debit card",
    photoRequired: true,
    documentsRequired: [
      "Valid passport (minimum 6 months validity, at least 2 blank pages)",
      "Digital passport-size photograph (white background, recent)",
      "Confirmed return/onward flight ticket",
      "Hotel booking / accommodation proof or host's Emirates ID (for hosted visits)",
      "Bank statement showing sufficient funds (last 3 months)",
      "Travel insurance (strongly recommended)",
    ],
    importantNotes: [
      "UAE e-Visa applications are processed through the ICP portal or authorised travel agents.",
      "Some nationalities are eligible for visa-on-arrival at UAE airports — check eligibility first.",
      "The UAE e-Visa is granted at the discretion of UAE immigration and can be refused without explanation.",
      "Holders of valid UK, USA, EU, or other tier-1 country residence permits may receive visa-on-arrival — check current policy.",
    ],
    approvalTips: [
      "Apply through an authorised channel only — ICP portal, Emirates airline, or a licensed visa agency.",
      "Ensure your passport photograph meets UAE specifications: plain white background, no glasses, taken within 3 months.",
      "Carry printed copies of your e-Visa, flight tickets, and hotel bookings to show at UAE immigration.",
      "If refused, there is a cooling-off period before reapplication — our consultants can advise on improving your application.",
    ],
  },
  "sri-lanka": {
    officialName: "Sri Lanka Electronic Travel Authorisation (ETA)",
    portalUrl: "https://eta.gov.lk",
    type: "Single/Double Entry",
    maxStay: "30 days (extendable to 6 months)",
    validity: "6 months from issue date",
    processingTime: "Usually within 24 hours",
    fee: "USD 20 (tourist) / USD 35 (transit)",
    paymentMethod: "Credit/Debit card (Visa, Mastercard)",
    photoRequired: false,
    documentsRequired: [
      "Valid passport (minimum 6 months validity)",
      "Active email address to receive the ETA",
      "Credit or debit card for payment",
      "Return/onward flight ticket",
      "Proof of accommodation in Sri Lanka",
      "Proof of sufficient funds for the stay",
    ],
    importantNotes: [
      "The Sri Lanka ETA is required for most nationalities — apply before departure.",
      "Citizens of Singapore and the Maldives are exempt from the ETA.",
      "The 30-day stay can be extended at the Department of Immigration in Colombo.",
      "If you arrive without an approved ETA, you may be refused boarding or entry.",
    ],
    approvalTips: [
      "Apply on the official ETA portal (eta.gov.lk) — third-party sites charge unnecessary fees.",
      "The ETA is usually approved within minutes to hours — but apply at least 48 hours before departure.",
      "Print the ETA approval email and present it at check-in and Sri Lankan immigration.",
      "Ensure all details match your passport exactly — even minor discrepancies can cause issues at the border.",
    ],
  },
  "cambodia": {
    officialName: "Cambodia e-Visa",
    portalUrl: "https://www.evisa.gov.kh",
    type: "Single Entry",
    maxStay: "30 days",
    validity: "3 months from issue date",
    processingTime: "3 business days",
    fee: "USD 36 (includes USD 30 visa fee + USD 6 processing fee)",
    paymentMethod: "Credit/Debit card (Visa, Mastercard)",
    photoRequired: true,
    documentsRequired: [
      "Valid passport (minimum 6 months validity, at least 1 blank page)",
      "Digital passport-size photograph (white background, ICAO compliant)",
      "Credit or debit card for payment",
      "Arrival/departure dates",
      "Accommodation address in Cambodia",
    ],
    importantNotes: [
      "The Cambodia e-Visa is only valid for entry at Phnom Penh International Airport, Siem Reap International Airport, and Sihanoukville International Airport — NOT land borders.",
      "For land border entry, you must apply for a visa-on-arrival at the border.",
      "The e-Visa allows a single entry only — for multiple entries, apply for a business visa.",
      "Extend your stay at the Department of Immigration in Phnom Penh.",
    ],
    approvalTips: [
      "Apply on the official Cambodia government e-Visa portal only (evisa.gov.kh).",
      "Upload a recent, compliant passport photograph — blurry or incorrect photos delay approval.",
      "Print the e-Visa approval letter and carry it with you — present it alongside your passport at immigration.",
      "Apply at least 5 business days before travel to allow buffer time for processing.",
    ],
  },
  "rwanda": {
    officialName: "Rwanda e-Visa",
    portalUrl: "https://irembo.gov.rw",
    type: "Single/Multiple Entry",
    maxStay: "30 days (extendable)",
    validity: "Varies",
    processingTime: "2–3 business days",
    fee: "USD 30 (single entry) / USD 60 (multiple entry)",
    paymentMethod: "Credit/Debit card, mobile money",
    photoRequired: true,
    documentsRequired: [
      "Valid passport (minimum 6 months validity)",
      "Digital passport-size photograph (white background)",
      "Confirmed return flight ticket",
      "Hotel or accommodation booking",
      "Bank statement or proof of sufficient funds",
      "Yellow fever vaccination certificate (required)",
      "Travel insurance covering Rwanda",
    ],
    importantNotes: [
      "All EAC (East African Community) member state citizens enter Rwanda visa-free.",
      "African Union passport holders may receive visa-free or visa-on-arrival access.",
      "Rwanda's Irembo portal handles all government e-service applications including visas.",
      "Yellow fever certificate is mandatory for all arrivals from yellow fever endemic countries.",
    ],
    approvalTips: [
      "Apply through the official Irembo portal (irembo.gov.rw) at least 5 days before travel.",
      "Upload a clear, recent passport photo on a plain white background.",
      "Carry your yellow fever certificate — it is checked at Kigali International Airport arrivals.",
      "Rwanda is one of the most tourism-friendly countries in Africa — e-Visa approval rates are high.",
    ],
  },
  "egypt": {
    officialName: "Egypt e-Visa",
    portalUrl: "https://visa2egypt.gov.eg",
    type: "Single/Multiple Entry",
    maxStay: "30 days",
    validity: "3 months from issue date",
    processingTime: "3–7 business days",
    fee: "USD 25 (single entry) / USD 60 (multiple entry)",
    paymentMethod: "Credit/Debit card",
    photoRequired: true,
    documentsRequired: [
      "Valid passport (minimum 6 months validity)",
      "Digital passport-size photograph (white background, ICAO compliant)",
      "Active email address",
      "Credit or debit card for payment",
      "Return/onward flight ticket",
      "Hotel or accommodation booking",
    ],
    importantNotes: [
      "Not all nationalities are eligible for Egypt e-Visa — check eligibility on the official portal first.",
      "Arab League member state citizens may have different visa arrangements.",
      "The e-Visa only permits entry through Cairo, Alexandria, Luxor, Aswan, and Hurghada international airports.",
      "For Sinai-only visits (Sharm el-Sheikh, Dahab), a separate Sinai-only permit may be issued on arrival.",
    ],
    approvalTips: [
      "Apply on the official Egypt e-Visa portal (visa2egypt.gov.eg) at least 7 days before travel.",
      "Ensure your photograph is fully ICAO-compliant — white background, no glasses, full face visible.",
      "Print the e-Visa approval and carry it with your passport through Egyptian immigration.",
      "Keep a screenshot of the approval on your phone as a backup.",
    ],
  },
  "malaysia": {
    officialName: "Malaysia eNTRI / eVISA",
    portalUrl: "https://malaysiavisa.imi.gov.my",
    type: "Single Entry (eNTRI) / Single Entry (eVISA)",
    maxStay: "15 days (eNTRI) / 30 days (eVISA)",
    validity: "3 months from issue date",
    processingTime: "1–3 business days",
    fee: "MYR 20–50+ (varies by nationality and visa type)",
    paymentMethod: "Credit/Debit card, online banking",
    photoRequired: true,
    documentsRequired: [
      "Valid passport (minimum 6 months validity, at least 2 blank pages)",
      "Digital passport-size photograph (white background, ICAO compliant)",
      "Return/onward flight ticket",
      "Hotel or accommodation booking",
      "Bank statement or proof of sufficient funds",
      "Employment or business proof (letter from employer)",
      "Travel itinerary",
    ],
    importantNotes: [
      "ASEAN member state citizens generally enter Malaysia visa-free.",
      "eNTRI (15 days) and eVISA (30 days) are different products for different nationalities.",
      "Check which product applies to your specific passport on the official portal.",
      "Entry is only valid through approved international airports and checkpoints.",
    ],
    approvalTips: [
      "Apply through the official Malaysia Immigration portal only.",
      "Ensure all photograph specifications are met — Malaysia immigration is strict on photo compliance.",
      "Carry printed copies of your eNTRI/eVISA and supporting documents.",
      "Apply at least 5–7 days before your trip to allow sufficient processing time.",
    ],
  },
  "thailand": {
    officialName: "Thailand e-Visa (Tourist Visa / TR)",
    portalUrl: "https://thaievisa.go.th",
    type: "Single Entry TR (Tourist)",
    maxStay: "60 days (extendable by 30 days at immigration)",
    validity: "3 months from issue date",
    processingTime: "3–10 business days",
    fee: "USD 35–40 (varies by nationality)",
    paymentMethod: "Credit/Debit card",
    photoRequired: true,
    documentsRequired: [
      "Valid passport (minimum 6 months validity, at least 2 blank pages)",
      "Digital passport-size photograph (white background, ICAO compliant)",
      "Confirmed return flight ticket",
      "Hotel or accommodation bookings for entire stay",
      "Bank statement showing minimum THB 20,000 (approx. USD 550) per person",
      "Travel insurance with minimum USD 10,000 medical coverage",
    ],
    importantNotes: [
      "Many nationalities can enter Thailand visa-exempt for 30 days — check if your nationality needs a visa.",
      "The Thailand e-Visa is only available through the official Thai e-Visa portal — per the destination Royal Thai Embassy/Consulate.",
      "Visa exemption stays cannot be extended the same way as e-Visa stays.",
      "Thailand also offers a Thailand Privilege Card for long-stay visitors.",
    ],
    approvalTips: [
      "First check if your nationality is on the Thailand visa-exempt list — you may not need to apply at all.",
      "If required, apply on the official Thai e-Visa portal (thaievisa.go.th) at least 10 business days before travel.",
      "Upload a high-resolution, ICAO-compliant passport photograph for faster processing.",
      "Show all supporting documents (flight, hotel, insurance, bank statement) in a single organised PDF.",
    ],
  },
  "singapore": {
    officialName: "Singapore e-Visa (Short-Term Visit Pass)",
    portalUrl: "https://www.ica.gov.sg",
    type: "Single Entry Visit Pass",
    maxStay: "Up to 30 days (at officer's discretion)",
    validity: "Applied per visit",
    processingTime: "3–5 business days",
    fee: "SGD 30 (approx. USD 22)",
    paymentMethod: "Credit/Debit card",
    photoRequired: true,
    documentsRequired: [
      "Valid passport (minimum 6 months validity, at least 2 blank pages)",
      "Digital passport-size photograph (white background, ICAO compliant)",
      "Confirmed return/onward flight ticket",
      "Hotel or accommodation bookings",
      "Bank statement showing sufficient funds (minimum SGD 1,000+ recommended)",
      "Employment or student enrollment proof",
      "Sponsor letter (if visiting family or friends in Singapore)",
    ],
    importantNotes: [
      "Singapore visa applications from most nationalities must be submitted through a local contact (Singapore citizen/PR/EP holder) or an authorised agent.",
      "ASEAN nationals generally enter Singapore visa-free.",
      "The visa decision is at the sole discretion of the Singapore Immigration & Checkpoints Authority (ICA).",
      "Singapore has one of the highest rejection rates for African passport holders — professional assistance is strongly recommended.",
    ],
    approvalTips: [
      "Always apply through a licensed Singapore visa agent — the ICA portal requires a local contact or registered agent.",
      "A strong financial profile is critical — Singapore immigration scrutinises bank balances carefully.",
      "Prior travel history to high-trust countries (USA, UK, Schengen, Japan) significantly boosts approval chances.",
      "Submit a clear, compelling cover letter explaining your purpose of visit, itinerary, and intent to return home.",
    ],
  },
  "bahrain": {
    officialName: "Bahrain e-Visa",
    portalUrl: "https://www.evisa.gov.bh",
    type: "Single/Multiple Entry",
    maxStay: "14 days (extendable)",
    validity: "3 months from issue date",
    processingTime: "Usually within 24–48 hours",
    fee: "BHD 5–9 (approx. USD 13–24) depending on type",
    paymentMethod: "Credit/Debit card",
    photoRequired: false,
    documentsRequired: [
      "Valid passport (minimum 6 months validity)",
      "Active email address to receive approval",
      "Credit or debit card for payment",
      "Return/onward flight ticket",
      "Hotel or accommodation booking",
    ],
    importantNotes: [
      "Bahrain offers one of the most straightforward e-Visa systems in the Gulf region.",
      "GCC (Gulf Cooperation Council) nationals enter Bahrain without a visa.",
      "Holders of valid USA, UK, EU Schengen or other tier-1 country visas/residence permits may enter visa-free.",
      "The Bahrain e-Visa can be applied for and processed within 24 hours in most cases.",
    ],
    approvalTips: [
      "Apply on the official Bahrain e-Visa portal (evisa.gov.bh) — it is simple and fast.",
      "Ensure your passport details match exactly what you enter in the form.",
      "Receive your e-Visa by email and save it digitally — present it alongside your passport at Bahrain airport immigration.",
      "Check if your nationality is eligible for the e-Visa system before applying.",
    ],
  },
  "oman": {
    officialName: "Oman e-Visa",
    portalUrl: "https://evisa.rop.gov.om",
    type: "Single Entry",
    maxStay: "10 days or 30 days (depending on type)",
    validity: "1 month from issue date",
    processingTime: "24–48 hours",
    fee: "OMR 5 (single entry, 10 days) / OMR 20 (30 days) — approx. USD 13–52",
    paymentMethod: "Credit/Debit card",
    photoRequired: false,
    documentsRequired: [
      "Valid passport (minimum 6 months validity)",
      "Active email address",
      "Credit or debit card for online payment",
      "Return/onward flight ticket",
      "Hotel or accommodation booking",
    ],
    importantNotes: [
      "Not all nationalities are eligible for the Oman e-Visa — check eligibility first.",
      "GCC nationals enter Oman without a visa.",
      "Oman also offers visa-on-arrival at Muscat International Airport for certain nationalities.",
      "The Oman e-Visa is valid only for tourism and short visits — not for employment.",
    ],
    approvalTips: [
      "Apply on the official Royal Oman Police e-Visa portal (evisa.rop.gov.om).",
      "Double-check that your nationality is eligible before starting the application.",
      "Oman e-Visa approvals are usually fast — but always apply at least 72 hours before departure.",
      "Save the e-Visa PDF and print a copy — Oman immigration will ask to see it.",
    ],
  },
};

// Related e-Visa combos for sidebar internal links
const RELATED_COMBOS = [
  { nat: "nigerian",    dest: "turkey",               label: "Nigerian → Turkey" },
  { nat: "ghanaian",   dest: "turkey",               label: "Ghanaian → Turkey" },
  { nat: "indian",     dest: "sri-lanka",            label: "Indian → Sri Lanka" },
  { nat: "nigerian",   dest: "kenya",                label: "Nigerian → Kenya" },
  { nat: "ghanaian",   dest: "kenya",                label: "Ghanaian → Kenya" },
  { nat: "indian",     dest: "united-arab-emirates", label: "Indian → UAE" },
  { nat: "nigerian",   dest: "malaysia",             label: "Nigerian → Malaysia" },
  { nat: "ghanaian",   dest: "rwanda",               label: "Ghanaian → Rwanda" },
  { nat: "indian",     dest: "thailand",             label: "Indian → Thailand" },
  { nat: "nigerian",   dest: "egypt",                label: "Nigerian → Egypt" },
];

// ─────────────────────────────────────────────────────────────────────────────
// SEO METADATA
// ─────────────────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }) {
  const { slug }   = await params;
  const { nationalitySlug, destinationSlug } = parseEvisaSlug(slug);

  const countries   = await getCountries();
  const natInfo     = NATIONALITY_MAP[nationalitySlug];
  const destCountry = countries.find(c => createSlug(c.country) === destinationSlug);
  const destName    = destCountry?.country || slugToName(destinationSlug);
  const natAdj      = natInfo?.adj || slugToName(nationalitySlug);
  const currentYear = new Date().getFullYear();

  const title = `${natAdj} e-Visa Requirements for ${destName} ${currentYear} — Apply Online | Visa Expert Hub`;
  const description = `Complete ${currentYear} guide: ${natAdj} passport holders applying for ${destName} e-Visa. Documents required, fees, processing time, photo specs & expert tips. Apply online — no embassy visit needed.`;

  return {
    title,
    description,
    keywords: `${natAdj} e-visa ${destName} ${currentYear}, ${natAdj} passport ${destName} online visa, ${destName} e-visa for ${natAdj} nationals, how to apply ${destName} e-visa from ${natInfo?.country || natAdj}, ${destName} e-visa requirements ${natAdj}, ${destName} evisa ${natAdj} passport, ${natAdj} ${destName} visa online application`,
    alternates: {
      canonical: `https://visaexpresshub.com/visa/e-visa/${slug}`,
    },
    openGraph: {
      title: `${natAdj} e-Visa Requirements for ${destName} — ${currentYear} Complete Guide`,
      description: `Embassy-free ${destName} e-Visa guide for ${natAdj} passport holders. Fees, documents, processing time & expert tips. Updated ${currentYear}.`,
      images: [destCountry?.flag || ""],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${natAdj} e-Visa for ${destName} ${currentYear} — Online Application Guide`,
      description,
    },
    robots: { index: true, follow: true, "max-image-preview": "large" },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARED STYLES
// ─────────────────────────────────────────────────────────────────────────────
function PageStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&family=DM+Serif+Display:ital@0;1&display=swap');
      *, *::before, *::after { box-sizing: border-box; }
      body { font-family: 'DM Sans', sans-serif; background: #ffffff; color: #111111; }
      .font-display { font-family: 'DM Serif Display', serif; }
      :root {
        --yellow: #f5c800; --yellow-dark: #d4a800; --yellow-light: #fff8d6;
        --black: #111111; --white: #ffffff; --border: #e8e8e8;
        --green: #16a34a; --red: #dc2626; --blue: #2563eb;
      }
      .whatsapp-btn { background:#25D366; color:white; font-weight:800; transition:all .2s ease; box-shadow:0 4px 16px rgba(37,211,102,.25); }
      .whatsapp-btn:hover { background:#128C7E; transform:translateY(-2px); }
      .card { background:var(--white); border:1.5px solid var(--border); border-radius:16px; }
      .card-yellow { background:var(--yellow-light); border:1.5px solid rgba(245,200,0,.3); border-radius:16px; }
      .tag { display:inline-flex; align-items:center; padding:4px 12px; border-radius:100px; font-size:11px; font-weight:700; letter-spacing:.03em; }
      .tag-yellow { background:var(--yellow); color:var(--black); }
      .tag-dark { background:var(--black); color:white; }
      .tag-green { background:#dcfce7; color:#16a34a; }
      .section-line { width:4px; height:32px; background:linear-gradient(to bottom,var(--yellow),var(--yellow-dark)); border-radius:4px; display:inline-block; flex-shrink:0; }
      .check-box { width:20px; height:20px; background:#16a34a; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
      .faq-item { border:1.5px solid var(--border); border-radius:12px; overflow:hidden; margin-bottom:8px; }
      .faq-item summary { padding:16px 20px; cursor:pointer; list-style:none; display:flex; align-items:center; justify-content:space-between; font-weight:700; }
      .faq-item summary:hover { background:#fafafa; }
      .faq-item[open] summary { background:var(--yellow-light); border-bottom:1.5px solid rgba(245,200,0,.3); }
      .faq-item summary::-webkit-details-marker { display:none; }
      .faq-item .chevron { transition:transform .25s; flex-shrink:0; }
      .faq-item[open] .chevron { transform:rotate(90deg); }
      .hover-yellow:hover { background:var(--yellow-light) !important; border-color:rgba(245,200,0,.4) !important; }
      .step-line { position:absolute; left:13px; top:8px; bottom:0; width:2px; background:linear-gradient(to bottom,var(--yellow),rgba(245,200,0,.1)); }
      a { color:inherit; }
      ::-webkit-scrollbar { width:5px; }
      ::-webkit-scrollbar-thumb { background:var(--yellow); border-radius:3px; }
      .sidebar-sticky { position:sticky; top:24px; }
      @media (max-width:768px) { .sidebar-sticky { position:static; } }
    `}</style>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// WHATSAPP BUTTON
// ─────────────────────────────────────────────────────────────────────────────
function WhatsAppBtn({ href, label, className = "" }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className={`whatsapp-btn inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-sm ${className}`}>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
      </svg>
      {label}
      <ChevronRight size={14} />
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BREADCRUMB
// ─────────────────────────────────────────────────────────────────────────────
function Breadcrumb({ natAdj, destName, dark = false }) {
  const muted   = dark ? "rgba(255,255,255,0.4)" : "#777";
  const current = dark ? "#f5c800" : "#111";
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold mb-8 flex-wrap">
      <Link href="/"               style={{ color: muted }} className="hover:text-white transition">Home</Link>
      <ChevronRight size={12} style={{ color: muted }} />
      <Link href="/visa/e-visa"    style={{ color: muted }} className="hover:text-white transition">e-Visa Requirements</Link>
      <ChevronRight size={12} style={{ color: muted }} />
      <span style={{ color: current, fontWeight: 800 }}>{natAdj} → {destName}</span>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SIDEBAR CTA
// ─────────────────────────────────────────────────────────────────────────────
function SidebarCTA({ whatsappUrl, destName, evData }) {
  return (
    <div className="rounded-2xl overflow-hidden sidebar-sticky shadow-lg" style={{ border: "1.5px solid #e8e8e8" }}>
      <div className="p-5" style={{ background: "#f5c800" }}>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "rgba(0,0,0,0.12)" }}>
            <Zap size={22} className="text-black" />
          </div>
          <div>
            <h3 className="font-black text-black text-base leading-none">Apply e-Visa Now</h3>
            <p className="text-black/60 text-xs font-semibold mt-1">Expert reply within 2 hours</p>
          </div>
        </div>
      </div>
      <div className="p-5 space-y-2.5" style={{ background: "white" }}>
        {[
          { icon: "⚡", label: "Processing Time",  val: evData?.processingTime || "24–72 Hours" },
          { icon: "💳", label: "e-Visa Fee",       val: evData?.fee || "Check Official Portal" },
          { icon: "📅", label: "Max Stay",         val: evData?.maxStay || "Varies by type" },
          { icon: "📋", label: "Service",          val: "Full Application Assistance" },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: "#fafafa", border: "1.5px solid #eee" }}>
            <span className="text-lg">{s.icon}</span>
            <div>
              <p style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em", color: "#999" }}>{s.label}</p>
              <p className="font-black text-black text-sm">{s.val}</p>
            </div>
          </div>
        ))}
        <WhatsAppBtn href={whatsappUrl} label={`Apply ${destName} e-Visa Now`} className="w-full mt-1" />
        <p style={{ fontSize: "9px", textAlign: "center", color: "#aaa", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" }}>
          OFFICIAL PORTAL ASSISTANCE · EXPERT REVIEW · FAST APPROVAL
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RELATED LINKS SIDEBAR
// ─────────────────────────────────────────────────────────────────────────────
function RelatedEvisaLinks({ currentSlug }) {
  const others = RELATED_COMBOS.filter(c =>
    `/visa/e-visa/${c.nat}-e-visa-requirements-for-${c.dest}` !== `/visa/e-visa/${currentSlug}`
  ).slice(0, 8);
  return (
    <div className="rounded-2xl p-5" style={{ background: "#fafafa", border: "1.5px solid #eee" }}>
      <h3 className="font-black text-black text-sm mb-4 flex items-center gap-2">
        <Globe size={15} style={{ color: "#f5c800" }} /> Other e-Visa Guides
      </h3>
      <div className="space-y-1.5">
        {others.map((combo, i) => (
          <Link
            key={i}
            href={`/visa/e-visa/${combo.nat}-e-visa-requirements-for-${combo.dest}`}
            title={`${combo.label} e-Visa Requirements 2026`}
            className="flex items-center gap-3 p-2.5 rounded-xl transition-all group hover-yellow"
            style={{ border: "1.5px solid transparent" }}
          >
            <span className="text-sm font-semibold text-black group-hover:font-bold transition flex-1">{combo.label}</span>
            <ChevronRight size={12} style={{ color: "#ccc" }} />
          </Link>
        ))}
      </div>
      <Link href="/visa/e-visa"
        className="flex items-center justify-center gap-2 mt-4 pt-4 text-xs font-black transition hover:text-black"
        style={{ borderTop: "1.5px solid #eee", color: "#f5c800" }}>
        All e-Visa Guides →
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default async function EVisaSlugPage({ params }) {
  const { slug } = await params;
  const { nationalitySlug, destinationSlug } = parseEvisaSlug(slug);

  // Validate slug format
  if (!nationalitySlug || !destinationSlug) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-10" style={{ fontFamily: "'DM Sans',sans-serif" }}>
        <PageStyles />
        <div className="text-8xl mb-6">🌍</div>
        <h1 className="text-3xl font-black text-black mb-3">Invalid e-Visa URL</h1>
        <p className="mb-4 text-black/50">Please use the format: /visa/e-visa/[nationality]-e-visa-requirements-for-[destination]</p>
        <Link href="/visa/e-visa" className="px-8 py-4 rounded-2xl font-black text-sm" style={{ background: "#f5c800", color: "#000" }}>
          ← Browse All e-Visa Guides
        </Link>
      </div>
    );
  }

  const countries     = await getCountries();
  const natInfo       = NATIONALITY_MAP[nationalitySlug];
  const destCountry   = countries.find(c => createSlug(c.country) === destinationSlug);
  const evData        = EVISA_DESTINATION_DATA[destinationSlug] || null;
  const dbData        = await getEVisaData(slug);
  const currentYear   = new Date().getFullYear();

  const natAdj        = natInfo?.adj    || slugToName(nationalitySlug);
  const natCountry    = natInfo?.country || slugToName(nationalitySlug);
  const natFlag       = natInfo?.flag   || "🌍";
  const destName      = destCountry?.country || slugToName(destinationSlug);
  const destFlag      = destCountry?.flag    || null;

  const whatsappMsg   = encodeURIComponent(`Hi, I'm a ${natAdj} passport holder and want to apply for a ${destName} e-Visa. I found the guide on your website.`);
  const whatsappUrl   = `https://wa.me/971507078334?text=${whatsappMsg}`;

  // Structured data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${natAdj} e-Visa Requirements for ${destName} ${currentYear} — Online Application Guide`,
    "description": `Complete ${destName} e-Visa guide for ${natAdj} passport holders — documents, fees, processing time & expert tips. Apply online, no embassy visit needed.`,
    "image": destFlag || "",
    "author": { "@type": "Organization", "name": "Visa Expert Hub" },
    "publisher": { "@type": "Organization", "name": "Visa Expert Hub", "logo": { "@type": "ImageObject", "url": "/logo.png" } },
    "dateModified": new Date().toISOString(),
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": `Can ${natAdj} passport holders get a ${destName} e-Visa?`,
          "acceptedAnswer": { "@type": "Answer", "text": `${natAdj} nationals can apply for a ${destName} e-Visa online through the official government portal. Eligibility and requirements depend on your specific passport and travel purpose. Our guide provides the exact documents, fees, and steps required for ${currentYear}.` },
        },
        {
          "@type": "Question",
          "name": `How long does ${destName} e-Visa processing take for ${natAdj} applicants?`,
          "acceptedAnswer": { "@type": "Answer", "text": evData?.processingTime || `Processing time for the ${destName} e-Visa typically ranges from a few hours to 3–5 business days. We recommend applying at least 7 days before your travel date.` },
        },
        {
          "@type": "Question",
          "name": `What documents do ${natAdj} nationals need for ${destName} e-Visa?`,
          "acceptedAnswer": { "@type": "Answer", "text": evData ? evData.documentsRequired.join(", ") : `A valid passport (6 months minimum validity), digital photo, return flight booking, and accommodation proof are the core requirements for most e-Visas. Additional documents may apply for ${natAdj} applicants.` },
        },
      ],
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home",                "item": "https://visaexpresshub.com/" },
        { "@type": "ListItem", "position": 2, "name": "e-Visa Requirements", "item": "https://visaexpresshub.com/visa/e-visa" },
        { "@type": "ListItem", "position": 3, "name": `${natAdj} e-Visa for ${destName}`, "item": `https://visaexpresshub.com/visa/e-visa/${slug}` },
      ],
    },
  };

  return (
    <div className="min-h-screen" style={{ background: "#ffffff", fontFamily: "'DM Sans',system-ui,sans-serif", color: "#111" }}>
      <PageStyles />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* ── HERO ── */}
      <div style={{ background: "#111111", color: "white" }}>
        <div className="max-w-7xl mx-auto px-5 py-14 md:py-20">
          <Breadcrumb natAdj={natAdj} destName={destName} dark />

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="tag tag-yellow">{currentYear} Guide</span>
                <span className="tag tag-dark">e-Visa · 100% Online</span>
                <span className="tag" style={{ background: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.6)", border: "1.5px solid rgba(255,255,255,.12)" }}>
                  ⚡ {evData?.processingTime || "24–72 Hour Processing"}
                </span>
                <span className="tag tag-green">No Embassy Visit</span>
              </div>

              {/* H1 */}
              <h1 className="font-display text-4xl md:text-5xl xl:text-6xl leading-tight font-black mb-3" style={{ color: "white" }}>
                <span style={{ color: "#f5c800" }}>{natAdj}</span> e-Visa Requirements for {destName}
              </h1>

              {/* H2 */}
              <h2 className="text-base font-semibold mb-4 leading-relaxed" style={{ color: "rgba(255,255,255,.6)" }}>
                How to apply for {destName} e-Visa as a {natAdj} passport holder — {currentYear} complete online guide
              </h2>

              <p className="leading-relaxed text-sm mb-8 max-w-lg" style={{ color: "rgba(255,255,255,.5)" }}>
                Complete {destName} e-Visa requirements for {natAdj} nationals — official documents, exact fees, photo specifications, processing timeline, and step-by-step application guide. No embassy visit required.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["✅ 98% Success Rate", "⚡ Fast Processing", "📋 Official Requirements", `${natFlag} ${natAdj} Specialist`, "🔒 Secure & Confidential"].map(b => (
                  <span key={b} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold"
                    style={{ background: "rgba(255,255,255,.07)", color: "rgba(255,255,255,.55)", border: "1.5px solid rgba(255,255,255,.1)" }}>{b}</span>
                ))}
              </div>

              <WhatsAppBtn href={whatsappUrl} label={`Apply ${destName} e-Visa via WhatsApp`} />
            </div>

            {/* Flag display */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                {/* Nationality flag */}
                <div className="absolute -top-4 -left-4 w-20 h-14 rounded-xl overflow-hidden shadow-xl z-10" style={{ border: "3px solid rgba(245,200,0,.5)" }}>
                  {natInfo && <div className="w-full h-full flex items-center justify-center text-4xl" style={{ background: "#1a1a1a" }}>{natFlag}</div>}
                </div>
                {/* Destination flag */}
                <div className="w-72 h-48 rounded-2xl overflow-hidden shadow-2xl" style={{ border: "3px solid rgba(245,200,0,.5)" }}>
                  {destFlag
                    ? <img src={destFlag} alt={`${destName} flag — ${natAdj} e-Visa requirements ${currentYear}`} className="w-full h-full object-cover" />
                    : <div className="w-full h-full flex items-center justify-center text-7xl" style={{ background: "#222" }}>🌍</div>}
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider whitespace-nowrap shadow-xl"
                  style={{ background: "#f5c800", color: "#000" }}>
                  e-Visa — {currentYear} Guide
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── QUICK STATS ── */}
      <div className="max-w-7xl mx-auto px-5 -mt-5 relative z-20 mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: <Clock size={20} style={{ color: "#f5c800" }} />,      label: "Processing Time", val: evData?.processingTime || "24–72 Hours" },
            { icon: <Calendar size={20} style={{ color: "#2563eb" }} />,   label: "Max Stay",        val: evData?.maxStay || "Varies by type" },
            { icon: <ShieldCheck size={20} style={{ color: "#16a34a" }} />,label: "Visa Validity",   val: evData?.validity || "Check portal" },
            { icon: <CreditCard size={20} style={{ color: "#9333ea" }} />, label: "e-Visa Fee",      val: evData?.fee || "See below" },
          ].map((s, i) => (
            <div key={i} className="p-5 rounded-2xl flex flex-col items-center text-center shadow-lg bg-white" style={{ border: "1.5px solid #eee" }}>
              <div className="mb-2">{s.icon}</div>
              <p style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".1em", color: "#aaa", marginBottom: "4px" }}>{s.label}</p>
              <p className="text-sm font-black text-black leading-tight">{s.val}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-7xl mx-auto px-5 pb-20">
        <div className="grid lg:grid-cols-12 gap-8">

          {/* ── LEFT CONTENT ── */}
          <div className="lg:col-span-8 space-y-6">

            {/* INTRO */}
            <section className="card p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="section-line" />
                <h2 className="font-display text-2xl font-black text-black">{destName} e-Visa for {natAdj} Passport Holders — What You Need to Know</h2>
              </div>
              <div className="space-y-4 text-sm leading-relaxed" style={{ color: "#555" }}>
                <p>
                  <strong className="text-black">{natAdj} nationals</strong> can apply for the <strong className="text-black">{evData?.officialName || `${destName} e-Visa`}</strong> entirely online — no embassy visit, no biometrics appointment, and no long waiting periods. The application is submitted through the {destName} official government portal and approval is typically received by email within {evData?.processingTime || "24–72 hours"}.
                </p>
                <p>
                  The {destName} e-Visa allows a stay of <strong className="text-black">{evData?.maxStay || "the authorised duration"}</strong> and is valid for <strong className="text-black">{evData?.validity || "the period stated on the approval"}</strong>. As a {natAdj} passport holder, it is essential to verify your specific eligibility before applying, as e-Visa access varies by nationality even for the same destination.
                </p>
                <p>
                  Key rejection reasons for {natAdj} applicants: <strong className="text-black">passport validity below 6 months</strong>, non-compliant passport photograph, incorrect or mismatched personal details in the application form, and insufficient financial proof where required. Our team reviews every application to eliminate these errors before submission.
                </p>
              </div>
            </section>

            {/* E-VISA TYPE & ONLINE INDICATOR */}
            <div className="p-5 rounded-2xl flex items-start gap-4" style={{ background: "#dcfce7", border: "1.5px solid #bbf7d0" }}>
              <Wifi size={22} style={{ color: "#16a34a", flexShrink: 0, marginTop: "2px" }} />
              <div>
                <p className="font-black text-black text-sm mb-1">100% Online Application — No Embassy Visit Required</p>
                <p className="text-sm leading-relaxed" style={{ color: "#444" }}>
                  The <strong>{evData?.officialName || `${destName} e-Visa`}</strong> is applied for entirely online at <strong>{evData?.portalUrl || "the official government portal"}</strong>. You do not need to visit the {natAdj === "Dubai Resident" ? "UAE" : natCountry} embassy or any visa application centre for this visa type. Once approved, your e-Visa is sent to your email and is presented digitally or printed at the border.
                </p>
              </div>
            </div>

            {/* DOCUMENTS REQUIRED */}
            <section className="card p-8 md:p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-2xl" style={{ background: "#f0fdf4" }}><CheckCircle size={24} style={{ color: "#16a34a" }} /></div>
                <div>
                  <h2 className="font-display text-2xl font-black text-black">{destName} e-Visa Documents — {natAdj} Nationals</h2>
                  <p className="text-sm mt-0.5" style={{ color: "#777" }}>All items below are required at the time of online application</p>
                </div>
              </div>

              {/* Core documents from static data */}
              <div className="space-y-2.5 mb-8">
                {(evData?.documentsRequired || [
                  "Valid passport (minimum 6 months validity beyond intended travel dates)",
                  "Digital passport-size photograph (white background, ICAO compliant, recent)",
                  "Return or onward flight ticket confirmation",
                  "Hotel or accommodation booking for the entire stay",
                  "Credit or debit card for online payment of e-Visa fee",
                  "Active email address to receive e-Visa approval",
                ]).map((doc, i) => (
                  <div key={i} className="flex gap-3 p-4 rounded-xl" style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}>
                    <div className="check-box mt-0.5"><CheckCircle size={10} color="white" /></div>
                    <p className="text-sm font-medium leading-relaxed" style={{ color: "#333" }}>{doc}</p>
                  </div>
                ))}
              </div>

              {/* Photo requirement note */}
              {evData?.photoRequired && (
                <div className="flex gap-3 p-5 rounded-2xl mb-6" style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe" }}>
                  <Camera size={20} style={{ color: "#2563eb", flexShrink: 0 }} />
                  <div>
                    <p className="font-black text-black text-sm mb-1">Digital Photo Required for This e-Visa</p>
                    <p className="text-sm" style={{ color: "#444" }}>
                      This e-Visa requires uploading a digital passport-size photograph. It must be on a <strong>plain white background</strong>, ICAO-compliant, face fully visible, no glasses, no head coverings (unless religious), taken within 3 months. Non-compliant photos are the most common cause of e-Visa rejection.
                    </p>
                  </div>
                </div>
              )}

              {/* DB additional docs (dynamic) */}
              {dbData?.additional_documents && (
                <div style={{ borderTop: "1.5px solid #eee", paddingTop: "24px" }}>
                  <p style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".15em", color: "#aaa", marginBottom: "16px" }}>
                    Additional Requirements for {natAdj} Applicants
                  </p>
                  <div className="space-y-2.5">
                    {dbData.additional_documents.map((doc, i) => (
                      <div key={i} className="flex gap-3 p-4 rounded-xl" style={{ background: "#fff8d6", border: "1.5px solid rgba(245,200,0,.4)" }}>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: "#f5c800" }}>
                          <span style={{ fontSize: "10px", fontWeight: 900, color: "#000" }}>!</span>
                        </div>
                        <p className="text-sm font-medium leading-relaxed" style={{ color: "#333" }}>{doc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* STEP-BY-STEP APPLICATION */}
            <section className="card p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl" style={{ background: "#eff6ff" }}><Smartphone size={22} style={{ color: "#2563eb" }} /></div>
                <div>
                  <h2 className="font-display text-2xl font-black text-black">How to Apply for {destName} e-Visa — Step by Step</h2>
                  <p className="text-sm mt-0.5" style={{ color: "#777" }}>{natAdj} nationals — complete online application guide {currentYear}</p>
                </div>
              </div>
              <div className="space-y-5 relative">
                <div className="step-line" />
                {[
                  { n: "01", title: `Check ${natAdj} Eligibility`,       desc: `Verify that ${natAdj} passport holders are eligible for the ${destName} e-Visa system. Some nationalities must apply through a consulate instead.`, col: "#f5c800" },
                  { n: "02", title: "Prepare Your Documents",             desc: `Gather all required documents: valid passport, digital photo${evData?.photoRequired ? " (white background, ICAO compliant)" : ""}, flight ticket, accommodation proof, and credit card.`, col: "#16a34a" },
                  { n: "03", title: "Visit the Official Portal",          desc: `Go to ${evData?.portalUrl || "the official government e-Visa portal"}. Do NOT use third-party websites — they charge inflated fees for the same service.`, col: "#2563eb" },
                  { n: "04", title: "Fill the Application Form",          desc: "Complete the e-Visa application form online. Enter all details exactly as they appear on your passport — any mismatch causes rejection.", col: "#9333ea" },
                  { n: "05", title: "Upload Photo & Pay the Fee",         desc: `Upload your passport photograph${evData?.photoRequired ? " (must be white background, ICAO compliant)" : ""} and pay the e-Visa fee (${evData?.fee || "see official portal"}) using your credit or debit card.`, col: "#ea580c" },
                  { n: "06", title: "Receive & Present Your e-Visa",     desc: `Your ${destName} e-Visa will be emailed to you within ${evData?.processingTime || "24–72 hours"}. Print it or save it digitally — present it alongside your passport at border control.`, col: "#16a34a" },
                ].map((s, i) => (
                  <div key={i} className="relative pl-9">
                    <div className="absolute left-0 top-1.5 w-7 h-7 rounded-full flex items-center justify-center"
                      style={{ background: s.col, border: "3px solid white", boxShadow: "0 0 0 2px #eee" }}>
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <p style={{ fontSize: "9px", textTransform: "uppercase", fontWeight: 800, color: "#aaa", letterSpacing: ".1em" }}>{s.n}</p>
                    <p className="font-black text-black text-sm">{s.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: "#777" }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* PHOTO SPECIFICATIONS */}
            {evData?.photoRequired && (
              <section className="p-8 rounded-2xl" style={{ background: "#fff5f5", border: "1.5px solid #fecaca" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl" style={{ background: "#fee2e2" }}><Camera size={20} style={{ color: "#dc2626" }} /></div>
                  <h2 className="font-display text-xl font-black text-black">Passport Photo Requirements — {destName} e-Visa</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                  {[
                    { label: "Size",       val: "35×45mm" },
                    { label: "Background", val: "Plain White only" },
                    { label: "Standard",   val: "ICAO Compliant" },
                    { label: "Recency",    val: "Taken within 3 months" },
                  ].map(({ label, val }) => (
                    <div key={label} className="rounded-xl p-3 text-center" style={{ background: "white", border: "1.5px solid #fee2e2" }}>
                      <p style={{ fontSize: "9px", fontWeight: 800, textTransform: "uppercase", color: "#dc2626", marginBottom: "4px" }}>{label}</p>
                      <p className="text-xs font-bold text-black">{val}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "10px", fontWeight: 800, textTransform: "uppercase", color: "#dc2626", marginBottom: "8px" }}>❌ Will be rejected if:</p>
                <div className="grid sm:grid-cols-2 gap-2">
                  {["Non-white or coloured background", "Sunglasses or tinted glasses worn", "Face partially obscured or tilted", "Heavy makeup, filters, or retouching applied", "Photo is blurry, dark, or low-resolution", "Photo taken more than 3 months ago"].map((no, i) => (
                    <div key={i} className="flex gap-2 text-xs font-semibold px-3 py-2 rounded-lg" style={{ background: "#fee2e2", color: "#dc2626" }}>
                      <span className="shrink-0">✕</span> {no}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* IMPORTANT NOTES */}
            {evData?.importantNotes && (
              <section className="card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl" style={{ background: "#fff8d6" }}><Info size={22} style={{ color: "#d4a800" }} /></div>
                  <h2 className="font-display text-2xl font-black text-black">Important Notes — {destName} e-Visa for {natAdj} Nationals</h2>
                </div>
                <div className="space-y-3">
                  {evData.importantNotes.map((note, i) => (
                    <div key={i} className="flex gap-3 p-4 rounded-xl" style={{ background: "#fff8d6", border: "1.5px solid rgba(245,200,0,.4)" }}>
                      <AlertTriangle size={16} style={{ color: "#d4a800", flexShrink: 0, marginTop: "2px" }} />
                      <p className="text-sm font-medium leading-relaxed" style={{ color: "#444" }}>{note}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* APPROVAL TIPS */}
            {evData?.approvalTips && (
              <section className="card-yellow p-8 md:p-10 rounded-2xl">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-xl" style={{ background: "rgba(245,200,0,.3)" }}><Lightbulb size={22} style={{ color: "#d4a800" }} /></div>
                  <div>
                    <h2 className="font-display text-2xl font-black text-black">{destName} e-Visa Approval Tips for {natAdj} Nationals</h2>
                    <p className="text-sm mt-0.5" style={{ color: "#888" }}>Expert tips to get your {destName} e-Visa approved fast and first time</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {evData.approvalTips.map((tip, i) => (
                    <div key={i} className="flex gap-4 p-5 rounded-2xl" style={{ background: "rgba(255,255,255,.75)" }}>
                      <span className="text-2xl font-black shrink-0" style={{ color: "rgba(212,168,0,.4)" }}>0{i + 1}</span>
                      <p className="text-sm font-medium leading-relaxed" style={{ color: "#444" }}>{tip}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* DB Dynamic data (expert hacks, rejection risks) */}
            {dbData?.rejection_risk_matrix && (
              <section className="card p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl" style={{ background: "#fff5f5" }}><AlertTriangle size={22} style={{ color: "#dc2626" }} /></div>
                  <h2 className="font-display text-2xl font-black text-black">{destName} e-Visa Rejection Risks — {natAdj} Applicants</h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-3 mb-5">
                  {dbData.rejection_risk_matrix?.high_risk?.map((risk, i) => (
                    <div key={i} className="flex gap-3 p-4 rounded-xl" style={{ background: "#fef2f2", border: "1.5px solid #fecaca" }}>
                      <span style={{ color: "#dc2626", flexShrink: 0, fontWeight: 900, fontSize: "18px", lineHeight: 1 }}>●</span>
                      <p className="text-sm font-medium leading-relaxed" style={{ color: "#dc2626" }}>{risk}</p>
                    </div>
                  ))}
                </div>
                {dbData.rejection_risk_matrix?.mitigation && (
                  <div className="p-5 rounded-2xl" style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}>
                    <p style={{ fontSize: "11px", fontWeight: 800, textTransform: "uppercase", color: "#16a34a", letterSpacing: ".08em", marginBottom: "8px" }}>✅ How to Avoid Rejection</p>
                    <p className="text-sm font-medium leading-relaxed" style={{ color: "#444" }}>{dbData.rejection_risk_matrix.mitigation}</p>
                  </div>
                )}
              </section>
            )}

            {/* FAQ */}
            <section className="card p-8 md:p-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-xl" style={{ background: "#faf5ff" }}><HelpCircle size={22} style={{ color: "#9333ea" }} /></div>
                <div>
                  <h2 className="font-display text-2xl font-black text-black">FAQ — {natAdj} e-Visa for {destName} {currentYear}</h2>
                  <p className="text-sm mt-0.5" style={{ color: "#777" }}>Common questions from {natAdj} passport holders about {destName} e-Visa</p>
                </div>
              </div>
              <div>
                {[
                  {
                    q: `Can ${natAdj} passport holders get a ${destName} e-Visa?`,
                    a: `${natAdj} nationals can apply for the ${destName} e-Visa online at ${evData?.portalUrl || "the official government portal"}. Eligibility is based on your passport nationality and the specific e-Visa category. Our team verifies your eligibility before any application is submitted to avoid wasted fees.`,
                  },
                  {
                    q: `How long does ${destName} e-Visa processing take for ${natAdj} nationals?`,
                    a: `The ${destName} e-Visa typically processes in ${evData?.processingTime || "24–72 hours"} for most applicants. However, processing can take longer during peak travel seasons or if additional verification is required. We always recommend applying at least 7–10 days before your travel date.`,
                  },
                  {
                    q: `What is the ${destName} e-Visa fee for ${natAdj} passport holders in ${currentYear}?`,
                    a: `The official ${destName} e-Visa fee is ${evData?.fee || "listed on the official government portal and may vary by nationality"}. All fees are paid online by credit or debit card at the time of application. Note that e-Visa fees are non-refundable if the application is rejected.`,
                  },
                  {
                    q: `How long can ${natAdj} nationals stay in ${destName} with an e-Visa?`,
                    a: `The ${destName} e-Visa allows a stay of ${evData?.maxStay || "the duration specified on your approval"}. The visa itself is valid for ${evData?.validity || "the period stated on the approval email"}. Do not overstay — overstaying an e-Visa results in fines, deportation, and future visa bans.`,
                  },
                  {
                    q: `Do I need to print my ${destName} e-Visa or can I show it digitally?`,
                    a: `Most ${destName} border control officers accept both printed and digital copies of your e-Visa shown on your phone or tablet. However, we always recommend printing a physical copy as a backup in case of phone battery or connectivity issues at the airport.`,
                  },
                  ...(dbData?.faq_extended || []).map(f => ({ q: f.question, a: f.answer })),
                ].map((item, i) => (
                  <details key={i} className="faq-item">
                    <summary>
                      <span className="font-bold pr-4 leading-snug text-sm" style={{ color: "#111" }}>
                        <span style={{ color: "#d4a800", marginRight: "8px" }}>Q.</span>{item.q}
                      </span>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 chevron" style={{ background: "#f5f5f5" }}>
                        <ChevronRight size={14} style={{ color: "#888" }} />
                      </div>
                    </summary>
                    <div className="px-5 pb-5 pt-4 text-sm leading-relaxed" style={{ color: "#555", marginLeft: "28px" }}>{item.a}</div>
                  </details>
                ))}
              </div>
            </section>

            {/* SEO ARTICLE */}
            <section className="card p-8 md:p-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="section-line" />
                <h2 className="font-display text-2xl font-black text-black">{natAdj} e-Visa for {destName} — {currentYear} Complete Guide</h2>
              </div>
              <div className="space-y-5 text-sm leading-relaxed" style={{ color: "#555" }}>
                <p>
                  Applying for the <strong className="text-black">{destName} e-Visa as a {natAdj} national</strong> in {currentYear} is a fully online process. The {evData?.officialName || `${destName} e-Visa`} is the simplest and fastest way for {natAdj} passport holders to gain travel authorisation for {destName} — no embassy appointment, no document courier, no long waits.
                </p>
                <h3 className="text-lg font-black text-black">Is {destName} e-Visa Available for {natAdj} Passport Holders?</h3>
                <p>
                  {natAdj} nationals should first verify their eligibility on the official {destName} government portal. E-Visa eligibility is updated regularly and can change with diplomatic relations. Our team stays current with all policy updates to ensure the guidance we provide is accurate for {currentYear}.
                </p>
                <h3 className="text-lg font-black text-black">{destName} e-Visa Fee for {natAdj} Nationals — {currentYear}</h3>
                <p>
                  The current {destName} e-Visa fee is <strong className="text-black">{evData?.fee || "listed on the official portal and may vary by nationality and visa type"}</strong>. All e-Visa fees are paid online — they are <strong className="text-black">non-refundable</strong> regardless of the outcome. Payment is accepted via credit or debit card ({evData?.paymentMethod || "Visa, Mastercard"}).
                </p>
                <h3 className="text-lg font-black text-black">Can We Apply for the {destName} e-Visa on Your Behalf?</h3>
                <p>
                  Yes — our expert team handles the complete {destName} e-Visa application for {natAdj} nationals. We review your documents, fill the official government form correctly, and submit on your behalf. <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-bold" style={{ color: "#d4a800", textDecoration: "underline" }}>WhatsApp us</a> to get started.
                </p>
              </div>
            </section>

            {/* INTERNAL LINKS — other nationality combos for this destination */}
            <section className="card-yellow p-8 rounded-2xl">
              <h3 className="font-display text-xl font-black text-black mb-1">Other Nationalities — {destName} e-Visa Guides</h3>
              <p className="text-xs mb-6" style={{ color: "#888" }}>e-Visa requirements for other passport holders travelling to {destName}</p>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {Object.entries(NATIONALITY_MAP).filter(([k]) => k !== nationalitySlug).slice(0, 8).map(([k, v]) => (
                  <Link key={k} href={`/visa/e-visa/${k}-e-visa-requirements-for-${destinationSlug}`}
                    title={`${v.adj} e-Visa Requirements for ${destName} 2026`}
                    className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold transition-all group"
                    style={{ background: "rgba(255,255,255,.7)", border: "1.5px solid rgba(245,200,0,.2)", color: "#333" }}>
                    <span>{v.flag}</span>
                    <span className="group-hover:font-bold transition">{v.adj} → {destName} e-Visa</span>
                    <span className="ml-auto font-black group-hover:translate-x-0.5 transition-transform" style={{ color: "#d4a800" }}>→</span>
                  </Link>
                ))}
              </div>
            </section>

            {/* INTERNAL LINKS — other destinations for this nationality */}
            <section className="card p-8 rounded-2xl">
              <h3 className="font-display text-xl font-black text-black mb-1">{natAdj} e-Visa — Other Destination Guides</h3>
              <p className="text-xs mb-6" style={{ color: "#888" }}>More {natAdj} passport e-Visa guides for popular destinations</p>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {Object.keys(EVISA_DESTINATION_DATA).filter(d => d !== destinationSlug).slice(0, 8).map(destKey => {
                  const dc = countries.find(c => createSlug(c.country) === destKey);
                  const dName = dc?.country || slugToName(destKey);
                  return (
                    <Link key={destKey} href={`/visa/e-visa/${nationalitySlug}-e-visa-requirements-for-${destKey}`}
                      title={`${natAdj} e-Visa Requirements for ${dName} 2026`}
                      className="flex items-center gap-2 p-3 rounded-xl text-sm font-semibold transition-all group hover-yellow"
                      style={{ border: "1.5px solid #eee", color: "#333" }}>
                      {dc?.flag && <img src={dc.flag} alt={dName} className="w-8 h-5 object-cover rounded flex-shrink-0" />}
                      <span className="group-hover:font-bold transition">{natAdj} → {dName}</span>
                      <span className="ml-auto font-black" style={{ color: "#d4a800" }}>→</span>
                    </Link>
                  );
                })}
              </div>
            </section>

          </div>

          {/* ── RIGHT SIDEBAR ── */}
          <aside className="lg:col-span-4 space-y-5">
            <SidebarCTA whatsappUrl={whatsappUrl} destName={destName} evData={evData} />

            {/* Cost Breakdown */}
            <div className="rounded-2xl p-6" style={{ background: "#fff8d6", border: "1.5px solid rgba(245,200,0,.4)" }}>
              <div className="flex items-center gap-2 mb-5">
                <CreditCard size={17} style={{ color: "#d4a800" }} />
                <h3 className="font-black text-black text-sm">{currentYear} e-Visa Cost Breakdown</h3>
              </div>
              <div className="space-y-2 mb-5">
                <div className="flex justify-between items-center py-3" style={{ borderBottom: "1.5px solid rgba(245,200,0,.2)" }}>
                  <span className="text-sm font-semibold" style={{ color: "#555" }}>Official e-Visa Fee</span>
                  <span className="font-black text-black text-sm">{evData?.fee || "See portal"}</span>
                </div>
                <div className="flex justify-between items-center py-3" style={{ borderBottom: "1.5px solid rgba(245,200,0,.2)" }}>
                  <span className="text-sm font-semibold" style={{ color: "#555" }}>Payment Method</span>
                  <span className="font-black text-black text-sm">{evData?.paymentMethod || "Card"}</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-sm font-semibold" style={{ color: "#555" }}>Processing Time</span>
                  <span className="font-black text-black text-sm">{evData?.processingTime || "24–72 Hours"}</span>
                </div>
              </div>
              <div className="p-3 rounded-xl text-xs font-bold text-center" style={{ background: "rgba(245,200,0,.2)", color: "#d4a800" }}>
                ⚠️ e-Visa fees are NON-REFUNDABLE if rejected
              </div>
            </div>

            {/* Quick Eligibility Checker */}
            <div className="rounded-2xl p-6" style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}>
              <div className="flex items-center gap-2 mb-4">
                <CircleCheck size={17} style={{ color: "#16a34a" }} />
                <h3 className="font-black text-black text-sm">Quick Eligibility Summary</h3>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { label: "Nationality", val: `${natFlag} ${natAdj}` },
                  { label: "Destination", val: destName },
                  { label: "Visa Type", val: evData?.officialName || "e-Visa (Electronic)" },
                  { label: "Apply Online", val: "✅ Yes — 100% Online" },
                  { label: "Embassy Visit", val: "❌ Not Required" },
                  { label: "Max Stay", val: evData?.maxStay || "Check portal" },
                ].map(({ label, val }) => (
                  <div key={label} className="flex justify-between items-center py-2" style={{ borderBottom: "1px solid #dcfce7" }}>
                    <span style={{ color: "#555", fontWeight: 600 }}>{label}</span>
                    <span className="font-black text-black">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Portal Link */}
            {evData?.portalUrl && (
              <div className="rounded-2xl p-5" style={{ background: "#eff6ff", border: "1.5px solid #bfdbfe" }}>
                <h3 className="font-black text-black text-sm mb-3 flex items-center gap-2">
                  <Globe size={14} style={{ color: "#2563eb" }} /> Official Application Portal
                </h3>
                <p className="text-xs font-semibold mb-3" style={{ color: "#2563eb" }}>{evData.portalUrl}</p>
                <p className="text-xs leading-relaxed" style={{ color: "#555" }}>
                  Always apply on the official government portal. Third-party sites charge extra fees for the same e-Visa. Our team applies directly on your behalf through the official portal.
                </p>
              </div>
            )}

            <RelatedEvisaLinks currentSlug={slug} />

            {/* CTA card */}
            <div className="rounded-2xl p-6 text-center" style={{ background: "#f5c800" }}>
              <div className="text-4xl mb-3">⚡</div>
              <h4 className="font-black text-xl text-black mb-2">Apply Your e-Visa Now</h4>
              <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(0,0,0,.6)" }}>
                Our experts apply the {destName} e-Visa on behalf of {natAdj} passport holders — correctly, quickly, and at the official fee.
              </p>
              <a href="mailto:info@visaexperthub.com" className="block bg-black text-white py-3 rounded-xl font-black text-sm mb-3">
                📧 info@visaexperthub.com
              </a>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                className="block py-3 rounded-xl font-black text-sm text-white transition" style={{ background: "#128C7E" }}>
                💬 WhatsApp Us Now
              </a>
            </div>

            {/* Browse more tourist visa guides */}
            <div className="rounded-2xl p-5" style={{ background: "#fafafa", border: "1.5px solid #eee" }}>
              <h3 className="font-black text-black text-sm mb-4">Also Explore — Tourist Visa Guides</h3>
              <div className="space-y-1.5">
                {[
                  { label: `${natAdj} Tourist Visa Guides`, href: `/visa/${nationalitySlug}-nationals` },
                  { label: "Schengen Visa Guide",            href: "/visa/schengen-visa" },
                  { label: "USA Visa Guide",                 href: "/visa/usa-visa" },
                  { label: "UK Visa Guide",                  href: "/visa/uk-visa" },
                  { label: "Canada Visa Guide",              href: "/visa/canada-visa" },
                  { label: "All e-Visa Guides",              href: "/visa/e-visa" },
                ].map(link => (
                  <Link key={link.href} href={link.href}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition hover-yellow"
                    style={{ border: "1.5px solid transparent", color: "#444" }}>
                    <span style={{ color: "#f5c800" }}>→</span> {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="py-20 px-5 text-center" style={{ background: "#111111" }}>
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-6">
            <span className="text-5xl">{natFlag}</span>
            <span className="text-3xl text-white font-black">→</span>
            {destFlag
              ? <img src={destFlag} alt={destName} className="w-24 h-16 object-cover rounded-2xl shadow-2xl" />
              : <span className="text-5xl">🌍</span>}
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-black mb-3" style={{ color: "white" }}>
            Ready to Apply for Your{" "}
            <span style={{ color: "#f5c800" }}>{destName} e-Visa as a {natAdj} National?</span>
          </h2>
          <p className="mb-10 leading-relaxed text-sm max-w-lg mx-auto" style={{ color: "rgba(255,255,255,.45)" }}>
            Let our experts handle your {destName} e-Visa application — 100% online, correctly filled, submitted on the official portal. Approved in {evData?.processingTime || "24–72 hours"}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WhatsAppBtn href={whatsappUrl} label={`Start ${destName} e-Visa — WhatsApp`} className="px-8 py-5" />
            <Link href="/visa/e-visa"
              className="inline-flex items-center justify-center px-8 py-5 rounded-2xl font-black text-sm transition hover:bg-white hover:text-black"
              style={{ border: "2px solid rgba(255,255,255,.2)", color: "rgba(255,255,255,.6)" }}>
              Browse All e-Visa Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}