import React, { useState } from 'react';
import { Instagram, Zap, MessageSquare, Send, TrendingUp, Plus, ArrowRight, RefreshCcw, ExternalLink, Sparkles } from 'lucide-react';

interface DashboardProps {
  user: any;
  instagramAccount: any;
  automations: any[];
  usage: any;
  subscription: any;
  onNavigate: (view: string) => void;
  onSimulateTrigger: (autoId: string) => void;
}

export function Dashboard({
  user,
  instagramAccount,
  automations,
  usage,
  subscription,
  onNavigate,
  onSimulateTrigger
}: DashboardProps) {
  const [simulatingId, setSimulatingId] = useState<string | null>(null);

  const handleSimulate = (autoId: string) => {
    setSimulatingId(autoId);
    setTimeout(() => {
      onSimulateTrigger(autoId);
      setSimulatingId(null);
    }, 800);
  };

  const totalDms = usage?.dmsSent || 223;
  const totalComments = usage?.commentsCaught || 231;
  const successRate = totalComments > 0 ? ((totalDms / totalComments) * 100).toFixed(1) : '98.5';

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Top Banner / Connected Profile Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-pink-500 via-violet-500 to-fuchsia-600 p-1 shadow-lg">
              <img
                src={instagramAccount?.profilePictureUrl || user?.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                alt="Profile"
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">
                {instagramAccount ? `@${instagramAccount.username}` : user?.displayName || 'Creator'}
              </h1>
              <span className="bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                {subscription?.plan || 'Pro'} Plan
              </span>
            </div>
            <p className="text-xs text-slate-400">
              {instagramAccount ? instagramAccount.name : 'Instagram Business Account Connected'} • Token active (expires in 58 days)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => onNavigate('wizard')}
            className="flex-1 md:flex-none px-6 py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-xs shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Automation</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-400">Comments Caught</span>
            <div className="w-9 h-9 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">{totalComments}</div>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +24% from last week
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-400">Instant DMs Sent</span>
            <div className="w-9 h-9 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
              <Send className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">{totalDms}</div>
          <p className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> 100% automated delivery
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-400">Success Rate</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">{successRate}%</div>
          <p className="text-[11px] text-slate-400">Instant reply & delivery</p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-slate-400">Active Automations</span>
            <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white mb-1">{automations.filter(a => a.isActive).length}</div>
          <p className="text-[11px] text-slate-400">Running 24/7 on Reels</p>
        </div>

      </div>

      {/* Active Automations Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">Your Active Automations</h2>
          <button
            onClick={() => onNavigate('automations')}
            className="text-xs text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {automations.map((auto) => (
            <div key={auto.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-all">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <img
                    src={auto.mediaThumbnailUrl || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600'}
                    alt="Reel"
                    className="w-14 h-14 rounded-xl object-cover border border-slate-800 shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-white mb-1">{auto.name}</h3>
                    <div className="flex flex-wrap gap-1.5">
                      {auto.keywords.map((kw: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-violet-500/10 border border-violet-500/20 text-violet-300 text-[10px] font-semibold">
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${auto.isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'}`}>
                  {auto.isActive ? 'Active' : 'Paused'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-slate-950/60 rounded-xl p-3 text-center text-xs">
                <div>
                  <span className="block text-slate-400 text-[10px]">Triggered</span>
                  <span className="font-bold text-white">{auto.stats.triggeredCount}</span>
                </div>
                <div>
                  <span className="block text-slate-400 text-[10px]">Public Replies</span>
                  <span className="font-bold text-white">{auto.stats.repliedCount}</span>
                </div>
                <div>
                  <span className="block text-slate-400 text-[10px]">DMs Sent</span>
                  <span className="font-bold text-fuchsia-400">{auto.stats.dmsSentCount}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => handleSimulate(auto.id)}
                  disabled={simulatingId === auto.id}
                  className="px-3.5 py-2 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 text-violet-300 font-semibold text-xs transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{simulatingId === auto.id ? 'Simulating comment...' : 'Simulate Test Comment'}</span>
                </button>

                <button
                  onClick={() => onNavigate('wizard')}
                  className="text-xs text-slate-400 hover:text-white font-medium"
                >
                  Edit Settings
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
