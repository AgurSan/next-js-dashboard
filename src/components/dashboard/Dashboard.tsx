import React, { useEffect, useState } from 'react';
import { IMetadata, IMetrics } from '../../types';
import UploadCSV from '../upload/UploadCSV';

const Dashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<IMetrics | null>(null);
  const [metadata, setMetadata] = useState<IMetadata | null>(null);
  const [selectedYear, setSelectedYear] = useState<string>('All Years');
  const [selectedState, setSelectedState] = useState<string>('All States');

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

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        fetchData(); // Refresh data after successful upload
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  if (!metrics || !metadata) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="mb-6">
        <UploadCSV onUpload={handleUpload} />
      </div>
      <div className="flex justify-end space-x-4 mb-4">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border p-2 rounded"
        >
          <option>All Years</option>
          {metadata.years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="border p-2 rounded"
        >
          <option>All States</option>
          {metadata.states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
          <p className="text-2xl">${metrics.totalRevenue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Avg. Revenue per Order</h2>
          <p className="text-2xl">${metrics.avgRevenuePerOrder.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Unique Customers</h2>
          <p className="text-2xl">{metrics.uniqueCustomers}</p>
        </div>
      </div>
      {/* Add chart component here for monthly metrics */}
    </div>
  );
};

export default Dashboard;
