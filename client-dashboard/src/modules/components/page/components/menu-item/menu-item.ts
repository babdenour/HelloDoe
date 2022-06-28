import { COMPONENTS_NAMES } from '@modules/components-names';
import { Menu, MenuItem as MenuItemEl, MenuItemGroup, Submenu } from 'element-ui';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Location } from 'vue-router';
import WithRender from './menu-item.html';

export interface Item {
  title: string;
  icon?: string;
  route?: Location;
  disabled?: boolean;
  children?: Item[];
}

interface MenuItemProps {
  item: Item;
  index: string;
}

@WithRender
@Component({
  name: COMPONENTS_NAMES.MENU_ITEM, // Required because recursive component
  components: {
    [Menu.name]: Menu,
    [MenuItemEl.name]: MenuItemEl,
    [MenuItemGroup.name]: MenuItemGroup,
    [Submenu.name]: Submenu,
  },
})
export default class MenuItem extends Vue implements MenuItemProps {
  @Prop({ required: true })
  readonly item!: Item;

  @Prop({ required: true })
  readonly index!: string;

  get children(): Item[] {
    return this.item.children || [];
  }

  get isItem(): boolean {
    return !!this.item.route && !this.item.children;
  }

  get isSubmenu(): boolean {
    return !!this.item.icon && !!this.item.children;
  }

  navigateTo(route: Location): void {
    if (route) {
      this.$router.push(route);
    }
  }
}
