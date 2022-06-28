type KeyForStringsOf<T> = {
  [k in keyof T]: T[k] extends string ? k : never;
};
type AcceptableKey<T> = KeyForStringsOf<T>[keyof KeyForStringsOf<T>];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const reduce = <T extends { [k: string]: any }>(arr: T[], key: AcceptableKey<T>): Map<string, T> => {
  return arr.reduce<Map<string, T>>((acc: Map<string, T>, current: T) => {
    acc.set(current[key], current);

    return acc;
  }, new Map());
};
