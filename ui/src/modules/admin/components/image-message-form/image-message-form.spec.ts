import { find } from '@/utils/test';
import ImageMessageForm, {
  ImageMessageFormProps,
} from '@admin/components/image-message-form/image-message-form';
import { mount, Wrapper } from '@vue/test-utils';

const IMAGE_TITLE_SELECTOR = 'image-title';

describe('ImageMessageForm', () => {
  let wrapper: Wrapper<ImageMessageForm>;

  let urlProp: string;

  const createWrapper = async (): Promise<void> => {
    const props: ImageMessageFormProps = {
      url: urlProp,
    };

    wrapper = mount(ImageMessageForm);
    await wrapper.setProps(props);
  };

  beforeEach(async () => {
    urlProp = 'url';
    await createWrapper();
  });

  describe('when translate', () => {
    it('should translate image title', () => {
      const title = find(wrapper, IMAGE_TITLE_SELECTOR);
      expect(title.text()).toContain('forms.image-message.image-title');
    });
  });

  it('should set url valid', async () => {
    wrapper.vm.setUrlValid();

    expect(wrapper.vm.isUrlValid).toBe(true);
  });

  it('should set url invalid', async () => {
    wrapper.vm.setUrlInvalid();

    expect(wrapper.vm.isUrlValid).toBe(false);
  });
});
