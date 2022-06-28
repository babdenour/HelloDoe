import { ProviderFactory } from '@modules/provider.factory';
import { ServiceNames } from '@token/constants/service-names';
import { TokenService } from '@token/services/token.service';

export const TokenServiceProvider = ProviderFactory.createFactory(
  ServiceNames.TOKEN,
  { useClass: TokenService },
);
