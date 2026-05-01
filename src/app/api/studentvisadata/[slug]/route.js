import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

// FORCE NEXT.JS TO SKIP STATIC DATA COLLECTION DURING BUILD
export const dynamic = 'force-dynamic'; 

export async function GET(request, { params }) {
  // 1. Await params for Next.js 15 compatibility
  const { slug } = await params; 

  try {
    const client = await clientPromise;
    const db = client.db('Eammu-Holidays');

    // 2. Fetch the data using the slug from your DB screenshot
    const data = await db
      .collection('studentvisadata')
      .findOne({ slug: slug }, { projection: { _id: 0 } });

    // 3. Handle missing data gracefully
    if (!data) {
      return NextResponse.json(
        { found: false, message: `No student visa data found for slug: ${slug}` },
        { status: 404 }
      );
    }

    return NextResponse.json({ found: true, data });

  } catch (err) {
    // 4. Log the error so you can see it in your build terminal
    console.error('Error in studentvisadata API:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}