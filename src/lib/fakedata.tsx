export interface CandleMock {
  date: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}

// Lista com Tickers + Nome completo oficial
export const AllowedStocks = [
  { ticker: 'PETR4', name: 'Petrobras' },
  { ticker: 'VALE3', name: 'Vale S.A.' },
  { ticker: 'ABEV3', name: 'Ambev' },
  { ticker: 'ITUB4', name: 'Itaú Unibanco' },
  { ticker: 'MGLU3', name: 'Magazine Luiza' },
  { ticker: 'BBAS3', name: 'Banco do Brasil' },
] as const;

// 🧾 Utilitário para buscar nome a partir do ticker
export function getStockName(ticker: string): string {
  const found = AllowedStocks.find(
    (item) => item.ticker === ticker.toUpperCase(),
  );
  return found ? found.name : ticker.toUpperCase();
}

// 📊 Função que gera dados mock por hora
export function generateStockData(
  stock: string,
  hours: number = 24 * 5, // padrão: 5 dias, 24h por dia
): CandleMock[] | null {
  const normalized = stock.toUpperCase();

  const exists = AllowedStocks.some((item) => item.ticker === normalized);
  if (!exists) return null;

  function seededRandom(seed: number) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  const seed = normalized
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const history: CandleMock[] = [];
  let lastClose = 50 + seededRandom(seed) * 50;

  const now = new Date();

  for (let i = 0; i < hours; i++) {
    const variation = (seededRandom(seed + i) - 0.5) * 2; // variação menor por hora
    const open = parseFloat((lastClose + variation).toFixed(2));
    const close = parseFloat(
      (open + (seededRandom(seed * (i + 1)) - 0.5) * 2).toFixed(2),
    );

    const high = Math.max(open, close) + seededRandom(seed + i);
    const low = Math.min(open, close) - seededRandom(seed + i);

    lastClose = close;

    const date = new Date(now);
    date.setHours(now.getHours() - (hours - 1 - i)); // retrocede hora a hora
    const formattedDate = date.toISOString(); // ISO completo: YYYY-MM-DDTHH:mm:ss

    history.push({
      date: formattedDate,
      open,
      close,
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      volume: Math.floor(15000 + seededRandom(seed + i) * 200000),
    });
  }

  return history;
}
