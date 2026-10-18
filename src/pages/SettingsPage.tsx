import React, { useState } from 'react';
import { User, Instagram, CreditCard, ShieldAlert, CheckCircle2, AlertTriangle, LogOut } from 'lucide-react';
import { PLANS } from '../config/plans';

interface SettingsPageProps {
  user: any;
  instagramAccount: any;
  subscription: any;
  usage: any;
  onDisconnectInstagram: () => void;
  onNavigate: (view: string) => void;
}

export function SettingsPage({
  user,
  instagramAccount,
  subscription,
  usage,
  onDisconnectInstagram,
  onNavigate
}: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'instagram' | 'billing' | 'danger'>('profile');

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      <div>
        <h1 className="text-2xl font-extrabold text-white">Account Settings</h1>
        <p className="text-xs text-slate-400">Manage your profile, connected Instagram account, and billing subscription</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Sidebar Tabs */}
        <div className="md:col-span-3 space-y-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold transition-all flex items-center gap-3 ${
              activeTab === 'profile' ? 'bg-violet-600 text-white shadow-md' : 'bg-slate-900/60 text-slate-400 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" /> Profile Details
          </button>
          <button
            onClick={() => setActiveTab('instagram')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold transition-all flex items-center gap-3 ${
              activeTab === 'instagram' ? 'bg-violet-600 text-white shadow-md' : 'bg-slate-900/60 text-slate-400 hover:text-white'
            }`}
          >
            <Instagram className="w-4 h-4" /> Instagram Account
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold transition-all flex items-center gap-3 ${
              activeTab === 'billing' ? 'bg-violet-600 text-white shadow-md' : 'bg-slate-900/60 text-slate-400 hover:text-white'
            }`}
          >
            <CreditCard className="w-4 h-4" /> Subscription & Usage
          </button>
          <button
            onClick={() => setActiveTab('danger')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold transition-all flex items-center gap-3 ${
              activeTab === 'danger' ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-900/60 text-rose-400 hover:bg-rose-500/10'
            }`}
          >
            <ShieldAlert className="w-4 h-4" /> Danger Zone
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-9 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Profile Information</h2>
              <div className="space-y-4 max-w-lg">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || 'creator@reelbolt.ai'}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-400 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Display Name</label>
                  <input
                    type="text"
                    value={user?.displayName || 'Alex Creator'}
                    onChange={() => {}}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'instagram' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Connected Instagram Account</h2>
              
              {instagramAccount ? (
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <img src={instagramAccount.profilePictureUrl} alt="IG" className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <h3 className="font-bold text-base text-white">@{instagramAccount.username}</h3>
                      <p className="text-xs text-slate-400">{instagramAccount.name}</p>
                      <span className="inline-flex items-center gap-1.5 text-emerald-400 text-[11px] mt-2 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Token Active & Verified
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={onDisconnectInstagram}
                    className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 font-semibold text-xs transition-all"
                  >
                    Disconnect Account
                  </button>
                </div>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <p className="text-xs text-slate-400">No Instagram account currently connected.</p>
                  <button
                    onClick={() => onNavigate('connect-ig')}
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 to-violet-600 text-white font-bold text-xs"
                  >
                    Connect Instagram Now
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Subscription Plan & Monthly Usage</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Current Plan</span>
                  <div className="text-2xl font-extrabold text-white capitalize">{subscription?.plan || 'Pro'} Creator</div>
                  <p className="text-xs text-emerald-400">Active subscription via Razorpay / Launch mode</p>
                  <button
                    onClick={() => onNavigate('pricing')}
                    className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs"
                  >
                    Manage / Upgrade Plan
                  </button>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                  <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Monthly DM Quota</span>
                  <div className="text-2xl font-extrabold text-white">{usage?.dmsSent || 223} / 5,000</div>
                  <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden">
                    <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-full rounded-full" style={{ width: '4.5%' }}></div>
                  </div>
                  <p className="text-[11px] text-slate-400">Resets on the 1st of every month.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'danger' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-rose-400">Danger Zone</h2>
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-sm text-white">Delete Account & All Data</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Permanently delete your ReelBolt account, revoke all Instagram tokens, and remove all automation history from our servers.
                </p>
                <button
                  onClick={() => alert('Account deletion requested.')}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                >
                  Delete Account Permanently
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
