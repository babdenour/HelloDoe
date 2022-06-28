import { Types } from 'mongoose';

import { AccessCardKind } from '../constants/access-card-kind';

export interface AccessCard {
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
  entryPoint: Types.ObjectId;
  doer: Types.ObjectId;
  kind: AccessCardKind;
  facebook?: {
    pageScopeId: string;
  };
}
