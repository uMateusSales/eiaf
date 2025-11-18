import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// =================================================================
// 1. TIPAGEM E INTERFACES
// =================================================================

/**
 * Interface para as propriedades dos componentes de Gráfico.
 * (Usamos apenas a interface, sem o alias React.FC)
 */
interface IChartProps {
  stock: string;
}

/**
 * Interface para as propriedades da Page (Server Component Props).
 */
interface IStockPageProps {
  params: {
    stock: string; // Nome da pasta dinâmica [stock]
  };
}

// =================================================================
// 2. COMPONENTES DE GRÁFICO (PLACEHOLDERS)
// =================================================================

// 🚨 REMOVIDO: React.FC para máxima compatibilidade com o App Router
const CandlestickChartPlaceholder = ({ stock }: IChartProps) => {
  return (
    <div className="w-full h-[500px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg border-2 border-dashed border-green-500">
      <p className="text-xl text-muted-foreground">
        Gráfico de Vela (Candlestick) para **{stock}** será renderizado aqui.
      </p>
    </div>
  );
};

const VolumeChartPlaceholder = ({ stock }: IChartProps) => (
  <div className="w-full h-[200px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg border-2 border-dashed border-green-500 mt-4">
    <p className="text-muted-foreground">
      Gráfico de Volume para **{stock}** será renderizado aqui.
    </p>
  </div>
);

const RSIChartPlaceholder = ({ stock }: IChartProps) => (
  <div className="w-full h-[300px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg border-2 border-dashed border-green-500">
    <p className="text-muted-foreground">
      Gráfico RSI para **{stock}** será renderizado aqui.
    </p>
  </div>
);

const MACDChartPlaceholder = ({ stock }: IChartProps) => (
  <div className="w-full h-[300px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center rounded-lg border-2 border-dashed border-green-500">
    <p className="text-muted-foreground">
      Gráfico MACD para **{stock}** será renderizado aqui.
    </p>
  </div>
);

// =================================================================
// 3. COMPONENTE PRINCIPAL DA PÁGINA
// =================================================================

/**
 * Componente principal da página de estudos.
 * 🚨 Solução do Erro: A função DEVE ser 'async' para resolver o 'params'
 * (que é uma Promise) e permitir que os dados sejam carregados.
 */
export default async function EstudoPage({ params }: IStockPageProps) {
  // A Promise de 'params' é resolvida automaticamente pelo 'async' na definição da função.
  const { stock } = await params;

  // 🛡️ Validação de parâmetro
  if (!stock || stock.trim() === '') {
    return null;
  }

  const displayStock: string = stock;

  return (
    <main className="flex flex-col items-center px-6 mt-4 pb-16 w-full">
      <div className="w-full max-w-7xl">
        {/* Link de Volta */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-green-600 hover:text-green-700 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Voltar para a Busca
        </Link>

        {/* Título Principal */}
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-foreground mb-10">
          Estudo de Ativo:{' '}
          <span className="text-[#22c55e]">{displayStock}</span>
        </h1>

        {/* --- Seção de Gráfico e Dados (Layout 3/4 + 1/4) --- */}
        <section className="flex flex-col lg:flex-row gap-8">
          {/* Coluna Principal do Gráfico (70%) */}
          <div className="lg:w-3/4 space-y-4">
            <h2 className="text-2xl font-semibold mb-4">
              Análise Técnica e Histórica
            </h2>

            {/* GRÁFICO 1: Candlestick Principal */}
            <CandlestickChartPlaceholder stock={displayStock} />

            {/* GRÁFICO 2: Volume, logo abaixo do Candlestick */}
            <VolumeChartPlaceholder stock={displayStock} />

            {/* GRÁFICOS 3 e 4: Indicadores (RSI e MACD) lado a lado no desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              <RSIChartPlaceholder stock={displayStock} />
              <MACDChartPlaceholder stock={displayStock} />
            </div>
          </div>

          {/* Coluna de Detalhes (30%) */}
          <aside className="lg:w-1/4 bg-card p-6 rounded-lg shadow-md border">
            <h2 className="text-2xl font-semibold mb-4">Detalhes</h2>
            <div className="space-y-4 text-sm">
              <p>
                <strong>Cotação Atual:</strong> R$ XX.XX
              </p>
              <p>
                <strong>Variação (24h):</strong> Y.YY%
              </p>
              <p>
                <strong>Recomendação:</strong> Aguardando dados...
              </p>
              <p>
                <strong>Último Estudo:</strong> 15/11/2025
              </p>
            </div>
          </aside>
        </section>

        {/* --- Seção de Análise Detalhada --- */}
        <section className="mt-12 p-6 bg-secondary rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Parecer do Analista</h2>
          <p className="text-muted-foreground">
            Aqui entrará o texto descritivo e análise fundamentalista/técnica do
            ativo {displayStock}.
          </p>
        </section>
      </div>
    </main>
  );
}
