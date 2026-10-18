import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// In-memory mock storage for demo mode & zero-config local testing
const mockDb: {
  users: Map<string, any>;
  instagramAccounts: Map<string, any>;
  instagramAccount: any;
  automations: Map<string, any[]>;
  logs: Map<string, any[]>;
  subscriptions: Map<string, any>;
  usage: Map<string, any>;
} = {
  users: new Map<string, any>(),
  instagramAccounts: new Map<string, any>(),
  instagramAccount: null,
  automations: new Map<string, any[]>(),
  logs: new Map<string, any[]>(),
  subscriptions: new Map<string, any>(),
  usage: new Map<string, any>()
};

// Seed initial demo data for smooth testing
const DEMO_UID = 'demo_user_reelbolt';
mockDb.users.set(DEMO_UID, {
  uid: DEMO_UID,
  email: 'creator@reelbolt.ai',
  displayName: 'Alex Creator',
  photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  createdAt: new Date().toISOString()
});

mockDb.instagramAccount = {
  igUserId: 'ig_user_12345',
  username: 'alex.fitness',
  name: 'Alex Fitness & Coaching',
  profilePictureUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  connectedAt: new Date().toISOString(),
  tokenExpiresAt: new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString(),
  tokenStatus: 'active'
};

mockDb.automations.set(DEMO_UID, [
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
    dmImageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600',
    delaySeconds: 2,
    oncePerUser: true,
    followCheckEnabled: false,
    isActive: true,
    stats: {
      triggeredCount: 142,
      repliedCount: 142,
      dmsSentCount: 138
    },
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString()
  },
  {
    id: 'auto_2',
    name: 'Masterclass Webinar Invite',
    mediaId: 'media_reel_002',
    mediaCaption: 'Comment "WEBINAR" to grab your VIP seat for my upcoming creator masterclass!',
    mediaThumbnailUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600',
    mediaType: 'REEL',
    triggerType: 'keyword',
    keywords: ['webinar', 'vip', 'masterclass'],
    publicReplies: [
      'VIP seat link sent to your DMs! 🎯',
      'Check your messages for the masterclass link ✨'
    ],
    dmMessage: 'Hey @{username}! So excited to see you at the masterclass. Here is your exclusive access link:',
    dmButtonText: 'Claim VIP Seat 🎟️',
    dmButtonUrl: 'https://reelbolt.ai/masterclass',
    delaySeconds: 0,
    oncePerUser: true,
    followCheckEnabled: true,
    followCheckMessage: 'Make sure you are following @alex.fitness to unlock your VIP bonuses!',
    isActive: true,
    stats: {
      triggeredCount: 89,
      repliedCount: 89,
      dmsSentCount: 85
    },
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString()
  }
]);

mockDb.logs.set(DEMO_UID, [
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
  },
  {
    id: 'log_102',
    automationId: 'auto_1',
    automationName: 'Free Workout Guide DM Automation',
    igUserId: 'ig_user_12345',
    commentId: 'comm_992',
    commenterUsername: 'mike_fit99',
    commentText: 'workout routine link',
    mediaId: 'media_reel_001',
    publicReplyText: 'Sent! Check your direct messages for the link 🔥',
    dmText: 'Hey @mike_fit99! Thanks for commenting on my Reel. Here is your free 30-day shred guide:',
    status: 'success',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString()
  },
  {
    id: 'log_103',
    automationId: 'auto_2',
    automationName: 'Masterclass Webinar Invite',
    igUserId: 'ig_user_12345',
    commentId: 'comm_993',
    commenterUsername: 'emily_creates',
    commentText: 'WEBINAR',
    mediaId: 'media_reel_002',
    publicReplyText: 'VIP seat link sent to your DMs! 🎯',
    dmText: 'Hey @emily_creates! So excited to see you at the masterclass.',
    status: 'success',
    createdAt: new Date(Date.now() - 1000 * 60 * 120).toISOString()
  }
]);

mockDb.subscriptions.set(DEMO_UID, {
  plan: 'pro',
  status: 'active',
  provider: 'razorpay',
  currentPeriodEnd: new Date(Date.now() + 30 * 86400000).toISOString()
});

mockDb.usage.set(DEMO_UID, {
  dmsSent: 223,
  commentsCaught: 231,
  automationsCount: 2
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    env: {
      billingEnabled: process.env.BILLING_ENABLED === 'true',
      launchModeUnlimited: process.env.LAUNCH_MODE_UNLIMITED !== 'false',
      hasMetaConfig: !!process.env.META_APP_ID
    }
  });
});

// Auth verify endpoint
app.post('/api/auth/verify', (req: Request, res: Response) => {
  const { uid, email, displayName, photoURL } = req.body;
  const userId = uid || DEMO_UID;
  
  if (!mockDb.users.has(userId)) {
    mockDb.users.set(userId, {
      uid: userId,
      email: email || 'user@reelbolt.ai',
      displayName: displayName || 'Creator',
      photoURL: photoURL || '',
      createdAt: new Date().toISOString()
    });
    mockDb.automations.set(userId, []);
    mockDb.logs.set(userId, []);
    mockDb.subscriptions.set(userId, { plan: 'free', status: 'active', provider: 'manual' });
    mockDb.usage.set(userId, { dmsSent: 0, commentsCaught: 0, automationsCount: 0 });
  }

  res.json({
    success: true,
    user: mockDb.users.get(userId),
    subscription: mockDb.subscriptions.get(userId),
    usage: mockDb.usage.get(userId),
    instagramAccount: userId === DEMO_UID ? mockDb.instagramAccount : null
  });
});

// Instagram OAuth connect redirect
app.get('/api/instagram/connect', (req: Request, res: Response) => {
  const appId = process.env.META_APP_ID || 'mock_meta_app_id';
  const redirectUri = process.env.META_REDIRECT_URI || 'http://localhost:3000/api/instagram/callback';
  const state = crypto.randomBytes(16).toString('hex');
  
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=instagram_business_basic,instagram_business_manage_comments,instagram_business_manage_messages&response_type=code&state=${state}`;
  
  // If in demo or testing without real app id, redirect to callback with mock success
  if (!process.env.META_APP_ID || process.env.META_APP_ID === '') {
    return res.redirect(`/api/instagram/callback?code=mock_code_123&state=${state}`);
  }

  res.redirect(authUrl);
});

// Instagram OAuth callback
app.get('/api/instagram/callback', (req: Request, res: Response) => {
  const { code } = req.query;
  
  // Simulate successful connection and attach to demo user or current session
  mockDb.instagramAccount = {
    igUserId: 'ig_user_12345',
    username: 'alex.fitness',
    name: 'Alex Fitness & Coaching',
    profilePictureUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    connectedAt: new Date().toISOString(),
    tokenExpiresAt: new Date(Date.now() + 60 * 24 * 3600 * 1000).toISOString(),
    tokenStatus: 'active'
  };

  res.redirect('/?instagram_connected=true');
});

// Disconnect Instagram
app.post('/api/instagram/disconnect', (req: Request, res: Response) => {
  mockDb.instagramAccount = null;
  res.json({ success: true, message: 'Instagram account disconnected successfully.' });
});

// Get Instagram Reels / Media
app.get('/api/instagram/reels', (req: Request, res: Response) => {
  const mockReels = [
    {
      mediaId: 'media_reel_001',
      caption: 'Want my 30-day shred routine? Comment "SHRED" below and I will send you the PDF link instantly! 🔥',
      mediaUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600',
      mediaType: 'REEL',
      timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
      permalink: 'https://instagram.com/reel/sample1'
    },
    {
      mediaId: 'media_reel_002',
      caption: 'Comment "WEBINAR" to grab your VIP seat for my upcoming creator masterclass!',
      mediaUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600',
      mediaType: 'REEL',
      timestamp: new Date(Date.now() - 86400000 * 4).toISOString(),
      permalink: 'https://instagram.com/reel/sample2'
    },
    {
      mediaId: 'media_reel_003',
      caption: 'Drop a "TOOLS" in the comments and I will DM my exact tech stack list!',
      mediaUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600',
      mediaType: 'IMAGE',
      timestamp: new Date(Date.now() - 86400000 * 6).toISOString(),
      permalink: 'https://instagram.com/p/sample3'
    }
  ];
  res.json({ success: true, reels: mockReels });
});

// Automations CRUD
app.get('/api/automations', (req: Request, res: Response) => {
  const uid = (req.query.uid as string) || DEMO_UID;
  const list = mockDb.automations.get(uid) || [];
  res.json({ success: true, automations: list });
});

app.post('/api/automations', (req: Request, res: Response) => {
  const { uid = DEMO_UID, ...data } = req.body;
  const list = mockDb.automations.get(uid) || [];
  
  const newAuto = {
    id: `auto_${Date.now()}`,
    ...data,
    stats: { triggeredCount: 0, repliedCount: 0, dmsSentCount: 0 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  list.unshift(newAuto);
  mockDb.automations.set(uid, list);
  
  // Update usage count
  const usage = mockDb.usage.get(uid) || { dmsSent: 0, commentsCaught: 0, automationsCount: 0 };
  usage.automationsCount = list.length;
  mockDb.usage.set(uid, usage);

  res.json({ success: true, automation: newAuto });
});

app.put('/api/automations/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { uid = DEMO_UID, ...updates } = req.body;
  const list = mockDb.automations.get(uid) || [];
  
  const index = list.findIndex((a: any) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Automation not found' });
  }
  
  list[index] = {
    ...list[index],
    ...updates,
    updatedAt: new Date().toISOString()
  };
  
  mockDb.automations.set(uid, list);
  res.json({ success: true, automation: list[index] });
});

app.delete('/api/automations/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { uid = DEMO_UID } = req.query;
  const userId = (uid as string) || DEMO_UID;
  let list = mockDb.automations.get(userId) || [];
  
  list = list.filter((a: any) => a.id !== id);
  mockDb.automations.set(userId, list);

  const usage = mockDb.usage.get(userId) || { dmsSent: 0, commentsCaught: 0, automationsCount: 0 };
  usage.automationsCount = list.length;
  mockDb.usage.set(userId, usage);

  res.json({ success: true, message: 'Automation deleted' });
});

// Duplicate automation
app.post('/api/automations/:id/duplicate', (req: Request, res: Response) => {
  const { id } = req.params;
  const { uid = DEMO_UID } = req.body;
  const list = mockDb.automations.get(uid) || [];
  
  const target = list.find((a: any) => a.id === id);
  if (!target) {
    return res.status(404).json({ success: false, error: 'Automation not found' });
  }
  
  const duplicated = {
    ...target,
    id: `auto_${Date.now()}`,
    name: `${target.name} (Copy)`,
    stats: { triggeredCount: 0, repliedCount: 0, dmsSentCount: 0 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  list.unshift(duplicated);
  mockDb.automations.set(uid, list);
  res.json({ success: true, automation: duplicated });
});

// Activity logs
app.get('/api/logs', (req: Request, res: Response) => {
  const uid = (req.query.uid as string) || DEMO_UID;
  const logs = mockDb.logs.get(uid) || [];
  res.json({ success: true, logs });
});

// Simulate incoming Instagram webhook comment (for demo testing & live UI delight)
app.post('/api/instagram/simulate-comment', (req: Request, res: Response) => {
  const { uid = DEMO_UID, automationId, commenterUsername = 'test_fan_user', commentText = 'SHRED' } = req.body;
  const list = mockDb.automations.get(uid) || [];
  const auto = list.find((a: any) => a.id === automationId);
  
  if (!auto) {
    return res.status(404).json({ success: false, error: 'Automation not found' });
  }

  const newLog = {
    id: `log_${Date.now()}`,
    automationId: auto.id,
    automationName: auto.name,
    igUserId: mockDb.instagramAccount?.igUserId || 'ig_user_12345',
    commentId: `comm_${Date.now()}`,
    commenterUsername,
    commentText,
    mediaId: auto.mediaId,
    publicReplyText: auto.publicReplies[Math.floor(Math.random() * auto.publicReplies.length)],
    dmText: auto.dmMessage.replace('{username}', commenterUsername),
    status: 'success',
    createdAt: new Date().toISOString()
  };

  const logs = mockDb.logs.get(uid) || [];
  logs.unshift(newLog);
  mockDb.logs.set(uid, logs);

  // Update stats
  auto.stats.triggeredCount += 1;
  auto.stats.repliedCount += 1;
  auto.stats.dmsSentCount += 1;
  mockDb.automations.set(uid, list);

  // Update usage
  const usage = mockDb.usage.get(uid) || { dmsSent: 0, commentsCaught: 0, automationsCount: 0 };
  usage.dmsSent += 1;
  usage.commentsCaught += 1;
  mockDb.usage.set(uid, usage);

  res.json({ success: true, log: newLog, automation: auto });
});

// Meta Instagram Webhook verification & handler
app.get('/api/instagram/webhook', (req: Request, res: Response) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];
  
  const verifyToken = process.env.META_WEBHOOK_VERIFY_TOKEN || 'reelbolt_verify_secret_123';
  if (mode === 'subscribe' && token === verifyToken) {
    return res.status(200).send(challenge);
  }
  res.sendStatus(403);
});

app.post('/api/instagram/webhook', (req: Request, res: Response) => {
  // Acknowledge Meta webhook immediately with 200 OK
  res.sendStatus(200);
  
  // Process webhook payload asynchronously
  try {
    const body = req.body;
    console.log('Received Instagram Webhook event:', JSON.stringify(body, null, 2));
  } catch (err) {
    console.error('Error processing webhook:', err);
  }
});

// Billing status & checkout
app.get('/api/billing/status', (req: Request, res: Response) => {
  const uid = (req.query.uid as string) || DEMO_UID;
  res.json({
    success: true,
    billingEnabled: process.env.BILLING_ENABLED === 'true',
    subscription: mockDb.subscriptions.get(uid) || { plan: 'free', status: 'active' },
    usage: mockDb.usage.get(uid) || { dmsSent: 0, commentsCaught: 0 }
  });
});

app.post('/api/billing/checkout', (req: Request, res: Response) => {
  const { uid = DEMO_UID, planId, billingCycle } = req.body;
  const sub = {
    plan: planId,
    status: 'active',
    provider: 'razorpay',
    currentPeriodEnd: new Date(Date.now() + (billingCycle === 'yearly' ? 365 : 30) * 86400000).toISOString()
  };
  mockDb.subscriptions.set(uid, sub);
  res.json({ success: true, subscription: sub, checkoutUrl: null, message: 'Plan upgraded successfully (Demo mode)' });
});

app.post('/api/billing/cancel', (req: Request, res: Response) => {
  const { uid = DEMO_UID } = req.body;
  const sub = mockDb.subscriptions.get(uid);
  if (sub) {
    sub.status = 'canceled';
    mockDb.subscriptions.set(uid, sub);
  }
  res.json({ success: true, message: 'Subscription canceled successfully.' });
});

// Meta Data Deletion & Deauthorize
app.post('/api/meta/data-deletion', (req: Request, res: Response) => {
  res.json({
    url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://reelbolt.ai'}/data-deletion-status?id=conf_${Date.now()}`,
    confirmation_code: `conf_${Date.now()}`
  });
});

app.post('/api/meta/deauthorize', (req: Request, res: Response) => {
  res.json({ success: true });
});

// Vite middleware integration for development
if (process.env.NODE_ENV !== 'production') {
  import('vite').then(async ({ createServer }) => {
    const viteServer = await createServer({
      server: { middlewareMode: true }
    });
    app.use(viteServer.middlewares);
  });
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 ReelBolt server running on port ${PORT}`);
});
