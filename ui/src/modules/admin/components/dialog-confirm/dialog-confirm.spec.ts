import { find } from '@/utils/test';
import DialogConfirm, {
  DialogProps,
  Events,
} from '@admin/components/dialog-confirm/dialog-confirm';
import { shallowMount, Wrapper } from '@vue/test-utils';

const CANCEL_BUTTON_SELECTOR = 'cancel-button';
const CONFIRM_BUTTON_SELECTOR = 'confirm-button';
const DIALOG_SELECTOR = 'dialog';
const MESSAGE_SELECTOR = 'message';

let wrapper: Wrapper<DialogConfirm>;

const TITLE = 'title';
const MESSAGE = 'message';
const SHOW = false;

const createWrapper = () => {
  const props: DialogProps = {
    title: TITLE,
    message: MESSAGE,
    show: SHOW,
  };

  wrapper = shallowMount(DialogConfirm, { propsData: props });
};

describe('DialogConfirm', () => {
  beforeEach(() => {
    createWrapper();
  });

  describe('when translate', () => {
    it('should translate cancel button', () => {
      const button = find(wrapper, CANCEL_BUTTON_SELECTOR);
      expect(button.text()).toContain('actions.cancel');
    });

    it('should translate confirm button', () => {
      const button = find(wrapper, CONFIRM_BUTTON_SELECTOR);
      expect(button.text()).toContain('actions.confirm');
    });
  });

  describe('when initialised', () => {
    describe('given a message', () => {
      it('should display message', () => {
        const message = find(wrapper, MESSAGE_SELECTOR);
        expect(message.text()).toContain(MESSAGE);
      });
    });

    describe('given a title', () => {
      it('should pass on title', () => {
        const dialog = find(wrapper, DIALOG_SELECTOR);
        expect(dialog.props().title).toBe(TITLE);
      });
    });

    describe('given the show prop', () => {
      it('should pass on show', () => {
        const dialog = find(wrapper, DIALOG_SELECTOR);
        expect(dialog.props().show).toBe(SHOW);
      });
    });
  });

  describe('given close button events', () => {
    describe('when click', () => {
      it('should emit update:show with false', () => {
        const button = find(wrapper, CANCEL_BUTTON_SELECTOR);
        button.vm.$emit('click');
        expect(wrapper.emitted()[Events.UPDATE_SHOW][0][0]).toEqual(false);
      });
    });
  });

  describe('given confirm button events', () => {
    describe('when click', () => {
      it('should emit confirm', () => {
        const button = find(wrapper, CONFIRM_BUTTON_SELECTOR);
        button.vm.$emit('click');
        expect(wrapper.emitted()[Events.CONFIRM][0]).toBeTruthy();
      });

      it('should emit update:show with false', () => {
        const button = find(wrapper, CONFIRM_BUTTON_SELECTOR);
        button.vm.$emit('click');
        expect(wrapper.emitted()[Events.UPDATE_SHOW][0][0]).toEqual(false);
      });
    });
  });
});
