import { InputValidatorService } from './input-validator.service';

describe(`InputValidatorService`, () => {
  const inputValidatorService = new InputValidatorService();

  describe(`isEmailValid`, () => {
    it(`should validate email`, async () => {
      expect(inputValidatorService.isEmailValid('john@doe.co')).toEqual(true);
    });

    it(`should not validate email`, async () => {
      expect(inputValidatorService.isEmailValid('wrong@email')).toEqual(false);
    });
  });

  describe(`isPhoneValid`, () => {
    it(`should validate phone`, async () => {
      expect(inputValidatorService.isPhoneValid('0606060606')).toEqual(true);
    });

    it(`should not validate phone`, async () => {
      expect(inputValidatorService.isPhoneValid('12345678')).toEqual(false);
    });
  });

  describe(`isStringBlank`, () => {
    it(`should detect blank string`, async () => {
      expect(inputValidatorService.isStringBlank('')).toEqual(true);
      expect(inputValidatorService.isStringBlank('        ')).toEqual(true);
    });

    it(`should detect string not blank`, async () => {
      expect(inputValidatorService.isStringBlank('Hello Doe')).toEqual(false);
    });
  });

  describe(`isStringSet`, () => {
    it(`should detect set string`, async () => {
      expect(inputValidatorService.isStringSet('Hello Doe')).toEqual(true);
    });

    it(`should detect string not set`, async () => {
      expect(inputValidatorService.isStringSet('')).toEqual(false);
      expect(inputValidatorService.isStringSet('        ')).toEqual(false);
    });
  });

  describe(`isNumberMin`, () => {
    const isAboveFive = inputValidatorService.isNumberMin(5);

    it(`should validate int with min value`, async () => {
      expect(isAboveFive('10')).toEqual(true);
      expect(isAboveFive('5')).toEqual(true);
    });

    it(`should detect int below min value`, async () => {
      expect(isAboveFive('0')).toEqual(false);
    });
  });
});
