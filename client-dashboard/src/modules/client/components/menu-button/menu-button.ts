import { Component, Prop, Vue } from 'vue-property-decorator';
import WithRender from './menu-button.html?style=./menu-button.scss';

export interface MenuButtonProps {
  title: string;
  isSelected: boolean;
}

export enum ButtonType {
  BASIC = 'basic',
  APPEALING = 'appealing',
}

@WithRender
@Component
export default class MenuButton extends Vue implements MenuButtonProps {
  @Prop()
  readonly title: string;

  @Prop()
  readonly isSelected: boolean;

  @Prop({ default: 'basic' })
  readonly type: string;

  get buttonCssClass(): string[] {
    const classes: string[] = [];

    if (this.isSelected) {
      classes.push('menu-button--selected');
    }

    if (this.type === ButtonType.APPEALING) {
      classes.push('menu-button--appealing');
    }

    return classes;
  }
}
