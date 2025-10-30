import { Home, Settings, TrendingUp, RefreshCw } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { TabType } from '../types';

export function TabNavigation() {
  const { currentTab, setCurrentTab } = useAppContext();

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <Home className="w-4 h-4" /> },
    { id: 'strategy', label: 'Strategy', icon: <Settings className="w-4 h-4" /> },
    { id: 'backtest', label: 'Backtest', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'hyperopt', label: 'Hyperopt', icon: <RefreshCw className="w-4 h-4" /> },
  ];

  return (
    <div className="flex gap-2 mb-8 border-b border-slate-700/50 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setCurrentTab(tab.id)}
          className={`
            flex items-center gap-2 px-4 py-3 font-medium text-sm
            border-b-2 transition-all duration-300
            ${
              currentTab === tab.id
                ? 'border-cyan-500 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-slate-300'
            }
          `}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
