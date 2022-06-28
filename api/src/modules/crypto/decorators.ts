import { Inject } from '@nestjs/common';
import { ServiceNames } from '@crypto/constants/service-names';

export const InjectCryptoService = Inject(ServiceNames.CRYPTO);
