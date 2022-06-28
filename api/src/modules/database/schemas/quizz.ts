import { Types } from 'mongoose';

export interface Quizz {
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
  mission: Types.ObjectId;
  questions: Types.ObjectId[];
}
