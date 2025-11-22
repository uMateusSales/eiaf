'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import CandlestickChart from './CandlestickChart';

export default function StockCharts({ data }: { data: any[] }) {
  return (
    <div className="space-y-8">
      {/* 📈 Gráfico de Preço */}
      <section className="bg-card border rounded-lg p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">📈 Evolução de Preços</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={['auto', 'auto']} />
              <Tooltip />
              <Legend />
              <Line
                dataKey="close"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                name="Preço de Fechamento"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 📊 Volume */}
      <section className="bg-card border rounded-lg p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">📦 Volume de Negociação</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                dataKey="volume"
                stroke="#f59e0b"
                strokeWidth={2}
                dot={false}
                name="Volume"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section className="bg-card border rounded-lg p-4 shadow">
        <h2 className="text-lg font-semibold mb-2">📦 Volume de Negociação</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <CandlestickChart data={data} />
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
