import { BroadcastMessageType, BroadcastTarget, IQuickReply } from '@/types/broadcast.interface';
import { isBlank } from '@/utils/nativeTypes';
import { Button, Col, Input, MessageBox, Radio, Row } from 'element-ui';
import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './broadcast.html?style=./broadcast.scss';

interface BroadcastProps {
  broadcastTarget: BroadcastTarget;
  missionId: string;
}

@WithRender
@Component({
  components: {
    [Button.name]: Button,
    [Col.name]: Col,
    [Input.name]: Input,
    [Radio.name]: Radio,
    [Row.name]: Row,
  },
})
export default class Broadcast extends Vue implements BroadcastProps {
  @Prop({ default: 'ALL' })
  readonly broadcastTarget!: BroadcastTarget;

  @Prop()
  readonly missionId!: string;

  broadcastMessage = '';
  broadcastMessageType: BroadcastMessageType = 'TEXT';
  broadcasting = false;
  quickReplies: IQuickReply[] = [];

  get i18n() {
    return {
      cancelAction: this.$i18nSvc.t('actions.cancel').toString(),
      sendAction: this.$i18nSvc.t('actions.send').toString(),
    };
  }

  public addQuickReply(): void {
    this.quickReplies.push({ payload: '', title: '' });
  }

  public clearInputs(): void {
    this.broadcastMessage = '';
    this.quickReplies = [];
  }

  public async broadcast(): Promise<void> {
    if (isBlank(this.broadcastMessage)) {
      return;
    }

    const dialogMessage = this.broadcastTarget === 'HIRED' ? 'Ce message sera envoyé aux Doers embauchés, ok pour toi ?' : 'Ce message sera envoyé à tous les Doers, ok pour toi ?';

    try {
      await MessageBox.confirm(dialogMessage, 'Check de routine', {
        confirmButtonText: this.i18n.sendAction,
        cancelButtonText: this.i18n.cancelAction,
      });

      await this.sendBroadcastMessage();
    } catch (e) {}
  }

  private async sendBroadcastMessage(): Promise<void> {
    const token = this.$tokenService.getToken();
    const { broadcastMessage, broadcastMessageType, quickReplies } = this;
    this.broadcasting = true;
    try {
      if (this.broadcastTarget === 'HIRED') {
        await this.$broadcastService.broadcastToHiredDoers(token, this.missionId, broadcastMessageType, broadcastMessage, quickReplies);
      } else {
        await this.$broadcastService.broadcastToAllDoers(token, broadcastMessageType, broadcastMessage, quickReplies);
      }
      this.clearInputs();
    } catch (error) {
      if (!error.status) {
        this.$toastService.error('Communication avec le back impossible');
      } else {
        this.$toastService.error('Erreur lors de la communication avec le back');
      }
    }
    this.broadcasting = false;
  }

  public isTypeQuickReplies(): boolean {
    return this.broadcastMessageType === 'QUICK_REPLIES';
  }

  public removeQuickReply(index: number): void {
    this.quickReplies.splice(index, 1);
  }
}
