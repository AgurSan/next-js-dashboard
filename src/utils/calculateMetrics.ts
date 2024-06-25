import { IMetrics, IMonthlyMetric, IProduct } from '../types';

export function calculateMetrics(products: IProduct[]): IMetrics {
  const totalRevenue = products.reduce((sum, p) => sum + p.sales, 0);
  const uniqueCustomers = new Set(products.map((p) => p.customerId)).size;
  const avgRevenuePerOrder = totalRevenue / products.length;

  const monthlyMetrics: { [key: string]: IMonthlyMetric } = {};
  products.forEach((p) => {
    const monthKey = p.orderDate.toISOString().slice(0, 7); // YYYY-MM
    if (!monthlyMetrics[monthKey]) {
      monthlyMetrics[monthKey] = { revenue: 0, orders: 0 };
    }
    monthlyMetrics[monthKey].revenue += p.sales;
    monthlyMetrics[monthKey].orders += 1;
  });

  return {
    totalRevenue,
    avgRevenuePerOrder,
    uniqueCustomers,
    monthlyMetrics,
  };
}
