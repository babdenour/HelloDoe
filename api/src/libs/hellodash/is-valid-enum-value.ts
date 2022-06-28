type StandardEnum<T> = {
  [id: string]: T | string;
  [nu: number]: string;
};

export const isValidEnumValue = <T extends StandardEnum<unknown>>(e: T, value: any): boolean => {
  return Object.values(e).includes(value);
};
