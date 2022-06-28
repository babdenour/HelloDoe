import { find, getDefaultMocks, Mocks } from '@/utils/test';
import CandidateVideoCvSection, { CandidateVideoCvSectionProps, EmittedEvents } from '@client/components/candidate-video-cv-section/candidate-video-cv-section';
import { Candidate, CandidateStatus } from '@domains/candidate';
import { CandidateFactory } from '@factories/candidate.factory';
import { shallowMount, Wrapper } from '@vue/test-utils';

const INFO_AGE_SELECTOR: string = 'info-age';
const INFO_APPLIED_AT_SELECTOR: string = 'info-applied-at';
const INFO_FIRST_NAME_SELECTOR: string = 'info-first-name';
const INFO_SCORE_SELECTOR: string = 'info-score';
const INFO_TITLE_SCORE_SELECTOR: string = 'info-score-title';
const NEXT_CANDIDATE_BUTTON_SELECTOR: string = 'next-candidate-button';
const PREVIOUS_CANDIDATE_BUTTON_SELECTOR: string = 'previous-candidate-button';
const QUESTION_ASKED_SELECTOR: string = 'question-asked';
const QUESTION_LABEL_SELECTOR: string = 'question-label';
const TIMEBAR_SELECTOR: string = 'timebar';
const THUMBNAIL_SELECTOR: string = 'thumbnail';
const VIDEO_CV_LIST_SELECTOR: string = 'video-cv-list';
const VIDEO_SELECTOR: string = 'video';
const VIDEO_CONTROLLER_SELECTOR: string = 'video-controller';
const HEART_BUTTON_QUICK_ACTION: string = 'heart-button-quick-action';

let wrapper: Wrapper<CandidateVideoCvSection>;

let mocks: Mocks;
let mockedCandidate: Candidate;

const APPLIED_AT: number = 1000;
const FIRST_NAME: string = 'Esperanza';
const SCORE: number = 9;

const VIDEO_CV_ID_0: string = '1';
const VIDEO_URL_0: string = 'video-url-1';
const VIDEO_CV_ID_1: string = '2';
const VIDEO_URL_1: string = 'video-url-2';

const CANDIDATE_ID: string = '1';
let mockCandidateStatus: CandidateStatus = CandidateStatus.PRESELECTED;

const createWrapper = () => {
  mockedCandidate = mockCandidate();

  const propsData: CandidateVideoCvSectionProps = {
    candidate: mockedCandidate,
  };
  mocks = getDefaultMocks();

  wrapper = shallowMount(CandidateVideoCvSection, {
    mocks,
    propsData,
    computed: {
      contentRef: () => ({}),
    },
  });
};

const mockCandidate = (): Candidate => {
  return CandidateFactory.create({
    id: CANDIDATE_ID,
    firstName: FIRST_NAME,
    score: SCORE,
    appliedAt: APPLIED_AT,
    status: mockCandidateStatus,
    videoCvs: [
      CandidateFactory.createVideoCv({
        id: VIDEO_CV_ID_0,
        question: 'question-1',
        videoUrl: VIDEO_URL_0,
      }),
      CandidateFactory.createVideoCv({
        id: VIDEO_CV_ID_1,
        question: 'question-2',
        videoUrl: VIDEO_URL_1,
      }),
    ],
  });
};

describe('CandidateVideoCvSection', () => {
  beforeEach(() => {
    createWrapper();
  });

  describe('when translate', () => {
    it('should translate info age', () => {
      const info: Wrapper<Vue> = find(wrapper, INFO_AGE_SELECTOR);

      expect(info.text()).toContain('pages.client.candidates-page.candidate-age');
    });

    it('should translate info title score', () => {
      const info: Wrapper<Vue> = find(wrapper, INFO_TITLE_SCORE_SELECTOR);

      expect(info.text()).toContain('pages.client.candidates-page.candidate-score');
    });

    it('should translate info applied at', () => {
      const info: Wrapper<Vue> = find(wrapper, INFO_APPLIED_AT_SELECTOR);

      expect(info.text()).toContain('pages.client.candidates-page.candidate-applied-at');
    });

    it('should translate next candidate button', () => {
      const button: Wrapper<Vue> = find(wrapper, NEXT_CANDIDATE_BUTTON_SELECTOR);

      expect(button.text()).toContain('actions.next-candidate');
    });

    it('should translate previous candidate button', () => {
      const button: Wrapper<Vue> = find(wrapper, PREVIOUS_CANDIDATE_BUTTON_SELECTOR);

      expect(button.text()).toContain('actions.previous-candidate');
    });

    it('should translate question asked', () => {
      const question: Wrapper<Vue> = find(wrapper, QUESTION_ASKED_SELECTOR);

      expect(question.text()).toContain('pages.client.candidates-page.question-asked');
    });

    it('should translate question label', () => {
      const label: Wrapper<Vue> = find(wrapper, QUESTION_LABEL_SELECTOR);

      expect(label.text()).toContain('pages.client.candidates-page.question-label');
    });
  });

  describe('when display candidate info', () => {
    it('should display first name', () => {
      const info: Wrapper<Vue> = find(wrapper, INFO_FIRST_NAME_SELECTOR);

      expect(info.text()).toBe(FIRST_NAME);
    });

    it('should display score', () => {
      const info: Wrapper<Vue> = find(wrapper, INFO_SCORE_SELECTOR);

      expect(info.text()).toContain(SCORE * 10);
    });
  });

  describe('when initialise video', () => {
    it('should pass on right props', () => {
      const video: Wrapper<Vue> = find(wrapper, VIDEO_SELECTOR);

      expect(video.props().src).toEqual(VIDEO_URL_0);
      expect(video.props().play).toEqual(false);
      expect(video.props().playTimePercentage).toEqual(0);
    });
  });

  describe('when initialise timebar', () => {
    it('should pass on right props', () => {
      const timebar: Wrapper<Vue> = find(wrapper, TIMEBAR_SELECTOR);

      expect(timebar.props().currentTime).toEqual(0);
      expect(timebar.props().currentTimebarIdx).toEqual(0);
      expect(timebar.props().duration).toEqual(0);
      expect(timebar.props().timebarCount).toEqual(2);
    });
  });

  describe('when initialise video cv list', () => {
    it('should pass on right props', () => {
      const videoCvList: Wrapper<Vue> = find(wrapper, VIDEO_CV_LIST_SELECTOR);

      expect(videoCvList.props().videoCvList).toEqual(wrapper.vm.videoCvList);
      expect(videoCvList.props().selectedCvId).toEqual(wrapper.vm.selectedCvId);
    });
  });

  describe('when video playing', () => {
    beforeEach(() => {
      wrapper.vm.videoPlaying = true;
    });

    it('should display video', () => {
      const video: Wrapper<Vue> = find(wrapper, VIDEO_SELECTOR);

      expect(video.element).toBeVisible();
    });

    it('should hide thumbnail', () => {
      const thumbnail: Wrapper<Vue> = find(wrapper, THUMBNAIL_SELECTOR);

      expect(thumbnail.exists()).toBe(false);
    });
  });

  describe('when video paused', () => {
    beforeEach(() => {
      wrapper.vm.videoPlaying = false;
    });

    it('should hide video', () => {
      const video: Wrapper<Vue> = find(wrapper, VIDEO_SELECTOR);

      expect(video.element).not.toBeVisible();
    });

    it('should display thumbnail', () => {
      const thumbnail: Wrapper<Vue> = find(wrapper, THUMBNAIL_SELECTOR);

      expect(thumbnail.exists()).toBe(true);
    });
  });

  describe('when update props candidate', () => {
    const NEW_CANDIDATE: Candidate = CandidateFactory.create({
      videoCvs: [
        CandidateFactory.createVideoCv({
          id: 'new-1',
        }),
        CandidateFactory.createVideoCv({
          id: 'new-2',
        }),
      ],
    });

    it('should reset selected cv id', async () => {
      wrapper.vm.selectedCvId = '1';

      await wrapper.setProps({
        candidate: NEW_CANDIDATE,
      });

      expect(wrapper.vm.selectedCvId).toBe('new-1');
    });

    it('should pause video', async () => {
      wrapper.vm.videoPlaying = true;

      await wrapper.setProps({
        candidate: NEW_CANDIDATE,
      });

      expect(wrapper.vm.videoPlaying).toBe(false);
    });
  });

  describe('given events of video', () => {
    describe('when time-updated', () => {
      const VIDEO_TIME: number = 1000;

      it(`should update video time`, () => {
        const video: Wrapper<Vue> = find(wrapper, VIDEO_SELECTOR);

        video.vm.$emit('time-updated', VIDEO_TIME);

        expect(wrapper.vm.videoCurrentTime).toBe(VIDEO_TIME);
      });
    });

    describe('when video-ended', () => {
      it(`should select next video cv`, () => {
        wrapper.vm.selectedCvId = VIDEO_CV_ID_0;
        const video: Wrapper<Vue> = find(wrapper, VIDEO_SELECTOR);

        video.vm.$emit('video-ended');

        expect(wrapper.vm.selectedCvId).toBe(VIDEO_CV_ID_1);
      });

      it(`should not select next video cv if no next`, () => {
        wrapper.vm.selectedCvId = VIDEO_CV_ID_1;
        const video: Wrapper<Vue> = find(wrapper, VIDEO_SELECTOR);

        video.vm.$emit('video-ended');

        expect(wrapper.vm.selectedCvId).toBe(VIDEO_CV_ID_1);
      });

      it(`should stop video if no next video cv`, () => {
        wrapper.vm.selectedCvId = VIDEO_CV_ID_1;
        const video: Wrapper<Vue> = find(wrapper, VIDEO_SELECTOR);

        video.vm.$emit('video-ended');

        expect(wrapper.vm.videoPlaying).toBe(false);
      });
    });

    describe('when duration-updated', () => {
      const VIDEO_DURATION: number = 1000;

      it(`should update video duration`, () => {
        const video: Wrapper<Vue> = find(wrapper, VIDEO_SELECTOR);

        video.vm.$emit('duration-updated', VIDEO_DURATION);

        expect(wrapper.vm.videoDuration).toBe(VIDEO_DURATION);
      });
    });
  });

  describe('given events of video controller', () => {
    describe('when clicked', () => {
      beforeEach(() => {
        wrapper.vm.videoPlaying = false;
      });

      it(`should toggle video playing`, () => {
        const videoController: Wrapper<Vue> = find(wrapper, VIDEO_CONTROLLER_SELECTOR);

        videoController.trigger('click');

        expect(wrapper.vm.videoPlaying).toBe(true);

        videoController.trigger('click');

        expect(wrapper.vm.videoPlaying).toBe(false);
      });
    });
  });

  describe('given events of timebar', () => {
    describe('when time-selected', () => {
      const SELECTED_CV_IDX: number = 1;
      const PLAY_TIME_PERCENTAGE: number = 0.75;

      beforeEach(() => {
        wrapper.vm.videoPlaying = false;
      });

      it(`should update selected cv id`, () => {
        const timebar: Wrapper<Vue> = find(wrapper, TIMEBAR_SELECTOR);

        timebar.vm.$emit('time-selected', SELECTED_CV_IDX, PLAY_TIME_PERCENTAGE);

        expect(wrapper.vm.selectedCvId).toBe(VIDEO_CV_ID_1);
      });

      it(`should update video play time percentage`, () => {
        const timebar: Wrapper<Vue> = find(wrapper, TIMEBAR_SELECTOR);

        timebar.vm.$emit('time-selected', SELECTED_CV_IDX, PLAY_TIME_PERCENTAGE);

        expect(wrapper.vm.videoPlayTimePercentage).toBe(PLAY_TIME_PERCENTAGE);
      });
    });
  });

  describe('given events of video cv list', () => {
    describe('when cv selected', () => {
      const CV_ID: string = 'cv-id';

      it(`should select cv`, () => {
        const videoCvList: Wrapper<Vue> = find(wrapper, VIDEO_CV_LIST_SELECTOR);

        videoCvList.vm.$emit('cv-selected', CV_ID);

        expect(wrapper.vm.selectedCvId).toBe(CV_ID);
      });
    });
  });

  describe('given events of the heart button quick action', () => {
    describe('when clicked and candidate not in favorite', () => {
      it(`should emit ${EmittedEvents.SET_CANDIDATE_FAVORITE}`, () => {
        const heartButton: Wrapper<Vue> = find(wrapper, HEART_BUTTON_QUICK_ACTION);

        heartButton.trigger('click');

        expect(wrapper.emitted()[EmittedEvents.SET_CANDIDATE_FAVORITE]).toBeTruthy();
        expect(wrapper.emitted()[EmittedEvents.SET_CANDIDATE_FAVORITE][0][0]).toBe(CANDIDATE_ID);
        expect(wrapper.emitted()[EmittedEvents.SET_CANDIDATE_FAVORITE][0][1]).toBe(true);
      });
    });
  });

  describe('given events of the heart button quick action', () => {
    beforeEach(() => {
      mockCandidateStatus = CandidateStatus.FAVORITE;
      createWrapper();
    });
    describe('when clicked and candidate in favorite', () => {
      it(`should emit ${EmittedEvents.SET_CANDIDATE_FAVORITE}`, () => {
        const heartButton: Wrapper<Vue> = find(wrapper, HEART_BUTTON_QUICK_ACTION);

        heartButton.trigger('click');

        expect(wrapper.emitted()[EmittedEvents.SET_CANDIDATE_FAVORITE]).toBeTruthy();
        expect(wrapper.emitted()[EmittedEvents.SET_CANDIDATE_FAVORITE][0][0]).toBe(CANDIDATE_ID);
        expect(wrapper.emitted()[EmittedEvents.SET_CANDIDATE_FAVORITE][0][1]).toBe(false);
      });
    });
  });

  describe('given events of the next candidate button', () => {
    describe('when clicked', () => {
      it(`should emit ${EmittedEvents.NEXT_CANDIDATE_SELECTED}`, () => {
        const button: Wrapper<Vue> = find(wrapper, NEXT_CANDIDATE_BUTTON_SELECTOR);

        button.trigger('click');

        expect(wrapper.emitted()[EmittedEvents.NEXT_CANDIDATE_SELECTED]).toBeTruthy();
      });
    });
  });

  describe('given events of the previous candidate button', () => {
    describe('when clicked', () => {
      it(`should emit ${EmittedEvents.PREVIOUS_CANDIDATE_SELECTED}`, () => {
        const button: Wrapper<Vue> = find(wrapper, PREVIOUS_CANDIDATE_BUTTON_SELECTOR);

        button.trigger('click');

        expect(wrapper.emitted()[EmittedEvents.PREVIOUS_CANDIDATE_SELECTED]).toBeTruthy();
      });
    });
  });
});
