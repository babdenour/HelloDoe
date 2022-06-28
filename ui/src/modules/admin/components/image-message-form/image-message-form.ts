import { FormValidation, formValidationFailure, formValidationSuccess, ValidatableForm } from '@/types/validatable-form';
import { Rule } from '@libs/old-form/types/rule';
import { isUrl } from '@libs/old-form/validators/is-url';
import { stringNotBlank } from '@libs/old-form/validators/string-not-blank';
import { Form as FormEl, FormItem, Image, Input } from 'element-ui';
import { cloneDeep } from 'lodash';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from './image-message-form.html?style=./image-message-form.scss';

interface Rules {
  url: Rule<string>[];
}

export interface Form {
  url: string;
}

export interface ImageMessageFormProps {
  url: string;
}

@WithRender
@Component({
  components: {
    [FormEl.name]: FormEl,
    [FormItem.name]: FormItem,
    [Image.name]: Image,
    [Input.name]: Input,
  },
})
export default class ImageMessageForm extends Vue implements ImageMessageFormProps, ValidatableForm<Form> {
  @Prop({ default: '' })
  url!: string;

  form: Form = this.createForm();
  previewUrl: string = '';
  isUrlValid: boolean = true;

  $refs!: {
    form: FormEl;
  };

  get i18n() {
    return {
      errorEmptyField: this.$i18nSvc.t('forms.errors.empty-field'),
      errorUrlInvalid: this.$i18nSvc.t('forms.errors.url-invalid'),
      imageTitle: this.$i18nSvc.t('forms.image-message.image-title'),
      imageLoadingError: this.$i18nSvc.t('forms.errors.image-loading-error'),
      urlExample: this.$i18nSvc.t('placeholders.url-example'),
    };
  }

  get rules(): Rules {
    return {
      url: [
        {
          trigger: 'blur',
          message: this.i18n.errorEmptyField,
          validator: stringNotBlank,
        },
        {
          trigger: 'blur',
          message: this.i18n.errorUrlInvalid,
          validator: isUrl,
        },
        {
          trigger: 'blur',
          message: this.i18n.imageLoadingError,
          validator: this.urlValidator,
        },
      ],
    };
  }

  get formDataToWatch(): any {
    return {
      url: this.url,
    };
  }

  urlValidator(_, __, callback): void {
    if (!this.isUrlValid) {
      callback(new Error());
    } else {
      callback();
    }
  }

  loadPreview(): void {
    this.previewUrl = this.form.url;
  }

  setUrlValid(): void {
    this.isUrlValid = true;
    this.$refs.form.validateField('url');
  }

  setUrlInvalid(): void {
    this.isUrlValid = false;
    this.$refs.form.validateField('url');
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
      url: cloneDeep(this.url) || '',
    };
  }

  @Watch('formDataToWatch', { immediate: true, deep: true })
  updateForm(): void {
    this.form = this.createForm();
    this.loadPreview();
  }
}
