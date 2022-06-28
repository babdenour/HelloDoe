import { find, getDefaultMocks, Mocks } from '@/utils/test';
import Video, { EmittedEvents, VideoProps } from '@components/video/video';
import { shallowMount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';

const VIDEO_PLAYER_SELECTOR: string = 'video-player';

let wrapper: Wrapper<Video>;

let mocks: Mocks;
const CURRENT_TIME: number = 1000;
const DURATION: number = 10000;

const createWrapper = () => {
  const propsData: VideoProps = {
    src: 'src',
    play: false,
    width: '100%',
    height: 'auto',
    playTimePercentage: 0,
  };
  mocks = getDefaultMocks();

  wrapper = shallowMount(Video, {
    mocks,
    propsData,
    computed: {
      videoPlayerRef: () => ({
        currentTime: CURRENT_TIME,
        duration: DURATION,
        pause: jest.fn(),
      }),
    },
  });
};

describe('Video', () => {
  beforeEach(() => {
    createWrapper();
  });

  describe('given events of video player', () => {
    describe('when time update', () => {
      it(`should emit ${EmittedEvents.TIME_UPDATED} with right params`, async () => {
        const videoPlayer: Wrapper<Vue> = find(wrapper, VIDEO_PLAYER_SELECTOR);

        videoPlayer.trigger('timeupdate');

        await Vue.nextTick();

        expect(wrapper.emitted()[EmittedEvents.TIME_UPDATED]).toBeTruthy();
        expect(wrapper.emitted()[EmittedEvents.TIME_UPDATED][0][0]).toBe(CURRENT_TIME);
      });
    });

    describe('when ended', () => {
      it(`should emit ${EmittedEvents.VIDEO_ENDED}`, async () => {
        const videoPlayer: Wrapper<Vue> = find(wrapper, VIDEO_PLAYER_SELECTOR);

        videoPlayer.trigger('ended');

        await Vue.nextTick();

        expect(wrapper.emitted()[EmittedEvents.VIDEO_ENDED]).toBeTruthy();
      });
    });

    describe('when metadata loaded', () => {
      it(`should emit ${EmittedEvents.DURATION_UPDATED}`, async () => {
        const videoPlayer: Wrapper<Vue> = find(wrapper, VIDEO_PLAYER_SELECTOR);

        videoPlayer.trigger('loadedmetadata');

        await Vue.nextTick();

        expect(wrapper.emitted()[EmittedEvents.DURATION_UPDATED]).toBeTruthy();
        expect(wrapper.emitted()[EmittedEvents.DURATION_UPDATED][0][0]).toBe(DURATION);
      });
    });
  });
});
