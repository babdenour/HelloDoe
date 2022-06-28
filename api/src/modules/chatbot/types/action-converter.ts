import { Request } from 'express';

import { Action } from '../domains/action';

export interface ActionConverter {
  canConvert: (requestBody: Request['body']) => boolean;
  fromApi: (requestBody: Request['body']) => Action;
  toApi: (action: Action) => Request['body'];
}
