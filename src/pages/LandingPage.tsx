import React, { useState } from 'react';
import { Zap, ArrowRight, Instagram, MessageSquare, Send, CheckCircle2, Sparkles, Shield, ZapOff, Users, Play, Star } from 'lucide-react';
import { PLANS } from '../config/plans';

interface LandingPageProps {
  onNavigate: (view: string) => void;
  onSimulateDemoTrigger: (keyword: string) => void;
}

export function LandingPage({ onNavigate, onSimulateDemoTrigger }: LandingPageProps) {
  const [demoInput, setDemoInput] = useState('SHRED');
  const [demoState, setDemoState] = useState<'idle' | 'triggered' | 'dm_sent'>('idle');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const handleRunDemo = () => {
    setDemoState('triggered');
    setTimeout(() => {
      setDemoState('dm_sent');
      onSimulateDemoTrigger(demoInput);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden relative">
      
      {/* Background Neon Glow Orbs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-fuchsia-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/3 w-[700px] h-[700px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold mb-8 backdrop-blur-md shadow-lg shadow-violet-500/10">
          <Sparkles className="w-4 h-4 text-violet-400 animate-pulse" />
          <span>The #1 Instagram Comment-to-DM Automation Engine</span>
          <span className="bg-violet-500 text-white text-[10px] px-2 py-0.5 rounded-full">v2.0</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.1] mb-8">
          Turn Every Instagram Comment Into an <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">Instant DM & Sale</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-12 font-normal leading-relaxed">
          Stop replying manually. When followers comment keywords like <span className="text-white font-semibold underline decoration-violet-500">"LINK"</span> or <span className="text-white font-semibold underline decoration-fuchsia-500">"SHRED"</span> on your Reels, ReelBolt instantly replies publicly and delivers your link via DM on autopilot 24/7.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={() => onNavigate('signup')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-600 text-white font-bold text-base shadow-xl shadow-violet-600/30 hover:shadow-violet-600/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 group"
          >
            <span>Start Free 7-Day Trial</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-bold text-base border border-slate-800 backdrop-blur-xl transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-violet-400 fill-violet-400" />
            <span>Explore Live Dashboard</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Official Meta Graph API Integration</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>No Instagram Password Required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Setup in under 60 seconds</span>
          </div>
        </div>

        {/* Interactive Live Demo Simulator Card */}
        <div className="mt-20 max-w-4xl mx-auto rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
            Interactive Live Simulator — Test It Now
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left items-center mt-4">
            
            {/* Left: Instagram Reel Mock */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 to-violet-500 p-0.5">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Creator" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">alex.fitness</h4>
                  <p className="text-[10px] text-slate-400">Sponsored Reel • Original Audio</p>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-slate-900 mb-4 group">
                <img src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600" alt="Reel" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-4">
                  <p className="text-xs text-white font-medium">Want my 30-day shred routine? Comment "SHRED" below! 🔥</p>
                </div>
              </div>

              {/* Comment Input Simulation */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={demoInput}
                    onChange={(e) => setDemoInput(e.target.value)}
                    placeholder="Type keyword e.g. SHRED"
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                  <button
                    onClick={handleRunDemo}
                    className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs transition-all shadow-md"
                  >
                    Simulate Comment
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Automated Response Preview */}
            <div className="space-y-4">
              <div className="bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-900 pb-3">
                  <span className="flex items-center gap-1.5 text-violet-400 font-semibold">
                    <Zap className="w-3.5 h-3.5" /> ReelBolt Automation Active
                  </span>
                  <span>Instant (0.4s)</span>
                </div>

                {/* Step 1 Public Reply */}
                <div className={`p-3.5 rounded-xl border transition-all ${demoState !== 'idle' ? 'bg-violet-500/10 border-violet-500/30 text-violet-200' : 'bg-slate-900/50 border-slate-800 text-slate-400'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <MessageSquare className="w-4 h-4 text-violet-400" />
                    <span className="text-xs font-bold text-white">1. Public Reply on Reel</span>
                  </div>
                  <p className="text-xs">
                    {demoState !== 'idle' ? `"@${demoInput} fan: Check your DMs! 🚀 Sent you the guide."` : 'Waiting for keyword comment...'}
                  </p>
                </div>

                {/* Step 2 Instant DM */}
                <div className={`p-3.5 rounded-xl border transition-all ${demoState === 'dm_sent' ? 'bg-fuchsia-500/10 border-fuchsia-500/30 text-fuchsia-200 shadow-lg shadow-fuchsia-500/10' : 'bg-slate-900/50 border-slate-800 text-slate-400'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <Send className="w-4 h-4 text-fuchsia-400" />
                    <span className="text-xs font-bold text-white">2. Private DM Delivered</span>
                  </div>
                  <p className="text-xs">
                    {demoState === 'dm_sent' ? '"Hey! Thanks for commenting. Here is your free 30-day shred guide [Download Button]"' : 'Awaiting public reply dispatch...'}
                  </p>
                </div>

                {demoState === 'dm_sent' && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-300 text-xs flex items-center justify-between animate-fade-in">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      Lead captured successfully!
                    </span>
                    <span className="font-bold">+1 Conversion</span>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-slate-900/50 border-y border-slate-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">How ReelBolt Works in 3 Simple Steps</h2>
            <p className="text-slate-400 text-sm">Deploy automated sales funnels on your Instagram account in less than 2 minutes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-950 rounded-2xl border border-slate-800/80 p-8 relative group hover:border-violet-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 font-extrabold text-lg mb-6 group-hover:scale-110 transition-transform">
                01
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Connect Instagram</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Log in securely via official Meta Graph API OAuth. Select your Instagram Business or Creator account with 1 click.
              </p>
            </div>

            <div className="bg-slate-950 rounded-2xl border border-slate-800/80 p-8 relative group hover:border-fuchsia-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 font-extrabold text-lg mb-6 group-hover:scale-110 transition-transform">
                02
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Pick Reel & Keywords</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Choose any existing Reel or post. Set trigger keywords like "INFO", "GUIDE", or "LINK" to catch relevant comments.
              </p>
            </div>

            <div className="bg-slate-950 rounded-2xl border border-slate-800/80 p-8 relative group hover:border-pink-500/50 transition-all">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400 font-extrabold text-lg mb-6 group-hover:scale-110 transition-transform">
                03
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Automate DMs & Sales</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                ReelBolt instantly replies to the comment and slides into your viewer's DMs with your custom link and call-to-action button.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-slate-400 text-sm mb-8">Choose the plan that fits your creator journey. Upgrade or cancel anytime.</p>
          
          {/* Monthly / Yearly Toggle */}
          <div className="inline-flex items-center bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-xl text-xs font-semibold transition-all ${
                billingCycle === 'monthly' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                billingCycle === 'yearly' ? 'bg-violet-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Yearly Billing</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full font-bold">Save 20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.values(PLANS).map((plan) => {
            const priceVal = billingCycle === 'yearly' ? plan.price.yearly.USD : plan.price.monthly.USD;
            return (
              <div
                key={plan.id}
                className={`rounded-3xl p-8 flex flex-col justify-between relative transition-all ${
                  plan.id === 'pro'
                    ? 'bg-gradient-to-b from-violet-950/40 via-slate-900 to-slate-950 border-2 border-violet-500 shadow-2xl shadow-violet-500/20 scale-105 z-10'
                    : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.id === 'pro' && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Most Popular for Creators
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-slate-400 mb-6">{plan.description}</p>
                  
                  <div className="flex items-baseline gap-1 mb-8">
                    <span className="text-4xl font-extrabold text-white">${priceVal}</span>
                    <span className="text-xs text-slate-400">/ {billingCycle === 'yearly' ? 'month billed yearly' : 'month'}</span>
                  </div>

                  <ul className="space-y-3.5 text-xs text-slate-300 mb-8 border-t border-slate-800/80 pt-6">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                      <span><strong>{plan.limits.maxIgAccounts}</strong> Instagram Account{plan.limits.maxIgAccounts > 1 ? 's' : ''}</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                      <span><strong>{plan.limits.maxActiveAutomations}</strong> Active Automations</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
                      <span><strong>{plan.limits.maxDmsPerMonth.toLocaleString()}</strong> DMs sent per month</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.limits.delayFeature ? 'text-violet-400' : 'text-slate-600'}`} />
                      <span className={plan.limits.delayFeature ? 'text-white' : 'text-slate-500'}>Smart Delay feature</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.limits.followCheck ? 'text-violet-400' : 'text-slate-600'}`} />
                      <span className={plan.limits.followCheck ? 'text-white' : 'text-slate-500'}>Follower Verification check</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 ${plan.limits.removeBranding ? 'text-violet-400' : 'text-slate-600'}`} />
                      <span className={plan.limits.removeBranding ? 'text-white' : 'text-slate-500'}>Remove "Powered by ReelBolt"</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => onNavigate('signup')}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-md ${
                    plan.id === 'pro'
                      ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-violet-600/30'
                      : 'bg-slate-800 hover:bg-slate-700 text-white'
                  }`}
                >
                  {plan.id === 'free' ? 'Start Free' : 'Start 7-Day Trial'}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-900/50 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm">Everything you need to know about ReelBolt and Instagram automation.</p>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6">
              <h3 className="text-base font-bold text-white mb-2">Is ReelBolt compliant with Instagram's Terms of Service?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Yes! ReelBolt uses the official Meta Graph API and Instagram Private Replies API approved for developers. We never ask for or store your Instagram password.
              </p>
            </div>

            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6">
              <h3 className="text-base font-bold text-white mb-2">What happens when someone comments on my Reel?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Within milliseconds of someone commenting your trigger keyword, ReelBolt automatically posts a public reply on the comment and sends a direct message (DM) containing your link and button.
              </p>
            </div>

            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6">
              <h3 className="text-base font-bold text-white mb-2">Can I test ReelBolt without connecting a live Instagram account?</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Absolutely! Just toggle Demo Mode ON in the top navigation bar to explore the complete app with pre-loaded mock Reels, automations, and live test triggers.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
