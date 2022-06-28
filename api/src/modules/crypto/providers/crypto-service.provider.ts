import { CryptoService } from '@crypto/services/crypto.service';
import { ProviderFactory } from '@modules/provider.factory';
import { ServiceNames } from '@crypto/constants/service-names';

export const CryptoServiceProvider = ProviderFactory.createFactory(
  ServiceNames.CRYPTO,
  { useClass: CryptoService },
);
