import { find, getDefaultMocks, Mocks } from '@/utils/test';
import CandidateListItem, { CandidateListItemProps, EmittedEvents } from '@client/components/candidate-list-item/candidate-list-item';
import { CandidateStatus } from '@domains/candidate';
import { shallowMount, Wrapper } from '@vue/test-utils';

const WRAPPER_SELECTOR: string = 'wrapper';
const HEART_BUTTON_ACTION_SELECTOR: string = 'heart-button-action';
const PHONE_NUMBER_SELECTOR: string = 'phone-number';
const UNLOCKED_ICON_SELECTOR: string = 'icon-unlocked';

let wrapper: Wrapper<CandidateListItem>;

const PHONE_NUMBER = '0616273920';

let mocks: Mocks;
let mockedStatus: CandidateStatus;
let mockedIsSelected: boolean;
let mockedIsSeen: boolean;

const createWrapper = () => {
  const propsData: CandidateListItemProps = {
    age: 23,
    firstName: 'Jane',
    imgUrl: 'https://jane.jpg',
    phoneNumber: PHONE_NUMBER,
    score: 9.5,
    status: mockedStatus,
    isSelected: mockedIsSelected,
    isSeen: mockedIsSeen,
  };
  mocks = getDefaultMocks();

  wrapper = shallowMount(CandidateListItem, {
    mocks,
    propsData,
  });
};

describe('CandidateListItem', () => {
  beforeEach(() => {
    mockedStatus = CandidateStatus.PRESELECTED;
    mockedIsSelected = false;
    mockedIsSeen = false;
    createWrapper();
  });

  describe('when not selected', () => {
    it('should not change css style', () => {
      const title = find(wrapper, WRAPPER_SELECTOR);

      expect(title.classes('candidate-list-item--selected')).toBe(false);
    });
  });

  describe('when selected', () => {
    beforeEach(() => {
      mockedIsSelected = true;
      createWrapper();
    });

    it('should set selected style', () => {
      const title = find(wrapper, WRAPPER_SELECTOR);

      expect(title.classes('candidate-list-item--selected')).toBe(true);
    });
  });

  describe('when not seen', () => {
    beforeEach(() => {
      mockedIsSeen = false;
      mockedIsSelected = false;
      createWrapper();
    });
    it('should not change css style', () => {
      const title = find(wrapper, WRAPPER_SELECTOR);

      expect(title.classes('candidate-list-item--seen')).toBe(false);
    });
  });

  describe('when seen', () => {
    beforeEach(() => {
      mockedIsSeen = true;
      mockedIsSelected = false;

      createWrapper();
    });

    it('should set seen style', () => {
      const title = find(wrapper, WRAPPER_SELECTOR);

      expect(title.classes('candidate-list-item--seen')).toBe(true);
    });
  });

  describe('when not unlocked', () => {
    it('should display heart button', () => {
      const heartButton = find(wrapper, HEART_BUTTON_ACTION_SELECTOR);

      expect(heartButton.exists()).toBe(true);
    });

    it('should hide unlocked icon', () => {
      const unlockedIcon = find(wrapper, UNLOCKED_ICON_SELECTOR);

      expect(unlockedIcon.exists()).toBe(false);
    });

    it('should hide phone number', () => {
      const phoneNumber = find(wrapper, PHONE_NUMBER_SELECTOR);

      expect(phoneNumber.exists()).toBe(false);
    });
  });

  describe('when unlocked', () => {
    beforeEach(() => {
      mockedStatus = CandidateStatus.UNLOCKED;
      createWrapper();
    });

    it('should hide heart button', () => {
      const heartButton = find(wrapper, HEART_BUTTON_ACTION_SELECTOR);

      expect(heartButton.exists()).toBe(false);
    });

    it('should display unlocked icon', () => {
      const unlockedIcon = find(wrapper, UNLOCKED_ICON_SELECTOR);

      expect(unlockedIcon.exists()).toBe(true);
    });

    it('should display phone number', () => {
      const phoneNumber = find(wrapper, PHONE_NUMBER_SELECTOR);

      expect(phoneNumber.text()).toContain(PHONE_NUMBER);
    });
  });

  describe('given events of the heart button action', () => {
    describe('when clicked ', () => {
      it(`should emit ${EmittedEvents.SET_CANDIDATE_FAVORITE}`, () => {
        const heartButton: Wrapper<Vue> = find(wrapper, HEART_BUTTON_ACTION_SELECTOR);

        heartButton.trigger('click');

        expect(wrapper.emitted()[EmittedEvents.SET_CANDIDATE_FAVORITE]).toBeTruthy();
      });
    });
  });
});
