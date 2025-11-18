'use client';

import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import BaseChartWrapper from './ui/ChartWrapper';
import { mockCandleData, mockStudyDate } from '@/lib/mockData';

interface HighTrendChartProps {
  stock: string;
}

/**
 * Gráfico de Linha de Fechamento com indicação de Tendência de Alta.
 */
const HighTrendChart: React.FC<HighTrendChartProps> = ({ stock }) => {
  // Dados para o gráfico de linha (usamos o fechamento 'close' como valor principal)
  const chartData = mockCandleData.map((d) => ({
    date: d.date,
    price: d.close,
    open: d.open,
    high: d.high,
    low: d.low,
  }));

  // Determina o domínio Y para melhor visualização
  const { yMin, yMax } = useMemo(() => {
    const prices = chartData.map((d) => d.price);
    const min = Math.min(...prices) * 0.95; // 5% de margem
    const max = Math.max(...prices) * 1.05; // 5% de margem
    return { yMin: min, yMax: max };
  }, [chartData]);

  const title = `${stock} | Tendência de Alta`;
  const description = `Preço de Fechamento e Projeção - Estudo: ${mockStudyDate}`;

  // Cor da linha: Azul (primária)
  const lineColor = 'hsl(var(--primary))';

  return (
    <BaseChartWrapper title={title} description={description} height={400}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--muted-foreground)/0.2)"
            className="dark:stroke-gray-700"
          />

          <XAxis
            dataKey="date"
            minTickGap={30}
            angle={-45}
            textAnchor="end"
            height={60}
            stroke="hsl(var(--foreground))"
            className="text-xs"
          />

          <YAxis
            orientation="right"
            domain={[yMin, yMax]}
            tickFormatter={(value) => `R$ ${value.toFixed(2)}`}
            stroke="hsl(var(--foreground))"
            className="text-xs"
          />

          <Tooltip
            contentStyle={{
              borderRadius: '0.5rem',
              border: '1px solid hsl(var(--border))',
              background: 'hsl(var(--background))',
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />

          {/* Linha Principal de Fechamento */}
          <Line
            type="monotone"
            dataKey="price"
            stroke={lineColor}
            strokeWidth={2}
            dot={false}
            name="Fechamento"
          />

          {/* Referência: Simulação de Projeção (Tendência de Alta) */}
          <ReferenceLine
            y={yMax * 0.98}
            stroke="#10B981"
            strokeDasharray="5 5"
            label={{
              value: 'Projeção de Alta',
              position: 'top',
              fill: '#10B981',
              fontSize: 12,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </BaseChartWrapper>
  );
};

export default HighTrendChart;
