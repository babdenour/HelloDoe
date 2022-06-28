import { Form } from '@libs/form';
import { getValues } from '@libs/form/handlers';

interface TestForm {
  email: string;
  missionCode: string;
}

const createForm = (): Form<TestForm> => {
  return {
    values: {
      email: {
        value: 'abde@hd.co',
        touched: false,
        validators: [],
      },
      missionCode: {
        value: 'G0-001',
        touched: false,
        validators: [],
      },
    },
    errors: {},
  };
};

describe('Form', () => {
  describe('when extract form values', () => {
    it('should get right values', () => {
      const form: Form<TestForm> = createForm();

      const formValues: TestForm = getValues(form);

      expect(formValues.email).toBe(form.values.email.value);
      expect(formValues.missionCode).toBe(form.values.missionCode.value);
    });
  });
});
