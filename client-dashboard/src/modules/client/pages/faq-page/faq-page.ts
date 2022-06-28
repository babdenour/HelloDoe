import BoostMyAdDialog from '@client/components/boost-my-ad-dialog/boost-my-ad-dialog';
import HelpDialog from '@client/components/help-dialog/help-dialog';
import InfoCard from '@client/components/info-card/info-card';
import InfoPageLayout, { ListCardProp } from '@client/components/info-page-layout/info-page-layout';
import SponsoMyAdDialog from '@client/components/sponso-my-ad-dialog/sponso-my-ad-dialog';
import { Client } from '@domains/client';
import { Mission } from '@domains/mission';
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
    [COMPONENTS_NAMES.CLIENT_SPONSO_MY_AD_DIALOG]: SponsoMyAdDialog,
    [COMPONENTS_NAMES.CLIENT_BOOST_MY_AD_DIALOG]: BoostMyAdDialog,
    [COMPONENTS_NAMES.CLIENT_HELP_DIALOG]: HelpDialog,
  },
})
export default class FaqPage extends Vue {
  isBoostMyAddDialogOpen: boolean = false;

  isSponsoMyAddDialogOpen: boolean = false;

  isHelpDialogOpen: boolean = false;

  get i18n() {
    return {
      pageDescription: this.$i18nSvc.t('pages.client.faq-page.page-description').toString(),
      stripeCard: {
        title: this.$i18nSvc.t('pages.client.faq-page.stripe-card.title').toString(),
        description: this.$i18nSvc.t('pages.client.faq-page.stripe-card.description').toString(),
        button: this.$i18nSvc.t('pages.client.faq-page.stripe-card.button').toString(),
        emojiNameTitle: 'credit-card',
      },
      comCard: {
        title: this.$i18nSvc.t('pages.client.faq-page.com-card.title').toString(),
        description: this.$i18nSvc.t('pages.client.faq-page.com-card.description').toString(),
        button: this.$i18nSvc.t('pages.client.faq-page.com-card.button').toString(),
        emojiNameTitle: 'thinking-face',
      },
      betaTesterCard: {
        title: this.$i18nSvc.t('pages.client.faq-page.beta-tester-card.title').toString(),
        description: this.$i18nSvc.t('pages.client.faq-page.beta-tester-card.description').toString(),
        button: this.$i18nSvc.t('pages.client.faq-page.beta-tester-card.button').toString(),
        emojiNameTitle: 'personal-computer',
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
        emojiNameTitle: 'police-cars-revolving-light',
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
        emojiNameTitle: this.i18n.stripeCard.emojiNameTitle,
      },
      {
        ctaId: CardIds.INSTAGRAM_CARD,
        title: this.i18n.comCard.title,
        description: this.i18n.comCard.description,
        button: this.i18n.comCard.button,
        emojiNameTitle: this.i18n.comCard.emojiNameTitle,
      },
      {
        ctaId: CardIds.BETA_TESTER_CARD,
        title: this.i18n.betaTesterCard.title,
        description: this.i18n.betaTesterCard.description,
        button: this.i18n.betaTesterCard.button,
        emojiNameTitle: this.i18n.betaTesterCard.emojiNameTitle,
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
        emojiNameTitle: this.i18n.helpCard.emojiNameTitle,
      },
    ];
  }

  get currentMission(): Mission {
    return this.$missionsService.getCurrent();
  }

  get emailHelloDoe(): string {
    return 'lucas@hellodoe.co';
  }

  get missionCode(): string {
    return this.$route.params.missionCode;
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

  async redirectToCheckout(): Promise<void> {
    try {
      await this.$checkoutSvc.redirectToCheckoutForMission(this.currentMission.id);
      // eslint-disable-next-line no-empty
    } catch (_) {}
  }

  handleCardClicked(cardId: string): void {
    if (cardId === CardIds.HELP_CARD) {
      this.isHelpDialogOpen = true;
    } else if (cardId === CardIds.BOOST_CARD) {
      this.isBoostMyAddDialogOpen = true;
    } else if (cardId === CardIds.SPONSO_CARD) {
      this.isSponsoMyAddDialogOpen = true;
    } else if (cardId === CardIds.INSTAGRAM_CARD) {
      this.$navigationSvc.goToInstagram();
    } else if (cardId === CardIds.BETA_TESTER_CARD) {
      this.$navigationSvc.goToBetaTestTypeform();
    } else if (cardId === CardIds.REDIRECT_TO_CHECKOUT) {
      this.redirectToCheckout();
    }
  }
}
