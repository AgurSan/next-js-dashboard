export interface IProduct {
  rowId: number | undefined;
  orderId: string;
  orderDate: Date;
  customerId: string;
  state: string;
  region: string;
  productId: string;
  sales: number;
  quantity: number;
}

export interface IMetadata {
  states: string[];
  years: number[];
}

export interface IMonthlyMetric {
  revenue: number;
  orders: number;
}

export interface IMetrics {
  totalRevenue: number;
  avgRevenuePerOrder: number;
  uniqueCustomers: number;
  monthlyMetrics: { [key: string]: IMonthlyMetric };
}
