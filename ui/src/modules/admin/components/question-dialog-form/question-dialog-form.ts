import { QuestionMessage } from '@/types/question-message';
import { ValidatableForm } from '@/types/validatable-form';
import QuestionForm, { Form as QuestionFormData } from '@admin/components/question-form/question-form';
import { Question } from '@domains/question';
import { QuestionFactory } from '@factories/question.factory';
import { QuickRepliesMessageFactory } from '@factories/quick-replies-message.factory';
import { ValidateEnum } from '@libs/prop-validators/validators/validate-enum';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Button, Dialog } from 'element-ui';
import { cloneDeep } from 'lodash';
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from './question-dialog-form.html?style=./question-dialog-form.scss';

export enum QuestionDialogFormMode {
  CREATE = 'create',
  EDIT = 'edit',
}

interface Form {
  messages: QuestionMessage[];
  tags: string[];
}

export interface QuestionDialogFormProps {
  editedQuestion: Question;
  mode: QuestionDialogFormMode;
  show: boolean;
}

export enum Events {
  CLOSE = 'close',
  QUESTION_SAVED = 'question-saved',
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.ADMIN_QUESTION_FORM]: QuestionForm,
    [Button.name]: Button,
    [Dialog.name]: Dialog,
  },
})
export default class QuestionDialogForm extends Vue implements QuestionDialogFormProps {
  @Prop({ default: false, type: Boolean })
  show!: boolean;

  @Prop({
    default: QuestionDialogFormMode.CREATE,
    validator: ValidateEnum(QuestionDialogFormMode),
  })
  mode: QuestionDialogFormMode;

  @Prop({ default: () => QuestionFactory.create() })
  editedQuestion: Question;

  form: Form = this.resetForm();

  savingQuestion: boolean = false;

  $refs!: {
    questionForm: ValidatableForm<QuestionFormData> & Vue;
  };

  get i18n() {
    return {
      create: this.$i18nSvc.t('actions.create'),
      save: this.$i18nSvc.t('actions.save'),
    };
  }

  get saveButtonText(): string {
    return (this.mode === QuestionDialogFormMode.EDIT ? this.i18n.save : this.i18n.create) as string;
  }

  get dataToUpdateInitialValues(): any {
    return {
      editedQuestion: this.editedQuestion,
      mode: this.mode,
    };
  }

  async validateForm(): Promise<void> {
    const validation = await this.$refs.questionForm.validateForm();

    if (validation.isValid) {
      const question: Question = QuestionFactory.create({
        id: this?.editedQuestion?.id,
        messages: validation.form.messages,
        tags: validation.form.tags,
      });

      this.savingQuestion = true;
      const savedQuestion: Question = await this.persistQuestion(question);
      this.savingQuestion = false;

      this.form = this.resetForm();
      this.$emit(Events.QUESTION_SAVED, savedQuestion);
      this.$emit(Events.CLOSE);
    }
  }

  async persistQuestion(question: Question): Promise<Question> {
    let savedQuestion: Question;
    if (this.mode === QuestionDialogFormMode.EDIT) {
      savedQuestion = await this.$questionsService.updateQuestion(question);
    } else {
      savedQuestion = await this.$questionsService.createQuestion(question);
    }

    return savedQuestion;
  }

  resetForm(): Form {
    if (this.mode === QuestionDialogFormMode.EDIT) {
      return cloneDeep({
        messages: this.editedQuestion?.messages,
        tags: this.editedQuestion?.tags,
      });
    } else {
      return {
        messages: [QuickRepliesMessageFactory.create()],
        tags: [],
      };
    }
  }

  @Emit(Events.CLOSE)
  emitClose(): void {}

  @Watch('dataToUpdateInitialValues', { deep: true, immediate: true })
  updateInitialValues(): void {
    this.form = this.resetForm();
  }
}
