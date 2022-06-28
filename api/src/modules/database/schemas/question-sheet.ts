import { Types } from 'mongoose';

export interface QuestionSheet {
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
  question: Types.ObjectId;
  doer: Types.ObjectId;
  quizz: Types.ObjectId;
  answer: string;
  score: number;
}
