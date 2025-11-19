'use client';

import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ComposedChart,
  Bar,
  Cell,
  Scatter, // 🚨 ADICIONADO: Para marcar o preço de Fechamento 🚨
} from 'recharts';
import { type Payload as RechartPayload } from 'recharts/types/component/DefaultTooltipContent';
import { mockCandleData } from '@/lib/fakedata';

// =================================================================
// 1. TIPAGEM E DADOS
// =================================================================

/**
 * Interface para um único ponto de dados de vela (OHLC).
 * Estendida para incluir os valores necessários para o hack de barras empilhadas.
 */
interface CandleData {
  date: string; // Data no formato YYYY-MM-DD
  open: number; // Abertura
  high: number; // Máxima
  low: number; // Mínima
  close: number; // Fechamento
  name: string; // DataKey para o XAxis

  // 🚨 Novos campos para o hack de Barras Empilhadas 🚨
  lowAnchor: number; // O ponto mais baixo (Min(Low, High)) - Usado no YAxis domain
  lowBody: number; // O valor da base do corpo (Min(Open, Close)) - Para barra transparente
  bodyHeight: number; // A altura do corpo (|Open - Close|) - Para barra colorida
  color: string; // Cor da barra (Verde/Vermelho)
}

// =================================================================
// 2. FUNÇÕES DE RENDERIZAÇÃO E FERRAMENTA (TOOLTIP)
// =================================================================

/**
 * Componente de Ponto Customizado para marcar o valor de Fechamento (Close).
 */
const CustomCloseDot = (props: any) => {
  const { cx, cy, payload } = props;
  // Pega a cor calculada no chartData (verde ou vermelho)
  const fillColor = payload.color;

  // Desenha um círculo preenchido no preço de Fechamento
  return (
    <circle
      cx={cx}
      cy={cy}
      r={5} // Raio do ponto
      fill={fillColor}
      stroke="#FFFFFF" // Borda branca para destaque
      strokeWidth={1}
    />
  );
};

// Função de Tooltip customizada
const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: RechartPayload[];
  label?: string;
}) => {
  if (active && payload && payload.length) {
    // Busca o payload que contém os dados OHLC originais (todos os dados estão no 'lowBody').
    const dataPoint = payload.find((p) => p.dataKey === 'lowBody')
      ?.payload as CandleData;

    if (!dataPoint) return null;

    const isRising = dataPoint.close > dataPoint.open;
    const color = isRising ? 'text-green-500' : 'text-red-500';

    return (
      <div className="bg-white/90 dark:bg-gray-700/90 backdrop-blur-sm p-4 border rounded-lg shadow-lg">
        <p className="font-bold text-lg mb-2">Data: {label}</p>
        <div className="space-y-1 text-sm">
          <p className="text-gray-700 dark:text-gray-300">
            Abertura:{' '}
            <span className="font-mono">R$ {dataPoint.open.toFixed(2)}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Fechamento:{' '}
            <span className={`font-bold ${color}`}>
              R$ {dataPoint.close.toFixed(2)}
            </span>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Máxima:{' '}
            <span className="font-mono">R$ {dataPoint.high.toFixed(2)}</span>
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Mínima:{' '}
            <span className="font-mono">R$ {dataPoint.low.toFixed(2)}</span>
          </p>
        </div>
      </div>
    );
  }

  return null;
};

// =================================================================
// 3. COMPONENTE PRINCIPAL
// =================================================================

interface CandlestickChartProps {
  stock: string;
}

const CandlestickChart = ({ stock }: CandlestickChartProps) => {
  // 1. Mapeamento dos Dados para o Hack de Barras Empilhadas
  const chartData: CandleData[] = mockCandleData.map((d) => {
    const isRising = d.close > d.open;

    // A base do corpo é o mínimo de Open e Close
    const lowBodyValue = Math.min(d.open, d.close);

    // A altura do corpo é a diferença absoluta entre Open e Close
    const bodyHeightValue = Math.abs(d.close - d.open);

    return {
      ...d,
      name: d.date,
      lowAnchor: Math.min(d.low, d.high), // Usado apenas para configurar o domínio Y.
      lowBody: lowBodyValue, // Base Transparente
      bodyHeight: bodyHeightValue, // Corpo Colorido
      color: isRising ? '#10B981' : '#EF4444', // Cor dinâmica para o <Cell> e Pontos
    };
  });

  // 2. Extrai os valores min/max para configurar o eixo Y dinamicamente
  const { yMin, yMax } = useMemo(() => {
    const prices = mockCandleData.flatMap((d) => [d.low, d.high]);

    // AJUSTE PARA O ZOOM VISUAL EXTREMO (0.05% de margem)
    const min = Math.min(...prices) * 0.9995;
    const max = Math.max(...prices) * 1.0005;

    return { yMin: min, yMax: max };
  }, []);

  return (
    <div className="w-full h-[500px] p-2 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-semibold mb-4 text-center">
        {stock} - Desempenho Histórico (Gráfico de Corpo de Vela)
      </h3>
      <ResponsiveContainer width="100%" height="95%" minWidth={1} minHeight={1}>
        <ComposedChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
          barCategoryGap="10%"
          barGap={1}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            className="dark:stroke-gray-700"
          />

          <XAxis
            dataKey="name"
            type="category"
            minTickGap={30}
            angle={0}
            textAnchor="end"
            height={60}
            stroke="#4B5563"
            className="text-xs"
          />

          <YAxis
            orientation="right"
            domain={[yMin, yMax]}
            tickFormatter={(value) => `R$ ${value.toFixed(2)}`}
            stroke="#4B5563"
            className="text-xs"
            yAxisId="price"
            dataKey="lowAnchor"
            type="number"
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend
            layout="horizontal"
            verticalAlign="top"
            align="center"
            height={36}
          />

          {/* 🚨 1. BARRA INVISÍVEL DE BASE (ÂNCORA) 🚨
                    Base da pilha.
                */}
          <Bar
            dataKey="lowBody"
            stackId="candle"
            fill="transparent"
            stroke="transparent"
            barSize={35} // Largura extra
            isAnimationActive={false}
            legendType="none"
          />

          {/* 🚨 2. BARRA COLORIDA (CORPO DA VELA) 🚨
                    A parte colorida da pilha.
                */}
          <Bar
            dataKey="bodyHeight"
            stackId="candle"
            barSize={35} // Largura extra
            isAnimationActive={false}
            legendType="none"
          >
            {/* Componente Cell para aplicar a cor dinâmica (verde/vermelho) */}
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>

          {/* 🚨 3. SCATTER PLOT (GRÁFICO DE DISPERSÃO) PARA MARCAR O FECHAMENTO 🚨 
                    Isso resolve o problema de visualização do preço de Fechamento.
                */}
          <Scatter
            dataKey="close"
            fill="transparent"
            shape={<CustomCloseDot />} // Usa o ponto customizado
            isAnimationActive={false}
            legendType="none"
            yAxisId="price"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CandlestickChart;
