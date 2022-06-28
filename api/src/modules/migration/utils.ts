import { Document, QueryCursor } from 'mongoose';

export const typeCursorIterator = <T extends Document>(cursor: QueryCursor<T>): IterableIterator<T | null> => {
  return (cursor as unknown) as IterableIterator<T | null>;
};
