export interface PlanConfig {
  id: 'free' | 'pro' | 'business';
  name: string;
  description: string;
  price: {
    monthly: { INR: number; USD: number };
    yearly: { INR: number; USD: number };
  };
  limits: {
    maxIgAccounts: number;
    maxActiveAutomations: number;
    maxDmsPerMonth: number;
    delayFeature: boolean;
    followCheck: boolean;
    logsRetentionDays: number;
    removeBranding: boolean;
  };
  razorpayPlanIds: {
    monthly: string;
    yearly: string;
  };
}

export const PLANS: Record<string, PlanConfig> = {
  free: {
    id: 'free',
    name: 'Starter / Free',
    description: 'Perfect for creators launching their first Instagram automations.',
    price: {
      monthly: { INR: 0, USD: 0 },
      yearly: { INR: 0, USD: 0 }
    },
    limits: {
      maxIgAccounts: 1,
      maxActiveAutomations: 2,
      maxDmsPerMonth: 250,
      delayFeature: false,
      followCheck: false,
      logsRetentionDays: 7,
      removeBranding: false
    },
    razorpayPlanIds: {
      monthly: '',
      yearly: ''
    }
  },
  pro: {
    id: 'pro',
    name: 'Pro Creator',
    description: 'For growing creators scaling lead generation and sales.',
    price: {
      monthly: { INR: 1499, USD: 19 },
      yearly: { INR: 1199, USD: 15 } // per month billed yearly
    },
    limits: {
      maxIgAccounts: 3,
      maxActiveAutomations: 15,
      maxDmsPerMonth: 5000,
      delayFeature: true,
      followCheck: true,
      logsRetentionDays: 30,
      removeBranding: true
    },
    razorpayPlanIds: {
      monthly: process.env.RAZORPAY_PLAN_PRO_MONTHLY || 'plan_pro_monthly_mock',
      yearly: process.env.RAZORPAY_PLAN_PRO_YEARLY || 'plan_pro_yearly_mock'
    }
  },
  business: {
    id: 'business',
    name: 'Business Agency',
    description: 'For power brands and agencies managing multiple Instagram accounts.',
    price: {
      monthly: { INR: 4999, USD: 59 },
      yearly: { INR: 3999, USD: 49 }
    },
    limits: {
      maxIgAccounts: 10,
      maxActiveAutomations: 50,
      maxDmsPerMonth: 25000,
      delayFeature: true,
      followCheck: true,
      logsRetentionDays: 90,
      removeBranding: true
    },
    razorpayPlanIds: {
      monthly: process.env.RAZORPAY_PLAN_BIZ_MONTHLY || 'plan_biz_monthly_mock',
      yearly: process.env.RAZORPAY_PLAN_BIZ_YEARLY || 'plan_biz_yearly_mock'
    }
  }
};

export const BILLING_ENABLED = process.env.BILLING_ENABLED === 'true';
export const LAUNCH_MODE_UNLIMITED = process.env.LAUNCH_MODE_UNLIMITED !== 'false'; // default true during launch
