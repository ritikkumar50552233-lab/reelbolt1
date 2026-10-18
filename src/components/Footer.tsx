import React from 'react';
import { Zap, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-sm py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-slate-900">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 via-fuchsia-600 to-pink-500 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-fuchsia-400" />
                </div>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Reel<span className="text-violet-400">Bolt</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              The ultimate Instagram comment-to-DM automation engine for creators, influencers, and brands.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Meta Graph API Partner</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase">Product</h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => onNavigate('landing')} className="hover:text-white transition-colors">Features</button></li>
              <li><button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors">Pricing</button></li>
              <li><button onClick={() => onNavigate('wizard')} className="hover:text-white transition-colors">Create Automation</button></li>
              <li><button onClick={() => onNavigate('dashboard')} className="hover:text-white transition-colors">Live Dashboard</button></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase">Resources & Meta</h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => onNavigate('admin-checklist')} className="hover:text-white transition-colors flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>Post-Deploy Checklist</button></li>
              <li><button onClick={() => onNavigate('data-deletion')} className="hover:text-white transition-colors">Data Deletion Instructions</button></li>
              <li><a href="https://developers.facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Meta Developer Portal</a></li>
              <li><a href="https://upstash.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Upstash QStash Docs</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs tracking-wider uppercase">Legal & Compliance</h4>
            <ul className="space-y-2.5 text-xs">
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Terms of Service</button></li>
              <li><button onClick={() => onNavigate('data-deletion')} className="hover:text-white transition-colors">User Data Deletion Callback</button></li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>&copy; {new Date().getFullYear()} ReelBolt Technologies Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Instagram Creators worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
