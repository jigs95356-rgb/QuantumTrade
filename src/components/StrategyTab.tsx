import { useState } from 'react';
import { Check, Lock, Settings } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import {
  mockStrategies,
  getTierForBalance,
} from '../data/mockData';

export function StrategyTab() {
  const { balance, setBalance, marketType, setMarketType, selectedStrategyId, setSelectedStrategyId } =
    useAppContext();
  const [leverage, setLeverage] = useState(2);
  const [positionSize, setPositionSize] = useState(1);
  const [riskPercent, setRiskPercent] = useState(1.5);
  const [tempBalance, setTempBalance] = useState(balance.toString());

  const currentTier = getTierForBalance(balance);
  const selectedStrategy = mockStrategies.find((s) => s.id === selectedStrategyId);

  const handleBalanceChange = () => {
    const newBalance = parseFloat(tempBalance);
    if (newBalance > 0) {
      setBalance(newBalance);
    }
  };

  const groupedStrategies = [
    {
      tier: 1,
      name: 'Tier 1 - Available Now',
      minBalance: 10,
      strategies: mockStrategies.filter((s) => s.tier === 1),
    },
    {
      tier: 2,
      name: 'Tier 2 - Unlocks at $20',
      minBalance: 20,
      strategies: mockStrategies.filter((s) => s.tier === 2),
    },
    {
      tier: 3,
      name: 'Tier 3 - Unlocks at $50',
      minBalance: 50,
      strategies: mockStrategies.filter((s) => s.tier === 3),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="card-glass">
        <h3 className="text-lg font-semibold text-white mb-4">Account Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-300 mb-2">Account Balance</label>
            <div className="flex gap-2">
              <input
                type="number"
                value={tempBalance}
                onChange={(e) => setTempBalance(e.target.value)}
                step="0.1"
                min="0"
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button
                onClick={handleBalanceChange}
                className="btn-primary text-sm"
              >
                Update
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-2">Current: ${balance.toFixed(2)}</p>
          </div>
          <div>
            <label className="block text-sm text-slate-300 mb-2">Market Type</label>
            <div className="flex gap-2">
              <button
                onClick={() => setMarketType('futures')}
                className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                  marketType === 'futures'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                Futures
              </button>
              <button
                onClick={() => setMarketType('spot')}
                className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                  marketType === 'spot'
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                Spot
              </button>
            </div>
          </div>
        </div>
      </div>

      {groupedStrategies.map((group) => {
        const isAvailable = currentTier >= group.tier;
        return (
          <div key={group.tier} className="card-glass">
            <div className="flex items-center gap-2 mb-4">
              {isAvailable ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Lock className="w-5 h-5 text-slate-400" />
              )}
              <h3 className="text-lg font-semibold text-white">{group.name}</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.strategies.map((strategy) => {
                const isLocked = !isAvailable;
                const isSelected = selectedStrategyId === strategy.id;

                return (
                  <button
                    key={strategy.id}
                    onClick={() => {
                      if (!isLocked) {
                        setSelectedStrategyId(isSelected ? null : strategy.id);
                      }
                    }}
                    disabled={isLocked}
                    className={`
                      relative p-4 rounded-lg border-2 transition-all duration-200
                      ${
                        isSelected
                          ? 'border-cyan-500 bg-cyan-500/10'
                          : isLocked
                            ? 'border-slate-700 bg-slate-800/30 opacity-50 cursor-not-allowed'
                            : 'border-slate-700 bg-slate-800/50 hover:border-cyan-500/50 hover:bg-slate-800'
                      }
                    `}
                  >
                    <div className="text-left">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-2xl mb-1">{strategy.icon}</p>
                          <p className="font-semibold text-white">{strategy.name}</p>
                        </div>
                        {isSelected ? (
                          <Check className="w-5 h-5 text-cyan-400" />
                        ) : isLocked ? (
                          <Lock className="w-5 h-5 text-slate-500" />
                        ) : (
                          <Settings className="w-5 h-5 text-slate-400" />
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mb-2">{strategy.description}</p>
                      {isLocked && (
                        <p className="text-xs text-yellow-400">
                          Unlock at ${group.minBalance.toFixed(0)}
                        </p>
                      )}
                      {!isLocked && (
                        <p className="text-xs text-green-400">
                          {strategy.marketType === 'both'
                            ? 'Both'
                            : strategy.marketType === 'futures'
                              ? 'Futures'
                              : 'Spot'}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {selectedStrategy && (
        <div className="card-glass">
          <h3 className="text-lg font-semibold text-white mb-6">
            {selectedStrategy.name} - Parameters
          </h3>

          <div className="space-y-6">
            {selectedStrategy.parameters.leverage && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-slate-300">Leverage</label>
                  <span className="text-lg font-semibold text-cyan-400">{leverage}x</span>
                </div>
                <input
                  type="range"
                  min={selectedStrategy.parameters.leverage.min}
                  max={selectedStrategy.parameters.leverage.max}
                  step="0.1"
                  value={leverage}
                  onChange={(e) => setLeverage(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>{selectedStrategy.parameters.leverage.min}x</span>
                  <span>{selectedStrategy.parameters.leverage.max}x</span>
                </div>
              </div>
            )}

            {selectedStrategy.parameters.positionSize && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-slate-300">Position Size</label>
                  <span className="text-lg font-semibold text-cyan-400">
                    ${positionSize.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min={selectedStrategy.parameters.positionSize.min}
                  max={selectedStrategy.parameters.positionSize.max}
                  step="0.1"
                  value={positionSize}
                  onChange={(e) => setPositionSize(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>${selectedStrategy.parameters.positionSize.min.toFixed(2)}</span>
                  <span>${selectedStrategy.parameters.positionSize.max.toFixed(2)}</span>
                </div>
              </div>
            )}

            {selectedStrategy.parameters.riskPercent && (
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm text-slate-300">Risk %</label>
                  <span className="text-lg font-semibold text-cyan-400">
                    {riskPercent.toFixed(2)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={selectedStrategy.parameters.riskPercent.min}
                  max={selectedStrategy.parameters.riskPercent.max}
                  step="0.1"
                  value={riskPercent}
                  onChange={(e) => setRiskPercent(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>{selectedStrategy.parameters.riskPercent.min.toFixed(2)}%</span>
                  <span>{selectedStrategy.parameters.riskPercent.max.toFixed(2)}%</span>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-700/50">
              <div className="grid grid-cols-2 gap-4">
                <button className="btn-secondary">Reset</button>
                <button className="btn-primary bg-green-600 hover:bg-green-700">
                  Save & Deploy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!selectedStrategy && (
        <div className="card-glass text-center py-8">
          <Settings className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-400">Select a strategy to configure parameters</p>
        </div>
      )}
    </div>
  );
}
