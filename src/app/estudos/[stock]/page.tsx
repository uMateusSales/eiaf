'use client';

import { notFound, useParams } from 'next/navigation';
import { getStockName, generateStockData } from '@/lib/fakedata';

import HighTrendChart from '@/app/components/ChartHigh';
import LowTrendChart from '@/app/components/ChartsLow';
import CandlestickChart from '@/app/components/CandlestickChart';
import SearchInput from '@/app/components/SearchInput';

export default function StudyDetailPage() {
  const params = useParams();
  const slug = (params?.stock as string)?.toUpperCase();

  if (!slug) return notFound();

  const data = generateStockData(slug);
  if (!data) return notFound();

  const fullName = getStockName(slug);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-[1400px] mx-auto">
      {/* Título centralizado */}
      <div className=" flex gap-3 justify-between">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Estudo — {fullName} ({slug})
        </h1>
        <SearchInput />
      </div>

      {/* Gráficos de Tendência: grid responsivo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <HighTrendChart stock={slug} />
        <LowTrendChart stock={slug} />
      </div>

      {/* Candlestick */}
      <div className="w-full">
        <CandlestickChart data={data} />
      </div>
    </div>
  );
}
