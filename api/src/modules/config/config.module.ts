import { NodeEnv } from '@modules/node-env';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigMockModuleProvider } from './providers/config-mock-module.provider';
import { ConfigModuleProvider } from './providers/config-module.provider';

@Global()
@Module({
  imports: [process.env.NODE_ENV !== NodeEnv.TEST ? ConfigModuleProvider() : ConfigMockModuleProvider()],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
