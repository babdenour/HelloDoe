type EnumKeys<Enum> = Exclude<keyof Enum, number>;

const enumObject = <Enum extends Record<string, number | string>>(e: Enum) => {
  const copy = { ...e } as { [K in EnumKeys<Enum>]: Enum[K] };
  Object.values(e).forEach((value) => typeof value === 'number' && delete copy[value]);

  return copy;
};
export const enumValues = <Enum extends Record<string, number | string>>(e: Enum) => {
  return [...new Set(Object.values(enumObject(e)))] as Enum[EnumKeys<Enum>][];
};
