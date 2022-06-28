import { formValidationSuccess } from '@/types/validatable-form';
import { find, getDefaultMocks, Mocks } from '@/utils/test';
import { Form as QuizzFormData } from '@admin/components/quizz-form/quizz-form';
import MissionQuizzPage, {
  MissionQuizzPageProps,
} from '@admin/pages/mission-quizz-page/mission-quizz-page';
import { Question } from '@domains/question';
import { Quizz } from '@domains/quizz';
import { QuizzFactory } from '@factories/quizz.factory';
import { COMPONENTS_NAMES } from '@modules/components-names';
import { shallowMount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';

const QUIZZ_EMPTY_STATE_SELECTOR = 'quizz-empty-state';
const SAVE_BUTTON_SELECTOR = 'save-quizz-button';

describe('MissionQuizzPage', () => {
  let wrapper: Wrapper<MissionQuizzPage>;

  let mocks: Mocks;
  let mockQuizz: Quizz;
  let mockQuestions: Question[];
  let mockParamMissionId: string;
  let mockGetMissionQuizz = jest.fn();
  let mockUpdateMissionQuizz = jest.fn();
  let mockValidateForm = jest.fn();

  const getStubs = () => {
    return {
      [COMPONENTS_NAMES.ADMIN_QUIZZ_FORM]: Vue.extend({
        render: () => ({} as any),
        methods: {
          validateForm: mockValidateForm,
        },
      }),
    };
  };

  const createWrapper = () => {
    const propsData: MissionQuizzPageProps = {
      menu: [],
    };
    mocks = getDefaultMocks({
      $missionsService: {
        getMissionQuizz: mockGetMissionQuizz,
      },
      $quizzesService: {
        updateQuizz: mockUpdateMissionQuizz,
      },
      $route: {
        params: {
          id: mockParamMissionId,
        },
      },
    });

    wrapper = shallowMount(MissionQuizzPage, {
      mocks,
      propsData,
      stubs: getStubs(),
    });
  };

  beforeEach(() => {
    mockQuizz = QuizzFactory.create();
    mockQuestions = [];
    mockParamMissionId = '1';
    mockGetMissionQuizz = jest
      .fn()
      .mockImplementation(() => ({ quizz: mockQuizz, questions: mockQuestions }));
    createWrapper();
  });

  describe('when translate', () => {
    it('should translate save quizz button', () => {
      const button = find(wrapper, SAVE_BUTTON_SELECTOR);

      expect(button.text()).toContain('actions.save');
    });
  });

  describe('when click save quizz button', () => {
    const QUIZZ: Quizz = QuizzFactory.create();
    const FORM_DATA: QuizzFormData = {
      quizz: QUIZZ,
      questions: new Map(),
    };

    beforeEach(() => {
      mockQuizzFound();
      mockValidateForm = jest.fn().mockImplementation(() => formValidationSuccess(FORM_DATA));
      mockUpdateMissionQuizz = jest.fn().mockImplementation(() => ({ quizz: null, questions: [] }));
      createWrapper();
    });

    it('should save quizz', async () => {
      const button = find(wrapper, SAVE_BUTTON_SELECTOR);
      button.vm.$emit('click');
      await wrapper.vm.$nextTick();

      expect(mocks.$quizzesService.updateQuizz).toHaveBeenCalledWith(QUIZZ);
    });
  });

  describe('given quizz empty state events', () => {
    describe('when emit create quizz event', () => {
      const MISSION_ID = '1';

      beforeEach(() => {
        mockQuizzNotFound();
        mockParamMissionId = MISSION_ID;
        createWrapper();
      });

      it('should create quizz', async () => {
        const emptyState = find(wrapper, QUIZZ_EMPTY_STATE_SELECTOR);
        emptyState.vm.$emit('create-quizz');

        expect(mocks.$missionsService.createMissionQuizz).toHaveBeenCalledWith(MISSION_ID);
      });
    });
  });

  const mockQuizzNotFound = (): void => {
    mockGetMissionQuizz = jest.fn().mockImplementation(() => ({ quizz: null, questions: [] }));
  };

  const mockQuizzFound = (args?: { quizz: Quizz; questions: Question[] }): void => {
    mockQuizz = args?.quizz || QuizzFactory.create();
    mockQuestions = args?.questions || [];
    mockGetMissionQuizz = jest
      .fn()
      .mockImplementation(() => ({ quizz: mockQuizz, questions: mockQuestions }));
  };
});
