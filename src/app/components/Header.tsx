'use client';

import React from 'react';
import Link from 'next/link';
import HeaderIcon from '../../../public/HeaderIcon';
import HeaderButtons from './HeaderButtons';
import SearchInput from './SearchInput';

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-md p-4">
      {/* Container principal para o conteúdo do header. A altura h-16 + p-4 em cima define a altura total */}
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <a
          href="/"
          // shrink-0 para garantir que o logo/título não seja espremido pela busca
          className="flex items-center space-x-2 shrink-0 hover:opacity-80 transition-opacity"
        >
          <a href="/">
            <HeaderIcon />
          </a>
          <span className="text-xl md:text-2xl font-bold text-[#22c55e] hidden sm:inline">
            Estudos financeiros inteligentes
          </span>
          <span className="text-2xl font-bold text-[#22c55e] sm:hidden">
            EFI
          </span>
        </a>

        <div className="hidden lg:flex grow justify-center mx-10 max-w-lg">
          <SearchInput />
        </div>

        {/* shrink-0 para garantir que os botões não sejam espremidos */}
        <div className="flex items-center justify-end shrink-0">
          <HeaderButtons />
        </div>
      </div>
    </header>
  );
}

export default Header;
