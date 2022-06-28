import { ConfigModule, ConfigService } from '@config';
import { DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { connectionFactory } from './connection-factory';

export const MongooseMockModuleProvider = (): DynamicModule => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (mongoose as any).Promise = global.Promise;

  return MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => {
      return {
        uri: configService.get<string>('MONGODB_URI'),
        connectionFactory,
      };
    },
    inject: [ConfigService],
  });
};
