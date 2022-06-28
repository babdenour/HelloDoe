import { find, findAll } from '@/utils/test';
import CardDialog, { CardDialogOptions, CardDialogProps, EmittedEvents } from '@client/components/card-dialog/card-dialog';
import { shallowMount, Wrapper } from '@vue/test-utils';

const ICON_SELECTOR = 'icon-src-card-dialog';
const TITLE_SELECTOR = 'title-src-card-dialog';
const DESCRIPTION_SELECTOR = 'description-src-card-dialog';
const CTA_SELECTOR = 'cta-src-card-dialog';
const OPTION_SELECTOR = 'option';
const OPTION_WRAPPER_SELECTOR = 'option-wrapper';

let wrapper: Wrapper<CardDialog>;
let mockOptions: CardDialogOptions[] = [];

const createWrapper = () => {
  const props: CardDialogProps = {
    title: 'title',
    description: 'description',
    cta: 'cta',
    iconSrc: 'iconSrc',
    options: mockOptions,
  };

  wrapper = shallowMount(CardDialog, { propsData: props });
};

describe('CardDialog', () => {
  beforeEach(() => {
    createWrapper();
  });

  describe('given the icon', () => {
    it('should display the icon at the right place ', () => {
      const icon = find(wrapper, ICON_SELECTOR);
      expect(icon.text()).toContain('iconSrc');
    });
  });

  describe('given the title', () => {
    it('should display the title at the right place ', () => {
      const title = find(wrapper, TITLE_SELECTOR);
      expect(title.text()).toContain('title');
    });
  });

  describe('given the description', () => {
    it('should display the description at the right place', () => {
      const description = find(wrapper, DESCRIPTION_SELECTOR);
      expect(description.text()).toContain('description');
    });
  });

  describe('given the cta', () => {
    it('should display the cta at the right place', () => {
      const cta = find(wrapper, CTA_SELECTOR);
      expect(cta.text()).toContain('cta');
    });

    describe('when clicked cta', () => {
      it('should emit cta clicked', () => {
        const cta = find(wrapper, CTA_SELECTOR);

        cta.trigger('click');

        expect(wrapper.emitted()[EmittedEvents.CTA_CLICKED]).toBeTruthy();
      });
    });
  });

  describe('given options', () => {
    describe('if no options provided', () => {
      beforeEach(() => {
        mockOptions = [];
        createWrapper();
      });

      it('should not display options wrapper', () => {
        const optionWrapper = find(wrapper, OPTION_WRAPPER_SELECTOR);

        expect(optionWrapper.exists()).toBe(false);
      });
    });

    describe('if options provided', () => {
      beforeEach(() => {
        mockOptions = [
          {
            text: 'option-1',
          },
          {
            text: 'option-2',
          },
        ];
        createWrapper();
      });

      it('should display option wrapper', () => {
        const optionWrapper = find(wrapper, OPTION_WRAPPER_SELECTOR);

        expect(optionWrapper.exists()).toBe(true);
      });

      it('should display every options', () => {
        const options = findAll(wrapper, OPTION_SELECTOR);

        expect(options.length).toBe(2);
        expect(options.at(0).text()).toContain('option-1');
        expect(options.at(1).text()).toContain('option-2');
      });
    });
  });
});
