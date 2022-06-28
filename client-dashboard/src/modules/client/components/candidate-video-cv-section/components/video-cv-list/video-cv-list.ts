import ImageAspectRatio from '@client/components/image-aspect-ratio/image-aspect-ratio';
import { CandidateVideoCv } from '@domains/candidate';
import { COMPONENTS_NAMES } from '@modules/components-names';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop, Ref } from 'vue-property-decorator';
import WithRender from './video-cv-list.html?style=./video-cv-list.scss';

export enum EmittedEvents {
  CV_SELECTED = 'cv-selected',
}

interface DisplayableCv {
  id: string;
  imgUrl: string;
  cssClasses: string[];
}

export interface VideoCvListProps {
  selectedCvId: string;
  videoCvList: CandidateVideoCv[];
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.IMAGE_ASPECT_RATIO]: ImageAspectRatio,
  },
})
export default class VideoCvList extends Vue implements VideoCvListProps {
  @Prop({ default: () => [] })
  readonly videoCvList: CandidateVideoCv[];

  @Prop({ default: '' })
  readonly selectedCvId: string;

  @Ref('host')
  readonly hostRef: HTMLDivElement;

  readonly aspectRatio: number = 9 / 16;
  hostHeight: number = 0;

  get thumbnailHeight(): number {
    return this.hostHeight * 0.75;
  }

  get displayableCvList(): DisplayableCv[] {
    return this.videoCvList.map((cv) => ({
      id: cv.id,
      imgUrl: cv.imgUrl,
      cssClasses: this.buildDisplayableCvCssClasses(cv),
    }));
  }

  mounted(): void {
    this.hostHeight = this.hostRef.clientHeight;
  }

  buildDisplayableCvCssClasses(cv: CandidateVideoCv): string[] {
    const cssClasses = [];

    if (this.isCvSelectedId(cv.id)) {
      cssClasses.push('video-cv-list__thumbnail--selected');
    }

    return cssClasses;
  }

  isCvSelectedId(cvId: string): boolean {
    return cvId === this.selectedCvId;
  }

  @Emit(EmittedEvents.CV_SELECTED)
  selectCv(cvId: string): string {
    return cvId;
  }
}
