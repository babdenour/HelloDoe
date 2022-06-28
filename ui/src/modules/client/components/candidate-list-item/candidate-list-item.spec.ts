import { find, getDefaultMocks, Mocks } from '@/utils/test';
import CandidateListItem, { CandidateListItemProps, EmittedEvents } from '@client/components/candidate-list-item/candidate-list-item';
import { shallowMount, Wrapper } from '@vue/test-utils';

const WRAPPER_SELECTOR: string = 'wrapper';
const HEART_BUTTON_ACTION: string = 'heart-button-action';

let wrapper: Wrapper<CandidateListItem>;

let mocks: Mocks;
let mockedIsSelected: boolean;
let mockedIsSeen: boolean;

const createWrapper = () => {
  const propsData: CandidateListItemProps = {
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
    mockedIsSelected = false;
    createWrapper();
  });

  describe('when not selected', () => {
    it('should not change css style', () => {
      const title = find(wrapper, WRAPPER_SELECTOR);

      expect(title.classes('candidate-list-item--selected')).toBe(false);
    });
  });

  describe('when selected', () => {
    // GIVEN  test state (description du contest)
    beforeEach(() => {
      mockedIsSelected = true;
      createWrapper(); // WHEN specify pattern
    });

    it('should set selected style', () => {
      const title = find(wrapper, WRAPPER_SELECTOR);
      // THEN test changes,
      expect(title.classes('candidate-list-item--selected')).toBe(true);
    });
  });

  describe('when not seen', () => {
    beforeEach(() => {
      mockedIsSeen = false;
      mockedIsSelected = false;
      createWrapper(); // WHEN specify pattern
    });
    it('should not change css style', () => {
      const title = find(wrapper, WRAPPER_SELECTOR);

      expect(title.classes('candidate-list-item--seen')).toBe(false);
    });
  });

  describe('when seen', () => {
    // GIVEN  test state (description du contest)
    beforeEach(() => {
      mockedIsSeen = true;
      mockedIsSelected = false;

      createWrapper(); // WHEN specify pattern
    });

    it('should set seen style', () => {
      const title = find(wrapper, WRAPPER_SELECTOR);
      // THEN test changes,
      expect(title.classes('candidate-list-item--seen')).toBe(true);
    });
  });
  describe('given events of the heart button action', () => {
    describe('when clicked ', () => {
      it(`should emit ${EmittedEvents.SET_CANDIDATE_FAVORITE}`, () => {
        const heartButton: Wrapper<Vue> = find(wrapper, HEART_BUTTON_ACTION);

        heartButton.trigger('click');

        expect(wrapper.emitted()[EmittedEvents.SET_CANDIDATE_FAVORITE]).toBeTruthy();
      });
    });
  });
});
