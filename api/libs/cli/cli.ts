import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';

import { CliModule } from './cli.module';

const boostrap = async () => {
  const app = await NestFactory.createApplicationContext(CliModule);
  app.select(CommandModule).get(CommandService).exec();
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
boostrap();
