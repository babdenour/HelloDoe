/* eslint-disable @typescript-eslint/no-floating-promises */
import 'source-map-support/register';

import { ConfigService } from '@config';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { connect } from 'mongoose';

import { AppModule } from './modules/app.module';
import { setupApp } from './setup-app';

const bootstrap = async (): Promise<void> => {
  const app: INestApplication = await NestFactory.create(AppModule, { bodyParser: false });
  const configService: ConfigService = app.get(ConfigService);

  await connect(configService.get<string>('MONGODB_URI'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  setupApp(app);

  await app.listen(configService.get<number>('PORT'));
};

bootstrap();
