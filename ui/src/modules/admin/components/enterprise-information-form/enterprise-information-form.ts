import { Component, Vue } from 'vue-property-decorator';

import { CreateMissionParams } from '@services/missions.service-utils';
import WithRender from './enterprise-information-form.html?style=./enterprise-information-form.scss';

export type SubmittedData = Pick<
  CreateMissionParams,
  'companyAddress' | 'companyName' | 'companySiren'
>;

interface FormError {
  msg: string;
  invalid: boolean;
}

type FormErrors = { [k: string]: FormError };

@WithRender
@Component
export default class EnterpriseInformationForm extends Vue {
  companyName: string = '';
  companyAddress: string = '';
  companySIREN: string = '';

  errors: FormErrors = {
    companyName: { invalid: null, msg: '🚨 Le champ est invalide' },
    companyAddress: { invalid: null, msg: '🚨 Le champ est invalide' },
    companySIREN: { invalid: null, msg: '🚨 Le champ est invalide' },
  };

  get formCompleted(): boolean {
    return (
      this.errors.companyName.invalid === false &&
      this.errors.companyAddress.invalid === false &&
      this.errors.companySIREN.invalid === false
    );
  }

  public checkInput(e): void {
    const { id, value } = e.target;
    this.errors[id].invalid = this.$inputValidator.isStringBlank(value);
  }

  public nextStep(e): void {
    e.preventDefault();
    if (!this.formCompleted) {
      return;
    }

    const data: SubmittedData = {
      companyName: this.companyName,
      companyAddress: this.companyAddress,
      companySiren: this.companySIREN,
    };
    this.$emit('next', data);
  }
}
