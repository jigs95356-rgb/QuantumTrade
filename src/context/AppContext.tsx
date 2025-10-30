import React, { createContext, useState, ReactNode } from 'react';
import { AppContextType, TabType } from '../types';

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [balance, setBalance] = useState(14.32);
  const [marketType, setMarketType] = useState<'futures' | 'spot'>('futures');
  const [selectedStrategyId, setSelectedStrategyId] = useState<string | null>(null);

  return (
    <AppContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        balance,
        setBalance,
        marketType,
        setMarketType,
        selectedStrategyId,
        setSelectedStrategyId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
