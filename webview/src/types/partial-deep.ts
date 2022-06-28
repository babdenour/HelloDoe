/**
 * Set an object as partial recursively.
 */
export type PartialDeep<T> = {
  [P in keyof T]?: PartialDeep<T[P]>;
};
