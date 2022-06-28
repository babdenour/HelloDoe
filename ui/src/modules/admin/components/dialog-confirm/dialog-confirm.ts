import { Button, Dialog } from 'element-ui';
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import WithRender from './dialog-confirm.html';

export enum Events {
  CONFIRM = 'confirm',
  UPDATE_SHOW = 'update:show',
}

export interface DialogProps {
  title: string;
  message: string;
  show: boolean;
}

@WithRender
@Component({
  components: {
    [Button.name]: Button,
    [Dialog.name]: Dialog,
  },
})
export default class DialogConfirm extends Vue implements DialogProps {
  @Prop({ required: true })
  readonly title!: string;

  @Prop({ required: true })
  readonly message!: string;

  @Prop({ default: false })
  readonly show!: boolean;

  readonly dialogWidth = '40%';

  get i18n(): { [k: string]: string } {
    return {
      cancel: this.$i18nSvc.t('actions.cancel').toString(),
      confirm: this.$i18nSvc.t('actions.confirm').toString(),
    };
  }

  handleConfirm(): void {
    this.confirm();
    this.close();
  }

  handleUpdateVisible(show: boolean): void {
    if (!show) {
      this.close();
    }
  }

  @Emit(Events.UPDATE_SHOW)
  close(): boolean {
    return false;
  }

  @Emit(Events.CONFIRM)
  confirm(): void {}
}
