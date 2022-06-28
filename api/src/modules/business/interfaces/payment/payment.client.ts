import { ProductIds } from './product-ids';

export interface PaymentClient {
  createCheckoutSession: (
    productId: ProductIds,
    clientEmail: string,
    missionId: string,
    missionCode: string,
    doerIds: string[],
  ) => Promise<{ sessionId: string }>;
}
