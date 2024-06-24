import csv from 'csv-parser';
import { Readable } from 'stream';
import type { Product } from '../types/Product';

export async function parseCsv(csvString: string): Promise<Product[]> {
  return new Promise<Product[]>((resolve, reject) => {
    const datas: Product[] = [];
    const stream = Readable.from(csvString);

    stream
      .pipe(csv({ mapHeaders: ({ header }) => header.trim() }))
      .on('data', (data: Record<string, string>) => {
        const rowData: Product = {
          'Row ID': parseInt(data['Row ID']),
          'Order ID': data['Order ID'],
          'Order Date': new Date(Date.parse(data['Order Date'])),
          'Customer ID': data['Customer ID'],
          // prettier-ignore
          'State': data['State'],
          // prettier-ignore
          'Region': data['Region'],
          'Product ID': data['Product ID'],
          // prettier-ignore
          'Sales': Number(data['Sales']),
          // prettier-ignore
          'Quantity': Number(data['Quantity']),
        };
        datas.push(rowData);
      })
      .on('end', () => {
        resolve(datas);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}
