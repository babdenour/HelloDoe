import { Inject } from '@nestjs/common';
import { ServiceNames } from '@token/constants/service-names';

export const InjectTokenService = Inject(ServiceNames.TOKEN);
