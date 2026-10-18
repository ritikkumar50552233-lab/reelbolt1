import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ConnectInstagram } from './pages/ConnectInstagram';
import { Dashboard } from './pages/Dashboard';
import { AutomationsList } from './pages/AutomationsList';
import { AutomationWizard } from './pages/AutomationWizard';
import { LogsPage } from './pages/LogsPage';
import { SettingsPage } from './pages/SettingsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { TermsPage } from './pages/TermsPage';
import { DataDeletionPage } from './pages/DataDeletionPage';
import { AdminChecklist } from './pages/AdminChecklist';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('landing');
  const [user, setUser] = useState<any>({
    uid: 'demo_user_reelbolt',
    email: 'creator@reelbolt.ai',
    displayName: 'Alex Creator',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  });
  const [instagramAccount, setInstagramAccount] = useState<any>({
    igUserId: 'ig_user_12345',
    username: 'alex.fitness',
    name: 'Alex Fitness & Coaching',
    profilePictureUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    connectedAt: new Date().toISOString(),
    tokenStatus: 'active'
  });
  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initial fetch from backend
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .catch(() => {});
    
    fetch('/api/automations')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.automations) {
          setAutomations(data.automations);
        }
      })
      .catch(() => {});

    fetch('/api/logs')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.logs) {
          setLogs(data.logs);
        }
      })
      .catch(() => {});
  }, []);

  const [automations, setAutomations] = useState<any[]>([
    {
      id: 'auto_1',
      name: 'Free Workout Guide DM Automation',
      mediaId: 'media_reel_001',
      mediaCaption: 'Want my 30-day shred routine? Comment "SHRED" below and I will send you the PDF link instantly! 🔥',
      mediaThumbnailUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600',
      mediaType: 'REEL',
      triggerType: 'keyword',
      keywords: ['shred', 'workout', 'routine', 'link'],
      publicReplies: [
        'Check your DMs! 🚀 Sent you the guide.',
        'Sent! Check your direct messages for the link 🔥',
        'Got you! Sliding into your DMs right now 📥'
      ],
      dmMessage: 'Hey @{username}! Thanks for commenting on my Reel. Here is your free 30-day shred guide:',
      dmButtonText: 'Download Shred Guide 📥',
      dmButtonUrl: 'https://reelbolt.ai/sample-guide',
      delaySeconds: 2,
      oncePerUser: true,
      followCheckEnabled: false,
      isActive: true,
      stats: {
        triggeredCount: 142,
        repliedCount: 142,
        dmsSentCount: 138
      },
      createdAt: new Date().toISOString()
    }
  ]);

  const [logs, setLogs] = useState<any[]>([
    {
      id: 'log_101',
      automationId: 'auto_1',
      automationName: 'Free Workout Guide DM Automation',
      igUserId: 'ig_user_12345',
      commentId: 'comm_991',
      commenterUsername: 'sarah_lifts',
      commentText: 'SHRED please!! This looks amazing',
      mediaId: 'media_reel_001',
      publicReplyText: 'Check your DMs! 🚀 Sent you the guide.',
      dmText: 'Hey @sarah_lifts! Thanks for commenting on my Reel. Here is your free 30-day shred guide:',
      status: 'success',
      createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString()
    }
  ]);

  const [usage, setUsage] = useState({
    dmsSent: 223,
    commentsCaught: 231,
    automationsCount: 1
  });

  const [subscription, setSubscription] = useState({
    plan: 'pro',
    status: 'active',
    provider: 'razorpay'
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleLoginSuccess = (loggedInUser: any) => {
    setUser(loggedInUser);
    setCurrentView('dashboard');
    showToast('Successfully signed in to ReelBolt!');
  };

  const handleLogout = () => {
    setUser(null);
    setInstagramAccount(null);
    setCurrentView('landing');
    showToast('Signed out successfully.');
  };

  const handleSimulateDemoTrigger = (keyword: string) => {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
    showToast(`Simulation: Comment "${keyword}" triggered instant DM!`);
  };

  const handleSimulateTrigger = (autoId: string) => {
    fetch('/api/instagram/simulate-comment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ automationId: autoId, commenterUsername: 'test_fan_user', commentText: 'SHRED' })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setLogs([data.log, ...logs]);
          setAutomations(automations.map(a => a.id === data.automation.id ? data.automation : a));
          setUsage(prev => ({ ...prev, dmsSent: prev.dmsSent + 1, commentsCaught: prev.commentsCaught + 1 }));
          confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
          showToast('Test comment simulated! Public reply & DM sent successfully.');
        }
      })
      .catch(() => {
        showToast('Simulation successful (mock fallback).');
      });
  };

  const handleSaveAutomation = (newAutoData: any) => {
    fetch('/api/automations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAutoData)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setAutomations([data.automation, ...automations]);
          setCurrentView('automations');
          confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
          showToast('Automation created & launched successfully!');
        }
      })
      .catch(() => {
        const fallbackAuto = { id: `auto_${Date.now()}`, ...newAutoData, stats: { triggeredCount: 0, repliedCount: 0, dmsSentCount: 0 } };
        setAutomations([fallbackAuto, ...automations]);
        setCurrentView('automations');
        showToast('Automation created successfully!');
      });
  };

  const handleToggleActive = (id: string, current: boolean) => {
    setAutomations(automations.map(a => a.id === id ? { ...a, isActive: !current } : a));
    showToast(`Automation ${!current ? 'resumed' : 'paused'}.`);
  };

  const handleDeleteAutomation = (id: string) => {
    setAutomations(automations.filter(a => a.id !== id));
    showToast('Automation deleted.');
  };

  const handleDuplicateAutomation = (id: string) => {
    const target = automations.find(a => a.id === id);
    if (target) {
      const dup = { ...target, id: `auto_${Date.now()}`, name: `${target.name} (Copy)` };
      setAutomations([dup, ...automations]);
      showToast('Automation duplicated.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-violet-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce text-xs font-semibold">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <Navbar
        user={user}
        instagramAccount={instagramAccount}
        onNavigate={setCurrentView}
        currentView={currentView}
        onLogout={handleLogout}
        isDemoMode={isDemoMode}
        setIsDemoMode={setIsDemoMode}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <LandingPage onNavigate={setCurrentView} onSimulateDemoTrigger={handleSimulateDemoTrigger} />
        )}
        {currentView === 'login' && (
          <LoginPage onLoginSuccess={handleLoginSuccess} onNavigate={setCurrentView} />
        )}
        {currentView === 'signup' && (
          <SignupPage onSignupSuccess={handleLoginSuccess} onNavigate={setCurrentView} />
        )}
        {currentView === 'connect-ig' && (
          <ConnectInstagram onConnected={(acc) => { setInstagramAccount(acc); setCurrentView('dashboard'); showToast('Instagram account connected successfully!'); }} onNavigate={setCurrentView} />
        )}
        {currentView === 'dashboard' && (
          <Dashboard
            user={user}
            instagramAccount={instagramAccount}
            automations={automations}
            usage={usage}
            subscription={subscription}
            onNavigate={setCurrentView}
            onSimulateTrigger={handleSimulateTrigger}
          />
        )}
        {currentView === 'automations' && (
          <AutomationsList
            automations={automations}
            onNavigate={setCurrentView}
            onToggleActive={handleToggleActive}
            onDelete={handleDeleteAutomation}
            onDuplicate={handleDuplicateAutomation}
          />
        )}
        {currentView === 'wizard' && (
          <AutomationWizard onSave={handleSaveAutomation} onCancel={() => setCurrentView('automations')} />
        )}
        {currentView === 'logs' && (
          <LogsPage logs={logs} />
        )}
        {currentView === 'settings' && (
          <SettingsPage
            user={user}
            instagramAccount={instagramAccount}
            subscription={subscription}
            usage={usage}
            onDisconnectInstagram={() => { setInstagramAccount(null); showToast('Instagram account disconnected.'); }}
            onNavigate={setCurrentView}
          />
        )}
        {currentView === 'pricing' && (
          <LandingPage onNavigate={setCurrentView} onSimulateDemoTrigger={handleSimulateDemoTrigger} />
        )}
        {currentView === 'privacy' && (
          <PrivacyPage onNavigate={setCurrentView} />
        )}
        {currentView === 'terms' && (
          <TermsPage onNavigate={setCurrentView} />
        )}
        {currentView === 'data-deletion' && (
          <DataDeletionPage onNavigate={setCurrentView} />
        )}
        {currentView === 'admin-checklist' && (
          <AdminChecklist onNavigate={setCurrentView} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setCurrentView} />

    </div>
  );
}
