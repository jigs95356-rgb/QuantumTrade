export interface Trade {
  id: string;
  pair: string;
  side: 'LONG' | 'SHORT';
  entryPrice: number;
  exitPrice: number;
  pnl: number;
  pnlPercent: number;
  duration: string;
  timestamp: Date;
  strategy: string;
}

export interface Position {
  id: string;
  pair: string;
  side: 'LONG' | 'SHORT';
  entryPrice: number;
  currentPrice: number;
  quantity: number;
  currentPnl: number;
  currentPnlPercent: number;
  slPrice: number;
  tpPrice: number;
  leverage: number;
  strategy: string;
  openedAt: Date;
}

export interface Strategy {
  id: string;
  name: string;
  description: string;
  tier: number;
  minBalance: number;
  icon: string;
  marketType: 'futures' | 'spot' | 'both';
  isActive: boolean;
  parameters: {
    leverage?: { min: number; max: number; default: number };
    positionSize?: { min: number; max: number; default: number };
    riskPercent?: { min: number; max: number; default: number };
  };
}

export const mockStrategies: Strategy[] = [
  {
    id: 'micro-scalp',
    name: 'Micro Scalping',
    description: 'Ultra-high frequency scalping for small profits',
    tier: 1,
    minBalance: 10,
    icon: '⚡',
    marketType: 'futures',
    isActive: true,
    parameters: {
      leverage: { min: 1, max: 5, default: 2 },
      positionSize: { min: 0.1, max: 1, default: 0.5 },
      riskPercent: { min: 0.5, max: 2, default: 1 },
    },
  },
  {
    id: 'spot-dca',
    name: 'Spot DCA',
    description: 'Dollar-cost averaging for stable accumulation',
    tier: 1,
    minBalance: 10,
    icon: '📊',
    marketType: 'spot',
    isActive: true,
    parameters: {
      positionSize: { min: 1, max: 10, default: 5 },
      riskPercent: { min: 1, max: 5, default: 2 },
    },
  },
  {
    id: 'nano-grid',
    name: 'Nano Grid',
    description: 'Micro grid trading within tight ranges',
    tier: 1,
    minBalance: 10,
    icon: '📈',
    marketType: 'futures',
    isActive: true,
    parameters: {
      leverage: { min: 1, max: 3, default: 1 },
      positionSize: { min: 0.5, max: 2, default: 1 },
      riskPercent: { min: 0.5, max: 1.5, default: 1 },
    },
  },
  {
    id: 'rsi-bounce',
    name: 'RSI Bounce',
    description: 'Trade oversold/overbought conditions',
    tier: 1,
    minBalance: 10,
    icon: '🎯',
    marketType: 'futures',
    isActive: true,
    parameters: {
      leverage: { min: 1, max: 4, default: 2 },
      positionSize: { min: 0.2, max: 1.5, default: 0.8 },
      riskPercent: { min: 0.5, max: 2, default: 1.5 },
    },
  },
  {
    id: 'power-scalp',
    name: 'Power Scalping',
    description: 'Aggressive scalping with momentum',
    tier: 2,
    minBalance: 20,
    icon: '🔥',
    marketType: 'futures',
    isActive: true,
    parameters: {
      leverage: { min: 2, max: 10, default: 5 },
      positionSize: { min: 0.5, max: 3, default: 1.5 },
      riskPercent: { min: 1, max: 3, default: 2 },
    },
  },
  {
    id: 'swing-trade',
    name: 'Swing Trade',
    description: 'Medium-term trend following',
    tier: 2,
    minBalance: 20,
    icon: '📍',
    marketType: 'futures',
    isActive: true,
    parameters: {
      leverage: { min: 1, max: 5, default: 2 },
      positionSize: { min: 1, max: 5, default: 2 },
      riskPercent: { min: 1, max: 3, default: 1.5 },
    },
  },
];

export const mockTrades: Trade[] = [
  {
    id: '1',
    pair: 'BTC/USDT',
    side: 'LONG',
    entryPrice: 42500,
    exitPrice: 42750,
    pnl: 150,
    pnlPercent: 0.59,
    duration: '45m',
    timestamp: new Date(Date.now() - 45 * 60000),
    strategy: 'Micro Scalping',
  },
  {
    id: '2',
    pair: 'ETH/USDT',
    side: 'SHORT',
    entryPrice: 2250,
    exitPrice: 2240,
    pnl: 85,
    pnlPercent: 0.45,
    duration: '1h 20m',
    timestamp: new Date(Date.now() - 80 * 60000),
    strategy: 'RSI Bounce',
  },
  {
    id: '3',
    pair: 'SOL/USDT',
    side: 'LONG',
    entryPrice: 98,
    exitPrice: 97.5,
    pnl: -45,
    pnlPercent: -0.51,
    duration: '30m',
    timestamp: new Date(Date.now() - 110 * 60000),
    strategy: 'Nano Grid',
  },
  {
    id: '4',
    pair: 'XRP/USDT',
    side: 'LONG',
    entryPrice: 0.62,
    exitPrice: 0.625,
    pnl: 120,
    pnlPercent: 0.81,
    duration: '2h',
    timestamp: new Date(Date.now() - 130 * 60000),
    strategy: 'Spot DCA',
  },
  {
    id: '5',
    pair: 'ADA/USDT',
    side: 'SHORT',
    entryPrice: 1.05,
    exitPrice: 1.02,
    pnl: 175,
    pnlPercent: 2.86,
    duration: '3h 15m',
    timestamp: new Date(Date.now() - 200 * 60000),
    strategy: 'Micro Scalping',
  },
];

export const mockPositions: Position[] = [
  {
    id: '1',
    pair: 'BTC/USDT',
    side: 'LONG',
    entryPrice: 42500,
    currentPrice: 42650,
    quantity: 0.05,
    currentPnl: 7.5,
    currentPnlPercent: 0.35,
    slPrice: 42200,
    tpPrice: 43000,
    leverage: 3,
    strategy: 'Micro Scalping',
    openedAt: new Date(Date.now() - 45 * 60000),
  },
  {
    id: '2',
    pair: 'ETH/USDT',
    side: 'SHORT',
    entryPrice: 2250,
    currentPrice: 2245,
    quantity: 2,
    currentPnl: 10,
    currentPnlPercent: 0.22,
    slPrice: 2270,
    tpPrice: 2200,
    leverage: 2,
    strategy: 'RSI Bounce',
    openedAt: new Date(Date.now() - 80 * 60000),
  },
];

export const mockAccount = {
  balance: 14.32,
  totalPnl: 325.50,
  totalPnlPercent: 2285,
  todayPnl: 0.45,
  todayPnlPercent: 3.2,
  trades: 3,
  wins: 2,
  losses: 1,
  winRate: 66.7,
  status: 'LIVE' as const,
  lastUpdate: new Date(),
};

export function getTierForBalance(balance: number): number {
  if (balance < 10) return 0;
  if (balance < 20) return 1;
  if (balance < 50) return 2;
  return 3;
}

export function getAvailableStrategies(balance: number): Strategy[] {
  const tier = getTierForBalance(balance);
  return mockStrategies.filter((s) => s.tier <= tier);
}

export function getRecommendedStrategies(balance: number): Strategy[] {
  return getAvailableStrategies(balance).slice(0, 2);
}
