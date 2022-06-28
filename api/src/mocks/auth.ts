import { TestingModule } from '@nestjs/testing';
import { ServiceNames } from '@token/constants/service-names';
import { UserRole } from '@token/constants/user-roles';
import { TokenService } from '@token/services/token.service';

export class TokenFactory {
  constructor(private module: TestingModule) {
    this.module = module;
  }

  public getAdminToken = (): string => {
    const tokenService = this.module.get<string, TokenService>(ServiceNames.TOKEN);
    return tokenService.generateToken({
      unm: 'admin',
      url: UserRole.ADMIN,
    });
  };

  public getChatbotToken = (): string => {
    const tokenService = this.module.get<string, TokenService>(ServiceNames.TOKEN);
    return tokenService.generateToken({
      unm: 'platform',
      url: UserRole.CHATBOT,
    });
  };

  public getDoerToken = (): string => {
    const tokenService = this.module.get<string, TokenService>(ServiceNames.TOKEN);
    return tokenService.generateToken({
      unm: 'john',
      url: UserRole.DOER,
    });
  };
}
