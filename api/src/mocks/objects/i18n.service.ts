import { I18nService } from '@i18n';

export const mockI18nSvc = (mock?: Partial<I18nService>): Partial<I18nService> => {
  return {
    t: mock?.t || jest.fn().mockImplementation((key: string) => key),
    translateDate: mock?.translateDate || jest.fn(),
    translateDateRelativeToNow: mock?.translateDateRelativeToNow || jest.fn(),
    translateDuration: mock?.translateDuration || jest.fn(),
  };
};
