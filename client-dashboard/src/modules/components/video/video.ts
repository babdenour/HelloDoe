import { Component, Emit, Prop, Ref, Vue, Watch } from 'vue-property-decorator';
import WithRender from './video.html?style=./video.scss';

export enum EmittedEvents {
  DURATION_UPDATED = 'duration-updated',
  TIME_UPDATED = 'time-updated',
  VIDEO_ENDED = 'video-ended',
}

type UpdateCurrentTimeWatchedData = Pick<VideoProps, 'playTimePercentage' | 'src'>;

export interface VideoProps {
  src: string;
  play: boolean;
  width: string;
  height: string;
  playTimePercentage: number;
}

@WithRender
@Component
export default class Video extends Vue implements VideoProps {
  @Prop({ required: true })
  readonly src: string;

  @Prop({ default: false })
  readonly play: boolean;

  @Prop({ type: String, default: '100%' })
  readonly width: string;

  @Prop({ type: String, default: 'auto' })
  readonly height: string;

  @Prop({ type: Number, default: 0 })
  readonly playTimePercentage: number;

  @Ref('host') readonly hostRef: HTMLDivElement;
  @Ref('source') readonly sourceRef: HTMLSourceElement;
  @Ref('video-player') readonly videoPlayerRef: HTMLVideoElement;

  videoDuration: number = 0;
  currentTime: number = 0;
  shouldSetCurrentTimeOnMetadataLoaded: boolean = false;

  get currentTimeRounded(): number {
    return Math.floor(this.currentTime);
  }

  get videoContainerCssVars(): { [k: string]: string } {
    return {
      '--height': this.height,
      '--width': this.width,
    };
  }

  get toWatchToUpdateCurrentTime(): UpdateCurrentTimeWatchedData {
    return {
      src: this.src,
      playTimePercentage: this.playTimePercentage,
    };
  }

  mounted(): void {
    this.onPlayUpdated();
  }

  syncCurrentTime(): void {
    this.currentTime = this.videoPlayerRef.currentTime;
  }

  initializeVideo(): void {
    this.videoDuration = Math.round(this.videoPlayerRef.duration);

    if (this.shouldSetCurrentTimeOnMetadataLoaded) {
      this.setVideoCurrentTimeFromPlayTimePercentage(this.playTimePercentage, this.videoDuration);
      this.shouldSetCurrentTimeOnMetadataLoaded = false;
    }
  }

  @Emit(EmittedEvents.VIDEO_ENDED)
  emitVideoEnded(): void {}

  @Watch('currentTime')
  onCurrentTimeUpdated(): void {
    this.$emit(EmittedEvents.TIME_UPDATED, this.currentTimeRounded);
  }

  @Watch('videoDuration')
  onVideoDurationUpdated(): void {
    this.$emit(EmittedEvents.DURATION_UPDATED, this.videoDuration);
  }

  @Watch('play')
  onPlayUpdated(): void {
    if (this.play) {
      this.videoPlayerRef.play();
    } else {
      this.videoPlayerRef.pause();
    }
  }

  @Watch('src')
  onSrcUpdated(): void {
    this.videoPlayerRef.pause();
    this.sourceRef.setAttribute('src', this.src);
    this.videoPlayerRef.load();

    if (this.play) {
      this.videoPlayerRef.play();
    }
  }

  @Watch('toWatchToUpdateCurrentTime')
  updateCurrentTime(newData: UpdateCurrentTimeWatchedData, oldData: UpdateCurrentTimeWatchedData): void {
    if (newData.src === oldData.src) {
      this.setVideoCurrentTimeFromPlayTimePercentage(newData.playTimePercentage, this.videoDuration);
    } else if (newData.src !== oldData.src && newData.playTimePercentage !== oldData.playTimePercentage) {
      this.shouldSetCurrentTimeOnMetadataLoaded = true;
    }
  }

  setVideoCurrentTimeFromPlayTimePercentage(duration: number, playTimePercentage: number): void {
    const currentTime: number = playTimePercentage * duration;
    this.videoPlayerRef.currentTime = currentTime;
    this.currentTime = currentTime;
  }
}
