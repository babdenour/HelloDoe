import { isValidEnumValue } from './is-valid-enum-value';

enum EnumTest {
  VALUE = 'VALUE_1',
}

describe('isValidEnumValue', () => {
  it('should return true when valid', () => {
    expect(isValidEnumValue(EnumTest, 'VALUE_1')).toBe(true);
  });

  it('should return false when invalid', () => {
    expect(isValidEnumValue(EnumTest, 'INVALID')).toBe(false);
  });
});
