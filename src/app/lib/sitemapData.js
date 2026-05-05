// app/lib/sitemapData.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

let _countries = null;

// src/app/lib/sitemapData.js
export async function getCountries() {
  if (_countries && _countries.length > 0) return _countries;

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

    // ✅ Deduplicate by country name
    const seen = new Set();
    const unique = countries.filter(c => {
      const key = c.country.toLowerCase().trim();
      if (seen.has(key)) {
        console.warn(`[sitemap] ⚠️ Duplicate country removed: "${c.country}"`);
        return false;
      }
      seen.add(key);
      return true;
    });

    console.log(`[sitemap] Countries: ${countries.length} raw → ${unique.length} unique`);
    _countries = unique;
    return _countries;
  } finally {
    await client.close();
  }
}