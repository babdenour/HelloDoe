import { DatabaseModule } from '@database';
import { Module } from '@nestjs/common';

import { ApiModule } from './api/api.module';
import { I18nModule } from './i18n';
import { MigrationModule } from './migration';

@Module({
  imports: [ApiModule, DatabaseModule, I18nModule, MigrationModule],
})
export class AppModule {}
