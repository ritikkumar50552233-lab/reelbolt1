export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: string;
  isDemo?: boolean;
}

export interface InstagramAccount {
  igUserId: string;
  username: string;
  name: string;
  profilePictureUrl: string;
  connectedAt: string;
  tokenExpiresAt: string;
  tokenStatus: 'active' | 'expired' | 'invalid';
}

export interface AutomationRule {
  id: string;
  name: string;
  mediaId: string; // 'all' or specific reel/post media ID
  mediaCaption?: string;
  mediaThumbnailUrl?: string;
  mediaType?: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' | 'REEL';
  triggerType: 'keyword' | 'any';
  keywords: string[]; // e.g. ["link", "guide", "info"]
  publicReplies: string[]; // random variations
  dmMessage: string;
  dmButtonText?: string;
  dmButtonUrl?: string;
  dmImageUrl?: string;
  delaySeconds: number;
  oncePerUser: boolean;
  followCheckEnabled: boolean;
  followCheckMessage?: string;
  isActive: boolean;
  stats: {
    triggeredCount: number;
    repliedCount: number;
    dmsSentCount: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  automationId: string;
  automationName: string;
  igUserId: string;
  commentId: string;
  commenterUsername: string;
  commentText: string;
  mediaId: string;
  mediaUrl?: string;
  publicReplyText: string;
  dmText: string;
  status: 'success' | 'failed' | 'delayed' | 'skipped_duplicate' | 'skipped_owner';
  failureReason?: string;
  createdAt: string;
}

export interface UserSubscription {
  plan: 'free' | 'pro' | 'business';
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'none';
  provider: 'razorpay' | 'stripe' | 'manual';
  providerCustomerId?: string;
  providerSubscriptionId?: string;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}

export interface UserUsage {
  dmsSent: number;
  commentsCaught: number;
  automationsCount: number;
}
