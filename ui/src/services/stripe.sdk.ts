import Config from '@/config';

interface Stripe {
  redirectToCheckout: ({ sessionId: string }) => Promise<void>;
}

let stripe: Stripe = null;

export const getStripe = (): Stripe => {
  if (!stripe) {
    stripe = new (window as any).Stripe(Config.STRIPE_KEY);
  }

  return stripe;
};
