import debounce from 'lodash/debounce';
import range from 'lodash/range';
import { Component, Prop, Ref, Vue, Watch } from 'vue-property-decorator';
import WithRender from './timebar.html?style=./timebar.scss';

export interface DisplayableTimebar {
  style: { [k: string]: string };
}

export enum EmittedEvents {
  TIME_SELECTED = 'time-selected',
}

export interface TimebarProps {
  currentTime: number;
  currentTimebarIdx: number;
  duration: number;
  timebarCount: number;
}

@WithRender
@Component
export default class Timebar extends Vue implements TimebarProps {
  @Prop({ type: Number, default: 0 })
  readonly currentTime: number;

  @Prop({ type: Number, default: -1 })
  readonly currentTimebarIdx: number;

  @Prop({ type: Number, default: 0 })
  readonly duration: number;

  @Prop({ type: Number, default: 0 })
  readonly timebarCount: number;

  @Ref('bar') readonly barRef: HTMLDivElement;

  barWidth: number = 0;

  get displayableTimebars(): DisplayableTimebar[] {
    return range(this.timebarCount).map((idx: number) => {
      if (idx < this.currentTimebarIdx) {
        return this.buildFullBar();
      } else if (idx === this.currentTimebarIdx) {
        return this.buildCurrentBar();
      } else {
        return this.buildEmptyBar();
      }
    });
  }

  get debouncedUpdateBarWidth(): ReturnType<typeof debounce> {
    return debounce(this.updateBarWidth, 100);
  }

  get toWatchToUpdateBarWidth(): { [k: string]: number } {
    return {
      currentTimebarIdx: this.currentTimebarIdx,
      timebarCount: this.timebarCount,
    };
  }

  mounted(): void {
    window.addEventListener('resize', this.debouncedUpdateBarWidth);
    this.updateBarWidth();
  }

  beforeDestroy(): void {
    window.removeEventListener('resize', this.debouncedUpdateBarWidth);
  }

  buildEmptyBar(): DisplayableTimebar {
    return {
      style: this.buildProgessStyle(0),
    };
  }

  buildCurrentBar(): DisplayableTimebar {
    // -1 in the divider is useful to have the progress reach 100% when the video ends
    const width: number = Math.floor((this.currentTime / (this.duration - 1)) * this.barWidth);

    return {
      style: this.buildProgessStyle(width),
    };
  }

  buildFullBar(): DisplayableTimebar {
    return {
      // +1 to have the progress reach 100%
      style: this.buildProgessStyle(this.barWidth + 1),
    };
  }

  buildProgessStyle(width: number): { [k: string]: string } {
    return {
      '--width': `${width}px`,
    };
  }

  updateVideoTime(event: MouseEvent, timebarIdx: number): void {
    const timebarStartX: number = this.barRef[timebarIdx].getBoundingClientRect().x;
    const mouseX: number = event.clientX;

    const playTimePercentage: number = (mouseX - timebarStartX) / this.barWidth;

    this.$emit(EmittedEvents.TIME_SELECTED, timebarIdx, playTimePercentage);
  }

  @Watch('toWatchToUpdateBarWidth', { immediate: true })
  async updateBarWidth(): Promise<void> {
    // Wait for the dom to display the right count of bars before getting bar width
    await this.$nextTick();
    this.barWidth = this.barRef?.[0].clientWidth || 0;
  }
}
