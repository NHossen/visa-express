// /app/api/scholarships/route.js
// Fetches all scholarships from MongoDB — same pattern as /api/countries

import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export const revalidate = 3600; // cache 1 hour

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const countrySlug = searchParams.get('country_slug'); // optional filter
  const slug        = searchParams.get('slug');          // optional single fetch

  try {
    const client = await clientPromise;
    const db     = client.db('Eammu-Holidays');

    const query = {};
    if (countrySlug) query.country_slug = countrySlug;
    if (slug)        query.slug         = slug;

    const scholarships = await db
      .collection('scholarships')
      .find(query)
      .project({ _id: 0 })
      .sort({ popular: -1, scholarship_name: 1 })
      .toArray();

    return NextResponse.json(scholarships);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}