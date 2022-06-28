import { TestUtils } from '@mocks';

import { DoerFactory } from '../factories/doer.factory';

describe('DoerImpl', () => {
  describe('when get age', () => {
    const AGE = 20;
    const DOER = DoerFactory.create({
      profile: DoerFactory.createDoerProfile({
        birthday: TestUtils.formatBirthdayDate(AGE),
      }),
    });

    it('should return age', () => {
      expect(DOER.age).toBe(AGE);
    });
  });
});
