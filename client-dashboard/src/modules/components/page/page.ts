import { COMPONENTS_NAMES } from '@modules/components-names';
import { Aside, Container, Footer, Header, Main, Menu } from 'element-ui';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { RouteRecord } from 'vue-router';
import MenuItem, { Item } from './components/menu-item/menu-item';
import WithRender from './page.html?style=./page.scss';

interface PageProps {
  title: string;
  menu: Item[];
}

@WithRender
@Component({
  components: {
    [COMPONENTS_NAMES.MENU_ITEM]: MenuItem,
    [Aside.name]: Aside,
    [Container.name]: Container,
    [Footer.name]: Footer,
    [Header.name]: Header,
    [Main.name]: Main,
    [Menu.name]: Menu,
  },
})
export default class Page extends Vue implements PageProps {
  @Prop()
  readonly title!: string;

  @Prop({ required: true })
  readonly menu!: Item[];

  isMenuCollapsed: boolean = false;
  activeItemIdx: string = '0';
  defaultOpeneds: string[] = [];

  get routeName(): string {
    return this.$route.name;
  }

  get isCurrentMissionPage(): boolean {
    return this.$route.matched.some((routeRecord: RouteRecord) => routeRecord.path.includes('mission/:id'));
  }

  get currentMissionId(): string {
    return this.isCurrentMissionPage ? this.$route.params.id : '';
  }

  toggleMenuCollapse(): void {
    this.isMenuCollapsed = !this.isMenuCollapsed;
  }

  @Watch('menu', { immediate: true })
  updateActiveItemIdx(): void {
    this.activeItemIdx = this.buildActiveItemIndex();
  }

  @Watch('activeItemIdx', { immediate: true })
  updateDefaultOpeneds(): void {
    this.defaultOpeneds = this.buildDefaultItemsOpened();
  }

  buildDefaultItemsOpened(): string[] {
    const itemsIdx = this.activeItemIdx.split('-');
    const defaultItemsOpened: string[] = [];
    for (let i = 1; i < itemsIdx.length; i++) {
      const subSetIdx = itemsIdx.slice(0, i);
      defaultItemsOpened.push(subSetIdx.join('-'));
    }

    return defaultItemsOpened;
  }

  buildActiveItemIndex(): string {
    let activeItemIdx: string;
    let i: number = 0;
    const items: Item[] = this.menu || [];
    while (i < items.length && activeItemIdx == null) {
      const activeIdxChunk: string = `${i + 1}`;
      activeItemIdx = this.buildActiveItemIndexRec(items[i], activeIdxChunk);
      i++;
    }

    return activeItemIdx;
  }

  buildActiveItemIndexRec(item: Item, activeIdxChunk: string): string | undefined {
    if (item.route?.name === this.routeName) {
      return activeIdxChunk;
    }

    const children: Item[] = item.children || [];
    for (let c = 0; c < children.length; c++) {
      const child = children[c];
      const activeIndex = this.buildActiveItemIndexRec(child, `${activeIdxChunk}-${c + 1}`);
      if (activeIndex != null) {
        return activeIndex;
      }
    }

    return undefined;
  }
}
