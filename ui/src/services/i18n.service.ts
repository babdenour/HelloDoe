import { format } from 'date-fns';
import { fr as localeFr } from 'date-fns/locale';
import VueI18n from 'vue-i18n';

interface LanguageConfig {
  locale: Locale;
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  baseFormat: string;
}

export class I18nService {
  private languagesConfig: Map<string, LanguageConfig> = new Map<string, LanguageConfig>();
  private defaultLanguage = 'fr';

  constructor(private readonly i18n: VueI18n) {
    this.languagesConfig.set('fr', {
      locale: localeFr,
      weekStartsOn: 1,
      baseFormat: 'dd/MM/yyyy',
    });
  }

  /**
   * Translate a text given a translation key.
   * @param key Translation key.
   * @param values Values to interpolate.
   * @returns Translated text.
   */
  public t(key: string, values?: { [k: string]: any }): string {
    return this.i18n.t(key, values).toString();
  }

  /**
   * Translate a text given a translation key and translation choice.
   * @param key Translation key.
   * @param choice Translation choice.
   * @param values Values to interpolate.
   * @returns Translated text.
   */
  public tc(key: string, choice: number, values?: { [k: string]: any }): string {
    return this.i18n.tc(key, choice, values);
  }

  /**
   * Format a date according to a locale.
   * @example <caption>Returned format for 10th of May 2021:</caption>
   * "05/10/2021"
   * @param timestampMs Timestamp of a date in ms.
   * @param options See OptionLang
   * @returns Date formatted.
   */
  public translateDate(timestampMs: number): string {
    const config = this.getLanguageConfig(this.i18n.locale);

    return format(timestampMs, config.baseFormat, {
      locale: config.locale,
      weekStartsOn: config.weekStartsOn,
    });
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
