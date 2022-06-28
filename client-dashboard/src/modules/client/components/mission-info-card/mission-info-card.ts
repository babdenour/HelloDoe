import { getMissionStyle } from '@/styles/mission-styles';
import { ContractType } from '@constants/contract-type';
import { MissionCategory } from '@constants/mission-category';
import { MissionPaymentUnit } from '@domains/mission-payment';
import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './mission-info-card.html?style=./mission-info-card.scss';

export interface MissionInfoCardProps {
  category: MissionCategory;
  contract: ContractType;
  beginAt: number;
  paymentAmount: number;
  paymentUnit: MissionPaymentUnit;
  nbWorkers: number;
}

@WithRender
@Component
export default class MissionInfoCard extends Vue implements MissionInfoCardProps {
  @Prop()
  readonly category: MissionCategory;

  @Prop()
  readonly contract: ContractType;

  @Prop()
  readonly beginAt: number;

  @Prop()
  readonly paymentAmount: number;

  @Prop()
  readonly paymentUnit: MissionPaymentUnit;

  @Prop()
  readonly nbWorkers: number;

  get missionEmojiTorn(): string {
    return this.$resourceLocatorSvc.locateMissionEmojiTorn(this.category);
  }

  get hostStyle(): { [k: string]: string } {
    return { '--backgroundColor': `${getMissionStyle(this.category).color}` };
  }

  get i18n(): { [k: string]: string } {
    return {
      postName: this.$i18nSvc.tc(`mission.post-name.${this.category}`, this.nbWorkers),
      contractType: this.$i18nSvc.t(`mission.contract-type.${this.contract}`),
      paymentUnit: this.$i18nSvc.t(`mission.payment-unit.${this.paymentUnit}`),
    };
  }

  get beginDateI18n(): string {
    if (this.beginAt) {
      return this.$i18nSvc.t(`component.mission-info-card.begin-date.on`, { date: this.$i18nSvc.translateDate(this.beginAt) });
    }

    return this.$i18nSvc.t(`component.mission-info-card.begin-date.asap`);
  }

  get beginOnI18n(): string {
    if (this.beginAt && this.beginAt < Date.now()) {
      return this.$i18nSvc.t(`component.mission-info-card.begin-on.past`);
    }

    return this.$i18nSvc.t(`component.mission-info-card.begin-on.future`);
  }

  get paymentAmountText(): string {
    const intPrice = Math.round(this.paymentAmount / 100);
    const decPrice = this.paymentAmount - intPrice * 100;
    const decPriceString = decPrice.toString().padStart(2, '0');

    return intPrice + ',' + decPriceString;
  }
}
