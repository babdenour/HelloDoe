import { validateAndGetEnumValue } from './validate-and-get-enum-value';

enum EnumTest {
  VALUE = 'VALUE_1',
}

describe('validateAndGetEnumValue', () => {
  it('should return true when valid', () => {
    expect(validateAndGetEnumValue(EnumTest, 'VALUE_1')).toBe('VALUE_1');
  });

  it('should return false when invalid', () => {
    expect(() => validateAndGetEnumValue(EnumTest, 'INVALID')).toThrow();
  });
});
