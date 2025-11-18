import { Button } from '@/components/ui/button';
import Link from 'next/link';
// IMPORTAÇÕES
import DisclaimerModal from './components/DiscalimerModal';
import SearchInput from './components/SearchInput';
import { CardRecentStock } from './components/CardRecentStocks';
import Image from 'next/image';

// Dados de exemplo para os 3 Cards
const latestStocks = [
  {
    stock: 'PETR4',
    date: '12 de janeiro de 2025',
    recommendation: 'Compra' as const,
  },
  {
    stock: 'VALE3',
    date: '12 de janeiro de 2025',
    recommendation: 'Venda' as const,
  },
  {
    stock: 'ITUB4',
    date: '12 de janeiro de 2025',
    recommendation: 'Manutenção' as const,
  },
];

export default function Home() {
  return (
    // Ajustado 'mt-4' para espaçamento do Header fixo
    <main className="flex flex-col items-center px-6 mt-4 pb-16 w-full">
      {/* Intro Section - MANTIDA */}
      <section className="flex flex-col items-center text-center max-w-4xl">
        <div className="flex gap-5">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#22c55e]">
            Soluções financeiras por
            <br />
            meio de estudos de ativos
          </h1>
          <Image src="/world.png" alt="mundo" width={150} height={150} />{' '}
        </div>
        <p className="text-muted-foreground text-lg mt-6">
          Aprofunde seus conhecimentos sobre investimentos através dos nossos
          estudos de ativos, pensados para oferecer uma análise clara e eficaz.
        </p>
        <section className="mt-5 mb-5">
          <DisclaimerModal />
        </section>
        {/* --- MODIFICAÇÃO: Botão e Busca lado a lado (em telas maiores) --- */}
        <div className="flex flex-col md:flex-row items-center gap-4 mt-8 w-full justify-center max-w-xl">
          {/* Botão Mantido */}
          <Link href="/estudos" className="w-full md:w-auto">
            <Button className="px-8 py-6 text-lg rounded-xl w-full">
              Ver análises dos ativos
            </Button>
          </Link>

          {/* Busca Adicionada ao Lado */}
          <div className="w-full md:w-auto">
            <SearchInput /> {/* Usa o componente que criamos */}
          </div>
        </div>
        {/* ---------------------------------------------------------------- */}
      </section>

      {/* Section de lançamentos mais recentes - ADAPTADA PARA USAR DADOS REAIS */}
      <section className="w-full max-w-5xl mt-20">
        <h2 className="text-3xl font-semibold mb-6 text-foreground">
          Últimos estudos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Mapeando os dados de exemplo, usando o CardRecentStock refatorado */}
          {latestStocks.map((study) => (
            <CardRecentStock
              key={study.stock}
              stock={study.stock}
              date={study.date}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
