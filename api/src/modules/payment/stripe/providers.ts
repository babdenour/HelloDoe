import { ProviderFactory } from '@modules/provider.factory';

import { InjectableNames as InjectableNamesPymt } from '../injectable-names';
import { StripePaymentClient } from './stripe-payment.client';

export const StripePaymentClientProviderFactory = ProviderFactory.createFactory(InjectableNamesPymt.PAYMENT_CLIENT, {
  useClass: StripePaymentClient,
});
