import React, { useState } from 'react';
import { Zap, Mail, Lock, ArrowRight, User } from 'lucide-react';
import { createUserWithEmailAndPassword, googleProvider, signInWithPopup, auth } from '../lib/firebase';

interface SignupPageProps {
  onSignupSuccess: (user: any) => void;
  onNavigate: (view: string) => void;
}

export function SignupPage({ onSignupSuccess, onNavigate }: SignupPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (email.includes('demo') || !import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY.includes('Mock')) {
        setTimeout(() => {
          onSignupSuccess({
            uid: 'demo_user_reelbolt',
            email: email || 'creator@reelbolt.ai',
            displayName: name || 'Alex Creator',
            photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
          });
        }, 500);
        return;
      }
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      onSignupSuccess(cred.user);
    } catch (err: any) {
      setError(err.message || 'Failed to create account');
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setLoading(true);
    setError('');
    try {
      if (!import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY.includes('Mock')) {
        setTimeout(() => {
          onSignupSuccess({
            uid: 'demo_user_reelbolt',
            email: 'creator@reelbolt.ai',
            displayName: 'Alex Creator',
            photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
          });
        }, 500);
        return;
      }
      const cred = await signInWithPopup(auth, googleProvider);
      onSignupSuccess(cred.user);
    } catch (err: any) {
      setError(err.message || 'Google sign up failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-md w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl relative z-10">
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-fuchsia-600 p-0.5 mx-auto mb-4 shadow-lg shadow-violet-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Zap className="w-6 h-6 text-fuchsia-400" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Create your ReelBolt Account</h2>
          <p className="text-xs text-slate-400 mt-1">Start automating your Instagram comments & DMs today</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Creator"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="creator@reelbolt.ai"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold text-sm shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Creating account...' : 'Start Free Trial'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-900 px-2 text-slate-500">Or continue with</span></div>
        </div>

        <button
          onClick={handleGoogleSignup}
          type="button"
          className="w-full py-3 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"/>
            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/>
            <path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.2-2 .4-2.7L1.6 6.4C.6 8.4 0 10.6 0 13s.6 4.6 1.6 6.6l3.7-2.9z"/>
            <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 15.9C3.5 19.7 7.4 23 12 23z"/>
          </svg>
          <span>Continue with Google</span>
        </button>

        <p className="text-center text-xs text-slate-400 mt-6">
          Already have an account?{' '}
          <button onClick={() => onNavigate('login')} className="text-violet-400 font-semibold hover:underline">
            Sign in
          </button>
        </p>

      </div>
    </div>
  );
}
