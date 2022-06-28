import { Token } from '@token/models/token.model';
import { UserRole } from '@token/constants/user-roles';

export class TokenFactory {
  public static create = (token: Partial<Token>): Token => {
    return {
      iat: token.iat || Date.now(),
      unm: token.unm || '',
      url: token.url || UserRole.DOER,
    };
  };
}
