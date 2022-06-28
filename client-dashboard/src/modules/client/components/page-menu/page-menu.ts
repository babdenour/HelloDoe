import logoHelloDoeWhite from '@/assets/round-logo-black.png';
import { ROUTE_NAMES } from '@/route-names';
import Emoji from '@client/components/emoji/emoji';
import MenuButton from '@client/components/menu-button/menu-button';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import WithRender from './page-menu.html?style=./page-menu.scss';

interface NavItem {
  buttonTitle: string;
  emojiName: string;
  pageName: string;
}

export enum EmittedEvents {
  GO_TO_PAGE = 'go-to-page',
  REDIRECT_TO_CHECKOUT = 'redirect-to-checkout',
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.CLIENT_MENU_BUTTON]: MenuButton,
    [COMPONENTS_NAMES.EMOJI]: Emoji,
  },
})
@WithRender
export default class PageMenu extends Vue {
  @Prop()
  readonly currentPageName: string;

  @Prop({ type: String, default: '' })
  readonly clientFirstName: string;

  logoHelloDoe: string = logoHelloDoeWhite;

  get navItems(): NavItem[] {
    return [
      { buttonTitle: this.i18n.titleRecruitProcess, emojiName: 'information-source', pageName: ROUTE_NAMES.CLIENT_RECRUITMENT_PROCESS_PAGE },
      { buttonTitle: this.i18n.titleMyCandidates, emojiName: 'male-student', pageName: ROUTE_NAMES.CLIENT_CANDIDATES_PAGE },
      { buttonTitle: this.i18n.titleDashboardTutorial, emojiName: 'gear', pageName: ROUTE_NAMES.CLIENT_DASHBOARD_TUTORIAL_PAGE },
      { buttonTitle: this.i18n.titleFaq, emojiName: 'electric-light-bulb', pageName: ROUTE_NAMES.CLIENT_FAQ_PAGE },
    ];
  }

  get i18n(): { [k: string]: string } {
    return {
      titleSubMenu: this.$i18nSvc.t('component.page-menu.sub-menu.title', { clientFirstName: this.clientFirstName }),
      titleRecruitProcess: this.$i18nSvc.t('component.page-menu.button.recruit-process'),
      titleMyCandidates: this.$i18nSvc.t('component.page-menu.button.my-candidates'),
      titleDashboardTutorial: this.$i18nSvc.t('component.page-menu.button.dashboard-tutorial'),
      titleFaq: this.$i18nSvc.t('component.page-menu.button.faq'),
      titleProceedToPayment: this.$i18nSvc.t('component.page-menu.button.proceed-to-payment'),
    };
  }

  @Emit(EmittedEvents.GO_TO_PAGE)
  emitPageSelected(routeName: string): string {
    return routeName;
  }

  isButtonSelected(pageName: string): boolean {
    return pageName === this.currentPageName;
  }

  @Emit(EmittedEvents.REDIRECT_TO_CHECKOUT)
  emitRedirectToCheckoutEvent(): void {}
}
