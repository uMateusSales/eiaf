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
  if (!data || !Array.isArray(data) || data.length === 0) {
    return (
      <div className="w-full h-[400px] border border-border rounded-lg p-4 flex items-center justify-center">
        <span className="text-muted-foreground text-sm">
          Nenhum dado disponível para este estudo
        </span>
      </div>
    );
  }

  const formatted = data.map((d) => ({
    ...d,
    color: d.close >= d.open ? GREEN : RED,
  }));

  return (
    <div className="w-full h-[400px] border border-border rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2 text-center">
        Gráfico de Vela
      </h2>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={formatted}>
          <XAxis
            dataKey="date"
            interval={Math.floor(formatted.length / 6)}
            tick={{ dy: 10, fontSize: 12 }}
            tickFormatter={(value) =>
              new Date(value).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })
            }
          />
          <YAxis domain={['dataMin', 'dataMax']} />

          <Tooltip
            formatter={(value: number, key: string) => [
              `R$ ${value.toFixed(2).replace('.', ',')}`,
              key === 'high'
                ? 'Máxima'
                : key === 'low'
                ? 'Mínima'
                : key === 'close'
                ? 'Fechamento'
                : key === 'open'
                ? 'Abertura'
                : key,
            ]}
            labelFormatter={(label) => {
              const date = new Date(label);
              return `${date.getHours().toString().padStart(2, '0')}:${date
                .getMinutes()
                .toString()
                .padStart(2, '0')}`;
            }}
          />

          <Brush
            dataKey="date"
            stroke="#65a30d"
            height={25}
            travellerWidth={10}
            y={320}
            tickFormatter={(value) =>
              new Date(value).toLocaleTimeString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
              })
            }
          />

          <Line type="monotone" dataKey="high" stroke="#000" dot={false} />
          <Line type="monotone" dataKey="low" stroke="#000" dot={false} />

          <Bar
            dataKey="close"
            shape={(props: any) => {
              const { x, y, width, height, payload } = props as any;
              const color = payload.color;
              const openY = y + (payload.close > payload.open ? height : 0);
              const candleHeight = Math.abs(y - openY);

              return (
                <g>
                  <rect
                    x={x}
                    y={Math.min(openY, y)}
                    width={width}
                    height={candleHeight || 1}
                    fill={color}
                  />
                  <line
                    x1={x + width / 2}
                    x2={x + width / 2}
                    y1={y}
                    y2={y + height}
                    stroke={color}
                    strokeWidth={2}
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
