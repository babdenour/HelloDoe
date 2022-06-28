import QuestionPreview from '@admin/components/question-preview/question-preview';
import { Question } from '@domains/question';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Button, Card, Checkbox, Col, Dialog, Input, Option, Row, Select } from 'element-ui';
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import WithRender from './question-search-dialog.html?style=./question-search-dialog.scss';

interface DisplayedQuestion {
  id: string;
  selected: boolean;
  question: Question;
}

interface Form {
  tag: string;
  search: string;
}

export interface QuestionSearchDialogProps {
  show: boolean;
}

export enum Events {
  CLOSE = 'close',
  QUESTIONS_SELECTED = 'questions-selected',
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.ADMIN_QUESTION_PREVIEW]: QuestionPreview,
    [Button.name]: Button,
    [Card.name]: Card,
    [Checkbox.name]: Checkbox,
    [Col.name]: Col,
    [Dialog.name]: Dialog,
    [Input.name]: Input,
    [Option.name]: Option,
    [Row.name]: Row,
    [Select.name]: Select,
  },
})
export default class QuestionSearchDialog extends Vue implements QuestionSearchDialogProps {
  @Prop({ default: false, type: Boolean })
  show!: boolean;

  tags: string[] = [];
  questions: Question[] = [];
  selectedQuestions: Question[] = [];

  form: Form = {
    tag: '',
    search: '',
  };

  get i18n() {
    return {
      add: this.$i18nSvc.t('actions.add'),
      filterKeywords: this.$i18nSvc.t('placeholders.filter-keywords'),
      noOptions: this.$i18nSvc.t('placeholders.no-options'),
      tags: this.$i18nSvc.t('placeholders.tags'),
    };
  }

  get hasQuestions(): boolean {
    return this.questions.length > 0;
  }

  get questionSelectedCount(): number {
    return this.selectedQuestions.length;
  }

  get hasSelectedQuestions(): boolean {
    return this.selectedQuestions.length > 0;
  }

  get addButtonText(): string {
    return !this.hasSelectedQuestions ? `${this.i18n.add}` : `${this.i18n.add} (${this.questionSelectedCount})`;
  }

  get displayedQuestions(): DisplayedQuestion[] {
    return this.questions.map((question: Question) => ({
      id: question.id,
      selected: this.isSelected(question.id),
      question,
    }));
  }

  toggleSelect(question: Question): void {
    const idx = this.selectedQuestions.findIndex((q) => q.id === question.id);
    if (idx < 0) {
      this.selectedQuestions.push(question);
    } else {
      this.selectedQuestions.splice(idx, 1);
    }
  }

  isSelected(questionId: string): boolean {
    return this.selectedQuestions.find((question) => question.id === questionId) != null;
  }

  async mounted(): Promise<void> {
    this.tags = await this.$questionsService.getQuestionTags();
  }

  async fetchQuestionsByTag(): Promise<void> {
    this.questions = await this.$questionsService.getQuestionsByTag(this.form.tag);
  }

  emitQuestions(): void {
    this.$emit(Events.QUESTIONS_SELECTED, this.selectedQuestions);
    this.$emit(Events.CLOSE);
    this.selectedQuestions = [];
  }

  @Emit(Events.CLOSE)
  emitClose(): void {}
}
