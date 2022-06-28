import { Timestamped } from '@modules/types';

export interface Quizz extends Timestamped {
  id: string;
  mission: string;
  questions: string[];
}
