'use client';

import React, { useState } from 'react';
import { Mail, Loader2, Send } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'; // Assumindo shadcn/ui Card
import { Input } from '@/components/ui/input'; // Assumindo shadcn/ui Input
import { Textarea } from '@/components/ui/textarea'; // Assumindo shadcn/ui Textarea
import { Button } from '@/components/ui/button'; // Assumindo shadcn/ui Button

interface EmailFormProps {
  simplified?: boolean; // Nova prop para simplificar o layout
}

// 🚨 NOVO: Interface para os dados do formulário 🚨
interface FormData {
  name: string;
  email: string;
  message: string;
}

/**
 * Formulário de Contato por E-mail, utilizando componentes Shadcn UI.
 * Este é um Client Component para lidar com estado e interação do usuário.
 */
const EmailForm: React.FC<EmailFormProps> = ({ simplified = false }) => {
  // 🚨 CORREÇÃO DE TIPAGEM: Usando tipos explícitos para o estado 🚨
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // 🚨 CORREÇÃO DE TIPAGEM: Evento de formulário e dados prontos para API 🚨
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação básica
    if (!name || !email || !message) {
      setStatus('error');
      return;
    }

    setIsLoading(true);
    setStatus('idle');

    // Dados prontos para o POST na API
    const formData: FormData = { name, email, message };
    console.log('Dados do formulário prontos para API:', formData);

    // Simulação de delay de rede
    setTimeout(() => {
      // Em um ambiente real, você faria um 'fetch' ou 'axios.post' aqui:
      // fetch('/api/send-email', { method: 'POST', body: JSON.stringify(formData) });

      // Simular sucesso
      setIsLoading(false);
      setStatus('success');

      // Limpa o formulário
      setName('');
      setEmail('');
      setMessage('');

      // Limpar o status após 5 segundos
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  const getStatusMessage = () => {
    if (status === 'success') {
      return (
        <p className="text-sm text-green-600 dark:text-green-400 font-semibold flex items-center mt-3">
          <Send className="w-4 h-4 mr-2" />
          Email enviado com sucesso! Obrigado pelo seu contacto.
        </p>
      );
    }
    if (status === 'error') {
      return (
        <p className="text-sm text-red-600 dark:text-red-400 font-semibold mt-3">
          Por favor, preencha todos os campos corretamente.
        </p>
      );
    }
    return null;
  };

  // Renderiza o conteúdo do formulário (que será o mesmo, dentro ou fora do Card/Dialog)
  const formContent = (
    // 🚨 CORREÇÃO DE TIPAGEM: O elemento form agora espera um React.FormEvent<HTMLFormElement> 🚨
    <form onSubmit={handleSubmit} className="w-full">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium leading-none">
            Nome
          </label>
          {/* 🚨 CORREÇÃO DE TIPAGEM: onChange com React.ChangeEvent<HTMLInputElement> 🚨 */}
          <Input
            id="name"
            placeholder="O seu nome completo"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium leading-none">
            Email
          </label>
          {/* 🚨 CORREÇÃO DE TIPAGEM: onChange com React.ChangeEvent<HTMLInputElement> 🚨 */}
          <Input
            id="email"
            type="email"
            placeholder="o.seu.email@exemplo.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium leading-none">
            Mensagem
          </label>
          {/* 🚨 CORREÇÃO DE TIPAGEM: onChange com React.ChangeEvent<HTMLTextAreaElement> 🚨 */}
          <Textarea
            id="message"
            placeholder="Escreva a sua mensagem aqui..."
            rows={5}
            value={message}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMessage(e.target.value)
            }
            disabled={isLoading}
          />
        </div>

        {getStatusMessage()}
      </div>

      <Button
        type="submit"
        className="w-full mt-6 transition-all duration-300"
        disabled={isLoading || status === 'success'}
      >
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Send className="mr-2 h-4 w-4" />
        )}
        {isLoading ? 'A Enviar...' : 'Enviar Mensagem'}
      </Button>
    </form>
  );

  // Se simplified for true, retorna apenas o conteúdo do formulário (usado no Modal)
  if (simplified) {
    return formContent;
  }

  // Caso contrário, retorna a estrutura completa do Card (layout original)
  return (
    <Card className="w-full max-w-lg mx-auto border-gray-300 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Mail className="w-6 h-6 mr-2 text-primary" />
          Entre em Contacto
        </CardTitle>
        <CardDescription>
          Envie a sua mensagem diretamente para o cliente/analista.
        </CardDescription>
      </CardHeader>
      <CardContent>{formContent}</CardContent>
      <CardFooter>
        {/* O botão já está embutido no formContent, então o CardFooter pode ser vazio ou ter outros elementos */}
      </CardFooter>
    </Card>
  );
};

export default EmailForm;
