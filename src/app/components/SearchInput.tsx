'use client';

import React, { useState, useMemo } from 'react';
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
import { AllowedStocks } from '@/lib/fakedata';

interface Stock {
  ticker: string;
  name: string;
}

const SearchInput: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const router = useRouter();

  const isValidStock = useMemo(() => {
    const ticker = searchTerm.trim().toUpperCase();
    return AllowedStocks.some((stock) => stock.ticker === ticker);
  }, [searchTerm]);

  const isButtonDisabled = !searchTerm.trim() || !isValidStock;

  const buttonStyle = {
    backgroundColor: isHovered && !isButtonDisabled ? '#1a2b13' : '#65a30d',
    color: 'white',
    cursor: isButtonDisabled ? 'not-allowed' : 'pointer',
    transition: 'background-color 0.15s ease-in-out',
  };

  const handleSearch = () => {
    const term = searchTerm.trim().toUpperCase();
    if (!term || !isValidStock) return;
    router.push(`/estudos/${term}`);
    setShowSuggestions(false);
  };

  const handleSuggestionSelect = (suggestion: Stock) => {
    setSearchTerm(suggestion.ticker);
    setShowSuggestions(false);
    router.push(`/estudos/${suggestion.ticker}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') handleSearch();
  };

  const suggestionsToDisplay: Stock[] = useMemo(() => {
    const q = searchTerm.toLowerCase();
    if (!q) return AllowedStocks;
    return AllowedStocks.filter(
      (stock) =>
        stock.ticker.toLowerCase().includes(q) ||
        stock.name.toLowerCase().includes(q),
    );
  }, [searchTerm]);

  return (
    <div className="flex w-full max-w-lg items-center space-x-2">
      <Popover open={showSuggestions} onOpenChange={setShowSuggestions}>
        <PopoverTrigger asChild>
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 z-10" />
            <Input
              type="text"
              placeholder="Pesquisar por ativo (ex: PETR4, Petrobras)"
              className={`pl-10 h-9 w-full rounded-lg border ${
                isValidStock ? 'border-green-500' : 'border-red-500'
              } focus-visible:ring-green-500 relative z-10`}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </PopoverTrigger>

        <PopoverContent className="p-0 shadow-lg z-[9999] w-full" align="start">
          <ScrollArea>
            <div className="p-1 max-h-[165px] overflow-y-auto">
              {suggestionsToDisplay.map((stock) => (
                <div
                  key={stock.ticker}
                  onClick={() => handleSuggestionSelect(stock)}
                  className="flex justify-between items-center p-2 rounded-md hover:bg-accent cursor-pointer text-sm"
                >
                  <span className="font-bold">{stock.ticker}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs">
                    {stock.name}
                  </span>
                </div>
              ))}

              {suggestionsToDisplay.length === 0 && (
                <div className="py-2 text-center text-muted-foreground text-sm">
                  Nenhum ativo encontrado
                </div>
              )}
            </div>
          </ScrollArea>
        </PopoverContent>
      </Popover>

      <TooltipProvider>
        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <Button
              onClick={handleSearch}
              disabled={isButtonDisabled}
              variant="ghost"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={buttonStyle}
              className="h-9 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Buscar
            </Button>
          </TooltipTrigger>

          {isButtonDisabled && (
            <TooltipContent
              side="top"
              className="bg-foreground text-background"
            >
              {!isValidStock ? (
                <p>Digite um ativo válido</p>
              ) : (
                <p>Por favor, digite um ativo</p>
              )}
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default SearchInput;
