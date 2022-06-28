import { ROUTE_NAMES } from '@/route-names';
import { find, getDefaultMocks, Mocks } from '@/utils/test';
import RecruitmentProcessPage, { CardIds, EmittedEvents } from '@client/pages/recruitment-process-page/recruitment-process-page';
import { NavigationListCandidateHash } from '@services/navigation.service';
import { shallowMount, Wrapper } from '@vue/test-utils';

const CARD_DIALOG = 'card-dialog';
const RECRUITMENT_DIALOGUE_SELECTOR = 'recruitment-process-dialog';
const INFO_PAGE_LAYOUT_SELECTOR = 'info-page-layout';

let wrapper: Wrapper<RecruitmentProcessPage>;

const MISSION_ID: string = '1';

let mocks: Mocks;

const createWrapper = () => {
  mocks = getDefaultMocks({
    $missionsService: {
      getCurrent: jest.fn().mockImplementation(() => ({ id: MISSION_ID })),
    },
  });

  wrapper = shallowMount(RecruitmentProcessPage, {
    mocks,
  });
};

describe('RecruitmentProcessPage', () => {
  beforeEach(() => {
    createWrapper();
  });

  describe('when page initialised', () => {
    it('dialog should be closed', () => {
      const dialog = find(wrapper, RECRUITMENT_DIALOGUE_SELECTOR);

      expect(dialog.props('open')).toBe(false);
    });
  });

  describe('when event open.sync', () => {
    beforeEach(() => {
      wrapper.vm.isDialogOpen = true;
    });
    it('should change isDialogOpen to false', () => {
      const dialog = find(wrapper, RECRUITMENT_DIALOGUE_SELECTOR);

      dialog.vm.$emit('update:open', false);

      expect(wrapper.vm.isDialogOpen).toEqual(false);
    });
  });

  describe('when click on "sponsorisez mon annonce"', () => {
    it('should redirect to instagram', () => {
      const button = find(wrapper, INFO_PAGE_LAYOUT_SELECTOR);

      button.vm.$emit('card-clicked', CardIds.MY_AD_CARD);

      expect(mocks.$navigationSvc.goToInstagram).toHaveBeenCalled();
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

  describe('when click on go to "voir mon annonce"', () => {
    it('should redirect to instagram ', () => {
      const button = find(wrapper, INFO_PAGE_LAYOUT_SELECTOR);

      button.vm.$emit('card-clicked', CardIds.MY_AD_CARD);

      expect(mocks.$navigationSvc.goToInstagram).toHaveBeenCalled();
    });
  });

  describe('when click on stripe checkout', () => {
    it('should redirect to stripe payment ', () => {
      const button = find(wrapper, INFO_PAGE_LAYOUT_SELECTOR);

      button.vm.$emit('card-clicked', CardIds.REDIRECT_TO_CHECKOUT);

      expect(wrapper.vm.$checkoutSvc.redirectToCheckoutForMission).toHaveBeenCalledWith(MISSION_ID);
    });
  });

  describe('when clicked suggested cta button', () => {
    it(`should emit ${EmittedEvents.GO_TO_PAGE} event`, () => {
      const ctaButton = find(wrapper, INFO_PAGE_LAYOUT_SELECTOR);

      ctaButton.vm.$emit('card-clicked', CardIds.SUGGESTED_CARD);

      expect(wrapper.emitted()[EmittedEvents.GO_TO_PAGE]).toBeTruthy();
      expect(wrapper.emitted()[EmittedEvents.GO_TO_PAGE][0][0]).toBe(ROUTE_NAMES.CLIENT_CANDIDATES_PAGE);
      expect(wrapper.emitted()[EmittedEvents.GO_TO_PAGE][0][1].hash).toBe(NavigationListCandidateHash.SUGGESTED);
    });
  });

  describe('when clicked unlock cta button', () => {
    it(`should emit ${EmittedEvents.GO_TO_PAGE} event`, () => {
      const ctaButton = find(wrapper, INFO_PAGE_LAYOUT_SELECTOR);

      ctaButton.vm.$emit('card-clicked', CardIds.UNLOCK_CARD);

      expect(wrapper.emitted()[EmittedEvents.GO_TO_PAGE]).toBeTruthy();
      expect(wrapper.emitted()[EmittedEvents.GO_TO_PAGE][0][0]).toBe(ROUTE_NAMES.CLIENT_CANDIDATES_PAGE);
      expect(wrapper.emitted()[EmittedEvents.GO_TO_PAGE][0][1].hash).toBe(NavigationListCandidateHash.UNLOCKED);
    });
  });

  describe('when clicked "allez aux candidatures" cta button', () => {
    it(`should emit ${EmittedEvents.GO_TO_PAGE} event`, () => {
      const ctaButton = find(wrapper, INFO_PAGE_LAYOUT_SELECTOR);

      ctaButton.vm.$emit('card-clicked', CardIds.SELECTION_CARD);

      expect(wrapper.emitted()[EmittedEvents.GO_TO_PAGE]).toBeTruthy();
      expect(wrapper.emitted()[EmittedEvents.GO_TO_PAGE][0][0]).toBe(ROUTE_NAMES.CLIENT_CANDIDATES_PAGE);
    });
  });
});
