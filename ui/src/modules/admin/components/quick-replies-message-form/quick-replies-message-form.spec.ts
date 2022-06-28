import { find } from '@/utils/test';
import QuickRepliesMessageForm, {
  QuickRepliesMessageFormProps,
} from '@admin/components/quick-replies-message-form/quick-replies-message-form';
import { QuickRepliesChoice } from '@domains/quick-replies-message';
import { QuickRepliesMessageFactory } from '@factories/quick-replies-message.factory';
import { mount, Wrapper } from '@vue/test-utils';

describe('QuickRepliesMessageForm', () => {
  let wrapper: Wrapper<QuickRepliesMessageForm>;

  let textProp: string;
  let choicesProp: QuickRepliesChoice[];

  const createWrapper = async (): Promise<void> => {
    const props: QuickRepliesMessageFormProps = {
      text: textProp,
      choices: choicesProp,
    };

    wrapper = mount(QuickRepliesMessageForm);
    await wrapper.setProps(props);
  };

  beforeEach(async () => {
    textProp = 'text';
    choicesProp = [
      QuickRepliesMessageFactory.createChoice(),
      QuickRepliesMessageFactory.createChoice(),
    ];
    await createWrapper();
  });

  it('should initialise correctly', () => {
    expect(wrapper.vm.quickReplyMaxLength).toBe(20);
    expect(wrapper.vm.scoreMin).toBe(0);
    expect(wrapper.vm.scoreMax).toBe(10);
  });

  describe('when translate', () => {
    it('should translate question title', () => {
      const title = find(wrapper, 'question-title');
      expect(title.text()).toContain('forms.quick-replies-message.question-title');
    });

    it('should translate choices title', () => {
      const title = find(wrapper, 'choices-title');
      expect(title.text()).toContain('forms.quick-replies-message.choices-title');
    });
  });

  describe('when click add choice button', () => {
    beforeEach(async () => {
      choicesProp = [
        QuickRepliesMessageFactory.createChoice(),
        QuickRepliesMessageFactory.createChoice(),
      ];
      await createWrapper();
    });

    it('should add choice', () => {
      const button = find(wrapper, 'add-choice-button');
      button.trigger('click');

      expect(wrapper.vm.form.choices.length).toBe(3);
    });
  });

  describe('when click remove choice button', () => {
    beforeEach(async () => {
      choicesProp = [
        QuickRepliesMessageFactory.createChoice(),
        QuickRepliesMessageFactory.createChoice(),
        QuickRepliesMessageFactory.createChoice(),
      ];
      await createWrapper();
    });

    it('should remove choice', () => {
      const button = find(wrapper, 'remove-choice-button');
      button.trigger('click');

      expect(wrapper.vm.form.choices.length).toBe(2);
    });
  });

  describe('when display quick replies', () => {
    describe('if enough replies', () => {
      beforeEach(async () => {
        choicesProp = [
          QuickRepliesMessageFactory.createChoice(),
          QuickRepliesMessageFactory.createChoice(),
          QuickRepliesMessageFactory.createChoice(),
        ];
        await createWrapper();
      });

      it('should display delete button', () => {
        expect(wrapper.vm.canDeleteQuickReply).toBe(true);
      });
    });

    describe('if not enough replies', () => {
      beforeEach(async () => {
        choicesProp = [
          QuickRepliesMessageFactory.createChoice(),
          QuickRepliesMessageFactory.createChoice(),
        ];
        await createWrapper();
      });

      it('should not display delete button', () => {
        expect(wrapper.vm.canDeleteQuickReply).toBe(false);
      });
    });
  });
});
