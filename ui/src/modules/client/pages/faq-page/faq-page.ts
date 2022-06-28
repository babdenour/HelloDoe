import { MissionInterface } from '@/types/mission.interface';
import CardDialog, { CardDialogProps } from '@client/components/card-dialog/card-dialog';
import Dialog from '@client/components/dialog/dialog';
import InfoCard from '@client/components/info-card/info-card';
import InfoPageLayout, { ListCardProp } from '@client/components/info-page-layout/info-page-layout';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Component, Vue } from 'vue-property-decorator';
import WithRender from './faq-page.html?style=./faq-page.scss';

export enum CardIds {
  HELP_CARD = 'help-card',
  BOOST_CARD = 'boost-card',
  SPONSO_CARD = 'sponso-card',
  INSTAGRAM_CARD = 'instagram-card',
  BETA_TESTER_CARD = 'beta-tester-card',
  REDIRECT_TO_CHECKOUT = 'redirect-to-checkout',
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
export default class FaqPage extends Vue {
  isDialogOpen: boolean = false;
  cardId: string = '';

  get i18n() {
    return {
      emailCopied: this.$i18nSvc.t('messages.email-copied'),
      pageDescription: this.$i18nSvc.t('pages.client.faq-page.page-description').toString(),
      stripeCard: {
        title: this.$i18nSvc.t('pages.client.faq-page.stripe-card.title').toString(),
        description: this.$i18nSvc.t('pages.client.faq-page.stripe-card.description').toString(),
        button: this.$i18nSvc.t('pages.client.faq-page.stripe-card.button').toString(),
      },
      comCard: {
        title: this.$i18nSvc.t('pages.client.faq-page.com-card.title').toString(),
        description: this.$i18nSvc.t('pages.client.faq-page.com-card.description').toString(),
        button: this.$i18nSvc.t('pages.client.faq-page.com-card.button').toString(),
      },
      betaTesterCard: {
        title: this.$i18nSvc.t('pages.client.faq-page.beta-tester-card.title').toString(),
        description: this.$i18nSvc.t('pages.client.faq-page.beta-tester-card.description').toString(),
        button: this.$i18nSvc.t('pages.client.faq-page.beta-tester-card.button').toString(),
      },
      sponsorCard: {
        title: this.$i18nSvc.t('pages.client.faq-page.sponsor-card.title').toString(),
        description: this.$i18nSvc.t('pages.client.faq-page.sponsor-card.description').toString(),
        button: this.$i18nSvc.t('pages.client.faq-page.sponsor-card.button').toString(),
      },
      boostCard: {
        title: this.$i18nSvc.t('pages.client.faq-page.boost-card.title').toString(),
        description: this.$i18nSvc.t('pages.client.faq-page.boost-card.description').toString(),
        button: this.$i18nSvc.t('pages.client.faq-page.boost-card.button').toString(),
      },
      helpCard: {
        title: this.$i18nSvc.t('pages.client.faq-page.help-card.title').toString(),
        description: this.$i18nSvc.t('pages.client.faq-page.help-card.description').toString(),
        button: this.$i18nSvc.t('pages.client.faq-page.help-card.button').toString(),
      },
      helpInfoDialog: {
        title: this.$i18nSvc.t('pages.client.faq-page.help-info-dialog.title'),
        description: this.$i18nSvc.t('pages.client.faq-page.help-info-dialog.description'),
        cta: this.$i18nSvc.t('pages.client.faq-page.help-info-dialog.cta'),
        iconSrc: this.$i18nSvc.t('pages.client.faq-page.help-info-dialog.iconSrc'),
      },
      boostInfoDialog: {
        title: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.title'),
        description: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.description'),
        cta: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.cta'),
        iconSrc: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.iconSrc'),
        options: [{ text: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.option1') }, { text: this.$i18nSvc.t('pages.client.faq-page.boost-info-dialog.option2') }],
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
        ctaId: CardIds.REDIRECT_TO_CHECKOUT,
        title: this.i18n.stripeCard.title,
        description: this.i18n.stripeCard.description,
        button: this.i18n.stripeCard.button,
      },
      {
        ctaId: CardIds.INSTAGRAM_CARD,
        title: this.i18n.comCard.title,
        description: this.i18n.comCard.description,
        button: this.i18n.comCard.button,
      },
      {
        ctaId: CardIds.BETA_TESTER_CARD,
        title: this.i18n.betaTesterCard.title,
        description: this.i18n.betaTesterCard.description,
        button: this.i18n.betaTesterCard.button,
      },
      {
        ctaId: CardIds.SPONSO_CARD,
        title: this.i18n.sponsorCard.title,
        description: this.i18n.sponsorCard.description,
        button: this.i18n.sponsorCard.button,
      },
      {
        ctaId: CardIds.BOOST_CARD,
        title: this.i18n.boostCard.title,
        description: this.i18n.boostCard.description,
        button: this.i18n.boostCard.button,
      },
      {
        ctaId: CardIds.HELP_CARD,
        title: this.i18n.helpCard.title,
        description: this.i18n.helpCard.description,
        button: this.i18n.helpCard.button,
      },
    ];
  }

  get cardDialogInfo(): CardDialogProps {
    if (this.cardId === CardIds.HELP_CARD) {
      return {
        title: this.i18n.helpInfoDialog.title,
        description: this.i18n.helpInfoDialog.description,
        cta: this.i18n.helpInfoDialog.cta,
        iconSrc: this.i18n.helpInfoDialog.iconSrc,
      };
    } else if (this.cardId === CardIds.BOOST_CARD) {
      return {
        title: this.i18n.boostInfoDialog.title,
        description: this.i18n.boostInfoDialog.description,
        cta: this.i18n.boostInfoDialog.cta,
        iconSrc: this.i18n.boostInfoDialog.iconSrc,
        options: this.i18n.boostInfoDialog.options,
      };
    } else if (this.cardId === CardIds.SPONSO_CARD) {
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

  get emailHelloDoe() {
    return 'lucas@hellodoe.co';
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
    if (cardId === CardIds.HELP_CARD) {
      this.isDialogOpen = true;
    } else if (cardId === CardIds.BOOST_CARD) {
      this.isDialogOpen = true;
    } else if (cardId === CardIds.SPONSO_CARD) {
      this.isDialogOpen = true;
    } else if (cardId === CardIds.INSTAGRAM_CARD) {
      this.$navigationSvc.goToInstagram();
    } else if (cardId === CardIds.BETA_TESTER_CARD) {
      this.$navigationSvc.goToBetaTestTypeform();
    } else if (cardId === CardIds.REDIRECT_TO_CHECKOUT) {
      this.redirectToCheckout();
    }
  }

  handleCardDialogCtaClicked(): void {
    if (this.cardId === CardIds.SPONSO_CARD) {
      this.$navigationSvc.goToSponsoTypeform();
    } else if (this.cardId === CardIds.BOOST_CARD) {
      this.$navigationSvc.goToBoostTypeform();
    } else if (this.cardId === CardIds.HELP_CARD) {
      this.copyEmail();
    }
  }

  copyEmail() {
    let description = this.emailHelloDoe;
    this.$copyText(description);
    this.$toastService.success(this.i18n.emailCopied);
  }
}
