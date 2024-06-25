import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/db';
import Metrics from '../../models/Metrics';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      await dbConnect();

      const metrics = await Metrics.findOne().lean();

      if (!metrics) {
        return res.status(404).json({ error: 'Metrics not found' });
      }

      res.status(200).json(metrics);
    } catch (error) {
      console.error('Error fetching metrics:', error);
      res.status(500).json({ error: 'Error fetching metrics' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
