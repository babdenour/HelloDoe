import { find, getDefaultMocks, Mocks } from '@/utils/test';
import SponsoMyAdDialog, { SponsoMyAdDialogProps } from '@client/components/sponso-my-ad-dialog/sponso-my-ad-dialog';
import { shallowMount, Wrapper } from '@vue/test-utils';

const CARD_DIALOG = 'card-dialog';
const MISSION_CODE = 'HODO-000';
const CLIENT_FIRST_NAME = 'John';
const CLIENT_EMAIL = 'lucas@hellodoe.co';

let wrapper: Wrapper<SponsoMyAdDialog>;

let mocks: Mocks;

const createWrapper = () => {
  const propsData: SponsoMyAdDialogProps = {
    missionCode: MISSION_CODE,
    clientFirstName: CLIENT_FIRST_NAME,
    clientEmail: CLIENT_EMAIL,
    open: true,
  };
  mocks = getDefaultMocks();

  wrapper = shallowMount(SponsoMyAdDialog, {
    mocks,
    propsData,
  });
};

describe('when cta of sponso card dialog clicked', () => {
  beforeEach(() => {
    createWrapper();
  });

  it('should redirect to boost typeform', () => {
    const cardDialog = find(wrapper, CARD_DIALOG);

    cardDialog.vm.$emit('cta-clicked');

    expect(mocks.$navigationSvc.goToSponsoTypeform).toHaveBeenCalledWith(MISSION_CODE, CLIENT_FIRST_NAME, CLIENT_EMAIL);
  });
});
