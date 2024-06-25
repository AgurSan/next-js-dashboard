import csv from 'csv-parser';
import { Readable } from 'stream';
import type { IProduct } from '../types';

export async function parseCsv(csvString: string): Promise<IProduct[]> {
  return new Promise((resolve, reject) => {
    const products: IProduct[] = [];
    const stream = Readable.from(csvString);

    stream
      .pipe(csv())
      .on('data', (data: any) => {
        try {
          // Trouver la clé qui commence par "------WebKitFormBoundary"
          const boundaryKey = Object.keys(data).find((key) =>
            key.startsWith('------WebKitFormBoundary')
          );

          const product: IProduct = {
            rowId: boundaryKey ? Number(data[boundaryKey]) : undefined,
            orderId: String(data._1),
            orderDate: new Date(data._2),
            customerId: String(data._3),
            state: String(data._4),
            region: String(data._5),
            productId: String(data._6),
            sales: Number(data._7),
            quantity: Number(data._8),
          };

          // Vérification de la validité des données
          if (
            !product.orderId ||
            isNaN(product.orderDate.getTime()) ||
            !product.customerId ||
            !product.state ||
            !product.region ||
            !product.productId ||
            isNaN(product.sales) ||
            isNaN(product.quantity)
          ) {
            throw new Error('Invalid data in row');
          }

          products.push(product);
        } catch (error: any) {
          console.error(`Error processing row: ${error.message}`, data);
        }
      })
      .on('end', () => resolve(products))
      .on('error', (error) => reject(error));
  });
}
