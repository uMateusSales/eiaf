import { Loader2 } from 'lucide-react';
import React from 'react';

// Este componente é exibido enquanto o Server Component (page.tsx) carrega
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-[80vh]">
      {/* Spinner do shadcn/ui */}
      <Loader2 className="h-12 w-12 animate-spin text-green-500" />
      <p className="mt-4 text-lg text-muted-foreground">
        Carregando dados do ativo...
      </p>
    </div>
  );
}
