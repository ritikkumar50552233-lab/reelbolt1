import React from 'react';
import { CheckCircle2, ShieldCheck, Zap, ExternalLink } from 'lucide-react';

interface AdminChecklistProps {
  onNavigate: (view: string) => void;
}

export function AdminChecklist({ onNavigate }: AdminChecklistProps) {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5" /> Production Deployment Guide
        </div>
        <h1 className="text-3xl font-extrabold text-white">ReelBolt Post-Deploy Checklist</h1>
        <p className="text-xs text-slate-400">Follow this step-by-step verification checklist to take your Instagram automation SaaS live on Vercel.</p>
      </div>

      <div className="space-y-6">
        
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">1. Environment Variables Configured</h3>
          </div>
          <p className="text-xs text-slate-400 pl-8">
            Ensure all required variables in <code className="text-violet-400">.env.example</code> (Meta App ID, Secret, Firebase keys, Encryption key) are added to your Vercel project settings.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">2. Meta App & OAuth Redirect URI</h3>
          </div>
          <p className="text-xs text-slate-400 pl-8">
            In your Meta Developer Dashboard, configure the OAuth redirect URI to match your production domain: <code className="text-violet-400">https://your-domain.vercel.app/api/instagram/callback</code>.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">3. Instagram Webhook Subscription</h3>
          </div>
          <p className="text-xs text-slate-400 pl-8">
            Subscribe your Meta app webhook to the <code className="text-violet-400">comments</code> and <code className="text-violet-400">messages</code> fields pointing to <code className="text-violet-400">https://your-domain.vercel.app/api/instagram/webhook</code> with your verify token.
          </p>
        </div>

      </div>

      <button onClick={() => onNavigate('dashboard')} className="text-xs text-violet-400 font-semibold hover:underline">
        &larr; Back to Dashboard
      </button>

    </div>
  );
}
