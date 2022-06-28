import { getContainer } from '@/di-container';
import { Form, StrNotBlankValidator } from '@libs/form';

export interface LoginPageForm {
  email: string;
  missionCode: string;
}

export const createForm = (): Form<LoginPageForm> => {
  return {
    values: {
      email: {
        value: '',
        touched: false,
        validators: [
          {
            check: StrNotBlankValidator,
            error: getContainer().i18nSvc?.t('forms.errors.empty-field'),
          },
        ],
      },
      missionCode: {
        value: '',
        touched: false,
        validators: [
          {
            check: StrNotBlankValidator,
            error: getContainer().i18nSvc?.t('forms.errors.empty-field'),
          },
        ],
      },
    },
    errors: {},
  };
};
