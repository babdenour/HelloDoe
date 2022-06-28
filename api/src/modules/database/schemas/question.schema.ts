import { Document, Schema } from 'mongoose';

import { SchemaType } from '../types/schema.type';
import { Question } from './question';

type QuestionType = Omit<Question, '_id'>;

export type QuestionDoc = Document & QuestionType;

const schema: SchemaType<QuestionType> = {
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  messages: [
    {
      kind: { type: String, required: true },
      text: { type: String },
      url: { type: String },
      choices: [
        {
          text: { type: String },
          postback: { type: String },
          score: { type: Number },
        },
      ],
    },
  ],
  tags: [{ type: String, default: '' }],
};

export const QuestionSchema = new Schema(schema, {
  timestamps: true,
  usePushEach: true,
});
