import { Component, Vue } from 'vue-property-decorator';
import WithRender from './checkout-failure.html?style=./checkout-failure.scss';

@WithRender
@Component
export default class CheckoutFailurePage extends Vue {
  get i18n(): { [k: string]: string } {
    return {
      subtitle: this.$i18nSvc.t('pages.client.checlout-failure.subtitle').toString(),
      title: this.$i18nSvc.t('pages.client.checlout-failure.title').toString(),
      validate: this.$i18nSvc.t('actions.validate').toString(),
    };
  }

  get missionCode(): string {
    return this.$route.query.code;
  }

  redirectToDashboard(): void {
    this.$navigationSvc.goToClientCandidatePage(this.missionCode);
  }
}
