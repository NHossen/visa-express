import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  const uri = process.env.MONGODB_URI;

  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
    family: 4,  // force IPv4 — fixes UAE ISP blocks
  });

  try {
    await client.connect();
    const db = client.db('Eammu-Holidays');
    const count = await db.collection('countries').countDocuments();
    const sample = await db.collection('countries').find({}).limit(3).toArray();

    return NextResponse.json({
      status: 'Connected!',
      totalCountries: count,
      sampleData: sample,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  } finally {
    await client.close();
  }
}