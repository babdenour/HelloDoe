import { CryptoModule } from '@crypto';
import { Module } from '@nestjs/common';

import { TokenServiceProvider } from './providers/token-service.provider';

@Module({
  imports: [CryptoModule],
  providers: [TokenServiceProvider()],
  exports: [TokenServiceProvider()],
})
export class TokenModule {}
