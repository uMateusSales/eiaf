import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// 🚨 IMPORTANDO TODOS OS COMPONENTES DE GRÁFICO CRIADOS 🚨
import HighTrendChart from '@/app/components/ChartHigh';
import LowTrendChart from '@/app/components/ChartsLow';
import ResistanceSupportChart from '@/app/components/ChartResistance';
import CandlestickChart from '@/app/components/ChartCandle'; // Gráfico de Vela de Teste

// =================================================================
// 1. TIPAGEM E INTERFACES
// =================================================================

/**
 * Interface para as propriedades da Page (Server Component Props).
 */
interface IStockPageProps {
  params: {
    stock: string; // Nome da pasta dinâmica [stock]
  };
}

// =================================================================
// 2. COMPONENTE PRINCIPAL DA PÁGINA
// =================================================================

/**
 * Componente principal da página de estudos (Server Component).
 */
export default async function EstudoPage({ params }: IStockPageProps) {
  // Usamos await para garantir que o params seja resolvido.
  // Se "params" não é uma Promise, o await simplesmente retorna o objeto.
  const { stock } = await params;

  // 🛡️ Validação de parâmetro
  if (!stock || stock.trim() === '') {
    return null;
  }

  // Nome do ativo para exibição (exemplo: 'PETR4')
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
          {/* Coluna Principal dos Gráficos (70%) */}
          <div className="lg:w-3/4 space-y-8">
            <h2 className="text-2xl font-semibold mb-4">
              Análise de Tendência
            </h2>

            {/* GRÁFICOS DE TENDÊNCIA (Alta e Baixa) - Empilhados, um logo abaixo do outro */}
            <div className="space-y-4">
              {/* 1. Gráfico de Tendência de Alta (Topo) */}
              <HighTrendChart stock={displayStock} />
              {/* 2. Gráfico de Tendência de Baixa (Logo abaixo) */}
              <LowTrendChart stock={displayStock} />
            </div>

            {/* 🚨 ADICIONANDO O GRÁFICO DE VELA DE TESTE 🚨 */}
            <h2 className="text-2xl font-semibold pt-4 mb-4">
              Gráfico de Vela de Teste (OHLC)
            </h2>
            <div className="space-y-4">
              <CandlestickChart stock={displayStock} />
            </div>
            {/* ----------------------------------------------- */}

            <h2 className="text-2xl font-semibold pt-4 mb-4">
              Níveis de Suporte e Resistência
            </h2>

            {/* GRÁFICOS DE SUPORTE/RESISTÊNCIA - Em grid 2x2 (Um ao lado do outro, em duas linhas) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 1. Resistência */}
              <ResistanceSupportChart stock={displayStock} type="resistance" />
              {/* 2. Suporte */}
              <ResistanceSupportChart stock={displayStock} type="support" />
              {/* 3. Outra Resistência (Para completar os 4) */}
              <ResistanceSupportChart stock={displayStock} type="resistance" />
              {/* 4. Outro Suporte (Para completar os 4) */}
              <ResistanceSupportChart stock={displayStock} type="support" />
            </div>
          </div>

          {/* Coluna de Detalhes (30%) */}
          <aside className="lg:w-1/4 bg-card p-6 rounded-lg shadow-xl border h-fit">
            <h2 className="text-2xl font-semibold mb-4">Detalhes do Estudo</h2>
            <div className="space-y-4 text-sm">
              <p>
                <strong>Código Ativo:</strong> {displayStock}
              </p>
              <p>
                <strong>Data do Estudo:</strong> 15/11/2025
              </p>
              <p>
                <strong>Cotação Atual:</strong> R$ 54.00
              </p>
              <p>
                <strong>Variação (24h):</strong> +0.50%
              </p>
              <p>
                <strong>Recomendação:</strong> Aguardando análise final...
              </p>
            </div>
          </aside>
        </section>

        {/* --- Seção de Análise Detalhada --- */}
        <section className="mt-12 p-6 bg-secondary rounded-lg shadow-inner">
          <h2 className="text-2xl font-semibold mb-4">
            Parecer Final do Analista
          </h2>
          <p className="text-muted-foreground">
            O layout está pronto! Todos os gráficos estão carregando dados
            mockados (simulados) com a estilização Shadcn/Recharts.
          </p>
        </section>
      </div>
    </main>
  );
}
