import { OmitDeep as OmitDeepType } from '@modules/types/omit-deep';
import { Types } from 'mongoose';

import { Client } from '../schemas/client';
import { Doer } from '../schemas/doer';
import { Mission } from '../schemas/mission';
import { Question } from '../schemas/question';
import { Quizz } from '../schemas/quizz';

type OwnPrimitives = Client | Date | Doer | Mission | Question | Quizz | Types.ObjectId;

export type OmitDeep<T, PropertyKeys extends keyof any> = OmitDeepType<T, PropertyKeys, OwnPrimitives>;
