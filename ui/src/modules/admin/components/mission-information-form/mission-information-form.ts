import { MissionDate } from '@/types/mission.interface';
import Chips from '@admin/components/form/chips/chips';
import MissionInformationValidator, {
  MissionInformationValidatorForm,
} from '@admin/validators/mission-information-validator';
import { ContractType } from '@constants/contract-type';
import { Events } from '@constants/events';
import CATEGORIES from '@constants/missionCategories';
import DISTRICTS from '@constants/missionDistricts';
import { Agency } from '@domains/agency';
import { ValidateEnum } from '@libs/prop-validators/validators/validate-enum';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { CreateMissionParams } from '@services/missions.service-utils';
import { Divider, Option, Select } from 'element-ui';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from './mission-information-form.html?style=./mission-information-form.scss';

export type SubmittedData = Pick<
  CreateMissionParams,
  | 'agency'
  | 'attributes'
  | 'category'
  | 'code'
  | 'contractType'
  | 'dates'
  | 'description'
  | 'district'
  | 'doersCount'
  | 'location'
  | 'price'
  | 'skills'
  | 'tasks'
  | 'tools'
>;

interface FormField {
  errorMsg: string;
  valid: boolean;
  validators: Array<(value: string) => boolean>;
  value: string;
}

interface MissionInformationFormProps {
  agency: string;
  attributes: string[];
  code: string;
  contractType: ContractType;
  skills: string[];
  tasks: string[];
  tools: string[];
  missionDates: MissionDate[];
  missionLocation: string;
  missionDistrict: number;
  missionCategory: string;
  missionDescription: string;
  missionAmount: number;
  missionNbWorkers: number;
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.FORM_CHIPS]: Chips,
    [Divider.name]: Divider,
    [Option.name]: Option,
    [Select.name]: Select,
  },
})
export default class MissionInformationForm extends Vue implements MissionInformationFormProps {
  @Prop({ default: '' })
  readonly agency!: string;

  @Prop({ default: () => [] })
  readonly attributes!: string[];

  @Prop({ default: '' })
  readonly code!: string;

  @Prop({
    default: ContractType.FREELANCE,
    validator: ValidateEnum(ContractType),
  })
  readonly contractType!: ContractType;

  @Prop({ default: () => [] })
  readonly skills!: string[];

  @Prop({ default: () => [] })
  readonly tasks!: string[];

  @Prop({ default: () => [] })
  readonly tools!: string[];

  @Prop({ default: () => [{ date: '', timeBegin: '', timeEnd: '' }] })
  readonly missionDates!: MissionDate[];

  @Prop({ default: '' })
  readonly missionLocation!: string;

  @Prop({ default: null })
  readonly missionDistrict!: number;

  @Prop({ default: null })
  readonly missionCategory!: string;

  @Prop({ default: '' })
  readonly missionDescription!: string;

  @Prop({ default: 10 })
  readonly missionAmount!: number;

  @Prop({ default: 1 })
  readonly missionNbWorkers!: number;

  form: MissionInformationValidatorForm = this.createForm();
  agencies: Agency[] = [];

  get dataToWatch(): any {
    return {
      missionLocation: this.missionLocation,
      missionDates: this.missionDates,
      missionCategory: this.missionCategory,
      missionDistrict: this.missionDistrict,
      missionDescription: this.missionDescription,
      missionAmount: this.missionAmount,
      missionNbWorkers: this.missionNbWorkers,
    };
  }

  get contractTypes(): { key: string; value: string }[] {
    return [
      { key: ContractType.CDD, value: 'CDD' },
      { key: ContractType.CDI, value: 'CDI' },
      { key: ContractType.EXTRA, value: 'Extra' },
      { key: ContractType.FREELANCE, value: 'Indépendant' },
      { key: ContractType.SEASONAL, value: 'Saisonnier' },
      { key: ContractType.TEMPORARY, value: 'Intérim' },
    ];
  }

  get categories(): typeof CATEGORIES {
    return CATEGORIES;
  }

  get districts(): typeof DISTRICTS {
    return DISTRICTS;
  }

  async mounted(): Promise<void> {
    this.agencies = await this.$agenciesService.getAllAgencies();
  }

  public addDate(e: MouseEvent) {
    e.preventDefault();
    MissionInformationValidator.addDate(this.form);
    this.emitFormData();
  }

  public removeDate(idx: number): void {
    MissionInformationValidator.removeDate(this.form, idx);
    this.emitFormData();
  }

  public checkInput(e) {
    const { id, value } = e.target;
    MissionInformationValidator.checkInput(this.form, id, value);
    this.emitFormData();
  }

  public emitFormData(): void {
    const event = { data: this.formatData(), completed: false };
    if (MissionInformationValidator.isFormCompleted(this.form)) {
      event.completed = true;
    }
    this.$emit(Events.FORM_COMPLETED, event);
  }

  public formatData(): SubmittedData {
    return {
      agency: this.form.agency.value,
      attributes: this.form.attributes.value,
      code: this.form.code.value,
      contractType: ContractType.FREELANCE,
      skills: this.form.skills.value,
      tasks: this.form.tasks.value,
      tools: this.form.tools.value,
      category: this.form.missionCategory.value,
      dates: this.formatMissionDates(),
      description: this.form.missionDescription.value,
      district: parseInt(this.form.missionDistrict.value),
      doersCount: parseInt(this.form.missionNbWorkers.value),
      location: this.form.missionLocation.value,
      price: parseInt(this.form.missionAmount.value),
    };
  }

  public formatMissionDates(): MissionDate[] {
    return this.form.missionDates.map((dateField: { [k in keyof MissionDate]: FormField }) => ({
      date: dateField.date.value,
      timeBegin: dateField.timeBegin.value,
      timeEnd: dateField.timeEnd.value,
    }));
  }

  public createForm(): MissionInformationValidatorForm {
    return MissionInformationValidator.createForm({
      agency: this.agency,
      attributes: this.attributes,
      category: this.missionCategory,
      code: this.code,
      contractType: this.contractType,
      dates: this.missionDates,
      description: this.missionDescription,
      district: this.missionDistrict,
      location: this.missionLocation,
      nbDoers: this.missionNbWorkers,
      price: this.missionAmount,
      skills: this.skills,
      tasks: this.tasks,
      tools: this.tools,
    });
  }

  @Watch('dataToWatch', { deep: true, immediate: true })
  updateForm(): void {
    this.form = this.createForm();
  }
}
