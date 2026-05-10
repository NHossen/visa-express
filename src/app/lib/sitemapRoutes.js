import { createSlug } from './utils';

const BASE_URL = 'https://visaexpresshub.com';
const PROCESSING_TYPES = ['sticker', 'e-visa', 'transit', 'sticker-extended'];
const REJECTION_TYPES  = ['tourist', 'student', 'work', 'transit', 'business', 'family'];
export const CHUNK_SIZE = 50_000;

function fmt(path, priority = 0.7, changeFreq = 'monthly') {
  return {
    url: `${BASE_URL}${path}`,
    priority,
    changeFreq,
    lastmod: new Date().toISOString(),
  };
}

function getStaticRoutes() {
  return [
    ['/', 1.0, 'daily'],
    ['/visa', 0.95, 'daily'],
    ['/visa/tourist-visa', 0.9, 'daily'],
    ['/visa/work-visa', 0.9, 'weekly'],
    ['/visa/student-visa', 0.9, 'weekly'],
    ['/visa/transit-visa', 0.9, 'weekly'],
    ['/visa/e-visa', 0.9, 'weekly'],
    ['/visa/business-visa', 0.9, 'weekly'],
    ['/visa-processing-time-tracker', 0.85, 'weekly'],
    ['/visa-resources', 0.8, 'weekly'],
    ['/visa-resources/visa-checklist', 0.7, 'monthly'],
    ['/visa-resources/visa-checklist-generator', 0.7, 'monthly'],
    ['/visa-resources/visa-document-generator', 0.7, 'monthly'],
    ['/visa-rejection', 0.8, 'weekly'],
    ['/visa-news', 0.85, 'daily'],
    ['/scholarships', 0.85, 'weekly'],
    ['/schengen-visa', 0.9, 'weekly'],
    ['/visa-api', 0.6, 'monthly'],
    ['/contact', 0.7, 'monthly'],
    ['/terms', 0.4, 'yearly'],
    ['/privacy-policy', 0.4, 'yearly'],
    ['/disclaimer', 0.4, 'yearly'],
    ['/auth', 0.3, 'yearly'],
  ].map(([path, priority, changeFreq]) => fmt(path, priority, changeFreq));
}

export function getTotalRouteCount(countries) {
  const n = countries.length;
  const pairs = n * (n - 1);
  return (
    getStaticRoutes().length +
    n +                                 // tourist-visa/[slug]
    pairs +                             // [origin]-to-[dest]
    pairs +                             // work-visa
    n +                                 // transit-visa/[slug]
    pairs +                             // e-visa
    pairs * PROCESSING_TYPES.length +   // processing tracker
    pairs * REJECTION_TYPES.length +    // rejection
    n +                                 // scholarships
    n +                                 // business-visa
    n +                                 // dubai-residents
    n +                                 // ghana
    n +                                 // india
    n +                                 // nigeria
    n                                   // student-visa
  );
}

export function buildRoutesForChunk(countries, chunkIndex) {
  const start = chunkIndex * CHUNK_SIZE;
  const end   = start + CHUNK_SIZE;
  const result = [];
  let cursor = 0;

  const slugs = countries.map(c => ({ slug: createSlug(c.country) }));

  function add(route) {
    if (cursor >= start && cursor < end) result.push(route);
    cursor++;
    return cursor >= end;
  }

  // Section 1: Static
  for (const r of getStaticRoutes()) {
    if (add(r)) return result;
  }

  // Section 2: /visa/tourist-visa/[slug]
  for (const { slug } of slugs) {
    if (add(fmt(`/visa/tourist-visa/${slug}`, 0.85, 'weekly'))) return result;
  }

  // Section 3: /visa/[origin]-to-[dest]
  for (const origin of slugs) {
    for (const dest of slugs) {
      if (origin.slug === dest.slug) continue;
      if (add(fmt(`/visa/${origin.slug}-to-${dest.slug}`, 0.8, 'weekly'))) return result;
    }
  }

  // Section 4: /visa/work-visa/[nat]-work-visa-for-[dest]
  for (const nat of slugs) {
    for (const dest of slugs) {
      if (nat.slug === dest.slug) continue;
      if (add(fmt(`/visa/work-visa/${nat.slug}-work-visa-for-${dest.slug}`, 0.75, 'monthly'))) return result;
    }
  }

  // Section 5: /visa/transit-visa/[slug]
  for (const { slug } of slugs) {
    if (add(fmt(`/visa/transit-visa/${slug}`, 0.75, 'monthly'))) return result;
  }

  // Section 6: /visa/e-visa/[nat]-national-e-visa-requirements-for-[dest]
  for (const nat of slugs) {
    for (const dest of slugs) {
      if (nat.slug === dest.slug) continue;
      if (add(fmt(
        `/visa/e-visa/${nat.slug}-national-e-visa-requirements-for-${dest.slug}`,
        0.75, 'monthly'
      ))) return result;
    }
  }

  // Section 7: processing tracker — MUST use ?type= query string
  // ✅ /visa-processing-time-tracker/albania-national-visa-processing-time-for-canada?type=sticker
  for (const nat of slugs) {
    for (const dest of slugs) {
      if (nat.slug === dest.slug) continue;
      for (const type of PROCESSING_TYPES) {
        if (add(fmt(
          `/visa-processing-time-tracker/${nat.slug}-national-visa-processing-time-for-${dest.slug}?type=${type}`,
          0.7, 'monthly'
        ))) return result;
      }
    }
  }

  // Section 8: rejection — MUST use ?type= query string
  // ✅ /visa-rejection/albania-visa-rejection-rate-for-algeria?type=student
  for (const nat of slugs) {
    for (const dest of slugs) {
      if (nat.slug === dest.slug) continue;
      for (const type of REJECTION_TYPES) {
        if (add(fmt(
          `/visa-rejection/${nat.slug}-visa-rejection-rate-for-${dest.slug}?type=${type}`,
          0.7, 'monthly'
        ))) return result;
      }
    }
  }

  // Section 9: /scholarships/[slug]
  for (const { slug } of slugs) {
    if (add(fmt(`/scholarships/${slug}`, 0.75, 'monthly'))) return result;
  }

  // Section 10: /visa/business-visa/[slug]
  for (const { slug } of slugs) {
    if (add(fmt(`/visa/business-visa/${slug}`, 0.85, 'weekly'))) return result;
  }

  // Section 11: /visa/dubai-residents/[slug]
  for (const { slug } of slugs) {
    if (add(fmt(`/visa/dubai-residents/${slug}`, 0.8, 'monthly'))) return result;
  }

  // Section 12: /visa/ghana/[slug]
  for (const { slug } of slugs) {
    if (add(fmt(`/visa/ghana/${slug}`, 0.8, 'monthly'))) return result;
  }

  // Section 13: /visa/india/[slug]
  for (const { slug } of slugs) {
    if (add(fmt(`/visa/india/${slug}`, 0.85, 'monthly'))) return result;
  }

  // Section 14: /visa/nigeria/[slug]
  for (const { slug } of slugs) {
    if (add(fmt(`/visa/nigeria/${slug}`, 0.8, 'monthly'))) return result;
  }

  // Section 15: /visa/student-visa/[slug]
  for (const { slug } of slugs) {
    if (add(fmt(`/visa/student-visa/${slug}`, 0.85, 'weekly'))) return result;
  }

  return result;
}