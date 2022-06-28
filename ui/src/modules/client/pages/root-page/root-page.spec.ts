import { ROUTE_NAMES } from '@/route-names';
import { find, getDefaultMocks, Mocks } from '@/utils/test';
import RootPage, { DialogName } from '@client/pages/root-page/root-page';
import { shallowMount, Wrapper } from '@vue/test-utils';

const PAGE_MENU_SELECTOR = 'page-menu';
const MISSION_MENU_SELECTOR = 'mission-show-menu';
const CARD_DIALOG = 'card-dialog';
const PAGE_MENU_DIALOG_SELECTOR = 'page-menu-dialog';

let wrapper: Wrapper<RootPage>;

let mocks: Mocks;
const MISSION_CODE = '1';
const MISSION_ID: string = '1';

const createWrapper = () => {
  wrapper = shallowMount(RootPage, { mocks });
};

describe('Root Page', () => {
  beforeEach(() => {
    mocks = getDefaultMocks({
      $route: {
        params: { missionCode: MISSION_CODE },
      },
      $missionsService: {
        getCurrent: jest.fn().mockImplementation(() => ({ id: MISSION_ID })),
      },
    });
    createWrapper();
  });

  describe('given events of the component menu page', () => {
    describe('when emit go-to-page', () => {
      it('should redirect to client recruitment process page', () => {
        const pageMenu = find(wrapper, PAGE_MENU_SELECTOR);

        pageMenu.vm.$emit('go-to-page', ROUTE_NAMES.CLIENT_RECRUITMENT_PROCESS_PAGE);

        expect(mocks.$navigationSvc.goToClientRecruitmentProcess).toHaveBeenCalledWith(MISSION_CODE);
      });

      it('should redirect to dashboard tutorial page', () => {
        const pageMenu = find(wrapper, PAGE_MENU_SELECTOR);

        pageMenu.vm.$emit('go-to-page', ROUTE_NAMES.CLIENT_DASHBOARD_TUTORIAL_PAGE);

        expect(mocks.$navigationSvc.goToClientDashboardTutorial).toHaveBeenCalledWith(MISSION_CODE);
      });

      it('should redirect to my-candidate page', () => {
        const pageMenu = find(wrapper, PAGE_MENU_SELECTOR);

        pageMenu.vm.$emit('go-to-page', ROUTE_NAMES.CLIENT_CANDIDATES_PAGE);

        expect(mocks.$navigationSvc.goToClientCandidatePage).toHaveBeenCalledWith(MISSION_CODE, undefined);
      });
    });
    describe('when emit redirect-to-checkout', () => {
      it(`should launch the function redirectToCheckout`, () => {
        // GIVEN
        const listCandidate: Wrapper<Vue> = find(wrapper, PAGE_MENU_SELECTOR);

        // WHEN
        listCandidate.vm.$emit('redirect-to-checkout');

        // THEN
        expect(wrapper.vm.$checkoutSvc.redirectToCheckoutForMission).toHaveBeenCalledWith(MISSION_ID);
      });
    });
  });

  describe('when mission action menu is shown', () => {
    beforeEach(() => {
      wrapper.vm.showMissionMenu = true;
    });
    it('should show mission action menu', () => {
      const missionMenu = find(wrapper, MISSION_MENU_SELECTOR);
      expect(missionMenu.exists()).toBe(true);
    });
  });

  describe('when mission action menu is hidden', () => {
    beforeEach(() => {
      wrapper.vm.showMissionMenu = false;
    });

    it('should hide mission action menu', () => {
      const missionMenu = find(wrapper, MISSION_MENU_SELECTOR);

      expect(missionMenu.exists()).toBe(false);
    });
  });

  describe('when open page menu', () => {
    it('dialog should be closed', () => {
      const dialog = find(wrapper, PAGE_MENU_DIALOG_SELECTOR);

      expect(dialog.props('open')).toBe(false);
    });
  });

  describe('when event update:open', () => {
    beforeEach(() => {
      wrapper.vm.isDialogOpen = true;
    });
    it('should change isDialogOpen to false', () => {
      const dialog = find(wrapper, PAGE_MENU_DIALOG_SELECTOR);

      dialog.vm.$emit('update:open', false);

      expect(wrapper.vm.isDialogOpen).toEqual(false);
    });
  });

  describe('when cta of sponsor card dialog clicked', () => {
    beforeEach(() => {
      wrapper.setData({
        isDialogOpen: true,
        dialogName: DialogName.SPONSOR,
      });
    });

    it('should redirect to sponsor typeform', () => {
      const cardDialog = find(wrapper, CARD_DIALOG);

      cardDialog.vm.$emit('cta-clicked');

      expect(mocks.$navigationSvc.goToSponsoTypeform).toHaveBeenCalled();
    });
  });

  describe('when cta of boost card dialog clicked', () => {
    beforeEach(() => {
      wrapper.setData({
        isDialogOpen: true,
        dialogName: DialogName.BOOST,
      });
    });

    it('should redirect to sponsor typeform', () => {
      const cardDialog = find(wrapper, CARD_DIALOG);

      cardDialog.vm.$emit('cta-clicked');

      expect(mocks.$navigationSvc.goToBoostTypeform).toHaveBeenCalled();
    });
  });
});
