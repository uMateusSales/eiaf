'use client';

import React from 'react';

interface BaseChartWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
  height?: number;
}

/**
 * Componente Wrapper para gráficos, replicando a aparência de Card/Chart do shadcn/ui.
 * É um Cliente Component.
 */
const BaseChartWrapper: React.FC<BaseChartWrapperProps> = ({
  title,
  description,
  children,
  height = 300,
}) => {
  return (
    <div className="bg-card text-card-foreground shadow-lg rounded-xl border border-gray-200 dark:border-gray-800">
      <div className="flex flex-col space-y-1.5 p-6 border-b dark:border-gray-800">
        <h3 className="text-xl font-semibold leading-none tracking-tight">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="p-6">
        <div style={{ width: '100%', height: height }}>{children}</div>
      </div>
    </div>
  );
};

export default BaseChartWrapper;
