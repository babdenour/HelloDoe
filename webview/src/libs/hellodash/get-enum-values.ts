import { StandardEnum } from './enum.type';

type EnumKeys<Enum> = Exclude<keyof Enum, number>;

export const getEnumObject = <Enum extends StandardEnum>(e: Enum): { [k: string]: string | number } => {
  const copy = { ...e } as { [K in EnumKeys<Enum>]: Enum[K] };

  Object.values(e).forEach((value: string | number) => typeof value === 'number' && delete copy[value]);

  return copy;
};

export const getEnumValuesObject = <Enum extends StandardEnum>(e: Enum): { [k: string]: string | number } => {
  return Object.values(getEnumObject(e)).reduce((acc, value: string) => {
    acc[value] = value;

    return acc;
  }, {});
};

export const getEnumValues = <Enum extends StandardEnum>(e: Enum): (string | number)[] => {
  return [...new Set(Object.values(getEnumObject(e)))] as Enum[EnumKeys<Enum>][];
};
