import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('linkify');
    const collection = db.collection('links');
    const { username, links } = await req.json();

    // Check if the username already exists
    const existingUser = await collection.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ message: 'Username already exists' }, { status: 409 });
    }

    await collection.updateOne(
      { username },
      { $set: { links } },
      { upsert: true }
    );

    return NextResponse.json({ message: 'Links saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error in POST /api/links:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('linkify');
    const collection = db.collection('links');
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');

    const userLinks = await collection.findOne({ username });

    return NextResponse.json(userLinks, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/links:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}