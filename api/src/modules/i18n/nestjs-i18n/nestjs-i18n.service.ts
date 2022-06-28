import { ProviderFactory } from '@modules/provider.factory';
import { Injectable } from '@nestjs/common';
import { format, formatRelative } from 'date-fns';
import { differenceInWeeks, formatDuration, intervalToDuration } from 'date-fns';
import { I18nService as I18nServiceDep } from 'nestjs-i18n';

import { I18nService, OptionLang, Options } from '../api/i18n.service';
import { InjectableNames } from '../injectable-names';
import { fr } from './locales/fr';

interface LanguageConfig {
  locale: Locale;
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  baseFormat: string;
}

@Injectable()
export class NestjsI18nService implements I18nService {
  private languagesConfig: Map<string, LanguageConfig> = new Map<string, LanguageConfig>();
  private defaultLanguage: string = 'fr';

  constructor(private readonly i18n: I18nServiceDep) {
    this.languagesConfig.set('fr', {
      locale: fr,
      weekStartsOn: 1,
      baseFormat: 'dd/MM/yyyy',
    });
  }

  public async t(key: string, defaultKeyOrOptions?: string | Options, options?: Options): Promise<string> {
    if (typeof defaultKeyOrOptions === 'string') {
      const t: string = await this.tWithFallback(key, defaultKeyOrOptions, options);

      return t;
    }

    const t: string = await this.tStr(key, defaultKeyOrOptions);

    return t;
  }

  private async tWithFallback(key: string, defaultKey?: string, options?: Options): Promise<string> {
    const translation: string = await this.tStr(key, options);
    const isTranslationFound: boolean = translation !== key;

    if (isTranslationFound) {
      return translation;
    }

    const defaultTranslation: string = await this.tStr(defaultKey, options);

    return defaultTranslation;
  }

  public translateDate(timestampMs: number, options?: OptionLang): string {
    const config = this.getLanguageConfig(options?.lang);

    return format(timestampMs, config.baseFormat, {
      locale: config.locale,
      weekStartsOn: config.weekStartsOn,
    });
  }

  public translateDateRelativeToNow(timestampMs: number, options?: OptionLang): string {
    const config = this.getLanguageConfig(options?.lang);

    return formatRelative(timestampMs, Date.now(), {
      locale: config.locale,
      weekStartsOn: config.weekStartsOn,
    });
  }

  public translateDuration(durationMs: number, options?: OptionLang): string {
    const config = this.getLanguageConfig(options?.lang);

    const duration = this.intervalToDurationWithWeeks(durationMs);

    const formatUnits: string[] = [];
    if (duration.months >= 2) {
      formatUnits.push('months');
    } else if (duration.weeks >= 2) {
      formatUnits.push('weeks');
    } else {
      formatUnits.push('days');
    }

    return formatDuration(duration, {
      format: formatUnits,
      zero: false,
      locale: config.locale,
    });
  }

  /**
   * Convert an interval in ms into a Duration object.
   * @param intervalMs Duration in ms.
   * @returns Duration with weeks.
   */
  private intervalToDurationWithWeeks(intervalMs: number): Duration {
    const duration = intervalToDuration({
      start: 0,
      end: intervalMs,
    });
    // Weeks are not computed with intervalToDuration and needs to be computed manually.
    duration.weeks = differenceInWeeks(intervalMs, 0);

    return duration;
  }

  private async tStr(key: string, options?: Options): Promise<string> {
    const t: string = (await this.i18n.translate(key, options)) as string;

    return t;
  }

  /**
   * Get the configuration of a language.
   * If not found, return the configuration of the default language.
   * @param lang
   * @returns Language configuration.
   */
  private getLanguageConfig(lang?: string): LanguageConfig {
    let config = this.languagesConfig.get(lang);

    if (!config) {
      config = this.languagesConfig.get(this.defaultLanguage);
    }

    return config;
  }
}

export const NestjsI18nServiceProviderFactory = ProviderFactory.createFactory(InjectableNames.I18N_SERVICE, {
  useClass: NestjsI18nService,
});
