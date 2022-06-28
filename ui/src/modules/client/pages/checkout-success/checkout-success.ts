import { Button } from 'element-ui';
import { Component, Vue } from 'vue-property-decorator';
import WithRender from './checkout-success.html?style=./checkout-success.scss';

@WithRender
@Component({
  components: {
    [Button.name]: Button,
  },
})
export default class CheckoutSuccessPage extends Vue {
  get i18n(): { [k: string]: string } {
    return {
      subtitle: this.$i18nSvc.t('pages.client.checlout-success.subtitle').toString(),
      title: this.$i18nSvc.t('pages.client.checlout-success.title').toString(),
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
