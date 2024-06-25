import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/db';
import Metadata from '../../models/Metadata';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      await dbConnect();

      const metadata = await Metadata.findOne().lean();

      if (!metadata) {
        return res.status(404).json({ error: 'Metadata not found' });
      }

      res.status(200).json(metadata);
    } catch (error) {
      console.error('Error fetching metadata:', error);
      res.status(500).json({ error: 'Error fetching metadata' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
