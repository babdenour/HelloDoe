import ActionListItem from '@client/components/action-list-item/action-list-item';
import Chip from '@client/components/chip/chip';
import Emoji from '@client/components/emoji/emoji';
import { Candidate, CandidateStatus } from '@domains/candidate';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { NavigationListCandidateHash } from '@services/navigation.service';
import { Component, Emit, Prop, Vue, Watch } from 'vue-property-decorator';
import CandidateListItem from '../candidate-list-item/candidate-list-item';
import WithRender from './candidate-list.html?style=./candidate-list.scss';

export interface CandidateListProps {
  candidates: Candidate[];
  hasMoreCandidates: boolean;
  selectedCandidateId: string;
}

export enum EmittedEvents {
  CANDIDATE_SELECTED = 'candidate-selected',
  REDIRECT_TO_CHECKOUT = 'redirect-to-checkout',
  SCROLLED_TO_BOTTOM = 'scrolled-to-bottom',
  BOOST_MY_AD = 'boost-my-ad',
  SPONSOR_MY_AD = 'sponsor-my-ad',
  SET_CANDIDATE_FAVORITE = 'set-candidate-favorite',
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.CLIENT_CANDIDATE_LIST_ITEM]: CandidateListItem,
    [COMPONENTS_NAMES.CLIENT_ACTION_LIST_ITEM]: ActionListItem,
    [COMPONENTS_NAMES.CHIP]: Chip,
    [COMPONENTS_NAMES.EMOJI]: Emoji,
  },
})
export default class CandidateList extends Vue implements CandidateListProps {
  @Prop({ default: () => [] })
  readonly candidates: Candidate[];

  @Prop({ type: Boolean, default: false })
  readonly hasMoreCandidates: boolean;

  @Prop()
  readonly selectedCandidateId: string;

  @Prop()
  readonly hash: string;

  get i18n(): { [k: string]: string } {
    return {
      UNLOCKED: this.$i18nSvc.t('pages.client.candidates-page.UNLOCKED'),
      FAVORITE: this.$i18nSvc.t('pages.client.candidates-page.FAVORITE'),
      SUGGESTED: this.$i18nSvc.t('pages.client.candidates-page.SUGGESTED'),
      OTHER: this.$i18nSvc.t('pages.client.candidates-page.OTHER'),
      paiementCardTitle: this.$i18nSvc.t('pages.client.candidates-page.button-card.paiement.PAIEMENT_CARD_TITLE'),
      paiementCardSubTitle: this.$i18nSvc.t('pages.client.candidates-page.button-card.paiement.PAIEMENT_CARD_SUBTITLE'),
      boostAdCardTitle: this.$i18nSvc.t('pages.client.candidates-page.button-card.boost-ad.title'),
      boostAdCardSubtitle: this.$i18nSvc.t('pages.client.candidates-page.button-card.boost-ad.subtitle'),
      sponsorAdCardTitle: this.$i18nSvc.t('pages.client.candidates-page.button-card.sponsor-ad.title'),
      sponsorAdCardSubtitle: this.$i18nSvc.t('pages.client.candidates-page.button-card.sponsor-ad.subtitle'),
    };
  }

  get candidatesUnlocked(): Candidate[] {
    return this.candidates.filter((candidate: Candidate) => candidate.status === CandidateStatus.UNLOCKED);
  }

  get candidatesFavorite(): Candidate[] {
    return this.candidates.filter((candidate: Candidate) => candidate.status === CandidateStatus.FAVORITE);
  }

  get candidatesPreselected(): Candidate[] {
    return this.candidates.filter((candidate: Candidate) => candidate.status === CandidateStatus.PRESELECTED);
  }

  get candidatesOthers(): Candidate[] {
    return this.candidates.filter((candidate: Candidate) => candidate.status === CandidateStatus.OTHER);
  }

  get candidatesUnlockedCount(): string {
    return this.candidatesUnlocked.length.toString();
  }

  get candidatesFavoriteCount(): string {
    return this.candidatesFavorite.length.toString();
  }

  get candidatesPreselectedCount(): string {
    return this.candidatesPreselected.length.toString();
  }

  get candidatesOthersCount(): string {
    return this.candidatesOthers.length.toString();
  }

  isCandidateSeen(candidate: Candidate): boolean {
    return candidate.isSeen;
  }

  emitScrolledToBottomEvent(): void {
    this.$emit(EmittedEvents.SCROLLED_TO_BOTTOM);
  }

  getCandidateImgUrl(candidate: Candidate): string {
    return candidate.videoCvs?.[0]?.imgUrl || '';
  }

  get refUnlocked(): string {
    return NavigationListCandidateHash.UNLOCKED;
  }

  get refFavorite(): string {
    return NavigationListCandidateHash.FAVORITE;
  }

  get refSuggested(): string {
    return NavigationListCandidateHash.SUGGESTED;
  }

  get refOthers(): string {
    return NavigationListCandidateHash.OTHERS;
  }

  isCandidateSelected(candidateId: string): boolean {
    return candidateId === this.selectedCandidateId;
  }

  @Emit(EmittedEvents.CANDIDATE_SELECTED)
  emitCandidateSelected(candidateId: string): string {
    return candidateId;
  }

  @Emit(EmittedEvents.REDIRECT_TO_CHECKOUT)
  emitRedirectToCheckout(): void {}

  @Emit(EmittedEvents.BOOST_MY_AD)
  emitBoostMyAd(): void {}

  @Emit(EmittedEvents.SPONSOR_MY_AD)
  emitSponsorMyAd(): void {}

  @Watch('selectedCandidateId')
  scrollCandidateIntoView(): void {
    const candidateRefList: (Vue | undefined)[] = this.$refs[this.selectedCandidateId] as (Vue | undefined)[];
    const candidateRef: Vue | undefined = candidateRefList?.[0];

    if (candidateRef) {
      candidateRef.$el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  @Watch('hash', { immediate: true })
  scrollToAnkorHash(hash: string): void {
    if (this.candidates?.length > 0 && hash) {
      this.scrollToAnchor(hash);
    }
  }

  @Watch('candidates', { immediate: true })
  scrollToAnkorReLoad(newCandidates: Candidate[], oldCandidates: Candidate[]): void {
    if (oldCandidates?.length === 0 && newCandidates.length > 0 && !!this.hash) {
      this.scrollToAnchor(this.hash);
    }
  }

  async scrollToAnchor(hash: string): Promise<void> {
    await this.$nextTick();
    hash = hash.replace('#', '');
    const ref: HTMLElement | undefined = this.$refs[hash] as HTMLElement | undefined;

    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth' });
    }
  }

  emitSetCandidateFavorite(candidateId: string): void {
    const candidate: Candidate = this.candidates.find((candidate: Candidate) => candidate.id === candidateId);
    if (candidate) {
      const shouldAddToFavorite = candidate.status !== CandidateStatus.FAVORITE;
      this.$emit(EmittedEvents.SET_CANDIDATE_FAVORITE, candidateId, shouldAddToFavorite);
    }
  }
}
