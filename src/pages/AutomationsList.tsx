import React from 'react';
import { Zap, Plus, Trash2, Copy, Pause, Play, Sparkles, MessageSquare } from 'lucide-react';

interface AutomationsListProps {
  automations: any[];
  onNavigate: (view: string) => void;
  onToggleActive: (id: string, current: boolean) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export function AutomationsList({
  automations,
  onNavigate,
  onToggleActive,
  onDelete,
  onDuplicate
}: AutomationsListProps) {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Your Automations</h1>
          <p className="text-xs text-slate-400">Manage all your active and paused Instagram comment triggers</p>
        </div>
        <button
          onClick={() => onNavigate('wizard')}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Create Automation
        </button>
      </div>

      <div className="space-y-4">
        {automations.map((auto) => (
          <div key={auto.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-slate-700 transition-all">
            
            <div className="flex items-start gap-4">
              <img
                src={auto.mediaThumbnailUrl || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600'}
                alt="Reel"
                className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0"
              />
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-sm text-white">{auto.name}</h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${auto.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'}`}>
                    {auto.isActive ? 'Active' : 'Paused'}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {auto.keywords.map((kw: string, i: number) => (
                    <span key={i} className="px-2 py-0.5 rounded-md bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[10px] font-semibold">
                      #{kw}
                    </span>
                  ))}
                </div>
                <p className="text-[11px] text-slate-400 truncate max-w-md">DM: {auto.dmMessage}</p>
              </div>
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-slate-800">
              <div className="text-right hidden sm:block">
                <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Triggers</span>
                <span className="font-extrabold text-white text-sm">{auto.stats.triggeredCount}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleActive(auto.id, auto.isActive)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                    auto.isActive
                      ? 'bg-amber-500/10 border-amber-500/20 text-amber-400 hover:bg-amber-500/20'
                      : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
                  }`}
                  title={auto.isActive ? 'Pause automation' : 'Resume automation'}
                >
                  {auto.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => onDuplicate(auto.id)}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
                  title="Duplicate"
                >
                  <Copy className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onDelete(auto.id)}
                  className="p-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 transition-all"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
