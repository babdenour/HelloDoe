import { Types } from 'mongoose';

export interface JobBoard {
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
  name: string;
  missionSources: Types.ObjectId[];
}
