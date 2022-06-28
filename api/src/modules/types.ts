export type Mutable<T> = { -readonly [P in keyof T]: T[P] };

export type Class<T = any> = new (...args: any[]) => T;

export interface Timestamped {
  createdAt: number;
  updatedAt: number;
}
