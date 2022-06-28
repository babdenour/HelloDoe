import { Injectable } from '@nestjs/common';
import { InjectTokenService, TokenService, UserRole } from '@token';
import { Command, Option } from 'nestjs-command';

@Injectable()
export class TokenCmd {
  constructor(@InjectTokenService private readonly tokenSvc: TokenService) {}

  @Command({
    command: 'token:create',
    describe: 'Create a token',
    autoExit: true,
  })
  createToken(
    @Option({
      name: 'username',
      describe: 'Name of the user',
      type: 'string',
      demandOption: true,
    })
    username: string,
    @Option({
      name: 'role',
      describe: 'Role of the user',
      choices: ['admin', 'chatbot', 'client', 'doer', 'webhook_aws'],
      type: 'string',
      demandOption: true,
    })
    role: string,
  ): void {
    let userRole: UserRole;
    if (role === 'admin') {
      userRole = UserRole.ADMIN;
    } else if (role === 'chatbot') {
      userRole = UserRole.CHATBOT;
    } else if (role === 'client') {
      userRole = UserRole.CLIENT;
    } else if (role === 'doer') {
      userRole = UserRole.DOER;
    } else if (role === 'webhook_aws') {
      userRole = UserRole.WEBHOOK_AWS;
    } else {
      throw new Error(`Unhandled role ${role}`);
    }

    const token: string = this.tokenSvc.generateToken({
      unm: username,
      url: userRole,
    });

    console.log(token);
  }
}
