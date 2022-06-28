import {
  QuickRepliesChoice,
  QuickRepliesMessage,
  QuickRepliesMessageParams,
} from '@domains/quick-replies-message';

export class QuickRepliesMessageFactory {
  public static create(args?: Partial<QuickRepliesMessageParams>): QuickRepliesMessage {
    const quickRepliesMessage: QuickRepliesMessageParams = {
      text: args?.text || '',
      choices: args?.choices
        ? args.choices.map((choice) => this.createChoice(choice))
        : [this.createChoice({ score: 5 }), this.createChoice({ score: 5 })],
    };

    return new QuickRepliesMessage(quickRepliesMessage);
  }

  public static createChoice(args?: Partial<QuickRepliesChoice>): QuickRepliesChoice {
    return {
      text: args?.text || '',
      score: args?.score || 0,
    };
  }
}
