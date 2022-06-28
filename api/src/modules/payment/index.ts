import { InjectStripePaymentClt } from './stripe/decorators';
import { StripePaymentClientProviderFactory } from './stripe/providers';
import { StripePaymentClient } from './stripe/stripe-payment.client';

// Injectables
export const PaymentClient = StripePaymentClient;

// Decorators
export const InjectPaymentClient = InjectStripePaymentClt;

// Providers
export const PaymentClientProviderFactory = StripePaymentClientProviderFactory;

export { PaymentModule } from './payment.module';
