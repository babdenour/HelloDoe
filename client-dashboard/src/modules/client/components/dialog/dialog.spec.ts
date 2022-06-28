import { find, getDefaultMocks, Mocks } from '@/utils/test';
import Dialog, { DialogProps, EmittedEvents } from '@client/components/dialog/dialog';
import { shallowMount, Wrapper } from '@vue/test-utils';

const MASK_SELECTOR = 'dialog-mask';

let wrapper: Wrapper<Dialog>;

let mocks: Mocks;

const createWrapper = () => {
  mocks = getDefaultMocks();
  const propsData: DialogProps = {
    open: true,
    width: '33%',
  };

  wrapper = shallowMount(Dialog, {
    mocks,
    propsData,
  });
};

describe('Dialog', () => {
  beforeEach(() => {
    createWrapper();
  });

  describe('given events of dialog mask', () => {
    describe('when clicked', () => {
      it(`should emit ${EmittedEvents.SYNC_OPEN}`, () => {
        const mask = find(wrapper, MASK_SELECTOR);

        mask.trigger('click');

        expect(wrapper.emitted()[EmittedEvents.SYNC_OPEN]).toBeTruthy();
      });
    });
  });
});
