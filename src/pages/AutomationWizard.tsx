import React, { useState } from 'react';
import { Instagram, Sparkles, MessageSquare, Send, CheckCircle2, ArrowRight, ArrowLeft, Plus, Trash2, Smartphone } from 'lucide-react';

interface AutomationWizardProps {
  onSave: (automationData: any) => void;
  onCancel: () => void;
}

export function AutomationWizard({ onSave, onCancel }: AutomationWizardProps) {
  const [step, setStep] = useState(1);
  
  // Form State
  const [name, setName] = useState('Free Resource DM Funnel');
  const [selectedMediaId, setSelectedMediaId] = useState('media_reel_001');
  const [keywords, setKeywords] = useState(['link', 'guide', 'pdf']);
  const [newKeyword, setNewKeyword] = useState('');
  const [publicReplies, setPublicReplies] = useState([
    'Check your DMs! 🚀 Sent you the link.',
    'Sent! Check your messages 🔥',
    'Got you! Sliding into your DMs right now 📥'
  ]);
  const [newReply, setNewReply] = useState('');
  const [dmMessage, setDmMessage] = useState('Hey @{username}! Thanks for commenting on my Reel. Here is your exclusive link:');
  const [dmButtonText, setDmButtonText] = useState('Download Resource 📥');
  const [dmButtonUrl, setDmButtonUrl] = useState('https://reelbolt.ai/resource');
  const [delaySeconds, setDelaySeconds] = useState(2);
  const [oncePerUser, setOncePerUser] = useState(true);
  const [followCheckEnabled, setFollowCheckEnabled] = useState(false);

  const mockReels = [
    {
      mediaId: 'media_reel_001',
      caption: 'Want my 30-day shred routine? Comment "SHRED" below and I will send you the PDF link instantly! 🔥',
      mediaUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600',
      type: 'REEL'
    },
    {
      mediaId: 'media_reel_002',
      caption: 'Comment "WEBINAR" to grab your VIP seat for my upcoming creator masterclass!',
      mediaUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600',
      type: 'REEL'
    },
    {
      mediaId: 'media_reel_003',
      caption: 'Drop a "TOOLS" in the comments and I will DM my exact tech stack list!',
      mediaUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600',
      type: 'IMAGE'
    }
  ];

  const handleAddKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim().toLowerCase())) {
      setKeywords([...keywords, newKeyword.trim().toLowerCase()]);
      setNewKeyword('');
    }
  };

  const handleAddReply = () => {
    if (newReply.trim()) {
      setPublicReplies([...publicReplies, newReply.trim()]);
      setNewReply('');
    }
  };

  const handleFinish = () => {
    const selectedReel = mockReels.find(r => r.mediaId === selectedMediaId);
    onSave({
      name,
      mediaId: selectedMediaId,
      mediaCaption: selectedReel?.caption || '',
      mediaThumbnailUrl: selectedReel?.mediaUrl || '',
      mediaType: selectedReel?.type || 'REEL',
      triggerType: 'keyword',
      keywords,
      publicReplies,
      dmMessage,
      dmButtonText,
      dmButtonUrl,
      delaySeconds,
      oncePerUser,
      followCheckEnabled,
      isActive: true
    });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Create Automation Wizard</h1>
          <p className="text-xs text-slate-400">Step {step} of 5 — Set up your Instagram comment trigger and DM sequence</p>
        </div>
        <button onClick={onCancel} className="text-xs text-slate-400 hover:text-white">
          Cancel
        </button>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Step Form Content */}
        <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Step 1: Select Reel or Post</h2>
              <p className="text-xs text-slate-400">Choose which Instagram Reel or post will trigger this automation.</p>

              <div className="space-y-3">
                {mockReels.map((reel) => (
                  <div
                    key={reel.mediaId}
                    onClick={() => setSelectedMediaId(reel.mediaId)}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center gap-4 transition-all ${
                      selectedMediaId === reel.mediaId
                        ? 'bg-violet-600/10 border-violet-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <img src={reel.mediaUrl} alt="Reel" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-violet-400 font-bold uppercase tracking-wider">{reel.type}</span>
                      <p className="text-xs font-medium text-white truncate">{reel.caption}</p>
                    </div>
                    {selectedMediaId === reel.mediaId && <CheckCircle2 className="w-5 h-5 text-violet-400 shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Step 2: Trigger Keywords</h2>
              <p className="text-xs text-slate-400">When someone comments any of these keywords on your Reel, the automation triggers.</p>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Automation Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Keywords (Case-insensitive)</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="e.g. guide, shred, link"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddKeyword(); } }}
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyword}
                    className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs"
                  >
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {keywords.map((kw, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-semibold flex items-center gap-2">
                      #{kw}
                      <button onClick={() => setKeywords(keywords.filter((_, idx) => idx !== i))} className="hover:text-rose-400">×</button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Step 3: Public Comment Reply</h2>
              <p className="text-xs text-slate-400">ReelBolt will randomly pick one of these replies to respond publicly on the user's comment.</p>

              <div>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="e.g. Check your DMs! 🚀"
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddReply}
                    className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-2">
                  {publicReplies.map((reply, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 flex items-center justify-between">
                      <span>"{reply}"</span>
                      <button onClick={() => setPublicReplies(publicReplies.filter((_, idx) => idx !== i))} className="text-slate-500 hover:text-rose-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Step 4: Direct Message (DM) Content</h2>
              <p className="text-xs text-slate-400">Design the private message sent directly to the commenter's inbox.</p>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">DM Message Text (Use {'{username}'} for personalization)</label>
                <textarea
                  rows={4}
                  value={dmMessage}
                  onChange={(e) => setDmMessage(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-white focus:outline-none focus:border-violet-500"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Button Text</label>
                  <input
                    type="text"
                    value={dmButtonText}
                    onChange={(e) => setDmButtonText(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Button URL</label>
                  <input
                    type="text"
                    value={dmButtonUrl}
                    onChange={(e) => setDmButtonUrl(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-violet-500"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white">Step 5: Advanced Settings & Activation</h2>
              <p className="text-xs text-slate-400">Fine-tune delivery speed and rules.</p>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div>
                    <h4 className="text-xs font-bold text-white">Smart Delay (Seconds)</h4>
                    <p className="text-[11px] text-slate-400">Add a natural human delay before sending the DM.</p>
                  </div>
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={delaySeconds}
                    onChange={(e) => setDelaySeconds(Number(e.target.value))}
                    className="w-20 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white text-center"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
                  <div>
                    <h4 className="text-xs font-bold text-white">Once Per User</h4>
                    <p className="text-[11px] text-slate-400">Prevent spamming the same user if they comment multiple times.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={oncePerUser}
                    onChange={(e) => setOncePerUser(e.target.checked)}
                    className="w-4 h-4 accent-violet-600 rounded"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Wizard Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-800">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : <div></div>}

            {step < 5 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-xs flex items-center gap-2"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Save & Launch Automation
              </button>
            )}
          </div>

        </div>

        {/* Right: Live Phone Preview */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="w-[320px] bg-slate-950 rounded-[40px] border-4 border-slate-800 p-4 shadow-2xl relative">
            
            {/* Phone Notch */}
            <div className="w-32 h-4 bg-slate-800 rounded-full mx-auto mb-4"></div>

            <div className="space-y-4 text-xs">
              <div className="text-center pb-3 border-b border-slate-900 text-slate-400 font-semibold">
                Instagram Direct Preview
              </div>

              {/* Chat Bubble */}
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-7 h-7 rounded-full bg-violet-600 shrink-0 flex items-center justify-center text-[10px] font-bold text-white">
                    AB
                  </div>
                  <div className="bg-slate-900 rounded-2xl rounded-tl-sm p-3 border border-slate-800 text-slate-200 max-w-[220px]">
                    <p>{dmMessage.replace('{username}', 'sarah_lifts')}</p>
                    
                    {dmButtonText && (
                      <div className="mt-3 bg-violet-600 hover:bg-violet-500 text-white font-bold py-2 px-4 rounded-xl text-center text-[11px] shadow-md">
                        {dmButtonText}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
