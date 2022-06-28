import { find, getDefaultMocks, Mocks } from '@/utils/test';
import FaqPage, { CardIds } from '@client/pages/faq-page/faq-page';
import { shallowMount, Wrapper } from '@vue/test-utils';

const CARD_DIALOG = 'card-dialog';
const FAQ_DIALOGUE_SELECTOR = 'faq-dialog';
const INFO_PAGE_LAYOUT_SELECTOR = 'info-page-layout';

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
    it('dialog should be closed', () => {
      const dialog = find(wrapper, FAQ_DIALOGUE_SELECTOR);

      expect(dialog.props('open')).toBe(false);
    });
  });

  describe('when event open.sync', () => {
    beforeEach(() => {
      wrapper.vm.isDialogOpen = true;
    });
    it('should change isDialogOpen to false', () => {
      const dialog = find(wrapper, FAQ_DIALOGUE_SELECTOR);

      dialog.vm.$emit('update:open', false);

      expect(wrapper.vm.isDialogOpen).toEqual(false);
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

  describe('when cta of sponso card dialog clicked', () => {
    beforeEach(() => {
      wrapper.setData({
        isDialogOpen: true,
        cardId: CardIds.SPONSO_CARD,
      });
    });

    it('should redirect to sponso typeform', () => {
      const cardDialog = find(wrapper, CARD_DIALOG);

      cardDialog.vm.$emit('cta-clicked');

      expect(mocks.$navigationSvc.goToSponsoTypeform).toHaveBeenCalled();
    });
  });

  describe('when cta of boost card dialog clicked', () => {
    beforeEach(() => {
      wrapper.setData({
        isDialogOpen: true,
        cardId: CardIds.BOOST_CARD,
      });
    });

    it('should redirect to boost typeform', () => {
      const cardDialog = find(wrapper, CARD_DIALOG);

      cardDialog.vm.$emit('cta-clicked');

      expect(mocks.$navigationSvc.goToBoostTypeform).toHaveBeenCalled();
    });
  });
});
