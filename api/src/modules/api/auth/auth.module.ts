import { Global, Module } from '@nestjs/common';
import { TokenModule } from '@token';

import { AuthGuardProviderFactory } from './guards/auth.guard';

const AuthGuardProvider = AuthGuardProviderFactory();

@Global()
@Module({
  imports: [TokenModule],
  providers: [AuthGuardProvider],
  exports: [AuthGuardProvider],
})
export class AuthModule {}
