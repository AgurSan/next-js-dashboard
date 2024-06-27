import Chart from 'chart.js/auto';
import { useEffect, useRef } from 'react';
import { formatCurrency } from '../../lib/formatCurrency';
import { IMetrics } from '../../types';

export const MonthlyMetricsChart = ({ metrics }: { metrics: IMetrics }) => {
  const canvasRef = useRef(null);

  const monthlyData = Object.entries(metrics.monthlyMetrics).map(
    ([month, data]) => ({
      month: new Date(null, parseInt(month) - 1).toLocaleString('default', {
        month: 'long',
      }),
      revenue: data.revenue,
    })
  );

  const prepareChartData = () => {
    const labels = monthlyData.map((item) => item.month);
    const data = monthlyData.map((item) => item.revenue);

    return {
      labels,
      datasets: [
        {
          label: 'Revenue',
          data,
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1,
        },
      ],
    };
  };

  useEffect(() => {
    const chartData = prepareChartData();
    const chartInstance = new Chart(canvasRef.current, {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value: Number) => formatCurrency(value as number),
            },
          },
        },
      },
    });

    return () => {
      chartInstance.destroy();
    };
  }, [metrics]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-blue-800 mb-4">Monthly Metrics</h2>
      <div className="flex flex-col">
        <div className="mt-6">
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};
