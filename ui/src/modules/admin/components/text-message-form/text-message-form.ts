import { FormValidation, formValidationFailure, formValidationSuccess, ValidatableForm } from '@/types/validatable-form';
import { Rule } from '@libs/old-form/types/rule';
import { stringNotBlank } from '@libs/old-form/validators/string-not-blank';
import { Form as FormEl, FormItem, Input } from 'element-ui';
import { cloneDeep } from 'lodash';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from './text-message-form.html?style=./text-message-form.scss';

interface Rules {
  text: Rule<string>[];
}

export interface Form {
  text: string;
}

export interface TextMessageFormProps {
  text: string;
}

@WithRender
@Component({
  components: {
    [FormEl.name]: FormEl,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
  },
})
export default class TextMessageForm extends Vue implements TextMessageFormProps, ValidatableForm<Form> {
  @Prop({ default: '' })
  text!: string;

  form: Form = this.createForm();

  $refs!: {
    form: FormEl;
  };

  get i18n() {
    return {
      errorEmptyField: this.$i18nSvc.t('forms.errors.empty-field'),
      textExample: this.$i18nSvc.t('placeholders.text-example'),
      textTitle: this.$i18nSvc.t('forms.text-message.text-title'),
    };
  }

  get rules(): Rules {
    return {
      text: [
        {
          trigger: 'blur',
          message: this.i18n.errorEmptyField as string,
          validator: stringNotBlank,
        },
      ],
    };
  }

  get formDataToWatch(): any {
    return {
      text: this.text,
    };
  }

  async validateForm(): Promise<FormValidation<Form>> {
    try {
      await this.$refs['form'].validate();

      return formValidationSuccess(this.form);
    } catch (e) {
      return formValidationFailure();
    }
  }

  createForm(): Form {
    return {
      text: cloneDeep(this.text) || '',
    };
  }

  @Watch('formDataToWatch', { immediate: true, deep: true })
  updateForm(): void {
    this.form = this.createForm();
  }
}
