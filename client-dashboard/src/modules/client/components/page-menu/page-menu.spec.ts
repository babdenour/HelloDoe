import { ROUTE_NAMES } from '@/route-names';
import { find, getDefaultMocks, Mocks } from '@/utils/test';
import MenuPage, { EmittedEvents } from '@client/components/page-menu/page-menu';
import { shallowMount, Wrapper } from '@vue/test-utils';

const MENU_BUTTON_TITLE_DASHBOARD_TUTORIAL = ROUTE_NAMES.CLIENT_DASHBOARD_TUTORIAL_PAGE;
const MENU_BUTTON_TITLE_MY_CANDIDATES = ROUTE_NAMES.CLIENT_CANDIDATES_PAGE;
const MENU_BUTTON_TITLE_RECRUITMENT_PROCESS = ROUTE_NAMES.CLIENT_RECRUITMENT_PROCESS_PAGE;
const CLIENT_FAQ_PAGE = ROUTE_NAMES.CLIENT_FAQ_PAGE;
const REDIRECT_TO_CHECKOUT_SELECTOR = 'unlock-favorites-button';
const SUB_MENU_TITLE_SELECTOR = 'sub-menu-title';

let wrapper: Wrapper<MenuPage>;

let mocks: Mocks;

const createWrapper = () => {
  mocks = getDefaultMocks();

  wrapper = shallowMount(MenuPage, {
    mocks,
  });
};

describe('MenuPage', () => {
  beforeEach(() => {
    createWrapper();
  });

  describe('when translate', () => {
    it('should translate sub menu title', () => {
      const title = find(wrapper, SUB_MENU_TITLE_SELECTOR);

      expect(title.text()).toBe('component.page-menu.sub-menu.title');
    });

    it('should translate title my candidate', () => {
      const title = find(wrapper, MENU_BUTTON_TITLE_MY_CANDIDATES);

      expect(title.props('title')).toBe('component.page-menu.button.my-candidates');
    });

    it('should translate title tutorial dashboard', () => {
      const title = find(wrapper, MENU_BUTTON_TITLE_DASHBOARD_TUTORIAL);

      expect(title.props('title')).toBe('component.page-menu.button.dashboard-tutorial');
    });

    it('should translate title recruitment process', () => {
      const title = find(wrapper, MENU_BUTTON_TITLE_RECRUITMENT_PROCESS);

      expect(title.props('title')).toBe('component.page-menu.button.recruit-process');
    });

    it('should translate title FAQ', () => {
      const title = find(wrapper, CLIENT_FAQ_PAGE);

      expect(title.props('title')).toBe('component.page-menu.button.faq');
    });
  });

  describe('given events of the component page menu button', () => {
    describe('when clicked Dashboard tutorial', () => {
      it(`should emit ${EmittedEvents.GO_TO_PAGE} event`, () => {
        const button = find(wrapper, MENU_BUTTON_TITLE_DASHBOARD_TUTORIAL);

        button.trigger('click');
        expect(wrapper.emitted()[EmittedEvents.GO_TO_PAGE]).toBeTruthy();
      });

      it(`should pass on page clicked`, () => {
        const button = find(wrapper, MENU_BUTTON_TITLE_DASHBOARD_TUTORIAL);

        button.trigger('click');

        expect(wrapper.emitted()[EmittedEvents.GO_TO_PAGE][0][0]).toEqual(ROUTE_NAMES.CLIENT_DASHBOARD_TUTORIAL_PAGE);
      });
    });

    describe('when clicked my candidate', () => {
      it(`should emit ${EmittedEvents.GO_TO_PAGE} event`, () => {
        const button = find(wrapper, MENU_BUTTON_TITLE_MY_CANDIDATES);

        button.trigger('click');
        expect(wrapper.emitted()[EmittedEvents.GO_TO_PAGE]).toBeTruthy();
      });

      it(`should pass on page clicked`, () => {
        const button = find(wrapper, MENU_BUTTON_TITLE_MY_CANDIDATES);

        button.trigger('click');

        expect(wrapper.emitted()[EmittedEvents.GO_TO_PAGE][0][0]).toEqual(ROUTE_NAMES.CLIENT_CANDIDATES_PAGE);
      });
    });

    describe('when clicked recruitment process', () => {
      it(`should emit ${EmittedEvents.GO_TO_PAGE} event`, () => {
        const button = find(wrapper, MENU_BUTTON_TITLE_RECRUITMENT_PROCESS);

        button.trigger('click');
        expect(wrapper.emitted()[EmittedEvents.GO_TO_PAGE]).toBeTruthy();
      });

      it(`should pass on page clicked`, () => {
        const button = find(wrapper, MENU_BUTTON_TITLE_RECRUITMENT_PROCESS);

        button.trigger('click');

        expect(wrapper.emitted()[EmittedEvents.GO_TO_PAGE][0][0]).toEqual(ROUTE_NAMES.CLIENT_RECRUITMENT_PROCESS_PAGE);
      });
    });

    describe('when clicked FAQ', () => {
      it(`should emit ${EmittedEvents.GO_TO_PAGE} event`, () => {
        const button = find(wrapper, CLIENT_FAQ_PAGE);

        button.trigger('click');
        expect(wrapper.emitted()[EmittedEvents.GO_TO_PAGE]).toBeTruthy();
      });

      it(`should pass on page clicked`, () => {
        const button = find(wrapper, CLIENT_FAQ_PAGE);

        button.trigger('click');

        expect(wrapper.emitted()[EmittedEvents.GO_TO_PAGE][0][0]).toEqual(ROUTE_NAMES.CLIENT_FAQ_PAGE);
      });
    });

    describe('when clicked unlock my favorites', () => {
      it(`should emit ${EmittedEvents.REDIRECT_TO_CHECKOUT} event`, () => {
        const button = find(wrapper, REDIRECT_TO_CHECKOUT_SELECTOR);

        button.trigger('click');
        expect(wrapper.emitted()[EmittedEvents.REDIRECT_TO_CHECKOUT]).toBeTruthy();
      });
    });
  });
});
