import { MissionDetails } from '@/types/misison-details.interface';
import DialogConfirm from '@admin/components/dialog-confirm/dialog-confirm';
import { Item } from '@components/page/components/menu-item/menu-item';
import Page from '@components/page/page';
import { MissionStatus } from '@constants/mission-status';
import MissionCategories from '@constants/missionCategories';
import MissionDistricts from '@constants/missionDistricts';
import { COMPONENTS_NAMES } from '@modules/components-names';
import FinanceService from '@services/finance.service';
import { Button, Card, Dialog } from 'element-ui';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from './mission-info-page.html?style=./mission-info-page.scss';

export interface MissionInfoPageProps {
  menu: Item[];
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.PAGE]: Page,
    [COMPONENTS_NAMES.ADMIN_DIALOG_CONFIRM]: DialogConfirm,
    [Button.name]: Button,
    [Card.name]: Card,
    [Dialog.name]: Dialog,
  },
})
export default class MissionInfoPage extends Vue implements MissionInfoPageProps {
  @Prop({ required: true })
  menu: Item[];

  details: MissionDetails = {} as any;
  fetchingMissionDetails = true;
  validatingMission = false;

  showConfirmDialog = false;

  get i18n(): { [k: string]: string } {
    return {
      missionStatus: this.missionStatus ? this.$i18nSvc.t(`mission.status.${this.missionStatus}`).toString() : '',
      validate: this.$i18nSvc.t('actions.validate').toString(),
      dialogTitle: this.$i18nSvc.t('dialogs.mission-confirm-validation.title').toString(),
      dialogMessage: this.$i18nSvc.t('dialogs.mission-confirm-validation.message').toString(),
    };
  }

  get missionStatus() {
    return this.details.mission?.status;
  }

  get isStatusForValidation(): boolean {
    return this.missionStatus === MissionStatus.FOR_VALIDATION;
  }

  get missionId(): string {
    return this.$route.params.id;
  }

  missionCategoryName() {
    const category = MissionCategories.find((category) => category.value === this.details.mission.category);
    return category ? category.name : '';
  }

  missionDistrictName() {
    const district = MissionDistricts.find((district) => district.id === this.details.mission.district);
    return district ? district.name : '';
  }

  computeMissionAmount() {
    const workingHours = FinanceService.computeWorkDuration(this.details.mission.dates);
    return FinanceService.addCommission(workingHours * this.details.mission.amount * this.details.mission.nbWorkers);
  }

  async mounted() {
    await this.getMissionDetails();
  }

  openDialog(): void {
    this.showConfirmDialog = true;
  }

  async getMissionDetails(): Promise<void> {
    this.fetchingMissionDetails = true;
    const token = this.$tokenService.getToken();
    const encryptedMissionId = this.missionId;
    const params = { token, encryptedMissionId };
    try {
      this.details = await this.$missionsService.getMissionDetails(params);
    } catch (e) {}
    this.fetchingMissionDetails = false;
  }

  async validateMission(): Promise<void> {
    this.validatingMission = true;
    await this.$missionsService.validateMission(this.missionId);
    this.validatingMission = false;
  }

  @Watch('missionId')
  async onRouteParamsChange() {
    await this.getMissionDetails();
  }
}
