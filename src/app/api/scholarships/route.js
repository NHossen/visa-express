// /app/api/scholarships/route.js
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const countrySlug = searchParams.get('country_slug');
  const popular = searchParams.get('popular');

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
    family: 4,
  });

  try {
    await client.connect();
    const db = client.db('Eammu-Holidays');

    const query = {};
    if (countrySlug) query.country_slug = countrySlug;
    if (popular === 'true') query.popular = true;

    const scholarships = await db
      .collection('scholarships')
      .find(query)
      .project({ _id: 0 })
      .sort({ popular: -1, scholarship_name: 1 })
      .toArray();

    return NextResponse.json(scholarships);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    await client.close();
  }
}