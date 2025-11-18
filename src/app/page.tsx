import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CardRecentStock } from './components/CardRecentStocks';
import Disclaimer from './components/Disclaimer';
import DisclaimerModal from './components/DiscalimerModal';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center px-6 py-16">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight text-[#22c55e]">
          Soluções financeiras por
          <br />
          meio de estudos de ativos
        </h1>

        <p className="text-muted-foreground text-lg mt-6">
          Aprofunde seus conhecimentos sobre investimentos através dos nossos
          estudos de ativos, pensados para oferecer uma análise clara e eficaz.
        </p>
        <section className="mt-5 mb-5">
          <DisclaimerModal />
        </section>

        <Link href="/estudos">
          <Button className="mt-8 px-8 py-6 text-lg rounded-xl">
            Ver análises dos ativos
          </Button>
        </Link>
      </section>

      {/* Últimos Estudos */}
      <section className="w-full max-w-5xl mt-20">
        <h2 className="text-3xl font-semibold mb-6 text-foreground">
          Últimos estudos
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <CardRecentStock stock="PETR4" date="12 de janeiro de 2025" />
          <CardRecentStock stock="VALE3" date="12 de janeiro de 2025" />
          <CardRecentStock stock="AAPL" date="12 de janeiro de 2025" />
        </div>
      </section>
    </main>
  );
}
