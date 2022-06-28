import { FormValidation, formValidationSuccess, ValidatableForm } from '@/types/validatable-form';
import { moveDown, moveUp } from '@/utils/utils';
import QuestionDialogForm, { QuestionDialogFormMode } from '@admin/components/question-dialog-form/question-dialog-form';
import QuestionPreview from '@admin/components/question-preview/question-preview';
import QuestionSearchDialog from '@admin/components/question-search-dialog/question-search-dialog';
import { Question } from '@domains/question';
import { Quizz } from '@domains/quizz';
import { QuestionFactory } from '@factories/question.factory';
import { QuizzFactory } from '@factories/quizz.factory';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Button, Card, Dropdown, DropdownItem, DropdownMenu } from 'element-ui';
import { cloneDeep, includes } from 'lodash';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from './quizz-form.html?style=./quizz-form.scss';

export enum QuestionCmd {
  DELETE = 'DELETE',
  EDIT = 'EDIT',
  MOVE_DOWN = 'MOVE_DOWN',
  MOVE_UP = 'MOVE_UP',
}

export interface Form {
  quizz: Quizz;
  questions: Map<string, Question>;
}

export interface QuizzFormProps {
  quizz: Quizz;
  questions: Map<string, Question>;
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.ADMIN_QUESTION_DIALOG_FORM]: QuestionDialogForm,
    [COMPONENTS_NAMES.ADMIN_QUESTION_PREVIEW]: QuestionPreview,
    [COMPONENTS_NAMES.ADMIN_QUESTION_SEARCH_DIALOG]: QuestionSearchDialog,
    [Button.name]: Button,
    [Card.name]: Card,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
  },
})
export default class QuizzForm extends Vue implements QuizzFormProps, ValidatableForm<Form> {
  @Prop({ default: () => QuizzFactory.create() })
  quizz!: Quizz;

  @Prop({ default: () => new Map() })
  questions!: Map<string, Question>;

  showQuestionDialog: boolean = false;
  showQuestionSearchDialog: boolean = false;

  form: Form = this.createForm();
  questionFormMode: QuestionDialogFormMode = QuestionDialogFormMode.CREATE;
  editedQuestion: Question = QuestionFactory.create();

  get i18n() {
    return {
      createQuestion: this.$i18nSvc.t('actions.question-create'),
      delete: this.$i18nSvc.t('actions.delete'),
      edit: this.$i18nSvc.t('actions.edit'),
      moveDown: this.$i18nSvc.t('actions.move-down'),
      moveUp: this.$i18nSvc.t('actions.move-up'),
      searchQuestion: this.$i18nSvc.t('actions.question-search'),
    };
  }

  get questionCmd(): any {
    return {
      delete: QuestionCmd.DELETE,
      edit: QuestionCmd.EDIT,
      moveDown: QuestionCmd.MOVE_DOWN,
      moveUp: QuestionCmd.MOVE_UP,
    };
  }

  get sortedQuestions(): Question[] {
    return this.quizzField.questions.map((id: string) => this.questionsField.get(id));
  }

  get formDataToWatch(): any {
    return {
      quizz: this.quizz,
      questions: this.questions,
    };
  }

  get quizzField(): Quizz {
    return this.form.quizz;
  }

  get questionsField(): Map<string, Question> {
    return this.form.questions;
  }

  set questionsField(questions: Map<string, Question>) {
    this.form.questions = questions;
  }

  addQuestion(question: Question): void {
    this.questionsField.set(question.id, question);
    this.questionsField = new Map(this.questionsField);
    if (!includes(this.quizzField.questions, question.id)) {
      this.quizzField.questions.push(question.id);
    }
  }

  addQuestions(questions: Question[]): void {
    questions.forEach((question) => this.addQuestion(question));
  }

  handleQuestionAction({ cmd, payload }: { cmd: QuestionCmd; payload: string }): void {
    if (cmd === QuestionCmd.DELETE) {
      this.deleteAction(payload);
    } else if (cmd === QuestionCmd.EDIT) {
      this.editAction(payload);
    } else if (cmd === QuestionCmd.MOVE_DOWN) {
      this.moveDownAction(payload);
    } else if (cmd === QuestionCmd.MOVE_UP) {
      this.moveUpAction(payload);
    }
  }

  deleteAction(id: string): void {
    this.quizzField.questions = this.quizzField.questions.filter((questionId) => questionId !== id);
  }

  editAction(id: string): void {
    this.editedQuestion = this.questionsField.get(id);
    this.openQuestionDialogEdit();
  }

  moveDownAction(id: string): void {
    this.quizzField.questions = moveDown(this.quizzField.questions, (questionId) => questionId === id);
  }

  moveUpAction(id: string): void {
    this.quizzField.questions = moveUp(this.quizzField.questions, (questionId) => questionId === id);
  }

  openQuestionDialogCreate(): void {
    this.showQuestionDialog = true;
    this.questionFormMode = QuestionDialogFormMode.CREATE;
  }

  openQuestionDialogEdit(): void {
    this.showQuestionDialog = true;
    this.questionFormMode = QuestionDialogFormMode.EDIT;
  }

  closeQuestionDialog(): void {
    this.showQuestionDialog = false;
  }

  openQuestionSearchDialog(): void {
    this.showQuestionSearchDialog = true;
  }

  closeQuestioSearchnDialog(): void {
    this.showQuestionSearchDialog = false;
  }

  createForm(): Form {
    return {
      quizz: this.quizz ? cloneDeep(this.quizz) : QuizzFactory.create(),
      questions: this.questions ? cloneDeep(this.questions) : new Map(),
    };
  }

  async validateForm(): Promise<FormValidation<Form>> {
    return formValidationSuccess(this.form);
  }

  @Watch('formDataToWatch', { immediate: true, deep: true })
  updateForm(): void {
    this.form = this.createForm();
  }
}
