import { RefreshCw } from 'lucide-react';

export function HyperoptTab() {
  return (
    <div className="animate-fade-in">
      <div className="card-glass text-center py-16">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-purple-500/20 rounded-full">
            <RefreshCw className="w-12 h-12 text-purple-400" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Hyperopt Coming Soon</h2>
        <p className="text-slate-400 mb-6 max-w-md mx-auto">
          Automatically optimize your strategy parameters using advanced algorithms to discover
          the best combinations for maximum profitability.
        </p>
        <div className="space-y-2 max-w-md mx-auto text-left">
          <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <p className="text-sm text-white font-medium">🔄 Automated Optimization</p>
            <p className="text-xs text-slate-400">Genetic algorithms & Bayesian search</p>
          </div>
          <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <p className="text-sm text-white font-medium">📊 Multi-objective Analysis</p>
            <p className="text-xs text-slate-400">Maximize returns while minimizing risk</p>
          </div>
          <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
            <p className="text-sm text-white font-medium">💾 Checkpoint Saving</p>
            <p className="text-xs text-slate-400">Save and compare optimization runs</p>
          </div>
        </div>
      </div>
    </div>
  );
}
