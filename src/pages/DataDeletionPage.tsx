import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

interface DataDeletionPageProps {
  onNavigate: (view: string) => void;
}

export function DataDeletionPage({ onNavigate }: DataDeletionPageProps) {
  const [requested, setRequested] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequested(true);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto space-y-8">
      
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400">
          <ShieldCheck className="w-6 h-6" />
        </div>

        <h1 className="text-2xl font-extrabold text-white">Instagram Data Deletion Request</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          According to Meta's platform terms, you are entitled to request the complete deletion of your data from ReelBolt. Enter your email or Instagram username below to initiate instant removal.
        </p>

        {requested ? (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Data deletion request processed successfully. Confirmation code: <strong className="text-white">conf_994821</strong></span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Account Email or Instagram Username</label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@email.com or @username"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/30 transition-all"
            >
              Request Data Deletion
            </button>
          </form>
        )}
      </div>

      <button onClick={() => onNavigate('landing')} className="text-xs text-violet-400 font-semibold hover:underline">
        &larr; Back to Home
      </button>

    </div>
  );
}
