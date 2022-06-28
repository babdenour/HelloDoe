import { MissionDetails } from '@/types/misison-details.interface';
import Broadcast from '@admin/components/broadcast/broadcast';
import { Item } from '@components/page/components/menu-item/menu-item';
import Page from '@components/page/page';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Button, Card, Col, Divider, Row } from 'element-ui';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from './candidate-list-page.html?style=./candidate-list-page.scss';

interface CandidateListProps {
  menu: Item[];
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.PAGE]: Page,
    [Button.name]: Button,
    [Card.name]: Card,
    [Col.name]: Col,
    [Divider.name]: Divider,
    [Row.name]: Row,
    Broadcast,
  },
})
export default class CandidatesList extends Vue implements CandidateListProps {
  @Prop({ required: true })
  menu: Item[];

  nbWorkers = 0;
  candidates = [];
  fetchingCandidates = false;

  @Watch('$route.params.id')
  onRouteParamsChange(newId, oldId) {
    this.getCandidates();
  }

  async mounted() {
    this.getCandidates();

    const token = this.$tokenService.getToken();
    const encryptedMissionId = this.$route.params.id;
    const params = { token, encryptedMissionId };
    try {
      const missionDetails: MissionDetails = await this.$missionsService.getMissionDetails(params);
      this.nbWorkers = missionDetails.mission.nbWorkers;
    } catch (e) {
      this.$toastService.error('Erreur lors de la récupération des détails de la mission');
    }
  }

  get nbHired(): number {
    let count = 0;
    this.candidates.forEach((c) => {
      if (c.hired) count++;
    });
    return count;
  }

  get missionId(): string {
    return this.$route.params.id;
  }

  async getCandidates() {
    this.fetchingCandidates = true;

    const token = this.$tokenService.getToken();
    const encryptedMissionId = this.$route.params.id;
    const params = { token, encryptedMissionId };

    try {
      const candidates: any[] = (await this.$missionsService.getCandidates(params)) as any[];
      candidates.forEach((candidate) => {
        candidate.sendingEnroll = false;
        candidate.enrollSent = false;
      });

      this.candidates = this.sortCandidates(candidates);
    } catch (e) {
      this.$toastService.error('Erreur lors de la récupération des candidats');
    }
    this.fetchingCandidates = false;
  }

  async enroll(workerId) {
    const worker = this.candidates.find((w) => w.id === workerId);
    worker.sendingEnroll = true;

    const token = this.$tokenService.getToken();
    const missionId = this.$route.params.id;

    try {
      await this.$missionsService.enrollCandidate(token, missionId, workerId);
      worker.hired = true;
      worker.enrollSent = true;
      this.candidates = this.sortCandidates(this.candidates);
    } catch (e) {
      this.$toastService.error('Erreur lors de la sélection du candidat');
    }
    worker.sendingEnroll = false;
  }

  sortCandidates(candidates) {
    let sortedCandidates = Object.assign([], candidates);
    sortedCandidates.sort((a, b) => {
      if (a.hired && b.hired) return 0;
      else if (a.hired) return -1;
      else return 1;
    });
    return sortedCandidates;
  }
}
