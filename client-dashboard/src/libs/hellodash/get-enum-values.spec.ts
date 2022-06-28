import { getEnumObject, getEnumValues, getEnumValuesObject } from './get-enum-values';

enum EnumTest {
  VALUE_1 = 'VALUE-1',
  VALUE_2 = 'VALUE-2',
}

describe('getEnumObject', () => {
  it('should return enum object', () => {
    expect(getEnumObject(EnumTest)).toEqual({ VALUE_1: 'VALUE-1', VALUE_2: 'VALUE-2' });
  });
});

describe('getEnumValuesObject', () => {
  it('should return enum object', () => {
    expect(getEnumValuesObject(EnumTest)).toEqual({ 'VALUE-1': 'VALUE-1', 'VALUE-2': 'VALUE-2' });
  });
});

describe('getEnumValues', () => {
  it('should return enum values', () => {
    expect(getEnumValues(EnumTest)).toEqual(['VALUE-1', 'VALUE-2']);
  });
});
