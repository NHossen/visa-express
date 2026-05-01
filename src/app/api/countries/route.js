import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export async function GET() {
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

    return NextResponse.json(countries);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    await client.close();
  }
}