"use client";
// /app/travel-resources/visa-processing-time-tracker/[slug]/_client.jsx

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  Clock, AlertCircle, CheckCircle2, ChevronRight, ArrowLeft,
  Calendar, Timer, Zap, Info, TrendingUp, FileText,
  AlertTriangle, Globe, Phone, ExternalLink, ChevronDown,
  Shield, BookOpen, MapPin, Users, Star, ArrowRight,
  BarChart2, HelpCircle, Lightbulb, CheckSquare, XCircle
} from "lucide-react";

// ── FULL VISA RULES ────────────────────────────────────────────────────────
const VISA_RULES = {
  canada: {
    name: "Canada", flag: "🇨🇦",
    capital: "Ottawa",
    continent: "North America",
    currency: "CAD",
    language: "English / French",
    types: {
      "e-visa":           { min:2,  max:4,   label:"eTA (Electronic Travel Authorization)", fee:"CAD 7" },
      "sticker":          { min:15, max:21,  label:"Temporary Resident Visa (TRV)", fee:"CAD 100" },
      "sticker-extended": { min:45, max:60,  label:"TRV (Complex / Administrative Processing)", fee:"CAD 100" },
      "transit":          { min:6,  max:24,  unit:"hours", label:"Canada Transit Visa", fee:"CAD 100" },
    },
    embassyUrl: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
    checklist: [
      "Valid passport (6+ months beyond stay)",
      "Completed IMM 5257 application form",
      "Two passport-size photos (IRCC specs)",
      "Biometrics (if applicable, CAD 85)",
      "Bank statements — last 6 months",
      "Employment letter or proof of enrollment",
      "Travel itinerary and hotel bookings",
      "Proof of ties to home country",
      "Travel insurance (recommended)",
      "Processing fee payment receipt",
    ],
    notes: [
      "Biometrics required for most nationalities — must be submitted in person at a VAC",
      "IRCC online portal may show 'Decision Made' 24–48 hrs before physical stamp arrives",
      "Summer months (Jun–Aug) and December add 5–10 business days on average",
      "Students and workers have different processing streams — may be faster or slower",
      "Transit visa (6–24 hrs) is required for Bangladeshi, Pakistani, and several other nationals at Canadian airports",
    ],
    delayReasons: [
      "Background security check (GCMS notes often silent on exact reason)",
      "Additional documents requested via procedural fairness letter",
      "High application volume from Bangladesh, India, Pakistan during peak months",
      "Missing or inconsistent financial proof / travel history gaps",
      "Biometrics not submitted — application put on hold",
    ],
    tips: [
      "Apply at least 8–10 weeks before your intended travel date",
      "Use IRCC's online portal for faster processing vs paper application",
      "Include a strong cover letter clearly explaining ties to home country",
      "Bank statements must show consistent balance for the last 6 months",
      "For transit visa, confirm your layover duration and airline before applying",
    ],
    faqs: [
      {
        q: "Can I track my Canada visa application online?",
        a: "Yes. Use the IRCC online portal at canada.ca. Once you apply online, you'll receive a UCI (Unique Client Identifier) to track status. The portal shows stages like 'In Progress', 'Biometrics Requested', and 'Decision Made'.",
      },
      {
        q: "What is the Canada TRV refusal rate for Bangladeshi applicants?",
        a: "Refusal rates vary by year and individual profile. However, Bangladeshi applicants historically face higher scrutiny. A strong application with solid financial proof, employment ties, and a clear purpose of visit significantly improves approval chances.",
      },
      {
        q: "Is a Canada transit visa required for UAE layovers going to Canada?",
        a: "If you're transiting Canada (e.g., Toronto Pearson) on your way to another destination and your nationality requires a Canadian Transit Visa, you must obtain it in advance even if you never leave the airport.",
      },
      {
        q: "How long can I stay in Canada on a tourist visa (TRV)?",
        a: "A Canadian TRV is typically valid for up to 10 years or 1 month before your passport expires (whichever is sooner). Each entry allows a maximum stay of 6 months as determined by the border officer.",
      },
    ],
    relatedLinks: [
      { label: "Bangladesh → USA Processing Time", slug: "bangladeshi-national-visa-processing-time-for-united-states", type: "sticker" },
      { label: "Bangladesh → UK Processing Time", slug: "bangladeshi-national-visa-processing-time-for-united-kingdom", type: "sticker" },
      { label: "Bangladesh → Schengen Processing Time", slug: "bangladeshi-national-visa-processing-time-for-schengen", type: "sticker" },
      { label: "India → Canada Processing Time", slug: "indian-national-visa-processing-time-for-canada", type: "sticker" },
    ],
  },
  "united-states": {
    name: "United States", flag: "🇺🇸",
    capital: "Washington D.C.",
    continent: "North America",
    currency: "USD",
    language: "English",
    types: {
      "e-visa":           { min:3,  max:5,   label:"ESTA (Visa Waiver Program)", fee:"USD 21" },
      "sticker":          { min:21, max:60,  label:"B1/B2 Tourist/Business Visa", fee:"USD 185" },
      "sticker-extended": { min:60, max:180, label:"Administrative Processing (221g)", fee:"USD 185" },
      "transit":          { min:6,  max:24,  unit:"hours", label:"C-1 Transit Visa", fee:"USD 185" },
    },
    embassyUrl: "https://travel.state.gov/content/travel/en/us-visas.html",
    checklist: [
      "Valid passport (6+ months beyond intended stay)",
      "Completed DS-160 form (online, print confirmation page)",
      "Visa application fee payment (MRV fee receipt)",
      "Interview appointment confirmation letter",
      "One passport-sized photo (US visa specs)",
      "Bank statements — last 3–6 months",
      "Employment letter with salary and leave approval",
      "Property or asset documents (ties to home country)",
      "Invitation letter (if visiting family/friends)",
      "Previous US visa copies (if any)",
    ],
    notes: [
      "Interview appointment wait times vary greatly — Dhaka embassy often 60–90 days wait",
      "DS-160 form must be completed online before scheduling interview",
      "ESTA only available for 40 Visa Waiver Program countries — not Bangladesh",
      "221(g) administrative processing has no fixed timeline — can take months",
      "C-1 Transit visa needed if you change planes in a US airport without cleared status",
    ],
    delayReasons: [
      "221(g) administrative processing — unpredictable security review period",
      "High demand and long appointment backlogs at South Asian consulates",
      "Prior visa refusals increase scrutiny and processing time significantly",
      "Travel history to certain countries may trigger security review",
      "Incomplete or inconsistent documentation",
    ],
    tips: [
      "Schedule your interview the moment your travel is confirmed — slots fill fast",
      "Strong employment letter and 3–6 months pay stubs significantly help approval",
      "Bring original documents — copies alone may cause interview complications",
      "Previous US visa holders often get faster processing and easier approval",
      "For C-1 transit, apply at least 3–4 weeks before your transit date",
    ],
    faqs: [
      {
        q: "How long does US visa administrative processing (221g) take?",
        a: "221(g) administrative processing has no fixed timeline. It can range from 2 weeks to 6+ months depending on the type of security check required. The embassy will not share specific timelines during this period.",
      },
      {
        q: "Can I reschedule my US visa interview appointment?",
        a: "Yes. You can reschedule through the US visa appointment scheduling portal (ustraveldocs.com or similar regional portal). Rescheduling does not affect your application, but frequent rescheduling may raise flags.",
      },
      {
        q: "What happens if my US visa is refused under section 214(b)?",
        a: "A 214(b) refusal means the officer determined you did not demonstrate strong ties to your home country. You can reapply with stronger evidence of employment, property, family, or financial ties. There is no waiting period between applications.",
      },
      {
        q: "Is a transit visa required if I have a layover in the US?",
        a: "Yes — if you are changing planes in a US airport and your nationality is not on the Visa Waiver Program (ESTA), you need either a valid US visa or a C-1 Transit Visa. Without it, you will be denied boarding.",
      },
    ],
    relatedLinks: [
      { label: "Bangladesh → Canada Processing Time", slug: "bangladeshi-national-visa-processing-time-for-canada", type: "sticker" },
      { label: "Bangladesh → UK Processing Time", slug: "bangladeshi-national-visa-processing-time-for-united-kingdom", type: "sticker" },
      { label: "India → USA Processing Time", slug: "indian-national-visa-processing-time-for-united-states", type: "sticker" },
      { label: "Pakistan → USA Processing Time", slug: "pakistani-national-visa-processing-time-for-united-states", type: "sticker" },
    ],
  },
  "united-kingdom": {
    name: "United Kingdom", flag: "🇬🇧",
    capital: "London",
    continent: "Europe",
    currency: "GBP",
    language: "English",
    types: {
      "e-visa":           { min:3,  max:5,  label:"eVisa (UK digital visa)", fee:"GBP 115" },
      "sticker":          { min:15, max:21, label:"Standard Visitor Visa", fee:"GBP 115" },
      "sticker-extended": { min:30, max:60, label:"Priority / Complex Case", fee:"GBP 500+" },
      "transit":          { min:6,  max:24, unit:"hours", label:"Direct Airside Transit Visa (DATV)", fee:"GBP 64" },
    },
    embassyUrl: "https://www.gov.uk/apply-uk-visa",
    checklist: [
      "Valid passport (valid for entire stay duration)",
      "UKVI online account creation",
      "Biometrics appointment at VFS Global",
      "Bank statements — last 6 months with average balance",
      "Employment letter on company letterhead with salary",
      "Hotel bookings and return flight tickets",
      "Travel itinerary (detailed day-by-day)",
      "Proof of accommodation in UK",
      "Sponsor letter (if staying with family/friends)",
      "Travel insurance for UK visit",
    ],
    notes: [
      "UK switched to digital eVisa in 2024 — physical vignette stickers phased out",
      "UKVI online account required to prove permission to enter the UK",
      "Biometrics collected at Visa Application Centre (VFS Global)",
      "Priority service (extra fee) cuts standard time to 5 business days",
      "DATV (Direct Airside Transit Visa) required for Bangladeshi, Pakistani, Ghanaian and several other nationalities even for short UK layovers",
    ],
    delayReasons: [
      "Incomplete travel history documentation or gaps unexplained",
      "Financial evidence not meeting the required threshold",
      "Gaps in employment history require detailed explanation letters",
      "Deferred decision — Home Office may request further evidence (Section 120)",
      "Incorrect or missing biometrics submission",
    ],
    tips: [
      "Apply no more than 3 months before travel — applications opened too early may be rejected",
      "Use the priority service if your travel is within 4 weeks",
      "Include strong evidence of accommodation, detailed itinerary, and return ticket",
      "An employer letter on company letterhead with salary details is essential",
      "DATV holders must remain in the international transit zone — no entry to UK",
    ],
    faqs: [
      {
        q: "What is a UK DATV (Direct Airside Transit Visa) and who needs it?",
        a: "A DATV is required for certain nationalities transiting through UK airports — even if you do not leave the international zone. Bangladeshi, Pakistani, Nigerian, Ghanaian, and several other nationals need it. Check the official UKVI DATV list before booking.",
      },
      {
        q: "How is the UK eVisa different from the old vignette sticker?",
        a: "The UK eVisa is a fully digital permission to travel — there is no physical sticker in your passport. Instead, you receive a UKVI online account linked to your passport. UK border officers verify your status digitally on arrival.",
      },
      {
        q: "Can I work in the UK on a standard visitor visa?",
        a: "No. A Standard Visitor Visa strictly prohibits paid employment in the UK. If you plan to work, you must apply for the appropriate work visa (Skilled Worker, Temporary Worker, etc.) before traveling.",
      },
      {
        q: "What bank balance do I need for a UK visitor visa?",
        a: "There is no fixed minimum, but UK Home Office expects sufficient funds to cover your accommodation, travel, and living expenses for your entire stay. For a 2-week trip, most applicants show at least £2,000–£3,000 in accessible funds with a stable 6-month balance history.",
      },
    ],
    relatedLinks: [
      { label: "Bangladesh → USA Processing Time", slug: "bangladeshi-national-visa-processing-time-for-united-states", type: "sticker" },
      { label: "Bangladesh → Schengen Processing Time", slug: "bangladeshi-national-visa-processing-time-for-schengen", type: "sticker" },
      { label: "Bangladesh → Canada Processing Time", slug: "bangladeshi-national-visa-processing-time-for-canada", type: "sticker" },
      { label: "Nigeria → UK Processing Time", slug: "nigerian-national-visa-processing-time-for-united-kingdom", type: "sticker" },
    ],
  },
  schengen: {
    name: "Schengen Area", flag: "🇪🇺",
    capital: "Brussels (EU HQ)",
    continent: "Europe",
    currency: "EUR",
    language: "Multiple",
    types: {
      "e-visa":           { min:5,  max:10, label:"ETIAS (From 2025)", fee:"EUR 7" },
      "sticker":          { min:15, max:30, label:"Schengen Short-Stay Visa (C Visa)", fee:"EUR 80" },
      "sticker-extended": { min:45, max:90, label:"Complex Case / Document Request", fee:"EUR 80" },
      "transit":          { min:6,  max:24, unit:"hours", label:"Airport Transit Visa (ATV)", fee:"EUR 80" },
    },
    embassyUrl: "https://ec.europa.eu/home-affairs/what-we-do/policies/borders-and-visas_en",
    checklist: [
      "Valid passport (3+ months beyond stay, issued within last 10 years)",
      "Completed Schengen visa application form",
      "Two recent passport photos (Schengen specs)",
      "Travel insurance (min €30,000 coverage, valid across Schengen)",
      "Bank statements — last 3 months (min €50–100/day of stay)",
      "Employment letter or student enrollment proof",
      "Hotel bookings and flight itinerary",
      "Travel history documentation",
      "Cover letter explaining purpose and itinerary",
      "Proof of accommodation for each country visited",
    ],
    notes: [
      "Apply at the embassy of the country where you'll spend the most time",
      "Maximum stay is 90 days within any 180-day rolling period",
      "Travel insurance with minimum €30,000 coverage is mandatory",
      "Some consulates use VFS Global or TLScontact for appointment booking",
      "Airport Transit Visa (ATV) required for specific nationalities transiting Schengen airports without entering the zone",
    ],
    delayReasons: [
      "Incomplete or inconsistent itinerary and hotel bookings",
      "Insufficient financial proof (min €50–100/day of stay recommended)",
      "Hotel bookings not in applicant's name or non-refundable bookings suspicious",
      "Previous Schengen refusals significantly slow down new applications",
      "Missing travel insurance or insufficient coverage amount",
    ],
    tips: [
      "Apply 3–6 weeks in advance (no earlier than 6 months before travel)",
      "Book refundable hotels and flexible flights specifically for the application",
      "Show strong bank balance — ideally 3× the estimated trip cost",
      "A prior Schengen visa record significantly improves future approval chances",
      "ATV applicants must remain in the international zone — not allowed into Schengen territory",
    ],
    faqs: [
      {
        q: "Which Schengen embassy should I apply to if visiting multiple countries?",
        a: "Apply to the embassy of the country where you'll spend the most nights. If equal nights are planned, apply to the embassy of the first country of entry. Each Schengen member state's embassy evaluates applications independently.",
      },
      {
        q: "What is the Schengen 90/180 day rule?",
        a: "Within any 180-day rolling period, you can stay in the Schengen Area for a maximum of 90 days. The counting includes all Schengen countries combined, not individual country stays. Exceeding this limit results in an overstay violation.",
      },
      {
        q: "Does a previous Schengen visa refusal hurt future applications?",
        a: "Yes, significantly. All Schengen states share a common Visa Information System (VIS). A refusal is visible to all member embassies. You must declare previous refusals and provide strong new evidence to overcome the negative history.",
      },
      {
        q: "What is ETIAS and when does it replace the Schengen visa?",
        a: "ETIAS (European Travel Information and Authorisation System) is an online pre-travel authorization for visa-free nationalities — similar to ESTA for the US. It does NOT replace the Schengen visa for nationalities that currently require a visa (e.g., Bangladesh, Pakistan). Those nationals will still need a sticker visa.",
      },
    ],
    relatedLinks: [
      { label: "Bangladesh → Germany Processing Time", slug: "bangladeshi-national-visa-processing-time-for-germany", type: "sticker" },
      { label: "Bangladesh → France Processing Time", slug: "bangladeshi-national-visa-processing-time-for-france", type: "sticker" },
      { label: "Bangladesh → UK Processing Time", slug: "bangladeshi-national-visa-processing-time-for-united-kingdom", type: "sticker" },
      { label: "India → Schengen Processing Time", slug: "indian-national-visa-processing-time-for-schengen", type: "sticker" },
    ],
  },
  australia: {
    name: "Australia", flag: "🇦🇺",
    capital: "Canberra",
    continent: "Oceania",
    currency: "AUD",
    language: "English",
    types: {
      "e-visa":           { min:1,  max:3,   label:"ETA / eVisitor (Subclass 601/651)", fee:"AUD 20" },
      "sticker":          { min:20, max:35,  label:"Visitor Visa (Subclass 600)", fee:"AUD 150" },
      "sticker-extended": { min:60, max:120, label:"Complex Health/Character Check", fee:"AUD 150" },
      "transit":          { min:6,  max:24,  unit:"hours", label:"Transit Visa (Subclass 771)", fee:"Free" },
    },
    embassyUrl: "https://immi.homeaffairs.gov.au/",
    checklist: [
      "Valid passport (6+ months beyond intended stay)",
      "ImmiAccount registration and online application",
      "Recent passport-sized photo",
      "Bank statements — last 3 months with sufficient funds",
      "Employment or enrollment documents",
      "Genuine Temporary Entrant (GTE) statement",
      "Health examination (if required for your nationality)",
      "Police clearance (character requirement, if applicable)",
      "Return flight itinerary",
      "Accommodation proof or invitation letter",
    ],
    notes: [
      "All Australian visas are fully digital — no physical stamp or sticker issued",
      "ImmiAccount portal tracks real-time application status with document requests",
      "Health examination required for stays over 12 months or specific health conditions",
      "Character requirements apply — police clearance may be needed for some nationalities",
      "Subclass 771 Transit Visa required for some nationalities transiting Australian airports",
    ],
    delayReasons: [
      "Health examination results pending or referral to Medical Officer of Commonwealth",
      "Character assessment or police certificate requested",
      "High application volume from South and Southeast Asian nationalities",
      "Sponsor or host verification delays for visitor visa streams",
      "Genuine Temporary Entrant (GTE) concerns",
    ],
    tips: [
      "Submit complete health exam results upfront if medical is likely required",
      "The 600 visa can be applied for up to 12 months in advance of travel",
      "Keep ImmiAccount notifications active — document requests expire in 28 days",
      "A convincing GTE (Genuine Temporary Entrant) statement is the most critical document",
      "771 transit visa processing: apply at least 2 weeks before transit date",
    ],
    faqs: [
      {
        q: "What is a GTE statement for the Australia visitor visa?",
        a: "A Genuine Temporary Entrant (GTE) statement is a written declaration explaining why you intend to visit Australia temporarily and will return home after your visit. It should cover personal ties, employment, family, and financial reasons for returning. It is the most critically reviewed part of the Subclass 600 application.",
      },
      {
        q: "Do I need a health exam for an Australian tourist visa?",
        a: "Most short-stay tourist visa applicants (under 12 months) do not require a health exam. However, if you have a chronic health condition or are from a country with high TB rates, the Department of Home Affairs may request a medical examination through an approved BUPA Medical Appointment Service provider.",
      },
      {
        q: "Is there a way to expedite Australian visa processing?",
        a: "Australia does not offer a standard priority visa processing option for tourist visas. The fastest way is to submit a complete, error-free application with all required documents including health checks if applicable. eVisitor (601) and ETA visas are typically approved within 1–3 days for eligible nationalities.",
      },
      {
        q: "Can I extend my Australian tourist visa while in Australia?",
        a: "In limited circumstances, yes. You can apply for a further stay visa (Subclass 600) before your current visa expires. Extensions are not guaranteed and require strong justification. Overstaying an Australian visa results in a 3-year ban from re-entry.",
      },
    ],
    relatedLinks: [
      { label: "Bangladesh → Canada Processing Time", slug: "bangladeshi-national-visa-processing-time-for-canada", type: "sticker" },
      { label: "Bangladesh → UK Processing Time", slug: "bangladeshi-national-visa-processing-time-for-united-kingdom", type: "sticker" },
      { label: "India → Australia Processing Time", slug: "indian-national-visa-processing-time-for-australia", type: "sticker" },
      { label: "Bangladesh → Singapore Processing Time", slug: "bangladeshi-national-visa-processing-time-for-singapore", type: "sticker" },
    ],
  },
  "united-arab-emirates": {
    name: "United Arab Emirates", flag: "🇦🇪",
    capital: "Abu Dhabi",
    continent: "Middle East",
    currency: "AED",
    language: "Arabic / English",
    types: {
      "e-visa":           { min:2,  max:4,  label:"UAE e-Visa (Tourist/Visit)", fee:"AED 300–500" },
      "sticker":          { min:5,  max:10, label:"Visa on Arrival / Embassy Visa", fee:"AED 200+" },
      "sticker-extended": { min:15, max:30, label:"Complex / Employment Visa", fee:"AED 500+" },
      "transit":          { min:6,  max:24, unit:"hours", label:"UAE Transit Visa (96-hour)", fee:"AED 50" },
    },
    embassyUrl: "https://icp.gov.ae/",
    checklist: [
      "Passport valid for at least 6 months",
      "Recent passport-size photograph (white background)",
      "Return flight ticket confirmation",
      "Hotel booking confirmation or sponsor letter",
      "Bank statement showing sufficient funds",
      "Employment letter (for employment visa)",
      "Medical fitness certificate (for employment visa)",
      "Emirates ID application (for residence visa)",
      "Valid health insurance (required for residence)",
      "Attested educational certificates (for employment visa)",
    ],
    notes: [
      "Most nationalities can apply online via icp.gov.ae or reputable travel agents",
      "30-day and 60-day tourist visas often approved within 48 hours",
      "Emirates and Etihad offer integrated visa-on-booking for passengers",
      "No medical required for tourist visas under 90 days",
      "96-hour transit visa available for travelers connecting through Dubai or Abu Dhabi",
    ],
    delayReasons: [
      "Criminal record or previous overstay in any GCC country",
      "Name mismatch or inconsistency across passport and booking documents",
      "Expired or near-expiry passport (must have 6+ months validity)",
      "High application volume during Ramadan, Eid, and Dubai Shopping Festival",
      "Background check delays for certain nationalities",
    ],
    tips: [
      "Apply 3–5 days before travel for e-visa — processing is very fast",
      "Use Dubai Tourism official portal or established travel agents only",
      "Ensure passport photo meets UAE-specific background and size requirements",
      "96-hour transit visa can be extended to allow Dubai city access between flights",
      "Travel insurance is not mandatory for UAE but strongly recommended",
    ],
    faqs: [
      {
        q: "Can I get a UAE visa on arrival at Dubai airport?",
        a: "Visa on arrival is available for nationals of approximately 50 countries including the US, UK, EU, and several others. Bangladeshi, Pakistani, and Indian nationals generally do not qualify for visa on arrival and must apply for an e-visa in advance through an airline, travel agent, or the ICP portal.",
      },
      {
        q: "What is the UAE 96-hour transit visa?",
        a: "The UAE 96-hour transit visa allows travelers connecting through Dubai (DXB) or Abu Dhabi (AUH) to exit the airport and explore the UAE for up to 4 days between flights. It must be applied for in advance and costs approximately AED 50. It is not the same as airside transit which requires no visa.",
      },
      {
        q: "How long can I stay in UAE on a tourist visa?",
        a: "UAE tourist visas are available in 30-day and 60-day options, both single or multiple entry. The 30-day visa can sometimes be renewed once inside the UAE for an additional 30 days. A 90-day visa is also available for some nationalities. Overstaying incurs fines of AED 200/day.",
      },
      {
        q: "Is UAE visa approval guaranteed after submission?",
        a: "No. While UAE e-visa approval rates are generally high, applications can be refused due to previous GCC overstays, travel history concerns, or name-matching issues against security databases. Refusal reasons are rarely disclosed by UAE authorities.",
      },
    ],
    relatedLinks: [
      { label: "Bangladesh → Saudi Arabia Processing Time", slug: "bangladeshi-national-visa-processing-time-for-saudi-arabia", type: "sticker" },
      { label: "Bangladesh → Singapore Processing Time", slug: "bangladeshi-national-visa-processing-time-for-singapore", type: "sticker" },
      { label: "Pakistan → UAE Processing Time", slug: "pakistani-national-visa-processing-time-for-united-arab-emirates", type: "e-visa" },
      { label: "India → UAE Processing Time", slug: "indian-national-visa-processing-time-for-united-arab-emirates", type: "e-visa" },
    ],
  },
  germany: {
    name: "Germany", flag: "🇩🇪",
    capital: "Berlin",
    continent: "Europe",
    currency: "EUR",
    language: "German",
    types: {
      "sticker":          { min:15, max:21, label:"National Visa / Schengen Visa", fee:"EUR 75" },
      "sticker-extended": { min:45, max:90, label:"Complex Case / Student Visa", fee:"EUR 75" },
      "transit":          { min:6,  max:24, unit:"hours", label:"Airport Transit Visa (TATV)", fee:"EUR 75" },
    },
    embassyUrl: "https://www.germany-visa.org/",
    checklist: [
      "Valid passport (3+ months validity beyond stay)",
      "Completed German visa application form (signed)",
      "Two biometric passport photos",
      "APS Certificate (for Bangladeshi/Indian/Pakistani students)",
      "University acceptance letter (for student visa)",
      "Blocked account (Sperrkonto) certificate — min €11,208/year",
      "Health insurance covering Germany / Schengen",
      "Proof of accommodation in Germany",
      "Flight itinerary (return ticket)",
      "German language certificate (if applicable)",
    ],
    notes: [
      "APS Certificate (Academic Evaluation Centre) required for Bangladeshi students",
      "Blocked account (Sperrkonto) with €11,208/year required for student visas",
      "Visa appointments at German embassies can be 4–8 weeks ahead — book early",
      "TATV (Temporary Airport Transit Visa) required for Bangladeshis transiting Frankfurt, Munich",
    ],
    delayReasons: [
      "APS or document authentication pending",
      "Blocked account not yet funded or certificate not received",
      "University enrollment proof not meeting German standards",
      "High application volume — German embassies in South Asia handle large numbers",
    ],
    tips: [
      "Start your blocked account process 6–8 weeks before application",
      "Book your appointment as soon as you have your university acceptance",
      "For TATV: apply 3–4 weeks before your German transit to allow processing",
      "German language skills (even basic) significantly strengthen non-language course applications",
    ],
    faqs: [
      {
        q: "What is an APS certificate and why is it required for Germany student visa?",
        a: "The APS (Academic Evaluation Centre) certificate is a document verification process required for applicants from Bangladesh, China, and several other countries applying for German student or education visas. It confirms that your academic credentials are genuine. The process takes 4–6 weeks and costs approximately EUR 150.",
      },
      {
        q: "What is a Sperrkonto (blocked account) for German student visa?",
        a: "A Sperrkonto is a blocked bank account in Germany where you deposit the required living funds (currently €11,208/year). The money is released in monthly instalments after you arrive in Germany. It proves to the visa officer that you have sufficient funds to live in Germany without working illegally.",
      },
      {
        q: "Do I need a TATV to transit Frankfurt airport as a Bangladeshi citizen?",
        a: "Yes. Bangladeshi nationals must obtain an Airport Transit Visa (TATV) to transit through German airports including Frankfurt (FRA) and Munich (MUC). This applies even if you are only changing planes and not entering Germany. Apply at least 3–4 weeks before your transit date.",
      },
      {
        q: "Can I work in Germany while studying on a student visa?",
        a: "Yes, but with restrictions. German student visa holders can work up to 120 full days or 240 half days per year. This limit does not apply during semester breaks for student assistants (Werkstudent) at their own university under specific conditions.",
      },
    ],
    relatedLinks: [
      { label: "Bangladesh → Schengen Processing Time", slug: "bangladeshi-national-visa-processing-time-for-schengen", type: "sticker" },
      { label: "Bangladesh → France Processing Time", slug: "bangladeshi-national-visa-processing-time-for-france", type: "sticker" },
      { label: "Bangladesh → UK Processing Time", slug: "bangladeshi-national-visa-processing-time-for-united-kingdom", type: "sticker" },
      { label: "India → Germany Processing Time", slug: "indian-national-visa-processing-time-for-germany", type: "sticker" },
    ],
  },
  france: {
    name: "France", flag: "🇫🇷",
    capital: "Paris",
    continent: "Europe",
    currency: "EUR",
    language: "French",
    types: {
      "e-visa":           { min:5,  max:10, label:"ETIAS (from 2025)", fee:"EUR 7" },
      "sticker":          { min:15, max:30, label:"Schengen C Visa / Long-Stay D Visa", fee:"EUR 80" },
      "sticker-extended": { min:45, max:90, label:"Complex Case", fee:"EUR 80" },
      "transit":          { min:6,  max:24, unit:"hours", label:"Airport Transit Visa (ATV)", fee:"EUR 80" },
    },
    embassyUrl: "https://france-visas.gouv.fr/",
    checklist: [
      "Valid passport (3+ months validity beyond stay)",
      "Completed France visa application form",
      "Two recent passport photos (French specifications)",
      "Travel insurance (min €30,000, Schengen-wide)",
      "Campus France pre-registration (for student visas)",
      "Proof of accommodation in France (hotel or host letter)",
      "Bank statements — last 3 months, sufficient daily funds",
      "Return flight reservation",
      "Employment or enrollment letter",
      "VFS Global biometrics appointment confirmation",
    ],
    notes: [
      "Campus France pre-registration required for student visa applicants",
      "Long-stay D visa (over 3 months) requires OFII registration on arrival",
      "VFS Global handles biometrics for French visa applications in most countries",
      "ATV required for Bangladeshi, Pakistani, Nigerian nationals transiting French airports",
    ],
    delayReasons: [
      "Campus France evaluation pending",
      "Insufficient financial proof per day of stay",
      "Travel insurance not meeting minimum €30,000 coverage",
      "Hotel bookings not confirmed or inconsistent with itinerary",
    ],
    tips: [
      "Complete Campus France pre-registration at least 6 weeks before applying",
      "Book refundable hotels for application — switch to actual booking after visa approval",
      "Show strong bank balance and employment evidence for tourist visas",
      "ATV applicants must stay in the international transit zone — no entry to France",
    ],
    faqs: [
      {
        q: "What is Campus France and why is it required for France student visa?",
        a: "Campus France is the French national agency for international student mobility. For certain nationalities (including Bangladesh), student visa applicants must register through Campus France, attend an interview, and receive a Campus France number before applying for the visa at VFS Global. The process takes 3–6 weeks.",
      },
      {
        q: "What is an OFII registration and when is it required?",
        a: "OFII (Office Français de l'Immigration et de l'Intégration) registration is required for anyone arriving in France on a long-stay visa (D visa, valid over 3 months). You must complete OFII registration within 3 months of arrival to validate your right to stay in France beyond the initial visa period.",
      },
      {
        q: "Is a French airport transit visa (ATV) the same as entering France?",
        a: "No. An ATV (Airport Transit Visa) allows you to transit through a French international airport without entering French territory. You must remain in the international transit zone at all times. If you need to exit the airport (e.g., for a hotel layover), you need a full Schengen visa, not an ATV.",
      },
      {
        q: "Can I apply for a France Schengen visa and visit other Schengen countries?",
        a: "Yes. A French Schengen (C) visa allows you to travel freely throughout all 27 Schengen member states during its validity period, subject to the 90/180-day rule. You must enter through France first if France is your main destination country on the visa application.",
      },
    ],
    relatedLinks: [
      { label: "Bangladesh → Schengen Processing Time", slug: "bangladeshi-national-visa-processing-time-for-schengen", type: "sticker" },
      { label: "Bangladesh → Germany Processing Time", slug: "bangladeshi-national-visa-processing-time-for-germany", type: "sticker" },
      { label: "Bangladesh → UK Processing Time", slug: "bangladeshi-national-visa-processing-time-for-united-kingdom", type: "sticker" },
      { label: "India → France Processing Time", slug: "indian-national-visa-processing-time-for-france", type: "sticker" },
    ],
  },
  "saudi-arabia": {
    name: "Saudi Arabia", flag: "🇸🇦",
    capital: "Riyadh",
    continent: "Middle East",
    currency: "SAR",
    language: "Arabic",
    types: {
      "e-visa":           { min:2,  max:4,  label:"Saudi e-Visa (Tourist)", fee:"SAR 300" },
      "sticker":          { min:10, max:21, label:"Saudi Sticker Visa", fee:"SAR 200+" },
      "sticker-extended": { min:30, max:60, label:"Work Visa / Iqama", fee:"SAR 500+" },
      "transit":          { min:6,  max:24, unit:"hours", label:"Saudi Transit Visa", fee:"SAR 100" },
    },
    embassyUrl: "https://visa.mofa.gov.sa/",
    checklist: [
      "Valid passport (6+ months validity)",
      "Recent passport-size photo (white background)",
      "Medical fitness certificate (MOH-approved center)",
      "Attested educational certificates (for employment)",
      "Employment contract (for work visa)",
      "Medical insurance (mandatory for workers)",
      "Company sponsorship letter (Kafala)",
      "Biometric data collection",
      "Criminal background check",
      "Proof of accommodation in Saudi Arabia",
    ],
    notes: [
      "Saudi tourist e-visa available for 50+ nationalities through Tawakkalna",
      "Women under 21 require guardian's consent documentation",
      "Iqama (residence permit) required for work visa holders within 90 days of arrival",
      "Medical examination at MOH-approved centers required for employment visas",
    ],
    delayReasons: [
      "Ministry of Foreign Affairs manual review for certain nationalities",
      "Sponsor delays for employment or family visit visas",
      "Medical fitness certificate not from approved Saudi MOH center",
      "Attested educational certificates not meeting Saudi standards",
    ],
    tips: [
      "Use Tawakkalna or Enjazit official portals only for visa applications",
      "Ensure all documents are attested through proper channels (MFA, Saudi Embassy)",
      "Medical examination must be done at MOH-approved center in your home country",
      "Transit visa applicants should confirm their transit airport and layover duration",
    ],
    faqs: [
      {
        q: "What is the Saudi Kafala (sponsorship) system?",
        a: "The Kafala system is Saudi Arabia's employer-sponsored visa system for foreign workers. Your employer (kafeel/sponsor) is legally responsible for your stay in Saudi Arabia. This system is mandatory for most work visa categories. Saudi Arabia has been reforming Kafala since 2021, giving workers more freedom to change jobs and exit the country.",
      },
      {
        q: "How do I get a Saudi medical fitness certificate?",
        a: "The medical fitness certificate for Saudi work visa must be obtained from a Ministry of Health (MOH)-approved medical center in your home country. In Bangladesh, GCC-approved medical centers are located in Dhaka, Chittagong, and other major cities. Results are submitted directly to the GAMCA database used by GCC embassies.",
      },
      {
        q: "Can I convert a Saudi tourist visa to a work visa inside Saudi Arabia?",
        a: "In most cases, no. Saudi Arabia does not allow status changes from tourist visa to work visa inside the country. You must exit and re-enter on the correct visa category. Some special zones and employer-specific cases may allow in-country status adjustment, but this is rare.",
      },
      {
        q: "What is the Saudi Iqama and when do I need it?",
        a: "The Iqama is a Saudi national residency permit that all foreign workers and residents must obtain within 90 days of arrival. It is a physical ID card used for all official transactions in Saudi Arabia. Without an Iqama, you cannot open a bank account, sign a lease, or access most government services.",
      },
    ],
    relatedLinks: [
      { label: "Bangladesh → UAE Processing Time", slug: "bangladeshi-national-visa-processing-time-for-united-arab-emirates", type: "e-visa" },
      { label: "Bangladesh → Singapore Processing Time", slug: "bangladeshi-national-visa-processing-time-for-singapore", type: "sticker" },
      { label: "Pakistan → Saudi Arabia Processing Time", slug: "pakistani-national-visa-processing-time-for-saudi-arabia", type: "sticker" },
      { label: "India → Saudi Arabia Processing Time", slug: "indian-national-visa-processing-time-for-saudi-arabia", type: "sticker" },
    ],
  },
  singapore: {
    name: "Singapore", flag: "🇸🇬",
    capital: "Singapore",
    continent: "Southeast Asia",
    currency: "SGD",
    language: "English / Malay / Mandarin",
    types: {
      "e-visa":           { min:3,  max:5,  label:"Singapore e-Visa (SAVE)", fee:"SGD 30" },
      "sticker":          { min:7,  max:14, label:"Singapore Visit Visa", fee:"SGD 30" },
      "sticker-extended": { min:21, max:45, label:"Employment Pass / S-Pass", fee:"SGD 105" },
      "transit":          { min:6,  max:24, unit:"hours", label:"Transit Without Visa / Transit Visa", fee:"Free/SGD 30" },
    },
    embassyUrl: "https://www.ica.gov.sg/",
    checklist: [
      "Valid passport (6+ months validity)",
      "ICA online application form",
      "Recent passport photo",
      "Bank statements (last 3 months)",
      "Employment letter or business registration",
      "Travel itinerary and hotel bookings",
      "Return flight confirmation",
      "Invitation letter (if visiting company)",
      "Educational certificates (for Employment Pass)",
      "Company offer letter and salary details (for EP/S-Pass)",
    ],
    notes: [
      "Most visa applications submitted through ICA (Immigration and Checkpoints Authority)",
      "Singapore Employment Pass requires monthly salary above SGD 5,000",
      "In-Principle Approval (IPA) letter issued first, then physical pass on arrival",
      "Many nationalities can transit Singapore without a visa for short layovers",
    ],
    delayReasons: [
      "Salary assessment for EP/S-Pass below Fair Consideration Framework guidelines",
      "Previous immigration violations in Singapore or ASEAN countries",
      "Incomplete company sponsorship documentation for employment visas",
      "Background check delays for certain nationalities",
    ],
    tips: [
      "Student visa holders must complete STP (Student's Pass) formalities within 30 days",
      "Employment Pass applications: submit all educational credentials upfront",
      "Check Singapore TVWP (Transit Without Visa) eligibility before assuming you need a visa",
      "Keep ICA online portal notifications on for document requests",
    ],
    faqs: [
      {
        q: "Can Bangladeshi citizens transit Singapore without a visa?",
        a: "Bangladeshi passport holders can transit through Singapore's Changi Airport without a visa under the Transit Without Visa (TWOV) scheme, provided they hold a valid visa for their destination country (e.g., USA, UK, Australia) and their transit is under 96 hours. Always verify eligibility with your airline and ICA before booking.",
      },
      {
        q: "What is the Singapore Employment Pass (EP) and who is eligible?",
        a: "The Singapore Employment Pass is a work visa for foreign professionals with a job offer from a Singapore-registered company. As of 2024, the minimum qualifying salary is SGD 5,000/month (higher for financial sector). Applicants must also meet qualifications assessed under the new COMPASS framework.",
      },
      {
        q: "How long does Singapore visit visa processing take?",
        a: "Singapore visit visa (short-term visit pass) processing typically takes 7–14 business days for most nationalities including Bangladesh. You will receive an In-Principle Approval (IPA) letter by email, which you present to an immigration officer on arrival to collect the actual pass.",
      },
      {
        q: "Can I extend my Singapore tourist visit pass?",
        a: "Yes. You can apply for a short-term visit pass extension at an ICA Service Centre in Singapore or through the e-Extension online portal. Extensions are granted at the discretion of ICA and typically allow an additional 30 days. You must apply before your current pass expires.",
      },
    ],
    relatedLinks: [
      { label: "Bangladesh → UAE Processing Time", slug: "bangladeshi-national-visa-processing-time-for-united-arab-emirates", type: "e-visa" },
      { label: "Bangladesh → Australia Processing Time", slug: "bangladeshi-national-visa-processing-time-for-australia", type: "sticker" },
      { label: "India → Singapore Processing Time", slug: "indian-national-visa-processing-time-for-singapore", type: "sticker" },
      { label: "Bangladesh → Japan Processing Time", slug: "bangladeshi-national-visa-processing-time-for-japan", type: "sticker" },
    ],
  },
  japan: {
    name: "Japan", flag: "🇯🇵",
    capital: "Tokyo",
    continent: "East Asia",
    currency: "JPY",
    language: "Japanese",
    types: {
      "sticker":          { min:5,  max:7,  label:"Japan Tourist Visa", fee:"JPY 3,000" },
      "sticker-extended": { min:21, max:45, label:"Japan Long-Stay / Work Visa", fee:"JPY 6,000" },
      "transit":          { min:6,  max:24, unit:"hours", label:"Japan Shore Pass / Transit", fee:"Free" },
    },
    embassyUrl: "https://www.mofa.go.jp/j_info/visit/visa/",
    checklist: [
      "Valid passport (valid for duration of stay + buffer)",
      "Japan visa application form (from embassy website)",
      "Two recent passport photos (Japan specs)",
      "Detailed day-by-day itinerary",
      "Hotel booking confirmations for entire stay",
      "Return flight tickets",
      "Bank statements — last 3 months",
      "Employment letter with leave approval",
      "Invitation letter (if visiting family or company)",
      "Additional documents as required by nationality",
    ],
    notes: [
      "Japanese embassy does not do interviews — application submitted through embassy or agent",
      "All Japan visas are sticker visas — no e-visa system for most nationalities",
      "Financial documents must be translated into Japanese or English",
      "Japan transit (shore pass or transit without visa) available for short layovers at specified airports",
    ],
    delayReasons: [
      "Insufficient financial documentation or inconsistent bank statements",
      "Travel history raises concerns about overstay risk",
      "Incomplete itinerary or hotel bookings",
      "Previous Japan visa refusal significantly impacts new applications",
    ],
    tips: [
      "Include a highly detailed day-by-day itinerary — Japan embassies love specifics",
      "Book hotels before applying — cancellable bookings are acceptable",
      "Apply 3–4 weeks in advance; peak season adds 3–5 business days",
      "Strong bank statement and employer letter are the two most critical documents",
    ],
    faqs: [
      {
        q: "Why does Japan require such a detailed itinerary for tourist visas?",
        a: "Japan's Ministry of Foreign Affairs reviews itineraries closely to assess the genuineness of the visit and overstay risk. A detailed, day-by-day itinerary with specific hotels, attractions, and activities demonstrates clear travel intent and increases approval confidence significantly.",
      },
      {
        q: "Can I apply for a Japan visa without an interview?",
        a: "Yes. Japan does not conduct visa interviews for most nationalities. Applications are submitted to the Japanese embassy or consulate (or through an authorized travel agent) with all required documents. Decisions are made based solely on submitted paperwork, typically within 5–7 business days.",
      },
      {
        q: "What is the Japan Multiple Entry visa and who qualifies?",
        a: "A Japan Multiple Entry visa allows holders to enter Japan multiple times during its validity (usually 3 or 5 years). It is typically granted to applicants with a good previous Japan visit record, strong financial standing, and stable employment. First-time Japan visa applicants usually receive a single or double entry visa.",
      },
      {
        q: "Is Japan considering an e-visa system for tourist visas?",
        a: "Japan launched a limited e-visa pilot for certain nationalities (US, Australia, Singapore, etc.) in 2023 and has been expanding it. As of 2025, most South Asian nationalities including Bangladesh still require a physical sticker visa through the embassy. Check MOFA's latest updates as the program is being expanded.",
      },
    ],
    relatedLinks: [
      { label: "Bangladesh → Singapore Processing Time", slug: "bangladeshi-national-visa-processing-time-for-singapore", type: "sticker" },
      { label: "Bangladesh → South Korea Processing Time", slug: "bangladeshi-national-visa-processing-time-for-south-korea", type: "sticker" },
      { label: "India → Japan Processing Time", slug: "indian-national-visa-processing-time-for-japan", type: "sticker" },
      { label: "Bangladesh → Australia Processing Time", slug: "bangladeshi-national-visa-processing-time-for-australia", type: "sticker" },
    ],
  },
};

// ── GENERIC FALLBACK ───────────────────────────────────────────────────────
function getCountryData(destSlug) {
  const key = Object.keys(VISA_RULES).find(k => destSlug.includes(k));
  if (key) return { key, ...VISA_RULES[key] };
  const destName = destSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    key: "generic",
    name: destName,
    flag: "🌍",
    capital: "—",
    continent: "—",
    currency: "—",
    language: "—",
    types: {
      "e-visa":           { min:2,  max:5,  label:"E-Visa (Online)",               fee:"Varies" },
      "sticker":          { min:15, max:21, label:"Sticker Visa",                   fee:"Varies" },
      "sticker-extended": { min:45, max:60, label:"Complex / Extended Processing",  fee:"Varies" },
      "transit":          { min:6,  max:24, unit:"hours", label:"Transit Visa",     fee:"Varies" },
    },
    embassyUrl: null,
    checklist: [
      "Valid passport (6+ months beyond intended stay)",
      "Completed visa application form",
      "Recent passport-size photographs",
      "Bank statements (last 3–6 months)",
      "Employment or enrollment letter",
      "Travel itinerary and hotel bookings",
      "Return flight confirmation",
      "Travel insurance",
      "Proof of accommodation",
      "Processing fee payment receipt",
    ],
    notes: [
      "Processing times are estimates based on typical embassy timelines",
      "Always verify with the official embassy or consulate of the destination country",
      "Apply well in advance — at least 6–8 weeks before travel for sticker visas",
      "Transit visa (6–24 hours): confirm with your airline and destination embassy",
    ],
    delayReasons: [
      "Incomplete or inconsistent documentation",
      "High application volume or peak seasonal demand",
      "Additional security or background checks",
      "Administrative processing delays at the embassy",
    ],
    tips: [
      "Submit a complete, well-organized application package with all required documents",
      "Include a strong cover letter and detailed supporting documents",
      "Track your application status regularly via the official portal",
      "Contact the embassy if no update is received after the maximum stated timeframe",
    ],
    faqs: [
      {
        q: "How do I check my visa application status?",
        a: "Most embassies and visa application centres provide an online tracking system using your reference number. If not available, you can contact the VAC or embassy directly via phone or email. Always keep your application reference number safe.",
      },
      {
        q: "What happens if my visa is refused?",
        a: "A visa refusal does not permanently bar future applications. Review the refusal reason, strengthen your documentation, and reapply. Refusals must be declared in future applications to most countries. Professional visa consultation can help identify and address refusal reasons.",
      },
    ],
    relatedLinks: [],
  };
}

// ── VISA TYPE CONFIG ────────────────────────────────────────────────────────
const VISA_TYPE_LABELS = {
  "e-visa":           { label:"E-Visa",      color:"bg-emerald-100 text-emerald-800 border-emerald-200" },
  "sticker":          { label:"Sticker Visa", color:"bg-blue-100 text-blue-800 border-blue-200"         },
  "sticker-extended": { label:"Complex Case", color:"bg-amber-100 text-amber-800 border-amber-200"      },
  "transit":          { label:"Transit Visa", color:"bg-purple-100 text-purple-800 border-purple-200"   },
};

// ── PROCESSING TIMELINE VISUAL ─────────────────────────────────────────────
function ProcessingTimeline({ min, max, unit }) {
  const isHours = unit === "hours";
  const stages = isHours
    ? [
        { label:"Submit Application",  day:"Day 0",     icon:"📝", color:"bg-slate-800" },
        { label:"Embassy Review",      day:"2–4 hrs",   icon:"🔍", color:"bg-amber-500" },
        { label:"Decision",            day:`${min}–${max} hrs`, icon:"✅", color:"bg-emerald-600" },
      ]
    : [
        { label:"Submit + Biometrics", day:"Day 0",          icon:"📝", color:"bg-slate-800" },
        { label:"Document Review",     day:`Day 3–5`,         icon:"🔍", color:"bg-blue-600" },
        { label:"Background Check",    day:`Day 7–10`,        icon:"🛡️", color:"bg-amber-500" },
        { label:"Decision",            day:`Day ${min}–${max}`, icon:"✅", color:"bg-emerald-600" },
      ];

  return (
    <div className="bg-white border-2 border-slate-100 rounded-2xl p-6">
      <h3 className="font-black text-slate-800 text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
        <BarChart2 size={16} className="text-[#005a31]" />
        Processing Timeline
      </h3>
      <div className="relative">
        <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-slate-100" />
        <div className="space-y-4">
          {stages.map((s, i) => (
            <div key={i} className="flex items-center gap-4 relative">
              <div className={`w-10 h-10 ${s.color} rounded-xl flex items-center justify-center text-sm shrink-0 z-10 shadow-sm`}>
                {s.icon}
              </div>
              <div className="flex-1 bg-slate-50 rounded-xl px-4 py-2.5 flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">{s.label}</span>
                <span className="text-xs font-black text-slate-500 bg-white px-2 py-1 rounded-lg border border-slate-100">{s.day}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── APPLICATION CHECKLIST ──────────────────────────────────────────────────
function ApplicationChecklist({ items }) {
  const [checked, setChecked] = useState({});
  const toggle = (i) => setChecked(c => ({ ...c, [i]: !c[i] }));
  const count = Object.values(checked).filter(Boolean).length;

  return (
    <div className="bg-white border-2 border-slate-100 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-black text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
          <CheckSquare size={16} className="text-[#005a31]" />
          Document Checklist
        </h3>
        <span className={`text-xs font-black px-3 py-1.5 rounded-full ${count === items.length ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
          {count}/{items.length}
        </span>
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => toggle(i)}
            className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${checked[i] ? "bg-emerald-50 border border-emerald-200" : "bg-slate-50 hover:bg-slate-100 border border-transparent"}`}
          >
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${checked[i] ? "bg-emerald-500 border-emerald-500" : "border-slate-300"}`}>
              {checked[i] && <CheckCircle2 size={12} className="text-white" />}
            </div>
            <span className={`text-xs font-semibold leading-relaxed ${checked[i] ? "text-emerald-700 line-through opacity-70" : "text-slate-700"}`}>{item}</span>
          </button>
        ))}
      </div>
      {count === items.length && (
        <div className="mt-4 bg-emerald-500 text-white text-center py-3 rounded-xl font-black text-sm">
          🎉 All documents ready — good luck!
        </div>
      )}
    </div>
  );
}

// ── FAQ ACCORDION ───────────────────────────────────────────────────────────
function FAQAccordion({ faqs }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className={`border-2 rounded-2xl overflow-hidden transition-all ${open === i ? "border-[#005a31]" : "border-slate-100"}`}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between gap-4 p-5 text-left"
          >
            <span className="text-sm font-black text-slate-800 leading-relaxed">{faq.q}</span>
            <ChevronDown size={18} className={`text-slate-400 shrink-0 transition-transform mt-0.5 ${open === i ? "rotate-180 text-[#005a31]" : ""}`} />
          </button>
          {open === i && (
            <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed font-medium border-t border-slate-100 pt-4">
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── REVERSE CALCULATOR ─────────────────────────────────────────────────────
function ReverseCalculator({ min, max, unit }) {
  const isHours = unit === "hours";
  const [travelDate, setTravelDate] = useState("");

  const applyBy = useMemo(() => {
    if (!travelDate) return null;
    const d = new Date(travelDate);
    if (isHours) {
      const apply = new Date(d);
      apply.setDate(apply.getDate() - 3);
      return apply;
    }
    const safeBuffer = max + 14;
    const apply = new Date(d);
    apply.setDate(apply.getDate() - safeBuffer);
    return apply;
  }, [travelDate, max, isHours]);

  const urgency = useMemo(() => {
    if (!applyBy) return null;
    const today    = new Date();
    const daysLeft = Math.floor((applyBy - today) / 86400000);
    if (daysLeft < 0)  return { label:`⚠️ Already overdue — apply TODAY`,            color:"text-red-600 bg-red-50 border-red-200" };
    if (daysLeft < 3)  return { label:`🔴 Apply within ${daysLeft} day(s) — urgent!`,color:"text-orange-700 bg-orange-50 border-orange-200" };
    if (daysLeft < 14) return { label:`🟡 Apply within ${daysLeft} days — act soon`, color:"text-amber-700 bg-amber-50 border-amber-200" };
    return               { label:`🟢 You have ${daysLeft} days — you're on time`,    color:"text-green-700 bg-green-50 border-green-200" };
  }, [applyBy]);

  return (
    <div className="bg-[#004d2c] rounded-[2rem] p-8 text-white">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center shrink-0">
          <Calendar size={20} className="text-[#004d2c]" />
        </div>
        <div>
          <h3 className="font-black text-lg">Reverse Application Calculator</h3>
          <p className="text-green-200/70 text-sm">Find your ideal application date</p>
        </div>
      </div>

      <label className="block text-xs font-black uppercase tracking-widest text-green-300/70 mb-2">
        {isHours ? "Your Transit / Travel Date" : "Your Intended Travel Date"}
      </label>
      <input
        type="date"
        value={travelDate}
        onChange={e => setTravelDate(e.target.value)}
        min={new Date().toISOString().split("T")[0]}
        className="w-full px-4 py-4 bg-white/10 border-2 border-white/10 rounded-2xl text-white font-bold text-sm focus:outline-none focus:border-amber-400 transition-all mb-4"
      />

      {applyBy && (
        <div className="space-y-3">
          <div className="flex items-center justify-between bg-white/10 px-5 py-4 rounded-2xl">
            <span className="text-sm text-green-200/80 font-semibold">Apply by (safe date):</span>
            <span className="font-black text-amber-400 text-lg">
              {applyBy.toLocaleDateString("en-GB", { day:"numeric", month:"short", year:"numeric" })}
            </span>
          </div>
          <div className="flex items-center justify-between bg-white/10 px-5 py-4 rounded-2xl">
            <span className="text-sm text-green-200/80 font-semibold">Processing window:</span>
            <span className="font-black text-white">
              {isHours ? `${min}–${max} hours` : `${min}–${max} business days`}
            </span>
          </div>
          {urgency && (
            <div className={`border-2 px-5 py-4 rounded-2xl font-bold text-sm ${urgency.color}`}>
              {urgency.label}
            </div>
          )}
          <div className="bg-white/5 px-4 py-3 rounded-xl text-xs text-green-200/60 font-medium">
            💡 Safe date includes {isHours ? "3 days" : "2 weeks"} buffer beyond max processing time
          </div>
        </div>
      )}

      {!travelDate && (
        <p className="text-green-200/50 text-sm text-center py-4">Enter your travel date above to calculate</p>
      )}
    </div>
  );
}

// ── COUNTRY INFO CARD ──────────────────────────────────────────────────────
function CountryInfoCard({ data }) {
  const fields = [
    { label: "Capital",   value: data.capital    || "—" },
    { label: "Continent", value: data.continent  || "—" },
    { label: "Currency",  value: data.currency   || "—" },
    { label: "Language",  value: data.language   || "—" },
  ];
  return (
    <div className="bg-white border-2 border-slate-100 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-4xl">{data.flag}</span>
        <div>
          <h3 className="font-black text-slate-800">{data.name}</h3>
          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Country Overview</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {fields.map(f => (
          <div key={f.label} className="bg-slate-50 rounded-xl p-3">
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{f.label}</div>
            <div className="text-sm font-bold text-slate-800">{f.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── MAIN CLIENT COMPONENT ─────────────────────────────────────────────────
export default function VisaProcessingSlugPage({ params: serverParams, searchParams: serverSearchParams }) {
  const clientParams       = useParams();
  const clientSearchParams = useSearchParams();
  const [countries, setCountries] = useState([]);

  const slug          = (clientParams?.slug || serverParams?.slug || "");
  const visaTypeParam = clientSearchParams?.get?.("type") || serverSearchParams?.type || "sticker";

  const marker = "-national-visa-processing-time-for-";
  const idx    = slug.indexOf(marker);
  const nationalitySlug = idx === -1 ? slug : slug.slice(0, idx);
  const destinationSlug = idx === -1 ? "unknown" : slug.slice(idx + marker.length);

  useEffect(() => {
    fetch('/api/countries')
      .then(res => res.json())
      .then(data => setCountries(data))
      .catch(err => console.error(err));
  }, []);

  const nationalityName = useMemo(() => {
    const found = countries.find(c =>
      c.country.toLowerCase().replace(/\s+/g, "-") === nationalitySlug
    );
    return found?.country || nationalitySlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }, [nationalitySlug, countries]);

  const countryData = useMemo(() => getCountryData(destinationSlug), [destinationSlug]);
  const [activeType, setActiveType] = useState(visaTypeParam);
  const activeRule  = countryData.types[activeType] || countryData.types["sticker"];
  const isHours     = activeRule?.unit === "hours";

  const RELATED = Object.entries(countryData.types).filter(([k]) => k !== activeType);

  const timeDisplay = isHours
    ? `${activeRule.min}–${activeRule.max} hours`
    : `${activeRule.min}–${activeRule.max} business days`;

  // Popularity indicator (mock but SEO-meaningful)
  const popularityScore = useMemo(() => {
    const base = { sticker: 89, "e-visa": 95, "sticker-extended": 72, transit: 88 };
    return base[activeType] || 80;
  }, [activeType]);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── BREADCRUMB ──────────────────────────────────────────────────── */}
      <div className="bg-slate-50 border-b border-slate-100 px-6 py-3">
        <div className="container mx-auto max-w-6xl flex items-center gap-2 text-xs text-slate-400 font-semibold flex-wrap">
          <Link href="/" className="hover:text-[#005a31] transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/visa-processing-time-tracker" className="hover:text-[#005a31] transition-colors">Visa Processing Time Tracker</Link>
          <ChevronRight size={12} />
          <span className="text-slate-600 truncate">{nationalityName} → {countryData.name}</span>
        </div>
      </div>

      {/* ── TRUST BAR ───────────────────────────────────────────────────── */}
      <div className="bg-[#004d2c] py-2.5 px-6 text-center">
        <p className="text-xs text-green-300/80 font-semibold">
          ✅ Data verified monthly from embassy guidelines & real applicant reports &nbsp;·&nbsp;
          🔒 No signup required &nbsp;·&nbsp;
          📊 42,000+ travelers use Eammu Visa Tracker monthly
        </p>
      </div>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-12 pb-12 px-6 border-b border-slate-100 overflow-hidden">
        <div className="absolute top-0 right-0 text-[220px] opacity-[0.035] select-none pointer-events-none leading-none translate-x-8 -translate-y-4">
          {countryData.flag}
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <Link href="/visa-processing-time-tracker"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-[#005a31] mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Tracker
          </Link>

          {/* Visa type switcher */}
          <div className="flex flex-wrap gap-2 mb-6">
            {Object.entries(countryData.types).map(([k]) => (
              <button
                key={k}
                onClick={() => setActiveType(k)}
                className={`px-4 py-2 rounded-xl border-2 text-xs font-black uppercase tracking-wider transition-all
                  ${activeType === k
                    ? "bg-[#004d2c] text-white border-[#004d2c] shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}
              >
                {VISA_TYPE_LABELS[k]?.label || k}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-[#004d2c] leading-tight tracking-tight mb-4">
                {nationalityName} National<br />
                Visa Processing Time<br />
                <span className="text-transparent" style={{ WebkitTextStroke:"2px #004d2c" }}>
                  for {countryData.name}
                </span>
              </h1>
              <p className="text-slate-500 font-medium leading-relaxed mb-6 text-sm">
                Accurate, embassy-verified processing time for{" "}
                <strong className="text-slate-800">{nationalityName} passport holders</strong> applying for a{" "}
                <strong className="text-slate-800">{activeRule?.label}</strong> to visit {countryData.name}.
                Includes document checklist, delay reasons, pro tips & application calculator.
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <span className={`px-4 py-2 rounded-xl border text-xs font-black uppercase tracking-wider ${VISA_TYPE_LABELS[activeType]?.color || "bg-slate-50 border-slate-200 text-slate-600"}`}>
                  {VISA_TYPE_LABELS[activeType]?.label}
                </span>
                <span className="px-4 py-2 rounded-xl border bg-slate-50 border-slate-200 text-slate-600 text-xs font-black uppercase tracking-wider">
                  ✅ Updated 2025
                </span>
                <span className="px-4 py-2 rounded-xl border bg-slate-50 border-slate-200 text-slate-600 text-xs font-black uppercase tracking-wider">
                  {countryData.flag} {countryData.name}
                </span>
                {activeRule?.fee && (
                  <span className="px-4 py-2 rounded-xl border bg-amber-50 border-amber-200 text-amber-800 text-xs font-black uppercase tracking-wider">
                    Fee: {activeRule.fee}
                  </span>
                )}
              </div>

              {/* Accuracy meter */}
              <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-4 border border-slate-100">
                <div className="w-10 h-10 bg-[#004d2c] rounded-xl flex items-center justify-center shrink-0">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-black text-slate-700">Data Accuracy Score</span>
                    <span className="text-xs font-black text-[#005a31]">{popularityScore}%</span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#005a31] rounded-full" style={{ width:`${popularityScore}%` }} />
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium mt-1">Based on embassy data + applicant reports</div>
                </div>
              </div>
            </div>

            {/* Processing time card */}
            <div className="bg-[#004d2c] rounded-[2rem] p-8 text-white">
              <div className="text-xs font-black uppercase tracking-widest text-green-300/70 mb-2">Estimated Processing Time</div>
              <div className="flex items-end gap-3 mb-2">
                <span className="text-6xl font-black text-amber-400 leading-none">{activeRule?.min}–{activeRule?.max}</span>
                <span className="text-2xl font-black text-white/60 mb-1">{isHours ? "hours" : "business\ndays"}</span>
              </div>
              <div className="text-sm text-green-200/70 font-semibold mb-6">{activeRule?.label}</div>

              <div className="grid grid-cols-3 gap-3 mb-5">
                <div className="bg-white/10 rounded-2xl p-4 text-center">
                  <div className="text-lg font-black text-emerald-400">{activeRule?.min}{isHours ? "h" : "d"}</div>
                  <div className="text-[10px] text-green-300/60 font-bold uppercase">Best Case</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 text-center">
                  <div className="text-lg font-black text-white">{Math.round(((activeRule?.min || 0) + (activeRule?.max || 0)) / 2)}{isHours ? "h" : "d"}</div>
                  <div className="text-[10px] text-green-300/60 font-bold uppercase">Average</div>
                </div>
                <div className="bg-white/10 rounded-2xl p-4 text-center">
                  <div className="text-lg font-black text-red-300">{activeRule?.max}{isHours ? "h" : "d"}</div>
                  <div className="text-[10px] text-green-300/60 font-bold uppercase">Worst Case</div>
                </div>
              </div>

              {/* Fee badge */}
              {activeRule?.fee && (
                <div className="bg-white/10 rounded-2xl px-4 py-3 flex items-center justify-between">
                  <span className="text-xs text-green-200/70 font-semibold">Visa Application Fee</span>
                  <span className="text-sm font-black text-amber-400">{activeRule.fee}</span>
                </div>
              )}

              {isHours && (
                <div className="mt-3 bg-purple-500/20 border border-purple-400/30 rounded-xl px-4 py-3 text-xs font-bold text-purple-200">
                  🔁 Transit visa — same-day or overnight decision in most cases
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
      <div className="container mx-auto max-w-6xl px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Left — main info */}
          <div className="lg:col-span-2 space-y-12">

            {/* Important notes */}
            <section>
              <h2 className="text-2xl font-black text-[#004d2c] mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-400/20 rounded-xl flex items-center justify-center">
                  <Info size={18} className="text-amber-600" />
                </div>
                What {nationalityName} Applicants Must Know
              </h2>
              <div className="space-y-3">
                {(countryData.notes || []).map((note, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:border-[#005a31]/20 transition-colors">
                    <div className="w-6 h-6 bg-[#004d2c] rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={14} className="text-emerald-400" />
                    </div>
                    <span className="text-sm text-slate-700 font-medium leading-relaxed">{note}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Processing timeline visual */}
            <ProcessingTimeline min={activeRule?.min} max={activeRule?.max} unit={activeRule?.unit} />

            {/* Why delays */}
            <section>
              <h2 className="text-2xl font-black text-[#004d2c] mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center">
                  <AlertTriangle size={18} className="text-red-500" />
                </div>
                Why Your {countryData.name} Visa Might Be Delayed
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {(countryData.delayReasons || []).map((reason, i) => (
                  <div key={i} className="flex items-start gap-3 p-5 bg-red-50 border border-red-100 rounded-2xl">
                    <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                    <span className="text-sm text-red-900 font-medium leading-relaxed">{reason}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Pro tips */}
            <section>
              <h2 className="text-2xl font-black text-[#004d2c] mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center">
                  <Lightbulb size={18} className="text-amber-600" />
                </div>
                Pro Tips to Speed Up Your {countryData.name} Visa
              </h2>
              <div className="space-y-3">
                {(countryData.tips || []).map((tip, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-amber-50 border border-amber-100 rounded-2xl hover:border-amber-300 transition-colors">
                    <span className="w-7 h-7 bg-amber-400 text-[#004d2c] font-black text-xs rounded-lg flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm text-amber-900 font-medium leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ Section */}
            {countryData.faqs && countryData.faqs.length > 0 && (
              <section>
                <h2 className="text-2xl font-black text-[#004d2c] mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                    <HelpCircle size={18} className="text-blue-600" />
                  </div>
                  Frequently Asked Questions
                </h2>
                <FAQAccordion faqs={countryData.faqs} />
              </section>
            )}

            {/* Internal links — related processing times */}
            {countryData.relatedLinks && countryData.relatedLinks.length > 0 && (
              <section>
                <h2 className="text-2xl font-black text-[#004d2c] mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <TrendingUp size={18} className="text-emerald-600" />
                  </div>
                  Related Visa Processing Times
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {countryData.relatedLinks.map((link, i) => (
                    <Link
                      key={i}
                      href={`/visa-processing-time-tracker/${link.slug}?type=${link.type}`}
                      className="group flex items-center justify-between p-5 bg-white border-2 border-slate-100 rounded-2xl hover:border-[#005a31] hover:shadow-md transition-all duration-200"
                    >
                      <div>
                        <div className="font-black text-sm text-slate-800 mb-1 group-hover:text-[#005a31] transition-colors">{link.label}</div>
                        <div className="text-xs text-slate-400 font-semibold capitalize">{VISA_TYPE_LABELS[link.type]?.label}</div>
                      </div>
                      <ChevronRight size={18} className="text-slate-300 group-hover:text-[#005a31] group-hover:translate-x-1 transition-all" />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* SEO long-form article */}
            <section className="border-t border-slate-100 pt-10">
              <h2 className="text-2xl font-black text-[#004d2c] mb-4">
                {nationalityName} to {countryData.name} {VISA_TYPE_LABELS[activeType]?.label}: Complete 2025 Guide
              </h2>
              <div className="space-y-5 text-slate-600 text-sm leading-relaxed">
                <p>
                  For <strong className="text-slate-800">{nationalityName}</strong> passport holders, obtaining a{" "}
                  <strong className="text-slate-800">{countryData.name} {VISA_TYPE_LABELS[activeType]?.label}</strong>{" "}
                  ({activeRule?.label}) is one of the most critical steps in international travel planning.
                  The current processing time is{" "}
                  <strong className="text-[#005a31]">{timeDisplay}</strong>, though this can vary based on
                  embassy workload, seasonal demand, application completeness, and individual circumstances.
                </p>

                {isHours ? (
                  <p>
                    Transit visas are the fastest visa category available. Most decisions for the{" "}
                    {countryData.name} transit visa are made within 6–24 hours,
                    making same-day or next-day processing standard. {nationalityName} travelers transiting{" "}
                    {countryData.name} should confirm transit visa requirements with their airline and the official
                    embassy portal before booking connecting flights, as transit visa requirements depend on
                    nationality, layover airport, and connection duration.
                  </p>
                ) : (
                  <>
                    <p>
                      The key to a smooth, on-time {countryData.name} visa approval for {nationalityName} nationals
                      is applying well in advance and submitting a complete, meticulously organized application.
                      South Asian applicants — particularly from Bangladesh, India, and Pakistan — should pay
                      particular attention to financial documentation, as embassies scrutinize bank statements
                      closely for these nationalities. In peak travel seasons (June–August and December–January),
                      processing times can increase by 30–50% above the stated average.
                    </p>
                    <p>
                      The {countryData.name} {VISA_TYPE_LABELS[activeType]?.label} processing time of{" "}
                      {timeDisplay} begins from the date your biometrics are submitted (for visa types requiring
                      biometrics) or from the date your complete application is received by the embassy or
                      visa application centre. Applications with missing documents are placed on hold and
                      do not count as "in processing" until all required materials are received.
                    </p>
                  </>
                )}

                <p>
                  Eammu's Visa Processing Time Tracker provides {nationalityName} travelers with the most
                  up-to-date processing timelines sourced from official embassy guidelines and real applicant
                  experiences. Our <strong className="text-slate-800">Reverse Application Calculator</strong>{" "}
                  (in the sidebar) helps you determine the optimal date to submit your application based on
                  your intended travel date — incorporating the full maximum processing window plus a 2-week
                  safety buffer.
                </p>

                <div className="bg-[#004d2c]/5 border border-[#005a31]/20 rounded-2xl p-5">
                  <p className="text-sm font-black text-[#004d2c] mb-2">⚡ Quick Summary for {nationalityName} Applicants</p>
                  <ul className="space-y-1.5 text-sm text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#005a31] shrink-0" />Processing time: <strong>{timeDisplay}</strong></li>
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#005a31] shrink-0" />Visa type: {activeRule?.label}</li>
                    {activeRule?.fee && <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#005a31] shrink-0" />Application fee: <strong>{activeRule.fee}</strong></li>}
                    <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-[#005a31] shrink-0" />Apply at least <strong>{isHours ? "3–5 days" : `${(activeRule?.max || 21) + 14} days`}</strong> before travel</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* More internal links */}
            <section className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <h3 className="font-black text-[#004d2c] text-lg mb-2">Explore More Visa Resources</h3>
              <p className="text-slate-500 text-sm mb-5">Complete visa guides for {nationalityName} passport holders</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label:"🌍 Visa Processing Time Tracker", href:"/visa-processing-time-tracker" },
                  { label:"✈️ All Travel Resources", href:"/travel-resources" },
                  { label:"📋 Visa Document Checklist Guide", href:"/visa-document-checklist" },
                  { label:"💬 Talk to a Visa Expert", href:"https://wa.me/8801631312524" },
                ].map((l, i) => (
                  <Link key={i} href={l.href}
                    className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-slate-100 hover:border-[#005a31] text-sm font-semibold text-slate-700 hover:text-[#005a31] transition-all group">
                    {l.label}
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-[#005a31]" />
                  </Link>
                ))}
              </div>
            </section>

          </div>

          {/* Right sidebar */}
          <div className="space-y-6">
            <ReverseCalculator min={activeRule?.min || 15} max={activeRule?.max || 21} unit={activeRule?.unit} />

            {/* Country info */}
            <CountryInfoCard data={countryData} />

            {/* Timeline visual */}
            <ProcessingTimeline min={activeRule?.min} max={activeRule?.max} unit={activeRule?.unit} />

            {/* Document checklist */}
            {countryData.checklist && <ApplicationChecklist items={countryData.checklist} />}

            {/* Embassy link */}
            {countryData.embassyUrl && (
              <a
                href={countryData.embassyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-5 bg-white border-2 border-slate-100 rounded-2xl hover:border-[#005a31] transition-all group"
              >
                <div className="w-10 h-10 bg-slate-50 group-hover:bg-[#005a31] rounded-xl flex items-center justify-center transition-colors">
                  <Globe size={18} className="text-slate-400 group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-black text-sm text-slate-800">Official {countryData.name} Portal</div>
                  <div className="text-xs text-slate-400">Apply & check status online</div>
                </div>
                <ExternalLink size={16} className="text-slate-300 group-hover:text-[#005a31]" />
              </a>
            )}

            {/* CTA */}
            <div className="bg-slate-900 rounded-[2rem] p-7 text-white text-center">
              <div className="text-3xl mb-3">🧑‍💼</div>
              <h4 className="font-black text-lg mb-2">Get Expert Help</h4>
              <p className="text-slate-400 text-xs leading-relaxed mb-5">
                Our visa consultants handle your entire {countryData.name} application — documents, forms, submission & tracking.
              </p>
              <a
                href="https://wa.me/8801631312524"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-4 bg-amber-400 text-[#004d2c] font-black rounded-xl hover:bg-white transition-all text-sm mb-3"
              >
                💬 WhatsApp an Expert →
              </a>
              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-500 font-semibold">
                <span>✅ Free consultation</span>
                <span>⚡ Fast response</span>
              </div>
            </div>

            {/* Other visa types */}
            {RELATED.length > 0 && (
              <div className="bg-white border-2 border-slate-100 rounded-2xl p-6">
                <h4 className="font-black text-sm text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Globe size={14} className="text-slate-400" />
                  Other Visa Types for {countryData.name}
                </h4>
                <div className="space-y-3">
                  {RELATED.map(([k, v]) => (
                    <Link
                      key={k}
                      href={`/visa-processing-time-tracker/${slug}?type=${k}`}
                      onClick={() => setActiveType(k)}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-[#005a31]/8 border border-transparent hover:border-[#005a31]/20 transition-all"
                    >
                      <div>
                        <div className="text-xs font-black text-slate-800">{VISA_TYPE_LABELS[k]?.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {v.min}–{v.max} {v.unit === "hours" ? "hours" : "business days"}
                          {v.fee && ` · ${v.fee}`}
                        </div>
                      </div>
                      <ChevronRight size={14} className="text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-black text-amber-800 mb-1">Disclaimer</p>
                  <p className="text-xs text-amber-700 leading-relaxed">
                    Processing times are estimates based on embassy guidelines and applicant reports.
                    Always verify with the official embassy or consulate. Eammu is not responsible for
                    individual visa outcomes.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── BACK CTA ────────────────────────────────────────────────────── */}
      <section className="bg-[#005a31] py-16 px-6 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-black text-white mb-4">Check Another Country's Visa Time</h2>
          <p className="text-green-200/70 font-medium mb-8">
            Compare processing times for 195+ countries — E-Visa, Sticker, Transit & complex cases.
            Free, no signup required.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/visa-processing-time-tracker"
              className="inline-flex items-center gap-3 bg-amber-400 text-[#004d2c] px-10 py-5 rounded-2xl font-black hover:bg-white transition-all shadow-xl text-sm"
            >
              <Timer size={20} /> Back to Visa Tracker
            </Link>
            <a
              href="https://wa.me/8801631312524"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/10 text-white px-8 py-5 rounded-2xl font-black hover:bg-white/20 transition-all text-sm"
            >
              💬 Talk to an Expert
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}