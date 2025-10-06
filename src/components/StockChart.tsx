import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { stockApi } from '@/services/api';

interface StockChartProps {
  symbol: string;
}

interface ChartData {
  date: string;
  price: number;
  volume: number;
}

export default function StockChart({ symbol }: StockChartProps) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchChartData();
  }, [symbol]);

  const fetchChartData = async () => {
    try {
      setLoading(true);
      const data = await stockApi.getStockChart(symbol);
      setChartData(data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
      // Generate mock data for demo
      const mockData = generateMockChartData();
      setChartData(mockData);
    } finally {
      setLoading(false);
    }
  };

  const generateMockChartData = (): ChartData[] => {
    const data: ChartData[] = [];
    const basePrice = 1500;
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const randomChange = (Math.random() - 0.5) * 100;
      const price = basePrice + randomChange + (Math.sin(i / 5) * 50);
      
      data.push({
        date: date.toISOString().split('T')[0],
        price: Math.max(price, 1000),
        volume: Math.floor(Math.random() * 1000000) + 500000
      });
    }
    
    return data;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatPrice = (value: number) => {
    return `₹${value.toFixed(2)}`;
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Price Chart</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 flex items-center justify-center">
            <p className="text-gray-500">Loading chart...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Chart - Last 30 Days</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                stroke="#666"
                fontSize={12}
              />
              <YAxis 
                tickFormatter={formatPrice}
                stroke="#666"
                fontSize={12}
              />
              <Tooltip 
                labelFormatter={(value) => `Date: ${formatDate(value as string)}`}
                formatter={(value: number) => [formatPrice(value), 'Price']}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#2563eb" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#2563eb' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        {/* Chart Statistics */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t">
          <div className="text-center">
            <p className="text-sm text-gray-600">Current Price</p>
            <p className="text-lg font-semibold">
              {formatPrice(chartData[chartData.length - 1]?.price || 0)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">30-Day High</p>
            <p className="text-lg font-semibold text-green-600">
              {formatPrice(Math.max(...chartData.map(d => d.price)))}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">30-Day Low</p>
            <p className="text-lg font-semibold text-red-600">
              {formatPrice(Math.min(...chartData.map(d => d.price)))}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}