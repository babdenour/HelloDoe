import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import WithRender from './dialog.html?style=./dialog.scss';

export enum EmittedEvents {
  SYNC_OPEN = 'update:open',
}

export interface DialogProps {
  open: boolean;
  width: string;
}

@WithRender
@Component
export default class Dialog extends Vue implements DialogProps {
  @Prop()
  readonly open: boolean;

  @Prop()
  readonly width: string;

  get hostStyle() {
    return { '--width': `${this.width}` };
  }

  @Emit(EmittedEvents.SYNC_OPEN)
  closeDialog(): boolean {
    return false;
  }
}
