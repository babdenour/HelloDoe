export const moveDown = <T>(
  arr: T[],
  predicate: (item: T) => boolean,
  condition: (moved: T, collateral: T) => boolean = () => true
): T[] => {
  const index = arr.findIndex(predicate);
  if (index >= arr.length - 1) {
    return arr;
  }

  const item = arr[index + 1];
  const nextItem = arr[index + 1];
  if (!condition(item, nextItem)) {
    return arr;
  }

  arr[index + 1] = arr[index];
  arr[index] = nextItem;
  return [...arr];
};

export const moveUp = <T>(arr: T[], predicate: (item: T) => boolean): T[] => {
  const index = arr.findIndex(predicate);
  if (index > 0) {
    const previousItem = arr[index - 1];
    arr[index - 1] = arr[index];
    arr[index] = previousItem;
    return [...arr];
  }

  return arr;
};
