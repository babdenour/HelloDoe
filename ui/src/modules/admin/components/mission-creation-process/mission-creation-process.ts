import { MissionDate } from '@/types/mission.interface';
import ContactInformationForm, {
  SubmittedData as ContactData,
} from '@admin/components/contact-information-form/contact-information-form';
import CreditCardPaiement from '@admin/components/credit-card-paiement/credit-card-paiement';
import EnterpriseInformationForm, {
  SubmittedData as CompanyData,
} from '@admin/components/enterprise-information-form/enterprise-information-form';
import { SubmittedData as MissionData } from '@admin/components/mission-information-form/mission-information-form';
import MissionInformationStep from '@admin/components/mission-information-step/mission-information-step';
import ErrorKeys from '@constants/ErrorKeys';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { CreateMissionParams } from '@services/missions.service-utils';
import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './mission-creation-process.html?style=./mission-creation-process.scss';

interface StepData {
  0?: CompanyData;
  1?: ContactData;
  2?: MissionData;
}

interface MissionCreationProcessProps {
  payable: boolean;
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.ADMIN_CONTACT_INFORMATION_FORM]: ContactInformationForm,
    [COMPONENTS_NAMES.ADMIN_CREDIT_CARD_PAIEMENT]: CreditCardPaiement,
    [COMPONENTS_NAMES.ADMIN_ENTERPRISE_INFORMATION_FORM]: EnterpriseInformationForm,
    [COMPONENTS_NAMES.ADMIN_MISSION_INFORMATION_STEP]: MissionInformationStep,
  },
})
export default class MissionCreationProcess extends Vue implements MissionCreationProcessProps {
  @Prop({ default: false })
  payable!: boolean;

  currentStep: number = 0;
  totalSteps: number = 4;
  stepsData: StepData = {};
  ErrorKeys: string = '';
  serverError: string = null;
  postingMission: boolean = false;

  get missionPrice(): number {
    return this.stepsData[2]?.price ?? 0;
  }

  get missionDoersCount(): number {
    return this.stepsData[2]?.doersCount ?? 0;
  }

  get missionDates(): MissionDate[] {
    return this.stepsData[2]?.dates || [];
  }

  public previousStep(data): void {
    this.stepsData[this.currentStep] = data;
    this.currentStep--;
  }

  public nextStep(data): void {
    this.stepsData[this.currentStep] = data;
    this.currentStep++;
  }

  public async endHookCardToken(data): Promise<void> {
    this.stepsData[this.currentStep] = data;
    this.currentStep += 1;

    const missionInfo = {
      ...this.stepsData[0],
      ...this.stepsData[1],
      ...this.stepsData[2],
    };

    await this.createMission(missionInfo);
  }

  private async createMission(missionInfo: CreateMissionParams): Promise<void> {
    try {
      this.postingMission = true;
      await this.$missionsService.createMissionNoPayment(missionInfo);
    } catch (err) {
      this.serverError = ErrorKeys.NOT_SPECIFIED;
    } finally {
      this.postingMission = false;
    }
  }
}
