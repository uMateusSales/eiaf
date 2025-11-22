'use client';

import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Line,
  Brush,
} from 'recharts';

const GREEN = '#65a30d';
const RED = '#dc2626';

interface CandleData {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
}

interface Props {
  data: CandleData[];
}

export default function CandlestickChart({ data }: Props) {
  const formatted = data.map((d) => ({
    ...d,
    color: d.close >= d.open ? GREEN : RED,
  }));

  return (
    <div className="w-full h-[400px] border border-border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">Candle (OHLC)</h2>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={formatted}>
          <XAxis dataKey="date" />
          <YAxis /> {/* 📌 SEM dataKey */}
          <Tooltip />
          <Brush dataKey="date" stroke="#65a30d" height={25} />
          {/* 📈 Linha High */}
          <Line dataKey="high" stroke="#000" dot={false} strokeWidth={1} />
          {/* 📉 Linha Low */}
          <Line dataKey="low" stroke="#000" dot={false} strokeWidth={1} />
          {/* 📌 Corpo + Pavio do Candle */}
          <Bar
            dataKey="close"
            shape={(props) => {
              const { x, width, payload, yScale } = props as any;
              const { open, close, high, low, color } = payload;

              if (!yScale) return null; // segurança

              const yHigh = yScale(high);
              const yLow = yScale(low);
              const yOpen = yScale(open);
              const yClose = yScale(close);

              return (
                <g>
                  {/* Pavio */}
                  <line
                    x1={x + width / 2}
                    x2={x + width / 2}
                    y1={yHigh}
                    y2={yLow}
                    stroke={color}
                    strokeWidth={2}
                  />

                  {/* Corpo */}
                  <rect
                    x={x}
                    y={Math.min(yOpen, yClose)}
                    width={width}
                    height={Math.abs(yOpen - yClose) || 1}
                    fill={color}
                  />
                </g>
              );
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
