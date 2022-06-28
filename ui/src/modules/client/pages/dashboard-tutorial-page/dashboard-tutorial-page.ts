import { ROUTE_NAMES } from '@/route-names';
import InfoCard, { InfoCardProps } from '@client/components/info-card/info-card';
import InfoPageLayout from '@client/components/info-page-layout/info-page-layout';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { NavigationListCandidateHash } from '@services/navigation.service';
import { Component, Vue } from 'vue-property-decorator';
import WithRender from './dashboard-tutorial-page.html?style=./dashboard-tutorial-page.scss';

export enum CardIds {
  UNLOCKED_CARD = 'unlocked-card',
  FAVORITE_CARD = 'favorite-card',
  SUGGESTED_CARD = 'suggested-card',
  OTHERS_CARD = 'others-card',
}

export enum EmittedEvents {
  GO_TO_PAGE = 'go-to-page',
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.CLIENT_INFO_CARD]: InfoCard,
    [COMPONENTS_NAMES.CLIENT_INFO_PAGE_LAYOUT]: InfoPageLayout,
  },
})
export default class DashboardTutorialPage extends Vue {
  get i18n() {
    return {
      pageDescription: this.$i18nSvc.t('pages.client.tutorial-dashboard-page.page-description').toString(),
      unlockedCard: {
        title: this.$i18nSvc.t('pages.client.tutorial-dashboard-page.unlocked-card.title').toString(),
        description: this.$i18nSvc.t('pages.client.tutorial-dashboard-page.unlocked-card.description').toString(),
        button: this.$i18nSvc.t('pages.client.tutorial-dashboard-page.unlocked-card.button').toString(),
      },
      favoriteCard: {
        title: this.$i18nSvc.t('pages.client.tutorial-dashboard-page.favorite-card.title').toString(),
        description: this.$i18nSvc.t('pages.client.tutorial-dashboard-page.favorite-card.description').toString(),
        button: this.$i18nSvc.t('pages.client.tutorial-dashboard-page.favorite-card.button').toString(),
      },
      suggestionCard: {
        title: this.$i18nSvc.t('pages.client.tutorial-dashboard-page.suggestion-card.title').toString(),
        description: this.$i18nSvc.t('pages.client.tutorial-dashboard-page.suggestion-card.description').toString(),
        button: this.$i18nSvc.t('pages.client.tutorial-dashboard-page.suggestion-card.button').toString(),
      },
      othersCard: {
        title: this.$i18nSvc.t('pages.client.tutorial-dashboard-page.others-card.title').toString(),
        description: this.$i18nSvc.t('pages.client.tutorial-dashboard-page.others-card.description').toString(),
        button: this.$i18nSvc.t('pages.client.tutorial-dashboard-page.others-card.button').toString(),
      },
    };
  }

  get pageDescription(): string {
    return this.i18n.pageDescription;
  }

  get listCard(): InfoCardProps[] {
    let listInfoCard = [
      {
        ctaId: CardIds.UNLOCKED_CARD,
        title: this.i18n.unlockedCard.title,
        description: this.i18n.unlockedCard.description,
        button: this.i18n.unlockedCard.button,
      },
      {
        ctaId: CardIds.FAVORITE_CARD,
        title: this.i18n.favoriteCard.title,
        description: this.i18n.favoriteCard.description,
        button: this.i18n.favoriteCard.button,
      },
      {
        ctaId: CardIds.SUGGESTED_CARD,
        title: this.i18n.suggestionCard.title,
        description: this.i18n.suggestionCard.description,
        button: this.i18n.suggestionCard.button,
      },
      {
        ctaId: CardIds.OTHERS_CARD,
        title: this.i18n.othersCard.title,
        description: this.i18n.othersCard.description,
        button: this.i18n.othersCard.button,
      },
    ];
    return listInfoCard;
  }

  handleCardClicked(cardId: string) {
    if (cardId === CardIds.UNLOCKED_CARD) {
      this.emitPageSelected(ROUTE_NAMES.CLIENT_CANDIDATES_PAGE, NavigationListCandidateHash.UNLOCKED);
    } else if (cardId === CardIds.FAVORITE_CARD) {
      this.emitPageSelected(ROUTE_NAMES.CLIENT_CANDIDATES_PAGE, NavigationListCandidateHash.FAVORITE);
    } else if (cardId === CardIds.SUGGESTED_CARD) {
      this.emitPageSelected(ROUTE_NAMES.CLIENT_CANDIDATES_PAGE, NavigationListCandidateHash.SUGGESTED);
    } else if (cardId === CardIds.OTHERS_CARD) {
      this.emitPageSelected(ROUTE_NAMES.CLIENT_CANDIDATES_PAGE, NavigationListCandidateHash.OTHERS);
    }
  }

  emitPageSelected(routeName: string, hash?: string) {
    this.$emit(EmittedEvents.GO_TO_PAGE, routeName, { hash: hash });
  }
}
