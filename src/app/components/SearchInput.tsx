'use client';

import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

// Dados Mockup
const MOCK_SUGGESTIONS = [
  'PETR4',
  'VALE3',
  'ITUB4',
  'BBAS3',
  'BNDES',
  'ELET6',
  'AZUL4',
  'GGBR4',
  'MGLU3',
  'AMER3',
  'CDBI3',
  'WEGE3',
];

function SearchInput() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isHovered, setIsHovered] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const router = useRouter();

  const searchRef = useRef<HTMLDivElement>(null);
  const isButtonDisabled = !searchTerm.trim();

  const buttonStyle = {
    backgroundColor: isHovered && !isButtonDisabled ? '#1a2b13' : '#65a30d',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease-in-out',
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  // 🚨 FUNÇÃO DE BUSCA E NAVEGAÇÃO
  const handleSearch = () => {
    const term = searchTerm.trim();
    if (term) {
      // Navega para /estudos/PETR4 ou /estudos/VALE TENHO QUE TESTAR SOBRE O UPPERCASE PQ ESSAS PORRA DE AÇÃO [E TUDO MAIUSCULO].
      router.push(`/estudos/${term.toUpperCase()}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    router.push(`/estudos/${suggestion.toUpperCase()}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const suggestionsToDisplay = searchTerm
    ? MOCK_SUGGESTIONS.filter((s) =>
        s.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : MOCK_SUGGESTIONS;

  const shouldShowNotFound =
    searchTerm.length > 0 && suggestionsToDisplay.length === 0;

  return (
    <div className="flex w-full max-w-lg items-center space-x-2">
      <Popover open={showSuggestions} onOpenChange={setShowSuggestions}>
        <PopoverTrigger asChild>
          <div
            className="relative grow"
            ref={searchRef}
            onClick={() => setShowSuggestions(true)}
            onFocus={() => setShowSuggestions(true)}
          >
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 z-10" />
            <Input
              type="text"
              placeholder="Pesquisar por ativo"
              className="pl-10 h-9 w-full rounded-lg border border-green-500 focus-visible:ring-green-500 relative z-10"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={handleKeyDown}
            />
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="p-0 shadow-lg"
          style={{ width: searchRef.current?.clientWidth }}
          align="start"
        >
          <ScrollArea>
            <div
              className={`p-1 ${
                suggestionsToDisplay.length > 0
                  ? 'max-h-[144px] overflow-y-auto'
                  : ''
              }`}
            >
              {suggestionsToDisplay.length > 0
                ? suggestionsToDisplay.map((suggestion) => (
                    <div
                      key={suggestion}
                      onClick={() => handleSuggestionSelect(suggestion)}
                      className="flex items-center p-2 rounded-md hover:bg-accent cursor-pointer text-sm"
                    >
                      {suggestion}
                    </div>
                  ))
                : shouldShowNotFound && (
                    <div className="py-2 text-center text-muted-foreground text-sm">
                      Nenhum ativo com os caracteres digitados foi encontrado
                    </div>
                  )}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      <TooltipProvider>
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Button
              onClick={handleSearch}
              disabled={isButtonDisabled}
              variant="ghost"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={buttonStyle}
              className="h-9 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buscar
            </Button>
          </TooltipTrigger>

          {isButtonDisabled && (
            <TooltipContent
              side="top"
              className="bg-foreground text-background"
            >
              <p>Por favor, digite um ativo</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default SearchInput;
