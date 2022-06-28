import { find, getDefaultMocks, Mocks } from '@/utils/test';
import BoostMyAdDialog, { BoostMyAdDialogProps } from '@client/components/boost-my-ad-dialog/boost-my-ad-dialog';
import { shallowMount, Wrapper } from '@vue/test-utils';

const CARD_DIALOG = 'card-dialog';
const MISSION_CODE = 'HODO-000';
const CLIENT_FIRST_NAME = 'John';
const CLIENT_EMAIL = 'lucas@hellodoe.co';

let wrapper: Wrapper<BoostMyAdDialog>;

let mocks: Mocks;

const createWrapper = () => {
  const propsData: BoostMyAdDialogProps = {
    missionCode: MISSION_CODE,
    clientFirstName: CLIENT_FIRST_NAME,
    clientEmail: CLIENT_EMAIL,
    open: true,
  };
  mocks = getDefaultMocks();

  wrapper = shallowMount(BoostMyAdDialog, {
    mocks,
    propsData,
  });
};

describe('when cta of boost card dialog clicked', () => {
  beforeEach(() => {
    createWrapper();
  });

  it('should redirect to boost typeform', () => {
    const cardDialog = find(wrapper, CARD_DIALOG);

    cardDialog.vm.$emit('cta-clicked');

    expect(mocks.$navigationSvc.goToBoostTypeform).toHaveBeenCalledWith(MISSION_CODE, CLIENT_FIRST_NAME, CLIENT_EMAIL);
  });
});
