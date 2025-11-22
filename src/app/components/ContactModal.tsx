'use client';

import React, { useState } from 'react'; // Mantendo useState para controle de estado
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // 🚨 REINTRODUZIDO: DialogTrigger é necessário para abrir com um botão 🚨
  DialogTrigger,
} from '@/components/ui/dialog';
import EmailForm from './EmailForm';

/**
 * Modal de contato que é acionado por um botão (DialogTrigger).
 * O botão de acionamento é o que você colocará na sua "div chamativa".
 */
const ContactModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* 1. DialogTrigger (Botão que abre o modal) */}
      {/* Este componente será usado no app/page.tsx para criar o botão visualmente atraente */}
      <DialogTrigger asChild>
        {/* Usamos a prop 'asChild' para que o botão seja o gatilho, mas você pode envolver o ContactModal */}
        <Button className="w-full md:w-auto px-8 py-6 text-1xl rounded-xl transition-all duration-300 transform hover:scale-[1.03] shadow-xl bg-primary hover:bg-primary/90  items-center justify-center">
          Deseja entrar em contato comigo ou tirar duvidas sobre os estudos?
          <br />
          Fale por aqui
        </Button>
      </DialogTrigger>

      {/* 2. O Conteúdo do Modal (Dialog) */}
      <DialogContent className="sm:max-w-[425px] md:max-w-xl p-0">
        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-3xl font-bold text-primary">
              Entre em Contacto
            </DialogTitle>
            <DialogDescription>
              Preencha os campos abaixo para enviar a sua mensagem ao analista.
            </DialogDescription>
          </DialogHeader>

          <EmailForm />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
