import { DynamicModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { validate } from '../env.validation';

export const ConfigModuleProvider = (): DynamicModule => {
  return ConfigModule.forRoot({
    isGlobal: true,
    validate,
  });
};
