import { Inject } from '@nestjs/common';

import { InjectableNames as InjectableNamesPymt } from '../injectable-names';

export const InjectStripePaymentClt = Inject(InjectableNamesPymt.PAYMENT_CLIENT);
