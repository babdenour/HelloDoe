import { Types } from 'mongoose';

export interface QuizzSheet {
  createdAt: Date;
  updatedAt: Date;
  _id: Types.ObjectId;
  doer: Types.ObjectId;
  quizz: Types.ObjectId;
  questionSheets: Types.ObjectId[];
  completedAt: Date;
  score: number;
  isFavorite: boolean;
  isUnlocked: boolean;
  isSeen: boolean;
}
