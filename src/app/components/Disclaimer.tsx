'use client';

import { Card, CardContent } from '@/components/ui/card';

export default function Disclaimer() {
  return (
    <Card className="bg-amber-50  text-neutral-900 leading-relaxed mt-2">
      <CardContent className="p-6 space-y-4">
        <p>
          As informações contidas neste site são de caráter meramente
          independente, isentando-o de qualquer vínculo com instituições e/ou
          parcerias. Não produzimos qualquer tipo de aconselhamento ou
          recomendação para compra ou venda de quaisquer ativos financeiros.
        </p>

        <p>
          Todo o estudo apresentado neste site não oferece garantia para
          operações no intraday, que basicamente consiste em uma estratégia de
          investimento na qual se realiza a compra e venda de um ativo no mesmo
          dia, nem deve ser interpretado como base para decisões de
          investimento. Todo o material de estudo exibido aqui refere-se ao
          intraday e será publicado após o fechamento do mercado.
        </p>

        <p>
          Concluindo, o site foi desenvolvido única e exclusivamente para
          pesquisas e estudos independentes, criados pelo idealizador, e não
          pode ser reproduzido integralmente ou parcialmente sem consentimento e
          autorização prévia. O intuito do site é demonstrar aos usuários que é
          possível elaborar estudos de mercado para tomadas de decisão de forma
          inteligente.
        </p>

        <p className="font-bold">
          O site visa apenas à publicação de estudos meramente independentes
          sobre ativos financeiros listados em bolsas de valores, sejam em
          território nacional ou internacional, sem exercer qualquer influência
          nas decisões de terceiros.
        </p>
      </CardContent>
    </Card>
  );
}
