import { find, findAll, getDefaultMocks, Mocks } from '@/utils/test';
import QuestionSearchDialog, {
  Events,
  QuestionSearchDialogProps,
} from '@admin/components/question-search-dialog/question-search-dialog';
import { QuestionFactory } from '@factories/question.factory';
import { shallowMount, Wrapper } from '@vue/test-utils';

const ADD_BUTTON_SELECTOR = 'add-button';
const QUESTION_CHECKBOX_SELECTOR = 'question-checkbox';
const TAG_SELECT_SELECTOR = 'tag-select';

describe('QuestionSearchDialog', () => {
  let wrapper: Wrapper<QuestionSearchDialog>;

  let mocks: Mocks;

  const createWrapper = async () => {
    mocks = getDefaultMocks();

    wrapper = shallowMount(QuestionSearchDialog, {
      mocks,
    });

    const props: QuestionSearchDialogProps = {
      show: true,
    };
    await wrapper.setProps(props);
  };

  beforeEach(async () => {
    await createWrapper();
  });

  describe('when translate', () => {
    it('should translate add button', () => {
      const button = find(wrapper, ADD_BUTTON_SELECTOR);

      expect(button.text()).toContain('actions.add');
    });
  });

  describe('when add questions', () => {
    const QUESTION = QuestionFactory.create();

    beforeEach(async () => {
      await createWrapper();
      wrapper.vm.selectedQuestions.push(QUESTION);
      await wrapper.vm.$nextTick();
    });

    it('should emit questions selected event', () => {
      const button = find(wrapper, ADD_BUTTON_SELECTOR);
      button.vm.$emit('click');

      expect(wrapper.emitted()[Events.QUESTIONS_SELECTED]).toBeTruthy();
      expect(wrapper.emitted()[Events.QUESTIONS_SELECTED][0][0]).toEqual([QUESTION]);
    });

    it('should emit close event', () => {
      const button = find(wrapper, ADD_BUTTON_SELECTOR);
      button.vm.$emit('click');

      expect(wrapper.emitted()[Events.CLOSE]).toBeTruthy();
    });

    it('should reset list of selected questions', () => {
      const button = find(wrapper, ADD_BUTTON_SELECTOR);
      button.vm.$emit('click');

      expect(wrapper.vm.selectedQuestions).toEqual([]);
    });
  });

  describe('given tag select events', () => {
    describe('when emit change event', () => {
      const SELECTED_TAG = 'tag';

      it('should update questions', async () => {
        const select = find(wrapper, TAG_SELECT_SELECTOR);

        wrapper.vm.form.tag = SELECTED_TAG;
        select.vm.$emit('change');
        await wrapper.vm.$nextTick();

        expect(mocks.$questionsService.getQuestionsByTag).toHaveBeenCalledWith(SELECTED_TAG);
      });
    });
  });

  describe('given question checkbox events', () => {
    describe('when emit change event', () => {
      const QUESTION_ID = '1';
      const QUESTION = QuestionFactory.create({
        id: QUESTION_ID,
      });

      beforeEach(async () => {
        await createWrapper();
        wrapper.vm.questions.push(QUESTION);
        await wrapper.vm.$nextTick();
      });

      describe('when question selected', () => {
        it('should add question to selection', () => {
          const checkboxes = findAll(wrapper, QUESTION_CHECKBOX_SELECTOR);

          checkboxes.at(0).vm.$emit('change');

          expect(wrapper.vm.selectedQuestions.length).toBe(1);
          expect(wrapper.vm.selectedQuestions[0].id).toBe(QUESTION_ID);
        });
      });

      describe('when question deselected', () => {
        beforeEach(async () => {
          await createWrapper();
          wrapper.vm.questions.push(QUESTION);
          wrapper.vm.selectedQuestions.push(QUESTION);
          await wrapper.vm.$nextTick();
        });

        it('should remove question from selection', () => {
          const checkboxes = findAll(wrapper, QUESTION_CHECKBOX_SELECTOR);

          checkboxes.at(0).vm.$emit('change');

          expect(wrapper.vm.selectedQuestions.length).toBe(0);
        });
      });
    });
  });
});
