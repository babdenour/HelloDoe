import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import WithRender from './info-card.html?style=./info-card.scss';

export interface InfoCardProps {
  label?: string;
  title: string;
  description: string;
  button: string;
}

export enum EmittedEvents {
  CTA_CLICKED = 'cta-clicked',
}

@WithRender
@Component
export default class InfoCard extends Vue implements InfoCardProps {
  @Prop()
  readonly label?: string;

  @Prop()
  readonly title: string;

  @Prop()
  readonly description: string;

  @Prop()
  readonly button: string;

  get labelOn(): boolean {
    return !!this.label;
  }

  @Emit(EmittedEvents.CTA_CLICKED)
  ctaClicked(): void {}
}
