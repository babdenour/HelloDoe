import { find, getDefaultMocks, Mocks } from '@/utils/test';
import HelpDialog from '@client/components/help-dialog/help-dialog';
import { shallowMount, Wrapper } from '@vue/test-utils';

const CARD_DIALOG = 'card-dialog';
const EMAIL_COPIED_TRAD = 'messages.email-copied';

let wrapper: Wrapper<HelpDialog>;

let mocks: Mocks;

const createWrapper = () => {
  mocks = getDefaultMocks();

  wrapper = shallowMount(HelpDialog, {
    mocks,
  });
};

describe('Help Dialog', () => {
  describe('when cta of help card dialog clicked', () => {
    beforeEach(() => {
      createWrapper();
    });

    it('should show a toast with right message', () => {
      const cardDialog = find(wrapper, CARD_DIALOG);

      cardDialog.vm.$emit('cta-clicked');

      expect(mocks.$toastService.success).toHaveBeenCalledWith(EMAIL_COPIED_TRAD);
    });
  });
});
