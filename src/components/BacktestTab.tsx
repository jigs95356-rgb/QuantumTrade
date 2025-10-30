import { TrendingUp } from 'lucide-react';

export function BacktestTab() {
  return (
    <div className="animate-fade-in">
      <div className="card-glass text-center py-16">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-cyan-500/20 rounded-full">
            <TrendingUp className="w-12 h-12 text-cyan-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Backtest Coming Soon</h2>
        <p className="text-slate-400 mb-6 max-w-md mx-auto">
          Test your strategies against historical market data to optimize parameters and
          validate performance before going live.
        </p>
        <div className="space-y-2 max-w-md mx-auto text-left">
          <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <p className="text-sm text-white font-medium">📊 Historical Analysis</p>
            <p className="text-xs text-slate-400">Analyze performance over time periods</p>
          </div>
          <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <p className="text-sm text-white font-medium">📈 Performance Metrics</p>
            <p className="text-xs text-slate-400">Win rate, drawdown, Sharpe ratio & more</p>
          </div>
          <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <p className="text-sm text-white font-medium">⚙️ Parameter Optimization</p>
            <p className="text-xs text-slate-400">Find optimal settings for your strategy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
