import { ROUTE_NAMES } from '@/route-names';
import { find, getDefaultMocks, Mocks } from '@/utils/test';
import RootPage from '@client/pages/root-page/root-page';
import { ClientFactory } from '@factories/client.factory';
import { MissionFactory } from '@factories/mission.factory';
import { shallowMount, Wrapper } from '@vue/test-utils';

const PAGE_MENU_SELECTOR = 'page-menu';
const MISSION_MENU_SELECTOR = 'mission-show-menu';
const BOOST_MY_AD_DIALOG: string = 'boost-my-ad-dialog';
const SPONSO_MY_AD_DIALOG: string = 'sponso-my-ad-dialog';
const HELP_DIALOG: string = 'help-dialog';

let wrapper: Wrapper<RootPage>;

let mocks: Mocks;
const MISSION_CODE = '1';
const MISSION_ID: string = '1';
const CLIENT_ID: string = '100';
const CLIENT_FIRST_NAME: string = 'John';

const createWrapper = () => {
  wrapper = shallowMount(RootPage, { mocks });
};

describe('Root Page', () => {
  beforeEach(() => {
    mocks = getDefaultMocks({
      $clientSvc: {
        getCurrent: jest.fn().mockImplementation(() =>
          ClientFactory.create({
            id: CLIENT_ID,
            contact: ClientFactory.createContact({
              firstName: CLIENT_FIRST_NAME,
            }),
          }),
        ),
      },
      $missionsService: {
        getCurrent: jest.fn().mockImplementation(() =>
          MissionFactory.create({
            id: MISSION_ID,
            client: CLIENT_ID,
          }),
        ),
      },
      $route: {
        params: { missionCode: MISSION_CODE },
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
        const listCandidate: Wrapper<Vue> = find(wrapper, PAGE_MENU_SELECTOR);

        listCandidate.vm.$emit('redirect-to-checkout');

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

    it('Boost dialog should be closed', () => {
      const boostDialog = find(wrapper, BOOST_MY_AD_DIALOG);
      expect(boostDialog.props('open')).toBe(false);
    });

    it('Sponso dialog should be closed', () => {
      const sponsoDialog = find(wrapper, SPONSO_MY_AD_DIALOG);
      expect(sponsoDialog.props('open')).toBe(false);
    });

    it('Help dialog should be closed', () => {
      const helpDialog = find(wrapper, HELP_DIALOG);
      expect(helpDialog.props('open')).toBe(false);
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

  describe('given events of boost dialog', () => {
    describe('when emit update:open', () => {
      beforeEach(() => {
        wrapper.vm.isBoostMyAddDialogOpen = true;
      });

      it('should close boost dialog', () => {
        const dialog = find(wrapper, BOOST_MY_AD_DIALOG);

        dialog.vm.$emit('update:open', false);

        expect(wrapper.vm.isBoostMyAddDialogOpen).toEqual(false);
      });
    });
  });

  describe('given events of sponso dialog', () => {
    describe('when emit update:open', () => {
      beforeEach(() => {
        wrapper.vm.isSponsoMyAddDialogOpen = true;
      });

      it('should close sponso dialog', () => {
        const dialog = find(wrapper, SPONSO_MY_AD_DIALOG);

        dialog.vm.$emit('update:open', false);

        expect(wrapper.vm.isSponsoMyAddDialogOpen).toEqual(false);
      });
    });
  });

  describe('given events of help dialog', () => {
    describe('when emit update:open', () => {
      beforeEach(() => {
        wrapper.vm.isHelpDialogOpen = true;
      });

      it('should close help dialog', () => {
        const dialog = find(wrapper, HELP_DIALOG);

        dialog.vm.$emit('update:open', false);

        expect(wrapper.vm.isHelpDialogOpen).toEqual(false);
      });
    });
  });
});
