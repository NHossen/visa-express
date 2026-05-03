// app/visa-news/[slug]/page.jsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { VISA_NEWS } from '../page'; // import shared data

/* ─────────────────────────────────────────────────────────────
   FULL ARTICLE BODY DATA
   Each slug maps to rich HTML-safe content blocks + metadata
───────────────────────────────────────────────────────────── */
const ARTICLE_CONTENT = {
  'uk-skilled-worker-salary-increase-2026': {
    metaTitle: 'UK Skilled Worker Visa Salary Threshold 2026: £38,700 Rule Explained | Visa Express Hub',
    metaDescription:
      'UK Home Office raises Skilled Worker visa salary to £38,700 in 2026. Full breakdown of exemptions, affected sectors, CoS obligations and what UAE applicants must do now.',
    keywords:
      'uk skilled worker visa 2026, uk salary threshold £38700, uk work visa salary increase, uk visa changes 2026, skilled worker visa from UAE, uk immigration 2026',
    heroImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070',
    heroAlt: 'London skyline symbolising UK immigration policy changes 2026',
    category: 'Policy Alert',
    categoryColor: '#dc2626',
    country: 'United Kingdom',
    countryCode: 'gb',
    flag: 'https://flagcdn.com/w40/gb.png',
    date: 'May 2, 2026',
    dateISO: '2026-05-02',
    readTime: '5',
    author: 'Visa Express Editorial',
    authorRole: 'UK Immigration Specialist',
    intro:
      'The UK Home Office has officially raised the minimum salary threshold for Skilled Worker visa applicants from £26,200 to £38,700 — one of the most significant immigration policy changes in over a decade. For UAE-based professionals eyeing a UK career move, this update demands immediate attention.',
    sections: [
      {
        heading: 'What Has Changed?',
        body: `From April 2024, all new Skilled Worker visa applications must meet a minimum salary of <strong>£38,700 per year</strong> — a 48% increase on the previous £26,200 baseline. This figure applies to the gross annual salary offered in the Certificate of Sponsorship (CoS).
        
        The change follows recommendations from the Migration Advisory Committee (MAC) to align sponsored salaries more closely with median UK earnings and reduce the volume of lower-paid overseas hires.`,
      },
      {
        heading: 'Which Sectors Are Exempt?',
        body: `Not all roles are subject to the new £38,700 threshold. The following categories retain their own salary floors:
        <ul>
          <li><strong>Health & Care visa workers</strong> — NHS clinical roles follow NHS Agenda for Change pay bands</li>
          <li><strong>Education sector</strong> — Teachers follow national pay scales set by the STRB</li>
          <li><strong>New entrants</strong> — Workers under 26 or switching from a student/graduate visa can qualify at 70% of the going rate</li>
          <li><strong>Shortage occupation list roles</strong> — Some roles on the Immigration Salary List retain a 20% discount</li>
        </ul>`,
      },
      {
        heading: 'Impact on UAE Employers Sponsoring UK Staff',
        body: `UK-licensed sponsors — including UAE parent companies sponsoring transferees — must audit existing CoS allocations. Any renewal or extension filed after April 4, 2024 must comply with the new threshold unless an exemption applies. Failure to update salary records with the Home Office can lead to sponsor licence suspension.`,
      },
      {
        heading: 'Step-by-Step: What UAE Applicants Should Do Now',
        body: `<ol>
          <li><strong>Request a revised job offer letter</strong> confirming the updated salary meets £38,700+</li>
          <li><strong>Check your SOC code</strong> — verify the occupation code assigned by your employer maps to the correct going rate</li>
          <li><strong>Confirm exemption status</strong> — if in healthcare or education, obtain documentary proof of the applicable pay scale</li>
          <li><strong>Book an appointment</strong> at VFS Global in Dubai for biometrics once your online application is submitted</li>
          <li><strong>Prepare your financial documents</strong> — bank statements covering 28 consecutive days showing £1,270+ in savings if employer does not certify maintenance</li>
        </ol>`,
      },
      {
        heading: 'Processing Times from Dubai (May 2026)',
        body: `Standard Skilled Worker visa processing from UAE currently sits at <strong>3–5 weeks</strong> for straightforward cases. Priority processing (additional fee) reduces this to <strong>5 working days</strong>. Super Priority (same-day decision) is available at select VFS centres in Dubai.`,
      },
    ],
    keyFacts: [
      { label: 'New Salary Floor', value: '£38,700/yr' },
      { label: 'Previous Threshold', value: '£26,200/yr' },
      { label: 'Increase', value: '+48%' },
      { label: 'Effective From', value: 'Apr 4, 2024' },
      { label: 'Processing (Standard)', value: '3–5 weeks' },
      { label: 'Priority Processing', value: '5 working days' },
    ],
    relatedSlugs: [
      'schengen-digital-nomad-visa-eu-2026',
      'canada-express-entry-healthcare-draw-2026',
      'germany-opportunity-card-launch-2026',
    ],
    internalLinks: [
      { label: 'UK Work Visa Guide', href: '/visa/work-visa' },
      { label: 'Schengen Visa 2026', href: '/schengen-visa' },
      { label: 'Document Checklist Generator', href: '/visa-resources/visa-checklist-generator' },
      { label: 'Embassy Directory UAE', href: '/visa-resources/embassy-directory' },
      { label: 'Processing Time Tracker', href: '/visa-processing-time-tracker' },
    ],
    faq: [
      {
        q: 'Does the £38,700 threshold apply to renewals?',
        a: 'Yes. All in-country extensions and out-of-country renewals filed after April 4, 2024 must meet the new threshold unless an exemption applies.',
      },
      {
        q: 'Can I include bonuses or allowances to reach £38,700?',
        a: 'Only guaranteed non-discretionary allowances (such as London weighting allowances) may be counted. Performance bonuses cannot be used.',
      },
      {
        q: 'Is the Health and Care visa affected?',
        a: 'No. Health and Care visa salaries continue to follow NHS and equivalent national pay scales, which are separately regulated.',
      },
      {
        q: 'How do I apply from Dubai?',
        a: 'Submit your online application on the UK Visas & Immigration portal, then attend a biometrics appointment at VFS Global in Dubai. Processing typically takes 3–5 weeks on the standard service.',
      },
    ],
  },

  'schengen-digital-nomad-visa-eu-2026': {
    metaTitle: 'EU Unified Digital Nomad Visa 2026: 1-Year Schengen Permit for Remote Workers | Visa Express Hub',
    metaDescription:
      'EU approves a single Digital Nomad visa valid across all 27 Schengen countries. Income requirements, application process for UAE residents, and countries accepting applications in 2026.',
    keywords:
      'eu digital nomad visa 2026, schengen digital nomad visa, remote work visa europe, eu single permit remote workers, digital nomad visa from UAE, europe visa 2026',
    heroImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070',
    heroAlt: 'European city representing Schengen digital nomad visa 2026',
    category: 'New Visa Type',
    categoryColor: '#0d9488',
    country: 'European Union',
    countryCode: 'eu',
    flag: 'https://flagcdn.com/w40/eu.png',
    date: 'April 28, 2026',
    dateISO: '2026-04-28',
    readTime: '4',
    author: 'Visa Express Editorial',
    authorRole: 'Schengen Visa Specialist',
    intro:
      'Remote workers can now apply for a single EU Digital Nomad visa valid across all 27 Schengen member states for up to 12 months — a landmark shift in European immigration policy that opens a unified legal pathway for location-independent professionals worldwide.',
    sections: [
      {
        heading: 'What Is the EU Unified Digital Nomad Visa?',
        body: `For years, digital nomads had to navigate fragmented national schemes — Portugal's D8, Germany's Freelancer visa, Greece's Digital Nomad Visa — each with different rules, fees and income thresholds. The new <strong>EU Unified Digital Nomad Visa (EU-DNV)</strong> creates a single permit that allows holders to live and work remotely from any Schengen country during a 12-month validity period, with the option to renew once for an additional year.`,
      },
      {
        heading: 'Income and Eligibility Requirements',
        body: `<ul>
          <li><strong>Minimum monthly income:</strong> €3,500 net (approximately AED 14,000) from remote employment or self-employment</li>
          <li><strong>Employment source:</strong> Income must derive from clients or employers located <em>outside</em> the EU</li>
          <li><strong>Health insurance:</strong> Comprehensive coverage valid across the Schengen Area required</li>
          <li><strong>Clean criminal record:</strong> Certificate from your home country (apostilled if applicable)</li>
          <li><strong>Accommodation proof:</strong> Rental agreement or hotel booking for the first 30 days</li>
        </ul>`,
      },
      {
        heading: 'How UAE Residents Can Apply',
        body: `Applications are processed through the embassy or consulate of the <strong>Schengen country you intend to enter first</strong>. Once in the Schengen Zone, you are free to travel and work from any member state without further permits.
        
        Dubai residents can apply at the French, German, Dutch or Spanish consulates — all of which now accept EU-DNV applications. Processing time is approximately <strong>15–25 working days</strong>. The visa fee is <strong>€90</strong> (standard Schengen fee), with no additional surcharge for the digital nomad category.`,
      },
    ],
    keyFacts: [
      { label: 'Validity', value: '12 months' },
      { label: 'Min. Monthly Income', value: '€3,500 net' },
      { label: 'Countries Covered', value: 'All 27 Schengen' },
      { label: 'Visa Fee', value: '€90' },
      { label: 'Processing Time', value: '15–25 days' },
      { label: 'Renewable', value: 'Once (1 yr)' },
    ],
    relatedSlugs: [
      'schengen-visa-fee-increase-2026',
      'germany-opportunity-card-launch-2026',
      'uk-skilled-worker-salary-increase-2026',
    ],
    internalLinks: [
      { label: 'Schengen Visa Guide 2026', href: '/schengen-visa' },
      { label: 'Europe Visa for UAE Residents', href: '/visa/tourist-visa/europe' },
      { label: 'Document Checklist Generator', href: '/visa-resources/visa-checklist-generator' },
      { label: 'SOP & Cover Letter Tool', href: '/visa-resources/visa-document-generator' },
      { label: 'Processing Time Tracker', href: '/visa-processing-time-tracker' },
    ],
    faq: [
      {
        q: 'Can I work for EU clients on the Digital Nomad Visa?',
        a: 'No. The EU-DNV requires that your income comes from clients or employers based outside the European Union.',
      },
      {
        q: 'Can my family join me on this visa?',
        a: 'Yes, dependent family members can apply for a companion permit valid for the same duration.',
      },
      {
        q: 'Does the EU-DNV lead to permanent residency?',
        a: 'Not directly. It is a temporary stay visa. However, time spent on a DNV can count towards long-term residence calculations in some member states.',
      },
    ],
  },

  'canada-express-entry-healthcare-draw-2026': {
    metaTitle: 'Canada Express Entry Healthcare Draw 2026: 5,000 Invitations Issued | Visa Express Hub',
    metaDescription:
      'IRCC issues 5,000 ITAs in the largest healthcare-targeted Express Entry draw of 2026. CRS cut-off scores, eligible NOC codes, provincial streams, and how UAE nurses and doctors can apply.',
    keywords:
      'canada express entry 2026, canada healthcare draw, ircc 2026 invitation, canada PR nurses 2026, express entry CRS score 2026, canada immigration UAE professionals',
    heroImage: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1974',
    heroAlt: 'Canadian healthcare facility representing Express Entry draw 2026',
    category: 'Work Permit',
    categoryColor: '#b91c1c',
    country: 'Canada',
    countryCode: 'ca',
    flag: 'https://flagcdn.com/w40/ca.png',
    date: 'April 25, 2026',
    dateISO: '2026-04-25',
    readTime: '6',
    author: 'Visa Express Editorial',
    authorRole: 'Canadian Immigration Specialist',
    intro:
      "IRCC has issued 5,000 Invitations to Apply (ITAs) in the largest category-based Express Entry draw of 2026, targeting nurses, physicians, allied health workers and healthcare administrators. With a CRS cut-off of 422, this draw presents a major opportunity for UAE-based medical professionals.",
    sections: [
      {
        heading: 'Draw Details',
        body: `<ul>
          <li><strong>Draw date:</strong> April 24, 2026</li>
          <li><strong>ITAs issued:</strong> 5,000</li>
          <li><strong>CRS cut-off score:</strong> 422</li>
          <li><strong>Stream:</strong> Category-based (Healthcare Occupations)</li>
          <li><strong>Tie-breaking rule applied:</strong> April 12, 2026 at 14:02:07 UTC</li>
        </ul>`,
      },
      {
        heading: 'Which NOC Codes Are Included?',
        body: `The healthcare category draw covers the following National Occupation Classification (NOC) codes:
        <ul>
          <li>31100 – Specialists in clinical and laboratory medicine</li>
          <li>31101 – General practitioners and family physicians</li>
          <li>31102 – Dentists</li>
          <li>31301 – Registered nurses and registered psychiatric nurses</li>
          <li>32101 – Pharmacists</li>
          <li>32120 – Physiotherapists</li>
          <li>33102 – Nurse aides, orderlies and patient service associates</li>
        </ul>`,
      },
      {
        heading: 'How to Boost Your CRS Score from UAE',
        body: `<ol>
          <li><strong>Get a Canadian job offer</strong> — a valid LMIA-supported offer adds 50–200 points</li>
          <li><strong>Provincial Nominee Program (PNP)</strong> — a nomination adds 600 points, guaranteeing an ITA</li>
          <li><strong>Improve your language score</strong> — achieving CLB 10+ in all IELTS bands adds significant points</li>
          <li><strong>Complete Canadian education</strong> — a post-secondary credential from Canada earns additional points</li>
          <li><strong>Claim sibling in Canada</strong> — having a sibling who is a Canadian PR or citizen adds 15 points</li>
        </ol>`,
      },
    ],
    keyFacts: [
      { label: 'ITAs Issued', value: '5,000' },
      { label: 'CRS Cut-off', value: '422' },
      { label: 'Draw Type', value: 'Healthcare' },
      { label: 'Draw Date', value: 'Apr 24, 2026' },
      { label: 'PR Processing', value: '~6 months' },
      { label: 'Next Draw Est.', value: 'May 2026' },
    ],
    relatedSlugs: [
      'australia-482-visa-processing-time-2026',
      'uk-skilled-worker-salary-increase-2026',
      'usa-h1b-visa-lottery-2026-results',
    ],
    internalLinks: [
      { label: 'Canada Visa Guide', href: '/visa/tourist-visa/canada' },
      { label: 'Document Checklist Generator', href: '/visa-resources/visa-checklist-generator' },
      { label: 'SOP & Cover Letter Tool', href: '/visa-resources/visa-document-generator' },
      { label: 'Embassy Directory UAE', href: '/visa-resources/embassy-directory' },
      { label: 'Processing Time Tracker', href: '/visa-processing-time-tracker' },
    ],
    faq: [
      {
        q: 'Do I need a job offer to enter the Express Entry pool?',
        a: 'No. A job offer is optional but earns additional CRS points. You can enter the pool based on education, language, and experience alone.',
      },
      {
        q: 'How long does it take to get PR after receiving an ITA?',
        a: 'IRCC targets a 6-month processing time for complete applications. Biometrics can be completed at a VAC in Dubai.',
      },
      {
        q: 'Can UAE-trained nurses apply directly?',
        a: 'Yes, provided your credentials are assessed by the relevant Canadian regulatory authority (e.g., NNAS for nurses) and you meet the language requirements.',
      },
    ],
  },

  'australia-482-visa-processing-time-2026': {
    metaTitle: 'Australia 482 Visa Processing Time Slashed to 21 Days for Priority Sectors 2026 | Visa Express Hub',
    metaDescription:
      'Australia Department of Home Affairs fast-tracks Subclass 482 TSS visa for IT, Engineering and Nursing. New priority stream rules, employer nomination caps, and how UAE professionals can benefit.',
    keywords:
      'australia 482 visa 2026, tss visa processing time, australia skilled visa fast track, subclass 482 priority, australia work visa UAE 2026, australia immigration 2026',
    heroImage: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2130',
    heroAlt: 'Sydney Opera House representing Australia skilled migration 2026',
    category: 'Speed Update',
    categoryColor: '#0891b2',
    country: 'Australia',
    countryCode: 'au',
    flag: 'https://flagcdn.com/w40/au.png',
    date: 'April 22, 2026',
    dateISO: '2026-04-22',
    readTime: '5',
    author: 'Visa Express Editorial',
    authorRole: 'Australian Migration Specialist',
    intro:
      'The Australian Department of Home Affairs has introduced a new Priority Assessment Stream for Subclass 482 (Temporary Skill Shortage) visa applications in three critical sectors — IT, Engineering and Nursing — slashing processing times to just 21 calendar days.',
    sections: [
      {
        heading: 'What Is the Priority Assessment Stream?',
        body: `The priority stream is available to employers who hold <strong>Standard Business Sponsorship (SBS)</strong> with a clean compliance record and are nominating workers in shortage occupations listed under the Short-Term Skilled Occupation List (STSOL) or Medium and Long-Term Strategic Skills List (MLTSSL). Eligible nominees can expect a decision within 21 calendar days from the date of a complete application, compared to the previous median of 75 days.`,
      },
      {
        heading: 'Priority Sectors and Occupation Codes',
        body: `<ul>
          <li><strong>Information Technology:</strong> Software engineers (261313), ICT security specialists (262112), Network engineers (263212)</li>
          <li><strong>Engineering:</strong> Civil engineers (233211), Electrical engineers (233311), Mechanical engineers (233512)</li>
          <li><strong>Nursing:</strong> Registered nurses (254411), ICU nurses (254418), Midwives (254111)</li>
        </ul>`,
      },
      {
        heading: 'Employer Obligations Under the New Stream',
        body: `Sponsors accessing the priority stream must demonstrate:
        <ol>
          <li>A genuine skills shortage with documented labour market testing (at least two advertisements over 28 days)</li>
          <li>A compliant sponsorship history — no adverse findings in the last 3 years</li>
          <li>A salary at or above the <strong>Temporary Skilled Migration Income Threshold (TSMIT)</strong> of AUD 73,150 per year</li>
        </ol>`,
      },
    ],
    keyFacts: [
      { label: 'Priority Processing', value: '21 days' },
      { label: 'Previous Median', value: '75 days' },
      { label: 'Visa Subclass', value: '482 TSS' },
      { label: 'Min. Salary (TSMIT)', value: 'AUD 73,150' },
      { label: 'Visa Duration', value: 'Up to 4 years' },
      { label: 'Pathway to PR', value: 'Subclass 186' },
    ],
    relatedSlugs: [
      'canada-express-entry-healthcare-draw-2026',
      'uk-skilled-worker-salary-increase-2026',
      'uae-golden-visa-criteria-expanded-2026',
    ],
    internalLinks: [
      { label: 'Australia Visa Guide', href: '/visa/tourist-visa/australia' },
      { label: 'Work Visa Options', href: '/visa/work-visa' },
      { label: 'Processing Time Tracker', href: '/visa-processing-time-tracker' },
      { label: 'Document Checklist Generator', href: '/visa-resources/visa-checklist-generator' },
      { label: 'Embassy Directory UAE', href: '/visa-resources/embassy-directory' },
    ],
    faq: [
      {
        q: 'Can I apply for a 482 visa without a job offer?',
        a: 'No. The Subclass 482 visa requires employer sponsorship. Your Australian employer must first obtain Standard Business Sponsorship before nominating you.',
      },
      {
        q: 'Does the 482 visa lead to permanent residency?',
        a: 'Yes. After 2–3 years on a 482 visa, you may be eligible to apply for the Subclass 186 Employer Nomination Scheme for permanent residency.',
      },
      {
        q: 'How do I apply from UAE?',
        a: 'Submit online through ImmiAccount, then complete biometrics at a VEVO-approved collection point in Dubai. No interview is required for most 482 applications.',
      },
    ],
  },

  'uae-golden-visa-criteria-expanded-2026': {
    metaTitle: 'UAE Golden Visa 2026: Freelancers & Content Creators Now Eligible | Visa Express Hub',
    metaDescription:
      'UAE expands 10-year Golden Visa to freelancers and social media influencers with 500K+ followers. Full eligibility criteria, required documents, and how to apply in Dubai in 2026.',
    keywords:
      'uae golden visa 2026, uae golden visa freelancer, content creator uae visa, uae 10 year visa 2026, golden visa eligibility 2026, uae residency visa 2026',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070',
    heroAlt: 'Dubai skyline representing UAE Golden Visa expansion 2026',
    category: 'Residency',
    categoryColor: '#d97706',
    country: 'UAE',
    countryCode: 'ae',
    flag: 'https://flagcdn.com/w40/ae.png',
    date: 'April 18, 2026',
    dateISO: '2026-04-18',
    readTime: '7',
    author: 'Visa Express Editorial',
    authorRole: 'UAE Residency Specialist',
    intro:
      'The UAE government has significantly broadened the 10-year Golden Visa programme, adding two major new eligibility categories: licensed freelance professionals and social media content creators with a verified following of 500,000 or more. This makes the UAE Golden Visa one of the most accessible long-term residency programmes in the world.',
    sections: [
      {
        heading: 'New Eligible Categories in 2026',
        body: `<ul>
          <li><strong>Freelancers:</strong> Holders of a valid UAE freelance permit issued by a free zone authority (e.g., Dubai Media City Freelance, TECOM, Fujairah Creative City) with annual earnings of AED 360,000+ documented over 2 consecutive years</li>
          <li><strong>Content Creators & Influencers:</strong> Social media accounts with a minimum of 500,000 verified followers on a single platform (Instagram, YouTube, TikTok or X). Accounts must be active with posts within the last 90 days and primarily English or Arabic content</li>
        </ul>`,
      },
      {
        heading: 'Existing Golden Visa Categories (For Reference)',
        body: `<ul>
          <li>Investors: AED 2 million+ in real estate or public investment</li>
          <li>Entrepreneurs: Approved UAE startup with minimum valuation AED 500,000</li>
          <li>Specialised Talents: Doctors, scientists, artists, athletes accredited by UAE bodies</li>
          <li>Outstanding Students: CGPA 3.75+ from UAE universities or top 100 global universities</li>
          <li>Humanitarian Pioneers: Approved by the Zayed Award committee</li>
        </ul>`,
      },
      {
        heading: 'Required Documents (Freelancers)',
        body: `<ol>
          <li>Valid UAE freelance permit (copy)</li>
          <li>Bank statements for 24 months showing AED 360,000 annual income</li>
          <li>Emirates ID (copy)</li>
          <li>Passport copy (valid 6+ months)</li>
          <li>Passport-size photo (white background)</li>
          <li>Health insurance (UAE-valid)</li>
        </ol>`,
      },
      {
        heading: 'How to Apply in Dubai',
        body: `Applications are submitted through the <strong>ICP Smart Services portal</strong> (icp.gov.ae) or in-person at an Amer Centre or DNRD typing centre. Processing time is typically <strong>5–10 working days</strong>. The total government fee is approximately AED 2,800. The Golden Visa sponsor dependency eliminates the need to be tied to an employer for residency, giving holders full freedom to work, invest, or freelance independently.`,
      },
    ],
    keyFacts: [
      { label: 'Validity', value: '10 years' },
      { label: 'Renewable', value: 'Yes (auto)' },
      { label: 'Min. Followers', value: '500K' },
      { label: 'Min. Freelance Income', value: 'AED 360K/yr' },
      { label: 'Processing Time', value: '5–10 days' },
      { label: 'Govt. Fee', value: '~AED 2,800' },
    ],
    relatedSlugs: [
      'germany-opportunity-card-launch-2026',
      'schengen-digital-nomad-visa-eu-2026',
      'uk-skilled-worker-salary-increase-2026',
    ],
    internalLinks: [
      { label: 'UAE Visa Services', href: '/visa' },
      { label: 'Document Checklist Generator', href: '/visa-resources/visa-checklist-generator' },
      { label: 'SOP & Cover Letter Tool', href: '/visa-resources/visa-document-generator' },
      { label: 'Embassy Directory UAE', href: '/visa-resources/embassy-directory' },
      { label: 'Visa News Hub', href: '/visa-news' },
    ],
    faq: [
      {
        q: 'Can I sponsor family members on the Golden Visa?',
        a: 'Yes. Golden Visa holders can sponsor spouses, children (any age if unmarried daughters or sons with special needs), and parents.',
      },
      {
        q: 'Does having 500K followers on multiple platforms count?',
        a: 'No. The current criteria require 500,000 verified followers on a single platform.',
      },
      {
        q: 'Can I keep my employment visa and apply for a Golden Visa simultaneously?',
        a: 'You must cancel your current residency before activating a Golden Visa, but you can apply while on an existing visa.',
      },
    ],
  },

  'germany-opportunity-card-launch-2026': {
    metaTitle: "Germany Opportunity Card (Chancenkarte) 2026: Apply Without a Job Offer | Visa Express Hub",
    metaDescription:
      "Germany's points-based Chancenkarte is now open to skilled workers worldwide. Who qualifies, how points are scored, income requirements, and how UAE residents apply in 2026.",
    keywords:
      'germany opportunity card 2026, chancenkarte 2026, germany job seeker visa, germany work visa without job offer, germany immigration UAE 2026, germany skilled worker visa',
    heroImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=2070',
    heroAlt: 'German city representing the Chancenkarte opportunity card 2026',
    category: 'New Visa Type',
    categoryColor: '#0d9488',
    country: 'Germany',
    countryCode: 'de',
    flag: 'https://flagcdn.com/w40/de.png',
    date: 'April 14, 2026',
    dateISO: '2026-04-14',
    readTime: '6',
    author: 'Visa Express Editorial',
    authorRole: 'EU Immigration Specialist',
    intro:
      "Germany's Chancenkarte (Opportunity Card) marks a paradigm shift in German immigration policy — skilled workers can now move to Germany for up to 12 months to search for employment without needing a job offer in hand. The card is awarded based on a points system and has opened a practical new pathway for UAE-based professionals.",
    sections: [
      {
        heading: 'What Is the Chancenkarte?',
        body: `The Chancenkarte is a <strong>job-seeker visa</strong> introduced under Germany's Skilled Immigration Act reform. It allows qualified workers from non-EU countries to travel to Germany, secure accommodation, attend job interviews and trial employment periods for up to 12 months. Holders may work up to 20 hours per week during the job-search period.`,
      },
      {
        heading: 'Points System Explained',
        body: `Applicants must score at least <strong>6 points</strong> from the following criteria:
        <ul>
          <li>Recognised German or comparable foreign qualification: <strong>4 points</strong></li>
          <li>5+ years professional experience in the relevant field: <strong>3 points</strong></li>
          <li>B2 German language proficiency: <strong>3 points</strong></li>
          <li>A1 German language proficiency: <strong>1 point</strong></li>
          <li>Under 35 years of age: <strong>2 points</strong></li>
          <li>Previous stay or work experience in Germany: <strong>1 point</strong></li>
          <li>Spouse with qualifying skills (applying jointly): <strong>1 point</strong></li>
        </ul>`,
      },
      {
        heading: 'Financial Requirements',
        body: `You must demonstrate sufficient funds to support yourself during your stay without relying on state benefits. The requirement is approximately <strong>€5,604 per year</strong> (equivalent to the German standard rate), evidenced through a blocked account, bank statement, or a declaration of commitment from a guarantor in Germany.`,
      },
      {
        heading: 'Applying from UAE',
        body: `Submit your Chancenkarte application at the <strong>German Embassy in Abu Dhabi</strong> or the <strong>German Consulate General in Dubai</strong>. Appointments can be booked via the embassy portal. Required documents include your degree certificate (translated and certified), employment history, language certificate, proof of funds, biometric passport photos, and completed application forms. Processing time is currently <strong>8–12 weeks</strong>.`,
      },
    ],
    keyFacts: [
      { label: 'Validity', value: '12 months' },
      { label: 'Min. Points Required', value: '6 points' },
      { label: 'Work Allowance', value: '20 hrs/week' },
      { label: 'Min. Funds', value: '€5,604' },
      { label: 'Processing Time', value: '8–12 weeks' },
      { label: 'Language Req.', value: 'A1 min. (B2 preferred)' },
    ],
    relatedSlugs: [
      'schengen-digital-nomad-visa-eu-2026',
      'schengen-visa-fee-increase-2026',
      'uk-skilled-worker-salary-increase-2026',
    ],
    internalLinks: [
      { label: 'Work Visa Guide', href: '/visa/work-visa' },
      { label: 'Schengen Visa 2026', href: '/schengen-visa' },
      { label: 'Document Checklist Generator', href: '/visa-resources/visa-checklist-generator' },
      { label: 'SOP & Cover Letter Tool', href: '/visa-resources/visa-document-generator' },
      { label: 'Embassy Directory UAE', href: '/visa-resources/embassy-directory' },
    ],
    faq: [
      {
        q: 'Do I need to speak German to apply for the Chancenkarte?',
        a: 'A minimum of A1 German earns 1 point. However, most applicants need at least B2 (3 points) combined with other criteria to reach the 6-point minimum.',
      },
      {
        q: 'Can I convert a Chancenkarte into a full work visa?',
        a: 'Yes. Once you secure a job offer, you can apply for a full Skilled Worker residence permit (§18a AufenthG) from within Germany without leaving.',
      },
      {
        q: 'Does my UAE work experience count?',
        a: 'Yes, provided your profession is recognized under the German Skilled Immigration Act. Engineering, IT, medical and many other fields are directly covered.',
      },
    ],
  },

  'usa-h1b-visa-lottery-2026-results': {
    metaTitle: 'USA H-1B Visa Lottery 2026 Results: 780,000 Registrations, 65,000 Slots | Visa Express Hub',
    metaDescription:
      '780,000 H-1B registrations for 65,000 cap-subject slots in 2026. Full selection statistics, cap-exempt alternatives and 5 legal pathways for UAE professionals who were not selected.',
    keywords:
      'h1b visa lottery 2026, uscis h1b results 2026, h1b cap 2026, h1b alternatives, usa work visa UAE, usa immigration 2026, h1b not selected what to do',
    heroImage: 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2099',
    heroAlt: 'New York skyline representing USA H-1B visa 2026',
    category: 'Work Permit',
    categoryColor: '#b91c1c',
    country: 'USA',
    countryCode: 'us',
    flag: 'https://flagcdn.com/w40/us.png',
    date: 'April 10, 2026',
    dateISO: '2026-04-10',
    readTime: '8',
    author: 'Visa Express Editorial',
    authorRole: 'US Immigration Analyst',
    intro:
      "USCIS has confirmed 780,000 H-1B registrations for the FY2026 cap — the second-highest on record — competing for just 65,000 cap-subject slots plus 20,000 US Master's cap exemptions. The selection probability was approximately 11%. If you were not selected, here are your best legal alternatives.",
    sections: [
      {
        heading: 'FY2026 H-1B Lottery Statistics',
        body: `<ul>
          <li><strong>Total registrations:</strong> 780,884</li>
          <li><strong>Regular cap slots:</strong> 65,000</li>
          <li><strong>US Master's cap slots:</strong> 20,000</li>
          <li><strong>Total ITAs issued:</strong> ~110,000 (including reserves)</li>
          <li><strong>Selection probability (regular cap):</strong> ~8.3%</li>
          <li><strong>Selection probability (Master's cap):</strong> ~14.1%</li>
        </ul>`,
      },
      {
        heading: '5 Alternatives If You Were Not Selected',
        body: `<ol>
          <li><strong>O-1A Visa (Extraordinary Ability):</strong> No lottery. If you have national/international recognition in your field — awards, publications, press — you may qualify. Processing time 2–3 months.</li>
          <li><strong>L-1 Intracompany Transfer:</strong> If your UAE employer has a US affiliate or subsidiary, you may be transferred as a manager, executive or specialised knowledge worker.</li>
          <li><strong>EB-1A / EB-2 NIW (Self-Petition PR):</strong> Extraordinary ability or National Interest Waiver routes to US green card without employer sponsorship.</li>
          <li><strong>Cap-Exempt H-1B:</strong> Universities, non-profits affiliated with research, and government research organisations are exempt from the cap.</li>
          <li><strong>TN Visa (for Canadians & Mexicans):</strong> USMCA professionals qualify for a work visa with no cap or lottery — but requires Canadian or Mexican citizenship.</li>
        </ol>`,
      },
      {
        heading: 'Preparing for FY2027 Registration',
        body: `FY2027 registration opens in March 2026. Key preparation steps: ensure your employer updates your registration profile with your latest degree and employer EIN, consider acquiring a US Master's degree (boosts lottery odds by 6–8%), and explore multiple employer registrations if you are in discussions with more than one US sponsor.`,
      },
    ],
    keyFacts: [
      { label: 'Registrations', value: '780,884' },
      { label: 'Regular Cap', value: '65,000' },
      { label: 'MS Cap', value: '20,000' },
      { label: 'Selection Rate', value: '~11%' },
      { label: 'Filing Period', value: 'Apr–Jun 2026' },
      { label: 'Visa Start Date', value: 'Oct 1, 2026' },
    ],
    relatedSlugs: [
      'uk-skilled-worker-salary-increase-2026',
      'canada-express-entry-healthcare-draw-2026',
      'australia-482-visa-processing-time-2026',
    ],
    internalLinks: [
      { label: 'USA Visa Guide', href: '/visa/tourist-visa/usa' },
      { label: 'Work Visa Options', href: '/visa/work-visa' },
      { label: 'Document Checklist Generator', href: '/visa-resources/visa-checklist-generator' },
      { label: 'SOP & Cover Letter Tool', href: '/visa-resources/visa-document-generator' },
      { label: 'Processing Time Tracker', href: '/visa-processing-time-tracker' },
    ],
    faq: [
      {
        q: 'Can I re-register in FY2027 even if selected but withdrawn in FY2026?',
        a: 'Yes. USCIS allows re-registration each fiscal year. Prior selection does not affect future lottery eligibility.',
      },
      {
        q: 'Can UAE employers sponsor H-1B visas?',
        a: 'Only US-based entities registered with USCIS can petition for H-1B. Your UAE employer must have a US subsidiary or affiliate to sponsor you directly.',
      },
      {
        q: 'Is the O-1A a realistic alternative to H-1B?',
        a: 'For senior professionals with provable achievements — publications, significant salary, press coverage, or industry awards — yes. It has no cap and is adjudicated on merit.',
      },
    ],
  },

  'schengen-visa-fee-increase-2026': {
    metaTitle: 'Schengen Visa Fee Rises to €90 in 2026: Impact on UAE Applicants | Visa Express Hub',
    metaDescription:
      'Schengen short-stay visa fee increases to €90 from €80 for the first time since 2014. Full fee breakdown by applicant category, refund rules and whether higher fees speed up processing.',
    keywords:
      'schengen visa fee 2026, schengen visa cost UAE, europe visa fee increase, €90 schengen visa, schengen application fee dubai, europe visa 2026',
    heroImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020',
    heroAlt: 'Paris representing Schengen visa fee increase 2026',
    category: 'Fee Change',
    categoryColor: '#7c3aed',
    country: 'Schengen Area',
    countryCode: 'eu',
    flag: 'https://flagcdn.com/w40/eu.png',
    date: 'April 5, 2026',
    dateISO: '2026-04-05',
    readTime: '4',
    author: 'Visa Express Editorial',
    authorRole: 'Schengen Visa Specialist',
    intro:
      'The European Commission has raised the Schengen short-stay (C visa) application fee to €90 — an increase of €10 from the previous €80 rate in force since 2014. The change took effect on June 11, 2024 and applies to all UAE applicants aged 12 and above.',
    sections: [
      {
        heading: 'Full Fee Table by Applicant Category',
        body: `<ul>
          <li><strong>Adults (12+):</strong> €90</li>
          <li><strong>Children aged 6–11:</strong> €45</li>
          <li><strong>Children under 6:</strong> Free</li>
          <li><strong>Close relatives of EU citizens:</strong> Free (Directive 2004/38/EC)</li>
          <li><strong>School pupils, students, postgraduate students and accompanying teachers:</strong> €45</li>
          <li><strong>Researchers:</strong> €45</li>
          <li><strong>Representatives of non-profit organisations aged 25 and under:</strong> €45</li>
        </ul>`,
      },
      {
        heading: 'Does Paying €90 Mean a Faster Decision?',
        body: `No. The fee change does not create a priority track. All standard Schengen applications continue to be processed within the <strong>15-day standard window</strong> (extendable to 45 days in complex cases or during peak seasons). The fee is a government processing charge — not a service-level payment.`,
      },
      {
        heading: 'Refund Policy',
        body: `Visa fees are <strong>non-refundable</strong> in most cases, even if the visa is refused. The exceptions are: (1) applications submitted by mistake that are returned before processing, and (2) citizens of countries with visa facilitation agreements that include fee waiver provisions. UAE nationals do not currently benefit from a fee waiver agreement with the EU.`,
      },
      {
        heading: 'VFS Global Service Fee in Dubai',
        body: `In addition to the €90 consular fee, VFS Global charges a separate <strong>service fee of approximately AED 50–75</strong> per application for biometric collection, document scanning and courier return. This VFS fee has remained unchanged following the EU fee increase.`,
      },
    ],
    keyFacts: [
      { label: 'New Fee (Adult)', value: '€90' },
      { label: 'Previous Fee', value: '€80' },
      { label: 'Children (6–11)', value: '€45' },
      { label: 'Under 6', value: 'Free' },
      { label: 'Last Change Before', value: '2014' },
      { label: 'Standard Processing', value: '15 days' },
    ],
    relatedSlugs: [
      'schengen-digital-nomad-visa-eu-2026',
      'germany-opportunity-card-launch-2026',
      'uk-skilled-worker-salary-increase-2026',
    ],
    internalLinks: [
      { label: 'Schengen Visa Guide 2026', href: '/schengen-visa' },
      { label: 'Europe Visa for UAE Residents', href: '/visa/tourist-visa/europe' },
      { label: 'Document Checklist Generator', href: '/visa-resources/visa-checklist-generator' },
      { label: 'Embassy Directory UAE', href: '/visa-resources/embassy-directory' },
      { label: 'Processing Time Tracker', href: '/visa-processing-time-tracker' },
    ],
    faq: [
      {
        q: 'Is the €90 fee the same at all Schengen embassies in Dubai?',
        a: 'Yes. The €90 consular fee is harmonised across all Schengen embassies and consulates worldwide. Only the VFS service fee may vary slightly by embassy contract.',
      },
      {
        q: 'Can I pay the Schengen visa fee in AED in Dubai?',
        a: 'Yes. VFS Global and most consulates accept AED payment at the prevailing exchange rate on the day of application.',
      },
      {
        q: 'Has the multi-entry visa fee also increased?',
        a: 'There is no separate fee for multi-entry Schengen visas. The €90 applies to all C-visa applications regardless of number of entries granted.',
      },
    ],
  },
};

/* ─────────────────────────────────────────────────────────────
   DYNAMIC METADATA EXPORT
───────────────────────────────────────────────────────────── */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const content = ARTICLE_CONTENT[slug];
  const post = VISA_NEWS.find(p => p.slug === slug);

  if (!content || !post) {
    return {
      title: 'Visa News | Visa Express Hub',
      description: 'Latest visa and immigration news for UAE residents.',
    };
  }

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: content.keywords,
    alternates: {
      canonical: `https://www.visaexpresshub.ae/visa-news/${slug}`,
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: `https://www.visaexpresshub.ae/visa-news/${slug}`,
      siteName: 'Visa Express Hub',
      images: [{ url: content.heroImage, width: 1200, height: 630, alt: content.heroAlt }],
      locale: 'en_AE',
      type: 'article',
      publishedTime: content.dateISO,
      authors: ['https://www.visaexpresshub.ae/about'],
      section: content.category,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metaTitle,
      description: content.metaDescription,
      images: [content.heroImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-snippet': -1,
        'max-image-preview': 'large',
        'max-video-preview': -1,
      },
    },
  };
}

/* ─────────────────────────────────────────────────────────────
   GENERATE STATIC PARAMS (for static export / ISR)
───────────────────────────────────────────────────────────── */
export async function generateStaticParams() {
  return VISA_NEWS.map(post => ({ slug: post.slug }));
}

/* ─────────────────────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────────────────────── */
function CategoryBadge({ category, color }) {
  return (
    <span
      className="inline-flex items-center font-black uppercase tracking-widest text-[10px] px-3.5 py-1.5 rounded-full"
      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
    >
      {category}
    </span>
  );
}

function KeyFactsGrid({ facts }) {
  return (
    <div className="my-10 bg-slate-50 border border-slate-200 rounded-3xl p-6">
      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5">Key Facts at a Glance</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {facts.map(f => (
          <div key={f.label} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{f.label}</p>
            <p className="text-xl font-black text-slate-900 leading-tight">{f.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FAQSection({ items }) {
  return (
    <div className="my-12">
      <h2 className="text-3xl font-black uppercase tracking-tight mb-6 text-slate-900">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {items.map((item, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <p className="font-black text-slate-900 mb-2 text-base" itemProp="name">{item.q}</p>
            <div itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <p className="text-slate-500 text-sm leading-relaxed font-medium" itemProp="text">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RelatedArticles({ slugs }) {
  const posts = slugs.map(s => VISA_NEWS.find(p => p.slug === s)).filter(Boolean);
  if (!posts.length) return null;
  return (
    <div className="mt-12">
      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6 flex items-center gap-3">
        <span className="flex-1 h-px bg-slate-200" />
        Related Articles
        <span className="flex-1 h-px bg-slate-200" />
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {posts.map(post => (
          <Link key={post.id} href={`/visa-news/${post.slug}`} className="group block rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-36 overflow-hidden">
              <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={post.title} />
            </div>
            <div className="p-4">
              <span
                className="inline-block text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full mb-2"
                style={{ background: `${post.categoryColor}18`, color: post.categoryColor, border: `1px solid ${post.categoryColor}30` }}
              >
                {post.category}
              </span>
              <p className="text-sm font-black text-slate-800 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">{post.title}</p>
              <p className="text-[10px] text-slate-400 font-bold mt-1.5">{post.date}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function InternalLinksPanel({ links }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-3xl p-6 mb-6">
      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-600 mb-4">Useful Resources</p>
      <div className="space-y-1.5">
        {links.map(l => (
          <Link key={l.href} href={l.href}
            className="flex items-center justify-between text-sm font-bold text-amber-800 hover:text-amber-900 py-2 border-b border-amber-100 last:border-0 transition-colors">
            {l.label}
            <span className="text-amber-400 font-black">›</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────────────────────── */
export default async function NewsDetailPage({ params }) {
  const { slug } = await params;
  const content = ARTICLE_CONTENT[slug];
  const post = VISA_NEWS.find(p => p.slug === slug);

  if (!content || !post) notFound();

  /* JSON-LD: Article + BreadcrumbList + FAQPage */
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: content.metaTitle,
    description: content.metaDescription,
    image: content.heroImage,
    datePublished: content.dateISO,
    dateModified: content.dateISO,
    author: {
      '@type': 'Organization',
      name: 'Visa Express Hub',
      url: 'https://www.visaexpresshub.ae',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Visa Express Hub',
      logo: { '@type': 'ImageObject', url: 'https://www.visaexpresshub.ae/logo.png' },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.visaexpresshub.ae/visa-news/${slug}`,
    },
    keywords: content.keywords,
    articleSection: content.category,
    inLanguage: 'en-AE',
    isAccessibleForFree: true,
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.visaexpresshub.ae' },
      { '@type': 'ListItem', position: 2, name: 'Visa News', item: 'https://www.visaexpresshub.ae/visa-news' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.visaexpresshub.ae/visa-news/${slug}` },
    ],
  };

  const faqJsonLd = content.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: content.faq.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }
    : null;

  return (
    <>
      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />}

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b border-slate-100 px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-400 font-semibold flex-wrap">
          <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/visa-news" className="hover:text-amber-600 transition-colors">Visa News</Link>
          <span>›</span>
          <span className="text-slate-700 font-bold line-clamp-1 max-w-xs">{post.title}</span>
        </div>
      </nav>

      <div className="min-h-screen bg-[#f9fafb]">
        {/* ── HERO IMAGE ── */}
        <div className="relative h-[480px] md:h-[580px] w-full overflow-hidden">
          <img
            src={content.heroImage}
            className="w-full h-full object-cover"
            alt={content.heroAlt}
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

          {/* Hero top badges */}
          <div className="absolute top-8 left-6 right-6 flex items-center justify-between">
            <CategoryBadge category={content.category} color={content.categoryColor} />
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5">
              <img src={content.flag} width={20} height={14} className="object-contain rounded" alt={content.country} />
              <span className="text-white text-[10px] font-black uppercase tracking-wider">{content.country}</span>
            </div>
          </div>

          {/* Hero title overlay */}
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10 max-w-5xl">
            <div className="flex items-center gap-3 mb-4">
              <time className="text-white/60 text-xs font-bold uppercase tracking-widest" dateTime={content.dateISO}>
                {content.date}
              </time>
              <span className="w-1 h-1 rounded-full bg-white/30" />
              <span className="text-white/60 text-xs font-bold uppercase">{content.readTime} min read</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-[1.07] tracking-tight">
              {post.title}
            </h1>
          </div>
        </div>

        {/* ── MAIN CONTENT + SIDEBAR ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* ── ARTICLE BODY ── */}
            <article
              className="lg:col-span-8"
              itemScope itemType="https://schema.org/NewsArticle"
            >
              <meta itemProp="datePublished" content={content.dateISO} />
              <meta itemProp="author" content="Visa Express Hub Editorial" />
              <meta itemProp="image" content={content.heroImage} />

              {/* Author strip */}
              <div className="flex items-center gap-4 mb-8 bg-white border border-slate-100 rounded-2xl px-5 py-4 shadow-sm">
                <div className="w-11 h-11 bg-amber-400 rounded-full flex items-center justify-center font-black text-slate-900 text-sm shrink-0">VE</div>
                <div>
                  <p className="text-sm font-black text-slate-900 uppercase tracking-tighter">{content.author}</p>
                  <p className="text-xs text-slate-400 font-bold">{content.authorRole}</p>
                </div>
                <div className="ml-auto text-right hidden sm:block">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Published</p>
                  <time className="text-xs font-bold text-slate-700" dateTime={content.dateISO}>{content.date}</time>
                </div>
              </div>

              {/* Intro */}
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-slate-500 italic border-l-4 border-amber-400 pl-6 mb-8" itemProp="description">
                {content.intro}
              </p>

              {/* Key facts */}
              <KeyFactsGrid facts={content.keyFacts} />

              {/* Article sections */}
              <div className="space-y-8 text-slate-800" itemProp="articleBody">
                {content.sections.map((section, i) => (
                  <section key={i}>
                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-slate-900 mb-4 pt-2">
                      {section.heading}
                    </h2>
                    <div
                      className="text-base leading-relaxed space-y-4 prose-ul:pl-5 prose-li:mb-2 prose-ol:pl-5 [&_ul]:list-disc [&_ul]:pl-5 [&_ul_li]:mb-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol_li]:mb-2 [&_strong]:font-black [&_strong]:text-slate-900"
                      dangerouslySetInnerHTML={{ __html: section.body }}
                    />
                  </section>
                ))}
              </div>

              {/* Callout / disclaimer */}
              <div className="my-10 bg-amber-50 border-l-8 border-amber-400 p-7 rounded-r-3xl">
                <h4 className="font-black uppercase text-xs text-amber-700 mb-2 tracking-widest">Important Notice</h4>
                <p className="text-sm font-medium text-amber-900 leading-relaxed">
                  Immigration rules change frequently. The information above reflects our best knowledge as of {content.date}. Always verify current requirements directly with the relevant embassy, consulate or immigration authority before submitting any application.{' '}
                  <Link href="/contact" className="underline font-bold hover:text-amber-700">Book a free consultation</Link> with our Dubai team for personalised guidance.
                </p>
              </div>

              {/* FAQ */}
              {content.faq?.length > 0 && (
                <div itemScope itemType="https://schema.org/FAQPage">
                  <FAQSection items={content.faq} />
                </div>
              )}

              {/* Internal links block */}
              <div className="mt-10 bg-white border border-slate-200 rounded-3xl p-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-5">Related Visa Guides</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Schengen Visa Guide', href: '/schengen-visa', icon: '🇪🇺' },
                    { label: 'UK Work Visa', href: '/visa/work-visa', icon: '🇬🇧' },
                    { label: 'Canada PR Guide', href: '/visa/tourist-visa/canada', icon: '🇨🇦' },
                    { label: 'Australia Visa', href: '/visa/tourist-visa/australia', icon: '🇦🇺' },
                    { label: 'USA Visa Guide', href: '/visa/tourist-visa/usa', icon: '🇺🇸' },
                    { label: 'Document Checklist', href: '/visa-resources/visa-checklist-generator', icon: '📋' },
                    { label: 'Processing Tracker', href: '/visa-processing-time-tracker', icon: '⏱️' },
                    { label: 'Embassy Directory', href: '/visa-resources/embassy-directory', icon: '🏛️' },
                  ].map(l => (
                    <Link key={l.href} href={l.href}
                      className="flex items-center gap-2.5 p-3 bg-slate-50 border border-slate-100 rounded-2xl hover:border-amber-300 hover:bg-amber-50 group transition-all">
                      <span className="text-base">{l.icon}</span>
                      <span className="text-xs font-bold text-slate-600 group-hover:text-amber-700 transition-colors leading-tight">{l.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Related articles */}
              <RelatedArticles slugs={content.relatedSlugs} />
            </article>

            {/* ── SIDEBAR ── */}
            <aside className="lg:col-span-4 space-y-8">

              {/* CTA */}
              <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(251,191,36,1)] border border-slate-800 sticky top-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-400 mb-2">Free Consultation</p>
                <h4 className="text-2xl font-black uppercase leading-tight mb-3">Expert<br />Visa Advice</h4>
                <p className="text-sm text-slate-400 font-medium mb-6 leading-relaxed">
                  Need help with your {content.country} visa? Our Dubai consultants provide step-by-step guidance tailored to your profile.
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

              {/* Dynamic internal links */}
              <InternalLinksPanel links={content.internalLinks} />

              {/* Tags */}
              <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-4">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Link key={tag} href={`/visa-news?tag=${encodeURIComponent(tag)}`}
                      className="text-xs font-bold text-slate-500 bg-slate-100 hover:bg-amber-100 hover:text-amber-700 rounded-full px-3 py-1.5 transition-colors">
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Recent posts */}
              <div className="bg-white border border-slate-100 rounded-3xl p-7 shadow-sm">
                <h5 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 mb-5 pb-3 border-b border-slate-100">
                  Latest Posts
                </h5>
                <div className="space-y-4">
                  {VISA_NEWS.filter(p => p.slug !== slug).slice(0, 5).map(p => (
                    <Link key={p.id} href={`/visa-news/${p.slug}`} className="group flex items-start gap-3">
                      <div className="w-14 h-10 rounded-xl overflow-hidden shrink-0">
                        <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" alt="" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-700 group-hover:text-amber-600 transition-colors line-clamp-2 leading-snug">{p.title}</p>
                        <p className="text-[10px] text-slate-400 font-semibold mt-1">{p.date}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

            </aside>
          </div>
        </div>

        {/* ── BOTTOM CTA ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <div className="bg-amber-400 rounded-[2.5rem] p-12 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-amber-700 mb-3">Visa Express Hub · Dubai</p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
              Ready to Apply for Your<br />{content.country} Visa?
            </h2>
            <p className="text-amber-800 font-medium text-base max-w-md mx-auto mb-8 leading-relaxed">
              Our Dubai-based consultants handle your entire application — from document preparation to embassy submission.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact"
                className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:bg-slate-700 transition-colors shadow-xl">
                Book Free Consultation →
              </Link>
              <Link href="/visa-news"
                className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold text-sm border border-slate-200 hover:bg-slate-50 transition-colors">
                ← More Visa News
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}