import {
  TrendingUp,
  CircleDot,
  Play,
  Square,
  Pause,
  Lock,
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import {
  mockAccount,
  mockPositions,
  mockTrades,
  getRecommendedStrategies,
  getTierForBalance,
} from '../data/mockData';

export function HomeTab() {
  const { balance, marketType, setSelectedStrategyId, setCurrentTab } = useAppContext();
  const tier = getTierForBalance(balance);
  const tierName = ['Minimal', 'Micro Capital', 'Standard', 'Advanced'][tier];
  const recommendedStrategies = getRecommendedStrategies(balance);

  const filteredPositions =
    marketType === 'futures' ? mockPositions : mockPositions.slice(0, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-glass">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm mb-1">Balance</p>
              <h3 className="text-3xl font-bold text-white">${balance.toFixed(2)}</h3>
            </div>
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <CircleDot className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <p className="text-slate-400 text-xs">Tier {tier}: {tierName}</p>
        </div>

        <div className="card-glass">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm mb-1">Today's P&L</p>
              <h3 className="text-3xl font-bold text-green-400">
                +${Math.abs(mockAccount.todayPnl).toFixed(2)}
              </h3>
            </div>
            <div className="p-2 bg-green-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
          </div>
          <p className="text-green-400 text-xs">+{mockAccount.todayPnlPercent.toFixed(1)}%</p>
        </div>

        <div className="card-glass">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-slate-400 text-sm mb-1">Win Rate</p>
              <h3 className="text-3xl font-bold text-white">
                {mockAccount.winRate.toFixed(0)}%
              </h3>
            </div>
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          <p className="text-slate-400 text-xs">
            {mockAccount.wins}W / {mockAccount.losses}L in {mockAccount.trades} trades
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card-glass">
          <h4 className="text-lg font-semibold text-white mb-4">Recommended Strategies</h4>
          <div className="space-y-2">
            {recommendedStrategies.map((strategy) => (
              <button
                key={strategy.id}
                onClick={() => {
                  setSelectedStrategyId(strategy.id);
                  setCurrentTab('strategy');
                }}
                className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 rounded-lg text-left transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{strategy.icon}</span>
                    <div>
                      <p className="font-medium text-white">{strategy.name}</p>
                      <p className="text-xs text-slate-400">{strategy.description}</p>
                    </div>
                  </div>
                  <Play className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="card-glass">
          <h4 className="text-lg font-semibold text-white mb-4">Status & Actions</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-3 bg-slate-800/50 rounded-lg border border-green-500/50">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-green-400">Status: LIVE</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button className="btn-primary bg-green-600 hover:bg-green-700 text-sm">
                <Play className="w-4 h-4 mx-auto" />
              </button>
              <button className="btn-primary bg-yellow-600 hover:bg-yellow-700 text-sm">
                <Pause className="w-4 h-4 mx-auto" />
              </button>
              <button className="btn-primary bg-red-600 hover:bg-red-700 text-sm">
                <Square className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {filteredPositions.length > 0 && (
        <div className="card-glass">
          <h4 className="text-lg font-semibold text-white mb-4">
            Open Positions ({filteredPositions.length})
          </h4>
          <div className="space-y-2">
            {filteredPositions.map((pos) => (
              <div
                key={pos.id}
                className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-all"
              >
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div>
                    <p className="text-xs text-slate-400">Pair</p>
                    <p className="font-semibold text-white">{pos.pair}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Side</p>
                    <p
                      className={`font-semibold ${
                        pos.side === 'LONG' ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {pos.side}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Entry</p>
                    <p className="font-semibold text-white">${pos.entryPrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">P&L</p>
                    <p
                      className={`font-semibold ${
                        pos.currentPnl >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      ${pos.currentPnl.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">TP/SL</p>
                    <p className="font-semibold text-white text-xs">
                      ${pos.tpPrice.toFixed(0)}/${pos.slPrice.toFixed(0)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {filteredPositions.length === 0 && marketType === 'futures' && (
        <div className="card-glass text-center py-8">
          <Lock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-400">No open positions</p>
        </div>
      )}

      <div className="card-glass">
        <h4 className="text-lg font-semibold text-white mb-4">Recent Trades</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {mockTrades.map((trade) => (
            <div
              key={trade.id}
              className="p-3 bg-slate-800/50 rounded-lg flex justify-between items-center hover:bg-slate-700/50 transition-all"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{trade.strategy === 'Micro Scalping' ? '⚡' : '📊'}</span>
                  <div>
                    <p className="font-medium text-white">{trade.pair}</p>
                    <p className="text-xs text-slate-400">{trade.duration}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-semibold ${
                    trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {trade.pnl >= 0 ? '+' : ''}${trade.pnl.toFixed(2)}
                </p>
                <p className="text-xs text-slate-400">{trade.side}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
