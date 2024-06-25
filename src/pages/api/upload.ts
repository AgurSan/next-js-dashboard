import type { NextApiRequest, NextApiResponse } from 'next';
import { parseCsv } from '../../lib/csvParser';
import dbConnect from '../../lib/db';
import Metadata from '../../models/Metadata';
import Metrics from '../../models/Metrics';
import Product from '../../models/Product';
import { calculateMetrics } from '../../utils/calculateMetrics';
import { extractMetadata } from '../../utils/extractMetadata';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      console.log('Connecting to database...');
      await dbConnect();
      console.log('Database connected.');

      console.log('Parsing CSV data...');
      const csvData = await parseCsv(req.body);
      console.log('CSV data parsed:', csvData);

      console.log('Saving products...');
      await Product.insertMany(csvData);
      console.log('Products saved.');

      console.log('Extracting metadata...');
      const metadata = extractMetadata(csvData);
      console.log('Metadata extracted:', metadata);

      console.log('Saving metadata...');
      await Metadata.findOneAndUpdate({}, metadata, { upsert: true });
      console.log('Metadata saved.');

      console.log('Calculating metrics...');
      const metrics = calculateMetrics(csvData);
      console.log('Metrics calculated:', metrics);

      console.log('Saving metrics...');
      await Metrics.findOneAndUpdate({}, metrics, { upsert: true });
      console.log('Metrics saved.');

      res.status(200).json({ message: 'CSV processed successfully' });
    } catch (error) {
      console.error('Error processing CSV:', error);
      res.status(500).json({ error: 'Error processing CSV' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
