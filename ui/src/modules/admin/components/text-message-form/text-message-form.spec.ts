import { find } from '@/utils/test';
import TextMessageForm, {
  TextMessageFormProps,
} from '@admin/components/text-message-form/text-message-form';
import { mount, Wrapper } from '@vue/test-utils';

const TEXT_TITLE_SELECTOR = 'text-title';

describe('TextMessageForm', () => {
  let wrapper: Wrapper<TextMessageForm>;

  let textProp: string;

  const createWrapper = async (): Promise<void> => {
    const props: TextMessageFormProps = {
      text: textProp,
    };

    wrapper = mount(TextMessageForm);
    await wrapper.setProps(props);
  };

  beforeEach(async () => {
    textProp = 'text';
    await createWrapper();
  });

  describe('when translate', () => {
    it('should translate text title', () => {
      const title = find(wrapper, TEXT_TITLE_SELECTOR);
      expect(title.text()).toContain('forms.text-message.text-title');
    });
  });
});
