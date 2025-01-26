import UserPageClient from '@/components/UserPageClient';
import clientPromise from '@/lib/mongodb';

export default async function UserPage({ params }) {
  const client = await clientPromise;
  const db = client.db('linkify');
  const collection = db.collection('links');
  const userLinks = await collection.findOne({ username: params.username });

  const initialLinks = userLinks ? userLinks.links : [];

  return <UserPageClient username={params.username} initialLinks={initialLinks} />;
}

export async function generateStaticParams() {
  const client = await clientPromise;
  const db = client.db('linkify');
  const collection = db.collection('links');
  const users = await collection.find({}).toArray();

  return users.map((user) => ({
    username: user.username,
  }));
}