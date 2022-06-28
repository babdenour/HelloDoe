import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './image-aspect-ratio.html?style=./image-aspect-ratio.scss';

@WithRender
@Component
export default class ImageAspectRatio extends Vue {
  @Prop()
  readonly height: number;

  @Prop()
  readonly aspectRatio: number;

  @Prop()
  readonly src: string;

  get imageStyle(): { [k: string]: string } {
    return {
      '--width': this.imageWidthStr,
      '--height': this.imageHeightStr,
      backgroundImage: `url('${this.src}')`,
    };
  }

  get imageWidthStr(): string {
    const width = Math.floor(this.height * this.aspectRatio);
    return `${width}px`;
  }

  get imageHeightStr(): string {
    return `${this.height}px`;
  }
}
