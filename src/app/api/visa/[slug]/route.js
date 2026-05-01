import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function GET(request, { params }) {
  const { slug } = await params;
  try {
    const client = await clientPromise;
    const db = client.db('Eammu-Holidays');

    // visadata collection এ slug field দিয়ে find করো
    const visaData = await db
      .collection('visadata')
      .findOne({ slug: slug }, { projection: { _id: 0 } });

    if (!visaData) {
      return NextResponse.json({ found: false }, { status: 404 });
    }

    return NextResponse.json({ found: true, data: visaData });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}