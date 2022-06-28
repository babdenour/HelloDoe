import { find, getDefaultMocks, Mocks } from '@/utils/test';
import MenuButton, { MenuButtonProps } from '@client/components/menu-button/menu-button';
import { shallowMount, Wrapper } from '@vue/test-utils';

const MENU_BUTTON_TITLE = 'menu-button-title';

let wrapper: Wrapper<MenuButton>;

let mocks: Mocks;

const createWrapper = () => {
  mocks = getDefaultMocks();
  const propsData: MenuButtonProps = {
    title: 'title',
    isSelected: true,
  };

  wrapper = shallowMount(MenuButton, {
    mocks,
    propsData,
  });
};

describe('MenuPage', () => {
  beforeEach(() => {
    createWrapper();
  });

  describe('when display title', () => {
    it('should display title', () => {
      const title = find(wrapper, MENU_BUTTON_TITLE);

      expect(title.text()).toContain('title');
    });
  });
});
