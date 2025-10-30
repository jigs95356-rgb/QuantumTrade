export type TabType = 'home' | 'strategy' | 'backtest' | 'hyperopt';

export interface AppContextType {
  currentTab: TabType;
  setCurrentTab: (tab: TabType) => void;
  balance: number;
  setBalance: (balance: number) => void;
  marketType: 'futures' | 'spot';
  setMarketType: (type: 'futures' | 'spot') => void;
  selectedStrategyId: string | null;
  setSelectedStrategyId: (id: string | null) => void;
}
