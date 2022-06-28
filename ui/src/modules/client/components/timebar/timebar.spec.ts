import { find, findAll, getDefaultMocks, Mocks } from '@/utils/test';
import Timebar, { DisplayableTimebar, EmittedEvents, TimebarProps } from '@client/components/timebar/timebar';
import { shallowMount, Wrapper, WrapperArray } from '@vue/test-utils';

const BAR_SELECTOR: string = 'bar';
const PROGRESS_SELECTOR: string = 'progress';

let wrapper: Wrapper<Timebar>;

let mocks: Mocks;
const CURRENT_TIME: number = 50;
const CURRENT_TIMEBAR_IDX: number = 1;
const DURATION: number = 100;
const TIMEBAR_COUNT: number = 3;

const BAR_POS_X_START: number = 200;
const BAR_WIDTH: number = 100;

const createWrapper = () => {
  const propsData: TimebarProps = {
    currentTime: CURRENT_TIME,
    currentTimebarIdx: CURRENT_TIMEBAR_IDX,
    duration: DURATION,
    timebarCount: TIMEBAR_COUNT,
  };
  mocks = getDefaultMocks();

  wrapper = shallowMount(Timebar, {
    mocks,
    propsData,
    computed: {
      barRef: () => [
        {
          clientWidth: BAR_WIDTH,
          getBoundingClientRect: () => ({
            x: BAR_POS_X_START,
          }),
        },
      ],
    },
  });
};

describe('Timebar', () => {
  beforeEach(() => {
    createWrapper();
  });

  describe('when display progress', () => {
    it('should display right count', () => {
      const progressBars: WrapperArray<Vue> = findAll(wrapper, PROGRESS_SELECTOR);

      expect(progressBars.length).toBe(TIMEBAR_COUNT);
    });

    it('should display current progress bar correctly', () => {
      const bar: DisplayableTimebar = wrapper.vm.displayableTimebars[CURRENT_TIMEBAR_IDX];

      expect(bar.style['--width']).toBe('50px');
    });

    it('should display progress bar before current progress bar correctly', () => {
      const bar: DisplayableTimebar = wrapper.vm.displayableTimebars[CURRENT_TIMEBAR_IDX - 1];

      expect(bar.style['--width']).toBe('101px');
    });

    it('should display progress bar after current progress bar correctly', () => {
      const bar: DisplayableTimebar = wrapper.vm.displayableTimebars[CURRENT_TIMEBAR_IDX + 1];

      expect(bar.style['--width']).toBe('0px');
    });
  });

  describe('given bar event', () => {
    describe('when clicked', () => {
      const TIMEBAR_IDX_EMITTED: number = 0;
      const PLAY_TIME_PERCENTAGE_EMITTED: number = 0.75;

      it(`should emit event ${EmittedEvents.TIME_SELECTED}`, () => {
        const bar: Wrapper<Vue> = find(wrapper, BAR_SELECTOR);

        bar.trigger('click', {
          clientX: 275,
        });

        expect(wrapper.emitted()[EmittedEvents.TIME_SELECTED]).toBeTruthy();
        expect(wrapper.emitted()[EmittedEvents.TIME_SELECTED][0][0]).toBe(TIMEBAR_IDX_EMITTED);
        expect(wrapper.emitted()[EmittedEvents.TIME_SELECTED][0][1]).toBe(PLAY_TIME_PERCENTAGE_EMITTED);
      });
    });
  });
});
