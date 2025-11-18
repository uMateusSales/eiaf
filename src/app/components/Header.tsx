'use client';

import React from 'react';
import HeaderIcon from '../../../public/HeaderIcon';
import HeaderButtons from './HeaderButtons';

function Header() {
  return (
    <div className="border-2 border-black rounded flex items-center flex-row justify-between m-1">
      <div className="flex items-center hover:opacity-50">
        <HeaderIcon />
        <p className="text-4xl text-[#22c55e]">
          Estudos financeiros inteligentes
        </p>
      </div>
      <HeaderButtons />
    </div>
  );
}

export default Header;
