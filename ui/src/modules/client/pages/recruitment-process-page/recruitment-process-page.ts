import { ROUTE_NAMES } from '@/route-names';
import { MissionInterface } from '@/types/mission.interface';
import CardDialog, { CardDialogProps } from '@client/components/card-dialog/card-dialog';
import Dialog from '@client/components/dialog/dialog';
import InfoCard from '@client/components/info-card/info-card';
import InfoPageLayout, { ListCardProp } from '@client/components/info-page-layout/info-page-layout';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { NavigationListCandidateHash } from '@services/navigation.service';
import { Component, Vue } from 'vue-property-decorator';
import WithRender from './recruitment-process-page.html?style=./recruitment-process-page.scss';

export enum CardIds {
  MY_AD_CARD = 'my-ad-card',
  SPONSO_CARD = 'sponso-card',
  SUGGESTED_CARD = 'suggested-card',
  UNLOCK_CARD = 'unlock-card',
  SELECTION_CARD = 'selection-card',
  REDIRECT_TO_CHECKOUT = 'redirect-to-checkout',
}

export enum EmittedEvents {
  GO_TO_PAGE = 'go-to-page',
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.CLIENT_INFO_CARD]: InfoCard,
    [COMPONENTS_NAMES.CLIENT_INFO_PAGE_LAYOUT]: InfoPageLayout,
    [COMPONENTS_NAMES.CLIENT_DIALOG]: Dialog,
    [COMPONENTS_NAMES.CLIENT_CARD_DIALOG]: CardDialog,
  },
})
export default class RecruitmentProcessPage extends Vue {
  isDialogOpen: boolean = false;
  cardId: string = '';

  get i18n() {
    return {
      pageDescription: this.$i18nSvc.t('pages.client.recruitment-page.page-description').toString(),
      conceptionCard: {
        label: this.$i18nSvc.t('pages.client.recruitment-page.conception-card.label').toString(),
        title: this.$i18nSvc.t('pages.client.recruitment-page.conception-card.title').toString(),
        description: this.$i18nSvc.t('pages.client.recruitment-page.conception-card.description').toString(),
        button: this.$i18nSvc.t('pages.client.recruitment-page.conception-card.button').toString(),
      },
      diffusionCard: {
        label: this.$i18nSvc.t('pages.client.recruitment-page.diffusion-card.label').toString(),
        title: this.$i18nSvc.t('pages.client.recruitment-page.diffusion-card.title').toString(),
        description: this.$i18nSvc.t('pages.client.recruitment-page.diffusion-card.description').toString(),
        button: this.$i18nSvc.t('pages.client.recruitment-page.diffusion-card.button').toString(),
      },
      preselectionCard: {
        label: this.$i18nSvc.t('pages.client.recruitment-page.preselection-card.label').toString(),
        title: this.$i18nSvc.t('pages.client.recruitment-page.preselection-card.title').toString(),
        description: this.$i18nSvc.t('pages.client.recruitment-page.preselection-card.description').toString(),
        button: this.$i18nSvc.t('pages.client.recruitment-page.preselection-card.button').toString(),
      },
      selectionCard: {
        label: this.$i18nSvc.t('pages.client.recruitment-page.selection-card.label').toString(),
        title: this.$i18nSvc.t('pages.client.recruitment-page.selection-card.title').toString(),
        description: this.$i18nSvc.t('pages.client.recruitment-page.selection-card.description').toString(),
        button: this.$i18nSvc.t('pages.client.recruitment-page.selection-card.button').toString(),
      },
      unlockCard: {
        label: this.$i18nSvc.t('pages.client.recruitment-page.unlock-card.label').toString(),
        title: this.$i18nSvc.t('pages.client.recruitment-page.unlock-card.title').toString(),
        description: this.$i18nSvc.t('pages.client.recruitment-page.unlock-card.description').toString(),
        button: this.$i18nSvc.t('pages.client.recruitment-page.unlock-card.button').toString(),
      },
      paiementCard: {
        label: this.$i18nSvc.t('pages.client.recruitment-page.paiement-card.label').toString(),
        title: this.$i18nSvc.t('pages.client.recruitment-page.paiement-card.title').toString(),
        description: this.$i18nSvc.t('pages.client.recruitment-page.paiement-card.description').toString(),
        button: this.$i18nSvc.t('pages.client.recruitment-page.paiement-card.button').toString(),
      },
      sponsoInfoDialog: {
        title: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.title'),
        description: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.description'),
        cta: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.cta'),
        iconSrc: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.iconSrc'),
        options: [
          { text: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.option1') },
          { text: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.option2') },
          { text: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.option3') },
        ],
      },
    };
  }

  get pageDescription(): string {
    return this.i18n.pageDescription;
  }

  get listCard(): ListCardProp[] {
    return [
      {
        ctaId: CardIds.MY_AD_CARD,
        label: this.i18n.conceptionCard.label,
        title: this.i18n.conceptionCard.title,
        description: this.i18n.conceptionCard.description,
        button: this.i18n.conceptionCard.button,
      },
      {
        ctaId: CardIds.SPONSO_CARD,
        label: this.i18n.diffusionCard.label,
        title: this.i18n.diffusionCard.title,
        description: this.i18n.diffusionCard.description,
        button: this.i18n.diffusionCard.button,
      },
      {
        ctaId: CardIds.SUGGESTED_CARD,
        label: this.i18n.preselectionCard.label,
        title: this.i18n.preselectionCard.title,
        description: this.i18n.preselectionCard.description,
        button: this.i18n.preselectionCard.button,
      },
      {
        ctaId: CardIds.SELECTION_CARD,
        label: this.i18n.selectionCard.label,
        title: this.i18n.selectionCard.title,
        description: this.i18n.selectionCard.description,
        button: this.i18n.selectionCard.button,
      },
      {
        ctaId: CardIds.REDIRECT_TO_CHECKOUT,
        label: this.i18n.paiementCard.label,
        title: this.i18n.paiementCard.title,
        description: this.i18n.paiementCard.description,
        button: this.i18n.paiementCard.button,
      },
      {
        ctaId: CardIds.UNLOCK_CARD,
        label: this.i18n.unlockCard.label,
        title: this.i18n.unlockCard.title,
        description: this.i18n.unlockCard.description,
        button: this.i18n.unlockCard.button,
      },
    ];
  }

  get cardDialogInfo(): CardDialogProps {
    if (this.cardId === CardIds.SPONSO_CARD) {
      return {
        title: this.i18n.sponsoInfoDialog.title,
        description: this.i18n.sponsoInfoDialog.description,
        cta: this.i18n.sponsoInfoDialog.cta,
        iconSrc: this.i18n.sponsoInfoDialog.iconSrc,
        options: this.i18n.sponsoInfoDialog.options,
      };
    }

    return {
      title: '',
      description: '',
      cta: '',
      iconSrc: '',
    };
  }

  get currentMission(): MissionInterface {
    return this.$missionsService.getCurrent();
  }

  async redirectToCheckout(): Promise<void> {
    try {
      await this.$checkoutSvc.redirectToCheckoutForMission(this.currentMission.id);
      // eslint-disable-next-line no-empty
    } catch (_) {}
  }

  saveCardClicked(cardId: string): void {
    this.cardId = cardId;
    this.handleCardClicked(cardId);
  }

  handleCardClicked(cardId: string): void {
    if (cardId === CardIds.MY_AD_CARD) {
      this.$navigationSvc.goToInstagram();
    } else if (cardId === CardIds.SPONSO_CARD) {
      this.isDialogOpen = true;
    } else if (cardId === CardIds.SUGGESTED_CARD) {
      this.emitPageSelected(ROUTE_NAMES.CLIENT_CANDIDATES_PAGE, NavigationListCandidateHash.SUGGESTED);
    } else if (cardId === CardIds.SELECTION_CARD) {
      this.emitPageSelected(ROUTE_NAMES.CLIENT_CANDIDATES_PAGE);
    } else if (cardId === CardIds.UNLOCK_CARD) {
      this.emitPageSelected(ROUTE_NAMES.CLIENT_CANDIDATES_PAGE, NavigationListCandidateHash.UNLOCKED);
    } else if (cardId === CardIds.REDIRECT_TO_CHECKOUT) {
      this.redirectToCheckout();
    }
  }

  handleCardDialogCtaClicked(): void {
    if (this.cardId === CardIds.SPONSO_CARD) {
      this.$navigationSvc.goToSponsoTypeform();
    }
  }

  emitPageSelected(routeName: string, hash?: string) {
    this.$emit(EmittedEvents.GO_TO_PAGE, routeName, { hash: hash });
  }
}
