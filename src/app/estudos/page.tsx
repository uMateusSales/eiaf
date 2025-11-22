'use client';

import React, { useMemo } from 'react';
import {
  TrendingUp,
  DollarSign,
  BookOpen,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { AllowedStocks } from '@/lib/fakedata';

// ========================================================================
// CARD SIMPLIFICADO DA LISTA
// ========================================================================
const SimpleStudyCard: React.FC<{ ticker: string; name: string }> = ({
  ticker,
  name,
}) => {
  return (
    <a
      href={`/estudos/${ticker}`}
      className="group block p-5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 h-full flex flex-col justify-between"
      title={`Ver estudos de ${name}`}
    >
      <div>
        {/* Ícone e Nome */}
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {ticker} — {name}
          </span>
        </div>

        {/* Infos */}
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="font-semibold mr-1">Estudos publicados:</span>
          <span className="font-medium">Últimos 60 dias</span>
        </div>
      </div>

      {/* Botão */}
      <div className="mt-6">
        <button className="w-full flex items-center justify-center p-3 text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 transition-colors duration-200">
          Ver Gráficos e Detalhes
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </a>
  );
};

// ========================================================================
// PÁGINA PRINCIPAL
// ========================================================================
const EstudosPage: React.FC = () => {
  const studies = useMemo(() => AllowedStocks, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Título */}
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
            Arquivo Completo de Ativos
          </h1>
          <p className="mt-3 text-xl text-gray-600 dark:text-gray-400">
            Acesso rápido aos ativos com histórico de estudos independentes.
          </p>
        </header>

        {/* Lista */}
        <section className="w-full">
          <h2 className="text-3xl font-semibold mb-6 text-gray-900 dark:text-white">
            Ativos Analisados ({studies.length})
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {studies.map(({ ticker, name }) => (
              <SimpleStudyCard key={ticker} ticker={ticker} name={name} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default EstudosPage;
