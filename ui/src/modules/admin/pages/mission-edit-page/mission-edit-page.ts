import { Component, Vue, Watch } from 'vue-property-decorator';

import { COMPONENTS_NAMES } from '@modules/components-names';
import MissionInformationForm from '@admin/components/mission-information-form/mission-information-form';
import { MissionInterface } from '@/types/mission.interface';
import WithRender from './mission-edit-page.html?style=./mission-edit-page.scss';

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.ADMIN_MISSION_INFORMATION_FORM]: MissionInformationForm,
  },
})
export default class MissionEditPage extends Vue {
  details: any = {};
  fetchingMissionDetails: boolean = true;
  updatingMission: boolean = false;
  formData = null;

  get missionId(): string {
    return this.$route.params.id;
  }

  get mission(): MissionInterface | undefined {
    return this.details?.mission;
  }

  async getMissionDetails() {
    const params = {
      token: this.$tokenService.getToken(),
      encryptedMissionId: this.missionId,
    };
    this.fetchingMissionDetails = true;
    try {
      this.details = await this.$missionsService.getMissionDetails(params);
    } catch (e) {}
    this.fetchingMissionDetails = false;
  }

  formatDataForMissionForm() {
    return this.mission != null
      ? {
          attributes: this.mission.requirements.attributes,
          code: this.mission.code,
          contractType: this.mission.contractType,
          skills: this.mission.requirements.skills,
          tasks: this.mission.tasks,
          tools: this.mission.requirements.tools,
          missionDates: this.mission.dates,
          missionLocation: this.mission.address,
          missionDistrict: this.mission.district,
          missionCategory: this.mission.category,
          missionDescription: this.mission.description,
          missionAmount: this.mission.amount,
          missionNbWorkers: this.mission.nbWorkers,
        }
      : undefined;
  }

  @Watch('missionId', { immediate: true })
  async updateMissionDetails(): Promise<void> {
    await this.getMissionDetails();
  }
}
