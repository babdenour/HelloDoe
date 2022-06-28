import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './menu-button.html?style=./menu-button.scss';

export interface MenuButtonProps {
  title: string;
  isSelected: boolean;
}

@WithRender
@Component
export default class MenuButton extends Vue implements MenuButtonProps {
  @Prop()
  readonly title: string;

  @Prop()
  readonly isSelected: boolean;

  get selectedClass(): string {
    return this.isSelected ? 'menu-button-selected' : '';
  }
}
