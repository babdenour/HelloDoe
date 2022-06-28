import { ConfigKeys, ConfigService } from '@config';
import { ProviderFactory } from '@modules/provider.factory';
import Stripe from 'stripe';

import { InjectableNames } from './injectable-names';

export const StripeSdkProviderFactory = ProviderFactory.createFactory(InjectableNames.STRIPE_SDK, {
  useFactory: {
    factory: (configSvc: ConfigService) => {
      return new Stripe(configSvc.get(ConfigKeys.STRIPE_KEY), {
        apiVersion: '2020-08-27',
        timeout: 30_000,
      });
    },
    inject: [ConfigService],
  },
});
