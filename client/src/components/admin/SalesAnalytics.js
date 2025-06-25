import React, { useState, useEffect } from 'react';
import RevenueChart from '../charts/RevenueChart';
import ProductPerformance from '../charts/ProductPerformance';
import SalesTrends from '../charts/SalesTrends';
import { getSalesAnalytics } from '../../services/api';

const SalesAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'quarter'

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await getSalesAnalytics(timeRange);
        setAnalyticsData(response.data);
      } catch (err) {
        setError('Failed to load analytics: ' + (err.response?.data?.message || err.message));
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [timeRange]);

  if (loading) {
    return <div className="text-center py-8">Loading analytics data...</div>;
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sales Analytics</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => setTimeRange('week')} 
            className={`px-4 py-2 rounded-md ${
              timeRange === 'week' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Week
          </button>
          <button 
            onClick={() => setTimeRange('month')} 
            className={`px-4 py-2 rounded-md ${
              timeRange === 'month' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Month
          </button>
          <button 
            onClick={() => setTimeRange('quarter')} 
            className={`px-4 py-2 rounded-md ${
              timeRange === 'quarter' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Quarter
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Total Revenue</h3>
          <p className="text-3xl font-bold">${analyticsData.summary.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Products Sold</h3>
          <p className="text-3xl font-bold">{analyticsData.summary.productsSold}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-500">Conversion Rate</h3>
          <p className="text-3xl font-bold">{analyticsData.summary.conversionRate}%</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <RevenueChart data={analyticsData.monthlyRevenue} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <ProductPerformance data={analyticsData.topProducts} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow lg:col-span-2">
          <SalesTrends data={analyticsData.dailySales} />
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;
