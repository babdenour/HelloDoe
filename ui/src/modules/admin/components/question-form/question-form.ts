import { MessageType } from '@/types/message-type';
import { QuestionMessage } from '@/types/question-message';
import { FormValidation, formValidationFailure, formValidationSuccess, ValidatableForm } from '@/types/validatable-form';
import { moveDown, moveUp } from '@/utils/utils';
import ImageMessageForm from '@admin/components/image-message-form/image-message-form';
import QuickRepliesMessageForm, { Form as QuickRepliesForm } from '@admin/components/quick-replies-message-form/quick-replies-message-form';
import TextMessageForm from '@admin/components/text-message-form/text-message-form';
import { ImageMessageFactory } from '@factories/image-message.factory';
import { TextMessageFactory } from '@factories/text-message.factory';
import { Rule } from '@libs/old-form/types/rule';
import { arrayMinSize } from '@libs/old-form/validators/array-min-size';
import { arrayNoBlankString } from '@libs/old-form/validators/array-no-blank-string';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { Button, Card, Dropdown, DropdownItem, DropdownMenu, Form as FormEl, FormItem, Option, Select } from 'element-ui';
import { cloneDeep } from 'lodash';
import { TranslateResult } from 'vue-i18n';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import WithRender from './question-form.html?style=./question-form.scss';

export enum MessageCmd {
  DELETE = 'DELETE',
  MOVE_DOWN = 'MOVE_DOWN',
  MOVE_UP = 'MOVE_UP',
}

export interface Form {
  messages: QuestionMessage[];
  tags: string[];
}

type Rules = {
  [k in keyof Form]?: Rule<Form[k]>[];
};

export interface QuestionFormProps {
  messages: QuestionMessage[];
  tags: string[];
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.ADMIN_IMAGE_MESSAGE_FORM]: ImageMessageForm,
    [COMPONENTS_NAMES.ADMIN_QUICK_REPLIES_MESSAGE_FORM]: QuickRepliesMessageForm,
    [COMPONENTS_NAMES.ADMIN_TEXT_MESSAGE_FORM]: TextMessageForm,
    [Button.name]: Button,
    [Card.name]: Card,
    [Dropdown.name]: Dropdown,
    [DropdownItem.name]: DropdownItem,
    [DropdownMenu.name]: DropdownMenu,
    [FormEl.name]: FormEl,
    [FormItem.name]: FormItem,
    [Option.name]: Option,
    [Select.name]: Select,
  },
})
export default class QuestionForm extends Vue implements QuestionFormProps, ValidatableForm<Form> {
  @Prop({ default: () => [] })
  readonly messages!: QuestionMessage[];

  @Prop({ default: () => [] })
  readonly tags!: string[];

  form: Form = this.createForm();
  existingTags: string[] = [];

  $refs!: {
    form: FormEl;
  };

  get i18n() {
    return {
      addMessage: this.$i18nSvc.t('actions.add-message'),
      delete: this.$i18nSvc.t('actions.delete'),
      errorTagEmpty: this.$i18nSvc.t('forms.question.errors.tag-empty'),
      errorTagsMissing: (count: number) => this.$i18nSvc.tc('forms.question.errors.tags-missing', count, { count }),
      labelImage: this.$i18nSvc.t('labels.image'),
      labelText: this.$i18nSvc.t('labels.text'),
      moveDown: this.$i18nSvc.t('actions.move-down'),
      moveUp: this.$i18nSvc.t('actions.move-up'),
      noOptions: this.$i18nSvc.t('placeholders.no-options'),
      tags: this.$i18nSvc.t('placeholders.tags'),
    };
  }

  get rules(): Rules {
    return {
      tags: [
        {
          trigger: 'change',
          message: this.i18n.errorTagEmpty,
          validator: arrayNoBlankString,
        },
        {
          trigger: 'change',
          message: this.i18n.errorTagsMissing(1),
          validator: arrayMinSize(1),
        },
      ],
    };
  }

  get formDataToWatch(): any {
    return {
      messages: this.messages,
      tags: this.tags,
    };
  }

  get addMessageOptions(): { label: TranslateResult; icon: string; command: MessageType }[] {
    return [
      {
        label: this.i18n.labelText,
        icon: 'el-icon-tickets',
        command: MessageType.TEXT,
      },
      {
        label: this.i18n.labelImage,
        icon: 'el-icon-picture-outline',
        command: MessageType.IMAGE,
      },
    ];
  }

  get messageCmd(): any {
    return {
      delete: MessageCmd.DELETE,
      moveDown: MessageCmd.MOVE_DOWN,
      moveUp: MessageCmd.MOVE_UP,
    };
  }

  async mounted(): Promise<void> {
    this.existingTags = await this.$questionsService.getQuestionTags();
  }

  isImageMessage(message: QuestionMessage): boolean {
    return message.type === MessageType.IMAGE;
  }

  isQuickRepliesMessage(message: QuestionMessage): boolean {
    return message.type === MessageType.QUICK_REPLIES;
  }

  isTextMessage(message: QuestionMessage): boolean {
    return message.type === MessageType.TEXT;
  }

  getMessageRef(messageIdx: number): string {
    return `message-form-${messageIdx}`;
  }

  addMessage(command: MessageType): void {
    let message: QuestionMessage;
    if (command === MessageType.TEXT) {
      message = TextMessageFactory.create();
    } else if (command === MessageType.IMAGE) {
      message = ImageMessageFactory.create();
    }

    if (!message) {
      throw new Error(`Command ${command} unsupported`);
    }

    const insertIdx = this.form.messages.length > 0 ? this.form.messages.length - 1 : 0;
    this.form.messages.splice(insertIdx, 0, message);
  }

  handleMessageAction({ cmd, payload }: { cmd: MessageCmd; payload: string }): void {
    if (cmd === MessageCmd.DELETE) {
      this.deleteMessageAction(payload);
    } else if (cmd === MessageCmd.MOVE_DOWN) {
      this.moveDownAction(payload);
    } else if (cmd === MessageCmd.MOVE_UP) {
      this.moveUpAction(payload);
    }
  }

  deleteMessageAction(id: string): void {
    this.form.messages = this.form.messages.filter((message) => message.id !== id);
  }

  moveDownAction(id: string): void {
    this.form.messages = moveDown(
      this.form.messages,
      (message: QuestionMessage) => message.id === id,
      (_: QuestionMessage, collateral: QuestionMessage) => collateral.type !== MessageType.QUICK_REPLIES,
    );
  }

  moveUpAction(id: string): void {
    this.form.messages = moveUp(this.form.messages, (message: QuestionMessage) => message.id === id);
  }

  async validateForm(): Promise<FormValidation<Form>> {
    try {
      const subformsValid = await this.validateSubforms();
      await this.$refs['form'].validate();

      if (!subformsValid) {
        throw new Error();
      }

      return formValidationSuccess(this.form);
    } catch (e) {
      return formValidationFailure();
    }
  }

  async validateSubforms(): Promise<boolean> {
    let subformsValid = true;

    for (let i = 0; i < this.form.messages.length; i++) {
      const ref = this.$refs[this.getMessageRef(i)][0] as ValidatableForm<QuickRepliesForm>;
      const validation = await ref.validateForm();
      if (validation.isValid) {
        this.form.messages[i] = { ...this.form.messages[i], ...validation.form };
      } else {
        subformsValid = false;
      }
    }

    return subformsValid;
  }

  createForm(): Form {
    return {
      messages: cloneDeep(this.messages) || [],
      tags: cloneDeep(this.tags) || [],
    };
  }

  @Watch('formDataToWatch', { immediate: true, deep: true })
  updateForm(): void {
    this.form = this.createForm();
  }
}
