import { Module } from '@nestjs/common';
import { StripeSdkModule } from '@sdk/stripe';

import { StripePaymentClientProviderFactory } from './providers';

const StripePaymentClientProvider = StripePaymentClientProviderFactory();

@Module({
  imports: [StripeSdkModule],
  providers: [StripePaymentClientProvider],
  exports: [StripePaymentClientProvider],
})
export class StripeModule {}
