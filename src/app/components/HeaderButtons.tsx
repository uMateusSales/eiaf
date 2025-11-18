'use client';

import Link from 'next/link';
import React from 'react';
import { Button } from '@/components/ui/button';

const HeaderButtons = () => {
  return (
    <div className="flex justify-between items-center gap-5 p-2">
      <Link href="/">
        <Button className="border-2 border-amber-50 rounded-2xl hover:cursor-pointer hover:opacity-80">
          Home
        </Button>
      </Link>
      <Link href="/estudos">
        <Button className="border-2 border-amber-50 rounded-2xl hover:cursor-pointer hover:opacity-80">
          Ver estudos
        </Button>
      </Link>
    </div>
  );
};

export default HeaderButtons;
