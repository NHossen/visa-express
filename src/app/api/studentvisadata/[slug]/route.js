import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function GET(request, { params }) {
  const { slug } = await params;
  try {
    const client = await clientPromise;
    const db = client.db('Eammu-Holidays');
    const data = await db
      .collection('studentvisadata')
      .findOne({ slug: slug }, { projection: { _id: 0 } });

    if (!data) {
      return NextResponse.json({ found: false }, { status: 404 });
    }
    return NextResponse.json({ found: true, data });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}