import React from 'react';
import { Zap, Instagram, Sparkles, User, LogOut, Settings, BarChart3, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  user: any;
  instagramAccount: any;
  onNavigate: (view: string) => void;
  currentView: string;
  onLogout: () => void;
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
}

export function Navbar({
  user,
  instagramAccount,
  onNavigate,
  currentView,
  onLogout,
  isDemoMode,
  setIsDemoMode
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate(user ? 'dashboard' : 'landing')}>
          <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-pink-500 p-0.5 shadow-lg shadow-violet-500/25 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Zap className="w-6 h-6 text-fuchsia-400 fill-fuchsia-400/20" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Reel<span className="text-violet-400">Bolt</span>
            </span>
            <span className="block text-[10px] text-violet-400 font-semibold tracking-wider uppercase">Instagram Automation</span>
          </div>
        </div>

        {/* Center Nav Links (if logged in) */}
        {user && (
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/80">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                currentView === 'dashboard'
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Dashboard
            </button>
            <button
              onClick={() => onNavigate('automations')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                currentView === 'automations' || currentView === 'wizard'
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Zap className="w-4 h-4" />
              Automations
            </button>
            <button
              onClick={() => onNavigate('logs')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                currentView === 'logs'
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Activity Logs
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 ${
                currentView === 'pricing'
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Pricing
            </button>
          </nav>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* Demo Mode Toggle */}
          <button
            onClick={() => setIsDemoMode(!isDemoMode)}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              isDemoMode
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-300 shadow-lg shadow-amber-500/10'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Demo Mode: {isDemoMode ? 'ON' : 'OFF'}</span>
          </button>

          {!user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('login')}
                className="text-sm font-semibold text-slate-300 hover:text-white px-4 py-2 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => onNavigate('signup')}
                className="relative group overflow-hidden rounded-xl p-px font-semibold text-sm"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 transition-all duration-300 group-hover:opacity-90"></span>
                <span className="relative block px-5 py-2.5 rounded-[11px] bg-slate-950 text-white transition-all duration-300 group-hover:bg-transparent">
                  Get Started Free
                </span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {/* Instagram status badge */}
              {instagramAccount ? (
                <div className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-pink-500/10 to-violet-500/10 border border-pink-500/20 px-3 py-1.5 rounded-full text-xs font-medium text-pink-300">
                  <Instagram className="w-3.5 h-3.5 text-pink-400" />
                  <span>@{instagramAccount.username}</span>
                </div>
              ) : (
                <button
                  onClick={() => onNavigate('connect-ig')}
                  className="hidden lg:flex items-center gap-1.5 bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Connect Instagram</span>
                </button>
              )}

              {/* Settings & User Menu */}
              <button
                onClick={() => onNavigate('settings')}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
                title="Settings"
              >
                <Settings className="w-5 h-5" />
              </button>

              <button
                onClick={onLogout}
                className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 hover:bg-rose-500/20 transition-all"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}

        </div>

      </div>
    </header>
  );
}
