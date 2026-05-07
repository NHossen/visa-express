// /app/lib/sitemapRoutes.js
import { createSlug } from './utils';

const BASE_URL = 'https://www.visaexpresshub.com';
const BUILD_TIME = new Date().toISOString();
const PROCESSING_TYPES = ['sticker', 'e-visa', 'transit', 'sticker-extended'];
const REJECTION_TYPES  = ['tourist', 'student', 'work', 'transit', 'business', 'family'];

function fmt(path, priority = 0.7, changeFreq = 'monthly') {
  return {
    url: `${BASE_URL}${path}`,
    priority,
    changeFreq,
    lastmod: BUILD_TIME,
  };
}

export function buildAllRoutes(countries) {
  const slugs = countries.map(c => ({
    name: c.country,
    slug: createSlug(c.country),
    flag: c.flag,
    code: c.code,
  }));

  const routes = [];

  // ── Static pages ────────────────────────────────────────────────────────────
  const statics = [
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
  ];

  statics.forEach(([path, priority, changeFreq]) =>
    routes.push(fmt(path, priority, changeFreq))
  );

  // ── Per-country: /visa/tourist-visa/[slug] ─────────────────────────────────
  slugs.forEach(({ slug }) => {
    routes.push(fmt(`/visa/tourist-visa/${slug}`, 0.85, 'weekly'));
  });

  // ── Per-country: /visa/[origin]-to-[dest] ─────────────────────────────────
  // Route: /visa/${createSlug(originName)}-to-${createSlug(destName)}
  slugs.forEach(origin => {
    slugs.forEach(dest => {
      if (origin.slug !== dest.slug) {
        routes.push(fmt(`/visa/${origin.slug}-to-${dest.slug}`, 0.8, 'weekly'));
      }
    });
  });

  // ── /visa/work-visa/[slug] ─────────────────────────────────────────────────
  // Note: nFlag & dFlag are UI params, not part of the canonical URL for SEO.
  // Sitemap should list canonical URLs without query strings.
  slugs.forEach(nat => {
    slugs.forEach(dest => {
      if (nat.slug !== dest.slug) {
        routes.push(
          fmt(
            `/visa/work-visa/${nat.slug}-work-visa-for-${dest.slug}`,
            0.75,
            'monthly'
          )
        );
      }
    });
  });

  // ── /visa/transit-visa/[slug] ──────────────────────────────────────────────
  slugs.forEach(({ slug }) => {
    routes.push(fmt(`/visa/transit-visa/${slug}`, 0.75, 'monthly'));
  });

  // ── /visa/e-visa/[slug] ────────────────────────────────────────────────────
  // Route: /visa/e-visa/${natSlug}-national-e-visa-requirements-for-${destSlug}
  slugs.forEach(nat => {
    slugs.forEach(dest => {
      if (nat.slug !== dest.slug) {
        routes.push(
          fmt(
            `/visa/e-visa/${nat.slug}-national-e-visa-requirements-for-${dest.slug}`,
            0.75,
            'monthly'
          )
        );
      }
    });
  });

  // ── /visa-processing-time-tracker/[slug]?type=[visaType] ──────────────────
  // Note: Query params (?type=) are included as Google does index them
  // when they change content. Use canonical tags on the page too.
  slugs.forEach(nat => {
    slugs.forEach(dest => {
      if (nat.slug !== dest.slug) {
       PROCESSING_TYPES.forEach(type => {
  routes.push(
    fmt(
      `/visa-processing-time-tracker/${nat.slug}-to-${dest.slug}?type=${type}`,
              0.7,
              'monthly'
            )
          );
        });
      }
    });
  });

// ── /visa-rejection/[nat]-visa-rejection-rate-for-[dest]?type=[visaType] ───
slugs.forEach(nat => {
  slugs.forEach(dest => {
    if (nat.slug !== dest.slug) {
      REJECTION_TYPES.forEach(type => {
  routes.push(
    fmt(
      `/visa-rejection/${nat.slug}-visa-rejection-rate-for-${dest.slug}?type=${type}`,
            0.7,
            'monthly'
          )
        );
      });
    }
  });
});

  // ── /scholarships/[slug] ───────────────────────────────────────────────────
  slugs.forEach(({ slug }) => {
    routes.push(fmt(`/scholarships/${slug}`, 0.75, 'monthly'));
  });
  // ── ADD THESE NEW BLOCKS ───────────────────────────────────────────────────

  // 1. /visa/business-visa/[slug]
  slugs.forEach(({ slug }) => {
    routes.push(fmt(`/visa/business-visa/${slug}`, 0.85, 'weekly'));
  });

  // 2. /visa/dubai-residents/[slug]
  slugs.forEach(({ slug }) => {
    routes.push(fmt(`/visa/dubai-residents/${slug}`, 0.8, 'monthly'));
  });

  // 3. /visa/ghana/[slug]
  slugs.forEach(({ slug }) => {
    routes.push(fmt(`/visa/ghana/${slug}`, 0.8, 'monthly'));
  });

  // 4. /visa/india/[slug]
  slugs.forEach(({ slug }) => {
    routes.push(fmt(`/visa/india/${slug}`, 0.8, 'monthly'));
  });

  // 5. /visa/nigeria/[slug]
  slugs.forEach(({ slug }) => {
    routes.push(fmt(`/visa/nigeria/${slug}`, 0.8, 'monthly'));
  });

  // 6. /visa/student-visa/[slug]
  slugs.forEach(({ slug }) => {
    routes.push(fmt(`/visa/student-visa/${slug}`, 0.85, 'weekly'));
  });

  return routes;
}