import { find, getDefaultMocks, Mocks } from '@/utils/test';
import CandidatesPage, { DialogName } from '@client/pages/candidates-page/candidates-page';
import { Candidate } from '@domains/candidate';
import { CandidateFactory } from '@factories/candidate.factory';
import { shallowMount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';

const CANDIDATE_LIST_SELECTOR: string = 'candidate-list';
const CANDIDATE_VIDEO_CV_SECTION_SELECTOR: string = 'candidate-video-cv-section';
const CANDIDATE_PAGE_DIALOG_SELECTOR: string = 'candidate-page-dialog';
const CARD_DIALOG: string = 'card-dialog';

let wrapper: Wrapper<CandidatesPage>;

let mocks: Mocks;
const MISSION_ID: string = '1';
const MISSION_CODE: string = '1';
const CANDIDATE_ID_0: string = '0';
const CANDIDATE_ID_1: string = '1';

const mockCandidateList = (): Candidate[] => {
  return [CandidateFactory.create({ id: CANDIDATE_ID_0 }), CandidateFactory.create({ id: CANDIDATE_ID_1 })];
};

const createWrapper = () => {
  wrapper = shallowMount(CandidatesPage, { mocks });
};

describe('Candidates Page', () => {
  beforeEach(() => {
    mocks = getDefaultMocks({
      $candidateSvc: {
        getList: jest.fn().mockImplementation(() => mockCandidateList()),
        isLastPageReached: jest.fn().mockImplementation(() => false),
      },
      $missionsService: {
        getCurrent: jest.fn().mockImplementation(() => ({ id: MISSION_ID })),
      },
      $route: {
        params: { missionCode: MISSION_CODE },
      },
    });
    createWrapper();
  });

  describe('when initialise candidate list', () => {
    it(`should pass on right props`, () => {
      const listCandidate: Wrapper<Vue> = find(wrapper, CANDIDATE_LIST_SELECTOR);

      expect(listCandidate.props().hasMoreCandidates).toBe(true);
    });
  });

  describe('given events of the component candidate list', () => {
    describe('when emit candidate-selected', () => {
      it(`should update selected candidate id`, () => {
        // GIVEN
        const CANDIDATE_ID: string = '1';
        const listCandidate: Wrapper<Vue> = find(wrapper, CANDIDATE_LIST_SELECTOR);

        // WHEN
        listCandidate.vm.$emit('candidate-selected', CANDIDATE_ID);

        // THEN
        expect(wrapper.vm.selectedCandidateId).toBe(CANDIDATE_ID);
      });
    });

    describe('when emit set-candidate-favorite with value true', () => {
      it(`should call addDoerToFavorite function `, () => {
        // GIVEN
        const CANDIDATE_ID: string = '1';
        const videoCVSection: Wrapper<Vue> = find(wrapper, CANDIDATE_VIDEO_CV_SECTION_SELECTOR);

        // WHEN
        videoCVSection.vm.$emit('set-candidate-favorite', CANDIDATE_ID, true);

        // THEN
        expect(wrapper.vm.$candidateSvc.addDoerToFavorite).toHaveBeenCalledWith(MISSION_ID, CANDIDATE_ID);
      });
    });

    describe('when emit set-candidate-favorite with value false', () => {
      it(`should call removeDoerFromFavorite function`, () => {
        // GIVEN
        const CANDIDATE_ID: string = '1';
        const videoCVSection: Wrapper<Vue> = find(wrapper, CANDIDATE_VIDEO_CV_SECTION_SELECTOR);

        // WHEN
        videoCVSection.vm.$emit('set-candidate-favorite', CANDIDATE_ID, false);

        // THEN
        expect(wrapper.vm.$candidateSvc.removeDoerFromFavorite).toHaveBeenCalledWith(MISSION_ID, CANDIDATE_ID);
      });
    });

    describe('when emit redirect-to-checkout', () => {
      it(`should launch the function redirectToCheckout`, () => {
        // GIVEN
        const listCandidate: Wrapper<Vue> = find(wrapper, CANDIDATE_LIST_SELECTOR);

        // WHEN
        listCandidate.vm.$emit('redirect-to-checkout');

        // THEN
        expect(wrapper.vm.$checkoutSvc.redirectToCheckoutForMission).toHaveBeenCalledWith(MISSION_ID);
      });
    });

    describe('when emit boost ad', () => {
      beforeEach(() => {
        wrapper.vm.isDialogOpen = false;
      });
      it(`should launch the function openDialog`, async () => {
        // GIVEN
        const listCandidate: Wrapper<Vue> = find(wrapper, CANDIDATE_LIST_SELECTOR);

        // WHEN
        listCandidate.vm.$emit('boost-my-ad');

        // THEN
        await Vue.nextTick();
        expect(wrapper.vm.isDialogOpen).toBe(true);
      });
    });

    describe('when emit scrolled-to-bottom', () => {
      it(`should fetch next page of candidates`, () => {
        // GIVEN
        const listCandidate: Wrapper<Vue> = find(wrapper, CANDIDATE_LIST_SELECTOR);

        // WHEN
        listCandidate.vm.$emit('scrolled-to-bottom');

        // THEN
        expect(wrapper.vm.$candidateSvc.fetchNextPage).toHaveBeenCalledTimes(1);
        expect(wrapper.vm.$candidateSvc.fetchNextPage).toHaveBeenCalledWith(MISSION_CODE);
      });
    });
  });

  describe('given events of the candidate video cv section', () => {
    describe('when emit next-candidate-selected', () => {
      it(`should update selected candidate id if next candidate`, async () => {
        // GIVEN
        wrapper.vm.selectedCandidateId = CANDIDATE_ID_0;
        const videoCvSection: Wrapper<Vue> = find(wrapper, CANDIDATE_VIDEO_CV_SECTION_SELECTOR);

        // WHEN
        videoCvSection.vm.$emit('next-candidate-selected');

        // THEN
        expect(wrapper.vm.selectedCandidateId).toBe(CANDIDATE_ID_1);
      });

      it(`should do nothing if no next candidate`, () => {
        // GIVEN
        wrapper.vm.selectedCandidateId = CANDIDATE_ID_1;
        const videoCvSection: Wrapper<Vue> = find(wrapper, CANDIDATE_VIDEO_CV_SECTION_SELECTOR);

        // WHEN
        videoCvSection.vm.$emit('next-candidate-selected');

        // THEN
        expect(wrapper.vm.selectedCandidateId).toBe(CANDIDATE_ID_1);
      });
    });

    describe('when emit previous-candidate-selected', () => {
      it(`should update selected candidate id if previous candidate`, async () => {
        // GIVEN
        wrapper.vm.selectedCandidateId = CANDIDATE_ID_1;
        const videoCvSection: Wrapper<Vue> = find(wrapper, CANDIDATE_VIDEO_CV_SECTION_SELECTOR);

        // WHEN
        videoCvSection.vm.$emit('previous-candidate-selected');

        // THEN
        expect(wrapper.vm.selectedCandidateId).toBe(CANDIDATE_ID_0);
      });

      it(`should do nothing if no previous candidate`, () => {
        // GIVEN
        wrapper.vm.selectedCandidateId = CANDIDATE_ID_0;
        const videoCvSection: Wrapper<Vue> = find(wrapper, CANDIDATE_VIDEO_CV_SECTION_SELECTOR);

        // WHEN
        videoCvSection.vm.$emit('previous-candidate-selected');

        // THEN
        expect(wrapper.vm.selectedCandidateId).toBe(CANDIDATE_ID_0);
      });
    });
  });

  describe('when open candidate page', () => {
    it('dialog should be closed', () => {
      const dialog = find(wrapper, CANDIDATE_PAGE_DIALOG_SELECTOR);

      expect(dialog.props('open')).toBe(false);
    });
  });

  describe('when event open.sync', () => {
    beforeEach(() => {
      wrapper.vm.isDialogOpen = true;
    });
    it('should change isDialogOpen to false', () => {
      const dialog = find(wrapper, CANDIDATE_PAGE_DIALOG_SELECTOR);

      dialog.vm.$emit('update:open', false);

      expect(wrapper.vm.isDialogOpen).toEqual(false);
    });
  });

  describe('when cta of boost card dialog clicked', () => {
    beforeEach(() => {
      wrapper.setData({
        isDialogOpen: true,
        dialogName: DialogName.BOOST,
      });
    });

    it('should redirect to boost typeform', () => {
      const cardDialog = find(wrapper, CARD_DIALOG);

      cardDialog.vm.$emit('cta-clicked');

      expect(mocks.$navigationSvc.goToBoostTypeform).toHaveBeenCalled();
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
});
