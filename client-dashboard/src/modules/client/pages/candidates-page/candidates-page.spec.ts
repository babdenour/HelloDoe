import { find, getDefaultMocks, Mocks } from '@/utils/test';
import CandidatesPage from '@client/pages/candidates-page/candidates-page';
import { Candidate } from '@domains/candidate';
import { CandidateFactory } from '@factories/candidate.factory';
import { shallowMount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';

const CANDIDATE_LIST_SELECTOR: string = 'candidate-list';
const CANDIDATE_VIDEO_CV_SECTION_SELECTOR: string = 'candidate-video-cv-section';
const BOOST_AD_DIALOG: string = 'boost-my-ad-dialog';
const SPONSO_AD_DIALOG: string = 'sponso-my-ad-dialog';

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
        const CANDIDATE_ID: string = '1';
        const listCandidate: Wrapper<Vue> = find(wrapper, CANDIDATE_LIST_SELECTOR);

        listCandidate.vm.$emit('candidate-selected', CANDIDATE_ID);

        expect(wrapper.vm.selectedCandidateId).toBe(CANDIDATE_ID);
        expect(wrapper.vm.$candidateSvc.setCandidateAsSeen).toHaveBeenCalledTimes(1);
      });

      it(`should call setCandidateAsSeen`, async () => {
        const CANDIDATE_ID: string = '1';
        const listCandidate: Wrapper<Vue> = find(wrapper, CANDIDATE_LIST_SELECTOR);

        listCandidate.vm.$emit('candidate-selected', CANDIDATE_ID);

        await Vue.nextTick();
        expect(wrapper.vm.$candidateSvc.setCandidateAsSeen).toHaveBeenCalledWith(MISSION_ID, CANDIDATE_ID);
      });
    });
  });

  describe('when emit set-candidate-favorite with value true', () => {
    it(`should call addDoerToFavorite function `, () => {
      const CANDIDATE_ID: string = '1';
      const videoCVSection: Wrapper<Vue> = find(wrapper, CANDIDATE_VIDEO_CV_SECTION_SELECTOR);

      videoCVSection.vm.$emit('set-candidate-favorite', CANDIDATE_ID, true);
      expect(wrapper.vm.$candidateSvc.addDoerToFavorite).toHaveBeenCalledWith(MISSION_ID, CANDIDATE_ID);
    });
  });

  describe('when emit set-candidate-favorite with value false', () => {
    it(`should call removeDoerFromFavorite function`, () => {
      const CANDIDATE_ID: string = '1';
      const videoCVSection: Wrapper<Vue> = find(wrapper, CANDIDATE_VIDEO_CV_SECTION_SELECTOR);

      videoCVSection.vm.$emit('set-candidate-favorite', CANDIDATE_ID, false);
      expect(wrapper.vm.$candidateSvc.removeDoerFromFavorite).toHaveBeenCalledWith(MISSION_ID, CANDIDATE_ID);
    });
  });

  describe('when emit redirect-to-checkout', () => {
    it(`should launch the function redirectToCheckout`, () => {
      const listCandidate: Wrapper<Vue> = find(wrapper, CANDIDATE_LIST_SELECTOR);

      listCandidate.vm.$emit('redirect-to-checkout');
      expect(wrapper.vm.$checkoutSvc.redirectToCheckoutForMission).toHaveBeenCalledWith(MISSION_ID);
    });
  });

  describe('when emit boost ad', () => {
    beforeEach(() => {
      wrapper.vm.isBoostMyAddDialogOpen = false;
    });

    it(`should open boost dialog`, async () => {
      const boost = find(wrapper, CANDIDATE_LIST_SELECTOR);

      boost.vm.$emit('boost-my-ad');
      await Vue.nextTick();
      expect(wrapper.vm.isBoostMyAddDialogOpen).toBe(true);
    });
  });

  describe('when emit sponso ad', () => {
    beforeEach(() => {
      wrapper.vm.isSponsoMyAddDialogOpen = false;
    });

    it(`should open sponso dialog`, async () => {
      const sponso = find(wrapper, CANDIDATE_LIST_SELECTOR);

      sponso.vm.$emit('sponsor-my-ad');
      await Vue.nextTick();
      expect(wrapper.vm.isSponsoMyAddDialogOpen).toBe(true);
    });
  });

  describe('when emit scrolled-to-bottom', () => {
    it(`should fetch next page of candidates`, () => {
      const listCandidate: Wrapper<Vue> = find(wrapper, CANDIDATE_LIST_SELECTOR);

      listCandidate.vm.$emit('scrolled-to-bottom');
      expect(wrapper.vm.$candidateSvc.fetchNextPage).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.$candidateSvc.fetchNextPage).toHaveBeenCalledWith(MISSION_CODE);
    });
  });

  describe('given events of the candidate video cv section', () => {
    describe('when emit next-candidate-selected', () => {
      it(`should update selected candidate id if next candidate`, async () => {
        wrapper.vm.selectedCandidateId = CANDIDATE_ID_0;
        const videoCvSection: Wrapper<Vue> = find(wrapper, CANDIDATE_VIDEO_CV_SECTION_SELECTOR);

        videoCvSection.vm.$emit('next-candidate-selected');

        expect(wrapper.vm.selectedCandidateId).toBe(CANDIDATE_ID_1);
      });

      it(`should call setCandidateAsSeen`, async () => {
        wrapper.vm.selectedCandidateId = CANDIDATE_ID_0;
        const videoCvSection: Wrapper<Vue> = find(wrapper, CANDIDATE_VIDEO_CV_SECTION_SELECTOR);

        videoCvSection.vm.$emit('next-candidate-selected');

        await Vue.nextTick();
        expect(wrapper.vm.$candidateSvc.setCandidateAsSeen).toHaveBeenCalledWith(MISSION_ID, CANDIDATE_ID_1);
      });

      it(`should do nothing if no next candidate`, () => {
        wrapper.vm.selectedCandidateId = CANDIDATE_ID_1;
        const videoCvSection: Wrapper<Vue> = find(wrapper, CANDIDATE_VIDEO_CV_SECTION_SELECTOR);

        videoCvSection.vm.$emit('next-candidate-selected');

        expect(wrapper.vm.selectedCandidateId).toBe(CANDIDATE_ID_1);
      });
    });

    describe('when emit previous-candidate-selected', () => {
      it(`should update selected candidate id if previous candidate`, async () => {
        wrapper.vm.selectedCandidateId = CANDIDATE_ID_1;
        const videoCvSection: Wrapper<Vue> = find(wrapper, CANDIDATE_VIDEO_CV_SECTION_SELECTOR);

        videoCvSection.vm.$emit('previous-candidate-selected');

        expect(wrapper.vm.selectedCandidateId).toBe(CANDIDATE_ID_0);
      });

      it(`should call setCandidateAsSeen`, async () => {
        wrapper.vm.selectedCandidateId = CANDIDATE_ID_1;
        const videoCvSection: Wrapper<Vue> = find(wrapper, CANDIDATE_VIDEO_CV_SECTION_SELECTOR);

        videoCvSection.vm.$emit('previous-candidate-selected');

        expect(wrapper.vm.$candidateSvc.setCandidateAsSeen).toHaveBeenCalledWith(MISSION_ID, CANDIDATE_ID_0);
      });

      it(`should do nothing if no previous candidate`, () => {
        wrapper.vm.selectedCandidateId = CANDIDATE_ID_0;
        const videoCvSection: Wrapper<Vue> = find(wrapper, CANDIDATE_VIDEO_CV_SECTION_SELECTOR);

        videoCvSection.vm.$emit('previous-candidate-selected');

        expect(wrapper.vm.selectedCandidateId).toBe(CANDIDATE_ID_0);
      });
    });
  });

  describe('when open candidate page', () => {
    it('boost dialog should be closed', () => {
      const boost: Wrapper<Vue> = find(wrapper, BOOST_AD_DIALOG);

      expect(boost.props('open')).toBe(false);
    });

    it('sponso dialog should be closed', () => {
      const sponso: Wrapper<Vue> = find(wrapper, SPONSO_AD_DIALOG);

      expect(sponso.props('open')).toBe(false);
    });
  });

  describe('when cross/or out-side of boost card dialog clicked', () => {
    beforeEach(() => {
      wrapper.vm.isBoostMyAddDialogOpen = true;
    });
    it('should close the dialog', () => {
      const boost: Wrapper<Vue> = find(wrapper, BOOST_AD_DIALOG);

      boost.vm.$emit('update:open', false);
      expect(wrapper.vm.isBoostMyAddDialogOpen).toEqual(false);
    });
  });

  describe('when cross/or out-side of sponsor card dialog clicked', () => {
    beforeEach(() => {
      wrapper.vm.isSponsoMyAddDialogOpen = true;
    });

    it('should close the dialog', () => {
      const sponso: Wrapper<Vue> = find(wrapper, SPONSO_AD_DIALOG);

      sponso.vm.$emit('update:open', false);
      expect(wrapper.vm.isSponsoMyAddDialogOpen).toEqual(false);
    });
  });
});
