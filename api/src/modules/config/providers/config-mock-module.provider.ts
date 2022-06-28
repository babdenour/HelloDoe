import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from '../env.validation';

export const ConfigMockModuleProvider = (): DynamicModule => {
  return ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env.test',
    validate,
  });
};
