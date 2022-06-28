import { find, getDefaultMocks, Mocks } from '@/utils/test';
import MissionInfoPage, {
  MissionInfoPageProps,
} from '@admin/pages/mission-info-page/mission-info-page';
import { MissionStatus } from '@constants/mission-status';
import { shallowMount, Wrapper } from '@vue/test-utils';

const DIALOG_CONFIRM_SELECTOR = 'dialog-confirm';
const VALIDATE_BUTTON_SELECTOR = 'validate-button';

let wrapper: Wrapper<MissionInfoPage>;
let mocks: Mocks;

const createWrapper = () => {
  const propsData: MissionInfoPageProps = {
    menu: [],
  };
  mocks = getDefaultMocks({
    $missionsService: {
      getMissionDetails: jest.fn().mockImplementation(() => ({
        mission: {
          status: MissionStatus.FOR_VALIDATION,
          dates: [],
        },
        client: {
          contact: {},
        },
      })),
    },
  });

  wrapper = shallowMount(MissionInfoPage, { mocks, propsData });
};

describe('MissionInfoPage', () => {
  beforeEach(() => {
    createWrapper();
  });

  describe('when dialog confirmed initialised', () => {
    it('should pass on dialog title', () => {
      const dialog = find(wrapper, DIALOG_CONFIRM_SELECTOR);

      expect(dialog.props().title).toBe('dialogs.mission-confirm-validation.title');
    });

    it('should pass on dialog message', () => {
      const dialog = find(wrapper, DIALOG_CONFIRM_SELECTOR);

      expect(dialog.props().message).toBe('dialogs.mission-confirm-validation.message');
    });

    it('should pass on show', () => {
      const dialog = find(wrapper, DIALOG_CONFIRM_SELECTOR);

      expect(dialog.props().show).toBe(false);
    });

    it('should pass on validating mission', () => {
      const button = find(wrapper, VALIDATE_BUTTON_SELECTOR);

      expect(button.props().loading).toBe(wrapper.vm.validatingMission);
    });
  });

  describe('when mission in for validation status', () => {
    describe('given validate button events', () => {
      describe('when clicked', () => {
        it('should open dialog confirm', () => {
          const button = find(wrapper, VALIDATE_BUTTON_SELECTOR);
          button.vm.$emit('click');

          expect(wrapper.vm.showConfirmDialog).toBe(true);
        });
      });
    });
  });

  describe('given dialog confirm events', () => {
    describe('when confirm', () => {
      it('should validate mission', () => {
        const dialog = find(wrapper, DIALOG_CONFIRM_SELECTOR);
        dialog.vm.$emit('confirm');

        expect(mocks.$missionsService.validateMission).toHaveBeenCalled();
      });
    });
  });
});
