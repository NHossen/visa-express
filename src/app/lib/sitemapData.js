import { unstable_cache } from 'next/cache';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

async function fetchCountries() {
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
    family: 4,
  });
  try {
    await client.connect();
    const db = client.db('Eammu-Holidays');
    const countries = await db
      .collection('countries')
      .find({})
      .project({ _id: 0, country: 1, flag: 1, code: 1 })
      .sort({ country: 1 })
      .toArray();

    const seen = new Set();
    const unique = countries.filter(c => {
      const key = c.country.toLowerCase().trim();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    console.log(`[sitemap] ${countries.length} raw → ${unique.length} unique`);
    return unique;
  } finally {
    await client.close();
  }
}

export const getCountries = unstable_cache(
  fetchCountries,
  ['sitemap-countries'],
  { revalidate: 86400 }
);