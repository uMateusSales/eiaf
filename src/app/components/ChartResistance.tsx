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

interface ResistanceSupportChartProps {
  stock: string;
  type: 'resistance' | 'support';
}

/**
 * Gráfico de Linha de Fechamento com Linhas de Suporte ou Resistência.
 */
const ResistanceSupportChart: React.FC<ResistanceSupportChartProps> = ({
  stock,
  type,
}) => {
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

  // Valores de referência mockados (para simulação)
  const resistanceLevel = yMax * 0.95; // Perto do topo
  const supportLevel = yMin * 1.05; // Perto da base

  const isResistance = type === 'resistance';

  const title = `${stock} | Linhas de ${
    isResistance ? 'Resistência' : 'Suporte'
  }`;
  const description = `Preço de Fechamento com Níveis de ${
    isResistance ? 'Resistência' : 'Suporte'
  } - Estudo: ${mockStudyDate}`;
  const referenceValue = isResistance ? resistanceLevel : supportLevel;
  const referenceLabel = isResistance ? 'RESISTÊNCIA' : 'SUPORTE';
  const referenceColor = isResistance ? '#F97316' : '#22C55E'; // Orange for Resistance, Green for Support

  return (
    <BaseChartWrapper title={title} description={description} height={300}>
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
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            dot={false}
            name="Fechamento"
          />

          {/* Linha de Referência (Suporte ou Resistência) */}
          <ReferenceLine
            y={referenceValue}
            stroke={referenceColor}
            strokeDasharray="5 5"
            label={{
              value: referenceLabel,
              position: isResistance ? 'top' : 'bottom',
              fill: referenceColor,
              fontSize: 12,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </BaseChartWrapper>
  );
};

export default ResistanceSupportChart;
