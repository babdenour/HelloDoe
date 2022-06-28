import { Module } from '@nestjs/common';

import { StripeModule } from './stripe';

@Module({
  imports: [StripeModule],
  exports: [StripeModule],
})
export class PaymentModule {}
