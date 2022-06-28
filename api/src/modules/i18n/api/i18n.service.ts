export interface OptionLang {
  lang?: 'fr';
}

export interface Options extends OptionLang {
  args?: (Record<string, any> | string)[] | Record<string, any>;
}

export interface I18nService {
  /**
   * Translate a text given a translation key.
   * @param key Translation key.
   * @param defaultKey Fallback translation key if translation for key not found.
   * @param options See Options
   * @returns Translated text.
   */
  t(key: string, options?: Options): Promise<string>;
  t(key: string, defaultKey?: string, options?: Options): Promise<string>;

  /**
   * Format a date according to a locale.
   * @example <caption>Returned format for 10th of May 2021:</caption>
   * "05/10/2021"
   * @param timestampMs Timestamp of a date in ms.
   * @param options See OptionLang
   * @returns Date formatted.
   */
  translateDate(timestampMs: number, options?: OptionLang): string;

  /**
   * Translate a date relatively to now.
   * @example <caption>Returned format for next Monday:</caption>
   * "next monday at 10am"
   * @param timestampMs Timestamp of a date in ms.
   * @param options See OptionLang
   * @returns Date formatted.
   */
  translateDateRelativeToNow(timestampMs: number, options?: OptionLang): string;

  /**
   * Translate a duration whether it's longer than 2 months, 2 weeks or shorter than 2 weeks.
   * @example <caption>Returned formats:</caption>
   * "10 days"
   * "3 weeks"
   * "2 months"
   * @param durationMs Duration in ms.
   * @param options See OptionLang
   * @returns Duration formatted.
   */
  translateDuration(durationMs: number, options?: OptionLang): string;
}
