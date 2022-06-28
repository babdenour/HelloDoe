import { find, getDefaultMocks, Mocks } from '@/utils/test';
import CheckoutFailurePage from '@client/pages/checkout-failure/checkout-failure';
import { shallowMount, Wrapper } from '@vue/test-utils';

const BACK_BUTTON_SELECTOR = 'back-button';
const SUBTITLE_SELECTOR = 'subtitle';
const TITLE_SELECTOR = 'title';

let wrapper: Wrapper<CheckoutFailurePage>;
let mocks: Mocks;

const MISSION_CODE = 'MISSION_CODE';

const createWrapper = () => {
  wrapper = shallowMount(CheckoutFailurePage, { mocks });
};

describe('CheckoutFailurePage', () => {
  beforeEach(() => {
    mocks = getDefaultMocks({
      $route: {
        query: {
          code: MISSION_CODE,
        },
      },
    });
    createWrapper();
  });

  describe('when translate', () => {
    it('should translate title', () => {
      const title = find(wrapper, TITLE_SELECTOR);
      expect(title.text()).toBe('pages.client.checlout-failure.title');
    });

    it('should translate subtitle', () => {
      const subtitle = find(wrapper, SUBTITLE_SELECTOR);
      expect(subtitle.text()).toBe('pages.client.checlout-failure.subtitle');
    });

    it('should translate back button', () => {
      const button = find(wrapper, BACK_BUTTON_SELECTOR);
      expect(button.text()).toBe('actions.validate');
    });
  });

  describe('when click back button', () => {
    it('should redirect to client doer selection page', () => {
      const button = find(wrapper, BACK_BUTTON_SELECTOR);
      button.vm.$emit('click');

      expect(mocks.$navigationSvc.goToClientCandidatePage).toHaveBeenCalledWith(MISSION_CODE);
    });
  });
});
