import InfoCard, { InfoCardProps } from '@client/components/info-card/info-card';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import WithRender from './info-page-layout.html?style=./info-page-layout.scss';

export interface InfoPageLayoutProps {
  pageDescription: string;
  listCard: ListCardProp[];
}

export interface ListCardProp extends InfoCardProps {
  ctaId?: string;
}

export enum EmittedEvents {
  CARD_CLICKED = 'card-clicked',
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.CLIENT_INFO_CARD]: InfoCard,
  },
})
export default class InfoPageLayout extends Vue implements InfoPageLayoutProps {
  @Prop()
  readonly pageDescription: string;

  @Prop()
  readonly listCard: ListCardProp[];

  @Emit(EmittedEvents.CARD_CLICKED)
  emitCardClickedEvent(id: string): string {
    return id;
  }
}
