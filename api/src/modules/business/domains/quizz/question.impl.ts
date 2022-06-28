import { last } from 'lodash';

import { QuestionMessage, QuickRepliesMessage, QuickReplyChoice } from '../messages';
import { Question } from './question';

export class QuestionImpl implements Question {
  readonly createdAt: number;
  readonly updatedAt: number;
  readonly id: string;
  readonly messages: QuestionMessage[];
  readonly tags: string[];

  constructor(question: Question) {
    this.createdAt = question.createdAt;
    this.updatedAt = question.updatedAt;
    this.id = question.id;
    this.messages = question.messages;
    this.tags = question.tags;
  }

  public isAnswerValid(answer: string): boolean {
    return !!this.findChoiceByAnswer(answer);
  }

  public getAnswerScore(answer: string): number | undefined {
    const choice: QuickReplyChoice | undefined = this.findChoiceByAnswer(answer);

    return choice ? choice.score : undefined;
  }

  private findChoiceByAnswer(answer: string): QuickReplyChoice | undefined {
    return (last(this.messages) as QuickRepliesMessage).choices.find(
      (choice: QuickReplyChoice) => choice.text === answer,
    );
  }
}
