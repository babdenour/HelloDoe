import { ROUTE_NAMES } from '@/route-names';
import { JobCategory, MissionInterface, PaymentUnit } from '@/types/mission.interface';
import CardDialog, { CardDialogProps } from '@client/components/card-dialog/card-dialog';
import Dialog from '@client/components/dialog/dialog';
import MissionInfoActionButton from '@client/components/mission-info-action-button/mission-info-action-button';
import MissionInfoCard, { MissionInfoCardProps } from '@client/components/mission-info-card/mission-info-card';
import PageMenu from '@client/components/page-menu/page-menu';
import { ContractType } from '@constants/contract-type';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Component, Vue, Watch } from 'vue-property-decorator';
import WithRender from './root-page.html?style=./root-page.scss';

export interface GoToPageOptions {
  hash: string;
}

export enum DialogName {
  BOOST = 'boost-my-ad',
  SPONSOR = 'sponsor-my-ad',
  HELP = 'help',
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
@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.CLIENT_PAGE_MENU]: PageMenu,
    [COMPONENTS_NAMES.CLIENT_MISSION_INFO_CARD]: MissionInfoCard,
    [COMPONENTS_NAMES.CLIENT_MISSION_INFO_ACTION_BUTTON]: MissionInfoActionButton,
    [COMPONENTS_NAMES.CLIENT_DIALOG]: Dialog,
    [COMPONENTS_NAMES.CLIENT_CARD_DIALOG]: CardDialog,
  },
})
export default class RootPage extends Vue {
  showMissionMenu: boolean = false;

  isDialogOpen: boolean = false;

  dialogName: string = '';

  get missionCode(): string {
    return this.$route.params.missionCode;
  }

  get selectedPageName(): string {
    return this.$route.name;
  }

  get i18n(): { [k: string]: string } {
    return {
      emailCopied: this.$i18nSvc.t('messages.email-copied'),
      boostMyAd: this.$i18nSvc.t('actions.boost-my-ad'),
      sponsorMyAd: this.$i18nSvc.t('actions.sponsor-my-ad'),
      modifyMyAd: this.$i18nSvc.t('actions.modify-my-ad'),
      publishMyAd: this.$i18nSvc.t('actions.publish-new-ad'),
      boostInfoDialogTitle: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.title'),
      boostInfoDialogDescription: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.description'),
      boostInfoDialogCta: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.cta'),
      boostInfoDialogIconSrc: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.iconSrc'),
      boostInfoDialogOption1: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.option1'),
      boostInfoDialogOption2: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.option2'),
      sponsoInfoDialogTitle: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.title'),
      sponsoInfoDialogDescription: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.description'),
      sponsoInfoDialogCta: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.cta'),
      sponsoInfoDialogIconSrc: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.iconSrc'),
      sponsoInfoDialogOption1: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.option1'),
      sponsoInfoDialogOption2: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.option2'),
      sponsoInfoDialogOption3: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.option3'),
      helpInfoDialogTitle: this.$i18nSvc.t('pages.client.faq-page.help-info-dialog.title'),
      helpInfoDialogDescription: this.$i18nSvc.t('pages.client.faq-page.help-info-dialog.description'),
      helpInfoDialogCta: this.$i18nSvc.t('pages.client.faq-page.help-info-dialog.cta'),
      helpInfoDialogIconSrc: this.$i18nSvc.t('pages.client.faq-page.help-info-dialog.iconSrc'),
    };
  }

  get cardDialogInfo(): CardDialogProps {
    if (this.dialogName === DialogName.BOOST) {
      return {
        title: this.i18n.boostInfoDialogTitle,
        description: this.i18n.boostInfoDialogDescription,
        cta: this.i18n.boostInfoDialogCta,
        iconSrc: this.i18n.boostInfoDialogIconSrc,
        options: [{ text: this.i18n.boostInfoDialogOption1 }, { text: this.i18n.boostInfoDialogOption2 }],
      };
    } else if (this.dialogName === DialogName.SPONSOR) {
      return {
        title: this.i18n.sponsoInfoDialogTitle,
        description: this.i18n.sponsoInfoDialogDescription,
        cta: this.i18n.sponsoInfoDialogCta,
        iconSrc: this.i18n.sponsoInfoDialogIconSrc,
        options: [{ text: this.i18n.sponsoInfoDialogOption1 }, { text: this.i18n.sponsoInfoDialogOption2 }, { text: this.i18n.sponsoInfoDialogOption3 }],
      };
    } else if (this.dialogName === DialogName.HELP) {
      return {
        title: this.i18n.helpInfoDialogTitle,
        description: this.i18n.helpInfoDialogDescription,
        cta: this.i18n.helpInfoDialogCta,
        iconSrc: this.i18n.helpInfoDialogIconSrc,
      };
    }
    return {
      title: '',
      description: '',
      cta: '',
      iconSrc: '',
    };
  }

  goToPage(routeName: string, options?: GoToPageOptions) {
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

  get infoMission(): MissionInfoCardProps {
    return {
      category: this.currentMission?.category || JobCategory.TICKETING,
      contract: this.currentMission?.contractType || ContractType.CDI,
      paymentAmount: this.currentMission?.payment?.amount || 0,
      paymentUnit: this.currentMission?.payment?.unit || PaymentUnit.HOUR,
      beginAt: this.currentMission?.timeTable?.beginAt || 0,
      nbWorkers: this.currentMission?.nbWorkers || 0,
    };
  }

  @Watch('missionCode', { immediate: true })
  async updateMission(): Promise<void> {
    if (this.missionCode) {
      await this.$missionsService.setCurrentByCode(this.missionCode);
    }
  }

  get missionMenuItems(): MissionMenuItem[] {
    return [
      { buttonTitle: this.i18n.sponsorMyAd, asset: '📣', buttonAction: MissionMenuActionButton.SPONSOR },
      { buttonTitle: this.i18n.boostMyAd, asset: '⚡', buttonAction: MissionMenuActionButton.BOOST },
      { buttonTitle: this.i18n.modifyMyAd, asset: '✏️', buttonAction: MissionMenuActionButton.HELP },
      { buttonTitle: this.i18n.publishMyAd, asset: '🆕', buttonAction: MissionMenuActionButton.NEW_MISSION },
    ];
  }

  get currentMission(): MissionInterface {
    return this.$missionsService.getCurrent();
  }

  get emailHelloDoe() {
    return 'lucas@hellodoe.co';
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

  openDialog(dialogName: string) {
    this.dialogName = dialogName;
    this.isDialogOpen = true;
  }

  handleMenuActionButtonClick(actionButton: string) {
    if (actionButton === MissionMenuActionButton.SPONSOR) {
      this.openDialog(actionButton);
    } else if (actionButton === MissionMenuActionButton.BOOST) {
      this.openDialog(actionButton);
    } else if (actionButton === MissionMenuActionButton.HELP) {
      this.openDialog(actionButton);
    } else if (actionButton === MissionMenuActionButton.NEW_MISSION) {
      this.$navigationSvc.goToPublishNewMissionTypeform();
    }
  }

  handleCardDialogCtaClicked(): void {
    if (this.dialogName === DialogName.BOOST) {
      this.$navigationSvc.goToBoostTypeform();
    } else if (this.dialogName === DialogName.SPONSOR) {
      this.$navigationSvc.goToSponsoTypeform();
    } else if (this.dialogName === DialogName.HELP) {
      this.copyEmail();
    }
  }

  copyEmail() {
    let description = this.emailHelloDoe;
    this.$copyText(description);
    this.$toastService.success(this.i18n.emailCopied);
  }
}
