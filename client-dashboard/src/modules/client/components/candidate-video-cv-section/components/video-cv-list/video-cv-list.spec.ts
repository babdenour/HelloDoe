import { find, findAll, getDefaultMocks, Mocks } from '@/utils/test';
import VideoCvList, { EmittedEvents, VideoCvListProps } from '@client/components/candidate-video-cv-section/components/video-cv-list/video-cv-list';
import { CandidateVideoCv } from '@domains/candidate';
import { CandidateFactory } from '@factories/candidate.factory';
import { shallowMount, Wrapper } from '@vue/test-utils';

const THUMBNAIL_SELECTOR = 'thumbnail';

let wrapper: Wrapper<VideoCvList>;

let mocks: Mocks;
let mockedSelectedCvId: string;
let mockedVideoCvList: CandidateVideoCv[];

const createWrapper = () => {
  const propsData: VideoCvListProps = {
    selectedCvId: mockedSelectedCvId,
    videoCvList: mockedVideoCvList,
  };
  mocks = getDefaultMocks();

  wrapper = shallowMount(VideoCvList, {
    mocks,
    propsData,
    computed: {
      hostRef: () => ({
        clientHeight: 100,
      }),
    },
  });
};

const mockVideoCvList = (): CandidateVideoCv[] => {
  return [
    CandidateFactory.createVideoCv({
      id: '1',
      imgUrl: 'imgUrl-1',
    }),
    CandidateFactory.createVideoCv({
      id: '2',
      imgUrl: 'imgUrl-2',
    }),
  ];
};

describe('VideoCvList', () => {
  beforeEach(() => {
    mockedVideoCvList = mockVideoCvList();
    mockedSelectedCvId = mockedVideoCvList[0].id;
    createWrapper();
  });

  describe('when display thumbnail', () => {
    it('should display right number', () => {
      const thumbnails = findAll(wrapper, THUMBNAIL_SELECTOR);

      expect(thumbnails.length).toBe(mockedVideoCvList.length);
    });

    it('should pass on right props', () => {
      const thumbnails = findAll(wrapper, THUMBNAIL_SELECTOR);

      expect(thumbnails.at(0).props().src).toBe('imgUrl-1');
      expect(thumbnails.at(0).props().aspectRatio).toBe(wrapper.vm.aspectRatio);
      expect(thumbnails.at(0).props().height).toBe(wrapper.vm.thumbnailHeight);
      expect(thumbnails.at(1).props().src).toBe('imgUrl-2');
      expect(thumbnails.at(1).props().aspectRatio).toBe(wrapper.vm.aspectRatio);
      expect(thumbnails.at(1).props().height).toBe(wrapper.vm.thumbnailHeight);
    });

    it('should has selected modifier only when selected', () => {
      const thumbnails = findAll(wrapper, THUMBNAIL_SELECTOR);

      expect(thumbnails.at(0).classes('video-cv-list__thumbnail--selected')).toBeTruthy();
      expect(thumbnails.at(1).classes('video-cv-list__thumbnail--selected')).toBeFalsy();
    });
  });

  describe('given events of the thumbnail', () => {
    describe('when clicked', () => {
      it(`should emit ${EmittedEvents.CV_SELECTED} with right params`, () => {
        const button = find(wrapper, THUMBNAIL_SELECTOR);

        button.trigger('click');

        expect(wrapper.emitted()[EmittedEvents.CV_SELECTED][0][0]).toBe('1');
      });
    });
  });
});
