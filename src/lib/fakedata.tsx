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
 * 🚨 Ajustados para ter CORPOS GRANDES E PAVIOS ENORMES. 🚨
 */
export const mockCandleData: CandleData[] = [
  // Vela 1: Alta. Corpo Grande (50->65). Pavios Extremos (High: 85, Low: 30)
  { date: '2025-11-01', open: 50.0, high: 85.0, low: 30.0, close: 65.0 },
  // Vela 2: Alta. Corpo Médio (65->75). Pavios médios.
  { date: '2025-11-04', open: 65.0, high: 78.0, low: 62.0, close: 75.0 },
  // Vela 3: Baixa. Corpo Grande (75->60). Pavios Médios.
  { date: '2025-11-05', open: 75.0, high: 77.0, low: 58.0, close: 60.0 },
  // Vela 4: Alta. Corpo Pequeno (60->61). Pavios Extremos (High: 80, Low: 40)
  { date: '2025-11-06', open: 60.0, high: 80.0, low: 40.0, close: 61.0 },
  // Vela 5: Alta. Corpo Médio (61->70).
  { date: '2025-11-07', open: 61.0, high: 73.0, low: 59.0, close: 70.0 },
  // Vela 6: Baixa. Corpo Grande (70->55).
  { date: '2025-11-08', open: 70.0, high: 72.0, low: 53.0, close: 55.0 },
  // Vela 7: Alta. Corpo Grande (55->70). Pavios Extremos (High: 90, Low: 35)
  { date: '2025-11-11', open: 55.0, high: 90.0, low: 35.0, close: 70.0 },
  // Vela 8: Baixa. Corpo Médio (70->65).
  { date: '2025-11-12', open: 70.0, high: 71.0, low: 64.0, close: 65.0 },
  // Vela 9: Alta. Corpo Médio (65->72).
  { date: '2025-11-13', open: 65.0, high: 75.0, low: 63.0, close: 72.0 },
  // Vela 10: Alta. Corpo Pequeno (72->73). Pavios Extremos (High: 85, Low: 50)
  { date: '2025-11-14', open: 72.0, high: 85.0, low: 50.0, close: 73.0 },
];

/**
 * Data de estudo simulada.
 */
export const mockStudyDate = '15/11/2025';
