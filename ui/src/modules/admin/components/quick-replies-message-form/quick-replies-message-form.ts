import { FormValidation, formValidationFailure, formValidationSuccess, ValidatableForm } from '@/types/validatable-form';
import { QuickRepliesChoice, QuickRepliesMessage } from '@domains/quick-replies-message';
import { QuickRepliesMessageFactory } from '@factories/quick-replies-message.factory';
import { Rule } from '@libs/old-form/types/rule';
import { stringNotBlank } from '@libs/old-form/validators/string-not-blank';
import { Button, Col, Form as FormEl, FormItem, Input, Row, Slider } from 'element-ui';
import { cloneDeep } from 'lodash';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from './quick-replies-message-form.html?style=./quick-replies-message-form.scss';

interface Rules {
  text: Rule<QuickRepliesMessage['text']>[];
  choiceText: Rule<QuickRepliesChoice['text']>[];
}

export interface Form {
  text: string;
  choices: QuickRepliesChoice[];
}

export interface QuickRepliesMessageFormProps {
  text: string;
  choices: QuickRepliesChoice[];
}

@WithRender
@Component({
  components: {
    [Button.name]: Button,
    [Col.name]: Col,
    [FormEl.name]: FormEl,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Row.name]: Row,
    [Slider.name]: Slider,
  },
})
export default class QuickRepliesMessageForm extends Vue implements QuickRepliesMessageFormProps, ValidatableForm<Form> {
  @Prop({ default: '' })
  text!: string;

  @Prop({ default: () => [] })
  choices!: QuickRepliesChoice[];

  form: Form = this.createForm();

  readonly quickReplyMaxLength: number = 20;
  readonly scoreMin: number = 0;
  readonly scoreMax: number = 10;

  $refs!: {
    form: FormEl;
  };

  get i18n() {
    return {
      answerExample: this.$i18nSvc.t('placeholders.answer-example'),
      choiceAdd: this.$i18nSvc.t('actions.choice-add'),
      choicesTitle: this.$i18nSvc.t('forms.quick-replies-message.choices-title'),
      errorEmptyField: this.$i18nSvc.t('forms.errors.empty-field'),
      questionExample: this.$i18nSvc.t('placeholders.question-example'),
      questionTitle: this.$i18nSvc.t('forms.quick-replies-message.question-title'),
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
      choiceText: [
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
      choices: this.choices,
    };
  }

  get canDeleteQuickReply(): boolean {
    return this.form.choices.length > 2;
  }

  addChoice(): void {
    this.form.choices.push(QuickRepliesMessageFactory.createChoice({ score: 5 }));
  }

  removeChoice(choiceIdx: number): void {
    this.form.choices.splice(choiceIdx, 1);
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
      choices: cloneDeep(this.choices) || [],
    };
  }

  @Watch('formDataToWatch', { immediate: true, deep: true })
  updateForm(): void {
    this.form = this.createForm();
  }
}
