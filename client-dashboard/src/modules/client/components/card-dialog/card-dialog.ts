import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import WithRender from './card-dialog.html?style=./card-dialog.scss';

export interface CardDialogOptions {
  text: string;
}

export interface CardDialogProps {
  title: string;
  description: string;
  cta: string;
  iconSrc: string;
  options?: CardDialogOptions[];
}

export enum EmittedEvents {
  CTA_CLICKED = 'cta-clicked',
}

@WithRender
@Component
export default class CardDialog extends Vue implements CardDialogProps {
  @Prop()
  readonly title: string;

  @Prop()
  readonly description: string;

  @Prop()
  readonly cta: string;

  @Prop()
  readonly iconSrc: string;

  @Prop({ default: () => [] })
  readonly options?: CardDialogOptions[];

  get shouldDisplayOptions(): boolean {
    return this.options.length > 0;
  }

  @Emit(EmittedEvents.CTA_CLICKED)
  ctaClicked(): void {}
}
