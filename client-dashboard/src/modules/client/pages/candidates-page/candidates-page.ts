import BoostMyAdDialog from '@client/components/boost-my-ad-dialog/boost-my-ad-dialog';
import CandidateList from '@client/components/candidate-list/candidate-list';
import CandidateVideoCvSection from '@client/components/candidate-video-cv-section/candidate-video-cv-section';
import SponsoMyAdDialog from '@client/components/sponso-my-ad-dialog/sponso-my-ad-dialog';
import { Candidate } from '@domains/candidate';
import { Client } from '@domains/client';
import { Mission } from '@domains/mission';
import { CandidateFactory } from '@factories/candidate.factory';
import { COMPONENTS_NAMES } from '@modules/components-names';
import findIndex from 'lodash/findIndex';
import { Component, Vue, Watch } from 'vue-property-decorator';
import WithRender from './candidates-page.html?style=./candidates-page.scss';

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.CLIENT_CANDIDATE_LIST]: CandidateList,
    [COMPONENTS_NAMES.CLIENT_CANDIDATE_VIDEO_CV_SECTION]: CandidateVideoCvSection,
    [COMPONENTS_NAMES.CLIENT_SPONSO_MY_AD_DIALOG]: SponsoMyAdDialog,
    [COMPONENTS_NAMES.CLIENT_BOOST_MY_AD_DIALOG]: BoostMyAdDialog,
  },
})
export default class CandidatesPage extends Vue {
  selectedCandidateId: string = '';

  isBoostMyAddDialogOpen: boolean = false;

  isSponsoMyAddDialogOpen: boolean = false;

  get selectedCandidate(): Candidate {
    return this.listCandidate.find((candidate: Candidate) => candidate.id === this.selectedCandidateId) || CandidateFactory.create();
  }

  get listCandidate(): Candidate[] {
    return this.$candidateSvc.getList();
  }

  get hasMoreCandidates(): boolean {
    return !this.$candidateSvc.isLastPageReached();
  }

  get missionCode(): string {
    return this.$route.params.missionCode;
  }

  get hashAnkor(): string {
    return this.$route.hash;
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

  get i18n() {
    return {
      sponsoInfoDialog: {
        title: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.title'),
        description: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.description'),
        cta: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.cta'),
        iconSrc: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.iconSrc'),
        options: [
          { text: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.option1') },
          { text: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.option2') },
          { text: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.option3') },
          { text: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.option4') },
          { text: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.option5') },
          { text: this.$i18nSvc.t('pages.client.faq-page.sponso-info-dialog.option6') },
        ],
      },
    };
  }

  @Watch('listCandidate', { immediate: true })
  listCandidateUpdated(): void {
    if (this.listCandidate.length > 0 && this.selectedCandidateId === '') {
      this.selectedCandidateId = this.listCandidate[0].id;
    }
  }

  @Watch('currentMission')
  async onCurrentMissionUpdated(): Promise<void> {
    await this.fetchNextCandidatesPage();
  }

  async fetchNextCandidatesPage(): Promise<void> {
    if (this.currentMission) {
      await this.$candidateSvc.fetchNextPage(this.currentMission.id);
    }
  }

  updateSelectedCandidateId(candidateId: string): void {
    this.selectedCandidateId = candidateId;
  }

  selectNextCandidate(): void {
    const selectedCandidateIdx: number = findIndex(this.listCandidate, { id: this.selectedCandidateId });

    const nextCandidateIdx: number = selectedCandidateIdx + 1;
    if (selectedCandidateIdx > -1 && nextCandidateIdx < this.listCandidate.length) {
      this.selectedCandidateId = this.listCandidate[nextCandidateIdx].id;
    }
  }

  selectPreviousCandidate(): void {
    const selectedCandidateIdx: number = findIndex(this.listCandidate, { id: this.selectedCandidateId });

    const previousCandidateIdx: number = selectedCandidateIdx - 1;
    if (selectedCandidateIdx > -1 && previousCandidateIdx >= 0) {
      this.selectedCandidateId = this.listCandidate[previousCandidateIdx].id;
    }
  }

  async redirectToCheckout(): Promise<void> {
    try {
      await this.$checkoutSvc.redirectToCheckoutForMission(this.currentMission.id);
      // eslint-disable-next-line no-empty
    } catch (_) {}
  }

  displayBoostMyAdDialog(): void {
    this.isBoostMyAddDialogOpen = true;
  }

  displaySponsorMyAdDialog(): void {
    this.isSponsoMyAddDialogOpen = true;
  }

  setCandidateFavorite(candidateId: string, status: boolean): void {
    if (status) {
      this.$candidateSvc.addDoerToFavorite(this.currentMission.id, candidateId);
    } else {
      this.$candidateSvc.removeDoerFromFavorite(this.currentMission.id, candidateId);
    }
  }

  @Watch('selectedCandidateId', { immediate: true })
  setCandidateSeen(candidateId: string): void {
    if (this.selectedCandidateId) {
      this.$candidateSvc.setCandidateAsSeen(this.currentMission.id, candidateId);
    }
  }
}
