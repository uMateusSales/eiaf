'use client';

import { notFound, useParams } from 'next/navigation';
import { getStockName, generateStockData } from '@/lib/fakedata';

import HighTrendChart from '@/app/components/ChartHigh';
import LowTrendChart from '@/app/components/ChartsLow';
import CandlestickChart from '@/app/components/CandlestickChart';

export default function StudyDetailPage() {
  const params = useParams();
  const slug = (params?.stock as string)?.toUpperCase();

  if (!slug) return notFound();

  const data = generateStockData(slug);
  if (!data) return notFound();

  const fullName = getStockName(slug);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">
        Estudo — {fullName} ({slug})
      </h1>

      {/* Gráficos de Tendência */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <HighTrendChart stock={slug} />
        <LowTrendChart stock={slug} />
      </div>

      {/* Candlestick */}
      <CandlestickChart data={data} />
    </div>
  );
}
