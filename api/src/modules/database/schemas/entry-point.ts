import { Types } from 'mongoose';

import { EntryPointKind } from '../constants/entry-point-kind';

export interface EntryPoint {
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
  jobBoard: Types.ObjectId;
  kind: EntryPointKind;
  facebook?: {
    pageId: string;
  };
}
