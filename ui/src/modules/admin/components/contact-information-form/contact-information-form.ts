import { Component, Vue } from 'vue-property-decorator';

import { CreateMissionParams } from '@services/missions.service-utils';
import WithRender from './contact-information-form.html?style=./contact-information-form.scss';

export type SubmittedData = Pick<
  CreateMissionParams,
  'contactEmail' | 'contactFirstName' | 'contactLastName' | 'contactPhone'
>;

@WithRender
@Component
export default class ContactInformationForm extends Vue {
  contactFirstName: string = '';
  contactLastName: string = '';
  contactEmail: string = '';
  contactPhone: string = '';

  errors = {
    contactFirstName: {
      invalid: null,
      msg: '🚨 Le champ est invalide',
      validators: [this.$inputValidator.isStringSet],
    },
    contactLastName: {
      invalid: null,
      msg: '🚨 Le champ est invalide',
      validators: [this.$inputValidator.isStringSet],
    },
    contactEmail: {
      invalid: null,
      msg: '🚨 Le champ est invalide',
      validators: [this.$inputValidator.isStringSet, this.$inputValidator.isEmailValid],
    },
    contactPhone: {
      invalid: null,
      msg: '🚨 Le champ est invalide',
      validators: [this.$inputValidator.isStringSet, this.$inputValidator.isPhoneValid],
    },
  };

  enableNextButton: boolean = false;

  public checkInput(e): void {
    const { id, value } = e.target;

    this.errors[id].invalid = !this.errors[
      id
    ].validators.every((validator: (value: string) => boolean) => validator(value));

    this.enableNextButton = this.isFormCompleted();
  }

  public isFormCompleted(): boolean {
    return (
      this.errors.contactFirstName.invalid === false &&
      this.errors.contactLastName.invalid === false &&
      this.errors.contactEmail.invalid === false &&
      this.errors.contactPhone.invalid === false
    );
  }

  public previousStep(e: MouseEvent): void {
    e.preventDefault();
    this.$emit('previous', this.formatData());
  }

  public nextStep(e: MouseEvent): void {
    e.preventDefault();
    if (this.isFormCompleted()) {
      this.$emit('next', this.formatData());
    }
  }

  private formatData(): SubmittedData {
    return {
      contactFirstName: this.contactFirstName,
      contactLastName: this.contactLastName,
      contactEmail: this.contactEmail,
      contactPhone: this.contactPhone,
    };
  }
}
