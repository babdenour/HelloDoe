import { JobCategory, PaymentUnit } from '@/types/mission.interface';
import { getJobCategoryAssets } from '@client/components/mission-info-card/assets-missions-categories';
import { ContractType } from '@constants/contract-type';
import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './mission-info-card.html?style=./mission-info-card.scss';

export interface MissionInfoCardProps {
  category: JobCategory;
  contract: ContractType;
  beginAt: number;
  paymentAmount: number;
  paymentUnit: PaymentUnit;
  nbWorkers: number;
}

@WithRender
@Component
export default class MissionInfoCard extends Vue implements MissionInfoCardProps {
  @Prop()
  readonly category: JobCategory;

  @Prop()
  readonly contract: ContractType;

  @Prop()
  readonly beginAt: number;

  @Prop()
  readonly paymentAmount: number;

  @Prop()
  readonly paymentUnit: PaymentUnit;

  @Prop()
  readonly nbWorkers: number;

  get assetJob() {
    return getJobCategoryAssets(this.category).asset;
  }

  get hostStyle() {
    return { '--backgroundColor': `${getJobCategoryAssets(this.category).color}` };
  }

  get i18n(): { [k: string]: string } {
    return {
      cat: this.$i18nSvc.tc(`mission.post-name.${this.category}`, this.nbWorkers),
      category: this.$i18nSvc.t(`mission.post-name.${this.category}`),
      contractType: this.$i18nSvc.t(`mission.contract-type.${this.contract}`),
      paymentUnit: this.$i18nSvc.t(`mission.payment-unit.${this.paymentUnit}`),
    };
  }

  get beginAtDate(): string {
    if (this.beginAt > Date.now()) {
      return this.$i18nSvc.translateDate(this.beginAt);
    } else {
      return 'ASAP';
    }
  }

  get paymentAmountText(): string {
    let intPrice = Math.round(this.paymentAmount / 100);
    let decPrice = this.paymentAmount - intPrice * 100;
    let decPriceString = decPrice.toString().padStart(2, '0');
    return intPrice + ',' + decPriceString;
  }
}
