import { FormValidation, ValidatableForm } from '@/types/validatable-form';
import QuizzEmptyState from '@admin/components/quizz-empty-state/quizz-empty-state';
import QuizzForm, { Form as QuizzFormData } from '@admin/components/quizz-form/quizz-form';
import { Item } from '@components/page/components/menu-item/menu-item';
import Page from '@components/page/page';
import { Question } from '@domains/question';
import { Quizz } from '@domains/quizz';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Button, Message } from 'element-ui';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from './mission-quizz-page.html?style=./mission-quizz-page.scss';

export interface MissionQuizzPageProps {
  menu: Item[];
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.PAGE]: Page,
    [COMPONENTS_NAMES.ADMIN_QUIZZ_EMPTY_STATE]: QuizzEmptyState,
    [COMPONENTS_NAMES.ADMIN_QUIZZ_FORM]: QuizzForm,
    [Button.name]: Button,
  },
})
export default class MissionQuizzPage extends Vue implements MissionQuizzPageProps {
  @Prop({ required: true })
  menu: Item[];

  savingQuizz: boolean = false;
  fetchingQuizz: boolean = true;
  quizz: Quizz | null = null;
  questions: Map<string, Question> = new Map();

  $refs!: {
    quizzForm: ValidatableForm<QuizzFormData> & Vue;
  };

  get i18n(): any {
    return {
      save: this.$i18nSvc.t('actions.save'),
      savedSuccessfully: this.$i18nSvc.t('messages.quizz.save-success'),
    };
  }

  get fetchingForFirstTime(): boolean {
    return this.fetchingQuizz && this.quizz == null;
  }

  get missionId(): string {
    return this.$route.params.id;
  }

  get hasQuizz(): boolean {
    return this.quizz != null;
  }

  async fetchQuizz(): Promise<void> {
    this.fetchingQuizz = true;
    const { quizz, questions } = await this.$missionsService.getMissionQuizz(this.missionId);
    this.updateQuizzAndQuestions(quizz, questions);
    this.fetchingQuizz = false;
  }

  async createQuizz(): Promise<void> {
    this.savingQuizz = true;
    this.quizz = await this.$missionsService.createMissionQuizz(this.missionId);
    this.savingQuizz = false;
  }

  async saveQuizz(): Promise<void> {
    const validation: FormValidation<QuizzFormData> = await this.$refs.quizzForm.validateForm();
    if (validation.isValid) {
      this.savingQuizz = true;
      const { quizz, questions } = await this.$quizzesService.updateQuizz(validation.form.quizz);
      this.updateQuizzAndQuestions(quizz, questions);
      this.savingQuizz = false;

      if (quizz) {
        Message.success({
          message: this.i18n.savedSuccessfully,
          duration: 3000,
          showClose: true,
        });
      }
    }
  }

  updateQuizzAndQuestions(quizz: Quizz, questions: Question[]): void {
    this.quizz = quizz;
    this.questions = this.normalizeQuestions(questions);
  }

  normalizeQuestions(questions: Question[]): Map<string, Question> {
    return questions.reduce<Map<string, Question>>((map: Map<string, Question>, question: Question) => map.set(question.id, question), new Map());
  }

  @Watch('missionId', { immediate: true })
  async updateQuizz() {
    await this.fetchQuizz();
  }
}
