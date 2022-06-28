import { ConfigModule, ConfigService } from '@config';
import { DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { connectionFactory } from './connection-factory';

mongoose.set('useCreateIndex', true);

export const MongooseModuleProvider = (): DynamicModule => {
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
