"use client";
// /app/work-visa/[slug]/_client.jsx
// ─── Work Visa Detail Page (Nationality → Destination) ──────────────────
// Receives: params.slug  → "bangladesh-work-visa-for-canada"
// Parses slug into natSlug + destSlug
// Country name + flag come from /api/countries (MongoDB)
// All destination visa data is static (DESTINATIONS map, shared with main page)

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Briefcase, ChevronRight, ArrowLeft, Calendar, Clock,
  CheckCircle2, AlertCircle, AlertTriangle, Globe, ExternalLink,
  Star, Award, DollarSign, FileText, Users, Lightbulb,
  HelpCircle, ChevronDown, BarChart2, CheckSquare, XCircle,
  TrendingUp, ArrowRight, Shield, MapPin, Building2,
  GraduationCap, Timer, Zap, Phone, X, BadgeCheck,
} from "lucide-react";

// ── DESTINATIONS (identical static map as main page) ─────────────────────
const DESTINATIONS = {
  "canada": {
    name: "Canada", flag: "🇨🇦", currency: "CAD",
    visaName: "Canada Work Permit (LMIA / LMIA-Exempt)",
    avgSalary: "CAD $55,000–$95,000/yr",
    minSalary: "CAD $30,000",
    processingTime: "8–27 weeks",
    approvalRate: 78,
    difficulty: "Medium",
    languages: ["English", "French"],
    topIndustries: ["Technology", "Healthcare", "Construction", "Finance", "Agriculture"],
    topRoles: ["Software Engineer", "Registered Nurse", "Truck Driver", "Accountant", "Welder"],
    searches: "28.4K/mo",
    embassyUrl: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
    requirements: ["Valid LMIA or LMIA-exempt job offer", "Educational credential assessment (WES)", "Proof of work experience (2+ years)", "Language proof IELTS/CELPIP", "Clean criminal record", "Medical exam"],
    keyFact: "Canada processes over 400,000 work permits per year, with Express Entry as the primary skilled worker pathway.",
    overview: "Canada is one of the most welcoming destinations for skilled international workers. The country's points-based immigration system (Express Entry) and employer-driven LMIA route offer multiple pathways to live and work legally. Most provinces also run their own Provincial Nominee Programs (PNPs) which can fast-track permanent residency.",
    visaTypes: [
      { name: "LMIA-Based Work Permit", desc: "Employer obtains a Labour Market Impact Assessment proving no Canadian could fill the role. Most common route.", duration: "Up to 2 years (renewable)" },
      { name: "LMIA-Exempt (CUSMA/IEC)", desc: "For intra-company transferees, CUSMA professionals (US/Mexico), and International Experience Canada participants.", duration: "Varies" },
      { name: "Express Entry (PR pathway)", desc: "Points-based permanent residency system for Federal Skilled Workers, Canadian Experience Class, and Federal Skilled Trades.", duration: "Permanent" },
      { name: "Provincial Nominee Program", desc: "Province nominates a candidate for permanent residency based on local labour market needs.", duration: "Permanent" },
    ],
    timeline: [
      { phase: "Job Offer Secured",       when: "Start",           desc: "Employer applies for LMIA (8–12 weeks) or confirms LMIA-exempt category" },
      { phase: "Credential Assessment",   when: "Week 1–4",        desc: "Submit documents to WES for foreign credential recognition" },
      { phase: "Language Test",           when: "Week 2–6",        desc: "IELTS or CELPIP — minimum CLB 7 for most skilled worker categories" },
      { phase: "Work Permit Application", when: "Week 8–14",       desc: "Apply online via IRCC portal after LMIA is approved by employer" },
      { phase: "Biometrics",             when: "Week 10–16",      desc: "Visit a Visa Application Centre in your country for fingerprints and photo" },
      { phase: "Decision",               when: "Week 14–27",      desc: "Approval letter issued; Port of Entry (PoE) letter included" },
    ],
    faqs: [
      { q: "Can I bring my family to Canada on a work permit?", a: "Yes. Spouses/common-law partners of most work permit holders are eligible for an Open Work Permit, allowing them to work for any Canadian employer. Dependent children can study full-time at K-12 level without a separate study permit." },
      { q: "Does a Canadian work permit lead to permanent residency?", a: "Yes. Working in Canada builds Express Entry CRS points under the Canadian Experience Class. Most skilled workers qualify for PR after 12 months of full-time skilled employment. Provincial Nominee Programs (PNPs) also use work experience as a key criterion." },
      { q: "What is the LMIA and how long does it take?", a: "A Labour Market Impact Assessment (LMIA) is a document from Employment and Social Development Canada (ESDC) confirming that no Canadian citizen or permanent resident was available for the role. It typically takes 8–12 weeks, though the Global Talent Stream can process in 2 weeks for tech roles." },
      { q: "Is IELTS mandatory for a Canadian work permit?", a: "For LMIA-based permits, language tests are not always mandatory but are required for Express Entry and many PNP streams. IELTS Academic or General Training (CLB 7 = IELTS 6.0) is the minimum for most Federal Skilled Worker applications." },
    ],
    relatedDests: ["united-kingdom", "australia", "united-states", "germany"],
    costBreakdown: [
      { item: "Work Permit Application Fee", amount: "CAD $155" },
      { item: "Open Work Permit (spouse)",   amount: "CAD $155" },
      { item: "Biometrics Fee",              amount: "CAD $85" },
      { item: "WES Credential Assessment",   amount: "CAD $200–$300" },
      { item: "IELTS / CELPIP Test",         amount: "CAD $280–$310" },
      { item: "Medical Exam (Panel Physician)", amount: "CAD $200–$350" },
    ],
  },
  "united-states": {
    name: "United States", flag: "🇺🇸", currency: "USD",
    visaName: "H-1B Specialty Occupation / L-1 / O-1",
    avgSalary: "USD $70,000–$130,000/yr",
    minSalary: "USD $60,500 (prevailing wage)",
    processingTime: "3–6 months",
    approvalRate: 72,
    difficulty: "Hard",
    languages: ["English"],
    topIndustries: ["Technology", "Finance", "Healthcare", "Research", "Engineering"],
    topRoles: ["Software Engineer", "Data Scientist", "Financial Analyst", "Doctor", "Researcher"],
    searches: "44.1K/mo",
    embassyUrl: "https://travel.state.gov/content/travel/en/us-visas/employment.html",
    requirements: ["H-1B petition by employer (April lottery)", "Specialty occupation degree", "Prevailing wage compliance", "LCA (Labor Condition Application)", "Valid job offer from US employer", "Relevant degree in specific field"],
    keyFact: "The H-1B cap is 85,000 per year with a lottery system. STEM-OPT graduates from US universities are cap-exempt.",
    overview: "The United States offers several work visa categories for skilled professionals. The H-1B is the most common for specialty occupations but is subject to an annual lottery. L-1 transfers and O-1 extraordinary ability visas offer alternatives for qualifying candidates.",
    visaTypes: [
      { name: "H-1B Specialty Occupation", desc: "For university-degree professionals in specialty fields. Subject to 85,000 cap and annual April lottery.", duration: "3 years (renewable to 6+)" },
      { name: "L-1 Intracompany Transfer", desc: "For managers, executives, or specialized knowledge workers transferred from a foreign affiliate.", duration: "1–3 years" },
      { name: "O-1 Extraordinary Ability", desc: "For individuals with extraordinary ability in sciences, arts, business, or athletics.", duration: "Up to 3 years" },
      { name: "EB-2 / EB-3 (Green Card)", desc: "Employment-based permanent residency for advanced degree or skilled workers.", duration: "Permanent" },
    ],
    timeline: [
      { phase: "Employer Files LCA",        when: "October–March",  desc: "Employer files Labor Condition Application with Department of Labor" },
      { phase: "H-1B Registration (Lottery)", when: "March",        desc: "Employer pays $10 fee to enter USCIS lottery — selected in March/April" },
      { phase: "Petition Filed",            when: "April 1+",       desc: "If selected, employer files full H-1B petition with USCIS" },
      { phase: "Premium Processing",        when: "15 business days", desc: "Optional $2,805 fee for 15-day decision guarantee" },
      { phase: "Visa Stamping",             when: "Post-approval",  desc: "Attend visa interview at US Embassy/Consulate in your country" },
      { phase: "Start Date",               when: "October 1",      desc: "H-1B visa holders can begin employment on October 1 of the fiscal year" },
    ],
    faqs: [
      { q: "What happens if I lose the H-1B lottery?", a: "You can re-register in subsequent years, or explore cap-exempt institutions (universities, nonprofits, government research), L-1 transfers if you work for a multinational, or O-1 visas if you qualify for extraordinary ability." },
      { q: "Can I change employers on an H-1B?", a: "Yes. H-1B portability allows you to change employers while your new petition is pending, as long as you file before your current status expires and the new job is in a specialty occupation." },
      { q: "What is prevailing wage and why does it matter?", a: "The Department of Labor requires H-1B employers to pay at least the prevailing wage for the occupation in the area of employment. There are 4 wage levels — most H-1B workers are Level 1 or 2. Paying below prevailing wage is a common compliance issue." },
      { q: "Is there a path to a Green Card from H-1B?", a: "Yes. Most H-1B holders pursue EB-2 or EB-3 permanent residency. Your employer sponsors the PERM labor certification, then files I-140. Wait times vary enormously by nationality — Indian and Chinese nationals face multi-decade backlogs, while most other nationalities including Bangladeshis see 1–5 year timelines." },
    ],
    relatedDests: ["canada", "united-kingdom", "australia", "singapore"],
    costBreakdown: [
      { item: "H-1B Petition Filing Fee (I-129)", amount: "USD $730" },
      { item: "ACWIA Training Fee",              amount: "USD $750–$1,500" },
      { item: "Fraud Prevention Fee",            amount: "USD $500" },
      { item: "Premium Processing (optional)",   amount: "USD $2,805" },
      { item: "Visa Application Fee (MRV)",      amount: "USD $190" },
      { item: "SEVIS Fee (if applicable)",       amount: "USD $200" },
    ],
  },
  "united-kingdom": {
    name: "United Kingdom", flag: "🇬🇧", currency: "GBP",
    visaName: "UK Skilled Worker Visa",
    avgSalary: "GBP £35,000–£75,000/yr",
    minSalary: "GBP £38,700 (from April 2024)",
    processingTime: "3–8 weeks",
    approvalRate: 82,
    difficulty: "Medium",
    languages: ["English"],
    topIndustries: ["Healthcare (NHS)", "Technology", "Finance", "Education", "Engineering"],
    topRoles: ["Nurse", "Software Engineer", "Chef", "Teacher", "Civil Engineer"],
    searches: "19.8K/mo",
    embassyUrl: "https://www.gov.uk/skilled-worker-visa",
    requirements: ["Certificate of Sponsorship (CoS) from licensed employer", "Salary meeting £38,700 threshold", "English language proof (B1+)", "ATAS certificate (for certain subjects)", "Tuberculosis test (some nationalities)", "Valid passport"],
    keyFact: "The UK Skilled Worker Visa replaced Tier 2 in 2021. NHS healthcare workers get reduced fees and salary thresholds.",
    overview: "The UK Skilled Worker Visa is one of the most accessible skilled migration pathways in the world. If you have a job offer from a licensed UK sponsor and meet the salary threshold, approval rates are very high. The visa leads to Indefinite Leave to Remain (ILR) after 5 years.",
    visaTypes: [
      { name: "Skilled Worker Visa", desc: "Main route for skilled professionals with a UK job offer. SOC code and salary threshold must be met.", duration: "Up to 5 years (extendable)" },
      { name: "Health & Care Worker Visa", desc: "Dedicated route for doctors, nurses, and allied health professionals working for NHS or care providers. Reduced fees.", duration: "Up to 5 years" },
      { name: "Global Talent Visa", desc: "For leaders and potential leaders in academia, research, arts, culture, and digital technology. Endorsement required.", duration: "Up to 5 years" },
      { name: "Intra-Company Transfer (ICT)", desc: "For employees of multinational companies being transferred to a UK office.", duration: "Up to 5 years" },
    ],
    timeline: [
      { phase: "Job Offer & CoS",          when: "Week 1–2",  desc: "Employer assigns a Certificate of Sponsorship (CoS) with your personal details and job code" },
      { phase: "English Test",             when: "Week 1–4",  desc: "IELTS for UKVI, OET, or equivalent — minimum B1 on CEFR scale" },
      { phase: "TB Test (if required)",    when: "Week 2–5",  desc: "Bangladeshi nationals must complete a tuberculosis test at an approved clinic" },
      { phase: "Online Application",       when: "Week 3–6",  desc: "Apply on GOV.UK — pay visa fee and Immigration Health Surcharge (IHS)" },
      { phase: "Biometrics Appointment",   when: "Week 4–7",  desc: "Visit a UKVCAS service point for fingerprints and photo" },
      { phase: "Decision",                 when: "Week 5–8",  desc: "Standard: 3 weeks from biometrics. Priority: 5 working days. Super Priority: next working day" },
    ],
    faqs: [
      { q: "What is the Immigration Health Surcharge (IHS)?", a: "The IHS is a fee that gives Skilled Worker Visa holders full access to the NHS. As of 2024, it is £1,035 per year per person (£776 for children under 18). For a 3-year visa that's £3,105 — paid upfront with the application." },
      { q: "Can I switch to a Skilled Worker Visa from a student visa inside the UK?", a: "Yes, provided you have a valid job offer with a Certificate of Sponsorship and meet all requirements. You don't need to leave the UK to switch visa categories if your current leave hasn't expired." },
      { q: "What is the minimum salary for a UK Skilled Worker Visa?", a: "From April 2024, the general threshold is £38,700 per year. However, there are 'going rates' for each SOC occupation code — you must meet whichever is higher. Healthcare workers and new entrants under 26 have lower thresholds." },
      { q: "How long until I can get UK permanent residency (ILR)?", a: "You can apply for Indefinite Leave to Remain (ILR) after 5 continuous years on the Skilled Worker Visa, provided you haven't spent more than 180 days outside the UK in any 12-month period. After ILR, you can apply for British citizenship after 12 months." },
    ],
    relatedDests: ["canada", "australia", "germany", "netherlands"],
    costBreakdown: [
      { item: "Visa Application Fee (up to 3 yrs)", amount: "GBP £827" },
      { item: "Visa Application Fee (over 3 yrs)",  amount: "GBP £1,636" },
      { item: "Immigration Health Surcharge (IHS)", amount: "GBP £1,035/yr" },
      { item: "Priority Service (optional)",         amount: "GBP £500" },
      { item: "Super Priority (optional)",           amount: "GBP £1,000" },
      { item: "TB Test (Bangladeshi nationals)",     amount: "BDT ~৳8,000–12,000" },
    ],
  },
  "germany": {
    name: "Germany", flag: "🇩🇪", currency: "EUR",
    visaName: "Germany Skilled Worker Visa / EU Blue Card",
    avgSalary: "EUR €45,000–€85,000/yr",
    minSalary: "EUR €43,992 (Blue Card threshold)",
    processingTime: "1–3 months",
    approvalRate: 80,
    difficulty: "Medium",
    languages: ["German (B1+)", "English (some roles)"],
    topIndustries: ["Engineering", "Automotive", "IT", "Manufacturing", "Healthcare"],
    topRoles: ["Mechanical Engineer", "IT Specialist", "Nurse", "Electrician", "Researcher"],
    searches: "14.2K/mo",
    embassyUrl: "https://www.make-it-in-germany.com/en/visa-residence/types/skilled-worker",
    requirements: ["Recognized German or equivalent degree", "Job offer with qualifying salary", "German language proof (B1 for most roles)", "APS certificate (for some nationalities)", "Blocked account (if no job offer yet)", "Health insurance proof"],
    keyFact: "Germany's Skilled Immigration Act (2020) and 2023 update significantly expanded pathways for non-EU skilled workers.",
    overview: "Germany has one of the most welcoming skilled worker immigration policies in Europe following the 2023 Skilled Immigration Act update. The EU Blue Card offers a fast-track to permanent residency in 21–33 months. Germany also allows job-seeker visas to search for work in-country for up to 6 months.",
    visaTypes: [
      { name: "EU Blue Card", desc: "For university graduates with a job offer above €43,992/yr. Fast-track to permanent residence in 21–33 months.", duration: "Up to 4 years" },
      { name: "Skilled Worker Visa (Qualified)", desc: "For recognised qualifications with a job offer. Broader than Blue Card, covers vocational and academic qualifications.", duration: "Up to 4 years" },
      { name: "Job Seeker Visa", desc: "Search for qualified employment in Germany for up to 6 months. Must have recognised qualifications and proof of funds.", duration: "6 months" },
      { name: "IT Specialist Visa", desc: "No formal degree required — IT specialists with 3+ years experience and a salary offer can qualify.", duration: "Up to 4 years" },
    ],
    timeline: [
      { phase: "Degree Recognition",      when: "Week 1–8",   desc: "Submit to anabin database or apply via 'Make it in Germany' for formal recognition (Anerkennung)" },
      { phase: "APS Certificate",         when: "Week 2–10",  desc: "Bangladeshi applicants must obtain APS certificate from German Embassy Dhaka (4–8 weeks)" },
      { phase: "Language Test",           when: "Week 4–10",  desc: "Goethe Institut B1/B2 or TestDaF for German programs; IELTS for English-medium roles" },
      { phase: "Visa Application",        when: "Week 8–12",  desc: "Apply at German Embassy in Dhaka — book appointment early (long waiting times)" },
      { phase: "Embassy Interview",       when: "Week 10–14", desc: "In-person interview at German Embassy or Consulate" },
      { phase: "Visa + Travel",           when: "Week 12–16", desc: "Collect visa, travel to Germany, register address (Anmeldung), and apply for residence permit" },
    ],
    faqs: [
      { q: "What is the APS certificate and do I need it?", a: "The APS (Akademische Prüfstelle) certificate is an academic document authentication issued by the German Embassy in Dhaka. Bangladeshi applicants for German study and work visas typically need it for degree verification. The process costs approximately €150–200 and takes 4–8 weeks." },
      { q: "Do I need to speak German to work in Germany?", a: "For the EU Blue Card in STEM and IT fields, many positions accept English (especially in international companies). However, German B1 is required for most recognition procedures, healthcare roles, and everyday life. Learning German significantly improves your job prospects and integration." },
      { q: "How quickly can I get permanent residence in Germany?", a: "EU Blue Card holders with B1 German can apply for permanent residence (Niederlassungserlaubnis) after just 21 months. With B2 German it's 33 months. Standard Skilled Worker Visa holders qualify after 4 years." },
      { q: "Can I bring my family to Germany on a work visa?", a: "Yes. Spouses and children under 18 can join you in Germany. Spouses are generally entitled to an unrestricted work permit, not tied to a specific employer. Family reunification visa processing takes 4–12 weeks." },
    ],
    relatedDests: ["netherlands", "united-kingdom", "canada", "australia"],
    costBreakdown: [
      { item: "National Visa Fee (D-Visa)", amount: "EUR €75" },
      { item: "Residence Permit (in Germany)", amount: "EUR €100–€200" },
      { item: "APS Certificate",            amount: "EUR €150–€200" },
      { item: "German Language Test (Goethe)", amount: "EUR €150–€250" },
      { item: "Degree Recognition (Anerkennung)", amount: "EUR €100–€600" },
      { item: "Blocked Account Setup (if needed)", amount: "EUR €948/month blocked" },
    ],
  },
  "australia": {
    name: "Australia", flag: "🇦🇺", currency: "AUD",
    visaName: "Temporary Skill Shortage (TSS) 482 / Skilled Independent 189",
    avgSalary: "AUD $65,000–$110,000/yr",
    minSalary: "AUD $70,000 (TSMIT from July 2023)",
    processingTime: "2–6 months",
    approvalRate: 76,
    difficulty: "Medium",
    languages: ["English"],
    topIndustries: ["Healthcare", "Mining", "Construction", "IT", "Agriculture"],
    topRoles: ["Registered Nurse", "Civil Engineer", "IT Project Manager", "Electrician", "Chef"],
    searches: "16.7K/mo",
    embassyUrl: "https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/temporary-skill-shortage-482",
    requirements: ["Sponsorship from approved employer", "Occupation on MLTSSL or STSOL list", "Skills assessment from relevant authority", "English: IELTS 5.0+ (varies by role)", "Salary above TSMIT ($70,000 AUD)", "2 years relevant work experience"],
    keyFact: "Australia's Points of Interest Test for skilled migration awards points for age, education, work experience, and English proficiency.",
    overview: "Australia has a well-structured skills migration system combining employer-sponsored temporary visas (subclass 482) with points-tested permanent residency (subclass 189, 190, 491). The system is occupation-based — your role must appear on an official skilled occupation list.",
    visaTypes: [
      { name: "TSS 482 (Employer Sponsored)", desc: "Temporary Skill Shortage visa for 2–4 years. Employer must be approved sponsor. Most common short-term pathway.", duration: "2–4 years" },
      { name: "Skilled Independent 189", desc: "Points-tested permanent residency — no employer or state sponsor needed. Competitive cut-off scores.", duration: "Permanent" },
      { name: "Skilled Nominated 190", desc: "State or territory nominates you for permanent residency. 5 bonus points. More accessible than 189.", duration: "Permanent" },
      { name: "Employer Nomination Scheme (ENS 186)", desc: "Employer nominates you for permanent residency directly. Requires 3 years with same employer (TSS stream).", duration: "Permanent" },
    ],
    timeline: [
      { phase: "Skills Assessment",        when: "Week 1–12",  desc: "Submit to assessing authority (VETASSESS, Engineers Australia, AHPRA, etc.) — takes 4–12 weeks" },
      { phase: "English Test",             when: "Week 2–6",   desc: "IELTS General Training — minimum scores vary by visa subclass and occupation" },
      { phase: "EOI (SkillSelect)",        when: "Week 8–16",  desc: "Submit Expression of Interest — you are ranked by points and invited to apply when score is competitive" },
      { phase: "Employer Sponsorship",     when: "Parallel",   desc: "Employer applies for Standard Business Sponsorship (SBS) — takes 4–8 weeks" },
      { phase: "Visa Application",         when: "After invite", desc: "Apply within 60 days of invitation. Compile health, character, skills, and identity documents" },
      { phase: "Health & Character Checks", when: "After lodgement", desc: "Medical exam with a panel physician; police clearance from all countries lived in for 12+ months" },
    ],
    faqs: [
      { q: "What is TSMIT and how does it affect my work visa?", a: "The Temporary Skilled Migration Income Threshold (TSMIT) is the minimum salary required for TSS 482 visa holders. From July 2023, it is AUD $70,000 per year. Your offered salary must exceed TSMIT and the Annual Market Salary Rate (AMSR) for the role — whichever is higher." },
      { q: "How does the points test for Australian skilled migration work?", a: "Points are awarded for age (25–32 = 30 pts max), English (Superior = 20 pts), education (PhD = 20 pts), Australian study, work experience, partner skills, and state nomination. Most invitation rounds for popular occupations require 65–90 points. You can check your score on the Home Affairs points calculator." },
      { q: "Can I switch from a 482 visa to permanent residency?", a: "Yes. After working for your sponsoring employer for 3 years on a TSS 482, you may be eligible for the Employer Nomination Scheme (ENS 186). Some occupations on the MLTSSL are also eligible for direct PR nomination through Subclass 190 or 491." },
      { q: "Do Bangladeshi nationals need a skills assessment for all occupations?", a: "Yes for points-tested visas (189, 190, 491). For TSS 482, skills assessment depends on the occupation — some require it, others don't. AHPRA assessment is required for all healthcare professionals. Engineers Australia assesses engineering roles. Check the relevant assessing authority for your ANZSCO code." },
    ],
    relatedDests: ["canada", "united-kingdom", "new-zealand", "germany"],
    costBreakdown: [
      { item: "TSS 482 Visa Application Fee", amount: "AUD $3,115" },
      { item: "Skilled Visa (Subclass 189)",  amount: "AUD $4,770" },
      { item: "Skills Assessment Fee",        amount: "AUD $500–$1,500" },
      { item: "IELTS Test",                   amount: "AUD $385" },
      { item: "Medical Examination",          amount: "AUD $300–$500" },
      { item: "Police Clearance (Bangladesh)", amount: "BDT ~৳1,500" },
    ],
  },
  "united-arab-emirates": {
    name: "United Arab Emirates", flag: "🇦🇪", currency: "AED",
    visaName: "UAE Employment Visa / Golden Visa",
    avgSalary: "AED 120,000–250,000/yr",
    minSalary: "AED 48,000/yr (free zone varies)",
    processingTime: "2–6 weeks",
    approvalRate: 85,
    difficulty: "Easy",
    languages: ["English", "Arabic"],
    topIndustries: ["Construction", "Finance", "Oil & Gas", "Hospitality", "Technology"],
    topRoles: ["Civil Engineer", "Finance Manager", "Hotel Manager", "IT Specialist", "Sales Executive"],
    searches: "22.3K/mo",
    embassyUrl: "https://icp.gov.ae/en/residencypermits/employmentresidencyvisa/",
    requirements: ["Employment contract from UAE employer", "Entry permit (sponsored by employer)", "Medical fitness test in UAE", "Emirates ID registration", "Attestation of educational certificates", "Police clearance certificate"],
    keyFact: "The UAE Golden Visa offers 10-year residency for investors, executives, and talented individuals without employer sponsorship.",
    overview: "The UAE is the most accessible major work visa destination globally, with minimal paperwork and fast processing. No IELTS is required and the process is employer-driven. Tax-free salaries, world-class infrastructure, and a large Bangladeshi community make it the top destination for South Asian workers.",
    visaTypes: [
      { name: "Employment Residence Visa", desc: "Standard 2-year renewable work visa sponsored by UAE employer. Includes Emirates ID and health card.", duration: "2 years (renewable)" },
      { name: "Golden Visa (10-year)", desc: "Long-term residency for investors (AED 2M+), executives, doctors, engineers, artists, and top students.", duration: "10 years" },
      { name: "Green Visa (5-year)", desc: "Self-sponsored for skilled professionals earning AED 15,000+/month or freelancers. No employer dependency.", duration: "5 years" },
      { name: "Free Zone Employment Visa", desc: "Employer in a UAE Free Zone (DIFC, JAFZA, TECOM) sponsors the visa. Company operates under free zone rules.", duration: "2–3 years" },
    ],
    timeline: [
      { phase: "Employment Contract Signed", when: "Day 1",      desc: "Employer offers contract and initiates visa sponsorship with MOHRE / Free Zone authority" },
      { phase: "Entry Permit Issued",        when: "Week 1–2",   desc: "Employer applies for an Entry Permit — you can travel to UAE on this" },
      { phase: "Medical Fitness Test",       when: "Week 2–3",   desc: "Visit an approved DHA/HAAD medical centre in UAE for chest X-ray and blood tests" },
      { phase: "Emirates ID Application",    when: "Week 2–3",   desc: "Biometrics at an ICA or typing centre; Emirates ID issued within 5–7 working days" },
      { phase: "Residency Visa Stamped",     when: "Week 3–5",   desc: "2-year residency visa stamped in passport — you are now a legal UAE resident" },
      { phase: "Labour Card / MOHRE",        when: "Week 3–6",   desc: "Ministry of Human Resources and Emiratisation registers your employment contract" },
    ],
    faqs: [
      { q: "Is there income tax in the UAE?", a: "No. The UAE has zero personal income tax, making salaries effectively higher than equivalent roles in the UK, Australia, or Canada. A UAE salary of AED 15,000/month (~USD $4,100) is fully take-home. There is 5% VAT on goods and services, but no salary tax." },
      { q: "Can Bangladeshi workers bring their families to UAE?", a: "Yes. Once your residence visa is stamped, you can sponsor your spouse, children under 18 (sons up to 18, daughters until married), and parents. Minimum salary requirements apply: AED 4,000/month (with accommodation) or AED 3,000 + accommodation for family sponsorship." },
      { q: "What is Nitaqat and how does it affect my job offer?", a: "Nitaqat is a workforce nationalisation programme that classifies companies into bands (Platinum, Green, Yellow, Red) based on their proportion of Emirati employees. Companies in Platinum and Green bands can freely hire and sponsor foreign workers. Avoid job offers from Red band companies." },
      { q: "How does the UAE Golden Visa work for Bangladeshis?", a: "Bangladeshis can qualify for the 10-year UAE Golden Visa through: investment of AED 2 million+ in UAE real estate, being a doctor/engineer/scientist with a UAE salary of AED 30,000+/month, having PhD qualifications, or being ranked top in academic studies. The Golden Visa does not require an employer sponsor." },
    ],
    relatedDests: ["saudi-arabia", "singapore", "malaysia", "canada"],
    costBreakdown: [
      { item: "Employment Visa Medical Test", amount: "AED 250–350" },
      { item: "Emirates ID (2 years)",        amount: "AED 370" },
      { item: "Residency Visa Stamping",      amount: "AED 200–400" },
      { item: "Certificate Attestation (BD)", amount: "BDT ~৳5,000–10,000" },
      { item: "MOFA Attestation (UAE)",       amount: "AED 150 per document" },
      { item: "Medical Insurance (mandatory)", amount: "AED 700–2,000/yr" },
    ],
  },
  "singapore": {
    name: "Singapore", flag: "🇸🇬", currency: "SGD",
    visaName: "Singapore Employment Pass (EP) / S Pass",
    avgSalary: "SGD $72,000–$150,000/yr",
    minSalary: "SGD $5,000/month EP (from Sep 2023)",
    processingTime: "3–8 weeks",
    approvalRate: 74,
    difficulty: "Medium",
    languages: ["English"],
    topIndustries: ["Finance", "Technology", "Biomedical", "Logistics", "Manufacturing"],
    topRoles: ["Software Engineer", "Finance Manager", "Data Scientist", "Supply Chain Manager", "Biomedical Researcher"],
    searches: "9.4K/mo",
    embassyUrl: "https://www.mom.gov.sg/passes-and-permits/employment-pass",
    requirements: ["Job offer from Singapore-registered company", "Salary meeting EP/S Pass threshold", "Recognized degree or diploma", "COMPASS points scoring (for EP)", "No criminal record", "Employer submits application via myMOM portal"],
    keyFact: "Singapore's COMPASS (Complementarity Assessment Framework) scores EP applications on salary, qualifications, diversity, and support for local employment.",
    overview: "Singapore is Asia's premier financial and technology hub. The Employment Pass targets skilled professionals earning above SGD $5,000/month. The 2023 COMPASS framework added a points-based evaluation to EP applications, making the process more structured and merit-based.",
    visaTypes: [
      { name: "Employment Pass (EP)", desc: "For professionals, managers, and executives earning SGD $5,000+/month. COMPASS assessment required.", duration: "1–2 years (renewable)" },
      { name: "S Pass", desc: "For mid-skilled workers earning SGD $3,150+/month. Subject to company quota (10–15% of workforce).", duration: "2 years (renewable)" },
      { name: "EntrePass", desc: "For entrepreneurs starting or running a Singapore-registered business. Backed by innovation or funding.", duration: "1 year (renewable)" },
      { name: "Personalised Employment Pass (PEP)", desc: "For high earners (SGD $22,500+/month). Not tied to a specific employer — can change jobs freely.", duration: "3 years" },
    ],
    timeline: [
      { phase: "Employer Registers on myMOM", when: "Week 1",    desc: "Singapore-registered employer submits EP application on myMOM portal on your behalf" },
      { phase: "COMPASS Assessment",         when: "Week 1",    desc: "Automated points scoring across salary, qualifications, diversity, and local support criteria" },
      { phase: "Processing",                 when: "Week 1–3",  desc: "Ministry of Manpower (MOM) reviews application. Most straightforward cases decided in 3 weeks" },
      { phase: "In-Principle Approval (IPA)", when: "Week 3–5", desc: "IPA letter issued — you can travel to Singapore on this" },
      { phase: "Card Collection",            when: "Week 5–8",  desc: "Register fingerprints at MOM Services Centre; EP card mailed to employer" },
      { phase: "Work & Register",            when: "After arrival", desc: "Register with relevant professional bodies if required by occupation" },
    ],
    faqs: [
      { q: "What is COMPASS and how does it affect my EP application?", a: "COMPASS (Complementarity Assessment Framework) is Singapore's EP evaluation framework. Points are awarded across: Salary vs peers (0–20 pts), Qualifications (0–20 pts), Diversity of workforce (0–20 pts), and Local employment support (0–20 pts). Bonus points for skills in shortage. You need 40+ points to pass; <40 fails; 0–39 may be shortlisted for review." },
      { q: "Can I change jobs in Singapore on an Employment Pass?", a: "Yes, but your new employer must apply for a fresh EP before you start the new role. Your current EP is cancelled when the new one is approved. The Personalised Employment Pass (PEP) is the exception — it allows job changes without a new application." },
      { q: "What are the chances of EP approval for Bangladeshi applicants?", a: "Singapore approves applications on merit. Bangladeshi nationals have no specific disadvantage in the system. The key factors are salary (significantly above SGD $5,000), qualifications from a recognised university, and the employer's workforce diversity profile. Highly qualified candidates at multinational employers have strong approval odds." },
      { q: "Can my spouse work in Singapore on a Dependent Pass?", a: "EP holders earning SGD $6,000+/month can apply for a Dependent Pass for their spouse. EP holders earning SGD $6,000–$12,000 must apply separately for a Letter of Consent (LOC) for the spouse to work. Those earning SGD $12,000+ get automatic work authorisation for spouses on DP." },
    ],
    relatedDests: ["malaysia", "australia", "united-arab-emirates", "united-kingdom"],
    costBreakdown: [
      { item: "EP Application Fee",           amount: "SGD $105 (online)" },
      { item: "EP Issuance Fee",              amount: "SGD $225" },
      { item: "S Pass Application",           amount: "SGD $60 + $100 issuance" },
      { item: "Dependent Pass",               amount: "SGD $105 + $225 issuance" },
      { item: "Medical Insurance (mandatory)", amount: "SGD $300–$800/yr" },
      { item: "Professional Assessment Fees", amount: "Varies by body" },
    ],
  },
  "saudi-arabia": {
    name: "Saudi Arabia", flag: "🇸🇦", currency: "SAR",
    visaName: "Saudi Arabia Work Visa / Iqama",
    avgSalary: "SAR 60,000–140,000/yr",
    minSalary: "SAR 48,000/yr",
    processingTime: "4–12 weeks",
    approvalRate: 80,
    difficulty: "Medium",
    languages: ["Arabic", "English (corporate)"],
    topIndustries: ["Oil & Gas", "Construction", "Healthcare", "Education", "Vision 2030 Projects"],
    topRoles: ["Petroleum Engineer", "Doctor", "Construction Manager", "IT Specialist", "English Teacher"],
    searches: "11.6K/mo",
    embassyUrl: "https://visa.mofa.gov.sa/",
    requirements: ["Employment contract from Saudi employer", "Medical fitness certificate (MOH-approved)", "Attested educational certificates (MFA + Saudi Embassy)", "Clean criminal record", "Iqama registration within 90 days of arrival", "Nitaqat compliance by employer (green/platinum band)"],
    keyFact: "Saudi Vision 2030 has created over 1.2 million new jobs with quotas requiring 30–40% Saudi nationals across most sectors.",
    overview: "Saudi Arabia is the largest employer of Bangladeshi workers in the Gulf, with over 2.5 million Bangladeshis working in the Kingdom. The work visa process is employer-driven through the Muqeem system. Vision 2030 is opening major opportunities in construction, healthcare, tourism, and technology.",
    visaTypes: [
      { name: "Standard Work Visa", desc: "Employer-sponsored 2-year renewable residence visa (Iqama). Most common route for all professions.", duration: "2 years (renewable)" },
      { name: "Premium Residency (Iqama Mumayyaza)", desc: "10-year self-sponsored residency for investors and high-skilled professionals. SAR 800,000 fee.", duration: "10 years" },
      { name: "Freelance Visa", desc: "New initiative for independent professionals in creative, tech, and consulting fields under Vision 2030.", duration: "1 year" },
    ],
    timeline: [
      { phase: "Employment Contract",       when: "Day 1",       desc: "Employer creates contract, registers with MOHRE, and requests work visa quota from Saudi Ministry of Labor" },
      { phase: "Medical Certificate",       when: "Week 1–3",    desc: "Medical fitness test at a GAMCA (Gulf Approved Medical Centre Association) clinic in Dhaka" },
      { phase: "Document Attestation",      when: "Week 2–6",    desc: "Degree + certificates attested via Bangladesh MFA → Saudi Embassy in Dhaka" },
      { phase: "Visa Application",          when: "Week 4–8",    desc: "Employer submits visa request through Muqeem portal; visa stickered in your passport" },
      { phase: "Travel & Arrival",          when: "Week 8–12",   desc: "Travel to Saudi Arabia on the work visa. Employer registers you within 90 days of arrival" },
      { phase: "Iqama Issued",             when: "Week 10–14",  desc: "Residence permit (Iqama) issued — mandatory for all activities including banking, driving, healthcare" },
    ],
    faqs: [
      { q: "What is the Iqama and do all workers need it?", a: "The Iqama is a Saudi residence permit — every foreign worker must obtain one within 90 days of arrival. It functions as a national ID for expatriates, required for opening bank accounts, renting apartments, getting a SIM card, and accessing healthcare. Your employer is responsible for applying and paying for it." },
      { q: "Can a Bangladeshi worker change employers in Saudi Arabia?", a: "Yes — Saudi Arabia's 2021 labor reforms (Labour Reform Initiative) allow eligible workers to transfer jobs, exit the country, and return without employer consent, subject to having worked for 12 months and completing notice periods. This significantly reduced the historical dependency on kafala sponsorship." },
      { q: "What is GAMCA medical and where do I take it in Bangladesh?", a: "GAMCA (Gulf Approved Medical Centre Association) medical testing is mandatory before traveling to Saudi Arabia. You must visit an approved GCC medical centre in Dhaka (Mohakhali or others). Tests include chest X-ray, blood tests (HIV, hepatitis, etc.), and general fitness. A GAMCA slip is issued on the same day." },
      { q: "Are there any restrictions on Bangladeshi workers going to Saudi Arabia?", a: "The Bangladesh government has bilateral agreements with Saudi Arabia governing worker rights. All workers should ensure their employer is registered, contract is attested, and visa is obtained through official channels. Using illegal agents or unregistered employers is a criminal offense in both countries." },
    ],
    relatedDests: ["united-arab-emirates", "malaysia", "singapore", "qatar"],
    costBreakdown: [
      { item: "GAMCA Medical Test (Dhaka)", amount: "BDT ~৳4,000–6,000" },
      { item: "Attestation (MFA, Bangladesh)", amount: "BDT ~৳3,000" },
      { item: "Attestation (Saudi Embassy BD)", amount: "BDT ~৳5,000–8,000" },
      { item: "Visa Fee (paid by employer)", amount: "SAR 2,000–4,000" },
      { item: "Iqama Issuance (employer pays)", amount: "SAR 650/yr" },
      { item: "Medical Insurance",            amount: "Employer mandatory" },
    ],
  },
  "japan": {
    name: "Japan", flag: "🇯🇵", currency: "JPY",
    visaName: "Japan Work Visa / Highly Skilled Professional Visa",
    avgSalary: "JPY ¥3.5M–¥8M/yr",
    minSalary: "JPY ¥2,500,000/yr",
    processingTime: "4–12 weeks",
    approvalRate: 71,
    difficulty: "Hard",
    languages: ["Japanese (N3+ preferred)", "English (tech roles)"],
    topIndustries: ["Technology", "Manufacturing", "Education", "Research", "Engineering"],
    topRoles: ["Software Engineer", "English Teacher (ALT)", "Researcher", "Engineer", "IT Specialist"],
    searches: "7.8K/mo",
    embassyUrl: "https://www.mofa.go.jp/j_info/visit/visa/long/visa6.html",
    requirements: ["Certificate of Eligibility (CoE) from Japanese employer", "Bachelor's degree minimum", "Relevant work experience", "Japanese language (N3+ for most roles)", "Health certificate", "Criminal record clearance"],
    keyFact: "Japan's Highly Skilled Professional (HSP) visa uses a points-based system awarding permanent residence in just 1–3 years.",
    overview: "Japan is actively recruiting skilled foreign workers to address a demographic-driven labor shortage. The government's Specified Skilled Worker program and Highly Skilled Professional visa offer increasing opportunities, though Japanese language ability remains important for most roles outside of IT.",
    visaTypes: [
      { name: "Engineer / Specialist in Humanities", desc: "Most common category for engineers, IT workers, and humanities professionals with a university degree.", duration: "1–5 years (renewable)" },
      { name: "Specified Skilled Worker (SSW1)", desc: "For workers in 14 specified industries (construction, care, food service). Requires skills test and language test.", duration: "Up to 5 years total" },
      { name: "Highly Skilled Professional (HSP)", desc: "Points-based visa. 70 points = 3-year PR path; 80 points = 1-year PR path. Very favourable conditions.", duration: "Up to 5 years" },
      { name: "Instructor (ALT)", desc: "Assistant Language Teacher programme for English teachers placed in Japanese public schools.", duration: "1 year (renewable)" },
    ],
    timeline: [
      { phase: "CoE Application by Employer", when: "Week 1–8",   desc: "Japanese employer applies to Immigration Services Agency for Certificate of Eligibility (CoE)" },
      { phase: "CoE Received",               when: "Week 8–12",  desc: "CoE mailed to employer; forwarded to you in Bangladesh" },
      { phase: "Visa Application",           when: "Week 10–13", desc: "Apply at Japan Embassy in Dhaka with CoE, passport, and supporting documents" },
      { phase: "Visa Issued",               when: "Week 12–14", desc: "Single/multiple entry visa stamped — usually issued within 5 business days of application" },
      { phase: "Travel to Japan",            when: "Week 14+",   desc: "Enter Japan on work visa; residence card (Zairyu Card) issued at airport" },
      { phase: "Residence Registration",     when: "Within 14 days", desc: "Register at local municipal office (City Hall) with Zairyu Card" },
    ],
    faqs: [
      { q: "Do I need to speak Japanese to work in Japan?", a: "For most roles outside of IT and research at international companies, Japanese ability (at least N3 on JLPT) is expected. English teacher roles require no Japanese but daily life will be challenging without it. The government's SSW programme requires passing a Japanese language test at a specific level for each sector." },
      { q: "What is the Highly Skilled Professional (HSP) visa points system?", a: "HSP points are awarded for: academic background (up to 30 pts), work experience (up to 15 pts), annual salary (up to 40 pts), age (up to 15 pts), and bonuses for Japanese language ability, Japanese study, and work at a designated growth company. 70 points = 3-year permanent residence path. 80 points = just 1 year." },
      { q: "Can Bangladeshi nationals get a Japan work visa without knowing Japanese?", a: "Yes, primarily through IT/engineering roles at international companies and research positions. The Highly Skilled Professional visa also has pathways for English-medium academic and business professionals. However, daily life, administrative tasks, and social integration will be significantly harder without at least basic Japanese." },
      { q: "How long does a Japanese work visa last and can it be renewed?", a: "Work visa periods are 3 months, 6 months, 1 year, 3 years, or 5 years depending on the employer evaluation and visa category. You can renew indefinitely as long as you remain employed in the qualifying role. After 10 years continuous residence (or 1–3 years on HSP), you may apply for permanent residence." },
    ],
    relatedDests: ["south-korea", "singapore", "canada", "australia"],
    costBreakdown: [
      { item: "Japan Visa Application Fee",  amount: "JPY ¥3,000 (single entry)" },
      { item: "Multiple Entry Visa",         amount: "JPY ¥6,000" },
      { item: "CoE Application (employer pays)", amount: "No fee" },
      { item: "JLPT Language Test (optional)", amount: "JPY ¥5,500–¥6,500" },
      { item: "Degree Translation/Notarisation", amount: "BDT ~৳3,000–5,000" },
      { item: "Residence Card (in Japan)",   amount: "No fee" },
    ],
  },
  "malaysia": {
    name: "Malaysia", flag: "🇲🇾", currency: "MYR",
    visaName: "Malaysia Employment Pass / Professional Visit Pass",
    avgSalary: "MYR 48,000–120,000/yr",
    minSalary: "MYR 36,000/yr (Category I)",
    processingTime: "4–8 weeks",
    approvalRate: 79,
    difficulty: "Easy",
    languages: ["English", "Malay"],
    topIndustries: ["Manufacturing", "Technology", "Finance", "Oil & Gas", "Education"],
    topRoles: ["Engineer", "IT Professional", "Finance Manager", "Lecturer", "Operations Manager"],
    searches: "6.2K/mo",
    embassyUrl: "https://esd.imi.gov.my/",
    requirements: ["Employment contract from Malaysian company", "Employer must prove local recruitment attempt", "Degree certificate (attested)", "Minimum salary MYR 3,000/month (Cat I)", "Company must be registered with SSM", "Health screening"],
    keyFact: "Malaysia's Employment Pass has 3 categories: Cat I (>MYR 10K/month), Cat II (MYR 5K–10K), Cat III (MYR 3K–5K).",
    overview: "Malaysia is one of the most accessible and affordable destinations for South Asian professionals in Southeast Asia. The Employment Pass system is tiered by salary, with the highest category offering the smoothest path to long-term residence. Malaysia also has a large Bangladeshi expatriate community.",
    visaTypes: [
      { name: "Employment Pass Category I",   desc: "For professionals earning MYR 10,000+/month. 5-year pass renewable. Most flexible category.", duration: "Up to 5 years" },
      { name: "Employment Pass Category II",  desc: "For professionals earning MYR 5,000–10,000/month. 2-year pass, renewable twice.", duration: "Up to 2 years" },
      { name: "Employment Pass Category III", desc: "For professionals earning MYR 3,000–5,000/month. 1-year pass, renewable up to 10 years.", duration: "1 year" },
      { name: "Professional Visit Pass (PVP)", desc: "For short-term skilled assignments. No need for Employment Pass. Maximum 12 months.", duration: "Up to 12 months" },
    ],
    timeline: [
      { phase: "Employer Submits via ESD",   when: "Week 1",    desc: "Employer applies via Expatriate Services Division (ESD) portal with all supporting documents" },
      { phase: "ESD Review",                 when: "Week 1–3",  desc: "Immigration Department verifies employer status, job vacancy, and candidate qualifications" },
      { phase: "Approval Letter",            when: "Week 3–5",  desc: "Approval letter issued to employer and candidate" },
      { phase: "Visa Application (Embassy)", when: "Week 5–7",  desc: "Apply for single-entry visa at Malaysian Embassy/Consulate in Dhaka if required" },
      { phase: "Travel to Malaysia",         when: "Week 7+",   desc: "Enter Malaysia; employer escorts you to complete Employment Pass endorsement in passport" },
      { phase: "Pass Endorsed",              when: "After arrival", desc: "Immigration stamps Employment Pass in passport; valid from endorsement date" },
    ],
    faqs: [
      { q: "Can Bangladeshi workers get Malaysian Employment Pass easily?", a: "Malaysian Employment Pass approval for Bangladeshis depends primarily on the salary category and employer's compliance record. Category I (MYR 10K+) has the highest approval rate. Employers must demonstrate that the role cannot be filled by a Malaysian national. Academic qualifications and relevant work experience are key." },
      { q: "Does Malaysia offer permanent residency to work visa holders?", a: "Malaysia permanent residency (PR) is available but historically difficult to obtain. Long-term EP holders (10+ years) can apply under the Malaysia My Second Home (MM2H) programme or through direct PR application, but approvals are discretionary. Most expatriates plan for extended EP renewals rather than PR." },
      { q: "Is there income tax in Malaysia for foreign workers?", a: "Yes. Malaysia has a progressive income tax system for residents (living 182+ days in Malaysia per year): 0–30% depending on income. Foreign workers are taxed as residents if they meet the stay threshold. The top rate of 30% applies to income above MYR 2 million annually. Corporate expat packages often include tax equalisation." },
      { q: "Can my family join me in Malaysia on an Employment Pass?", a: "Yes. Employment Pass holders can sponsor their spouse and unmarried children under 18 on Dependent Passes. Category I holders get automatic approval; Category II and III may face more scrutiny. Dependants can study in Malaysia but require separate permission to work." },
    ],
    relatedDests: ["singapore", "united-arab-emirates", "saudi-arabia", "australia"],
    costBreakdown: [
      { item: "Employment Pass Application",  amount: "MYR 2,000–3,000 (employer)" },
      { item: "Single Entry Visa (Malaysian Embassy)", amount: "MYR 150–300" },
      { item: "Pass Endorsement Fee",         amount: "MYR 60" },
      { item: "Dependent Pass (spouse)",      amount: "MYR 1,000–2,000" },
      { item: "Document Authentication",      amount: "BDT ~৳3,000–5,000" },
      { item: "Medical Screening",            amount: "MYR 200–400" },
    ],
  },
  "netherlands": {
    name: "Netherlands", flag: "🇳🇱", currency: "EUR",
    visaName: "Netherlands Highly Skilled Migrant Visa / EU Blue Card",
    avgSalary: "EUR €50,000–€95,000/yr",
    minSalary: "EUR €46,107/yr (2024, under 30: €33,877)",
    processingTime: "2–90 days",
    approvalRate: 81,
    difficulty: "Medium",
    languages: ["Dutch (helpful)", "English (widely accepted)"],
    topIndustries: ["Technology", "Logistics", "Agriculture (Agri-tech)", "Finance", "Life Sciences"],
    topRoles: ["Software Engineer", "Data Scientist", "Product Designer", "Logistics Manager", "Researcher"],
    searches: "8.1K/mo",
    embassyUrl: "https://ind.nl/en/work/working_in_the_Netherlands",
    requirements: ["Job offer from IND-recognised sponsor employer", "Salary meeting highly skilled migrant threshold", "Valid passport (6+ months)", "Antecedents certificate (criminal record)", "CV and degree certificate", "Health insurance upon arrival"],
    keyFact: "The Dutch 30% tax ruling allows highly skilled migrants to receive 30% of their salary tax-free for up to 5 years.",
    overview: "The Netherlands is Europe's most English-friendly country for skilled workers. Amsterdam, Eindhoven, and Rotterdam host major international companies. The Highly Skilled Migrant (HSM) visa is processed in as little as 2 weeks if your employer is a recognised IND sponsor.",
    visaTypes: [
      { name: "Highly Skilled Migrant (HSM)", desc: "Main route for professionals at IND-recognised sponsors. Very fast processing (2 weeks). No labour market test needed.", duration: "Up to 3 years" },
      { name: "EU Blue Card", desc: "For university graduates earning above the Blue Card threshold. Pathway to EU-wide mobility after 18 months.", duration: "Up to 4 years" },
      { name: "Orientation Year Visa", desc: "For recent graduates of top-100 universities — find work in the Netherlands for 12 months without a job offer.", duration: "1 year" },
      { name: "Self-Employed (Zelfstandige)", desc: "For entrepreneurs meeting the essential services test — proven value to Dutch economy.", duration: "2 years" },
    ],
    timeline: [
      { phase: "IND-Recognised Employer", when: "Pre-start",   desc: "Confirm your employer is a recognised sponsor at IND.nl — unregistered employers cannot apply for HSM" },
      { phase: "Employer Submits to IND",  when: "Week 1",     desc: "Employer submits the HSM application to IND online — no labour market test required" },
      { phase: "IND Decision",            when: "Week 1–3",   desc: "Recognised sponsors get a 2-week processing guarantee. Others: up to 90 days." },
      { phase: "MVV (Entry Visa)",         when: "Week 3–5",   desc: "If coming from outside Netherlands, apply for an MVV (machtiging tot voorlopig verblijf) at Dutch Embassy in Dhaka" },
      { phase: "Arrive & Collect Permit",  when: "Week 5–7",   desc: "Travel to Netherlands, collect residence permit (verblijfsvergunning) from IND Desk" },
      { phase: "30% Ruling Application",  when: "Within 4 months", desc: "Apply for 30% tax ruling with Tax and Customs Administration — saves significant income tax" },
    ],
    faqs: [
      { q: "What is the Dutch 30% tax ruling?", a: "The 30% ruling allows Dutch employers to pay up to 30% of a highly skilled migrant's salary tax-free as a reimbursement for extra costs of living abroad. This significantly increases take-home pay. From 2024, a cap of €233,000 applies. The ruling lasts up to 5 years. You must apply within 4 months of starting work." },
      { q: "Can I bring my family to the Netherlands on an HSM visa?", a: "Yes. Spouses and minor children of HSM visa holders can get a residence permit automatically under the family reunification provisions. Spouses are entitled to an unrestricted work permit. The family permit is typically processed together with the primary application." },
      { q: "How does the Netherlands differ from Germany for skilled workers?", a: "The Netherlands is more English-friendly (Dutch language is not required for most roles), has faster HSM processing (2 weeks vs Germany's 1–3 months), and has the valuable 30% tax ruling. Germany has lower minimum salary thresholds, more job opportunities in engineering/manufacturing, and a larger economy with more diverse options." },
      { q: "Can I get Dutch permanent residency on an HSM visa?", a: "Yes. After 5 continuous years of legal residence in the Netherlands, you can apply for permanent residency (verblijfsvergunning voor onbepaalde tijd). Requirements include meeting integration requirements (civic integration exam or equivalent), continuous income, and no serious criminal record. EU Blue Card holders qualify after 5 years EU-wide." },
    ],
    relatedDests: ["germany", "united-kingdom", "canada", "australia"],
    costBreakdown: [
      { item: "HSM Application (employer pays)", amount: "EUR €345" },
      { item: "MVV Entry Visa (Netherlands Embassy)", amount: "EUR €192" },
      { item: "Residence Permit (IND)",         amount: "EUR €192" },
      { item: "Integration Course (if needed)", amount: "EUR €800–€3,000" },
      { item: "Health Insurance (mandatory)",   amount: "EUR €130–€160/month" },
      { item: "Document Translation/Notarisation", amount: "EUR €100–€300" },
    ],
  },
  "new-zealand": {
    name: "New Zealand", flag: "🇳🇿", currency: "NZD",
    visaName: "Accredited Employer Work Visa (AEWV)",
    avgSalary: "NZD $60,000–$110,000/yr",
    minSalary: "NZD $55,000/yr (MWUT 2024)",
    processingTime: "6–12 weeks",
    approvalRate: 77,
    difficulty: "Medium",
    languages: ["English"],
    topIndustries: ["Healthcare", "Agriculture", "Construction", "Technology", "Tourism"],
    topRoles: ["Registered Nurse", "Civil Engineer", "IT Specialist", "Chef", "Farm Manager"],
    searches: "5.9K/mo",
    embassyUrl: "https://www.immigration.govt.nz/new-zealand-visas/visas/visa/accredited-employer-work-visa",
    requirements: ["Job offer from NZ accredited employer", "Salary at or above median wage", "Proof of relevant qualifications/experience", "English language: IELTS 6.5+ (most roles)", "Immigration NZ Skills Match Report", "Criminal and medical clearance"],
    keyFact: "New Zealand's AEWV replaced 6 previous visa categories in 2022. Over 100 occupations qualify under the Green List for residency pathways.",
    overview: "New Zealand has transformed its work visa system with the Accredited Employer Work Visa (AEWV) and a Green List of shortage occupations with direct residency pathways. The country is known for high quality of life, work-life balance, and post-study work rights — making it increasingly popular with South Asian professionals.",
    visaTypes: [
      { name: "Accredited Employer Work Visa (AEWV)", desc: "Main work visa for all industries. Employer must be INZ-accredited. Leads to residency if on Green List.", duration: "Up to 3 years" },
      { name: "Green List Work-to-Residence", desc: "Directly to residency-eligible roles (doctors, engineers, teachers, ICT) without points test.", duration: "2 years then PR" },
      { name: "Skilled Migrant Category (SMC)", desc: "Points-based permanent residency. Points for age, qualifications, experience, NZ job offer.", duration: "Permanent" },
      { name: "Specific Purpose Work Visa", desc: "Short-term visa for specific projects, research, or sports. Employer-specific.", duration: "Varies" },
    ],
    timeline: [
      { phase: "Employer Accreditation Check", when: "Pre-start",   desc: "Confirm employer holds AEWV accreditation at immigration.govt.nz — essential first step" },
      { phase: "Skills Match Report (optional)", when: "Week 1–2",  desc: "For median-wage-or-above roles, a Skills Match Report from INZ confirms your qualifications" },
      { phase: "English Test",                 when: "Week 1–4",   desc: "IELTS 6.5 or equivalent — exemptions available for some nationalities and occupations" },
      { phase: "Job Check by Employer",        when: "Week 2–6",   desc: "Employer applies for a Job Check (proving role cannot be filled locally)" },
      { phase: "AEWV Application",            when: "Week 6–10",  desc: "Apply online through INZ — include medical exam, police clearance, and skills evidence" },
      { phase: "Decision & Travel",           when: "Week 10–14", desc: "Visa granted; travel to New Zealand and begin employment" },
    ],
    faqs: [
      { q: "What is New Zealand's Green List and how does it help Bangladeshi workers?", a: "The Green List contains 85+ shortage occupations where workers can progress directly to permanent residency without the points test. Tier 1 (e.g., doctors, certain engineers) get immediate residence after 2 years. Tier 2 (e.g., nurses, teachers, ICT specialists) get residence after 2 years. Bangladeshi professionals in these fields have a very strong pathway." },
      { q: "Can I bring family to New Zealand on an AEWV?", a: "Yes. Partners and dependent children can join AEWV holders on visitor visas initially, then apply for partner or dependent work/student visas. Partners of AEWV holders in accredited roles can usually obtain an open work visa, allowing them to work for any New Zealand employer." },
      { q: "What is the Skilled Migrant Category (SMC) and who qualifies?", a: "The SMC is a points-tested permanent residency pathway. Points are awarded for skilled employment in NZ (50 pts for a job offer), qualifications (50 pts for a Master's degree), age (20 pts for age 20–39), and bonus points for NZ qualifications, work experience, and partner points. Most applicants aim for 100+ points." },
      { q: "Does New Zealand offer a path to citizenship?", a: "Yes. After gaining permanent residency, you can apply for New Zealand citizenship after 5 years of living in NZ (including 12 months as a permanent resident). Citizenship grants a New Zealand passport — one of the most powerful passports in the world, including visa-free access to Australia for life." },
    ],
    relatedDests: ["australia", "canada", "united-kingdom", "singapore"],
    costBreakdown: [
      { item: "AEWV Application Fee",          amount: "NZD $750" },
      { item: "Job Check Fee (employer pays)", amount: "NZD $610" },
      { item: "IELTS Test",                   amount: "NZD $385 (approx)" },
      { item: "Medical Examination",          amount: "NZD $250–$400" },
      { item: "Police Clearance (Bangladesh)", amount: "BDT ~৳1,500" },
      { item: "Dependent Visa (per person)",  amount: "NZD $750" },
    ],
  },
};

// ── SLUG PARSER ────────────────────────────────────────────────────────────
function parseSlug(slug = "") {
  // Expected: "bangladesh-work-visa-for-canada"
  const marker = "-work-visa-for-";
  const idx = slug.indexOf(marker);
  if (idx === -1) return [slug, ""];
  return [slug.slice(0, idx), slug.slice(idx + marker.length)];
}

function toTitleCase(slug = "") {
  return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

// Difficulty badge config
const DIFF_CONFIG = {
  Easy:   { cls: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" },
  Medium: { cls: "bg-amber-50 text-amber-700 border-amber-200",       dot: "bg-amber-500"   },
  Hard:   { cls: "bg-red-50 text-red-700 border-red-200",             dot: "bg-red-500"     },
};

// ── DOCUMENT CHECKLIST ─────────────────────────────────────────────────────
function DocumentChecklist({ items }) {
  const [checked, setChecked] = useState({});
  const toggle = i => setChecked(c => ({ ...c, [i]: !c[i] }));
  const count = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((count / items.length) * 100);
  return (
    <div className="bg-white border-2 border-slate-100 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-black text-sm text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <CheckSquare size={15} className="text-blue-500" /> Document Checklist
        </h3>
        <span className="text-xs font-black text-slate-400">{count}/{items.length}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full mb-4 overflow-hidden">
        <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      <div className="space-y-2">
        {items.map((item, i) => (
          <button key={i} onClick={() => toggle(i)}
            className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${checked[i] ? "bg-blue-50 border border-blue-200" : "bg-slate-50 hover:bg-slate-100 border border-transparent"}`}>
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${checked[i] ? "bg-blue-500 border-blue-500" : "border-slate-300"}`}>
              {checked[i] && <CheckCircle2 size={11} className="text-white" />}
            </div>
            <span className={`text-xs font-semibold leading-relaxed ${checked[i] ? "text-blue-700 line-through opacity-60" : "text-slate-600"}`}>{item}</span>
          </button>
        ))}
      </div>
      {count === items.length && (
        <div className="mt-4 bg-blue-500 text-white text-center py-3 rounded-xl font-black text-sm">
          🎉 All documents ready — good luck!
        </div>
      )}
    </div>
  );
}

// ── FAQ ACCORDION ──────────────────────────────────────────────────────────
function FAQAccordion({ faqs }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className={`border-2 rounded-2xl overflow-hidden transition-all ${open === i ? "border-blue-400" : "border-slate-100"}`}>
          <button onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-start justify-between gap-4 p-5 text-left">
            <span className="text-sm font-black text-slate-800 leading-relaxed">{faq.q}</span>
            <ChevronDown size={18} className={`text-slate-400 shrink-0 transition-transform mt-0.5 ${open === i ? "rotate-180 text-blue-500" : ""}`} />
          </button>
          {open === i && (
            <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed font-medium border-t border-slate-100 pt-4">{faq.a}</div>
          )}
        </div>
      ))}
    </div>
  );
}

// ── APPROVAL METER ─────────────────────────────────────────────────────────
function ApprovalMeter({ rate }) {
  const color = rate >= 80 ? "bg-emerald-500" : rate >= 70 ? "bg-amber-500" : "bg-red-500";
  const label = rate >= 80 ? "High Approval" : rate >= 70 ? "Moderate Approval" : "Selective";
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-black text-slate-400 uppercase tracking-wider">Approval Rate</span>
        <span className="text-xs font-black text-white">{rate}% {label}</span>
      </div>
      <div className="h-2.5 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${rate}%` }} />
      </div>
    </div>
  );
}

// ── MAIN CLIENT ────────────────────────────────────────────────────────────
export default function WorkVisaSlugClient({ params: serverParams }) {
  const clientParams = useParams();
  const slug = clientParams?.slug || serverParams?.slug || "";

  const [natSlug, destSlug] = parseSlug(slug);
  const [natName, setNatName] = useState(toTitleCase(natSlug));
  const [natFlag, setNatFlag] = useState("");
  const [loadingCountry, setLoadingCountry] = useState(true);

  // Fetch country name + flag from DB
  useEffect(() => {
    if (!natSlug) return;
    fetch("/api/countries")
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          const match = data.find(c =>
            c.country.toLowerCase().replace(/\s+/g, "-") === natSlug
          );
          if (match) {
            setNatName(match.country);
            setNatFlag(match.flag || "");
          }
        }
      })
      .catch(() => {})
      .finally(() => setLoadingCountry(false));
  }, [natSlug]);

  const destData = DESTINATIONS[destSlug];
  const diff = DIFF_CONFIG[destData?.difficulty] || DIFF_CONFIG.Medium;

  // Related destinations
  const relatedDests = useMemo(() =>
    (destData?.relatedDests || [])
      .map(d => DESTINATIONS[d])
      .filter(Boolean)
      .slice(0, 4),
  [destData]);

  if (!destData) {
    return (
      <div className="min-h-screen bg-[#f8f9fc] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="text-7xl mb-6">🌍</div>
          <h1 className="font-black text-2xl text-slate-800 mb-3">Guide Not Found</h1>
          <p className="text-slate-500 mb-8 text-sm leading-relaxed">
            We don't have a specific guide for this destination yet. Use the search tool to explore available destinations.
          </p>
          <Link href="/visa/work-visa"
            className="inline-flex items-center gap-2 bg-blue-500 text-white font-black px-6 py-3 rounded-xl hover:bg-blue-600 transition-all text-sm">
            <ArrowLeft size={16} /> Back to Work Visa Guide
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans">

      {/* ── TRUST BAR ── */}
      <div className="bg-[#080d1a] py-2.5 px-6 text-center">
        <p className="text-xs text-blue-400 font-bold">
          ✅ Data verified from official government portals &nbsp;·&nbsp;
          🔄 Updated monthly &nbsp;·&nbsp;
          🆓 Free — No signup required
        </p>
      </div>

      {/* ── BREADCRUMB ── */}
      <div className="bg-white border-b border-slate-100 px-6 py-3">
        <div className="container mx-auto max-w-6xl flex items-center gap-2 text-xs text-slate-400 font-semibold flex-wrap">
          <Link href="/" className="hover:text-slate-800 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link href="/visa/work-visa" className="hover:text-slate-800 transition-colors">Work Visa Guide</Link>
          <ChevronRight size={12} />
          <span className="text-slate-700">
            {loadingCountry ? natSlug : natName} → {destData.name}
          </span>
        </div>
      </div>

      {/* ── HERO ── */}
      <section className="relative bg-[#080d1a] overflow-hidden pt-12 pb-14 px-6">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }} />
        <div className="absolute top-0 right-0 text-[220px] opacity-[0.04] select-none pointer-events-none leading-none">
          {destData.flag}
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <Link href="/visa/work-visa"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={16} /> All Destinations
          </Link>

          <div className="grid md:grid-cols-2 gap-10 items-start">
            {/* Left */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-4xl">{destData.flag}</span>
                <span className="px-3 py-1.5 bg-white/5 border border-white/10 text-slate-400 text-xs font-black rounded-xl">{destData.currency}</span>
                <span className={`px-3 py-1.5 border text-xs font-black rounded-xl ${diff.cls}`}>
                  <span className={`inline-block w-1.5 h-1.5 rounded-full ${diff.dot} mr-1`} />
                  {destData.difficulty}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4">
                {loadingCountry ? (
                  <span className="opacity-40">{toTitleCase(natSlug)}</span>
                ) : (
                  <>{natFlag && <span className="mr-2">{natFlag}</span>}{natName}</>
                )}{" "}
                Work Visa for{" "}
                <span className="bg-blue-500 px-2 text-white">{destData.name}</span>
              </h1>

              <p className="text-slate-400 font-medium leading-relaxed mb-6 text-sm">
                Complete 2025 guide to the <strong className="text-white">{destData.visaName}</strong> for{" "}
                {natName} nationals — salary requirements, step-by-step application process, approval rates,
                required documents, and expert tips verified from official government sources.
              </p>

              {/* Key stats */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: DollarSign, label: "Avg. Salary",     value: destData.avgSalary },
                  { icon: Timer,      label: "Processing Time", value: destData.processingTime },
                  { icon: Shield,     label: "Min. Salary",     value: destData.minSalary },
                  { icon: Globe,      label: "Languages",       value: destData.languages.join(", ") },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon size={12} className="text-blue-400" />
                      <span className="text-[9px] text-slate-500 font-black uppercase tracking-wider">{label}</span>
                    </div>
                    <span className="text-xs font-black text-white leading-tight">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: overview card */}
            <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-7 space-y-5">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Visa Name</div>
                <div className="text-sm font-black text-white">{destData.visaName}</div>
              </div>

              <ApprovalMeter rate={destData.approvalRate} />

              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Top Industries</div>
                <div className="flex flex-wrap gap-1.5">
                  {destData.topIndustries.map(ind => (
                    <span key={ind} className="text-[10px] font-bold bg-blue-500/10 text-blue-300 border border-blue-500/20 px-2 py-1 rounded-lg">{ind}</span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">In-Demand Roles for {natName} nationals</div>
                <div className="space-y-1.5">
                  {destData.topRoles.map((role, i) => (
                    <div key={role} className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                      <span className="w-4 h-4 bg-blue-500/10 text-blue-400 rounded text-[9px] font-black flex items-center justify-center shrink-0">{i + 1}</span>
                      {role}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                <Zap size={13} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-[11px] text-amber-200/80 leading-relaxed font-medium">{destData.keyFact}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <div className="container mx-auto max-w-6xl px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT MAIN */}
          <div className="lg:col-span-2 space-y-14">

            {/* Overview */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Globe size={16} className="text-blue-600" />
                </div>
                {destData.name} Work Visa Overview for {natName} Nationals
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">{destData.overview}</p>
            </section>

            {/* Visa Types */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-50 rounded-xl flex items-center justify-center">
                  <FileText size={16} className="text-purple-600" />
                </div>
                Types of {destData.name} Work Visas
              </h2>
              <div className="space-y-4">
                {(destData.visaTypes || []).map((v, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-white border-2 border-slate-100 rounded-2xl hover:border-blue-200 transition-all">
                    <div className="w-8 h-8 bg-blue-500 rounded-xl flex items-center justify-center font-black text-xs text-white shrink-0 mt-0.5">{i + 1}</div>
                    <div>
                      <div className="font-black text-slate-800 text-sm mb-1">{v.name}</div>
                      <div className="text-xs text-slate-500 leading-relaxed mb-2">{v.desc}</div>
                      <span className="text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-lg">⏱ {v.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Application Timeline */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center">
                  <BarChart2 size={16} className="text-slate-600" />
                </div>
                Step-by-Step Application Timeline
              </h2>
              <div className="relative">
                <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-slate-100" />
                <div className="space-y-4">
                  {(destData.timeline || []).map((step, i) => (
                    <div key={i} className="flex items-start gap-4 relative">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm shrink-0 z-10 shadow-sm font-black text-white ${i === 0 ? "bg-slate-800" : i === (destData.timeline.length - 1) ? "bg-emerald-600" : "bg-blue-500"}`}>
                        {i + 1}
                      </div>
                      <div className="flex-1 bg-white rounded-xl px-4 py-3 border border-slate-100 hover:border-blue-100 transition-colors">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                          <span className="text-sm font-black text-slate-800">{step.phase}</span>
                          <span className="text-[10px] font-black text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-lg shrink-0">{step.when}</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Cost Breakdown */}
            {destData.costBreakdown && (
              <section>
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-50 rounded-xl flex items-center justify-center">
                    <DollarSign size={16} className="text-emerald-600" />
                  </div>
                  Total Cost Breakdown for {natName} Applicants
                </h2>
                <div className="bg-white border-2 border-slate-100 rounded-2xl overflow-hidden">
                  {destData.costBreakdown.map((c, i) => (
                    <div key={i} className={`flex items-center justify-between px-5 py-3.5 ${i < destData.costBreakdown.length - 1 ? "border-b border-slate-50" : ""} hover:bg-slate-50 transition-colors`}>
                      <span className="text-sm text-slate-700 font-semibold">{c.item}</span>
                      <span className="text-sm font-black text-slate-800">{c.amount}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Common Rejection Reasons */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center">
                  <AlertTriangle size={16} className="text-red-500" />
                </div>
                Why {natName} Applicants Get Rejected
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  `Salary below the ${destData.name} minimum threshold (${destData.minSalary})`,
                  "Educational qualifications not officially recognised or assessed",
                  "Employer not licensed, accredited, or registered as a sponsor",
                  "Language test score insufficient for the specific occupation",
                  "Insufficient work experience in the relevant field (2–5 years usually required)",
                  "Incomplete or incorrectly attested supporting documents",
                  "Criminal record or medical fitness issues not disclosed",
                  "Applying too close to the start date without processing time buffer",
                ].map((reason, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl">
                    <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-red-800 font-medium leading-relaxed">{reason}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Expert Tips */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-amber-50 rounded-xl flex items-center justify-center">
                  <Lightbulb size={16} className="text-amber-600" />
                </div>
                Expert Tips for {natName} Applicants
              </h2>
              <div className="space-y-3">
                {[
                  `Start the application process at least ${destData.processingTime} before your planned start date`,
                  `Ensure your employer is officially licensed/accredited as a sponsor in ${destData.name} before signing any contract`,
                  `Get your academic qualifications officially assessed — unrecognised degrees are the #1 reason for rejection`,
                  `Check the current minimum salary (${destData.minSalary}) as thresholds update annually — always verify against the official portal`,
                  "Apply for police clearance and medical certificates early — these often take 2–6 weeks",
                  `Language requirements differ by occupation in ${destData.name} — verify the specific minimum for your job code`,
                  "Use official government portals only — never pay unofficial agents for visa applications",
                  `Consider bringing your family simultaneously — dependent visa processing runs in parallel in ${destData.name}`,
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-amber-50 border border-amber-100 rounded-2xl hover:border-amber-300 transition-colors">
                    <span className="w-7 h-7 bg-amber-400 text-black font-black text-xs rounded-lg flex items-center justify-center shrink-0">{i + 1}</span>
                    <span className="text-sm text-slate-700 font-medium leading-relaxed">{tip}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FAQ */}
            {destData.faqs && destData.faqs.length > 0 && (
              <section>
                <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
                    <HelpCircle size={16} className="text-blue-600" />
                  </div>
                  Frequently Asked Questions — {natName} to {destData.name}
                </h2>
                <FAQAccordion faqs={destData.faqs} />
              </section>
            )}

            {/* Related Destinations */}
            <section>
              <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center">
                  <TrendingUp size={16} className="text-slate-600" />
                </div>
                Compare Other Work Visa Destinations
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {relatedDests.map((d, i) => (
                  <Link key={i}
                    href={`/work-visa/${natSlug}-work-visa-for-${(destData.relatedDests || [])[i]}`}
                    className="group flex items-center justify-between p-5 bg-white border-2 border-slate-100 rounded-2xl hover:border-blue-300 hover:shadow-md transition-all">
                    <div>
                      <div className="font-black text-sm text-slate-800 mb-1 group-hover:text-blue-700 transition-colors">
                        {d.flag} {natName} → {d.name}
                      </div>
                      <div className="text-[10px] text-slate-400 font-semibold">{d.processingTime} · {d.approvalRate}% approval</div>
                    </div>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </section>

            {/* SEO Article */}
            <section className="border-t border-slate-100 pt-10">
              <h2 className="text-2xl font-black text-slate-900 mb-4">
                {natName} to {destData.name} Work Visa: 2025 Complete Guide
              </h2>
              <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
                <p>
                  <strong className="text-slate-800">{natName}</strong> nationals seeking employment in{" "}
                  <strong className="text-slate-800">{destData.name}</strong> must apply for the{" "}
                  <strong className="text-slate-800">{destData.visaName}</strong>. The visa requires a job offer
                  from an employer meeting the minimum salary threshold of{" "}
                  <strong className="text-slate-800">{destData.minSalary}</strong>.
                </p>
                <p>
                  Processing typically takes <strong className="text-slate-800">{destData.processingTime}</strong>,
                  with an overall approval rate of <strong className="text-slate-800">{destData.approvalRate}%</strong>.
                  The most in-demand industries for {natName} workers are{" "}
                  {destData.topIndustries.slice(0, 3).join(", ")}. Average salaries range from{" "}
                  <strong className="text-slate-800">{destData.avgSalary}</strong>.
                </p>
                <div className="bg-blue-50 border-2 border-blue-100 rounded-2xl p-5">
                  <p className="text-sm font-black text-slate-800 mb-3">⚡ Quick Reference — {natName} to {destData.name}</p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {[
                      ["Visa Type",         destData.visaName],
                      ["Min. Salary",       destData.minSalary],
                      ["Processing Time",   destData.processingTime],
                      ["Approval Rate",     `${destData.approvalRate}%`],
                      ["Languages Required", destData.languages.join(", ")],
                      ["Difficulty",        destData.difficulty],
                    ].map(([label, value]) => (
                      <li key={label} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
                        {label}: <strong>{value}</strong>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* More resources */}
            <section className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <h3 className="font-black text-slate-900 text-lg mb-2">Explore More Visa Resources</h3>
              <p className="text-slate-500 text-sm mb-5">Everything you need to plan your international career move</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { label: "🌍 All Work Visa Destinations",        href: "/work-visa" },
                  { label: "⏱ Visa Processing Time Tracker",       href: "/travel-resources/visa-processing-time-tracker" },
                  { label: "🛡 Visa Rejection Checker",             href: "/travel-resources/visa-rejection-checker" },
                  { label: "💬 Talk to a Visa Expert",              href: "https://wa.me/8801631312524" },
                ].map((l, i) => (
                  <Link key={i} href={l.href}
                    className="flex items-center justify-between px-4 py-3 bg-white rounded-xl border border-slate-100 hover:border-blue-300 text-sm font-semibold text-slate-700 hover:text-slate-900 transition-all group">
                    {l.label}
                    <ChevronRight size={14} className="text-slate-300 group-hover:text-blue-500" />
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">

            {/* Visa summary card */}
            <div className="bg-[#080d1a] rounded-2xl p-7 text-white">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">Visa at a Glance</div>
              <div className="space-y-3">
                {[
                  { label: "Min. Salary",       value: destData.minSalary,       icon: DollarSign },
                  { label: "Processing",         value: destData.processingTime,  icon: Clock },
                  { label: "Approval Rate",      value: `${destData.approvalRate}%`, icon: BadgeCheck },
                  { label: "Difficulty",         value: destData.difficulty,      icon: BarChart2 },
                  { label: "Languages",          value: destData.languages[0],    icon: Globe },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center justify-between bg-white/5 px-4 py-2.5 rounded-xl">
                    <div className="flex items-center gap-2">
                      <Icon size={12} className="text-slate-500" />
                      <span className="text-xs text-slate-500 font-semibold">{label}</span>
                    </div>
                    <span className="text-xs font-black text-blue-400 max-w-[55%] text-right">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-white/10">
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">Top Roles</div>
                <div className="space-y-1.5">
                  {destData.topRoles.slice(0, 4).map(role => (
                    <div key={role} className="flex items-center gap-2 text-xs text-slate-400 font-semibold">
                      <div className="w-1 h-1 bg-blue-500 rounded-full" />
                      {role}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Document checklist */}
            <DocumentChecklist items={destData.requirements} />

            {/* Embassy link */}
            <div className="bg-white border-2 border-slate-100 rounded-2xl p-6">
              <h4 className="font-black text-sm text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Building2 size={14} className="text-slate-400" />
                Official Portal
              </h4>
              <a href={destData.embassyUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-all text-sm font-semibold text-slate-700 hover:text-blue-700">
                <ExternalLink size={14} className="text-slate-400 shrink-0" />
                {destData.name} Official Immigration Portal
              </a>
            </div>

            {/* All destinations sidebar nav */}
            <div className="bg-white border-2 border-slate-100 rounded-2xl p-6">
              <h4 className="font-black text-sm text-slate-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Globe size={14} className="text-slate-400" />
                All Destination Guides
              </h4>
              <div className="space-y-1">
                {Object.entries(DESTINATIONS).map(([s, d]) => (
                  <Link key={s} href={`/work-visa/${natSlug}-work-visa-for-${s}`}
                    className={`flex items-center gap-2 p-2.5 rounded-xl text-xs font-semibold transition-all ${
                      s === destSlug ? "bg-blue-500 text-white font-black" : "text-slate-600 hover:bg-slate-50 hover:text-slate-800"
                    }`}>
                    <span>{d.flag}</span> {d.name}
                    {s === destSlug && <span className="ml-auto text-[9px] font-black opacity-70">← You are here</span>}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-[#080d1a] rounded-2xl p-7 text-white text-center">
              <div className="text-3xl mb-3">👨‍💼</div>
              <h4 className="font-black text-lg mb-2">Get Expert Help</h4>
              <p className="text-slate-400 text-xs leading-relaxed mb-5">
                Our visa consultants handle your {destData.name} work permit application from document prep to submission — free initial assessment.
              </p>
              <a href="https://wa.me/8801631312524" target="_blank" rel="noopener noreferrer"
                className="block w-full py-4 bg-blue-500 hover:bg-blue-400 text-white font-black rounded-xl transition-all text-sm mb-3">
                💬 WhatsApp Now →
              </a>
              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-600 font-semibold">
                <span>✅ Free assessment</span>
                <span>⚡ Fast reply</span>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <div className="flex items-start gap-2">
                <AlertCircle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-800 leading-relaxed">
                  Visa requirements change frequently. Always verify salary thresholds, processing times, and eligibility criteria on the official government immigration portal before applying.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BACK CTA ── */}
      <section className="bg-[#080d1a] py-16 px-6 text-center">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-black text-white mb-4">Explore More Work Visa Destinations</h2>
          <p className="text-slate-500 font-medium mb-8">
            Compare work permits across {Object.keys(DESTINATIONS).length}+ countries — salary thresholds, approval rates, and step-by-step guides.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/work-visa"
              className="inline-flex items-center gap-3 bg-blue-500 text-white px-10 py-5 rounded-2xl font-black hover:bg-blue-400 transition-all shadow-xl text-sm">
              <Briefcase size={20} /> Browse All Countries
            </Link>
            <a href="https://wa.me/8801631312524" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white/10 text-white px-8 py-5 rounded-2xl font-black hover:bg-white/20 transition-all text-sm border border-white/10">
              💬 Talk to Expert
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}