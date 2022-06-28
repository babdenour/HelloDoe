import { Document, Types } from 'mongoose';

import { Client } from '../schemas/client';
import { Doer } from '../schemas/doer';

type FilterKeyNames<K> = K extends '_id' | 'id' | 'errors' ? never : K;

type FilterObjectIdKeys<T extends Document> = {
  [k in keyof T]: T[k] extends Types.ObjectId | (Types.ObjectId | Client) | (Types.ObjectId | Doer)[]
    ? FilterKeyNames<k>
    : never;
};

type Keys<T extends Document> = FilterObjectIdKeys<T>[keyof FilterObjectIdKeys<T>];

export type PopulatableFields<T extends Document> = Keys<T>[];
