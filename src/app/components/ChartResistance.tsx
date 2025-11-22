'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { generateStockData } from '@/lib/fakedata';

interface ResistanceChartProps {
  stock: string;
  type: 'support' | 'resistance';
}

export default function ResistanceSupportChart({
  stock,
  type,
}: ResistanceChartProps) {
  const data = generateStockData(stock);

  const chartData = data.map((d) => ({
    date: d.date,
    price: type === 'support' ? d.low : d.high,
  }));

  return (
    <div className="w-full bg-card p-4 rounded-lg shadow border">
      <h3 className="text-lg font-semibold mb-3">
        {type === 'support' ? 'Suporte' : 'Resistência'}
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={['dataMin', 'dataMax']} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke={type === 'support' ? '#3b82f6' : '#eab308'}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
