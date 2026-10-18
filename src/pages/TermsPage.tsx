import React from 'react';

interface TermsPageProps {
  onNavigate: (view: string) => void;
}

export function TermsPage({ onNavigate }: TermsPageProps) {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
      <p className="text-xs text-slate-400">Last updated: October 18, 2026</p>

      <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using ReelBolt, you agree to be bound by these Terms of Service and all applicable laws and regulations of Meta and Instagram platforms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Use License</h2>
          <p>
            Permission is granted to temporarily use ReelBolt for personal or commercial creator automation, subject to compliance with Instagram Platform policies and rate limits.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Disclaimer</h2>
          <p>
            The materials and services on ReelBolt are provided on an 'as is' basis. ReelBolt makes no warranties, expressed or implied, and hereby disclaims all other warranties.
          </p>
        </section>
      </div>

      <button onClick={() => onNavigate('landing')} className="text-xs text-violet-400 font-semibold hover:underline">
        &larr; Back to Home
      </button>
    </div>
  );
}
