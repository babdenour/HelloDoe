import { MissionDate } from '@/types/mission.interface';
import { ContractType } from '@constants/contract-type';
import { isArray, values } from 'lodash';
import Vue from 'vue';

type AbstractField = FormField<any> | AbstractForm[];

interface AbstractForm {
  [k: string]: AbstractField;
}

interface FormField<V> {
  errorMsg: string;
  valid: boolean;
  validators: Array<(value: string) => boolean>;
  value: V;
}

export interface MissionInformationValidatorForm extends AbstractForm {
  agency: FormField<string>;
  attributes: FormField<string[]>;
  code: FormField<string>;
  contractType: FormField<string>;
  skills: FormField<string[]>;
  tasks: FormField<string[]>;
  tools: FormField<string[]>;
  missionDates: { [k in keyof MissionDate]: FormField<string> }[];
  missionLocation: FormField<string>;
  missionDistrict: FormField<string>;
  missionCategory: FormField<string>;
  missionDescription: FormField<string>;
  missionAmount: FormField<string>;
  missionNbWorkers: FormField<string>;
}

interface MissionInformationValidatorCreateFormParams {
  agency: string;
  attributes?: string[];
  category: string;
  code: string;
  contractType: ContractType;
  dates: MissionDate[];
  description: string;
  district: number;
  location: string;
  nbDoers: number;
  price: number;
  skills?: string[];
  tasks?: string[];
  tools?: string[];
}

export default class MissionInformationValidator {
  private static readonly inputValidator = Vue.prototype.$inputValidator;

  public static createForm({
    agency,
    attributes = [],
    category,
    code,
    contractType,
    dates,
    description,
    district,
    location,
    nbDoers,
    price,
    skills = [],
    tasks = [],
    tools = [],
  }: MissionInformationValidatorCreateFormParams): MissionInformationValidatorForm {
    return {
      agency: {
        errorMsg: '🚨 Le champ est invalide',
        valid: null,
        validators: [this.inputValidator.isStringSet],
        value: agency,
      },
      attributes: {
        errorMsg: '',
        valid: true,
        validators: [],
        value: attributes,
      },
      code: {
        errorMsg: '🚨 Le champ est invalide',
        valid: null,
        validators: [this.inputValidator.isStringSet],
        value: code,
      },
      contractType: {
        errorMsg: '',
        valid: true,
        validators: [],
        value: contractType,
      },
      skills: {
        errorMsg: '',
        valid: true,
        validators: [],
        value: skills,
      },
      tasks: {
        errorMsg: '',
        valid: true,
        validators: [],
        value: tasks,
      },
      tools: {
        errorMsg: '',
        valid: true,
        validators: [],
        value: tools,
      },
      missionDates: dates.map((date) => this.newDate(date.date, date.timeBegin, date.timeEnd)),
      missionLocation: {
        valid: null,
        value: location,
        errorMsg: '🚨 Le champ est invalide',
        validators: [this.inputValidator.isStringSet],
      },
      missionDistrict: {
        valid: null,
        value: String(district),
        errorMsg: '🚨 Le champ est invalide',
        validators: [this.inputValidator.isStringSet],
      },
      missionCategory: {
        valid: null,
        value: category,
        errorMsg: '🚨 Le champ est invalide',
        validators: [this.inputValidator.isStringSet],
      },
      missionDescription: {
        valid: null,
        value: description,
        errorMsg: '🚨 Le champ est invalide',
        validators: [this.inputValidator.isStringSet],
      },
      missionAmount: {
        valid: true,
        value: String(price),
        errorMsg: `🚨 La rémunération minimale est de 10€/h.`,
        validators: [this.inputValidator.isStringSet, this.inputValidator.isNumberMin(10)],
      },
      missionNbWorkers: {
        valid: true,
        value: String(nbDoers),
        errorMsg: `🚨 Au moins un travailleur doit être appelé.`,
        validators: [this.inputValidator.isStringSet, this.inputValidator.isNumberMin(1)],
      },
    };
  }

  public static addDate(form: MissionInformationValidatorForm): void {
    form.missionDates.push(this.newDate());
  }

  public static removeDate(form: MissionInformationValidatorForm, idx: number): void {
    if (idx < form.missionDates.length && form.missionDates.length > 1) {
      form.missionDates.splice(idx, 1);
    }
  }

  public static checkInput(
    form: MissionInformationValidatorForm,
    inputId: string,
    value: string
  ): void {
    if (inputId.startsWith('missionDate')) {
      const idx = parseInt(inputId.replace(/[A-Za-z]/g, ''));
      const key = inputId.replace(/(mission|[0-9])/g, '').toLowerCase();
      form.missionDates[idx][key].valid = this.inputValidator.isStringSet(value);
    } else if (inputId.startsWith('missionTimeBegin') || inputId.startsWith('missionTimeEnd')) {
      const idx = parseInt(inputId.replace(/[A-Za-z]/g, ''));
      let key = inputId.replace(/(mission|[0-9])/g, '');
      key = key[0].toLowerCase() + key.substring(1);

      // Check that time is not empty
      if (this.inputValidator.isStringSet(value)) {
        form.missionDates[idx][key].valid = true;
        // Check that begin time is before end time
        if (form.missionDates[idx]['timeBegin'].value >= form.missionDates[idx]['timeEnd'].value) {
          form.missionDates[idx]['timeEnd'].valid = false;
          form.missionDates[idx][
            'timeEnd'
          ].errorMsg = `L'horaire de fin est doit être après l'horaire de début`;
        } else {
          form.missionDates[idx]['timeEnd'].valid = true;
        }
      } else {
        form.missionDates[idx][key].valid = false;
        form.missionDates[idx][key].errorMsg = `L'horaire doit être indiqué`;
      }
    } else {
      (form[inputId] as any).valid = (form[
        inputId
      ] as any).validators.every((validator: (value: string) => boolean) => validator(value));
    }
  }

  public static isFormCompleted(form: MissionInformationValidatorForm): boolean {
    return MissionInformationValidator.isFormValid(form as AbstractForm);
  }

  private static isFormValid(form: AbstractForm): boolean {
    return values(form).every(MissionInformationValidator.isFieldValid);
  }

  private static isFieldValid(field: AbstractField): boolean {
    if (isArray(field)) {
      return (field as AbstractForm[]).every(MissionInformationValidator.isFormValid);
    } else {
      return (field as FormField<any>).valid === true;
    }
  }

  private static newDate(
    date: string = '',
    timeBegin: string = '',
    timeEnd: string = ''
  ): { [k in keyof MissionDate]: FormField<string> } {
    return {
      date: { valid: null, errorMsg: '🚨 Le champ est invalide', validators: [], value: date },
      timeBegin: {
        valid: null,
        errorMsg: '🚨 Le champ est invalide',
        validators: [],
        value: timeBegin,
      },
      timeEnd: {
        valid: null,
        errorMsg: '🚨 Le champ est invalide',
        validators: [],
        value: timeEnd,
      },
    };
  }
}
