import { Button } from '@/components/ui/button';

import DisclaimerModal from './components/DiscalimerModal';
import SearchInput from './components/SearchInput';
import { CardRecentStock } from './components/CardRecentStocks';

import ContactModal from './components/ContactModal';

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
    <main className="flex flex-col items-center px-6 mt-4 pb-16 w-full">
      {/* <ContactModal /> */}

      {/* Intro Section - MANTIDA */}
      <section className="flex flex-col items-center text-center max-w-4xl">
        <div className="flex gap-5">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#22c55e]">
            Soluções financeiras por
            <br />
            meio de estudos de ativos
          </h1>
          {/* 🚨 SUBSTITUIÇÃO: <Image /> por <img> */}
          <img
            src="/world.png"
            alt="mundo"
            width={150}
            height={150}
            // Adicionando estilos para manter a aparência se necessário
            style={{ width: 150, height: 150 }}
          />{' '}
        </div>
        <p className="text-muted-foreground text-lg mt-6">
          Aprofunde seus conhecimentos sobre investimentos através dos nossos
          estudos de ativos, pensados para oferecer uma análise clara e eficaz.
        </p>
        <section className="mt-5 mb-5">
          <DisclaimerModal />
        </section>
        <div className="flex flex-col md:flex-row items-center gap-4 mt-8 w-full justify-center max-w-xl">
          {/* 🚨 SUBSTITUIÇÃO: <Link /> por <a> */}
          <a href="/estudos" className="w-auto">
            <Button className="px-8 py-6 text-lg rounded-xl w-full">
              Ver análises dos ativos
            </Button>
          </a>

          {/* Busca Adicionada ao Lado */}
          <div className="w-full">
            <SearchInput />
          </div>
        </div>
        {/* ---------------------------------------------------------------- */}
      </section>

      {/* Seção de Últimos Estudos  */}
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

      {/*  DIV CHAMATIVA DE CALL-TO-ACTION  */}
      <section className="w-full max-w-5xl mt-20 mb-8 p-8 bg-linear-to-r from-green-500/10 to-transparent border border-green-500/50 rounded-2xl shadow-2xl dark:shadow-green-900/50 flex items-center">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-extrabold text-[#22c55e]">
              Gostou das Análises?
            </h3>
            <p className="text-lg text-muted-foreground mt-2 max-w-lg">
              Entre em contato direto com o analista para discutir estratégias
              personalizadas e oportunidades de investimento.
            </p>
          </div>

          {/* O ContactModal agora fornece o botão de ação */}
          <div className="w-full md:w-auto">
            <ContactModal />
          </div>
        </div>
      </section>
      {/* Fim da DIV CHAMATIVA */}
    </main>
  );
}
