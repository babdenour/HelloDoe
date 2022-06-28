import { ROUTE_NAMES } from '@/route-names';
import BoostMyAdDialog from '@client/components/boost-my-ad-dialog/boost-my-ad-dialog';
import HelpDialog from '@client/components/help-dialog/help-dialog';
import MissionInfoActionButton from '@client/components/mission-info-action-button/mission-info-action-button';
import MissionInfoCard, { MissionInfoCardProps } from '@client/components/mission-info-card/mission-info-card';
import PageMenu from '@client/components/page-menu/page-menu';
import SponsoMyAdDialog from '@client/components/sponso-my-ad-dialog/sponso-my-ad-dialog';
import { ContractType } from '@constants/contract-type';
import { MissionCategory } from '@constants/mission-category';
import { Client } from '@domains/client';
import { Mission } from '@domains/mission';
import { MissionPaymentUnit } from '@domains/mission-payment';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Component, Vue, Watch } from 'vue-property-decorator';
import WithRender from './root-page.html?style=./root-page.scss';

export interface GoToPageOptions {
  hash: string;
}

export enum MissionMenuActionButton {
  BOOST = 'boost-my-ad',
  SPONSOR = 'sponsor-my-ad',
  HELP = 'help',
  NEW_MISSION = 'publish-new-mission',
}

interface MissionMenuItem {
  buttonTitle: string;
  asset: string;
  buttonAction: string;
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.CLIENT_PAGE_MENU]: PageMenu,
    [COMPONENTS_NAMES.CLIENT_MISSION_INFO_CARD]: MissionInfoCard,
    [COMPONENTS_NAMES.CLIENT_MISSION_INFO_ACTION_BUTTON]: MissionInfoActionButton,
    [COMPONENTS_NAMES.CLIENT_SPONSO_MY_AD_DIALOG]: SponsoMyAdDialog,
    [COMPONENTS_NAMES.CLIENT_BOOST_MY_AD_DIALOG]: BoostMyAdDialog,
    [COMPONENTS_NAMES.CLIENT_HELP_DIALOG]: HelpDialog,
  },
})
export default class RootPage extends Vue {
  showMissionMenu: boolean = false;

  isSponsoMyAddDialogOpen: boolean = false;

  isBoostMyAddDialogOpen: boolean = false;

  isHelpDialogOpen: boolean = false;

  get missionCode(): string {
    return this.$route.params.missionCode;
  }

  get selectedPageName(): string {
    return this.$route.name;
  }

  get i18n(): { [k: string]: string } {
    return {
      boostMyAd: this.$i18nSvc.t('actions.boost-my-ad'),
      sponsorMyAd: this.$i18nSvc.t('actions.sponsor-my-ad'),
      modifyMyAd: this.$i18nSvc.t('actions.modify-my-ad'),
      publishMyAd: this.$i18nSvc.t('actions.publish-new-ad'),
    };
  }

  get infoMission(): MissionInfoCardProps {
    return {
      category: this.currentMission?.category || MissionCategory.TICKETING,
      contract: this.currentMission?.contractType || ContractType.CDI,
      paymentAmount: this.currentMission?.payment?.amount || 0,
      paymentUnit: this.currentMission?.payment?.unit || MissionPaymentUnit.HOUR,
      beginAt: this.currentMission?.timeTable?.beginAt || 0,
      nbWorkers: this.currentMission?.nbWorkers || 0,
    };
  }

  get missionMenuItems(): MissionMenuItem[] {
    return [
      { buttonTitle: this.i18n.sponsorMyAd, asset: '📣', buttonAction: MissionMenuActionButton.SPONSOR },
      { buttonTitle: this.i18n.boostMyAd, asset: '⚡', buttonAction: MissionMenuActionButton.BOOST },
      { buttonTitle: this.i18n.modifyMyAd, asset: '✏️', buttonAction: MissionMenuActionButton.HELP },
      { buttonTitle: this.i18n.publishMyAd, asset: '🆕', buttonAction: MissionMenuActionButton.NEW_MISSION },
    ];
  }

  get currentMission(): Mission {
    return this.$missionsService.getCurrent();
  }

  get currentClient(): Client {
    return this.$clientSvc.getCurrent();
  }

  get clientFirstName(): string {
    return this.currentClient?.contact?.firstName || '';
  }

  get clientEmail(): string {
    return this.currentClient?.contact?.email || '';
  }

  @Watch('missionCode', { immediate: true })
  async updateMission(): Promise<void> {
    if (this.missionCode) {
      await this.$missionsService.setCurrentByCode(this.missionCode);
    }
  }

  @Watch('currentMission', { immediate: true })
  async updateClient(): Promise<void> {
    if (this.currentMission?.client) {
      await this.$clientSvc.setCurrentById(this.currentMission.client);
    }
  }

  goToPage(routeName: string, options?: GoToPageOptions): void {
    if (routeName === ROUTE_NAMES.CLIENT_RECRUITMENT_PROCESS_PAGE) {
      this.$navigationSvc.goToClientRecruitmentProcess(this.missionCode);
    } else if (routeName === ROUTE_NAMES.CLIENT_DASHBOARD_TUTORIAL_PAGE) {
      this.$navigationSvc.goToClientDashboardTutorial(this.missionCode);
    } else if (routeName === ROUTE_NAMES.CLIENT_CANDIDATES_PAGE) {
      this.$navigationSvc.goToClientCandidatePage(this.missionCode, options);
    } else if (routeName === ROUTE_NAMES.CLIENT_FAQ_PAGE) {
      this.$navigationSvc.goToClientFaq(this.missionCode);
    }
  }

  async redirectToCheckout(): Promise<void> {
    try {
      await this.$checkoutSvc.redirectToCheckoutForMission(this.currentMission.id);
      // eslint-disable-next-line no-empty
    } catch (_) {}
  }

  mounted(): void {
    document.addEventListener('click', this.closeMissionMenu);
  }

  beforeDestroy(): void {
    document.removeEventListener('click', this.closeMissionMenu);
  }

  toogleShowMissionMenu(): void {
    this.showMissionMenu = !this.showMissionMenu;
  }

  closeMissionMenu(): void {
    this.showMissionMenu = false;
  }

  handleMenuActionButtonClick(actionButton: string): void {
    if (actionButton === MissionMenuActionButton.SPONSOR) {
      this.isSponsoMyAddDialogOpen = true;
    } else if (actionButton === MissionMenuActionButton.BOOST) {
      this.isBoostMyAddDialogOpen = true;
    } else if (actionButton === MissionMenuActionButton.HELP) {
      this.isHelpDialogOpen = true;
    } else if (actionButton === MissionMenuActionButton.NEW_MISSION) {
      this.$navigationSvc.goToPublishNewMissionTypeform();
    }
  }
}
