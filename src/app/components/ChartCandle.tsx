'use client';

import {
  ResponsiveContainer,
  ComposedChart,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  Line,
} from 'recharts';

const data = [
  { date: '2025-11-01', open: 50.0, high: 85.0, low: 30.0, close: 65.0 },
  { date: '2025-11-02', open: 65.0, high: 95.0, low: 55.0, close: 90.0 },
  { date: '2025-11-03', open: 90.0, high: 120.0, low: 80.0, close: 115.0 },
  { date: '2025-11-04', open: 115.0, high: 150.0, low: 100.0, close: 140.0 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    return (
      <div className="rounded-lg bg-white shadow p-3 text-sm border border-gray-200">
        <p>
          <strong>📅 Data:</strong> {label}
        </p>
        <p>
          <strong>🟢 Abertura:</strong> R$ {d.open}
        </p>
        <p>
          <strong>🔴 Fechamento:</strong> R$ {d.close}
        </p>
        <p>
          <strong>⬆️ Máxima:</strong> R$ {d.high}
        </p>
        <p>
          <strong>⬇️ Mínima:</strong> R$ {d.low}
        </p>
      </div>
    );
  }
  return null;
};

export default function CandleChart() {
  return (
    <div className="w-full h-[350px]">
      <ResponsiveContainer>
        <ComposedChart data={data}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          {/* Candle alta/baixa */}
          <Bar
            dataKey="open"
            fill="#22c55e"
            name="Abertura"
            barSize={5}
            opacity={0}
          />
          <Bar
            dataKey="close"
            fill="#ef4444"
            name="Fechamento"
            barSize={5}
            opacity={0}
          />
          {/* Linha da máxima e mínima simulando candle */}
          <Line
            type="monotone"
            dataKey="high"
            stroke="#075985"
            strokeWidth={3}
            dot={false}
            name="Máxima"
          />
          <Line
            type="monotone"
            dataKey="low"
            stroke="#f59e0b"
            strokeWidth={3}
            dot={false}
            name="Mínima"
          />
          <Tooltip content={<CustomTooltip />} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
