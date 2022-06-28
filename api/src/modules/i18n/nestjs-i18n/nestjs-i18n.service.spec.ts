import { ProviderFactory } from '@modules/provider.factory';
import { Test, TestingModule } from '@nestjs/testing';
import { addDays, addMonths, addWeeks } from 'date-fns';
import { I18nService as I18nServiceDep } from 'nestjs-i18n';

import { Options } from '../api/i18n.service';
import { NestjsI18nService } from './nestjs-i18n.service';

let i18nSvc: NestjsI18nService;

let mockedTranslate: jest.Mock;

const createApp = async (): Promise<void> => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      ProviderFactory.createFactory(I18nServiceDep.name, {
        useValue: {
          translate: mockedTranslate,
        },
      })(),
      NestjsI18nService,
    ],
  }).compile();

  i18nSvc = module.get<NestjsI18nService>(NestjsI18nService);
};

describe('NestjsI18nService', () => {
  beforeEach(async () => {
    mockedTranslate = jest.fn().mockImplementation((key: string) => key);

    await createApp();
  });

  describe(`when translate text`, () => {
    describe(`when key and options`, () => {
      it(`should translate key`, async () => {
        const KEY: string = 'key';

        const t: string = await i18nSvc.t(KEY);

        expect(t).toBe(KEY);
      });

      it(`should pass on options`, async () => {
        const KEY: string = 'key';
        const OPTIONS: Options = {};

        await i18nSvc.t(KEY, OPTIONS);

        expect(mockedTranslate).toHaveBeenCalledWith(KEY, OPTIONS);
      });
    });

    describe(`when key, default key and options`, () => {
      describe(`when key found`, () => {
        const TRANSLATION: string = 'TRANSLATION';

        beforeEach(async () => {
          mockedTranslate = jest.fn().mockResolvedValue(TRANSLATION);

          await createApp();
        });

        it(`should translate key`, async () => {
          const KEY: string = 'key';
          const DEFAULT_KEY: string = 'default-key';

          const t: string = await i18nSvc.t(KEY, DEFAULT_KEY);

          expect(t).toBe(TRANSLATION);
        });
      });

      it(`should fallback to default key`, async () => {
        const KEY: string = 'key';
        const DEFAULT_KEY: string = 'default-key';

        const t: string = await i18nSvc.t(KEY, DEFAULT_KEY);

        expect(t).toBe(DEFAULT_KEY);
        expect(mockedTranslate.mock.calls).toEqual([
          [KEY, undefined],
          [DEFAULT_KEY, undefined],
        ]);
      });

      it(`should pass on options`, async () => {
        const KEY: string = 'key';
        const DEFAULT_KEY: string = 'default-key';
        const OPTIONS = {};

        await i18nSvc.t(KEY, DEFAULT_KEY, OPTIONS);

        expect(mockedTranslate.mock.calls).toEqual([
          [KEY, OPTIONS],
          [DEFAULT_KEY, OPTIONS],
        ]);
      });
    });
  });

  describe(`when translate duration`, () => {
    describe(`when duration greater than or equal to 2 months`, () => {
      it(`should format duration in months`, () => {
        expect(i18nSvc.translateDuration(addMonths(0, 7).getTime(), { lang: 'fr' })).toContain('mois');
        expect(i18nSvc.translateDuration(addMonths(0, 2).getTime(), { lang: 'fr' })).toContain('mois');
      });
    });

    describe(`when duration greater than or equal to 2 weeks and lower than 2 months`, () => {
      it(`should format duration in weeks`, () => {
        expect(i18nSvc.translateDuration(addWeeks(0, 7).getTime(), { lang: 'fr' })).toContain('semaines');
        expect(i18nSvc.translateDuration(addWeeks(0, 2).getTime(), { lang: 'fr' })).toContain('semaines');
      });
    });

    describe(`when duration lower than 2 weeks`, () => {
      it(`should format duration in days`, () => {
        expect(i18nSvc.translateDuration(addDays(0, 11).getTime(), { lang: 'fr' })).toContain('jours');
        expect(i18nSvc.translateDuration(addDays(0, 5).getTime(), { lang: 'fr' })).toContain('jours');
      });
    });
  });
});
