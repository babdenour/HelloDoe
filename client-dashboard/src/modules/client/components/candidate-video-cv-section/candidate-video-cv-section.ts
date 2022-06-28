import VideoCvList from '@client/components/candidate-video-cv-section/components/video-cv-list/video-cv-list';
import HeartButton from '@client/components/heart-button/heart-button';
import PlayButton from '@client/components/player-controller-button/play-button';
import Timebar from '@client/components/timebar/timebar';
import Video from '@components/video/video';
import { Candidate, CandidateStatus, CandidateVideoCv } from '@domains/candidate';
import { CandidateFactory } from '@factories/candidate.factory';
import { COMPONENTS_NAMES } from '@modules/components-names';
import debounce from 'lodash/debounce';
import floor from 'lodash/floor';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Ref, Watch } from 'vue-property-decorator';
import WithRender from './candidate-video-cv-section.html?style=./candidate-video-cv-section.scss';

export enum EmittedEvents {
  NEXT_CANDIDATE_SELECTED = 'next-candidate-selected',
  PREVIOUS_CANDIDATE_SELECTED = 'previous-candidate-selected',
  SET_CANDIDATE_FAVORITE = 'set-candidate-favorite',
}

export interface CandidateVideoCvSectionProps {
  candidate: Candidate;
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.TIMEBAR]: Timebar,
    [COMPONENTS_NAMES.VIDEO]: Video,
    [COMPONENTS_NAMES.HEART_BUTTON]: HeartButton,
    [COMPONENTS_NAMES.PLAY_BUTTON]: PlayButton,
    'hd-video-cv-list': VideoCvList,
  },
})
export default class CandidateVideoCvSection extends Vue implements CandidateVideoCvSectionProps {
  @Prop({ default: () => CandidateFactory.create() })
  readonly candidate: Candidate;

  readonly VIDEO_ASPECT_RATIO: number = 9 / 16;

  @Ref('content')
  readonly contentRef: HTMLDivElement;

  contentHeight: number = 0;
  selectedCvId: string = '';
  videoPlaying: boolean = false;
  videoDuration: number = 0;
  videoCurrentTime: number = 0;
  videoPlayTimePercentage: number = 0;

  get i18n(): { [k: string]: string } {
    const appliedAtI18n: string = this.$i18nSvc.translateDate(this.candidate.appliedAt);

    return {
      candidateAge: this.$i18nSvc.t('pages.client.candidates-page.candidate-age', { age: this.candidateAge }),
      candidateAppliedAt: this.$i18nSvc.t('pages.client.candidates-page.candidate-applied-at', { appliedAt: appliedAtI18n }),
      candidateScore: this.$i18nSvc.t('pages.client.candidates-page.candidate-score'),
      nextCandidate: this.$i18nSvc.t('actions.next-candidate'),
      previousCandidate: this.$i18nSvc.t('actions.previous-candidate'),
      questionAsked: this.$i18nSvc.t('pages.client.candidates-page.question-asked', { question: this.questionAsked }),
      questionLabel: this.$i18nSvc.t('pages.client.candidates-page.question-label', { number: this.questionNumber }),
    };
  }

  get backgroundSrc(): string {
    return this.selectedVideoCvPart.imgUrl;
  }

  get backgroundStyle(): { [k: string]: string } {
    return {
      backgroundImage: `url('${this.backgroundSrc}')`,
    };
  }

  get thumbnailStyle(): { [k: string]: string } {
    return {
      '--width': this.videoCvWidthStr,
      '--height': this.videoCvHeightStr,
      backgroundImage: `url('${this.backgroundSrc}')`,
    };
  }

  get videoCvWidthStr(): string {
    const width: number = Math.floor(this.contentHeight * this.VIDEO_ASPECT_RATIO);

    return `${width}px`;
  }

  get videoCvHeightStr(): string {
    return `${this.contentHeight}px`;
  }

  get debouncedUpdateContentHeight(): ReturnType<typeof debounce> {
    return debounce(this.updateContentHeight, 100);
  }

  get candidateFirstName(): string {
    return this.candidate.firstName;
  }

  get candidateAge(): number {
    return this.candidate.age;
  }

  get candidateScore(): number {
    return floor(this.candidate.score) * 10;
  }

  get candidatePhone(): string {
    return this.candidate.contactInformation.phone;
  }

  get candidateEmail(): string {
    return this.candidate.contactInformation.email;
  }

  get isCandidateUnlocked(): boolean {
    return this.candidate.status === CandidateStatus.UNLOCKED;
  }

  get selectedVideoCvPart(): CandidateVideoCv {
    return this.candidate.videoCvs.find((cv: CandidateVideoCv) => cv.id === this.selectedCvId) || CandidateFactory.createVideoCv();
  }

  get videoCvList(): CandidateVideoCv[] {
    return this.candidate.videoCvs;
  }

  get videoCvUrl(): string {
    return this.selectedVideoCvPart.videoUrl;
  }

  get videoCvIdx(): number {
    return this.candidate.videoCvs.findIndex((cv: CandidateVideoCv) => cv.id === this.selectedCvId);
  }

  get shouldDisplayVideoPlayer(): boolean {
    return this.videoPlaying || (!this.videoPlaying && this.videoCurrentTime > 0);
  }

  get questionNumber(): number {
    return this.videoCvIdx + 1;
  }

  get questionAsked(): string {
    return this.selectedVideoCvPart.question;
  }

  get isForcedFill(): boolean {
    return this.candidate.isFavorite;
  }

  get shouldDisplayHeartButton(): boolean {
    return !this.isCandidateUnlocked;
  }

  mounted(): void {
    window.addEventListener('resize', this.debouncedUpdateContentHeight);
    this.updateContentHeight();
  }

  beforeDestroy(): void {
    window.removeEventListener('resize', this.debouncedUpdateContentHeight);
  }

  selectCv(cvId: string): void {
    this.selectedCvId = cvId;
  }

  playNextVideoCv(): void {
    const nextCvIdx: number = this.videoCvIdx + 1;
    const hasNextCv: boolean = nextCvIdx < this.videoCvList.length;

    if (hasNextCv) {
      this.selectedCvId = this.videoCvList[nextCvIdx].id;
    } else {
      this.videoPlaying = false;
    }
  }

  toggleVideoPlaying(): void {
    this.videoPlaying = !this.videoPlaying;
  }

  updateVideoDuration(videoDuration: number): void {
    this.videoDuration = videoDuration;
  }

  updateVideoCurrentTime(videoCurrentTime: number): void {
    this.videoCurrentTime = videoCurrentTime;
  }

  updateVideoPlayed(selectedCvIdx: number, playTimePercentage: number): void {
    this.selectedCvId = this.videoCvList[selectedCvIdx].id;
    this.videoPlayTimePercentage = playTimePercentage;
  }

  @Emit(EmittedEvents.NEXT_CANDIDATE_SELECTED)
  selectNextCandidate(): void {}

  @Emit(EmittedEvents.PREVIOUS_CANDIDATE_SELECTED)
  selectPreviousCandidate(): void {}

  updateContentHeight(): void {
    this.contentHeight = this.contentRef.clientHeight;
  }

  @Watch('candidate', { immediate: true })
  onCandidateUpdated(): void {
    this.selectedCvId = this.candidate.videoCvs?.[0]?.id || '';
    this.videoPlaying = false;
  }

  emitSetCandidateFavorite(): void {
    if (this.candidate.status === CandidateStatus.FAVORITE) {
      this.$emit(EmittedEvents.SET_CANDIDATE_FAVORITE, this.candidate.id, false);
    } else if (this.candidate.status === CandidateStatus.PRESELECTED || CandidateStatus.OTHER) {
      this.$emit(EmittedEvents.SET_CANDIDATE_FAVORITE, this.candidate.id, true);
    }
  }
}
