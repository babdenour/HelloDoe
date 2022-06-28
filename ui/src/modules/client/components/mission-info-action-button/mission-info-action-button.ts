import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './mission-info-action-button.html?style=./mission-info-action-button.scss';

export interface MissionInfoActionButtonProps {
  title: string;
}

@WithRender
@Component
export default class MissionInfoActionButton extends Vue implements MissionInfoActionButtonProps {
  @Prop()
  readonly title: string;
}
