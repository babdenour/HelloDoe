import { Inject } from '@nestjs/common';

import { InjectableNames } from './injectable-names';

export const InjectStripeSdk = Inject(InjectableNames.STRIPE_SDK);
