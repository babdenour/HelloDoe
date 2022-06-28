import { Inject } from '@nestjs/common';

import { InjectableNames } from './injectable-names';
import { NestjsI18nServiceProviderFactory } from './nestjs-i18n';

export { I18nModule } from './i18n.module';

export { I18nService } from './api/i18n.service';
export const InjectI18nService = Inject(InjectableNames.I18N_SERVICE);

// Changes when the injected module changes.
export const I18nServiceProviderFactory = NestjsI18nServiceProviderFactory;
