import { CheckoutClient } from '@/clients/checkout.client';
import { getStripe } from '@services/stripe.sdk';

export class CheckoutService {
  constructor(private readonly checkoutClt: CheckoutClient) {}

  /**
   * Redirect user to checkout page.
   * @param missionId
   */
  public async redirectToCheckoutForMission(missionId: string): Promise<void> {
    const stripe = getStripe();
    const sessionId = await this.createCheckoutSession(missionId);
    await stripe.redirectToCheckout({ sessionId });
  }

  private async createCheckoutSession(missionId: string): Promise<string> {
    const sessionId = await this.checkoutClt.createCheckoutSession(missionId);
    return sessionId;
  }
}
