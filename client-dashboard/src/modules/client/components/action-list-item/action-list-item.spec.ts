import { find, getDefaultMocks, Mocks } from '@/utils/test';
import ActionListItem, { ActionListItemProps } from '@client/components/action-list-item/action-list-item';
import { shallowMount, Wrapper } from '@vue/test-utils';

const TITLE_ACTION_LIST_ITEM_SELECTOR = 'action-list-item-title';
const SUBTITLE_ACTION_LIST_ITEM_SELECTOR = 'action-list-item-subtitle';

let wrapper: Wrapper<ActionListItem>;

let mocks: Mocks;

const createWrapper = () => {
  const propsData: ActionListItemProps = {
    title: 'title',
    subTitle: 'subtitle',
  };
  mocks = getDefaultMocks();

  wrapper = shallowMount(ActionListItem, {
    mocks,
    propsData,
  });
};

describe('ActionListItem', () => {
  beforeEach(() => {
    createWrapper();
  });

  describe('when display title', () => {
    it('should display title', () => {
      const title = find(wrapper, TITLE_ACTION_LIST_ITEM_SELECTOR);

      expect(title.text()).toContain('title');
    });

    it('should display title', () => {
      const subTitle = find(wrapper, SUBTITLE_ACTION_LIST_ITEM_SELECTOR);

      expect(subTitle.text()).toContain('subtitle');
    });
  });
});
