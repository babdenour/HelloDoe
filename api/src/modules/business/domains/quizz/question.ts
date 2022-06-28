import { Timestamped } from '@modules/types';

import { QuestionMessage } from '../messages';

export interface Question extends Timestamped {
  id: string;
  messages: QuestionMessage[];
  tags: string[];
}
