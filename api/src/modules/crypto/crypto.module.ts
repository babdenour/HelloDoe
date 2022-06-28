import { ConfigModule } from '@config';
import { Module } from '@nestjs/common';

import { CryptoServiceProvider } from './providers/crypto-service.provider';

@Module({
  imports: [ConfigModule],
  providers: [CryptoServiceProvider()],
  exports: [CryptoServiceProvider()],
})
export class CryptoModule {}
