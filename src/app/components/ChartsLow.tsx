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

interface ChartProps {
  stock: string;
}

export default function LowTrendChart({ stock }: ChartProps) {
  const data = generateStockData(stock);

  if (!data || data.length === 0) {
    return (
      <div className="w-full bg-card p-4 rounded-lg shadow border">
        <h3 className="text-lg font-semibold mb-3">Tendência de Baixa</h3>
        <p className="text-muted-foreground text-sm">Dados indisponíveis.</p>
      </div>
    );
  }

  const chartData = data.map((d) => ({
    date: d.date,
    price: d.low,
  }));

  return (
    <div className="w-full bg-card p-4 rounded-lg shadow border">
      <h3 className="text-lg font-semibold mb-3 text-center">
        Tendência de Baixa
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            interval={Math.floor(chartData.length / 6)}
            tick={{ dy: 5, fontSize: 12 }}
            tickFormatter={(value) =>
              new Date(value).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })
            }
          />
          <YAxis />
          <Tooltip
            formatter={(value: number, key: string) => [
              `R$ ${value.toFixed(2).replace('.', ',')}`,
              key === 'price' ? 'Valor' : key,
            ]}
            labelFormatter={(label) => {
              const date = new Date(label);
              return `${date.getHours().toString().padStart(2, '0')}:${date
                .getMinutes()
                .toString()
                .padStart(2, '0')}`;
            }}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#ef4444"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
