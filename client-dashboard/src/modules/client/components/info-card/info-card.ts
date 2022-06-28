import Emoji from '@client/components/emoji/emoji';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import WithRender from './info-card.html?style=./info-card.scss';

export interface InfoCardProps {
  label?: string;
  title: string;
  description: string;
  button: string;
  emojiNameTitle?: string;
}

export enum EmittedEvents {
  CTA_CLICKED = 'cta-clicked',
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.EMOJI]: Emoji,
  },
})
export default class InfoCard extends Vue implements InfoCardProps {
  @Prop()
  readonly label?: string;

  @Prop()
  readonly title: string;

  @Prop()
  readonly description: string;

  @Prop()
  readonly button: string;

  @Prop()
  readonly emojiNameTitle?: string;

  get labelOn(): boolean {
    return !!this.label;
  }

  @Emit(EmittedEvents.CTA_CLICKED)
  ctaClicked(): void {}
}
