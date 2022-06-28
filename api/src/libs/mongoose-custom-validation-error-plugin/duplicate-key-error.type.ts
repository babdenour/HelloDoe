export const MONGO_ERROR_KEY = 'MongoError';

export interface DuplicateKeyError {
  name: 'MongoError';
  ok: 0;
  code: 11000;
  codeName: 'DuplicateKey';
  keyPattern: { [k: string]: 1 };
  keyValue: { [k: string]: any };
}
