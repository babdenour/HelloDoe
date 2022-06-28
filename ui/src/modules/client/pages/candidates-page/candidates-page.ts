import { MissionInterface } from '@/types/mission.interface';
import CandidateList from '@client/components/candidate-list/candidate-list';
import CandidateVideoCvSection from '@client/components/candidate-video-cv-section/candidate-video-cv-section';
import CardDialog, { CardDialogProps } from '@client/components/card-dialog/card-dialog';
import Dialog from '@client/components/dialog/dialog';
import { Candidate } from '@domains/candidate';
import { CandidateFactory } from '@factories/candidate.factory';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { findIndex } from 'lodash';
import { Component, Vue, Watch } from 'vue-property-decorator';
import WithRender from './candidates-page.html?style=./candidates-page.scss';

export enum DialogName {
  BOOST = 'boost-my-ad',
  SPONSOR = 'sponsor-my-ad',
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.CLIENT_CANDIDATE_LIST]: CandidateList,
    [COMPONENTS_NAMES.CLIENT_CANDIDATE_VIDEO_CV_SECTION]: CandidateVideoCvSection,
    [COMPONENTS_NAMES.CLIENT_DIALOG]: Dialog,
    [COMPONENTS_NAMES.CLIENT_CARD_DIALOG]: CardDialog,
  },
})
export default class CandidatesPage extends Vue {
  selectedCandidateId: string = '';

  isDialogOpen: boolean = false;

  dialogName: string = '';

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

  get currentMission(): MissionInterface {
    return this.$missionsService.getCurrent();
  }

  get i18n() {
    return {
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

  get cardDialogInfo(): CardDialogProps {
    if (this.dialogName === DialogName.BOOST) {
      return {
        title: this.i18n.boostInfoDialog.title,
        description: this.i18n.boostInfoDialog.description,
        cta: this.i18n.boostInfoDialog.cta,
        iconSrc: this.i18n.boostInfoDialog.iconSrc,
        options: this.i18n.boostInfoDialog.options,
      };
    }
    if (this.dialogName === DialogName.SPONSOR) {
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
    await this.$candidateSvc.fetchNextPage(this.currentMission.id);
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

  displayBoostMyAdDialog() {
    this.dialogName = DialogName.BOOST;
  }

  displaySponsorMyAdDialog() {
    this.dialogName = DialogName.SPONSOR;
  }

  @Watch('dialogName', { immediate: true })
  openDialog() {
    if (this.dialogName === DialogName.BOOST) {
      this.isDialogOpen = true;
    } else if (this.dialogName === DialogName.SPONSOR) {
      this.isDialogOpen = true;
    }
  }

  @Watch('isDialogOpen', { immediate: true })
  onDialogOpenUpdated() {
    if (!this.isDialogOpen) {
      this.dialogName = '';
    }
  }

  handleCardDialogCtaClicked(): void {
    if (this.dialogName === DialogName.BOOST) {
      this.$navigationSvc.goToBoostTypeform();
    } else if (this.dialogName === DialogName.SPONSOR) {
      this.$navigationSvc.goToSponsoTypeform();
    }
  }

  setCandidateFavorite(candidateId: string, status: boolean): void {
    if (status) {
      this.$candidateSvc.addDoerToFavorite(this.currentMission.id, candidateId);
    } else {
      this.$candidateSvc.removeDoerFromFavorite(this.currentMission.id, candidateId);
    }
  }
}
