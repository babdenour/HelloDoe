import { findAll, getDefaultMocks, Mocks } from '@/utils/test';
import InfoPageLayout, { EmittedEvents, InfoPageLayoutProps } from '@client/components/info-page-layout/info-page-layout';
import { shallowMount, Wrapper, WrapperArray } from '@vue/test-utils';

const INFO_CARD_SELECTOR: string = 'info-card';

let wrapper: Wrapper<InfoPageLayout>;

let mocks: Mocks;

const createWrapper = () => {
  mocks = getDefaultMocks();
  const propsData: InfoPageLayoutProps = {
    pageDescription: 'description',
    listCard: [
      { ctaId: '1', label: 'label', title: 'title', button: 'button', description: 'description' },
      { ctaId: '2', label: 'label', title: 'title', button: 'button', description: 'description' },
    ],
  };

  wrapper = shallowMount(InfoPageLayout, {
    mocks,
    propsData,
  });
};

describe('InfoPageLayout', () => {
  beforeEach(() => {
    createWrapper();
  });

  describe('given events of the info card', () => {
    describe('when emit cta-clicked', () => {
      it(`should emit ${EmittedEvents.CARD_CLICKED}`, () => {
        const infoCards: WrapperArray<Vue> = findAll(wrapper, INFO_CARD_SELECTOR);

        infoCards.at(0).vm.$emit('cta-clicked');
        infoCards.at(1).vm.$emit('cta-clicked');

        expect(wrapper.emitted()[EmittedEvents.CARD_CLICKED]).toBeTruthy();
        expect(wrapper.emitted()[EmittedEvents.CARD_CLICKED][0][0]).toBe('1');
        expect(wrapper.emitted()[EmittedEvents.CARD_CLICKED][1][0]).toBe('2');
      });
    });
  });
});
