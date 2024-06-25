import { IMetadata, IProduct } from '../types';

export function extractMetadata(products: IProduct[]): IMetadata {
  const states = Array.from(new Set(products.map((p) => p.state)));
  const years = Array.from(
    new Set(products.map((p) => p.orderDate.getFullYear()))
  );

  return {
    states,
    years,
  };
}
