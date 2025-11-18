// lib/mockData.ts

/**
 * Interface para um único ponto de dados de vela (OHLC).
 */
export interface CandleData {
  date: string; // Data no formato YYYY-MM-DD
  open: number; // Abertura
  high: number; // Máxima
  low: number; // Mínima
  close: number; // Fechamento (Usado como valor primário para Gráfico de Linha)
}

/**
 * Dados simulados para o gráfico de vela/linha.
 */
export const mockCandleData: CandleData[] = [
  { date: '2025-11-01', open: 50.0, high: 52.5, low: 49.0, close: 51.5 },
  { date: '2025-11-04', open: 51.5, high: 53.0, low: 51.0, close: 52.8 },
  { date: '2025-11-05', open: 52.8, high: 52.9, low: 50.5, close: 51.0 },
  { date: '2025-11-06', open: 51.0, high: 51.8, low: 50.0, close: 51.7 },
  { date: '2025-11-07', open: 51.7, high: 53.5, low: 51.5, close: 53.2 },
  { date: '2025-11-08', open: 53.2, high: 54.0, low: 52.5, close: 53.0 },
  { date: '2025-11-11', open: 53.0, high: 55.0, low: 52.8, close: 54.5 },
  { date: '2025-11-12', open: 54.5, high: 54.8, low: 53.5, close: 53.8 },
  { date: '2025-11-13', open: 53.8, high: 54.1, low: 53.0, close: 54.0 },
  { date: '2025-11-14', open: 54.0, high: 56.0, low: 53.9, close: 55.5 },
];

/**
 * Data de estudo simulada.
 */
export const mockStudyDate = '15/11/2025';
