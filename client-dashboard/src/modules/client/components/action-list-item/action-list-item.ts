import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './action-list-item.html?style=./action-list-item.scss';

export interface ActionListItemProps {
  title: string;
  subTitle: string;
}

@WithRender
@Component
export default class ActionListItem extends Vue implements ActionListItemProps {
  @Prop()
  readonly title: string;

  @Prop()
  readonly subTitle: string;
}
