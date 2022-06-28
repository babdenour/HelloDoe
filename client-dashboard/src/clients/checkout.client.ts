import { BaseClient } from '@/clients/base.client';
import {
  CreateCheckoutSessionParams,
  CreateCheckoutSessionRes,
} from '@/clients/checkout.client-utils';
import Config from '@/config';
import { TokenService } from '@services/token.service';

export class CheckoutClient extends BaseClient {
  endpoint: string;

  constructor(tokenSvc: TokenService) {
    super(tokenSvc);
    this.endpoint = Config.API_ENDPOINT_CHECKOUT;
  }

  /**
   * Create a checkout session for a mission.
   * @param missionId
   * @returns Session id.
   */
  public async createCheckoutSession(missionId: string): Promise<string> {
    const res: CreateCheckoutSessionRes = await this.post<
      CreateCheckoutSessionRes,
      CreateCheckoutSessionParams
    >(`${this.endpoint}session`, {
      missionId,
    });

    if (!res.success) {
      throw new Error();
    }

    return res.data.sessionId;
  }
}
