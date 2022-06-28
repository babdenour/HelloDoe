import { PaymentClient } from '@business';

export const mockPaymentClt = (mock?: Partial<PaymentClient>): Partial<PaymentClient> => {
  return {
    createCheckoutSession: mock?.createCheckoutSession || jest.fn(),
  } as Partial<PaymentClient>;
};
