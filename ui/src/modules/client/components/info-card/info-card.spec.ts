import { find, getDefaultMocks, Mocks } from '@/utils/test';
import InfoCard, { EmittedEvents } from '@client/components/info-card/info-card';
import { ListCardProp } from '@client/components/info-page-layout/info-page-layout';
import { CardIds } from '@client/pages/faq-page/faq-page';
import { shallowMount, Wrapper } from '@vue/test-utils';

const CTA_INFO_CARD_SELECTOR = 'cta-info-card';

let wrapper: Wrapper<InfoCard>;

let mocks: Mocks;

const createWrapper = () => {
  mocks = getDefaultMocks();
  const propsData: ListCardProp = {
    ctaId: CardIds.HELP_CARD,
    title: 'title',
    description: 'description',
    button: 'button',
  };

  wrapper = shallowMount(InfoCard, {
    mocks,
    propsData,
  });
};

describe('InfoCard', () => {
  beforeEach(() => {
    createWrapper();
  });

  describe('given events of info card', () => {
    describe('when clicked', () => {
      it(`should emit ${EmittedEvents.CTA_CLICKED}`, () => {
        const button = find(wrapper, CTA_INFO_CARD_SELECTOR);

        button.trigger('click');

        expect(wrapper.emitted()[EmittedEvents.CTA_CLICKED]).toBeTruthy();
      });
    });
  });
});
