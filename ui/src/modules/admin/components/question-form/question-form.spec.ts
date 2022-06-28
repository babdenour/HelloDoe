import { MessageType } from '@/types/message-type';
import { QuestionMessage } from '@/types/question-message';
import { FormValidation } from '@/types/validatable-form';
import { find, getDefaultMocks } from '@/utils/test';
import QuestionForm, {
  Form,
  MessageCmd,
  QuestionFormProps,
} from '@admin/components/question-form/question-form';
import { ImageMessage } from '@domains/image-message';
import { QuickRepliesChoice } from '@domains/quick-replies-message';
import { TextMessage } from '@domains/text-message';
import { ImageMessageFactory } from '@factories/image-message.factory';
import { QuickRepliesMessageFactory } from '@factories/quick-replies-message.factory';
import { TextMessageFactory } from '@factories/text-message.factory';
import { shallowMount, Wrapper } from '@vue/test-utils';

const ADD_MESSAGE_BUTTON_SELECTOR = 'add-message-button';
const MESSAGE_ACTIONS_SELECTOR = 'message-actions';
const TAG_SELECT_SELECTOR = 'tags-select';

describe('QuestionForm', () => {
  let wrapper: Wrapper<QuestionForm>;

  let mockMessages: QuestionMessage[];
  let mockTags: string[];

  const createWrapper = async () => {
    const props: QuestionFormProps = {
      messages: mockMessages,
      tags: mockTags,
    };

    wrapper = shallowMount(QuestionForm, {
      mocks: getDefaultMocks(),
    });
    await wrapper.setProps(props);
  };

  beforeEach(async () => {
    mockMessages = [];
    mockTags = [];
    await createWrapper();
  });

  describe('when translate', () => {
    it('should translate tags select', () => {
      const select = find(wrapper, TAG_SELECT_SELECTOR);

      expect(select.props().placeholder).toBe('placeholders.tags');
      expect(select.props().noDataText).toBe('placeholders.no-options');
    });

    it('should translate add message button', () => {
      const button = find(wrapper, ADD_MESSAGE_BUTTON_SELECTOR);

      expect(button.text()).toContain('actions.add-message');
    });
  });

  describe('when check message type', () => {
    it('should detect when image', () => {
      expect(wrapper.vm.isImageMessage(ImageMessageFactory.create())).toBe(true);
    });

    it('should detect when quick replies', () => {
      expect(wrapper.vm.isQuickRepliesMessage(QuickRepliesMessageFactory.create())).toBe(true);
    });

    it('should detect when text', () => {
      expect(wrapper.vm.isTextMessage(TextMessageFactory.create())).toBe(true);
    });
  });

  describe('when initialise message', () => {
    describe('given image', () => {
      const URL: string = 'https://www.john.doe';

      beforeEach(async () => {
        mockMessages = [
          ImageMessageFactory.create({
            url: URL,
          }),
        ];
        await createWrapper();
      });

      it('should pass right props', () => {
        const message = wrapper.vm.$refs[wrapper.vm.getMessageRef(0)][0];

        expect(message.url).toBe(URL);
      });
    });

    describe('given quick replies', () => {
      const TEXT: string = 'text';
      const CHOICE: QuickRepliesChoice = {
        text: 'text',
        score: 5,
      };

      beforeEach(async () => {
        mockMessages = [
          QuickRepliesMessageFactory.create({
            text: TEXT,
            choices: [CHOICE],
          }),
        ];
        await createWrapper();
      });

      it('should pass right props', () => {
        const message = wrapper.vm.$refs[wrapper.vm.getMessageRef(0)][0];

        expect(message.text).toBe(TEXT);
        expect(message.choices).toEqual([CHOICE]);
      });
    });

    describe('given text', () => {
      const TEXT: string = 'text';

      beforeEach(async () => {
        mockMessages = [
          TextMessageFactory.create({
            text: TEXT,
          }),
        ];
        await createWrapper();
      });

      it('should pass right props', () => {
        const message = wrapper.vm.$refs[wrapper.vm.getMessageRef(0)][0];

        expect(message.text).toBe(TEXT);
      });
    });
  });

  describe('given quick replies message', () => {
    beforeEach(async () => {
      mockMessages = [QuickRepliesMessageFactory.create()];
      await createWrapper();
    });

    it('should not display message actions', () => {
      const actions = find(wrapper, MESSAGE_ACTIONS_SELECTOR);

      expect(actions.exists()).toBe(false);
    });
  });

  describe('when add message', () => {
    describe('given image', () => {
      it('should add message', async () => {
        wrapper.vm.addMessage(MessageType.IMAGE);

        expect(wrapper.vm.form.messages.length).toBe(1);
        expect(wrapper.vm.form.messages[0] instanceof ImageMessage).toBe(true);
      });
    });

    describe('given text', () => {
      it('should add message', async () => {
        wrapper.vm.addMessage(MessageType.TEXT);

        expect(wrapper.vm.form.messages.length).toBe(1);
        expect(wrapper.vm.form.messages[0] instanceof TextMessage).toBe(true);
      });
    });
  });

  describe('when handle message action', () => {
    describe('if delete action', () => {
      let MESSAGE_ID_0: string;
      let MESSAGE_ID_1: string;
      let MESSAGE_ID_2: string;

      beforeEach(async () => {
        const TEXT_MESSAGE_0 = TextMessageFactory.create();
        const TEXT_MESSAGE_1 = TextMessageFactory.create();
        const TEXT_MESSAGE_2 = TextMessageFactory.create();
        MESSAGE_ID_0 = TEXT_MESSAGE_0.id;
        MESSAGE_ID_1 = TEXT_MESSAGE_1.id;
        MESSAGE_ID_2 = TEXT_MESSAGE_2.id;
        mockMessages = [TEXT_MESSAGE_0, TEXT_MESSAGE_1, TEXT_MESSAGE_2];
        await createWrapper();
      });

      it('should delete message', () => {
        wrapper.vm.handleMessageAction({
          cmd: MessageCmd.DELETE,
          payload: MESSAGE_ID_0,
        });

        expect(wrapper.vm.form.messages.length).toBe(2);
        expect(wrapper.vm.form.messages[0].id).toBe(MESSAGE_ID_1);
        expect(wrapper.vm.form.messages[1].id).toBe(MESSAGE_ID_2);
      });
    });

    describe('if move up action', () => {
      const TEXT_MESSAGE_0 = TextMessageFactory.create();
      const TEXT_MESSAGE_1 = TextMessageFactory.create();
      const TEXT_MESSAGE_2 = TextMessageFactory.create();
      const MESSAGE_ID_0 = TEXT_MESSAGE_0.id;
      const MESSAGE_ID_1 = TEXT_MESSAGE_1.id;
      const MESSAGE_ID_2 = TEXT_MESSAGE_2.id;

      beforeEach(async () => {
        mockMessages = [TEXT_MESSAGE_0, TEXT_MESSAGE_1, TEXT_MESSAGE_2];
        await createWrapper();
      });

      it('should move up message', () => {
        wrapper.vm.handleMessageAction({
          cmd: MessageCmd.MOVE_UP,
          payload: MESSAGE_ID_1,
        });

        expect(wrapper.vm.form.messages[0].id).toBe(MESSAGE_ID_1);
        expect(wrapper.vm.form.messages[1].id).toBe(MESSAGE_ID_0);
        expect(wrapper.vm.form.messages[2].id).toBe(MESSAGE_ID_2);
      });
    });

    describe('if move down action', () => {
      describe('when message is not quick replies', () => {
        const TEXT_MESSAGE_0 = TextMessageFactory.create();
        const TEXT_MESSAGE_1 = TextMessageFactory.create();
        const TEXT_MESSAGE_2 = TextMessageFactory.create();
        const MESSAGE_ID_0 = TEXT_MESSAGE_0.id;
        const MESSAGE_ID_1 = TEXT_MESSAGE_1.id;
        const MESSAGE_ID_2 = TEXT_MESSAGE_2.id;

        beforeEach(async () => {
          mockMessages = [TEXT_MESSAGE_0, TEXT_MESSAGE_1, TEXT_MESSAGE_2];
          await createWrapper();
        });

        it('should move down message', () => {
          wrapper.vm.handleMessageAction({
            cmd: MessageCmd.MOVE_DOWN,
            payload: MESSAGE_ID_0,
          });

          expect(wrapper.vm.form.messages[0].id).toBe(MESSAGE_ID_1);
          expect(wrapper.vm.form.messages[1].id).toBe(MESSAGE_ID_0);
          expect(wrapper.vm.form.messages[2].id).toBe(MESSAGE_ID_2);
        });
      });

      describe('when message is quick replies', () => {
        const TEXT_MESSAGE_0 = TextMessageFactory.create();
        const TEXT_MESSAGE_1 = TextMessageFactory.create();
        const TEXT_MESSAGE_2 = QuickRepliesMessageFactory.create();
        const MESSAGE_ID_0 = TEXT_MESSAGE_0.id;
        const MESSAGE_ID_1 = TEXT_MESSAGE_1.id;
        const MESSAGE_ID_2 = TEXT_MESSAGE_2.id;

        beforeEach(async () => {
          mockMessages = [TEXT_MESSAGE_0, TEXT_MESSAGE_1, TEXT_MESSAGE_2];
          await createWrapper();
        });

        it('should do nothing', () => {
          wrapper.vm.handleMessageAction({
            cmd: MessageCmd.MOVE_DOWN,
            payload: MESSAGE_ID_1,
          });

          expect(wrapper.vm.form.messages[0].id).toBe(MESSAGE_ID_0);
          expect(wrapper.vm.form.messages[1].id).toBe(MESSAGE_ID_1);
          expect(wrapper.vm.form.messages[2].id).toBe(MESSAGE_ID_2);
        });
      });
    });
  });

  describe('when validate form', () => {
    describe('if less than 1 tag', () => {
      beforeEach(async () => {
        mockTags = [];
        await createWrapper();
      });

      it('should fail', async () => {
        const validation: FormValidation<Form> = await wrapper.vm.validateForm();
        expect(validation.isValid).toBe(false);
      });
    });
  });
});
