import { AppProvider, useAppContext } from './context/AppContext';
import { Header } from './components/Header';
import { TabNavigation } from './components/TabNavigation';
import { HomeTab } from './components/HomeTab';
import { StrategyTab } from './components/StrategyTab';
import { BacktestTab } from './components/BacktestTab';
import { HyperoptTab } from './components/HyperoptTab';

function AppContent() {
  const { currentTab } = useAppContext();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        <TabNavigation />

        <main>
          {currentTab === 'home' && <HomeTab />}
          {currentTab === 'strategy' && <StrategyTab />}
          {currentTab === 'backtest' && <BacktestTab />}
          {currentTab === 'hyperopt' && <HyperoptTab />}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
