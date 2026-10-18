import React from 'react';

interface PrivacyPageProps {
  onNavigate: (view: string) => void;
}

export function PrivacyPage({ onNavigate }: PrivacyPageProps) {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 text-slate-100 py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
      <p className="text-xs text-slate-400">Last updated: October 18, 2026</p>

      <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Introduction</h2>
          <p>
            Welcome to ReelBolt ("we", "our", or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our Instagram comment-to-DM automation platform.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Information We Collect</h2>
          <p>
            When you connect your Instagram account via Meta Graph API OAuth, we receive authorized access to your Instagram Business account ID, username, profile picture, and media objects solely for the purpose of listening to comment events and sending authorized private replies (DMs).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. How We Use Your Data</h2>
          <p>
            We use your data strictly to provide and improve the ReelBolt automation services, including triggering public replies and private DMs based on your configured keywords. We never sell or share your data with third-party advertisers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Data Security & Deletion</h2>
          <p>
            All access tokens are encrypted at rest using industry-standard AES-256-GCM encryption. You can disconnect your Instagram account or delete your ReelBolt data at any time via your Settings page or our Data Deletion callback page.
          </p>
        </section>
      </div>

      <button onClick={() => onNavigate('landing')} className="text-xs text-violet-400 font-semibold hover:underline">
        &larr; Back to Home
      </button>
    </div>
  );
}
