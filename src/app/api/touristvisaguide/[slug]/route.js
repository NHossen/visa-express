// app/api/visa/[slug]/route.js
// ─────────────────────────────────────────────────────────────────────────────
// URL slug format  : "canada-to-bangladesh"   (destination-to-origin)
// DB slug format   : "bangladesh/to/canada"   (ALWAYS origin/to/destination)
//
// FIX: The previous code used `slug.replace(/-to-/, '/to/')` which would
// produce "canada/to/bangladesh" — the WRONG order for DB lookup.
// We must REVERSE the order: extract dest+origin from URL, then build
// the DB slug as origin/to/destination.
// ─────────────────────────────────────────────────────────────────────────────

import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

/**
 * Parse URL slug into destSlug and originSlug.
 * URL format: canada-to-bangladesh
 *             ^^^^^^    ^^^^^^^^^^
 *             DEST      ORIGIN
 *
 * Splits on the FIRST occurrence of "-to-".
 * For multi-word destination names like "united-states-to-bangladesh",
 * the page uses createSlug() consistently so "united-states" is always
 * in the dest position and "bangladesh" in origin.
 */
function parseUrlSlug(slug) {
  const marker = '-to-';
  const pos = slug.indexOf(marker);
  if (pos === -1) return { destSlug: slug, originSlug: '' };
  return {
    destSlug:   slug.slice(0, pos),                  // "canada"
    originSlug: slug.slice(pos + marker.length),      // "bangladesh"
  };
}

/**
 * Convert URL slug parts back to country names by querying DB.
 * Slug format uses hyphens: "united-states" → "United States"
 * We match by lowercasing and replacing hyphens with spaces.
 */
function slugToCountryName(slug) {
  // Simple heuristic: replace hyphens with spaces and title-case
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export async function GET(request, { params }) {
  const { slug } = await params;

  // 1. Parse URL slug → destSlug, originSlug
  const { destSlug, originSlug } = parseUrlSlug(slug);

  if (!destSlug || !originSlug) {
    return NextResponse.json(
      { found: false, error: 'Invalid slug format. Expected: destination-to-origin' },
      { status: 400 }
    );
  }

  try {
    const client = await clientPromise;
    const db = client.db('Eammu-Holidays');

    // 2. Look up actual country names from the countries collection
    //    to ensure exact case matching with DB slugs
    const [destCountry, originCountry] = await Promise.all([
      db.collection('countries').findOne(
        { country: { $regex: new RegExp(`^${destSlug.replace(/-/g, '[- ]')}$`, 'i') } },
        { projection: { _id: 0, country: 1, flag: 1, code: 1 } }
      ),
      db.collection('countries').findOne(
        { country: { $regex: new RegExp(`^${originSlug.replace(/-/g, '[- ]')}$`, 'i') } },
        { projection: { _id: 0, country: 1, flag: 1, code: 1 } }
      ),
    ]);

    if (!destCountry || !originCountry) {
      return NextResponse.json(
        {
          found: false,
          error: 'One or both countries not found',
          debug: { destSlug, originSlug, destFound: !!destCountry, originFound: !!originCountry },
        },
        { status: 404 }
      );
    }

    // 3. Build DB slug: ALWAYS "origin/to/destination"
    //    e.g. originName="Bangladesh", destName="Canada" → "bangladesh/to/canada"
    const dbSlug = `${originCountry.country.toLowerCase()}/to/${destCountry.country.toLowerCase()}`;

    // 4. Query the visa guide collection
    const data = await db
      .collection('touristvisaguide')
      .findOne({ slug: dbSlug }, { projection: { _id: 0 } });

    if (!data) {
      // Guide not found in DB — frontend should use static fallback
      return NextResponse.json(
        {
          found: false,
          dbSlug,       // Return for debugging
          destCountry,
          originCountry,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({ found: true, data, dbSlug });

  } catch (err) {
    console.error('[API /visa/[slug]] Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}