import React, { useState } from 'react';
import { Instagram, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

interface ConnectInstagramProps {
  onConnected: (account: any) => void;
  onNavigate: (view: string) => void;
}

export function ConnectInstagram({ onConnected, onNavigate }: ConnectInstagramProps) {
  const [connecting, setConnecting] = useState(false);

  const handleConnect = () => {
    setConnecting(true);
    setTimeout(() => {
      const mockAcc = {
        igUserId: 'ig_user_12345',
        username: 'alex.fitness',
        name: 'Alex Fitness & Coaching',
        profilePictureUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        connectedAt: new Date().toISOString(),
        tokenStatus: 'active'
      };
      onConnected(mockAcc);
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-lg w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-2xl relative z-10 text-center">
        
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-rose-500 to-violet-600 p-1 mx-auto mb-6 shadow-xl shadow-pink-500/20 flex items-center justify-center">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
            <Instagram className="w-10 h-10 text-pink-400" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">Connect Your Instagram Account</h2>
        <p className="text-slate-400 text-xs sm:text-sm mb-8 leading-relaxed">
          ReelBolt requires an Instagram Business or Creator account connected to a Facebook Page to access the Meta Graph & Comments API.
        </p>

        <div className="space-y-3 text-left bg-slate-950 rounded-2xl p-5 border border-slate-800 mb-8 text-xs text-slate-300">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Official Meta Graph API OAuth (Secure & Encrypted)</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>We never see or store your Instagram password</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Setup takes less than 60 seconds</span>
          </div>
        </div>

        <button
          onClick={handleConnect}
          disabled={connecting}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-600 to-violet-600 hover:from-amber-400 hover:via-rose-500 hover:to-violet-500 text-white font-extrabold text-sm shadow-xl shadow-pink-600/30 transition-all flex items-center justify-center gap-3"
        >
          <Instagram className="w-5 h-5" />
          <span>{connecting ? 'Connecting with Instagram...' : 'Continue with Instagram Login'}</span>
        </button>

        <button
          onClick={() => onNavigate('dashboard')}
          className="mt-4 text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          Skip for now (Use Demo Account)
        </button>

      </div>
    </div>
  );
}
