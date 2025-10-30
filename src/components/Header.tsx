import { Zap } from 'lucide-react';

export function Header() {
  return (
    <header className="glass-dark rounded-lg p-6 mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-cyan-500/20 rounded-lg">
          <Zap className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">QuantumTrade</h1>
          <p className="text-slate-400 text-sm">Intelligent Crypto Trading Dashboard</p>
        </div>
      </div>
    </header>
  );
}
