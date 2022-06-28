import { ROUTE_NAMES } from '@/route-names';
import { find, getDefaultMocks, Mocks } from '@/utils/test';
import DashboardTutorialPage, { CardIds, EmittedEvents } from '@client/pages/dashboard-tutorial-page/dashboard-tutorial-page';
import { NavigationListCandidateHash } from '@services/navigation.service';
import { shallowMount, Wrapper } from '@vue/test-utils';

const INFO_PAGE_LAYOUT_SELECTOR = 'info-page-layout';

let wrapper: Wrapper<DashboardTutorialPage>;

let mocks: Mocks;

const createWrapper = () => {
  mocks = getDefaultMocks();

  wrapper = shallowMount(DashboardTutorialPage, {
    mocks,
  });
};

describe('DashboardTutorialPage', () => {
  beforeEach(() => {
    createWrapper();
  });

  describe('when clicked unlocked cta button', () => {
    it(`should emit ${EmittedEvents.GO_TO_PAGE} event`, () => {
      const ctaButton = find(wrapper, INFO_PAGE_LAYOUT_SELECTOR);

      ctaButton.vm.$emit('card-clicked', CardIds.UNLOCKED_CARD);

      expect(wrapper.emitted()[EmittedEvents.GO_TO_PAGE]).toBeTruthy();
      expect(wrapper.emitted()[EmittedEvents.GO_TO_PAGE][0][0]).toBe(ROUTE_NAMES.CLIENT_CANDIDATES_PAGE);
      expect(wrapper.emitted()[EmittedEvents.GO_TO_PAGE][0][1].hash).toBe(NavigationListCandidateHash.UNLOCKED);
    });
  });
});
