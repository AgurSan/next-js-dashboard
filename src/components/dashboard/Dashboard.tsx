import React, { useEffect, useMemo, useState } from 'react';
import { IMetadata, IMetrics } from '../../types';
import { MonthlyMetricsChart } from '../charts/MonthlyMetricsChart';
import { MetricsTable } from '../metric/MetricTable';

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<IMetrics | null>(null);
  const [metadata, setMetadata] = useState<IMetadata | null>(null);
  const [year, setYear] = useState<string>('');
  const [state, setState] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [metricsRes, metadataRes] = await Promise.all([
        fetch('/api/metrics'),
        fetch('/api/metadata'),
      ]);
      const metricsData = await metricsRes.json();
      const metadataData = await metadataRes.json();
      setMetrics(metricsData);
      setMetadata(metadataData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filteredMetrics = useMemo(() => {
    if (!metrics) return null;

    if (!year) return metrics;

    const filteredMonthlyMetrics = Object.fromEntries(
      Object.entries(metrics.monthlyMetrics).filter(([month]) =>
        month.startsWith(year)
      )
    );

    const totalRevenue = Object.values(filteredMonthlyMetrics).reduce(
      (sum, { revenue }) => sum + revenue,
      0
    );

    const totalOrders = Object.values(filteredMonthlyMetrics).reduce(
      (sum, { orders }) => sum + orders,
      0
    );

    return {
      ...metrics,
      monthlyMetrics: filteredMonthlyMetrics,
      totalRevenue,
      avgRevenuePerOrder: totalRevenue / totalOrders,
    };
  }, [metrics, year]);

  if (!metrics || !metadata) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-blue-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Dashboard</h1>
          <div className="flex space-x-4">
            <select
              className="py-2 px-4 rounded-md bg-white text-blue-800 shadow-sm"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            >
              <option value="">All Years</option>
              {metadata.years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <select
              className="py-2 px-4 rounded-md bg-white text-blue-800 shadow-sm"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option value="">All States</option>
              {metadata.states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-rows-auto gap-8">
          {metrics && <MetricsTable metrics={metrics} />}
          {metrics && <MonthlyMetricsChart metrics={metrics} />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
