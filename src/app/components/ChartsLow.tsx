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
import BaseChartWrapper from '@/components/ui/ChartWrapper';

import { mockCandleData, mockStudyDate } from '@/lib/fakedata';

interface LowTrendChartProps {
  stock: string;
}

/**
 * Gráfico de Linha de Fechamento com indicação de Tendência de Baixa.
 */
const LowTrendChart: React.FC<LowTrendChartProps> = ({ stock }) => {
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
    const min = Math.min(...prices) * 0.95;
    const max = Math.max(...prices) * 1.05;
    return { yMin: min, yMax: max };
  }, [chartData]);

  const title = `${stock} | Tendência de Baixa`;
  const description = `Preço de Fechamento e Projeção - Estudo: ${mockStudyDate}`;

  // Cor da linha: Laranja (para diferenciar)
  const lineColor = 'hsl(var(--warning) / 0.8)';

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

          {/* Linha Principal de Fechamento - O 'type="monotone"' desenha os vetores entre os pontos. */}
          <Line
            type="monotone"
            dataKey="price"
            stroke="red"
            strokeWidth={2}
            dot={{ fill: lineColor, r: 3 }} // Mantemos o ponto em cada fechamento
            name="Fechamento"
          />

          {/* 🚨 REMOVIDO: O mapeamento de ReferenceLine que criava as linhas horizontais 🚨 */}
          {/* {chartData.map((entry, index) => (
                        <ReferenceLine
                            key={`h-line-${index}`}
                            y={entry.price} 
                            stroke="#E5E7EB" 
                            strokeDasharray="3 3" 
                            strokeOpacity={0.4} 
                        />
                    ))}
                    */}

          {/* Referência: Simulação de Projeção (Tendência de Baixa) */}
          <ReferenceLine
            y={yMin * 1.02}
            stroke="#EF4444"
            strokeDasharray="5 5"
            label={{
              value: 'Projeção de Baixa',
              position: 'bottom',
              fill: '#EF4444',
              fontSize: 12,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </BaseChartWrapper>
  );
};

export default LowTrendChart;
