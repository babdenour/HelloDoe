import { ValidateEnum } from './validate-enum';

enum TestEnum {
  VALUE = 'VALUE',
}

describe(`ValidateEnum`, () => {
  const validator: (value: string) => boolean = ValidateEnum(TestEnum);

  it(`should validate value`, async () => {
    expect(validator(TestEnum.VALUE)).toEqual(true);
  });

  it(`should reject value`, async () => {
    expect(validator('WRONG VALUE')).toEqual(false);
  });
});
