import { Question } from '@domains/question';
import { QuickRepliesMessage } from '@domains/quick-replies-message';
import { QuestionFactory } from '@factories/question.factory';
import { QuickRepliesMessageFactory } from '@factories/quick-replies-message.factory';
import { Tag } from 'element-ui';
import { last } from 'lodash';
import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './question-preview.html?style=./question-preview.scss';

export interface QuestionPreviewProps {
  question: Question;
}

@WithRender
@Component({
  components: {
    [Tag.name]: Tag,
  },
})
export default class QuestionPreview extends Vue implements QuestionPreviewProps {
  @Prop({
    default: () =>
      QuestionFactory.create({
        messages: [QuickRepliesMessageFactory.create()],
      }),
  })
  question!: Question;

  get summaryText(): string {
    const lastMessage: QuickRepliesMessage = last(this.question.messages) as QuickRepliesMessage;
    return lastMessage ? lastMessage.text : '';
  }

  get hasTags(): boolean {
    return this.question.tags.length > 0;
  }
}
