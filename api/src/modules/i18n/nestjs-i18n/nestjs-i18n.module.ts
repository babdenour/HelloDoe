import { Global, Module } from '@nestjs/common';

import { NestjsI18nModuleProviderFactory } from './nestjs-i18n-module-provider-factory';
import { NestjsI18nServiceProviderFactory } from './nestjs-i18n.service';

const NestjsI18nModuleProvider = NestjsI18nModuleProviderFactory();
const NestjsI18nServiceProvider = NestjsI18nServiceProviderFactory();

@Global()
@Module({
  imports: [NestjsI18nModuleProvider],
  providers: [NestjsI18nServiceProvider],
  exports: [NestjsI18nServiceProvider],
})
export class NestjsI18nModule {}
