import { find, getDefaultMocks, Mocks } from '@/utils/test';
import FaqPage, { CardIds } from '@client/pages/faq-page/faq-page';
import { shallowMount, Wrapper } from '@vue/test-utils';

const INFO_PAGE_LAYOUT_SELECTOR: string = 'info-page-layout';
const BOOST_MY_AD_DIALOG: string = 'boost-my-ad-dialog';
const SPONSO_MY_AD_DIALOG: string = 'sponso-my-ad-dialog';
const HELP_DIALOG: string = 'help-dialog';

const MISSION_ID: string = '1';

let wrapper: Wrapper<FaqPage>;

let mocks: Mocks;

const createWrapper = () => {
  mocks = getDefaultMocks({
    $missionsService: {
      getCurrent: jest.fn().mockImplementation(() => ({ id: MISSION_ID })),
    },
  });

  wrapper = shallowMount(FaqPage, {
    mocks,
  });
};

describe('FaqPage', () => {
  beforeEach(() => {
    createWrapper();
  });

  describe('when open FAQ page', () => {
    it('Sponso dialog should be closed', () => {
      const sponsoDialog = find(wrapper, SPONSO_MY_AD_DIALOG);
      expect(sponsoDialog.props('open')).toBe(false);
    });

    it('Help dialog should be closed', () => {
      const helpDialog = find(wrapper, HELP_DIALOG);
      expect(helpDialog.props('open')).toBe(false);
    });

    it('Boost dialog should be closed', () => {
      const boostDialog = find(wrapper, BOOST_MY_AD_DIALOG);
      expect(boostDialog.props('open')).toBe(false);
    });
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

describe('when click on stripe checkout', () => {
  it('should redirect to stripe payment ', () => {
    const button = find(wrapper, INFO_PAGE_LAYOUT_SELECTOR);

    button.vm.$emit('card-clicked', CardIds.REDIRECT_TO_CHECKOUT);

    expect(wrapper.vm.$checkoutSvc.redirectToCheckoutForMission).toHaveBeenCalledWith(MISSION_ID);
  });
});

describe('when click on go to instagram', () => {
  it('should redirect to hello doe s instagram ', () => {
    const button = find(wrapper, INFO_PAGE_LAYOUT_SELECTOR);

    button.vm.$emit('card-clicked', CardIds.INSTAGRAM_CARD);

    expect(mocks.$navigationSvc.goToInstagram).toHaveBeenCalled();
  });
});

describe('when click on go to beta tester', () => {
  it('should redirect to beta tester form ', () => {
    const button = find(wrapper, INFO_PAGE_LAYOUT_SELECTOR);

    button.vm.$emit('card-clicked', CardIds.BETA_TESTER_CARD);

    expect(mocks.$navigationSvc.goToBetaTestTypeform).toHaveBeenCalled();
  });
});
