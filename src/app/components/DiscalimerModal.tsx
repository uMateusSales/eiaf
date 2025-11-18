'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import { Button } from '@/components/ui/button';

export default function DisclaimerModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border-black text-neutral-800 hover:bg-black hover:text-white"
        >
          Aviso de responsabilidade{' '}
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-xl bg-amber-50 text-neutral-800">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Aviso Importante
          </DialogTitle>
          <DialogDescription className="text-neutral-700">
            Leia atentamente antes de prosseguir.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm leading-relaxed mt-2">
          <p>
            As informações contidas neste site são de caráter meramente
            independente, isentando-o de qualquer vínculo com instituições e/ou
            parcerias. Não produzimos qualquer tipo de aconselhamento ou
            recomendação para compra ou venda de quaisquer ativos financeiros.
          </p>

          <p>
            Todo o estudo apresentado neste site não oferece garantia para
            operações no intraday, que consiste em realizar compra e venda de um
            ativo no mesmo dia, nem deve ser interpretado como base para
            decisões de investimento. Todo o material apresentado refere-se ao
            intraday e é publicado após o fechamento do mercado.
          </p>

          <p>
            O site foi desenvolvido exclusivamente para pesquisas e estudos
            independentes, criados pelo idealizador, e não pode ser reproduzido
            integral ou parcialmente sem autorização prévia. O intuito do site é
            demonstrar que é possível elaborar estudos de mercado para decisões
            inteligentes.
          </p>

          <p className="font-bold text-2xl">
            O site visa apenas à publicação de estudos independentes sobre
            ativos financeiros listados em bolsas nacionais e internacionais,
            sem exercer qualquer influência nas decisões de terceiros.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
