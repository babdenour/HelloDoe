import { Token } from '@token/models/token.model';
import { UserInfo } from '@token/models/user-info.model';

export class TokenConverter {
  public static toUserInfo(token: Token): UserInfo {
    return {
      name: token.unm,
      role: token.url,
    };
  }
}
