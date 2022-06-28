import { find } from '@/utils/test';
import { QuestionDialogFormMode } from '@admin/components/question-dialog-form/question-dialog-form';
import QuizzForm, { QuestionCmd, QuizzFormProps } from '@admin/components/quizz-form/quizz-form';
import { Question } from '@domains/question';
import { Quizz } from '@domains/quizz';
import { QuestionFactory } from '@factories/question.factory';
import { QuizzFactory } from '@factories/quizz.factory';
import { shallowMount, Wrapper } from '@vue/test-utils';

const QUESTION_SEARCH_DIALOG_SELECTOR = 'question-search-dialog';
const QUESTION_SEARCH_BUTTON_SELECTOR = 'question-search-button';

describe('QuizzForm', () => {
  let wrapper: Wrapper<QuizzForm>;

  let mockQuizz: Quizz;

  const createWrapper = async (): Promise<void> => {
    const questions: Map<string, Question> = mockQuizz.questions.reduce((acc, id) => {
      acc.set(id, QuestionFactory.create({ id }));
      return acc;
    }, new Map());

    const props: Partial<QuizzFormProps> = {
      quizz: mockQuizz,
      questions,
    };

    wrapper = shallowMount(QuizzForm);
    await wrapper.setProps(props);
  };

  beforeEach(async () => {
    mockQuizz = QuizzFactory.create();
    await createWrapper();
  });

  describe('when translate', () => {
    it('should translate create question button', () => {
      const button = find(wrapper, 'create-button');

      expect(button.text()).toContain('actions.question-create');
    });

    it('should translate search question button', () => {
      const button = find(wrapper, QUESTION_SEARCH_BUTTON_SELECTOR);

      expect(button.text()).toContain('actions.question-search');
    });
  });

  describe('when click create question button', () => {
    beforeEach(() => {
      wrapper.vm.showQuestionDialog = false;
      wrapper.vm.questionFormMode = QuestionDialogFormMode.EDIT;
    });

    it('should open question dialog in create mode', () => {
      const button = find(wrapper, 'create-button');
      button.vm.$emit('click');

      expect(wrapper.vm.showQuestionDialog).toBe(true);
      expect(wrapper.vm.questionFormMode).toBe(QuestionDialogFormMode.CREATE);
    });
  });

  describe('when click search question button', () => {
    beforeEach(() => {
      wrapper.vm.showQuestionSearchDialog = false;
    });

    it('should open dialog', () => {
      const button = find(wrapper, QUESTION_SEARCH_BUTTON_SELECTOR);
      button.vm.$emit('click');

      expect(wrapper.vm.showQuestionSearchDialog).toBe(true);
    });
  });

  describe('when handle question action', () => {
    describe('if delete action', () => {
      const QUESTION_ID = '1';

      beforeEach(async () => {
        mockQuizz = QuizzFactory.create({
          questions: [QUESTION_ID, '2'],
        });
        await createWrapper();
      });

      it('should delete question', () => {
        wrapper.vm.handleQuestionAction({
          cmd: QuestionCmd.DELETE,
          payload: QUESTION_ID,
        });

        expect(wrapper.vm.quizzField.questions).toEqual(['2']);
      });
    });

    describe('if edit action', () => {
      beforeEach(async () => {
        await createWrapper();
        wrapper.vm.showQuestionDialog = false;
        wrapper.vm.questionFormMode = QuestionDialogFormMode.CREATE;
      });

      it('should open question dialog in edit mode', () => {
        wrapper.vm.handleQuestionAction({
          cmd: QuestionCmd.EDIT,
          payload: '1',
        });

        expect(wrapper.vm.showQuestionDialog).toBe(true);
        expect(wrapper.vm.questionFormMode).toBe(QuestionDialogFormMode.EDIT);
      });
    });

    describe('if move down action', () => {
      const QUESTION_ID = '1';

      beforeEach(async () => {
        mockQuizz = QuizzFactory.create({
          questions: [QUESTION_ID, '2'],
        });
        await createWrapper();
      });

      it('should move down question', () => {
        wrapper.vm.handleQuestionAction({
          cmd: QuestionCmd.MOVE_DOWN,
          payload: QUESTION_ID,
        });

        expect(wrapper.vm.quizzField.questions).toEqual(['2', QUESTION_ID]);
      });
    });

    describe('if move up action', () => {
      const QUESTION_ID = '1';

      beforeEach(async () => {
        mockQuizz = QuizzFactory.create({
          questions: ['2', QUESTION_ID],
        });
        await createWrapper();
      });

      it('should move up question', () => {
        wrapper.vm.handleQuestionAction({
          cmd: QuestionCmd.MOVE_UP,
          payload: QUESTION_ID,
        });

        expect(wrapper.vm.quizzField.questions).toEqual([QUESTION_ID, '2']);
      });
    });
  });

  describe('given question dialog form events', () => {
    describe('when emit close event', () => {
      beforeEach(() => {
        wrapper.vm.showQuestionDialog = true;
      });

      it('should close dialog', async () => {
        const dialog = find(wrapper, 'question-dialog-form');
        dialog.vm.$emit('close');

        expect(wrapper.vm.showQuestionDialog).toBe(false);
      });
    });

    describe('when emit question saved event', () => {
      const QUESTION_ID = '1';
      const SAVED_QUESTION: Question = QuestionFactory.create({ id: QUESTION_ID });

      it('should add question to quizz form', async () => {
        const dialog = find(wrapper, 'question-dialog-form');
        dialog.vm.$emit('question-saved', SAVED_QUESTION);

        expect(wrapper.vm.form.quizz.questions).toEqual([QUESTION_ID]);
        expect(wrapper.vm.form.questions.get(QUESTION_ID)).toEqual(SAVED_QUESTION);
      });
    });
  });

  describe('given question search dialog events', () => {
    describe('when emit close event', () => {
      beforeEach(() => {
        wrapper.vm.showQuestionSearchDialog = true;
      });

      it('should close dialog', async () => {
        const dialog = find(wrapper, QUESTION_SEARCH_DIALOG_SELECTOR);
        dialog.vm.$emit('close');

        expect(wrapper.vm.showQuestionSearchDialog).toBe(false);
      });
    });

    describe('when emit questions selected event', () => {
      const QUESTIONS: Question[] = [
        QuestionFactory.create({ id: '1' }),
        QuestionFactory.create({ id: '2' }),
        QuestionFactory.create({ id: '3' }),
      ];

      beforeEach(() => {
        wrapper.vm.showQuestionSearchDialog = true;
      });

      it('should add questions', async () => {
        const dialog = find(wrapper, QUESTION_SEARCH_DIALOG_SELECTOR);
        dialog.vm.$emit('questions-selected', QUESTIONS);

        expect(wrapper.vm.quizzField.questions).toEqual(['1', '2', '3']);
      });
    });
  });
});
