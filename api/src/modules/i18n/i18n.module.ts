import { Global, Module } from '@nestjs/common';

import { NestjsI18nModule } from './nestjs-i18n/nestjs-i18n.module';

@Global()
@Module({
  imports: [NestjsI18nModule],
  exports: [NestjsI18nModule],
})
export class I18nModule {}
