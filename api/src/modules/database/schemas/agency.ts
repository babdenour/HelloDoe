import { Types } from 'mongoose';

export interface Agency {
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
  name: string;
}
