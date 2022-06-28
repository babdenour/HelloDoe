import { find, getDefaultMocks, Mocks } from '@/utils/test';
import QuestionDialogForm, {
  Events,
  QuestionDialogFormMode,
  QuestionDialogFormProps,
} from '@admin/components/question-dialog-form/question-dialog-form';
import { Question } from '@domains/question';
import { QuestionFactory } from '@factories/question.factory';
import { QuickRepliesMessageFactory } from '@factories/quick-replies-message.factory';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { shallowMount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';

const SAVE_BUTTON_SELECTOR = 'save-button';

describe('QuestionDialogForm', () => {
  let wrapper: Wrapper<QuestionDialogForm>;

  let mocks: Mocks;
  let mockMode: QuestionDialogFormMode = QuestionDialogFormMode.CREATE;
  let mockEditedQuestion: Question = QuestionFactory.create();
  let mockCreateQuestion = jest.fn();
  let mockUpdateQuestion = jest.fn();
  let mockValidateForm = jest.fn();

  const getStubs = () => {
    return {
      [COMPONENTS_NAMES.ADMIN_QUESTION_FORM]: Vue.extend({
        render: () => ({} as any),
        methods: {
          validateForm: mockValidateForm,
        },
      }),
    };
  };

  const createWrapper = async () => {
    const props: QuestionDialogFormProps = {
      editedQuestion: mockEditedQuestion,
      mode: mockMode,
      show: true,
    };

    mocks = getDefaultMocks({
      $questionsService: {
        createQuestion: mockCreateQuestion,
        updateQuestion: mockUpdateQuestion,
      },
    });

    wrapper = shallowMount(QuestionDialogForm, {
      mocks,
      stubs: getStubs(),
    });

    await wrapper.setProps(props);
  };

  beforeEach(async () => {
    mockMode = QuestionDialogFormMode.CREATE;
    mockEditedQuestion = QuestionFactory.create();
    mockCreateQuestion = jest.fn();
    mockUpdateQuestion = jest.fn();
    mockValidateForm = jest.fn();
    await createWrapper();
  });

  describe('when translate', () => {
    describe('in create mode', () => {
      beforeEach(async () => {
        mockMode = QuestionDialogFormMode.CREATE;
        await createWrapper();
      });

      it('should translate edit button', () => {
        const button = find(wrapper, SAVE_BUTTON_SELECTOR);

        expect(button.text()).toContain('actions.create');
      });
    });

    describe('in edit mode', () => {
      beforeEach(async () => {
        mockMode = QuestionDialogFormMode.EDIT;
        await createWrapper();
      });

      it('should translate edit button', () => {
        const button = find(wrapper, SAVE_BUTTON_SELECTOR);

        expect(button.text()).toContain('actions.save');
      });
    });
  });

  describe('when validate form', () => {
    describe('if form valid', () => {
      const MESSAGES = [
        QuickRepliesMessageFactory.create({
          text: 'text',
          choices: [
            QuickRepliesMessageFactory.createChoice(),
            QuickRepliesMessageFactory.createChoice(),
          ],
        }),
      ];
      const TAGS = ['tag1', 'tag2'];

      describe('and mode is create', () => {
        const SAVED_QUESTION: Question = QuestionFactory.create({
          messages: MESSAGES,
          tags: TAGS,
        });

        beforeEach(async () => {
          mockMode = QuestionDialogFormMode.CREATE;
          mockValidateForm = jest.fn().mockImplementation(() => ({
            isValid: true,
            form: {
              messages: MESSAGES,
              tags: TAGS,
            },
          }));
          mockCreateQuestion.mockImplementation(() => SAVED_QUESTION);
          await createWrapper();
        });

        it('should create question', async () => {
          await wrapper.vm.validateForm();

          expect(mockCreateQuestion).toHaveBeenCalledWith(
            QuestionFactory.create({
              messages: MESSAGES,
              tags: TAGS,
            })
          );
        });

        it('should emit created question', async () => {
          await wrapper.vm.validateForm();

          expect(wrapper.emitted()[Events.QUESTION_SAVED]).toBeTruthy();
          expect(wrapper.emitted()[Events.QUESTION_SAVED][0][0]).toBe(SAVED_QUESTION);
        });
      });

      describe('and mode is edit', () => {
        const EDITED_QUESTION = QuestionFactory.create({
          id: '1',
          messages: MESSAGES,
          tags: TAGS,
        });

        beforeEach(async () => {
          mockMode = QuestionDialogFormMode.EDIT;
          mockEditedQuestion = EDITED_QUESTION;
          mockValidateForm = jest.fn().mockImplementation(() => ({
            isValid: true,
            form: {
              messages: MESSAGES,
              tags: TAGS,
            },
          }));
          mockUpdateQuestion.mockImplementation(() => EDITED_QUESTION);
          await createWrapper();
        });

        it('should update question', async () => {
          await wrapper.vm.validateForm();

          expect(mockUpdateQuestion).toHaveBeenCalledWith(EDITED_QUESTION);
        });
      });
    });

    describe('if form invalid', () => {
      beforeEach(async () => {
        mockValidateForm = jest.fn().mockImplementation(() => ({
          isValid: false,
          form: null,
        }));
        await createWrapper();
      });

      it('should do nothing', async () => {
        await wrapper.vm.validateForm();

        expect(mockCreateQuestion).not.toHaveBeenCalled();
      });
    });
  });
});
