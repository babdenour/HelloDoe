import { DynamicModule } from '@nestjs/common';
import { I18nJsonParser, I18nModule as NestjsI18nModule } from 'nestjs-i18n';
import * as path from 'path';

export const NestjsI18nModuleProviderFactory = (): DynamicModule => {
  return NestjsI18nModule.forRoot({
    fallbackLanguage: 'fr',
    parser: I18nJsonParser,
    parserOptions: {
      path: path.join(__dirname, '..', 'translations'),
    },
  });
};
