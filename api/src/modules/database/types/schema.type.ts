import { SchemaDefinition, Types } from 'mongoose';

import { Client } from '../schemas/client';
import { Doer } from '../schemas/doer';
import { Mission } from '../schemas/mission';
import { Question } from '../schemas/question';
import { Quizz } from '../schemas/quizz';

export type SchemaType<T> = {
  [k in keyof T]: T[k] extends
    | Client
    | Date
    | Doer
    | Mission
    | Question
    | Quizz
    | Types.ObjectId
    | boolean
    | number
    | string
    | []
    ? SchemaDefinition['']
    : SchemaType<T[k]>;
};
