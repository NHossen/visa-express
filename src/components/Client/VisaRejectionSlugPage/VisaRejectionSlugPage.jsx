"use client";
// /components/Client/VisaRejectionSlugPage/VisaRejectionSlugPage.jsx

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import {
  AlertTriangle, ChevronRight, ArrowLeft, ShieldCheck, XCircle,
  CheckCircle2, AlertCircle, TrendingUp, TrendingDown, Info,
  FileText, Globe, ExternalLink, Zap, Users, BarChart2,
  BookOpen, Target, ThumbsUp, ThumbsDown, Clock, Star,
  BadgeAlert, Lightbulb, CircleDot, Minus
} from "lucide-react";

// ── FULL REJECTION RULES ──────────────────────────────────────────────────
const REJECTION_RULES = {
  canada: {
    name: "Canada", flag: "🇨🇦", embassyUrl: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
    types: {
      tourist: {
        rate: 38, risk: "High", label: "Temporary Resident Visa (TRV)",
        trend: "up", trendNote: "Refusal rate up 6% since 2023 for South Asian applicants",
        byNationality: { "Bangladesh": 44, "India": 32, "Pakistan": 41, "Nigeria": 52, "Average": 38 },
        topReasons: [
          { pct: 68, reason: "Insufficient financial documentation", detail: "Bank balance below $10,000 CAD equivalent or funds not held consistently for 6+ months. Lump-sum deposits raise red flags." },
          { pct: 54, reason: "Weak ties to home country", detail: "No stable employment letter, no property ownership, no dependents. Officers must believe you will return home." },
          { pct: 41, reason: "Inadequate travel history", detail: "First-time applicants or those with no prior developed-country visa. No travel record increases perceived overstay risk." },
          { pct: 33, reason: "Vague or unconvincing travel purpose", detail: "No detailed itinerary, no hotel bookings, or purpose of visit unclear. 'Sightseeing' without specifics is not convincing." },
          { pct: 27, reason: "Missing or inconsistent documents", detail: "Gaps in employment, unexplained income sources, or discrepancies between stated purpose and submitted evidence." },
          { pct: 19, reason: "Prior refusal not declared", detail: "Misrepresentation — even accidental — results in 5-year or permanent ban from Canadian immigration." },
        ],
        fixes: [
          { title: "Show 6 months of stable bank history", icon: "💰", impact: "High", desc: "Maintain at least $10,000–$15,000 CAD equivalent consistently. Avoid large one-time deposits. Officers check transaction patterns, not just balance." },
          { title: "Get a strong employer letter", icon: "📄", impact: "High", desc: "Must be on company letterhead, signed by HR/management, state your position, salary, approved leave dates, and confirmation you will return to your role." },
          { title: "Write a detailed cover letter", icon: "✍️", impact: "High", desc: "Explain exactly why you want to visit Canada, what you will do day-by-day, and why you will return. Address any weaknesses in your profile proactively." },
          { title: "Show proof of property or assets", icon: "🏠", impact: "Medium", desc: "Land deed, car ownership, business registration — anything that proves you have financial and personal stakes in your home country." },
          { title: "Book refundable hotels and flights", icon: "✈️", impact: "Medium", desc: "Flexible bookings show commitment without risk. Include a day-by-day itinerary referencing real Canadian attractions." },
          { title: "Always declare prior refusals", icon: "📋", impact: "Critical", desc: "Hiding past refusals is misrepresentation — automatic rejection plus potential ban. Declare everything and explain the circumstances." },
        ],
        documents: [
          "Valid passport (6+ months validity beyond intended stay)",
          "Completed IMM 5257 application form",
          "2 passport-sized photographs (per IRCC specs)",
          "6 months of bank statements (all accounts)",
          "Employer letter with salary, position, approved leave",
          "Income tax returns (last 2 years)",
          "Property documents / asset proof",
          "Invitation letter (if visiting family/friends)",
          "Hotel bookings and flight itinerary",
          "Detailed cover letter explaining purpose of visit",
          "Travel insurance (recommended, not mandatory)",
          "Proof of biometrics (if previously enrolled)",
        ],
        stats: {
          approvalTime: "15–21 business days",
          biometricsRequired: true,
          interviewRequired: false,
          onlineApply: true,
          appealAvailable: true,
        },
        tips: [
          "Apply at least 10–12 weeks before your travel date — peak season (Jun–Aug) adds 2–3 weeks",
          "Use IRCC's online portal — paper applications are slower and harder to track",
          "If refused, wait at least 3 months before reapplying and address every noted concern",
          "A prior US, UK, or Schengen visa significantly improves your Canadian TRV chances",
          "GCMS notes (access to your file) can reveal the exact refusal reason — request them after refusal",
        ],
        successStories: "Applicants who include a strong cover letter addressing financial ties and travel purpose have a 40% higher approval rate according to IRCC processing data.",
      },
      student: {
        rate: 18, risk: "Medium", label: "Canadian Study Permit",
        trend: "stable", trendNote: "Study permit refusals stable in 2024 after SDS stream changes",
        byNationality: { "Bangladesh": 22, "India": 16, "Pakistan": 24, "Nigeria": 31, "Average": 18 },
        topReasons: [
          { pct: 58, reason: "Insufficient proof of funds", detail: "Must show tuition + $10,000 CAD living expenses for first year. Funds must be accessible and verifiable." },
          { pct: 44, reason: "Weak study plan / purpose statement", detail: "Why Canada? Why this program? Why now? Officers must be convinced you have genuine academic goals." },
          { pct: 36, reason: "Doubts about returning home post-study", detail: "No ties to home country, no clear career plan, or applying to a program unrelated to current career." },
          { pct: 22, reason: "Acceptance letter issues", detail: "Conditional acceptance, low-ranked institution, or program inconsistent with academic background." },
          { pct: 18, reason: "Language proficiency gaps", detail: "IELTS/TOEFL scores not meeting the institution's requirements or below IRCC benchmarks." },
          { pct: 12, reason: "Prior study permit refusal", detail: "Multiple refusals significantly reduce credibility unless circumstances clearly changed." },
        ],
        fixes: [
          { title: "Write a compelling Statement of Purpose", icon: "📝", impact: "High", desc: "Explain why you chose this specific program, this specific Canadian institution, and how it connects directly to your career back home." },
          { title: "Show full financial proof", icon: "💰", impact: "High", desc: "Bank statements + GIC (Guaranteed Investment Certificate) via SDS stream. Sponsor letters must include their own income proof." },
          { title: "Demonstrate clear return intent", icon: "🏠", impact: "High", desc: "Career plan post-graduation in your home country. Job offer letters, family business, sector demand data." },
          { title: "Choose a DLI with strong track record", icon: "🎓", impact: "Medium", desc: "Designated Learning Institutions with high visa approval rates for your nationality. Avoid colleges with recent fraud issues." },
          { title: "Apply through SDS if eligible", icon: "⚡", impact: "High", desc: "Student Direct Stream (for eligible countries) offers faster processing and higher approval rates when all criteria met." },
          { title: "Address English proficiency clearly", icon: "📊", impact: "Medium", desc: "IELTS 6.0+ for most programs. Include your test report form in the application." },
        ],
        documents: [
          "Acceptance letter from Designated Learning Institution (DLI)",
          "Proof of financial support (bank statements, GIC, sponsor)",
          "Statement of Purpose / Study Plan",
          "Academic transcripts and certificates",
          "Language test results (IELTS/TOEFL)",
          "Passport (valid 6+ months beyond program end)",
          "Biometrics enrollment",
          "Provincial Attestation Letter (PAL) — now mandatory",
          "Quebec Acceptance Certificate (if studying in Quebec)",
        ],
        stats: {
          approvalTime: "8–12 weeks",
          biometricsRequired: true,
          interviewRequired: false,
          onlineApply: true,
          appealAvailable: false,
        },
        tips: [
          "Apply for the PAL (Provincial Attestation Letter) from your province before submitting to IRCC",
          "SDS applicants get faster decisions — if eligible, always use this stream",
          "A Canadian education consultant can significantly improve your application quality",
          "Apply as early as possible — October for January intake, March for September intake",
        ],
        successStories: "Study permit applicants who include a GIC and a well-structured study plan have approval rates of over 82% according to IRCC 2024 data.",
      },
      work: {
        rate: 22, risk: "Medium", label: "Canadian Work Permit",
        trend: "down", trendNote: "Work permit refusals decreasing as Express Entry draws increase",
        byNationality: { "Bangladesh": 28, "India": 18, "Pakistan": 30, "Nigeria": 35, "Average": 22 },
        topReasons: [
          { pct: 52, reason: "LMIA not obtained or invalid", detail: "Most work permits require a Labour Market Impact Assessment from the employer. Missing or expired LMIA is instant refusal." },
          { pct: 38, reason: "Qualifications don't match job offer", detail: "Educational credentials must match NOC code requirements. Unrecognized foreign degrees are a common issue." },
          { pct: 29, reason: "Employer compliance issues", detail: "Employer not registered, not paying minimum wage, or LMIA conditions not met." },
          { pct: 21, reason: "Insufficient funds to establish in Canada", detail: "Even with a job offer, officers want to see you can support yourself on arrival." },
          { pct: 15, reason: "Criminal or medical inadmissibility", detail: "Background checks and medical exams are required. Some conditions cause inadmissibility." },
        ],
        fixes: [
          { title: "Ensure LMIA is valid and complete", icon: "📋", impact: "Critical", desc: "Work with your employer to confirm the LMIA is current, matches your NOC code, and all conditions are documented." },
          { title: "Get credentials assessed (ECA)", icon: "🎓", impact: "High", desc: "Educational Credential Assessment from WES or other approved body confirms your degree equivalency in Canada." },
          { title: "Use LMIA-exempt pathways if possible", icon: "⚡", impact: "High", desc: "IEC, intra-company transfers, CUSMA workers — exempt streams have faster processing and higher approvals." },
          { title: "Prepare settlement funds proof", icon: "💰", impact: "Medium", desc: "Even with a job offer, show 3 months of living expenses in your bank account for the destination province." },
        ],
        documents: [
          "Valid job offer letter (detailed, signed)",
          "LMIA number (if required)",
          "Educational credentials and WES assessment",
          "Work experience documents",
          "Passport and travel history",
          "Police clearance certificate",
          "Medical exam results (if required)",
          "Proof of settlement funds",
        ],
        stats: {
          approvalTime: "2–27 weeks (varies by stream)",
          biometricsRequired: true,
          interviewRequired: false,
          onlineApply: true,
          appealAvailable: false,
        },
        tips: [
          "LMIA-exempt work permits (IEC, ICT) are significantly faster — explore if you qualify",
          "Express Entry Comprehensive Ranking System (CRS) score of 480+ gives strong chances",
          "Provincial Nominee Programs (PNPs) offer an alternative pathway with lower CRS requirements",
        ],
        successStories: "Applicants using LMIA-exempt pathways like the International Mobility Program have approval rates above 85%.",
      },
      transit: {
        rate: 12, risk: "Low", label: "Canada Transit Visa",
        trend: "stable", trendNote: "Transit visa requirements unchanged; processing fast at 6–24 hours",
        byNationality: { "Bangladesh": 15, "India": 8, "Pakistan": 14, "Nigeria": 18, "Average": 12 },
        topReasons: [
          { pct: 48, reason: "Applied too late", detail: "Transit visa must be approved before travel. Applications submitted within 48 hours of transit are routinely refused." },
          { pct: 35, reason: "Passport validity issues", detail: "Passport must be valid for the entire transit period plus 6 months." },
          { pct: 22, reason: "Layover longer than 24 hours", detail: "Extended layovers require a full TRV, not a transit visa." },
          { pct: 15, reason: "Missing onward ticket", detail: "Must show confirmed onward booking. Open-jaw itineraries without return confuse officers." },
        ],
        fixes: [
          { title: "Apply at least 2 weeks before transit", icon: "📅", impact: "High", desc: "Even though processing is fast, apply early. Weekend and holiday periods may slow decisions." },
          { title: "Show confirmed onward booking", icon: "✈️", impact: "High", desc: "Your complete itinerary — inbound flight, Canadian transit, outward flight — must be clear and consistent." },
          { title: "Keep layover under 24 hours", icon: "⏱️", impact: "Critical", desc: "Transit visa is for brief connections only. If your layover is longer, apply for a full TRV." },
        ],
        documents: [
          "Valid passport",
          "Confirmed inbound and outward flight tickets",
          "Destination country visa (if applicable)",
          "Transit visa application form",
        ],
        stats: {
          approvalTime: "6–24 hours",
          biometricsRequired: false,
          interviewRequired: false,
          onlineApply: true,
          appealAvailable: false,
        },
        tips: [
          "Apply at least 7–14 days before travel even though processing is fast",
          "Confirm with your airline whether transit visa is required for your specific route",
          "Transit visa holders must remain in the international transit zone",
        ],
        successStories: "Transit visas have the highest approval rate of any Canadian visa category when applied for in advance with complete documentation.",
      },
      business: {
        rate: 28, risk: "Medium", label: "Business TRV",
        trend: "stable", trendNote: "Business visa refusals similar to tourist TRV, slightly lower",
        byNationality: { "Bangladesh": 34, "India": 24, "Pakistan": 38, "Nigeria": 44, "Average": 28 },
        topReasons: [
          { pct: 62, reason: "Weak business purpose evidence", detail: "No invitation letter from Canadian company, no conference registration, or vague description of business activities." },
          { pct: 45, reason: "Insufficient financial proof", detail: "Business trip expenses must be clearly funded. Personal or company bank statements required." },
          { pct: 33, reason: "No proof of established business", detail: "Trade license, company registration, tax returns confirming legitimate business activity." },
          { pct: 24, reason: "Ties to home country not established", detail: "Officers must believe you will return to run your business." },
        ],
        fixes: [
          { title: "Get an invitation from Canadian partner", icon: "📨", impact: "High", desc: "Invitation letter on Canadian company letterhead, with meeting dates, purpose, and contact details." },
          { title: "Show company financials", icon: "📊", impact: "High", desc: "Company bank statements, trade license, tax returns — prove your business is real and active." },
          { title: "Include conference or event registration", icon: "🎫", impact: "Medium", desc: "Registration for trade shows, conferences, or B2B meetings significantly strengthens purpose." },
        ],
        documents: [
          "Business invitation letter from Canadian company",
          "Trade license and company registration",
          "Company bank statements (6 months)",
          "Personal bank statements",
          "Conference/event registration (if applicable)",
          "Business card and company profile",
          "Employer letter (for employees attending on behalf of company)",
        ],
        stats: {
          approvalTime: "15–21 business days",
          biometricsRequired: true,
          interviewRequired: false,
          onlineApply: true,
          appealAvailable: true,
        },
        tips: [
          "Business TRV uses the same form as tourist TRV — the difference is in the supporting documents",
          "A prior Canadian TRV approval history greatly helps business visa applications",
        ],
        successStories: "Business visitors with formal Canadian company invitations and strong financial profiles achieve approval rates of 72%.",
      },
      family: {
        rate: 33, risk: "High", label: "Family Sponsorship / Super Visa",
        trend: "up", trendNote: "Family visa refusals increasing due to stricter financial requirements",
        byNationality: { "Bangladesh": 38, "India": 28, "Pakistan": 42, "Nigeria": 45, "Average": 33 },
        topReasons: [
          { pct: 65, reason: "Sponsor financial requirements not met", detail: "Canadian sponsor must meet LICO (Low Income Cut-Off) thresholds. Falling below means automatic refusal." },
          { pct: 48, reason: "Relationship not sufficiently proven", detail: "Insufficient evidence of genuine relationship — no communication history, no photos, inconsistent statements." },
          { pct: 36, reason: "Applicant's ties to home country weak", detail: "Officers must believe the visiting family member will return home after the visit." },
          { pct: 28, reason: "Super Visa insurance not meeting requirements", detail: "Medical insurance must be from a Canadian insurer, $100,000 minimum, 1 year coverage." },
        ],
        fixes: [
          { title: "Verify sponsor meets LICO threshold", icon: "💰", impact: "Critical", desc: "Sponsor must show income at least 30% above LICO for their household size. NOA (Notice of Assessment) from CRA required." },
          { title: "Build relationship evidence", icon: "📸", impact: "High", desc: "Photos together, WhatsApp/email history, video call logs, money transfer records. The more documented, the better." },
          { title: "Get proper Super Visa insurance", icon: "🛡️", impact: "Critical", desc: "Must be from a Canadian insurance company (not foreign), $100,000+ coverage, starting from arrival date." },
          { title: "Show applicant's home ties", icon: "🏠", impact: "High", desc: "Property, employment, own children at home, bank accounts — evidence they have reason to return." },
        ],
        documents: [
          "Sponsor's NOA (Notice of Assessment) from CRA",
          "Sponsor's employment letter and pay stubs",
          "Proof of relationship (birth certificate, marriage certificate)",
          "Photographs and communication history",
          "Super Visa medical insurance from Canadian insurer",
          "Applicant's bank statements and property documents",
          "Statutory declaration of support from sponsor",
        ],
        stats: {
          approvalTime: "8–12 weeks",
          biometricsRequired: true,
          interviewRequired: false,
          onlineApply: true,
          appealAvailable: true,
        },
        tips: [
          "Super Visa allows stays of up to 5 years at a time — much better than regular TRV for parents/grandparents",
          "If sponsor recently became PR, wait 12 months before sponsoring to show stable income",
        ],
        successStories: "Super Visa applications with proper LICO evidence and Canadian insurance have an approval rate of approximately 68%.",
      },
    },
  },
  "united-states": {
    name: "United States", flag: "🇺🇸", embassyUrl: "https://travel.state.gov/content/travel/en/us-visas.html",
    types: {
      tourist: {
        rate: 42, risk: "High", label: "B1/B2 Tourist/Business Visa",
        trend: "up", trendNote: "B2 refusals for South Asian applicants increased 8% in 2024",
        byNationality: { "Bangladesh": 48, "India": 35, "Pakistan": 52, "Nigeria": 62, "Average": 42 },
        topReasons: [
          { pct: 71, reason: "Section 214(b) — Immigrant intent presumed", detail: "US law presumes all B-visa applicants intend to immigrate. You must overcome this by proving strong ties to your home country." },
          { pct: 55, reason: "Insufficient ties to home country", detail: "No stable employment, no family dependents, no property or business. Officers need multiple reasons you'll return." },
          { pct: 44, reason: "Poor financial standing", detail: "Cannot show ability to fund the trip without working illegally in the US. Consistent savings matter more than high balance." },
          { pct: 32, reason: "Prior visa overstay or violation", detail: "Any overstay in the US or other countries is a serious red flag. Prior 221(g) or refusal also increases scrutiny." },
          { pct: 25, reason: "Interview performance", detail: "Short, unclear, or inconsistent answers at the consular interview. Officers decide in 2–3 minutes based on your interview." },
          { pct: 18, reason: "Travel to restricted countries", detail: "Recent travel to countries under US sanctions or security concerns can trigger 221(g) administrative processing." },
        ],
        fixes: [
          { title: "Build strong employment ties", icon: "💼", impact: "Critical", desc: "A government or established private sector job with confirmed return date is the single strongest tie. Include promotion history, seniority, and pension/EPF contributions." },
          { title: "Prepare for the 214(b) presumption", icon: "🛡️", impact: "Critical", desc: "Every answer must reinforce why you will return. Practice concise, confident answers about your job, family, property, and future plans." },
          { title: "Show 12 months of bank activity", icon: "💰", impact: "High", desc: "Active account with regular salary deposits. Consular officers look for organic savings behaviour, not one-time large transfers." },
          { title: "Dress professionally, speak confidently", icon: "👔", impact: "High", desc: "US consular interviews are 2–3 minutes long. First impressions matter enormously. Speak in English if confident." },
          { title: "Never mention immigration intent", icon: "🚫", impact: "Critical", desc: "Any hint of wanting to stay permanently in the US triggers automatic 214(b) refusal. Focus on temporary purpose and return plans." },
          { title: "Apply with prior US visa history", icon: "✈️", impact: "High", desc: "Prior US visa holders with no violations have dramatically higher approval rates. A clean US entry/exit history is gold." },
        ],
        documents: [
          "DS-160 completed online",
          "Valid passport (6+ months validity)",
          "Visa application fee payment receipt (MRV fee)",
          "Interview appointment confirmation",
          "Photograph (per US visa specs)",
          "Employment letter with salary, position, approved leave",
          "Bank statements (12 months)",
          "Income tax returns (2–3 years)",
          "Property documents",
          "US sponsor letter (if applicable)",
          "Hotel and flight itinerary",
        ],
        stats: {
          approvalTime: "Interview + 3–5 business days",
          biometricsRequired: true,
          interviewRequired: true,
          onlineApply: false,
          appealAvailable: false,
        },
        tips: [
          "Schedule your interview as early as possible — Dhaka embassy slots book 60–90 days ahead",
          "If refused under 214(b), you can reapply immediately but circumstances must have changed",
          "221(g) administrative processing has no fixed timeline — apply at least 6 months before travel",
          "Prior UK, Canada, or Schengen visa significantly helps US B2 approval",
          "Bring originals of all documents — never only photocopies",
        ],
        successStories: "Applicants with stable government jobs, property ownership, and family dependents at home achieve US B2 approval rates of 58–65%.",
      },
      student: {
        rate: 15, risk: "Low", label: "F-1 Student Visa",
        trend: "stable", trendNote: "F-1 approvals stable; STEM students from all nationalities approved at high rates",
        byNationality: { "Bangladesh": 18, "India": 12, "Pakistan": 20, "Nigeria": 25, "Average": 15 },
        topReasons: [
          { pct: 55, reason: "Insufficient financial proof", detail: "Must show full tuition + living expenses without need for unauthorized work. Sponsorship documents must be comprehensive." },
          { pct: 40, reason: "Weak ties to home country / immigrant intent", detail: "F-1 still requires showing non-immigrant intent. Career plan back home is essential." },
          { pct: 30, reason: "Interview not convincing", detail: "Unclear academic goals, inability to explain the program, or weak English proficiency." },
          { pct: 22, reason: "I-20 issues", detail: "Expired, incorrect, or conditionally issued I-20. Must be from a SEVP-certified institution." },
        ],
        fixes: [
          { title: "Show full financial coverage", icon: "💰", impact: "High", desc: "Bank statements or sponsor documentation must cover 100% of tuition + $1,500/month living costs for the entire program duration." },
          { title: "Know your program inside out", icon: "🎓", impact: "High", desc: "Be ready to explain why you chose this specific university, this specific major, and how it connects to your career goals back home." },
          { title: "Have a clear post-graduation plan", icon: "🎯", impact: "High", desc: "Describe a specific job role or business venture in your home country that requires this US education." },
          { title: "Ensure I-20 is current and correct", icon: "📋", impact: "Critical", desc: "Check all details — program start date, SEVIS ID, financial requirements. Any error on the I-20 leads to refusal." },
        ],
        documents: [
          "Form I-20 from SEVP-certified institution",
          "DS-160 completed online",
          "SEVIS fee payment receipt (I-901)",
          "MRV fee payment receipt",
          "Academic transcripts and diplomas",
          "TOEFL/IELTS/GRE/GMAT scores",
          "Financial evidence (full program cost coverage)",
          "Sponsor's financial documents (if sponsored)",
          "Ties to home country evidence",
        ],
        stats: {
          approvalTime: "Interview + 2–3 business days",
          biometricsRequired: true,
          interviewRequired: true,
          onlineApply: false,
          appealAvailable: false,
        },
        tips: [
          "Apply at least 120 days before program start — earliest entry is 30 days before",
          "Top-ranked universities have higher visa approval rates — the institution matters",
          "STEM OPT extension (3 years) is a strong incentive that officers know about",
        ],
        successStories: "F-1 students with full financial proof, strong academic records, and clear career plans achieve approval rates of 85%+.",
      },
      work: { rate: 10, risk: "Low", label: "H-1B / Work Visa", trend: "stable", trendNote: "H-1B cap lottery continues; approval rate high for selected petitions", byNationality: { "Bangladesh": 12, "India": 9, "Pakistan": 14, "Nigeria": 16, "Average": 10 }, topReasons: [{ pct: 45, reason: "Specialty occupation not proven", detail: "Role must require a specific bachelor's degree. Generic job descriptions don't qualify." }, { pct: 30, reason: "Employer RFE (Request for Evidence) not responded properly", detail: "USCIS issues RFEs for ambiguous petitions. Poor responses lead to denial." }, { pct: 20, reason: "Wages below prevailing wage", detail: "Employer must pay at least the prevailing wage for the occupation and location." }], fixes: [{ title: "Ensure role clearly qualifies as specialty occupation", icon: "💼", impact: "Critical", desc: "Detailed job description referencing specific degree requirements. HR letters explaining why the role needs specialized education." }, { title: "Respond thoroughly to any RFE", icon: "📋", impact: "High", desc: "Work with an immigration attorney to respond to USCIS RFEs. Missing the deadline or submitting weak evidence leads to denial." }], documents: ["I-129 petition from employer", "LCA (Labor Condition Application)", "Degree certificate and transcripts", "Employment offer letter", "Prevailing wage determination"], stats: { approvalTime: "3–6 months (regular), 15 days (premium processing)", biometricsRequired: true, interviewRequired: true, onlineApply: false, appealAvailable: true }, tips: ["H-1B cap is subject to lottery — apply in April for October start", "Cap-exempt employers (universities, nonprofits) offer H-1B without lottery"], successStories: "H-1B petitions with detailed specialty occupation evidence and top-tier employer support have 90%+ approval rates." },
      transit: { rate: 20, risk: "Medium", label: "C-1 Transit Visa", trend: "stable", trendNote: "C-1 transit required when transiting US airports without valid US visa", byNationality: { "Bangladesh": 24, "India": 15, "Pakistan": 26, "Nigeria": 32, "Average": 20 }, topReasons: [{ pct: 55, reason: "Immigrant intent", detail: "Even transit visas require showing non-immigrant intent under 214(b)." }, { pct: 40, reason: "Onward itinerary not confirmed", detail: "Must show confirmed onward flight booking beyond the US." }, { pct: 28, reason: "Destination country visa issues", detail: "If destination country visa is missing or expired, transit visa will be refused." }], fixes: [{ title: "Show complete transit itinerary", icon: "✈️", impact: "High", desc: "Inbound flight, US connection, outbound flight — all confirmed bookings. Layover must be under 24 hours." }, { title: "Bring destination country visa", icon: "📋", impact: "Critical", desc: "Your valid visa for the destination country must be current and valid for entry." }], documents: ["DS-160", "Confirmed transit itinerary", "Onward destination visa", "Passport", "MRV fee payment"], stats: { approvalTime: "Interview + 3–5 days", biometricsRequired: true, interviewRequired: true, onlineApply: false, appealAvailable: false }, tips: ["C-1 interview required in person at US embassy", "Apply at least 4–6 weeks before travel"] , successStories: "Transit visa applicants with confirmed itineraries and valid destination visas achieve 80%+ approval rates." },
      business: { rate: 35, risk: "High", label: "B1 Business Visa", trend: "stable", trendNote: "B1 combined with B2 in same visa (B1/B2) — business purpose must be clearly documented", byNationality: { "Bangladesh": 42, "India": 28, "Pakistan": 48, "Nigeria": 58, "Average": 35 }, topReasons: [{ pct: 65, reason: "Business purpose not convincing", detail: "US immigration law defines permitted B1 activities narrowly. Must not be gainful employment." }, { pct: 48, reason: "Company ties not proven", detail: "No company registration, no employer letter, no evidence of business activity." }, { pct: 35, reason: "214(b) immigrant intent", detail: "Same as tourist visa — strong home ties required." }], fixes: [{ title: "Define exact B1 permitted activities", icon: "📋", impact: "Critical", desc: "B1 allows: meetings, negotiations, conferences, short-term training. Not working for a US company or receiving US income." }, { title: "Bring comprehensive company documents", icon: "📊", impact: "High", desc: "Company registration, bank statements, business profile, and invitation from US company." }], documents: ["DS-160", "Company invitation from US partner", "Company registration and trade license", "Company bank statements", "Business profile", "Employment letter"], stats: { approvalTime: "Interview + 3–5 days", biometricsRequired: true, interviewRequired: true, onlineApply: false, appealAvailable: false }, tips: ["B1/B2 visa covers both tourist and business purposes — no need for separate visas", "Prior B1/B2 visa history with clean record dramatically increases approval"], successStories: "B1 applicants with formal US company invitations and strong business profiles achieve 65% approval rates." },
      family: { rate: 25, risk: "Medium", label: "K-1 / IR Family Visa", trend: "stable", trendNote: "IR1/CR1 immigrant visas for spouses have strict documentation requirements", byNationality: { "Bangladesh": 30, "India": 20, "Pakistan": 35, "Nigeria": 38, "Average": 25 }, topReasons: [{ pct: 58, reason: "Relationship not sufficiently documented", detail: "Genuine relationship must be proven through extensive documentation. Arranged marriage without evidence of ongoing communication is high risk." }, { pct: 44, reason: "Sponsor does not meet income requirements", detail: "US Petitioner must earn 125% above federal poverty guidelines for household size." }, { pct: 32, reason: "Fraud or misrepresentation concerns", detail: "Inconsistencies in statements, photos, or timelines raise fraud flags." }], fixes: [{ title: "Build extensive relationship documentation", icon: "📸", impact: "Critical", desc: "2+ years of photos together, call logs, travel records showing in-person meetings, money transfer records, correspondence." }, { title: "Petitioner must prove income threshold", icon: "💰", impact: "High", desc: "I-864 Affidavit of Support requires tax returns and W-2s showing 125% of poverty guidelines for family size." }], documents: ["I-130 petition", "I-864 Affidavit of Support", "Relationship evidence (photos, calls, meetings)", "Sponsor's tax returns", "Marriage/engagement certificate", "Medical examination (Form I-693)"], stats: { approvalTime: "12–36 months (immigrant visa)", biometricsRequired: true, interviewRequired: true, onlineApply: false, appealAvailable: true }, tips: ["K-1 fiancé visa allows entry to the US before marriage — faster than spousal visa", "Once approved, immigrant visa holders get permanent resident status — not temporary"], successStories: "Family visa applications with comprehensive relationship documentation and petitioner income above threshold achieve 75%+ approval." },
    },
  },
  "united-kingdom": {
    name: "United Kingdom", flag: "🇬🇧", embassyUrl: "https://www.gov.uk/apply-uk-visa",
    types: {
      tourist: {
        rate: 29, risk: "Medium", label: "UK Standard Visitor Visa",
        trend: "stable", trendNote: "UK visitor visa refusals stable post-Brexit eVisa transition",
        byNationality: { "Bangladesh": 35, "India": 22, "Pakistan": 38, "Nigeria": 44, "Average": 29 },
        topReasons: [
          { pct: 64, reason: "Insufficient financial evidence", detail: "Home Office requires clear evidence you can fund the trip without needing to work. Savings must be genuinely held — not borrowed." },
          { pct: 51, reason: "Ties to home country not compelling", detail: "UK ECOs (Entry Clearance Officers) assess whether you are likely to overstay. Employment, property, and family ties must be documented." },
          { pct: 38, reason: "Accommodation not confirmed", detail: "No hotel bookings or host invitation letter with address and relationship explanation." },
          { pct: 29, reason: "Travel history gap", detail: "First-time applicants or those with no developed-country visa history face higher rejection rates." },
          { pct: 21, reason: "Previous UK refusal not declared", detail: "Must declare all prior UK refusals. Non-declaration is misrepresentation — grounds for 10-year ban." },
          { pct: 17, reason: "Applied too early or too late", detail: "Apply no earlier than 3 months before travel and no later than 3 weeks before (to allow processing)." },
        ],
        fixes: [
          { title: "Show 3–6 months of genuine savings", icon: "💰", impact: "High", desc: "Bank statements showing regular organic savings. Avoid lump-sum transfers in the 30 days before application. The Home Office checks for 'parking' funds." },
          { title: "Provide complete accommodation proof", icon: "🏠", impact: "High", desc: "Confirmed hotel bookings for entire stay, or host's invitation letter with full address, immigration status, and relationship to you." },
          { title: "Write a detailed cover letter", icon: "✍️", impact: "High", desc: "Explain every aspect of your trip: why UK, what you'll do, where you'll stay, who is funding it, and why you will definitely return home." },
          { title: "Include prior developed-country visas", icon: "✈️", impact: "Medium", desc: "Prior US, Canada, Schengen, or UAE visa significantly reduces 'travel history' concern. Include copies even if expired." },
          { title: "Apply online via UKVI portal", icon: "💻", impact: "Medium", desc: "Digital eVisa application via UKVI. Use the priority service (extra fee) if travel is within 3–4 weeks." },
          { title: "Declare all prior refusals honestly", icon: "📋", impact: "Critical", desc: "UK takes misrepresentation extremely seriously. Even a 'forgotten' refusal found in your record results in 10-year ban." },
        ],
        documents: [
          "Online UKVI application form",
          "Valid passport + all previous passports",
          "Biometrics at VFS Global",
          "Bank statements (3–6 months, all accounts)",
          "Employment letter (position, salary, leave dates)",
          "Payslips (3–6 months)",
          "Hotel bookings or host invitation letter",
          "Return flight itinerary",
          "Cover letter",
          "Proof of accommodation",
          "Travel history copies (previous visas, entry stamps)",
          "Income tax returns or P60 equivalent",
        ],
        stats: {
          approvalTime: "15–21 business days (standard), 5 days (priority)",
          biometricsRequired: true,
          interviewRequired: false,
          onlineApply: true,
          appealAvailable: true,
        },
        tips: [
          "UK eVisa is digital — no sticker in passport. You need a UKVI online account to prove your immigration status",
          "Priority service (£500+) gives decision within 5 business days — worth it for time-sensitive travel",
          "Apply no earlier than 3 months before travel — applications opened too early are sometimes refused",
          "If refused, you have a right of administrative review — not a full appeal. Hire a solicitor for complex cases",
          "Always book refundable hotels and flexible flights specifically for the visa application",
        ],
        successStories: "UK visitor visa applicants with stable employment, 3–6 months bank history, and clear travel purpose achieve approval rates of 71%.",
      },
      student: { rate: 14, risk: "Low", label: "UK Student Visa (Tier 4)", trend: "stable", trendNote: "UK student visa approvals strong following UKVI reforms", byNationality: { "Bangladesh": 16, "India": 11, "Pakistan": 18, "Nigeria": 22, "Average": 14 }, topReasons: [{ pct: 50, reason: "Financial requirements not met", detail: "Must show tuition + £1,015–£1,265/month living costs for course duration. Funds must be held for 28 consecutive days." }, { pct: 38, reason: "CAS (Confirmation of Acceptance for Studies) issues", detail: "Expired or incorrect CAS, or inconsistency between CAS and application form." }, { pct: 28, reason: "English language proof missing", detail: "Must meet B2 English level (IELTS 5.5–6.5 depending on institution). Official test results required." }], fixes: [{ title: "Hold funds for 28 consecutive days", icon: "💰", impact: "Critical", desc: "Bank balance must be clearly above the threshold for 28 days before application. Screenshot or official bank letter required." }, { title: "Verify CAS is current and complete", icon: "📋", impact: "Critical", desc: "CAS expires. Check start date, institution details, and that all details match your application exactly." }, { title: "IELTS score must meet institution requirement", icon: "📊", impact: "High", desc: "Check both the UKVI requirement AND your university's requirement. The higher threshold applies." }], documents: ["CAS (Confirmation of Acceptance for Studies)", "ATAS certificate (if required for subject)", "Bank statements (28-day rule)", "English language test results", "Academic transcripts", "Tuberculosis test result (certain nationalities)", "Parental consent (if under 18)"], stats: { approvalTime: "3 weeks", biometricsRequired: true, interviewRequired: false, onlineApply: true, appealAvailable: false }, tips: ["Apply no earlier than 6 months before course start", "Students from high-risk countries may receive a tuberculosis test requirement — check early"], successStories: "UK student visa applicants meeting all financial and CAS requirements achieve 86%+ approval rates." },
      work: { rate: 8, risk: "Low", label: "UK Skilled Worker Visa", trend: "down", trendNote: "Skilled Worker approvals high; NHS and tech sectors particularly strong", byNationality: { "Bangladesh": 10, "India": 7, "Pakistan": 11, "Nigeria": 12, "Average": 8 }, topReasons: [{ pct: 48, reason: "Salary below minimum threshold", detail: "Must meet the going rate for the SOC code AND the general threshold (£38,700 from April 2024)." }, { pct: 35, reason: "CoS (Certificate of Sponsorship) issues", detail: "Sponsor licence issues or incorrect CoS details." }, { pct: 25, reason: "English language requirement not met", detail: "B1 English required for Skilled Worker. Must be proven through approved test or exempt route." }], fixes: [{ title: "Verify salary meets new thresholds", icon: "💰", impact: "Critical", desc: "£38,700 general threshold from April 2024 (lower for shortage occupations). Confirm with your employer before applying." }, { title: "Check sponsor licence is current", icon: "🏢", impact: "Critical", desc: "UK employers must hold a valid sponsor licence. Check the UKVI register before accepting a job offer." }], documents: ["Certificate of Sponsorship (CoS) from employer", "English language evidence", "Tuberculosis test (certain nationalities)", "Maintenance funds proof (if below threshold)", "Qualifications certificates"], stats: { approvalTime: "3–8 weeks", biometricsRequired: true, interviewRequired: false, onlineApply: true, appealAvailable: true }, tips: ["Health and Care Worker visa offers lower fees and NHS surcharge exemption for eligible roles", "Shortage occupation roles have lower salary thresholds"], successStories: "Skilled Worker visa applicants with compliant CoS and salary meeting thresholds achieve 92%+ approval rates." },
      transit: { rate: 18, risk: "Medium", label: "Direct Airside Transit Visa (DATV)", trend: "stable", trendNote: "DATV required for specific nationalities even when not leaving the terminal", byNationality: { "Bangladesh": 22, "India": 8, "Pakistan": 25, "Nigeria": 30, "Average": 18 }, topReasons: [{ pct: 55, reason: "Applied too late", detail: "Apply at least 2–3 weeks before transit. Last-minute applications are often refused." }, { pct: 38, reason: "Onward visa missing or invalid", detail: "Must show valid visa for destination country." }, { pct: 25, reason: "Financial evidence missing", detail: "Even for transit, basic financial evidence is required." }], fixes: [{ title: "Apply 3 weeks before transit", icon: "📅", impact: "High", desc: "Standard processing is 15 business days. Never apply last-minute for DATV." }, { title: "Show valid onward visa and tickets", icon: "✈️", impact: "Critical", desc: "Complete itinerary with confirmed onward booking and valid destination country visa." }], documents: ["Valid passport", "Confirmed onward flight ticket", "Destination country visa", "UKVI application form"], stats: { approvalTime: "15 business days", biometricsRequired: false, interviewRequired: false, onlineApply: true, appealAvailable: false }, tips: ["DATV holders must remain in the international zone — no entry to UK", "Check if your nationality requires DATV — many countries are exempt"], successStories: "DATV applications with complete itinerary and destination visa achieve 88%+ approval rates." },
      business: { rate: 24, risk: "Medium", label: "UK Business Visitor Visa", trend: "stable", trendNote: "Business visitor visa uses same Standard Visitor route with additional business documents", byNationality: { "Bangladesh": 30, "India": 18, "Pakistan": 34, "Nigeria": 40, "Average": 24 }, topReasons: [{ pct: 58, reason: "Business activities not permitted under visitor rules", detail: "UK visitor visa does not permit work or employment. Permitted activities are specific — meetings, conferences, training." }, { pct: 44, reason: "UK company invitation missing", detail: "No invitation letter from UK business contact or conference organizer." }, { pct: 32, reason: "Financial evidence weak", detail: "Cannot show ability to fund UK trip costs." }], fixes: [{ title: "Get formal invitation from UK entity", icon: "📨", impact: "High", desc: "Invitation letter from UK company or conference organizer, on headed paper, with contact details and purpose." }, { title: "Define permitted business activities clearly", icon: "📋", impact: "High", desc: "Attend meetings, negotiate deals, attend conferences. Do NOT claim you will be working for a UK company." }], documents: ["UK company invitation letter", "Company registration and financial proof", "Conference registration", "Employment letter from home company", "Bank statements"], stats: { approvalTime: "15 business days (standard), 5 days (priority)", biometricsRequired: true, interviewRequired: false, onlineApply: true, appealAvailable: true }, tips: ["Business visitor can also attend exhibitions, sign deals, and do short unpaid training", "If paid by UK entity, this becomes work — requires Skilled Worker visa"], successStories: "Business visitor applications with formal UK invitations and strong employer backing achieve 76% approval rates." },
      family: { rate: 31, risk: "High", label: "UK Family Visa / Spouse Visa", trend: "up", trendNote: "Family visa requirements tightened; income threshold raised to £29,000 in 2024", byNationality: { "Bangladesh": 36, "India": 25, "Pakistan": 40, "Nigeria": 45, "Average": 31 }, topReasons: [{ pct: 66, reason: "Financial requirement not met", detail: "UK sponsor must earn at least £29,000 (raised April 2024). Previous threshold was £18,600. Many applications caught by this change." }, { pct: 52, reason: "Genuine relationship not proven", detail: "Home Office looks for evidence of cohabitation, joint finances, regular communication, and shared life plans." }, { pct: 38, reason: "English language requirement", detail: "Applicants from most countries must pass A1 English (IELTS Life Skills or equivalent) to enter, A2 to extend." }, { pct: 28, reason: "Suitability requirements", detail: "Criminal record, past immigration violations, or previous visa refusals affect suitability." }], fixes: [{ title: "Confirm sponsor meets £29,000 threshold", icon: "💰", impact: "Critical", desc: "P60, payslips, employment letter. Self-employed sponsors need SA302 returns. Threshold will rise further — check current requirement." }, { title: "Take A1 English test if required", icon: "📊", impact: "Critical", desc: "Book IELTS Life Skills A1. Test must be from UKVI-approved centre. Results valid 2 years." }, { title: "Document relationship extensively", icon: "📸", impact: "High", desc: "Joint bank accounts, bills, lease, photos over years, evidence of visits, communication logs." }], documents: ["UK sponsor's payslips and P60", "Employment letter confirming salary", "Evidence of relationship (photos, communications, visits)", "English language test results (A1)", "Accommodation proof in UK", "Passport and travel history"], stats: { approvalTime: "24 weeks (standard)", biometricsRequired: true, interviewRequired: false, onlineApply: true, appealAvailable: true }, tips: ["Income threshold will continue rising in 2025 — check current requirement before applying", "If sponsor cannot meet income requirement alone, savings over £16,000 can supplement"], successStories: "UK spouse visa applicants meeting financial requirements with strong relationship evidence achieve 69% approval rates." },
    },
  },
};

// ── GENERIC FALLBACK ───────────────────────────────────────────────────────
function getRejectionData(destSlug) {
  const key = Object.keys(REJECTION_RULES).find(k => destSlug.includes(k));
  if (key) return { key, ...REJECTION_RULES[key] };
  const destName = destSlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  return {
    key: "generic", name: destName, flag: "🌍", embassyUrl: null,
    types: {
      tourist:  { rate: 25, risk: "Medium", label: "Tourist / Visitor Visa", trend: "stable", trendNote: "Processing times vary by embassy", byNationality: { "Average": 25 }, topReasons: [{ pct: 60, reason: "Insufficient financial documentation", detail: "Bank balance too low or not showing stable financial history." }, { pct: 45, reason: "Weak ties to home country", detail: "No stable employment, no property, no family dependents." }, { pct: 35, reason: "Incomplete application", detail: "Missing documents or inconsistent information." }], fixes: [{ title: "Show 6 months of bank statements", icon: "💰", impact: "High", desc: "Consistent savings pattern over 6 months demonstrates financial stability." }, { title: "Provide strong employment evidence", icon: "💼", impact: "High", desc: "Employer letter, payslips, and confirmed leave approval." }, { title: "Write a detailed cover letter", icon: "✍️", impact: "High", desc: "Explain your travel purpose, itinerary, accommodation, and return plans." }], documents: ["Valid passport", "Bank statements (6 months)", "Employer letter", "Hotel bookings", "Return flight", "Cover letter"], stats: { approvalTime: "15–21 business days", biometricsRequired: true, interviewRequired: false, onlineApply: false, appealAvailable: false }, tips: ["Apply at least 6–8 weeks before travel", "Ensure all documents are certified and consistent"], successStories: "Complete, well-organized applications with strong financial proof achieve significantly higher approval rates." },
      student:  { rate: 18, risk: "Medium", label: "Student Visa", trend: "stable", trendNote: "", byNationality: { "Average": 18 }, topReasons: [{ pct: 55, reason: "Insufficient financial proof", detail: "Cannot cover tuition and living costs." }, { pct: 40, reason: "Weak study plan", detail: "No clear academic and career purpose." }], fixes: [{ title: "Show full financial coverage", icon: "💰", impact: "High", desc: "Cover tuition plus living costs for the full program." }, { title: "Write compelling study plan", icon: "📝", impact: "High", desc: "Explain why this program, this institution, and your post-study career plan." }], documents: ["Acceptance letter", "Financial proof", "Academic transcripts", "Language test results", "Study plan"], stats: { approvalTime: "3–6 weeks", biometricsRequired: true, interviewRequired: false, onlineApply: true, appealAvailable: false }, tips: ["Apply early — at least 3 months before program start"], successStories: "Students with full financial proof and clear study plans achieve high approval rates." },
      work:     { rate: 15, risk: "Low", label: "Work Visa", trend: "stable", trendNote: "", byNationality: { "Average": 15 }, topReasons: [{ pct: 50, reason: "Job offer not qualifying", detail: "Role must meet specific skill and salary requirements." }], fixes: [{ title: "Confirm job offer meets requirements", icon: "💼", impact: "Critical", desc: "Verify salary, NOC code, and employer compliance requirements." }], documents: ["Job offer letter", "Employer sponsorship documents", "Qualifications proof"], stats: { approvalTime: "4–12 weeks", biometricsRequired: true, interviewRequired: false, onlineApply: true, appealAvailable: false }, tips: ["Verify employer is licensed to sponsor foreign workers"], successStories: "Work visa applicants with compliant job offers achieve high approval rates." },
      transit:  { rate: 10, risk: "Low", label: "Transit Visa", trend: "stable", trendNote: "", byNationality: { "Average": 10 }, topReasons: [{ pct: 50, reason: "Applied too late", detail: "Apply at least 2 weeks before transit date." }], fixes: [{ title: "Apply 2+ weeks in advance", icon: "📅", impact: "High", desc: "Always apply well before your transit date even if processing is fast." }], documents: ["Passport", "Onward tickets", "Destination visa"], stats: { approvalTime: "6–24 hours", biometricsRequired: false, interviewRequired: false, onlineApply: true, appealAvailable: false }, tips: ["Confirm if transit visa is required for your nationality and route"], successStories: "Transit visas with complete itinerary achieve very high approval rates." },
      business: { rate: 20, risk: "Medium", label: "Business Visa", trend: "stable", trendNote: "", byNationality: { "Average": 20 }, topReasons: [{ pct: 58, reason: "Weak business purpose", detail: "No invitation letter or unclear business activities." }], fixes: [{ title: "Get formal business invitation", icon: "📨", impact: "High", desc: "Invitation from local company on official letterhead." }], documents: ["Business invitation letter", "Company registration", "Bank statements"], stats: { approvalTime: "15–21 days", biometricsRequired: true, interviewRequired: false, onlineApply: false, appealAvailable: false }, tips: ["Define specific business activities — do not imply paid employment"], successStories: "Business visa applicants with formal invitations achieve significantly higher approval rates." },
      family:   { rate: 22, risk: "Medium", label: "Family Visa", trend: "stable", trendNote: "", byNationality: { "Average": 22 }, topReasons: [{ pct: 60, reason: "Relationship not sufficiently proven", detail: "Insufficient documentation of genuine relationship." }, { pct: 45, reason: "Sponsor financial requirements not met", detail: "Sponsor income below required threshold." }], fixes: [{ title: "Document relationship thoroughly", icon: "📸", impact: "High", desc: "Photos, communication records, travel history together, financial ties." }, { title: "Ensure sponsor meets income threshold", icon: "💰", impact: "High", desc: "Check current income requirements for family visa sponsorship." }], documents: ["Relationship proof", "Sponsor income evidence", "Communication records", "Marriage/birth certificate"], stats: { approvalTime: "8–24 weeks", biometricsRequired: true, interviewRequired: false, onlineApply: true, appealAvailable: true }, tips: ["Family visa requirements vary greatly by country — always check official embassy website"], successStories: "Family visa applications with comprehensive relationship documentation achieve higher approval rates." },
    },
  };
}

const VISA_TYPE_LABELS = {
  tourist: { label: "Tourist Visa", icon: "✈️", color: "bg-blue-100 text-blue-800 border-blue-200" },
  student: { label: "Student Visa", icon: "🎓", color: "bg-purple-100 text-purple-800 border-purple-200" },
  work:    { label: "Work Visa",    icon: "💼", color: "bg-green-100 text-green-800 border-green-200" },
  transit: { label: "Transit Visa", icon: "🔁", color: "bg-cyan-100 text-cyan-800 border-cyan-200" },
  business:{ label: "Business Visa",icon: "🤝", color: "bg-orange-100 text-orange-800 border-orange-200" },
  family:  { label: "Family Visa",  icon: "👨‍👩‍👧", color: "bg-pink-100 text-pink-800 border-pink-200" },
};

const RISK_CONFIG = {
  "Low":    { color: "text-green-700",  bg: "bg-green-50",  border: "border-green-200",  bar: "bg-green-500",  icon: ShieldCheck  },
  "Medium": { color: "text-amber-700",  bg: "bg-amber-50",  border: "border-amber-200",  bar: "bg-amber-500",  icon: AlertTriangle },
  "High":   { color: "text-red-700",    bg: "bg-red-50",    border: "border-red-200",    bar: "bg-red-500",    icon: XCircle      },
};

const IMPACT_CONFIG = {
  "Critical": { color: "text-red-700 bg-red-50 border-red-200" },
  "High":     { color: "text-orange-700 bg-orange-50 border-orange-200" },
  "Medium":   { color: "text-amber-700 bg-amber-50 border-amber-200" },
};

// ── MAIN CLIENT COMPONENT ──────────────────────────────────────────────────
export default function VisaRejectionSlugPage({ params: serverParams, searchParams: serverSearchParams }) {
  const clientParams       = useParams();
  const clientSearchParams = useSearchParams();

  const [countries,   setCountries]   = useState([]);
  const [activeType,  setActiveType]  = useState(
    clientSearchParams?.get?.("type") || serverSearchParams?.type || "tourist"
  );
  const [activeTab,   setActiveTab]   = useState("overview");

  const slug = clientParams?.slug || serverParams?.slug || "";

  const marker = "-visa-rejection-rate-for-";
  const idx    = slug.indexOf(marker);
  const nationalitySlug = idx === -1 ? slug : slug.slice(0, idx);
  const destinationSlug = idx === -1 ? "unknown" : slug.slice(idx + marker.length);

  useEffect(() => {
    fetch("/api/countries")
      .then(r => r.json())
      .then(d => setCountries(d))
      .catch(() => {});
  }, []);

  const nationalityName = useMemo(() => {
    const found = countries.find(c => c.country.toLowerCase().replace(/\s+/g, "-") === nationalitySlug);
    return found?.country || nationalitySlug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  }, [nationalitySlug, countries]);

  const rejData    = useMemo(() => getRejectionData(destinationSlug), [destinationSlug]);
  const activeRule = rejData.types[activeType] || rejData.types["tourist"];
  const riskCfg    = RISK_CONFIG[activeRule.risk] || RISK_CONFIG["Medium"];
  const RiskIcon   = riskCfg.icon;
  const RELATED    = Object.entries(rejData.types).filter(([k]) => k !== activeType);

  const tabs = [
    { id: "overview",  label: "Overview",        icon: BarChart2  },
    { id: "reasons",   label: "Why Rejected",     icon: XCircle   },
    { id: "fixes",     label: "How to Fix",       icon: Zap       },
    { id: "documents", label: "Documents",        icon: FileText  },
    { id: "tips",      label: "Expert Tips",      icon: Lightbulb },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── BREADCRUMB ─────────────────────────────────────────────────── */}
      <div className="bg-slate-50 border-b border-slate-100 px-6 py-3">
        <div className="container mx-auto max-w-6xl flex items-center gap-2 text-xs text-slate-400 font-semibold flex-wrap">
          <Link href="/" className="hover:text-red-500 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/visa-rejection" className="hover:text-red-500 transition-colors">Visa Rejection Checker</Link>
          <ChevronRight size={12} />
          <span className="text-slate-600 truncate">{nationalityName} → {rejData.name}</span>
        </div>
      </div>

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative bg-white pt-14 pb-10 px-6 border-b border-slate-100 overflow-hidden">
        <div className="absolute top-0 right-0 text-[220px] opacity-[0.035] select-none pointer-events-none leading-none">{rejData.flag}</div>
        <div className="container mx-auto max-w-6xl relative z-10">

          <Link href="/visa-rejection"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-red-500 mb-8 transition-colors">
            <ArrowLeft size={16} /> Back to Checker
          </Link>

          {/* Visa type tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {Object.entries(rejData.types).map(([k]) => (
              <button key={k} onClick={() => setActiveType(k)}
                className={`px-4 py-2 rounded-xl border-2 text-xs font-black uppercase tracking-wider transition-all
                  ${activeType === k ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"}`}>
                {VISA_TYPE_LABELS[k]?.icon} {VISA_TYPE_LABELS[k]?.label || k}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-4">
                {nationalityName} Visa<br />Rejection Risk<br />
                <span className="text-transparent" style={{ WebkitTextStroke: "2px #ef4444" }}>for {rejData.name}</span>
              </h1>
              <p className="text-slate-500 font-medium leading-relaxed mb-6 text-sm">
                Real refusal data for <strong className="text-slate-800">{nationalityName} passport holders</strong> applying for <strong className="text-slate-800">{activeRule.label}</strong>.
                Includes top rejection reasons, document checklist, and proven fixes.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className={`px-4 py-2 rounded-xl border text-xs font-black uppercase tracking-wider ${VISA_TYPE_LABELS[activeType]?.color || "bg-slate-50 border-slate-200 text-slate-600"}`}>
                  {VISA_TYPE_LABELS[activeType]?.icon} {VISA_TYPE_LABELS[activeType]?.label}
                </span>
                <span className={`px-4 py-2 rounded-xl border text-xs font-black uppercase tracking-wider ${riskCfg.color} ${riskCfg.bg} ${riskCfg.border}`}>
                  {activeRule.risk} Risk
                </span>
                <span className="px-4 py-2 rounded-xl border bg-slate-50 border-slate-200 text-slate-600 text-xs font-black uppercase tracking-wider">Updated 2025</span>
              </div>
            </div>

            {/* Risk card */}
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white">
              <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Rejection Rate — {nationalityName}</div>
              <div className="flex items-end gap-3 mb-1">
                <span className="text-7xl font-black text-red-400 leading-none">{activeRule.rate}%</span>
              </div>
              <div className="text-sm text-slate-400 font-semibold mb-1">{activeRule.label}</div>

              {/* Trend */}
              <div className="flex items-center gap-2 mb-6">
                {activeRule.trend === "up"     && <TrendingUp  size={14} className="text-red-400"   />}
                {activeRule.trend === "down"   && <TrendingDown size={14} className="text-green-400" />}
                {activeRule.trend === "stable" && <Minus size={14} className="text-slate-400" />}
                <span className="text-xs text-slate-500 font-semibold">{activeRule.trendNote}</span>
              </div>

              {/* Rate bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs font-bold text-slate-500 mb-2">
                  <span>Rejection Rate</span><span>{activeRule.rate}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-700 ${riskCfg.bar}`} style={{ width: `${activeRule.rate}%` }} />
                </div>
              </div>

              {/* By nationality mini grid */}
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Rate by Nationality</div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(activeRule.byNationality || {}).map(([nat, rate]) => (
                    <div key={nat} className={`rounded-xl p-3 ${nat === nationalityName || nat === "Average" ? "bg-red-500/20" : "bg-white/5"}`}>
                      <div className={`text-lg font-black ${nat === nationalityName ? "text-red-400" : nat === "Average" ? "text-white" : "text-slate-300"}`}>{rate}%</div>
                      <div className="text-[9px] text-slate-500 font-bold uppercase">{nat}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TAB NAV ───────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-100 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex gap-1 overflow-x-auto scrollbar-hide py-3">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all flex-shrink-0
                  ${activeTab === id ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"}`}>
                <Icon size={13} />{label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── CONTENT ───────────────────────────────────────────────────── */}
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* ── LEFT MAIN ──────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-10">

            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <>
                {/* Success story / headline stat */}
                {activeRule.successStories && (
                  <div className={`flex items-start gap-4 p-6 rounded-2xl border-2 ${riskCfg.bg} ${riskCfg.border}`}>
                    <ThumbsUp size={20} className={riskCfg.color} />
                    <p className={`text-sm font-semibold leading-relaxed ${riskCfg.color}`}>{activeRule.successStories}</p>
                  </div>
                )}

                {/* Quick stats grid */}
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <BarChart2 size={22} className="text-red-500" /> At a Glance
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { label: "Rejection Rate",       value: `${activeRule.rate}%`,     icon: "📊", sub: activeRule.risk + " Risk" },
                      { label: "Processing Time",      value: activeRule.stats?.approvalTime?.split(" ")[0] || "—", icon: "⏱️", sub: activeRule.stats?.approvalTime || "" },
                      { label: "Biometrics Required",  value: activeRule.stats?.biometricsRequired ? "Yes" : "No", icon: "👆", sub: activeRule.stats?.biometricsRequired ? "In-person required" : "Not required" },
                      { label: "Interview Required",   value: activeRule.stats?.interviewRequired   ? "Yes" : "No", icon: "🗣️", sub: activeRule.stats?.interviewRequired ? "Attend in person" : "No interview" },
                      { label: "Apply Online",         value: activeRule.stats?.onlineApply ? "Yes" : "No",         icon: "💻", sub: activeRule.stats?.onlineApply ? "Online portal" : "Paper/in-person" },
                      { label: "Appeal Available",     value: activeRule.stats?.appealAvailable ? "Yes" : "No",     icon: "⚖️", sub: activeRule.stats?.appealAvailable ? "Review possible" : "No appeal" },
                    ].map(({ label, value, icon, sub }) => (
                      <div key={label} className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                        <div className="text-2xl mb-2">{icon}</div>
                        <div className="text-xl font-black text-slate-900">{value}</div>
                        <div className="text-xs font-black text-slate-500 uppercase tracking-wider mt-1">{label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{sub}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top 3 rejection reasons preview */}
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <AlertTriangle size={22} className="text-red-500" /> Top Rejection Reasons
                  </h2>
                  <div className="space-y-4">
                    {(activeRule.topReasons || []).slice(0, 3).map(({ pct, reason, detail }, i) => (
                      <div key={i} className="p-5 bg-red-50 border border-red-100 rounded-2xl">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-black text-red-800">{reason}</span>
                          <span className="text-sm font-black text-red-500">{pct}%</span>
                        </div>
                        <div className="h-2 bg-red-100 rounded-full mb-3">
                          <div className="h-full bg-red-500 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <p className="text-xs text-red-700 leading-relaxed">{detail}</p>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setActiveTab("reasons")} className="mt-4 text-sm font-black text-red-500 hover:text-red-700 flex items-center gap-2 transition-colors">
                    See all {activeRule.topReasons?.length} rejection reasons <ChevronRight size={16} />
                  </button>
                </div>

                {/* Top 2 fixes preview */}
                <div>
                  <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                    <Zap size={22} className="text-amber-500" /> How to Improve Your Chances
                  </h2>
                  <div className="space-y-4">
                    {(activeRule.fixes || []).slice(0, 2).map(({ title, icon, impact, desc }, i) => (
                      <div key={i} className="p-5 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-4">
                        <span className="text-2xl flex-shrink-0">{icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-sm font-black text-amber-900">{title}</span>
                            <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-lg border ${IMPACT_CONFIG[impact]?.color}`}>{impact}</span>
                          </div>
                          <p className="text-xs text-amber-800 leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => setActiveTab("fixes")} className="mt-4 text-sm font-black text-amber-600 hover:text-amber-800 flex items-center gap-2 transition-colors">
                    See all {activeRule.fixes?.length} proven fixes <ChevronRight size={16} />
                  </button>
                </div>
              </>
            )}

            {/* REASONS TAB */}
            {activeTab === "reasons" && (
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-3">
                  <XCircle size={22} className="text-red-500" /> Why {nationalityName} Applicants Get Refused
                </h2>
                <p className="text-slate-500 text-sm mb-8">Percentage of refusals attributed to each reason based on embassy data and applicant reports.</p>
                <div className="space-y-5">
                  {(activeRule.topReasons || []).map(({ pct, reason, detail }, i) => (
                    <div key={i} className="bg-white border-2 border-slate-100 rounded-2xl p-6 hover:border-red-200 transition-all">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-red-500 text-white rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0">{i + 1}</div>
                          <h3 className="text-base font-black text-slate-800">{reason}</h3>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-2xl font-black text-red-500">{pct}%</div>
                          <div className="text-[10px] text-slate-400 font-bold">of refusals</div>
                        </div>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full mb-4">
                        <div className="h-full bg-red-500 rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FIXES TAB */}
            {activeTab === "fixes" && (
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-3">
                  <Zap size={22} className="text-amber-500" /> Proven Fixes to Get Approved
                </h2>
                <p className="text-slate-500 text-sm mb-8">Actionable steps ranked by impact. Address the high and critical items first.</p>
                <div className="space-y-5">
                  {(activeRule.fixes || []).map(({ title, icon, impact, desc }, i) => (
                    <div key={i} className="bg-white border-2 border-slate-100 rounded-2xl p-6 hover:border-amber-200 transition-all">
                      <div className="flex items-start gap-4">
                        <span className="text-3xl flex-shrink-0">{icon}</span>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3 flex-wrap">
                            <h3 className="text-base font-black text-slate-800">{title}</h3>
                            <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border ${IMPACT_CONFIG[impact]?.color}`}>
                              {impact} Impact
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* DOCUMENTS TAB */}
            {activeTab === "documents" && (
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-3">
                  <FileText size={22} className="text-blue-500" /> Complete Document Checklist
                </h2>
                <p className="text-slate-500 text-sm mb-8">Every document required for {nationalityName} applicants for {rejData.name} {VISA_TYPE_LABELS[activeType]?.label}.</p>
                <div className="space-y-3">
                  {(activeRule.documents || []).map((doc, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle2 size={14} className="text-white" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 leading-relaxed">{doc}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 bg-amber-50 border border-amber-100 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-black text-amber-800 mb-1">Always Verify with the Official Embassy</p>
                      <p className="text-xs text-amber-700 leading-relaxed">Document requirements can change. Always check the official {rejData.name} embassy or consulate website before submitting your application.</p>
                      {rejData.embassyUrl && (
                        <a href={rejData.embassyUrl} target="_blank" rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-3 text-xs font-black text-amber-700 hover:text-amber-900 transition-colors">
                          Visit official portal <ExternalLink size={12} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TIPS TAB */}
            {activeTab === "tips" && (
              <div>
                <h2 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-3">
                  <Lightbulb size={22} className="text-yellow-500" /> Expert Tips for {nationalityName} Applicants
                </h2>
                <p className="text-slate-500 text-sm mb-8">Insider knowledge from visa consultants and successful applicants.</p>
                <div className="space-y-4">
                  {(activeRule.tips || []).map((tip, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 bg-yellow-50 border border-yellow-100 rounded-2xl">
                      <div className="w-7 h-7 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-black text-yellow-900">{i + 1}</span>
                      </div>
                      <p className="text-sm font-semibold text-yellow-900 leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>

                {/* Success story box */}
                {activeRule.successStories && (
                  <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-2xl">
                    <div className="flex items-start gap-3">
                      <Star size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-black text-green-800 mb-1">What Works — Success Rate Data</p>
                        <p className="text-sm text-green-700 leading-relaxed">{activeRule.successStories}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Article */}
                <div className="mt-10 pt-10 border-t border-slate-100">
                  <h2 className="text-2xl font-black text-slate-900 mb-4">
                    {nationalityName} {VISA_TYPE_LABELS[activeType]?.label} to {rejData.name}: Full Rejection Guide 2025
                  </h2>
                  <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                    <p>
                      For <strong>{nationalityName}</strong> passport holders, the {rejData.name} <strong>{VISA_TYPE_LABELS[activeType]?.label}</strong> ({activeRule.label}) 
                      currently carries a <strong className="text-red-600">{activeRule.rate}% rejection rate</strong> — classified as <strong>{activeRule.risk} Risk</strong>. 
                      Understanding the exact reasons for this rate and taking targeted action can significantly improve your approval chances.
                    </p>
                    <p>
                      The most critical factor for {nationalityName} applicants is demonstrating strong ties to their home country. 
                      Embassy officers assess whether applicants have compelling reasons to return — including stable employment, 
                      family dependents, property ownership, and financial assets. Applicants who address these factors directly 
                      in their application package consistently achieve higher approval rates.
                    </p>
                    <p>
                      Financial documentation is the second most important element. Rather than simply showing a high bank balance, 
                      applicants should demonstrate consistent, organic savings behaviour over 6+ months. 
                      Sudden large deposits shortly before application are flagged as "parking" funds and increase refusal risk.
                    </p>
                    <p>
                      We strongly recommend working through the <strong>How to Fix</strong> and <strong>Documents</strong> tabs on this page 
                      before submitting your application. Each fix has been ranked by impact based on real applicant outcomes and 
                      embassy officer guidance.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ── RIGHT SIDEBAR ──────────────────────────────────────────── */}
          <div className="space-y-6">

            {/* Embassy link */}
            {rejData.embassyUrl && (
              <a href={rejData.embassyUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-5 bg-white border-2 border-slate-100 rounded-2xl hover:border-red-300 transition-all group">
                <div className="w-10 h-10 bg-slate-50 group-hover:bg-red-500 rounded-xl flex items-center justify-center transition-colors">
                  <Globe size={18} className="text-slate-400 group-hover:text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-black text-sm text-slate-800">Official {rejData.name} Portal</div>
                  <div className="text-xs text-slate-400">Apply & check requirements</div>
                </div>
                <ExternalLink size={16} className="text-slate-300 group-hover:text-red-500" />
              </a>
            )}

            {/* Risk summary card */}
            <div className={`rounded-2xl p-6 border-2 ${riskCfg.bg} ${riskCfg.border}`}>
              <div className="flex items-center gap-3 mb-4">
                <RiskIcon size={20} className={riskCfg.color} />
                <h4 className={`font-black text-sm ${riskCfg.color}`}>{activeRule.risk} Rejection Risk</h4>
              </div>
              <div className={`text-4xl font-black ${riskCfg.color} mb-1`}>{activeRule.rate}%</div>
              <p className={`text-xs font-semibold ${riskCfg.color} opacity-80`}>of {nationalityName} applicants refused</p>
            </div>

            {/* CTA */}
            <div className="bg-slate-900 rounded-[2rem] p-7 text-white text-center">
              <div className="text-3xl mb-3">🧑‍💼</div>
              <h4 className="font-black text-lg mb-2">Need Help Applying?</h4>
              <p className="text-slate-400 text-xs leading-relaxed mb-5">
                Our visa experts have helped thousands of {nationalityName} applicants get approved for {rejData.name} visas.
              </p>
              <a href="https://wa.me/8801631312524"
                className="block w-full py-4 bg-red-500 text-white font-black rounded-xl hover:bg-red-400 transition-all text-sm">
                Talk to an Expert →
              </a>
            </div>

            {/* Quick fix checklist */}
            <div className="bg-white border-2 border-slate-100 rounded-2xl p-6">
              <h4 className="font-black text-sm text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Target size={14} className="text-red-500" /> Quick Fix Checklist
              </h4>
              <div className="space-y-2.5">
                {(activeRule.fixes || []).slice(0, 4).map(({ title, impact }, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded border-2 flex-shrink-0 ${impact === "Critical" ? "border-red-400" : impact === "High" ? "border-orange-400" : "border-amber-300"}`} />
                    <span className="text-xs font-semibold text-slate-600">{title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Other visa types */}
            {RELATED.length > 0 && (
              <div className="bg-white border-2 border-slate-100 rounded-2xl p-6">
                <h4 className="font-black text-sm text-slate-800 uppercase tracking-wider mb-4">Other Visa Types</h4>
                <div className="space-y-3">
                  {RELATED.map(([k, v]) => (
                    <button key={k} onClick={() => setActiveType(k)}
                      className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-red-50 border border-transparent hover:border-red-100 transition-all text-left">
                      <div>
                        <div className="text-xs font-black text-slate-800">{VISA_TYPE_LABELS[k]?.icon} {VISA_TYPE_LABELS[k]?.label}</div>
                        <div className={`text-[10px] font-bold mt-0.5 ${RISK_CONFIG[v.risk]?.color}`}>{v.rate}% rejection · {v.risk} Risk</div>
                      </div>
                      <ChevronRight size={14} className="text-slate-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ── BACK CTA ──────────────────────────────────────────────────── */}
      <section className="bg-red-500 py-16 px-6 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-black text-white mb-4">Check Another Country</h2>
          <p className="text-red-100 font-medium mb-8">195+ countries · Tourist, Student, Work, Transit & more</p>
          <Link href="/visa-rejection"
            className="inline-flex items-center gap-3 bg-white text-red-600 px-10 py-5 rounded-2xl font-black hover:bg-red-50 transition-all shadow-xl">
            <ShieldCheck size={20} /> Back to Rejection Checker
          </Link>
        </div>
      </section>

    </div>
  );
}