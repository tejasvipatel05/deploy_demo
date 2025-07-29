import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    res.status(500).json({ message: 'Missing MONGODB_URI' });
    return;
  }

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('deployDemoDB');
    const books = await db.collection('Books').find({}).toArray();
    const cleanBooks = books.map(book => ({
      ...book,
      _id: book._id.toString()
    }));
    res.status(200).json(cleanBooks);
  } catch (error) {
    console.error('Failed to fetch books:', error);
    res.status(500).json({ message: 'Internal server error' });
  } finally {
    await client.close();
  }
}
